import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOneByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    findAll(): Promise<{
        id: number;
        username: string;
        email: string;
        full_name: string | null;
        role: string;
        is_active: boolean;
        created_at: Date;
    }[]>;
    updateRole(id: number, role: string): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        is_active: boolean;
    }>;
    setActiveStatus(id: number, is_active: boolean): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        is_active: boolean;
    }>;
    updateProfile(id: number, data: {
        full_name?: string;
        fcm_token?: string;
    }): Promise<{
        id: number;
        username: string;
        email: string;
        full_name: string | null;
        role: string;
    }>;
    updatePassword(id: number, newPasswordHash: string): Promise<{
        id: number;
        username: string;
        email: string;
        password_hash: string;
        full_name: string | null;
        role: string;
        fcm_token: string | null;
        is_active: boolean;
        created_at: Date;
    }>;
}
