import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto, UpdateEquipmentDto } from './equipment.dto';
export declare class EquipmentController {
    private readonly equipmentService;
    constructor(equipmentService: EquipmentService);
    create(createEquipmentDto: CreateEquipmentDto): Promise<{
        id: number;
        name: string;
        status: string;
        purchase_date: Date | null;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
        serial_number: string;
        sku: string | null;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        image_url: string | null;
        current_condition: string | null;
        qr_code_data: string;
    }>;
    findAll(): Promise<({
        category: {
            id: number;
            created_at: Date;
            name: string;
            description: string | null;
        };
        location: {
            id: number;
            name: string;
            address: string | null;
            manager_id: number | null;
        } | null;
    } & {
        id: number;
        name: string;
        status: string;
        purchase_date: Date | null;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
        serial_number: string;
        sku: string | null;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        image_url: string | null;
        current_condition: string | null;
        qr_code_data: string;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            id: number;
            created_at: Date;
            name: string;
            description: string | null;
        };
        location: {
            id: number;
            name: string;
            address: string | null;
            manager_id: number | null;
        } | null;
    } & {
        id: number;
        name: string;
        status: string;
        purchase_date: Date | null;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
        serial_number: string;
        sku: string | null;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        image_url: string | null;
        current_condition: string | null;
        qr_code_data: string;
    }>;
    update(id: string, updateEquipmentDto: Partial<UpdateEquipmentDto>): Promise<{
        id: number;
        name: string;
        status: string;
        purchase_date: Date | null;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
        serial_number: string;
        sku: string | null;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        image_url: string | null;
        current_condition: string | null;
        qr_code_data: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        status: string;
        purchase_date: Date | null;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
        serial_number: string;
        sku: string | null;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        image_url: string | null;
        current_condition: string | null;
        qr_code_data: string;
    }>;
}
