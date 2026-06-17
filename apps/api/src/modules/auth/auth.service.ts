import { Injectable, Logger, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../../shared/redis.service';
import { EmailService } from '../../shared/email.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
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
    private emailService: EmailService,
  ) {
    const key = this.configService.get<string>('ENCRYPTION_KEY');
    if (key) {
      this.encryptionKey = Buffer.from(key, 'base64');
    } else {
      this.encryptionKey = crypto.randomBytes(32);
      this.logger.warn('ENCRYPTION_KEY not set - using random key');
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

  private validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (password.length < 8) errors.push('Password must be at least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('Password must contain uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('Password must contain lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('Password must contain number');
    return { valid: errors.length === 0, errors };
  }

  async signup(dto: SignupDto): Promise<AuthResponse> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordValidation = this.validatePasswordStrength(dto.password);
    if (!passwordValidation.valid) {
      throw new BadRequestException(passwordValidation.errors.join('. '));
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role || 'BUYER',
      },
    });

    const tokens = await this.generateTokens(user);

    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Send welcome email
    this.emailService.sendWelcomeEmail(user.email, user.firstName || 'User').catch(err => {
      this.logger.warn('Failed to send welcome email:', err.message);
    });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword as User, ...tokens };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokens = await this.generateTokens(user);

    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: tokens.refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword as User, ...tokens };
  }

  async verifyOtp(userId: string, code: string): Promise<{ verified: boolean }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const secret = await this.redisService.get(`otp:${userId}`);
    if (!secret) {
      throw new UnauthorizedException('OTP expired or not sent');
    }

    const valid = speakeasy.totp.verify({ secret, encoding: 'base32', token: code });
    if (!valid) {
      throw new UnauthorizedException('Invalid OTP');
    }

    await this.redisService.del(`otp:${userId}`);

    await this.prisma.user.update({
      where: { id: userId },
      data: { isEmailVerified: true },
    });

    return { verified: true };
  }

  async sendOtp(userId: string, email: string): Promise<{ sent: boolean }> {
    const secret = speakeasy.generateSecret({ length: 6 });
    const token = speakeasy.totp({ secret: secret.base32, encoding: 'base32' });

    await this.redisService.set(`otp:${userId}`, secret.base32, 600);

    await this.emailService.sendOTP(email, token);

    return { sent: true };
  }

  async setupMfa(userId: string): Promise<{ secret: string; otpauthUrl: string }> {
    const secret = speakeasy.generateSecret({ name: 'LEVERAGE' });
    await this.redisService.set(`mfa:${userId}`, secret.base32, 3600);

    return {
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url || '',
    };
  }

  async verifyMfa(userId: string, code: string): Promise<{ enabled: boolean }> {
    const secret = await this.redisService.get(`mfa:${userId}`);
    if (!secret) {
      throw new UnauthorizedException('MFA not set up');
    }

    const valid = speakeasy.totp.verify({ secret, encoding: 'base32', token: code });
    if (!valid) {
      throw new UnauthorizedException('Invalid MFA code');
    }

    const encryptedSecret = this.encrypt(secret);

    await this.prisma.user.update({
      where: { id: userId },
      data: { isMfaEnabled: true, mfaSecret: encryptedSecret },
    });

    await this.redisService.del(`mfa:${userId}`);

    return { enabled: true };
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(refreshToken);

      const session = await this.prisma.session.findUnique({
        where: { refreshToken },
      });

      if (!session) {
        throw new UnauthorizedException('Invalid session');
      }

      if (session.expiresAt < new Date()) {
        await this.prisma.session.delete({ where: { id: session.id } });
        throw new UnauthorizedException('Session expired');
      }

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = await this.generateTokens(user);

      // Create new session and delete old one
      await this.prisma.session.create({
        data: {
          userId: user.id,
          refreshToken: tokens.refreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      await this.prisma.session.delete({ where: { id: session.id } });

      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refreshToken: string): Promise<{ success: boolean }> {
    await this.prisma.session.deleteMany({ where: { refreshToken } });
    return { success: true };
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  private async generateTokens(user: { id: string; email: string; role: string }): Promise<Tokens> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET', 'default-secret'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'default-refresh-secret'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
