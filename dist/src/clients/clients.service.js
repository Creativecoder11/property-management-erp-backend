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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let ClientsService = class ClientsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(companyId, query) {
        const { page = 1, limit = 20, search } = query;
        const where = { companyId, deletedAt: null };
        if (search)
            where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { phone: { contains: search } }];
        const [data, total] = await Promise.all([
            this.prisma.client.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { createdAt: 'desc' }, include: { _count: { select: { bookings: true } } } }),
            this.prisma.client.count({ where }),
        ]);
        return { data, total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) };
    }
    async findOne(id, companyId) {
        const client = await this.prisma.client.findFirst({
            where: { id, companyId, deletedAt: null },
            include: { bookings: { include: { unit: true, project: true, installments: true, payments: true } } },
        });
        if (!client)
            throw new common_1.NotFoundException('Client not found');
        return client;
    }
    async create(companyId, dto) { return this.prisma.client.create({ data: { ...dto, companyId } }); }
    async update(id, companyId, dto) {
        await this.findOne(id, companyId);
        return this.prisma.client.update({ where: { id }, data: dto });
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map