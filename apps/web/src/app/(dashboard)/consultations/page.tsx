'use client';

import { useState } from 'react';

const tabs = [
  { id: 'verify', label: 'Verify & Connect', icon: '✓' },
  { id: 'book', label: 'Book & Consult', icon: '📅' },
  { id: 'solutions', label: 'Get Solutions', icon: '💡' },
  { id: 'grow', label: 'Grow Globally', icon: '🌍' },
];

const categories = [
  { id: 'shipping', name: 'Shipping & Compliance', experts: 42, icon: '🚢' },
  { id: 'legal', name: 'Legal Advisory', experts: 38, icon: '⚖️' },
  { id: 'finance', name: 'Trade Finance', experts: 24, icon: '💰' },
  { id: 'sourcing', name: 'Sourcing', experts: 31, icon: '🔍' },
  { id: 'logistics', name: 'Logistics', experts: 28, icon: '📦' },
  { id: 'marketing', name: 'Marketing', experts: 18, icon: '📢' },
];

const experts = [
  {
    id: '1',
    name: 'Rakesh Sharma',
    title: 'Senior Trade Consultant',
    company: 'Global Trade Partners',
    image: 'RS',
    rating: 4.9,
    consultations: 127,
    hourlyRate: 1500,
    subscriberRate: 1200,
    experience: '15+ years',
    bio: 'Expert in international trade compliance, customs regulations, and documentation for Asian markets.',
    countries: ['India', 'UAE', 'Singapore'],
    verified: true,
    online: true,
  },
  {
    id: '2',
    name: 'Anita Iyer',
    title: 'Customs Expert',
    company: 'Asia Trade Hub',
    image: 'AI',
    rating: 4.8,
    consultations: 89,
    hourlyRate: 1800,
    subscriberRate: 1440,
    experience: '12+ years',
    bio: 'Specialized in China-US trade, tariff classification, and FTA optimization.',
    countries: ['China', 'USA', 'Germany'],
    verified: true,
    online: true,
  },
  {
    id: '3',
    name: 'Capt. Vikram Singh',
    title: 'Logistics Director',
    company: 'FastFreight Solutions',
    image: 'VS',
    rating: 4.7,
    consultations: 64,
    hourlyRate: 1200,
    subscriberRate: 960,
    experience: '20+ years',
    bio: 'Ocean and air freight specialist with expertise in supply chain optimization.',
    countries: ['Singapore', 'UAE', 'UK'],
    verified: true,
    online: false,
  },
  {
    id: '4',
    name: 'Neha Bansal',
    title: 'Trade Finance Specialist',
    company: 'Capital Trade Finance',
    image: 'NB',
    rating: 4.8,
    consultations: 156,
    hourlyRate: 2000,
    subscriberRate: 1600,
    experience: '10+ years',
    bio: 'Letter of Credit expert specializing in emerging markets.',
    countries: ['India', 'USA', 'UK'],
    verified: true,
    online: true,
  },
  {
    id: '5',
    name: 'David Lee',
    title: 'Legal Counsel',
    company: 'TradeLaw International',
    image: 'DL',
    rating: 4.9,
    consultations: 112,
    hourlyRate: 2500,
    subscriberRate: 2000,
    experience: '18+ years',
    bio: 'International trade law expert with focus on Asia-Pacific region.',
    countries: ['Korea', 'Japan', 'USA'],
    verified: true,
    online: false,
  },
];

