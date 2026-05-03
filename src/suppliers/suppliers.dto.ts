import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplierDto {
  @ApiProperty({ example: 'Công ty TNHH ABC' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '0901234567 - contact@abc.vn', required: false })
  @IsString()
  @IsOptional()
  contact_info?: string;

  @ApiProperty({ example: '123 Nguyễn Huệ, Q.1, TP.HCM', required: false })
  @IsString()
  @IsOptional()
  address?: string;
}

export class UpdateSupplierDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  contact_info?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;
}
