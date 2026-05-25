import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { AiSession } from './ai-session.entity';

export enum AgentType {
  TRADE_ADVISOR = 'TRADE_ADVISOR',
  COMPLIANCE_CHECKER = 'COMPLIANCE_CHECKER',
  HS_CLASSIFIER = 'HS_CLASSIFIER',
  FRAUD_DETECTOR = 'FRAUD_DETECTOR',
  DOCUMENT_EXTRACTOR = 'DOCUMENT_EXTRACTOR',
  CUSTOM = 'CUSTOM',
}

@Entity('ai_agents')
@Index(['type'])
@Index(['isActive'])
export class AiAgent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: AgentType })
  type: AgentType;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text' })
  systemPrompt: string;

  @Column({ default: 'gpt-4o' })
  model: string;

  @Column({ type: 'float', default: 0.3 })
  temperature: number;

  @Column({ default: 2000 })
  maxTokens: number;

  @Column({ type: 'jsonb', nullable: true })
  tools: object;

  @Column({ type: 'jsonb', nullable: true })
  skills: object;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  config: object;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => AiSession, (session) => session.agent)
  sessions: AiSession[];
}
