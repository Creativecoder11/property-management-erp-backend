import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string) {
    return this.prisma.user.findMany({
      where: { companyId, deletedAt: null },
      select: { id: true, firstName: true, lastName: true, email: true, phone: true, role: true, avatar: true, isActive: true, lastLoginAt: true, createdAt: true },
      orderBy: { firstName: 'asc' },
    });
  }

  async findOne(id: string, companyId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, companyId },
      select: { id: true, firstName: true, lastName: true, email: true, phone: true, role: true, avatar: true, isActive: true, lastLoginAt: true, createdAt: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(companyId: string, dto: any) {
    const hashed = await bcrypt.hash(dto.password || 'Password@123', 12);
    return this.prisma.user.create({
      data: { companyId, email: dto.email, password: hashed, firstName: dto.firstName, lastName: dto.lastName, phone: dto.phone, role: dto.role || 'STAFF', isVerified: true },
      select: { id: true, firstName: true, lastName: true, email: true, role: true, isActive: true },
    });
  }

  async update(id: string, companyId: string, dto: any) {
    await this.findOne(id, companyId);
    const data: any = { ...dto };
    if (dto.password) data.password = await bcrypt.hash(dto.password, 12);
    return this.prisma.user.update({ where: { id }, data, select: { id: true, firstName: true, lastName: true, email: true, role: true } });
  }

  async deactivate(id: string, companyId: string) {
    await this.findOne(id, companyId);
    return this.prisma.user.update({ where: { id }, data: { isActive: false } });
  }
}
