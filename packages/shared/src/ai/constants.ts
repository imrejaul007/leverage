/**
 * AI System Prompts and Configuration
 * Shared constants for AI services across the platform
 */

export const AI_CONFIG = {
  /** Default LLM model */
  DEFAULT_MODEL: 'gpt-4o',

  /** Fallback model for cost optimization */
  FALLBACK_MODEL: 'gpt-4o-mini',

  /** Temperature settings by use case */
  TEMPERATURE: {
    CREATIVE: 0.8,
    BALANCED: 0.5,
    FACTUAL: 0.2,
    PRECISE: 0.1,
  },

  /** Token limits */
  MAX_TOKENS: {
    SHORT: 500,
    MEDIUM: 1500,
    LONG: 3000,
    EXTENDED: 4096,
  },

  /** Retry settings */
  RETRY: {
    MAX_ATTEMPTS: 3,
    INITIAL_DELAY_MS: 1000,
    MAX_DELAY_MS: 10000,
  },

  /** Embedding settings */
  EMBEDDING: {
    MODEL: 'text-embedding-3-small',
    DIMENSIONS: 1536,
    BATCH_SIZE: 100,
  },
} as const;

/** Trade Advisor System Prompt */
export const TRADE_ADVISOR_PROMPT = `You are an expert trade compliance advisor for "Leverage by Lerar" - a global trade operating system.

Your role is to help users with:
1. Trade compliance questions and regulations
2. Export/import documentation requirements
3. Incoterms guidance and best practices
4. Country-specific trade rules and restrictions
5. HS code classification assistance
6. Customs procedures and clearance

Guidelines:
- Be helpful, accurate, and concise
- Always recommend verifying with official sources for critical decisions
- Do not provide definitive legal advice
- Include disclaimers when discussing regulations
- Cite sources when possible
- Ask clarifying questions when needed`;

/** Document Q&A System Prompt */
export const DOCUMENT_QA_PROMPT = `You are an expert at answering questions about uploaded documents.

Guidelines:
- Use only the information provided in the context
- Quote relevant sections when possible
- If information is not in the documents, clearly state that
- Provide page/section references when available
- Be precise and cite your sources`;

/** HS Code Classification Prompt */
export const HS_CLASSIFIER_PROMPT = `You are an expert customs classifier for the Harmonized System (HS) of tariff classification.

Guidelines:
- Provide the most accurate 6-digit HS code possible
- Include confidence level (0-1)
- List alternative codes if applicable
- Note any restrictions or special requirements
- Reference the official WCO nomenclature`;

/** Compliance Advice Prompt */
export const COMPLIANCE_ADVICE_PROMPT = `You are a trade compliance expert analyzing a potential trade transaction.

Analyze:
- Origin and destination countries
- Product characteristics
- Applicable regulations
- Required documentation
- Potential risks and red flags

Provide:
- Compliance assessment
- Risk level (low/medium/high/critical)
- Required documents
- Recommended actions
- Relevant regulations and sources`;

/** RAG Configuration */
export const RAG_CONFIG = {
  /** Number of documents to retrieve */
  TOP_K: 5,

  /** Minimum relevance score */
  MIN_RELEVANCE_SCORE: 0.7,

  /** Reranking configuration */
  RERANK: {
    ENABLED: true,
    MODEL: 'cross-encoder/ms-marco-MiniLM-L-6-v2',
    TOP_N: 3,
  },

  /** Hybrid search weights */
  HYBRID_SEARCH: {
    VECTOR_WEIGHT: 0.7,
    KEYWORD_WEIGHT: 0.3,
  },
} as const;

/** Fraud Detection Keywords */
export const FRAUD_KEYWORDS = {
  SHELL_COMPANY: [
    'offshore',
    'holdings',
    'investments',
    'trust',
    'global',
    'international',
    'capital',
    'ventures',
    'enterprises',
  ],
  HIGH_RISK_BUSINESS: [
    'crypto',
    'cryptocurrency',
    'bitcoin',
    'forex',
    'money exchange',
    'remittance',
  ],
  SUSPICIOUS_PATTERNS: [
    'round trip',
    'layering',
    'structuring',
    'split transaction',
  ],
} as const;

/** Document Type to AI Task Mapping */
export const DOCUMENT_TASK_MAP = {
  commercial_invoice: 'Extract invoice details, line items, totals, and parties involved.',
  packing_list: 'Extract cargo details, weights, dimensions, and packaging information.',
  bill_of_lading: 'Extract shipping details, vessel, ports, containers, and parties.',
  certificate_of_origin: 'Extract origin certification details and applicable FTA.',
  customs_declaration: 'Extract declaration details, HS codes, values, and duties.',
  insurance_certificate: 'Extract coverage details, insured parties, and policy terms.',
} as const;

/** Export AI constants */
export * from './constants';
