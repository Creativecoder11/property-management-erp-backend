import { PrismaService } from '../common/prisma/prisma.service';
export declare class ConstructionService {
    private prisma;
    constructor(prisma: PrismaService);
    createProgressReport(dto: any): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        progressPct: number;
        projectId: string;
        date: Date;
        images: string[];
        createdBy: string;
    }>;
    getProgressReports(projectId: string, query: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            description: string;
            progressPct: number;
            projectId: string;
            date: Date;
            images: string[];
            createdBy: string;
        }[];
        total: number;
    }>;
    getWorkOrders(companyId: string, query: any): Promise<({
        project: {
            name: string;
        };
        contractor: {
            name: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        startDate: Date | null;
        projectId: string;
        title: string;
        amount: number;
        endDate: Date | null;
        contractorId: string | null;
        completionPct: number;
    })[]>;
    createWorkOrder(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        startDate: Date | null;
        projectId: string;
        title: string;
        amount: number;
        endDate: Date | null;
        contractorId: string | null;
        completionPct: number;
    }>;
    updateWorkOrder(id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        startDate: Date | null;
        projectId: string;
        title: string;
        amount: number;
        endDate: Date | null;
        contractorId: string | null;
        completionPct: number;
    }>;
}
