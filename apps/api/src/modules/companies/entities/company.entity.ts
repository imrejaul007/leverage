import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { CompanyMember } from './company-member.entity';
import { CompanyDocument } from './company-document.entity';
import { VerificationStatus } from '../../../common/enums';

export enum BusinessType {
  MANUFACTURER = 'MANUFACTURER',
  EXPORTER = 'EXPORTER',
  IMPORTER = 'IMPORTER',
  TRADING_COMPANY = 'TRADING_COMPANY',
  FREIGHT_FORWARDER = 'FREIGHT_FORWARDER',
  CONSULTANT = 'CONSULTANT',
  OTHER = 'OTHER',
}

export enum EmployeeCount {
  MICRO = 'MICRO',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  ENTERPRISE = 'ENTERPRISE',
}

export enum RevenueRange {
  BELOW_1_CR = 'BELOW_1_CR',
  ONE_TO_TEN_CR = 'ONE_TO_TEN_CR',
  TEN_TO_HUNDRED_CR = 'TEN_TO_HUNDRED_CR',
  ABOVE_HUNDRED_CR = 'ABOVE_HUNDRED_CR',
}

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  legalName: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  website: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'jsonb', nullable: true })
  address: Record<string, any>;

  // Business Registration
  @Column({ unique: true, nullable: true })
  gstin: string;

  @Column({ unique: true, nullable: true })
  iec: string;

  @Column({ nullable: true })
  pan: string;

  @Column({ nullable: true })
  tan: string;

  // Profile
  @Column({ type: 'enum', enum: BusinessType, nullable: true })
  businessType: BusinessType;

  @Column({ type: 'enum', enum: EmployeeCount, nullable: true })
  employeeCount: EmployeeCount;

  @Column({ type: 'enum', enum: RevenueRange, nullable: true })
  annualRevenue: RevenueRange;

  // Verification
  @Column({ type: 'enum', enum: VerificationStatus, default: VerificationStatus.PENDING })
  verificationStatus: VerificationStatus;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  verifiedAt: Date;

  @Column()
  ownerId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(() => CompanyMember, (member) => member.company)
  members: CompanyMember[];

  @OneToMany(() => CompanyDocument, (doc) => doc.company)
  documents: CompanyDocument[];

  @OneToOne('Subscription', 'company')
  subscription: any;

  @OneToOne('AdCredit', 'company')
  adCredits: any;

  @OneToMany('DashboardMetric', 'company')
  dashboardMetrics: any[];

  @OneToMany('Post', 'company')
  posts: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
