import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import {
  ComplianceService,
  ShipmentValidationDto,
  CalculateDutyDto,
  CalculateLandedCostDto,
  ScreenEntityDto,
} from './compliance.service';

@ApiTags('Compliance')
@ApiBearerAuth()
@Controller('compliance')
@UseGuards(JwtAuthGuard)
export class ComplianceController {
  constructor(private complianceService: ComplianceService) {}

  @Get('hs-codes')
  @ApiOperation({ summary: 'Search HS codes' })
  @ApiQuery({ name: 'query', required: true })
  @ApiResponse({ status: 200, description: 'HS codes found' })
  async searchHsCodes(@Query('query') query: string) {
    return this.complianceService.searchHsCodes(query);
  }

  @Get('hs-codes/:code')
  @ApiOperation({ summary: 'Get HS code details' })
  @ApiResponse({ status: 200, description: 'HS code details' })
  @ApiResponse({ status: 404, description: 'HS code not found' })
  async getHsCode(@Param('code') code: string) {
    return this.complianceService.getHsCode(code);
  }

  @Post('classify')
  @ApiOperation({ summary: 'Classify a product using AI' })
  @ApiResponse({ status: 200, description: 'Classification result' })
  async classify(@Body('description') description: string) {
    return this.complianceService.classifyProduct(description);
  }

  @Post('duty-calculate')
  @ApiOperation({ summary: 'Calculate import duty' })
  @ApiResponse({ status: 200, description: 'Duty calculation result' })
  async calculateDuty(@Body() dto: CalculateDutyDto) {
    return this.complianceService.calculateDuty(dto);
  }

  @Post('screen')
  @ApiOperation({ summary: 'Screen an entity against sanctions lists' })
  @ApiResponse({ status: 200, description: 'Screening result' })
  async screen(@Body() dto: ScreenEntityDto) {
    return this.complianceService.screenEntity(dto.name, dto.country);
  }

  @Post('validate-shipment')
  @ApiOperation({ summary: 'Validate a shipment for compliance' })
  @ApiResponse({ status: 200, description: 'Validation result' })
  async validateShipment(@Body() shipment: ShipmentValidationDto) {
    return this.complianceService.validateShipment(shipment);
  }

  @Post('landed-cost')
  @ApiOperation({ summary: 'Calculate total landed cost' })
  @ApiResponse({ status: 200, description: 'Landed cost breakdown' })
  async landedCost(@Body() dto: CalculateLandedCostDto) {
    return this.complianceService.calculateLandedCost(dto);
  }

  @Get('restrictions/:country')
  @ApiOperation({ summary: 'Get import restrictions for a country' })
  @ApiResponse({ status: 200, description: 'Country restrictions' })
  async getRestrictions(@Param('country') country: string) {
    return this.complianceService.getCountryRestrictions(country);
  }

  @Get('countries')
  @ApiOperation({ summary: 'Get list of supported countries' })
  @ApiResponse({ status: 200, description: 'List of countries' })
  async getSupportedCountries() {
    return this.complianceService['dutyService'].getSupportedCountries();
  }
}
