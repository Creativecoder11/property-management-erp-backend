import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string) {
    return this.prisma.account.findMany({ where: { companyId, isActive: true }, orderBy: { code: 'asc' } });
  }

  async create(companyId: string, dto: any) {
    return this.prisma.account.create({ data: { ...dto, companyId } });
  }

  async createJournalEntry(companyId: string, dto: any) {
    const count = await this.prisma.journal.count({ where: { companyId } });
    const entryNo = `JE-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
    const totalDebit = dto.lines.reduce((s: number, l: any) => s + (l.debit || 0), 0);
    const totalCredit = dto.lines.reduce((s: number, l: any) => s + (l.credit || 0), 0);

    return this.prisma.journal.create({
      data: {
        companyId, entryNo,
        date: new Date(dto.date),
        description: dto.description,
        totalDebit, totalCredit,
        status: dto.post ? 'POSTED' : 'DRAFT',
        lines: { create: dto.lines },
      },
      include: { lines: { include: { account: true } } },
    });
  }

  async getJournals(companyId: string, query: any) {
    const { page = 1, limit = 20, status } = query;
    const where: any = { companyId };
    if (status) where.status = status;
    const [data, total] = await Promise.all([
      this.prisma.journal.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { date: 'desc' }, include: { lines: { include: { account: true } } } }),
      this.prisma.journal.count({ where }),
    ]);
    return { data, total };
  }

  async getFinancialSummary(companyId: string) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const [totalRevenue, totalExpenses, collections] = await Promise.all([
      this.prisma.booking.aggregate({ where: { companyId, status: 'ACTIVE' }, _sum: { finalPrice: true } }),
      this.prisma.expense.aggregate({ where: { companyId, status: 'PAID' }, _sum: { amount: true } }),
      this.prisma.payment.aggregate({ where: { booking: { companyId }, receivedAt: { gte: startOfMonth } }, _sum: { amount: true } }),
    ]);
    return {
      totalRevenue: totalRevenue._sum.finalPrice || 0,
      totalExpenses: totalExpenses._sum.amount || 0,
      monthlyCollection: collections._sum.amount || 0,
      netProfit: (totalRevenue._sum.finalPrice || 0) - (totalExpenses._sum.amount || 0),
    };
  }
}
