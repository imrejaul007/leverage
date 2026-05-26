'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { freightApi } from '@/lib/api-client';

interface Quote {
  id?: string;
  carrier: string;
  type: string;
  transit: string;
  price: number;
  currency: string;
}

export default function FreightPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [shippingType, setShippingType] = useState<'sea' | 'air' | 'truck'>('sea');

  const quoteMutation = useMutation({
    mutationFn: async (data: { origin: string; destination: string; weight: number; transportMode: string }) => {
      const response = await freightApi.getQuotes(data);
      return response.data.data || [];
    },
  });

  const handleGetQuote = () => {
    if (!origin || !destination || !weight) return;
    quoteMutation.mutate({
      origin,
      destination,
      weight: parseFloat(weight),
      transportMode: shippingType.toUpperCase(),
    });
  };

  const quotes: Quote[] = quoteMutation.data || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#F4F1EA] mb-2">Freight & Logistics</h1>
        <p className="text-[#D8CCBC]/60">Get quotes and track your shipments</p>
      </div>

      {/* Quote Calculator */}
      <div className="card">
        <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">Get a Quote</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-[#D8CCBC]/80 text-sm mb-2">Origin</label>
            <input
              type="text"
              placeholder="City or Port"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-[#D8CCBC]/80 text-sm mb-2">Destination</label>
            <input
              type="text"
              placeholder="City or Port"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-[#D8CCBC]/80 text-sm mb-2">Weight (kg)</label>
            <input
              type="number"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input w-full"
            />
          </div>
          <div>
            <label className="block text-[#D8CCBC]/80 text-sm mb-2">Shipping Type</label>
            <select
              value={shippingType}
              onChange={(e) => setShippingType(e.target.value as 'sea' | 'air' | 'truck')}
              className="input w-full"
            >
              <option value="sea">Sea Freight</option>
              <option value="air">Air Freight</option>
              <option value="truck">Truck</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGetQuote}
              disabled={!origin || !destination || !weight || quoteMutation.isPending}
              className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors disabled:opacity-50"
            >
              {quoteMutation.isPending ? 'Getting Quotes...' : 'Get Quotes'}
            </button>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      {!quoteMutation.data && (
        <div>
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { from: 'Shanghai', to: 'Los Angeles', seaPrice: 2800, airPrice: 9500 },
              { from: 'Shenzhen', to: 'Hamburg', seaPrice: 3200, airPrice: 11000 },
              { from: 'Hong Kong', to: 'Dubai', seaPrice: 1800, airPrice: 6500 },
              { from: 'Singapore', to: 'Mumbai', seaPrice: 1200, airPrice: 4800 },
            ].map((route, i) => (
              <div key={i} className="card hover:border-[#C49A6C]/30 transition-all">
                <div className="text-center mb-4">
                  <span className="text-[#D8CCBC]/60 text-sm">{route.from}</span>
                  <span className="text-[#C49A6C] mx-2">→</span>
                  <span className="text-[#D8CCBC]/60 text-sm">{route.to}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#D8CCBC]/50">Sea</span>
                    <span className="text-[#F4F1EA] font-medium">${route.seaPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#D8CCBC]/50">Air</span>
                    <span className="text-[#F4F1EA] font-medium">${route.airPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quote Results */}
      {quoteMutation.data && (
        <div>
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Available Quotes</h2>
          {quotes.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-[#D8CCBC]/50">No quotes available for this route.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((quote, i) => (
                <div key={i} className="card hover:border-[#C49A6C]/30 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-[#0E3B36] rounded-xl flex items-center justify-center text-2xl">
                      🚢
                    </div>
                    <div>
                      <h3 className="text-[#F4F1EA] font-semibold">{quote.carrier}</h3>
                      <p className="text-[#D8CCBC]/50 text-sm">{quote.type}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[#D8CCBC]/50 text-sm">Transit Time</p>
                      <p className="text-[#F4F1EA]">{quote.transit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-[#C49A6C]">${quote.price.toLocaleString()}</p>
                      <p className="text-[#D8CCBC]/50 text-sm">{quote.currency}</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
