import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdsService } from './ads.service';
import {
  CreateCampaignDto,
  UpdateCampaignDto,
  CampaignFiltersDto,
} from './dto/ads.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Ads')
@Controller('ads')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post('campaigns')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new advertising campaign' })
  async createCampaign(
    @CurrentUser('companyId') companyId: string,
    @Body(new ValidationPipe({ transform: true })) dto: CreateCampaignDto,
  ) {
    return this.adsService.createCampaign(companyId, dto);
  }

  @Get('campaigns')
  @ApiOperation({ summary: 'List all campaigns for the current company' })
  async getCampaigns(
    @CurrentUser('companyId') companyId: string,
    @Query(new ValidationPipe({ transform: true })) filters: CampaignFiltersDto,
  ) {
    return this.adsService.getCampaigns(companyId, filters);
  }

  @Get('campaigns/:id')
  @ApiOperation({ summary: 'Get campaign details by ID' })
  async getCampaign(@Param('id') id: string) {
    return this.adsService.getCampaign(id);
  }

  @Patch('campaigns/:id')
  @ApiOperation({ summary: 'Update an existing campaign' })
  async updateCampaign(
    @Param('id') id: string,
    @CurrentUser('companyId') companyId: string,
    @Body(new ValidationPipe({ transform: true })) dto: UpdateCampaignDto,
  ) {
    return this.adsService.updateCampaign(id, companyId, dto);
  }

  @Delete('campaigns/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a campaign' })
  async deleteCampaign(
    @Param('id') id: string,
    @CurrentUser('companyId') companyId: string,
  ) {
    return this.adsService.deleteCampaign(id, companyId);
  }

  @Post('campaigns/:id/pause')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Pause a running campaign' })
  async pauseCampaign(
    @Param('id') id: string,
    @CurrentUser('companyId') companyId: string,
  ) {
    return this.adsService.pauseCampaign(id, companyId);
  }

  @Post('campaigns/:id/resume')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resume a paused campaign' })
  async resumeCampaign(
    @Param('id') id: string,
    @CurrentUser('companyId') companyId: string,
  ) {
    return this.adsService.resumeCampaign(id, companyId);
  }

  @Post('campaigns/:id/launch')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Launch a draft campaign' })
  async launchCampaign(
    @Param('id') id: string,
    @CurrentUser('companyId') companyId: string,
  ) {
    return this.adsService.launchCampaign(id, companyId);
  }

  @Get('campaigns/:id/stats')
  @ApiOperation({ summary: 'Get campaign statistics and metrics' })
  async getCampaignStats(@Param('id') id: string) {
    return this.adsService.getCampaignStats(id);
  }

  @Get('credits')
  @ApiOperation({ summary: 'Get current ad credit balance' })
  async getCredits(@CurrentUser('companyId') companyId: string) {
    return this.adsService.getCredits(companyId);
  }

  @Get('plans')
  @ApiOperation({ summary: 'Get available advertising plans' })
  async getAdPlans() {
    return this.adsService.getAdPlans();
  }
}
