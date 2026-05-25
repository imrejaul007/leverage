"""
Document Q&A chain - RAG-based document question answering
"""
from typing import List, Dict, Any, Optional
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.schema import Document
import os

DOCUMENT_QA_TEMPLATE = """Use the following pieces of context to answer the question at the end. If you don't know the answer, say that you don't know.

Context from documents:
{context}

Question: {question}

Provide your answer based on the context above. If the context doesn't contain enough information to answer, acknowledge that limitation."""

class DocumentQAChain:
    """Chain for question-answering over documents."""

    def __init__(self, retriever=None):
        self.llm = ChatOpenAI(
            model=os.getenv("LLM_MODEL", "gpt-4o"),
            temperature=0.2,
            api_key=os.getenv("OPENAI_API_KEY")
        )
        self.embeddings = OpenAIEmbeddings(api_key=os.getenv("OPENAI_API_KEY"))
        self.prompt = PromptTemplate.from_template(DOCUMENT_QA_TEMPLATE)
        self.retriever = retriever

    async def invoke(self, question: str, documents: Optional[List[Document]] = None) -> Dict[str, Any]:
        """Answer question about documents."""
        if not documents and not self.retriever:
            return {
                "answer": "No documents provided for question answering.",
                "sources": [],
                "confidence": 0.0
            }

        # Get documents from retriever if not provided
        if not documents and self.retriever:
            documents = await self.retriever.aget_relevant_documents(question)

        if not documents:
            return {
                "answer": "No relevant documents found for this question.",
                "sources": [],
                "confidence": 0.0
            }

        # Format context
        context_parts = []
        for i, doc in enumerate(documents):
            source = doc.metadata.get("source", "Unknown")
            page = doc.metadata.get("page", "")
            context_parts.append(f"[Document {i+1} ({source}, page {page})]:\n{doc.page_content}")

        context = "\n\n".join(context_parts)
        formatted_prompt = self.prompt.format(context=context, question=question)

        # Generate answer
        try:
            answer = await self.llm.apredict(formatted_prompt)
            return {
                "answer": answer,
                "sources": [
                    {
                        "content": doc.page_content[:200] + "...",
                        "source": doc.metadata.get("source", "Unknown"),
                        "page": doc.metadata.get("page"),
                        "relevance": doc.metadata.get("relevance", 0.0)
                    }
                    for doc in documents[:3]
                ],
                "confidence": 0.8,
                "documents_used": len(documents)
            }
        except Exception as e:
            return {
                "answer": f"Error generating answer: {str(e)}",
                "sources": [],
                "confidence": 0.0
            }

    async def aget_relevant_documents(self, query: str, top_k: int = 5) -> List[Document]:
        """Get relevant documents for query."""
        if not self.retriever:
            return []
        return await self.retriever.aget_relevant_documents(query, k=top_k)
