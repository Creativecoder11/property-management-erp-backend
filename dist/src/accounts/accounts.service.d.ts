import { PrismaService } from '../common/prisma/prisma.service';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string): Promise<any>;
    create(companyId: string, dto: any): Promise<any>;
    createJournalEntry(companyId: string, dto: any): Promise<any>;
    getJournals(companyId: string, query: any): Promise<{
        data: any;
        total: any;
    }>;
    getFinancialSummary(companyId: string): Promise<{
        totalRevenue: any;
        totalExpenses: any;
        monthlyCollection: any;
        netProfit: number;
    }>;
}
