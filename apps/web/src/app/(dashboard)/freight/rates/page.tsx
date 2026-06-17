'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { TrendingUp, TrendingDown, Clock, Ship, Plane, Truck } from 'lucide-react';

const rates = [
  { route: 'Shanghai → Los Angeles', type: 'sea' as const, rate: 2850, unit: '20FT', change: -2.5, updated: '2h ago' },
  { route: 'Shanghai → Los Angeles', type: 'sea' as const, rate: 5200, unit: '40FT', change: -1.8, updated: '2h ago' },
  { route: 'Shenzhen → New York', type: 'sea' as const, rate: 3450, unit: '20FT', change: 1.2, updated: '4h ago' },
  { route: 'Hong Kong → Rotterdam', type: 'sea' as const, rate: 3100, unit: '40FT', change: -3.1, updated: '1h ago' },
  { route: 'Shanghai → Los Angeles', type: 'air' as const, rate: 4.2, unit: 'per kg', change: 0.5, updated: '3h ago' },
  { route: 'Guangzhou → New York', type: 'air' as const, rate: 4.8, unit: 'per kg', change: -0.8, updated: '5h ago' },
];

const typeIcons = { sea: Ship, air: Plane, truck: Truck };
const typeColors = { sea: 'bg-teal-100 text-teal-700', air: 'bg-blue-100 text-blue-700', truck: 'bg-orange-100 text-orange-700' };

export default function RatesPage() {
  const [filter, setFilter] = useState<'all' | 'sea' | 'air'>('all');

  const filteredRates = rates.filter(r => filter === 'all' || r.type === filter);

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Freight Rates" subtitle="Live shipping rate updates" backHref="/freight" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Market Rates</p>
              <p className="text-sm text-white/70">Updated every hour</p>
            </div>
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Live</span>
          </div>
        </div>

        <div className="flex gap-2">
          {(['all', 'sea', 'air'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium ${
                filter === f ? 'bg-[#154230] text-white' : 'bg-white text-[#101111]'
              }`}
            >
              {f === 'all' ? 'All Rates' : f === 'sea' ? 'Ocean' : 'Air'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#101111] font-bold">Current Rates</h3>
            <span className="flex items-center gap-1 text-xs text-[#4A4A4A]">
              <Clock className="w-3 h-3" /> Updated recently
            </span>
          </div>

          <div className="space-y-2">
            {filteredRates.map((rate, index) => {
              const Icon = typeIcons[rate.type];
              return (
                <div key={index} className="bg-[#E6E2DA] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded ${typeColors[rate.type]}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <p className="text-[#101111] font-medium">{rate.route}</p>
                        <p className="text-xs text-[#4A4A4A]">{rate.unit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#154230]">
                        {rate.type === 'air' ? `$${rate.rate}` : `$${rate.rate.toLocaleString()}`}
                      </p>
                      <span className={`flex items-center gap-1 text-xs ${rate.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {rate.change < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                        {Math.abs(rate.change)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav activeItem="freight" />
    </div>
  );
}
