import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface CreateCompanyDto {
  name: string;
  type?: 'MANUFACTURER' | 'TRADER' | 'BOTH';
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  phone?: string;
  website?: string;
}

export interface UpdateCompanyDto {
  name?: string;
  type?: 'MANUFACTURER' | 'TRADER' | 'BOTH';
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  phone?: string;
  website?: string;
  status?: string;
}

export interface InviteMemberDto {
  userId: string;
  role?: 'ADMIN' | 'MEMBER' | 'VIEWER';
}

export interface CompanyFilters {
  type?: string;
  status?: string;
  city?: string;
  state?: string;
  country?: string;
}

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateCompanyDto) {
    return (this.prisma as any).company.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  async findAll(filters: CompanyFilters) {
    return (this.prisma as any).company.findMany({
      where: filters,
      include: { _count: { select: { products: true, members: true } } },
    });
  }

  async findOne(id: string) {
    const company = await (this.prisma as any).company.findUnique({
      where: { id },
      include: { owner: true, members: true },
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(id: string, dto: UpdateCompanyDto) {
    const company = await (this.prisma as any).company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');

    return (this.prisma as any).company.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    const company = await (this.prisma as any).company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');

    await (this.prisma as any).company.delete({ where: { id } });
    return { success: true };
  }

  async inviteMember(companyId: string, dto: InviteMemberDto) {
    const company = await (this.prisma as any).company.findUnique({ where: { id: companyId } });
    if (!company) throw new NotFoundException('Company not found');

    return (this.prisma as any).companyMember.create({
      data: { companyId, userId: dto.userId, role: dto.role || 'MEMBER' },
    });
  }

  async removeMember(companyId: string, userId: string) {
    await (this.prisma as any).companyMember.deleteMany({
      where: { companyId, userId },
    });
    return { success: true };
  }

  async getMembers(companyId: string) {
    return (this.prisma as any).companyMember.findMany({
      where: { companyId },
      include: { user: true },
    });
  }
}
