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
exports.UpdateEquipmentDto = exports.CreateEquipmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateEquipmentDto {
    name;
    category_id;
    supplier_id;
    location_id;
    serial_number;
    sku;
    status;
    specifications;
    image_url;
    purchase_date;
    current_condition;
}
exports.CreateEquipmentDto = CreateEquipmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MacBook Pro M2' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "category_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "supplier_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "location_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MBP-2023-001' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "serial_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SKU-MBP-001', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "sku", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'available', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { ram: '16GB', storage: '512GB SSD' }, required: false }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateEquipmentDto.prototype, "specifications", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/image.jpg', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "image_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-06-15', required: false }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "purchase_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mới, còn nguyên seal', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "current_condition", void 0);
class UpdateEquipmentDto extends CreateEquipmentDto {
}
exports.UpdateEquipmentDto = UpdateEquipmentDto;
//# sourceMappingURL=equipment.dto.js.map