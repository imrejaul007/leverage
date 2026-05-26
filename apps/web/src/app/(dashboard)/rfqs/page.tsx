'use client';

import { useState } from 'react';
import Link from 'next/link';

const rfqStatuses = ['all', 'open', 'quoted', 'accepted', 'closed'];
const sampleRfqs = [
  {
    id: 'RFQ-2024-001',
    title: 'Basmati Rice - Premium Grade',
    category: 'Food & Agriculture',
    quantity: '500 MT',
    origin: 'India',
    destination: 'UAE',
    targetPrice: '$850/MT',
    status: 'quoted',
    responses: 12,
    created: '2024-01-20',
    expires: '2024-01-27',
  },
  {
    id: 'RFQ-2024-002',
    title: 'Cotton Yarn - 40/1 Combed',
    category: 'Textiles',
    quantity: '50 MT',
    origin: 'India',
    destination: 'Bangladesh',
    targetPrice: '$3.20/kg',
    status: 'open',
    responses: 5,
    created: '2024-01-19',
    expires: '2024-01-26',
  },
  {
    id: 'RFQ-2024-003',
    title: 'Solar Panels - 550W Mono',
    category: 'Electronics',
    quantity: '1 MW',
    origin: 'China',
    destination: 'Kenya',
    targetPrice: '$0.18/W',
    status: 'accepted',
    responses: 8,
    created: '2024-01-18',
    expires: '2024-01-25',
  },
  {
    id: 'RFQ-2024-004',
    title: 'Steel Billets - Grade A',
    category: 'Metals & Minerals',
    quantity: '1000 MT',
    origin: 'Turkey',
    destination: 'Egypt',
    targetPrice: '$620/MT',
    status: 'open',
    responses: 3,
    created: '2024-01-17',
    expires: '2024-01-24',
  },
  {
    id: 'RFQ-2024-005',
    title: 'Pharmaceutical Raw Materials',
    category: 'Healthcare',
    quantity: '5 MT',
    origin: 'Germany',
    destination: 'India',
    targetPrice: '$45/kg',
    status: 'closed',
    responses: 15,
    created: '2024-01-15',
    expires: '2024-01-22',
  },
];

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  open: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Open' },
  quoted: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Quoted' },
  accepted: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Accepted' },
  closed: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Closed' },
};

export default function RfqsPage() {
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRfqs = sampleRfqs.filter(rfq => {
    const matchesStatus = activeStatus === 'all' || rfq.status === activeStatus;
    const matchesSearch = searchQuery === '' ||
      rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rfq.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F4F1EA] mb-2">RFQs</h1>
          <p className="text-[#D8CCBC]/60">Request for Quotes - Find the best suppliers globally</p>
        </div>
        <Link
          href="/rfqs/new"
          className="px-6 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create RFQ
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active RFQs', value: '24', change: '+3 this week' },
          { label: 'Total Quotes', value: '156', change: '+12 this week' },
          { label: 'Avg Response Time', value: '4.2 hrs', change: '-0.5 hrs' },
          { label: 'Success Rate', value: '87%', change: '+2%' },
        ].map((stat, i) => (
          <div key={i} className="card">
            <p className="text-[#D8CCBC]/60 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#F4F1EA] mb-1">{stat.value}</p>
            <p className="text-emerald-400 text-xs">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        {/* Status Filter */}
        <div className="flex gap-2">
          {rfqStatuses.map(status => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors capitalize ${
                activeStatus === status
                  ? 'bg-[#C49A6C] text-[#081512]'
                  : 'bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] hover:bg-[rgba(255,255,255,0.1)]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1">
          <div className="relative max-w-md ml-auto">
            <input
              type="text"
              placeholder="Search RFQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/50 focus:outline-none focus:border-[#C49A6C]"
            />
            <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* RFQ List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.05)]">
                <th className="text-left py-4 px-6 text-[#D8CCBC]/60 text-sm font-medium">RFQ ID</th>
                <th className="text-left py-4 px-6 text-[#D8CCBC]/60 text-sm font-medium">Product</th>
                <th className="text-left py-4 px-6 text-[#D8CCBC]/60 text-sm font-medium">Route</th>
                <th className="text-left py-4 px-6 text-[#D8CCBC]/60 text-sm font-medium">Target Price</th>
                <th className="text-left py-4 px-6 text-[#D8CCBC]/60 text-sm font-medium">Responses</th>
                <th className="text-left py-4 px-6 text-[#D8CCBC]/60 text-sm font-medium">Status</th>
                <th className="text-left py-4 px-6 text-[#D8CCBC]/60 text-sm font-medium">Expires</th>
                <th className="text-right py-4 px-6 text-[#D8CCBC]/60 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRfqs.map(rfq => (
                <tr key={rfq.id} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                  <td className="py-4 px-6">
                    <span className="text-[#C49A6C] font-mono text-sm">{rfq.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="text-[#F4F1EA] font-medium">{rfq.title}</p>
                      <p className="text-[#D8CCBC]/50 text-sm">{rfq.quantity} • {rfq.category}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-[#D8CCBC]">{rfq.origin}</span>
                      <svg className="w-4 h-4 text-[#D8CCBC]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <span className="text-[#D8CCBC]">{rfq.destination}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#F4F1EA] font-medium">{rfq.targetPrice}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#C49A6C] rounded-full"
                          style={{ width: `${Math.min((rfq.responses / 20) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-[#D8CCBC] text-sm">{rfq.responses}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[rfq.status].bg} ${statusColors[rfq.status].text}`}>
                      {statusColors[rfq.status].label}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#D8CCBC] text-sm">{rfq.expires}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-[#C49A6C] hover:text-[#D4AA82] font-medium text-sm">
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRfqs.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-[#D8CCBC]/60">No RFQs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
