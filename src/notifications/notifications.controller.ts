import { Controller, Get, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getMyNotifications(@Request() req: any) {
    const userId = req.user.id;
    const notifications = await this.notificationsService.getUserNotifications(userId);
    return {
      status: 'success',
      data: notifications,
    };
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    await this.notificationsService.markAsRead(+id);
    return {
      status: 'success',
      message: 'Notification marked as read',
    };
  }
}
