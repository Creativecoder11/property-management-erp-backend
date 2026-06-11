import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private service;
    constructor(service: NotificationsService);
    findAll(req: any, q: any): Promise<{
        data: any;
        total: any;
        unreadCount: any;
    }>;
    markRead(id: string, req: any): Promise<any>;
    markAllRead(req: any): Promise<any>;
}
