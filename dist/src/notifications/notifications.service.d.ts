import { PrismaService } from '../common/prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, userId: string, query: any): Promise<{
        data: any;
        total: any;
        unreadCount: any;
    }>;
    markRead(id: string, userId: string): Promise<any>;
    markAllRead(companyId: string, userId: string): Promise<any>;
    create(dto: {
        companyId: string;
        userId?: string;
        title: string;
        message: string;
        type?: any;
        link?: string;
    }): Promise<any>;
}
