import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private service;
    constructor(service: BookingsService);
    findAll(req: any, q: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
        pages: number;
    }>;
    stats(req: any): Promise<{
        totalBookings: any;
        totalRevenue: any;
        pendingAmount: any;
        collectedAmount: any;
    }>;
    dueInstallments(req: any): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    create(req: any, dto: any): Promise<any>;
    update(id: string, req: any, dto: any): Promise<any>;
}
