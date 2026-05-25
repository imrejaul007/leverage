import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagingService } from './messaging.service';

@ApiTags('Messaging')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get('conversations')
  async getConversations(@Query('userId') userId: string) {
    return this.messagingService.getConversations(userId);
  }

  @Post('conversations')
  async createConversation(
    @Body()
    dto: { participants: string[]; type?: string; name?: string },
  ) {
    return this.messagingService.createConversation(dto.participants, dto.type, dto.name);
  }

  @Get('conversations/:id')
  async getConversation(@Param('id') id: string) {
    return this.messagingService.getConversation(id);
  }

  @Get('conversations/:id/messages')
  async getMessages(
    @Param('id') id: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.messagingService.getMessages(id, limit, offset);
  }

  @Post('conversations/:id/messages')
  async sendMessage(
    @Param('id') id: string,
    @Body() dto: { content: string; contentType?: string; replyToId?: string },
  ) {
    return this.messagingService.sendMessage(id, dto.content, dto.contentType, dto.replyToId);
  }

  @Patch('conversations/:id/read')
  async markAsRead(@Param('id') id: string) {
    return this.messagingService.markAsRead(id);
  }

  @Delete('conversations/:id')
  async deleteConversation(@Param('id') id: string) {
    return this.messagingService.deleteConversation(id);
  }

  @Delete('conversations/:id/messages/:messageId')
  async deleteMessage(@Param('messageId') messageId: string) {
    return this.messagingService.deleteMessage(messageId);
  }
}
