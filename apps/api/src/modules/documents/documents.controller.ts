import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req, Res, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { DocumentsService, GenerateDocumentDto, SignDocumentDto } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DocumentCategory, DocumentStatus } from './entities/trade-document.entity';

@ApiTags('Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post('generate')
  @HttpCode(201)
  @ApiOperation({ summary: 'Generate a new trade document' })
  @ApiResponse({ status: 201, description: 'Document generated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async generate(@Body() dto: GenerateDocumentDto, @Req() req: any) {
    return this.documentsService.generate(req.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents for the authenticated user' })
  @ApiQuery({ name: 'type', required: false, enum: DocumentCategory })
  @ApiQuery({ name: 'status', required: false, enum: DocumentStatus })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  async findAll(
    @Query('type') type: DocumentCategory,
    @Query('status') status: DocumentStatus,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Req() req: any,
  ) {
    return this.documentsService.findAll({
      userId: req.user.id,
      type,
      status,
      limit,
      offset,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific document by ID' })
  @ApiResponse({ status: 200, description: 'Document found' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Download a document' })
  @ApiResponse({ status: 302, description: 'Redirect to document URL' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async download(@Param('id') id: string, @Res() res: any) {
    const { url, name } = await this.documentsService.download(id);
    res.redirect(302, url);
  }

  @Post(':id/sign')
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign a document' })
  @ApiResponse({ status: 200, description: 'Document signed successfully' })
  @ApiResponse({ status: 400, description: 'Cannot sign document in current state' })
  async sign(@Param('id') id: string, @Body() dto: SignDocumentDto, @Req() req: any) {
    return this.documentsService.sign(id, req.user.id, dto);
  }

  @Post(':id/validate')
  @HttpCode(200)
  @ApiOperation({ summary: 'Validate a document' })
  @ApiResponse({ status: 200, description: 'Document validated successfully' })
  async validate(@Param('id') id: string) {
    return this.documentsService.validate(id);
  }

  @Patch(':id/archive')
  @HttpCode(200)
  @ApiOperation({ summary: 'Archive a document' })
  @ApiResponse({ status: 200, description: 'Document archived successfully' })
  async archive(@Param('id') id: string, @Req() req: any) {
    return this.documentsService.archive(id, req.user.id);
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get all documents for an order' })
  async getByOrder(@Param('orderId') orderId: string) {
    return this.documentsService.getByOrder(orderId);
  }

  @Get('shipment/:shipmentId')
  @ApiOperation({ summary: 'Get all documents for a shipment' })
  async getByShipment(@Param('shipmentId') shipmentId: string) {
    return this.documentsService.getByShipment(shipmentId);
  }
}
