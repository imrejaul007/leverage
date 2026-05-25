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
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator';
import {
  CreateOrderDto,
  OrderFiltersDto,
  OrderResponseDto,
  OrderListResponseDto,
  OrderTimelineDto,
  AddOrderItemDto,
} from './dto/orders.dto';
import { OrderStatus } from './entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ValidationPipe({ transform: true })) dto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    return this.ordersService.createOrder(user.companyId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders for the current company' })
  async getOrders(
    @CurrentUser('companyId') companyId: string,
    @Query(new ValidationPipe({ transform: true })) filters: OrderFiltersDto,
  ): Promise<OrderListResponseDto> {
    return this.ordersService.getOrders(companyId, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  async getOrder(@Param('id') id: string): Promise<OrderResponseDto> {
    return this.ordersService.getOrderById(id);
  }

  @Get('number/:orderNumber')
  @ApiOperation({ summary: 'Get order by order number' })
  async getOrderByNumber(
    @Param('orderNumber') orderNumber: string,
  ): Promise<OrderResponseDto> {
    return this.ordersService.getOrderByNumber(orderNumber);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update order status' })
  async updateOrderStatus(
    @Param('id') id: string,
    @CurrentUser('companyId') companyId: string,
    @Body('status') status: OrderStatus,
  ): Promise<OrderResponseDto> {
    return this.ordersService.updateOrderStatus(id, companyId, status);
  }

  @Patch(':id/payment-status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update payment status' })
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body('paymentStatus') paymentStatus: string,
  ): Promise<OrderResponseDto> {
    return this.ordersService.updatePaymentStatus(
      id,
      paymentStatus as any,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel an order' })
  async cancelOrder(
    @Param('id') id: string,
    @CurrentUser('companyId') companyId: string,
    @Body('reason') reason?: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.ordersService.cancelOrder(id, companyId, reason);
  }

  @Post(':id/items')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add an item to an order' })
  async addOrderItem(
    @Param('id') id: string,
    @CurrentUser('companyId') companyId: string,
    @Body(new ValidationPipe({ transform: true })) dto: AddOrderItemDto,
  ): Promise<OrderResponseDto> {
    return this.ordersService.addOrderItem(id, companyId, dto);
  }

  @Delete(':id/items/:itemId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove an item from an order' })
  async removeOrderItem(
    @Param('id') id: string,
    @Param('itemId') itemId: string,
    @CurrentUser('companyId') companyId: string,
  ): Promise<OrderResponseDto> {
    return this.ordersService.removeOrderItem(id, itemId, companyId);
  }

  @Get(':id/timeline')
  @ApiOperation({ summary: 'Get order timeline' })
  async getOrderTimeline(@Param('id') id: string): Promise<OrderTimelineDto> {
    return this.ordersService.getOrderTimeline(id);
  }

  @Post(':id/invoice')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Generate invoice for an order' })
  async generateInvoice(
    @Param('id') id: string,
    @CurrentUser('companyId') companyId: string,
  ) {
    return this.ordersService.generateInvoice(id, companyId);
  }

  @Get(':id/invoices')
  @ApiOperation({ summary: 'Get all invoices for an order' })
  async getOrderInvoices(@Param('id') id: string) {
    return this.ordersService.getOrderInvoices(id);
  }
}
