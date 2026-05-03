import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdateCategoryDto): Promise<{
        name: string;
        id: number;
        created_at: Date;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        created_at: Date;
        description: string | null;
    }>;
}
