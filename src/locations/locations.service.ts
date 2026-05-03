import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from './locations.dto';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.storageLocation.findMany({
      include: { _count: { select: { equipment: true } } },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const location = await this.prisma.storageLocation.findUnique({
      where: { id },
      include: { _count: { select: { equipment: true } } },
    });
    if (!location) throw new NotFoundException('Location not found');
    return location;
  }

  async create(dto: CreateLocationDto) {
    return this.prisma.storageLocation.create({ data: dto });
  }

  async update(id: number, dto: UpdateLocationDto) {
    await this.findOne(id);
    return this.prisma.storageLocation.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.storageLocation.delete({ where: { id } });
  }
}
