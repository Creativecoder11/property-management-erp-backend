import { ClientsService } from './clients.service';
export declare class ClientsController {
    private service;
    constructor(service: ClientsService);
    findAll(req: any, q: any): Promise<{
        data: ({
            _count: {
                bookings: number;
            };
        } & {
            id: string;
            name: string;
            email: string | null;
            phone: string;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            companyId: string;
            avatar: string | null;
            nid: string | null;
            occupation: string | null;
            leadId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string, req: any): Promise<{
        bookings: ({
            project: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                companyId: string;
                code: string;
                description: string | null;
                type: import(".prisma/client").$Enums.ProjectType;
                status: import(".prisma/client").$Enums.ProjectStatus;
                landArea: number | null;
                totalUnits: number;
                startDate: Date | null;
                expectedEnd: Date | null;
                actualEnd: Date | null;
                budget: number;
                location: string | null;
                latitude: number | null;
                longitude: number | null;
                coverImage: string | null;
                progressPct: number;
            };
            unit: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                type: import(".prisma/client").$Enums.UnitType;
                status: import(".prisma/client").$Enums.UnitStatus;
                unitNo: string;
                sizeSqft: number;
                bedrooms: number;
                bathrooms: number;
                facing: string | null;
                basePrice: number;
                currentPrice: number;
                floorPlanImage: string | null;
                hasParking: boolean;
                parkingNo: string | null;
                floorId: string;
            };
            installments: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.InstallmentStatus;
                notes: string | null;
                amount: number;
                bookingId: string;
                paidAmount: number;
                dueDate: Date;
                paidAt: Date | null;
            }[];
            payments: {
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
            }[];
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
        })[];
    } & {
        id: string;
        name: string;
        email: string | null;
        phone: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        avatar: string | null;
        nid: string | null;
        occupation: string | null;
        leadId: string | null;
    }>;
    create(req: any, dto: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        avatar: string | null;
        nid: string | null;
        occupation: string | null;
        leadId: string | null;
    }>;
    update(id: string, req: any, dto: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        companyId: string;
        avatar: string | null;
        nid: string | null;
        occupation: string | null;
        leadId: string | null;
    }>;
}
