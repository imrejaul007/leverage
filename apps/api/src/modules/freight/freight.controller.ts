import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { FreightService } from './freight.service';

@ApiTags('Freight')
@Controller('freight')
export class FreightController {
  constructor(private readonly freightService: FreightService) {}

  @Public()
  @Post('quotes')
  async getQuotes(@Body() dto: any) {
    return this.freightService.getQuotes(dto, 'user', 'company');
  }

  @Public()
  @Get('quotes/:id')
  async getQuote(@Param('id') id: string) {
    return this.freightService.getQuoteById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('quotes/:id/book')
  async bookQuote(@Param('id') id: string) {
    return this.freightService.bookFreight({ quoteId: id } as any, 'user', 'company');
  }

  @Public()
  @Get('carriers')
  async getCarriers() {
    return this.freightService.listCarriers();
  }

  @Public()
  @Get('carriers/:id')
  async getCarrier(@Param('id') id: string) {
    return this.freightService.getCarrierById(id);
  }
}
