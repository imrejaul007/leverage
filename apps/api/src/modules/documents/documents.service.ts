import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { TradeDocument, DocumentStatus, DocumentRefType } from './entities/trade-document.entity';
import { DocumentCategory } from '../../common/enums';
import { DocumentGeneratorService } from './document-generator.service';

export interface GenerateDocumentDto {
  title: string;
  type: DocumentCategory;
  number?: string;
  content?: Record<string, unknown>;
  generatedBy?: string;
  generatedFor?: string;
  shipperId?: string;
  consigneeId?: string;
  shipmentId?: string;
  orderId?: string;
  metadata?: Record<string, unknown>;
}

export interface SignDocumentDto {
  signerName?: string;
  signature?: string;
  ipAddress?: string;
}

export interface DocumentFilters {
  userId: string;
  type?: DocumentCategory;
  status?: DocumentStatus;
  limit?: number;
  offset?: number;
}

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(TradeDocument)
    private docRepo: Repository<TradeDocument>,
    private generator: DocumentGeneratorService,
  ) {}

  async generate(userId: string, dto: GenerateDocumentDto) {
    const docData: DeepPartial<TradeDocument> = {
      type: dto.type,
      referenceType: DocumentRefType.ORDER,
      title: dto.title,
      generatedFor: (dto.generatedFor || {}) as object,
      generatedBy: (dto.generatedBy || {}) as object,
      content: (dto.content || {}) as object,
      status: DocumentStatus.DRAFT,
      createdBy: userId,
    };

    const doc = await this.docRepo.save(this.docRepo.create(docData));

    const pdfUrl = await this.generator.generate(doc);
    await this.docRepo.update(doc.id, { fileUrl: pdfUrl, status: DocumentStatus.VALIDATED });

    return this.findOne(doc.id, userId);
  }

  async findAll(filters: DocumentFilters) {
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

  async findOne(id: string, userId?: string) {
    const doc = await this.docRepo.findOne({ where: { id } });
    if (!doc) throw new NotFoundException(`Document with ID ${id} not found`);

    if (userId && doc.createdBy !== userId) {
      throw new ForbiddenException('You do not have access to this document');
    }

    return doc;
  }

  async download(id: string, userId?: string) {
    const doc = await this.findOne(id, userId);

    if (!doc.fileUrl) {
      throw new BadRequestException('Document has not been generated yet');
    }

    return { url: doc.fileUrl, name: doc.title, type: doc.type };
  }

  async sign(id: string, signerId: string, dto: SignDocumentDto) {
    const doc = await this.findOne(id, signerId);

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
      signatures: signatures as unknown as object,
      status: DocumentStatus.SIGNED,
    });

    return { success: true, signatures };
  }

  async validate(id: string, userId?: string) {
    const doc = await this.findOne(id, userId);

    if (userId && doc.createdBy !== userId) {
      throw new ForbiddenException('Only the document owner can validate it');
    }

    await this.docRepo.update(id, {
      isValidated: true,
      status: DocumentStatus.VALIDATED,
    });
    return { success: true };
  }

  async archive(id: string, userId: string) {
    const doc = await this.findOne(id, userId);

    if (doc.createdBy !== userId) {
      throw new ForbiddenException('Only the document owner can archive it');
    }

    await this.docRepo.update(id, {
      status: DocumentStatus.CANCELLED,
    });
    return { success: true };
  }

  async getByOrder(orderId: string, userId?: string) {
    const docs = await this.docRepo.find({
      where: { referenceId: orderId } as Record<string, unknown>,
      order: { createdAt: 'DESC' },
    });

    if (userId) {
      return docs.filter(doc => doc.createdBy === userId);
    }

    return docs;
  }

  async getByShipment(shipmentId: string, userId?: string) {
    const docs = await this.docRepo.find({
      where: { referenceId: shipmentId } as Record<string, unknown>,
      order: { createdAt: 'DESC' },
    });

    if (userId) {
      return docs.filter(doc => doc.createdBy === userId);
    }

    return docs;
  }
}
