import { IsString, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum CompanyType {
  MANUFACTURER = 'MANUFACTURER',
  TRADER = 'TRADER',
  BOTH = 'BOTH',
}

export class CreateCompanyDto {
  @ApiProperty({ example: 'ABC Industries Pvt Ltd', description: 'Company name' })
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiPropertyOptional({ enum: CompanyType, description: 'Company type' })
  @IsOptional()
  @IsEnum(CompanyType)
  type?: CompanyType;

  @ApiPropertyOptional({ example: '123 Industrial Area', description: 'Company address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Mumbai', description: 'City' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Maharashtra', description: 'State' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ example: 'India', description: 'Country' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: '400001', description: 'Pincode/ZIP' })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiPropertyOptional({ example: '+91-22-12345678', description: 'Phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'https://www.abcindustries.com', description: 'Website URL' })
  @IsOptional()
  @IsString()
  website?: string;
}
