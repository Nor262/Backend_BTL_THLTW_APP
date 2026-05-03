import { IsInt, IsString, IsOptional, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaintenanceDto {
  @ApiProperty({ example: 101 })
  @IsInt()
  equipment_id!: number;

  @ApiProperty({ example: '2026-05-15', required: false })
  @IsDateString()
  @IsOptional()
  maintenance_date?: string;

  @ApiProperty({ example: 'Nguyễn Văn C' })
  @IsString()
  @IsNotEmpty()
  performed_by!: string;

  @ApiProperty({ example: 'Thay pin và vệ sinh quạt tản nhiệt' })
  @IsString()
  @IsNotEmpty()
  details!: string;

  @ApiProperty({ example: 500000, required: false })
  @IsNumber()
  @IsOptional()
  cost?: number;

  @ApiProperty({ example: '2026-08-15', required: false })
  @IsDateString()
  @IsOptional()
  next_maintenance_date?: string;
}
