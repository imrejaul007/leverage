import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsArray,
  IsObject,
  IsBoolean,
  IsDateString,
  Min,
  Max,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AdType } from '../entities/ad-campaign.entity';
import { BidType } from '../entities/ad-campaign.entity';
import { AdStatus } from '../../../common/enums';

export class TargetingDto {
  @ApiPropertyOptional({ example: ['electronics', 'manufacturing'], description: 'Categories to target' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categories?: string[];

  @ApiPropertyOptional({ example: ['CN', 'US', 'DE'], description: 'Countries to target' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  countries?: string[];

  @ApiPropertyOptional({ description: 'Age range' })
  @IsObject()
  @IsOptional()
  ageRange?: { min: number; max: number };

  @ApiPropertyOptional({ example: ['enterprise', 'smb'], description: 'Company types' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  companyTypes?: string[];

  @ApiPropertyOptional({ example: ['B2B'], description: 'Target audience type' })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  audience?: string[];

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  customRules?: Record<string, unknown>;
}

export class CreateCampaignDto {
  @ApiProperty({ example: 'Spring Product Launch', description: 'Campaign name' })
  @IsString()
  name: string;

  @ApiProperty({ enum: AdType, example: 'SPONSORED_LISTING', description: 'Ad type' })
  @IsEnum(AdType)
  type: AdType;

  @ApiProperty({ type: TargetingDto, description: 'Targeting configuration' })
  @ValidateNested()
  @Type(() => TargetingDto)
  targeting: TargetingDto;

  @ApiProperty({ example: 1000.00, description: 'Total campaign budget' })
  @IsNumber()
  @Min(1)
  budget: number;

  @ApiPropertyOptional({ example: 100.00, description: 'Daily budget limit' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  dailyBudget?: number;

  @ApiProperty({ enum: BidType, example: 'CPC', description: 'Bid type' })
  @IsEnum(BidType)
  bidType: BidType;

  @ApiPropertyOptional({ example: 0.50, description: 'Bid amount' })
  @IsNumber()
  @Min(0.01)
  @IsOptional()
  bidAmount?: number;

  @ApiProperty({ example: '2024-03-01', description: 'Campaign start date' })
  @IsDateString()
  startDate: string;

  @ApiPropertyOptional({ example: '2024-06-01', description: 'Campaign end date' })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class UpdateCampaignDto {
  @ApiPropertyOptional({ example: 'Updated Campaign Name', description: 'Campaign name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: TargetingDto, description: 'Targeting configuration' })
  @ValidateNested()
  @Type(() => TargetingDto)
  @IsOptional()
  targeting?: TargetingDto;

  @ApiPropertyOptional({ example: 2000.00, description: 'Total campaign budget' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  budget?: number;

  @ApiPropertyOptional({ example: 200.00, description: 'Daily budget limit' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  dailyBudget?: number;

  @ApiPropertyOptional({ enum: BidType, example: 'CPM', description: 'Bid type' })
  @IsEnum(BidType)
  @IsOptional()
  bidType?: BidType;

  @ApiPropertyOptional({ example: 0.75, description: 'Bid amount' })
  @IsNumber()
  @Min(0.01)
  @IsOptional()
  bidAmount?: number;

  @ApiPropertyOptional({ example: '2024-04-01', description: 'Campaign end date' })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export class CampaignFiltersDto {
  @ApiPropertyOptional({ example: 'uuid-company-id', description: 'Company ID filter' })
  @IsString()
  @IsOptional()
  companyId?: string;

  @ApiPropertyOptional({ enum: AdType, description: 'Filter by ad type' })
  @IsEnum(AdType)
  @IsOptional()
  type?: AdType;

  @ApiPropertyOptional({ enum: AdStatus, description: 'Filter by status' })
  @IsEnum(AdStatus)
  @IsOptional()
  status?: AdStatus;

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

  @ApiPropertyOptional({ example: 'createdAt', description: 'Sort field' })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({ example: 'desc', enum: ['asc', 'desc'], description: 'Sort direction' })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}

export class CampaignResponseDto {
  @ApiProperty({ example: 'uuid-campaign-id', description: 'Campaign ID' })
  id: string;

  @ApiProperty({ example: 'uuid-company-id', description: 'Company ID' })
  companyId: string;

  @ApiProperty({ example: 'Spring Product Launch', description: 'Campaign name' })
  name: string;

  @ApiProperty({ enum: AdType, example: 'SPONSORED_LISTING' })
  type: AdType;

  @ApiProperty({ enum: AdStatus, example: 'RUNNING' })
  status: AdStatus;

  @ApiProperty({ type: TargetingDto })
  targeting: TargetingDto;

  @ApiProperty({ example: 1000.00, description: 'Total budget' })
  budget: number;

  @ApiPropertyOptional({ example: 100.00, description: 'Daily budget' })
  dailyBudget?: number;

  @ApiProperty({ example: 250.50, description: 'Amount spent' })
  spent: number;

  @ApiProperty({ enum: BidType, example: 'CPC' })
  bidType: BidType;

  @ApiPropertyOptional({ example: 0.50, description: 'Bid amount' })
  bidAmount?: number;

  @ApiProperty({ example: '2024-03-01T00:00:00Z', description: 'Start date' })
  startDate: Date;

  @ApiPropertyOptional({ example: '2024-06-01T00:00:00Z', description: 'End date' })
  endDate?: Date;

  @ApiProperty({ example: 10000, description: 'Total impressions' })
  impressions: number;

  @ApiProperty({ example: 500, description: 'Total clicks' })
  clicks: number;

  @ApiProperty({ example: 25, description: 'Total conversions' })
  conversions: number;

  @ApiProperty({ example: '2024-03-01T10:00:00Z', description: 'Created at' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-15T14:30:00Z', description: 'Updated at' })
  updatedAt: Date;
}

export class CampaignStatsDto {
  @ApiProperty({ example: 50000, description: 'Total impressions' })
  impressions: number;

  @ApiProperty({ example: 2500, description: 'Total clicks' })
  clicks: number;

  @ApiProperty({ example: 125, description: 'Total conversions' })
  conversions: number;

  @ApiProperty({ example: 5.0, description: 'Click-through rate' })
  ctr: number;

  @ApiProperty({ example: 0.40, description: 'Cost per click' })
  cpc: number;

  @ApiProperty({ example: 5.0, description: 'Cost per acquisition' })
  cpa: number;

  @ApiProperty({ example: 1000.00, description: 'Total spend' })
  spend: number;

  @ApiProperty({ example: 0.5, description: 'Conversion rate' })
  conversionRate: number;

  @ApiPropertyOptional({ description: 'Impressions over time' })
  impressionsTrend?: { date: string; value: number }[];

  @ApiPropertyOptional({ description: 'Clicks over time' })
  clicksTrend?: { date: string; value: number }[];

  @ApiPropertyOptional({ description: 'Spend over time' })
  spendTrend?: { date: string; value: number }[];
}

export class AdCreditBalanceDto {
  @ApiProperty({ example: 'uuid-company-id', description: 'Company ID' })
  companyId: string;

  @ApiProperty({ example: 500.00, description: 'Current credit balance' })
  balance: number;

  @ApiPropertyOptional({ example: 50.00, description: 'Credits spent this month' })
  spentThisMonth?: number;
}

export class AdPlanDto {
  @ApiProperty({ example: 'starter_ads', description: 'Plan ID' })
  id: string;

  @ApiProperty({ example: 'Starter Ads', description: 'Plan name' })
  name: string;

  @ApiProperty({ example: 'Perfect for small businesses', description: 'Description' })
  description: string;

  @ApiProperty({ example: 9900, description: 'Price in cents' })
  price: number;

  @ApiProperty({ example: 'USD', description: 'Currency' })
  currency: string;

  @ApiPropertyOptional({ example: 'monthly' })
  interval?: string;

  @ApiProperty({ example: 10000, description: 'Included impressions' })
  impressions: number;

  @ApiPropertyOptional({ example: 500, description: 'Included clicks' })
  clicks?: number;

  @ApiProperty({ type: [String], example: ['Up to 3 campaigns', 'Basic targeting'] })
  features: string[];

  @ApiProperty({ example: false, description: 'Is featured plan' })
  isFeatured: boolean;
}

export class CampaignListResponseDto {
  @ApiProperty({ type: [CampaignResponseDto], description: 'List of campaigns' })
  campaigns: CampaignResponseDto[];

  @ApiProperty({ description: 'Pagination info' })
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
