import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class HrService {
  constructor(private prisma: PrismaService) {}

  async getLeaveRequests(companyId: string, query: any) {
    const { status, employeeId } = query;
    const where: any = { employee: { companyId } };
    if (status) where.status = status;
    if (employeeId) where.employeeId = employeeId;
    return this.prisma.leaveRequest.findMany({ where, orderBy: { createdAt: 'desc' }, include: { employee: { select: { name: true, empId: true, department: true } } } });
  }

  async createLeaveRequest(companyId: string, dto: any) {
    const days = Math.ceil((new Date(dto.endDate).getTime() - new Date(dto.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return this.prisma.leaveRequest.create({
      data: { employeeId: dto.employeeId, type: dto.type, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate), days, reason: dto.reason },
    });
  }

  async updateLeaveStatus(id: string, dto: any) {
    return this.prisma.leaveRequest.update({ where: { id }, data: { status: dto.status, approvedBy: dto.approvedBy } });
  }

  async getHrStats(companyId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [totalEmployees, activeEmployees, presentToday, pendingLeaves] = await Promise.all([
      this.prisma.employee.count({ where: { companyId } }),
      this.prisma.employee.count({ where: { companyId, status: 'ACTIVE' } }),
      this.prisma.attendance.count({ where: { date: today, status: 'PRESENT', employee: { companyId } } }),
      this.prisma.leaveRequest.count({ where: { status: 'PENDING', employee: { companyId } } }),
    ]);
    return { totalEmployees, activeEmployees, presentToday, pendingLeaves };
  }
}
