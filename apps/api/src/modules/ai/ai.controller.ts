import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiService } from './ai.service';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() dto: { message: string; conversationId?: string }) {
    return this.aiService.chat(dto.message, dto.conversationId);
  }

  @Get('conversations')
  async getConversations(@Query('userId') userId: string) {
    return this.aiService.getConversations(userId);
  }

  @Get('conversations/:id')
  async getConversation(@Param('id') id: string) {
    return this.aiService.getConversation(id);
  }

  @Post('conversations/:id/messages')
  async addMessage(
    @Param('id') id: string,
    @Body() dto: { role: string; content: string },
  ) {
    return this.aiService.addMessage(id, dto.role, dto.content);
  }

  @Post('compliance/advice')
  async getComplianceAdvice(
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
  async classifyProduct(@Body('description') description: string) {
    return this.aiService.classifyProduct(description);
  }

  @Post('documents/ingest')
  async ingestDocument(
    @Body()
    dto: {
      documentId: string;
      content: string;
      metadata?: Record<string, any>;
    },
  ) {
    return this.aiService.ingestDocument(dto.documentId, dto.content, dto.metadata);
  }
}
