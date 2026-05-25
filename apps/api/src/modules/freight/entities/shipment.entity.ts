import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Carrier } from './carrier.entity';
import { ContainerBooking } from './container-booking.entity';
import { ShipmentTracking } from './shipment-tracking.entity';
import { ShipmentStatus } from '../../../common/enums';

export enum CustomsStatus {
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  CLEARED = 'CLEARED',
  EXAMINED = 'EXAMINED',
  HOLD = 'HOLD',
  RELEASED = 'RELEASED',
  DENIED = 'DENIED',
}

@Entity('shipments')
@Index(['userId'])
@Index(['carrierId'])
@Index(['shipmentNumber'])
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  orderId: string;

  @ManyToOne('Order', 'shipments', { nullable: true })
  @JoinColumn({ name: 'orderId' })
  order: any;

  @Column()
  userId: string;

  @Column()
  companyId: string;

  @Column({ nullable: true })
  carrierId: string;

  @ManyToOne(() => Carrier, { nullable: true })
  @JoinColumn({ name: 'carrierId' })
  carrier: Carrier;

  @Column({ unique: true })
  shipmentNumber: string;

  @Column({ type: 'jsonb' })
  origin: Record<string, any>;

  @Column({ type: 'jsonb' })
  destination: Record<string, any>;

  @Column({ type: 'jsonb' })
  cargoDetails: Record<string, any>;

  @Column()
  incoterms: string;

  @Column({ type: 'enum', enum: ShipmentStatus, default: ShipmentStatus.DRAFT })
  status: ShipmentStatus;

  @Column({ nullable: true })
  pickupDate: Date;

  @Column({ nullable: true })
  deliveryDate: Date;

  @Column({ nullable: true })
  blNumber: string;

  @Column({ nullable: true })
  trackingNumber: string;

  @Column({ type: 'jsonb', nullable: true })
  documents: Record<string, any>;

  @Column({ type: 'enum', enum: CustomsStatus, default: CustomsStatus.PENDING })
  customsStatus: CustomsStatus;

  @Column({ type: 'jsonb', nullable: true })
  customsDocs: Record<string, any>;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  shippingCost: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ nullable: true })
  insurancePolicyId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  completedAt: Date;

  @OneToMany(() => ContainerBooking, (container) => container.shipment)
  containers: ContainerBooking[];

  @OneToMany(() => ShipmentTracking, (event) => event.shipment)
  trackingEvents: ShipmentTracking[];
}
