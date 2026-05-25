import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Headers,
  UseGuards,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  RawBodyRequest,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import {
  SubscribeDto,
  UpdateSubscriptionDto,
  AddPaymentMethodDto,
  WebhookPayloadDto,
} from './dto/billing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // ============================================
  // SUBSCRIPTION ENDPOINTS
  // ============================================

  @Post('subscribe')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new subscription' })
  async subscribe(
    @CurrentUser('companyId') companyId: string,
    @Body(new ValidationPipe({ transform: true })) dto: SubscribeDto,
  ) {
    return this.billingService.createSubscription(companyId, dto);
  }

  @Get('subscription')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current subscription' })
  async getSubscription(@CurrentUser('companyId') companyId: string) {
    return this.billingService.getSubscription(companyId);
  }

  @Patch('subscription')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update subscription' })
  async updateSubscription(
    @CurrentUser('companyId') companyId: string,
    @Body(new ValidationPipe({ transform: true })) dto: UpdateSubscriptionDto,
  ) {
    return this.billingService.updateSubscription(companyId, dto);
  }

  @Delete('subscription')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel subscription' })
  async cancelSubscription(@CurrentUser('companyId') companyId: string) {
    return this.billingService.cancelSubscription(companyId);
  }

  @Get('subscription/summary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get billing summary' })
  async getBillingSummary(@CurrentUser('companyId') companyId: string) {
    return this.billingService.getBillingSummary(companyId);
  }

  // ============================================
  // PLANS ENDPOINTS
  // ============================================

  @Get('plans')
  @ApiOperation({ summary: 'Get available subscription plans' })
  async getPlans() {
    return this.billingService.getPlans();
  }

  @Get('plans/:id')
  @ApiOperation({ summary: 'Get plan details' })
  async getPlan(@Param('id') id: string) {
    return this.billingService.getPlan(id);
  }

  // ============================================
  // INVOICES ENDPOINTS
  // ============================================

  @Get('invoices')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all invoices' })
  async getInvoices(@CurrentUser('companyId') companyId: string) {
    return this.billingService.getInvoices(companyId);
  }

  @Get('invoices/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get invoice details' })
  async getInvoice(
    @Param('id') id: string,
    @CurrentUser('companyId') companyId: string,
  ) {
    return this.billingService.getInvoice(id, companyId);
  }

  // ============================================
  // PAYMENT METHODS ENDPOINTS
  // ============================================

  @Post('payment-methods')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a payment method' })
  async addPaymentMethod(
    @CurrentUser('companyId') companyId: string,
    @Body(new ValidationPipe({ transform: true })) dto: AddPaymentMethodDto,
  ) {
    return this.billingService.addPaymentMethod(companyId, dto);
  }

  @Get('payment-methods')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List payment methods' })
  async getPaymentMethods(@CurrentUser('companyId') companyId: string) {
    return this.billingService.getPaymentMethods(companyId);
  }

  @Delete('payment-methods/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remove a payment method' })
  async removePaymentMethod(@Param('id') id: string) {
    return this.billingService.removePaymentMethod(id);
  }

  @Post('payment-methods/:id/default')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Set payment method as default' })
  async setDefaultPaymentMethod(@Param('id') id: string) {
    return this.billingService.setDefaultPaymentMethod(id);
  }

  // ============================================
  // WEBHOOK ENDPOINT
  // ============================================

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Stripe webhook endpoint' })
  async handleWebhook(
    @Body() payload: WebhookPayloadDto,
    @Headers('stripe-signature') signature: string,
  ) {
    // In production, verify the Stripe signature
    return this.billingService.handleWebhook(payload.type, payload as unknown as Record<string, unknown>);
  }
}
