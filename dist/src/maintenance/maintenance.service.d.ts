import { PrismaService } from '../prisma/prisma.service';
import { CreateMaintenanceDto } from './maintenance.dto';
export declare class MaintenanceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMaintenanceDto): Promise<{
        equipment: {
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
        };
    } & {
        id: number;
        equipment_id: number;
        maintenance_date: Date | null;
        performed_by: string | null;
        details: string | null;
        cost: import("@prisma/client-runtime-utils").Decimal | null;
        next_maintenance_date: Date | null;
    }>;
    findByEquipment(equipmentId: number): Promise<({
        equipment: {
            id: number;
            name: string;
            serial_number: string;
        };
    } & {
        id: number;
        equipment_id: number;
        maintenance_date: Date | null;
        performed_by: string | null;
        details: string | null;
        cost: import("@prisma/client-runtime-utils").Decimal | null;
        next_maintenance_date: Date | null;
    })[]>;
    findAll(): Promise<({
        equipment: {
            id: number;
            name: string;
            status: string;
            serial_number: string;
        };
    } & {
        id: number;
        equipment_id: number;
        maintenance_date: Date | null;
        performed_by: string | null;
        details: string | null;
        cost: import("@prisma/client-runtime-utils").Decimal | null;
        next_maintenance_date: Date | null;
    })[]>;
    completeMaintenance(equipmentId: number): Promise<{
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
