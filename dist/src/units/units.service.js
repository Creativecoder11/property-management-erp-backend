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
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let UnitsService = class UnitsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(companyId, query) {
        const { projectId, status, type, minPrice, maxPrice, page = 1, limit = 50 } = query;
        const where = { floor: { tower: { project: { companyId } } } };
        if (projectId)
            where.floor.tower.projectId = projectId;
        if (status)
            where.status = status;
        if (type)
            where.type = type;
        if (minPrice)
            where.currentPrice = { gte: Number(minPrice) };
        if (maxPrice)
            where.currentPrice = { ...where.currentPrice, lte: Number(maxPrice) };
        const [data, total] = await Promise.all([
            this.prisma.unit.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { unitNo: 'asc' }, include: { floor: { include: { tower: true } } } }),
            this.prisma.unit.count({ where }),
        ]);
        return { data, total, page: Number(page), limit: Number(limit) };
    }
    async findOne(id) {
        const unit = await this.prisma.unit.findUnique({ where: { id }, include: { floor: { include: { tower: { include: { project: true } } } }, bookings: { where: { status: { not: 'CANCELLED' } }, take: 1 } } });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
        return unit;
    }
    async create(dto) { return this.prisma.unit.create({ data: dto }); }
    async update(id, dto) {
        const unit = await this.prisma.unit.findUnique({ where: { id } });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
        return this.prisma.unit.update({ where: { id }, data: dto });
    }
    async updateStatus(id, status) {
        return this.prisma.unit.update({ where: { id }, data: { status: status } });
    }
    async getAvailabilityMatrix(projectId) {
        const towers = await this.prisma.tower.findMany({
            where: { projectId },
            include: { floors: { orderBy: { floorNo: 'desc' }, include: { units: { orderBy: { unitNo: 'asc' } } } } },
            orderBy: { name: 'asc' },
        });
        return towers;
    }
};
exports.UnitsService = UnitsService;
exports.UnitsService = UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnitsService);
//# sourceMappingURL=units.service.js.map