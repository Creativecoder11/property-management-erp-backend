import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string, query: any) {
    const { page = 1, limit = 20, category, status, projectId, startDate, endDate } = query;
    const where: any = { companyId, ...(category && { category }), ...(status && { status }), ...(projectId && { projectId }) };
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }
    const [data, total] = await Promise.all([
      this.prisma.expense.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { date: 'desc' }, include: { vendor: { select: { name: true } }, project: { select: { name: true } } } }),
      this.prisma.expense.count({ where }),
    ]);
    return { data, total };
  }

  async create(companyId: string, dto: any) {
    return this.prisma.expense.create({ data: { ...dto, companyId, date: new Date(dto.date) } });
  }

  async update(id: string, companyId: string, dto: any) {
    const e = await this.prisma.expense.findFirst({ where: { id, companyId } });
    if (!e) throw new NotFoundException('Expense not found');
    return this.prisma.expense.update({ where: { id }, data: dto });
  }

  async getByCategory(companyId: string) {
    return this.prisma.expense.groupBy({ by: ['category'], where: { companyId, status: 'PAID' }, _sum: { amount: true }, orderBy: { _sum: { amount: 'desc' } } });
  }
}
