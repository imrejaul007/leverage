'use client';

import { useState } from 'react';
import Link from 'next/link';

interface InboxItem {
  id: string;
  type: 'quote' | 'bid' | 'requirement' | 'response' | 'order';
  subject: string;
  productName: string;
  productImage: string;
  supplierName: string;
  supplierCountry: string;
  status: 'pending' | 'viewed' | 'responded' | 'accepted' | 'declined';
  date: string;
  lastMessage: string;
  unread: boolean;
  price?: number;
  quantity?: string;
}

const inboxItems: InboxItem[] = [
  {
    id: '1',
    type: 'quote',
    subject: 'Quote Request - Basmati Rice',
    productName: 'Premium Basmati Rice 1121',
    productImage: '🍚',
    supplierName: 'Global Trade Exports',
    supplierCountry: '🇮🇳',
    status: 'responded',
    date: '2024-01-20',
    lastMessage: 'We can offer $820/MT for 100MT with CIF Dubai terms.',
    unread: true,
    price: 820,
    quantity: '100 MT',
  },
  {
    id: '2',
    type: 'bid',
    subject: 'Bid Submitted - Solar Panels',
    productName: 'Solar Panels 550W Mono PERC',
    productImage: '☀️',
    supplierName: 'Shanghai Import Co.',
    supplierCountry: '🇨🇳',
    status: 'pending',
    date: '2024-01-19',
    lastMessage: 'Your bid of $160/unit is awaiting supplier response.',
    unread: true,
    price: 160,
    quantity: '500 units',
  },
  {
    id: '3',
    type: 'requirement',
    subject: 'Requirements Sent - Cotton Yarn',
    productName: 'Organic Cotton Yarn 40/1',
    productImage: '🧶',
    supplierName: 'Global Trade Exports',
    supplierCountry: '🇮🇳',
    status: 'viewed',
    date: '2024-01-18',
    lastMessage: 'Supplier viewed your requirements. Awaiting response.',
    unread: false,
    quantity: '50 MT',
  },
  {
    id: '4',
    type: 'response',
    subject: 'Quote Received - Olive Oil',
    productName: 'Olive Oil Extra Virgin',
    productImage: '🫒',
    supplierName: 'Turkey Merchants',
    supplierCountry: '🇹🇷',
    status: 'accepted',
    date: '2024-01-17',
    lastMessage: 'Quote accepted! Proceeding to order placement.',
    unread: false,
    price: 4.30,
    quantity: '25 MT',
  },
  {
    id: '5',
    type: 'quote',
    subject: 'Quote Request - Steel Billets',
    productName: 'Steel Billets Grade A',
    productImage: '⚙️',
    supplierName: 'Turkey Merchants',
    supplierCountry: '🇹🇷',
    status: 'declined',
    date: '2024-01-16',
    lastMessage: 'Unfortunately, we cannot meet the required specifications at this price.',
    unread: false,
    price: 580,
    quantity: '200 MT',
  },
  {
    id: '6',
    type: 'order',
    subject: 'Order Confirmed - Black Pepper',
    productName: 'Black Pepper MG1 Grade',
    productImage: '🌶️',
    supplierName: 'Vietnam Sourcing',
    supplierCountry: '🇻🇳',
    status: 'responded',
    date: '2024-01-15',
    lastMessage: 'Order confirmed. Shipment scheduled for Feb 1st.',
    unread: true,
    price: 4400,
    quantity: '10 MT',
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-amber-500/20 text-amber-400', icon: '⏳' },
  viewed: { label: 'Viewed', color: 'bg-blue-500/20 text-blue-400', icon: '👁️' },
  responded: { label: 'Responded', color: 'bg-emerald-500/20 text-emerald-400', icon: '💬' },
  accepted: { label: 'Accepted', color: 'bg-green-500/20 text-green-400', icon: '✓' },
  declined: { label: 'Declined', color: 'bg-red-500/20 text-red-400', icon: '✕' },
};

const typeConfig = {
  quote: { label: 'Quote', color: 'bg-[#C49A6C]/20 text-[#C49A6C]', icon: '📋' },
  bid: { label: 'Bid', color: 'bg-emerald-500/20 text-emerald-400', icon: '🎯' },
  requirement: { label: 'Requirements', color: 'bg-blue-500/20 text-blue-400', icon: '📝' },
  response: { label: 'Response', color: 'bg-violet-500/20 text-violet-400', icon: '💭' },
  order: { label: 'Order', color: 'bg-pink-500/20 text-pink-400', icon: '📦' },
};

export default function MarketplaceInboxPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'responded'>('all');
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);

  const filteredItems = inboxItems.filter(item => {
    if (activeTab === 'pending') return item.status === 'pending' || item.status === 'viewed';
    if (activeTab === 'responded') return item.status === 'responded' || item.status === 'accepted';
    return true;
  });

  const unreadCount = inboxItems.filter(m => m.unread).length;
  const pendingCount = inboxItems.filter(m => m.status === 'pending' || m.status === 'viewed').length;
  const respondedCount = inboxItems.filter(m => m.status === 'responded' || m.status === 'accepted').length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">Marketplace Inbox</h1>
          <p className="text-[#D8CCBC]/60 text-sm">{inboxItems.length} inquiries • {unreadCount} unread</p>
        </div>
        <div className="flex gap-2">
          <Link href="/marketplace" className="px-4 py-2 bg-[#0E3B36] text-[#F4F1EA] font-semibold rounded-xl hover:bg-[#0f4a42] transition-colors text-center">
            Browse Products
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {[
          { id: 'all', label: 'All', count: inboxItems.length },
          { id: 'pending', label: 'Pending', count: pendingCount },
          { id: 'responded', label: 'Responded', count: respondedCount },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#D8CCBC]'
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.id ? 'bg-[#081512]/20' : 'bg-[rgba(255,255,255,0.1)]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Pending', value: pendingCount, color: 'text-amber-400' },
          { label: 'Responded', value: respondedCount, color: 'text-emerald-400' },
          { label: 'Accepted', value: inboxItems.filter(m => m.status === 'accepted').length, color: 'text-green-400' },
          { label: 'Total Value', value: `$${inboxItems.reduce((sum, m) => sum + (m.price || 0) * parseInt(m.quantity?.replace(/[^0-9]/g, '') || '0'), 0).toLocaleString()}`, color: 'text-[#C49A6C]' },
        ].map(stat => (
          <div key={stat.label} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-3 sm:p-4 text-center">
            <p className={`text-lg sm:text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-[#D8CCBC]/60 text-xs sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Inbox List */}
      {filteredItems.length === 0 ? (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 sm:p-12 text-center">
          <span className="text-5xl sm:text-6xl mb-4 block">📭</span>
          <h3 className="text-[#F4F1EA] font-semibold mb-2">No inquiries</h3>
          <p className="text-[#D8CCBC]/60 text-sm">Send a quote request, bid, or requirements to start.</p>
          <Link href="/marketplace" className="inline-block mt-6 px-6 py-3 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`bg-[rgba(255,255,255,0.02)] border rounded-xl p-4 cursor-pointer transition-all hover:border-[#C49A6C]/30 ${
                item.unread ? 'border-l-4 border-l-[#C49A6C] border-[rgba(255,255,255,0.05)]' : 'border-[rgba(255,255,255,0.05)]'
              } ${selectedItem?.id === item.id ? 'border-[#C49A6C]' : ''}`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Product Image */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
                  {item.productImage}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-xs ${typeConfig[item.type].color}`}>
                        {typeConfig[item.type].icon} {typeConfig[item.type].label}
                      </span>
                      {item.unread && <span className="w-2 h-2 bg-[#C49A6C] rounded-full"></span>}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs ${statusConfig[item.status].color}`}>
                      {statusConfig[item.status].icon} {statusConfig[item.status].label}
                    </span>
                  </div>

                  <h3 className={`font-medium text-sm sm:text-base truncate ${item.unread ? 'text-[#F4F1EA]' : 'text-[#D8CCBC]'}`}>
                    {item.subject}
                  </h3>

                  <p className="text-[#D8CCBC]/60 text-xs sm:text-sm truncate mt-1">{item.lastMessage}</p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span>{item.supplierCountry}</span>
                      <span className="text-[#D8CCBC]/50 hidden sm:inline">{item.supplierName}</span>
                    </div>
                    <span className="text-[#D8CCBC]/50 text-xs">{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSelectedItem(null)} />
          <div className="relative bg-[#0E3B36] rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[85vh] sm:max-h-[80vh] overflow-y-auto">
            {/* Handle */}
            <div className="flex justify-center py-3 sm:hidden">
              <div className="w-12 h-1 bg-[rgba(255,255,255,0.2)] rounded-full"></div>
            </div>

            {/* Header */}
            <div className="sticky top-0 bg-[#0E3B36] border-b border-[rgba(255,255,255,0.05)] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#081512] to-[#0E3B36] flex items-center justify-center text-2xl">
                  {selectedItem.productImage}
                </div>
                <div>
                  <h3 className="font-semibold text-[#F4F1EA]">{selectedItem.productName}</h3>
                  <p className="text-[#D8CCBC]/60 text-sm">{selectedItem.supplierCountry} {selectedItem.supplierName}</p>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} className="text-[#D8CCBC] hover:text-white p-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Status & Type */}
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-lg text-sm ${typeConfig[selectedItem.type].color}`}>
                  {typeConfig[selectedItem.type].icon} {typeConfig[selectedItem.type].label}
                </span>
                <span className={`px-3 py-1 rounded-lg text-sm ${statusConfig[selectedItem.status].color}`}>
                  {statusConfig[selectedItem.status].icon} {statusConfig[selectedItem.status].label}
                </span>
              </div>

              {/* Your Request */}
              <div className="bg-[#081512] rounded-xl p-4">
                <h4 className="text-[#F4F1EA] font-medium mb-3">Your Request</h4>
                <div className="grid grid-cols-2 gap-4">
                  {selectedItem.quantity && (
                    <div>
                      <p className="text-[#D8CCBC]/60 text-sm">Quantity</p>
                      <p className="text-[#F4F1EA] font-medium">{selectedItem.quantity}</p>
                    </div>
                  )}
                  {selectedItem.price && (
                    <div>
                      <p className="text-[#D8CCBC]/60 text-sm">
                        {selectedItem.type === 'bid' ? 'Your Bid' : 'Target Price'}
                      </p>
                      <p className="text-[#C49A6C] font-bold">${selectedItem.price}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Supplier Response */}
              <div className="bg-[#081512] rounded-xl p-4">
                <h4 className="text-[#F4F1EA] font-medium mb-3">Supplier Response</h4>
                <p className="text-[#D8CCBC]/80">{selectedItem.lastMessage}</p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col gap-2">
                {selectedItem.status === 'responded' && (
                  <>
                    <button className="w-full py-3 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl hover:bg-[#D4AA82] transition-colors">
                      Accept Quote
                    </button>
                    <button className="w-full py-3 bg-[#0E3B36] text-[#F4F1EA] font-semibold rounded-xl border border-[#C49A6C]/30 hover:bg-[#0f4a42] transition-colors">
                      Negotiate
                    </button>
                  </>
                )}
                {selectedItem.status === 'accepted' && (
                  <button className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors">
                    Place Order
                  </button>
                )}
                {selectedItem.status === 'pending' && (
                  <button className="w-full py-3 bg-red-500/20 text-red-400 font-semibold rounded-xl hover:bg-red-500/30 transition-colors">
                    Cancel Request
                  </button>
                )}
                {selectedItem.status === 'declined' && (
                  <Link href="/marketplace" className="w-full py-3 bg-[#0E3B36] text-[#F4F1EA] font-semibold rounded-xl text-center hover:bg-[#0f4a42] transition-colors">
                    Browse Alternatives
                  </Link>
                )}
                <button className="w-full py-3 bg-[#081512] text-[#D8CCBC] font-semibold rounded-xl hover:bg-[#0E3B36] transition-colors">
                  💬 Message Supplier
                </button>
                <Link href={`/marketplace/${selectedItem.id}`} className="w-full py-3 bg-[#081512] text-[#D8CCBC] font-semibold rounded-xl text-center hover:bg-[#0E3D36] transition-colors">
                  View Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
