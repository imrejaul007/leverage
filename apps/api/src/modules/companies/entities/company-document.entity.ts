import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';
import { User } from '../../auth/entities/user.entity';
import { VerificationStatus, DocumentType } from '../../../common/enums';

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
