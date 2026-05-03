import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Laptop' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Máy tính xách tay các loại', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Laptop Gaming', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Laptop chuyên game', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
