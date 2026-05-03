import { IsString, IsInt, IsOptional, IsObject, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipmentDto {
  @ApiProperty({ example: 'MacBook Pro M2' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  category_id!: number;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  supplier_id?: number;

  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  location_id?: number;

  @ApiProperty({ example: 'MBP-2023-001' })
  @IsString()
  @IsNotEmpty()
  serial_number!: string;

  @ApiProperty({ example: 'SKU-MBP-001', required: false })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty({ example: 'available', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ example: { ram: '16GB', storage: '512GB SSD' }, required: false })
  @IsObject()
  @IsOptional()
  specifications?: any;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiProperty({ example: '2023-06-15', required: false })
  @IsDateString()
  @IsOptional()
  purchase_date?: string;

  @ApiProperty({ example: 'Mới, còn nguyên seal', required: false })
  @IsString()
  @IsOptional()
  current_condition?: string;
}

export class UpdateEquipmentDto extends CreateEquipmentDto {}
