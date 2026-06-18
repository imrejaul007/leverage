-- CreateEnum
CREATE TYPE "TransportMode" AS ENUM ('OCEAN', 'AIR', 'TRUCK', 'RAIL', 'MULTIMODAL', 'COURIER');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'BOOKED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CarrierType" AS ENUM ('AIRLINE', 'SHIPPING_LINE', 'TRUCKING', 'RAIL', 'COURIER', 'FREIGHT_FORWARDER', 'EXPRESS');

-- CreateEnum
CREATE TYPE "ContainerType" AS ENUM ('FCL_20FT', 'FCL_40FT', 'FCL_40FT_HC', 'FCL_45FT', 'LCL', 'REEFER_20FT', 'REEFER_40FT', 'OPEN_TOP', 'FLAT_RACK', 'TANK', 'BULK');

-- CreateEnum
CREATE TYPE "ContainerStatus" AS ENUM ('BOOKED', 'CONFIRMED', 'EMPTY_PICKED_UP', 'LOADED', 'IN_TRANSIT', 'ARRIVED', 'CUSTOMS_HOLD', 'RELEASED', 'DELIVERED', 'RETURNED');

-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('DRAFT', 'BOOKED', 'PICKED_UP', 'IN_TRANSIT', 'CUSTOMS_CLEARANCE', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'EXCEPTION');

-- CreateEnum
CREATE TYPE "CustomsStatus" AS ENUM ('PENDING', 'SUBMITTED', 'UNDER_REVIEW', 'CLEARED', 'EXAMINED', 'HOLD', 'RELEASED', 'DENIED');

-- CreateEnum
CREATE TYPE "InsuranceStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED', 'CLAIMED');

-- CreateEnum
CREATE TYPE "ClaimStatus" AS ENUM ('NOT_APPLICABLE', 'PENDING', 'UNDER_REVIEW', 'APPROVED', 'DENIED', 'SETTLED');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "FraudType" AS ENUM ('ACCOUNT_TAKEOVER', 'PAYMENT_FRAUD', 'IDENTITY_THEFT', 'SHIPPING_FRAUD', 'SANCTIONS_EVASION', 'TRADE_BASED_MONEY_LAUNDERING', 'PHISHING', 'FAKE_LISTING', 'FAKE_REVIEW');

-- CreateEnum
CREATE TYPE "FraudSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "FraudStatus" AS ENUM ('DETECTED', 'REVIEWING', 'CONFIRMED', 'FALSE_POSITIVE', 'RESOLVED');

-- CreateEnum
CREATE TYPE "AgentType" AS ENUM ('TRADE_ADVISOR', 'COMPLIANCE_CHECKER', 'HS_CLASSIFIER', 'FRAUD_DETECTOR', 'DOCUMENT_EXTRACTOR', 'CUSTOM');

-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('SPONSORED_LISTING', 'BANNER', 'RFQ_PROMOTION', 'BRAND_VIDEO', 'CAROUSEL', 'TEXT_AD', 'INTERSTITIAL');

