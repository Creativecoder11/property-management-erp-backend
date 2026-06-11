import { PrismaService } from '../common/prisma/prisma.service';
export declare class VendorsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, query: any): Promise<any>;
    findOne(id: string, companyId: string): Promise<any>;
    create(companyId: string, dto: any): Promise<any>;
    update(id: string, companyId: string, dto: any): Promise<any>;
    createPO(companyId: string, dto: any): Promise<any>;
    getPOs(companyId: string): Promise<any>;
}
