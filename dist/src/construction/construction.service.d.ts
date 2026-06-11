import { PrismaService } from '../common/prisma/prisma.service';
export declare class ConstructionService {
    private prisma;
    constructor(prisma: PrismaService);
    createProgressReport(dto: any): Promise<any>;
    getProgressReports(projectId: string, query: any): Promise<{
        data: any;
        total: any;
    }>;
    getWorkOrders(companyId: string, query: any): Promise<any>;
    createWorkOrder(dto: any): Promise<any>;
    updateWorkOrder(id: string, dto: any): Promise<any>;
}
