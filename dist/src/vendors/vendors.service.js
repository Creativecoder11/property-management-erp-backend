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
exports.VendorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let VendorsService = class VendorsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(companyId, query) {
        const { search, type } = query;
        const where = { companyId };
        if (search)
            where.name = { contains: search, mode: 'insensitive' };
        if (type)
            where.type = type;
        return this.prisma.vendor.findMany({ where, orderBy: { name: 'asc' } });
    }
    async findOne(id, companyId) {
        const v = await this.prisma.vendor.findFirst({ where: { id, companyId } });
        if (!v)
            throw new common_1.NotFoundException('Vendor not found');
        return v;
    }
    async create(companyId, dto) { return this.prisma.vendor.create({ data: { ...dto, companyId } }); }
    async update(id, companyId, dto) {
        await this.findOne(id, companyId);
        return this.prisma.vendor.update({ where: { id }, data: dto });
    }
    async createPO(companyId, dto) {
        const count = await this.prisma.purchaseOrder.count({ where: { companyId } });
        const poNo = `PO-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
        const totalAmount = dto.items.reduce((s, i) => s + i.total, 0);
        return this.prisma.purchaseOrder.create({
            data: { poNo, vendorId: dto.vendorId, companyId, totalAmount, notes: dto.notes, deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : null, items: { create: dto.items } },
            include: { items: true, vendor: true },
        });
    }
    async getPOs(companyId) {
        return this.prisma.purchaseOrder.findMany({ where: { companyId }, orderBy: { createdAt: 'desc' }, include: { vendor: { select: { name: true } }, items: true } });
    }
};
exports.VendorsService = VendorsService;
exports.VendorsService = VendorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VendorsService);
//# sourceMappingURL=vendors.service.js.map