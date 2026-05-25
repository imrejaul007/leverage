import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { AdStatus } from '../../../common/enums';

// Re-export AdStatus for convenience
export { AdStatus };

export enum AdType {
  SPONSORED_LISTING = 'SPONSORED_LISTING',
  BANNER = 'BANNER',
  RFQ_PROMOTION = 'RFQ_PROMOTION',
  BRAND_VIDEO = 'BRAND_VIDEO',
  CAROUSEL = 'CAROUSEL',
  TEXT_AD = 'TEXT_AD',
  INTERSTITIAL = 'INTERSTITIAL',
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

  @ManyToOne('Company', 'adCampaigns')
  @JoinColumn({ name: 'companyId' })
  company: any;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: AdType })
  type: AdType;

  @Column({ type: 'enum', enum: AdStatus, default: AdStatus.DRAFT })
  status: AdStatus;

  @Column({ type: 'jsonb' })
  targeting: object;

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
