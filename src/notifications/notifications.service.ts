import { Injectable, Logger } from '@nestjs/common';

export interface INotificationService {
  sendPushNotification(token: string, title: string, body: string): Promise<void>;
  sendEmail(email: string, subject: string, body: string): Promise<void>;
}

@Injectable()
export class MockNotificationsService implements INotificationService {
  private readonly logger = new Logger(MockNotificationsService.name);

  async sendPushNotification(token: string, title: string, body: string): Promise<void> {
    this.logger.log(`[MOCK PUSH] to ${token}: ${title} - ${body}`);
  }

  async sendEmail(email: string, subject: string, body: string): Promise<void> {
    this.logger.log(`[MOCK EMAIL] to ${email}: ${subject} - ${body}`);
  }
}
