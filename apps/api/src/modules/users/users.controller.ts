import { Controller, Get, Patch, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@Req() req: any) {
    return this.usersService.getProfile(req.user.id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateProfile(@Req() req: any, @Body() dto: any) {
    return this.usersService.updateProfile(req.user.id, dto);
  }

  @Delete('me')
  @ApiOperation({ summary: 'Delete current user account' })
  async deleteAccount(@Req() req: any) {
    return this.usersService.deleteAccount(req.user.id);
  }
}
