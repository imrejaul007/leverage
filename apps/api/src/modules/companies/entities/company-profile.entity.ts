import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('company_profiles')
export class CompanyProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyId: string;

  @OneToOne('Company', 'profile')
  @JoinColumn({ name: 'companyId' })
  company: any;

  @Column({ nullable: true })
  headline: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ nullable: true })
  coverVideo: string;

  @Column({ type: 'simple-array', nullable: true })
  specialties: string[];

  @Column({ type: 'simple-array', nullable: true })
  certifications: string[];

  @Column({ type: 'simple-array', nullable: true })
  exportMarkets: string[];

  @Column({ type: 'simple-array', nullable: true })
  importMarkets: string[];

  @Column({ default: 0 })
  followersCount: number;

  @Column({ default: 0 })
  followingCount: number;

  @Column({ default: 0 })
  postsCount: number;

  @Column({ default: 0 })
  viewsCount: number;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  twitterUrl: string;

  @Column({ nullable: true })
  facebookUrl: string;

  @Column({ nullable: true })
  websiteUrl: string;

  @Column({ default: false })
  isFeatured: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
