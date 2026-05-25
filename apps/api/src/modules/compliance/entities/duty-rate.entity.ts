import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { HsCode } from './hs-code.entity';

@Entity('duty_rates')
@Index(['hsCodeId'])
@Index(['countryCode'])
export class DutyRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  hsCodeId: string;

  @ManyToOne(() => HsCode, (hsCode) => hsCode.dutyRates)
  @JoinColumn({ name: 'hsCodeId' })
  hsCode: HsCode;

  @Column()
  countryCode: string;

  @Column()
  effectiveDate: Date;

  @Column({ nullable: true })
  expiryDate: Date;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  basicDuty: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  additionalDuty: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  safeguardDuty: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  antiDumpingDuty: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  unitQuantity: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  preferentialRate: number;

  @Column({ nullable: true })
  ftaAgreement: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
