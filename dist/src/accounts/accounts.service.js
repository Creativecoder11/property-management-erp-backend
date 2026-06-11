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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let AccountsService = class AccountsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(companyId) {
        return this.prisma.account.findMany({ where: { companyId, isActive: true }, orderBy: { code: 'asc' } });
    }
    async create(companyId, dto) {
        return this.prisma.account.create({ data: { ...dto, companyId } });
    }
    async createJournalEntry(companyId, dto) {
        const count = await this.prisma.journal.count({ where: { companyId } });
        const entryNo = `JE-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
        const totalDebit = dto.lines.reduce((s, l) => s + (l.debit || 0), 0);
        const totalCredit = dto.lines.reduce((s, l) => s + (l.credit || 0), 0);
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
    async getJournals(companyId, query) {
        const { page = 1, limit = 20, status } = query;
        const where = { companyId };
        if (status)
            where.status = status;
        const [data, total] = await Promise.all([
            this.prisma.journal.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { date: 'desc' }, include: { lines: { include: { account: true } } } }),
            this.prisma.journal.count({ where }),
        ]);
        return { data, total };
    }
    async getFinancialSummary(companyId) {
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
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map