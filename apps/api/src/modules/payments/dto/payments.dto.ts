import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsUUID,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType, TransactionStatus, PaymentProvider } from '../entities/payment-transaction.entity';

export class InitiatePaymentDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  orderId: string;

  @ApiProperty({ enum: PaymentProvider })
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @ApiProperty()
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiPropertyOptional({ default: 'USD' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;
}

export class ConfirmPaymentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentMethodType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  providerReference?: string;
}

export class RefundPaymentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  amount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}

export class PaymentInitiationResponseDto {
  @ApiProperty()
  transactionId: string;

  @ApiPropertyOptional()
  clientSecret?: string;

  @ApiPropertyOptional()
  paymentIntentId?: string;
}

export class PaymentTransactionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  @ApiProperty({ enum: TransactionStatus })
  status: TransactionStatus;

  @ApiProperty({ enum: PaymentProvider })
  provider: PaymentProvider;

  @ApiPropertyOptional()
  providerTransactionId?: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiPropertyOptional()
  paymentMethod?: string;

  @ApiPropertyOptional()
  paymentMethodType?: string;

  @ApiPropertyOptional()
  failureReason?: string;

  @ApiPropertyOptional()
  completedAt?: Date;

  @ApiProperty()
  createdAt: Date;
}

export class PaymentMethodsResponseDto {
  @ApiProperty()
  methods: Array<{
    id: string;
    type: string;
    brand?: string;
    last4?: string;
    expiryMonth?: number;
    expiryYear?: number;
    isDefault: boolean;
  }>;
}

export class EscrowHoldResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  orderId: string;

  @ApiProperty()
  sellerId: string;

  @ApiProperty()
  buyerId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
  releasedAt?: Date;

  @ApiPropertyOptional()
  disputeReason?: string;

  @ApiProperty()
  createdAt: Date;
}
