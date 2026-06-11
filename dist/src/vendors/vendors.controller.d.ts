import { VendorsService } from './vendors.service';
export declare class VendorsController {
    private service;
    constructor(service: VendorsService);
    findAll(req: any, q: any): Promise<{
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
    getPOs(req: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
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
    create(req: any, dto: any): Promise<{
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
    createPO(req: any, dto: any): Promise<{
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
    update(id: string, req: any, dto: any): Promise<{
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
}
