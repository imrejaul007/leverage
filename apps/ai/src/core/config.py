"""
Core configuration settings for AI service
"""
import os
import sys
from typing import List, Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # API Settings
    APP_NAME: str = "Leverage AI Service"
    VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))

    # CORS
    CORS_ORIGINS: List[str] = os.getenv(
        "CORS_ORIGINS", "http://localhost:3000,http://localhost:8080"
    ).split(",")

    # OpenAI
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    LLM_MODEL: str = os.getenv("LLM_MODEL", "gpt-4o")
    LLM_TEMPERATURE: float = float(os.getenv("LLM_TEMPERATURE", "0.3"))
    LLM_MAX_TOKENS: int = int(os.getenv("LLM_MAX_TOKENS", "2000"))

    # Anthropic
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")

    # Pinecone
    PINECONE_API_KEY: str = os.getenv("PINECONE_API_KEY", "")
    PINECONE_INDEX: str = os.getenv("PINECONE_INDEX", "leverage-trade")
    PINECONE_ENVIRONMENT: str = os.getenv("PINECONE_ENVIRONMENT", "us-east-1")

    # Weaviate
    WEAVIATE_URL: str = os.getenv("WEAVIATE_URL", "http://localhost:8080")
    WEAVIATE_API_KEY: str = os.getenv("WEAVIATE_API_KEY", "")

    # Qdrant
    QDRANT_URL: str = os.getenv("QDRANT_URL", "http://localhost:6333")
    QDRANT_API_KEY: str = os.getenv("QDRANT_API_KEY", "")

    # Redis (for caching/sessions)
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")

    # Meilisearch
    MEILI_HOST: str = os.getenv("MEILI_HOST", "http://localhost:7700")
    MEILI_API_KEY: str = os.getenv("MEILI_API_KEY", "")

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))
    RATE_LIMIT_PER_HOUR: int = int(os.getenv("RATE_LIMIT_PER_HOUR", "1000"))

    # Document Processing
    MAX_FILE_SIZE_MB: int = int(os.getenv("MAX_FILE_SIZE_MB", "50"))
    CHUNK_SIZE: int = int(os.getenv("CHUNK_SIZE", "1000"))
    CHUNK_OVERLAP: int = int(os.getenv("CHUNK_OVERLAP", "200"))

    # JWT Settings
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_EXPIRATION_HOURS: int = int(os.getenv("JWT_EXPIRATION_HOURS", "24"))

    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

    class Config:
        env_file = ".env"
        case_sensitive = True

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._validate_configuration()

    @property
    def is_production(self) -> bool:
        return not self.DEBUG

    def _validate_configuration(self) -> None:
        """Validate critical configuration settings at startup."""
        errors = []
        warnings = []

        # Check for placeholder/default values
        if self.DEBUG:
            # In development, just warn
            if not self.OPENAI_API_KEY:
                warnings.append("OPENAI_API_KEY not set - AI features will be unavailable")
            if not self.JWT_SECRET_KEY:
                warnings.append("JWT_SECRET_KEY not set - using default (not secure)")
        else:
            # In production, fail fast
            if not self.OPENAI_API_KEY:
                errors.append("OPENAI_API_KEY is required in production")
            if not self.JWT_SECRET_KEY:
                errors.append("JWT_SECRET_KEY is required in production")
            elif len(self.JWT_SECRET_KEY) < 32:
                errors.append("JWT_SECRET_KEY must be at least 32 characters")

        # Validate API key formats if provided
        if self.OPENAI_API_KEY:
            if not self.OPENAI_API_KEY.startswith("sk-"):
                errors.append("OPENAI_API_KEY has an invalid format (should start with 'sk-')")

        if self.ANTHROPIC_API_KEY:
            if not self.ANTHROPIC_API_KEY.startswith("sk-ant-"):
                warnings.append("ANTHROPIC_API_KEY may have an invalid format (should start with 'sk-ant-')")

        # Print warnings
        for warning in warnings:
            print(f"[CONFIG WARNING] {warning}", file=sys.stderr)

        # Exit on critical errors in production
        if errors:
            error_msg = "\n".join([f"[CONFIG ERROR] {e}" for e in errors])
            print(f"[CONFIG ERROR] Configuration validation failed:\n{error_msg}", file=sys.stderr)
            if not self.DEBUG:
                sys.exit(1)
            print("[CONFIG WARNING] Continuing anyway in development mode", file=sys.stderr)


# Global settings instance
settings = Settings()
