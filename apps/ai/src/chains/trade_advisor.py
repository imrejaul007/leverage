"""
Trade advisor chain - Main LangChain implementation
"""
from typing import Dict, Any, Optional, List
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationChain
from langchain.callbacks import AsyncCallbackHandler
import os

TRADE_ADVISOR_TEMPLATE = """You are an expert trade compliance advisor for "Leverage by Lerar" - a global trade operating system.

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
- Ask clarifying questions when needed

User Information:
{user_info}

Trade Context:
{trade_context}

Previous Conversation:
{history}

Current Question: {input}

Remember: Provide helpful guidance while recommending official verification for important trade decisions."""

class TradeAdvisorChain:
    """Main trade advisor conversation chain."""

    def __init__(self, session_id: Optional[str] = None):
        self.session_id = session_id or os.urandom(16).hex()
        self.llm = ChatOpenAI(
            model=os.getenv("LLM_MODEL", "gpt-4o"),
            temperature=0.3,
            max_tokens=2000,
            api_key=os.getenv("OPENAI_API_KEY")
        )
        self.prompt = PromptTemplate.from_template(TRADE_ADVISOR_TEMPLATE)
        self.memory = ConversationBufferWindowMemory(k=10, return_messages=True)
        self.chain = ConversationChain(llm=self.llm, prompt=self.prompt, memory=self.memory)

    async def invoke(self, input_text: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Process input and return response."""
        user_info = self._format_user_info(context)
        trade_context = self._format_trade_context(context)
        history = self._get_history()

        response = await self.chain.apredict(
            input=input_text,
            user_info=user_info,
            trade_context=trade_context,
            history=history
        )

        return {
            "response": response,
            "session_id": self.session_id,
            "sources": context.get("sources", []) if context else [],
            "metadata": {"model": self.llm.model_name}
        }

    def _format_user_info(self, context: Optional[Dict[str, Any]]) -> str:
        if not context:
            return "General inquiry (no specific user context)"
        parts = []
        if uid := context.get("user_id"): parts.append(f"User ID: {uid}")
        if cid := context.get("company_id"): parts.append(f"Company ID: {cid}")
        if role := context.get("user_role"): parts.append(f"Role: {role}")
        return "\n".join(parts) if parts else "General inquiry"

    def _format_trade_context(self, context: Optional[Dict[str, Any]]) -> str:
        if not context:
            return "No specific trade context"
        parts = []
        if origin := context.get("origin_country"): parts.append(f"Origin: {origin}")
        if dest := context.get("destination_country"): parts.append(f"Destination: {dest}")
        if incoterms := context.get("incoterms"): parts.append(f"Incoterms: {incoterms}")
        if hs := context.get("hs_code"): parts.append(f"HS Code: {hs}")
        if mode := context.get("transport_mode"): parts.append(f"Transport: {mode}")
        return "\n".join(parts) if parts else "No specific trade context"

    def _get_history(self) -> str:
        messages = self.memory.load_memory_variables({}).get("history", [])
        if not messages:
            return "No previous conversation"
        return "\n".join([f"{m.type}: {m.content}" for m in messages[-5:]])

    def clear(self):
        """Clear conversation memory."""
        self.memory.clear()
