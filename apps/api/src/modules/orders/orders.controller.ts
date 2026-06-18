import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  async findAll(@Query() filters: any) {
    return this.ordersService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async create(@Body() dto: any, @Query('userId') userId: string) {
    return this.ordersService.create(userId, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  async updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.ordersService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel an order' })
  async cancel(@Param('id') id: string) {
    return this.ordersService.cancel(id);
  }

  @Get(':id/timeline')
  @ApiOperation({ summary: 'Get order timeline' })
  async getTimeline(@Param('id') id: string) {
    return this.ordersService.getTimeline(id);
  }
}
