import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logAction(userId: number, action: string, targetType: string, targetId?: number, details?: string) {
    return this.prisma.auditLog.create({
      data: {
        user_id: userId,
        action,
        target_type: targetType,
        target_id: targetId,
        details,
      },
    });
  }

  async getLogs() {
    return this.prisma.auditLog.findMany({
      orderBy: { created_at: 'desc' },
      include: { user: { select: { id: true, username: true, role: true } } },
    });
  }
}
