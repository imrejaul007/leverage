import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  companyId?: string;
  iat?: number;
  exp?: number;
}

export interface ValidatedUser {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  company: Record<string, unknown>;
  companyId?: string;
  isEmailVerified: boolean;
  isMfaEnabled: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<ValidatedUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { company: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.status === 'DELETED') {
      throw new UnauthorizedException('Account has been deleted');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company as Record<string, unknown>,
      companyId: user.company?.id,
      isEmailVerified: user.isEmailVerified,
      isMfaEnabled: user.isMfaEnabled,
    };
  }
}
