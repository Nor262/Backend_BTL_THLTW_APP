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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const transactions_service_1 = require("./transactions.service");
const transactions_dto_1 = require("./transactions.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let TransactionsController = class TransactionsController {
    transactionsService;
    constructor(transactionsService) {
        this.transactionsService = transactionsService;
    }
    createBorrowRequest(req, dto) {
        return this.transactionsService.createBorrowRequest(req.user.id, dto);
    }
    reviewRequest(req, id, dto) {
        return this.transactionsService.reviewRequest(+id, req.user.id, dto);
    }
    checkOut(req, id, dto, file) {
        return this.transactionsService.checkOut(+id, req.user.id, dto, file);
    }
    checkIn(req, id, dto, file) {
        return this.transactionsService.checkIn(+id, req.user.id, dto, file);
    }
    verifyItem(dto) {
        return this.transactionsService.verifyItem(dto.serial_number);
    }
    findAll() {
        return this.transactionsService.findAll();
    }
    findMyTransactions(req) {
        return this.transactionsService.findMyTransactions(req.user.id);
    }
    findByEquipment(id) {
        return this.transactionsService.findByEquipment(+id);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, roles_decorator_1.Roles)('borrower', 'admin'),
    (0, common_1.Post)('borrow'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transactions_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "createBorrowRequest", null);
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Put)(':id/review'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, transactions_dto_1.ReviewTransactionDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "reviewRequest", null);
__decorate([
    (0, roles_decorator_1.Roles)('storekeeper', 'admin'),
    (0, common_1.Put)(':id/checkout'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, transactions_dto_1.CheckInOutDto, typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "checkOut", null);
__decorate([
    (0, roles_decorator_1.Roles)('storekeeper', 'admin'),
    (0, common_1.Put)(':id/checkin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, transactions_dto_1.CheckInOutDto, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "checkIn", null);
__decorate([
    (0, roles_decorator_1.Roles)('storekeeper', 'admin'),
    (0, common_1.Post)('verify-item'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transactions_dto_1.VerifyItemDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "verifyItem", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findMyTransactions", null);
__decorate([
    (0, common_1.Get)('equipment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "findByEquipment", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, swagger_1.ApiTags)('Transactions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map