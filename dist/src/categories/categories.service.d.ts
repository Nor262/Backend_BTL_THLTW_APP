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
        id: number;
        created_at: Date;
        name: string;
        description: string | null;
    })[]>;
    findOne(id: number): Promise<{
        _count: {
            equipment: number;
        };
    } & {
        id: number;
        created_at: Date;
        name: string;
        description: string | null;
    }>;
    create(dto: CreateCategoryDto): Promise<{
        id: number;
        created_at: Date;
        name: string;
        description: string | null;
    }>;
    update(id: number, dto: UpdateCategoryDto): Promise<{
        id: number;
        created_at: Date;
        name: string;
        description: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        created_at: Date;
        name: string;
        description: string | null;
    }>;
}
