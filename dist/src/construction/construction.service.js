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
exports.ConstructionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let ConstructionService = class ConstructionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProgressReport(dto) {
        const report = await this.prisma.progressReport.create({
            data: { projectId: dto.projectId, progressPct: dto.progressPct, description: dto.description, images: dto.images || [], createdBy: dto.userId },
        });
        await this.prisma.project.update({ where: { id: dto.projectId }, data: { progressPct: dto.progressPct } });
        return report;
    }
    async getProgressReports(projectId, query) {
        const { page = 1, limit = 20 } = query;
        const [data, total] = await Promise.all([
            this.prisma.progressReport.findMany({ where: { projectId }, skip: (page - 1) * limit, take: Number(limit), orderBy: { date: 'desc' } }),
            this.prisma.progressReport.count({ where: { projectId } }),
        ]);
        return { data, total };
    }
    async getWorkOrders(companyId, query) {
        const { projectId, status } = query;
        const where = { project: { companyId } };
        if (projectId)
            where.projectId = projectId;
        if (status)
            where.status = status;
        return this.prisma.workOrder.findMany({ where, orderBy: { createdAt: 'desc' }, include: { contractor: { select: { name: true } }, project: { select: { name: true } } } });
    }
    async createWorkOrder(dto) {
        return this.prisma.workOrder.create({ data: { projectId: dto.projectId, contractorId: dto.contractorId, title: dto.title, description: dto.description, startDate: dto.startDate ? new Date(dto.startDate) : null, endDate: dto.endDate ? new Date(dto.endDate) : null, amount: dto.amount } });
    }
    async updateWorkOrder(id, dto) {
        return this.prisma.workOrder.update({ where: { id }, data: dto });
    }
};
exports.ConstructionService = ConstructionService;
exports.ConstructionService = ConstructionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConstructionService);
//# sourceMappingURL=construction.service.js.map