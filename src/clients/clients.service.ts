import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string, query: any) {
    const { page = 1, limit = 20, search } = query;
    const where: any = { companyId, deletedAt: null };
    if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { phone: { contains: search } }];
    const [data, total] = await Promise.all([
      this.prisma.client.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { createdAt: 'desc' }, include: { _count: { select: { bookings: true } } } }),
      this.prisma.client.count({ where }),
    ]);
    return { data, total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) };
  }

  async findOne(id: string, companyId: string) {
    const client = await this.prisma.client.findFirst({
      where: { id, companyId, deletedAt: null },
      include: { bookings: { include: { unit: true, project: true, installments: true, payments: true } } },
    });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async create(companyId: string, dto: any) { return this.prisma.client.create({ data: { ...dto, companyId } }); }
  async update(id: string, companyId: string, dto: any) {
    await this.findOne(id, companyId);
    return this.prisma.client.update({ where: { id }, data: dto });
  }
}
