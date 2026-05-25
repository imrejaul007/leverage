import { IsString, IsOptional, IsDateString, IsObject, ValidateNested, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LocationDto } from './quote-request.dto';

export class BookingConfirmationDto {
  @ApiProperty({ example: 'uuid' })
  bookingId: string;

  @ApiProperty({ example: 'BKG-2024-12345' })
  bookingReference: string;

  @ApiProperty({ example: 'CONFIRMED' })
  status: string;

  @ApiPropertyOptional({ example: '2024-03-15T10:00:00Z' })
  confirmedAt?: string;

  @ApiPropertyOptional({ example: '2024-03-18T14:00:00Z' })
  estimatedPickup?: string;

  @ApiPropertyOptional({ example: '2024-03-25T08:00:00Z' })
  estimatedDelivery?: string;

  @ApiPropertyOptional({ example: 'Your booking has been confirmed. Driver will arrive for pickup.' })
  message?: string;

  @ApiPropertyOptional({ example: 'uuid', description: 'Shipment ID' })
  shipmentId?: string;

  @ApiPropertyOptional({ example: 'SHP-2024-00001' })
  shipmentNumber?: string;
}

export class BookingDetailsDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'BKG-2024-12345' })
  bookingReference: string;

  @ApiProperty({ type: LocationDto })
  origin: LocationDto;

  @ApiProperty({ type: LocationDto })
  destination: LocationDto;

  @ApiProperty({ example: 'OCEAN' })
  transportMode: string;

  @ApiProperty({ example: 'DHL' })
  carrierCode: string;

  @ApiProperty({ example: 'DHL Express' })
  carrierName: string;

  @ApiProperty({ example: 1525.00 })
  totalCost: number;

  @ApiProperty({ example: 'USD' })
  currency: string;

  @ApiProperty({ example: 5 })
  transitDays: number;

  @ApiProperty({ example: 'CONFIRMED' })
  status: string;

  @ApiPropertyOptional({ example: '2024-03-15' })
  pickupDate?: string;

  @ApiPropertyOptional({ example: '2024-03-25' })
  deliveryDate?: string;

  @ApiPropertyOptional()
  trackingNumber?: string;

  @ApiPropertyOptional()
  documents?: Record<string, string>;
}

export class UpdateBookingDto {
  @ApiPropertyOptional({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  pickupAddress?: LocationDto;

  @ApiPropertyOptional({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  @IsOptional()
  deliveryAddress?: LocationDto;

  @ApiPropertyOptional({ example: '2024-03-15' })
  @IsDateString()
  @IsOptional()
  pickupDate?: string;

  @ApiPropertyOptional({ example: 'Additional instructions for pickup' })
  @IsString()
  @IsOptional()
  specialInstructions?: string;

  @ApiPropertyOptional({ example: 'priority' })
  @IsString()
  @IsOptional()
  priority?: string;
}

export class CancelBookingDto {
  @ApiProperty({ example: 'uuid', description: 'Booking ID to cancel' })
  @IsString()
  bookingId: string;

  @ApiPropertyOptional({ example: 'Changed to different carrier' })
  @IsString()
  @IsOptional()
  cancellationReason?: string;
}

export class BookingListQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ example: 20, default: 20 })
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  limit?: number = 20;

  @ApiPropertyOptional({ example: 'CONFIRMED' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 'DHL' })
  @IsString()
  @IsOptional()
  carrierCode?: string;

  @ApiPropertyOptional({ example: 'OCEAN' })
  @IsString()
  @IsOptional()
  transportMode?: string;
}
