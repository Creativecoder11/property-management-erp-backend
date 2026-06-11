import { PrismaService } from '../common/prisma/prisma.service';
export declare class ExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<{
        data: any;
        total: any;
    }>;
    create(companyId: string, dto: any): Promise<any>;
    update(id: string, companyId: string, dto: any): Promise<any>;
    getByCategory(companyId: string): Promise<any>;
}
