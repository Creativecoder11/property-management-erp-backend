import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private service;
    constructor(service: PaymentsService);
    findAll(req: any, q: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
    }>;
    monthly(req: any): Promise<{
        month: string;
        amount: number;
    }[]>;
    create(req: any, dto: any): Promise<any>;
}
