import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CarrierIntegrationService, CarrierQuoteRequest, CarrierQuoteResponse, TransportMode } from './carrier-integration.service';

// ============================================
// LOCAL ENUM DEFINITIONS (mirrors Prisma schema)
// ============================================

export enum QuoteStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  BOOKED = 'BOOKED',
  CANCELLED = 'CANCELLED',
}

export enum ShipmentStatus {
  DRAFT = 'DRAFT',
  BOOKED = 'BOOKED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  CUSTOMS_CLEARANCE = 'CUSTOMS_CLEARANCE',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  EXCEPTION = 'EXCEPTION',
}
import {
  FreightQuoteRequestDto,
  ContainerQuoteRequestDto,
  BookingRequestDto,
  ContainerBookingRequestDto,
  FreightQuoteResponseDto,
  CarrierRateDto,
  RouteCheckDto,
  CarrierResponseDto,
} from './dto/quote-request.dto';
import {
  BookingConfirmationDto,
  BookingDetailsDto,
} from './dto/booking-request.dto';

interface QuoteAggregationResult {
  quotes: CarrierQuoteResponse[];
  errors: Array<{ carrier: string; error: string }>;
  responseTime: number;
}

@Injectable()
export class FreightService {
  private readonly logger = new Logger(FreightService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly carrierIntegration: CarrierIntegrationService,
  ) {}

  // ============================================
  // QUOTE MANAGEMENT
  // ============================================

  /**
   * Get freight quotes from multiple carriers
   * Aggregates rates from DHL, FedEx, UPS, Maersk, and FreightOS
   */
  async getQuotes(
    request: FreightQuoteRequestDto,
    userId: string,
    companyId: string,
  ): Promise<FreightQuoteResponseDto> {
    const startTime = Date.now();
    this.logger.log(`Starting quote aggregation for user ${userId}`);

    // Prepare carrier quote request
    const carrierRequest: CarrierQuoteRequest = {
      origin: request.origin,
      destination: request.destination,
      cargoDetails: request.cargoDetails,
      transportMode: request.transportMode,
      departureDate: request.departureDate,
      currency: request.currency || 'USD',
    };

    // Get quotes from carriers based on transport mode
    const carriers = this.getCarriersForTransportMode(request.transportMode);
    const filteredCarriers = request.preferredCarriers?.length
      ? carriers.filter((c) => request.preferredCarriers!.includes(c))
      : carriers;

    // Aggregate quotes concurrently
    const { quotes, errors } = await this.aggregateCarrierQuotes(
      carrierRequest,
      filteredCarriers,
    );

    // Log errors but don't fail the request
    if (errors.length > 0) {
      this.logger.warn(`Quote aggregation errors: ${JSON.stringify(errors)}`);
    }

    // Sort quotes by total rate
    const sortedQuotes = quotes.sort((a, b) => a.totalRate - b.totalRate);

    // Save quotes to database
    const savedQuotes = await this.saveQuotes(
      sortedQuotes,
      request,
      userId,
      companyId,
    );

    // Map to response DTOs
    const rates: CarrierRateDto[] = savedQuotes.map((quote) => ({
      carrierId: quote.carrierId,
      carrierCode: quote.carrier.code,
      carrierName: quote.carrier.name,
      serviceType: quote.serviceType || 'STANDARD',
      baseRate: Number(quote.baseRate),
      surcharges: quote.surcharges as Array<{ name: string; amount: number; description?: string }>,
      fuelSurcharge: Number(quote.fuelSurcharge),
      originCharges: Number(quote.originCharges),
      destCharges: Number(quote.destCharges),
      totalRate: Number(quote.totalRate),
      currency: quote.currency,
      transitDays: quote.transitDays || 0,
      estimatedDeparture: quote.departureDate?.toISOString(),
      estimatedArrival: quote.arrivalDate?.toISOString(),
      validUntil: quote.validUntil.toISOString(),
      quoteId: quote.id,
    }));

    this.logger.log(
      `Quote aggregation completed in ${Date.now() - startTime}ms with ${rates.length} quotes`,
    );

    return {
      rates,
      transportMode: request.transportMode,
      currency: request.currency || 'USD',
      totalQuotes: rates.length,
      filtered: errors.length > 0,
    };
  }

