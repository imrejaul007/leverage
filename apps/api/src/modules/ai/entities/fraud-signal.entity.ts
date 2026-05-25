import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

export enum FraudType {
  ACCOUNT_TAKEOVER = 'ACCOUNT_TAKEOVER',
  PAYMENT_FRAUD = 'PAYMENT_FRAUD',
  IDENTITY_THEFT = 'IDENTITY_THEFT',
  SHIPPING_FRAUD = 'SHIPPING_FRAUD',
  SANCTIONS_EVASION = 'SANCTIONS_EVASION',
  TRADE_BASED_MONEY_LAUNDERING = 'TRADE_BASED_MONEY_LAUNDERING',
  PHISHING = 'PHISHING',
  FAKE_LISTING = 'FAKE_LISTING',
  FAKE_REVIEW = 'FAKE_REVIEW',
}

export enum FraudSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum FraudStatus {
  DETECTED = 'DETECTED',
  REVIEWING = 'REVIEWING',
  CONFIRMED = 'CONFIRMED',
  FALSE_POSITIVE = 'FALSE_POSITIVE',
  RESOLVED = 'RESOLVED',
}

@Entity('fraud_signals')
@Index(['entityType', 'entityId'])
@Index(['severity'])
export class FraudSignal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: FraudType })
  type: FraudType;

  @Column({ type: 'enum', enum: FraudSeverity })
  severity: FraudSeverity;

  @Column()
  entityType: string;

  @Column()
  entityId: string;

  @Column()
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  evidence: Record<string, any>;

  @Column({ type: 'float' })
  confidence: number;

  @Column({ type: 'enum', enum: FraudStatus, default: FraudStatus.DETECTED })
  status: FraudStatus;

  @Column({ nullable: true })
  resolvedBy: string;

  @Column({ nullable: true })
  resolvedAt: Date;

  @Column({ nullable: true })
  resolution: string;

  @CreateDateColumn()
  createdAt: Date;
}
