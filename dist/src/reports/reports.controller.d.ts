import { ReportsService } from './reports.service';
import { Response } from 'express';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    exportEquipmentExcel(res: Response): Promise<void>;
}
