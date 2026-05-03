export declare class CreateEquipmentDto {
    name: string;
    category_id: number;
    supplier_id?: number;
    location_id?: number;
    serial_number: string;
    sku?: string;
    status?: string;
    specifications?: any;
    image_url?: string;
    purchase_date?: string;
    current_condition?: string;
}
export declare class UpdateEquipmentDto extends CreateEquipmentDto {
}
