import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RfqsController } from './rfqs.controller';
import { RfqsService } from './rfqs.service';
import { Rfq } from './entities/rfq.entity';
import { RfqResponse } from './entities/rfq-response.entity';
import { User } from '../auth/entities/user.entity';
import { Company } from '../companies/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rfq, RfqResponse, User, Company])],
  controllers: [RfqsController],
  providers: [RfqsService],
  exports: [RfqsService],
})
export class RfqsModule {}
