import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Invoice } from './entities/invoice.entity';
import { OrderStatus, PaymentStatus, InvoiceStatus } from '../../common/enums';
import {
  CreateOrderDto,
  CreateOrderItemDto,
  OrderFiltersDto,
  OrderResponseDto,
  OrderListResponseDto,
  OrderTimelineDto,
  AddOrderItemDto,
} from './dto/orders.dto';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  /**
   * Create a new order with items
   */
  async createOrder(
    buyerId: string,
    dto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    // Validate buyer is not the seller
    if (buyerId === dto.sellerId) {
      throw new BadRequestException('Buyer cannot be the same as seller');
    }

    // Calculate order totals
    const subtotal = dto.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    );
    const total = subtotal; // Tax, shipping, discount can be added later

    // Generate unique order number
    const orderNumber = `LBL-${new Date().getFullYear()}-${uuidv4()
      .slice(0, 8)
      .toUpperCase()}`;

    // Create order
    const order = this.orderRepository.create({
      orderNumber,
      buyerId,
      buyerCompanyId: 'default',
      sellerId: dto.sellerId,
      sellerCompanyId: 'default',
      subtotal: subtotal as any,
      totalAmount: total as any,
      taxAmount: 0 as any,
      discountAmount: 0 as any,
      shippingCost: 0 as any,
      currency: dto.currency || 'USD',
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      shippingAddress: dto.shippingAddress as any,
      billingAddress: dto.billingAddress as any,
      notes: dto.notes,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Create order items
    const items = dto.items.map((itemDto) =>
      this.orderItemRepository.create({
        ...itemDto,
        orderId: savedOrder.id,
        totalPrice: itemDto.quantity * itemDto.unitPrice,
      }),
    );

    await this.orderItemRepository.save(items);

    this.logger.log(`Order created: ${savedOrder.id} for buyer: ${buyerId}`);

    return this.getOrderById(savedOrder.id);
  }

  /**
   * Get all orders for a company (as buyer or seller)
   */
  async getOrders(
    companyId: string,
    filters: OrderFiltersDto,
  ): Promise<OrderListResponseDto> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<Order>[] = [
      { buyerId: companyId } as FindOptionsWhere<Order>,
      { sellerId: companyId } as FindOptionsWhere<Order>,
    ];

    // Apply filters
    const filterConditions: FindOptionsWhere<Order> = {};
    if (filters.status) {
      filterConditions.status = filters.status;
    }
    if (filters.paymentStatus) {
      filterConditions.paymentStatus = filters.paymentStatus;
    }
    if (filters.sellerId) {
      filterConditions.sellerId = filters.sellerId;
    }
    if (filters.buyerId) {
      filterConditions.buyerId = filters.buyerId;
    }

    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .where('(order.buyerId = :companyId OR order.sellerId = :companyId)', {
        companyId,
      })
      .andWhere(filterConditions.status ? 'order.status = :status' : '1=1', {
        status: filterConditions.status,
      })
      .andWhere(
        filterConditions.paymentStatus
          ? 'order.paymentStatus = :paymentStatus'
          : '1=1',
        { paymentStatus: filterConditions.paymentStatus },
      )
      .leftJoinAndSelect('order.items', 'items')
      .orderBy(`order.${filters.sortBy || 'createdAt'}`, filters.sortOrder || 'DESC')
      .skip(skip)
      .take(limit);

    const [orders, total] = await queryBuilder.getManyAndCount();

    return {
      orders: orders.map((order) => this.mapToOrderResponse(order)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get a single order by ID
   */
  async getOrderById(id: string): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order not found: ${id}`);
    }

    return this.mapToOrderResponse(order);
  }

  /**
   * Get order by order number
   */
  async getOrderByNumber(orderNumber: string): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({
      where: { orderNumber },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order not found: ${orderNumber}`);
    }

    return this.mapToOrderResponse(order);
  }

  /**
   * Update order status
   */
  async updateOrderStatus(
    id: string,
    companyId: string,
    status: OrderStatus,
  ): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order not found: ${id}`);
    }

    // Validate company has access
    if (order.buyerId !== companyId && order.sellerId !== companyId) {
      throw new ForbiddenException('You do not have access to this order');
    }

    // Validate status transition
    this.validateStatusTransition(order.status, status);

    // Update timestamps based on status
    const updateData: Partial<Order> & Record<string, any> = { status };

    switch (status) {
      case OrderStatus.CONFIRMED:
        updateData.completedAt = new Date();
        break;
    }

    await this.orderRepository.update(id, updateData as any);

    this.logger.log(`Order ${id} status updated to ${status}`);

    return this.getOrderById(id);
  }

  /**
   * Update payment status
   */
  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
  ): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order not found: ${id}`);
    }

    await this.orderRepository.update(id, { paymentStatus });

    this.logger.log(`Order ${id} payment status updated to ${paymentStatus}`);

    return this.getOrderById(id);
  }

  /**
   * Cancel an order
   */
  async cancelOrder(
    id: string,
    companyId: string,
    reason?: string,
  ): Promise<{ success: boolean; message: string }> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order not found: ${id}`);
    }

    // Validate company has access
    if (order.buyerId !== companyId && order.sellerId !== companyId) {
      throw new ForbiddenException('You do not have access to this order');
    }

    // Validate order can be cancelled
    const cancellableStatuses = [OrderStatus.PENDING, OrderStatus.CONFIRMED];
    if (!cancellableStatuses.includes(order.status)) {
      throw new BadRequestException(
        `Order cannot be cancelled in ${order.status} status`,
      );
    }

    // If order is paid, payment status should be refunded
    if (order.paymentStatus === PaymentStatus.PAID) {
      await this.orderRepository.update(id, {
        status: OrderStatus.REFUNDED as any,
        paymentStatus: PaymentStatus.REFUNDED as any,
      });
    } else {
      await this.orderRepository.update(id, {
        status: OrderStatus.CANCELLED as any,
      });
    }

    this.logger.log(`Order ${id} cancelled by ${companyId}`);

    return {
      success: true,
      message: 'Order cancelled successfully',
    };
  }

  /**
   * Add an item to an existing order
   */
  async addOrderItem(
    orderId: string,
    companyId: string,
    dto: AddOrderItemDto,
  ): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });

    if (!order) {
      throw new NotFoundException(`Order not found: ${orderId}`);
    }

    // Only seller can add items
    if (order.sellerId !== companyId) {
      throw new ForbiddenException('Only the seller can add items to an order');
    }

    // Validate order is in a modifiable state
    const modifiableStatuses = [OrderStatus.PENDING, OrderStatus.CONFIRMED];
    if (!modifiableStatuses.includes(order.status)) {
      throw new BadRequestException(
        `Cannot add items to an order in ${order.status} status`,
      );
    }

    // Create the item
    const item = this.orderItemRepository.create({
      ...dto,
      orderId,
      totalPrice: dto.quantity * dto.unitPrice,
    });

    await this.orderItemRepository.save(item);

    // Recalculate order subtotal and total
    const allItems = await this.orderItemRepository.find({
      where: { orderId },
    });
    const subtotal = allItems.reduce((sum, i) => sum + Number(i.totalPrice), 0);

    await this.orderRepository.update(orderId, {
      subtotal: subtotal as any,
      totalAmount: subtotal as any,
    });

    this.logger.log(`Item added to order ${orderId}`);

    return this.getOrderById(orderId);
  }

  /**
   * Remove an item from an order
   */
  async removeOrderItem(
    orderId: string,
    itemId: string,
    companyId: string,
  ): Promise<OrderResponseDto> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });

    if (!order) {
      throw new NotFoundException(`Order not found: ${orderId}`);
    }

    // Only seller can remove items
    if (order.sellerId !== companyId) {
      throw new ForbiddenException(
        'Only the seller can remove items from an order',
      );
    }

    // Validate order is in a modifiable state
    const modifiableStatuses = [OrderStatus.PENDING, OrderStatus.CONFIRMED];
    if (!modifiableStatuses.includes(order.status)) {
      throw new BadRequestException(
        `Cannot remove items from an order in ${order.status} status`,
      );
    }

    const item = await this.orderItemRepository.findOne({
      where: { id: itemId, orderId },
    });

    if (!item) {
      throw new NotFoundException(`Item not found: ${itemId}`);
    }

    await this.orderItemRepository.remove(item);

    // Recalculate order totals
    const remainingItems = await this.orderItemRepository.find({
      where: { orderId },
    });
    const subtotal = remainingItems.reduce(
      (sum, i) => sum + Number(i.totalPrice),
      0,
    );

    await this.orderRepository.update(orderId, {
      subtotal: subtotal as any,
      totalAmount: subtotal as any,
    });

    this.logger.log(`Item ${itemId} removed from order ${orderId}`);

    return this.getOrderById(orderId);
  }

  /**
   * Get order timeline
   */
  async getOrderTimeline(id: string): Promise<OrderTimelineDto> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order not found: ${id}`);
    }

    const timeline: OrderTimelineDto = {
      created: order.createdAt,
    };

    if (order.completedAt) {
      timeline.confirmed = order.completedAt;
    }

    return timeline;
  }

  /**
   * Generate invoice for an order
   */
  async generateInvoice(
    orderId: string,
    companyId: string,
  ): Promise<Invoice> {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order not found: ${orderId}`);
    }

    // Validate company is involved in the order
    if (order.buyerId !== companyId && order.sellerId !== companyId) {
      throw new ForbiddenException('You do not have access to this order');
    }

    // Generate invoice number
    const invoiceNumber = `INV-${new Date().getFullYear()}-${uuidv4()
      .slice(0, 8)
      .toUpperCase()}`;

    const invoice = this.invoiceRepository.create({
      invoiceNumber,
      orderId: orderId as any,
      type: InvoiceStatus.DRAFT as any,
      buyerCompany: {} as any,
      sellerCompany: {} as any,
      items: {} as any,
      subtotal: order.subtotal as any,
      taxBreakdown: {} as any,
      taxAmount: order.taxAmount as any,
      shippingCost: order.shippingCost as any,
      discountAmount: order.discountAmount as any,
      totalAmount: order.totalAmount as any,
      currency: order.currency,
      status: InvoiceStatus.DRAFT,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    const savedInvoice = await this.invoiceRepository.save(invoice);

    this.logger.log(`Invoice ${invoiceNumber} generated for order ${orderId}`);

    return savedInvoice;
  }

  /**
   * Get invoices for an order
   */
  async getOrderInvoices(orderId: string): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      where: { orderId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Validate status transition
   */
  private validateStatusTransition(
    currentStatus: OrderStatus,
    newStatus: OrderStatus,
  ): void {
    const validTransitions: Record<string, string[]> = {
      [OrderStatus.PENDING]: [
        OrderStatus.CONFIRMED,
        OrderStatus.CANCELLED,
        OrderStatus.PROCESSING,
      ] as string[],
      [OrderStatus.CONFIRMED]: [
        OrderStatus.PROCESSING,
        OrderStatus.SHIPPED,
        OrderStatus.CANCELLED,
      ] as string[],
      [OrderStatus.PROCESSING]: [
        OrderStatus.SHIPPED,
        OrderStatus.CANCELLED,
      ] as string[],
      [OrderStatus.SHIPPED]: [
        OrderStatus.DELIVERED,
        OrderStatus.CANCELLED,
      ] as string[],
      [OrderStatus.DELIVERED]: [OrderStatus.REFUNDED] as string[],
      [OrderStatus.CANCELLED]: [],
      [OrderStatus.REFUNDED]: [],
      [OrderStatus.IN_TRANSIT]: [OrderStatus.DELIVERED, OrderStatus.DISPUTED] as string[],
      [OrderStatus.COMPLETED]: [OrderStatus.REFUNDED] as string[],
      [OrderStatus.DISPUTED]: [] as string[],
    };

    const allowed = validTransitions[currentStatus] || [];
    if (!allowed.includes(newStatus as string)) {
      throw new BadRequestException(
        `Cannot transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }

  /**
   * Map order entity to response DTO
   */
  private mapToOrderResponse(order: Order): OrderResponseDto {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      buyerId: order.buyerId,
      sellerId: order.sellerId,
      status: order.status,
      paymentStatus: order.paymentStatus,
      subtotal: Number(order.subtotal),
      tax: Number(order.taxAmount || 0),
      shippingCost: Number(order.shippingCost || 0),
      discount: Number(order.discountAmount || 0),
      total: Number(order.totalAmount),
      currency: order.currency,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      notes: order.notes,
      items: (order.items || []) as any,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
