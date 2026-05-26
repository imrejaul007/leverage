'use client';

import { useState } from 'react';

const tabs = [
  { id: 'verify', label: 'Verify & Connect', icon: '✓' },
  { id: 'book', label: 'Book & Consult', icon: '📅' },
  { id: 'solutions', label: 'Get Solutions', icon: '💡' },
  { id: 'grow', label: 'Grow Globally', icon: '🌍' },
];

const experts = [
  { id: '1', name: 'Rakesh Sharma', title: 'Shipping Consultant', image: 'RS', rating: 4.9, reviews: 128, price: 3000, subPrice: 2250, online: true, verified: true },
  { id: '2', name: 'Anita Iyer', title: 'Customs & Compliance Expert', image: 'AI', rating: 4.8, reviews: 96, price: 2500, subPrice: 1875, online: true, verified: true },
  { id: '3', name: 'Capt. Vikram Singh', title: 'Logistics & Freight Expert', image: 'VS', rating: 4.9, reviews: 74, price: 3500, subPrice: 2625, online: true, verified: true },
  { id: '4', name: 'Neha Bansal', title: 'Trade Finance Advisor', image: 'NB', rating: 4.8, reviews: 63, price: 2800, subPrice: 2100, online: false, verified: true },
  { id: '5', name: 'David Lee', title: 'Global Supply Chain Expert', image: 'DL', rating: 4.9, reviews: 58, price: 3200, subPrice: 2400, online: false, verified: true },
];

const categories = [
  { name: 'Shipping & Freight', count: 42 },
  { name: 'Customs & Compliance', count: 38 },
  { name: 'Import / Export', count: 24 },
  { name: 'Trade Finance', count: 31 },
  { name: 'Legal & Contracts', count: 28 },
  { name: 'Sourcing & Procurement', count: 18 },
];

const menuItems = [
  { label: 'Bookings', count: 3 },
  { label: 'Orders & Invoices', count: 12 },
  { label: 'Documents', count: 0 },
  { label: 'Certificates', count: 0 },
  { label: 'Subscriptions', count: 0 },
  { label: 'Experts', count: 0 },
];

