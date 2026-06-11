import { PrismaService } from '../common/prisma/prisma.service';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        code: string;
        type: import(".prisma/client").$Enums.AccountType;
        balance: number;
        parentId: string | null;
    }[]>;
    create(companyId: string, dto: any): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        code: string;
        type: import(".prisma/client").$Enums.AccountType;
        balance: number;
        parentId: string | null;
    }>;
    createJournalEntry(companyId: string, dto: any): Promise<{
        lines: ({
            account: {
                id: string;
                name: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                companyId: string;
                code: string;
                type: import(".prisma/client").$Enums.AccountType;
                balance: number;
                parentId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            description: string | null;
            debit: number;
            credit: number;
            accountId: string;
            journalId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        description: string;
        status: import(".prisma/client").$Enums.JournalStatus;
        date: Date;
        entryNo: string;
        totalDebit: number;
        totalCredit: number;
    }>;
    getJournals(companyId: string, query: any): Promise<{
        data: ({
            lines: ({
                account: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    companyId: string;
                    code: string;
                    type: import(".prisma/client").$Enums.AccountType;
                    balance: number;
                    parentId: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                description: string | null;
                debit: number;
                credit: number;
                accountId: string;
                journalId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            description: string;
            status: import(".prisma/client").$Enums.JournalStatus;
            date: Date;
            entryNo: string;
            totalDebit: number;
            totalCredit: number;
        })[];
        total: number;
    }>;
    getFinancialSummary(companyId: string): Promise<{
        totalRevenue: number;
        totalExpenses: number;
        monthlyCollection: number;
        netProfit: number;
    }>;
}
