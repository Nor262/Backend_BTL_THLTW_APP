"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const QRCode = __importStar(require("qrcode"));
const audit_service_1 = require("../audit/audit.service");
let EquipmentService = class EquipmentService {
    prisma;
    auditService;
    constructor(prisma, auditService) {
        this.prisma = prisma;
        this.auditService = auditService;
    }
    async create(data) {
        const qrData = JSON.stringify({ serial: data.serial_number, timestamp: Date.now() });
        const qrImage = await QRCode.toDataURL(qrData);
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
    async findOne(id) {
        const equipment = await this.prisma.equipment.findUnique({
            where: { id },
            include: { category: true, location: true },
        });
        if (!equipment)
            throw new common_1.NotFoundException('Equipment not found');
        return equipment;
    }
    async update(id, data) {
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
    async remove(id, adminId) {
        const equipment = await this.prisma.equipment.findUnique({ where: { id } });
        if (!equipment)
            throw new common_1.NotFoundException('Equipment not found');
        const deleted = await this.prisma.equipment.delete({
            where: { id },
        });
        await this.auditService.logAction(adminId, 'DELETE_EQUIPMENT', 'Equipment', id, `Deleted equipment: ${equipment.name} (${equipment.serial_number})`);
        return deleted;
    }
    async getAvailability(id) {
        const transactions = await this.prisma.transaction.findMany({
            where: {
                equipment_id: id,
                status: { in: ['pending', 'approved', 'active', 'overdue'] },
            },
            select: {
                start_date: true,
                due_date: true,
            },
        });
        return transactions.map((t) => ({
            start: t.start_date,
            end: t.due_date,
        }));
    }
};
exports.EquipmentService = EquipmentService;
exports.EquipmentService = EquipmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], EquipmentService);
//# sourceMappingURL=equipment.service.js.map