import { PrismaService } from '../common/prisma/prisma.service';
export declare class CompaniesService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(id: string): Promise<{
        id: string;
        slug: string;
        name: string;
        email: string;
        phone: string | null;
        logo: string | null;
        address: string | null;
        website: string | null;
        taxId: string | null;
        currency: string;
        timezone: string;
        isActive: boolean;
        trialEndsAt: Date | null;
        subscriptionId: string | null;
        plan: import(".prisma/client").$Enums.Plan;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    update(id: string, dto: any): Promise<{
        id: string;
        slug: string;
        name: string;
        email: string;
        phone: string | null;
        logo: string | null;
        address: string | null;
        website: string | null;
        taxId: string | null;
        currency: string;
        timezone: string;
        isActive: boolean;
        trialEndsAt: Date | null;
        subscriptionId: string | null;
        plan: import(".prisma/client").$Enums.Plan;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    getDashboardStats(companyId: string): Promise<{
        totalRevenue: number;
        monthlyCollection: number;
        dueAmount: number;
        activeProjects: number;
        availableUnits: number;
        totalBookings: number;
        totalLeads: number;
        totalClients: number;
        recentPayments: ({
            booking: {
                client: {
                    name: string;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                companyId: string;
                status: import(".prisma/client").$Enums.BookingStatus;
                projectId: string;
                notes: string | null;
                finalPrice: number;
                bookingNo: string;
                clientId: string;
                unitId: string;
                salePrice: number;
                discount: number;
                bookingDate: Date;
                handoverDate: Date | null;
                agreementUrl: string | null;
                commissionPct: number;
                commissionAmt: number;
            };
        } & {
            id: string;
            createdAt: Date;
            notes: string | null;
            amount: number;
            receiptNo: string;
            bookingId: string;
            installmentId: string | null;
            method: import(".prisma/client").$Enums.PaymentMethod;
            reference: string | null;
            receivedAt: Date;
        })[];
    }>;
}
