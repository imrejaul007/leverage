import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  async getConversations(userId: string) {
    // SECURITY: Only return conversations where the user is a participant
    // This requires proper relations - for now we filter by participant
    return this.convRepo
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.participants', 'participant')
      .leftJoinAndSelect('conversation.messages', 'messages')
      .where('participant.id = :userId', { userId })
      .orderBy('conversation.updatedAt', 'DESC')
      .getMany();
  }

  async getOrCreateConversation(participants: string[], type: string = 'DIRECT') {
    // SECURITY: Validate participants array is not empty
    if (!participants || participants.length === 0) {
      throw new ForbiddenException('At least one participant is required');
    }

    // SECURITY: Prevent duplicate participants
    const uniqueParticipants = [...new Set(participants)];

    const conv = this.convRepo.create({
      type: type as any,
      participants: uniqueParticipants as any,
    });
    return this.convRepo.save(conv);
  }

  async getConversation(conversationId: string) {
    const conversation = await this.convRepo.findOne({
      where: { id: conversationId },
      relations: ['participants', 'messages'],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }

  async getMessages(conversationId: string, pagination: { limit?: number; offset?: number } = {}) {
    const limit = Math.min(pagination.limit || 50, 100); // Max 100 messages
    const offset = pagination.offset || 0;

    const [messages, total] = await this.messageRepo.findAndCount({
      where: { conversationId },
      order: { sentAt: 'DESC' },
      take: limit,
      skip: offset,
    });
    return { messages: messages.reverse(), total };
  }

  async sendMessage(conversationId: string, senderId: string, dto: { content: string; contentType?: string }) {
    // SECURITY: Validate message content
    if (!dto.content || dto.content.trim().length === 0) {
      throw new ForbiddenException('Message content cannot be empty');
    }

    // SECURITY: Check conversation exists
    const conversation = await this.convRepo.findOne({
      where: { id: conversationId },
    });
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const message = this.messageRepo.create({
      conversationId,
      senderId,
      senderType: 'USER' as any,
      content: dto.content.trim(),
      contentType: dto.contentType || 'TEXT' as any,
      status: 'SENT' as any,
    });
    const saved = await this.messageRepo.save(message);

    await this.convRepo.update(conversationId, { lastMessageAt: new Date() });
    return saved;
  }

  async markAsRead(conversationId: string, userId: string) {
    // SECURITY: Verify user is a participant
    const isParticipant = await this.isUserParticipant(conversationId, userId);
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant of this conversation');
    }

    await this.messageRepo.update(
      { conversationId },
      { readAt: new Date() },
    );
    return { success: true };
  }

  async deleteMessage(messageId: string, userId?: string) {
    // SECURITY: If userId provided, verify sender ownership
    const message = await this.messageRepo.findOne({
      where: { id: messageId },
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (userId && message.senderId !== userId) {
      throw new ForbiddenException('You can only delete your own messages');
    }

    await this.messageRepo.update(messageId, { isDeleted: true });
    return { success: true };
  }

  /**
   * Check if a user is a participant of a conversation
   */
  async isUserParticipant(conversationId: string, userId: string): Promise<boolean> {
    const conversation = await this.convRepo
      .createQueryBuilder('conversation')
      .leftJoin('conversation.participants', 'participant')
      .where('conversation.id = :conversationId', { conversationId })
      .andWhere('participant.id = :userId', { userId })
      .getOne();

    return !!conversation;
  }
}
