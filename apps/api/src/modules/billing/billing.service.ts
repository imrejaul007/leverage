import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

@Injectable()
export class BillingService {
  async createSubscription(companyId: string, dto: any) {
    return {
      id: crypto.randomUUID(),
      companyId,
      planId: dto.planId || 'starter',
      stripeSubscriptionId: `sub_${crypto.randomUUID().slice(0, 8)}`,
      status: 'ACTIVE',
      planName: 'Starter Plan',
      planPrice: 99,
      interval: dto.interval || 'monthly',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
      createdAt: new Date(),
    };
  }

  async getSubscription(companyId: string) {
    return {
      id: crypto.randomUUID(),
      companyId,
      planId: 'starter',
      status: 'ACTIVE',
      planName: 'Starter Plan',
      planPrice: 99,
      interval: 'monthly',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
      createdAt: new Date(),
    };
  }

  async updateSubscription(companyId: string, dto: any) {
    return {
      id: crypto.randomUUID(),
      companyId,
      planId: dto.planId || 'starter',
      status: dto.cancelAtPeriodEnd ? 'CANCELLED' : 'ACTIVE',
      planName: 'Starter Plan',
      planPrice: 99,
      interval: 'monthly',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: dto.cancelAtPeriodEnd || false,
      createdAt: new Date(),
    };
  }

  async cancelSubscription(companyId: string) {
    return {
      success: true,
      message: `Subscription will be cancelled at the end of the current billing period`,
    };
  }

  async getPlans() {
    return {
      plans: [
        {
          id: 'starter-1',
          name: 'Starter',
          slug: 'starter',
          type: 'STARTER',
          price: 99,
          currency: 'USD',
          interval: 'monthly',
          features: ['Up to 10 users', '100 products', 'Basic analytics', 'Email support'],
          limits: { users: 10, products: 100, orders: 500, storage: 1000, apiCalls: 10000 },
          adCredits: 100,
          isActive: true,
          isFeatured: false,
        },
        {
          id: 'professional-1',
          name: 'Professional',
          slug: 'professional',
          type: 'PROFESSIONAL',
          price: 299,
          currency: 'USD',
          interval: 'monthly',
          features: ['Up to 50 users', '1000 products', 'Advanced analytics', 'Priority support', 'Custom branding'],
          limits: { users: 50, products: 1000, orders: 5000, storage: 10000, apiCalls: 100000 },
          adCredits: 500,
          isActive: true,
          isFeatured: true,
        },
        {
          id: 'enterprise-1',
          name: 'Enterprise',
          slug: 'enterprise',
          type: 'ENTERPRISE',
          price: 999,
          currency: 'USD',
          interval: 'monthly',
          features: ['Unlimited users', 'Unlimited products', 'Full analytics', 'Dedicated support', 'Custom integrations', 'SLA guarantee'],
          limits: { users: -1, products: -1, orders: -1, storage: -1, apiCalls: -1 },
          adCredits: 2000,
          isActive: true,
          isFeatured: false,
        },
      ],
    };
  }

  async getPlan(planId: string) {
    const plans: Record<string, any> = {
      starter: { id: 'starter-1', name: 'Starter', slug: 'starter', price: 99, features: ['Up to 10 users', '100 products'], limits: { users: 10, products: 100 } },
      professional: { id: 'professional-1', name: 'Professional', slug: 'professional', price: 299, features: ['Up to 50 users', '1000 products'], limits: { users: 50, products: 1000 } },
      enterprise: { id: 'enterprise-1', name: 'Enterprise', slug: 'enterprise', price: 999, features: ['Unlimited users', 'Unlimited products'], limits: { users: -1, products: -1 } },
    };
    if (!plans[planId]) throw new NotFoundException(`Plan not found: ${planId}`);
    return plans[planId];
  }

  async getInvoices(companyId: string) {
    return {
      invoices: [
        {
          id: 'inv-1',
          invoiceNumber: 'INV-2024-001',
          amount: 99,
          status: 'PAID',
          dueDate: new Date().toISOString(),
          paidAt: new Date().toISOString(),
        },
        {
          id: 'inv-2',
          invoiceNumber: 'INV-2024-002',
          amount: 99,
          status: 'PENDING',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    };
  }

  async getInvoice(id: string, companyId: string) {
    return {
      id,
      invoiceNumber: `INV-${Date.now()}`,
      amount: 99,
      status: 'PAID',
      dueDate: new Date().toISOString(),
      paidAt: new Date().toISOString(),
      items: [
        { description: 'Starter Plan - Monthly', amount: 99 },
      ],
    };
  }

  async addPaymentMethod(companyId: string, dto: any) {
    return { success: true, paymentMethodId: `pm_${crypto.randomUUID().slice(0, 8)}` };
  }

  async getPaymentMethods(companyId: string) {
    return {
      paymentMethods: [
        { id: 'pm-1', type: 'card', brand: 'visa', last4: '4242', expMonth: 12, expYear: 2025, isDefault: true },
      ],
    };
  }

  async removePaymentMethod(paymentMethodId: string) {
    return { success: true };
  }

  async setDefaultPaymentMethod(paymentMethodId: string) {
    return { success: true };
  }

  async handleWebhook(eventType: string, payload: any) {
    return { success: true };
  }

  async getBillingSummary(companyId: string) {
    return {
      subscription: {
        planName: 'Starter Plan',
        planPrice: 99,
        status: 'ACTIVE',
      },
      spentThisMonth: 99,
      paymentMethods: [
        { id: 'pm-1', type: 'card', brand: 'visa', last4: '4242' },
      ],
    };
  }
}
