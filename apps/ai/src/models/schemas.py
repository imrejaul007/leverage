"""
Pydantic models for AI service schemas
"""

from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field, field_validator


# ============================================
# ENUMS
# ============================================

class DocumentType(str, Enum):
    """Document types for classification."""
    COMMERCIAL_INVOICE = "commercial_invoice"
    PACKING_LIST = "packing_list"
    BILL_OF_LADING = "bill_of_lading"
    CERTIFICATE_OF_ORIGIN = "certificate_of_origin"
    CUSTOMS_DECLARATION = "customs_declaration"
    INSURANCE_CERTIFICATE = "insurance_certificate"
    PACKING_DECLARATION = "packing_declaration"
    PHYTOSANITARY_CERTIFICATE = "phytosanitary_certificate"
    FUMIGATION_CERTIFICATE = "fumigation_certificate"
    LETTER_OF_CREDIT = "letter_of_credit"
    PROFORMA_INVOICE = "proforma_invoice"
    BILL_OF_ENTRY = "bill_of_entry"
    SHIPPING_BILL = "shipping_bill"
    CUSTOMS_PERMIT = "customs_permit"
    IMPORT_LICENSE = "import_license"
    EXPORT_LICENSE = "export_license"
    OTHER = "other"


class MessageRole(str, Enum):
    """Message roles in conversations."""
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class ComplianceLevel(str, Enum):
    """Compliance risk levels."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class FraudType(str, Enum):
    """Types of fraud."""
    ACCOUNT_TAKEOVER = "account_takeover"
    PAYMENT_FRAUD = "payment_fraud"
    IDENTITY_THEFT = "identity_theft"
    SHIPPING_FRAUD = "shipping_fraud"
    SANCTIONS_EVASION = "sanctions_evasion"
    TRADE_BASED_MONEY_LAUNDERING = "trade_based_money_laundering"
    PHISHING = "phishing"
    FAKE_LISTING = "fake_listing"
    FAKE_REVIEW = "fake_review"


class FraudSeverity(str, Enum):
    """Fraud severity levels."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class FraudStatus(str, Enum):
    """Fraud investigation status."""
    DETECTED = "detected"
    REVIEWING = "reviewing"
    CONFIRMED = "confirmed"
    FALSE_POSITIVE = "false_positive"
    RESOLVED = "resolved"


# ============================================
# CHAT MODELS
# ============================================

class ChatMessage(BaseModel):
    """A single chat message."""
    role: Literal["user", "assistant"]
    content: str
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)


class ChatContext(BaseModel):
    """Context information for chat."""
    user_id: Optional[str] = None
    company_id: Optional[str] = None
    shipment_id: Optional[str] = None
    trade_route: Optional[Dict[str, str]] = None  # {origin, destination}
    cargo_type: Optional[str] = None
    incoterms: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "user_123",
                "company_id": "company_456",
                "trade_route": {"origin": "CN", "destination": "US"},
                "cargo_type": "Electronics",
                "incoterms": "DDP"
            }
        }


class ChatRequest(BaseModel):
    """Request model for chat endpoint."""
    message: str = Field(..., min_length=1, max_length=10000)
    conversation_id: Optional[str] = None
    context: Optional[ChatContext] = None

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        """Validate and clean message."""
        if not v.strip():
            raise ValueError("Message cannot be empty or whitespace only")
        return v.strip()


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""
    message: ChatMessage
    conversation_id: str
    sources: Optional[List["Source"]] = Field(default_factory=list)
    confidence: Optional[float] = Field(default=None, ge=0.0, le=1.0)


class ConversationSummary(BaseModel):
    """Summary of a conversation for listing."""
    id: str
    title: Optional[str] = None
    last_message: Optional[str] = None
    message_count: int = 0
    created_at: datetime
    updated_at: datetime


class Conversation(BaseModel):
    """Full conversation with all messages."""
    id: str
    user_id: str
    title: Optional[str] = None
    context: Optional[ChatContext] = None
    messages: List[ChatMessage] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime


class Source(BaseModel):
    """Source document for RAG responses."""
    document_id: str
    document_type: DocumentType
    content: str
    relevance_score: float = Field(ge=0.0, le=1.0)
    page_number: Optional[int] = None
    section: Optional[str] = None


# ============================================
# EMBEDDING MODELS
# ============================================

