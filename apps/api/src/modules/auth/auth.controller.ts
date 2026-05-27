import { Controller, Post, Body, Get, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { SignupDto, UserRole } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @Throttle({ short: { limit: 5, ttl: 60000 } }) // 5 signups per minute
  @ApiOperation({ summary: 'Register a new user' })
  async signup(@Body() dto: SignupDto) {
    const result = await this.authService.signup(dto);
    return { data: result, message: 'User registered successfully' };
  }

  @Public()
  @HttpCode(200)
  @Post('login')
  @Throttle({ short: { limit: 5, ttl: 60000 } }) // 5 login attempts per minute
  @ApiOperation({ summary: 'Login with email and password' })
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return { data: result, message: 'Login successful' };
  }

  @Public()
  @Post('demo')
  @HttpCode(200)
  @Throttle({ short: { limit: 3, ttl: 60000 } }) // Limit demo account creation
  @ApiOperation({ summary: 'Create and login as demo user' })
  async demoLogin() {
    const demoUser: SignupDto = {
      email: `demo_${Date.now()}@leverage.demo`,
      password: 'Demo123!@#',
      firstName: 'Demo',
      lastName: 'User',
      role: UserRole.BUYER,
    };
    const signupResult = await this.authService.signup(demoUser);
    return { data: signupResult, message: 'Demo account created' };
  }

  @Public()
  @HttpCode(200)
  @Post('logout')
  @ApiOperation({ summary: 'Logout and invalidate refresh token' })
  async logout(@Body() dto: { refreshToken: string }) {
    return this.authService.logout(dto.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-otp')
  @Throttle({ short: { limit: 10, ttl: 60000 } }) // 10 OTP verifications per minute
  @ApiOperation({ summary: 'Verify email OTP' })
  async verifyOtp(@Body() dto: { code: string }, @Req() req: any) {
    return this.authService.verifyOtp(req.user.id, dto.code);
  }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/setup')
  @ApiOperation({ summary: 'Setup MFA for the user' })
  async setupMfa(@Req() req: any) {
    return this.authService.setupMfa(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/verify')
  @Throttle({ short: { limit: 5, ttl: 60000 } }) // 5 MFA attempts per minute
  @ApiOperation({ summary: 'Verify and enable MFA' })
  async verifyMfa(@Body() dto: { code: string }, @Req() req: any) {
    return this.authService.verifyMfa(req.user.id, dto.code);
  }

  @Public()
  @HttpCode(200)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  async refresh(@Body() dto: { refreshToken: string }) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @SkipThrottle() // Don't throttle authenticated user checks
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user' })
  async me(@Req() req: any) {
    return req.user;
  }
}
