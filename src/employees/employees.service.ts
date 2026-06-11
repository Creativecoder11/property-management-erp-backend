import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async findAll(companyId: string, query: any) {
    const { page = 1, limit = 20, search, status, department } = query;
    const where: any = { companyId };
    if (search) where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { empId: { contains: search } }];
    if (status) where.status = status;
    if (department) where.department = department;
    const [data, total] = await Promise.all([
      this.prisma.employee.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { name: 'asc' } }),
      this.prisma.employee.count({ where }),
    ]);
    return { data, total, page: Number(page) };
  }

  async findOne(id: string, companyId: string) {
    const emp = await this.prisma.employee.findFirst({ where: { id, companyId }, include: { attendances: { take: 30, orderBy: { date: 'desc' } }, payrolls: { take: 6, orderBy: { year: 'desc' } } } });
    if (!emp) throw new NotFoundException('Employee not found');
    return emp;
  }

  async create(companyId: string, dto: any) {
    const count = await this.prisma.employee.count({ where: { companyId } });
    const empId = `EMP-${String(count + 1).padStart(4, '0')}`;
    return this.prisma.employee.create({ data: { ...dto, companyId, empId, joinDate: new Date(dto.joinDate) } });
  }

  async update(id: string, companyId: string, dto: any) {
    const emp = await this.findOne(id, companyId);
    return this.prisma.employee.update({ where: { id: emp.id }, data: dto });
  }

  async markAttendance(companyId: string, dto: any) {
    return this.prisma.attendance.upsert({
      where: { employeeId_date: { employeeId: dto.employeeId, date: new Date(dto.date) } },
      update: { status: dto.status, checkIn: dto.checkIn ? new Date(dto.checkIn) : null, checkOut: dto.checkOut ? new Date(dto.checkOut) : null },
      create: { employeeId: dto.employeeId, date: new Date(dto.date), status: dto.status, checkIn: dto.checkIn ? new Date(dto.checkIn) : null, checkOut: dto.checkOut ? new Date(dto.checkOut) : null },
    });
  }

  async processPayroll(companyId: string, dto: any) {
    const emp = await this.findOne(dto.employeeId, companyId);
    const netSalary = emp.baseSalary + (dto.allowances || 0) + (dto.bonus || 0) + (dto.commission || 0) - (dto.deductions || 0);
    return this.prisma.payroll.upsert({
      where: { employeeId_month_year: { employeeId: dto.employeeId, month: dto.month, year: dto.year } },
      update: { ...dto, netSalary },
      create: { employeeId: dto.employeeId, month: dto.month, year: dto.year, baseSalary: emp.baseSalary, allowances: dto.allowances || 0, deductions: dto.deductions || 0, bonus: dto.bonus || 0, commission: dto.commission || 0, netSalary },
    });
  }
}
