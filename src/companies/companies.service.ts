import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(id: string, dto: any) {
    return this.prisma.company.update({ where: { id }, data: dto });
  }

  async getDashboardStats(companyId: string) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalRevenue, monthlyCollection, dueAmount, activeProjects, availableUnits, totalBookings, totalLeads, totalClients, recentPayments] = await Promise.all([
      this.prisma.booking.aggregate({ where: { companyId, status: 'ACTIVE' }, _sum: { finalPrice: true } }),
      this.prisma.payment.aggregate({ where: { booking: { companyId }, receivedAt: { gte: startOfMonth } }, _sum: { amount: true } }),
      this.prisma.installment.aggregate({ where: { booking: { companyId }, status: { in: ['PENDING', 'OVERDUE'] } }, _sum: { amount: true } }),
      this.prisma.project.count({ where: { companyId, status: 'UNDER_CONSTRUCTION', deletedAt: null } }),
      this.prisma.unit.count({ where: { status: 'AVAILABLE', floor: { tower: { project: { companyId } } } } }),
      this.prisma.booking.count({ where: { companyId, deletedAt: null } }),
      this.prisma.lead.count({ where: { companyId, deletedAt: null } }),
      this.prisma.client.count({ where: { companyId, deletedAt: null } }),
      this.prisma.payment.findMany({
        where: { booking: { companyId } }, take: 5, orderBy: { receivedAt: 'desc' },
        include: { booking: { include: { client: { select: { name: true } } } } },
      }),
    ]);

    return {
      totalRevenue: totalRevenue._sum.finalPrice || 0,
      monthlyCollection: monthlyCollection._sum.amount || 0,
      dueAmount: dueAmount._sum.amount || 0,
      activeProjects,
      availableUnits,
      totalBookings,
      totalLeads,
      totalClients,
      recentPayments,
    };
  }
}
