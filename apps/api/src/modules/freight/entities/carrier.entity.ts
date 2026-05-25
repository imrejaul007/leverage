import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { FreightQuote } from './freight-quote.entity';
import { Shipment } from './shipment.entity';

export enum CarrierType {
  AIRLINE = 'AIRLINE',
  SHIPPING_LINE = 'SHIPPING_LINE',
  TRUCKING = 'TRUCKING',
  RAIL = 'RAIL',
  COURIER = 'COURIER',
  FREIGHT_FORWARDER = 'FREIGHT_FORWARDER',
  EXPRESS = 'EXPRESS',
}

@Entity('carriers')
@Index(['code'])
@Index(['isActive'])
export class Carrier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'simple-array' })
  type: CarrierType[];

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ nullable: true })
  supportPhone: string;

  @Column({ nullable: true })
  apiProvider: string;

  @Column({ type: 'jsonb', nullable: true })
  apiConfig: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FreightQuote, (quote) => quote.carrier)
  quotes: FreightQuote[];

  @OneToMany(() => Shipment, (shipment) => shipment.carrier)
  shipments: Shipment[];
}
