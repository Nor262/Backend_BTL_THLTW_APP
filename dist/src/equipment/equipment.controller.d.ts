import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto, UpdateEquipmentDto } from './equipment.dto';
export declare class EquipmentController {
    private readonly equipmentService;
    constructor(equipmentService: EquipmentService);
    create(createEquipmentDto: CreateEquipmentDto): Promise<{
        name: string;
        serial_number: string;
        sku: string | null;
        status: string;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        qr_code_data: string;
        image_url: string | null;
        purchase_date: Date | null;
        current_condition: string | null;
        id: number;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
    }>;
    findAll(): Promise<({
        category: {
            name: string;
            id: number;
            description: string | null;
            created_at: Date;
        };
        location: {
            name: string;
            id: number;
            address: string | null;
            manager_id: number | null;
        } | null;
    } & {
        name: string;
        serial_number: string;
        sku: string | null;
        status: string;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        qr_code_data: string;
        image_url: string | null;
        purchase_date: Date | null;
        current_condition: string | null;
        id: number;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            name: string;
            id: number;
            description: string | null;
            created_at: Date;
        };
        location: {
            name: string;
            id: number;
            address: string | null;
            manager_id: number | null;
        } | null;
    } & {
        name: string;
        serial_number: string;
        sku: string | null;
        status: string;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        qr_code_data: string;
        image_url: string | null;
        purchase_date: Date | null;
        current_condition: string | null;
        id: number;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
    }>;
    update(id: string, updateEquipmentDto: Partial<UpdateEquipmentDto>): Promise<{
        name: string;
        serial_number: string;
        sku: string | null;
        status: string;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        qr_code_data: string;
        image_url: string | null;
        purchase_date: Date | null;
        current_condition: string | null;
        id: number;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
    }>;
    remove(req: any, id: string): Promise<{
        name: string;
        serial_number: string;
        sku: string | null;
        status: string;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        qr_code_data: string;
        image_url: string | null;
        purchase_date: Date | null;
        current_condition: string | null;
        id: number;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
    }>;
    getAvailability(id: string): Promise<{
        start: any;
        end: Date;
    }[]>;
}
