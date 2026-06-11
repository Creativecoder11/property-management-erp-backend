import { PrismaService } from '../common/prisma/prisma.service';
export declare class HrService {
    private prisma;
    constructor(prisma: PrismaService);
    getLeaveRequests(companyId: string, query: any): Promise<({
        employee: {
            name: string;
            empId: string;
            department: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.LeaveType;
        status: import(".prisma/client").$Enums.LeaveStatus;
        startDate: Date;
        approvedBy: string | null;
        endDate: Date;
        days: number;
        employeeId: string;
        reason: string | null;
    })[]>;
    createLeaveRequest(companyId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.LeaveType;
        status: import(".prisma/client").$Enums.LeaveStatus;
        startDate: Date;
        approvedBy: string | null;
        endDate: Date;
        days: number;
        employeeId: string;
        reason: string | null;
    }>;
    updateLeaveStatus(id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.LeaveType;
        status: import(".prisma/client").$Enums.LeaveStatus;
        startDate: Date;
        approvedBy: string | null;
        endDate: Date;
        days: number;
        employeeId: string;
        reason: string | null;
    }>;
    getHrStats(companyId: string): Promise<{
        totalEmployees: number;
        activeEmployees: number;
        presentToday: number;
        pendingLeaves: number;
    }>;
}
