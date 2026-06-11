import { PrismaService } from '../common/prisma/prisma.service';
export declare class UnitsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<any>;
    create(dto: any): Promise<any>;
    update(id: string, dto: any): Promise<any>;
    updateStatus(id: string, status: string): Promise<any>;
    getAvailabilityMatrix(projectId: string): Promise<any>;
}
