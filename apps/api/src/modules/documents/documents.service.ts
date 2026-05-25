import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeDocument, DocumentStatus } from './entities/trade-document.entity';
import { DocumentCategory } from '../../common/enums';
import { DocumentGeneratorService } from './document-generator.service';

export interface GenerateDocumentDto {
  title: string;
  type: DocumentCategory;
  number?: string;
  content?: Record<string, any>;
  generatedBy?: string;
  generatedFor?: string;
  shipperId?: string;
  consigneeId?: string;
  shipmentId?: string;
  orderId?: string;
  metadata?: Record<string, any>;
}

export interface SignDocumentDto {
  signerName?: string;
  signature?: string;
  ipAddress?: string;
}

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(TradeDocument)
    private docRepo: Repository<TradeDocument>,
    private generator: DocumentGeneratorService,
  ) {}

  async generate(userId: string, dto: GenerateDocumentDto) {
    const doc = await this.docRepo.save({
      type: dto.type,
      referenceType: 'ORDER' as any,
      title: dto.title,
      generatedFor: dto.generatedFor || {},
      generatedBy: dto.generatedBy || {},
      content: dto.content,
      status: DocumentStatus.DRAFT,
      createdBy: userId,
    });

    const pdfUrl = await this.generator.generate(doc);
    await this.docRepo.update(doc.id, { fileUrl: pdfUrl, status: DocumentStatus.VALIDATED });

    return this.findOne(doc.id);
  }

  async findAll(filters: {
    userId: string;
    type?: DocumentCategory;
    status?: DocumentStatus;
    limit?: number;
    offset?: number;
  }) {
    const { userId, type, status, limit = 20, offset = 0 } = filters;

    const queryBuilder = this.docRepo.createQueryBuilder('doc')
      .where('doc.createdBy = :userId', { userId })
      .orderBy('doc.createdAt', 'DESC')
      .take(limit)
      .skip(offset);

    if (type) {
      queryBuilder.andWhere('doc.type = :type', { type });
    }

    if (status) {
      queryBuilder.andWhere('doc.status = :status', { status });
    }

    const [documents, total] = await queryBuilder.getManyAndCount();
    return { documents, total, limit, offset };
  }

  async findOne(id: string) {
    const doc = await this.docRepo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException(`Document with ID ${id} not found`);
    return doc;
  }

  async download(id: string) {
    const doc = await this.findOne(id);
    if (!doc.fileUrl) {
      throw new BadRequestException('Document has not been generated yet');
    }
    return { url: doc.fileUrl, name: doc.title, type: doc.type };
  }

  async sign(id: string, signerId: string, dto: SignDocumentDto) {
    const doc = await this.findOne(id);

    if (doc.status !== DocumentStatus.VALIDATED && doc.status !== DocumentStatus.DRAFT) {
      throw new BadRequestException('Document cannot be signed in its current state');
    }

    const signatures = (doc.signatures || []) as Array<Record<string, unknown>>;
    signatures.push({
      ...dto,
      signerId,
      signedAt: new Date(),
    });

    await this.docRepo.update(id, {
      signatures: signatures as any,
      status: DocumentStatus.SIGNED,
    });

    return { success: true, signatures };
  }

  async validate(id: string) {
    const doc = await this.findOne(id);
    await this.docRepo.update(id, {
      isValidated: true,
      status: DocumentStatus.VALIDATED,
    });
    return { success: true };
  }

  async archive(id: string, _userId: string) {
    await this.docRepo.update(id, {
      status: DocumentStatus.CANCELLED,
    });
    return { success: true };
  }

  async getByOrder(orderId: string) {
    return this.docRepo.find({ where: { referenceId: orderId } as any, order: { createdAt: 'DESC' } });
  }

  async getByShipment(shipmentId: string) {
    return this.docRepo.find({ where: { referenceId: shipmentId } as any, order: { createdAt: 'DESC' } });
  }
}
