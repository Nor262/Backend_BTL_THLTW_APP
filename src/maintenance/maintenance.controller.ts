import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './maintenance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Maintenance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Roles('admin', 'storekeeper')
  @Get()
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Roles('admin', 'storekeeper')
  @Get('equipment/:equipmentId')
  @ApiQuery({ name: 'equipmentId', description: 'ID thiết bị' })
  findByEquipment(@Param('equipmentId') equipmentId: string) {
    return this.maintenanceService.findByEquipment(+equipmentId);
  }

  @Roles('admin', 'storekeeper')
  @Post()
  create(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.create(dto);
  }

  @Roles('admin', 'storekeeper')
  @Put('complete/:equipmentId')
  completeMaintenance(@Param('equipmentId') equipmentId: string) {
    return this.maintenanceService.completeMaintenance(+equipmentId);
  }
}
