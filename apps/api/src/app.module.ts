import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RFQModule } from './modules/rfqs/rfqs.module';
import { FreightModule } from './modules/freight/freight.module';
import { BillingModule } from './modules/billing/billing.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    PrismaModule,
    SharedModule,

    AuthModule,
    UsersModule,
    DocumentsModule,
    ProductsModule,
    OrdersModule,
    RFQModule,
    FreightModule,
    BillingModule,
    AiModule,
  ],

  providers: [],
})
export class AppModule {}
