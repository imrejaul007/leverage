import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { AiConversation } from './ai-conversation.entity';

export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

@Entity('ai_messages')
@Index(['conversationId'])
export class AiMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  conversationId: string;

  @ManyToOne(() => AiConversation, (conversation) => conversation.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversationId' })
  conversation: AiConversation;

  @Column({ type: 'enum', enum: MessageRole })
  role: MessageRole;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  tokens: number;

  @Column({ nullable: true })
  model: string;

  @Column({ type: 'jsonb', nullable: true })
  citations: object;

  @Column({ type: 'float', nullable: true })
  confidence: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: object;

  @CreateDateColumn()
  createdAt: Date;
}
