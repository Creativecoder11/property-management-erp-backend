import { PrismaService } from '../common/prisma/prisma.service';
export declare class VendorsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        address: string | null;
        taxId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        type: import(".prisma/client").$Enums.VendorType;
    }[]>;
    findOne(id: string, companyId: string): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        address: string | null;
        taxId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        type: import(".prisma/client").$Enums.VendorType;
    }>;
    create(companyId: string, dto: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        address: string | null;
        taxId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        type: import(".prisma/client").$Enums.VendorType;
    }>;
    update(id: string, companyId: string, dto: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        address: string | null;
        taxId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        type: import(".prisma/client").$Enums.VendorType;
    }>;
    createPO(companyId: string, dto: any): Promise<{
        vendor: {
            id: string;
            name: string;
            email: string | null;
            phone: string | null;
            address: string | null;
            taxId: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            type: import(".prisma/client").$Enums.VendorType;
        };
        items: {
            id: string;
            createdAt: Date;
            unit: string | null;
            total: number;
            itemName: string;
            quantity: number;
            unitPrice: number;
            poId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        status: import(".prisma/client").$Enums.POStatus;
        notes: string | null;
        vendorId: string;
        poNo: string;
        totalAmount: number;
        orderDate: Date;
        deliveryDate: Date | null;
    }>;
    getPOs(companyId: string): Promise<({
        vendor: {
            name: string;
        };
        items: {
            id: string;
            createdAt: Date;
            unit: string | null;
            total: number;
            itemName: string;
            quantity: number;
            unitPrice: number;
            poId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        status: import(".prisma/client").$Enums.POStatus;
        notes: string | null;
        vendorId: string;
        poNo: string;
        totalAmount: number;
        orderDate: Date;
        deliveryDate: Date | null;
    })[]>;
}
