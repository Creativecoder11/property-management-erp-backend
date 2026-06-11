import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string, query: any) {
    const { search, type } = query;
    const where: any = { companyId };
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (type) where.type = type;
    return this.prisma.vendor.findMany({ where, orderBy: { name: 'asc' } });
  }

  async findOne(id: string, companyId: string) {
    const v = await this.prisma.vendor.findFirst({ where: { id, companyId } });
    if (!v) throw new NotFoundException('Vendor not found');
    return v;
  }

  async create(companyId: string, dto: any) { return this.prisma.vendor.create({ data: { ...dto, companyId } }); }
  async update(id: string, companyId: string, dto: any) {
    await this.findOne(id, companyId);
    return this.prisma.vendor.update({ where: { id }, data: dto });
  }

  async createPO(companyId: string, dto: any) {
    const count = await this.prisma.purchaseOrder.count({ where: { companyId } });
    const poNo = `PO-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;
    const totalAmount = dto.items.reduce((s: number, i: any) => s + i.total, 0);
    return this.prisma.purchaseOrder.create({
      data: { poNo, vendorId: dto.vendorId, companyId, totalAmount, notes: dto.notes, deliveryDate: dto.deliveryDate ? new Date(dto.deliveryDate) : null, items: { create: dto.items } },
      include: { items: true, vendor: true },
    });
  }

  async getPOs(companyId: string) {
    return this.prisma.purchaseOrder.findMany({ where: { companyId }, orderBy: { createdAt: 'desc' }, include: { vendor: { select: { name: true } }, items: true } });
  }
}
