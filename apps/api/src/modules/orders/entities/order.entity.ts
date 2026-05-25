import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Invoice } from './invoice.entity';
import { PaymentTransaction } from './payment-transaction.entity';
import { User } from '../../auth/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';
import { OrderStatus, PaymentStatus } from '../../../common/enums';

export enum OrderType {
  STANDARD = 'STANDARD',
  RFQ = 'RFQ',
  RECURRING = 'RECURRING',
  SAMPLE = 'SAMPLE',
}

export enum OrderSource {
  MARKETPLACE = 'MARKETPLACE',
  DIRECT = 'DIRECT',
  RFQ = 'RFQ',
  REORDER = 'REORDER',
}

@Entity('orders')
@Index(['buyerId'])
@Index(['sellerId'])
@Index(['status'])
@Index(['orderNumber'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  orderNumber: string;

  @Column()
  buyerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'buyerId' })
  buyer: User;

  @Column()
  buyerCompanyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'buyerCompanyId' })
  buyerCompany: Company;

  @Column()
  sellerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @Column()
  sellerCompanyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'sellerCompanyId' })
  sellerCompany: Company;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'enum', enum: OrderType, default: OrderType.STANDARD })
  type: OrderType;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  taxAmount: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  shippingCost: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  totalAmount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'jsonb' })
  shippingAddress: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  billingAddress: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  internalNotes: string;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @Column({ nullable: true })
  paymentDueDate: Date;

  @Column({ nullable: true })
  expectedDelivery: Date;

  @Column({ nullable: true })
  actualDelivery: Date;

  @Column({ nullable: true })
  rfqId: string;

  @Column({ type: 'enum', enum: OrderSource, default: OrderSource.MARKETPLACE })
  source: OrderSource;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @OneToMany(() => Invoice, (invoice) => invoice.order)
  invoices: Invoice[];

  @OneToMany(() => PaymentTransaction, (transaction) => transaction.order)
  transactions: PaymentTransaction[];
}
