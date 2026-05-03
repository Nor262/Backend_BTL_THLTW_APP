import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto, UpdateSupplierDto } from './suppliers.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    findAll(): Promise<({
        _count: {
            equipment: number;
        };
    } & {
        name: string;
        id: number;
        address: string | null;
        contact_info: string | null;
    })[]>;
    findOne(id: string): Promise<{
        _count: {
            equipment: number;
        };
    } & {
        name: string;
        id: number;
        address: string | null;
        contact_info: string | null;
    }>;
    create(dto: CreateSupplierDto): Promise<{
        name: string;
        id: number;
        address: string | null;
        contact_info: string | null;
    }>;
    update(id: string, dto: UpdateSupplierDto): Promise<{
        name: string;
        id: number;
        address: string | null;
        contact_info: string | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        address: string | null;
        contact_info: string | null;
    }>;
}
