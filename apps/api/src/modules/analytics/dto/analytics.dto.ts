import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsArray,
  IsObject,
  IsDateString,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================
// EVENT TRACKING DTOs
// ============================================

export class TrackEventDto {
  @ApiProperty({ example: 'user_action', description: 'Event type category' })
  @IsString()
  eventType: string;

  @ApiProperty({ example: 'page_view', description: 'Specific event name' })
  @IsString()
  eventName: string;

  @ApiPropertyOptional({ example: 'uuid-user-id', description: 'User ID' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ example: 'session-123', description: 'Session ID' })
  @IsString()
  @IsOptional()
  sessionId?: string;

  @ApiPropertyOptional({ example: 'uuid-company-id', description: 'Company ID' })
  @IsString()
  @IsOptional()
  companyId?: string;

  @ApiPropertyOptional({ example: { page: '/dashboard', duration: 30 }, description: 'Event properties' })
  @IsObject()
  @IsOptional()
  properties?: Record<string, any>;

  @ApiPropertyOptional({ example: 'Mozilla/5.0...', description: 'User agent' })
  @IsString()
  @IsOptional()
  userAgent?: string;

  @ApiPropertyOptional({ example: '/dashboard', description: 'Page path' })
  @IsString()
  @IsOptional()
  page?: string;

  @ApiPropertyOptional({ example: 'https://google.com', description: 'Referrer URL' })
  @IsString()
  @IsOptional()
  referrer?: string;
}

export class BatchTrackDto {
  @ApiProperty({ type: [TrackEventDto], description: 'Array of events to track' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrackEventDto)
  events: TrackEventDto[];
}

// ============================================
// ANALYTICS FILTERS DTOs
// ============================================

export class AnalyticsFiltersDto {
  @ApiPropertyOptional({ example: 'uuid-company-id', description: 'Company ID filter' })
  @IsString()
  @IsOptional()
  companyId?: string;

  @ApiPropertyOptional({ example: '2024-01-01', description: 'Start date' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: '2024-12-31', description: 'End date' })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ example: 'day', enum: ['hour', 'day', 'week', 'month'], description: 'Grouping interval' })
  @IsEnum(['hour', 'day', 'week', 'month'])
  @IsOptional()
  interval?: 'hour' | 'day' | 'week' | 'month';

  @ApiPropertyOptional({ example: 1, description: 'Page number' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ example: 20, description: 'Items per page' })
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}

export class DashboardFiltersDto extends AnalyticsFiltersDto {
  @ApiPropertyOptional({ example: 'uuid-user-id', description: 'User ID filter' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ example: 'uuid-product-id', description: 'Product ID filter' })
  @IsString()
  @IsOptional()
  productId?: string;

  @ApiPropertyOptional({ example: 'uuid-order-id', description: 'Order ID filter' })
  @IsString()
  @IsOptional()
  orderId?: string;
}

// ============================================
// METRIC DTOs
// ============================================

export class MetricValueDto {
  @ApiProperty({ example: 10000, description: 'Current value' })
  value: number;

  @ApiProperty({ example: 15.5, description: 'Percentage change from previous period' })
  change: number;

  @ApiPropertyOptional({ example: 8500, description: 'Previous period value' })
  previousValue?: number;
}

export class TopProductDto {
  @ApiProperty({ example: 'uuid-product-id', description: 'Product ID' })
  productId: string;

  @ApiProperty({ example: 'Industrial Pump X200', description: 'Product name' })
  productName: string;

  @ApiProperty({ example: 150, description: 'Number of sales' })
  salesCount: number;

  @ApiProperty({ example: 75000, description: 'Revenue amount' })
  revenue: number;

  @ApiProperty({ example: 4.8, description: 'Average rating' })
  rating: number;
}

export class ActivityItemDto {
  @ApiProperty({ example: 'uuid-id', description: 'Activity ID' })
  id: string;

  @ApiProperty({ example: 'order_created', description: 'Activity type' })
  type: string;

  @ApiProperty({ example: 'New order placed: ORD-12345', description: 'Description' })
  description: string;

  @ApiProperty({ example: '2024-03-15T10:30:00Z', description: 'Timestamp' })
  timestamp: Date;

  @ApiPropertyOptional({ example: 'uuid-user-id', description: 'User ID' })
  userId?: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'User name' })
  userName?: string;
}

export class DashboardMetricsDto {
  @ApiProperty({ type: () => MetricValueDto, description: 'Revenue metrics' })
  revenue: MetricValueDto;

  @ApiProperty({ type: () => MetricValueDto, description: 'Orders metrics' })
  orders: MetricValueDto;

