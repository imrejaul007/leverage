import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { CompanyProfile } from './company-profile.entity';

@Entity('company_follows')
@Unique(['followerId', 'followingId'])
export class CompanyFollow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  followerId: string;

  @ManyToOne(() => CompanyProfile)
  @JoinColumn({ name: 'followerId' })
  follower: CompanyProfile;

  @Column()
  followingId: string;

  @ManyToOne(() => CompanyProfile)
  @JoinColumn({ name: 'followingId' })
  following: CompanyProfile;

  @CreateDateColumn()
  createdAt: Date;
}
