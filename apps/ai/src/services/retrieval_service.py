"""
Retrieval service - RAG retrieval operations
"""
from typing import List, Optional, Dict, Any
import os
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_pinecone import PineconeVectorStore
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

RETRIEVAL_PROMPT = """Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

{context}

Question: {question}
Answer:"""

class RAGRetrieval:
    """RAG retrieval for document Q&A."""

    def __init__(self):
        self.embeddings = OpenAIEmbeddings(api_key=os.getenv("OPENAI_API_KEY"))
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0.3, api_key=os.getenv("OPENAI_API_KEY"))
        self.prompt = PromptTemplate.from_template(RETRIEVAL_PROMPT)
        self._vectorstore = None

    @property
    def vectorstore(self) -> Optional[PineconeVectorStore]:
        if self._vectorstore is None and os.getenv("PINECONE_API_KEY"):
            try:
                self._vectorstore = PineconeVectorStore(
                    index_name=os.getenv("PINECONE_INDEX", "leverage-trade"),
                    embedding=self.embeddings,
                    pinecone_api_key=os.getenv("PINECONE_API_KEY")
                )
            except Exception as e:
                print(f"Failed to initialize Pinecone: {e}")
        return self._vectorstore

    async def retrieve(self, query: str, top_k: int = 5, filters: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
        """Retrieve relevant documents for query."""
        if not self.vectorstore:
            return []
        try:
            docs = self.vectorstore.similarity_search(query, k=top_k, filter=filters)
            return [{"content": doc.page_content, "metadata": doc.metadata} for doc in docs]
        except Exception as e:
            print(f"Retrieval failed: {e}")
            return []

    async def aquery(self, question: str, documents: Optional[List[Dict[str, Any]]] = None) -> Dict[str, Any]:
        """Answer question about documents."""
        if not documents:
            documents = await self.retrieve(question)
        if not documents:
            return {"answer": "No relevant documents found.", "sources": []}
        context = "\n\n".join([f"Document {i+1}:\n{d['content']}" for i, d in enumerate(documents)])
        formatted_prompt = self.prompt.format(context=context, question=question)
        try:
            response = await self.llm.apredict(formatted_prompt)
            return {
                "answer": response,
                "sources": documents[:3],
                "confidence": 0.8
            }
        except Exception as e:
            return {"answer": f"Error: {str(e)}", "sources": [], "confidence": 0.0}


# Global instance
rag_retrieval = RAGRetrieval()
