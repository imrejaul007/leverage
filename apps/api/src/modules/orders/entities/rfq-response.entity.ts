import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Rfq } from './rfq.entity';

@Entity('rfq_responses')
export class RfqResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rfqId: string;

  @ManyToOne(() => Rfq, (rfq) => rfq.responses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rfqId' })
  rfq: Rfq;

  @Column()
  companyId: string;

  @ManyToOne('Company', 'rfqResponses')
  @JoinColumn({ name: 'companyId' })
  company: any;

  @Column()
  userId: string;

  @ManyToOne('User', 'rfqResponses')
  @JoinColumn({ name: 'userId' })
  user: any;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ nullable: true })
  leadTimeDays: number;

  @Column({ nullable: true })
  validUntil: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ default: false })
  isAccepted: boolean;

  @Column({ default: false })
  isPreferred: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
