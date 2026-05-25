import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';
import { User } from '../../auth/entities/user.entity';
import { VerificationStatus } from './company.entity';

export enum DocumentType {
  GST_CERTIFICATE = 'GST_CERTIFICATE',
  IEC = 'IEC',
  PAN_CARD = 'PAN_CARD',
  ADDRESS_PROOF = 'ADDRESS_PROOF',
  BANK_STATEMENT = 'BANK_STATEMENT',
  MOA_AOA = 'MOA_AOA',
  PARTNERSHIP_DEED = 'PARTNERSHIP_DEED',
  IMPORT_LICENSE = 'IMPORT_LICENSE',
  EXPORT_LICENSE = 'EXPORT_LICENSE',
  ISO_CERTIFICATE = 'ISO_CERTIFICATE',
  OTHER = 'OTHER',
}

@Entity('company_documents')
export class CompanyDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyId: string;

  @ManyToOne(() => Company, (company) => company.documents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: DocumentType })
  type: DocumentType;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: VerificationStatus, default: VerificationStatus.PENDING })
  status: VerificationStatus;

  @Column({ nullable: true })
  verifiedAt: Date;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
