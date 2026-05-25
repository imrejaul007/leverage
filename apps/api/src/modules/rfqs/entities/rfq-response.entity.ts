import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Rfq } from './rfq.entity';

@Entity('rfq_responses')
export class RfqResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rfqId: string;

  @Column()
  companyId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ nullable: true })
  leadTimeDays: number;

  @Column({ nullable: true })
  validUntil: Date;

  @Column({ type: 'jsonb', nullable: true })
  attachments: string[];

  @Column({ default: false })
  isAccepted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Rfq, (rfq) => rfq.responses)
  rfq: Rfq;
}
