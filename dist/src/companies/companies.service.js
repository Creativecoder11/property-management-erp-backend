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
exports.CompaniesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let CompaniesService = class CompaniesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(id) {
        const company = await this.prisma.company.findUnique({ where: { id } });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        return company;
    }
    async update(id, dto) {
        return this.prisma.company.update({ where: { id }, data: dto });
    }
    async getDashboardStats(companyId) {
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
};
exports.CompaniesService = CompaniesService;
exports.CompaniesService = CompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CompaniesService);
//# sourceMappingURL=companies.service.js.map