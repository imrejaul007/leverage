"""
Chat API endpoints for AI-powered trade advisor
"""

import uuid
from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, HTTPException, BackgroundTasks, Depends, Header
from pydantic import BaseModel

from models.schemas import (
    ChatMessage,
    ChatRequest,
    ChatResponse,
    ConversationSummary,
    Conversation,
    ChatContext,
    Source,
)


router = APIRouter()


# In-memory storage for demo (replace with Redis/DB in production)
conversations_db: dict = {}
messages_db: dict = {}


class ChatDependencies:
    """Dependency injection for chat endpoints."""

    @staticmethod
    def get_user_id(x_user_id: Optional[str] = Header(None)) -> str:
        """Extract user ID from header."""
        if not x_user_id:
            raise HTTPException(status_code=401, detail="User ID required")
        return x_user_id

    @staticmethod
    def get_conversation_id(conversation_id: Optional[str] = None) -> Optional[str]:
        """Get or generate conversation ID."""
        return conversation_id


async def process_chat_message(
    message: str,
    conversation_id: str,
    context: Optional[ChatContext] = None
) -> tuple[str, Optional[List[Source]], float]:
    """
    Process chat message with AI.

    This is a placeholder for actual AI processing.
    In production, this would call the chat_service.
    """
    # Simulated response - replace with actual AI call
    simulated_response = (
        f"Based on your query about: '{message}', "
        "I can help you with trade compliance information. "
        "Please note that for definitive legal advice, you should consult "
        "with a licensed customs broker or trade attorney."
    )

    # Simulated sources
    sources = [
        Source(
            document_id="doc_001",
            document_type="certificate_of_origin",
            content="Certificate of Origin requirements for international trade",
            relevance_score=0.85
        )
    ]

    confidence = 0.75

    return simulated_response, sources, confidence


@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    background_tasks: BackgroundTasks,
    user_id: str = Depends(ChatDependencies.get_user_id)
) -> ChatResponse:
    """
    AI Trade Assistant chat endpoint.

    Process a chat message and return an AI-generated response.
    Supports conversation continuity with conversation_id.
    """
    # Generate conversation ID if not provided
    conversation_id = request.conversation_id or str(uuid.uuid4())

    # Initialize conversation if new
    if conversation_id not in conversations_db:
        conversations_db[conversation_id] = {
            "id": conversation_id,
            "user_id": user_id,
            "title": None,
            "context": request.context.model_dump() if request.context else None,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "message_count": 0
        }
        messages_db[conversation_id] = []

    # Process the message
    try:
        response_content, sources, confidence = await process_chat_message(
            message=request.message,
            conversation_id=conversation_id,
            context=request.context
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI processing failed: {str(e)}")

    # Create user message
    user_message = ChatMessage(
        role="user",
        content=request.message,
        metadata={"timestamp": datetime.utcnow().isoformat()}
    )

    # Create assistant response
    assistant_message = ChatMessage(
        role="assistant",
        content=response_content,
        metadata={
            "sources": [s.model_dump() for s in sources] if sources else [],
            "confidence": confidence,
            "timestamp": datetime.utcnow().isoformat()
        }
    )

    # Store messages
    messages_db[conversation_id].extend([user_message, assistant_message])

    # Update conversation metadata
    conversations_db[conversation_id]["message_count"] += 2
    conversations_db[conversation_id]["updated_at"] = datetime.utcnow()

    # Generate title from first message
    if conversations_db[conversation_id]["message_count"] == 2:
        conversations_db[conversation_id]["title"] = (
            request.message[:50] + "..." if len(request.message) > 50 else request.message
        )

    return ChatResponse(
        message=assistant_message,
        conversation_id=conversation_id,
        sources=sources,
        confidence=confidence
    )


@router.get("/conversations", response_model=List[ConversationSummary])
async def list_conversations(
    user_id: str = Depends(ChatDependencies.get_user_id),
    limit: int = 20,
    offset: int = 0
) -> List[ConversationSummary]:
    """
    List user's chat conversations.

    Returns a paginated list of conversations for the authenticated user.
    """
    user_conversations = [
        conv for conv in conversations_db.values()
        if conv["user_id"] == user_id
    ]

    # Sort by updated_at descending
    user_conversations.sort(key=lambda x: x["updated_at"], reverse=True)

    # Paginate
    paginated = user_conversations[offset:offset + limit]

    # Get last message for each conversation
    result = []
    for conv in paginated:
        conv_messages = messages_db.get(conv["id"], [])
        last_message = None
        if conv_messages:
            last_message = conv_messages[-1].content[:100]

        result.append(ConversationSummary(
            id=conv["id"],
            title=conv.get("title"),
            last_message=last_message,
            message_count=conv["message_count"],
            created_at=conv["created_at"],
            updated_at=conv["updated_at"]
        ))

    return result


@router.get("/conversations/{conversation_id}", response_model=Conversation)
async def get_conversation(
    conversation_id: str,
    user_id: str = Depends(ChatDependencies.get_user_id)
) -> Conversation:
    """
    Get full conversation history.

    Returns all messages in a conversation.
    """
    if conversation_id not in conversations_db:
        raise HTTPException(status_code=404, detail="Conversation not found")

    conv = conversations_db[conversation_id]

    # Verify ownership
    if conv["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Access denied")

    messages = messages_db.get(conversation_id, [])

    context = None
    if conv.get("context"):
        context = ChatContext(**conv["context"])

    return Conversation(
        id=conv["id"],
        user_id=conv["user_id"],
        title=conv.get("title"),
        context=context,
        messages=messages,
        created_at=conv["created_at"],
        updated_at=conv["updated_at"]
    )


@router.delete("/conversations/{conversation_id}")
async def delete_conversation(
    conversation_id: str,
    user_id: str = Depends(ChatDependencies.get_user_id)
) -> dict:
    """
    Delete a conversation.

    Removes the conversation and all associated messages.
    """
    if conversation_id not in conversations_db:
        raise HTTPException(status_code=404, detail="Conversation not found")

    conv = conversations_db[conversation_id]

    # Verify ownership
    if conv["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Access denied")

    # Delete conversation and messages
    del conversations_db[conversation_id]
    if conversation_id in messages_db:
        del messages_db[conversation_id]

    return {"message": "Conversation deleted successfully", "conversation_id": conversation_id}


@router.patch("/conversations/{conversation_id}/title")
async def update_conversation_title(
    conversation_id: str,
    title: str,
    user_id: str = Depends(ChatDependencies.get_user_id)
) -> dict:
    """
    Update conversation title.
    """
    if conversation_id not in conversations_db:
        raise HTTPException(status_code=404, detail="Conversation not found")

    conv = conversations_db[conversation_id]

    if conv["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="Access denied")

    conv["title"] = title[:100]  # Limit title length
    conv["updated_at"] = datetime.utcnow()

    return {"message": "Title updated", "conversation_id": conversation_id, "title": title}
