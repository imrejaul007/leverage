import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { RfqResponse } from './rfq-response.entity';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../auth/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';
import { Category } from '../../products/entities/category.entity';

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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  productId: string;

  @ManyToOne(() => Product, (product) => product.rfqs, { nullable: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

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
