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
        id: number;
        name: string;
        contact_info: string | null;
        address: string | null;
    })[]>;
    findOne(id: number): Promise<{
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
    update(id: number, dto: UpdateSupplierDto): Promise<{
        id: number;
        name: string;
        contact_info: string | null;
        address: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        contact_info: string | null;
        address: string | null;
    }>;
}
