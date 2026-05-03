"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MockNotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockNotificationsService = void 0;
const common_1 = require("@nestjs/common");
let MockNotificationsService = MockNotificationsService_1 = class MockNotificationsService {
    logger = new common_1.Logger(MockNotificationsService_1.name);
    async sendPushNotification(token, title, body) {
        this.logger.log(`[MOCK PUSH] to ${token}: ${title} - ${body}`);
    }
    async sendEmail(email, subject, body) {
        this.logger.log(`[MOCK EMAIL] to ${email}: ${subject} - ${body}`);
    }
};
exports.MockNotificationsService = MockNotificationsService;
exports.MockNotificationsService = MockNotificationsService = MockNotificationsService_1 = __decorate([
    (0, common_1.Injectable)()
], MockNotificationsService);
//# sourceMappingURL=notifications.service.js.map