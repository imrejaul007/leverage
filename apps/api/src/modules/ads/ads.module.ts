import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { AdCampaign } from './entities/ad-campaign.entity';
import { AdCredit } from './entities/ad-credit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdCampaign, AdCredit])],
  controllers: [AdsController],
  providers: [AdsService],
  exports: [AdsService],
})
export class AdsModule {}
