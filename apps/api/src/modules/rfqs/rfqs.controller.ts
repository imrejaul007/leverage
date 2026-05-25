import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RfqsService } from './rfqs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('RFQs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rfqs')
export class RfqsController {
  constructor(private rfqsService: RfqsService) {}

  @Post()
  async create(@Body() dto: any, @Req() req: any) {
    return this.rfqsService.create(req.user.id, dto);
  }

  @Get()
  async findAll(@Query() filters: any) {
    return this.rfqsService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.rfqsService.findOne(id);
  }

  @Post(':id/respond')
  async respond(@Param('id') id: string, @Body() dto: any, @Req() req: any) {
    return this.rfqsService.submitResponse(id, req.user.companyId, dto);
  }

  @Post(':id/accept')
  async accept(@Body('responseId') responseId: string) {
    return this.rfqsService.acceptResponse(responseId);
  }

  @Post(':id/close')
  async close(@Param('id') id: string) {
    return this.rfqsService.close(id);
  }
}