const expertiseTags = ['Freight Shipping', 'Logistics Strategy', 'Risk Management', 'Supply Chain'];

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);
  const [bookingType, setBookingType] = useState<'one-time' | 'subscription'>('one-time');
  const [duration, setDuration] = useState('30');

  const getPrice = (expert: typeof experts[0]) => {
    if (bookingType === 'subscription') {
      if (duration === '30') return expert.subPrice / 2;
      if (duration === '60') return expert.subPrice;
      if (duration === '120') return expert.subPrice * 2;
      return expert.subPrice;
    }
    if (duration === '30') return expert.price / 2;
    if (duration === '60') return expert.price;
    if (duration === '120') return expert.price * 2;
    return expert.price;
  };

  return (
    <div className="min-h-screen bg-[#081512]">
      {/* Header */}
      <div className="bg-[#0E3B36] border-b border-[rgba(255,255,255,0.05)]">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search expertise, industry, services..."
                  className="w-[420px] h-11 pl-12 pr-4 bg-[rgba(255,255,255,0.05] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[rgba(216,204,188,0.4)] focus:outline-none focus:border-[#C49A6C]"
                />
                <svg className="w-5 h-5 text-[rgba(216,204,188,0.5)] absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="h-11 px-4 flex items-center gap-2 bg-[rgba(255,255,255,0.05)] rounded-xl text-[#D8CCBC]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v12.586a1 1 0 01-1.707.707l-6.414 6.414a1 1 0 00-.293.707V21l4-4m-10.414-11.586a1 1 0 011.414 0l6.414 6.414a1 1 0 010 1.414l-6.414 6.414M15 11h4m-2-2v4" />
                </svg>
                <span>Filter</span>
              </button>
            </div>

            {/* User */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-[#D8CCBC]/70">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center gap-3 px-4 py-2 bg-[rgba(255,255,255,0.05)] rounded-xl">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=John`} alt="Avatar" className="w-8 h-8 rounded-full bg-[#0E3B36]" />
                <div className="text-left">
                  <p className="text-[#F4F1EA] text-sm font-medium leading-tight">John Doe</p>
                  <p className="text-[#C49A6C] text-xs leading-tight">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title and Tabs */}
        <div className="px-6 pb-4">
          <h1 className="text-3xl font-bold text-[#F4F1EA] mb-4">Consultation Hub</h1>
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#C49A6C] text-[#081512]'
                    : 'bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] hover:bg-[rgba(255,255,255,0.1)]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex gap-6">
        {/* Left Sidebar */}
        <div className="w-72 space-y-4">
          {/* Ad Wallet */}
          <div className="bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-2xl border border-[#C49A6C]/20 p-6">
            <div className="text-center py-2">
              <p className="text-[rgba(216,204,188,0.6)] text-sm mb-1">Ad Wallet Balance</p>
              <p className="text-4xl font-bold text-[#F4F1EA]">₹48,750.00</p>
            </div>
            <button className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors mt-4">
              Add Funds
            </button>
          </div>

          {/* Menu */}
          <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-2">
            {menuItems.map(item => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors text-left"
              >
                <span className="text-[#F4F1EA]">{item.label}</span>
                {item.count > 0 && (
                  <span className="w-6 h-6 bg-[#C49A6C]/20 text-[#C49A6C] text-xs rounded-full flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Your Stats */}
          <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-4">
            <h3 className="text-[#F4F1EA] font-medium mb-4">Your Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[rgba(216,204,188,0.6)]">Consultations</span>
                <span className="text-[#F4F1EA] font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[rgba(216,204,188,0.6)]">Hours Spent</span>
                <span className="text-[#F4F1EA] font-medium">24.5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[rgba(216,204,188,0.6)]">Saved</span>
                <span className="text-[#C49A6C] font-medium">₹3,600</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1">
          {/* Top Recommended Experts */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Top Recommended Experts</h2>
            <div className="grid grid-cols-5 gap-4">
              {experts.map(expert => (
                <div
                  key={expert.id}
                  onClick={() => setSelectedExpert(expert)}
                  className={`bg-[rgba(255,255,255,0.02)] rounded-2xl p-4 border transition-all cursor-pointer ${
                    selectedExpert?.id === expert.id
                      ? 'border-[#C49A6C]/50'
                      : 'border-[rgba(255,255,255,0.05)] hover:border-[#C49A6C]/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${expert.image}`}
                        alt={expert.name}
                        className="w-12 h-12 rounded-full bg-[#0E3B36]"
                      />
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
                      <p className="text-[rgba(216,204,188,0.6)] text-xs truncate">{expert.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-[#F4F1EA] text-sm font-medium">{expert.rating}</span>
                    <span className="text-[rgba(216,204,188,0.5)] text-xs">({expert.reviews})</span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-[rgba(216,204,188,0.6)]">₹{expert.price}/hr</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#C49A6C]">₹{expert.subPrice} subscriber</span>
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
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Consultation Categories</h2>
            <div className="grid grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <button
                  key={cat.name}
                  className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-4 border border-[rgba(255,255,255,0.05)] hover:border-[#C49A6C]/30 transition-all flex flex-col items-center text-center"
                >
                  <span className="text-3xl mb-2">{['🚢', '📋', '🛒', '💰', '⚖️', '🔍'][i]}</span>
                  <p className="text-[#F4F1EA] text-sm font-medium mb-1">{cat.name}</p>
                  <p className="text-[#C49A6C] text-xs">{cat.count} experts</p>
                </button>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-6 border border-[rgba(255,255,255,0.05)] mb-6">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Book a Consultation</h2>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setBookingType('one-time')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  bookingType === 'one-time'
                    ? 'bg-[#C49A6C] text-[#081512]'
                    : 'bg-[#0E3B36] text-[#F4F1EA]'
                }`}
              >
                One Time
              </button>
              <button
                onClick={() => setBookingType('subscription')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  bookingType === 'subscription'
                    ? 'bg-[#C49A6C] text-[#081512]'
                    : 'bg-[#0E3B36] text-[#F4F1EA]'
                }`}
              >
                Subscription
              </button>
              {bookingType === 'subscription' && (
                <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 text-sm rounded-full self-center">Save More</span>
              )}
            </div>

            <div className="flex gap-6">
              {/* Expert Selection */}
              <div className="flex-1">
                <label className="text-[rgba(216,204,188,0.6)] text-sm mb-2 block">Select Expert</label>
                <div className="relative mb-4">
                  <select className="w-full h-12 px-4 bg-[#0E3B36]/50 border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]">
                    <option value="">Choose an expert...</option>
                    {experts.map(exp => (
                      <option key={exp.id} value={exp.id}>{exp.name} - {exp.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[rgba(216,204,188,0.6)] text-sm mb-2 block">Select Date</label>
                    <input
                      type="date"
                      className="w-full h-12 px-4 bg-[#0E3B36]/50 border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]"
                    />
                  </div>
                  <div>
                    <label className="text-[rgba(216,204,188,0.6)] text-sm mb-2 block">Select Time</label>
                    <select className="w-full h-12 px-4 bg-[#0E3B36]/50 border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]">
                      <option>11:00 AM - 12:00 PM</option>
                      <option>12:00 PM - 01:00 PM</option>
                      <option>02:00 PM - 03:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[rgba(216,204,188,0.6)] text-sm mb-2 block">Duration</label>
                  <div className="flex gap-2">
                    {['30 Mins', '1 Hour', '2 Hours', 'Custom'].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d.split(' ')[0])}
                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                          duration === d.split(' ')[0]
                            ? 'bg-[#C49A6C] text-[#081512]'
                            : 'bg-[#0E3B36] text-[#F4F1EA] border border-[rgba(255,255,255,0.1)]'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="w-64 bg-[#0E3B36]/30 rounded-xl p-4">
                <div className="text-center mb-4">
                  <p className="text-[rgba(216,204,188,0.6)] text-sm mb-1">Total</p>
                  <p className="text-4xl font-bold text-[#F4F1EA]">₹3,000</p>
                  <p className="text-[#C49A6C] text-sm">₹2,250 for Subscribers</p>
                </div>
                <button className="w-full py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors mb-2">
                  Book Session
                </button>
                <div className="flex items-center justify-center gap-4 text-xs text-[rgba(216,204,188,0.5)]">
                  <span>🔒 Secure Payment</span>
                  <span>Cancel Anytime</span>
                </div>
              </div>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-6 border border-[rgba(255,255,255,0.05)]">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-6">How Consultation & Ad Credit Works</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { step: '1', title: 'You Pay for Consultation', desc: 'Book expert consultation' },
                { step: '2', title: 'We Credit Equal Amount to Ad Wallet', desc: 'For Subscribers' },
                { step: '3', title: 'Run Ads on Leverage Platform', desc: 'Promote your products' },
                { step: '4', title: 'Grow Your Business', desc: 'Get more leads' },
              ].map((item, i) => (
                <div key={item.step} className="relative">
                  <div className="bg-[#0E3B36]/50 rounded-xl p-4">
                    <div className="w-8 h-8 bg-[#C49A6C] rounded-full flex items-center justify-center text-[#081512] text-sm font-bold mb-2">
                      {item.step}
                    </div>
                    <h3 className="text-[#F4F1EA] text-sm font-medium mb-1">{item.title}</h3>
                    <p className="text-[rgba(216,204,188,0.5)] text-xs">{item.desc}</p>
                  </div>
                  {i < 3 && (
                    <svg className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#0E3B36]/30 rounded-lg">
              <p className="text-[rgba(216,204,188,0.7)] text-sm text-center">
                <span className="text-[#C49A6C]">Example:</span> You spend ₹10,000 on consultation <span className="text-[#F4F1EA]">=&gt;</span> ₹10,000 added to your Ad Wallet to run ads
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Expert Detail */}
        {selectedExpert && (
          <div className="w-[420px] flex-shrink-0">
            <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.05)] p-6 sticky top-6">
              {/* Expert Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedExpert.image}`}
                    alt={selectedExpert.name}
                    className="w-16 h-16 rounded-full bg-[#0E3B36]"
                  />
                  {selectedExpert.online && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#081512]"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-[#F4F1EA]">{selectedExpert.name}</h3>
                    {selectedExpert.verified && (
                      <svg className="w-5 h-5 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                  </div>
                  <p className="text-[rgba(216,204,188,0.7)] text-sm mb-2">{selectedExpert.title}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-[#F4F1EA] font-medium">{selectedExpert.rating}/5</span>
                    </div>
                    <span className="text-[rgba(216,204,188,0.5)] text-sm">({selectedExpert.reviews} Reviews)</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-[#0E3B36]/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#C49A6C]">1,248</p>
                  <p className="text-[rgba(216,204,188,0.6)] text-xs">Consultations</p>
                </div>
                <div className="bg-[#0E3B36]/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#C49A6C]">15 min</p>
                  <p className="text-[rgba(216,204,188,0.6)] text-xs">Response</p>
                </div>
                <div className="bg-[#0E3B36]/50 rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-[#C49A6C]">18+</p>
                  <p className="text-[rgba(216,204,188,0.6)] text-xs">Years Exp.</p>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[rgba(216,204,188,0.6)] text-sm">Languages:</span>
                <span className="px-3 py-1 bg-[#0E3B36]/50 rounded-full text-[#F4F1EA] text-sm">English (EN)</span>
                <span className="px-3 py-1 bg-[#0E3B36]/50 rounded-full text-[#F4F1EA] text-sm">Hindi (HI)</span>
              </div>

              {/* About */}
              <div className="mb-4">
                <h4 className="text-[#F4F1EA] font-medium mb-2">About</h4>
                <p className="text-[rgba(216,204,188,0.7)] text-sm">
                  Global shipping expert with 18+ years experience in freight management, logistics optimization, and supply chain solutions across international markets.
                </p>
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="text-[#F4F1EA] font-medium mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {expertiseTags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-[#0E3B36] rounded-full text-[#F4F1EA] text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Upcoming Consultation */}
              <div className="bg-[#0E3B36]/30 border border-[#C49A6C]/20 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">📹</span>
                  <div>
                    <p className="text-[#F4F1EA] font-medium">Upcoming Consultation</p>
                    <p className="text-[rgba(216,204,188,0.6)] text-sm">Today, 11:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-[#C49A6C] text-[#081512] rounded-lg font-semibold hover:bg-[#D4AA82]">Join Meeting</button>
                  <button className="px-4 py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg border border-[rgba(255,255,255,0.1)]">Reschedule</button>
                </div>
              </div>

              {/* Session Room Preview */}
              <div className="bg-[#0E3B36]/30 rounded-xl p-4 mb-4">
                <h4 className="text-[#F4F1EA] font-medium mb-3">Consultation Session Room</h4>
                <div className="aspect-video bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-lg flex items-center justify-center mb-3">
                  <span className="text-4xl">🎥</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-[#0E3B36] rounded-full flex items-center justify-center text-[#F4F1EA]">🎤</button>
                    <button className="w-10 h-10 bg-[#0E3B36] rounded-full flex items-center justify-center text-[#F4F1EA]">📹</button>
                    <button className="w-10 h-10 bg-[#0E3B36] rounded-full flex items-center justify-center text-[#F4F1EA]">💬</button>
                  </div>
                  <span className="text-[#F4F1EA] text-sm">00:24:18</span>
                </div>
              </div>

              {/* Chat */}
              <div className="bg-[#0E3B36]/30 rounded-xl p-4">
                <h4 className="text-[#F4F1EA] font-medium mb-3">Session Chat</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedExpert.image}`} alt="" className="w-8 h-8 rounded-full bg-[#0E3B36]" />
                    <div className="flex-1 bg-[#0E3B36]/50 rounded-xl rounded-tl-none p-3">
                      <p className="text-[#F4F1EA] text-sm">Please share the invoice document.</p>
                      <p className="text-[rgba(216,204,188,0.4)] text-xs mt-1">10:05 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-[#C49A6C]/20 rounded-xl rounded-tr-none p-3 max-w-[200px]">
                      <p className="text-[#F4F1EA] text-sm">Invoice shared. Please verify.</p>
                      <p className="text-[rgba(216,204,188,0.4)] text-xs mt-1 text-right">10:06 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
