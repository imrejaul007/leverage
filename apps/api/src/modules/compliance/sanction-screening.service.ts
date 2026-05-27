import { Injectable, Logger } from '@nestjs/common';

export interface SanctionMatch {
  name: string;
  lists: string[];
  country: string;
  score: number;
}

export interface SanctionScreeningResult {
  blocked: boolean;
  match: SanctionMatch | null;
  riskScore: number;
  lists: string[];
}

export interface BatchScreeningResult {
  blocked: boolean;
  matches: SanctionMatch[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  totalScreened: number;
}

@Injectable()
export class SanctionScreeningService {
  private readonly logger = new Logger(SanctionScreeningService.name);

  // Production sanctions lists should come from a reliable external source
  // This is a mock for demonstration - replace with actual API integration
  private mockSanctions: SanctionMatch[] = [
    { name: 'Bad Actor Inc', lists: ['OFAC_SDN'], country: 'IR', score: 100 },
    { name: 'Evil Corp', lists: ['UN_SECURITY_COUNCIL'], country: 'KP', score: 100 },
    { name: 'Restricted Industries LLC', lists: ['BIS_ENTITY_LIST'], country: 'CN', score: 85 },
    { name: 'Blocked Trading Co', lists: ['OFAC_SDN', 'UN_SECURITY_COUNCIL'], country: 'RU', score: 100 },
    { name: 'Sanctioned Entity XYZ', lists: ['EU_CONSOLIDATED'], country: 'SY', score: 100 },
    { name: 'Defense Contractor One', lists: ['ITAR_DEBAR'], country: 'US', score: 90 },
  ];

  // High-risk countries requiring enhanced due diligence or complete blocking
  private highRiskCountries = ['IR', 'KP', 'SY', 'CU', 'VE', 'RU'];
  private mediumRiskCountries = ['BY', 'MM', 'ZW'];

  // Threshold for automatic blocking (score >= 80)
  private readonly BLOCK_THRESHOLD = 80;

  /**
   * Screen a single entity (company/person) against sanctions lists
   */
  async screen(name: string, country?: string): Promise<SanctionScreeningResult> {
    if (!name || name.trim().length === 0) {
      throw new Error('Entity name is required for screening');
    }

    const normalized = name.toLowerCase().trim();

    // Fuzzy matching with higher confidence requirements
    // Only exact matches or close matches (not substring matches that could cause false positives)
    const match = this.mockSanctions.find((s) => {
      const sNameLower = s.name.toLowerCase();
      // Use Levenshtein-like matching for better accuracy
      const similarity = this.calculateSimilarity(normalized, sNameLower);
      // Only block if similarity is >= 0.85 (high confidence match)
      return similarity >= 0.85 || sNameLower === normalized;
    });

    if (match) {
      this.logger.warn(`Sanctions match found for "${name}": ${match.name} on lists ${match.lists.join(', ')}`);
      return {
        blocked: true,
        match,
        riskScore: match.score,
        lists: match.lists,
      };
    }

    // Country-based risk scoring
    let baseRiskScore = 0;
    if (country) {
      const normalizedCountry = country.toUpperCase();
      if (this.highRiskCountries.includes(normalizedCountry)) {
        // High-risk country: flag but don't auto-block without name match
        // A company in Iran isn't necessarily sanctioned
        baseRiskScore = 50; // Elevated but not blocking
        this.logger.log(`High-risk country detected: ${country}`);
      } else if (this.mediumRiskCountries.includes(normalizedCountry)) {
        baseRiskScore = 30;
      }
    }

    return {
      blocked: false,
      match: null,
      riskScore: baseRiskScore,
      lists: [],
    };
  }

  /**
   * Screen multiple entities in batch
   */
  async screenBatch(entities: string[]): Promise<BatchScreeningResult> {
    if (!entities || entities.length === 0) {
      return {
        blocked: false,
        matches: [],
        riskLevel: 'LOW',
        totalScreened: 0,
      };
    }

    const results = await Promise.all(entities.map((e) => this.screen(e)));
    const blocked = results.filter((r) => r.blocked).map((r) => r.match!);

    // Calculate risk level based on max score and blocked matches
    const maxScore = results.length > 0 ? Math.max(...results.map((r) => r.riskScore)) : 0;
    const hasBlockedMatches = blocked.length > 0;

    let riskLevel: BatchScreeningResult['riskLevel'] = 'LOW';
    if (hasBlockedMatches) {
      riskLevel = 'CRITICAL'; // Any blocked match is critical
    } else if (maxScore >= 50) {
      riskLevel = 'HIGH';
    } else if (maxScore >= 30) {
      riskLevel = 'MEDIUM';
    }

    return {
      blocked: hasBlockedMatches,
      matches: blocked,
      riskLevel,
      totalScreened: entities.length,
    };
  }

  /**
   * Screen by country only (without entity name)
   */
  async screenByCountry(country: string): Promise<{ riskLevel: string; restricted: boolean; requiresEnhancedDueDiligence: boolean }> {
    const normalizedCountry = country.toUpperCase();

    if (this.highRiskCountries.includes(normalizedCountry)) {
      return {
        riskLevel: 'HIGH',
        restricted: false, // Not blocked, but requires enhanced due diligence
        requiresEnhancedDueDiligence: true,
      };
    }
    if (this.mediumRiskCountries.includes(normalizedCountry)) {
      return {
        riskLevel: 'MEDIUM',
        restricted: false,
        requiresEnhancedDueDiligence: true,
      };
    }
    return {
      riskLevel: 'LOW',
      restricted: false,
      requiresEnhancedDueDiligence: false,
    };
  }

  /**
   * Get list of blocked/regulated sanctions lists
   */
  async getBlockedLists(): Promise<string[]> {
    return [
      'OFAC_SDN',
      'OFAC_CONSENT',
      'OFAC_FSE',
      'OFAC_IFA',
      'UN_SECURITY_COUNCIL',
      'EU_CONSOLIDATED',
      'BIS_ENTITY_LIST',
      'ITAR_DEBAR',
      'UK_CONSULTATIVE_LIST',
      'UK_DUAL_USE',
    ];
  }

  /**
   * Calculate string similarity using simple Levenshtein-based approach
   */
  private calculateSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1;
    if (str1.length === 0 || str2.length === 0) return 0;

    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    const longerLength = longer.length;
    const editDistance = this.levenshteinDistance(longer, shorter);

    return (longerLength - editDistance) / longerLength;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const costs: number[] = [];
    for (let i = 0; i <= str1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (str1.charAt(i - 1) !== str2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) {
        costs[str2.length] = lastValue;
      }
    }
    return costs[str2.length];
  }
}
