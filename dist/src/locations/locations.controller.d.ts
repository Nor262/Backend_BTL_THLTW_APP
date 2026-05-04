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
        id: number;
        name: string;
        address: string | null;
        manager_id: number | null;
    })[]>;
    findOne(id: string): Promise<{
        _count: {
            equipment: number;
        };
    } & {
        id: number;
        name: string;
        address: string | null;
        manager_id: number | null;
    }>;
    create(dto: CreateLocationDto): Promise<{
        id: number;
        name: string;
        address: string | null;
        manager_id: number | null;
    }>;
    update(id: string, dto: UpdateLocationDto): Promise<{
        id: number;
        name: string;
        address: string | null;
        manager_id: number | null;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        address: string | null;
        manager_id: number | null;
    }>;
}
