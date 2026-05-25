"""
Leverage by Lerar - AI Service
FastAPI application for AI-powered trade compliance and search
"""

import os
import time
from contextlib import asynccontextmanager
from typing import Callable

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from api.v1.endpoints import chat, embeddings, documents, search, compliance


# Rate limiter setup
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler for startup and shutdown events."""
    # Startup
    print("Starting Leverage AI Service...")
    yield
    # Shutdown
    print("Shutting down Leverage AI Service...")


# Create FastAPI application
app = FastAPI(
    title="Leverage by Lerar - AI Service",
    description="""
    Global Trade Operating System - AI Service

    This service provides:
    - AI-powered trade compliance advisor
    - Semantic document search with RAG
    - Product classification (HS codes)
    - Fraud detection and risk assessment
    - Intelligent document ingestion

    ## Features

    * **Trade Advisor**: AI-powered guidance on export/import regulations
    * **RAG Search**: Retrieval-augmented generation for trade documents
    * **Compliance**: Automated compliance checking and risk assessment
    * **Classification**: HS code classification for products
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# Add rate limiter state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:8080").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GZip compression middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)


# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next: Callable) -> Response:
    """Add processing time header to responses."""
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(round(process_time, 4))
    return response


# Global error handlers
@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError) -> JSONResponse:
    """Handle ValueError exceptions."""
    return JSONResponse(
        status_code=400,
        content={
            "error": "Validation Error",
            "message": str(exc),
            "type": "value_error",
        },
    )


@app.exception_handler(KeyError)
async def key_error_handler(request: Request, exc: KeyError) -> JSONResponse:
    """Handle KeyError exceptions."""
    return JSONResponse(
        status_code=400,
        content={
            "error": "Missing Key",
            "message": f"Missing required key: {exc}",
            "type": "key_error",
        },
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handle unexpected exceptions."""
    # Log the error in production
    print(f"Unhandled exception: {exc}")

    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred. Please try again later.",
            "type": "internal_error",
        },
    )


# Include API routers
app.include_router(
    chat.router,
    prefix="/api/v1/chat",
    tags=["Chat"]
)

app.include_router(
    embeddings.router,
    prefix="/api/v1/embeddings",
    tags=["Embeddings"]
)

app.include_router(
    documents.router,
    prefix="/api/v1/documents",
    tags=["Documents"]
)

app.include_router(
    search.router,
    prefix="/api/v1/search",
    tags=["Search"]
)

app.include_router(
    compliance.router,
    prefix="/api/v1/compliance",
    tags=["Compliance"]
)


# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for service monitoring.

    Returns service status and version information.
    """
    return {
        "status": "healthy",
        "service": "leverage-ai",
        "version": "1.0.0",
        "timestamp": time.time(),
    }


@app.get("/ready", tags=["Health"])
async def readiness_check():
    """
    Readiness check endpoint for Kubernetes probes.

    Verifies that the service is ready to accept traffic.
    """
    # Add additional checks like database connectivity, Redis, etc.
    checks = {
        "service": "ready",
        "version": "1.0.0",
    }

    return {
        "status": "ready",
        "checks": checks,
    }


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with service information."""
    return {
        "service": "Leverage by Lerar - AI Service",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", "8000")),
        reload=os.getenv("DEBUG", "false").lower() == "true",
        log_level=os.getenv("LOG_LEVEL", "info").lower(),
    )
