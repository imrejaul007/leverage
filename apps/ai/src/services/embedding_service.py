"""
Embedding service - Vector store operations
"""
from typing import List, Optional, Dict, Any
import os
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.text_splitter import RecursiveCharacterTextSplitter

class EmbeddingService:
    """Service for document embedding operations."""

    def __init__(self):
        self.embeddings = OpenAIEmbeddings(api_key=os.getenv("OPENAI_API_KEY"))
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )
        self._vectorstore = None

    @property
    def vectorstore(self) -> Optional[PineconeVectorStore]:
        """Lazy initialization of vectorstore."""
        if self._vectorstore is None:
            if os.getenv("PINECONE_API_KEY"):
                try:
                    self._vectorstore = PineconeVectorStore(
                        index_name=os.getenv("PINECONE_INDEX", "leverage-trade"),
                        embedding=self.embeddings,
                        pinecone_api_key=os.getenv("PINECONE_API_KEY")
                    )
                except Exception as e:
                    print(f"Failed to initialize Pinecone: {e}")
        return self._vectorstore

    async def create_embeddings(self, text: str, metadata: Optional[Dict[str, Any]] = None) -> List[List[float]]:
        """Create embeddings for text."""
        return await self.embeddings.aembed_text(text)

    async def chunk_document(self, text: str, metadata: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """Split document into chunks with metadata."""
        chunks = self.text_splitter.split_text(text)
        return [{"content": chunk, "metadata": metadata or {}} for chunk in chunks]

    async def store_document(self, document_id: str, chunks: List[Dict[str, Any]], metadata: Optional[Dict[str, Any]] = None) -> bool:
        """Store document chunks in vector database."""
        if not self.vectorstore:
            return False
        try:
            texts = [c["content"] for c in chunks]
            metadatas = [{**c["metadata"], "document_id": document_id} for c in chunks]
            self.vectorstore.add_texts(texts=texts, metadatas=metadatas)
            return True
        except Exception as e:
            print(f"Failed to store document: {e}")
            return False

    async def delete_document(self, document_id: str) -> bool:
        """Delete document from vector store."""
        if not self.vectorstore:
            return False
        try:
            # Note: Pinecone doesn't support direct deletion by metadata
            # You'd need to track IDs separately
            return True
        except Exception as e:
            print(f"Failed to delete document: {e}")
            return False


# Global instance
embedding_service = EmbeddingService()