  /**
   * Get a specific quote by ID
   */
  async getQuoteById(quoteId: string, userId: string): Promise<CarrierRateDto> {
    const quote = await this.prisma.freightQuote.findFirst({
      where: {
        id: quoteId,
        userId,
      },
      include: {
        carrier: true,
      },
    });

    if (!quote) {
      throw new NotFoundException(`Quote with ID ${quoteId} not found`);
    }

    if (quote.status === QuoteStatus.EXPIRED || new Date() > quote.expiresAt) {
      await this.prisma.freightQuote.update({
        where: { id: quoteId },
        data: { status: QuoteStatus.EXPIRED },
      });
    }

    return {
      carrierId: quote.carrierId,
      carrierCode: quote.carrier.code,
      carrierName: quote.carrier.name,
      serviceType: quote.serviceType || 'STANDARD',
      baseRate: Number(quote.baseRate),
      surcharges: quote.surcharges as Array<{ name: string; amount: number; description?: string }>,
      fuelSurcharge: Number(quote.fuelSurcharge),
      originCharges: Number(quote.originCharges),
      destCharges: Number(quote.destCharges),
      totalRate: Number(quote.totalRate),
      currency: quote.currency,
      transitDays: quote.transitDays || 0,
      estimatedDeparture: quote.departureDate?.toISOString(),
      estimatedArrival: quote.arrivalDate?.toISOString(),
      validUntil: quote.validUntil.toISOString(),
      quoteId: quote.id,
    };
  }

  // ============================================
  // CONTAINER QUOTES
  // ============================================

  /**
   * Get container shipping quotes
   */
  async getContainerQuote(
    request: ContainerQuoteRequestDto,
    userId: string,
    companyId: string,
  ): Promise<FreightQuoteResponseDto> {
    const startTime = Date.now();
    this.logger.log(`Starting container quote for user ${userId}`);

    // Only support ocean transport for containers
    if (request.containerType.startsWith('FCL') || request.containerType === 'LCL') {
      return this.getOceanContainerQuotes(request, userId, companyId);
    }

    throw new BadRequestException('Invalid container type for container quote');
  }

  private async getOceanContainerQuotes(
    request: ContainerQuoteRequestDto,
    userId: string,
    companyId: string,
  ): Promise<FreightQuoteResponseDto> {
    const carrierRequest: CarrierQuoteRequest = {
      origin: request.origin,
      destination: request.destination,
      cargoDetails: {
        weight: request.weight,
        containerType: request.containerType,
        pieces: 1,
      },
      transportMode: TransportMode.OCEAN,
      departureDate: request.shipmentDate,
      currency: 'USD',
    };

    const carriers = request.preferredCarriers?.length
      ? request.preferredCarriers
      : ['MAERSK', 'MSC', 'COSCO', 'EVERGREEN', 'HAPAG'];

    const { quotes } = await this.aggregateCarrierQuotes(carrierRequest, carriers);
    const sortedQuotes = quotes.sort((a, b) => a.totalRate - b.totalRate);

    const savedQuotes = await this.saveQuotes(
      sortedQuotes,
      {
        origin: request.origin,
        destination: request.destination,
        cargoDetails: { weight: request.weight, pieces: 1, containerType: request.containerType },
        transportMode: TransportMode.OCEAN,
        incoterms: request.incoterms,
      },
      userId,
      companyId,
    );

    const rates: CarrierRateDto[] = savedQuotes.map((quote) => ({
      carrierId: quote.carrierId,
      carrierCode: quote.carrier.code,
      carrierName: quote.carrier.name,
      serviceType: quote.serviceType || 'FCL',
      baseRate: Number(quote.baseRate),
      surcharges: quote.surcharges as Array<{ name: string; amount: number; description?: string }>,
      fuelSurcharge: Number(quote.fuelSurcharge),
      originCharges: Number(quote.originCharges),
      destCharges: Number(quote.destCharges),
      totalRate: Number(quote.totalRate),
      currency: quote.currency,
      transitDays: quote.transitDays || 0,
      estimatedDeparture: quote.departureDate?.toISOString(),
      estimatedArrival: quote.arrivalDate?.toISOString(),
      validUntil: quote.validUntil.toISOString(),
      quoteId: quote.id,
    }));

    return {
      rates,
      transportMode: TransportMode.OCEAN,
      currency: 'USD',
      totalQuotes: rates.length,
      filtered: false,
    };
  }

