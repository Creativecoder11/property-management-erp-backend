import { PrismaService } from '../common/prisma/prisma.service';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    private generateBookingNo;
    create(companyId: string, dto: any): Promise<any>;
    findAll(companyId: string, query: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string, companyId: string): Promise<any>;
    update(id: string, companyId: string, dto: any): Promise<any>;
    getDueInstallments(companyId: string): Promise<any>;
    getStats(companyId: string): Promise<{
        totalBookings: any;
        totalRevenue: any;
        pendingAmount: any;
        collectedAmount: any;
    }>;
}
