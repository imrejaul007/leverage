import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FreightService {
  constructor(private prisma: PrismaService) {}

  async getQuotes(request: any, userId: string, companyId: string) {
    return {
      rates: [
        {
          carrierId: 'dhl-1',
          carrierCode: 'DHL',
          carrierName: 'DHL Express',
          serviceType: 'EXPRESS',
          baseRate: 150,
          surcharges: [],
          fuelSurcharge: 25,
          originCharges: 10,
          destCharges: 15,
          totalRate: 200,
          currency: 'USD',
          transitDays: 3,
          estimatedDeparture: new Date().toISOString(),
          estimatedArrival: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          quoteId: crypto.randomUUID(),
        },
        {
          carrierId: 'fedex-1',
          carrierCode: 'FEDEX',
          carrierName: 'FedEx',
          serviceType: 'PRIORITY',
          baseRate: 175,
          surcharges: [],
          fuelSurcharge: 30,
          originCharges: 12,
          destCharges: 18,
          totalRate: 235,
          currency: 'USD',
          transitDays: 2,
          estimatedDeparture: new Date().toISOString(),
          estimatedArrival: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          quoteId: crypto.randomUUID(),
        },
      ],
      transportMode: request.transportMode || 'AIR',
      currency: 'USD',
      totalQuotes: 2,
      filtered: false,
    };
  }

  async getQuoteById(quoteId: string) {
    return {
      carrierId: 'dhl-1',
      carrierCode: 'DHL',
      carrierName: 'DHL Express',
      serviceType: 'EXPRESS',
      baseRate: 150,
      surcharges: [],
      fuelSurcharge: 25,
      originCharges: 10,
      destCharges: 15,
      totalRate: 200,
      currency: 'USD',
      transitDays: 3,
      estimatedDeparture: new Date().toISOString(),
      estimatedArrival: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      quoteId: quoteId,
    };
  }

  async getContainerQuote(request: any, userId: string, companyId: string) {
    return {
      rates: [
        {
          carrierId: 'maersk-1',
          carrierCode: 'MAERSK',
          carrierName: 'Maersk',
          serviceType: 'FCL',
          baseRate: 2500,
          surcharges: [],
          fuelSurcharge: 350,
          originCharges: 150,
          destCharges: 200,
          totalRate: 3200,
          currency: 'USD',
          transitDays: 28,
          estimatedDeparture: new Date().toISOString(),
          estimatedArrival: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
          validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          quoteId: crypto.randomUUID(),
        },
      ],
      transportMode: 'OCEAN',
      currency: 'USD',
      totalQuotes: 1,
      filtered: false,
    };
  }

  async bookFreight(request: any, userId: string, companyId: string) {
    return {
      bookingId: crypto.randomUUID(),
      bookingReference: `BKG-${Date.now()}`,
      status: 'CONFIRMED',
      confirmedAt: new Date().toISOString(),
      estimatedPickup: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      message: 'Your booking has been confirmed.',
      shipmentId: crypto.randomUUID(),
      shipmentNumber: `SHP-${Date.now()}`,
    };
  }

  async bookContainer(request: any, userId: string, companyId: string) {
    return {
      bookingId: crypto.randomUUID(),
      bookingReference: `BKG-${Date.now()}`,
      status: 'CONFIRMED',
      confirmedAt: new Date().toISOString(),
      estimatedPickup: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDelivery: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
      message: 'Your container booking has been confirmed.',
      shipmentId: crypto.randomUUID(),
      shipmentNumber: `SHP-${Date.now()}`,
    };
  }

  async listCarriers(filters?: any) {
    return [
      { id: 'dhl-1', name: 'DHL Express', code: 'DHL', types: ['EXPRESS', 'COURIER'], rating: 4.5, isActive: true },
      { id: 'fedex-1', name: 'FedEx', code: 'FEDEX', types: ['EXPRESS', 'COURIER'], rating: 4.4, isActive: true },
      { id: 'ups-1', name: 'UPS', code: 'UPS', types: ['EXPRESS', 'COURIER'], rating: 4.3, isActive: true },
      { id: 'maersk-1', name: 'Maersk', code: 'MAERSK', types: ['SHIPPING_LINE'], rating: 4.2, isActive: true },
      { id: 'msc-1', name: 'MSC', code: 'MSC', types: ['SHIPPING_LINE'], rating: 4.1, isActive: true },
      { id: 'cosco-1', name: 'COSCO', code: 'COSCO', types: ['SHIPPING_LINE'], rating: 4.0, isActive: true },
    ];
  }

  async getCarrierById(carrierId: string) {
    const carriers: Record<string, any> = {
      'dhl-1': { id: 'dhl-1', name: 'DHL Express', code: 'DHL', types: ['EXPRESS', 'COURIER'], rating: 4.5 },
      'fedex-1': { id: 'fedex-1', name: 'FedEx', code: 'FEDEX', types: ['EXPRESS', 'COURIER'], rating: 4.4 },
      'ups-1': { id: 'ups-1', name: 'UPS', code: 'UPS', types: ['EXPRESS', 'COURIER'], rating: 4.3 },
      'maersk-1': { id: 'maersk-1', name: 'Maersk', code: 'MAERSK', types: ['SHIPPING_LINE'], rating: 4.2 },
    };
    if (!carriers[carrierId]) throw new NotFoundException('Carrier not found');
    return carriers[carrierId];
  }

  async checkRoutes(origin: any, destination: any, transportMode: string) {
    return [{
      origin,
      destination,
      transportMode,
      available: true,
      estimatedTransitDays: 14,
      transitPorts: [],
      notes: 'Route available for booking',
    }];
  }
}
