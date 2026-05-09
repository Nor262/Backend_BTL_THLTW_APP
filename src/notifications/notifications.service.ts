import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface INotificationService {
  sendPushNotification(token: string, title: string, body: string): Promise<void>;
  sendEmail(email: string, subject: string, body: string): Promise<void>;
  createNotification(userId: number, title: string, message: string, type: string): Promise<void>;
  getUserNotifications(userId: number): Promise<any[]>;
  markAsRead(notificationId: number): Promise<void>;
}

@Injectable()
export class NotificationsService implements INotificationService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {}

  async createNotification(userId: number, title: string, message: string, type: string): Promise<void> {
    await this.prisma.notification.create({
      data: {
        user_id: userId,
        title,
        message,
        type,
      },
    });
    
    // Also try to send push notification if user has token
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user?.fcm_token) {
      await this.sendPushNotification(user.fcm_token, title, message);
    }
  }

  async getUserNotifications(userId: number): Promise<any[]> {
    return this.prisma.notification.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
      take: 50,
    });
  }

  async markAsRead(notificationId: number): Promise<void> {
    await this.prisma.notification.update({
      where: { id: notificationId },
      data: { is_read: true },
    });
  }

  async sendPushNotification(token: string, title: string, body: string): Promise<void> {
    this.logger.log(`[MOCK PUSH] to ${token}: ${title} - ${body}`);
  }

  async sendEmail(email: string, subject: string, body: string): Promise<void> {
    this.logger.log(`[MOCK EMAIL] to ${email}: ${subject} - ${body}`);
  }
}
