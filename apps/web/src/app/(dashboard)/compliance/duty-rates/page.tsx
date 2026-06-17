'use client';

import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Search, RefreshCw, Globe } from 'lucide-react';
import { useState } from 'react';

const rates = [
  { code: '1006.30', desc: 'Rice', mfnRate: '5%', usmcaRate: 'Free', country: 'China' },
  { code: '5201.00', desc: 'Cotton', mfnRate: '4.4¢/kg', usmcaRate: 'Free', country: 'India' },
  { code: '7204.10', desc: 'Iron & Steel Scrap', mfnRate: 'Free', usmcaRate: 'Free', country: 'Japan' },
  { code: '8542.31', desc: 'Electronic ICs', mfnRate: '0%', usmcaRate: 'Free', country: 'Taiwan' },
];

export default function DutyRatesPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Duty Rates" subtitle="MFN tariff rates database" backHref="/compliance" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search HS code or product..."
                className="w-full pl-12 pr-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:outline-none focus:border-[#154230]"
              />
            </div>
            <button className="ml-3 p-3 bg-[#E6E2DA] rounded-xl">
              <RefreshCw className="w-5 h-5 text-[#4A4A4A]" />
            </button>
          </div>
          <p className="text-xs text-[#4A4A4A]">Updated hourly • 180+ countries</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-semibold mb-4">Popular HS Codes</h3>
          <div className="space-y-3">
            {rates.map((rate) => (
              <div key={rate.code} className="p-4 bg-[#E6E2DA] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#154230]">{rate.code}</span>
                    <span className="text-[#101111]">- {rate.desc}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#4A4A4A]">
                    <Globe className="w-3 h-3" />
                    {rate.country}
                  </div>
                </div>
                <div className="flex items-center gap-6 pt-2 border-t border-black/5">
                  <div>
                    <p className="text-xs text-[#4A4A4A]">MFN Rate</p>
                    <p className="font-bold text-[#101111]">{rate.mfnRate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A]">USMCA</p>
                    <p className="font-bold text-green-600">{rate.usmcaRate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
