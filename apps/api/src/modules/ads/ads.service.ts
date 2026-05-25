import { Injectable, Logger, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { AdCampaign } from './entities/ad-campaign.entity';
import { AdCredit } from './entities/ad-credit.entity';
import { AdStatus } from '../../common/enums';
import {
  CreateCampaignDto,
  UpdateCampaignDto,
  CampaignFiltersDto,
  CampaignResponseDto,
  CampaignStatsDto,
  AdCreditBalanceDto,
  AdPlanDto,
  CampaignListResponseDto,
} from './dto/ads.dto';

@Injectable()
export class AdsService {
  private readonly logger = new Logger(AdsService.name);

  constructor(
    @InjectRepository(AdCampaign)
    private campaignRepository: Repository<AdCampaign>,
    @InjectRepository(AdCredit)
    private creditRepository: Repository<AdCredit>,
  ) {}

  // ============================================
  // CAMPAIGN MANAGEMENT
  // ============================================

  async createCampaign(companyId: string, dto: CreateCampaignDto): Promise<CampaignResponseDto> {
    const campaign = new AdCampaign();
    campaign.companyId = companyId;
    campaign.name = dto.name;
    campaign.type = dto.type;
    campaign.status = AdStatus.DRAFT;
    campaign.targeting = dto.targeting as any;
    campaign.budget = dto.budget as any;
    campaign.dailyBudget = dto.dailyBudget as any;
    campaign.bidType = dto.bidType as any;
    campaign.bidAmount = dto.bidAmount as any;
    campaign.startDate = new Date(dto.startDate);
    campaign.endDate = dto.endDate ? new Date(dto.endDate) : null;
    campaign.spent = 0 as any;
    campaign.impressions = 0;
    campaign.clicks = 0;
    campaign.conversions = 0;

    const saved = await this.campaignRepository.save(campaign);

    this.logger.log(`Campaign created: ${saved.id} for company: ${companyId}`);

    return this.mapToCampaignResponse(saved);
  }

  async getCampaigns(companyId: string, filters: CampaignFiltersDto): Promise<CampaignListResponseDto> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<AdCampaign> = {
      companyId,
    };

    if (filters.type) {
      where.type = filters.type as any;
    }

    if (filters.status) {
      where.status = filters.status as any;
    }

    const [campaigns, total] = await this.campaignRepository.findAndCount({
      where,
      order: { [filters.sortBy || 'createdAt']: filters.sortOrder || 'DESC' } as any,
      skip,
      take: limit,
    });

    return {
      campaigns: campaigns.map((c) => this.mapToCampaignResponse(c)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCampaign(id: string): Promise<CampaignResponseDto> {
    const campaign = await this.campaignRepository.findOne({ where: { id } });

    if (!campaign) {
      throw new NotFoundException(`Campaign not found: ${id}`);
    }

    return this.mapToCampaignResponse(campaign);
  }

  async updateCampaign(id: string, companyId: string, dto: UpdateCampaignDto): Promise<CampaignResponseDto> {
    const campaign = await this.campaignRepository.findOne({ where: { id, companyId } });

    if (!campaign) {
      throw new NotFoundException(`Campaign not found: ${id}`);
    }

    if (campaign.status === AdStatus.RUNNING || campaign.status === AdStatus.PAUSED) {
      if (dto.budget !== undefined) {
        if (dto.budget < Number(campaign.spent)) {
          throw new BadRequestException('New budget cannot be less than amount already spent');
        }
      }
    }

    const updateData: Partial<AdCampaign> = {};

    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.targeting !== undefined) updateData.targeting = dto.targeting as any;
    if (dto.budget !== undefined) updateData.budget = dto.budget as any;
    if (dto.dailyBudget !== undefined) updateData.dailyBudget = dto.dailyBudget as any;
    if (dto.bidType !== undefined) updateData.bidType = dto.bidType as any;
    if (dto.bidAmount !== undefined) updateData.bidAmount = dto.bidAmount as any;
    if (dto.endDate !== undefined) updateData.endDate = new Date(dto.endDate);

    const updated = await this.campaignRepository.save({ ...campaign, ...updateData });

    this.logger.log(`Campaign updated: ${id}`);

    return this.mapToCampaignResponse(updated);
  }

  async deleteCampaign(id: string, companyId: string): Promise<{ success: boolean }> {
    const campaign = await this.campaignRepository.findOne({ where: { id, companyId } });

    if (!campaign) {
      throw new NotFoundException(`Campaign not found: ${id}`);
    }

    if (campaign.status === AdStatus.RUNNING) {
      throw new BadRequestException('Cannot delete a running campaign. Pause it first.');
    }

    await this.campaignRepository.remove(campaign);

    this.logger.log(`Campaign deleted: ${id}`);

    return { success: true };
  }

  // ============================================
  // CAMPAIGN STATUS CONTROL
  // ============================================

  async pauseCampaign(id: string, companyId: string): Promise<CampaignResponseDto> {
    const campaign = await this.campaignRepository.findOne({ where: { id, companyId } });

    if (!campaign) {
      throw new NotFoundException(`Campaign not found: ${id}`);
    }

    if (campaign.status !== AdStatus.RUNNING) {
      throw new BadRequestException('Only running campaigns can be paused');
    }

    campaign.status = AdStatus.PAUSED;
    const updated = await this.campaignRepository.save(campaign);

    this.logger.log(`Campaign paused: ${id}`);

    return this.mapToCampaignResponse(updated);
  }

  async resumeCampaign(id: string, companyId: string): Promise<CampaignResponseDto> {
    const campaign = await this.campaignRepository.findOne({ where: { id, companyId } });

    if (!campaign) {
      throw new NotFoundException(`Campaign not found: ${id}`);
    }

    if (campaign.status !== AdStatus.PAUSED) {
      throw new BadRequestException('Only paused campaigns can be resumed');
    }

    // Check if campaign has budget remaining
    const remaining = Number(campaign.budget) - Number(campaign.spent);
    if (remaining <= 0) {
      throw new BadRequestException('Campaign has no remaining budget');
    }

    // Check if campaign hasn't expired
    if (campaign.endDate && new Date(campaign.endDate) < new Date()) {
      throw new BadRequestException('Campaign end date has passed');
    }

    campaign.status = AdStatus.RUNNING;
    const updated = await this.campaignRepository.save(campaign);

    this.logger.log(`Campaign resumed: ${id}`);

    return this.mapToCampaignResponse(updated);
  }

  async launchCampaign(id: string, companyId: string): Promise<CampaignResponseDto> {
    const campaign = await this.campaignRepository.findOne({ where: { id, companyId } });

    if (!campaign) {
      throw new NotFoundException(`Campaign not found: ${id}`);
    }

    if (campaign.status !== AdStatus.DRAFT && campaign.status !== AdStatus.PAUSED) {
      throw new BadRequestException('Campaign must be in DRAFT or PAUSED status to launch');
    }

    // Check credit balance
    const credit = await this.creditRepository.findOne({ where: { companyId } });
    if (!credit || Number(credit.balance) < Number(campaign.budget)) {
      throw new BadRequestException('Insufficient ad credits');
    }

    campaign.status = AdStatus.RUNNING;
    const updated = await this.campaignRepository.save(campaign);

    this.logger.log(`Campaign launched: ${id}`);

    return this.mapToCampaignResponse(updated);
  }

  // ============================================
  // CAMPAIGN STATISTICS
  // ============================================

  async getCampaignStats(id: string): Promise<CampaignStatsDto> {
    const campaign = await this.campaignRepository.findOne({ where: { id } });

    if (!campaign) {
      throw new NotFoundException(`Campaign not found: ${id}`);
    }

    const impressions = campaign.impressions || 0;
    const clicks = campaign.clicks || 0;
    const conversions = campaign.conversions || 0;
    const spend = Number(campaign.spent) || 0;

    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
    const cpc = clicks > 0 ? spend / clicks : 0;
    const cpa = conversions > 0 ? spend / conversions : 0;
    const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;

    return {
      impressions,
      clicks,
      conversions,
      ctr: Math.round(ctr * 100) / 100,
      cpc: Math.round(cpc * 100) / 100,
      cpa: Math.round(cpa * 100) / 100,
      spend,
      conversionRate: Math.round(conversionRate * 100) / 100,
    };
  }

  // ============================================
  // AD CREDITS
  // ============================================

  async getCredits(companyId: string): Promise<AdCreditBalanceDto> {
    let credit = await this.creditRepository.findOne({ where: { companyId } });

    if (!credit) {
      // Create default credit record with 0 balance
      credit = this.creditRepository.create({
        companyId,
        balance: 0,
      });
      credit = await this.creditRepository.save(credit);
    }

    // Calculate spent this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const campaigns = await this.campaignRepository.find({
      where: {
        companyId,
        status: AdStatus.RUNNING,
      },
    });

    let spentThisMonth = 0;
    campaigns.forEach((c) => {
      spentThisMonth += Number(c.spent);
    });

    return {
      companyId,
      balance: Number(credit.balance),
      spentThisMonth: Math.round(spentThisMonth * 100) / 100,
    };
  }

  async addCredits(companyId: string, amount: number): Promise<AdCreditBalanceDto> {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be positive');
    }

    let credit = await this.creditRepository.findOne({ where: { companyId } });

    if (!credit) {
      credit = this.creditRepository.create({
        companyId,
        balance: amount,
      });
    } else {
      credit.balance = (Number(credit.balance) + amount) as any;
    }

    credit = await this.creditRepository.save(credit);

    this.logger.log(`Added ${amount} credits to company: ${companyId}`);

    return {
      companyId,
      balance: Number(credit.balance),
    };
  }

  // ============================================
  // AD PLANS
  // ============================================

  async getAdPlans(): Promise<{ plans: AdPlanDto[] }> {
    const plans: AdPlanDto[] = [
      {
        id: 'starter_ads',
        name: 'Starter Ads',
        description: 'Perfect for small businesses getting started with advertising',
        price: 9900,
        currency: 'USD',
        interval: 'monthly',
        impressions: 10000,
        clicks: 500,
        features: [
          'Up to 3 active campaigns',
          'Basic geographic targeting',
          'Category targeting',
          'Email support',
          'Basic analytics',
        ],
        isFeatured: false,
      },
      {
        id: 'professional_ads',
        name: 'Professional Ads',
        description: 'For growing businesses looking to scale their advertising',
        price: 29900,
        currency: 'USD',
        interval: 'monthly',
        impressions: 50000,
        clicks: 2500,
        features: [
          'Up to 15 active campaigns',
          'Advanced targeting options',
          'A/B testing',
          'Priority support',
          'Detailed analytics',
          'Custom audiences',
        ],
        isFeatured: true,
      },
      {
        id: 'enterprise_ads',
        name: 'Enterprise Ads',
        description: 'Comprehensive advertising solution for large enterprises',
        price: 99900,
        currency: 'USD',
        interval: 'monthly',
        impressions: 200000,
        clicks: 10000,
        features: [
          'Unlimited campaigns',
          'All targeting options',
          'API access',
          'Dedicated account manager',
          'Real-time analytics',
          'Custom reporting',
          'White-label options',
        ],
        isFeatured: false,
      },
    ];

    return { plans };
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  private mapToCampaignResponse(campaign: AdCampaign): CampaignResponseDto {
    return {
      id: campaign.id,
      companyId: campaign.companyId,
      name: campaign.name,
      type: campaign.type,
      status: campaign.status,
      targeting: campaign.targeting as unknown as import('./dto/ads.dto').TargetingDto,
      budget: Number(campaign.budget),
      dailyBudget: campaign.dailyBudget ? Number(campaign.dailyBudget) : undefined,
      spent: Number(campaign.spent),
      bidType: campaign.bidType,
      bidAmount: campaign.bidAmount ? Number(campaign.bidAmount) : undefined,
      startDate: campaign.startDate,
      endDate: campaign.endDate || undefined,
      impressions: campaign.impressions,
      clicks: campaign.clicks,
      conversions: campaign.conversions,
      createdAt: campaign.createdAt,
      updatedAt: campaign.updatedAt,
    };
  }
}
