'use client';

import { useState, useEffect } from 'react';

interface Quote {
  id: string;
  carrier: string;
  type: string;
  transit: string;
  price: number;
  currency: string;
}

// Mock data for demo
const mockQuotes: Quote[] = [
  { id: '1', carrier: 'Maersk Line', type: 'Sea Freight', transit: '25-30 days', price: 2800, currency: 'USD' },
  { id: '2', carrier: 'MSC', type: 'Sea Freight', transit: '28-32 days', price: 2600, currency: 'USD' },
  { id: '3', carrier: 'COSCO', type: 'Sea Freight', transit: '30-35 days', price: 2400, currency: 'USD' },
  { id: '4', carrier: 'DHL Air', type: 'Air Freight', transit: '3-5 days', price: 8500, currency: 'USD' },
  { id: '5', carrier: 'FedEx Air', type: 'Air Freight', transit: '4-6 days', price: 9200, currency: 'USD' },
];

const popularRoutes = [
  { from: 'Shanghai', to: 'Los Angeles', seaPrice: 2800, airPrice: 9500 },
  { from: 'Shenzhen', to: 'Hamburg', seaPrice: 3200, airPrice: 11000 },
  { from: 'Hong Kong', to: 'Dubai', seaPrice: 1800, airPrice: 6500 },
  { from: 'Singapore', to: 'Mumbai', seaPrice: 1200, airPrice: 4800 },
];

export default function FreightPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [shippingType, setShippingType] = useState<'sea' | 'air'>('sea');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetQuote = () => {
    if (!origin || !destination || !weight) return;
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const filtered = mockQuotes.filter(q =>
        (shippingType === 'sea' && q.type === 'Sea Freight') ||
        (shippingType === 'air' && q.type === 'Air Freight')
      );
      setQuotes(filtered);
      setIsLoading(false);
    }, 1000);
  };

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
              onChange={(e) => setShippingType(e.target.value as 'sea' | 'air')}
              className="input w-full"
            >
              <option value="sea">Sea Freight</option>
              <option value="air">Air Freight</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGetQuote}
              disabled={!origin || !destination || !weight || isLoading}
              className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Getting Quotes...' : 'Get Quotes'}
            </button>
          </div>
        </div>
      </div>

      {/* Popular Routes - show when no quotes */}
      {quotes.length === 0 && (
        <div>
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, i) => (
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
      {quotes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#F4F1EA]">Available Quotes</h2>
            <button onClick={() => setQuotes([])} className="text-[#D8CCBC]/60 hover:text-[#F4F1EA] text-sm">
              ← Back to routes
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((quote) => (
              <div key={quote.id} className="card hover:border-[#C49A6C]/30 transition-all">
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
        </div>
      )}
    </div>
  );
}
