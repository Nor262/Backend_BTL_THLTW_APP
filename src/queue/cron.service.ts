import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private prisma: PrismaService,
    @InjectQueue('notifications') private notificationsQueue: Queue,
  ) {}

  // Run at 8:00 AM every day
  @Cron('0 8 * * *')
  async handleOverdueTransactions() {
    this.logger.debug('Running overdue transactions check...');
    
    const overdueTransactions = await this.prisma.transaction.findMany({
      where: {
        status: 'active',
        due_date: { lt: new Date() },
      },
      include: { borrower: true },
    });

    for (const tx of overdueTransactions) {
      await this.prisma.transaction.update({
        where: { id: tx.id },
        data: { status: 'overdue' },
      });

      if (tx.borrower.email) {
        await this.notificationsQueue.add('send-overdue-alert', {
          email: tx.borrower.email,
          equipmentId: tx.equipment_id,
        });
      }
    }
  }
}
