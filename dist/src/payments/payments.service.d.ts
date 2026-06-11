import { PrismaService } from '../common/prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    private generateReceiptNo;
    create(companyId: string, dto: any): Promise<any>;
    findAll(companyId: string, query: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    getMonthlyCollection(companyId: string): Promise<{
        month: string;
        amount: number;
    }[]>;
}
