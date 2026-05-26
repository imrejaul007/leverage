'use client';

import { useState } from 'react';

const tabs = [
  { id: 'verify', label: 'Verify', icon: '✓' },
  { id: 'book', label: 'Book', icon: '📅' },
  { id: 'solutions', label: 'Solutions', icon: '💡' },
  { id: 'grow', label: 'Grow', icon: '🌍' },
];

const experts = [
  { id: '1', name: 'Rakesh Sharma', title: 'Shipping Consultant', image: 'RS', rating: 4.9, reviews: 128, price: 3000, subPrice: 2250, online: true, verified: true },
  { id: '2', name: 'Anita Iyer', title: 'Customs Expert', image: 'AI', rating: 4.8, reviews: 96, price: 2500, subPrice: 1875, online: true, verified: true },
  { id: '3', name: 'Vikram Singh', title: 'Logistics Expert', image: 'VS', rating: 4.9, reviews: 74, price: 3500, subPrice: 2625, online: true, verified: true },
  { id: '4', name: 'Neha Bansal', title: 'Trade Finance', image: 'NB', rating: 4.8, reviews: 63, price: 2800, subPrice: 2100, online: false, verified: true },
  { id: '5', name: 'David Lee', title: 'Supply Chain', image: 'DL', rating: 4.9, reviews: 58, price: 3200, subPrice: 2400, online: false, verified: true },
  { id: '6', name: 'Maria Santos', title: 'Import Export', image: 'MS', rating: 4.7, reviews: 45, price: 2900, subPrice: 2175, online: true, verified: true },
];

