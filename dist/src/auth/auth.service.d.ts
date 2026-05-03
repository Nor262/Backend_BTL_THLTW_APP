import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './auth.dto';
import { UpdateProfileDto, ChangePasswordDto } from '../users/users.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
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
    updateProfile(userId: number, dto: UpdateProfileDto): Promise<{
        id: number;
        username: string;
        email: string;
        full_name: string | null;
        role: string;
    }>;
    changePassword(userId: number, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
