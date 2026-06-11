import { ConstructionService } from './construction.service';
export declare class ConstructionController {
    private service;
    constructor(service: ConstructionService);
    progress(id: string, q: any): Promise<{
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
    createProgress(req: any, dto: any): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        progressPct: number;
        projectId: string;
        date: Date;
        images: string[];
        createdBy: string;
    }>;
    workOrders(req: any, q: any): Promise<({
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