  // ============================================
  // BOOKING
  // ============================================

  /**
   * Book freight based on a quote
   */
  async bookFreight(
    request: BookingRequestDto,
    userId: string,
    companyId: string,
  ): Promise<BookingConfirmationDto> {
    // Get the quote
    const quote = await this.prisma.freightQuote.findFirst({
      where: {
        id: request.quoteId,
        userId,
        status: QuoteStatus.ACTIVE,
      },
      include: {
        carrier: true,
      },
    });

    if (!quote) {
      throw new NotFoundException('Quote not found or expired');
    }

    // Check if quote is still valid
    if (new Date() > quote.expiresAt) {
      await this.prisma.freightQuote.update({
        where: { id: quote.id },
        data: { status: QuoteStatus.EXPIRED },
      });
      throw new BadRequestException('Quote has expired');
    }

    // Create shipment
    const shipment = await this.createShipmentFromQuote(quote, request, userId, companyId);

    // Update quote status
    await this.prisma.freightQuote.update({
      where: { id: quote.id },
      data: { status: QuoteStatus.BOOKED },
    });

    // Get or create booking reference
    const bookingReference = `BKG-${new Date().getFullYear()}-${uuidv4().slice(0, 8).toUpperCase()}`;

    return {
      bookingId: shipment.id,
      bookingReference,
      status: 'CONFIRMED',
      confirmedAt: new Date().toISOString(),
      estimatedPickup: quote.departureDate?.toISOString(),
      estimatedDelivery: quote.arrivalDate?.toISOString(),
      message: `Your booking with ${quote.carrier.name} has been confirmed.`,
      shipmentId: shipment.id,
      shipmentNumber: shipment.shipmentNumber,
    };
  }

  /**
   * Book container shipping
   */
  async bookContainer(
    request: ContainerBookingRequestDto,
    userId: string,
    companyId: string,
  ): Promise<BookingConfirmationDto> {
    // First get container quotes
    const quoteResponse = await this.getContainerQuote(
      request.quoteDetails,
      userId,
      companyId,
    );

    if (quoteResponse.rates.length === 0) {
      throw new BadRequestException('No carriers available for this container booking');
    }

    // Select the best quote
    const bestQuote = quoteResponse.rates[0];

    // Book the freight
    const booking = await this.bookFreight(
      {
        quoteId: bestQuote.quoteId,
        pickupDate: request.quoteDetails.shipmentDate,
      },
      userId,
      companyId,
    );

    // Create container booking record
    await this.prisma.containerBooking.create({
      data: {
        shipmentId: booking.shipmentId!,
        containerType: request.quoteDetails.containerType as any,
        status: 'BOOKED',
        bookingNumber: booking.bookingReference,
        charges: JSON.stringify({
          baseRate: bestQuote.baseRate,
          surcharges: bestQuote.surcharges,
          fuelSurcharge: bestQuote.fuelSurcharge,
          totalRate: bestQuote.totalRate,
        }),
      },
    });

    return booking;
  }

  // ============================================
  // CARRIERS
  // ============================================

