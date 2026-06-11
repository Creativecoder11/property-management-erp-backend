import { PrismaService } from '../common/prisma/prisma.service';
export declare class CompaniesService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<any>;
    update(id: string, dto: any): Promise<any>;
    getDashboardStats(companyId: string): Promise<{
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
}
