import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentDto, UpdateEquipmentDto } from './equipment.dto';
import * as QRCode from 'qrcode';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEquipmentDto) {
    const qrData = JSON.stringify({ serial: data.serial_number, timestamp: Date.now() });
    const qrImage = await QRCode.toDataURL(qrData);

    // Convert date string if present
    const purchaseDate = data.purchase_date ? new Date(data.purchase_date) : undefined;
    const { purchase_date, ...restData } = data;

    return this.prisma.equipment.create({
      data: {
        ...restData,
        purchase_date: purchaseDate,
        qr_code_data: qrImage,
      },
    });
  }

  async findAll() {
    return this.prisma.equipment.findMany({
      include: { category: true, location: true },
    });
  }

  async findOne(id: number) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
      include: { category: true, location: true },
    });
    if (!equipment) throw new NotFoundException('Equipment not found');
    return equipment;
  }

  async update(id: number, data: Partial<UpdateEquipmentDto>) {
    const purchaseDate = data.purchase_date ? new Date(data.purchase_date) : undefined;
    const { purchase_date, ...restData } = data;

    return this.prisma.equipment.update({
      where: { id },
      data: {
        ...restData,
        ...(purchaseDate && { purchase_date: purchaseDate }),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.equipment.delete({
      where: { id },
    });
  }
}
