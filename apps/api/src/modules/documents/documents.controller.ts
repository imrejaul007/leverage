import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req, Res, HttpCode } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator';
import { Response } from 'express';

interface GenerateDocumentDto {
  documentType: string;
  sellerName: string;
  sellerAddress: string;
  sellerCity: string;
  sellerCountry: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerTaxId: string;
  buyerName: string;
  buyerAddress: string;
  buyerCity: string;
  buyerCountry: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerTaxId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  originCountry: string;
  destinationCountry: string;
  portOfLoading: string;
  portOfDischarge: string;
  shippingMethod: string;
  vesselName: string;
  voyageNumber: string;
  currency: string;
  paymentTerms: string;
  totalAmount: number;
  lineItems: Array<{
    description: string;
    hsCode: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    total: number;
  }>;
}

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
  async generate(@Body() dto: GenerateDocumentDto, @CurrentUser() user: CurrentUserPayload) {
    const pdfBuffer = await this.documentsService.generateDocument(user.id, dto);

    return {
      success: true,
      message: 'Document generated successfully',
      documentType: dto.documentType,
      invoiceNumber: dto.invoiceNumber,
      data: pdfBuffer.toString('base64'),
    };
  }

  @Post('generate-pdf')
  @HttpCode(200)
  @ApiOperation({ summary: 'Generate and download a trade document as PDF' })
  async generatePDF(
    @Body() dto: GenerateDocumentDto,
    @CurrentUser() user: CurrentUserPayload,
    @Res() res: Response,
  ) {
    const pdfBuffer = await this.documentsService.generateDocument(user.id, dto);

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="${dto.documentType}-${dto.invoiceNumber}.html"`);
    res.send(pdfBuffer);
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents for the authenticated user' })
  async findAll(
    @CurrentUser() user: CurrentUserPayload,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return this.documentsService.findAll({
      userId: user.id,
      limit,
      offset,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific document by ID' })
  @ApiResponse({ status: 200, description: 'Document found' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.documentsService.findOne(id, user.id);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Download a document' })
  @ApiResponse({ status: 302, description: 'Redirect to document URL' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async download(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
    @Res() res: { redirect: (code: number, url: string) => void },
  ) {
    const { url, name } = await this.documentsService.download(id, user.id);
    res.redirect(302, url);
  }

  @Post(':id/sign')
  @HttpCode(200)
  @ApiOperation({ summary: 'Sign a document' })
  @ApiResponse({ status: 200, description: 'Document signed successfully' })
  @ApiResponse({ status: 400, description: 'Cannot sign document in current state' })
  async sign(
    @Param('id') id: string,
    @Body() dto: any,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.documentsService.sign(id, user.id, dto);
  }

  @Post(':id/validate')
  @HttpCode(200)
  @ApiOperation({ summary: 'Validate a document' })
  @ApiResponse({ status: 200, description: 'Document validated successfully' })
  async validate(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.documentsService.validate(id, user.id);
  }

  @Patch(':id/archive')
  @HttpCode(200)
  @ApiOperation({ summary: 'Archive a document' })
  @ApiResponse({ status: 200, description: 'Document archived successfully' })
  async archive(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.documentsService.archive(id, user.id);
  }

  @Get('order/:orderId')
  @ApiOperation({ summary: 'Get all documents for an order' })
  async getByOrder(
    @Param('orderId') orderId: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.documentsService.getByOrder(orderId, user.id);
  }

  @Get('shipment/:shipmentId')
  @ApiOperation({ summary: 'Get all documents for a shipment' })
  async getByShipment(
    @Param('shipmentId') shipmentId: string,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.documentsService.getByShipment(shipmentId, user.id);
  }
}
