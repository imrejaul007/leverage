import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { KycService } from './kyc.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VerifyGstDto } from './dto/verify-gst.dto';
import { VerifyIecDto } from './dto/verify-iec.dto';
import { UploadDocumentDto } from './dto/upload-document.dto';

@ApiTags('KYC')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('kyc')
export class KycController {
  constructor(private kycService: KycService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get KYC verification status for the company' })
  async getStatus(@Req() req: any) {
    const company = await req.user.company;
    return this.kycService.getStatus(company.id);
  }

  @Post('gst/verify')
  @ApiOperation({ summary: 'Verify GSTIN for the company' })
  async verifyGst(@Body() dto: VerifyGstDto, @Req() req: any) {
    const company = await req.user.company;
    return this.kycService.verifyGst(company.id, dto.gstin);
  }

  @Post('iec/verify')
  @ApiOperation({ summary: 'Verify IEC for the company' })
  async verifyIec(@Body() dto: VerifyIecDto, @Req() req: any) {
    const company = await req.user.company;
    return this.kycService.verifyIec(company.id, dto.iec);
  }

  @Post('documents/upload')
  @ApiOperation({ summary: 'Upload a KYC document' })
  async uploadDocument(@Body() dto: UploadDocumentDto, @Req() req: any) {
    const company = await req.user.company;
    return this.kycService.uploadDocument(company.id, dto);
  }

  @Get('documents')
  @ApiOperation({ summary: 'Get all KYC documents for the company' })
  async getDocuments(@Req() req: any) {
    const company = await req.user.company;
    return this.kycService.getDocuments(company.id);
  }

  @Post('submit')
  @ApiOperation({ summary: 'Submit KYC for review' })
  async submit(@Req() req: any) {
    const company = await req.user.company;
    return this.kycService.submitForReview(company.id);
  }
}
