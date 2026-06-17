'use client';

import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Search, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const results = [
  { code: '1006.30', desc: 'Rice, semi-milled or wholly milled', duty: '5%', unit: 'kg' },
  { code: '1006.10', desc: 'Rice in the husk (paddy)', duty: '5%', unit: 'kg' },
  { code: '1006.20', desc: 'Husked rice (cargo rice)', duty: '5%', unit: 'kg' },
];

export default function HSCodesearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="HS Code Search" subtitle="Find correct classifications" backHref="/compliance" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search HS code or product name..."
              className="w-full pl-12 pr-4 py-4 bg-[#E6E2DA] rounded-xl border border-black/5 focus:outline-none focus:border-[#154230]"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-semibold mb-4">Search Results</h3>
          <div className="space-y-3">
            {results.map((r) => (
              <div key={r.code} className="p-4 bg-[#E6E2DA] rounded-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-lg font-bold text-[#154230]">{r.code}</span>
                    <p className="text-[#101111] mt-1">{r.desc}</p>
                  </div>
                  <button className="p-2 hover:bg-white rounded-lg">
                    <Copy className="w-4 h-4 text-[#4A4A4A]" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-black/5">
                  <div>
                    <span className="text-xs text-[#4A4A4A]">MFN Duty</span>
                    <p className="font-medium text-[#101111]">{r.duty}</p>
                  </div>
                  <div>
                    <span className="text-xs text-[#4A4A4A]">Unit</span>
                    <p className="font-medium text-[#101111]">{r.unit}</p>
                  </div>
                  <div className="flex-1 text-right">
                    <CheckCircle className="w-5 h-5 text-green-600 inline" />
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
