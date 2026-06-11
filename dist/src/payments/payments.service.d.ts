import { PrismaService } from '../common/prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    private generateReceiptNo;
    create(companyId: string, dto: any): Promise<{
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
    }>;
    findAll(companyId: string, query: any): Promise<{
        data: ({
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
        total: number;
        page: number;
        limit: number;
    }>;
    getMonthlyCollection(companyId: string): Promise<{
        month: string;
        amount: number;
    }[]>;
}
