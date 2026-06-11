import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private service;
    constructor(service: AccountsService);
    findAll(req: any): Promise<{
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
    summary(req: any): Promise<{
        totalRevenue: number;
        totalExpenses: number;
        monthlyCollection: number;
        netProfit: number;
    }>;
    journals(req: any, q: any): Promise<{
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
    create(req: any, dto: any): Promise<{
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
    createJournal(req: any, dto: any): Promise<{
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
}
