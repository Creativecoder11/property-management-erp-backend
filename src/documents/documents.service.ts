import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string, query: any) {
    const { type, projectId, bookingId } = query;
    const where: any = { companyId };
    if (type) where.type = type;
    if (projectId) where.projectId = projectId;
    if (bookingId) where.bookingId = bookingId;
    return this.prisma.document.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async create(companyId: string, userId: string, dto: any) {
    return this.prisma.document.create({
      data: { companyId, name: dto.name, type: dto.type || 'OTHER', url: dto.url, size: dto.size, mimeType: dto.mimeType, projectId: dto.projectId, bookingId: dto.bookingId, uploadedBy: userId },
    });
  }

  async remove(id: string, companyId: string) {
    return this.prisma.document.delete({ where: { id } });
  }
}
