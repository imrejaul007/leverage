import { Injectable, Logger, ForbiddenException } from '@nestjs/common';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: Date;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  messageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface AiResponse {
  message: { role: string; content: string };
  conversationId: string;
  sources: string[];
  confidence: number;
}

interface ComplianceAdviceResponse {
  advice: string;
  risks: string[];
  recommendations: string[];
  sources: string[];
  confidence: number;
}

interface ClassificationResponse {
  suggestedCodes: Array<{ code: string; description: string; confidence: number }>;
  confidence: number;
  explanation: string;
}

interface IngestResponse {
  documentId: string;
  chunksCreated: number;
  embeddingsCount: number;
  status: string;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private conversations: Map<string, ChatMessage[]> = new Map();
  private userConversations: Map<string, Set<string>> = new Map();

  async chat(message: string, conversationId?: string, userId?: string): Promise<AiResponse> {
    const convId = conversationId || `conv_${userId || 'anonymous'}_${Date.now()}`;

    if (!this.conversations.has(convId)) {
      this.conversations.set(convId, []);
      if (userId) {
        if (!this.userConversations.has(userId)) {
          this.userConversations.set(userId, new Set());
        }
        this.userConversations.get(userId).add(convId);
      }
    }

    const messages = this.conversations.get(convId);
    if (!messages) throw new Error('Failed to create conversation');

    messages.push({ role: 'user', content: message, createdAt: new Date() });

    const response = this.generateResponse(message);
    messages.push({ role: 'assistant', content: response, createdAt: new Date() });

    return {
      message: { role: 'assistant', content: response },
      conversationId: convId,
      sources: [],
      confidence: 0.85,
    };
  }

  async getConversations(userId: string): Promise<Conversation[]> {
    const userConvs = this.userConversations.get(userId);
    if (!userConvs) return [];

    const result: Conversation[] = [];
    userConvs.forEach(convId => {
      const messages = this.conversations.get(convId);
      if (messages && messages.length > 0) {
        result.push({
          id: convId,
          title: messages[0].content.substring(0, 50),
          lastMessage: messages[messages.length - 1].content,
          messageCount: messages.length,
          createdAt: messages[0].createdAt || new Date(),
          updatedAt: messages[messages.length - 1].createdAt || new Date(),
        });
      }
    });
    return result;
  }

  async getConversation(id: string, userId?: string): Promise<{ id: string; messages: ChatMessage[] }> {
    const convId = id;

    if (userId) {
      const userConvs = this.userConversations.get(userId);
      if (!userConvs || !userConvs.has(convId)) {
        throw new ForbiddenException('Conversation not found or access denied');
      }
    }

    const messages = this.conversations.get(convId) || [];
    return { id: convId, messages };
  }

  async addMessage(
    conversationId: string,
    userId: string,
    role: string,
    content: string,
  ): Promise<{ userMessage: ChatMessage; assistantMessage?: ChatMessage }> {
    const userConvs = this.userConversations.get(userId);
    if (!userConvs || !userConvs.has(conversationId)) {
      throw new ForbiddenException('Conversation not found or access denied');
    }

    if (!this.conversations.has(conversationId)) {
      throw new Error('Conversation not found');
    }

    const messages = this.conversations.get(conversationId);
    if (!messages) throw new Error('Failed to get conversation');

    const validRole = ['user', 'assistant', 'system'].includes(role) ? role as 'user' | 'assistant' | 'system' : 'user';
    messages.push({ role: validRole, content, createdAt: new Date() });

    if (role === 'user') {
      const response = this.generateResponse(content);
      messages.push({
        role: 'assistant',
        content: response,
        createdAt: new Date(),
      });
      return {
        userMessage: { role, content },
        assistantMessage: { role: 'assistant', content: response },
      };
    }

    return { userMessage: { role: validRole, content } };
  }

  async getComplianceAdvice(
    productDescription: string,
    originCountry: string,
    destinationCountry: string,
  ): Promise<ComplianceAdviceResponse> {
    return {
      advice: `Based on the product "${productDescription}" from ${originCountry} to ${destinationCountry}, the following compliance requirements apply.`,
      risks: [
        'Import license may be required',
        'Check for restricted items list',
        'Verify HS code classification',
      ],
      recommendations: [
        'Classify product with correct HS code',
        'Obtain necessary import licenses',
        'Prepare Certificate of Origin',
        'Arrange customs clearance',
      ],
      sources: ['DGFT Guidelines', 'Customs Tariff Act', 'WTO Trade Agreements'],
      confidence: 0.85,
    };
  }

  async classifyProduct(description: string): Promise<ClassificationResponse> {
    const mockCodes = [
      { code: '8471.30', description: 'Portable digital computers', confidence: 0.92 },
      { code: '8517.12', description: 'Telephones for cellular networks', confidence: 0.78 },
      { code: '6204.62', description: "Women's trousers of cotton", confidence: 0.65 },
    ];

    return {
      suggestedCodes: mockCodes,
      confidence: 0.85,
      explanation: `Based on "${description}", these HS codes are most likely matches.`,
    };
  }

  async ingestDocument(
    documentId: string,
    content: string,
    metadata?: Record<string, unknown>,
  ): Promise<IngestResponse> {
    return {
      documentId,
      chunksCreated: Math.ceil(content.length / 500),
      embeddingsCount: Math.ceil(content.length / 500),
      status: 'completed',
    };
  }

  private generateResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('duty') || lowerMessage.includes('tariff')) {
      return 'For duty calculations, I need the HS code, product value, and destination country. Would you like me to help classify your product first?';
    }

    if (lowerMessage.includes('hs code') || lowerMessage.includes('classif')) {
      return 'I can help classify your product. Please describe the product in detail, including materials, use, and specifications.';
    }

    if (lowerMessage.includes('document') || lowerMessage.includes('invoice')) {
      return 'For trade documents, I recommend having: Commercial Invoice, Packing List, Bill of Lading, and Certificate of Origin. Would you like templates for any of these?';
    }

    if (lowerMessage.includes('ship') || lowerMessage.includes('freight')) {
      return 'For shipping, I can help with freight quotes, carrier selection, and shipment tracking. What type of goods are you shipping?';
    }

    return `Thank you for your question about "${message.substring(0, 50)}...". I'm here to help with trade compliance, documentation, and logistics. How can I assist you today?`;
  }
}
