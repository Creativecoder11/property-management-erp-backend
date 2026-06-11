import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private service;
    constructor(service: NotificationsService);
    findAll(req: any, q: any): Promise<{
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
    markRead(id: string, req: any): Promise<{
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
    markAllRead(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
