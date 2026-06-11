import { PrismaService } from '../common/prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(companyId: string, userId: string, query: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            companyId: string;
            type: import(".prisma/client").$Enums.NotificationType;
            userId: string | null;
            title: string;
            message: string;
            channel: import(".prisma/client").$Enums.NotificationChannel;
            isRead: boolean;
            link: string | null;
        }[];
        total: number;
        unreadCount: number;
    }>;
    markRead(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        companyId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string | null;
        title: string;
        message: string;
        channel: import(".prisma/client").$Enums.NotificationChannel;
        isRead: boolean;
        link: string | null;
    }>;
    markAllRead(companyId: string, userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    create(dto: {
        companyId: string;
        userId?: string;
        title: string;
        message: string;
        type?: any;
        link?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        companyId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        userId: string | null;
        title: string;
        message: string;
        channel: import(".prisma/client").$Enums.NotificationChannel;
        isRead: boolean;
        link: string | null;
    }>;
}
