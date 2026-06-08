'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, CheckCircle, Video, MessageSquare, Bell, Home, FileText, Mail, User, ChevronRight, Clock, X, Filter } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  title: string;
  initials: string;
  rating: number;
  reviews: number;
  price: number;
  online: boolean;
  verified: boolean;
  specialties: string[];
  bio: string;
}

const experts: Expert[] = [
  { id: '1', name: 'Rakesh Sharma', title: 'Shipping Consultant', initials: 'RS', rating: 4.9, reviews: 128, price: 3000, online: true, verified: true, specialties: ['Freight Forwarding', 'Customs'], bio: '15+ years of experience in international shipping and logistics.' },
  { id: '2', name: 'Anita Iyer', title: 'Customs Expert', initials: 'AI', rating: 4.8, reviews: 96, price: 2500, online: true, verified: true, specialties: ['Import/Export', 'Duty Optimization'], bio: 'Former customs officer with 12 years of experience.' },
  { id: '3', name: 'Vikram Singh', title: 'Logistics Expert', initials: 'VS', rating: 4.9, reviews: 74, price: 3500, online: false, verified: true, specialties: ['Supply Chain', 'Warehouse'], bio: 'Expert in optimizing supply chain operations.' },
  { id: '4', name: 'Neha Bansal', title: 'Trade Finance', initials: 'NB', rating: 4.8, reviews: 63, price: 2800, online: false, verified: true, specialties: ['Letters of Credit', 'Insurance'], bio: 'Specialist in trade finance solutions.' },
];

export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [activeNav, setActiveNav] = useState('consult');

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
    { id: 'browse', label: 'Browse', icon: Search, href: '/marketplace' },
    { id: 'rfq', label: 'Post RFQ', icon: FileText, href: '/rfqs' },
    { id: 'inbox', label: 'Inbox', icon: Mail, href: '/messages' },
    { id: 'account', label: 'Account', icon: User, href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#154230] via-[#1d5240] to-[#154230] px-4 pt-6 pb-10 rounded-b-[32px] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute -right-8 -top-8 w-56 h-56 opacity-10" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="white" strokeWidth="0.5" />
            <ellipse cx="100" cy="100" rx="90" ry="35" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Logo Row */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#A6824A] rounded-lg flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-tight leading-none">LEVERAGE</p>
              <p className="text-white/50 text-[9px] tracking-wider mt-0.5">CONNECTING DOTS TO PORTS</p>
            </div>
          </div>
          <button className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Bell className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Title */}
        <h1 className="text-white text-2xl font-bold mb-0.5 relative z-10">Consultations</h1>
        <p className="text-white/70 text-sm relative z-10">Connect with trade experts</p>
      </div>

      {/* Search Section */}
      <div className="mx-4 -mt-4 relative z-20">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-[#F7F6F2] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#A6824A] text-sm font-medium"
              />
            </div>
            <button className="w-12 h-12 bg-[#154230] rounded-xl flex items-center justify-center shadow-lg">
              <Filter className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Expert Cards */}
      <div className="mx-4 mt-4 space-y-3">
        {filteredExperts.map((expert) => (
          <div
            key={expert.id}
            onClick={() => setSelectedExpert(expert)}
            className="bg-white rounded-2xl p-4 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#154230] to-[#1d5240] flex items-center justify-center text-white text-lg font-bold shadow-md">
                  {expert.initials}
                </div>
                {/* Online Indicator */}
                {expert.online ? (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                ) : (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#4A4A4A] rounded-full border-2 border-white shadow-md flex items-center justify-center">
                    <Clock className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
                {/* Verified Badge */}
                {expert.verified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#154230] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[#101111] font-bold text-base">{expert.name}</h3>
                </div>
                <p className="text-[#4A4A4A] text-sm">{expert.title}</p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                    <span className="text-[#101111] text-sm font-semibold">{expert.rating}</span>
                  </div>
                  <span className="text-[#4A4A4A] text-xs">({expert.reviews} reviews)</span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {expert.specialties.slice(0, 2).map((spec, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#F7F6F2] text-[#4A4A4A] text-xs font-medium rounded-lg">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <p className="text-[#101111] font-bold text-lg">${expert.price}</p>
                  <p className="text-[#4A4A4A] text-xs">per session</p>
                </div>
                <button className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center shadow-md active:scale-95 transition-transform">
                  {expert.online ? (
                    <Video className="w-5 h-5 text-white" />
                  ) : (
                    <Clock className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expert Detail Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40" onClick={() => setSelectedExpert(null)}>
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-4 border-b border-black/5 flex items-center justify-between rounded-t-3xl">
              <h2 className="text-[#101111] font-bold">Expert Profile</h2>
              <button onClick={() => setSelectedExpert(null)} className="w-10 h-10 bg-[#F7F6F2] rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-[#4A4A4A]" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Expert Info */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#154230] to-[#1d5240] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {selectedExpert.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[#101111] font-bold text-xl">{selectedExpert.name}</h3>
                    {selectedExpert.verified && (
                      <div className="w-6 h-6 bg-[#154230] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <p className="text-[#4A4A4A] text-sm mt-0.5">{selectedExpert.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                      <span className="text-[#101111] font-semibold">{selectedExpert.rating}</span>
                    </div>
                    <span className="text-[#4A4A4A] text-sm">({selectedExpert.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-[#F7F6F2] rounded-2xl p-4">
                <p className="text-[#101111] text-sm leading-relaxed">{selectedExpert.bio}</p>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-[#4A4A4A] text-xs font-medium mb-2">SPECIALTIES</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExpert.specialties.map((spec, i) => (
                    <span key={i} className="px-4 py-2 bg-[#154230]/10 text-[#154230] text-sm font-medium rounded-xl">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#F7F6F2] rounded-2xl p-4 text-center">
                  <p className="text-[#4A4A4A] text-xs mb-1">Per Session</p>
                  <p className="text-[#101111] font-bold text-xl">${selectedExpert.price}</p>
                </div>
                <div className="bg-[#154230] rounded-2xl p-4 text-center">
                  <p className="text-white/70 text-xs mb-1">Monthly</p>
                  <p className="text-white font-bold text-xl">${selectedExpert.price * 0.75}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 h-14 bg-[#154230] text-white font-semibold rounded-2xl shadow-lg active:scale-95 transition-transform">
                  <Video className="w-5 h-5" />
                  Video Call
                </button>
                <button className="flex items-center justify-center gap-2 h-14 bg-[#F7F6F2] text-[#101111] font-semibold rounded-2xl active:scale-95 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for bottom nav */}
      <div className="h-8" />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-2 pb-6 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${isActive ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-[#154230] shadow-lg shadow-[#154230]/30' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
