import { PrismaService } from '../prisma/prisma.service';
import { CreateSupplierDto, UpdateSupplierDto } from './suppliers.dto';
export declare class SuppliersService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
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
    update(id: number, dto: UpdateSupplierDto): Promise<{
        name: string;
        id: number;
        address: string | null;
        contact_info: string | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        address: string | null;
        contact_info: string | null;
    }>;
}
