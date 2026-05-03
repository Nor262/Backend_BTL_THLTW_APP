import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        _count: {
            equipment: number;
        };
    } & {
        name: string;
        id: number;
        created_at: Date;
        description: string | null;
    })[]>;
    findOne(id: number): Promise<{
        _count: {
            equipment: number;
        };
    } & {
        name: string;
        id: number;
        created_at: Date;
        description: string | null;
    }>;
    create(dto: CreateCategoryDto): Promise<{
        name: string;
        id: number;
        created_at: Date;
        description: string | null;
    }>;
    update(id: number, dto: UpdateCategoryDto): Promise<{
        name: string;
        id: number;
        created_at: Date;
        description: string | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        created_at: Date;
        description: string | null;
    }>;
}
