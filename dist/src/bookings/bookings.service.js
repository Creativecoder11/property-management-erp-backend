"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateBookingNo(companyId) {
        const count = await this.prisma.booking.count({ where: { companyId } });
        return `BK-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    }
    async create(companyId, dto) {
        const unit = await this.prisma.unit.findUnique({ where: { id: dto.unitId } });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
        if (unit.status !== 'AVAILABLE')
            throw new common_1.BadRequestException('Unit is not available');
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
                data: dto.installments.map((inst) => ({
                    bookingId: booking.id,
                    dueDate: new Date(inst.dueDate),
                    amount: inst.amount,
                })),
            });
        }
        return this.findOne(booking.id, companyId);
    }
    async findAll(companyId, query) {
        const { page = 1, limit = 20, status, clientId, projectId, search } = query;
        const skip = (page - 1) * limit;
        const where = { companyId, deletedAt: null };
        if (status)
            where.status = status;
        if (clientId)
            where.clientId = clientId;
        if (projectId)
            where.projectId = projectId;
        if (search)
            where.bookingNo = { contains: search, mode: 'insensitive' };
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
    async findOne(id, companyId) {
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
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
        return booking;
    }
    async update(id, companyId, dto) {
        const b = await this.findOne(id, companyId);
        return this.prisma.booking.update({ where: { id: b.id }, data: dto });
    }
    async getDueInstallments(companyId) {
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
    async getStats(companyId) {
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
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map