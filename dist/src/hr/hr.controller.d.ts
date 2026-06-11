import { HrService } from './hr.service';
export declare class HrController {
    private service;
    constructor(service: HrService);
    stats(req: any): Promise<{
        totalEmployees: number;
        activeEmployees: number;
        presentToday: number;
        pendingLeaves: number;
    }>;
    leaves(req: any, q: any): Promise<({
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
    createLeave(req: any, dto: any): Promise<{
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
    updateLeave(id: string, dto: any): Promise<{
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
}
