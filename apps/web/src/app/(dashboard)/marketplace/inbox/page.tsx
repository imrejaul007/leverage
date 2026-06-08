'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MessageSquare, CheckCircle, Clock, DollarSign, Package, Send, X } from 'lucide-react';

interface InboxItem {
  id: string;
  type: 'quote' | 'bid' | 'requirement' | 'response' | 'order';
  subject: string;
  productName: string;
  supplierName: string;
  supplierCountry: string;
  status: 'pending' | 'viewed' | 'responded' | 'accepted' | 'declined';
  date: string;
  lastMessage: string;
  unread: boolean;
  price?: number;
  quantity?: string;
  image: string;
}

const inboxItems: InboxItem[] = [
  { id: '1', type: 'quote', subject: 'Quote Request - Basmati Rice', productName: 'Premium Basmati Rice 1121', supplierName: 'Global Trade Exports', supplierCountry: '🇮🇳', status: 'responded', date: '2024-01-20', lastMessage: 'We can offer $820/MT for 100MT with CIF Dubai terms.', unread: true, price: 820, quantity: '100 MT', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop' },
  { id: '2', type: 'bid', subject: 'Bid Submitted - Solar Panels', productName: 'Solar Panels 550W Mono PERC', supplierName: 'Shanghai Import Co.', supplierCountry: '🇨🇳', status: 'pending', date: '2024-01-19', lastMessage: 'Your bid of $160/unit is awaiting supplier response.', unread: true, price: 160, quantity: '500 units', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=100&h=100&fit=crop' },
  { id: '3', type: 'requirement', subject: 'Requirements Sent - Cotton Yarn', productName: 'Organic Cotton Yarn 40/1', supplierName: 'Global Trade Exports', supplierCountry: '🇮🇳', status: 'viewed', date: '2024-01-18', lastMessage: 'Supplier viewed your requirements. Awaiting response.', unread: false, quantity: '50 MT', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=100&h=100&fit=crop' },
  { id: '4', type: 'response', subject: 'Quote Received - Olive Oil', productName: 'Extra Virgin Olive Oil', supplierName: 'Turkey Merchants', supplierCountry: '🇹🇷', status: 'accepted', date: '2024-01-17', lastMessage: 'Great! We accept your quote. Proceeding with order.', unread: false, price: 4.50, quantity: '20 MT', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop' },
  { id: '5', type: 'order', subject: 'Order Confirmed - Steel Billets', productName: 'Steel Billets Grade A', supplierName: 'Turkey Merchants', supplierCountry: '🇹🇷', status: 'viewed', date: '2024-01-16', lastMessage: 'Order #ORD-2024-004 confirmed. Shipping next week.', unread: false, price: 620, quantity: '1000 MT', image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=100&h=100&fit=crop' },
];

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  pending: { color: 'text-[#A6824A]', bg: 'bg-[#A6824A]/10', label: 'Pending' },
  viewed: { color: 'text-[#4A4A4A]', bg: 'bg-[#E6E2DA]', label: 'Viewed' },
  responded: { color: 'text-[#154230]', bg: 'bg-[#154230]/10', label: 'Responded' },
  accepted: { color: 'text-[#154230]', bg: 'bg-[#154230]/10', label: 'Accepted' },
  declined: { color: 'text-[#5D1E21]', bg: 'bg-[#5D1E21]/10', label: 'Declined' },
};

const typeConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  quote: { icon: <DollarSign className="w-4 h-4" />, color: 'text-[#A6824A]' },
  bid: { icon: <Package className="w-4 h-4" />, color: 'text-[#154230]' },
  requirement: { icon: <CheckCircle className="w-4 h-4" />, color: 'text-blue-600' },
  response: { icon: <MessageSquare className="w-4 h-4" />, color: 'text-[#154230]' },
  order: { icon: <Package className="w-4 h-4" />, color: 'text-[#5D1E21]' },
};

export default function InboxPage() {
  const [items, setItems] = useState(inboxItems);
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');

  const unreadCount = items.filter(i => i.unread).length;

  const filteredItems = items.filter(item =>
    item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkAsRead = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, unread: false } : item
    ));
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedItem) return;
    setReplyText('');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Inbox</h1>
          <p className="text-[#4A4A4A] text-sm">{unreadCount} unread messages</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
        />
      </div>

      {/* Messages List */}
      <div className="space-y-2">
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedItem(item);
              handleMarkAsRead(item.id);
            }}
            className={`bg-white border rounded-xl p-4 cursor-pointer hover:shadow-md transition-all ${
              item.unread ? 'border-[#154230]/30' : 'border-black/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#E6E2DA] flex-shrink-0">
                <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`${typeConfig[item.type].color}`}>
                    {typeConfig[item.type].icon}
                  </span>
                  <span className="text-[#4A4A4A] text-xs">{item.supplierCountry}</span>
                  {item.unread && <span className="w-2 h-2 bg-[#154230] rounded-full"></span>}
                </div>
                <h3 className={`text-sm font-medium truncate ${item.unread ? 'text-[#101111]' : 'text-[#4A4A4A]'}`}>
                  {item.subject}
                </h3>
                <p className="text-[#4A4A4A] text-xs mt-1 line-clamp-1">{item.lastMessage}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-[#4A4A4A] text-xs">{item.date}</span>
                {item.price && (
                  <p className="text-[#154230] font-semibold text-sm mt-1">${item.price}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white border border-black/5 rounded-xl w-full max-w-lg max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#E6E2DA]">
                  <img src={selectedItem.image} alt={selectedItem.productName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-[#101111] font-semibold text-sm">{selectedItem.subject}</h2>
                  <p className="text-[#4A4A4A] text-xs">{selectedItem.supplierName}</p>
                </div>
              </div>
              <button onClick={() => setSelectedItem(null)} className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-4 max-h-[50vh] overflow-y-auto">
              <div className="flex gap-3 p-3 bg-[#E6E2DA] rounded-lg">
                <div className="w-8 h-8 rounded bg-[#A6824A] flex items-center justify-center text-white text-xs font-bold">
                  {selectedItem.supplierName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#101111] font-medium text-sm">{selectedItem.supplierName}</span>
                    <span className="text-[#4A4A4A] text-xs">{selectedItem.date}</span>
                  </div>
                  <p className="text-[#101111] text-sm">{selectedItem.lastMessage}</p>
                  {selectedItem.price && selectedItem.quantity && (
                    <div className="mt-2 flex gap-3 text-xs">
                      <span className="text-[#154230] font-semibold">${selectedItem.price}/{selectedItem.quantity.includes('MT') ? 'MT' : 'unit'}</span>
                      <span className="text-[#4A4A4A]">Qty: {selectedItem.quantity}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-black/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 h-10 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                />
                <button onClick={handleReply} className="px-4 h-10 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
