import { PaymentsService } from './payments.service';
export declare class PaymentsController {
    private service;
    constructor(service: PaymentsService);
    findAll(req: any, q: any): Promise<{
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
    monthly(req: any): Promise<{
        month: string;
        amount: number;
    }[]>;
    create(req: any, dto: any): Promise<{
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
}
