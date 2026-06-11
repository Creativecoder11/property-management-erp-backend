import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string, query: any) {
    const { projectId, status, type, minPrice, maxPrice, page = 1, limit = 50 } = query;
    const where: any = { floor: { tower: { project: { companyId } } } };
    if (projectId) where.floor.tower.projectId = projectId;
    if (status) where.status = status;
    if (type) where.type = type;
    if (minPrice) where.currentPrice = { gte: Number(minPrice) };
    if (maxPrice) where.currentPrice = { ...where.currentPrice, lte: Number(maxPrice) };

    const [data, total] = await Promise.all([
      this.prisma.unit.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { unitNo: 'asc' }, include: { floor: { include: { tower: true } } } }),
      this.prisma.unit.count({ where }),
    ]);
    return { data, total, page: Number(page), limit: Number(limit) };
  }

  async findOne(id: string) {
    const unit = await this.prisma.unit.findUnique({ where: { id }, include: { floor: { include: { tower: { include: { project: true } } } }, bookings: { where: { status: { not: 'CANCELLED' } }, take: 1 } } });
    if (!unit) throw new NotFoundException('Unit not found');
    return unit;
  }

  async create(dto: any) { return this.prisma.unit.create({ data: dto }); }

  async update(id: string, dto: any) {
    const unit = await this.prisma.unit.findUnique({ where: { id } });
    if (!unit) throw new NotFoundException('Unit not found');
    return this.prisma.unit.update({ where: { id }, data: dto });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.unit.update({ where: { id }, data: { status: status as any } });
  }

  async getAvailabilityMatrix(projectId: string) {
    const towers = await this.prisma.tower.findMany({
      where: { projectId },
      include: { floors: { orderBy: { floorNo: 'desc' }, include: { units: { orderBy: { unitNo: 'asc' } } } } },
      orderBy: { name: 'asc' },
    });
    return towers;
  }
}
