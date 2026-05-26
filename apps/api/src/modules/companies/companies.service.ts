import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

interface PrismaDelegate {
  company: {
    create: (args: { data: unknown }) => Promise<unknown>;
    findMany: (args: { where?: unknown; include?: unknown }) => Promise<unknown[]>;
    findUnique: (args: { where: unknown; include?: unknown }) => Promise<unknown>;
    update: (args: { where: { id: string }; data: unknown }) => Promise<unknown>;
    delete: (args: { where: { id: string } }) => Promise<unknown>;
  };
  companyMember: {
    create: (args: { data: unknown; include?: unknown }) => Promise<unknown>;
    findFirst: (args: { where: unknown }) => Promise<unknown>;
    findMany: (args: { where: unknown; include?: unknown }) => Promise<unknown[]>;
    deleteMany: (args: { where: unknown }) => Promise<unknown>;
  };
  user: {
    findUnique: (args: { where: { id: string } }) => Promise<unknown>;
  };
}

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

interface CompanyMember {
  id: string;
  companyId: string;
  userId: string;
  role: string;
  user?: { id: string; email: string; firstName?: string; lastName?: string };
}

interface Company {
  id: string;
  name: string;
  ownerId: string;
  owner?: { id: string; email: string; firstName?: string; lastName?: string };
  members?: CompanyMember[];
}

@Injectable()
export class CompaniesService {
  private get prismaDelegate(): PrismaDelegate {
    return this.prisma as unknown as PrismaDelegate;
  }

  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateCompanyDto) {
    return this.prismaDelegate.company.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  async findAll(filters: CompanyFilters) {
    return this.prismaDelegate.company.findMany({
      where: filters,
      include: { _count: { select: { products: true, members: true } } },
    });
  }

  async findOne(id: string) {
    const company = await this.prismaDelegate.company.findUnique({
      where: { id },
      include: { owner: true, members: true },
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async findOneWithAccessCheck(id: string, userId: string): Promise<Company> {
    const company = await this.findOne(id) as Company;

    const isOwner = company.ownerId === userId;
    const isMember = company.members?.some((m: CompanyMember) => m.userId === userId);

    if (!isOwner && !isMember) {
      throw new ForbiddenException('You do not have access to this company');
    }

    return company;
  }

  async update(id: string, dto: UpdateCompanyDto, userId: string) {
    const company = await this.findOneWithAccessCheck(id, userId);

    const isOwner = company.ownerId === userId;
    const isAdminMember = company.members?.some((m: CompanyMember) => m.userId === userId && m.role === 'ADMIN');

    if (!isOwner && !isAdminMember) {
      throw new ForbiddenException('Only owners and admins can update company details');
    }

    return this.prismaDelegate.company.update({ where: { id }, data: dto });
  }

  async delete(id: string, userId: string) {
    const company = await this.findOne(id) as Company;

    if (company.ownerId !== userId) {
      throw new ForbiddenException('Only the owner can delete a company');
    }

    await this.prismaDelegate.company.delete({ where: { id } });
    return { success: true };
  }

  async inviteMember(companyId: string, dto: InviteMemberDto, userId: string) {
    const company = await this.findOneWithAccessCheck(companyId, userId);

    const isOwner = company.ownerId === userId;
    const isAdminMember = company.members?.some((m: CompanyMember) => m.userId === userId && m.role === 'ADMIN');

    if (!isOwner && !isAdminMember) {
      throw new ForbiddenException('Only owners and admins can invite members');
    }

    const existingMember = await this.prismaDelegate.companyMember.findFirst({
      where: { companyId, userId: dto.userId },
    });

    if (existingMember) {
      throw new ForbiddenException('User is already a member of this company');
    }

    const user = await this.prismaDelegate.user.findUnique({ where: { id: dto.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prismaDelegate.companyMember.create({
      data: { companyId, userId: dto.userId, role: dto.role || 'MEMBER' },
      include: { user: true },
    });
  }

  async removeMember(companyId: string, targetUserId: string, userId: string) {
    const company = await this.findOneWithAccessCheck(companyId, userId);

    const isOwner = company.ownerId === userId;
    const isAdminMember = company.members?.some((m: CompanyMember) => m.userId === userId && m.role === 'ADMIN');

    if (!isOwner && !isAdminMember) {
      throw new ForbiddenException('Only owners and admins can remove members');
    }

    if (targetUserId === company.ownerId) {
      throw new ForbiddenException('Cannot remove the company owner');
    }

    await this.prismaDelegate.companyMember.deleteMany({
      where: { companyId, userId: targetUserId },
    });
    return { success: true };
  }

  async getMembers(companyId: string, userId: string) {
    await this.findOneWithAccessCheck(companyId, userId);

    return this.prismaDelegate.companyMember.findMany({
      where: { companyId },
      include: { user: true },
    });
  }
}
