import { IsString, IsOptional, IsEnum, IsDateString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum DocumentType {
  GST_CERTIFICATE = 'GST_CERTIFICATE',
  IEC = 'IEC',
  PAN_CARD = 'PAN_CARD',
  ADDRESS_PROOF = 'ADDRESS_PROOF',
  BANK_STATEMENT = 'BANK_STATEMENT',
  OTHER = 'OTHER',
}

export class UploadDocumentDto {
  @ApiProperty({ enum: DocumentType, description: 'Type of document' })
  @IsEnum(DocumentType)
  type: DocumentType;

  @ApiProperty({ example: 'https://storage.example.com/documents/gst-cert.pdf', description: 'Document URL' })
  @IsString()
  @IsUrl({}, { message: 'Invalid document URL' })
  documentUrl: string;

  @ApiPropertyOptional({ example: 'GSTIN123456789', description: 'Document number (if applicable)' })
  @IsOptional()
  @IsString()
  documentNumber?: string;

  @ApiPropertyOptional({ example: '2030-12-31', description: 'Document expiry date (ISO format)' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;
}
