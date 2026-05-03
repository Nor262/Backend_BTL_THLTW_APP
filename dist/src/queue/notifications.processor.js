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
exports.NotificationsQueueProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const notifications_service_1 = require("../notifications/notifications.service");
let NotificationsQueueProcessor = class NotificationsQueueProcessor extends bullmq_1.WorkerHost {
    notificationsService;
    constructor(notificationsService) {
        super();
        this.notificationsService = notificationsService;
    }
    async process(job) {
        switch (job.name) {
            case 'send-overdue-alert':
                await this.notificationsService.sendEmail(job.data.email, 'Overdue Equipment Return', `Please return equipment ID: ${job.data.equipmentId} immediately.`);
                break;
            default:
                console.log(`Unknown job: ${job.name}`);
        }
    }
};
exports.NotificationsQueueProcessor = NotificationsQueueProcessor;
exports.NotificationsQueueProcessor = NotificationsQueueProcessor = __decorate([
    (0, bullmq_1.Processor)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.MockNotificationsService])
], NotificationsQueueProcessor);
//# sourceMappingURL=notifications.processor.js.map