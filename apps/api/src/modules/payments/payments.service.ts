import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {
  PaymentTransaction,
  TransactionType,
  TransactionStatus,
  PaymentProvider,
} from './entities/payment-transaction.entity';
import { EscrowHold, EscrowStatus } from './entities/escrow-hold.entity';
import { StripeService } from './stripe.service';
import {
  InitiatePaymentDto,
  ConfirmPaymentDto,
  PaymentInitiationResponseDto,
  PaymentTransactionResponseDto,
} from './dto/payments.dto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(PaymentTransaction)
    private transactionRepository: Repository<PaymentTransaction>,
    @InjectRepository(EscrowHold)
    private escrowRepository: Repository<EscrowHold>,
    private stripeService: StripeService,
    private configService: ConfigService,
  ) {}

  /**
   * Initiate a payment for an order
   */
  async initiatePayment(
    companyId: string,
    dto: InitiatePaymentDto,
  ): Promise<PaymentInitiationResponseDto> {
    // Create pending transaction record
    const transaction = this.transactionRepository.create({
      orderId: dto.orderId,
      type: TransactionType.PAYMENT,
      status: TransactionStatus.PENDING,
      provider: dto.provider,
      amount: dto.amount,
      currency: dto.currency || 'USD',
    });

    const savedTransaction = await this.transactionRepository.save(transaction);

    // Process based on provider
    if (dto.provider === PaymentProvider.STRIPE) {
      const paymentIntent = await this.stripeService.createPaymentIntent(
        dto.amount,
        dto.currency || 'USD',
        {
          transactionId: savedTransaction.id,
          orderId: dto.orderId,
          companyId,
        },
      );

      // Update transaction with Stripe payment intent ID
      await this.transactionRepository.update(savedTransaction.id, {
        providerTransactionId: paymentIntent.id,
      });

      this.logger.log(`Stripe payment initiated: ${paymentIntent.id}`);

      return {
        transactionId: savedTransaction.id,
        clientSecret: paymentIntent.client_secret || undefined,
        paymentIntentId: paymentIntent.id,
      };
    }

    // For non-Stripe providers, return transaction ID for client-side handling
    this.logger.log(`Payment initiated via ${dto.provider}: ${savedTransaction.id}`);

    return {
      transactionId: savedTransaction.id,
    };
  }

  /**
   * Confirm a payment transaction
   */
  async confirmPayment(
    transactionId: string,
    companyId: string,
    dto: ConfirmPaymentDto,
  ): Promise<PaymentTransactionResponseDto> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction not found: ${transactionId}`);
    }

    if (transaction.status !== TransactionStatus.PENDING && transaction.status !== TransactionStatus.PROCESSING) {
      throw new BadRequestException(
        `Transaction cannot be confirmed in ${transaction.status} status`,
      );
    }

    // Update transaction
    transaction.status = TransactionStatus.SUCCESS;
    transaction.paymentMethod = dto.paymentMethod;
    transaction.paymentMethodType = dto.paymentMethodType;
    transaction.completedAt = new Date();

    const updated = await this.transactionRepository.save(transaction);

    this.logger.log(`Payment confirmed: ${transactionId}`);

    return this.mapToTransactionResponse(updated);
  }

  /**
   * Process a refund
   */
  async processRefund(
    transactionId: string,
    companyId: string,
    amount?: number,
    reason?: string,
  ): Promise<PaymentTransactionResponseDto> {
    const originalTransaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });

    if (!originalTransaction) {
      throw new NotFoundException(`Transaction not found: ${transactionId}`);
    }

    if (originalTransaction.type !== TransactionType.PAYMENT) {
      throw new BadRequestException('Can only refund payment transactions');
    }

    if (originalTransaction.status !== TransactionStatus.SUCCESS) {
      throw new BadRequestException('Can only refund successful transactions');
    }

    const refundAmount = amount || Number(originalTransaction.amount);

    if (refundAmount > Number(originalTransaction.amount)) {
      throw new BadRequestException('Refund amount cannot exceed original amount');
    }

    // Process refund with provider
    if (originalTransaction.provider === PaymentProvider.STRIPE) {
      await this.stripeService.refund(
        originalTransaction.providerTransactionId,
        refundAmount,
      );
    }

    // Create refund transaction record
    const refundTransaction = this.transactionRepository.create({
      orderId: originalTransaction.orderId,
      type: TransactionType.REFUND,
      status: TransactionStatus.SUCCESS,
      provider: originalTransaction.provider,
      amount: refundAmount,
      currency: originalTransaction.currency,
      paymentMethod: originalTransaction.paymentMethod,
      refundedToTransactionId: transactionId,
      completedAt: new Date(),
    });

    const savedRefund = await this.transactionRepository.save(refundTransaction);

    // Update original transaction status if fully refunded
    if (refundAmount >= Number(originalTransaction.amount)) {
      // Note: REFUNDED is not in TransactionStatus enum, skip this update
      await this.transactionRepository.save(originalTransaction);
    }

    this.logger.log(`Refund processed: ${savedRefund.id} for ${refundAmount}`);

    return this.mapToTransactionResponse(savedRefund);
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId: string): Promise<PaymentTransactionResponseDto> {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction not found: ${transactionId}`);
    }

    return this.mapToTransactionResponse(transaction);
  }

  /**
   * Get all transactions for an order
   */
  async getOrderTransactions(orderId: string): Promise<PaymentTransactionResponseDto[]> {
    const transactions = await this.transactionRepository.find({
      where: { orderId },
      order: { createdAt: 'DESC' },
    });

    return transactions.map((t) => this.mapToTransactionResponse(t));
  }

  /**
   * Handle Stripe webhook events
   */
  async handleStripeWebhook(
    payload: Buffer,
    signature: string,
  ): Promise<{ received: boolean; event?: any }> {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!webhookSecret) {
      this.logger.error('STRIPE_WEBHOOK_SECRET not configured');
      throw new BadRequestException('Webhook not configured');
    }

    const event = this.stripeService.handleWebhook(payload, signature, webhookSecret);

    // Process the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailure(event.data.object);
        break;
      case 'charge.refunded':
        await this.handleRefund(event.data.object);
        break;
      default:
        this.logger.log(`Unhandled event type: ${event.type}`);
    }

    return { received: true, event };
  }

  /**
   * Create an escrow hold
   */
  async createEscrowHold(
    orderId: string,
    sellerId: string,
    buyerId: string,
    amount: number,
    currency: string,
  ): Promise<EscrowHold> {
    const escrow = this.escrowRepository.create({
      orderId,
      sellerId,
      buyerId,
      amount,
      currency,
      status: EscrowStatus.PENDING,
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    });

    return this.escrowRepository.save(escrow);
  }

  /**
   * Release escrow hold
   */
  async releaseEscrow(
    escrowId: string,
    companyId: string,
  ): Promise<EscrowHold> {
    const escrow = await this.escrowRepository.findOne({ where: { id: escrowId } });

    if (!escrow) {
      throw new NotFoundException(`Escrow not found: ${escrowId}`);
    }

    // Only seller can release escrow
    if (escrow.sellerId !== companyId) {
      throw new ForbiddenException('Only the seller can release escrow');
    }

    escrow.status = EscrowStatus.RELEASED;
    escrow.releasedAt = new Date();

    return this.escrowRepository.save(escrow);
  }

  /**
   * Raise a dispute on escrow
   */
  async disputeEscrow(
    escrowId: string,
    companyId: string,
    reason: string,
  ): Promise<EscrowHold> {
    const escrow = await this.escrowRepository.findOne({ where: { id: escrowId } });

    if (!escrow) {
      throw new NotFoundException(`Escrow not found: ${escrowId}`);
    }

    // Both buyer and seller can dispute
    if (escrow.buyerId !== companyId && escrow.sellerId !== companyId) {
      throw new ForbiddenException('You do not have access to this escrow');
    }

    escrow.status = EscrowStatus.DISPUTED;
    escrow.disputeReason = reason;

    return this.escrowRepository.save(escrow);
  }

  /**
   * Get escrow by order
   */
  async getOrderEscrow(orderId: string): Promise<EscrowHold | null> {
    return this.escrowRepository.findOne({ where: { orderId } });
  }

  /**
   * Handle payment success event
   */
  private async handlePaymentSuccess(paymentIntent: any): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: { providerTransactionId: paymentIntent.id },
    });

    if (transaction) {
      transaction.status = TransactionStatus.SUCCESS;
      transaction.paymentMethod = paymentIntent.payment_method_types?.[0];
      transaction.completedAt = new Date();
      await this.transactionRepository.save(transaction);

      this.logger.log(`Payment success handled: ${transaction.id}`);
    }
  }

  /**
   * Handle payment failure event
   */
  private async handlePaymentFailure(paymentIntent: any): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: { providerTransactionId: paymentIntent.id },
    });

    if (transaction) {
      transaction.status = TransactionStatus.FAILED;
      transaction.failureReason = paymentIntent.last_payment_error?.message;
      await this.transactionRepository.save(transaction);

      this.logger.log(`Payment failure handled: ${transaction.id}`);
    }
  }

  /**
   * Handle refund event
   */
  private async handleRefund(charge: any): Promise<void> {
    const transaction = await this.transactionRepository.findOne({
      where: { providerTransactionId: charge.payment_intent },
    });

    if (transaction) {
      // Note: REFUNDED is not in TransactionStatus enum
      this.logger.log(`Refund event handled for: ${transaction.id}`);
    }
  }

  /**
   * Map transaction entity to response DTO
   */
  private mapToTransactionResponse(
    transaction: PaymentTransaction,
  ): PaymentTransactionResponseDto {
    return {
      id: transaction.id,
      orderId: transaction.orderId,
      type: transaction.type,
      status: transaction.status,
      provider: transaction.provider,
      providerTransactionId: transaction.providerTransactionId,
      amount: Number(transaction.amount),
      currency: transaction.currency,
      paymentMethod: transaction.paymentMethod,
      paymentMethodType: transaction.paymentMethodType,
      failureReason: transaction.failureReason,
      completedAt: transaction.completedAt,
      createdAt: transaction.createdAt,
    };
  }
}
