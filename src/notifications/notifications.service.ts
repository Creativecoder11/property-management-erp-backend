import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string, userId: string, query: any) {
    const { unread, page = 1, limit = 20 } = query;
    const where: any = { companyId, OR: [{ userId }, { userId: null }] };
    if (unread === 'true') where.isRead = false;
    const [data, total, unreadCount] = await Promise.all([
      this.prisma.notification.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { createdAt: 'desc' } }),
      this.prisma.notification.count({ where }),
      this.prisma.notification.count({ where: { ...where, isRead: false } }),
    ]);
    return { data, total, unreadCount };
  }

  async markRead(id: string, userId: string) {
    return this.prisma.notification.update({ where: { id }, data: { isRead: true } });
  }

  async markAllRead(companyId: string, userId: string) {
    return this.prisma.notification.updateMany({ where: { companyId, userId, isRead: false }, data: { isRead: true } });
  }

  async create(dto: { companyId: string; userId?: string; title: string; message: string; type?: any; link?: string }) {
    return this.prisma.notification.create({ data: { companyId: dto.companyId, userId: dto.userId, title: dto.title, message: dto.message, type: dto.type || 'INFO', link: dto.link } });
  }
}
