import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { UpdateProfileDto, ChangePasswordDto } from '../users/users.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        user: any;
        accessToken: string;
        refreshToken: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: number;
        username: string;
        email: string;
        full_name: string | null;
        role: string;
        fcm_token: string | null;
        is_active: boolean;
        created_at: Date;
    }>;
    getProfile(req: any): any;
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
        id: number;
        username: string;
        email: string;
        full_name: string | null;
        role: string;
    }>;
    changePassword(req: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
