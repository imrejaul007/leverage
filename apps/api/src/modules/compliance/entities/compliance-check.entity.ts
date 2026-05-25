import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

export enum ComplianceCheckType {
  SANCTIONS_SCREEN = 'SANCTIONS_SCREEN',
  HS_CLASSIFICATION = 'HS_CLASSIFICATION',
  DUTY_CALCULATION = 'DUTY_CALCULATION',
  RESTRICTION_CHECK = 'RESTRICTION_CHECK',
  LICENSE_CHECK = 'LICENSE_CHECK',
  DOCUMENT_CHECK = 'DOCUMENT_CHECK',
}

export enum ComplianceStatus {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  WARNING = 'WARNING',
  REVIEW_REQUIRED = 'REVIEW_REQUIRED',
  ERROR = 'ERROR',
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

@Entity('compliance_checks')
@Index(['checkType'])
@Index(['companyId'])
export class ComplianceCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ComplianceCheckType })
  checkType: ComplianceCheckType;

  @Column({ nullable: true })
  companyId: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ type: 'jsonb' })
  input: object;

  @Column({ type: 'jsonb' })
  result: object;

  @Column({ type: 'enum', enum: ComplianceStatus })
  status: ComplianceStatus;

  @Column({ nullable: true })
  riskScore: number;

  @Column({ type: 'enum', enum: RiskLevel, nullable: true })
  riskLevel: RiskLevel;

  @Column({ type: 'jsonb', nullable: true })
  flags: object;

  @Column()
  passed: boolean;

  @Column({ type: 'jsonb', nullable: true })
  issues: object;

  @CreateDateColumn()
  checkedAt: Date;
}
