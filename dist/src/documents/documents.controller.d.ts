import { DocumentsService } from './documents.service';
export declare class DocumentsController {
    private service;
    constructor(service: DocumentsService);
    findAll(req: any, q: any): Promise<{
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
    create(req: any, dto: any): Promise<{
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
    remove(id: string, req: any): Promise<{
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
