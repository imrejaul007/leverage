import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async create(@Body() dto: any, @Req() req: any) {
    return this.productsService.create(req.user.companyId, dto);
  }

  @Get()
  async findAll(@Query() filters: any) {
    return this.productsService.findAll(filters);
  }

  @Get('search')
  async search(@Query('q') query: string, @Query() filters: any) {
    return this.productsService.search(query, filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @Post(':id/variants')
  async createVariant(@Param('id') id: string, @Body() dto: any) {
    return this.productsService.createVariant(id, dto);
  }

  @Patch(':id/publish')
  async publish(@Param('id') id: string) {
    return this.productsService.update(id, { isPublished: true });
  }
}
