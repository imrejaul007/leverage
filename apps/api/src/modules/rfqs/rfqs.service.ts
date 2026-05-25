import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rfq } from './entities/rfq.entity';
import { RfqResponse } from './entities/rfq-response.entity';

@Injectable()
export class RfqsService {
  constructor(
    @InjectRepository(Rfq)
    private rfqRepo: Repository<Rfq>,
    @InjectRepository(RfqResponse)
    private responseRepo: Repository<RfqResponse>,
  ) {}

  async create(userId: string, dto: any) {
    const rfq = this.rfqRepo.create({ ...dto, userId });
    return this.rfqRepo.save(rfq);
  }

  async findAll(filters: any) {
    const [rfqs, total] = await this.rfqRepo.findAndCount({
      where: { status: 'OPEN' as any },
      order: { createdAt: 'DESC' },
    });
    return { rfqs, total };
  }

  async findOne(id: string) {
    const rfq = await this.rfqRepo.findOne({
      where: { id },
      relations: ['responses'],
    });
    if (!rfq) throw new NotFoundException('RFQ not found');
    return rfq;
  }

  async submitResponse(rfqId: string, companyId: string, dto: any) {
    const response = this.responseRepo.create({ ...dto, rfqId, companyId });
    return this.responseRepo.save(response);
  }

  async acceptResponse(responseId: string) {
    await this.responseRepo.update(responseId, { isAccepted: true } as any);
    await this.rfqRepo.update({ id: responseId } as any, { status: 'AWARDED' as any });
    return { success: true };
  }

  async close(id: string) {
    const rfq = await this.rfqRepo.findOne({ where: { id } });
    if (!rfq) throw new NotFoundException('RFQ not found');
    await this.rfqRepo.update(id, { status: 'CLOSED' as any });
    return { success: true };
  }
}
