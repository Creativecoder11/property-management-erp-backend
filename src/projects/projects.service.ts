import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string, query: any) {
    const { page = 1, limit = 20, search, status, type } = query;
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { code: { contains: search, mode: 'insensitive' } }];
    if (status) where.status = status;
    if (type) where.type = type;

    const [data, total] = await Promise.all([
      this.prisma.project.findMany({
        where, skip, take: Number(limit), orderBy: { createdAt: 'desc' },
        include: { _count: { select: { towers: true, bookings: true } } },
      }),
      this.prisma.project.count({ where }),
    ]);
    return { data, total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) };
  }

  async findOne(id: string, companyId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, companyId, deletedAt: null },
      include: {
        towers: { include: { floors: { include: { units: true } } } },
        _count: { select: { bookings: true, documents: true, progressReports: true } },
      },
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(companyId: string, dto: any) {
    const data = { ...dto, companyId };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.expectedEnd) data.expectedEnd = new Date(dto.expectedEnd);
    if (dto.actualEnd) data.actualEnd = new Date(dto.actualEnd);
    return this.prisma.project.create({ data });
  }

  async update(id: string, companyId: string, dto: any) {
    const p = await this.prisma.project.findFirst({ where: { id, companyId } });
    if (!p) throw new NotFoundException('Project not found');
    const data = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.expectedEnd) data.expectedEnd = new Date(dto.expectedEnd);
    if (dto.actualEnd) data.actualEnd = new Date(dto.actualEnd);
    return this.prisma.project.update({ where: { id }, data });
  }

  async remove(id: string, companyId: string) {
    const p = await this.prisma.project.findFirst({ where: { id, companyId } });
    if (!p) throw new NotFoundException('Project not found');
    return this.prisma.project.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async getStats(companyId: string) {
    const [total, byStatus, totalUnits, availableUnits] = await Promise.all([
      this.prisma.project.count({ where: { companyId, deletedAt: null } }),
      this.prisma.project.groupBy({ by: ['status'], where: { companyId, deletedAt: null }, _count: true }),
      this.prisma.unit.count({ where: { floor: { tower: { project: { companyId } } } } }),
      this.prisma.unit.count({ where: { status: 'AVAILABLE', floor: { tower: { project: { companyId } } } } }),
    ]);
    return { total, byStatus, totalUnits, availableUnits, soldUnits: totalUnits - availableUnits };
  }
}
