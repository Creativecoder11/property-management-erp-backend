import { PrismaService } from '../common/prisma/prisma.service';
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<{
        data: any;
        total: any;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string, companyId: string): Promise<any>;
    create(companyId: string, dto: any): Promise<any>;
    update(id: string, companyId: string, dto: any): Promise<any>;
}
