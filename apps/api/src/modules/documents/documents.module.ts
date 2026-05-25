import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DocumentGeneratorService } from './document-generator.service';
import { TradeDocument } from './entities/trade-document.entity';
import { DocumentTemplate } from './entities/document-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TradeDocument, DocumentTemplate])],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentGeneratorService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
