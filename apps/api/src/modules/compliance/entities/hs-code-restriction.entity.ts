import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { HsCode } from './hs-code.entity';

export enum RestrictionType {
  PROHIBITED = 'PROHIBITED',
  RESTRICTED = 'RESTRICTED',
  LICENSE_REQUIRED = 'LICENSE_REQUIRED',
  PERMIT_REQUIRED = 'PERMIT_REQUIRED',
  QUOTA = 'QUOTA',
  SPECIAL_REQUIREMENT = 'SPECIAL_REQUIREMENT',
}

@Entity('hs_code_restrictions')
@Index(['hsCodeId'])
@Index(['countryCode'])
export class HsCodeRestriction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hsCodeId: string;

  @ManyToOne(() => HsCode, (hsCode) => hsCode.restrictions)
  @JoinColumn({ name: 'hsCodeId' })
  hsCode: HsCode;

  @Column()
  countryCode: string;

  @Column({ type: 'enum', enum: RestrictionType })
  type: RestrictionType;

  @Column()
  description: string;

  @Column({ nullable: true })
  requirement: string;

  @Column({ nullable: true })
  authority: string;

  @Column({ default: false })
  licenseRequired: boolean;

  @Column({ default: false })
  permitRequired: boolean;

  @Column({ default: false })
  certificateRequired: boolean;

  @Column({ nullable: true })
  sourceUrl: string;

  @Column({ nullable: true })
  validFrom: Date;

  @Column({ nullable: true })
  validUntil: Date;

  @CreateDateColumn()
  createdAt: Date;
}
