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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async generateReceiptNo(companyId) {
        const count = await this.prisma.payment.count({ where: { booking: { companyId } } });
        return `RCP-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
    }
    async create(companyId, dto) {
        const booking = await this.prisma.booking.findFirst({ where: { id: dto.bookingId, companyId } });
        if (!booking)
            throw new common_1.NotFoundException('Booking not found');
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
    async findAll(companyId, query) {
        const { bookingId, page = 1, limit = 20 } = query;
        const where = { booking: { companyId } };
        if (bookingId)
            where.bookingId = bookingId;
        const [data, total] = await Promise.all([
            this.prisma.payment.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { receivedAt: 'desc' }, include: { booking: { include: { client: { select: { name: true } } } } } }),
            this.prisma.payment.count({ where }),
        ]);
        return { data, total, page: Number(page), limit: Number(limit) };
    }
    async getMonthlyCollection(companyId) {
        const months = [];
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
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map