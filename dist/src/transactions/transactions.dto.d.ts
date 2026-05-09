export declare class CreateTransactionDto {
    equipment_id: number;
    start_date: string;
    due_date: string;
    notes?: string;
}
export declare class ReviewTransactionDto {
    status: string;
    notes?: string;
}
export declare class CheckInOutDto {
    qr_code_data: string;
    condition?: string;
    image?: any;
}
export declare class VerifyItemDto {
    serial_number: string;
}
