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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let ExpensesService = class ExpensesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(companyId, query) {
        const { page = 1, limit = 20, category, status, projectId, startDate, endDate } = query;
        const where = { companyId, ...(category && { category }), ...(status && { status }), ...(projectId && { projectId }) };
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = new Date(startDate);
            if (endDate)
                where.date.lte = new Date(endDate);
        }
        const [data, total] = await Promise.all([
            this.prisma.expense.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { date: 'desc' }, include: { vendor: { select: { name: true } }, project: { select: { name: true } } } }),
            this.prisma.expense.count({ where }),
        ]);
        return { data, total };
    }
    async create(companyId, dto) {
        return this.prisma.expense.create({ data: { ...dto, companyId, date: new Date(dto.date) } });
    }
    async update(id, companyId, dto) {
        const e = await this.prisma.expense.findFirst({ where: { id, companyId } });
        if (!e)
            throw new common_1.NotFoundException('Expense not found');
        return this.prisma.expense.update({ where: { id }, data: dto });
    }
    async getByCategory(companyId) {
        return this.prisma.expense.groupBy({ by: ['category'], where: { companyId, status: 'PAID' }, _sum: { amount: true }, orderBy: { _sum: { amount: 'desc' } } });
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map