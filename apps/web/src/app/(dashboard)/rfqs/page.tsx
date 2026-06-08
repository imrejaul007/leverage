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
  OPEN: { color: 'text-blue-600', bg: 'bg-blue-100' },
  QUOTED: { color: 'text-amber-600', bg: 'bg-amber-100' },
  ACCEPTED: { color: 'text-emerald-600', bg: 'bg-emerald-100' },
  CLOSED: { color: 'text-gray-500', bg: 'bg-gray-100' },
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">My RFQs</h1>
          <p className="text-gray-500 text-sm">{filteredRFQs.length} requests for quotes</p>
        </div>
        <Link href="/rfqs/new" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3E6A47] text-white font-semibold rounded-lg hover:bg-[#4A7D55] transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Create RFQ
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search RFQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C49A6C] text-sm"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {statusFilters.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              statusFilter === s
                ? 'bg-[#3E6A47] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
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
            <div key={i} className="bg-white border border-black/5 rounded-xl p-4 animate-pulse">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-100 rounded w-48"></div>
                  <div className="h-4 bg-gray-100 rounded w-32"></div>
                </div>
                <div className="h-8 bg-gray-100 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredRFQs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-7 h-7 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm mb-4">No RFQs found</p>
          <Link href="/rfqs/new" className="text-[#C49A6C] hover:underline font-medium text-sm">
            Create your first RFQ
          </Link>
        </div>
      )}

      {/* RFQ List */}
      {!isLoading && filteredRFQs.length > 0 && (
        <div className="space-y-2">
          {filteredRFQs.map(rfq => (
            <div
              key={rfq.id}
              onClick={() => setViewingRFQ(rfq)}
              className="bg-white border border-black/5 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#C49A6C] font-mono text-xs">RFQ-{rfq.id}</span>
                    <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${statusConfig[rfq.status].bg} ${statusConfig[rfq.status].color}`}>
                      {statusLabels[rfq.status]}
                    </span>
                  </div>
                  <h3 className="text-gray-900 font-medium text-sm truncate">{rfq.title}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {rfq.quantity} {rfq.unit} • {rfq.origin} → {rfq.destination}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-emerald-600 font-semibold text-sm">{rfq.currency} {rfq.targetPrice}/{rfq.unit}</p>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <MessageSquare className="w-3 h-3" />
                      {rfq.responses} quotes
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View RFQ Modal */}
      {viewingRFQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setViewingRFQ(null)}>
          <div className="bg-white border border-black/5 rounded-xl p-5 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{viewingRFQ.title}</h2>
                <span className="text-[#C49A6C] font-mono text-xs">RFQ-{viewingRFQ.id}</span>
              </div>
              <button onClick={() => setViewingRFQ(null)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${statusConfig[viewingRFQ.status].bg} ${statusConfig[viewingRFQ.status].color}`}>
                  {statusLabels[viewingRFQ.status]}
                </span>
                <span className="text-gray-500 text-xs">{viewingRFQ.category}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Quantity</p>
                  <p className="text-gray-900 font-medium text-sm">{viewingRFQ.quantity} {viewingRFQ.unit}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Target Price</p>
                  <p className="text-emerald-600 font-semibold text-sm">{viewingRFQ.currency} {viewingRFQ.targetPrice}/{viewingRFQ.unit}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Origin</p>
                  <p className="text-gray-900 text-sm">{viewingRFQ.origin}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Destination</p>
                  <p className="text-gray-900 text-sm">{viewingRFQ.destination}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Created</p>
                  <p className="text-gray-900 text-sm">{viewingRFQ.createdAt}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Expires</p>
                  <p className="text-gray-900 text-sm">{viewingRFQ.expiresAt}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500 text-sm">Quotes Received</span>
                  <span className="text-gray-900 font-semibold text-sm">{viewingRFQ.responses}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>Expires in 7 days</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href="/marketplace/inbox" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <MessageSquare className="w-4 h-4" />
                  View Quotes
                </Link>
                <Link href="/rfqs/new" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#3E6A47] text-white font-medium rounded-lg hover:bg-[#4A7D55] transition-colors text-sm">
                  <Plus className="w-4 h-4" />
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
