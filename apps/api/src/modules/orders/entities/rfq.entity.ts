import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { RfqResponse } from './rfq-response.entity';

export enum RfqStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  IN_REVIEW = 'IN_REVIEW',
  CLOSED = 'CLOSED',
  AWARDED = 'AWARDED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

@Entity('rfqs')
export class Rfq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne('User', 'rfqs')
  @JoinColumn({ name: 'userId' })
  user: any;

  @Column()
  companyId: string;

  @ManyToOne('Company', 'rfqs')
  @JoinColumn({ name: 'companyId' })
  company: any;

  @Column({ nullable: true })
  productId: string;

  @ManyToOne('Product', 'rfqs', { nullable: true })
  @JoinColumn({ name: 'productId' })
  product: any;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne('Category', { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: any;

  @Column()
  quantity: number;

  @Column({ default: 'units' })
  unit: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  targetPrice: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ nullable: true })
  deliveryLocation: string;

  @Column()
  deliveryCountry: string;

  @Column({ nullable: true })
  deliveryDeadline: Date;

  @Column({ type: 'enum', enum: RfqStatus, default: RfqStatus.OPEN })
  status: RfqStatus;

  @Column({ default: 0 })
  responseCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  expiresAt: Date;

  @OneToMany(() => RfqResponse, (response) => response.rfq)
  responses: RfqResponse[];
}
