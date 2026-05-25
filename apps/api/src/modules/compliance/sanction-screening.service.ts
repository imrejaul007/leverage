import { Injectable } from '@nestjs/common';

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
  private mockSanctions: SanctionMatch[] = [
    { name: 'Bad Actor Inc', lists: ['OFAC_SDN'], country: 'IR', score: 100 },
    { name: 'Evil Corp', lists: ['UN_SECURITY_COUNCIL'], country: 'KP', score: 100 },
    { name: 'Restricted Industries LLC', lists: ['BIS_ENTITY_LIST'], country: 'CN', score: 85 },
    { name: 'Blocked Trading Co', lists: ['OFAC_SDN', 'UN_SECURITY_COUNCIL'], country: 'RU', score: 100 },
    { name: 'Sanctioned Entity XYZ', lists: ['EU_CONSOLIDATED'], country: 'SY', score: 100 },
    { name: 'Defense Contractor One', lists: ['ITAR_DEBAR'], country: 'US', score: 90 },
  ];

  private highRiskCountries = ['IR', 'KP', 'SY', 'CU', 'VE', 'RU'];
  private mediumRiskCountries = ['BY', 'MM', 'ZW'];

  async screen(name: string, country?: string): Promise<SanctionScreeningResult> {
    const normalized = name.toLowerCase().trim();
    const match = this.mockSanctions.find((s) => {
      const sNameLower = s.name.toLowerCase();
      return (
        sNameLower === normalized ||
        normalized.includes(sNameLower) ||
        sNameLower.includes(normalized)
      );
    });

    if (match) {
      return {
        blocked: true,
        match,
        riskScore: match.score,
        lists: match.lists,
      };
    }

    let baseRiskScore = 0;
    if (country) {
      if (this.highRiskCountries.includes(country)) {
        baseRiskScore = 70;
      } else if (this.mediumRiskCountries.includes(country)) {
        baseRiskScore = 40;
      }
    }

    return {
      blocked: false,
      match: null,
      riskScore: baseRiskScore,
      lists: [],
    };
  }

  async screenBatch(entities: string[]): Promise<BatchScreeningResult> {
    const results = await Promise.all(entities.map((e) => this.screen(e)));
    const blocked = results.filter((r) => r.blocked).map((r) => r.match!);

    let riskLevel: BatchScreeningResult['riskLevel'] = 'LOW';
    const maxScore = Math.max(...results.map((r) => r.riskScore));

    if (maxScore >= 100) {
      riskLevel = 'CRITICAL';
    } else if (maxScore >= 70) {
      riskLevel = 'HIGH';
    } else if (maxScore >= 40) {
      riskLevel = 'MEDIUM';
    }

    return {
      blocked: blocked.length > 0,
      matches: blocked,
      riskLevel,
      totalScreened: entities.length,
    };
  }

  async screenByCountry(country: string): Promise<{ riskLevel: string; restricted: boolean }> {
    if (this.highRiskCountries.includes(country)) {
      return { riskLevel: 'HIGH', restricted: true };
    }
    if (this.mediumRiskCountries.includes(country)) {
      return { riskLevel: 'MEDIUM', restricted: false };
    }
    return { riskLevel: 'LOW', restricted: false };
  }

  async getBlockedLists(): Promise<string[]> {
    return [
      'OFAC_SDN',
      'OFAC_CONSENT',
      'UN_SECURITY_COUNCIL',
      'EU_CONSOLIDATED',
      'BIS_ENTITY_LIST',
      'ITAR_DEBAR',
      'UK_CONSULTATIVE_LIST',
    ];
  }
}
