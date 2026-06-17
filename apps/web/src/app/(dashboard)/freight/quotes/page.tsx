'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Search, Plane, Ship, Truck, Clock, Shield, Star, Filter, ArrowRight, Check } from 'lucide-react';

interface FreightQuote {
  id: string;
  carrier: string;
  carrierLogo: string;
  type: 'air' | 'sea' | 'truck';
  price: number;
  currency: string;
  transitDays: number;
  departure: string;
  arrival: string;
  rating: number;
  reviews: number;
  features: string[];
  recommended?: boolean;
}

const quotes: FreightQuote[] = [
  {
    id: '1',
    carrier: 'FedEx',
    carrierLogo: 'F',
    type: 'air',
    price: 2450,
    currency: 'USD',
    transitDays: 3,
    departure: 'Jun 20',
    arrival: 'Jun 23',
    rating: 4.8,
    reviews: 2340,
    features: ['Door-to-door', 'Tracking', 'Insurance'],
    recommended: true,
  },
  {
    id: '2',
    carrier: 'DHL Express',
    carrierLogo: 'D',
    type: 'air',
    price: 2180,
    currency: 'USD',
    transitDays: 4,
    departure: 'Jun 20',
    arrival: 'Jun 24',
    rating: 4.7,
    reviews: 1890,
    features: ['Express', 'Customs clearance'],
  },
  {
    id: '3',
    carrier: 'Maersk',
    carrierLogo: 'M',
    type: 'sea',
    price: 890,
    currency: 'USD',
    transitDays: 18,
    departure: 'Jun 20',
    arrival: 'Jul 8',
    rating: 4.5,
    reviews: 3200,
    features: ['FCL', 'Port-to-port'],
  },
  {
    id: '4',
    carrier: 'COSCO',
    carrierLogo: 'C',
    type: 'sea',
    price: 750,
    currency: 'USD',
    transitDays: 21,
    departure: 'Jun 20',
    arrival: 'Jul 11',
    rating: 4.3,
    reviews: 2100,
    features: ['LCL available', 'Port-to-port'],
  },
  {
    id: '5',
    carrier: 'UPS Freight',
    carrierLogo: 'U',
    type: 'truck',
    price: 1650,
    currency: 'USD',
    transitDays: 7,
    departure: 'Jun 20',
    arrival: 'Jun 27',
    rating: 4.6,
    reviews: 980,
    features: ['Door-to-door', 'Tracking', 'Liftgate'],
  },
];

const typeIcons = { air: Plane, sea: Ship, truck: Truck };
const typeColors = {
  air: 'bg-blue-100 text-blue-700',
  sea: 'bg-teal-100 text-teal-700',
  truck: 'bg-orange-100 text-orange-700',
};

export default function QuotesPage() {
  const [activeType, setActiveType] = useState<'all' | 'air' | 'sea' | 'truck'>('all');
  const [sortBy, setSortBy] = useState<'fastest' | 'cheapest' | 'rating'>('fastest');

  const filteredQuotes = quotes
    .filter(q => activeType === 'all' || q.type === activeType)
    .sort((a, b) => {
      if (sortBy === 'fastest') return a.transitDays - b.transitDays;
      if (sortBy === 'cheapest') return a.price - b.price;
      return b.rating - a.rating;
    });

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Freight Quotes" subtitle="Compare shipping rates" backHref="/freight" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">From</label>
              <select className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]">
                <option>Shanghai, CN</option>
                <option>Shenzhen, CN</option>
                <option>Guangzhou, CN</option>
              </select>
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">To</label>
              <select className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]">
                <option>Los Angeles, US</option>
                <option>New York, US</option>
                <option>Houston, US</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {(['all', 'air', 'sea', 'truck'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                  activeType === type ? 'bg-[#154230] text-white' : 'bg-[#E6E2DA] text-[#101111]'
                }`}
              >
                {type === 'all' ? 'All' : type === 'air' ? <Plane className="w-4 h-4" /> : type === 'sea' ? <Ship className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                <span className="capitalize">{type === 'all' ? 'All' : type}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <button className="flex items-center gap-1 px-4 py-2 bg-white rounded-lg text-sm font-medium whitespace-nowrap">
            <Filter className="w-4 h-4" /> Filters
          </button>
          {(['fastest', 'cheapest', 'rating'] as const).map((sort) => (
            <button
              key={sort}
              onClick={() => setSortBy(sort)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                sortBy === sort ? 'bg-[#154230] text-white' : 'bg-white text-[#101111]'
              }`}
            >
              {sort === 'fastest' ? 'Fastest' : sort === 'cheapest' ? 'Cheapest' : 'Top Rated'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredQuotes.map((quote) => {
            const TypeIcon = typeIcons[quote.type];
            return (
              <div key={quote.id} className="bg-white rounded-2xl p-4 shadow-sm relative">
                {quote.recommended && (
                  <div className="absolute -top-2 left-4 px-3 py-1 bg-[#A6824A] text-white text-xs font-bold rounded-full">
                    Recommended
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#E6E2DA] rounded-xl flex items-center justify-center text-2xl font-bold text-[#154230]">
                    {quote.carrierLogo}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-[#101111]">{quote.carrier}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${typeColors[quote.type]}`}>
                            <TypeIcon className="w-3 h-3" />
                            {quote.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[#4A4A4A]">
                            <Star className="w-3 h-3 text-[#A6824A] fill-[#A6824A]" />
                            {quote.rating} ({quote.reviews})
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#154230]">${quote.price.toLocaleString()}</p>
                        <p className="text-xs text-[#4A4A4A]">per shipment</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm text-[#4A4A4A]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {quote.transitDays} days
                      </div>
                      <span>{quote.departure} → {quote.arrival}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {quote.features.map((feature, idx) => (
                        <span key={idx} className="flex items-center gap-1 px-2 py-1 bg-[#E6E2DA] rounded text-xs text-[#4A4A4A]">
                          <Check className="w-3 h-3 text-green-600" /> {feature}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold flex items-center justify-center gap-2">
                      Book Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav activeItem="freight" />
    </div>
  );
}
