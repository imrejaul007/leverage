'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Calculator, Package, Truck, Ship, Plane, ArrowRight } from 'lucide-react';

export default function CalculatorPage() {
  const [calc, setCalc] = useState({
    origin: 'CN',
    destination: 'US',
    weight: 1000,
    length: 100,
    width: 80,
    height: 60,
    type: 'sea',
    quantity: 1,
  });

  const estimate = {
    sea: calc.weight * 0.5 + calc.length * calc.width * calc.height * 0.00001,
    air: calc.weight * 2.5,
    truck: calc.weight * 0.8,
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Freight Calculator" subtitle="Estimate shipping costs" backHref="/freight" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Route</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Origin</label>
              <select
                value={calc.origin}
                onChange={(e) => setCalc({ ...calc, origin: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              >
                <option value="CN">China</option>
                <option value="VN">Vietnam</option>
                <option value="IN">India</option>
                <option value="TH">Thailand</option>
              </select>
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Destination</label>
              <select
                value={calc.destination}
                onChange={(e) => setCalc({ ...calc, destination: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="DE">Germany</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Shipment Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                value={calc.weight}
                onChange={(e) => setCalc({ ...calc, weight: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Dimensions (cm)</label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="L"
                  value={calc.length}
                  onChange={(e) => setCalc({ ...calc, length: parseInt(e.target.value) || 0 })}
                  className="px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
                <input
                  type="number"
                  placeholder="W"
                  value={calc.width}
                  onChange={(e) => setCalc({ ...calc, width: parseInt(e.target.value) || 0 })}
                  className="px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
                <input
                  type="number"
                  placeholder="H"
                  value={calc.height}
                  onChange={(e) => setCalc({ ...calc, height: parseInt(e.target.value) || 0 })}
                  className="px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Quantity</label>
              <input
                type="number"
                value={calc.quantity}
                onChange={(e) => setCalc({ ...calc, quantity: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Shipping Method</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'sea', label: 'Sea', icon: Ship },
              { id: 'air', label: 'Air', icon: Plane },
              { id: 'truck', label: 'Truck', icon: Truck },
            ].map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setCalc({ ...calc, type: method.id })}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    calc.type === method.id
                      ? 'border-[#154230] bg-[#154230]/5'
                      : 'border-black/5'
                  }`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-1 ${calc.type === method.id ? 'text-[#154230]' : 'text-[#4A4A4A]'}`} />
                  <p className={`text-sm font-medium ${calc.type === method.id ? 'text-[#154230]' : 'text-[#101111]'}`}>{method.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70">Estimated Cost</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded">USD</span>
          </div>
          <p className="text-3xl font-bold">${Math.round(estimate[calc.type as keyof typeof estimate]).toLocaleString()}</p>
          <p className="text-sm text-white/70 mt-1">Transit: 7-14 days</p>
        </div>

        <button className="w-full py-4 bg-[#154230] text-white rounded-2xl font-semibold flex items-center justify-center gap-2">
          <Package className="w-5 h-5" /> Get Full Quote
        </button>
      </div>

      <BottomNav activeItem="freight" />
    </div>
  );
}
