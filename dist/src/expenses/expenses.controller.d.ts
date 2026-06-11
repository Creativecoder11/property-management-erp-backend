import { ExpensesService } from './expenses.service';
export declare class ExpensesController {
    private service;
    constructor(service: ExpensesService);
    findAll(req: any, q: any): Promise<{
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
    byCategory(req: any): Promise<(import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ExpenseGroupByOutputType, "category"[]> & {
        _sum: {
            amount: number | null;
        };
    })[]>;
    create(req: any, dto: any): Promise<{
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
    update(id: string, req: any, dto: any): Promise<{
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
}
