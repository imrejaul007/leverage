import { Injectable } from '@nestjs/common';
import { HsCodeService } from './hs-code.service';
import { SanctionScreeningService } from './sanction-screening.service';
import { DutyCalculatorService } from './duty-calculator.service';

export interface ShipmentValidationDto {
  hsCode: string;
  destinationCountry: string;
  parties?: { name: string; country?: string }[];
  productDescription?: string;
  cargoValue?: number;
}

export interface ClassifyProductDto {
  description: string;
}

export interface CalculateDutyDto {
  hsCode: string;
  value: number;
  country: string;
  quantity?: number;
  currency?: string;
}

export interface CalculateLandedCostDto {
  hsCode: string;
  productValue: number;
  destinationCountry: string;
  shippingCost?: number;
  insuranceCost?: number;
  currency?: string;
}

export interface ScreenEntityDto {
  name: string;
  country?: string;
}

export interface ValidationResult {
  valid: boolean;
  checks: {
    hsCode: {
      restricted: boolean;
      warnings: string[];
      requiresLicense: boolean;
    };
    sanctions: {
      blocked: boolean;
      matches: any[];
      riskLevel: string;
    };
  };
  warnings: string[];
}

@Injectable()
export class ComplianceService {
  constructor(
    private hsCodeService: HsCodeService,
    private sanctionService: SanctionScreeningService,
    private dutyService: DutyCalculatorService,
  ) {}

  async classifyProduct(description: string) {
    return this.hsCodeService.classify(description);
  }

  async calculateDuty(dto: CalculateDutyDto) {
    return this.dutyService.calculate(dto);
  }

  async screenEntity(name: string, country?: string) {
    return this.sanctionService.screen(name, country);
  }

  async validateShipment(shipment: ShipmentValidationDto): Promise<ValidationResult> {
    const [hsCheck, sanctionsCheck] = await Promise.all([
      this.hsCodeService.getRestrictions(shipment.hsCode, shipment.destinationCountry),
      this.sanctionService.screenBatch(shipment.parties?.map((p) => p.name) || []),
    ]);

    const allWarnings = [
      ...hsCheck.warnings,
      ...(sanctionsCheck.matches?.length > 0
        ? sanctionsCheck.matches.map((m) => `Sanction match: ${m.name}`)
        : []),
    ];

    return {
      valid: !hsCheck.restricted && !sanctionsCheck.blocked,
      checks: {
        hsCode: hsCheck,
        sanctions: sanctionsCheck,
      },
      warnings: allWarnings,
    };
  }

  async calculateLandedCost(dto: CalculateLandedCostDto) {
    return this.dutyService.calculateLandedCost(dto);
  }

  async getCountryRestrictions(countryCode: string) {
    return this.dutyService.getCountryRules(countryCode);
  }

  async searchHsCodes(query: string) {
    return this.hsCodeService.search(query);
  }

  async getHsCode(code: string) {
    return this.hsCodeService.getByCode(code);
  }
}
