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
exports.ChangePasswordDto = exports.UpdateProfileDto = exports.DeactivateUserDto = exports.UpdateUserRoleDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateUserRoleDto {
    role;
}
exports.UpdateUserRoleDto = UpdateUserRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'storekeeper', enum: ['admin', 'storekeeper', 'borrower'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['admin', 'storekeeper', 'borrower']),
    __metadata("design:type", String)
], UpdateUserRoleDto.prototype, "role", void 0);
class DeactivateUserDto {
    is_active;
}
exports.DeactivateUserDto = DeactivateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'Set false to lock account' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeactivateUserDto.prototype, "is_active", void 0);
class UpdateProfileDto {
    full_name;
    fcm_token;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nguyễn Văn B', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fcm_token_from_firebase_sdk', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "fcm_token", void 0);
class ChangePasswordDto {
    old_password;
    new_password;
}
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'oldpassword123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "old_password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'newpassword456' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "new_password", void 0);
//# sourceMappingURL=users.dto.js.map