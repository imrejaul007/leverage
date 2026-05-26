'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface RFQ {
  id: string;
  title: string;
  category: string;
  quantity: string;
  unit: string;
  origin: string;
  destination: string;
  targetPrice: string;
  currency: string;
  status: 'OPEN' | 'QUOTED' | 'ACCEPTED' | 'CLOSED';
  responses: number;
  createdAt: string;
  expiresAt: string;
  description?: string;
}

const initialRFQs: RFQ[] = [
  { id: '1', title: 'Premium Basmati Rice - 1121', category: 'Food & Agriculture', quantity: '500', unit: 'MT', origin: 'India', destination: 'UAE', targetPrice: '850', currency: 'USD', status: 'QUOTED', responses: 12, createdAt: '2024-01-20', expiresAt: '2024-01-27', description: 'Need premium quality basmati rice for restaurant supply chain' },
  { id: '2', title: 'Cotton Yarn 40/1 Combed', category: 'Textiles', quantity: '50', unit: 'MT', origin: 'India', destination: 'Bangladesh', targetPrice: '3.20', currency: 'USD', status: 'OPEN', responses: 5, createdAt: '2024-01-19', expiresAt: '2024-01-26', description: 'For textile manufacturing facility' },
  { id: '3', title: 'Solar Panels - 550W Mono', category: 'Electronics', quantity: '1', unit: 'MW', origin: 'China', destination: 'Kenya', targetPrice: '0.18', currency: 'USD', status: 'ACCEPTED', responses: 8, createdAt: '2024-01-18', expiresAt: '2024-01-25', description: 'For solar farm project' },
  { id: '4', title: 'Steel Billets - Grade A', category: 'Metals & Minerals', quantity: '1000', unit: 'MT', origin: 'Turkey', destination: 'Egypt', targetPrice: '620', currency: 'USD', status: 'OPEN', responses: 3, createdAt: '2024-01-17', expiresAt: '2024-01-24', description: 'For construction project' },
  { id: '5', title: 'Pharmaceutical Raw Materials', category: 'Healthcare', quantity: '5', unit: 'MT', origin: 'Germany', destination: 'India', targetPrice: '45', currency: 'USD', status: 'CLOSED', responses: 15, createdAt: '2024-01-15', expiresAt: '2024-01-22', description: 'For pharmaceutical manufacturing' },
];

const categories = ['Food & Agriculture', 'Textiles', 'Electronics', 'Metals & Minerals', 'Healthcare', 'Automotive', 'Chemicals', 'Other'];
const countries = ['India', 'China', 'USA', 'Germany', 'UAE', 'Singapore', 'UK', 'Japan', 'South Korea', 'Turkey', 'Egypt', 'Kenya', 'Bangladesh', 'Vietnam', 'Indonesia'];
const units = ['MT', 'KG', 'TONS', 'PCS', 'SETS', 'MW', 'KW', 'LITERS'];
const currencies = ['USD', 'EUR', 'GBP', 'AED', 'INR'];

