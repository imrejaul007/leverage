import { Injectable, Logger, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { RedisService } from '../../shared/redis.service';
import { PrismaService } from '../../prisma/prisma.service';
import * as speakeasy from 'speakeasy';
import { v4 as uuidv4 } from 'uuid';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

export interface TokenPayload {
  sub: string;
  email: string;
  role: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: any;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private redisService: RedisService,
    private prisma: PrismaService,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResponse> {
    const existing = await (this.prisma as any).user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = await (this.prisma as any).user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role || 'BUYER',
      },
    });

    const tokens = await this.generateTokens(user);
    await this.saveSession(user.id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await (this.prisma as any).user.findUnique({ where: { email: dto.email } });
    if (!user || !user.password) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    await (this.prisma as any).user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = await this.generateTokens(user);
    await this.saveSession(user.id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async verifyOtp(userId: string, code: string): Promise<{ verified: boolean }> {
    const user = await (this.prisma as any).user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const secret = await this.redisService.get(`otp:${userId}`);
    if (!secret) throw new UnauthorizedException('OTP expired or not sent');

    const valid = speakeasy.totp.verify({ secret, encoding: 'base32', token: code });
    if (!valid) throw new UnauthorizedException('Invalid OTP');

    await this.redisService.del(`otp:${userId}`);
    await (this.prisma as any).user.update({
      where: { id: userId },
      data: { isEmailVerified: true },
    });

    return { verified: true };
  }

  async setupMfa(userId: string): Promise<{ secret: string; otpauthUrl: string }> {
    const secret = speakeasy.generateSecret({ name: 'LeverageByLerar' });
    await this.redisService.set(`mfa:${userId}`, secret.base32, 3600);

    return {
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url || '',
    };
  }

  async verifyMfa(userId: string, code: string): Promise<{ enabled: boolean }> {
    const secret = await this.redisService.get(`mfa:${userId}`);
    if (!secret) throw new UnauthorizedException('MFA not set up');

    const valid = speakeasy.totp.verify({ secret, encoding: 'base32', token: code });
    if (!valid) throw new UnauthorizedException('Invalid MFA code');

    await (this.prisma as any).user.update({
      where: { id: userId },
      data: { isMfaEnabled: true, mfaSecret: secret },
    });

    return { enabled: true };
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    const payload = await this.jwtService.verifyAsync<TokenPayload>(refreshToken);
    const session = await (this.prisma as any).session.findUnique({
      where: { refreshToken },
    });
    if (!session) throw new UnauthorizedException('Invalid session');

    const user = await (this.prisma as any).user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException('User not found');

    const tokens = await this.generateTokens(user);
    await this.saveSession(user.id, tokens.refreshToken);
    await (this.prisma as any).session.delete({ where: { id: session.id } });

    return tokens;
  }

  async logout(refreshToken: string): Promise<{ success: boolean }> {
    await (this.prisma as any).session.deleteMany({ where: { refreshToken } });
    return { success: true };
  }

  private async generateTokens(user: { id: string; email: string; role: string }): Promise<Tokens> {
    const payload: TokenPayload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  private async saveSession(userId: string, refreshToken: string): Promise<void> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await (this.prisma as any).session.create({
      data: { userId, refreshToken, expiresAt },
    });
  }
}
