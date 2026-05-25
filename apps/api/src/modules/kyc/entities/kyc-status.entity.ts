import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

export enum KycVerificationStatus {
  PENDING = 'PENDING',
  UNDER_REVIEW = 'UNDER_REVIEW',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

@Entity('kyc_status')
export class KycStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyId: string;

  @OneToOne(() => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ type: 'enum', enum: KycVerificationStatus, default: KycVerificationStatus.PENDING })
  gstinStatus: KycVerificationStatus;

  @Column({ type: 'enum', enum: KycVerificationStatus, default: KycVerificationStatus.PENDING })
  iecStatus: KycVerificationStatus;

  @Column({ type: 'enum', enum: KycVerificationStatus, default: KycVerificationStatus.PENDING })
  documentsStatus: KycVerificationStatus;

  @Column({ type: 'enum', enum: KycVerificationStatus, default: KycVerificationStatus.PENDING })
  overallStatus: KycVerificationStatus;

  @Column({ nullable: true })
  rejectionReason: string;

  @Column({ nullable: true })
  verifiedAt: Date;

  @Column({ nullable: true })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
