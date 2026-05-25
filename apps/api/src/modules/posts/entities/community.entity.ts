import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

export enum CommunityType {
  INDUSTRY = 'INDUSTRY',
  REGIONAL = 'REGIONAL',
  TRADE_LANE = 'TRADE_LANE',
  PRODUCT = 'PRODUCT',
  GENERAL = 'GENERAL',
}

@Entity('communities')
@Index(['slug'])
export class Community {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: CommunityType })
  type: CommunityType;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ type: 'text', nullable: true })
  rules: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 0 })
  membersCount: number;

  @Column({ default: 0 })
  postsCount: number;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
