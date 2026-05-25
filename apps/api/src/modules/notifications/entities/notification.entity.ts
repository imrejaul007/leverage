import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

export enum NotificationType {
  POST_LIKED = 'POST_LIKED',
  POST_COMMENTED = 'POST_COMMENTED',
  NEW_FOLLOWER = 'NEW_FOLLOWER',
  NEW_MESSAGE = 'NEW_MESSAGE',
  ORDER_UPDATE = 'ORDER_UPDATE',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  NEW_RFQ_RESPONSE = 'NEW_RFQ_RESPONSE',
  KYC_UPDATE = 'KYC_UPDATE',
  COMPLIANCE_ALERT = 'COMPLIANCE_ALERT',
}

@Entity('notifications')
@Index(['userId', 'isRead'])
@Index(['createdAt'])
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  data: Record<string, any>;

  @Column({ default: false })
  isRead: boolean;

  @Column({ nullable: true })
  readAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
