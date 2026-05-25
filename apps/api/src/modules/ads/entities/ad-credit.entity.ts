import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Unique } from 'typeorm';

@Entity('ad_credits')
@Unique(['companyId'])
export class AdCredit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyId: string;

  @OneToOne('Company', 'adCredits')
  @JoinColumn({ name: 'companyId' })
  company: any;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
