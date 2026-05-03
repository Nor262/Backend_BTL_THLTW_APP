import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalEquipment = await this.prisma.equipment.count();
    const availableEquipment = await this.prisma.equipment.count({ where: { status: 'available' } });
    const inUseEquipment = await this.prisma.equipment.count({ where: { status: 'in_use' } });
    const maintenanceEquipment = await this.prisma.equipment.count({ where: { status: 'maintenance' } });
    const brokenEquipment = await this.prisma.equipment.count({ where: { status: 'broken' } });

    const totalTransactions = await this.prisma.transaction.count();
    const activeTransactions = await this.prisma.transaction.count({ where: { status: 'active' } });
    const overdueTransactions = await this.prisma.transaction.count({ where: { status: 'overdue' } });
    const pendingRequests = await this.prisma.transaction.count({ where: { status: 'pending' } });

    // Top borrowed equipment
    const topBorrowed = await this.prisma.transaction.groupBy({
      by: ['equipment_id'],
      _count: { equipment_id: true },
      orderBy: { _count: { equipment_id: 'desc' } },
      take: 10,
    });

    // Enrich with equipment names
    const topBorrowedWithNames = await Promise.all(
      topBorrowed.map(async (item) => {
        const equipment = await this.prisma.equipment.findUnique({
          where: { id: item.equipment_id },
          select: { id: true, name: true },
        });
        return {
          id: equipment?.id,
          name: equipment?.name,
          borrow_count: item._count.equipment_id,
        };
      })
    );

    // Monthly borrow frequency (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const recentTransactions = await this.prisma.transaction.findMany({
      where: { request_date: { gte: sixMonthsAgo } },
      select: { request_date: true },
    });

    const monthlyFrequency: Record<string, number> = {};
    for (const tx of recentTransactions) {
      const monthKey = tx.request_date.toISOString().slice(0, 7); // "2026-05"
      monthlyFrequency[monthKey] = (monthlyFrequency[monthKey] || 0) + 1;
    }

    const borrowFrequencyByMonth = Object.entries(monthlyFrequency)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return {
      summary: {
        total_equipment: totalEquipment,
        available_count: availableEquipment,
        in_use_count: inUseEquipment,
        maintenance_count: maintenanceEquipment,
        broken_count: brokenEquipment,
      },
      alerts: {
        pending_requests: pendingRequests,
        overdue_transactions: overdueTransactions,
      },
      charts: {
        top_borrowed: topBorrowedWithNames,
        borrow_frequency_by_month: borrowFrequencyByMonth,
      },
    };
  }

  async getOverdueList() {
    return this.prisma.transaction.findMany({
      where: { status: 'overdue' },
      include: {
        equipment: { select: { id: true, name: true, serial_number: true } },
        borrower: { select: { id: true, username: true, email: true, full_name: true } },
      },
      orderBy: { due_date: 'asc' },
    });
  }

  async exportCsv() {
    const transactions = await this.prisma.transaction.findMany({
      include: {
        equipment: { select: { name: true, serial_number: true } },
        borrower: { select: { username: true, email: true, full_name: true } },
        approver: { select: { username: true } },
      },
      orderBy: { request_date: 'desc' },
    });

    // Build CSV
    const headers = [
      'ID', 'Equipment', 'Serial Number', 'Borrower', 'Email',
      'Type', 'Status', 'Request Date', 'Due Date',
      'Check Out', 'Check In', 'Approver', 'Notes',
    ];

    const rows = transactions.map((tx) => [
      tx.id,
      tx.equipment.name,
      tx.equipment.serial_number,
      tx.borrower.full_name || tx.borrower.username,
      tx.borrower.email,
      tx.type,
      tx.status,
      tx.request_date.toISOString(),
      tx.due_date.toISOString(),
      tx.actual_check_out?.toISOString() || '',
      tx.actual_check_in?.toISOString() || '',
      tx.approver?.username || '',
      tx.notes || '',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    return csvContent;
  }
}
