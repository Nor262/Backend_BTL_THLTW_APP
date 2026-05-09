import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    exportEquipmentExcel(res: Response): Promise<void>;
}
