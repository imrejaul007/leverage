import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface KycStatus {
  companyId: string;
  overallStatus: 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';
  gstStatus?: string;
  iecStatus?: string;
  documentStatus?: string;
  updatedAt: Date;
}

export interface UploadDocumentDto {
  type: 'GST_CERTIFICATE' | 'IEC' | 'PAN_CARD' | 'ADDRESS_PROOF' | 'BANK_STATEMENT' | 'OTHER';
  documentUrl: string;
  documentNumber?: string;
  expiryDate?: string;
}

@Injectable()
export class KycService {
  constructor(private prisma: PrismaService) {}

  async getStatus(companyId: string) {
    const company = await (this.prisma as any).company.findUnique({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    let kycStatus = await (this.prisma as any).kYcStatus.findUnique({ where: { companyId } });

    if (!kycStatus) {
      kycStatus = await (this.prisma as any).kYcStatus.create({
        data: { companyId, overallStatus: 'PENDING' },
      });
    }

    return kycStatus;
  }

  async verifyGst(companyId: string, gstin: string): Promise<{ valid: boolean; status: string }> {
    const company = await (this.prisma as any).company.findUnique({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    // Mock GST verification - in production, call GST API
    const isValid = gstin.length === 15 && /^[0-9]{2}[A-Z]{10}[0-9]{1}[A-Z]{1}$/.test(gstin);

    const status = isValid ? 'VERIFIED' : 'REJECTED';

    await (this.prisma as any).kYcStatus.upsert({
      where: { companyId },
      create: { companyId, overallStatus: 'PENDING', gstStatus: status },
      update: { gstStatus: status },
    });

    return { valid: isValid, status };
  }

  async verifyIec(companyId: string, iec: string): Promise<{ valid: boolean; status: string }> {
    const company = await (this.prisma as any).company.findUnique({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    // Mock IEC verification - IEC should be 10 digits
    const isValid = iec.length === 10 && /^[0-9]+$/.test(iec);

    const status = isValid ? 'VERIFIED' : 'REJECTED';

    await (this.prisma as any).kYcStatus.upsert({
      where: { companyId },
      create: { companyId, overallStatus: 'PENDING', iecStatus: status },
      update: { iecStatus: status },
    });

    return { valid: isValid, status };
  }

  async uploadDocument(companyId: string, dto: UploadDocumentDto) {
    const company = await (this.prisma as any).company.findUnique({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    const document = await (this.prisma as any).companyDocument.create({
      data: {
        companyId,
        type: dto.type,
        documentUrl: dto.documentUrl,
        documentNumber: dto.documentNumber,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        status: 'PENDING',
      },
    });

    await (this.prisma as any).kYcStatus.upsert({
      where: { companyId },
      create: { companyId, overallStatus: 'PENDING', documentStatus: 'PENDING' },
      update: { documentStatus: 'PENDING' },
    });

    return document;
  }

  async submitForReview(companyId: string) {
    const company = await (this.prisma as any).company.findUnique({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    const kycStatus = await (this.prisma as any).kYcStatus.findUnique({ where: { companyId } });
    if (!kycStatus) throw new NotFoundException('KYC not initiated');

    return (this.prisma as any).kYcStatus.update({
      where: { companyId },
      data: { overallStatus: 'UNDER_REVIEW' },
    });
  }

  async getDocuments(companyId: string) {
    return (this.prisma as any).companyDocument.findMany({
      where: { companyId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
