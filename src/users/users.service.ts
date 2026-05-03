import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  // ===== Admin Management Methods =====

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        full_name: true,
        role: true,
        is_active: true,
        created_at: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async updateRole(id: number, role: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, username: true, email: true, role: true, is_active: true },
    });
  }

  async setActiveStatus(id: number, is_active: boolean) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      where: { id },
      data: { is_active },
      select: { id: true, username: true, email: true, role: true, is_active: true },
    });
  }

  async updateProfile(id: number, data: { full_name?: string; fcm_token?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, username: true, email: true, full_name: true, role: true },
    });
  }

  async updatePassword(id: number, newPasswordHash: string) {
    return this.prisma.user.update({
      where: { id },
      data: { password_hash: newPasswordHash },
    });
  }
}
