import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index, OneToMany } from 'typeorm';

@Entity('comments')
@Index(['postId'])
@Index(['parentId'])
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  postId: string;

  @ManyToOne('Post', 'comments', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: any;

  @Column({ nullable: true })
  parentId: string;

  @ManyToOne('Comment', 'replies', { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: Comment;

  @OneToMany('Comment', 'parent')
  replies: Comment[];

  @Column()
  userId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: false })
  isEdited: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