  @ApiProperty({ type: () => MetricValueDto, description: 'Users metrics' })
  users: MetricValueDto;

  @ApiProperty({ type: () => [TopProductDto], description: 'Top performing products' })
  topProducts: TopProductDto[];

  @ApiProperty({ type: () => [ActivityItemDto], description: 'Recent activity' })
  recentActivity: ActivityItemDto[];
}

export class RevenueDataPointDto {
  @ApiProperty({ example: '2024-03', description: 'Period label' })
  period: string;

  @ApiProperty({ example: 50000, description: 'Revenue amount' })
  revenue: number;

  @ApiProperty({ example: 150, description: 'Number of transactions' })
  transactions: number;

  @ApiProperty({ example: 15, description: 'Average order value' })
  averageOrderValue: number;
}

export class RevenueAnalyticsDto {
  @ApiProperty({ example: 150000, description: 'Total revenue' })
  total: number;

  @ApiProperty({ example: 12.5, description: 'Revenue growth percentage' })
  growth: number;

  @ApiProperty({ example: 'USD', description: 'Currency' })
  currency: string;

  @ApiProperty({ type: () => [RevenueDataPointDto], description: 'Revenue over time' })
  data: RevenueDataPointDto[];
}

export class UserDataPointDto {
  @ApiProperty({ example: '2024-03', description: 'Period label' })
  period: string;

  @ApiProperty({ example: 450, description: 'New users' })
  newUsers: number;

  @ApiProperty({ example: 4200, description: 'Active users' })
  activeUsers: number;

  @ApiProperty({ example: 3800, description: 'Returning users' })
  returningUsers: number;
}

export class UserSegmentDto {
  @ApiProperty({ example: 'Enterprise', description: 'Segment name' })
  name: string;

  @ApiProperty({ example: 500, description: 'User count' })
  count: number;

  @ApiProperty({ example: 35, description: 'Percentage of total' })
  percentage: number;
}

export class UserAnalyticsDto {
  @ApiProperty({ example: 5000, description: 'Total active users' })
  totalUsers: number;

  @ApiProperty({ example: 8.5, description: 'Growth percentage' })
  growth: number;

  @ApiProperty({ type: () => [UserDataPointDto], description: 'Users over time' })
  data: UserDataPointDto[];

  @ApiProperty({ type: () => [UserSegmentDto], description: 'User segments' })
  segments: UserSegmentDto[];
}

export class TradeDataPointDto {
  @ApiProperty({ example: '2024-03', description: 'Period label' })
  period: string;

  @ApiProperty({ example: 350, description: 'Number of RFQs' })
  rfqs: number;

  @ApiProperty({ example: 280, description: 'Number of quotes' })
  quotes: number;

  @ApiProperty({ example: 180, description: 'Number of orders' })
  orders: number;

  @ApiProperty({ example: 0.85, description: 'Conversion rate' })
  conversionRate: number;
}

export class TradeCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Category name' })
  name: string;

  @ApiProperty({ example: 450, description: 'Trade count' })
  count: number;

  @ApiProperty({ example: 2500000, description: 'Trade value' })
  value: number;

  @ApiProperty({ example: 25, description: 'Percentage' })
  percentage: number;
}

export class TradeRegionDto {
  @ApiProperty({ example: 'Asia Pacific', description: 'Region name' })
  name: string;

  @ApiProperty({ example: 600, description: 'Trade count' })
  count: number;

  @ApiProperty({ example: 5000000, description: 'Trade value' })
  value: number;

  @ApiProperty({ example: 35, description: 'Percentage' })
  percentage: number;
}

export class TradeAnalyticsDto {
  @ApiProperty({ example: 1200, description: 'Total trades' })
  totalTrades: number;

  @ApiProperty({ example: 15.2, description: 'Trade growth percentage' })
  growth: number;

  @ApiProperty({ type: () => [TradeDataPointDto], description: 'Trades over time' })
  data: TradeDataPointDto[];

  @ApiProperty({ type: () => [TradeCategoryDto], description: 'Trade by category' })
  byCategory: TradeCategoryDto[];

  @ApiProperty({ type: () => [TradeRegionDto], description: 'Trade by region' })
  byRegion: TradeRegionDto[];
}

// ============================================
// PAGINATION DTOs
// ============================================

export class PaginationDto {
  @ApiProperty({ example: 1, description: 'Current page' })
  page: number;

  @ApiProperty({ example: 20, description: 'Items per page' })
  limit: number;

  @ApiProperty({ example: 100, description: 'Total items' })
  total: number;

  @ApiProperty({ example: 5, description: 'Total pages' })
  totalPages: number;
}
