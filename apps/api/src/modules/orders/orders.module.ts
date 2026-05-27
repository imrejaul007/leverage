import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Invoice } from './entities/invoice.entity';
import { PaymentTransaction } from './entities/payment-transaction.entity';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Invoice, PaymentTransaction]),
    PrismaModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
