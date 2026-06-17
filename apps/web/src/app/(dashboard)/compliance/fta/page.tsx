'use client';

import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Globe, CheckCircle, TrendingUp } from 'lucide-react';

const agreements = [
  { name: 'USMCA', countries: 'USA, Canada, Mexico', savings: 'Up to 0%', products: '12,000+' },
  { name: 'US-Korea FTA', countries: 'USA, South Korea', savings: 'Up to 50%', products: '8,500+' },
  { name: 'US-Australia FTA', countries: 'USA, Australia', savings: 'Up to 0%', products: '6,200+' },
  { name: 'US-Singapore FTA', countries: 'USA, Singapore', savings: 'Up to 0%', products: '4,800+' },
];

export default function FTABenefitsPage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="FTA Benefits" subtitle="Maximize trade agreement savings" backHref="/compliance" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-[#154230]" />
            <div>
              <h3 className="text-[#101111] font-semibold">Free Trade Agreements</h3>
              <p className="text-sm text-[#4A4A4A]">Reduce or eliminate import duties</p>
            </div>
          </div>
          <p className="text-sm text-[#4A4A4A]">
            Check if your products qualify for preferential duty rates under US Free Trade Agreements.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-semibold mb-4">Available Agreements</h3>
          <div className="space-y-3">
            {agreements.map((fta) => (
              <div key={fta.name} className="p-4 bg-[#E6E2DA] rounded-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-[#101111]">{fta.name}</h4>
                    <p className="text-sm text-[#4A4A4A]">{fta.countries}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {fta.savings} duty
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-black/5">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-[#154230]" />
                    <span className="text-sm text-[#4A4A4A]">{fta.products} products</span>
                  </div>
                  <button className="ml-auto flex items-center gap-1 text-sm text-[#154230] font-medium">
                    <CheckCircle className="w-4 h-4" /> Check Eligibility
                  </button>
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
