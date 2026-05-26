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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Freight Quotes</h1>

      {/* Quote Calculator */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-6">Get a Quote</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Origin</label>
            <input
              type="text"
              placeholder="City or Port"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Destination</label>
            <input
              type="text"
              placeholder="City or Port"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Weight (kg)</label>
            <input
              type="number"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Shipping Type</label>
            <select
              value={shippingType}
              onChange={(e) => setShippingType(e.target.value as 'sea' | 'air' | 'truck')}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
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
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg font-medium transition-colors"
            >
              {quoteMutation.isPending ? 'Getting Quotes...' : 'Get Quotes'}
            </button>
          </div>
        </div>
      </div>

      {/* Error State */}
      {quoteMutation.isError && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-400">Failed to get quotes. Please check your inputs and try again.</p>
        </div>
      )}

      {/* Popular Routes */}
      {!quoteMutation.data && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { from: 'Shanghai', to: 'Los Angeles', seaPrice: 2800, airPrice: 9500 },
              { from: 'Shenzhen', to: 'Hamburg', seaPrice: 3200, airPrice: 11000 },
              { from: 'Hong Kong', to: 'Dubai', seaPrice: 1800, airPrice: 6500 },
              { from: 'Singapore', to: 'Mumbai', seaPrice: 1200, airPrice: 4800 },
            ].map((route, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="text-center mb-3">
                  <span className="text-gray-400 text-sm">{route.from}</span>
                  <span className="text-gray-600 mx-2">→</span>
                  <span className="text-gray-400 text-sm">{route.to}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sea</span>
                    <span className="text-white">${route.seaPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Air</span>
                    <span className="text-white">${route.airPrice.toLocaleString()}</span>
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
          <h2 className="text-lg font-semibold text-white mb-4">Available Quotes</h2>
          {quotes.length === 0 ? (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <p className="text-gray-400">No quotes available for this route. Try different parameters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quotes.map((quote, i) => (
                <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                        <span className="text-xl">🚢</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{quote.carrier}</h3>
                        <p className="text-sm text-gray-400">{quote.type}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Transit Time</p>
                      <p className="text-white">{quote.transit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">${quote.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">{quote.currency}</p>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
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
