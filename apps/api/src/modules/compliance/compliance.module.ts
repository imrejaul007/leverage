import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceController } from './compliance.controller';
import { ComplianceService } from './compliance.service';
import { HsCodeService } from './hs-code.service';
import { SanctionScreeningService } from './sanction-screening.service';
import { DutyCalculatorService } from './duty-calculator.service';

@Module({
  imports: [],
  controllers: [ComplianceController],
  providers: [ComplianceService, HsCodeService, SanctionScreeningService, DutyCalculatorService],
  exports: [ComplianceService],
})
export class ComplianceModule {}
