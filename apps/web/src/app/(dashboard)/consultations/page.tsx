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
  { name: 'Shipping', count: 42, icon: '🚢' },
  { name: 'Customs', count: 38, icon: '✅' },
  { name: 'Trade', count: 31, icon: '💰' },
  { name: 'Legal', count: 28, icon: '⚖️' },
];

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);
  const [showExpertDetail, setShowExpertDetail] = useState(false);
  const [bookingType, setBookingType] = useState<'one-time' | 'subscription'>('one-time');
  const [duration, setDuration] = useState('30');

  const getPrice = (expert: typeof experts[0]) => {
    const base = bookingType === 'subscription' ? expert.subPrice : expert.price;
    if (duration === '30') return base / 2;
    if (duration === '60') return base;
    return base * 2;
  };

  const handleExpertSelect = (expert: typeof experts[0]) => {
    setSelectedExpert(expert);
    setShowExpertDetail(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Tabs - Horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0">
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

      {/* Categories - Horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0">
        {categories.map(cat => (
          <button
            key={cat.name}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-[#0E3B36] rounded-xl"
          >
            <span className="text-xl">{cat.icon}</span>
            <div className="text-left">
              <p className="text-[#F4F1EA] text-sm font-medium">{cat.name}</p>
              <p className="text-[#C49A6C] text-xs">{cat.count}+</p>
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search experts..."
          className="input pl-12"
        />
        <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Expert Cards - Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {experts.map(expert => (
          <div
            key={expert.id}
            onClick={() => handleExpertSelect(expert)}
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
                    <svg className="w-4 h-4 text-[#C49A6C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-[#D8CCBC]/60 text-xs truncate">{expert.title}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[#F4F1EA] text-sm font-medium">{expert.rating}</span>
                <span className="text-[#D8CCBC]/50 text-xs">({expert.reviews})</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.05)]">
              <div>
                <p className="text-[#D8CCBC]/50 text-xs">From</p>
                <p className="text-[#F4F1EA] font-bold">${expert.price}/hr</p>
              </div>
              <button className="px-4 py-2 bg-[#C49A6C] text-[#081512] rounded-lg text-sm font-semibold">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Expert Detail Modal/Drawer - Mobile friendly */}
      {showExpertDetail && selectedExpert && (
        <div className="fixed inset-0 z-50 sm:relative sm:inset-auto">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 sm:hidden"
            onClick={() => setShowExpertDetail(false)}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 sm:relative bg-[#081512] sm:bg-transparent rounded-t-2xl sm:rounded-none max-h-[85vh] sm:max-h-none overflow-y-auto">
            {/* Handle */}
            <div className="flex justify-center py-3 sm:hidden">
              <div className="w-12 h-1 bg-[#D8CCBC]/30 rounded-full"></div>
            </div>

            <div className="p-4 sm:p-0 space-y-4">
              {/* Close button for desktop */}
              <div className="hidden sm:flex justify-end">
                <button
                  onClick={() => setShowExpertDetail(false)}
                  className="p-2 text-[#D8CCBC] hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Expert Header */}
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] text-xl font-bold border border-[#C49A6C]/20">
                    {selectedExpert.image}
                  </div>
                  {selectedExpert.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#081512]"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-[#F4F1EA]">{selectedExpert.name}</h2>
                    {selectedExpert.verified && (
                      <svg className="w-5 h-5 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-[#D8CCBC]/70">{selectedExpert.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-[#F4F1EA] font-medium">{selectedExpert.rating}/5</span>
                    <span className="text-[#D8CCBC]/50">({selectedExpert.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#0E3B36] rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-[#C49A6C]">1,248</p>
                  <p className="text-[#D8CCBC]/60 text-xs">Consultations</p>
                </div>
                <div className="bg-[#0E3B36] rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-[#C49A6C]">15 min</p>
                  <p className="text-[#D8CCBC]/60 text-xs">Response</p>
                </div>
                <div className="bg-[#0E3B36] rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-[#C49A6C]">18+</p>
                  <p className="text-[#D8CCBC]/60 text-xs">Years Exp.</p>
                </div>
              </div>

              {/* Booking Type */}
              <div className="flex gap-2">
                <button
                  onClick={() => setBookingType('one-time')}
                  className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                    bookingType === 'one-time'
                      ? 'bg-[#C49A6C] text-[#081512]'
                      : 'bg-[#0E3B36] text-[#D8CCBC]'
                  }`}
                >
                  One Time
                </button>
                <button
                  onClick={() => setBookingType('subscription')}
                  className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
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
                  className="input"
                >
                  <option value="30">30 minutes - ${getPrice(selectedExpert)}</option>
                  <option value="60">60 minutes - ${getPrice(selectedExpert)}</option>
                  <option value="120">120 minutes - ${getPrice(selectedExpert)}</option>
                </select>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#D8CCBC]/60 text-sm">Session Cost</p>
                    <p className="text-3xl font-bold text-[#F4F1EA]">${getPrice(selectedExpert)}</p>
                    {bookingType === 'subscription' && (
                      <p className="text-[#C49A6C] text-sm">20% subscriber discount</p>
                    )}
                  </div>
                  <button className="px-6 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold">
                    Book Session
                  </button>
                </div>
              </div>

              {/* Upcoming Consultation */}
              <div className="bg-[#0E3B36]/50 rounded-xl p-4 border border-[#C49A6C]/20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">📹</span>
                  <div>
                    <p className="text-[#F4F1EA] font-medium">Upcoming Consultation</p>
                    <p className="text-[#D8CCBC]/60 text-sm">Today, 11:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-[#C49A6C] text-[#081512] rounded-lg font-semibold text-sm">
                    Join
                  </button>
                  <button className="flex-1 py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg text-sm">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ad Wallet Banner - Mobile friendly */}
      <div className="bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-2xl p-4 sm:p-6 border border-[#C49A6C]/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#D8CCBC]/60 text-sm">Ad Wallet</p>
            <p className="text-2xl font-bold text-[#F4F1EA]">$4,875</p>
          </div>
          <button className="px-4 py-2 bg-[#C49A6C] text-[#081512] rounded-lg font-semibold text-sm">
            Add Funds
          </button>
        </div>
      </div>

      {/* How it Works - Mobile friendly */}
      <div className="card">
        <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">How it Works</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { step: '1', title: 'Book', desc: 'Consult an expert' },
            { step: '2', title: 'Get Credit', desc: 'Equal ad credit' },
            { step: '3', title: 'Run Ads', desc: 'Promote products' },
            { step: '4', title: 'Grow', desc: 'Get more leads' },
          ].map(item => (
            <div key={item.step} className="text-center">
              <div className="w-8 h-8 bg-[#C49A6C] rounded-full flex items-center justify-center text-[#081512] font-bold mx-auto mb-2">
                {item.step}
              </div>
              <p className="text-[#F4F1EA] text-sm font-medium">{item.title}</p>
              <p className="text-[#D8CCBC]/50 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
