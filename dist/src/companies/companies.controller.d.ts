import { CompaniesService } from './companies.service';
export declare class CompaniesController {
    private service;
    constructor(service: CompaniesService);
    findOne(req: any): Promise<any>;
    dashboard(req: any): Promise<{
        totalRevenue: any;
        monthlyCollection: any;
        dueAmount: any;
        activeProjects: any;
        availableUnits: any;
        totalBookings: any;
        totalLeads: any;
        totalClients: any;
        recentPayments: any;
    }>;
    update(req: any, dto: any): Promise<any>;
}
