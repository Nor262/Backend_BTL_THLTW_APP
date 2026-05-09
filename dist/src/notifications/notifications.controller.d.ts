import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getMyNotifications(req: any): Promise<{
        status: string;
        data: any[];
    }>;
    markAsRead(id: string): Promise<{
        status: string;
        message: string;
    }>;
}
