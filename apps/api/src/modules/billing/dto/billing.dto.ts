import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  Min,
  Max,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================
// LOCAL ENUM DEFINITIONS (mirrors Prisma schema)
// ============================================

export enum SubscriptionStatus {
  TRIAL = 'TRIAL',
  ACTIVE = 'ACTIVE',
  PAST_DUE = 'PAST_DUE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  SUSPENDED = 'SUSPENDED',
}

export enum PlanType {
  FREE = 'FREE',
  STARTER = 'STARTER',
  PROFESSIONAL = 'PROFESSIONAL',
  BUSINESS = 'BUSINESS',
  ENTERPRISE = 'ENTERPRISE',
}

export enum BillingInterval {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  QUARTERLY = 'QUARTERLY',
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

// ============================================
// SUBSCRIPTION DTOs
// ============================================

export class SubscribeDto {
  @ApiProperty({ example: 'professional', description: 'Plan ID to subscribe to' })
  @IsString()
  @IsNotEmpty()
  planId: string;

  @ApiPropertyOptional({ example: true, description: 'Start with trial period if available' })
  @IsBoolean()
  @IsOptional()
  trial?: boolean;

  @ApiPropertyOptional({ example: 'yearly', enum: ['monthly', 'yearly', 'quarterly'], description: 'Billing interval' })
  @IsEnum(['monthly', 'yearly', 'quarterly'])
  @IsOptional()
  interval?: 'monthly' | 'yearly' | 'quarterly';

  @ApiPropertyOptional({ example: 'coupon_code', description: 'Promotional coupon code' })
  @IsString()
  @IsOptional()
  couponCode?: string;
}

export class UpdateSubscriptionDto {
  @ApiPropertyOptional({ example: 'enterprise', description: 'New plan ID' })
  @IsString()
  @IsOptional()
  planId?: string;

  @ApiPropertyOptional({ example: 'yearly', enum: ['monthly', 'yearly', 'quarterly'], description: 'New billing interval' })
  @IsEnum(['monthly', 'yearly', 'quarterly'])
  @IsOptional()
  interval?: 'monthly' | 'yearly' | 'quarterly';

  @ApiPropertyOptional({ example: true, description: 'Cancel at end of current period' })
  @IsBoolean()
  @IsOptional()
  cancelAtPeriodEnd?: boolean;
}

// ============================================
// PAYMENT METHOD DTOs
// ============================================

export class AddPaymentMethodDto {
  @ApiProperty({ example: 'pm_card_visa', description: 'Stripe payment method ID' })
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @ApiPropertyOptional({ example: true, description: 'Set as default payment method' })
  @IsBoolean()
  @IsOptional()
  setAsDefault?: boolean;

  @ApiPropertyOptional({ example: 'billing_name', description: 'Name on card' })
  @IsString()
  @IsOptional()
  billingName?: string;
}

export class PaymentMethodResponseDto {
  @ApiProperty({ example: 'pm_123456', description: 'Payment method ID' })
  id: string;

  @ApiProperty({ example: 'card', description: 'Payment method type' })
  type: string;

  @ApiProperty({ description: 'Card details' })
  card?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };

  @ApiProperty({ example: true, description: 'Is default payment method' })
  isDefault: boolean;

  @ApiProperty({ example: '2024-03-01T00:00:00Z', description: 'Created at' })
  createdAt: Date;
}

// ============================================
// INVOICE DTOs
// ============================================

export class InvoiceResponseDto {
  @ApiProperty({ example: 'uuid-invoice-id', description: 'Invoice ID' })
  id: string;

  @ApiProperty({ example: 'INV-2024-00001', description: 'Invoice number' })
  invoiceNumber: string;

  @ApiPropertyOptional({ example: 'in_123456', description: 'Stripe invoice ID' })
  stripeInvoiceId?: string;

  @ApiProperty({ example: 9999, description: 'Invoice amount (cents)' })
  amount: number;

  @ApiProperty({ example: 999, description: 'Tax amount (cents)' })
  tax: number;

  @ApiProperty({ example: 10998, description: 'Total amount (cents)' })
  total: number;

  @ApiProperty({ example: 'USD', description: 'Currency' })
  currency: string;

  @ApiProperty({ enum: InvoiceStatus, example: 'PAID' })
  status: InvoiceStatus;

  @ApiPropertyOptional({ example: '2024-04-01T00:00:00Z', description: 'Due date' })
  dueDate?: Date;

  @ApiPropertyOptional({ example: '2024-03-15T10:30:00Z', description: 'Paid at' })
  paidAt?: Date;

