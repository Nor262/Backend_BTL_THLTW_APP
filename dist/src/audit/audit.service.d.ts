import { PrismaService } from '../prisma/prisma.service';
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    logAction(userId: number, action: string, targetType: string, targetId?: number, details?: string): Promise<any>;
    getLogs(): Promise<any>;
}
