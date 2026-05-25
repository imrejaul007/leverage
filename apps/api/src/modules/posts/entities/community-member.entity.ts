import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { Community } from './community.entity';

export enum CommunityRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  MEMBER = 'MEMBER',
}

@Entity('community_members')
@Unique(['communityId', 'userId'])
@Index(['communityId'])
@Index(['userId'])
export class CommunityMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  communityId: string;

  @ManyToOne(() => Community, (community) => community.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'communityId' })
  community: Community;

  @Column()
  userId: string;

  @Column({ nullable: true })
  companyId: string;

  @Column({ type: 'enum', enum: CommunityRole, default: CommunityRole.MEMBER })
  role: CommunityRole;

  @CreateDateColumn()
  joinedAt: Date;
}
