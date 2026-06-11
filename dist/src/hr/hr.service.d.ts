import { PrismaService } from '../common/prisma/prisma.service';
export declare class HrService {
    private prisma;
    constructor(prisma: PrismaService);
    getLeaveRequests(companyId: string, query: any): Promise<any>;
    createLeaveRequest(companyId: string, dto: any): Promise<any>;
    updateLeaveStatus(id: string, dto: any): Promise<any>;
    getHrStats(companyId: string): Promise<{
        totalEmployees: any;
        activeEmployees: any;
        presentToday: any;
        pendingLeaves: any;
    }>;
}
