import { PrismaService } from '../prisma/prisma.service';
import { Queue } from 'bullmq';
export declare class CronService {
    private prisma;
    private notificationsQueue;
    private readonly logger;
    constructor(prisma: PrismaService, notificationsQueue: Queue);
    handleOverdueTransactions(): Promise<void>;
}
