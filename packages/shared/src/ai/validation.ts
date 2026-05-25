/**
 * AI Output Validation Schemas
 * Zod schemas for validating AI service inputs and outputs
 */

import { z } from 'zod';

// ============================================
// CHAT SCHEMAS
// ============================================

/** Message role enum */
export const MessageRoleSchema = z.enum(['user', 'assistant', 'system']);

/** Chat message schema */
export const ChatMessageSchema = z.object({
  id: z.string().uuid(),
  role: MessageRoleSchema,
  content: z.string().min(1).max(50000),
  metadata: z.record(z.unknown()).optional(),
  createdAt: z.date(),
});

/** Chat context schema */
export const ChatContextSchema = z.object({
  userId: z.string().optional(),
  companyId: z.string().optional(),
  shipmentId: z.string().optional(),
  tradeRoute: z.object({
    origin: z.string().length(2),
    destination: z.string().length(2),
  }).optional(),
  cargoType: z.string().optional(),
  incoterms: z.string().optional(),
});

/** Chat request schema */
export const ChatRequestSchema = z.object({
  message: z.string().min(1).max(10000),
  conversationId: z.string().uuid().optional(),
  context: ChatContextSchema.optional(),
});

/** Source schema */
export const SourceSchema = z.object({
  documentId: z.string(),
  documentType: z.string(),
  content: z.string(),
  relevanceScore: z.number().min(0).max(1),
  pageNumber: z.number().int().positive().optional(),
  section: z.string().optional(),
});

/** Chat response schema */
export const ChatResponseSchema = z.object({
  message: ChatMessageSchema,
  conversationId: z.string().uuid(),
  sources: z.array(SourceSchema).optional(),
  confidence: z.number().min(0).max(1).optional(),
});

// ============================================
// DOCUMENT SCHEMAS
// ============================================

/** Document type enum */
export const DocumentTypeSchema = z.enum([
  'commercial_invoice',
  'packing_list',
  'bill_of_lading',
  'certificate_of_origin',
  'customs_declaration',
  'insurance_certificate',
  'phytosanitary_certificate',
  'fumigation_certificate',
  'letter_of_credit',
  'proforma_invoice',
  'bill_of_entry',
  'shipping_bill',
  'other',
]);

/** Document metadata schema */
export const DocumentMetadataSchema = z.object({
  documentType: DocumentTypeSchema,
  companyId: z.string().optional(),
  referenceId: z.string().optional(),
  title: z.string().max(500).optional(),
  description: z.string().max(2000).optional(),
  tags: z.array(z.string()).max(20).optional(),
});

/** Ingestion result schema */
export const IngestionResultSchema = z.object({
  documentId: z.string().uuid(),
  chunksCreated: z.number().int().nonnegative(),
  embeddingsCount: z.number().int().nonnegative(),
  status: z.enum(['completed', 'failed', 'partial']),
  error: z.string().optional(),
  processingTimeMs: z.number().positive().optional(),
});

/** Batch ingestion result schema */
export const BatchIngestionResultSchema = z.object({
  totalFiles: z.number().int().positive(),
  successful: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  results: z.array(IngestionResultSchema),
  totalProcessingTimeMs: z.number().positive().optional(),
});

/** Embedding stats schema */
export const EmbeddingStatsSchema = z.object({
  totalDocuments: z.number().int().nonnegative(),
  totalChunks: z.number().int().nonnegative(),
  totalEmbeddings: z.number().int().nonnegative(),
  storageUsedMb: z.number().nonnegative(),
  byDocumentType: z.record(z.string(), z.number().int()),
  lastUpdated: z.date(),
});

// ============================================
// SEARCH SCHEMAS
// ============================================

/** Search request schema */
export const SearchRequestSchema = z.object({
  query: z.string().min(1).max(1000),
  filters: z.record(z.unknown()).optional(),
  topK: z.number().int().min(1).max(100).default(10),
  includeSources: z.boolean().default(true),
  documentTypes: z.array(DocumentTypeSchema).optional(),
});

/** Search result schema */
export const SearchResultSchema = z.object({
  documentId: z.string(),
  documentType: DocumentTypeSchema,
  content: z.string(),
  score: z.number().min(0).max(1),
  metadata: z.record(z.unknown()),
});

/** Search response schema */
export const SearchResponseSchema = z.object({
  query: z.string(),
  results: z.array(SearchResultSchema),
  totalResults: z.number().int().nonnegative(),
  processingTimeMs: z.number().nonnegative(),
});

