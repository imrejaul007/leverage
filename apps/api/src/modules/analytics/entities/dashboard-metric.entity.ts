import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, Index } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

@Entity('dashboard_metrics')
@Unique(['companyId', 'metricType', 'period', 'date'])
@Index(['companyId'])
@Index(['date'])
export class DashboardMetric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  companyId: string;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  metricType: string;

  @Column()
  period: string;

  @Column({ type: 'decimal', precision: 20, scale: 4 })
  value: number;

  @Column({ type: 'decimal', precision: 20, scale: 4, nullable: true })
  previousValue: number;

  @Column({ type: 'decimal', precision: 20, scale: 4, nullable: true })
  change: number;

  @Column()
  date: Date;
}
