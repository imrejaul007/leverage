import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiAgent } from './entities/ai-agent.entity';
import { AiConversation } from './entities/ai-conversation.entity';
import { AiEmbedding } from './entities/ai-embedding.entity';
import { AiMessage } from './entities/ai-message.entity';
import { AiSession } from './entities/ai-session.entity';
import { FraudSignal } from './entities/fraud-signal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AiAgent,
      AiConversation,
      AiEmbedding,
      AiMessage,
      AiSession,
      FraudSignal,
    ]),
  ],
})
export class AiModule {}
