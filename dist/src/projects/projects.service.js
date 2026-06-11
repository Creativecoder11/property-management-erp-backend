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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(companyId, query) {
        const { page = 1, limit = 20, search, status, type } = query;
        const skip = (page - 1) * limit;
        const where = { companyId, deletedAt: null };
        if (search)
            where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { code: { contains: search, mode: 'insensitive' } }];
        if (status)
            where.status = status;
        if (type)
            where.type = type;
        const [data, total] = await Promise.all([
            this.prisma.project.findMany({
                where, skip, take: Number(limit), orderBy: { createdAt: 'desc' },
                include: { _count: { select: { towers: true, bookings: true } } },
            }),
            this.prisma.project.count({ where }),
        ]);
        return { data, total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) };
    }
    async findOne(id, companyId) {
        const project = await this.prisma.project.findFirst({
            where: { id, companyId, deletedAt: null },
            include: {
                towers: { include: { floors: { include: { units: true } } } },
                _count: { select: { bookings: true, documents: true, progressReports: true } },
            },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    async create(companyId, dto) {
        const data = { ...dto, companyId };
        if (dto.startDate)
            data.startDate = new Date(dto.startDate);
        if (dto.expectedEnd)
            data.expectedEnd = new Date(dto.expectedEnd);
        if (dto.actualEnd)
            data.actualEnd = new Date(dto.actualEnd);
        return this.prisma.project.create({ data });
    }
    async update(id, companyId, dto) {
        const p = await this.prisma.project.findFirst({ where: { id, companyId } });
        if (!p)
            throw new common_1.NotFoundException('Project not found');
        const data = { ...dto };
        if (dto.startDate)
            data.startDate = new Date(dto.startDate);
        if (dto.expectedEnd)
            data.expectedEnd = new Date(dto.expectedEnd);
        if (dto.actualEnd)
            data.actualEnd = new Date(dto.actualEnd);
        return this.prisma.project.update({ where: { id }, data });
    }
    async remove(id, companyId) {
        const p = await this.prisma.project.findFirst({ where: { id, companyId } });
        if (!p)
            throw new common_1.NotFoundException('Project not found');
        return this.prisma.project.update({ where: { id }, data: { deletedAt: new Date() } });
    }
    async getStats(companyId) {
        const [total, byStatus, totalUnits, availableUnits] = await Promise.all([
            this.prisma.project.count({ where: { companyId, deletedAt: null } }),
            this.prisma.project.groupBy({ by: ['status'], where: { companyId, deletedAt: null }, _count: true }),
            this.prisma.unit.count({ where: { floor: { tower: { project: { companyId } } } } }),
            this.prisma.unit.count({ where: { status: 'AVAILABLE', floor: { tower: { project: { companyId } } } } }),
        ]);
        return { total, byStatus, totalUnits, availableUnits, soldUnits: totalUnits - availableUnits };
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map