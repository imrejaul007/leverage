import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum InsuranceStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
  CLAIMED = 'CLAIMED',
}

export enum ClaimStatus {
  NOT_APPLICABLE = 'NOT_APPLICABLE',
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  SETTLED = 'SETTLED',
}

@Entity('insurance_policies')
@Index(['shipmentId'])
export class InsurancePolicy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  shipmentId: string;

  @Column({ unique: true })
  policyNumber: string;

  @Column()
  provider: string;

  @Column({ nullable: true })
  providerPolicyId: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  insuredAmount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  premium: number;

  @Column({ type: 'jsonb' })
  cargoDetails: Record<string, any>;

  @Column({ type: 'jsonb' })
  coverage: Record<string, any>;

  @Column({ type: 'jsonb' })
  beneficiary: Record<string, any>;

  @Column({ type: 'enum', enum: InsuranceStatus, default: InsuranceStatus.ACTIVE })
  status: InsuranceStatus;

  @Column()
  effectiveDate: Date;

  @Column()
  expiryDate: Date;

  @Column({ type: 'enum', enum: ClaimStatus, nullable: true })
  claimStatus: ClaimStatus;

  @Column({ type: 'jsonb', nullable: true })
  claimDetails: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
