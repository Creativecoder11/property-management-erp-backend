import { PrismaService } from '../common/prisma/prisma.service';
export declare class ExpensesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<{
        data: ({
            project: {
                name: string;
            } | null;
            vendor: {
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            description: string;
            status: import(".prisma/client").$Enums.ExpenseStatus;
            projectId: string | null;
            category: import(".prisma/client").$Enums.ExpenseCategory;
            amount: number;
            date: Date;
            receipt: string | null;
            approvedBy: string | null;
            vendorId: string | null;
        })[];
        total: number;
    }>;
    create(companyId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        description: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        projectId: string | null;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        amount: number;
        date: Date;
        receipt: string | null;
        approvedBy: string | null;
        vendorId: string | null;
    }>;
    update(id: string, companyId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        description: string;
        status: import(".prisma/client").$Enums.ExpenseStatus;
        projectId: string | null;
        category: import(".prisma/client").$Enums.ExpenseCategory;
        amount: number;
        date: Date;
        receipt: string | null;
        approvedBy: string | null;
        vendorId: string | null;
    }>;
    getByCategory(companyId: string): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ExpenseGroupByOutputType, "category"[]> & {
        _sum: {
            amount: number | null;
        };
    })[]>;
}