const menuItems = [
  { label: 'Bookings', icon: '📅', count: 3 },
  { label: 'Orders & Invoices', icon: '📋', count: 12 },
  { label: 'Documents', icon: '📄', count: 0 },
  { label: 'Certificates', icon: '📜', count: 0 },
  { label: 'Subscriptions', icon: '💎', count: 0 },
  { label: 'Experts', icon: '👥', count: 0 },
];

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState('book');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-[#081512]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.05)]">
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between mb-6">
            {/* Search */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search anything…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C]"
                />
                <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Language */}
              <button className="flex items-center gap-2 px-4 py-2 bg-[#0E3B36] rounded-xl text-[#D8CCBC]">
                <span>EN</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* User */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-[#D8CCBC]/70 hover:text-[#F4F1EA]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="flex items-center gap-3 px-4 py-2 bg-[#0E3B36] rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#C49A6C] flex items-center justify-center text-[#081512] text-sm font-bold">JD</div>
                <div className="text-left">
                  <p className="text-[#F4F1EA] text-sm font-medium">John Doe</p>
                  <p className="text-[#C49A6C] text-xs">Super Admin</p>
                </div>
              </button>
            </div>
          </div>

          {/* Page Title */}
          <h1 className="text-3xl font-bold text-[#F4F1EA] mb-6">Consultation Hub</h1>

          {/* Tabs */}
          <div className="flex gap-2 pb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#C49A6C] text-[#081512]'
                    : 'bg-[#0E3B36] text-[#D8CCBC] hover:bg-[#0E3B36]/80'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-72 flex-shrink-0 space-y-4">
            {/* Ad Wallet */}
            <div className="card bg-gradient-to-br from-[#0E3B36] to-[#081512] border-[#C49A6C]/20">
              <div className="text-center py-4">
                <p className="text-[#D8CCBC]/60 text-sm mb-1">Ad Wallet Balance</p>
                <p className="text-4xl font-bold text-[#F4F1EA]">₹48,750.00</p>
              </div>
              <button className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
                Add Funds
              </button>
            </div>

            {/* Menu */}
            <div className="card p-2">
              {menuItems.map(item => (
                <button
                  key={item.label}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    <span className="text-[#F4F1EA]">{item.label}</span>
                  </div>
                  {item.count > 0 && (
                    <span className="w-6 h-6 bg-[#C49A6C]/20 text-[#C49A6C] text-xs rounded-full flex items-center justify-center">
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-[#F4F1EA] font-medium mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#D8CCBC]/60">Consultations</span>
                  <span className="text-[#F4F1EA] font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#D8CCBC]/60">Hours Spent</span>
                  <span className="text-[#F4F1EA] font-medium">24.5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#D8CCBC]/60">Saved</span>
                  <span className="text-[#C49A6C] font-medium">₹3,600</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Recommended Experts */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Top Recommended Experts</h2>
              <div className="grid grid-cols-5 gap-4">
                {experts.map(expert => (
                  <div
                    key={expert.id}
                    className="card hover:border-[#C49A6C]/30 transition-all cursor-pointer group"
                    onClick={() => { setSelectedExpert(expert); setShowProfile(true); }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold border border-[#C49A6C]/20">
                          {expert.image}
                        </div>
                        {expert.online && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#081512]"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-[#F4F1EA] text-sm font-medium truncate">{expert.name}</span>
                          {expert.verified && (
                            <svg className="w-4 h-4 text-[#C49A6C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <p className="text-[#D8CCBC]/60 text-xs truncate">{expert.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-[#F4F1EA] text-sm font-medium">{expert.rating}</span>
                      <span className="text-[#D8CCBC]/50 text-xs">({expert.consultations})</span>
                    </div>

                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#D8CCBC]/60">Regular</span>
                        <span className="text-[#F4F1EA]">₹{expert.hourlyRate}/hr</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[#C49A6C]">Subscriber</span>
                        <span className="text-[#C49A6C] font-medium">₹{expert.subscriberRate}/hr</span>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg text-sm font-medium hover:bg-[#0f4a42] transition-colors">
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Categories */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Consultation Categories</h2>
              <div className="grid grid-cols-6 gap-4">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className="card flex flex-col items-center text-center hover:border-[#C49A6C]/30 transition-all p-4"
                  >
                    <span className="text-3xl mb-2">{cat.icon}</span>
                    <p className="text-[#F4F1EA] text-sm font-medium mb-1">{cat.name}</p>
                    <p className="text-[#C49A6C] text-xs">{cat.experts} experts</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Expert Detail / Booking Panel */}
            {showProfile && selectedExpert && (
              <div className="card">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#F4F1EA]">Consultation Details</h2>
                  <button onClick={() => setShowProfile(false)} className="text-[#D8CCBC]/50 hover:text-[#F4F1EA]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-6">
                  {/* Expert Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] text-2xl font-bold border-2 border-[#C49A6C]/20">
                          {selectedExpert.image}
                        </div>
                        {selectedExpert.online && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#081512]"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-2xl font-bold text-[#F4F1EA]">{selectedExpert.name}</h3>
                          {selectedExpert.verified && (
                            <svg className="w-6 h-6 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <p className="text-[#D8CCBC]/70 mb-1">{selectedExpert.title}</p>
                        <p className="text-[#C49A6C] text-sm">{selectedExpert.company}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-[#0E3B36]/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[#C49A6C]">{selectedExpert.consultations}</p>
                        <p className="text-[#D8CCBC]/60 text-sm">Consultations</p>
                      </div>
                      <div className="bg-[#0E3B36]/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[#C49A6C]">{selectedExpert.rating}</p>
                        <p className="text-[#D8CCBC]/60 text-sm">Rating</p>
                      </div>
                      <div className="bg-[#0E3B36]/50 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-[#C49A6C]">{selectedExpert.experience}</p>
                        <p className="text-[#D8CCBC]/60 text-sm">Experience</p>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-[#D8CCBC]/70 mb-6">{selectedExpert.bio}</p>

                    {/* Countries */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-[#D8CCBC]/60 text-sm">Countries:</span>
                      {selectedExpert.countries.map(country => (
                        <span key={country} className="px-3 py-1 bg-[#0E3B36]/50 rounded-full text-[#F4F1EA] text-sm">{country}</span>
                      ))}
                    </div>

                    {/* Upcoming Consultation */}
                    <div className="bg-[#0E3B36]/30 border border-[#C49A6C]/20 rounded-xl p-4 mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">📹</span>
                        <div>
                          <p className="text-[#F4F1EA] font-medium">Upcoming Consultation</p>
                          <p className="text-[#D8CCBC]/60 text-sm">Feb 28, 2024 at 10:00 AM</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-[#C49A6C] text-[#081512] rounded-lg font-semibold hover:bg-[#D4AA82]">Join Now</button>
                        <button className="px-4 py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg border border-[rgba(255,255,255,0.1)]">Reschedule</button>
                      </div>
                    </div>

                    {/* Session Chat Preview */}
                    <div className="bg-[#0E3B36]/30 rounded-xl p-4">
                      <h4 className="text-[#F4F1EA] font-medium mb-3">Session Chat</h4>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#0E3B36] flex items-center justify-center text-[#C49A6C] text-xs font-bold">RS</div>
                          <div className="flex-1 bg-[#0E3B36]/50 rounded-xl rounded-tl-none p-3">
                            <p className="text-[#F4F1EA] text-sm">Sure, I can help you with the HSN code classification. Please share the product details.</p>
                            <p className="text-[#D8CCBC]/40 text-xs mt-1">10:05 AM</p>
                          </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                          <div className="bg-[#C49A6C]/20 rounded-xl rounded-tr-none p-3 max-w-xs">
                            <p className="text-[#F4F1EA] text-sm">It's a textile machinery for fabric printing</p>
                            <p className="text-[#D8CCBC]/40 text-xs mt-1">10:06 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar - Booking */}
                  <div className="w-80 flex-shrink-0">
                    <div className="bg-[#0E3B36]/30 rounded-xl p-4 mb-4">
                      <p className="text-[#D8CCBC]/60 text-sm mb-2">Session Price</p>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-[#F4F1EA]">₹{selectedExpert.hourlyRate}</span>
                        <span className="text-[#D8CCBC]/60">/hour</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#C49A6C]">Subscriber Price</span>
                          <span className="text-[#C49A6C] font-bold">₹{selectedExpert.subscriberRate}/hr</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#D8CCBC]/60">30 min session</span>
                          <span className="text-[#F4F1EA]">₹{Math.round(selectedExpert.hourlyRate / 2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#D8CCBC]/60">1 hour session</span>
                          <span className="text-[#F4F1EA]">₹{selectedExpert.hourlyRate}</span>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
                        Book Now
                      </button>
                    </div>

                    {/* Ad Spotlight */}
                    <div className="card">
                      <h4 className="text-[#F4F1EA] font-medium mb-3">Ad Spotlight</h4>
                      <div className="bg-[#0E3B36]/30 rounded-xl overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center">
                          <span className="text-6xl">🍚</span>
                        </div>
                        <div className="p-4">
                          <h5 className="text-[#F4F1EA] font-semibold mb-1">Basmati Rice 1121</h5>
                          <p className="text-[#D8CCBC]/60 text-sm mb-2">Premium quality • ₹50/kg MOQ 100kg</p>
                          <button className="w-full py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg font-medium text-sm hover:bg-[#0f4a42] transition-colors">
                            Go to Ad Center
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
