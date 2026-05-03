import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaintenanceDto } from './maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaintenanceDto) {
    // Verify equipment exists
    const equipment = await this.prisma.equipment.findUnique({ where: { id: dto.equipment_id } });
    if (!equipment) throw new NotFoundException('Equipment not found');

    // Update equipment status to maintenance
    await this.prisma.equipment.update({
      where: { id: dto.equipment_id },
      data: { status: 'maintenance' },
    });

    return this.prisma.maintenanceHistory.create({
      data: {
        equipment_id: dto.equipment_id,
        maintenance_date: dto.maintenance_date ? new Date(dto.maintenance_date) : new Date(),
        performed_by: dto.performed_by,
        details: dto.details,
        cost: dto.cost,
        next_maintenance_date: dto.next_maintenance_date ? new Date(dto.next_maintenance_date) : undefined,
      },
      include: { equipment: true },
    });
  }

  async findByEquipment(equipmentId: number) {
    return this.prisma.maintenanceHistory.findMany({
      where: { equipment_id: equipmentId },
      orderBy: { maintenance_date: 'desc' },
      include: { equipment: { select: { id: true, name: true, serial_number: true } } },
    });
  }

  async findAll() {
    return this.prisma.maintenanceHistory.findMany({
      orderBy: { maintenance_date: 'desc' },
      include: { equipment: { select: { id: true, name: true, serial_number: true, status: true } } },
    });
  }

  async completeMaintenance(equipmentId: number) {
    const equipment = await this.prisma.equipment.findUnique({ where: { id: equipmentId } });
    if (!equipment) throw new NotFoundException('Equipment not found');
    if (equipment.status !== 'maintenance') {
      throw new NotFoundException('Equipment is not in maintenance');
    }

    return this.prisma.equipment.update({
      where: { id: equipmentId },
      data: { status: 'available' },
    });
  }
}
