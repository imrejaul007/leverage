import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';
import { AuditLog } from './entities/audit-log.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        const isProduction = process.env.NODE_ENV === 'production';

        // Validate JWT_SECRET in production
        if (isProduction && !secret) {
          throw new Error('FATAL: JWT_SECRET environment variable is required in production');
        }

        // Warn about weak secrets in development
        if (!secret) {
          console.warn('[AUTH] WARNING: Using default JWT secret - NOT SUITABLE FOR PRODUCTION');
          return {
            secret: 'development-secret-do-not-use-in-production',
            signOptions: { expiresIn: '7d' },
          };
        } else if (secret.length < 32) {
          console.warn('[AUTH] WARNING: JWT_SECRET should be at least 32 characters');
        }

        return {
          secret,
          signOptions: { expiresIn: '7d' },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Session, AuditLog]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
