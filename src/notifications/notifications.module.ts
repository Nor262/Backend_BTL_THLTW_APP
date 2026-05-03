import { Module } from '@nestjs/common';
import { MockNotificationsService } from './notifications.service';

@Module({
  providers: [MockNotificationsService],
  exports: [MockNotificationsService],
})
export class NotificationsModule {}
