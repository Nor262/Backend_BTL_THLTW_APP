import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationsService } from '../notifications/notifications.service';

@Processor('notifications')
export class NotificationsQueueProcessor extends WorkerHost {
  constructor(private readonly notificationsService: NotificationsService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    switch (job.name) {
      case 'send-overdue-alert':
        await this.notificationsService.sendEmail(
          job.data.email,
          'Overdue Equipment Return',
          `Please return equipment ID: ${job.data.equipmentId} immediately.`
        );
        break;
      default:
        console.log(`Unknown job: ${job.name}`);
    }
  }
}
