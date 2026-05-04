import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        summary: {
            total_equipment: number;
            available_count: number;
            in_use_count: number;
            maintenance_count: number;
            broken_count: number;
        };
        alerts: {
            pending_requests: number;
            overdue_transactions: number;
        };
        charts: {
            top_borrowed: {
                id: number | undefined;
                name: string | undefined;
                borrow_count: number;
            }[];
            borrow_frequency_by_month: {
                month: string;
                count: number;
            }[];
        };
    }>;
    getOverdueList(): Promise<({
        borrower: {
            id: number;
            username: string;
            email: string;
            full_name: string | null;
        };
        equipment: {
            id: number;
            name: string;
            serial_number: string;
        };
    } & {
        id: number;
        type: string;
        status: string;
        request_date: Date;
        approval_date: Date | null;
        due_date: Date;
        actual_check_out: Date | null;
        actual_check_in: Date | null;
        condition_at_check_out: string | null;
        condition_at_check_in: string | null;
        notes: string | null;
        created_by: number | null;
        updated_by: number | null;
        updated_at: Date;
        equipment_id: number;
        approver_id: number | null;
        storekeeper_id: number | null;
        borrower_id: number;
    })[]>;
    exportCsv(): Promise<string>;
}
