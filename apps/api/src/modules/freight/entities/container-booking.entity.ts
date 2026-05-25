import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Shipment } from './shipment.entity';

export enum ContainerType {
  FCL_20FT = 'FCL_20FT',
  FCL_40FT = 'FCL_40FT',
  FCL_40FT_HC = 'FCL_40FT_HC',
  FCL_45FT = 'FCL_45FT',
  LCL = 'LCL',
  REEFER_20FT = 'REEFER_20FT',
  REEFER_40FT = 'REEFER_40FT',
  OPEN_TOP = 'OPEN_TOP',
  FLAT_RACK = 'FLAT_RACK',
  TANK = 'TANK',
  BULK = 'BULK',
}

export enum ContainerStatus {
  BOOKED = 'BOOKED',
  CONFIRMED = 'CONFIRMED',
  EMPTY_PICKED_UP = 'EMPTY_PICKED_UP',
  LOADED = 'LOADED',
  IN_TRANSIT = 'IN_TRANSIT',
  ARRIVED = 'ARRIVED',
  CUSTOMS_HOLD = 'CUSTOMS_HOLD',
  RELEASED = 'RELEASED',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
}

@Entity('container_bookings')
@Index(['shipmentId'])
@Index(['containerNumber'])
export class ContainerBooking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shipmentId: string;

  @ManyToOne(() => Shipment, (shipment) => shipment.containers)
  @JoinColumn({ name: 'shipmentId' })
  shipment: Shipment;

  @Column({ nullable: true })
  containerNumber: string;

  @Column({ type: 'enum', enum: ContainerType })
  containerType: ContainerType;

  @Column({ nullable: true })
  sealNumber: string;

  @Column({ nullable: true })
  bookingNumber: string;

  @Column({ nullable: true })
  bookingConfirmation: string;

  @Column({ nullable: true })
  carrierBookingRef: string;

  @Column({ type: 'enum', enum: ContainerStatus, default: ContainerStatus.BOOKED })
  status: ContainerStatus;

  @Column({ nullable: true })
  vesselName: string;

  @Column({ nullable: true })
  voyageNumber: string;

  @Column({ nullable: true })
  pol: string;

  @Column({ nullable: true })
  pod: string;

  @Column({ nullable: true })
  etd: Date;

  @Column({ nullable: true })
  eta: Date;

  @Column({ nullable: true })
  atd: Date;

  @Column({ nullable: true })
  ata: Date;

  @Column({ nullable: true })
  emptyPickupDate: Date;

  @Column({ nullable: true })
  cargoReceiptDate: Date;

  @Column({ nullable: true })
  releaseDate: Date;

  @Column({ nullable: true })
  returnDueDate: Date;

  @Column({ type: 'jsonb', nullable: true })
  charges: object;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
