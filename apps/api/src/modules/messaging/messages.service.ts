import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Conversation)
    private convRepo: Repository<Conversation>,
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  async getConversations(_userId: string) {
    // TODO: Implement proper conversation filtering
    return this.convRepo.find({
      order: { updatedAt: 'DESC' },
    });
  }

  async getOrCreateConversation(participants: string[], type: string = 'DIRECT') {
    const conv = this.convRepo.create({
      type: type as any,
      participants: participants as any,
    });
    return this.convRepo.save(conv);
  }

  async getMessages(conversationId: string, pagination: any = {}) {
    const [messages, total] = await this.messageRepo.findAndCount({
      where: { conversationId } as any,
      order: { sentAt: 'DESC' },
      take: pagination.limit || 50,
      skip: pagination.offset || 0,
    });
    return { messages: messages.reverse(), total };
  }

  async sendMessage(conversationId: string, senderId: string, dto: any) {
    const message = this.messageRepo.create({
      conversationId,
      senderId,
      senderType: 'USER' as any,
      content: dto.content,
      contentType: dto.contentType || 'TEXT' as any,
      status: 'SENT' as any,
    });
    const saved = await this.messageRepo.save(message);

    await this.convRepo.update(conversationId as any, { lastMessageAt: new Date() });
    return saved;
  }

  async markAsRead(conversationId: string, userId: string) {
    await this.messageRepo.update(
      { conversationId } as any,
      { readAt: new Date() },
    );
    return { success: true };
  }

  async deleteMessage(messageId: string) {
    await this.messageRepo.update(messageId as any, { isDeleted: true });
    return { success: true };
  }
}
