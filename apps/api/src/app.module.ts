import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { KycModule } from './modules/kyc/kyc.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { RfqsModule } from './modules/rfqs/rfqs.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ComplianceModule } from './modules/compliance/compliance.module';
import { FreightModule } from './modules/freight/freight.module';
import { MessagingModule } from './modules/messaging/messaging.module';
import { PostsModule } from './modules/posts/posts.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AdsModule } from './modules/ads/ads.module';
import { BillingModule } from './modules/billing/billing.module';
import { SearchModule } from './modules/search/search.module';

import { RedisService } from './shared/redis.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV === 'development',
        logging: process.env.NODE_ENV === 'development',
      }),
    }),

    BullModule.forRoot({
      redis: process.env.REDIS_URL || 'redis://localhost:6379',
    }),

    AuthModule,
    UsersModule,
    CompaniesModule,
    KycModule,
    ProductsModule,
    CategoriesModule,
    RfqsModule,
    OrdersModule,
    PaymentsModule,
    DocumentsModule,
    ComplianceModule,
    FreightModule,
    MessagingModule,
    PostsModule,
    NotificationsModule,
    AnalyticsModule,
    AdsModule,
    BillingModule,
    SearchModule,
  ],

  providers: [
    RedisService,
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
