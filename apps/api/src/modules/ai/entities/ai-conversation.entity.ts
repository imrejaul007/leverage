import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { AiMessage } from './ai-message.entity';

@Entity('ai_conversations')
@Index(['userId'])
@Index(['createdAt'])
export class AiConversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  title: string;

  @Column({ type: 'jsonb', nullable: true })
  context: Record<string, any>;

  @Column({ nullable: true })
  lastMessage: string;

  @Column({ default: 0 })
  messageCount: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @OneToMany(() => AiMessage, (message) => message.conversation)
  messages: AiMessage[];
}
