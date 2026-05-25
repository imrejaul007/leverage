import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) {
      this.logger.warn('STRIPE_SECRET_KEY not configured - Stripe features will be disabled');
    }
    this.stripe = new Stripe(secretKey || 'sk_test_placeholder', {
      apiVersion: '2023-10-16',
    });
  }

  /**
   * Create a Stripe PaymentIntent
   */
  async createPaymentIntent(
    amount: number,
    currency: string,
    metadata: Record<string, string>,
  ): Promise<Stripe.PaymentIntent> {
    this.logger.log(`Creating payment intent: ${amount} ${currency}`);

    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }

  /**
   * Create a Stripe customer
   */
  async createCustomer(email: string, name: string, metadata?: Record<string, string>): Promise<Stripe.Customer> {
    return this.stripe.customers.create({
      email,
      name,
      metadata,
    });
  }

  /**
   * Create a Stripe subscription
   */
  async createSubscription(
    customerId: string,
    priceId: string,
    metadata?: Record<string, string>,
  ): Promise<Stripe.Subscription> {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
    });
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return this.stripe.subscriptions.cancel(subscriptionId);
  }

  /**
   * Process a refund
   */
  async refund(
    paymentIntentId: string,
    amount?: number,
  ): Promise<Stripe.Refund> {
    const params: Stripe.RefundCreateParams = {
      payment_intent: paymentIntentId,
    };

    if (amount) {
      params.amount = Math.round(amount * 100); // Convert to cents
    }

    this.logger.log(`Processing refund for ${paymentIntentId}: ${amount || 'full'}`);

    return this.stripe.refunds.create(params);
  }

  /**
   * Cancel a refund
   */
  async cancelRefund(refundId: string): Promise<Stripe.Refund> {
    return this.stripe.refunds.cancel(refundId);
  }

  /**
   * Retrieve a payment intent
   */
  async getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  /**
   * Update a payment intent
   */
  async updatePaymentIntent(
    paymentIntentId: string,
    updates: Partial<Stripe.PaymentIntentUpdateParams>,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.update(paymentIntentId, updates);
  }

  /**
   * Verify and parse Stripe webhook event
   */
  handleWebhook(payload: Buffer, signature: string, webhookSecret: string): Stripe.Event {
    try {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
    } catch (err) {
      this.logger.error(`Webhook signature verification failed: ${(err as Error).message}`);
      throw new Error(`Webhook Error: ${(err as Error).message}`);
    }
  }

  /**
   * Create a SetupIntent for saving payment methods
   */
  async createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
    return this.stripe.setupIntents.create({
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }

  /**
   * List customer's payment methods
   */
  async listPaymentMethods(customerId: string): Promise<Stripe.ApiList<Stripe.PaymentMethod>> {
    return this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
  }

  /**
   * Create a transfer to a connected account
   */
  async createTransfer(
    amount: number,
    currency: string,
    connectedAccountId: string,
    metadata?: Record<string, string>,
  ): Promise<Stripe.Transfer> {
    return this.stripe.transfers.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      destination: connectedAccountId,
      metadata,
    });
  }

  /**
   * Create an escrow-style hold using a payment intent with manual capture
   */
  async createEscrowHold(
    amount: number,
    currency: string,
    metadata: Record<string, string>,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      capture_method: 'manual', // Requires manual capture after verification
      metadata: {
        ...metadata,
        escrow: 'true',
      },
    });
  }

  /**
   * Capture a held payment
   */
  async capturePayment(paymentIntentId: string, amount?: number): Promise<Stripe.PaymentIntent> {
    const params: Stripe.PaymentIntentCaptureParams = {};
    if (amount) {
      params.amount_to_capture = Math.round(amount * 100);
    }
    return this.stripe.paymentIntents.capture(paymentIntentId, params);
  }
}
