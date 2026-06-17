'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Star, CheckCircle, Phone, Mail, Globe, Filter } from 'lucide-react';

const carriers = [
  { id: '1', name: 'FedEx', logo: 'F', type: 'Air Express', rating: 4.8, shipments: 12500, verified: true, countries: 220 },
  { id: '2', name: 'DHL Express', logo: 'D', type: 'Air Express', rating: 4.7, shipments: 9800, verified: true, countries: 220 },
  { id: '3', name: 'Maersk', logo: 'M', type: 'Ocean Freight', rating: 4.5, shipments: 18500, verified: true, countries: 130 },
  { id: '4', name: 'COSCO', logo: 'C', type: 'Ocean Freight', rating: 4.3, shipments: 22000, verified: true, countries: 160 },
  { id: '5', name: 'UPS Freight', logo: 'U', type: 'Ground Freight', rating: 4.6, shipments: 8400, verified: true, countries: 200 },
  { id: '6', name: 'Evergreen', logo: 'E', type: 'Ocean Freight', rating: 4.4, shipments: 15600, verified: true, countries: 140 },
  { id: '7', name: 'Hapag-Lloyd', logo: 'H', type: 'Ocean Freight', rating: 4.6, shipments: 11200, verified: true, countries: 180 },
  { id: '8', name: 'XPO Logistics', logo: 'X', type: 'Ground Freight', rating: 4.2, shipments: 6800, verified: false, countries: 90 },
];

export default function CarriersPage() {
  const [filter, setFilter] = useState('all');

  const filteredCarriers = carriers.filter(c => {
    if (filter === 'all') return true;
    if (filter === 'verified') return c.verified;
    if (filter === 'ocean') return c.type === 'Ocean Freight';
    if (filter === 'air') return c.type === 'Air Express';
    return c.type === 'Ground Freight';
  });

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Carriers" subtitle="Freight carrier directory" backHref="/freight" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All' },
            { id: 'verified', label: 'Verified' },
            { id: 'ocean', label: 'Ocean' },
            { id: 'air', label: 'Air' },
            { id: 'ground', label: 'Ground' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                filter === f.id ? 'bg-[#154230] text-white' : 'bg-white text-[#101111]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredCarriers.map((carrier) => (
            <div key={carrier.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-[#E6E2DA] rounded-xl flex items-center justify-center text-2xl font-bold text-[#154230]">
                  {carrier.logo}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-[#101111]">{carrier.name}</h3>
                    {carrier.verified && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-[#4A4A4A] mb-2">{carrier.type}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                      <span className="font-medium">{carrier.rating}</span>
                    </span>
                    <span className="text-[#4A4A4A]">{carrier.shipments.toLocaleString()} shipments</span>
                    <span className="text-[#4A4A4A]">{carrier.countries} countries</span>
                  </div>
                </div>

                <button className="px-4 py-2 bg-[#154230] text-white rounded-lg text-sm font-medium">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav activeItem="freight" />
    </div>
  );
}
