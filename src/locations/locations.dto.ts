import { IsString, IsOptional, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ example: 'Kho A - Tầng 2' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Tòa nhà B, Cơ sở Thủ Đức', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 5, description: 'ID quản lý kho', required: false })
  @IsInt()
  @IsOptional()
  manager_id?: number;
}

export class UpdateLocationDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  manager_id?: number;
}
