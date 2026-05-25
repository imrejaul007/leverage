import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { RfqResponse } from './rfq-response.entity';

export enum RfqStatus {
  OPEN = 'OPEN',
  AWARDED = 'AWARDED',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED',
}

@Entity('rfqs')
export class Rfq {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  categoryId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  targetPrice: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ nullable: true })
  targetDeliveryDate: Date;

  @Column({
    type: 'enum',
    enum: RfqStatus,
    default: RfqStatus.OPEN,
  })
  status: RfqStatus;

  @Column({ nullable: true })
  preferredLocation: string;

  @Column({ type: 'jsonb', nullable: true })
  attachments: string[];

  @Column({ nullable: true })
  expiryDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => RfqResponse, (response) => response.rfq)
  responses: RfqResponse[];
}