const categories = [
  { name: 'Shipping & Freight', count: 42, icon: '🚢' },
  { name: 'Customs & Compliance', count: 38, icon: '✅' },
  { name: 'Import / Export', count: 24, icon: '🌐' },
  { name: 'Trade Finance', count: 31, icon: '💰' },
  { name: 'Legal & Contracts', count: 28, icon: '⚖️' },
  { name: 'Sourcing', count: 18, icon: '🔍' },
];

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);
  const [bookingType, setBookingType] = useState<'one-time' | 'subscription'>('one-time');
  const [duration, setDuration] = useState('30');
  const [showSidebar, setShowSidebar] = useState(false);

  const getPrice = (expert: typeof experts[0]) => {
    const base = bookingType === 'subscription' ? expert.subPrice : expert.price;
    if (duration === '30') return base / 2;
    if (duration === '60') return base;
    if (duration === '120') return base * 2;
    return base;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">Consultation Hub</h1>
          <p className="text-[#D8CCBC]/60 text-sm">Connect with trade experts</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#C49A6C] flex items-center justify-center text-[#081512] font-bold">
            JD
          </div>
          <div className="hidden sm:block">
            <p className="text-[#F4F1EA] text-sm font-medium">John Doe</p>
            <p className="text-[#C49A6C] text-xs">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Tabs - Mobile scrollable */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-colors ${
              activeTab === tab.id
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#D8CCBC]'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden xs:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search - Mobile responsive */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search experts..."
          className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm"
        />
        <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex gap-4">
        {/* Expert Cards - Main content */}
        <div className="flex-1 space-y-4">
          {/* Categories - Mobile horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-3">
            {categories.map(cat => (
              <button
                key={cat.name}
                className="flex-shrink-0 card p-3 flex items-center gap-3 hover:border-[#C49A6C]/30 transition-colors min-w-[140px] sm:min-w-0"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="text-left">
                  <p className="text-[#F4F1EA] text-sm font-medium">{cat.name}</p>
                  <p className="text-[#C49A6C] text-xs">{cat.count} experts</p>
                </div>
              </button>
            ))}
          </div>

          {/* Top Experts */}
          <div>
            <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Top Experts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {experts.map(expert => (
                <div
                  key={expert.id}
                  onClick={() => { setSelectedExpert(expert); setShowSidebar(true); }}
                  className="card cursor-pointer hover:border-[#C49A6C]/30 transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold border border-[#C49A6C]/20">
                        {expert.image}
                      </div>
                      {expert.online && (
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#081512]"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[#F4F1EA] font-medium truncate">{expert.name}</h3>
                        {expert.verified && (
                          <span className="text-[#C49A6C]">✓</span>
                        )}
                      </div>
                      <p className="text-[#D8CCBC]/60 text-xs truncate">{expert.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-[#C49A6C]">★</span>
                      <span className="text-[#F4F1EA]">{expert.rating}</span>
                      <span className="text-[#D8CCBC]/50">({expert.reviews})</span>
                    </div>
                    <span className="text-[#C49A6C] font-semibold">${expert.price}/hr</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expert Detail Sidebar - Mobile: Modal/Drawer style */}
        {selectedExpert && showSidebar && (
          <div className="fixed inset-0 z-50 bg-black/50 sm:relative sm:bg-transparent sm:block sm:w-80 lg:w-96">
            <div className="absolute bottom-0 left-0 right-0 sm:relative bg-[#081512] sm:bg-transparent rounded-t-2xl sm:rounded-xl p-4 sm:p-0 h-[70vh] sm:h-auto overflow-y-auto border-t border-[rgba(255,255,255,0.1)] sm:border-0">
              {/* Close button for mobile */}
              <button
                onClick={() => setShowSidebar(false)}
                className="sm:hidden absolute top-4 right-4 p-2 text-[#D8CCBC]"
              >
                ✕
              </button>

              <div className="space-y-4">
                {/* Expert Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] text-xl font-bold border border-[#C49A6C]/20">
                    {selectedExpert.image}
                  </div>
                  <div>
                    <h3 className="text-[#F4F1EA] text-lg font-semibold">{selectedExpert.name}</h3>
                    <p className="text-[#D8CCBC]/60 text-sm">{selectedExpert.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#C49A6C]">★</span>
                      <span className="text-[#F4F1EA] text-sm">{selectedExpert.rating}</span>
                      <span className="text-[#D8CCBC]/50 text-sm">({selectedExpert.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Booking Type */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setBookingType('one-time')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      bookingType === 'one-time'
                        ? 'bg-[#C49A6C] text-[#081512]'
                        : 'bg-[#0E3B36] text-[#D8CCBC]'
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    onClick={() => setBookingType('subscription')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      bookingType === 'subscription'
                        ? 'bg-[#C49A6C] text-[#081512]'
                        : 'bg-[#0E3B36] text-[#D8CCBC]'
                    }`}
                  >
                    Subscribe
                  </button>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-[#D8CCBC]/80 text-sm mb-2">Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full input"
                  >
                    <option value="30">30 minutes - ${getPrice(selectedExpert)}</option>
                    <option value="60">60 minutes - ${getPrice(selectedExpert)}</option>
                    <option value="120">120 minutes - ${getPrice(selectedExpert)}</option>
                  </select>
                </div>

                {/* Price */}
                <div className="p-4 bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-xl">
                  <p className="text-[#D8CCBC]/60 text-sm">Session Cost</p>
                  <p className="text-3xl font-bold text-[#F4F1EA]">${getPrice(selectedExpert)}</p>
                  {bookingType === 'subscription' && (
                    <p className="text-[#C49A6C] text-sm">20% subscriber discount</p>
                  )}
                </div>

                {/* Book Button */}
                <button className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
                  Book Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ad Wallet - Mobile friendly */}
      <div className="card bg-gradient-to-br from-[#0E3B36] to-[#081512] border-[#C49A6C]/20">
        <h3 className="text-lg font-semibold text-[#F4F1EA] mb-3">Ad Wallet</h3>
        <div className="text-center py-4">
          <p className="text-[#D8CCBC]/60 text-sm">Available Credits</p>
          <p className="text-4xl font-bold text-[#F4F1EA]">2,450</p>
          <p className="text-[#C49A6C]">≈ $245.00 value</p>
        </div>
        <button className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold">
          Buy Credits
        </button>
      </div>
    </div>
  );
}
