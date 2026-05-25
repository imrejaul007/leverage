"""
Search API endpoints
"""
import time
from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends
from models.schemas import SearchRequest, SearchResponse, SearchResult, DocumentType

router = APIRouter()
search_index: dict = {}

async def perform_semantic_search(query: str, top_k: int = 10, filters: dict = None, document_types: List[DocumentType] = None) -> List[SearchResult]:
    results = []
    query_lower = query.lower()
    for doc_id, doc in search_index.items():
        if query_lower in doc.get("content", "").lower():
            if document_types and doc.get("document_type") not in [dt.value for dt in document_types]:
                continue
            results.append(SearchResult(document_id=doc_id, document_type=DocumentType(doc.get("document_type", "other")), content=doc.get("content", "")[:500], score=0.85, metadata=doc.get("metadata", {})))
            if len(results) >= top_k:
                break
    return results

@router.post("/semantic", response_model=SearchResponse)
async def semantic_search(request: SearchRequest) -> SearchResponse:
    start_time = time.time()
    results = await perform_semantic_search(query=request.query, top_k=request.top_k, filters=request.filters, document_types=request.document_types)
    return SearchResponse(query=request.query, results=results, total_results=len(results), processing_time_ms=(time.time() - start_time) * 1000)

@router.get("/suggest")
async def search_suggest(q: str, limit: int = 5):
    suggestions = []
    q_lower = q.lower()
    seen = set()
    for doc in search_index.values():
        title = doc.get("title", "").lower()
        if q_lower in title and title not in seen:
            suggestions.append({"text": doc.get("title"), "document_id": doc.get("id")})
            seen.add(title)
            if len(suggestions) >= limit:
                break
    return {"suggestions": suggestions}

@router.post("/index")
async def index_document(document_id: str, content: str, title: Optional[str] = None, document_type: DocumentType = DocumentType.OTHER, metadata: Optional[dict] = None):
    search_index[document_id] = {"id": document_id, "content": content, "title": title, "document_type": document_type.value, "metadata": metadata or {}, "indexed_at": time.time()}
    return {"message": "Document indexed", "document_id": document_id}

@router.delete("/index/{document_id}")
async def remove_from_index(document_id: str):
    if document_id in search_index:
        del search_index[document_id]
        return {"message": "Document removed", "document_id": document_id}
    raise HTTPException(status_code=404, detail="Document not found")

@router.get("/health")
async def search_health():
    return {"status": "healthy", "indexed_documents": len(search_index)}
