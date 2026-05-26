import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  UseGuards,
  HttpCode,
  HttpStatus,
  RawBodyRequest,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator';
import {
  InitiatePaymentDto,
  ConfirmPaymentDto,
  RefundPaymentDto,
  PaymentInitiationResponseDto,
  PaymentTransactionResponseDto,
  PaymentMethodsResponseDto,
  EscrowHoldResponseDto,
} from './dto/payments.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly stripeService: StripeService,
  ) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Initiate a payment for an order' })
  async initiatePayment(
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ValidationPipe({ transform: true })) dto: InitiatePaymentDto,
  ): Promise<PaymentInitiationResponseDto> {
    return this.paymentsService.initiatePayment(user.companyId, dto);
  }

  @Post(':id/confirm')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm a payment transaction' })
  async confirmPayment(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ValidationPipe({ transform: true })) dto: ConfirmPaymentDto,
  ): Promise<PaymentTransactionResponseDto> {
    return this.paymentsService.confirmPayment(id, user.companyId, dto);
  }

  @Post(':id/refund')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Process a refund for a transaction' })
  async refundPayment(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ValidationPipe({ transform: true })) dto: RefundPaymentDto,
  ): Promise<PaymentTransactionResponseDto> {
    return this.paymentsService.processRefund(id, user.companyId, dto.amount, dto.reason);
  }

  @Get('transactions/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transaction details' })
  async getTransaction(
    @Param('id') id: string,
  ): Promise<PaymentTransactionResponseDto> {
    return this.paymentsService.getTransaction(id);
  }

  @Get('order/:orderId/transactions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all transactions for an order' })
  async getOrderTransactions(
    @Param('orderId') orderId: string,
  ): Promise<PaymentTransactionResponseDto[]> {
    return this.paymentsService.getOrderTransactions(orderId);
  }

  @Post('webhook/stripe')
  @HttpCode(HttpStatus.OK)
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  async stripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ): Promise<{ received: boolean }> {
    const payload = req.rawBody;
    if (!payload) {
      return { received: false };
    }
    const result = await this.paymentsService.handleStripeWebhook(payload, signature);
    return { received: result.received };
  }

  @Get('methods')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get saved payment methods' })
  async getPaymentMethods(): Promise<PaymentMethodsResponseDto> {
    return { methods: [] };
  }

  @Post('escrow/:orderId/hold')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an escrow hold for an order' })
  async createEscrowHold(
    @Param('orderId') orderId: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body('sellerId') sellerId: string,
    @Body('amount') amount: number,
    @Body('currency') currency: string,
  ): Promise<EscrowHoldResponseDto> {
    const escrow = await this.paymentsService.createEscrowHold(
      orderId,
      sellerId,
      user.companyId,
      amount,
      currency,
    );
    return this.mapToEscrowResponse(escrow);
  }

  @Post('escrow/:id/release')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Release an escrow hold' })
  async releaseEscrow(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<EscrowHoldResponseDto> {
    const escrow = await this.paymentsService.releaseEscrow(id, user.companyId);
    return this.mapToEscrowResponse(escrow);
  }

  @Post('escrow/:id/dispute')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Raise a dispute on an escrow hold' })
  async disputeEscrow(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
    @Body('reason') reason: string,
  ): Promise<EscrowHoldResponseDto> {
    const escrow = await this.paymentsService.disputeEscrow(id, user.companyId, reason);
    return this.mapToEscrowResponse(escrow);
  }

  @Get('escrow/order/:orderId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get escrow for an order' })
  async getOrderEscrow(
    @Param('orderId') orderId: string,
  ): Promise<EscrowHoldResponseDto | null> {
    const escrow = await this.paymentsService.getOrderEscrow(orderId);
    return escrow ? this.mapToEscrowResponse(escrow) : null;
  }

  private mapToEscrowResponse(escrow: {
    id: string;
    orderId: string;
    sellerId: string;
    buyerId: string;
    amount: unknown;
    currency: string;
    status: string;
    releasedAt: Date | null;
    disputeReason: string | null;
    createdAt: Date;
  }): EscrowHoldResponseDto {
    return {
      id: escrow.id,
      orderId: escrow.orderId,
      sellerId: escrow.sellerId,
      buyerId: escrow.buyerId,
      amount: Number(escrow.amount),
      currency: escrow.currency,
      status: escrow.status,
      releasedAt: escrow.releasedAt,
      disputeReason: escrow.disputeReason,
      createdAt: escrow.createdAt,
    };
  }
}
