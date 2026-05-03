"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MaintenanceService = class MaintenanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const equipment = await this.prisma.equipment.findUnique({ where: { id: dto.equipment_id } });
        if (!equipment)
            throw new common_1.NotFoundException('Equipment not found');
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
    async findByEquipment(equipmentId) {
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
    async completeMaintenance(equipmentId) {
        const equipment = await this.prisma.equipment.findUnique({ where: { id: equipmentId } });
        if (!equipment)
            throw new common_1.NotFoundException('Equipment not found');
        if (equipment.status !== 'maintenance') {
            throw new common_1.NotFoundException('Equipment is not in maintenance');
        }
        return this.prisma.equipment.update({
            where: { id: equipmentId },
            data: { status: 'available' },
        });
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map