'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FreightPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [shippingType, setShippingType] = useState('sea');

  const quotes = [
    { carrier: 'Maersk', type: 'Sea Freight', transit: '25-30 days', price: 2400, currency: 'USD' },
    { carrier: 'MSC', type: 'Sea Freight', transit: '28-32 days', price: 2150, currency: 'USD' },
    { carrier: 'DHL', type: 'Air Freight', transit: '5-7 days', price: 8500, currency: 'USD' },
    { carrier: 'FedEx', type: 'Air Freight', transit: '6-8 days', price: 9200, currency: 'USD' },
  ];

  const popularRoutes = [
    { from: 'Shanghai', to: 'Los Angeles', seaPrice: 2800, airPrice: 9500 },
    { from: 'Shenzhen', to: 'Hamburg', seaPrice: 3200, airPrice: 11000 },
    { from: 'Hong Kong', to: 'Dubai', seaPrice: 1800, airPrice: 6500 },
    { from: 'Singapore', to: 'Mumbai', seaPrice: 1200, airPrice: 4800 },
  ];

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
              placeholder="0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Shipping Type</label>
            <select
              value={shippingType}
              onChange={(e) => setShippingType(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
            >
              <option value="sea">Sea Freight</option>
              <option value="air">Air Freight</option>
              <option value="rail">Rail Freight</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Get Quotes
            </button>
          </div>
        </div>
      </div>

      {/* Quick Routes */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-4">Popular Routes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularRoutes.map((route, i) => (
            <div key={i} className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-white font-medium">{route.from}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="text-white font-medium">{route.to}</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Sea:</span>
                  <span className="text-white">${route.seaPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Air:</span>
                  <span className="text-white">${route.airPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Quotes */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-4">Available Quotes</h2>
        <div className="space-y-4">
          {quotes.map((quote, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4-4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">{quote.carrier}</p>
                  <p className="text-gray-400 text-sm">{quote.type} • {quote.transit}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">${quote.price.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">{quote.currency}</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/freight/shipments"
          className="flex-1 bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold">Track Shipments</h3>
              <p className="text-gray-400 text-sm">View and track all your active shipments</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
