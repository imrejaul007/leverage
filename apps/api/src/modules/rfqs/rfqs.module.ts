import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RfqsController } from './rfqs.controller';
import { RfqsService } from './rfqs.service';
import { Rfq } from './entities/rfq.entity';
import { RfqResponse } from './entities/rfq-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rfq, RfqResponse])],
  controllers: [RfqsController],
  providers: [RfqsService],
  exports: [RfqsService],
})
export class RfqsModule {}
