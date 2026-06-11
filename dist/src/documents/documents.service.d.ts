import { PrismaService } from '../common/prisma/prisma.service';
export declare class DocumentsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<any>;
    create(companyId: string, userId: string, dto: any): Promise<any>;
    remove(id: string, companyId: string): Promise<any>;
}
