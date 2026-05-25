/**
 * Shared AI Types
 * TypeScript types used across AI services
 */

/** Message role in conversations */
export type MessageRole = 'user' | 'assistant' | 'system';

/** Document types for classification */
export type DocumentType =
  | 'commercial_invoice'
  | 'packing_list'
  | 'bill_of_lading'
  | 'certificate_of_origin'
  | 'customs_declaration'
  | 'insurance_certificate'
  | 'phytosanitary_certificate'
  | 'fumigation_certificate'
  | 'letter_of_credit'
  | 'proforma_invoice'
  | 'bill_of_entry'
  | 'shipping_bill'
  | 'other';

/** Compliance risk levels */
export type ComplianceLevel = 'low' | 'medium' | 'high' | 'critical';

/** Fraud types */
export type FraudType =
  | 'account_takeover'
  | 'payment_fraud'
  | 'identity_theft'
  | 'shipping_fraud'
  | 'sanctions_evasion'
  | 'trade_based_money_laundering'
  | 'phishing'
  | 'fake_listing'
  | 'fake_review';

/** Fraud severity */
export type FraudSeverity = 'low' | 'medium' | 'high' | 'critical';

/** Fraud status */
export type FraudStatus = 'detected' | 'reviewing' | 'confirmed' | 'false_positive' | 'resolved';

/** Chat message */
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

/** Chat context for trade advisor */
export interface ChatContext {
  userId?: string;
  companyId?: string;
  shipmentId?: string;
  tradeRoute?: {
    origin: string;
    destination: string;
  };
  cargoType?: string;
  incoterms?: string;
}

/** Chat request */
export interface ChatRequest {
  message: string;
  conversationId?: string;
  context?: ChatContext;
}

/** Chat response */
export interface ChatResponse {
  message: ChatMessage;
  conversationId: string;
  sources?: Source[];
  confidence?: number;
}

/** Source document for RAG */
export interface Source {
  documentId: string;
  documentType: DocumentType;
  content: string;
  relevanceScore: number;
  pageNumber?: number;
  section?: string;
}

/** Conversation summary */
export interface ConversationSummary {
  id: string;
  title?: string;
  lastMessage?: string;
  messageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/** Full conversation */
export interface Conversation {
  id: string;
  userId: string;
  title?: string;
  context?: ChatContext;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

/** Document metadata */
export interface DocumentMetadata {
  documentType: DocumentType;
  companyId?: string;
  referenceId?: string;
  title?: string;
  description?: string;
  tags?: string[];
}

/** Ingestion result */
export interface IngestionResult {
  documentId: string;
  chunksCreated: number;
  embeddingsCount: number;
  status: 'completed' | 'failed' | 'partial';
  error?: string;
  processingTimeMs?: number;
}

/** Batch ingestion result */
export interface BatchIngestionResult {
  totalFiles: number;
  successful: number;
  failed: number;
  results: IngestionResult[];
  totalProcessingTimeMs?: number;
}

/** Embedding stats */
export interface EmbeddingStats {
  totalDocuments: number;
  totalChunks: number;
  totalEmbeddings: number;
  storageUsedMb: number;
  byDocumentType: Record<string, number>;
  lastUpdated: Date;
}

/** Search request */
export interface SearchRequest {
  query: string;
  filters?: Record<string, unknown>;
  topK?: number;
  includeSources?: boolean;
  documentTypes?: DocumentType[];
}

/** Search result */
export interface SearchResult {
  documentId: string;
  documentType: DocumentType;
  content: string;
  score: number;
  metadata: Record<string, unknown>;
}

/** Search response */
export interface SearchResponse {
  query: string;
  results: SearchResult[];
  totalResults: number;
  processingTimeMs: number;
}

/** HS Code classification result */
export interface ClassificationResult {
  predictedHsCode: string;
  confidence: number;
  description: string;
  category?: string;
  alternativeCodes?: Array<{
    code: string;
    description: string;
  }>;
  restrictions?: string[];
}

/** Compliance advice */
export interface ComplianceAdvice {
  isCompliant: boolean;
  riskLevel: ComplianceLevel;
  summary: string;
  requirements: string[];
  documentsNeeded: DocumentType[];
  warnings: string[];
  recommendedActions: string[];
  sources: string[];
}

/** Entity info for risk assessment */
export interface EntityInfo {
  entityType: string;
  entityId: string;
  name?: string;
  country?: string;
  registrationNumber?: string;
  additionalInfo?: Record<string, unknown>;
}

/** Risk assessment result */
export interface RiskAssessment {
  overallRiskScore: number;
  riskLevel: ComplianceLevel;
  riskFactors: Array<{
    factor: string;
    weight: number;
    detail: string;
  }>;
  redFlags: string[];
  recommendations: string[];
  requiresReview: boolean;
  flaggedFor: FraudType[];
}

/** Fraud signal */
export interface FraudSignal {
  id: string;
  type: FraudType;
  severity: FraudSeverity;
  entityType: string;
  entityId: string;
  description: string;
  evidence?: Record<string, unknown>;
  confidence: number;
  status: FraudStatus;
  createdAt: Date;
}

/** Token usage */
export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
}

/** AI provider type */
export type AIProvider = 'openai' | 'anthropic' | 'local';

/** LLM configuration */
export interface LLMConfig {
  provider: AIProvider;
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

/** Export all types */
export * from './types';
