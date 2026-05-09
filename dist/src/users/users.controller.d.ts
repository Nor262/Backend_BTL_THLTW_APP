import { UsersService } from './users.service';
import { UpdateUserRoleDto, DeactivateUserDto } from './users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: number;
        username: string;
        email: string;
        full_name: string | null;
        role: string;
        is_active: boolean;
        created_at: Date;
    }[]>;
    updateRole(req: any, id: string, dto: UpdateUserRoleDto): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        is_active: boolean;
    }>;
    setActiveStatus(req: any, id: string, dto: DeactivateUserDto): Promise<{
        id: number;
        username: string;
        email: string;
        role: string;
        is_active: boolean;
    }>;
}
