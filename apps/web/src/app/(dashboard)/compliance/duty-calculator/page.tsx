'use client';

import { useState, useMemo } from 'react';
import { Calculator, Info, ArrowRight, Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

// Real-ish duty rates based on common HS code chapters
const dutyRates: Record<string, Record<string, { rate: number; vat: number; notes: string }>> = {
  // Chapter 84-85: Machinery & Electronics (Common high-tech products)
  '84': { US: { rate: 0, vat: 8.25, notes: 'Machinery for data processing' }, EU: { rate: 2.2, vat: 19, notes: 'EU standard machinery rate' }, UK: { rate: 2.2, vat: 20, notes: 'UK standard machinery rate' } },
  '85': { US: { rate: 0, vat: 8.25, notes: 'Most electronics duty-free under ITA' }, EU: { rate: 0, vat: 19, notes: 'Electronics covered by ITA' }, UK: { rate: 0, vat: 20, notes: 'UK ITA coverage' } },
  // Chapter 61-62: Textiles & Apparel (Higher tariffs)
  '61': { US: { rate: 16.5, vat: 8.25, notes: 'Knitted apparel' }, EU: { rate: 12, vat: 19, notes: 'EU textile tariffs' }, UK: { rate: 12, vat: 20, notes: 'UK textile tariffs' } },
  '62': { US: { rate: 16.5, vat: 8.25, notes: 'Woven apparel' }, EU: { rate: 12, vat: 19, notes: 'EU textile tariffs' }, UK: { rate: 12, vat: 20, notes: 'UK textile tariffs' } },
  // Chapter 7-12: Agricultural products
  '07': { US: { rate: 0, vat: 8.25, notes: 'Edible vegetables' }, EU: { rate: 9.6, vat: 5, notes: 'EU agricultural tariffs vary' }, UK: { rate: 9.6, vat: 20, notes: 'UK agricultural tariffs' } },
  '10': { US: { rate: 0, vat: 8.25, notes: 'Cereals - some duty-free' }, EU: { rate: 12.8, vat: 5, notes: 'EU cereals tariffs' }, UK: { rate: 12.8, vat: 20, notes: 'UK cereals tariffs' } },
  // Chapter 72-83: Metals
  '72': { US: { rate: 0, vat: 8.25, notes: 'Iron and steel - some duty-free' }, EU: { rate: 2.5, vat: 19, notes: 'EU steel tariffs' }, UK: { rate: 2.5, vat: 20, notes: 'UK steel tariffs' } },
  '73': { US: { rate: 0, vat: 8.25, notes: 'Articles of iron/steel' }, EU: { rate: 2.7, vat: 19, notes: 'EU metal articles' }, UK: { rate: 2.7, vat: 20, notes: 'UK metal articles' } },
  // Chapter 87: Vehicles & Parts
  '87': { US: { rate: 2.5, vat: 8.25, notes: 'Motor vehicle parts' }, EU: { rate: 3.5, vat: 19, notes: 'EU auto parts' }, UK: { rate: 3.5, vat: 20, notes: 'UK auto parts' } },
  // Default rates for other chapters
  'default': { US: { rate: 5, vat: 8.25, notes: 'Standard MFN rate' }, EU: { rate: 5, vat: 19, notes: 'EU standard rate' }, UK: { rate: 5, vat: 20, notes: 'UK standard rate' } },
};

// Free Trade Agreements (simplified)
const tradeAgreements: Record<string, { countries: string[]; rateReduction: number; name: string }> = {
  'USMCA': { countries: ['US', 'CA', 'MX'], rateReduction: 100, name: 'USMCA (North America)' },
  'US-KR': { countries: ['US', 'KR'], rateReduction: 50, name: 'US-Korea FTA' },
  'US-JP': { countries: ['US', 'JP'], rateReduction: 30, name: 'US-Japan Digital Trade Agreement' },
};

export default function DutyCalculatorPage() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: 'US',
    hsCode: '',
    value: '',
    currency: 'USD',
    weight: '',
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<{
    dutyRate: number;
    dutyAmount: number;
    vatRate: number;
    vatAmount: number;
    processingFee: number;
    total: number;
    notes: string;
    agreement: { name: string; savings: number } | null;
  } | null>(null);

  const getChapterFromHS = (hsCode: string): string => {
    if (!hsCode) return 'default';
    const chapter = hsCode.split('.')[0];
    return dutyRates[chapter] ? chapter : 'default';
  };

  const getRates = (origin: string, destination: string) => {
    const chapter = getChapterFromHS(formData.hsCode);
    const rates = dutyRates[chapter] || dutyRates['default'];
    return rates[destination] || rates['US'];
  };

  const checkTradeAgreement = (origin: string, destination: string) => {
    for (const [key, agreement] of Object.entries(tradeAgreements)) {
      if (agreement.countries.includes(origin) && agreement.countries.includes(destination)) {
        return agreement;
      }
    }
    return null;
  };

  const handleCalculate = async () => {
    if (!formData.hsCode || !formData.value) return;

    setIsCalculating(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const rates = getRates(formData.origin, formData.destination);
    const value = parseFloat(formData.value) || 0;
    const agreement = checkTradeAgreement(formData.origin, formData.destination);

    let dutyRate = rates.rate;
    let vatRate = rates.vat;

    // Apply FTA benefits if applicable
    if (agreement) {
      dutyRate = rates.rate * (1 - agreement.rateReduction / 100);
    }

    const dutyAmount = value * (dutyRate / 100);
    const vatAmount = (value + dutyAmount) * (vatRate / 100);
    const processingFee = Math.min(Math.max(value * 0.0025, 25), 500); // 0.25% with min $25, max $500
    const total = value + dutyAmount + vatAmount + processingFee;

    setResults({
      dutyRate,
      dutyAmount,
      vatRate,
      vatAmount,
      processingFee,
      total,
      notes: rates.notes,
      agreement: agreement ? { name: agreement.name, savings: value * (rates.rate / 100) * (agreement.rateReduction / 100) } : null,
    });

    setIsCalculating(false);
  };

  const isValid = formData.hsCode.length >= 4 && parseFloat(formData.value) > 0;

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Duty Calculator"
        subtitle="Estimate import duties and taxes"
        backHref="/compliance"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Calculator Form */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          {/* Top accent border */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-[#154230]" />
              <h2 className="text-[#101111] font-bold">Calculate Import Duties</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">Country of Origin *</label>
                <select
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                >
                  <option value="">Select origin</option>
                  <option value="CN">🇨🇳 China</option>
                  <option value="IN">🇮🇳 India</option>
                  <option value="VN">🇻🇳 Vietnam</option>
                  <option value="TH">🇹🇭 Thailand</option>
                  <option value="MY">🇲🇾 Malaysia</option>
                  <option value="ID">🇮🇩 Indonesia</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="JP">🇯🇵 Japan</option>
                  <option value="KR">🇰🇷 South Korea</option>
                  <option value="MX">🇲🇽 Mexico</option>
                  <option value="CA">🇨🇦 Canada</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">Country of Import *</label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                >
                  <option value="US">🇺🇸 United States</option>
                  <option value="EU">🇪🇺 European Union</option>
                  <option value="UK">🇬🇧 United Kingdom</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">HS Code *</label>
                <input
                  type="text"
                  placeholder="e.g., 8542.31.00"
                  value={formData.hsCode}
                  onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                />
                <p className="text-[#4A4A4A] text-xs mt-1">
                  First 4 digits determine the duty rate
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">Shipment Value *</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">Weight (kg)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!isValid || isCalculating}
              className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                isValid && !isCalculating
                  ? 'bg-[#154230] text-white hover:bg-[#1a5a3a]'
                  : 'bg-[#154230]/50 text-white/50 cursor-not-allowed'
              }`}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Calculating...
                </>
              ) : (
                <>
                  Calculate Duties <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <>
            {/* Cost Breakdown */}
            <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

              <div className="space-y-3 relative z-10">
                <h3 className="text-[#101111] font-bold">Estimated Costs</h3>

                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-black/5">
                    <span className="text-[#4A4A4A] text-sm">Product Value</span>
                    <span className="text-[#101111] font-medium">{formData.currency} {parseFloat(formData.value).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/5">
                    <span className="text-[#4A4A4A] text-sm">
                      Import Duty ({results.dutyRate.toFixed(1)}%)
                      {results.agreement && (
                        <span className="ml-1 text-[#16A34A] text-xs">via {results.agreement.name}</span>
                      )}
                    </span>
                    <span className="text-[#101111] font-medium">{formData.currency} {results.dutyAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/5">
                    <span className="text-[#4A4A4A] text-sm">VAT/Tax ({results.vatRate}%)</span>
                    <span className="text-[#101111] font-medium">{formData.currency} {results.vatAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-black/5">
                    <span className="text-[#4A4A4A] text-sm">Processing Fee</span>
                    <span className="text-[#101111] font-medium">{formData.currency} {results.processingFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-[#101111] font-bold">Total Estimated Cost</span>
                    <span className="text-[#154230] font-bold text-xl">{formData.currency} {results.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {/* FTA Savings */}
                {results.agreement && (
                  <div className="bg-[#16A34A]/10 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#16A34A] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <p className="text-[#16A34A] font-semibold text-sm">You qualify for {results.agreement.name}!</p>
                      <p className="text-[#4A4A4A] text-xs">Saving approximately {formData.currency} {results.agreement.savings.toLocaleString('en-US', { minimumFractionDigits: 2 })} in duties</p>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="bg-[#E6E2DA]/50 rounded-xl p-3 flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#4A4A4A] mt-0.5 flex-shrink-0" />
                  <p className="text-[#4A4A4A] text-xs">{results.notes}</p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-[#5D1E21]/5 rounded-xl p-3">
              <p className="text-[#5D1E21] text-xs">
                ⚠️ These are estimates only. Actual duties may vary based on product classification, value declaration, and additional fees. Consult a customs broker for accurate quotes.
              </p>
            </div>
          </>
        )}
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
