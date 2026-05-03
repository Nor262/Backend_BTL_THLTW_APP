export interface INotificationService {
    sendPushNotification(token: string, title: string, body: string): Promise<void>;
    sendEmail(email: string, subject: string, body: string): Promise<void>;
}
export declare class MockNotificationsService implements INotificationService {
    private readonly logger;
    sendPushNotification(token: string, title: string, body: string): Promise<void>;
    sendEmail(email: string, subject: string, body: string): Promise<void>;
}
