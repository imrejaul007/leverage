import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator';
import { AiService } from './ai.service';

@ApiTags('AI')
@ApiBearerAuth()
@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: { message: string; conversationId?: string },
  ) {
    return this.aiService.chat(dto.message, dto.conversationId, user.id);
  }

  @Get('conversations')
  async getConversations(@CurrentUser() user: CurrentUserPayload) {
    return this.aiService.getConversations(user.id);
  }

  @Get('conversations/:id')
  async getConversation(
    @CurrentUser() user: CurrentUserPayload,
    @Param('id') id: string,
  ) {
    return this.aiService.getConversation(id, user.id);
  }

  @Post('conversations/:id/messages')
  async addMessage(
    @CurrentUser() user: CurrentUserPayload,
    @Param('id') id: string,
    @Body() dto: { role: string; content: string },
  ) {
    return this.aiService.addMessage(id, user.id, dto.role, dto.content);
  }

  @Post('compliance/advice')
  async getComplianceAdvice(
    @CurrentUser() user: CurrentUserPayload,
    @Body()
    dto: {
      productDescription: string;
      originCountry: string;
      destinationCountry: string;
    },
  ) {
    return this.aiService.getComplianceAdvice(
      dto.productDescription,
      dto.originCountry,
      dto.destinationCountry,
    );
  }

  @Post('compliance/classify')
  async classifyProduct(
    @CurrentUser() user: CurrentUserPayload,
    @Body('description') description: string,
  ) {
    return this.aiService.classifyProduct(description);
  }

  @Post('documents/ingest')
  async ingestDocument(
    @CurrentUser() user: CurrentUserPayload,
    @Body()
    dto: {
      documentId: string;
      content: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    return this.aiService.ingestDocument(dto.documentId, dto.content, dto.metadata);
  }
}
