import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async create(@Body() dto: any, @Req() req: any) {
    return this.postsService.create(req.user.id, dto);
  }

  @Get()
  async findAll(@Query() filters: any) {
    return this.postsService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postsService.delete(id);
  }

  @Post(':id/like')
  async like(@Param('id') id: string, @Req() req: any) {
    return this.postsService.like(id, req.user.id);
  }

  @Delete(':id/like')
  async unlike(@Param('id') id: string, @Req() req: any) {
    return this.postsService.unlike(id, req.user.id);
  }

  @Post(':id/comments')
  async addComment(@Param('id') id: string, @Body() dto: any, @Req() req: any) {
    return this.postsService.addComment(id, req.user.id, dto);
  }

  @Get(':id/comments')
  async getComments(@Param('id') id: string) {
    return this.postsService.getComments(id);
  }
}
