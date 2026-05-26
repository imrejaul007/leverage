'use client';

import { useState, useEffect } from 'react';

interface Shipment {
  id: string;
  trackingNumber: string;
  container: string;
  origin: string;
  destination: string;
  status: 'pending' | 'in_transit' | 'customs' | 'delivered';
  eta: string;
  carrier: string;
  createdAt: string;
  lastUpdate: string;
  events?: Array<{ date: string; location: string; description: string }>;
}

const initialShipments: Shipment[] = [
  { id: 'SHP-001', trackingNumber: 'MSKU1234567890', container: 'MSKU1234567', origin: 'Shanghai, China', destination: 'Los Angeles, USA', status: 'in_transit', eta: '2024-02-15', carrier: 'Maersk Line', createdAt: '2024-01-15', lastUpdate: '2024-01-20', events: [{ date: '2024-01-20', location: 'Pacific Ocean', description: 'Vessel in transit' }, { date: '2024-01-18', location: 'Shanghai Port', description: 'Container loaded onto vessel' }, { date: '2024-01-15', location: 'Shanghai', description: 'Shipment created' }] },
  { id: 'SHP-002', trackingNumber: 'CMAU7654321567', container: 'CMAU7654321', origin: 'Hamburg, Germany', destination: 'New York, USA', status: 'delivered', eta: '2024-01-28', carrier: 'CMA CGM', createdAt: '2024-01-05', lastUpdate: '2024-01-28', events: [{ date: '2024-01-28', location: 'New York Port', description: 'Delivered to consignee' }, { date: '2024-01-25', location: 'Atlantic Ocean', description: 'Vessel arrived' }] },
  { id: 'SHP-003', trackingNumber: 'HLCU9876543210', container: 'HLCU9876543', origin: 'Singapore', destination: 'Dubai, UAE', status: 'customs', eta: '2024-02-10', carrier: 'Hapag-Lloyd', createdAt: '2024-01-18', lastUpdate: '2024-01-22', events: [{ date: '2024-01-22', location: 'Dubai Port', description: 'Customs clearance in progress' }] },
  { id: 'SHP-004', trackingNumber: 'EGHU4567890123', container: 'EGHU4567890', origin: 'Shenzhen, China', destination: 'Rotterdam, Netherlands', status: 'pending', eta: '2024-02-25', carrier: 'Evergreen Marine', createdAt: '2024-01-20', lastUpdate: '2024-01-20', events: [{ date: '2024-01-20', location: 'Shenzhen', description: 'Shipment booked, awaiting pickup' }] },
];