export default function RFQsPage() {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewingRFQ, setViewingRFQ] = useState<RFQ | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Food & Agriculture',
    quantity: '',
    unit: 'MT',
    origin: 'India',
    destination: 'UAE',
    targetPrice: '',
    currency: 'USD',
    description: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('leverage_rfqs');
    if (stored) {
      setRfqs(JSON.parse(stored));
    } else {
      setRfqs(initialRFQs);
      localStorage.setItem('leverage_rfqs', JSON.stringify(initialRFQs));
    }
    setIsLoading(false);
  }, []);

  const saveRFQs = (data: RFQ[]) => {
    setRfqs(data);
    localStorage.setItem('leverage_rfqs', JSON.stringify(data));
  };

  const statusFilters = ['all', 'OPEN', 'QUOTED', 'ACCEPTED', 'CLOSED'];

  const statusColors: Record<string, string> = {
    OPEN: 'bg-blue-500/20 text-blue-400',
    QUOTED: 'bg-amber-500/20 text-amber-400',
    ACCEPTED: 'bg-emerald-500/20 text-emerald-400',
    CLOSED: 'bg-gray-500/20 text-gray-400',
  };

  const statusLabels: Record<string, string> = {
    OPEN: 'Open',
    QUOTED: 'Quoted',
    ACCEPTED: 'Accepted',
    CLOSED: 'Closed',
  };

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rfq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = () => {
    const newRFQ: RFQ = {
      id: Date.now().toString(),
      ...formData,
      status: 'OPEN',
      responses: 0,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
    saveRFQs([newRFQ, ...rfqs]);
    setShowCreateModal(false);
    setFormData({
      title: '',
      category: 'Food & Agriculture',
      quantity: '',
      unit: 'MT',
      origin: 'India',
      destination: 'UAE',
      targetPrice: '',
      currency: 'USD',
      description: '',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this RFQ?')) {
      saveRFQs(rfqs.filter(r => r.id !== id));
      setViewingRFQ(null);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">RFQs</h1>
          <p className="text-[#D8CCBC]/60 text-sm">{filteredRFQs.length} requests for quotes</p>
        </div>
        <Link
          href="/rfqs/new"
          className="w-full sm:w-auto px-4 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm text-center block"
        >
          + Create RFQ
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search RFQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm"
          />
          <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#D8CCBC] text-sm focus:outline-none focus:border-[#C49A6C]"
        >
          {statusFilters.map(s => (
            <option key={s} value={s}>{s === 'all' ? 'All Status' : statusLabels[s] || s}</option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {statusFilters.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm ${
              statusFilter === s
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#D8CCBC]'
            }`}
          >
            {s === 'all' ? 'All' : statusLabels[s] || s}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-5 bg-[#0E3B36]/50 rounded w-48"></div>
                  <div className="h-4 bg-[#0E3B36]/50 rounded w-32"></div>
                </div>
                <div className="h-6 bg-[#0E3B36]/50 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredRFQs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <p className="text-[#D8CCBC]/50 text-sm mb-4">No RFQs found</p>
          <Link href="/rfqs/new" className="text-[#C49A6C] hover:text-[#D4AA82] font-medium text-sm">
            Create your first RFQ
          </Link>
        </div>
      )}

      {/* RFQ List */}
      {!isLoading && filteredRFQs.length > 0 && (
        <div className="space-y-3">
          {filteredRFQs.map(rfq => (
            <div
              key={rfq.id}
              onClick={() => setViewingRFQ(rfq)}
              className="card cursor-pointer hover:border-[#C49A6C]/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#C49A6C] font-mono text-xs">RFQ-{rfq.id}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[rfq.status]}`}>
                      {statusLabels[rfq.status]}
                    </span>
                  </div>
                  <h3 className="text-[#F4F1EA] font-semibold truncate">{rfq.title}</h3>
                  <p className="text-[#D8CCBC]/50 text-sm">
                    {rfq.quantity} {rfq.unit} • {rfq.origin} → {rfq.destination}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[#C49A6C] font-bold">{rfq.currency} {rfq.targetPrice}/{rfq.unit}</p>
                    <p className="text-[#D8CCBC]/50 text-xs">{rfq.responses} quotes</p>
                  </div>
                  <svg className="w-5 h-5 text-[#D8CCBC]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View RFQ Modal */}
      {viewingRFQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#F4F1EA]">{viewingRFQ.title}</h2>
                <span className="text-[#C49A6C] font-mono text-sm">RFQ-{viewingRFQ.id}</span>
              </div>
              <button onClick={() => setViewingRFQ(null)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-sm rounded-full ${statusColors[viewingRFQ.status]}`}>
                  {statusLabels[viewingRFQ.status]}
                </span>
                <span className="text-[#D8CCBC]/50 text-sm">{viewingRFQ.category}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Quantity</p>
                  <p className="text-[#F4F1EA]">{viewingRFQ.quantity} {viewingRFQ.unit}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Target Price</p>
                  <p className="text-[#C49A6C] font-bold">{viewingRFQ.currency} {viewingRFQ.targetPrice}/{viewingRFQ.unit}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Origin</p>
                  <p className="text-[#F4F1EA]">{viewingRFQ.origin}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Destination</p>
                  <p className="text-[#F4F1EA]">{viewingRFQ.destination}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Created</p>
                  <p className="text-[#F4F1EA]">{viewingRFQ.createdAt}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs">Expires</p>
                  <p className="text-[#F4F1EA]">{viewingRFQ.expiresAt}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[#D8CCBC]/50 text-xs">Quotes Received</p>
                  <p className="text-[#F4F1EA]">{viewingRFQ.responses} suppliers responded</p>
                </div>
              </div>

              {viewingRFQ.description && (
                <div>
                  <p className="text-[#D8CCBC]/50 text-xs mb-1">Description</p>
                  <p className="text-[#F4F1EA]">{viewingRFQ.description}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button onClick={() => handleDelete(viewingRFQ.id)} className="py-3 px-6 bg-red-500/20 text-red-400 rounded-xl font-medium">
                  Delete
                </button>
                <Link href="/rfqs/new" className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-center">
                  Create Similar
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F4F1EA]">Create RFQ</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Product Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full input"
                  placeholder="e.g., Premium Basmati Rice"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D8CCBC] text-sm mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full input"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#D8CCBC] text-sm mb-2">Quantity *</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full input"
                    placeholder="500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D8CCBC] text-sm mb-2">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full input"
                  >
                    {units.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#D8CCBC] text-sm mb-2">Target Price *</label>
                  <input
                    type="number"
                    value={formData.targetPrice}
                    onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                    className="w-full input"
                    placeholder="850"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D8CCBC] text-sm mb-2">Origin</label>
                  <select
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full input"
                  >
                    {countries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#D8CCBC] text-sm mb-2">Destination</label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full input"
                  >
                    {countries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full input resize-none"
                  rows={3}
                  placeholder="Additional details..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!formData.title || !formData.quantity || !formData.targetPrice}
                  className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold disabled:opacity-50"
                >
                  Create RFQ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
