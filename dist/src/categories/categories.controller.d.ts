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
        id: number;
        created_at: Date;
        name: string;
        description: string | null;
    })[]>;
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdateCategoryDto): Promise<{
        id: number;
        created_at: Date;
        name: string;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        created_at: Date;
        name: string;
        description: string | null;
    }>;
}
