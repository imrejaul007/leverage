import { Injectable, Logger, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RedisService } from '../../shared/redis.service';
import { PrismaService } from '../../prisma/prisma.service';
import * as speakeasy from 'speakeasy';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

interface TokenPayload {
  sub: string;
  email: string;
  role: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly encryptionKey: Buffer;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private redisService: RedisService,
    private prisma: PrismaService,
  ) {
    const key = this.configService.get<string>('ENCRYPTION_KEY');
    if (key) {
      this.encryptionKey = Buffer.from(key, 'base64');
    } else {
      this.encryptionKey = crypto.randomBytes(32);
      this.logger.warn('ENCRYPTION_KEY not set - using random key (MFA secrets will not persist across restarts)');
    }
  }

  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', this.encryptionKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag();
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  private decrypt(encrypted: string): string {
    const parts = encrypted.split(':');
    if (parts.length !== 3) throw new Error('Invalid encrypted format');

    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encryptedText = parts[2];

    const decipher = crypto.createDecipheriv('aes-256-gcm', this.encryptionKey, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(this.configService.get<string>('BCRYPT_ROUNDS', '12'), 10);
    return bcrypt.hash(password, saltRounds);
  }

  async signup(dto: SignupDto): Promise<AuthResponse> {
    const existing = await (this.prisma as unknown as { user: { findUnique: (arg: { where: { email: string } }) => Promise<unknown> } }).user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordValidation = this.validatePasswordStrength(dto.password);
    if (!passwordValidation.valid) {
      throw new BadRequestException(passwordValidation.errors.join('. '));
    }

    const hashedPassword = await this.hashPassword(dto.password);
    const user = await (this.prisma as unknown as { user: { create: (arg: { data: unknown }) => Promise<unknown> } }).user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role || 'BUYER',
      },
    }) as User;

    const tokens = await this.generateTokens(user);
    await this.saveSession(user.id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await (this.prisma as unknown as { user: { findUnique: (arg: { where: { email: string } }) => Promise<unknown> } }).user.findUnique({ where: { email: dto.email } }) as (User & { password?: string }) | null;
    if (!user || !user.password) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    await (this.prisma as unknown as { user: { update: (arg: { where: { id: string }, data: unknown }) => Promise<unknown> } }).user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = await this.generateTokens(user);
    await this.saveSession(user.id, tokens.refreshToken);

    return { user, ...tokens };
  }

  async verifyOtp(userId: string, code: string): Promise<{ verified: boolean }> {
    const user = await (this.prisma as unknown as { user: { findUnique: (arg: { where: { id: string } }) => Promise<unknown> } }).user.findUnique({ where: { id: userId } }) as User | null;
    if (!user) throw new UnauthorizedException('User not found');

    const secret = await this.redisService.get(`otp:${userId}`);
    if (!secret) throw new UnauthorizedException('OTP expired or not sent');

    const valid = speakeasy.totp.verify({ secret, encoding: 'base32', token: code });
    if (!valid) throw new UnauthorizedException('Invalid OTP');

    await this.redisService.del(`otp:${userId}`);
    await (this.prisma as unknown as { user: { update: (arg: { where: { id: string }, data: unknown }) => Promise<unknown> } }).user.update({
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

    const encryptedSecret = this.encrypt(secret);
    await (this.prisma as unknown as { user: { update: (arg: { where: { id: string }, data: unknown }) => Promise<unknown> } }).user.update({
      where: { id: userId },
      data: { isMfaEnabled: true, mfaSecret: encryptedSecret },
    });

    await this.redisService.del(`mfa:${userId}`);

    return { enabled: true };
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(refreshToken);
      const session = await (this.prisma as unknown as { session: { findUnique: (arg: { where: { refreshToken: string } }) => Promise<unknown> } }).session.findUnique({
        where: { refreshToken },
      }) as { id: string; expiresAt: Date } | null;

      if (!session) throw new UnauthorizedException('Invalid session');

      if (session.expiresAt < new Date()) {
        await (this.prisma as unknown as { session: { delete: (arg: { where: { id: string } }) => Promise<unknown> } }).session.delete({ where: { id: session.id } });
        throw new UnauthorizedException('Session expired');
      }

      const user = await (this.prisma as unknown as { user: { findUnique: (arg: { where: { id: string } }) => Promise<unknown> } }).user.findUnique({ where: { id: payload.sub } }) as User | null;
      if (!user) throw new UnauthorizedException('User not found');

      const tokens = await this.generateTokens(user);
      await this.saveSession(user.id, tokens.refreshToken);
      await (this.prisma as unknown as { session: { delete: (arg: { where: { id: string } }) => Promise<unknown> } }).session.delete({ where: { id: session.id } });

      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refreshToken: string): Promise<{ success: boolean }> {
    await (this.prisma as unknown as { session: { deleteMany: (arg: { where: { refreshToken: string } }) => Promise<unknown> } }).session.deleteMany({ where: { refreshToken } });
    return { success: true };
  }

  private async generateTokens(user: User): Promise<Tokens> {
    const payload: TokenPayload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '15m'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d'),
    });
    return { accessToken, refreshToken };
  }

  private async saveSession(userId: string, refreshToken: string): Promise<void> {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await (this.prisma as unknown as { session: { create: (arg: { data: unknown }) => Promise<unknown> } }).session.create({
      data: { userId, refreshToken, expiresAt },
    });
  }

  private validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return { valid: errors.length === 0, errors };
  }
}
