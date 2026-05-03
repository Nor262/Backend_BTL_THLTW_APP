export declare class UpdateUserRoleDto {
    role: string;
}
export declare class DeactivateUserDto {
    is_active: boolean;
}
export declare class UpdateProfileDto {
    full_name?: string;
    fcm_token?: string;
}
export declare class ChangePasswordDto {
    old_password: string;
    new_password: string;
}
