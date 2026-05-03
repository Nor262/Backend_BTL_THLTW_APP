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
exports.VerifyItemDto = exports.CheckInOutDto = exports.ReviewTransactionDto = exports.CreateTransactionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTransactionDto {
    equipment_id;
    due_date;
    notes;
}
exports.CreateTransactionDto = CreateTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "equipment_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-17T17:00:00Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "due_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mượn đi quay sự kiện chào tân sinh viên', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "notes", void 0);
class ReviewTransactionDto {
    status;
    notes;
}
exports.ReviewTransactionDto = ReviewTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'approved', enum: ['approved', 'rejected'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReviewTransactionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Thiết bị không còn trong kho', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReviewTransactionDto.prototype, "notes", void 0);
class CheckInOutDto {
    qr_code_data;
    condition;
}
exports.CheckInOutDto = CheckInOutDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'data:image/png;base64,...' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CheckInOutDto.prototype, "qr_code_data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Tình trạng tốt, không hư hỏng', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CheckInOutDto.prototype, "condition", void 0);
class VerifyItemDto {
    serial_number;
}
exports.VerifyItemDto = VerifyItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MBP-2023-001' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyItemDto.prototype, "serial_number", void 0);
//# sourceMappingURL=transactions.dto.js.map