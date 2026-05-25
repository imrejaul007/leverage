import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum DocumentCategory {
  COMMERCIAL_INVOICE = 'COMMERCIAL_INVOICE',
  PACKING_LIST = 'PACKING_LIST',
  BILL_OF_LADING = 'BILL_OF_LADING',
  AIR_WAYBILL = 'AIR_WAYBILL',
  SEA_WAYBILL = 'SEA_WAYBILL',
  CERTIFICATE_OF_ORIGIN = 'CERTIFICATE_OF_ORIGIN',
  CERTIFICATE_OF_ANALYSIS = 'CERTIFICATE_OF_ANALYSIS',
  SHIPPING_BILL = 'SHIPPING_BILL',
  EXPORT_DECLARATION = 'EXPORT_DECLARATION',
  IMPORT_DECLARATION = 'IMPORT_DECLARATION',
  INSURANCE_CERTIFICATE = 'INSURANCE_CERTIFICATE',
  LETTER_OF_CREDIT = 'LETTER_OF_CREDIT',
  BILL_OF_ENTRY = 'BILL_OF_ENTRY',
  DELIVERY_ORDER = 'DELIVERY_ORDER',
  GOODS_DECLARATION = 'GOODS_DECLARATION',
  PHYTOSANITARY = 'PHYTOSANITARY',
  FUMIGATION_CERTIFICATE = 'FUMIGATION_CERTIFICATE',
  CONSULAR_INVOICE = 'CONSULAR_INVOICE',
  CUSTOMS_INVOICE = 'CUSTOMS_INVOICE',
  PACKING_DECLARATION = 'PACKING_DECLARATION',
  SHIPPER_LETTER_OF_INSTRUCTIONS = 'SHIPPER_LETTER_OF_INSTRUCTIONS',
  DANGEROUS_GOODS_DECLARATION = 'DANGEROUS_GOODS_DECLARATION',
}

export enum DocumentRefType {
  ORDER = 'ORDER',
  SHIPMENT = 'SHIPMENT',
  PURCHASE_ORDER = 'PURCHASE_ORDER',
  INVOICE = 'INVOICE',
  QUOTE = 'QUOTE',
  RFQ = 'RFQ',
}

export enum DocumentStatus {
  DRAFT = 'DRAFT',
  PENDING_SIGNATURE = 'PENDING_SIGNATURE',
  PENDING_VALIDATION = 'PENDING_VALIDATION',
  VALIDATED = 'VALIDATED',
  SIGNED = 'SIGNED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

@Entity('trade_documents')
@Index(['type'])
@Index(['referenceType', 'referenceId'])
@Index(['createdBy'])
export class TradeDocument {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: DocumentCategory })
  type: DocumentCategory;

  @Column({ type: 'enum', enum: DocumentRefType })
  referenceType: DocumentRefType;

  @Column({ nullable: true })
  referenceId: string;

  @Column({ nullable: true })
  number: string;

  @Column({ default: 1 })
  version: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb' })
  generatedFor: Record<string, any>;

  @Column({ type: 'jsonb' })
  generatedBy: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  content: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  htmlContent: string;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ nullable: true })
  fileSize: number;

  @Column({ nullable: true })
  mimeType: string;

  @Column({ type: 'jsonb', nullable: true })
  signatures: Record<string, any>;

  @Column({ default: false })
  isValidated: boolean;

  @Column({ type: 'jsonb', nullable: true })
  validationResult: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  complianceFlags: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Column({ type: 'enum', enum: DocumentStatus, default: DocumentStatus.DRAFT })
  status: DocumentStatus;

  @Column({ nullable: true })
  expiresAt: Date;

  @Column({ nullable: true })
  effectiveDate: Date;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;
}
