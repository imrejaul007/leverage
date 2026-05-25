import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InviteMemberDto } from './dto/invite-member.dto';

@ApiTags('Companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  async create(@Body() dto: CreateCompanyDto, @Req() req: any) {
    return this.companiesService.create(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all companies with optional filters' })
  async findAll(@Query() filters: any) {
    return this.companiesService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get company by ID' })
  async findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update company details' })
  async update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company' })
  async delete(@Param('id') id: string) {
    return this.companiesService.delete(id);
  }

  @Post(':id/invite')
  @ApiOperation({ summary: 'Invite a user to the company' })
  async invite(@Param('id') id: string, @Body() dto: InviteMemberDto) {
    return this.companiesService.inviteMember(id, dto);
  }

  @Get(':id/members')
  @ApiOperation({ summary: 'Get company members' })
  async getMembers(@Param('id') id: string) {
    return this.companiesService.getMembers(id);
  }

  @Delete(':id/members/:userId')
  @ApiOperation({ summary: 'Remove a member from the company' })
  async removeMember(@Param('id') id: string, @Param('userId') userId: string) {
    return this.companiesService.removeMember(id, userId);
  }
}
