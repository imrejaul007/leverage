import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import {
  TrackEventDto,
  BatchTrackDto,
  DashboardFiltersDto,
  AnalyticsFiltersDto,
} from './dto/analytics.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('events')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Track a single analytics event' })
  @ApiBearerAuth()
  async trackEvent(@Body(new ValidationPipe({ transform: true })) dto: TrackEventDto) {
    return this.analyticsService.trackEvent(dto);
  }

  @Post('batch')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Track multiple analytics events in batch' })
  @ApiBearerAuth()
  async trackBatch(@Body(new ValidationPipe({ transform: true })) dto: BatchTrackDto) {
    return this.analyticsService.trackBatch(dto);
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get dashboard metrics for the current company' })
  async getDashboard(
    @CurrentUser('companyId') companyId: string,
    @Query(new ValidationPipe({ transform: true })) filters: DashboardFiltersDto,
  ) {
    return this.analyticsService.getDashboardMetrics(companyId, {
      ...filters,
      companyId,
    });
  }

  @Get('revenue')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get revenue analytics for the current company' })
  async getRevenueAnalytics(
    @CurrentUser('companyId') companyId: string,
    @Query(new ValidationPipe({ transform: true })) filters: AnalyticsFiltersDto,
  ) {
    return this.analyticsService.getRevenueAnalytics({
      ...filters,
      companyId,
    });
  }

  @Get('users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user analytics for the current company' })
  async getUserAnalytics(
    @CurrentUser('companyId') companyId: string,
    @Query(new ValidationPipe({ transform: true })) filters: AnalyticsFiltersDto,
  ) {
    return this.analyticsService.getUserAnalytics({
      ...filters,
      companyId,
    });
  }

  @Get('trade')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get trade flow analytics for the current company' })
  async getTradeAnalytics(
    @CurrentUser('companyId') companyId: string,
    @Query(new ValidationPipe({ transform: true })) filters: AnalyticsFiltersDto,
  ) {
    return this.analyticsService.getTradeAnalytics({
      ...filters,
      companyId,
    });
  }
}
