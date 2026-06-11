import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  private async generateBookingNo(companyId: string): Promise<string> {
    const count = await this.prisma.booking.count({ where: { companyId } });
    return `BK-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
  }

  async create(companyId: string, dto: any) {
    const unit = await this.prisma.unit.findUnique({ where: { id: dto.unitId } });
    if (!unit) throw new NotFoundException('Unit not found');
    if (unit.status !== 'AVAILABLE') throw new BadRequestException('Unit is not available');

    const bookingNo = await this.generateBookingNo(companyId);
    const finalPrice = dto.salePrice - (dto.discount || 0);

    const booking = await this.prisma.booking.create({
      data: {
        bookingNo,
        companyId,
        clientId: dto.clientId,
        unitId: dto.unitId,
        projectId: dto.projectId,
        salePrice: dto.salePrice,
        discount: dto.discount || 0,
        finalPrice,
        bookingDate: dto.bookingDate ? new Date(dto.bookingDate) : new Date(),
        handoverDate: dto.handoverDate ? new Date(dto.handoverDate) : null,
        commissionPct: dto.commissionPct || 0,
        commissionAmt: dto.commissionAmt || 0,
        notes: dto.notes,
      },
    });

    await this.prisma.unit.update({ where: { id: dto.unitId }, data: { status: 'BOOKED' } });

    if (dto.installments?.length) {
      await this.prisma.installment.createMany({
        data: dto.installments.map((inst: any) => ({
          bookingId: booking.id,
          dueDate: new Date(inst.dueDate),
          amount: inst.amount,
        })),
      });
    }

    return this.findOne(booking.id, companyId);
  }

  async findAll(companyId: string, query: any) {
    const { page = 1, limit = 20, status, clientId, projectId, search } = query;
    const skip = (page - 1) * limit;
    const where: any = { companyId, deletedAt: null };
    if (status) where.status = status;
    if (clientId) where.clientId = clientId;
    if (projectId) where.projectId = projectId;
    if (search) where.bookingNo = { contains: search, mode: 'insensitive' };

    const [data, total] = await Promise.all([
      this.prisma.booking.findMany({
        where, skip, take: Number(limit), orderBy: { createdAt: 'desc' },
        include: {
          client: { select: { name: true, phone: true } },
          unit: { select: { unitNo: true, sizeSqft: true } },
          project: { select: { name: true } },
          _count: { select: { installments: true, payments: true } },
        },
      }),
      this.prisma.booking.count({ where }),
    ]);
    return { data, total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) };
  }

  async findOne(id: string, companyId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, companyId, deletedAt: null },
      include: {
        client: true,
        unit: { include: { floor: { include: { tower: true } } } },
        project: true,
        installments: { orderBy: { dueDate: 'asc' } },
        payments: { orderBy: { receivedAt: 'desc' } },
        documents: true,
      },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async update(id: string, companyId: string, dto: any) {
    const b = await this.findOne(id, companyId);
    return this.prisma.booking.update({ where: { id: b.id }, data: dto });
  }

  async getDueInstallments(companyId: string) {
    return this.prisma.installment.findMany({
      where: {
        status: { in: ['PENDING', 'OVERDUE'] },
        dueDate: { lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        booking: { companyId },
      },
      include: { booking: { include: { client: { select: { name: true, phone: true } } } } },
      orderBy: { dueDate: 'asc' },
    });
  }

  async getStats(companyId: string) {
    const [total, totalRevenue, pendingAmount, bookings] = await Promise.all([
      this.prisma.booking.count({ where: { companyId, deletedAt: null } }),
      this.prisma.booking.aggregate({ where: { companyId, status: 'ACTIVE' }, _sum: { finalPrice: true } }),
      this.prisma.installment.aggregate({ where: { booking: { companyId }, status: { in: ['PENDING', 'OVERDUE'] } }, _sum: { amount: true } }),
      this.prisma.payment.aggregate({ where: { booking: { companyId } }, _sum: { amount: true } }),
    ]);
    return {
      totalBookings: total,
      totalRevenue: totalRevenue._sum.finalPrice || 0,
      pendingAmount: pendingAmount._sum.amount || 0,
      collectedAmount: bookings._sum.amount || 0,
    };
  }
}
