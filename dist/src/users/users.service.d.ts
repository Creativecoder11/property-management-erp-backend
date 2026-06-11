import { PrismaService } from '../common/prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string): Promise<any>;
    findOne(id: string, companyId: string): Promise<any>;
    create(companyId: string, dto: any): Promise<any>;
    update(id: string, companyId: string, dto: any): Promise<any>;
    deactivate(id: string, companyId: string): Promise<any>;
}
