import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentDto, UpdateEquipmentDto } from './equipment.dto';
export declare class EquipmentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateEquipmentDto): Promise<{
        name: string;
        id: number;
        status: string;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
        serial_number: string;
        sku: string | null;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        image_url: string | null;
        purchase_date: Date | null;
        current_condition: string | null;
        qr_code_data: string;
    }>;
    findAll(): Promise<({
        category: {
            name: string;
            id: number;
            created_at: Date;
            description: string | null;
        };
        location: {
            name: string;
            id: number;
            address: string | null;
            manager_id: number | null;
        } | null;
    } & {
        name: string;
        id: number;
        status: string;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
        serial_number: string;
        sku: string | null;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        image_url: string | null;
        purchase_date: Date | null;
        current_condition: string | null;
        qr_code_data: string;
    })[]>;
    findOne(id: number): Promise<{
        category: {
            name: string;
            id: number;
            created_at: Date;
            description: string | null;
        };
        location: {
            name: string;
            id: number;
            address: string | null;
            manager_id: number | null;
        } | null;
    } & {
        name: string;
        id: number;
        status: string;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
        serial_number: string;
        sku: string | null;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        image_url: string | null;
        purchase_date: Date | null;
        current_condition: string | null;
        qr_code_data: string;
    }>;
    update(id: number, data: Partial<UpdateEquipmentDto>): Promise<{
        name: string;
        id: number;
        status: string;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
        serial_number: string;
        sku: string | null;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        image_url: string | null;
        purchase_date: Date | null;
        current_condition: string | null;
        qr_code_data: string;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        status: string;
        category_id: number;
        supplier_id: number | null;
        location_id: number | null;
        serial_number: string;
        sku: string | null;
        specifications: import("@prisma/client/runtime/client").JsonValue | null;
        image_url: string | null;
        purchase_date: Date | null;
        current_condition: string | null;
        qr_code_data: string;
    }>;
}
