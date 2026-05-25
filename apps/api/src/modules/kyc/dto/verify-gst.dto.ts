import { IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyGstDto {
  @ApiProperty({
    example: '27ABCDE1234F1Z5',
    description: '15-character GST Identification Number',
  })
  @IsString()
  @Length(15, 15, { message: 'GSTIN must be exactly 15 characters' })
  @Matches(/^[0-9]{2}[A-Z]{10}[0-9]{1}[A-Z]{1}$/, {
    message: 'Invalid GSTIN format',
  })
  gstin: string;
}
