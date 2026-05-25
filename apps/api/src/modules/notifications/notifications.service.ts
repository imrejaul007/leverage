import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
  ) {}

  async getAll(userId: string, filters: any = {}) {
    const [notifications, total] = await this.notificationRepo.findAndCount({
      where: { userId } as any,
      order: { createdAt: 'DESC' },
      take: filters.limit || 20,
    });
    return { notifications, total };
  }

  async getUnreadCount(userId: string) {
    const count = await this.notificationRepo.count({
      where: { userId, isRead: false } as any,
    });
    return { count };
  }

  async markAsRead(id: string) {
    await this.notificationRepo.update(id as any, { isRead: true, readAt: new Date() });
    return { success: true };
  }

  async markAllAsRead(userId: string) {
    await this.notificationRepo.update({ userId } as any, { isRead: true, readAt: new Date() });
    return { success: true };
  }

  async create(userId: string, type: string, title: string, message: string, data?: any) {
    const notification = this.notificationRepo.create({
      userId,
      type: type as any,
      title,
      message,
      data: data as any,
    });
    return this.notificationRepo.save(notification);
  }
}
