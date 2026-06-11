import { PrismaService } from '../common/prisma/prisma.service';
export declare class DocumentsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        type: import(".prisma/client").$Enums.DocumentType;
        projectId: string | null;
        bookingId: string | null;
        url: string;
        size: number | null;
        mimeType: string | null;
        uploadedBy: string;
        version: number;
    }[]>;
    create(companyId: string, userId: string, dto: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        type: import(".prisma/client").$Enums.DocumentType;
        projectId: string | null;
        bookingId: string | null;
        url: string;
        size: number | null;
        mimeType: string | null;
        uploadedBy: string;
        version: number;
    }>;
    remove(id: string, companyId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        type: import(".prisma/client").$Enums.DocumentType;
        projectId: string | null;
        bookingId: string | null;
        url: string;
        size: number | null;
        mimeType: string | null;
        uploadedBy: string;
        version: number;
    }>;
}