  @ApiPropertyOptional({ example: [{ description: 'Professional Plan - Monthly', amount: 9999 }], description: 'Invoice items' })
  items?: { description: string; amount: number }[];

  @ApiPropertyOptional({ example: 'https://example.com/invoices/inv-123.pdf', description: 'PDF URL' })
  pdfUrl?: string;

  @ApiProperty({ example: '2024-03-01T10:00:00Z', description: 'Created at' })
  createdAt: Date;
}

// ============================================
// PLAN DTOs
// ============================================

export class PlanResponseDto {
  @ApiProperty({ example: 'uuid-plan-id', description: 'Plan ID' })
  id: string;

  @ApiProperty({ example: 'Professional', description: 'Plan name' })
  name: string;

  @ApiProperty({ example: 'professional', description: 'Plan slug' })
  slug: string;

  @ApiProperty({ enum: PlanType, example: 'PROFESSIONAL' })
  type: PlanType;

  @ApiProperty({ example: 4999, description: 'Price in cents' })
  price: number;

  @ApiProperty({ example: 'USD', description: 'Currency' })
  currency: string;

  @ApiProperty({ enum: BillingInterval, example: 'MONTHLY' })
  interval: BillingInterval;

  @ApiProperty({ type: [String], example: ['Unlimited users', 'Advanced analytics', 'Priority support'] })
  features: string[];

  @ApiPropertyOptional({ description: 'Plan limits and quotas' })
  limits?: {
    users: number;
    products: number;
    orders: number;
    storage: number;
    apiCalls: number;
  };

  @ApiPropertyOptional({ example: 1000, description: 'Included ad credits (cents)' })
  adCredits?: number;

  @ApiProperty({ example: true, description: 'Is active and available' })
  isActive: boolean;

  @ApiProperty({ example: false, description: 'Is featured/promoted plan' })
  isFeatured: boolean;

  @ApiPropertyOptional({ example: 'price_stripe_id', description: 'Stripe price ID' })
  stripePriceId?: string;
}

// ============================================
// SUBSCRIPTION RESPONSE DTOs
// ============================================

export class SubscriptionResponseDto {
  @ApiProperty({ example: 'uuid-subscription-id', description: 'Subscription ID' })
  id: string;

  @ApiProperty({ example: 'uuid-company-id', description: 'Company ID' })
  companyId: string;

  @ApiProperty({ example: 'professional', description: 'Plan ID' })
  planId: string;

  @ApiPropertyOptional({ example: 'sub_stripe_123', description: 'Stripe subscription ID' })
  stripeSubscriptionId?: string;

  @ApiProperty({ enum: SubscriptionStatus, example: 'ACTIVE' })
  status: SubscriptionStatus;

  @ApiProperty({ example: 'Professional', description: 'Plan name' })
  planName: string;

  @ApiProperty({ example: 4999, description: 'Plan price' })
  planPrice: number;

  @ApiProperty({ example: 'monthly', description: 'Billing interval' })
  interval: string;

  @ApiProperty({ example: '2024-03-01T00:00:00Z', description: 'Current period start' })
  currentPeriodStart: Date;

  @ApiProperty({ example: '2024-04-01T00:00:00Z', description: 'Current period end' })
  currentPeriodEnd: Date;

  @ApiProperty({ example: false, description: 'Will cancel at period end' })
  cancelAtPeriodEnd: boolean;

  @ApiPropertyOptional({ example: '2024-04-01T00:00:00Z', description: 'Cancelled at' })
  cancelledAt?: Date;

  @ApiProperty({ example: '2024-03-01T10:00:00Z', description: 'Created at' })
  createdAt: Date;
}

// ============================================
// WEBHOOK DTOs
// ============================================

export class WebhookPayloadDto {
  @ApiProperty({ description: 'Event type' })
  type: string;

  @ApiProperty({ description: 'Event data' })
  data: {
    object: Record<string, unknown>;
  };

  @ApiPropertyOptional({ description: 'Event timestamp' })
  created?: number;
}

// ============================================
// BILLING SUMMARY DTOs
// ============================================

export class BillingSummaryDto {
  @ApiProperty({ type: SubscriptionResponseDto, description: 'Current subscription' })
  subscription: SubscriptionResponseDto | null;

  @ApiPropertyOptional({ description: 'Upcoming invoice' })
  upcomingInvoice?: {
    amount: number;
    currency: string;
    dueDate: Date;
  };

  @ApiProperty({ example: 500.00, description: 'Total spent this month' })
  spentThisMonth: number;

  @ApiPropertyOptional({ description: 'Payment methods' })
  paymentMethods?: PaymentMethodResponseDto[];
}
