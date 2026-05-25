import { Injectable } from '@nestjs/common';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  contentType: string;
  replyToId?: string;
  status: string;
  sentAt: Date;
  readAt?: Date;
  isDeleted?: boolean;
}

interface Conversation {
  id: string;
  participants: string[];
  type: string;
  name?: string;
  lastMessage?: Message;
  lastMessageAt?: Date;
  unreadCounts: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class MessagingService {
  private conversations: Map<string, Conversation> = new Map();
  private messages: Map<string, Message[]> = new Map();
  private idCounter = 0;

  async getConversations(userId: string): Promise<Conversation[]> {
    const result: Conversation[] = [];
    this.conversations.forEach((conv) => {
      if (conv.participants.includes(userId)) {
        const messages = this.messages.get(conv.id) || [];
        const lastMsg = messages[messages.length - 1];
        result.push({
          ...conv,
          lastMessage: lastMsg,
          lastMessageAt: lastMsg?.sentAt,
        });
      }
    });
    return result.sort(
      (a, b) =>
        (b.lastMessageAt?.getTime() || 0) - (a.lastMessageAt?.getTime() || 0),
    );
  }

  async createConversation(
    participants: string[],
    type = 'DIRECT',
    name?: string,
  ): Promise<Conversation> {
    const id = `conv_${++this.idCounter}`;
    const conversation: Conversation = {
      id,
      participants,
      type,
      name,
      unreadCounts: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.conversations.set(id, conversation);
    this.messages.set(id, []);
    return conversation;
  }

  async getConversation(id: string): Promise<Conversation | null> {
    return this.conversations.get(id) || null;
  }

  async getMessages(
    conversationId: string,
    limit = 50,
    offset = 0,
  ): Promise<{ messages: Message[]; total: number }> {
    const messages = this.messages.get(conversationId) || [];
    return {
      messages: messages.slice(offset, offset + limit),
      total: messages.length,
    };
  }

  async sendMessage(
    conversationId: string,
    content: string,
    contentType = 'TEXT',
    replyToId?: string,
  ): Promise<Message> {
    const message: Message = {
      id: `msg_${++this.idCounter}`,
      conversationId,
      senderId: 'current_user',
      content,
      contentType,
      replyToId,
      status: 'SENT',
      sentAt: new Date(),
    };

    const messages = this.messages.get(conversationId) || [];
    messages.push(message);
    this.messages.set(conversationId, messages);

    const conv = this.conversations.get(conversationId);
    if (conv) {
      conv.lastMessageAt = new Date();
      conv.updatedAt = new Date();
    }

    return message;
  }

  async markAsRead(conversationId: string): Promise<{ success: boolean }> {
    const messages = this.messages.get(conversationId) || [];
    messages.forEach((msg) => {
      if (msg.status !== 'READ') {
        msg.status = 'READ';
        msg.readAt = new Date();
      }
    });
    return { success: true };
  }

  async deleteConversation(id: string): Promise<{ success: boolean }> {
    this.conversations.delete(id);
    this.messages.delete(id);
    return { success: true };
  }

  async deleteMessage(messageId: string): Promise<{ success: boolean }> {
    this.messages.forEach((messages) => {
      const msg = messages.find((m) => m.id === messageId);
      if (msg) {
        msg.isDeleted = true;
        msg.content = 'This message was deleted';
      }
    });
    return { success: true };
  }
}
