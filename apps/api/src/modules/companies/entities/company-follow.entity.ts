import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';

@Entity('company_follows')
@Unique(['followerId', 'followingId'])
export class CompanyFollow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  followerId: string;

  @ManyToOne('CompanyProfile')
  @JoinColumn({ name: 'followerId' })
  follower: any;

  @Column()
  followingId: string;

  @ManyToOne('CompanyProfile')
  @JoinColumn({ name: 'followingId' })
  following: any;

  @CreateDateColumn()
  createdAt: Date;
}
