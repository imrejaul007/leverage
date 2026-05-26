import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator';

@ApiTags('Companies')
@ApiBearerAuth()
@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  async create(
    @Body() dto: CreateCompanyDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.companiesService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all companies with optional filters' })
  async findAll(@Query() filters: { type?: string; status?: string; city?: string; state?: string; country?: string }) {
    return this.companiesService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by ID' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.companiesService.findOneWithAccessCheck(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update company details' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.companiesService.update(id, dto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company' })
  async delete(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.companiesService.delete(id, user.id);
  }

  @Post(':id/invite')
  @ApiOperation({ summary: 'Invite a user to the company' })
  async invite(
    @Param('id') id: string,
    @Body() dto: InviteMemberDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.companiesService.inviteMember(id, dto, user.id);
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'Get company members' })
  async getMembers(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.companiesService.getMembers(id, user.id);
  }

  @Delete(':id/members/:userId')
  @ApiOperation({ summary: 'Remove a member from the company' })
  async removeMember(
    @Param('id') id: string,
    @Param('userId') targetUserId: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.companiesService.removeMember(id, targetUserId, user.id);
  }
}
