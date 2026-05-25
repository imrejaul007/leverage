import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  preferences?: any;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await (this.prisma as any).user.findUnique({
      where: { id: userId },
      include: { company: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await (this.prisma as any).user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return (this.prisma as any).user.update({
      where: { id: userId },
      data: dto,
    });
  }

  async deleteAccount(userId: string) {
    const user = await (this.prisma as any).user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    await (this.prisma as any).user.update({
      where: { id: userId },
      data: { status: 'DELETED' },
    });
    return { success: true };
  }

  async findByEmail(email: string) {
    return (this.prisma as any).user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return (this.prisma as any).user.findUnique({ where: { id } });
  }
}
