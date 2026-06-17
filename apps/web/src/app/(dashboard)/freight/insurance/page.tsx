'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Shield, Check, FileText, AlertTriangle } from 'lucide-react';

const insurancePlans = [
  {
    id: 'basic',
    name: 'Basic Coverage',
    price: 0.3,
    desc: 'Per % of cargo value',
    coverage: ['Basic liability', 'Standard claims'],
    recommended: false,
  },
  {
    id: 'standard',
    name: 'Standard Coverage',
    price: 0.5,
    desc: 'Per % of cargo value',
    coverage: ['Full liability', 'Standard claims', 'Transit damage'],
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium Coverage',
    price: 0.8,
    desc: 'Per % of cargo value',
    coverage: ['Full liability', 'Priority claims', 'All risk coverage', '24/7 support'],
    recommended: false,
  },
];

export default function InsurancePage() {
  const [cargoValue, setCargoValue] = useState(50000);
  const [selectedPlan, setSelectedPlan] = useState('standard');

  const selectedInsurance = insurancePlans.find(p => p.id === selectedPlan);
  const insuranceCost = (cargoValue * (selectedInsurance?.price || 0.5)) / 100;

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Freight Insurance" subtitle="Protect your cargo" backHref="/freight" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Cargo Protection</p>
              <p className="text-sm text-white/70">Insurance rates from 0.3% of cargo value</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Cargo Value</h3>
          <div className="space-y-3">
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={cargoValue}
              onChange={(e) => setCargoValue(parseInt(e.target.value))}
              className="w-full accent-[#154230]"
            />
            <div className="flex justify-between">
              <span className="text-sm text-[#4A4A4A]">$10,000</span>
              <span className="text-2xl font-bold text-[#154230]">${cargoValue.toLocaleString()}</span>
              <span className="text-sm text-[#4A4A4A]">$500,000</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Choose Coverage</h3>
          <div className="space-y-3">
            {insurancePlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-[#154230] bg-[#154230]/5'
                    : 'border-black/5'
                }`}
              >
                {plan.recommended && (
                  <span className="inline-block px-2 py-0.5 bg-[#A6824A] text-white text-xs font-bold rounded mb-2">
                    Recommended
                  </span>
                )}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-[#101111]">{plan.name}</h4>
                    <p className="text-sm text-[#4A4A4A]">{plan.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#154230]">{plan.price}%</p>
                    <p className="text-xs text-[#4A4A4A]">of cargo value</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {plan.coverage.map((c, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-xs text-[#4A4A4A]">
                      <Check className="w-3 h-3 text-green-600" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Coverage Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#4A4A4A]">Cargo Value</span>
              <span className="text-[#101111]">${cargoValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4A4A4A]">Insurance Rate</span>
              <span className="text-[#101111]">{selectedInsurance?.price}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4A4A4A]">Insurance Cost</span>
              <span className="text-[#101111]">${insuranceCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-black/10">
              <span className="text-[#101111]">Total</span>
              <span className="text-[#154230]">${insuranceCost.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">What's Covered</p>
              <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                <li>• Loss or damage during transit</li>
                <li>• Fire, theft, and accidents</li>
                <li>• Loading/unloading damage</li>
              </ul>
            </div>
          </div>
        </div>

        <button className="w-full py-4 bg-[#154230] text-white rounded-2xl font-semibold flex items-center justify-center gap-2">
          <Shield className="w-5 h-5" /> Add Insurance to Shipment
        </button>
      </div>

      <BottomNav activeItem="freight" />
    </div>
  );
}
