import { PrismaService } from '../prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from './locations.dto';
export declare class LocationsService {
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
        manager_id: number | null;
    })[]>;
    findOne(id: number): Promise<{
        _count: {
            equipment: number;
        };
    } & {
        name: string;
        id: number;
        address: string | null;
        manager_id: number | null;
    }>;
    create(dto: CreateLocationDto): Promise<{
        name: string;
        id: number;
        address: string | null;
        manager_id: number | null;
    }>;
    update(id: number, dto: UpdateLocationDto): Promise<{
        name: string;
        id: number;
        address: string | null;
        manager_id: number | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        address: string | null;
        manager_id: number | null;
    }>;
}
