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
        id: number;
        name: string;
        contact_info: string | null;
        address: string | null;
    })[]>;
    findOne(id: string): Promise<{
        _count: {
            equipment: number;
        };
    } & {
        id: number;
        name: string;
        contact_info: string | null;
        address: string | null;
    }>;
    create(dto: CreateSupplierDto): Promise<{
        id: number;
        name: string;
        contact_info: string | null;
        address: string | null;
    }>;
    update(id: string, dto: UpdateSupplierDto): Promise<{
        id: number;
        name: string;
        contact_info: string | null;
        address: string | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        contact_info: string | null;
        address: string | null;
    }>;
}
