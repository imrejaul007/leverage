import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('conversations')
  async getConversations(@Req() req: any) {
    return this.messagesService.getConversations(req.user.id);
  }

  @Post('conversations')
  async createConversation(@Body() dto: { participants: string[] }, @Req() req: any) {
    // SECURITY: Ensure user includes themselves in participants
    const participants = [...new Set([...dto.participants, req.user.id])];
    return this.messagesService.getOrCreateConversation(participants);
  }

  @Get('conversations/:id')
  async getConversation(@Param('id') id: string, @Req() req: any) {
    // SECURITY: Verify user is a participant
    const isParticipant = await this.messagesService.isUserParticipant(id, req.user.id);
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant of this conversation');
    }
    return this.messagesService.getConversation(id);
  }

  @Get('conversations/:id/messages')
  async getMessages(@Param('id') id: string, @Query() pagination: { limit?: number; offset?: number }, @Req() req: any) {
    // SECURITY: Verify user is a participant
    const isParticipant = await this.messagesService.isUserParticipant(id, req.user.id);
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant of this conversation');
    }
    return this.messagesService.getMessages(id, pagination);
  }

  @Post('conversations/:id/messages')
  async sendMessage(@Param('id') id: string, @Body() dto: { content: string; contentType?: string }, @Req() req: any) {
    // SECURITY: Verify user is a participant
    const isParticipant = await this.messagesService.isUserParticipant(id, req.user.id);
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant of this conversation');
    }
    return this.messagesService.sendMessage(id, req.user.id, dto);
  }

  @Post('conversations/:id/read')
  async markAsRead(@Param('id') id: string, @Req() req: any) {
    // SECURITY: Verify user is a participant
    const isParticipant = await this.messagesService.isUserParticipant(id, req.user.id);
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant of this conversation');
    }
    return this.messagesService.markAsRead(id, req.user.id);
  }

  @Delete('conversations/:id/messages/:messageId')
  async deleteMessage(@Param('id') id: string, @Param('messageId') messageId: string, @Req() req: any) {
    // SECURITY: Verify user is a participant
    const isParticipant = await this.messagesService.isUserParticipant(id, req.user.id);
    if (!isParticipant) {
      throw new ForbiddenException('You are not a participant of this conversation');
    }
    return this.messagesService.deleteMessage(messageId, req.user.id);
  }
}
