import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { DutyRate } from './duty-rate.entity';
import { HsCodeRestriction } from './hs-code-restriction.entity';

@Entity('hs_codes')
export class HsCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  chapter: string;

  @Column()
  heading: string;

  @Column()
  subheading: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  descriptionArabic: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => DutyRate, (dutyRate) => dutyRate.hsCode)
  dutyRates: DutyRate[];

  @OneToMany(() => HsCodeRestriction, (restriction) => restriction.hsCode)
  restrictions: HsCodeRestriction[];
}
