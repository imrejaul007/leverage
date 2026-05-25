import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Order } from './order.entity';

export enum InvoiceType {
  PROFORMA = 'PROFORMA',
  COMMERCIAL = 'COMMERCIAL',
  TAX = 'TAX',
  CREDIT_NOTE = 'CREDIT_NOTE',
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  VIEWED = 'VIEWED',
  PARTIAL_PAID = 'PARTIAL_PAID',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

@Entity('invoices')
@Index(['orderId'])
@Index(['invoiceNumber'])
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @ManyToOne(() => Order, (order) => order.invoices)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column({ unique: true })
  invoiceNumber: string;

  @Column({ type: 'enum', enum: InvoiceType })
  type: InvoiceType;

  @Column({ type: 'jsonb' })
  buyerCompany: Record<string, any>;

  @Column({ type: 'jsonb' })
  sellerCompany: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  shipFrom: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  shipTo: Record<string, any>;

  @Column({ type: 'jsonb' })
  items: Record<string, any>;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  subtotal: number;

  @Column({ type: 'jsonb' })
  taxBreakdown: Record<string, any>;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  taxAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  shippingCost: number;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  totalAmount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'text', nullable: true })
  terms: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  paidAt: Date;

  @Column({ nullable: true })
  sentAt: Date;

  @Column({ nullable: true })
  pdfUrl: string;

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.DRAFT })
  status: InvoiceStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
