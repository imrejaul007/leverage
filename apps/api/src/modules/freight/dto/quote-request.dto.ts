import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsArray,
  ValidateNested,
  IsDateString,
  Min,
  Max,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

// ============================================
// LOCATION & CARGO DTOs
// ============================================

export class LocationDto {
  @ApiProperty({ example: 'CN', description: 'Country code (ISO 2)' })
  @IsString()
  country: string;

  @ApiPropertyOptional({ example: 'Shanghai', description: 'City name' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'CNSHA', description: 'Port/Airport code' })
  @IsString()
  @IsOptional()
  port?: string;

  @ApiPropertyOptional({ example: '123 Main St, Shanghai', description: 'Full address' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'PORT', description: 'Type: PORT, AIRPORT, CITY, ADDRESS' })
  @IsString()
  @IsOptional()
  type?: 'PORT' | 'AIRPORT' | 'CITY' | 'ADDRESS';
}

export class CargoDetailsDto {
  @ApiProperty({ example: 1000, description: 'Total weight in kg' })
  @IsNumber()
  @Min(0.1)
  weight: number;

  @ApiPropertyOptional({ example: 10, description: 'Volume in cubic meters' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  volume?: number;

  @ApiProperty({ example: 50, description: 'Number of pieces' })
  @IsNumber()
  @Min(1)
  pieces: number;

  @ApiPropertyOptional({
    example: 'FCL_20FT',
    enum: ['FCL_20FT', 'FCL_40FT', 'FCL_40FT_HC', 'FCL_45FT', 'LCL', 'REEFER_20FT', 'REEFER_40FT', 'OPEN_TOP', 'FLAT_RACK', 'TANK', 'BULK'],
    description: 'Container type if applicable',
  })
  @IsString()
  @IsOptional()
  containerType?: string;

  @ApiPropertyOptional({ example: 'Pallets', description: 'Unit type' })
  @IsString()
  @IsOptional()
  unitType?: string;

  @ApiPropertyOptional({ example: true, description: 'Is cargo hazardous' })
  @IsOptional()
  isHazardous?: boolean;

  @ApiPropertyOptional({ example: true, description: 'Is cargo temperature controlled' })
  @IsOptional()
  isTemperatureControlled?: boolean;

  @ApiPropertyOptional({ example: 20, description: 'Temperature in Celsius' })
  @IsNumber()
  @IsOptional()
  temperatureCelsius?: number;
}

export class SurchargeDto {
  @ApiProperty({ example: 'BAF', description: 'Surcharge code' })
  @IsString()
  name: string;

  @ApiProperty({ example: 150.00, description: 'Surcharge amount' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiPropertyOptional({ example: 'Bunker Adjustment Factor' })
  @IsString()
  @IsOptional()
  description?: string;
}

// ============================================
// QUOTE REQUEST DTOs
// ============================================

export class FreightQuoteRequestDto {
  @ApiProperty({ type: LocationDto, description: 'Origin location' })
  @ValidateNested()
  @Type(() => LocationDto)
  origin: LocationDto;

  @ApiProperty({ type: LocationDto, description: 'Destination location' })
  @ValidateNested()
  @Type(() => LocationDto)
  destination: LocationDto;

  @ApiProperty({ type: CargoDetailsDto, description: 'Cargo details' })
  @ValidateNested()
  @Type(() => CargoDetailsDto)
  cargoDetails: CargoDetailsDto;

  @ApiProperty({
    enum: TransportMode,
    example: 'OCEAN',
    description: 'Transport mode',
  })
  @IsEnum(TransportMode)
  transportMode: TransportMode;

  @ApiPropertyOptional({
    example: 'EXW',
    description: 'Incoterms (e.g., EXW, FOB, CIF, DDP)',
  })
  @IsString()
  @IsOptional()
  incoterms?: string;

  @ApiPropertyOptional({
    example: '2024-03-15',
    description: 'Requested departure date',
  })
  @IsDateString()
  @IsOptional()
  departureDate?: string;

  @ApiPropertyOptional({
    example: ['DHL', 'FEDEX', 'MAERSK'],
    description: 'Preferred carriers (leave empty for all)',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferredCarriers?: string[];

  @ApiPropertyOptional({
    example: 'USD',
    description: 'Quote currency',
  })
  @IsString()
  @IsOptional()
  currency?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Request express service',
  })
  @IsOptional()
  expressService?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Request door-to-door service',
  })
  @IsOptional()
  doorToDoor?: boolean;
}

export class ContainerQuoteRequestDto {
  @ApiProperty({ type: LocationDto, description: 'Origin location' })
  @ValidateNested()
  @Type(() => LocationDto)
  origin: LocationDto;

  @ApiProperty({ type: LocationDto, description: 'Destination location' })
  @ValidateNested()
  @Type(() => LocationDto)
  destination: LocationDto;

  @ApiProperty({
    enum: ['FCL_20FT', 'FCL_40FT', 'FCL_40FT_HC', 'FCL_45FT'],
    example: 'FCL_40FT',
    description: 'Container type',
  })
  @IsString()
  containerType: string;

  @ApiProperty({ example: 20000, description: 'Total cargo weight in kg' })
  @IsNumber()
  @Min(100)
  weight: number;

  @ApiPropertyOptional({ example: 'EXW', description: 'Incoterms' })
  @IsString()
  @IsOptional()
  incoterms?: string;

  @ApiPropertyOptional({ example: '2024-03-20', description: 'Expected shipment date' })
  @IsDateString()
  @IsOptional()
  shipmentDate?: string;

  @ApiPropertyOptional({
    example: ['MAERSK', 'MSC', 'COSCO'],
    description: 'Preferred shipping lines',
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferredCarriers?: string[];
}

// ============================================
// BOOKING REQUEST DTOs
// ============================================

export class BookingRequestDto {
  @ApiProperty({ example: 'uuid-of-quote', description: 'Quote ID to book' })
  @IsString()
  quoteId: string;

  @ApiPropertyOptional({ type: LocationDto, description: 'Updated pickup address' })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  pickupAddress?: LocationDto;

  @ApiPropertyOptional({ type: LocationDto, description: 'Updated delivery address' })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  deliveryAddress?: LocationDto;

  @ApiPropertyOptional({
    example: '2024-03-15',
    description: 'Requested pickup date',
  })
  @IsDateString()
  @IsOptional()
  pickupDate?: string;

  @ApiPropertyOptional({ example: 'Handle with care - fragile' })
  @IsString()
  @IsOptional()
  specialInstructions?: string;

  @ApiPropertyOptional({ example: true, description: 'Request pickup confirmation' })
  @IsOptional()
  confirmPickup?: boolean;
}

export class ContainerBookingRequestDto {
  @ApiProperty({ type: ContainerQuoteRequestDto, description: 'Quote details' })
  @ValidateNested()
  @Type(() => ContainerQuoteRequestDto)
  quoteDetails: ContainerQuoteRequestDto;

  @ApiPropertyOptional({ example: 1, description: 'Number of containers' })
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  numberOfContainers?: number;

  @ApiPropertyOptional({ type: LocationDto, description: 'Pickup location for empty container' })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  emptyPickupLocation?: LocationDto;

  @ApiPropertyOptional({ example: 'Shipper Co., Ltd.', description: 'Shipper name' })
  @IsString()
  @IsOptional()
  shipperName?: string;

  @ApiPropertyOptional({ example: 'Consignee Inc.', description: 'Consignee name' })
  @IsString()
  @IsOptional()
  consigneeName?: string;

  @ApiPropertyOptional({ example: 'Order #12345', description: 'Reference number' })
  @IsString()
  @IsOptional()
  referenceNumber?: string;
}

// ============================================
// RESPONSE DTOs
// ============================================

export class CarrierRateDto {
  @ApiProperty({ example: 'uuid', description: 'Carrier ID' })
  carrierId: string;

  @ApiProperty({ example: 'DHL', description: 'Carrier code' })
  carrierCode: string;

  @ApiProperty({ example: 'DHL Express', description: 'Carrier name' })
  carrierName: string;

  @ApiProperty({ example: 'EXPRESS', description: 'Service type' })
  serviceType: string;

  @ApiProperty({ example: 1250.00, description: 'Base rate' })
  baseRate: number;

  @ApiProperty({ example: [], type: [SurchargeDto], description: 'Surcharges' })
  surcharges: SurchargeDto[];

  @ApiProperty({ example: 150.00, description: 'Fuel surcharge' })
  fuelSurcharge: number;

  @ApiProperty({ example: 50.00, description: 'Origin charges' })
  originCharges: number;

  @ApiProperty({ example: 75.00, description: 'Destination charges' })
  destCharges: number;

  @ApiProperty({ example: 1525.00, description: 'Total rate' })
  totalRate: number;

  @ApiProperty({ example: 'USD', description: 'Currency' })
  currency: string;

  @ApiProperty({ example: 5, description: 'Transit days' })
  transitDays: number;

  @ApiPropertyOptional({ example: '2024-03-18', description: 'Estimated departure' })
  estimatedDeparture?: string;

  @ApiPropertyOptional({ example: '2024-03-23', description: 'Estimated arrival' })
  estimatedArrival?: string;

  @ApiPropertyOptional({ example: '2024-03-25', description: 'Quote valid until' })
  validUntil?: string;

  @ApiProperty({ example: 'uuid', description: 'Quote ID' })
  quoteId: string;
}

export class FreightQuoteResponseDto {
  @ApiProperty({ type: [CarrierRateDto], description: 'Available rates from carriers' })
  rates: CarrierRateDto[];

  @ApiProperty({ example: 'OCEAN', description: 'Transport mode used' })
  transportMode: TransportMode;

  @ApiProperty({ example: 'USD', description: 'Currency' })
  currency: string;

  @ApiProperty({ example: 10, description: 'Total quotes received' })
  totalQuotes: number;

  @ApiProperty({ example: true, description: 'Whether quotes were filtered' })
  filtered: boolean;
}

export class RouteCheckDto {
  @ApiProperty({ type: LocationDto, description: 'Origin location' })
  origin: LocationDto;

  @ApiProperty({ type: LocationDto, description: 'Destination location' })
  destination: LocationDto;

  @ApiProperty({ enum: TransportMode, example: 'OCEAN' })
  transportMode: TransportMode;

  @ApiProperty({ example: true, description: 'Route is available' })
  available: boolean;

  @ApiPropertyOptional({ example: 14, description: 'Estimated transit days' })
  estimatedTransitDays?: number;

  @ApiPropertyOptional({ example: ['CNSHA', 'SGSIN', 'NLRTM'], description: 'Transit ports' })
  transitPorts?: string[];

  @ApiPropertyOptional({ example: 'Limited frequency - weekly sailings' })
  notes?: string;
}

export class CarrierResponseDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'DHL Express' })
  name: string;

  @ApiProperty({ example: 'DHL' })
  code: string;

  @ApiProperty({ example: ['EXPRESS', 'COURIER'] })
  types: string[];

  @ApiPropertyOptional({ example: 'https://example.com/logo.png' })
  logo?: string;

  @ApiPropertyOptional({ example: 4.5, description: 'Average rating' })
  rating?: number;

  @ApiPropertyOptional({ example: 'https://www.dhl.com' })
  website?: string;

  @ApiPropertyOptional({ example: 'support@dhl.com' })
  contactEmail?: string;

  @ApiPropertyOptional({ example: '+1-800-xxx-xxxx' })
  supportPhone?: string;

  @ApiProperty({ example: true })
  isActive: boolean;
}
