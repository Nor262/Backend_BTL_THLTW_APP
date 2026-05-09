import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async exportEquipmentExcel(res: Response) {
    const equipment = await this.prisma.equipment.findMany({
      include: {
        category: true,
        location: true,
      },
      orderBy: { id: 'asc' },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Equipment List');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Serial Number', key: 'serial', width: 25 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Location', key: 'location', width: 20 },
      { header: 'Condition', key: 'condition', width: 25 },
    ];

    equipment.forEach((item) => {
      worksheet.addRow({
        id: item.id,
        name: item.name,
        category: item.category?.name || 'N/A',
        serial: item.serial_number,
        status: item.status,
        location: item.location?.name || 'N/A',
        condition: item.current_condition || 'N/A',
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'equipment_report.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  }
}
