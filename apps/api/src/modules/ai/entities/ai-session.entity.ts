import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { AiAgent } from './ai-agent.entity';

@Entity('ai_sessions')
@Index(['agentId'])
@Index(['userId'])
export class AiSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  agentId: string;

  @ManyToOne(() => AiAgent, (agent) => agent.sessions)
  @JoinColumn({ name: 'agentId' })
  agent: AiAgent;

  @Column()
  userId: string;

  @Column({ type: 'jsonb', nullable: true })
  context: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  startedAt: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @Column({ default: 0 })
  messageCount: number;

  @Column({ default: 0 })
  tokenUsage: number;
}
