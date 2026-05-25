import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  private conversations: Map<string, any[]> = new Map();

  async chat(message: string, conversationId?: string): Promise<any> {
    const convId = conversationId || `conv_${Date.now()}`;

    if (!this.conversations.has(convId)) {
      this.conversations.set(convId, []);
    }

    const messages = this.conversations.get(convId);
    messages.push({ role: 'user', content: message });

    // Mock AI response
    const response = this.generateResponse(message);
    messages.push({ role: 'assistant', content: response });

    return {
      message: { role: 'assistant', content: response },
      conversationId: convId,
      sources: [],
      confidence: 0.85,
    };
  }

  async getConversations(userId: string): Promise<any[]> {
    const result: any[] = [];
    this.conversations.forEach((messages, id) => {
      if (messages.length > 0) {
        result.push({
          id,
          title: messages[0].content.substring(0, 50),
          lastMessage: messages[messages.length - 1].content,
          messageCount: messages.length,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });
    return result;
  }

  async getConversation(id: string): Promise<any> {
    const messages = this.conversations.get(id) || [];
    return { id, messages };
  }

  async addMessage(
    conversationId: string,
    role: string,
    content: string,
  ): Promise<any> {
    if (!this.conversations.has(conversationId)) {
      this.conversations.set(conversationId, []);
    }

    const messages = this.conversations.get(conversationId);
    messages.push({ role, content, createdAt: new Date() });

    if (role === 'user') {
      const response = this.generateResponse(content);
      messages.push({
        role: 'assistant',
        content: response,
        createdAt: new Date(),
      });
      return { userMessage: { role, content }, assistantMessage: { role: 'assistant', content: response } };
    }

    return { message: { role, content } };
  }

  async getComplianceAdvice(
    productDescription: string,
    originCountry: string,
    destinationCountry: string,
  ): Promise<any> {
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

  async classifyProduct(description: string): Promise<any> {
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
    metadata?: Record<string, any>,
  ): Promise<any> {
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
