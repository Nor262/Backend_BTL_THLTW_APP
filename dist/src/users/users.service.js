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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const audit_service_1 = require("../audit/audit.service");
let UsersService = class UsersService {
    prisma;
    auditService;
    constructor(prisma, auditService) {
        this.prisma = prisma;
        this.auditService = auditService;
    }
    async findOneByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async create(data) {
        return this.prisma.user.create({ data });
    }
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
    async updateRole(id, role, adminId) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const updated = await this.prisma.user.update({
            where: { id },
            data: { role },
            select: { id: true, username: true, email: true, role: true, is_active: true },
        });
        await this.auditService.logAction(adminId, 'UPDATE_ROLE', 'User', id, `Changed role from ${user.role} to ${role}`);
        return updated;
    }
    async setActiveStatus(id, is_active, adminId) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const updated = await this.prisma.user.update({
            where: { id },
            data: { is_active },
            select: { id: true, username: true, email: true, role: true, is_active: true },
        });
        await this.auditService.logAction(adminId, 'UPDATE_STATUS', 'User', id, `Changed active status to ${is_active}`);
        return updated;
    }
    async updateProfile(id, data) {
        return this.prisma.user.update({
            where: { id },
            data,
            select: { id: true, username: true, email: true, full_name: true, role: true },
        });
    }
    async updatePassword(id, newPasswordHash) {
        return this.prisma.user.update({
            where: { id },
            data: { password_hash: newPasswordHash },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        audit_service_1.AuditService])
], UsersService);
//# sourceMappingURL=users.service.js.map