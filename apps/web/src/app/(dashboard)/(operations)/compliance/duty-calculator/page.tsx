'use client';

import { useState } from 'react';
import BottomNav from '@/components/BottomNav';

export default function DutyCalculatorPage() {
  const [formData, setFormData] = useState({
    origin: '',
    destination: 'US',
    hsCode: '',
    value: '',
    currency: 'USD',
    weight: '',
  });

  const handleCalculate = () => {
    console.log('Calculating duty for:', formData);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Duty Calculator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculator Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-lg font-semibold text-white mb-6">Calculate Import Duties</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Country of Origin</label>
                <select
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select country</option>
                  <option value="CN">China</option>
                  <option value="DE">Germany</option>
                  <option value="JP">Japan</option>
                  <option value="IN">India</option>
                  <option value="VN">Vietnam</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Country of Import</label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="EU">European Union</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-400 text-sm mb-2">HS Code</label>
                <input
                  type="text"
                  placeholder="e.g., 8542.31.00"
                  value={formData.hsCode}
                  onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Shipment Value</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  />
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CNY">CNY</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Weight (kg)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Calculate Duties
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Estimated Costs</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-gray-400">Product Value</span>
                <span className="text-white font-medium">$10,000.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-gray-400">Import Duty (3.5%)</span>
                <span className="text-white font-medium">$350.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-gray-400">VAT/Tax (10%)</span>
                <span className="text-white font-medium">$1,000.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-700">
                <span className="text-gray-400">Processing Fee</span>
                <span className="text-white font-medium">$25.00</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-white font-semibold">Total Estimated</span>
                <span className="text-blue-400 font-bold text-xl">$11,375.00</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Country Trade Agreements</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-emerald-600/10 rounded-lg">
                <div className="w-8 h-8 bg-emerald-600/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm">Most Favored Nation</p>
                  <p className="text-gray-400 text-xs">Standard tariff applies</p>
                </div>
              </div>
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <p className="text-gray-400 text-sm">No preferential agreement found</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeItem="compliance" />
    </div>
  );
}