class DocumentMetadata(BaseModel):
    """Metadata for document ingestion."""
    document_type: DocumentType = DocumentType.OTHER
    company_id: Optional[str] = None
    reference_id: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    tags: List[str] = Field(default_factory=list)

    class Config:
        json_schema_extra = {
            "example": {
                "document_type": "commercial_invoice",
                "company_id": "company_123",
                "reference_id": "INV-2024-001",
                "title": "Commercial Invoice - Electronics Shipment",
                "tags": ["electronics", "import", "china"]
            }
        }


class IngestionResult(BaseModel):
    """Result of document ingestion."""
    document_id: str
    chunks_created: int
    embeddings_count: int
    status: Literal["completed", "failed", "partial"]
    error: Optional[str] = None
    processing_time_ms: Optional[float] = None


class BatchIngestionResult(BaseModel):
    """Result of batch document ingestion."""
    total_files: int
    successful: int
    failed: int
    results: List[IngestionResult]
    total_processing_time_ms: Optional[float] = None


class EmbeddingStats(BaseModel):
    """Statistics about embeddings."""
    total_documents: int
    total_chunks: int
    total_embeddings: int
    storage_used_mb: float
    by_document_type: Dict[str, int]
    last_updated: datetime


# ============================================
# SEARCH MODELS
# ============================================

class SearchRequest(BaseModel):
    """Search request model."""
    query: str = Field(..., min_length=1, max_length=1000)
    filters: Optional[Dict[str, Any]] = None
    top_k: int = Field(default=10, ge=1, le=100)
    include_sources: bool = True
    document_types: Optional[List[DocumentType]] = None


class SearchResult(BaseModel):
    """Single search result."""
    document_id: str
    document_type: DocumentType
    content: str
    score: float = Field(ge=0.0, le=1.0)
    metadata: Dict[str, Any] = Field(default_factory=dict)


class SearchResponse(BaseModel):
    """Search response with multiple results."""
    query: str
    results: List[SearchResult]
    total_results: int
    processing_time_ms: float


# ============================================
# COMPLIANCE MODELS
# ============================================

class ClassificationResult(BaseModel):
    """HS code classification result."""
    predicted_hs_code: str
    confidence: float = Field(ge=0.0, le=1.0)
    description: str
    alternative_codes: List[Dict[str, Any]] = Field(default_factory=list)
    category: Optional[str] = None
    restrictions: List[str] = Field(default_factory=list)


class ComplianceAdvice(BaseModel):
    """Compliance advice result."""
    is_compliant: bool
    risk_level: ComplianceLevel
    summary: str
    requirements: List[str] = Field(default_factory=list)
    recommended_actions: List[str] = Field(default_factory=list)
    documents_needed: List[DocumentType] = Field(default_factory=list)
    warnings: List[str] = Field(default_factory=list)
    sources: List[str] = Field(default_factory=list)


class RiskAssessment(BaseModel):
    """Risk assessment result."""
    overall_risk_score: float = Field(ge=0.0, le=1.0)
    risk_level: ComplianceLevel
    risk_factors: List[Dict[str, Any]] = Field(default_factory=list)
    red_flags: List[str] = Field(default_factory=list)
    recommendations: List[str] = Field(default_factory=list)
    requires_review: bool = False
    flagged_for: List[FraudType] = Field(default_factory=list)


class EntityInfo(BaseModel):
    """Entity information for risk assessment."""
    entity_type: str  # user, company, shipment, etc.
    entity_id: str
    name: Optional[str] = None
    country: Optional[str] = None
    registration_number: Optional[str] = None
    additional_info: Dict[str, Any] = Field(default_factory=dict)


# ============================================
# FRAUD DETECTION MODELS
# ============================================

class FraudSignal(BaseModel):
    """Fraud signal detected."""
    id: str
    type: FraudType
    severity: FraudSeverity
    entity_type: str
    entity_id: str
    description: str
    evidence: Optional[Dict[str, Any]] = None
    confidence: float = Field(ge=0.0, le=1.0)
    status: FraudStatus = FraudStatus.DETECTED
    created_at: datetime


# ============================================
# TOKEN USAGE MODELS
# ============================================

class TokenUsage(BaseModel):
    """Token usage statistics."""
    prompt_tokens: int = 0
    completion_tokens: int = 0
    total_tokens: int = 0
    estimated_cost_usd: float = 0.0


# Update forward references
ChatResponse.model_rebuild()
