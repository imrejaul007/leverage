import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreightController } from './freight.controller';
import { FreightService } from './freight.service';
import { CarrierIntegrationService } from './carrier-integration.service';

import { FreightQuote } from './entities/freight-quote.entity';
import { Carrier } from './entities/carrier.entity';
import { Shipment } from './entities/shipment.entity';
import { ContainerBooking } from './entities/container-booking.entity';
import { ShipmentTracking } from './entities/shipment-tracking.entity';
import { InsurancePolicy } from './entities/insurance-policy.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FreightQuote,
      Carrier,
      Shipment,
      ContainerBooking,
      ShipmentTracking,
      InsurancePolicy,
      Order,
    ]),
  ],
  controllers: [FreightController],
  providers: [FreightService, CarrierIntegrationService],
  exports: [FreightService],
})
export class FreightModule {}
