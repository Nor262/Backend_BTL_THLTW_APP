import { PrismaService } from '../prisma/prisma.service';
import { CreateEquipmentDto, UpdateEquipmentDto } from './equipment.dto';
import { AuditService } from '../audit/audit.service';
export declare class EquipmentService {
    private prisma;
    private auditService;
    constructor(prisma: PrismaService, auditService: AuditService);
    create(data: CreateEquipmentDto): Promise<{
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
    findOne(id: number): Promise<{
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
    update(id: number, data: Partial<UpdateEquipmentDto>): Promise<{
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
    remove(id: number, adminId: number): Promise<{
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
    getAvailability(id: number): Promise<{
        start: any;
        end: Date;
    }[]>;
}
