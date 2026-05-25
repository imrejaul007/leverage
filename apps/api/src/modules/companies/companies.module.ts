import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { CompanyMember } from './entities/company-member.entity';
import { CompanyDocument } from './entities/company-document.entity';
import { CompanyProfile } from './entities/company-profile.entity';
import { CompanyFollow } from './entities/company-follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      CompanyMember,
      CompanyDocument,
      CompanyProfile,
      CompanyFollow,
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
