'use client';

import { useState } from 'react';

export default function ShipmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const shipments = [
    { id: 'SHP-001', container: 'MSKU1234567', origin: 'Shanghai', destination: 'Los Angeles', status: 'in_transit', eta: '2024-02-15', carrier: 'Maersk' },
    { id: 'SHP-002', container: 'CMAU7654321', origin: 'Hamburg', destination: 'New York', status: 'delivered', eta: '2024-01-28', carrier: 'CMA CGM' },
    { id: 'SHP-003', container: 'HLCU9876543', origin: 'Singapore', destination: 'Dubai', status: 'customs', eta: '2024-02-10', carrier: 'Hapag-Lloyd' },
    { id: 'SHP-004', container: 'EGHU4567890', origin: 'Shenzhen', destination: 'Rotterdam', status: 'pending', eta: '2024-02-25', carrier: 'Evergreen' },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-600/20 text-amber-400',
    in_transit: 'bg-blue-600/20 text-blue-400',
    customs: 'bg-purple-600/20 text-purple-400',
    delivered: 'bg-emerald-600/20 text-emerald-400',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Pending Pickup',
    in_transit: 'In Transit',
    customs: 'Customs Clearance',
    delivered: 'Delivered',
  };

  const filteredShipments = shipments.filter(shipment =>
    shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shipment.container.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Shipment Tracking</h1>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by shipment ID or container number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 pl-10 border border-slate-700 focus:outline-none focus:border-blue-500"
        />
        <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Total Shipments</p>
          <p className="text-2xl font-bold text-white">{shipments.length}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">In Transit</p>
          <p className="text-2xl font-bold text-blue-400">{shipments.filter(s => s.status === 'in_transit').length}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Customs</p>
          <p className="text-2xl font-bold text-purple-400">{shipments.filter(s => s.status === 'customs').length}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Delivered</p>
          <p className="text-2xl font-bold text-emerald-400">{shipments.filter(s => s.status === 'delivered').length}</p>
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-4">
        {filteredShipments.map((shipment) => (
          <div key={shipment.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4-4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold">{shipment.id}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[shipment.status]}`}>
                      {statusLabels[shipment.status]}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Container: {shipment.container}</p>
                  <p className="text-gray-400 text-sm">Carrier: {shipment.carrier}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">Origin</p>
                  <p className="text-white font-medium">{shipment.origin}</p>
                </div>
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">Destination</p>
                  <p className="text-white font-medium">{shipment.destination}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm mb-1">ETA</p>
                  <p className="text-white font-medium">{shipment.eta}</p>
                </div>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                  Track
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
