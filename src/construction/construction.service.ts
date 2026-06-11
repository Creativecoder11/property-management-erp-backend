import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class ConstructionService {
  constructor(private prisma: PrismaService) {}

  async createProgressReport(dto: any) {
    const report = await this.prisma.progressReport.create({
      data: { projectId: dto.projectId, progressPct: dto.progressPct, description: dto.description, images: dto.images || [], createdBy: dto.userId },
    });
    await this.prisma.project.update({ where: { id: dto.projectId }, data: { progressPct: dto.progressPct } });
    return report;
  }

  async getProgressReports(projectId: string, query: any) {
    const { page = 1, limit = 20 } = query;
    const [data, total] = await Promise.all([
      this.prisma.progressReport.findMany({ where: { projectId }, skip: (page - 1) * limit, take: Number(limit), orderBy: { date: 'desc' } }),
      this.prisma.progressReport.count({ where: { projectId } }),
    ]);
    return { data, total };
  }

  async getWorkOrders(companyId: string, query: any) {
    const { projectId, status } = query;
    const where: any = { project: { companyId } };
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    return this.prisma.workOrder.findMany({ where, orderBy: { createdAt: 'desc' }, include: { contractor: { select: { name: true } }, project: { select: { name: true } } } });
  }

  async createWorkOrder(dto: any) {
    return this.prisma.workOrder.create({ data: { projectId: dto.projectId, contractorId: dto.contractorId, title: dto.title, description: dto.description, startDate: dto.startDate ? new Date(dto.startDate) : null, endDate: dto.endDate ? new Date(dto.endDate) : null, amount: dto.amount } });
  }

  async updateWorkOrder(id: string, dto: any) {
    return this.prisma.workOrder.update({ where: { id }, data: dto });
  }
}
