"""
Chat service - LangChain-based chat implementation for trade advisor
"""
from typing import List, Optional, Dict, Any
import os
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationChain

# System prompt for trade advisor
TRADE_ADVISOR_PROMPT = """You are an expert trade compliance advisor for "Leverage by Lerar" - a global trade operating system.

Your role is to help users with:
1. Trade compliance questions and regulations
2. Export/import documentation requirements
3. Incoterms guidance and best practices
4. Country-specific trade rules and restrictions
5. HS code classification assistance
6. Customs procedures and clearance

Context:
{context}

Previous conversation:
{history}

Current question: {input}

IMPORTANT:
- Always recommend users verify critical information with official sources
- Do not provide definitive legal advice
- Include relevant disclaimers when discussing regulations
- Cite sources when possible
- Be clear about uncertainty when information may vary by jurisdiction
"""

class TradeAdvisorChain:
    """Main chat chain for trade advisor."""

    def __init__(self, model_name: str = "gpt-4o", temperature: float = 0.3, max_tokens: int = 2000):
        self.llm = ChatOpenAI(
            model=model_name,
            temperature=temperature,
            max_tokens=max_tokens,
            api_key=os.getenv("OPENAI_API_KEY")
        )
        self.prompt = PromptTemplate.from_template(TRADE_ADVISOR_PROMPT)
        self.memory = ConversationBufferWindowMemory(k=10)
        self.conversation = ConversationChain(llm=self.llm, prompt=self.prompt, memory=self.memory)

    async def chat(self, message: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Process a chat message and return response."""
        context_str = self._format_context(context) if context else "No specific context provided."
        response = await self.conversation.apredict(input=message, context=context_str)
        return {"response": response, "sources": [], "confidence": 0.8}

    def _format_context(self, context: Dict[str, Any]) -> str:
        """Format context dict into readable string."""
        parts = []
        if user_id := context.get("user_id"): parts.append(f"User ID: {user_id}")
        if company_id := context.get("company_id"): parts.append(f"Company ID: {company_id}")
        if origin := context.get("origin_country"): parts.append(f"Origin: {origin}")
        if dest := context.get("destination_country"): parts.append(f"Destination: {dest}")
        if incoterms := context.get("incoterms"): parts.append(f"Incoterms: {incoterms}")
        return "\n".join(parts) if parts else "No specific context provided."

    def clear_history(self):
        """Clear conversation history."""
        self.memory.clear()

    def get_history(self) -> List[Dict[str, str]]:
        """Get conversation history."""
        return self.memory.load_memory_variables({}).get("history", [])


class ConversationManager:
    """Manages multiple conversation sessions."""

    def __init__(self):
        self.conversations: Dict[str, TradeAdvisorChain] = {}

    def get_or_create(self, conversation_id: str) -> TradeAdvisorChain:
        """Get existing conversation or create new one."""
        if conversation_id not in self.conversations:
            self.conversations[conversation_id] = TradeAdvisorChain()
        return self.conversations[conversation_id]

    def delete(self, conversation_id: str) -> bool:
        """Delete a conversation."""
        if conversation_id in self.conversations:
            del self.conversations[conversation_id]
            return True
        return False

    def list_conversations(self) -> List[str]:
        """List all conversation IDs."""
        return list(self.conversations.keys())


# Global instance
conversation_manager = ConversationManager()
