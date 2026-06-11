import { AccountsService } from './accounts.service';
export declare class AccountsController {
    private service;
    constructor(service: AccountsService);
    findAll(req: any): Promise<any>;
    summary(req: any): Promise<{
        totalRevenue: any;
        totalExpenses: any;
        monthlyCollection: any;
        netProfit: number;
    }>;
    journals(req: any, q: any): Promise<{
        data: any;
        total: any;
    }>;
    create(req: any, dto: any): Promise<any>;
    createJournal(req: any, dto: any): Promise<any>;
}
