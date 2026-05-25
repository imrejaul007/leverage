import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { CompanyProfile } from '../../companies/entities/company-profile.entity';
import { Community } from './community.entity';

export enum PostType {
  STANDARD = 'STANDARD',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  JOB_POSTING = 'JOB_POSTING',
  EVENT = 'EVENT',
  POLL = 'POLL',
  QUESTION = 'QUESTION',
  SHOWCASE = 'SHOWCASE',
  PARTNERSHIP = 'PARTNERSHIP',
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}

@Entity('posts')
@Index(['authorId'])
@Index(['communityId'])
@Index(['createdAt'])
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  authorId: string;

  @ManyToOne(() => CompanyProfile)
  @JoinColumn({ name: 'authorId' })
  author: CompanyProfile;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  media: Record<string, any>;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  commentsCount: number;

  @Column({ default: 0 })
  sharesCount: number;

  @Column({ default: 0 })
  viewsCount: number;

  @Column({ type: 'simple-array', nullable: true })
  hashtags: string[];

  @Column({ type: 'simple-array', nullable: true })
  mentions: string[];

  @Column({ type: 'enum', enum: PostType, default: PostType.STANDARD })
  type: PostType;

  @Column({ type: 'enum', enum: PostStatus, default: PostStatus.PUBLISHED })
  status: PostStatus;

  @Column({ nullable: true })
  communityId: string;

  @ManyToOne(() => Community, { nullable: true })
  @JoinColumn({ name: 'communityId' })
  community: Community;

  @Column({ default: false })
  isPinned: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  publishedAt: Date;
}
