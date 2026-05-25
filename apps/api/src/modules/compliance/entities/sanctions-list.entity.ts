import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum SanctionsListType {
  OFAC_SDN = 'OFAC_SDN',
  OFAC_CONS = 'OFAC_CONS',
  UN_SECURITY_COUNCIL = 'UN_SECURITY_COUNCIL',
  EU_CONSOLIDATED = 'EU_CONSOLIDATED',
  UK_HMT = 'UK_HMT',
}

export enum EntityType {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION',
  VESSEL = 'VESSEL',
  AIRCRAFT = 'AIRCRAFT',
  ENTITY = 'ENTITY',
}

@Entity('sanctions_lists')
@Index(['name'])
@Index(['ofac'])
@Index(['unSecurity'])
export class SanctionsList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SanctionsListType })
  listType: SanctionsListType;

  @Column({ nullable: true })
  entityId: string;

  @Column()
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  nameVariants: Record<string, any>;

  @Column({ type: 'simple-array', nullable: true })
  alias: string[];

  @Column({ type: 'enum', enum: EntityType })
  entityType: EntityType;

  @Column({ type: 'jsonb', nullable: true })
  address: Record<string, any>;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  nationalId: string;

  @Column({ nullable: true })
  passport: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  deathDate: Date;

  @Column({ default: false })
  ofac: boolean;

  @Column({ default: false })
  unSecurity: boolean;

  @Column({ default: false })
  eu: boolean;

  @Column({ default: false })
  uk: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  delistedAt: Date;

  @Column({ nullable: true })
  lastReviewed: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
