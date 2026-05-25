import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Shipment } from './shipment.entity';

@Entity('shipment_tracking')
@Index(['shipmentId'])
@Index(['eventTime'])
export class ShipmentTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shipmentId: string;

  @ManyToOne(() => Shipment, (shipment) => shipment.trackingEvents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shipmentId' })
  shipment: Shipment;

  @Column({ nullable: true })
  carrierId: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  substatus: string;

  @Column({ type: 'jsonb', nullable: true })
  location: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  coordinates: Record<string, any>;

  @Column()
  description: string;

  @Column({ nullable: true })
  remarks: string;

  @Column()
  eventTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}
