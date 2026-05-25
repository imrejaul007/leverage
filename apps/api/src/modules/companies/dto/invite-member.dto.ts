import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MemberRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER',
}

export class InviteMemberDto {
  @ApiProperty({ example: 'uuid-of-user', description: 'User ID to invite' })
  @IsString()
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({ enum: MemberRole, default: MemberRole.MEMBER, description: 'Role for the member' })
  @IsOptional()
  @IsEnum(MemberRole)
  role?: MemberRole;
}
