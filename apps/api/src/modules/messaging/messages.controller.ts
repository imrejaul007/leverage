import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
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
  async createConversation(@Body() dto: any, @Req() req: any) {
    return this.messagesService.getOrCreateConversation([...dto.participants, req.user.id]);
  }

  @Get('conversations/:id')
  async getConversation(@Param('id') id: string) {
    return { id };
  }

  @Get('conversations/:id/messages')
  async getMessages(@Param('id') id: string, @Query() pagination: any) {
    return this.messagesService.getMessages(id, pagination);
  }

  @Post('conversations/:id/messages')
  async sendMessage(@Param('id') id: string, @Body() dto: any, @Req() req: any) {
    return this.messagesService.sendMessage(id, req.user.id, dto);
  }

  @Post('conversations/:id/read')
  async markAsRead(@Param('id') id: string, @Req() req: any) {
    return this.messagesService.markAsRead(id, req.user.id);
  }

  @Delete('conversations/:id/messages/:messageId')
  async deleteMessage(@Param('messageId') messageId: string) {
    return this.messagesService.deleteMessage(messageId);
  }
}
