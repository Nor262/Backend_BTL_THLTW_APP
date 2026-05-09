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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let TransactionsService = class TransactionsService {
    prisma;
    notifications;
    cloudinary;
    constructor(prisma, notifications, cloudinary) {
        this.prisma = prisma;
        this.notifications = notifications;
        this.cloudinary = cloudinary;
    }
    async createBorrowRequest(userId, dto) {
        return this.prisma.$transaction(async (tx) => {
            const equipment = await tx.$queryRaw `
        SELECT * FROM equipment WHERE id = ${dto.equipment_id} FOR UPDATE
      `;
            if (!equipment || equipment.length === 0) {
                throw new common_1.NotFoundException('Equipment not found');
            }
            if (['broken', 'maintenance'].includes(equipment[0].status)) {
                throw new common_1.BadRequestException('Equipment is broken or under maintenance');
            }
            const reqStart = new Date(dto.start_date);
            const reqDue = new Date(dto.due_date);
            if (reqStart >= reqDue) {
                throw new common_1.BadRequestException('Start date must be before due date');
            }
            const overlapping = await tx.transaction.findFirst({
                where: {
                    equipment_id: dto.equipment_id,
                    status: { in: ['approved', 'active', 'pending'] },
                    start_date: { lt: reqDue },
                    due_date: { gt: reqStart },
                }
            });
            if (overlapping) {
                throw new common_1.BadRequestException('Equipment is already booked for the selected dates');
            }
            return tx.transaction.create({
                data: {
                    equipment_id: dto.equipment_id,
                    borrower_id: userId,
                    type: 'borrow',
                    status: 'pending',
                    start_date: reqStart,
                    due_date: reqDue,
                    notes: dto.notes,
                    created_by: userId,
                },
            });
        });
    }
    async reviewRequest(transactionId, reviewerId, dto) {
        return this.prisma.$transaction(async (tx) => {
            const transaction = await tx.transaction.findUnique({ where: { id: transactionId } });
            if (!transaction)
                throw new common_1.NotFoundException('Transaction not found');
            const updatedTx = await tx.transaction.update({
                where: { id: transactionId },
                data: {
                    status: dto.status,
                    approver_id: reviewerId,
                    approval_date: new Date(),
                    notes: dto.notes,
                    updated_by: reviewerId,
                },
                include: { equipment: true }
            });
            await this.notifications.createNotification(transaction.borrower_id, dto.status === 'approved' ? 'Yêu cầu mượn được chấp nhận' : 'Yêu cầu mượn bị từ chối', `Yêu cầu mượn thiết bị ${updatedTx.equipment.name} của bạn đã được ${dto.status === 'approved' ? 'chấp nhận' : 'từ chối'}.`, 'borrow');
            return updatedTx;
        });
    }
    async checkOut(transactionId, storekeeperId, dto, file) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
            include: { equipment: true }
        });
        if (!transaction)
            throw new common_1.NotFoundException('Transaction not found');
        if (transaction.status !== 'approved')
            throw new common_1.BadRequestException('Transaction not approved');
        if (transaction.equipment.qr_code_data !== dto.qr_code_data)
            throw new common_1.BadRequestException('QR Code mismatch');
        let imageUrl = null;
        if (file) {
            const uploadResult = await this.cloudinary.uploadFile(file);
            imageUrl = uploadResult.secure_url;
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.equipment.update({
                where: { id: transaction.equipment_id },
                data: { status: 'in_use' },
            });
            const updatedTx = await tx.transaction.update({
                where: { id: transactionId },
                data: {
                    status: 'active',
                    storekeeper_id: storekeeperId,
                    actual_check_out: new Date(),
                    condition_at_check_out: dto.condition,
                    image_url_before: imageUrl,
                    updated_by: storekeeperId,
                },
                include: { equipment: true }
            });
            await this.notifications.createNotification(transaction.borrower_id, 'Thiết bị đã được bàn giao', `Bạn đã nhận thiết bị ${updatedTx.equipment.name}. Vui lòng bảo quản cẩn thận và trả đúng hạn.`, 'borrow');
            return updatedTx;
        });
    }
    async checkIn(transactionId, storekeeperId, dto, file) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id: transactionId },
            include: { equipment: true }
        });
        if (!transaction)
            throw new common_1.NotFoundException('Transaction not found');
        if (transaction.status !== 'active' && transaction.status !== 'overdue') {
            throw new common_1.BadRequestException('Transaction not active');
        }
        if (transaction.equipment.qr_code_data !== dto.qr_code_data) {
            throw new common_1.BadRequestException('QR Code mismatch');
        }
        let imageUrl = null;
        if (file) {
            const uploadResult = await this.cloudinary.uploadFile(file);
            imageUrl = uploadResult.secure_url;
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.equipment.update({
                where: { id: transaction.equipment_id },
                data: { status: 'available' },
            });
            const updatedTx = await tx.transaction.update({
                where: { id: transactionId },
                data: {
                    status: 'completed',
                    storekeeper_id: storekeeperId,
                    actual_check_in: new Date(),
                    condition_at_check_in: dto.condition,
                    image_url_after: imageUrl,
                    updated_by: storekeeperId,
                },
                include: { equipment: true }
            });
            await this.notifications.createNotification(transaction.borrower_id, 'Hoàn tất trả thiết bị', `Cảm ơn bạn đã trả thiết bị ${updatedTx.equipment.name}. Giao dịch đã hoàn tất.`, 'return');
            return updatedTx;
        });
    }
    async findAll() {
        return this.prisma.transaction.findMany({
            include: { equipment: true, borrower: true, approver: true, storekeeper: true },
        });
    }
    async findMyTransactions(userId) {
        return this.prisma.transaction.findMany({
            where: { borrower_id: userId },
            include: { equipment: { select: { id: true, name: true, serial_number: true, status: true, image_url: true } } },
            orderBy: { request_date: 'desc' },
        });
    }
    async findByEquipment(equipmentId) {
        return this.prisma.transaction.findMany({
            where: {
                equipment_id: equipmentId,
                status: { in: ['pending', 'approved', 'active', 'overdue'] },
            },
            select: {
                id: true,
                request_date: true,
                due_date: true,
                status: true,
            },
        });
    }
    async verifyItem(serialNumber) {
        const equipment = await this.prisma.equipment.findUnique({
            where: { serial_number: serialNumber },
        });
        if (!equipment)
            throw new common_1.NotFoundException('Equipment not found with this serial number');
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
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        cloudinary_service_1.CloudinaryService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map