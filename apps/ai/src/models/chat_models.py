"""
Chat-specific models and helpers
"""

from typing import List, Optional
from datetime import datetime

from pydantic import BaseModel, Field


class ChatSession(BaseModel):
    """Chat session state."""
    session_id: str
    user_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_activity: datetime = Field(default_factory=datetime.utcnow)
    message_count: int = 0
    context: dict = Field(default_factory=dict)


class ChatHistoryEntry(BaseModel):
    """Entry in chat history."""
    role: str
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    metadata: dict = Field(default_factory=dict)


class ChatStreamConfig(BaseModel):
    """Configuration for streaming chat responses."""
    stream: bool = False
    temperature: float = Field(default=0.3, ge=0.0, le=2.0)
    max_tokens: int = Field(default=2000, ge=1, le=4096)
    top_p: float = Field(default=1.0, ge=0.0, le=1.0)
    frequency_penalty: float = Field(default=0.0, ge=-2.0, le=2.0)
    presence_penalty: float = Field(default=0.0, ge=-2.0, le=2.0)


class TradeAdvisorContext(BaseModel):
    """Context for trade advisor conversations."""
    # User info
    user_id: Optional[str] = None
    user_role: Optional[str] = None  # exporter, importer, forwarder, customs_broker

    # Company info
    company_id: Optional[str] = None
    company_type: Optional[str] = None  # manufacturer, trader, distributor

    # Trade context
    origin_country: Optional[str] = None
    destination_country: Optional[str] = None
    transit_countries: List[str] = Field(default_factory=list)

    # Product context
    product_description: Optional[str] = None
    hs_code: Optional[str] = None
    cargo_value: Optional[float] = None
    currency: str = "USD"

    # Logistics context
    transport_mode: Optional[str] = None  # ocean, air, truck, rail
    incoterms: Optional[str] = None
    shipment_id: Optional[str] = None

    # Preferences
    language: str = "en"
    response_format: str = "detailed"  # brief, detailed, technical


class ConversationMemory(BaseModel):
    """Memory for conversation continuity."""
    session_id: str
    recent_messages: List[ChatHistoryEntry] = Field(default_factory=list)
    key_facts: dict = Field(default_factory=dict)
    preferences: dict = Field(default_factory=dict)

    max_history: int = 20

    def add_message(self, role: str, content: str, metadata: dict = None) -> None:
        """Add a message to history."""
        entry = ChatHistoryEntry(
            role=role,
            content=content,
            metadata=metadata or {}
        )
        self.recent_messages.append(entry)

        # Trim history if needed
        if len(self.recent_messages) > self.max_history:
            self.recent_messages = self.recent_messages[-self.max_history:]

    def get_recent_context(self, count: int = 10) -> List[ChatHistoryEntry]:
        """Get recent messages for context."""
        return self.recent_messages[-count:]

    def extract_key_facts(self, message: str) -> None:
        """Extract and store key facts from message."""
        # Simple extraction - could be enhanced with NLP
        keywords = {
            "hs_code": r"HS Code[:\s]+([0-9.]+)",
            "country": r"\b([A-Z]{2})\b",
            "incoterms": r"\b(DDP|FOB|CIF|EXW|CFR|CPT|RAP|DAP|DPU|FCA|CIP)\b",
        }
        # Add extracted facts to self.key_facts
        pass
