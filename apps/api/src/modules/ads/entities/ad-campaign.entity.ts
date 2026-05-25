import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

export enum AdType {
  SPONSORED_LISTING = 'SPONSORED_LISTING',
  BANNER = 'BANNER',
  RFQ_PROMOTION = 'RFQ_PROMOTION',
  BRAND_VIDEO = 'BRAND_VIDEO',
  CAROUSEL = 'CAROUSEL',
  TEXT_AD = 'TEXT_AD',
  INTERSTITIAL = 'INTERSTITIAL',
}

export enum AdStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  PAUSED = 'PAUSED',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum BidType {
  CPC = 'CPC',
  CPM = 'CPM',
  CPA = 'CPA',
  FLAT_RATE = 'FLAT_RATE',
}

@Entity('ad_campaigns')
@Index(['companyId'])
@Index(['status'])
export class AdCampaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: AdType })
  type: AdType;

  @Column({ type: 'enum', enum: AdStatus, default: AdStatus.DRAFT })
  status: AdStatus;

  @Column({ type: 'jsonb' })
  targeting: Record<string, any>;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  budget: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  dailyBudget: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  spent: number;

  @Column({ type: 'enum', enum: BidType, default: BidType.CPC })
  bidType: BidType;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  bidAmount: number;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ default: 0 })
  impressions: number;

  @Column({ default: 0 })
  clicks: number;

  @Column({ default: 0 })
  conversions: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
