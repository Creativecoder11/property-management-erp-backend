import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  private async generateReceiptNo(companyId: string): Promise<string> {
    const count = await this.prisma.payment.count({ where: { booking: { companyId } } });
    return `RCP-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
  }

  async create(companyId: string, dto: any) {
    const booking = await this.prisma.booking.findFirst({ where: { id: dto.bookingId, companyId } });
    if (!booking) throw new NotFoundException('Booking not found');

    const receiptNo = await this.generateReceiptNo(companyId);
    const payment = await this.prisma.payment.create({
      data: {
        receiptNo,
        bookingId: dto.bookingId,
        installmentId: dto.installmentId,
        amount: dto.amount,
        method: dto.method || 'CASH',
        reference: dto.reference,
        notes: dto.notes,
        receivedAt: dto.receivedAt ? new Date(dto.receivedAt) : new Date(),
      },
    });

    if (dto.installmentId) {
      const inst = await this.prisma.installment.findUnique({ where: { id: dto.installmentId } });
      if (inst) {
        const newPaid = inst.paidAmount + dto.amount;
        const status = newPaid >= inst.amount ? 'PAID' : 'PARTIAL';
        await this.prisma.installment.update({ where: { id: dto.installmentId }, data: { paidAmount: newPaid, status, paidAt: status === 'PAID' ? new Date() : null } });
      }
    }

    return payment;
  }

  async findAll(companyId: string, query: any) {
    const { bookingId, page = 1, limit = 20 } = query;
    const where: any = { booking: { companyId } };
    if (bookingId) where.bookingId = bookingId;
    const [data, total] = await Promise.all([
      this.prisma.payment.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { receivedAt: 'desc' }, include: { booking: { include: { client: { select: { name: true } } } } } }),
      this.prisma.payment.count({ where }),
    ]);
    return { data, total, page: Number(page), limit: Number(limit) };
  }

  async getMonthlyCollection(companyId: string) {
    const months: Array<{ month: string; amount: number }> = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
      const agg = await this.prisma.payment.aggregate({ where: { booking: { companyId }, receivedAt: { gte: start, lte: end } }, _sum: { amount: true } });
      months.push({ month: start.toLocaleString('default', { month: 'short', year: '2-digit' }), amount: agg._sum.amount || 0 });
    }
    return months;
  }
}
