import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { DocumentCategory } from '../../../common/enums';

@Entity('document_templates')
@Index(['type'])
@Index(['companyId'])
export class DocumentTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: DocumentCategory })
  type: DocumentCategory;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text' })
  handlebars: string;

  @Column({ type: 'text', nullable: true })
  css: string;

  @Column({ type: 'jsonb' })
  variables: Record<string, any>;

  @Column({ default: false })
  isDefault: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  companyId: string;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
