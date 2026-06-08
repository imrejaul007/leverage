'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Plus, Clock, MessageSquare, ArrowRight, X, Bell, ChevronDown } from 'lucide-react';

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
  OPEN: { color: 'text-[#154230]', bg: 'bg-[#154230]/10' },
  QUOTED: { color: 'text-[#5D1E21]', bg: 'bg-[#5D1E21]/10' },
  ACCEPTED: { color: 'text-[#154230]', bg: 'bg-[#154230]/10' },
  CLOSED: { color: 'text-[#4A4A4A]', bg: 'bg-[#E6E2DA]' },
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

  const stats = {
    total: rfqs.length,
    open: rfqs.filter(r => r.status === 'OPEN').length,
    quoted: rfqs.filter(r => r.status === 'QUOTED').length,
    accepted: rfqs.filter(r => r.status === 'ACCEPTED').length,
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Green Gradient Header with rounded bottom corners */}
      <div className="bg-gradient-to-br from-[#154230] via-[#1a5240] to-[#154230] rounded-b-[32px] px-4 pt-6 pb-8 relative">
        {/* Header Content */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain brightness-0 invert" />
          </div>
          <Link
            href="/marketplace/inbox"
            className="relative p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#5D1E21] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
              3
            </span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-1">
          <h1 className="text-white text-xl font-bold">My RFQs</h1>
          <p className="text-white/70 text-sm">Manage your requests for quotes</p>
        </div>

        {/* Tagline */}
        <p className="text-white/50 text-xs font-medium tracking-wider mt-4">
          CONNECTING DOTS TO PORTS
        </p>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-4 space-y-4 pb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search RFQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 bg-white border-0 rounded-2xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#A6824A] text-sm shadow-lg"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {statusFilters.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                statusFilter === s
                  ? 'bg-[#154230] text-white shadow-md'
                  : 'bg-white text-[#4A4A4A] hover:bg-white/80 shadow-sm'
              }`}
            >
              {s === 'all' ? 'All' : statusLabels[s] || s}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <div className="h-5 bg-[#E6E2DA] rounded w-48"></div>
                    <div className="h-4 bg-[#E6E2DA] rounded w-32"></div>
                  </div>
                  <div className="h-8 bg-[#E6E2DA] rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredRFQs.length === 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <div className="w-14 h-14 bg-[#E6E2DA] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-[#4A4A4A]" />
            </div>
            <p className="text-[#4A4A4A] text-sm mb-4">No RFQs found</p>
            <Link href="/rfqs/new" className="text-[#154230] hover:underline font-semibold text-sm">
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
                className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#5D1E21] font-mono text-xs font-medium">RFQ-{rfq.id}</span>
                      <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-semibold ${statusConfig[rfq.status].bg} ${statusConfig[rfq.status].color}`}>
                        {statusLabels[rfq.status]}
                      </span>
                    </div>
                    <h3 className="text-[#101111] font-semibold text-sm truncate">{rfq.title}</h3>
                    <p className="text-[#4A4A4A] text-xs mt-1">
                      {rfq.quantity} {rfq.unit} &bull; {rfq.origin} &rarr; {rfq.destination}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-[#4A4A4A]">
                      <Clock className="w-3 h-3" />
                      <span>Expires {rfq.expiresAt}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[#154230] font-bold text-sm">{rfq.currency} {rfq.targetPrice}/{rfq.unit}</p>
                    <div className="flex items-center justify-end gap-1 mt-2 text-[#4A4A4A] text-xs">
                      <MessageSquare className="w-3 h-3" />
                      <span>{rfq.responses} quotes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Burgundy Bottom Stats Bar */}
      <div className="fixed bottom-20 left-0 right-0 bg-[#5D1E21] px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <p className="text-white text-lg font-bold">{stats.total}</p>
            <p className="text-white/70 text-[10px] font-medium">Total</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <p className="text-white text-lg font-bold">{stats.open}</p>
            <p className="text-white/70 text-[10px] font-medium">Open</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <p className="text-white text-lg font-bold">{stats.quoted}</p>
            <p className="text-white/70 text-[10px] font-medium">Quoted</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <p className="text-white text-lg font-bold">{stats.accepted}</p>
            <p className="text-white/70 text-[10px] font-medium">Accepted</p>
          </div>
        </div>
      </div>

      {/* View RFQ Modal */}
      {viewingRFQ && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setViewingRFQ(null)}>
          <div
            className="bg-white rounded-t-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 px-5 pt-5 pb-4 border-b border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#5D1E21] font-mono text-xs font-medium">RFQ-{viewingRFQ.id}</span>
                  <h2 className="text-lg font-bold text-[#101111]}">{viewingRFQ.title}</h2>
                </div>
                <button
                  onClick={() => setViewingRFQ(null)}
                  className="w-10 h-10 bg-[#E6E2DA] rounded-full flex items-center justify-center hover:bg-[#D4CCBE] transition-colors"
                >
                  <X className="w-5 h-5 text-[#4A4A4A]" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-5 py-4 space-y-4">
              {/* Status & Category */}
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold ${statusConfig[viewingRFQ.status].bg} ${statusConfig[viewingRFQ.status].color}`}>
                  {statusLabels[viewingRFQ.status]}
                </span>
                <span className="text-[#4A4A4A] text-sm">{viewingRFQ.category}</span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#E6E2DA] rounded-2xl p-4">
                  <p className="text-[#4A4A4A] text-xs font-medium mb-1">Quantity</p>
                  <p className="text-[#101111] font-semibold text-sm">{viewingRFQ.quantity} {viewingRFQ.unit}</p>
                </div>
                <div className="bg-[#E6E2DA] rounded-2xl p-4">
                  <p className="text-[#4A4A4A] text-xs font-medium mb-1">Target Price</p>
                  <p className="text-[#154230] font-bold text-sm">{viewingRFQ.currency} {viewingRFQ.targetPrice}/{viewingRFQ.unit}</p>
                </div>
                <div className="bg-[#E6E2DA] rounded-2xl p-4">
                  <p className="text-[#4A4A4A] text-xs font-medium mb-1">Origin</p>
                  <p className="text-[#101111] font-medium text-sm">{viewingRFQ.origin}</p>
                </div>
                <div className="bg-[#E6E2DA] rounded-2xl p-4">
                  <p className="text-[#4A4A4A] text-xs font-medium mb-1">Destination</p>
                  <p className="text-[#101111] font-medium text-sm">{viewingRFQ.destination}</p>
                </div>
                <div className="bg-[#E6E2DA] rounded-2xl p-4">
                  <p className="text-[#4A4A4A] text-xs font-medium mb-1">Created</p>
                  <p className="text-[#101111] text-sm">{viewingRFQ.createdAt}</p>
                </div>
                <div className="bg-[#E6E2DA] rounded-2xl p-4">
                  <p className="text-[#4A4A4A] text-xs font-medium mb-1">Expires</p>
                  <p className="text-[#101111] text-sm">{viewingRFQ.expiresAt}</p>
                </div>
              </div>

              {/* Quotes Section */}
              <div className="bg-[#E6E2DA] rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#154230]" />
                    <span className="text-[#101111] font-semibold text-sm">Quotes Received</span>
                  </div>
                  <span className="text-[#154230] font-bold text-lg">{viewingRFQ.responses}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Link
                  href="/marketplace/inbox"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#E6E2DA] text-[#101111] font-semibold rounded-2xl hover:bg-[#D4CCBE] transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  View Quotes
                </Link>
                <Link
                  href="/rfqs/new"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#154230] text-white font-semibold rounded-2xl hover:bg-[#1d5240] transition-colors text-sm"
                >
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
