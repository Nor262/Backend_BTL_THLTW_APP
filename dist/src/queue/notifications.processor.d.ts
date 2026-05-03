import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MockNotificationsService } from '../notifications/notifications.service';
export declare class NotificationsQueueProcessor extends WorkerHost {
    private readonly notificationsService;
    constructor(notificationsService: MockNotificationsService);
    process(job: Job<any, any, string>): Promise<any>;
}
