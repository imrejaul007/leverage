import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { Message } from './message.entity';

export enum ConversationType {
  DIRECT = 'DIRECT',
  GROUP = 'GROUP',
  TRADE = 'TRADE',
  SUPPORT = 'SUPPORT',
}

@Entity('conversations')
@Index(['lastMessageAt'])
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ConversationType })
  type: ConversationType;

  @Column({ type: 'jsonb' })
  participants: object;

  @Column({ nullable: true })
  lastMessageAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  unreadCounts: object;

  @Column({ default: false })
  isArchived: boolean;

  @Column({ default: false })
  isPinned: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
