'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Plus, Clock, MessageSquare, ArrowRight, X, FileText, Globe, Truck } from 'lucide-react';

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

  return (
    <div className="space-y-4 relative overflow-hidden">
      {/* Background decorations - Elaborate graphics */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large Animated Globe */}
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] animate-[spin_80s_linear_infinite]">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.06]">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#5D1E21" strokeWidth="1" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#5D1E21" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#5D1E21" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#5D1E21" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="#5D1E21" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#5D1E21" strokeWidth="0.5" transform="rotate(60 200 200)" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#5D1E21" strokeWidth="0.5" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#5D1E21" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Document/Trade Route Pattern */}
        <svg className="absolute top-0 left-1/4 w-[500px] h-[400px] opacity-[0.06]" viewBox="0 0 500 400">
          <path d="M50,350 Q200,200 450,300" fill="none" stroke="#A6824A" strokeWidth="1.5" strokeDasharray="6,3" />
          <path d="M100,50 Q300,250 400,150" fill="none" stroke="#154230" strokeWidth="1" strokeDasharray="4,4" />
          <rect x="30" y="100" width="40" height="50" fill="none" stroke="#A6824A" strokeWidth="0.5" rx="2" />
          <rect x="80" y="150" width="35" height="45" fill="none" stroke="#A6824A" strokeWidth="0.5" rx="2" />
          <rect x="130" y="80" width="45" height="55" fill="none" stroke="#A6824A" strokeWidth="0.5" rx="2" />
          <circle cx="50" cy="350" r="5" fill="#A6824A" />
          <circle cx="450" cy="300" r="5" fill="#A6824A" />
        </svg>

        {/* Quote/Document Icons Pattern */}
        <svg className="absolute bottom-20 left-10 w-[150px] h-[100px] opacity-[0.05]" viewBox="0 0 150 100">
          <rect x="10" y="20" width="50" height="60" fill="none" stroke="#5D1E21" strokeWidth="1" rx="3" />
          <line x1="20" y1="35" x2="45" y2="35" stroke="#5D1E21" strokeWidth="1" />
          <line x1="20" y1="45" x2="40" y2="45" stroke="#5D1E21" strokeWidth="1" />
          <line x1="20" y1="55" x2="48" y2="55" stroke="#5D1E21" strokeWidth="1" />
          <rect x="70" y="30" width="50" height="60" fill="none" stroke="#A6824A" strokeWidth="1" rx="3" />
          <line x1="80" y1="45" x2="105" y2="45" stroke="#A6824A" strokeWidth="1" />
          <line x1="80" y1="55" x2="100" y2="55" stroke="#A6824A" strokeWidth="1" />
        </svg>

        {/* Gold Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${8 + (i * 7)}%`,
              top: `${20 + (i % 6) * 12}%`,
              width: i % 2 === 0 ? '3px' : '2px',
              height: i % 2 === 0 ? '3px' : '2px',
              backgroundColor: i % 3 === 0 ? '#5D1E21' : i % 3 === 1 ? '#A6824A' : '#154230',
              animationDelay: `${i * 0.3}s`,
              opacity: 0.2 + (i % 3) * 0.1,
            }}
          />
        ))}

        {/* Decorative Lines */}
        <svg className="absolute bottom-0 left-0 right-0 h-16" viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path d="M0,32 Q180,0 360,32 T720,32 T1080,32 T1440,32" fill="none" stroke="#5D1E21" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* FileText icon */}
          <div className="w-12 h-12 bg-[#154230] rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Request for Quotes</h1>
            <p className="text-[#4A4A4A] text-sm">{filteredRFQs.length} active requests</p>
          </div>
        </div>
        <Link href="/rfqs/new" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors text-sm shadow-lg">
          <Plus className="w-4 h-4" />
          Create RFQ
        </Link>
      </div>

      {/* RFQ Stats Bar */}
      <div className="flex items-center gap-6 p-4 bg-white border border-black/5 rounded-xl overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#154230]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{rfqs.filter(r => r.status === 'OPEN').length}</p>
            <p className="text-[#4A4A4A] text-xs">Open</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#A6824A]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{rfqs.filter(r => r.status === 'QUOTED').length}</p>
            <p className="text-[#4A4A4A] text-xs">Quoted</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center">
            <Truck className="w-5 h-5 text-[#5D1E21]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{rfqs.filter(r => r.status === 'ACCEPTED').length}</p>
            <p className="text-[#4A4A4A] text-xs">Accepted</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#154230]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">$2.4M</p>
            <p className="text-[#4A4A4A] text-xs">Trade Value</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search RFQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
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
                ? 'bg-[#154230] text-white'
                : 'bg-white text-[#4A4A4A] hover:bg-[#E6E2DA] border border-black/5'
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
        <div className="text-center py-12">
          <div className="w-14 h-14 bg-[#E6E2DA] rounded-xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-7 h-7 text-[#4A4A4A]" />
          </div>
          <p className="text-[#4A4A4A] text-sm mb-4">No RFQs found</p>
          <Link href="/rfqs/new" className="text-[#5D1E21] hover:underline font-medium text-sm">
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
                    <span className="text-[#5D1E21] font-mono text-xs">RFQ-{rfq.id}</span>
                    <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${statusConfig[rfq.status].bg} ${statusConfig[rfq.status].color}`}>
                      {statusLabels[rfq.status]}
                    </span>
                  </div>
                  <h3 className="text-[#101111] font-medium text-sm truncate">{rfq.title}</h3>
                  <p className="text-[#4A4A4A] text-xs mt-0.5">
                    {rfq.quantity} {rfq.unit} • {rfq.origin} → {rfq.destination}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[#154230] font-semibold text-sm">{rfq.currency} {rfq.targetPrice}/{rfq.unit}</p>
                    <div className="flex items-center gap-1 text-[#4A4A4A] text-xs">
                      <MessageSquare className="w-3 h-3" />
                      {rfq.responses} quotes
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#4A4A4A]" />
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
                <h2 className="text-lg font-bold text-[#101111]">{viewingRFQ.title}</h2>
                <span className="text-[#5D1E21] font-mono text-xs">RFQ-{viewingRFQ.id}</span>
              </div>
              <button onClick={() => setViewingRFQ(null)} className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium ${statusConfig[viewingRFQ.status].bg} ${statusConfig[viewingRFQ.status].color}`}>
                  {statusLabels[viewingRFQ.status]}
                </span>
                <span className="text-[#4A4A4A] text-xs">{viewingRFQ.category}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-[#E6E2DA] rounded-lg">
                <div>
                  <p className="text-[#4A4A4A] text-xs mb-1">Quantity</p>
                  <p className="text-[#101111] font-medium text-sm">{viewingRFQ.quantity} {viewingRFQ.unit}</p>
                </div>
                <div>
                  <p className="text-[#4A4A4A] text-xs mb-1">Target Price</p>
                  <p className="text-[#154230] font-semibold text-sm">{viewingRFQ.currency} {viewingRFQ.targetPrice}/{viewingRFQ.unit}</p>
                </div>
                <div>
                  <p className="text-[#4A4A4A] text-xs mb-1">Origin</p>
                  <p className="text-[#101111] text-sm">{viewingRFQ.origin}</p>
                </div>
                <div>
                  <p className="text-[#4A4A4A] text-xs mb-1">Destination</p>
                  <p className="text-[#101111] text-sm">{viewingRFQ.destination}</p>
                </div>
                <div>
                  <p className="text-[#4A4A4A] text-xs mb-1">Created</p>
                  <p className="text-[#101111] text-sm">{viewingRFQ.createdAt}</p>
                </div>
                <div>
                  <p className="text-[#4A4A4A] text-xs mb-1">Expires</p>
                  <p className="text-[#101111] text-sm">{viewingRFQ.expiresAt}</p>
                </div>
              </div>

              <div className="p-4 bg-[#E6E2DA] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#4A4A4A] text-sm">Quotes Received</span>
                  <span className="text-[#101111] font-semibold text-sm">{viewingRFQ.responses}</span>
                </div>
                <div className="flex items-center gap-2 text-[#4A4A4A] text-xs">
                  <Clock className="w-3 h-3" />
                  <span>Expires in 7 days</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href="/marketplace/inbox" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#E6E2DA] text-[#101111] font-medium rounded-lg hover:bg-[#D4CCBE] transition-colors text-sm">
                  <MessageSquare className="w-4 h-4" />
                  View Quotes
                </Link>
                <Link href="/rfqs/new" className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#154230] text-white font-medium rounded-lg hover:bg-[#1d5240] transition-colors text-sm">
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
