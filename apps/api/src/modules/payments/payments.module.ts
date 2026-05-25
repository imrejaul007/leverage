import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { StripeService } from './stripe.service';
import { PaymentTransaction } from './entities/payment-transaction.entity';
import { EscrowHold } from './entities/escrow-hold.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentTransaction, EscrowHold]),
    ConfigModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, StripeService],
  exports: [PaymentsService, StripeService],
})
export class PaymentsModule {}