  /**
   * List all active carriers
   */
  async listCarriers(filters?: {
    type?: string[];
    transportMode?: TransportMode;
  }): Promise<CarrierResponseDto[]> {
    const where: Record<string, unknown> = { isActive: true };

    if (filters?.type?.length) {
      where.type = { hasSome: filters.type };
    }

    const carriers = await this.prisma.carrier.findMany({
      where,
      orderBy: { rating: 'desc' },
    });

    // If no carriers in DB, return predefined carriers
    if (carriers.length === 0) {
      return this.getPredefinedCarriers(filters?.transportMode);
    }

    return carriers.map((carrier) => ({
      id: carrier.id,
      name: carrier.name,
      code: carrier.code,
      types: carrier.type as string[],
      logo: carrier.logo || undefined,
      rating: carrier.rating ? Number(carrier.rating) : undefined,
      website: carrier.website || undefined,
      contactEmail: carrier.contactEmail || undefined,
      supportPhone: carrier.supportPhone || undefined,
      isActive: carrier.isActive,
    }));
  }

  /**
   * Get carrier details by ID
   */
  async getCarrierById(carrierId: string): Promise<CarrierResponseDto> {
    const carrier = await this.prisma.carrier.findUnique({
      where: { id: carrierId },
    });

    if (!carrier) {
      throw new NotFoundException(`Carrier with ID ${carrierId} not found`);
    }

    return {
      id: carrier.id,
      name: carrier.name,
      code: carrier.code,
      types: carrier.type as string[],
      logo: carrier.logo || undefined,
      rating: carrier.rating ? Number(carrier.rating) : undefined,
      website: carrier.website || undefined,
      contactEmail: carrier.contactEmail || undefined,
      supportPhone: carrier.supportPhone || undefined,
      isActive: carrier.isActive,
    };
  }

  // ============================================
  // ROUTES
  // ============================================

  /**
   * Check available routes
   */
  async checkRoutes(
    origin: { country: string; port?: string; city?: string },
    destination: { country: string; port?: string; city?: string },
    transportMode: TransportMode,
  ): Promise<RouteCheckDto[]> {
    const routes: RouteCheckDto[] = [];

    // Check active routes
    const routeCheck = await this.carrierIntegration.checkRoute({
      origin,
      destination,
      transportMode,
    });

    routes.push({
      origin,
      destination,
      transportMode,
      available: routeCheck.available,
      estimatedTransitDays: routeCheck.estimatedTransitDays,
      transitPorts: routeCheck.transitPorts,
      notes: routeCheck.notes,
    });

    return routes;
  }

  // ============================================
  // PRIVATE METHODS
  // ============================================

  private getCarriersForTransportMode(transportMode: TransportMode): string[] {
    switch (transportMode) {
      case 'AIR':
      case 'COURIER':
        return ['DHL', 'FEDEX', 'UPS'];
      case 'OCEAN':
        return ['MAERSK', 'MSC', 'COSCO', 'EVERGREEN', 'HAPAG', 'ONE'];
      case 'TRUCK':
        return ['DHL', 'FEDEX', 'UPS'];
      case 'RAIL':
        return ['RAIL_PROVIDER'];
      case 'MULTIMODAL':
        return ['DHL', 'MAERSK'];
      default:
        return ['DHL', 'FEDEX', 'UPS', 'MAERSK'];
    }
  }

