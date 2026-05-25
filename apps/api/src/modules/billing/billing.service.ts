import { Injectable, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { Plan } from './entities/plan.entity';
import { SubscriptionStatus } from './entities/subscription.entity';
import { BillingInterval } from './entities/plan.entity';
import { Prisma } from '@prisma/client';
import {
  SubscribeDto,
  UpdateSubscriptionDto,
  AddPaymentMethodDto,
  PlanResponseDto,
  SubscriptionResponseDto,
  InvoiceResponseDto,
  BillingSummaryDto,
} from './dto/billing.dto';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  // ============================================
  // SUBSCRIPTION MANAGEMENT
  // ============================================

  async createSubscription(companyId: string, dto: SubscribeDto): Promise<SubscriptionResponseDto> {
    // Check if company already has an active subscription
    const existing = await this.subscriptionRepository.findOne({
      where: { companyId },
    });

    if (existing && existing.status === SubscriptionStatus.ACTIVE) {
      throw new ConflictException('Company already has an active subscription');
    }

    // Get the plan
    const plan = await this.planRepository.findOne({
      where: { slug: dto.planId, isActive: true },
    });

    if (!plan) {
      throw new NotFoundException(`Plan not found: ${dto.planId}`);
    }

    // Calculate period dates
    const now = new Date();
    const intervalDays = this.getIntervalDays(dto.interval || 'monthly');
    const periodEnd = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);

    // Create subscription
    const subscription = this.subscriptionRepository.create({
      companyId,
      planId: plan.slug,
      status: dto.trial ? SubscriptionStatus.TRIAL : SubscriptionStatus.ACTIVE,
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      cancelAtPeriodEnd: false,
    });

    const saved = await this.subscriptionRepository.save(subscription);

    this.logger.log(`Subscription created: ${saved.id} for company: ${companyId}, plan: ${plan.slug}`);

    return this.mapToSubscriptionResponse(saved, plan);
  }

  async getSubscription(companyId: string): Promise<SubscriptionResponseDto | null> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { companyId },
    });

    if (!subscription) {
      return null;
    }

    const plan = await this.planRepository.findOne({
      where: { slug: subscription.planId },
    });

    return this.mapToSubscriptionResponse(subscription, plan);
  }

  async updateSubscription(
    companyId: string,
    dto: UpdateSubscriptionDto,
  ): Promise<SubscriptionResponseDto> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { companyId },
    });

    if (!subscription) {
      throw new NotFoundException('No subscription found');
    }

    if (dto.planId) {
      const newPlan = await this.planRepository.findOne({
        where: { slug: dto.planId, isActive: true },
      });

      if (!newPlan) {
        throw new NotFoundException(`Plan not found: ${dto.planId}`);
      }

      subscription.planId = newPlan.slug;
    }

    if (dto.cancelAtPeriodEnd !== undefined) {
      subscription.cancelAtPeriodEnd = dto.cancelAtPeriodEnd;
    }

    if (dto.cancelAtPeriodEnd === true) {
      subscription.status = SubscriptionStatus.CANCELLED;
    }

    const updated = await this.subscriptionRepository.save(subscription);
    const plan = await this.planRepository.findOne({
      where: { slug: updated.planId },
    });

    return this.mapToSubscriptionResponse(updated, plan);
  }

  async cancelSubscription(companyId: string): Promise<{ success: boolean; message: string }> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { companyId },
    });

    if (!subscription) {
      throw new NotFoundException('No subscription found');
    }

    subscription.cancelAtPeriodEnd = true;
    subscription.status = SubscriptionStatus.CANCELLED;
    await this.subscriptionRepository.save(subscription);

    this.logger.log(`Subscription cancelled for company: ${companyId}`);

    return {
      success: true,
      message: `Subscription will be cancelled at the end of the current billing period (${subscription.currentPeriodEnd.toISOString()})`,
    };
  }

  // ============================================
  // PLANS
  // ============================================

  async getPlans(): Promise<{ plans: PlanResponseDto[] }> {
    const plans = await this.planRepository.find({
      where: { isActive: true },
      order: { price: 'ASC' },
    });

    return {
      plans: plans.map((plan) => this.mapToPlanResponse(plan)),
    };
  }

  async getPlan(planId: string): Promise<PlanResponseDto> {
    const plan = await this.planRepository.findOne({
      where: { slug: planId, isActive: true },
    });

    if (!plan) {
      throw new NotFoundException(`Plan not found: ${planId}`);
    }

    return this.mapToPlanResponse(plan);
  }

  // ============================================
  // INVOICES - Stub implementation
  // ============================================

  async getInvoices(_companyId: string): Promise<{ invoices: InvoiceResponseDto[] }> {
    // TODO: Implement with actual Invoice entity from orders module
    return { invoices: [] };
  }

  async getInvoice(_id: string, _companyId: string): Promise<InvoiceResponseDto> {
    // TODO: Implement with actual Invoice entity from orders module
    throw new NotFoundException('Invoice functionality not yet implemented');
  }

  // ============================================
  // PAYMENT METHODS (Stub - would integrate with Stripe)
  // ============================================

  async addPaymentMethod(
    companyId: string,
    dto: AddPaymentMethodDto,
  ): Promise<{ success: boolean; paymentMethodId: string }> {
    // In a real implementation, this would use Stripe's API
    // to attach the payment method to the customer
    this.logger.log(`Payment method added for company: ${companyId}`, {
      paymentMethodId: dto.paymentMethodId,
    });

    return {
      success: true,
      paymentMethodId: dto.paymentMethodId,
    };
  }

  async getPaymentMethods(companyId: string): Promise<{ paymentMethods: unknown[] }> {
    // In a real implementation, this would fetch from Stripe
    return { paymentMethods: [] };
  }

  async removePaymentMethod(paymentMethodId: string): Promise<{ success: boolean }> {
    // In a real implementation, this would use Stripe's API
    this.logger.log(`Payment method removed: ${paymentMethodId}`);

    return { success: true };
  }

  async setDefaultPaymentMethod(paymentMethodId: string): Promise<{ success: boolean }> {
    // In a real implementation, this would use Stripe's API
    this.logger.log(`Default payment method set: ${paymentMethodId}`);

    return { success: true };
  }

  // ============================================
  // WEBHOOK HANDLING
  // ============================================

  async handleWebhook(
    eventType: string,
    payload: Record<string, unknown>,
  ): Promise<{ success: boolean }> {
    this.logger.log(`Webhook received: ${eventType}`);

    switch (eventType) {
      case 'invoice.paid':
        await this.handleInvoicePaid(payload);
        break;

      case 'invoice.payment_failed':
        await this.handleInvoicePaymentFailed(payload);
        break;

      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(payload);
        break;

      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(payload);
        break;

      case 'payment_method.attached':
        this.logger.log('Payment method attached');
        break;

      default:
        this.logger.warn(`Unhandled webhook event: ${eventType}`);
    }

    return { success: true };
  }

  private async handleInvoicePaid(payload: Record<string, unknown>): Promise<void> {
    const invoiceData = payload.data as Record<string, unknown>;
    const stripeInvoiceId = invoiceData.id as string;
    const customerId = invoiceData.customer as string;

    this.logger.log(`Invoice paid: ${stripeInvoiceId} for customer: ${customerId}`);
  }

  private async handleInvoicePaymentFailed(payload: Record<string, unknown>): Promise<void> {
    const invoiceData = payload.data as Record<string, unknown>;
    const stripeInvoiceId = invoiceData.id as string;

    this.logger.warn(`Invoice payment failed: ${stripeInvoiceId}`);

    // Update subscription status to PAST_DUE
    // In real implementation, would look up subscription by stripe customer ID
  }

  private async handleSubscriptionUpdated(payload: Record<string, unknown>): Promise<void> {
    const subscriptionData = payload.data as Record<string, unknown>;
    const stripeSubscriptionId = subscriptionData.id as string;
    const status = subscriptionData.status as string;

    this.logger.log(`Subscription updated: ${stripeSubscriptionId}, status: ${status}`);

    // Update local subscription record
    await this.subscriptionRepository.findOne({
      where: { stripeSubscriptionId },
    });
  }

  private async handleSubscriptionDeleted(payload: Record<string, unknown>): Promise<void> {
    const subscriptionData = payload.data as Record<string, unknown>;
    const stripeSubscriptionId = subscriptionData.id as string;

    this.logger.log(`Subscription deleted: ${stripeSubscriptionId}`);

    // Update local subscription record
    const subscription = await this.subscriptionRepository.findOne({
      where: { stripeSubscriptionId },
    });

    if (subscription) {
      subscription.status = SubscriptionStatus.EXPIRED;
      await this.subscriptionRepository.save(subscription);
    }
  }

  // ============================================
  // BILLING SUMMARY
  // ============================================

  async getBillingSummary(companyId: string): Promise<BillingSummaryDto> {
    const subscription = await this.getSubscription(companyId);

    // TODO: Calculate spent this month from actual invoice data
    const spentThisMonth = 0;

    return {
      subscription,
      spentThisMonth,
      paymentMethods: [],
    };
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  private getIntervalDays(interval: 'monthly' | 'yearly' | 'quarterly'): number {
    switch (interval) {
      case 'monthly':
        return 30;
      case 'quarterly':
        return 90;
      case 'yearly':
        return 365;
      default:
        return 30;
    }
  }

  private mapToSubscriptionResponse(
    subscription: Subscription,
    plan?: Plan | null,
  ): SubscriptionResponseDto {
    return {
      id: subscription.id,
      companyId: subscription.companyId,
      planId: subscription.planId,
      stripeSubscriptionId: subscription.stripeSubscriptionId || undefined,
      status: subscription.status,
      planName: plan?.name || subscription.planId,
      planPrice: plan ? Number(plan.price) : 0,
      interval: (plan?.interval || BillingInterval.MONTHLY).toLowerCase(),
      currentPeriodStart: subscription.currentPeriodStart,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      createdAt: subscription.createdAt,
    };
  }

  private mapToPlanResponse(plan: Plan): PlanResponseDto {
    const features = (plan.features as string[]) || [];
    const limits = (plan.limits as {
      users?: number;
      products?: number;
      orders?: number;
      storage?: number;
      apiCalls?: number;
    }) || {};

    return {
      id: plan.id,
      name: plan.name,
      slug: plan.slug,
      type: plan.type,
      price: Number(plan.price),
      currency: plan.currency,
      interval: plan.interval,
      features,
      limits: {
        users: limits.users || 0,
        products: limits.products || 0,
        orders: limits.orders || 0,
        storage: limits.storage || 0,
        apiCalls: limits.apiCalls || 0,
      },
      adCredits: plan.adCredits ? Number(plan.adCredits) : undefined,
      isActive: plan.isActive,
      isFeatured: plan.isFeatured,
      stripePriceId: plan.stripePriceId || undefined,
    };
  }
}
