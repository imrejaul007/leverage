import { IsString, Length, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyIecDto {
  @ApiProperty({
    example: '1234567890',
    description: '10-digit Import Export Code',
  })
  @IsString()
  @Length(10, 10, { message: 'IEC must be exactly 10 digits' })
  @IsNumberString({}, { message: 'IEC must contain only digits' })
  iec: string;
}
