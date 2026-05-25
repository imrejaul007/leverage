import { Injectable } from '@nestjs/common';

export interface HsCodeEntry {
  code: string;
  description: string;
  chapter: number;
  duty: number;
  restrictions?: string[];
}

export interface HsCodeClassification {
  suggestedCodes: HsCodeEntry[];
  confidence: number;
}

export interface HsCodeRestriction {
  restricted: boolean;
  warnings: string[];
  requiresLicense: boolean;
  restrictions?: string[];
}

@Injectable()
export class HsCodeService {
  private mockHsCodes: HsCodeEntry[] = [
    { code: '8471.30', description: 'Portable digital automatic data processing machines', chapter: 84, duty: 0 },
    { code: '8471.41', description: 'Other digital automatic data processing machines', chapter: 84, duty: 0 },
    { code: '8471.50', description: 'Digital processing units, other', chapter: 84, duty: 0 },
    { code: '6109.10', description: 'T-shirts, singlets and other vests, of cotton, knitted or crocheted', chapter: 61, duty: 16.5 },
    { code: '6109.90', description: 'T-shirts of other textiles', chapter: 61, duty: 16.6 },
    { code: '6110.20', description: 'Sweaters, pullovers of cotton', chapter: 61, duty: 16.5 },
    { code: '8517.12', description: 'Telephones for cellular networks or wireless networks', chapter: 85, duty: 0 },
    { code: '8517.18', description: 'Other telephone sets', chapter: 85, duty: 0 },
    { code: '8517.62', description: 'Machines for reception, conversion and transmission of voice/images/data', chapter: 85, duty: 0 },
    { code: '9403.60', description: 'Other wooden furniture', chapter: 94, duty: 0 },
    { code: '9403.50', description: 'Wooden furniture of a kind used in the bedroom', chapter: 94, duty: 0 },
    { code: '9401.61', description: 'Upholstered seats with wooden frames', chapter: 94, duty: 0 },
    { code: '9503.00', description: 'Toys, scale models, puzzles', chapter: 95, duty: 0 },
    { code: '9504.50', description: 'Video game consoles and machines', chapter: 95, duty: 0 },
    { code: '6402.19', description: 'Sports footwear, rubber/plastic', chapter: 64, duty: 8 },
    { code: '6403.12', description: 'Ski-boots, cross-country footwear, rubber/plastic', chapter: 64, duty: 8 },
    { code: '7113.19', description: 'Jewelry of precious metal', chapter: 71, duty: 6.5 },
    { code: '9201.10', description: 'Upright pianos', chapter: 92, duty: 4 },
    { code: '0304.17', description: 'Frozen fish fillets', chapter: 3, duty: 6 },
    { code: '2204.21', description: 'Wine of fresh grapes in containers holding 2 liters or less', chapter: 22, duty: 6.3 },
  ];

  private countryRestrictions: Record<string, Record<string, HsCodeRestriction>> = {
    'IR': {
      '7113.19': { restricted: true, warnings: ['Import restricted by sanctions'], requiresLicense: true },
    },
    'KP': {
      '8517.12': { restricted: true, warnings: ['Sanctioned country'], requiresLicense: true },
    },
    'SY': {
      '*': { restricted: true, warnings: ['Comprehensive sanctions apply'], requiresLicense: true },
    },
  };

  async search(query: string): Promise<HsCodeEntry[]> {
    const normalizedQuery = query.toLowerCase();
    return this.mockHsCodes.filter(
      (hs) =>
        hs.code.includes(query) ||
        hs.description.toLowerCase().includes(normalizedQuery)
    );
  }

  async getByCode(code: string): Promise<HsCodeEntry | undefined> {
    return this.mockHsCodes.find((hs) => hs.code === code);
  }

  async classify(description: string): Promise<HsCodeClassification> {
    const keywords = description.toLowerCase().split(/\s+/).filter((k) => k.length > 2);
    const matches = this.mockHsCodes.filter((hs) =>
      keywords.some((k) => hs.description.toLowerCase().includes(k))
    );

    const suggestedCodes = matches.length > 0 ? matches : this.mockHsCodes.slice(0, 3);
    const confidence = matches.length > 0 ? Math.min(0.9, 0.5 + matches.length * 0.1) : 0.3;

    return {
      suggestedCodes,
      confidence,
    };
  }

  async getRestrictions(hsCode: string, countryCode: string): Promise<HsCodeRestriction> {
    const countryRes = this.countryRestrictions[countryCode];
    if (!countryRes) {
      return {
        restricted: false,
        warnings: ['Check local import regulations for this destination'],
        requiresLicense: false,
      };
    }

    const specificRes = countryRes[hsCode];
    if (specificRes) {
      return specificRes;
    }

    const wildcardRes = countryRes['*'];
    if (wildcardRes) {
      return wildcardRes;
    }

    return {
      restricted: false,
      warnings: [],
      requiresLicense: false,
    };
  }

  async getChapters(): Promise<number[]> {
    const chapters = [...new Set(this.mockHsCodes.map((hs) => hs.chapter))];
    return chapters.sort((a, b) => a - b);
  }

  async getByChapter(chapter: number): Promise<HsCodeEntry[]> {
    return this.mockHsCodes.filter((hs) => hs.chapter === chapter);
  }
}
