import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService implements OnModuleInit {
  private readonly logger = new Logger(StripeService.name);
  private stripe: Stripe | null = null;
  private readonly isProduction = process.env.NODE_ENV === 'production';

  constructor(private configService: ConfigService) {}

  /**
   * Validate Stripe configuration at startup
   */
  onModuleInit(): void {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');

    if (!secretKey) {
      const errorMsg = 'STRIPE_SECRET_KEY is not configured';
      if (this.isProduction) {
        // In production, this is a fatal error
        throw new Error(`FATAL: ${errorMsg}. Please set the STRIPE_SECRET_KEY environment variable.`);
      } else {
        this.logger.warn(`WARNING: ${errorMsg} - Stripe features will be unavailable`);
        this.stripe = null;
        return;
      }
    }

    // Validate the key format
    if (!secretKey.startsWith('sk_')) {
      const errorMsg = 'STRIPE_SECRET_KEY has an invalid format';
      if (this.isProduction) {
        throw new Error(`FATAL: ${errorMsg}`);
      } else {
        this.logger.warn(`WARNING: ${errorMsg}`);
        this.stripe = null;
        return;
      }
    }

    this.stripe = new Stripe(secretKey, {
      apiVersion: '2023-10-16',
    });

    this.logger.log('Stripe service initialized successfully');
  }

  /**
   * Ensure Stripe is configured before any operation
   */
  private ensureConfigured(): Stripe {
    if (!this.stripe) {
      throw new Error(
        'Stripe is not configured. Please set the STRIPE_SECRET_KEY environment variable.',
      );
    }
    return this.stripe;
  }

  /**
   * Create a Stripe PaymentIntent
   */
  async createPaymentIntent(
    amount: number,
    currency: string,
    metadata: Record<string, string>,
  ): Promise<Stripe.PaymentIntent> {
    const stripe = this.ensureConfigured();
    this.logger.log(`Creating payment intent: ${amount} ${currency}`);

    return stripe.paymentIntents.create({
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
    const stripe = this.ensureConfigured();
    return stripe.customers.create({
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
    const stripe = this.ensureConfigured();
    return stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
    });
  }

  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    const stripe = this.ensureConfigured();
    return stripe.subscriptions.cancel(subscriptionId);
  }

  /**
   * Process a refund
   */
  async refund(
    paymentIntentId: string,
    amount?: number,
  ): Promise<Stripe.Refund> {
    const stripe = this.ensureConfigured();
    const params: Stripe.RefundCreateParams = {
      payment_intent: paymentIntentId,
    };

    if (amount) {
      params.amount = Math.round(amount * 100); // Convert to cents
    }

    this.logger.log(`Processing refund for ${paymentIntentId}: ${amount || 'full'}`);

    return stripe.refunds.create(params);
  }

  /**
   * Cancel a refund
   */
  async cancelRefund(refundId: string): Promise<Stripe.Refund> {
    const stripe = this.ensureConfigured();
    return stripe.refunds.cancel(refundId);
  }

  /**
   * Retrieve a payment intent
   */
  async getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    const stripe = this.ensureConfigured();
    return stripe.paymentIntents.retrieve(paymentIntentId);
  }

  /**
   * Update a payment intent
   */
  async updatePaymentIntent(
    paymentIntentId: string,
    updates: Partial<Stripe.PaymentIntentUpdateParams>,
  ): Promise<Stripe.PaymentIntent> {
    const stripe = this.ensureConfigured();
    return stripe.paymentIntents.update(paymentIntentId, updates);
  }

  /**
   * Verify and parse Stripe webhook event
   */
  handleWebhook(payload: Buffer, signature: string, webhookSecret: string): Stripe.Event {
    const stripe = this.ensureConfigured();
    try {
      return stripe.webhooks.constructEvent(
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
    const stripe = this.ensureConfigured();
    return stripe.setupIntents.create({
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
    const stripe = this.ensureConfigured();
    return stripe.paymentMethods.list({
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
    const stripe = this.ensureConfigured();
    return stripe.transfers.create({
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
    const stripe = this.ensureConfigured();
    return stripe.paymentIntents.create({
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
    const stripe = this.ensureConfigured();
    const params: Stripe.PaymentIntentCaptureParams = {};
    if (amount) {
      params.amount_to_capture = Math.round(amount * 100);
    }
    return stripe.paymentIntents.capture(paymentIntentId, params);
  }
}