// ============================================
// COMPLIANCE SCHEMAS
// ============================================

/** Compliance level enum */
export const ComplianceLevelSchema = z.enum(['low', 'medium', 'high', 'critical']);

/** Classification result schema */
export const ClassificationResultSchema = z.object({
  predictedHsCode: z.string().regex(/^\d{4}\.\d{2}(\.\d{4})?$/),
  confidence: z.number().min(0).max(1),
  description: z.string(),
  category: z.string().optional(),
  alternativeCodes: z.array(z.object({
    code: z.string(),
    description: z.string(),
  })).optional(),
  restrictions: z.array(z.string()).optional(),
});

/** Compliance advice schema */
export const ComplianceAdviceSchema = z.object({
  isCompliant: z.boolean(),
  riskLevel: ComplianceLevelSchema,
  summary: z.string(),
  requirements: z.array(z.string()),
  documentsNeeded: z.array(DocumentTypeSchema),
  warnings: z.array(z.string()),
  recommendedActions: z.array(z.string()),
  sources: z.array(z.string()),
});

/** Entity info schema */
export const EntityInfoSchema = z.object({
  entityType: z.string().min(1),
  entityId: z.string().min(1),
  name: z.string().optional(),
  country: z.string().length(2).optional(),
  registrationNumber: z.string().optional(),
  additionalInfo: z.record(z.unknown()).optional(),
});

/** Risk factor schema */
const RiskFactorSchema = z.object({
  factor: z.string(),
  weight: z.number().min(0).max(1),
  detail: z.string(),
});

/** Fraud type enum */
export const FraudTypeSchema = z.enum([
  'account_takeover',
  'payment_fraud',
  'identity_theft',
  'shipping_fraud',
  'sanctions_evasion',
  'trade_based_money_laundering',
  'phishing',
  'fake_listing',
  'fake_review',
]);

/** Risk assessment schema */
export const RiskAssessmentSchema = z.object({
  overallRiskScore: z.number().min(0).max(1),
  riskLevel: ComplianceLevelSchema,
  riskFactors: z.array(RiskFactorSchema),
  redFlags: z.array(z.string()),
  recommendations: z.array(z.string()),
  requiresReview: z.boolean(),
  flaggedFor: z.array(FraudTypeSchema),
});

// ============================================
// FRAUD SCHEMAS
// ============================================

/** Fraud severity enum */
export const FraudSeveritySchema = z.enum(['low', 'medium', 'high', 'critical']);

/** Fraud status enum */
export const FraudStatusSchema = z.enum(['detected', 'reviewing', 'confirmed', 'false_positive', 'resolved']);

/** Fraud signal schema */
export const FraudSignalSchema = z.object({
  id: z.string().uuid(),
  type: FraudTypeSchema,
  severity: FraudSeveritySchema,
  entityType: z.string(),
  entityId: z.string(),
  description: z.string(),
  evidence: z.record(z.unknown()).optional(),
  confidence: z.number().min(0).max(1),
  status: FraudStatusSchema,
  createdAt: z.date(),
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Validate chat request
 */
export function validateChatRequest(data: unknown) {
  return ChatRequestSchema.safeParse(data);
}

/**
 * Validate search request
 */
export function validateSearchRequest(data: unknown) {
  return SearchRequestSchema.safeParse(data);
}

/**
 * Validate compliance advice response
 */
export function validateComplianceAdvice(data: unknown) {
  return ComplianceAdviceSchema.safeParse(data);
}

/**
 * Validate classification result
 */
export function validateClassification(data: unknown) {
  return ClassificationResultSchema.safeParse(data);
}

/**
 * Validate entity info for risk assessment
 */
export function validateEntityInfo(data: unknown) {
  return EntityInfoSchema.safeParse(data);
}

/**
 * Validate risk assessment result
 */
export function validateRiskAssessment(data: unknown) {
  return RiskAssessmentSchema.safeParse(data);
}

/**
 * Sanitize user message for AI processing
 */
export function sanitizeMessage(message: string): string {
  return message
    .trim()
    .slice(0, 10000)
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Validate country codes (ISO 3166-1 alpha-2)
 */
export function isValidCountryCode(code: string): boolean {
  return /^[A-Z]{2}$/.test(code.toUpperCase());
}

/**
 * Validate HS code format
 */
export function isValidHSCode(code: string): boolean {
  return /^\d{4}(\.\d{2}){1,2}$/.test(code);
}
