import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Rfq } from './rfq.entity';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../auth/entities/user.entity';

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

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

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
