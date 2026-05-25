import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';

// ============================================
// LOCAL ENUM DEFINITIONS (mirrors Prisma schema)
// ============================================

export enum TransportMode {
  OCEAN = 'OCEAN',
  AIR = 'AIR',
  TRUCK = 'TRUCK',
  RAIL = 'RAIL',
  MULTIMODAL = 'MULTIMODAL',
  COURIER = 'COURIER',
}

export interface CarrierQuoteRequest {
  origin: {
    country: string;
    city?: string;
    port?: string;
    address?: string;
    type?: string;
  };
  destination: {
    country: string;
    city?: string;
    port?: string;
    address?: string;
    type?: string;
  };
  cargoDetails: {
    weight: number;
    volume?: number;
    pieces: number;
    containerType?: string;
    unitType?: string;
    isHazardous?: boolean;
    isTemperatureControlled?: boolean;
    temperatureCelsius?: number;
  };
  transportMode: TransportMode;
  departureDate?: string;
  currency?: string;
}

export interface CarrierQuoteResponse {
  carrierId: string;
  carrierCode: string;
  carrierName: string;
  serviceType: string;
  baseRate: number;
  surcharges: Array<{ name: string; amount: number; description?: string }>;
  fuelSurcharge: number;
  originCharges: number;
  destCharges: number;
  totalRate: number;
  currency: string;
  transitDays: number;
  estimatedDeparture?: string;
  estimatedArrival?: string;
  validUntil: string;
  rawResponse?: Record<string, unknown>;
}

export interface RouteCheckRequest {
  origin: { country: string; port?: string; city?: string };
  destination: { country: string; port?: string; city?: string };
  transportMode: TransportMode;
}

export interface RouteCheckResponse {
  available: boolean;
  estimatedTransitDays?: number;
  transitPorts?: string[];
  notes?: string;
}

@Injectable()
export class CarrierIntegrationService {
  private readonly logger = new Logger(CarrierIntegrationService.name);

  constructor(
    private readonly configService: ConfigService,
  ) {}

  // ============================================
  // DHL INTEGRATION
  // ============================================

