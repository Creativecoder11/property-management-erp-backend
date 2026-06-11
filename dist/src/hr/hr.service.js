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
exports.HrService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let HrService = class HrService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLeaveRequests(companyId, query) {
        const { status, employeeId } = query;
        const where = { employee: { companyId } };
        if (status)
            where.status = status;
        if (employeeId)
            where.employeeId = employeeId;
        return this.prisma.leaveRequest.findMany({ where, orderBy: { createdAt: 'desc' }, include: { employee: { select: { name: true, empId: true, department: true } } } });
    }
    async createLeaveRequest(companyId, dto) {
        const days = Math.ceil((new Date(dto.endDate).getTime() - new Date(dto.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
        return this.prisma.leaveRequest.create({
            data: { employeeId: dto.employeeId, type: dto.type, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate), days, reason: dto.reason },
        });
    }
    async updateLeaveStatus(id, dto) {
        return this.prisma.leaveRequest.update({ where: { id }, data: { status: dto.status, approvedBy: dto.approvedBy } });
    }
    async getHrStats(companyId) {
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
};
exports.HrService = HrService;
exports.HrService = HrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HrService);
//# sourceMappingURL=hr.service.js.map