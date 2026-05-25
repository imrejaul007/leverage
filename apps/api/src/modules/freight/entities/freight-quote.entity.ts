import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Carrier } from './carrier.entity';
import { TransportMode, QuoteStatus } from '../../../common/enums';

@Entity('freight_quotes')
@Index(['userId'])
@Index(['carrierId'])
@Index(['status'])
export class FreightQuote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  companyId: string;

  @Column()
  carrierId: string;

  @ManyToOne(() => Carrier)
  @JoinColumn({ name: 'carrierId' })
  carrier: Carrier;

  @Column({ type: 'jsonb' })
  origin: object;

  @Column({ type: 'jsonb' })
  destination: object;

  @Column({ type: 'jsonb' })
  cargoDetails: object;

  @Column({ nullable: true })
  incoterms: string;

  @Column({ type: 'enum', enum: TransportMode })
  transportMode: TransportMode;

  @Column({ nullable: true })
  serviceType: string;

  @Column({ nullable: true })
  transitDays: number;

  @Column({ nullable: true })
  departureDate: Date;

  @Column({ nullable: true })
  arrivalDate: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  baseRate: number;

  @Column({ type: 'jsonb' })
  surcharges: object[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fuelSurcharge: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  originCharges: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  destCharges: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalRate: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column()
  validUntil: Date;

  @Column({ type: 'jsonb' })
  quoteData: object;

  @Column({ type: 'enum', enum: QuoteStatus, default: QuoteStatus.PENDING })
  status: QuoteStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiresAt: Date;
}