  async getDHLQuote(request: CarrierQuoteRequest): Promise<CarrierQuoteResponse> {
    const apiKey = this.configService.get<string>('DHL_API_KEY');
    const apiSecret = this.configService.get<string>('DHL_API_SECRET');

    if (!apiKey || !apiSecret) {
      this.logger.warn('DHL API credentials not configured - returning mock data');
      return this.getMockDHLQuote(request);
    }

    try {
      // DHL Express API integration
      const response = await axios.post(
        'https://api.dhl.com/express/rates/v1',
        this.mapToDHLExtQuoteRequest(request),
        {
          headers: {
            'DHL-API-Key': apiKey,
            'Content-Type': 'application/json',
          },
        },
      );

      return this.mapFromDHLExtResponse(response.data, request);
    } catch (error) {
      this.logger.error(`DHL API error: ${error}`);
      throw new HttpException(
        'Failed to get DHL quote',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  private mapToDHLExtQuoteRequest(request: CarrierQuoteRequest): Record<string, unknown> {
    return {
      originCountryCode: request.origin.country,
      originCityName: request.origin.city || request.origin.port,
      destinationCountryCode: request.destination.country,
      destinationCityName: request.destination.city || request.destination.port,
      weight: request.cargoDetails.weight,
      length: 10,
      width: 10,
      height: 10,
      plannedShippingDate: request.departureDate || new Date().toISOString().split('T')[0],
      isCustomsDeclarable: true,
      unit: 'KG',
    };
  }

  private mapFromDHLExtResponse(
    data: Record<string, unknown>,
    request: CarrierQuoteRequest,
  ): CarrierQuoteResponse {
    const products = data.products as Array<Record<string, unknown>>;
    const product = products?.[0] as Record<string, unknown> || {};

    const totalRate = (product.totalPrice as number[]) || [0];
    const currency = (product.currency as string[]) || ['USD'];

    return {
      carrierId: 'dhl-express',
      carrierCode: 'DHL',
      carrierName: 'DHL Express',
      serviceType: (product.productName as string) || 'EXPRESS',
      baseRate: totalRate[0] * 0.85,
      surcharges: [
        { name: 'Fuel Surcharge', amount: totalRate[0] * 0.15 },
      ],
      fuelSurcharge: totalRate[0] * 0.15,
      originCharges: 25,
      destCharges: 25,
      totalRate: totalRate[0],
      currency: currency[0],
      transitDays: (product.totalTransitDays as number) || 5,
      estimatedDeparture: new Date(Date.now() + 86400000).toISOString(),
      estimatedArrival: new Date(Date.now() + 86400000 * 5).toISOString(),
      validUntil: new Date(Date.now() + 86400000 * 7).toISOString(),
      rawResponse: data,
    };
  }

  private getMockDHLQuote(request: CarrierQuoteRequest): CarrierQuoteResponse {
    const baseRate = this.calculateBaseRate(request);
    const transitDays = this.getEstimatedTransitDays(request.transportMode, 'DHL');

    return {
      carrierId: 'dhl-express',
      carrierCode: 'DHL',
      carrierName: 'DHL Express',
      serviceType: request.transportMode === 'AIR' ? 'EXPRESS' : 'ECONOMY',
      baseRate: baseRate,
      surcharges: [
        { name: 'Fuel Surcharge', amount: baseRate * 0.12, description: 'Current fuel adjustment' },
        { name: 'Security Surcharge', amount: 15, description: 'Security handling' },
      ],
      fuelSurcharge: baseRate * 0.12,
      originCharges: 20,
      destCharges: 25,
      totalRate: baseRate + baseRate * 0.12 + 45,
      currency: request.currency || 'USD',
      transitDays,
      estimatedDeparture: new Date(Date.now() + 86400000).toISOString(),
      estimatedArrival: new Date(Date.now() + 86400000 * transitDays).toISOString(),
      validUntil: new Date(Date.now() + 86400000 * 7).toISOString(),
    };
  }

  // ============================================
  // FEDEX INTEGRATION
  // ============================================

  async getFedExQuote(request: CarrierQuoteRequest): Promise<CarrierQuoteResponse> {
    const apiKey = this.configService.get<string>('FEDEX_API_KEY');
    const apiSecret = this.configService.get<string>('FEDEX_API_SECRET');

    if (!apiKey || !apiSecret) {
      this.logger.warn('FedEx API credentials not configured - returning mock data');
      return this.getMockFedExQuote(request);
    }

    try {
      // FedEx Rate API integration
      const response = await axios.post(
        'https://apis.fedex.com/rate/v1/rates/quotes',
        this.mapToFedExQuoteRequest(request),
        {
          headers: {
            'X-Api-Key': apiKey,
            'X-Secret-Key': apiSecret,
            'Content-Type': 'application/json',
          },
        },
      );

      return this.mapFromFedExResponse(response.data, request);
    } catch (error) {
      this.logger.error(`FedEx API error: ${error}`);
      throw new HttpException(
        'Failed to get FedEx quote',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  private mapToFedExQuoteRequest(request: CarrierQuoteRequest): Record<string, unknown> {
    return {
      rateRequestControlParameters: {
        returnTransitTimes: true,
        servicesNeededOnRateFailure: true,
      },
      optimizeForTransportation: true,
      requestedShipment: {
        shipperAddress: {
          city: request.origin.city,
          countryCode: request.origin.country,
        },
        recipientAddress: {
          city: request.destination.city,
          countryCode: request.destination.country,
        },
        shippingChargesPayment: {
          paymentType: 'SENDER',
        },
        serviceType: request.transportMode === 'AIR' ? 'PRIORITY_OVERNIGHT' : 'FEDEX_GROUND',
        packagingType: 'YOUR_PACKAGING',
      },
    };
  }

  private mapFromFedExResponse(
    data: Record<string, unknown>,
    request: CarrierQuoteRequest,
  ): CarrierQuoteResponse {
    const output = data.output as Record<string, unknown> || {};
    const rateResults = output.rateResults as Array<Record<string, unknown>> || [];
    const result = rateResults[0] || {};

    const appliedRates = result.appliedRates as Record<string, unknown> || {};
    const totalNetCharge = appliedRates.totalNetCharge as number || 0;
    const currencyCode = appliedRates.currency as string || 'USD';

    return {
      carrierId: 'fedex-express',
      carrierCode: 'FEDEX',
      carrierName: 'FedEx',
      serviceType: 'GROUND',
      baseRate: totalNetCharge * 0.88,
      surcharges: [{ name: 'Fuel', amount: totalNetCharge * 0.12 }],
      fuelSurcharge: totalNetCharge * 0.12,
      originCharges: 15,
      destCharges: 20,
      totalRate: totalNetCharge,
      currency: currencyCode,
      transitDays: 5,
      estimatedDeparture: new Date(Date.now() + 86400000).toISOString(),
      estimatedArrival: new Date(Date.now() + 86400000 * 5).toISOString(),
      validUntil: new Date(Date.now() + 86400000 * 7).toISOString(),
      rawResponse: data,
    };
  }

  private getMockFedExQuote(request: CarrierQuoteRequest): CarrierQuoteResponse {
    const baseRate = this.calculateBaseRate(request);
    const transitDays = this.getEstimatedTransitDays(request.transportMode, 'FEDEX');

    return {
      carrierId: 'fedex-express',
      carrierCode: 'FEDEX',
      carrierName: 'FedEx',
      serviceType: 'GROUND',
      baseRate: baseRate,
      surcharges: [
        { name: 'Fuel Surcharge', amount: baseRate * 0.10, description: 'Fuel adjustment' },
        { name: 'Residential Delivery', amount: request.destination.address ? 4.50 : 0 },
      ],
      fuelSurcharge: baseRate * 0.10,
      originCharges: 18,
      destCharges: 22,
      totalRate: baseRate + baseRate * 0.10 + 40,
      currency: request.currency || 'USD',
      transitDays,
      estimatedDeparture: new Date(Date.now() + 86400000).toISOString(),
      estimatedArrival: new Date(Date.now() + 86400000 * transitDays).toISOString(),
      validUntil: new Date(Date.now() + 86400000 * 7).toISOString(),
    };
  }

  // ============================================
  // UPS INTEGRATION
  // ============================================

  async getUPSQuote(request: CarrierQuoteRequest): Promise<CarrierQuoteResponse> {
    const clientId = this.configService.get<string>('UPS_CLIENT_ID');
    const clientSecret = this.configService.get<string>('UPS_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      this.logger.warn('UPS API credentials not configured - returning mock data');
      return this.getMockUPSQuote(request);
    }

    try {
      // Get UPS OAuth token
      const tokenResponse = await axios.post(
        'https://onlinetools.ups.com/security/v1/oauth/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const accessToken = (tokenResponse.data as Record<string, string>).access_token;

      // Get UPS Rate
      const rateResponse = await axios.post(
        'https://onlinetools.ups.com/api/rating/v2403',
        this.mapToUPSQuoteRequest(request),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'TransactionSrc': 'LeverageByLerar',
          },
        },
      );

      return this.mapFromUPSResponse(rateResponse.data, request);
    } catch (error) {
      this.logger.error(`UPS API error: ${error}`);
      throw new HttpException(
        'Failed to get UPS quote',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  private mapToUPSQuoteRequest(request: CarrierQuoteRequest): Record<string, unknown> {
    return {
      RateRequest: {
        Request: {
          TransactionReference: {
            CustomerContext: 'FREIGHT_QUOTE',
          },
        },
        Shipment: {
          Shipper: {
            Address: {
              CountryCode: request.origin.country,
              City: request.origin.city,
            },
          },
          ShipTo: {
            Address: {
              CountryCode: request.destination.country,
              City: request.destination.city,
            },
          },
          Package: {
            PackagingType: { Code: 'CP', Description: 'Package' },
            PackageWeight: {
              UnitOfMeasurement: { Code: 'KGS' },
              Weight: request.cargoDetails.weight,
            },
          },
          ShipmentServiceOptions: {},
        },
      },
    };
  }

  private mapFromUPSResponse(
    data: Record<string, unknown>,
    request: CarrierQuoteRequest,
  ): CarrierQuoteResponse {
    const response = data.RateResponse as Record<string, unknown> || {};
    const ratedShipment = (response.RatedShipment as Array<Record<string, unknown>> || [])[0] || {};

    const totalCharges = ratedShipment.TotalCharges as Record<string, unknown> || {};
    const totalRate = parseFloat((totalCharges.MonetaryValue as string) || '0');
    const currency = (totalCharges.CurrencyCode as string) || 'USD';

    return {
      carrierId: 'ups-express',
      carrierCode: 'UPS',
      carrierName: 'UPS',
      serviceType: 'GROUND',
      baseRate: totalRate * 0.88,
      surcharges: [{ name: 'Fuel Surcharge', amount: totalRate * 0.12 }],
      fuelSurcharge: totalRate * 0.12,
      originCharges: 15,
      destCharges: 20,
      totalRate,
      currency,
      transitDays: 5,
      estimatedDeparture: new Date(Date.now() + 86400000).toISOString(),
      estimatedArrival: new Date(Date.now() + 86400000 * 5).toISOString(),
      validUntil: new Date(Date.now() + 86400000 * 7).toISOString(),
      rawResponse: data,
    };
  }

  private getMockUPSQuote(request: CarrierQuoteRequest): CarrierQuoteResponse {
    const baseRate = this.calculateBaseRate(request);
    const transitDays = this.getEstimatedTransitDays(request.transportMode, 'UPS');

    return {
      carrierId: 'ups-express',
      carrierCode: 'UPS',
      carrierName: 'UPS',
      serviceType: 'GROUND',
      baseRate: baseRate,
      surcharges: [
        { name: 'Fuel Surcharge', amount: baseRate * 0.11, description: 'Fuel adjustment' },
        { name: 'UPS Carbon Neutral', amount: 0.70 },
      ],
      fuelSurcharge: baseRate * 0.11,
      originCharges: 16,
      destCharges: 18,
      totalRate: baseRate + baseRate * 0.11 + 34,
      currency: request.currency || 'USD',
      transitDays,
      estimatedDeparture: new Date(Date.now() + 86400000).toISOString(),
      estimatedArrival: new Date(Date.now() + 86400000 * transitDays).toISOString(),
      validUntil: new Date(Date.now() + 86400000 * 7).toISOString(),
    };
  }

  // ============================================
  // MAERSK (OCEAN) INTEGRATION
  // ============================================

  async getMaerskQuote(request: CarrierQuoteRequest): Promise<CarrierQuoteResponse> {
    const apiKey = this.configService.get<string>('MAERSK_API_KEY');

    if (!apiKey) {
      this.logger.warn('Maersk API credentials not configured - returning mock data');
      return this.getMockMaerskQuote(request);
    }

    try {
      const response = await axios.post(
        'https://api.maersk.com/quote/v2/quotes',
        this.mapToMaerskQuoteRequest(request),
        {
          headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json',
          },
        },
      );

      return this.mapFromMaerskResponse(response.data, request);
    } catch (error) {
      this.logger.error(`Maersk API error: ${error}`);
      throw new HttpException(
        'Failed to get Maersk quote',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  private mapToMaerskQuoteRequest(request: CarrierQuoteRequest): Record<string, unknown> {
    return {
      origin: {
        countryCode: request.origin.country,
        city: request.origin.city || request.origin.port,
        facilityCode: request.origin.port,
      },
      destination: {
        countryCode: request.destination.country,
        city: request.destination.city || request.destination.port,
        facilityCode: request.destination.port,
      },
      cargo: {
        weight: request.cargoDetails.weight,
        volume: request.cargoDetails.volume || request.cargoDetails.weight / 200,
        units: request.cargoDetails.pieces,
        containerType: request.cargoDetails.containerType,
        isHazardous: request.cargoDetails.isHazardous,
      },
      scheduledDate: request.departureDate || new Date().toISOString().split('T')[0],
    };
  }

  private mapFromMaerskResponse(
    data: Record<string, unknown>,
    request: CarrierQuoteRequest,
  ): CarrierQuoteResponse {
    const quotes = data.quotes as Array<Record<string, unknown>> || [];
    const quote = quotes[0] || {};

    const priceBreakdown = quote.priceBreakdown as Record<string, unknown> || {};

    return {
      carrierId: 'maersk-line',
      carrierCode: 'MAERSK',
      carrierName: 'Maersk',
      serviceType: (quote.serviceName as string) || 'SEA',
      baseRate: (priceBreakdown.baseRate as number) || 0,
      surcharges: (priceBreakdown.surcharges as Array<{ name: string; amount: number }>) || [],
      fuelSurcharge: (priceBreakdown.baf as number) || 0,
      originCharges: (priceBreakdown.originCharges as number) || 0,
      destCharges: (priceBreakdown.destCharges as number) || 0,
      totalRate: (quote.totalRate as number) || 0,
      currency: (quote.currency as string) || 'USD',
      transitDays: (quote.transitDays as number) || 21,
      estimatedDeparture: quote.etd as string,
      estimatedArrival: quote.eta as string,
      validUntil: quote.validUntil as string,
      rawResponse: data,
    };
  }

  private getMockMaerskQuote(request: CarrierQuoteRequest): CarrierQuoteResponse {
    const containerType = request.cargoDetails.containerType || 'FCL_20FT';
    const containerRates: Record<string, number> = {
      FCL_20FT: 1800,
      FCL_40FT: 3200,
      FCL_40FT_HC: 3600,
      FCL_45FT: 4000,
    };
    const baseRate = containerRates[containerType] || 2000;
    const weightMultiplier = Math.max(1, request.cargoDetails.weight / 10000);
    const adjustedBaseRate = baseRate * weightMultiplier;

    const transitDays = this.getEstimatedTransitDays(TransportMode.OCEAN, 'MAERSK');

    return {
      carrierId: 'maersk-line',
      carrierCode: 'MAERSK',
      carrierName: 'Maersk',
      serviceType: 'SEA FREIGHT',
      baseRate: adjustedBaseRate,
      surcharges: [
        { name: 'BAF', amount: adjustedBaseRate * 0.15, description: 'Bunker Adjustment Factor' },
        { name: 'CAF', amount: adjustedBaseRate * 0.05, description: 'Currency Adjustment Factor' },
        { name: 'PSS', amount: adjustedBaseRate * 0.10, description: 'Peak Season Surcharge' },
        { name: 'THC', amount: 150, description: 'Terminal Handling Charge - Origin' },
        { name: 'DHC', amount: 180, description: 'Documentation & Handling' },
      ],
      fuelSurcharge: adjustedBaseRate * 0.15,
      originCharges: 250,
      destCharges: 300,
      totalRate: adjustedBaseRate + adjustedBaseRate * 0.30 + 730,
      currency: request.currency || 'USD',
      transitDays,
      estimatedDeparture: new Date(Date.now() + 86400000 * 2).toISOString(),
      estimatedArrival: new Date(Date.now() + 86400000 * (2 + transitDays)).toISOString(),
      validUntil: new Date(Date.now() + 86400000 * 14).toISOString(),
    };
  }

  // ============================================
  // FREIGHTOS AGGREGATION
  // ============================================

  async getFreightOSQuotes(request: CarrierQuoteRequest): Promise<CarrierQuoteResponse[]> {
    const apiKey = this.configService.get<string>('FREIGHTOS_API_KEY');

    if (!apiKey) {
      this.logger.warn('FreightOS API credentials not configured - returning mock aggregation');
      return this.getMockFreightOSQuotes(request);
    }

    try {
      const response = await axios.post(
        'https://api.freightos.com/v2/rates/search',
        this.mapToFreightOSRequest(request),
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return this.mapFromFreightOSResponse(response.data, request);
    } catch (error) {
      this.logger.error(`FreightOS API error: ${error}`);
      throw new HttpException(
        'Failed to get FreightOS quotes',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  private mapToFreightOSRequest(request: CarrierQuoteRequest): Record<string, unknown> {
    return {
      origin: {
        country: request.origin.country,
        port: request.origin.port,
        city: request.origin.city,
      },
      destination: {
        country: request.destination.country,
        port: request.destination.port,
        city: request.destination.city,
      },
      cargo: {
        weight: request.cargoDetails.weight,
        volume: request.cargoDetails.volume,
        pieces: request.cargoDetails.pieces,
        containerType: request.cargoDetails.containerType,
      },
      transportMode: request.transportMode,
      departureDate: request.departureDate,
      currency: request.currency,
    };
  }

  private mapFromFreightOSResponse(
    data: Record<string, unknown>,
    request: CarrierQuoteRequest,
  ): CarrierQuoteResponse[] {
    const carriers = data.carriers as Array<Record<string, unknown>> || [];

    return carriers.map((carrier) => {
      const pricing = carrier.pricing as Record<string, unknown> || {};
      const schedule = carrier.schedule as Record<string, unknown> || {};

      return {
        carrierId: (carrier.id as string) || '',
        carrierCode: (carrier.code as string) || '',
        carrierName: (carrier.name as string) || '',
        serviceType: (carrier.serviceType as string) || '',
        baseRate: (pricing.baseRate as number) || 0,
        surcharges: (pricing.surcharges as Array<{ name: string; amount: number }>) || [],
        fuelSurcharge: (pricing.fuelSurcharge as number) || 0,
        originCharges: (pricing.originCharges as number) || 0,
        destCharges: (pricing.destCharges as number) || 0,
        totalRate: (pricing.totalRate as number) || 0,
        currency: (pricing.currency as string) || 'USD',
        transitDays: (schedule.transitDays as number) || 14,
        estimatedDeparture: (schedule.departure as string),
        estimatedArrival: (schedule.arrival as string),
        validUntil: (pricing.validUntil as string),
        rawResponse: carrier,
      };
    });
  }

  private getMockFreightOSQuotes(request: CarrierQuoteRequest): CarrierQuoteResponse[] {
    const mockCarriers = [
      { code: 'MSC', name: 'MSC', transitDays: 22 },
      { code: 'COSCO', name: 'COSCO', transitDays: 24 },
      { code: 'EVERGREEN', name: 'Evergreen', transitDays: 21 },
      { code: 'HAPAG', name: 'Hapag-Lloyd', transitDays: 20 },
      { code: 'ONE', name: 'ONE', transitDays: 23 },
    ];

    return mockCarriers.map((carrier) => {
      const baseRate = this.calculateBaseRate(request) * (0.9 + Math.random() * 0.2);
      return {
        carrierId: carrier.code.toLowerCase(),
        carrierCode: carrier.code,
        carrierName: carrier.name,
        serviceType: 'OCEAN FREIGHT',
        baseRate,
        surcharges: [
          { name: 'BAF', amount: baseRate * 0.12, description: 'Bunker Adjustment Factor' },
          { name: 'CAF', amount: baseRate * 0.05 },
        ],
        fuelSurcharge: baseRate * 0.12,
        originCharges: 200,
        destCharges: 250,
        totalRate: baseRate + baseRate * 0.17 + 450,
        currency: request.currency || 'USD',
        transitDays: carrier.transitDays,
        estimatedDeparture: new Date(Date.now() + 86400000 * 3).toISOString(),
        estimatedArrival: new Date(Date.now() + 86400000 * (3 + carrier.transitDays)).toISOString(),
        validUntil: new Date(Date.now() + 86400000 * 14).toISOString(),
      };
    });
  }

  // ============================================
  // ROUTE CHECK
  // ============================================

  async checkRoute(request: RouteCheckRequest): Promise<RouteCheckResponse> {
    const activeRoutes = this.getActiveRoutes();

    const route = activeRoutes.find(
      (r) =>
        r.origin.country === request.origin.country &&
        r.destination.country === request.destination.country &&
        r.transportMode === request.transportMode,
    );

    if (route) {
      return {
        available: true,
        estimatedTransitDays: route.transitDays,
        transitPorts: route.transitPorts,
        notes: route.notes,
      };
    }

    // For unknown routes, perform live check
    const freightOSKey = this.configService.get<string>('FREIGHTOS_API_KEY');
    if (freightOSKey) {
      try {
        const response = await axios.post(
          'https://api.freightos.com/v2/routes/check',
          request,
          {
            headers: { Authorization: `Bearer ${freightOSKey}` },
          },
        );
        return response.data as RouteCheckResponse;
      } catch {
        this.logger.warn('FreightOS route check failed, using default response');
      }
    }

    return {
      available: true,
      estimatedTransitDays: this.getEstimatedTransitDays(request.transportMode, 'DEFAULT'),
      notes: 'Route available. Contact carrier for specific schedule.',
    };
  }

  private getActiveRoutes(): Array<{
    origin: { country: string };
    destination: { country: string };
    transportMode: TransportMode;
    transitDays: number;
    transitPorts?: string[];
    notes?: string;
  }> {
    return [
      // Asia to Europe (Ocean)
      {
        origin: { country: 'CN' },
        destination: { country: 'DE' },
        transportMode: 'OCEAN' as TransportMode,
        transitDays: 28,
        transitPorts: ['CNSHA', 'SGSIN', 'SuezCanal', 'NLRTM'],
        notes: 'Weekly sailings available',
      },
      {
        origin: { country: 'CN' },
        destination: { country: 'NL' },
        transportMode: 'OCEAN' as TransportMode,
        transitDays: 30,
        transitPorts: ['CNSHA', 'SGSIN', 'NLRTM'],
        notes: 'Direct service available',
      },
      // Asia to US (Ocean)
      {
        origin: { country: 'CN' },
        destination: { country: 'US' },
        transportMode: 'OCEAN' as TransportMode,
        transitDays: 21,
        transitPorts: ['CNSHA', 'LAX', 'LGB'],
        notes: 'West Coast direct service',
      },
      // Europe to US (Ocean)
      {
        origin: { country: 'DE' },
        destination: { country: 'US' },
        transportMode: 'OCEAN' as TransportMode,
        transitDays: 14,
        transitPorts: ['DEHAM', 'USNYC'],
        notes: 'Weekly Transatlantic service',
      },
      // Air routes (common)
      {
        origin: { country: 'CN' },
        destination: { country: 'US' },
        transportMode: 'AIR' as TransportMode,
        transitDays: 3,
        notes: 'Daily flights available',
      },
      {
        origin: { country: 'DE' },
        destination: { country: 'CN' },
        transportMode: 'AIR' as TransportMode,
        transitDays: 4,
        notes: 'Daily flights available',
      },
    ];
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  private calculateBaseRate(request: CarrierQuoteRequest): number {
    const weight = request.cargoDetails.weight;
    const volume = request.cargoDetails.volume || weight / 200;
    const chargeableWeight = Math.max(weight, volume * 200);

    const ratePerKg: Record<TransportMode, number> = {
      AIR: 2.5,
      OCEAN: 0.15,
      TRUCK: 0.8,
      RAIL: 0.4,
      MULTIMODAL: 0.6,
      COURIER: 3.0,
    };

    const baseRate = chargeableWeight * (ratePerKg[request.transportMode] || 1);
    return Math.round(baseRate * 100) / 100;
  }

  private getEstimatedTransitDays(transportMode: TransportMode, carrier: string): number {
    const transitDays: Record<TransportMode, Record<string, number>> = {
      AIR: {
        DHL: 3,
        FEDEX: 4,
        UPS: 4,
        DEFAULT: 4,
      },
      OCEAN: {
        MAERSK: 21,
        MSC: 22,
        DEFAULT: 21,
      },
      TRUCK: {
        DEFAULT: 7,
      },
      RAIL: {
        DEFAULT: 14,
      },
      MULTIMODAL: {
        DEFAULT: 18,
      },
      COURIER: {
        DHL: 2,
        FEDEX: 2,
        UPS: 2,
        DEFAULT: 3,
      },
    };

    return transitDays[transportMode]?.[carrier] || transitDays[transportMode]?.DEFAULT || 7;
  }

  // ============================================
  // CARRIER HEALTH CHECK
  // ============================================

  async checkCarrierHealth(carrierCode: string): Promise<{ available: boolean; latency?: number }> {
    const healthEndpoints: Record<string, string> = {
      DHL: 'https://api.dhl.com/express/health',
      FEDEX: 'https://apis.fedex.com/health',
      UPS: 'https://onlinetools.ups.com/health',
      MAERSK: 'https://api.maersk.com/health',
      FREIGHTOS: 'https://api.freightos.com/health',
    };

    const endpoint = healthEndpoints[carrierCode];
    if (!endpoint) {
      return { available: true }; // Mock carriers always available
    }

    try {
      const start = Date.now();
      await axios.get(endpoint, { timeout: 5000 });
      return { available: true, latency: Date.now() - start };
    } catch {
      return { available: false };
    }
  }
}
