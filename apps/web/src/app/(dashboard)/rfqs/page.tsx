'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Clock, MessageSquare, ArrowRight, X } from 'lucide-react';

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
  { id: '1', title: 'Premium Basmati Rice - 1121', category: 'Food & Agriculture', quantity: '500', unit: 'MT', origin: 'India', destination: 'UAE', targetPrice: '850', currency: 'USD', status: 'QUOTED', responses: 12, createdAt: '2024-01-20', expiresAt: '2024-01-27' },
  { id: '2', title: 'Cotton Yarn 40/1 Combed', category: 'Textiles', quantity: '50', unit: 'MT', origin: 'India', destination: 'Bangladesh', targetPrice: '3.20', currency: 'USD', status: 'OPEN', responses: 5, createdAt: '2024-01-19', expiresAt: '2024-01-26' },
  { id: '3', title: 'Solar Panels - 550W Mono', category: 'Electronics', quantity: '1', unit: 'MW', origin: 'China', destination: 'Kenya', targetPrice: '0.18', currency: 'USD', status: 'ACCEPTED', responses: 8, createdAt: '2024-01-18', expiresAt: '2024-01-25' },
  { id: '4', title: 'Steel Billets - Grade A', category: 'Metals & Minerals', quantity: '1000', unit: 'MT', origin: 'Turkey', destination: 'Egypt', targetPrice: '620', currency: 'USD', status: 'OPEN', responses: 3, createdAt: '2024-01-17', expiresAt: '2024-01-24' },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  OPEN: { color: 'text-blue-400', bg: 'bg-blue-500/20' },
  QUOTED: { color: 'text-amber-400', bg: 'bg-amber-500/20' },
  ACCEPTED: { color: 'text-green-400', bg: 'bg-green-500/20' },
  CLOSED: { color: 'text-gray-400', bg: 'bg-gray-500/20' },
};

const statusLabels: Record<string, string> = {
  OPEN: 'Open',
  QUOTED: 'Quoted',
  ACCEPTED: 'Accepted',
  CLOSED: 'Closed',
};

export default function RFQsPage() {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewingRFQ, setViewingRFQ] = useState<RFQ | null>(null);

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

  const statusFilters = ['all', 'OPEN', 'QUOTED', 'ACCEPTED', 'CLOSED'];

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rfq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">My RFQs</h1>
          <p className="text-[#64748B] text-sm">{filteredRFQs.length} requests for quotes</p>
        </div>
        <Link href="/rfqs/new" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#EA580C] transition-colors">
          <Plus className="w-5 h-5" />
          Create RFQ
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search RFQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 bg-[#1E293B] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#F97316]"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {statusFilters.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              statusFilter === s
                ? 'bg-[#F97316] text-white'
                : 'bg-[#1E293B] text-[#94A3B8] hover:bg-[#334155]'
            }`}
          >
            {s === 'all' ? 'All' : statusLabels[s] || s}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4 animate-pulse">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-5 bg-[#1E293B] rounded w-48"></div>
                  <div className="h-4 bg-[#1E293B] rounded w-32"></div>
                </div>
                <div className="h-8 bg-[#1E293B] rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredRFQs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#1E293B] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-[#64748B]" />
          </div>
          <p className="text-[#64748B] text-sm mb-4">No RFQs found</p>
          <Link href="/rfqs/new" className="text-[#F97316] hover:underline font-medium text-sm">
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
              className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4 cursor-pointer hover:border-[#F97316]/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#F97316] font-mono text-sm">RFQ-{rfq.id}</span>
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusConfig[rfq.status].bg} ${statusConfig[rfq.status].color}`}>
                      {statusLabels[rfq.status]}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold truncate">{rfq.title}</h3>
                  <p className="text-[#64748B] text-sm">
                    {rfq.quantity} {rfq.unit} • {rfq.origin} → {rfq.destination}
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[#22C55E] font-bold">{rfq.currency} {rfq.targetPrice}/{rfq.unit}</p>
                    <div className="flex items-center gap-1 text-[#64748B] text-xs">
                      <MessageSquare className="w-3 h-3" />
                      {rfq.responses} quotes
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#64748B]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View RFQ Modal */}
      {viewingRFQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setViewingRFQ(null)}>
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">{viewingRFQ.title}</h2>
                <span className="text-[#F97316] font-mono text-sm">RFQ-{viewingRFQ.id}</span>
              </div>
              <button onClick={() => setViewingRFQ(null)} className="p-2 text-[#64748B] hover:text-white hover:bg-[#1E293B] rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusConfig[viewingRFQ.status].bg} ${statusConfig[viewingRFQ.status].color}`}>
                  {statusLabels[viewingRFQ.status]}
                </span>
                <span className="text-[#64748B] text-sm">{viewingRFQ.category}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-[#111827] rounded-xl">
                <div>
                  <p className="text-[#64748B] text-xs mb-1">Quantity</p>
                  <p className="text-white font-medium">{viewingRFQ.quantity} {viewingRFQ.unit}</p>
                </div>
                <div>
                  <p className="text-[#64748B] text-xs mb-1">Target Price</p>
                  <p className="text-[#22C55E] font-bold">{viewingRFQ.currency} {viewingRFQ.targetPrice}/{viewingRFQ.unit}</p>
                </div>
                <div>
                  <p className="text-[#64748B] text-xs mb-1">Origin</p>
                  <p className="text-white">{viewingRFQ.origin}</p>
                </div>
                <div>
                  <p className="text-[#64748B] text-xs mb-1">Destination</p>
                  <p className="text-white">{viewingRFQ.destination}</p>
                </div>
                <div>
                  <p className="text-[#64748B] text-xs mb-1">Created</p>
                  <p className="text-white">{viewingRFQ.createdAt}</p>
                </div>
                <div>
                  <p className="text-[#64748B] text-xs mb-1">Expires</p>
                  <p className="text-white">{viewingRFQ.expiresAt}</p>
                </div>
              </div>

              <div className="p-4 bg-[#111827] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#64748B] text-sm">Quotes Received</span>
                  <span className="text-white font-bold">{viewingRFQ.responses}</span>
                </div>
                <div className="flex items-center gap-2 text-[#64748B] text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Expires in 7 days</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href="/marketplace/inbox" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1E293B] text-white font-semibold rounded-xl hover:bg-[#334155] transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  View Quotes
                </Link>
                <Link href="/rfqs/new" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F97316] text-white font-semibold rounded-xl hover:bg-[#EA580C] transition-colors">
                  <Plus className="w-5 h-5" />
                  Create Similar
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}