  private async aggregateCarrierQuotes(
    request: CarrierQuoteRequest,
    carriers: string[],
  ): Promise<QuoteAggregationResult> {
    const quotes: CarrierQuoteResponse[] = [];
    const errors: Array<{ carrier: string; error: string }> = [];
    const startTime = Date.now();

    // Create quote promises for all carriers
    const quotePromises = carriers.map(async (carrierCode) => {
      try {
        let quote: CarrierQuoteResponse;

        switch (carrierCode.toUpperCase()) {
          case 'DHL':
            quote = await this.carrierIntegration.getDHLQuote(request);
            break;
          case 'FEDEX':
            quote = await this.carrierIntegration.getFedExQuote(request);
            break;
          case 'UPS':
            quote = await this.carrierIntegration.getUPSQuote(request);
            break;
          case 'MAERSK':
            quote = await this.carrierIntegration.getMaerskQuote(request);
            break;
          case 'MSC':
          case 'COSCO':
          case 'EVERGREEN':
          case 'HAPAG':
          case 'ONE':
            // Use FreightOS for ocean carriers
            const freightOsQuotes = await this.carrierIntegration.getFreightOSQuotes(request);
            const specificQuote = freightOsQuotes.find(
              (q) => q.carrierCode.toUpperCase() === carrierCode.toUpperCase(),
            );
            if (specificQuote) {
              quote = specificQuote;
            } else {
              throw new Error(`Carrier ${carrierCode} not available in response`);
            }
            break;
          default:
            throw new Error(`Unknown carrier: ${carrierCode}`);
        }

        return { carrier: carrierCode, quote, error: null };
      } catch (error) {
        return {
          carrier: carrierCode,
          quote: null,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    });

    // Execute all quotes concurrently
    const results = await Promise.allSettled(quotePromises);

    for (const result of results) {
      if (result.status === 'fulfilled' && result.value.quote) {
        quotes.push(result.value.quote);
      } else if (result.status === 'fulfilled' && result.value.error) {
        errors.push({ carrier: result.value.carrier, error: result.value.error });
      } else if (result.status === 'rejected') {
        const error = result.reason;
        errors.push({
          carrier: 'UNKNOWN',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return {
      quotes,
      errors,
      responseTime: Date.now() - startTime,
    };
  }

  private async saveQuotes(
    quotes: CarrierQuoteResponse[],
    request: FreightQuoteRequestDto | ContainerQuoteRequestDto,
    userId: string,
    companyId: string,
  ): Promise<Array<any>> {
    const savedQuotes = [];
    const transportMode = 'transportMode' in request ? request.transportMode : 'OCEAN';

    for (const quote of quotes) {
      // Get or create carrier
      let carrier = await this.prisma.carrier.findUnique({
        where: { code: quote.carrierCode },
      });

      if (!carrier) {
        carrier = await this.prisma.carrier.create({
          data: {
            name: quote.carrierName,
            code: quote.carrierCode,
            type: ['OCEAN', 'AIR', 'TRUCK'].includes(transportMode)
              ? [transportMode === 'OCEAN' ? 'SHIPPING_LINE' : 'FREIGHT_FORWARDER']
              : ['FREIGHT_FORWARDER'],
            isActive: true,
            rating: 4.0,
          },
        });
      }

      // Calculate expiration (typically 7 days for ocean, 24 hours for express)
      const isExpress = transportMode === 'AIR' || transportMode === 'COURIER';
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + (isExpress ? 1 : 14));

      const savedQuote = await this.prisma.freightQuote.create({
        data: {
          userId,
          companyId,
          carrierId: carrier.id,
          origin: request.origin as any,
          destination: request.destination as any,
          cargoDetails: 'cargoDetails' in request ? JSON.parse(JSON.stringify(request.cargoDetails)) : undefined,
          incoterms: 'incoterms' in request ? request.incoterms : undefined,
          transportMode: transportMode as any,
          serviceType: quote.serviceType,
          transitDays: quote.transitDays,
          departureDate: quote.estimatedDeparture ? new Date(quote.estimatedDeparture) : null,
          arrivalDate: quote.estimatedArrival ? new Date(quote.estimatedArrival) : null,
          baseRate: quote.baseRate,
          surcharges: quote.surcharges as any,
          fuelSurcharge: quote.fuelSurcharge,
          originCharges: quote.originCharges,
          destCharges: quote.destCharges,
          totalRate: quote.totalRate,
          currency: quote.currency,
          validUntil: new Date(quote.validUntil),
          expiresAt,
          quoteData: quote.rawResponse as any || {},
          status: QuoteStatus.ACTIVE,
        },
        include: {
          carrier: true,
        },
      });

      savedQuotes.push(savedQuote);
    }

    return savedQuotes;
  }

  private async createShipmentFromQuote(
    quote: any,
    bookingRequest: BookingRequestDto,
    userId: string,
    companyId: string,
  ) {
    // Generate shipment number
    const year = new Date().getFullYear();
    const count = await this.prisma.shipment.count();
    const shipmentNumber = `SHP-${year}-${String(count + 1).padStart(5, '0')}`;

    // Merge origin/destination with potential updates from booking request
    const origin = bookingRequest.pickupAddress
      ? bookingRequest.pickupAddress
      : quote.origin;
    const destination = bookingRequest.deliveryAddress
      ? bookingRequest.deliveryAddress
      : quote.destination;

    return this.prisma.shipment.create({
      data: {
        userId,
        companyId,
        carrierId: quote.carrierId,
        shipmentNumber,
        origin: origin as any,
        destination: destination as any,
        cargoDetails: quote.cargoDetails,
        incoterms: quote.incoterms || 'FOB',
        transportMode: quote.transportMode,
        serviceType: quote.serviceType,
        status: ShipmentStatus.BOOKED,
        pickupDate: bookingRequest.pickupDate ? new Date(bookingRequest.pickupDate) : quote.departureDate,
        shippingCost: quote.totalRate,
        currency: quote.currency,
      },
    });
  }

  private getPredefinedCarriers(transportMode?: TransportMode): CarrierResponseDto[] {
    const allCarriers: CarrierResponseDto[] = [
      {
        id: 'dhl-express',
        name: 'DHL Express',
        code: 'DHL',
        types: ['EXPRESS', 'COURIER', 'FREIGHT_FORWARDER'],
        rating: 4.5,
        website: 'https://www.dhl.com',
        contactEmail: 'express@dhl.com',
        supportPhone: '+1-800-xxx-xxxx',
        isActive: true,
      },
      {
        id: 'fedex-express',
        name: 'FedEx',
        code: 'FEDEX',
        types: ['EXPRESS', 'COURIER', 'FREIGHT_FORWARDER'],
        rating: 4.4,
        website: 'https://www.fedex.com',
        contactEmail: 'express@fedex.com',
        supportPhone: '+1-800-xxx-xxxx',
        isActive: true,
      },
      {
        id: 'ups-express',
        name: 'UPS',
        code: 'UPS',
        types: ['EXPRESS', 'COURIER', 'FREIGHT_FORWARDER'],
        rating: 4.3,
        website: 'https://www.ups.com',
        contactEmail: 'support@ups.com',
        supportPhone: '+1-800-xxx-xxxx',
        isActive: true,
      },
      {
        id: 'maersk-line',
        name: 'Maersk',
        code: 'MAERSK',
        types: ['SHIPPING_LINE'],
        rating: 4.2,
        website: 'https://www.maersk.com',
        contactEmail: 'info@maersk.com',
        supportPhone: '+1-800-xxx-xxxx',
        isActive: true,
      },
      {
        id: 'msc-line',
        name: 'MSC',
        code: 'MSC',
        types: ['SHIPPING_LINE'],
        rating: 4.1,
        website: 'https://www.msc.com',
        contactEmail: 'info@msc.com',
        isActive: true,
      },
      {
        id: 'cosco-line',
        name: 'COSCO',
        code: 'COSCO',
        types: ['SHIPPING_LINE'],
        rating: 4.0,
        website: 'https://www.cosco.com',
        contactEmail: 'info@cosco.com',
        isActive: true,
      },
    ];

    if (!transportMode) {
      return allCarriers;
    }

    // Filter by transport mode capability
    const modeMap: Record<TransportMode, string[]> = {
      AIR: ['EXPRESS', 'COURIER'],
      OCEAN: ['SHIPPING_LINE'],
      TRUCK: ['FREIGHT_FORWARDER', 'TRUCKING'],
      RAIL: ['RAIL'],
      MULTIMODAL: ['FREIGHT_FORWARDER'],
      COURIER: ['EXPRESS', 'COURIER'],
    };

    const relevantTypes = modeMap[transportMode] || [];

    return allCarriers.filter((carrier) =>
      carrier.types.some((type) => relevantTypes.includes(type)),
    );
  }
}