const statusColors: Record<string, string> = { pending: 'bg-amber-500/20 text-amber-400', in_transit: 'bg-blue-500/20 text-blue-400', customs: 'bg-purple-500/20 text-purple-400', delivered: 'bg-emerald-500/20 text-emerald-400' };
const statusLabels: Record<string, string> = { pending: 'Pending Pickup', in_transit: 'In Transit', customs: 'Customs Clearance', delivered: 'Delivered' };

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [formData, setFormData] = useState({ container: '', origin: '', destination: '', carrier: '', eta: '' });

  useEffect(() => {
    const stored = localStorage.getItem('leverage_shipments');
    if (stored) setShipments(JSON.parse(stored));
    else { setShipments(initialShipments); localStorage.setItem('leverage_shipments', JSON.stringify(initialShipments)); }
    setIsLoading(false);
  }, []);

  const saveShipments = (data: Shipment[]) => { setShipments(data); localStorage.setItem('leverage_shipments', JSON.stringify(data)); };

  const filteredShipments = shipments.filter(s => {
    const matchesSearch = s.id.toLowerCase().includes(searchQuery.toLowerCase()) || s.container.toLowerCase().includes(searchQuery.toLowerCase()) || s.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddShipment = () => {
    if (!formData.container || !formData.origin || !formData.destination || !formData.carrier) return;
    const newShipment: Shipment = { id: `SHP-${Date.now().toString().slice(-6)}`, trackingNumber: formData.container.toUpperCase(), container: formData.container.toUpperCase(), origin: formData.origin, destination: formData.destination, carrier: formData.carrier, status: 'pending', eta: formData.eta || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], createdAt: new Date().toISOString().split('T')[0], lastUpdate: new Date().toISOString().split('T')[0], events: [{ date: new Date().toISOString().split('T')[0], location: formData.origin, description: 'Shipment created' }] };
    saveShipments([newShipment, ...shipments]);
    setShowAddModal(false);
    setFormData({ container: '', origin: '', destination: '', carrier: '', eta: '' });
  };

  const getStatusCounts = () => ({ all: shipments.length, pending: shipments.filter(s => s.status === 'pending').length, in_transit: shipments.filter(s => s.status === 'in_transit').length, customs: shipments.filter(s => s.status === 'customs').length, delivered: shipments.filter(s => s.status === 'delivered').length });
  const counts = getStatusCounts();

  if (isLoading) return <div className="min-h-screen bg-[#081512] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-[#F4F1EA]">Shipment Tracking</h1><p className="text-[#D8CCBC]/60 text-sm">{filteredShipments.length} shipments</p></div>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm hover:bg-[#D4AA82] transition-colors">+ Add Shipment</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[{ id: 'all', label: 'Total', value: counts.all }, { id: 'pending', label: 'Pending', value: counts.pending, color: 'text-amber-400' }, { id: 'in_transit', label: 'In Transit', value: counts.in_transit, color: 'text-blue-400' }, { id: 'customs', label: 'Customs', value: counts.customs, color: 'text-purple-400' }, { id: 'delivered', label: 'Delivered', value: counts.delivered, color: 'text-emerald-400' }].map(stat => (
          <button key={stat.id} onClick={() => setStatusFilter(stat.id)} className={`card p-3 text-center cursor-pointer transition-all ${statusFilter === stat.id ? 'border-[#C49A6C]/30 bg-[#0E3B36]/30' : ''}`}>
            <p className={`text-xl sm:text-2xl font-bold ${(stat as { color?: string }).color || 'text-[#F4F1EA]'}`}>{stat.value}</p>
            <p className="text-[#D8CCBC]/50 text-xs">{stat.label}</p>
          </button>
        ))}
      </div>

      <div className="relative">
        <input type="text" placeholder="Search by ID, container, or tracking number..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm" />
        <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      {filteredShipments.length === 0 ? (
        <div className="card text-center py-12"><div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">🚢</span></div><p className="text-[#D8CCBC]/50 mb-4">No shipments found</p><button onClick={() => setShowAddModal(true)} className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">Add your first shipment</button></div>
      ) : (
        <div className="space-y-4">
          {filteredShipments.map(shipment => (
            <div key={shipment.id} onClick={() => setSelectedShipment(shipment)} className="card cursor-pointer hover:border-[#C49A6C]/30 transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0E3B36] rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-2xl">🚢</span></div>
                  <div>
                    <div className="flex items-center gap-2 mb-1"><h3 className="text-[#F4F1EA] font-semibold">{shipment.id}</h3><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[shipment.status]}`}>{statusLabels[shipment.status]}</span></div>
                    <p className="text-[#D8CCBC]/50 text-sm">Container: {shipment.container}</p>
                    <p className="text-[#D8CCBC]/50 text-sm">Carrier: {shipment.carrier}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center hidden sm:block"><p className="text-[#D8CCBC]/50 text-xs mb-1">Origin</p><p className="text-[#F4F1EA] text-sm font-medium">{shipment.origin.split(',')[0]}</p></div>
                  <svg className="w-6 h-6 text-[#D8CCBC]/30 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  <div className="text-center hidden sm:block"><p className="text-[#D8CCBC]/50 text-xs mb-1">Destination</p><p className="text-[#F4F1EA] text-sm font-medium">{shipment.destination.split(',')[0]}</p></div>
                  <div className="text-center"><p className="text-[#D8CCBC]/50 text-xs mb-1">ETA</p><p className="text-[#F4F1EA] text-sm font-medium">{shipment.eta}</p></div>
                  <button className="px-4 py-2 bg-[#0E3B36] text-[#C49A6C] rounded-lg text-sm font-medium hover:bg-[#0E3B36]/80 transition-colors">Track</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-bold text-[#F4F1EA]">Add New Shipment</h2><button onClick={() => setShowAddModal(false)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button></div>
            <div className="space-y-4">
              <div><label className="block text-[#D8CCBC] text-sm mb-2">Container Number *</label><input type="text" value={formData.container} onChange={(e) => setFormData({ ...formData, container: e.target.value })} className="w-full input" placeholder="MSKU1234567" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Origin *</label><input type="text" value={formData.origin} onChange={(e) => setFormData({ ...formData, origin: e.target.value })} className="w-full input" placeholder="Shanghai, China" /></div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Destination *</label><input type="text" value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} className="w-full input" placeholder="Los Angeles, USA" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[#D8CCBC] text-sm mb-2">Carrier *</label><input type="text" value={formData.carrier} onChange={(e) => setFormData({ ...formData, carrier: e.target.value })} className="w-full input" placeholder="Maersk Line" /></div>
                <div><label className="block text-[#D8CCBC] text-sm mb-2">ETA</label><input type="date" value={formData.eta} onChange={(e) => setFormData({ ...formData, eta: e.target.value })} className="w-full input" /></div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">Cancel</button>
                <button onClick={handleAddShipment} disabled={!formData.container || !formData.origin || !formData.destination || !formData.carrier} className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold disabled:opacity-50">Add Shipment</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div><h2 className="text-xl font-bold text-[#F4F1EA]">{selectedShipment.id}</h2><p className="text-[#D8CCBC]/50 text-sm">Tracking: {selectedShipment.trackingNumber}</p></div>
              <button onClick={() => setSelectedShipment(null)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>
            <div className="flex items-center gap-3 mb-6"><span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[selectedShipment.status]}`}>{statusLabels[selectedShipment.status]}</span><span className="text-[#D8CCBC]/50 text-sm">ETA: {selectedShipment.eta}</span></div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="card p-4"><p className="text-[#D8CCBC]/50 text-xs mb-1">Origin</p><p className="text-[#F4F1EA] font-medium">{selectedShipment.origin}</p></div>
              <div className="card p-4"><p className="text-[#D8CCBC]/50 text-xs mb-1">Destination</p><p className="text-[#F4F1EA] font-medium">{selectedShipment.destination}</p></div>
              <div className="card p-4"><p className="text-[#D8CCBC]/50 text-xs mb-1">Carrier</p><p className="text-[#F4F1EA] font-medium">{selectedShipment.carrier}</p></div>
              <div className="card p-4"><p className="text-[#D8CCBC]/50 text-xs mb-1">Container</p><p className="text-[#F4F1EA] font-medium">{selectedShipment.container}</p></div>
            </div>
            <div><h3 className="text-[#F4F1EA] font-semibold mb-4">Tracking History</h3>
              <div className="space-y-4">
                {selectedShipment.events?.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center"><div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-[#C49A6C]' : 'bg-[rgba(255,255,255,0.2)]'}`} />{index < (selectedShipment.events?.length || 0) - 1 && <div className="w-0.5 flex-1 bg-[rgba(255,255,255,0.1)] mt-1" />}</div>
                    <div className="pb-4"><p className="text-[#F4F1EA] font-medium">{event.description}</p><p className="text-[#D8CCBC]/50 text-sm">{event.location}</p><p className="text-[#D8CCBC]/30 text-xs mt-1">{event.date}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