-- CreateEnum
CREATE TYPE "AdStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'PAUSED', 'RUNNING', 'COMPLETED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BidType" AS ENUM ('CPC', 'CPM', 'CPA', 'FLAT_RATE');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('TRIAL', 'ACTIVE', 'PAST_DUE', 'CANCELLED', 'EXPIRED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'STARTER', 'PROFESSIONAL', 'BUSINESS', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "BillingInterval" AS ENUM ('MONTHLY', 'YEARLY', 'QUARTERLY');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'PENDING', 'PAID', 'OVERDUE', 'CANCELLED', 'REFUNDED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" TEXT NOT NULL DEFAULT 'BUYER',
    "avatar" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "country" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isMfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "mfaSecret" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreightQuote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "carrierId" TEXT NOT NULL,
    "origin" JSONB NOT NULL,
    "destination" JSONB NOT NULL,
    "cargoDetails" JSONB NOT NULL,
    "incoterms" TEXT,
    "transportMode" "TransportMode" NOT NULL,
    "serviceType" TEXT,
    "transitDays" INTEGER,
    "departureDate" TIMESTAMP(3),
    "arrivalDate" TIMESTAMP(3),
    "baseRate" DECIMAL(12,2) NOT NULL,
    "surcharges" JSONB NOT NULL,
    "fuelSurcharge" DECIMAL(10,2) NOT NULL,
    "originCharges" DECIMAL(10,2) NOT NULL,
    "destCharges" DECIMAL(10,2) NOT NULL,
    "totalRate" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "validUntil" TIMESTAMP(3) NOT NULL,
    "quoteData" JSONB NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FreightQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carrier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "CarrierType"[],
    "logo" TEXT,
    "website" TEXT,
    "contactEmail" TEXT,
    "supportPhone" TEXT,
    "apiProvider" TEXT,
    "apiConfig" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "rating" DECIMAL(3,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carrier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContainerBooking" (
    "id" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "containerNumber" TEXT,
    "containerType" "ContainerType" NOT NULL,
    "sealNumber" TEXT,
    "bookingNumber" TEXT,
    "bookingConfirmation" TEXT,
    "carrierBookingRef" TEXT,
    "status" "ContainerStatus" NOT NULL DEFAULT 'BOOKED',
    "vesselName" TEXT,
    "voyageNumber" TEXT,
    "POL" TEXT,
    "POD" TEXT,
    "etd" TIMESTAMP(3),
    "eta" TIMESTAMP(3),
    "atd" TIMESTAMP(3),
    "ata" TIMESTAMP(3),
    "emptyPickupDate" TIMESTAMP(3),
    "cargoReceiptDate" TIMESTAMP(3),
    "releaseDate" TIMESTAMP(3),
    "returnDueDate" TIMESTAMP(3),
    "charges" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContainerBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "carrierId" TEXT,
    "shipmentNumber" TEXT NOT NULL,
    "origin" JSONB NOT NULL,
    "destination" JSONB NOT NULL,
    "cargoDetails" JSONB NOT NULL,
    "incoterms" TEXT NOT NULL,
    "transportMode" "TransportMode" NOT NULL,
    "serviceType" TEXT,
    "status" "ShipmentStatus" NOT NULL DEFAULT 'DRAFT',
    "pickupDate" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "blNumber" TEXT,
    "trackingNumber" TEXT,
    "documents" JSONB,
    "customsStatus" "CustomsStatus" NOT NULL DEFAULT 'PENDING',
    "customsDocs" JSONB,
    "shippingCost" DECIMAL(12,2),
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "insurancePolicyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShipmentTracking" (
    "id" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "carrierId" TEXT,
    "status" TEXT NOT NULL,
    "substatus" TEXT,
    "location" JSONB,
    "coordinates" JSONB,
    "description" TEXT NOT NULL,
    "remarks" TEXT,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShipmentTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsurancePolicy" (
    "id" TEXT NOT NULL,
    "shipmentId" TEXT,
    "policyNumber" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerPolicyId" TEXT,
    "insuredAmount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "premium" DECIMAL(10,2) NOT NULL,
    "cargoDetails" JSONB NOT NULL,
    "coverage" JSONB NOT NULL,
    "beneficiary" JSONB NOT NULL,
    "status" "InsuranceStatus" NOT NULL DEFAULT 'ACTIVE',
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "claimStatus" "ClaimStatus",
    "claimDetails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InsurancePolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiConversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "context" JSONB,
    "lastMessage" TEXT,
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "AiConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "tokens" INTEGER,
    "model" TEXT,
    "citations" JSONB,
    "confidence" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiEmbedding" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "vectorId" TEXT,
    "metadata" JSONB NOT NULL,
    "companyId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FraudSignal" (
    "id" TEXT NOT NULL,
    "type" "FraudType" NOT NULL,
    "severity" "FraudSeverity" NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "evidence" JSONB,
    "confidence" DOUBLE PRECISION NOT NULL,
    "status" "FraudStatus" NOT NULL DEFAULT 'DETECTED',
    "resolvedBy" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "resolution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FraudSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiAgent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AgentType" NOT NULL,
    "description" TEXT,
    "systemPrompt" TEXT NOT NULL,
    "model" TEXT NOT NULL DEFAULT 'gpt-4o',
    "temperature" DOUBLE PRECISION NOT NULL DEFAULT 0.3,
    "maxTokens" INTEGER NOT NULL DEFAULT 2000,
    "tools" JSONB,
    "skills" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiAgent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiSession" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "context" JSONB,
    "metadata" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "tokenUsage" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AiSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsEvent" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "companyId" TEXT,
    "properties" JSONB NOT NULL,
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page" TEXT,
    "referrer" TEXT,

    CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DashboardMetric" (
    "id" TEXT NOT NULL,
    "companyId" TEXT,
    "metricType" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "value" DECIMAL(20,4) NOT NULL,
    "previousValue" DECIMAL(65,30),
    "change" DECIMAL(65,30),
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DashboardMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdCampaign" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AdType" NOT NULL,
    "status" "AdStatus" NOT NULL DEFAULT 'DRAFT',
    "targeting" JSONB NOT NULL,
    "budget" DECIMAL(12,2) NOT NULL,
    "dailyBudget" DECIMAL(65,30),
    "spent" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "bidType" "BidType" NOT NULL DEFAULT 'CPC',
    "bidAmount" DECIMAL(65,30),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdCredit" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "balance" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdCredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'TRIAL',
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "PlanType" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "interval" "BillingInterval" NOT NULL DEFAULT 'MONTHLY',
    "features" JSONB NOT NULL,
    "limits" JSONB NOT NULL,
    "adCredits" DECIMAL(65,30),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "stripePriceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingInvoice" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "stripeInvoiceId" TEXT,
    "amount" DECIMAL(65,30) NOT NULL,
    "tax" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "total" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT',
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "items" JSONB NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BillingInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refreshToken_key" ON "sessions"("refreshToken");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_expiresAt_idx" ON "sessions"("expiresAt");

-- CreateIndex
CREATE INDEX "FreightQuote_userId_idx" ON "FreightQuote"("userId");

-- CreateIndex
CREATE INDEX "FreightQuote_carrierId_idx" ON "FreightQuote"("carrierId");

-- CreateIndex
CREATE INDEX "FreightQuote_status_idx" ON "FreightQuote"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Carrier_code_key" ON "Carrier"("code");

-- CreateIndex
CREATE INDEX "Carrier_code_idx" ON "Carrier"("code");

-- CreateIndex
CREATE INDEX "Carrier_isActive_idx" ON "Carrier"("isActive");

-- CreateIndex
CREATE INDEX "ContainerBooking_shipmentId_idx" ON "ContainerBooking"("shipmentId");

-- CreateIndex
CREATE INDEX "ContainerBooking_containerNumber_idx" ON "ContainerBooking"("containerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_shipmentNumber_key" ON "Shipment"("shipmentNumber");

-- CreateIndex
CREATE INDEX "Shipment_userId_idx" ON "Shipment"("userId");

-- CreateIndex
CREATE INDEX "Shipment_carrierId_idx" ON "Shipment"("carrierId");

-- CreateIndex
CREATE INDEX "Shipment_status_idx" ON "Shipment"("status");

-- CreateIndex
CREATE INDEX "Shipment_shipmentNumber_idx" ON "Shipment"("shipmentNumber");

-- CreateIndex
CREATE INDEX "ShipmentTracking_shipmentId_idx" ON "ShipmentTracking"("shipmentId");

-- CreateIndex
CREATE INDEX "ShipmentTracking_eventTime_idx" ON "ShipmentTracking"("eventTime");

-- CreateIndex
CREATE UNIQUE INDEX "InsurancePolicy_policyNumber_key" ON "InsurancePolicy"("policyNumber");

-- CreateIndex
CREATE INDEX "InsurancePolicy_shipmentId_idx" ON "InsurancePolicy"("shipmentId");

-- CreateIndex
CREATE INDEX "AiConversation_userId_idx" ON "AiConversation"("userId");

-- CreateIndex
CREATE INDEX "AiConversation_createdAt_idx" ON "AiConversation"("createdAt");

-- CreateIndex
CREATE INDEX "AiMessage_conversationId_idx" ON "AiMessage"("conversationId");

-- CreateIndex
CREATE INDEX "AiEmbedding_documentId_idx" ON "AiEmbedding"("documentId");

-- CreateIndex
CREATE INDEX "AiEmbedding_documentType_idx" ON "AiEmbedding"("documentType");

-- CreateIndex
CREATE INDEX "FraudSignal_entityType_entityId_idx" ON "FraudSignal"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "FraudSignal_status_idx" ON "FraudSignal"("status");

-- CreateIndex
CREATE INDEX "FraudSignal_severity_idx" ON "FraudSignal"("severity");

-- CreateIndex
CREATE INDEX "AiAgent_type_idx" ON "AiAgent"("type");

-- CreateIndex
CREATE INDEX "AiAgent_isActive_idx" ON "AiAgent"("isActive");

-- CreateIndex
CREATE INDEX "AiSession_agentId_idx" ON "AiSession"("agentId");

-- CreateIndex
CREATE INDEX "AiSession_userId_idx" ON "AiSession"("userId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_eventType_idx" ON "AnalyticsEvent"("eventType");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_userId_idx" ON "AnalyticsEvent"("userId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_companyId_idx" ON "AnalyticsEvent"("companyId");

-- CreateIndex
CREATE INDEX "AnalyticsEvent_timestamp_idx" ON "AnalyticsEvent"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "DashboardMetric_companyId_metricType_period_date_key" ON "DashboardMetric"("companyId", "metricType", "period", "date");

-- CreateIndex
CREATE INDEX "AdCampaign_companyId_idx" ON "AdCampaign"("companyId");

-- CreateIndex
CREATE INDEX "AdCampaign_status_idx" ON "AdCampaign"("status");

-- CreateIndex
CREATE UNIQUE INDEX "AdCredit_companyId_key" ON "AdCredit"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_companyId_key" ON "Subscription"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_slug_key" ON "Plan"("slug");

-- CreateIndex
CREATE INDEX "Plan_type_idx" ON "Plan"("type");

-- CreateIndex
CREATE UNIQUE INDEX "BillingInvoice_invoiceNumber_key" ON "BillingInvoice"("invoiceNumber");

-- CreateIndex
CREATE INDEX "BillingInvoice_companyId_idx" ON "BillingInvoice"("companyId");

-- CreateIndex
CREATE INDEX "BillingInvoice_status_idx" ON "BillingInvoice"("status");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreightQuote" ADD CONSTRAINT "FreightQuote_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerBooking" ADD CONSTRAINT "ContainerBooking_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "Carrier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipmentTracking" ADD CONSTRAINT "ShipmentTracking_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiMessage" ADD CONSTRAINT "AiMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "AiConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiSession" ADD CONSTRAINT "AiSession_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "AiAgent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
