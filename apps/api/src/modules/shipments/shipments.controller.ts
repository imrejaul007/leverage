import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { ShipmentsService } from './shipments.service';

@ApiTags('Shipments')
@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createShipment(@Body() dto: any) {
    return this.shipmentsService.createShipment(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getShipments(@Query('userId') userId: string) {
    return this.shipmentsService.getShipments(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getShipment(@Param('id') id: string) {
    return this.shipmentsService.getShipment(id);
  }

  @Public()
  @Get(':id/tracking')
  async getTracking(@Param('id') id: string) {
    return this.shipmentsService.getTracking(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateShipment(@Param('id') id: string, @Body() dto: any) {
    return this.shipmentsService.updateShipment(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/cancel')
  async cancelShipment(@Param('id') id: string) {
    return this.shipmentsService.cancelShipment(id);
  }
}
