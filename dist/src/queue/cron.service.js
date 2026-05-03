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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let CronService = CronService_1 = class CronService {
    prisma;
    notificationsQueue;
    logger = new common_1.Logger(CronService_1.name);
    constructor(prisma, notificationsQueue) {
        this.prisma = prisma;
        this.notificationsQueue = notificationsQueue;
    }
    async handleOverdueTransactions() {
        this.logger.debug('Running overdue transactions check...');
        const overdueTransactions = await this.prisma.transaction.findMany({
            where: {
                status: 'active',
                due_date: { lt: new Date() },
            },
            include: { borrower: true },
        });
        for (const tx of overdueTransactions) {
            await this.prisma.transaction.update({
                where: { id: tx.id },
                data: { status: 'overdue' },
            });
            if (tx.borrower.email) {
                await this.notificationsQueue.add('send-overdue-alert', {
                    email: tx.borrower.email,
                    equipmentId: tx.equipment_id,
                });
            }
        }
    }
};
exports.CronService = CronService;
__decorate([
    (0, schedule_1.Cron)('0 8 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleOverdueTransactions", null);
exports.CronService = CronService = CronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('notifications')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bullmq_2.Queue])
], CronService);
//# sourceMappingURL=cron.service.js.map