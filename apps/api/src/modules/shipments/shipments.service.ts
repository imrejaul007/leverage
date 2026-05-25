import { Injectable } from '@nestjs/common';

interface Shipment {
  id: string;
  userId: string;
  orderId?: string;
  shipmentNumber: string;
  status: string;
  carrier?: string;
  origin: any;
  destination: any;
  trackingNumber?: string;
  blNumber?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface TrackingEvent {
  id: string;
  shipmentId: string;
  status: string;
  location?: string;
  description: string;
  timestamp: Date;
}

@Injectable()
export class ShipmentsService {
  private shipments: Map<string, Shipment> = new Map();
  private trackingEvents: Map<string, TrackingEvent[]> = new Map();
  private idCounter = 0;

  async createShipment(dto: any): Promise<Shipment> {
    const id = `ship_${++this.idCounter}`;
    const shipment: Shipment = {
      id,
      userId: dto.userId,
      orderId: dto.orderId,
      shipmentNumber: `SHP-${new Date().getFullYear()}-${String(this.idCounter).padStart(6, '0')}`,
      status: 'DRAFT',
      origin: dto.origin,
      destination: dto.destination,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.shipments.set(id, shipment);
    return shipment;
  }

  async getShipments(userId: string): Promise<Shipment[]> {
    const result: Shipment[] = [];
    this.shipments.forEach((shipment) => {
      if (shipment.userId === userId) {
        result.push(shipment);
      }
    });
    return result.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  async getShipment(id: string): Promise<Shipment | null> {
    return this.shipments.get(id) || null;
  }

  async getTracking(id: string): Promise<TrackingEvent[]> {
    return this.trackingEvents.get(id) || this.getMockTracking(id);
  }

  async updateShipment(id: string, dto: any): Promise<Shipment | null> {
    const shipment = this.shipments.get(id);
    if (!shipment) return null;

    const updated = { ...shipment, ...dto, updatedAt: new Date() };
    this.shipments.set(id, updated);
    return updated;
  }

  async cancelShipment(id: string): Promise<{ success: boolean }> {
    const shipment = this.shipments.get(id);
    if (!shipment) return { success: false };

    shipment.status = 'CANCELLED';
    shipment.updatedAt = new Date();
    this.shipments.set(id, shipment);
    return { success: true };
  }

  private getMockTracking(id: string): TrackingEvent[] {
    const events: TrackingEvent[] = [
      {
        id: `${id}_1`,
        shipmentId: id,
        status: 'BOOKED',
        location: 'Shanghai, China',
        description: 'Shipment booked and confirmed',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: `${id}_2`,
        shipmentId: id,
        status: 'PICKED_UP',
        location: 'Shanghai Port',
        description: 'Container picked up from shipper',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: `${id}_3`,
        shipmentId: id,
        status: 'LOADED',
        location: 'Shanghai Port',
        description: 'Container loaded on vessel',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        id: `${id}_4`,
        shipmentId: id,
        status: 'DEPARTED',
        location: 'Shanghai Port',
        description: 'Vessel departed',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: `${id}_5`,
        shipmentId: id,
        status: 'IN_TRANSIT',
        location: 'Pacific Ocean',
        description: 'Vessel in transit',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ];
    return events;
  }
}
