import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto, ReviewTransactionDto, CheckInOutDto } from './transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async createBorrowRequest(userId: number, dto: CreateTransactionDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Pessimistic Lock on Equipment
      const equipment = await tx.$queryRaw<any[]>`
        SELECT * FROM equipment WHERE id = ${dto.equipment_id} FOR UPDATE
      `;

      if (!equipment || equipment.length === 0) {
        throw new NotFoundException('Equipment not found');
      }

      if (equipment[0].status !== 'available') {
        throw new BadRequestException('Equipment is not available');
      }

      await tx.equipment.update({
        where: { id: dto.equipment_id },
        data: { status: 'reserved' },
      });

      return tx.transaction.create({
        data: {
          equipment_id: dto.equipment_id,
          borrower_id: userId,
          type: 'borrow',
          status: 'pending',
          due_date: new Date(dto.due_date),
          notes: dto.notes,
          created_by: userId,
        },
      });
    });
  }

  async reviewRequest(transactionId: number, reviewerId: number, dto: ReviewTransactionDto) {
    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.findUnique({ where: { id: transactionId } });
      if (!transaction) throw new NotFoundException('Transaction not found');

      if (dto.status === 'rejected') {
        await tx.equipment.update({
          where: { id: transaction.equipment_id },
          data: { status: 'available' },
        });
      }

      return tx.transaction.update({
        where: { id: transactionId },
        data: {
          status: dto.status,
          approver_id: reviewerId,
          approval_date: new Date(),
          notes: dto.notes,
          updated_by: reviewerId,
        },
      });
    });
  }

  async checkOut(transactionId: number, storekeeperId: number, dto: CheckInOutDto) {
    const transaction = await this.prisma.transaction.findUnique({ 
      where: { id: transactionId },
      include: { equipment: true }
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    if (transaction.status !== 'approved') throw new BadRequestException('Transaction not approved');
    if (transaction.equipment.qr_code_data !== dto.qr_code_data) throw new BadRequestException('QR Code mismatch');

    return this.prisma.$transaction(async (tx) => {
      await tx.equipment.update({
        where: { id: transaction.equipment_id },
        data: { status: 'in_use' },
      });

      return tx.transaction.update({
        where: { id: transactionId },
        data: {
          status: 'active',
          storekeeper_id: storekeeperId,
          actual_check_out: new Date(),
          condition_at_check_out: dto.condition,
          updated_by: storekeeperId,
        },
      });
    });
  }

  async checkIn(transactionId: number, storekeeperId: number, dto: CheckInOutDto) {
    const transaction = await this.prisma.transaction.findUnique({ 
      where: { id: transactionId },
      include: { equipment: true } 
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    if (transaction.status !== 'active' && transaction.status !== 'overdue') {
      throw new BadRequestException('Transaction not active');
    }
    if (transaction.equipment.qr_code_data !== dto.qr_code_data) {
      throw new BadRequestException('QR Code mismatch');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.equipment.update({
        where: { id: transaction.equipment_id },
        data: { status: 'available' },
      });

      return tx.transaction.update({
        where: { id: transactionId },
        data: {
          status: 'completed',
          storekeeper_id: storekeeperId,
          actual_check_in: new Date(),
          condition_at_check_in: dto.condition,
          updated_by: storekeeperId,
        },
      });
    });
  }

  async findAll() {
    return this.prisma.transaction.findMany({
      include: { equipment: true, borrower: true, approver: true, storekeeper: true },
    });
  }

  async findMyTransactions(userId: number) {
    return this.prisma.transaction.findMany({
      where: { borrower_id: userId },
      include: { equipment: { select: { id: true, name: true, serial_number: true, status: true } } },
      orderBy: { request_date: 'desc' },
    });
  }

  async verifyItem(serialNumber: string) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { serial_number: serialNumber },
    });
    if (!equipment) throw new NotFoundException('Equipment not found with this serial number');

    // Find active/approved transaction for this equipment
    const activeTransaction = await this.prisma.transaction.findFirst({
      where: {
        equipment_id: equipment.id,
        status: { in: ['approved', 'active'] },
      },
      orderBy: { request_date: 'desc' },
    });

    return {
      equipment_id: equipment.id,
      name: equipment.name,
      serial_number: equipment.serial_number,
      status: equipment.status,
      transaction_id: activeTransaction?.id || null,
      transaction_status: activeTransaction?.status || null,
    };
  }
}

