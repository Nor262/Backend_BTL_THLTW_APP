import { LocationsService } from './locations.service';
import { CreateLocationDto, UpdateLocationDto } from './locations.dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: UpdateLocationDto): Promise<{
        name: string;
        id: number;
        address: string | null;
        manager_id: number | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        address: string | null;
        manager_id: number | null;
    }>;
}
