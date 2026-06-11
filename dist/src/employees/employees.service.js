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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let EmployeesService = class EmployeesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(companyId, query) {
        const { page = 1, limit = 20, search, status, department } = query;
        const where = { companyId };
        if (search)
            where.OR = [{ name: { contains: search, mode: 'insensitive' } }, { empId: { contains: search } }];
        if (status)
            where.status = status;
        if (department)
            where.department = department;
        const [data, total] = await Promise.all([
            this.prisma.employee.findMany({ where, skip: (page - 1) * limit, take: Number(limit), orderBy: { name: 'asc' } }),
            this.prisma.employee.count({ where }),
        ]);
        return { data, total, page: Number(page) };
    }
    async findOne(id, companyId) {
        const emp = await this.prisma.employee.findFirst({ where: { id, companyId }, include: { attendances: { take: 30, orderBy: { date: 'desc' } }, payrolls: { take: 6, orderBy: { year: 'desc' } } } });
        if (!emp)
            throw new common_1.NotFoundException('Employee not found');
        return emp;
    }
    async create(companyId, dto) {
        const count = await this.prisma.employee.count({ where: { companyId } });
        const empId = `EMP-${String(count + 1).padStart(4, '0')}`;
        return this.prisma.employee.create({ data: { ...dto, companyId, empId, joinDate: new Date(dto.joinDate) } });
    }
    async update(id, companyId, dto) {
        const emp = await this.findOne(id, companyId);
        return this.prisma.employee.update({ where: { id: emp.id }, data: dto });
    }
    async markAttendance(companyId, dto) {
        return this.prisma.attendance.upsert({
            where: { employeeId_date: { employeeId: dto.employeeId, date: new Date(dto.date) } },
            update: { status: dto.status, checkIn: dto.checkIn ? new Date(dto.checkIn) : null, checkOut: dto.checkOut ? new Date(dto.checkOut) : null },
            create: { employeeId: dto.employeeId, date: new Date(dto.date), status: dto.status, checkIn: dto.checkIn ? new Date(dto.checkIn) : null, checkOut: dto.checkOut ? new Date(dto.checkOut) : null },
        });
    }
    async processPayroll(companyId, dto) {
        const emp = await this.findOne(dto.employeeId, companyId);
        const netSalary = emp.baseSalary + (dto.allowances || 0) + (dto.bonus || 0) + (dto.commission || 0) - (dto.deductions || 0);
        return this.prisma.payroll.upsert({
            where: { employeeId_month_year: { employeeId: dto.employeeId, month: dto.month, year: dto.year } },
            update: { ...dto, netSalary },
            create: { employeeId: dto.employeeId, month: dto.month, year: dto.year, baseSalary: emp.baseSalary, allowances: dto.allowances || 0, deductions: dto.deductions || 0, bonus: dto.bonus || 0, commission: dto.commission || 0, netSalary },
        });
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map