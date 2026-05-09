import { PrismaService } from '../prisma/prisma.service';
export interface INotificationService {
    sendPushNotification(token: string, title: string, body: string): Promise<void>;
    sendEmail(email: string, subject: string, body: string): Promise<void>;
    createNotification(userId: number, title: string, message: string, type: string): Promise<void>;
    getUserNotifications(userId: number): Promise<any[]>;
    markAsRead(notificationId: number): Promise<void>;
}
export declare class NotificationsService implements INotificationService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createNotification(userId: number, title: string, message: string, type: string): Promise<void>;
    getUserNotifications(userId: number): Promise<any[]>;
    markAsRead(notificationId: number): Promise<void>;
    sendPushNotification(token: string, title: string, body: string): Promise<void>;
    sendEmail(email: string, subject: string, body: string): Promise<void>;
}
