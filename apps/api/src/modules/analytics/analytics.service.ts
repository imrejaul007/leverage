import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { AnalyticsEvent } from './entities/analytics-event.entity';
import { DashboardMetric } from './entities/dashboard-metric.entity';
import {
  TrackEventDto,
  BatchTrackDto,
  DashboardFiltersDto,
  AnalyticsFiltersDto,
  DashboardMetricsDto,
  RevenueAnalyticsDto,
  UserAnalyticsDto,
  TradeAnalyticsDto,
  MetricValueDto,
  TopProductDto,
  ActivityItemDto,
  RevenueDataPointDto,
  UserDataPointDto,
  UserSegmentDto,
  TradeDataPointDto,
  TradeCategoryDto,
  TradeRegionDto,
  PaginationDto,
} from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @InjectRepository(AnalyticsEvent)
    private analyticsEventRepository: Repository<AnalyticsEvent>,
    @InjectRepository(DashboardMetric)
    private dashboardMetricRepository: Repository<DashboardMetric>,
  ) {}

  // ============================================
  // EVENT TRACKING
  // ============================================

  async trackEvent(dto: TrackEventDto): Promise<{ success: boolean; eventId: string }> {
    try {
      const event = this.analyticsEventRepository.create({
        eventType: dto.eventType,
        eventName: dto.eventName,
        userId: dto.userId,
        sessionId: dto.sessionId,
        companyId: dto.companyId,
        properties: dto.properties || {},
        userAgent: dto.userAgent,
        page: dto.page,
        referrer: dto.referrer,
      });

      const saved = await this.analyticsEventRepository.save(event);

      this.logger.debug(`Event tracked: ${dto.eventName}`, {
        eventId: saved.id,
        companyId: dto.companyId,
      });

      return { success: true, eventId: saved.id };
    } catch (error) {
      this.logger.error(`Failed to track event: ${(error as Error).message}`, (error as Error).stack);
      throw error;
    }
  }

  async trackBatch(dto: BatchTrackDto): Promise<{ success: boolean; trackedCount: number }> {
    try {
      const events = dto.events.map((eventDto) =>
        this.analyticsEventRepository.create({
          eventType: eventDto.eventType,
          eventName: eventDto.eventName,
          userId: eventDto.userId,
          sessionId: eventDto.sessionId,
          companyId: eventDto.companyId,
          properties: eventDto.properties || {},
          userAgent: eventDto.userAgent,
          page: eventDto.page,
          referrer: eventDto.referrer,
        }),
      );

      const saved = await this.analyticsEventRepository.save(events);

      this.logger.debug(`Batch tracked: ${saved.length} events`);

      return { success: true, trackedCount: saved.length };
    } catch (error) {
      this.logger.error(`Failed to track batch events: ${(error as Error).message}`, (error as Error).stack);
      throw error;
    }
  }

  // ============================================
  // DASHBOARD METRICS
  // ============================================

  async getDashboardMetrics(
    companyId: string,
    filters: DashboardFiltersDto,
  ): Promise<DashboardMetricsDto> {
    const startDate = filters.startDate
      ? new Date(filters.startDate)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();

    const previousStartDate = new Date(startDate.getTime() - (endDate.getTime() - startDate.getTime()));

    // Fetch current and previous period metrics
    const [currentMetrics, previousMetrics] = await Promise.all([
      this.fetchMetricsForPeriod(companyId, startDate, endDate, filters),
      this.fetchMetricsForPeriod(companyId, previousStartDate, startDate, filters),
    ]);

    // Calculate revenue metrics
    const revenue = this.calculateMetricChange(
      currentMetrics.revenue,
      previousMetrics.revenue,
    );

    // Calculate orders metrics
    const orders = this.calculateMetricChange(
      currentMetrics.orders,
      previousMetrics.orders,
    );

    // Calculate users metrics
    const users = this.calculateMetricChange(
      currentMetrics.users,
      previousMetrics.users,
    );

    // Fetch top products and recent activity
    const [topProducts, recentActivity] = await Promise.all([
      this.getTopProducts(companyId, startDate, endDate),
      this.getRecentActivity(companyId, startDate, endDate),
    ]);

    return {
      revenue,
      orders,
      users,
      topProducts,
      recentActivity,
    };
  }

  private async fetchMetricsForPeriod(
    companyId: string,
    startDate: Date,
    endDate: Date,
    filters: DashboardFiltersDto,
  ): Promise<{ revenue: number; orders: number; users: number }> {
    try {
      // Query events for the period
      const events = await this.analyticsEventRepository.find({
        where: {
          companyId,
          timestamp: Between(startDate, endDate),
        },
      });

      // Calculate metrics from events
      let revenue = 0;
      let orders = 0;
      let users = new Set<string>();

      events.forEach((event) => {
        if (event.properties) {
          const props = event.properties as Record<string, any>;
          if (props.revenue) revenue += Number(props.revenue);
          if (event.eventName === 'order_completed' || event.eventName === 'order_created') {
            orders++;
          }
        }
        if (event.userId) {
          users.add(event.userId);
        }
      });

      return { revenue, orders: orders, users: 0 };
    } catch (error) {
      this.logger.error(`Failed to fetch metrics: ${(error as Error).message}`);
      return { revenue: 0, orders: 0, users: 0 };
    }
  }

  private calculateMetricChange(current: number, previous: number): MetricValueDto {
    const change = previous > 0 ? ((current - previous) / previous) * 100 : 0;
    return {
      value: current,
      change: Math.round(change * 100) / 100,
      previousValue: previous,
    };
  }

  private async getTopProducts(
    companyId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<TopProductDto[]> {
    try {
      const productEvents = await this.analyticsEventRepository.find({
        where: {
          companyId,
          eventType: 'product',
          timestamp: Between(startDate, endDate),
        },
      });

      const productMap = new Map<string, TopProductDto>();

      productEvents.forEach((event) => {
        if (event.properties) {
          const props = event.properties as Record<string, any>;
          const productId = props.productId;
          if (productId) {
            const existing = productMap.get(productId);
            if (existing) {
              existing.salesCount++;
              existing.revenue += props.revenue || 0;
            } else {
              productMap.set(productId, {
                productId,
                productName: props.productName || 'Unknown Product',
                salesCount: 1,
                revenue: props.revenue || 0,
                rating: props.rating || 0,
              });
            }
          }
        }
      });

      return Array.from(productMap.values())
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);
    } catch (error) {
      this.logger.error(`Failed to get top products: ${(error as Error).message}`);
      return [];
    }
  }

  private async getRecentActivity(
    companyId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<ActivityItemDto[]> {
    try {
      const recentEvents = await this.analyticsEventRepository.find({
        where: {
          companyId,
          timestamp: Between(startDate, endDate),
        },
        order: { timestamp: 'DESC' },
        take: 20,
      });

      return recentEvents.map((event) => ({
        id: event.id,
        type: event.eventName,
        description: this.generateActivityDescription(event),
        timestamp: event.timestamp,
        userId: event.userId,
        userName: (event.properties as Record<string, any>)?.userName,
      }));
    } catch (error) {
      this.logger.error(`Failed to get recent activity: ${(error as Error).message}`);
      return [];
    }
  }

  private generateActivityDescription(event: AnalyticsEvent): string {
    const props = event.properties as Record<string, any> || {};

    switch (event.eventName) {
      case 'order_created':
        return `New order placed: ${props.orderId || 'Unknown'}`;
      case 'order_completed':
        return `Order completed: ${props.orderId || 'Unknown'}`;
      case 'user_registered':
        return `New user registered: ${props.email || 'Unknown'}`;
      case 'company_verified':
        return `Company verified: ${props.companyName || 'Unknown'}`;
      case 'shipment_created':
        return `Shipment created: ${props.shipmentId || 'Unknown'}`;
      default:
        return `${event.eventType}: ${event.eventName}`;
    }
  }

  // ============================================
  // REVENUE ANALYTICS
  // ============================================

  async getRevenueAnalytics(filters: AnalyticsFiltersDto): Promise<RevenueAnalyticsDto> {
    const startDate = filters.startDate
      ? new Date(filters.startDate)
      : new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();
    const interval = filters.interval || 'month';

    try {
      const events = await this.analyticsEventRepository.find({
        where: {
          companyId: filters.companyId,
          eventType: 'revenue',
          timestamp: Between(startDate, endDate),
        },
      });

      const data = this.aggregateRevenueByPeriod(events, interval, startDate, endDate);
      const total = data.reduce((sum, d) => sum + d.revenue, 0);
      const firstValue = data[0]?.revenue || 0;
      const lastValue = data[data.length - 1]?.revenue || 0;
      const growth = firstValue > 0 ? ((lastValue - firstValue) / firstValue) * 100 : 0;

      return {
        total,
        growth: Math.round(growth * 100) / 100,
        currency: 'USD',
        data,
      };
    } catch (error) {
      this.logger.error(`Failed to get revenue analytics: ${(error as Error).message}`);
      return {
        total: 0,
        growth: 0,
        currency: 'USD',
        data: [],
      };
    }
  }

  private aggregateRevenueByPeriod(
    events: AnalyticsEvent[],
    interval: 'hour' | 'day' | 'week' | 'month',
    startDate: Date,
    endDate: Date,
  ): RevenueDataPointDto[] {
    const periodMap = new Map<string, RevenueDataPointDto>();

    events.forEach((event) => {
      const period = this.getPeriodLabel(event.timestamp, interval);
      const props = event.properties as Record<string, any> || {};

      const existing = periodMap.get(period);
      if (existing) {
        existing.revenue += props.revenue || 0;
        existing.transactions++;
        existing.averageOrderValue = existing.revenue / existing.transactions;
      } else {
        periodMap.set(period, {
          period,
          revenue: props.revenue || 0,
          transactions: 1,
          averageOrderValue: props.revenue || 0,
        });
      }
    });

    return Array.from(periodMap.values()).sort((a, b) => a.period.localeCompare(b.period));
  }

  private getPeriodLabel(date: Date, interval: 'hour' | 'day' | 'week' | 'month'): string {
    const d = new Date(date);
    switch (interval) {
      case 'hour':
        return d.toISOString().slice(0, 13);
      case 'day':
        return d.toISOString().slice(0, 10);
      case 'week':
        const week = Math.ceil(d.getDate() / 7);
        return `${d.getFullYear()}-W${week}`;
      case 'month':
        return d.toISOString().slice(0, 7);
      default:
        return d.toISOString().slice(0, 10);
    }
  }

  // ============================================
  // USER ANALYTICS
  // ============================================

  async getUserAnalytics(filters: AnalyticsFiltersDto): Promise<UserAnalyticsDto> {
    const startDate = filters.startDate
      ? new Date(filters.startDate)
      : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();
    const interval = filters.interval || 'day';

    try {
      const events = await this.analyticsEventRepository.find({
        where: {
          companyId: filters.companyId,
          timestamp: Between(startDate, endDate),
        },
      });

      const userSet = new Set<string>();
      events.forEach((e) => {
        if (e.userId) userSet.add(e.userId);
      });

      const data = this.aggregateUsersByPeriod(events, interval, startDate, endDate);
      const segments = this.calculateUserSegments(events);

      const firstDataPoint = data[0];
      const lastDataPoint = data[data.length - 1];
      const firstTotal = (firstDataPoint?.newUsers || 0) + (firstDataPoint?.activeUsers || 0);
      const lastTotal = (lastDataPoint?.newUsers || 0) + (lastDataPoint?.activeUsers || 0);
      const growth = firstTotal > 0 ? ((lastTotal - firstTotal) / firstTotal) * 100 : 0;

      return {
        totalUsers: userSet.size,
        growth: Math.round(growth * 100) / 100,
        data,
        segments,
      };
    } catch (error) {
      this.logger.error(`Failed to get user analytics: ${(error as Error).message}`);
      return {
        totalUsers: 0,
        growth: 0,
        data: [],
        segments: [],
      };
    }
  }

  private aggregateUsersByPeriod(
    events: AnalyticsEvent[],
    interval: 'hour' | 'day' | 'week' | 'month',
    startDate: Date,
    endDate: Date,
  ): UserDataPointDto[] {
    const periodMap = new Map<string, UserDataPointDto>();
    const periodUsers = new Map<string, Set<string>>();
    const periodNewUsers = new Map<string, Set<string>>();

    events.forEach((event) => {
      if (!event.userId) return;

      const period = this.getPeriodLabel(event.timestamp, interval);

      // Track all active users
      if (!periodUsers.has(period)) {
        periodUsers.set(period, new Set());
      }
      periodUsers.get(period)!.add(event.userId);

      // Track new users (first appearance)
      const userFirstSeen = events
        .filter((e) => e.userId === event.userId)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())[0];

      if (userFirstSeen && this.getPeriodLabel(userFirstSeen.timestamp, interval) === period) {
        if (!periodNewUsers.has(period)) {
          periodNewUsers.set(period, new Set());
        }
        periodNewUsers.get(period)!.add(event.userId);
      }
    });

    periodUsers.forEach((users, period) => {
      const newUsers = periodNewUsers.get(period) || new Set();
      periodMap.set(period, {
        period,
        newUsers: newUsers.size,
        activeUsers: users.size,
        returningUsers: users.size - newUsers.size,
      });
    });

    return Array.from(periodMap.values()).sort((a, b) => a.period.localeCompare(b.period));
  }

  private calculateUserSegments(events: AnalyticsEvent[]): UserSegmentDto[] {
    const segmentMap = new Map<string, number>();

    events.forEach((event) => {
      if (event.properties) {
        const props = event.properties as Record<string, any>;
        const segment = props.segment || props.userType || 'Standard';
        segmentMap.set(segment, (segmentMap.get(segment) || 0) + 1);
      }
    });

    const total = Array.from(segmentMap.values()).reduce((sum, count) => sum + count, 0);

    return Array.from(segmentMap.entries())
      .map(([name, count]) => ({
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 10000) / 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }

  // ============================================
  // TRADE ANALYTICS
  // ============================================

  async getTradeAnalytics(filters: AnalyticsFiltersDto): Promise<TradeAnalyticsDto> {
    const startDate = filters.startDate
      ? new Date(filters.startDate)
      : new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const endDate = filters.endDate ? new Date(filters.endDate) : new Date();
    const interval = filters.interval || 'month';

    try {
      const tradeEvents = await this.analyticsEventRepository.find({
        where: {
          companyId: filters.companyId,
          eventType: 'trade',
          timestamp: Between(startDate, endDate),
        },
      });

      const data = this.aggregateTradesByPeriod(tradeEvents, interval);
      const byCategory = this.calculateTradeByCategory(tradeEvents);
      const byRegion = this.calculateTradeByRegion(tradeEvents);

      const totalTrades = tradeEvents.filter(
        (e) => e.eventName === 'order_placed' || e.eventName === 'trade_completed',
      ).length;

      const firstDataPoint = data[0];
      const lastDataPoint = data[data.length - 1];
      const firstTotal = (firstDataPoint?.orders || 0) + (firstDataPoint?.quotes || 0);
      const lastTotal = (lastDataPoint?.orders || 0) + (lastDataPoint?.quotes || 0);
      const growth = firstTotal > 0 ? ((lastTotal - firstTotal) / firstTotal) * 100 : 0;

      return {
        totalTrades,
        growth: Math.round(growth * 100) / 100,
        data,
        byCategory,
        byRegion,
      };
    } catch (error) {
      this.logger.error(`Failed to get trade analytics: ${(error as Error).message}`);
      return {
        totalTrades: 0,
        growth: 0,
        data: [],
        byCategory: [],
        byRegion: [],
      };
    }
  }

  private aggregateTradesByPeriod(
    events: AnalyticsEvent[],
    interval: 'hour' | 'day' | 'week' | 'month',
  ): TradeDataPointDto[] {
    const periodMap = new Map<string, TradeDataPointDto>();

    events.forEach((event) => {
      const period = this.getPeriodLabel(event.timestamp, interval);
      const props = event.properties as Record<string, any> || {};

      const existing = periodMap.get(period);
      if (existing) {
        if (event.eventName === 'rfq_created') existing.rfqs++;
        if (event.eventName === 'quote_received') existing.quotes++;
        if (event.eventName === 'order_placed' || event.eventName === 'trade_completed') {
          existing.orders++;
        }
        existing.conversionRate =
          existing.quotes > 0 ? Math.round((existing.orders / existing.quotes) * 100) / 100 : 0;
      } else {
        periodMap.set(period, {
          period,
          rfqs: event.eventName === 'rfq_created' ? 1 : 0,
          quotes: event.eventName === 'quote_received' ? 1 : 0,
          orders: event.eventName === 'order_placed' || event.eventName === 'trade_completed' ? 1 : 0,
          conversionRate: 0,
        });
      }
    });

    return Array.from(periodMap.values()).sort((a, b) => a.period.localeCompare(b.period));
  }

  private calculateTradeByCategory(events: AnalyticsEvent[]): TradeCategoryDto[] {
    const categoryMap = new Map<string, { count: number; value: number }>();

    events.forEach((event) => {
      const props = event.properties as Record<string, any> || {};
      const category = props.category || 'Uncategorized';

      const existing = categoryMap.get(category);
      if (existing) {
        existing.count++;
        existing.value += props.value || 0;
      } else {
        categoryMap.set(category, { count: 1, value: props.value || 0 });
      }
    });

    const total = Array.from(categoryMap.values()).reduce((sum, c) => sum + c.value, 0);

    return Array.from(categoryMap.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        value: data.value,
        percentage: total > 0 ? Math.round((data.value / total) * 10000) / 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }

  private calculateTradeByRegion(events: AnalyticsEvent[]): TradeRegionDto[] {
    const regionMap = new Map<string, { count: number; value: number }>();

    events.forEach((event) => {
      const props = event.properties as Record<string, any> || {};
      const region = props.region || props.country || 'Unknown';

      const existing = regionMap.get(region);
      if (existing) {
        existing.count++;
        existing.value += props.value || 0;
      } else {
        regionMap.set(region, { count: 1, value: props.value || 0 });
      }
    });

    const total = Array.from(regionMap.values()).reduce((sum, r) => sum + r.value, 0);

    return Array.from(regionMap.entries())
      .map(([name, data]) => ({
        name,
        count: data.count,
        value: data.value,
        percentage: total > 0 ? Math.round((data.value / total) * 10000) / 100 : 0,
      }))
      .sort((a, b) => b.value - a.value);
  }
}
