import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('ai_embeddings')
@Index(['documentId'])
@Index(['documentType'])
export class AiEmbedding {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  documentId: string;

  @Column()
  documentType: string;

  @Column()
  chunkIndex: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  vectorId: string;

  @Column({ type: 'jsonb' })
  metadata: object;

  @Column({ nullable: true })
  companyId: string;

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
