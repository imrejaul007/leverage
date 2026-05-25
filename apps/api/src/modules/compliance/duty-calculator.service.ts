import { Injectable } from '@nestjs/common';

export interface CountryRates {
  basicDuty: number;
  gst?: number;
  vat?: number;
  additionalDuty?: number;
  processingFee?: number;
  consumptionTax?: number;
}

export interface DutyCalculationResult {
  hsCode: string;
  country: string;
  cargoValue: number;
  basicDuty: number;
  additionalDuty: number;
  gst: number;
  totalDuty: number;
  cif: number;
  landedCost: number;
  currency: string;
}

export interface LandedCostResult {
  productCost: number;
  shippingCost: number;
  insuranceCost: number;
  duty: number;
  taxes: number;
  customsFees: number;
  totalLandedCost: number;
  currency: string;
  breakdown: {
    cif: number;
    dutyRate: number;
    taxRate: number;
  };
}

export interface CountryRules {
  country: string;
  rules: CountryRates;
  restrictions: string[];
  requiredDocuments: string[];
  leadTime?: string;
}

@Injectable()
export class DutyCalculatorService {
  private mockRates: Record<string, CountryRates> = {
    'US': {
      basicDuty: 5,
      processingFee: 0.3464,
    },
    'IN': {
      basicDuty: 10,
      gst: 18,
      processingFee: 1,
    },
    'CN': {
      basicDuty: 6,
      vat: 13,
      processingFee: 0.5,
    },
    'AE': {
      basicDuty: 5,
      vat: 5,
      processingFee: 0.25,
    },
    'GB': {
      basicDuty: 4.2,
      vat: 20,
      processingFee: 0,
    },
    'DE': {
      basicDuty: 4.5,
      vat: 19,
      processingFee: 0,
    },
    'FR': {
      basicDuty: 4.5,
      vat: 20,
      processingFee: 0,
    },
    'JP': {
      basicDuty: 0,
      consumptionTax: 10,
      processingFee: 0,
    },
    'AU': {
      basicDuty: 5,
      gst: 10,
      processingFee: 50,
    },
    'CA': {
      basicDuty: 0,
      gst: 5,
      processingFee: 0,
    },
  };

  private countryRules: Record<string, { restrictions: string[]; requiredDocuments: string[]; leadTime?: string }> = {
    'US': {
      restrictions: ['FDA approval for food/drugs', 'FCC for electronics'],
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Bill of Lading'],
      leadTime: '5-10 business days',
    },
    'IN': {
      restrictions: ['BIS certification for electronics', 'FSSAI for food products'],
      requiredDocuments: ['Commercial Invoice', 'Bill of Entry', 'Packing List'],
      leadTime: '7-15 business days',
    },
    'CN': {
      restrictions: ['CCC certification', 'Import license required for certain goods'],
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Import Declaration'],
      leadTime: '3-7 business days',
    },
    'AE': {
      restrictions: [],
      requiredDocuments: ['Commercial Invoice', 'Certificate of Origin', 'Packing List'],
      leadTime: '2-5 business days',
    },
  };

  async calculate(dto: {
    hsCode: string;
    value: number;
    country: string;
    quantity?: number;
    currency?: string;
  }): Promise<DutyCalculationResult> {
    const { hsCode, value, country, quantity = 1, currency = 'USD' } = dto;
    const rates = this.mockRates[country] || { basicDuty: 5, processingFee: 1 };

    const basicDuty = value * (rates.basicDuty / 100);
    const additionalDuty = 0; // Could be extended for anti-dumping duties
    const cif = value + basicDuty + additionalDuty;
    const gst = cif * ((rates.gst || rates.vat || 0) / 100);
    const processingFee = rates.processingFee || 0;
    const totalDuty = basicDuty + additionalDuty + gst + processingFee;

    return {
      hsCode,
      country,
      cargoValue: value,
      basicDuty,
      additionalDuty,
      gst,
      totalDuty,
      cif,
      landedCost: value + totalDuty,
      currency,
    };
  }

  async calculateLandedCost(dto: {
    hsCode: string;
    productValue: number;
    destinationCountry: string;
    shippingCost?: number;
    insuranceCost?: number;
    currency?: string;
  }): Promise<LandedCostResult> {
    const {
      hsCode,
      productValue,
      destinationCountry,
      shippingCost = 0,
      insuranceCost = 0,
      currency = 'USD',
    } = dto;

    const dutyCalc = await this.calculate({
      hsCode,
      value: productValue,
      country: destinationCountry,
    });

    const rates = this.mockRates[destinationCountry] || { basicDuty: 5 };
    const customsFees = rates.processingFee || 0;

    const totalLandedCost = productValue + shippingCost + insuranceCost + dutyCalc.totalDuty;

    return {
      productCost: productValue,
      shippingCost,
      insuranceCost,
      duty: dutyCalc.basicDuty + dutyCalc.additionalDuty,
      taxes: dutyCalc.gst,
      customsFees,
      totalLandedCost,
      currency,
      breakdown: {
        cif: dutyCalc.cif,
        dutyRate: rates.basicDuty,
        taxRate: rates.gst || rates.vat || 0,
      },
    };
  }

  async getCountryRules(countryCode: string): Promise<CountryRules> {
    const rates = this.mockRates[countryCode] || { basicDuty: 5 };
    const rules = this.countryRules[countryCode] || {
      restrictions: [],
      requiredDocuments: ['Commercial Invoice', 'Packing List'],
    };

    return {
      country: countryCode,
      rules: rates,
      restrictions: rules.restrictions,
      requiredDocuments: rules.requiredDocuments,
      leadTime: rules.leadTime,
    };
  }

  async getSupportedCountries(): Promise<string[]> {
    return Object.keys(this.mockRates);
  }

  async compareCountries(dto: {
    hsCode: string;
    value: number;
    countries: string[];
    currency?: string;
  }): Promise<{ country: string; landedCost: number; duty: number }[]> {
    const results = await Promise.all(
      dto.countries.map((country) =>
        this.calculate({ ...dto, country }).then((calc) => ({
          country,
          landedCost: calc.landedCost,
          duty: calc.totalDuty,
        }))
      )
    );

    return results.sort((a, b) => a.landedCost - b.landedCost);
  }
}
