import { ExpensesService } from './expenses.service';
export declare class ExpensesController {
    private service;
    constructor(service: ExpensesService);
    findAll(req: any, q: any): Promise<{
        data: any;
        total: any;
    }>;
    byCategory(req: any): Promise<any>;
    create(req: any, dto: any): Promise<any>;
    update(id: string, req: any, dto: any): Promise<any>;
}
