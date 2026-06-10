'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, CheckCircle, Calendar, MessageSquare, Bell, X, Menu, Settings, LogOut } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import Sidebar, { MobileSidebar } from '@/components/Sidebar';

interface Expert {
  id: string;
  name: string;
  title: string;
  initials: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  online: boolean;
  verified: boolean;
  specialties: string[];
  bio: string;
}

const experts: Expert[] = [
  { id: '1', name: 'Rakesh Sharma', title: 'Shipping Consultant', initials: 'RS', rating: 4.9, reviews: 128, price: 3000, duration: '15–30 mins', online: true, verified: true, specialties: ['Freight Forwarding', 'Customs', 'Trade Compliance'], bio: '15+ years experience in international shipping and logistics.' },
  { id: '2', name: 'Anita Iyer', title: 'Trade Finance Expert', initials: 'AI', rating: 4.8, reviews: 96, price: 2500, duration: '15–30 mins', online: true, verified: true, specialties: ['Trade Finance', 'Letter of Credit', 'Banking & Payments'], bio: 'Expert in trade finance solutions with 12+ years experience.' },
];


export default function ConsultationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [activeNav, setActiveNav] = useState('consult');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* ============================================ */}
      {/* DESKTOP SIDEBAR (lg and above) */}
      {/* ============================================ */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 z-40">
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>
        <Sidebar />
        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
      </aside>

      {/* ============================================ */}
      {/* MOBILE SIDEBAR OVERLAY */}
      {/* ============================================ */}
      <MobileSidebar open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      {/* ============================================ */}
      {/* MOBILE & TABLET HEADER (below lg) */}
      {/* ============================================ */}
      <div className="lg:hidden">
        <div className="bg-white px-4 sm:px-5 pt-4 sm:pt-6 pb-3">
          {/* Top Header Row */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileSidebarOpen(true)} className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg hover:bg-[#e9e3da] transition-colors">
                <Menu className="w-5 h-5 text-[#4A4A4A]" />
              </button>
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-[#e9e3da] transition-colors relative">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#7A161A] rounded-full text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center">3</span>
              </button>
            </div>
          </div>

          {/* Hero with Profile */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[20px] sm:text-[24px] font-bold text-[#1f1f1f] mt-1 sm:mt-2">Consultations</h1>
              <p className="text-[#777] text-xs sm:text-sm mt-0.5">Expert trade advice</p>
            </div>
            <div className="text-center">
              <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px] rounded-full bg-gradient-to-br from-[#154230] to-[#0d2e20] text-white text-[32px] sm:text-[36px] md:text-[42px] font-bold flex items-center justify-center border-[3px] sm:border-4 border-[#e7d7b0]">JD</div>
              <div className="text-[10px] sm:text-xs mt-1"><b>John Doe</b><br /><small className="text-[#777]">Verified Account</small></div>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="bg-[#f4f0ea] px-4 sm:px-5 pt-4 sm:pt-5 pb-24">
          <div className="text-[18px] sm:text-[20px] md:text-[22px] text-[#154230] font-bold">Expert Consultations</div>
          <p className="text-[#777] text-xs sm:text-sm">Get expert advice on trade matters</p>

          {/* Search */}
          <div className="bg-white rounded-xl p-3 sm:p-4 mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
            <Search className="w-5 h-5 text-[#999]" />
            <input
              type="text"
              placeholder="Search by name, specialty or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-[#1f1f1f] placeholder-[#999]"
            />
          </div>

          {/* Tabs */}
          <div className="flex mt-3 sm:mt-4">
            <button className="flex-1 bg-gradient-to-r from-[#154230] to-[#0d2e20] text-white py-3 sm:py-4 px-3 sm:px-4 rounded-l-xl text-left">
              <span className="text-base sm:text-lg">⚡</span>
              <span className="block font-semibold text-xs sm:text-sm">Instant Consultation</span>
              <small className="text-[10px] sm:text-xs opacity-80">Connect now</small>
            </button>
            <button className="flex-1 bg-white py-3 sm:py-4 px-3 sm:px-4 rounded-r-xl border border-[#e9e3da] border-l-0 text-left">
              <span className="text-base sm:text-lg">📅</span>
              <span className="block font-semibold text-[#1f1f1f] text-xs sm:text-sm">Schedule Call</span>
              <small className="text-[#777] text-[10px] sm:text-xs">Book for later</small>
            </button>
          </div>

          {/* Available Now */}
          <div className="flex justify-between items-center mt-3 sm:mt-4 mb-2 sm:mb-3">
            <b className="text-xs sm:text-[15px]">🟢 Available Now</b>
            <span className="text-[#777] text-xs sm:text-sm cursor-pointer">View All ›</span>
          </div>

          {/* Expert Cards */}
          {filteredExperts.map((expert) => (
            <div key={expert.id} onClick={() => setSelectedExpert(expert)} className="bg-white rounded-2xl p-3 sm:p-4 mt-2 sm:mt-3 border border-[#eee] cursor-pointer active:scale-[0.98] transition-transform">
              <div className="flex gap-2 sm:gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] md:w-[72px] md:h-[72px] rounded-full bg-[#7A161A] text-white text-[18px] sm:text-[20px] md:text-[22px] font-bold flex items-center justify-center">{expert.initials}</div>
                  {expert.online && <div className="absolute right-0 bottom-0 w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-full bg-[#28b463] border-2 border-white"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-[#1f1f1f] truncate">{expert.name}</div>
                  <div className="text-[#666] text-[11px] sm:text-[12px] md:text-sm">{expert.title}</div>
                  <div className="text-[11px] sm:text-xs md:text-sm">⭐ {expert.rating} ({expert.reviews} reviews)</div>
                  <div className="flex flex-wrap gap-1 mt-1 sm:mt-2">
                    {expert.specialties.slice(0, 3).map((spec, i) => (
                      <span key={i} className="bg-[#f2eee8] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[9px] sm:text-[11px] text-[#666]">{spec}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[#eee]">
                <div>
                  <div className="text-[20px] sm:text-[24px] md:text-[28px] font-bold text-[#1f1f1f]">₹{expert.price}</div>
                  <small className="text-[#777] text-[10px] sm:text-xs">per session</small>
                </div>
                <div className="text-center hidden sm:block">
                  <div className="text-[16px] sm:text-[18px] md:text-[22px] font-bold text-[#1f1f1f]">{expert.duration}</div>
                  <small className="text-[#777] text-[10px] sm:text-xs">Duration</small>
                </div>
                <button className="bg-gradient-to-r from-[#7A161A] to-[#8d2026] text-white px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm">
                  Connect →
                </button>
              </div>
            </div>
          ))}

          {/* Features */}
          <div className="bg-white rounded-2xl p-3 sm:p-4 mt-3 sm:mt-4 grid grid-cols-4 gap-1 sm:gap-2">
            <div className="text-center text-[9px] sm:text-[11px]">🛡️<br />Verified</div>
            <div className="text-center text-[9px] sm:text-[11px]">💬<br />Confidential</div>
            <div className="text-center text-[9px] sm:text-[11px]">🌍<br />Global</div>
            <div className="text-center text-[9px] sm:text-[11px]">📈<br />Results</div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* DESKTOP MAIN CONTENT (lg and above) */}
      {/* ============================================ */}
      <div className="hidden lg:block lg:ml-64">
        <div className="max-w-4xl mx-auto px-8 pt-8 pb-24">
          {/* Top Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-[#e9e3da]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#154230] to-[#0d2e20] text-white text-lg font-bold flex items-center justify-center">JD</div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-[#154230]" />
                  <span className="text-sm font-medium">John Doe</span>
                </div>
              </div>
              <button className="w-11 h-11 bg-white rounded-full border border-[#e9e3da] flex items-center justify-center relative hover:bg-[#f4f0ea] transition-colors">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#7A161A] rounded-full text-white text-[10px] font-bold flex items-center justify-center">3</span>
              </button>
            </div>
          </div>

          {/* Main Section */}
          <div className="bg-[#f4f0ea] rounded-2xl p-6 mb-6">
            <div className="text-[22px] text-[#154230] font-bold">Expert Consultations</div>
            <p className="text-[#777] text-sm mt-1">Get expert advice on trade matters</p>

            {/* Search */}
            <div className="bg-white rounded-xl p-4 mt-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#999]" />
              <input
                type="text"
                placeholder="Search by name, specialty or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-[#1f1f1f] placeholder-[#999]"
              />
            </div>

            {/* Tabs */}
            <div className="flex mt-4">
              <button className="flex-1 bg-gradient-to-r from-[#154230] to-[#0d2e20] text-white py-4 px-4 rounded-l-xl text-left">
                <span className="text-lg">⚡</span>
                <span className="block font-semibold">Instant Consultation</span>
                <small className="opacity-80">Connect now</small>
              </button>
              <button className="flex-1 bg-white py-4 px-4 rounded-r-xl border border-[#e9e3da] border-l-0 text-left">
                <span className="text-lg">📅</span>
                <span className="block font-semibold text-[#1f1f1f]">Schedule Call</span>
                <small className="text-[#777]">Book for later</small>
              </button>
            </div>

            {/* Available Now */}
            <div className="flex justify-between items-center mt-6 mb-4">
              <b className="text-[15px]">🟢 Available Now</b>
              <span className="text-[#777] text-sm cursor-pointer hover:text-[#154230] transition-colors">View All ›</span>
            </div>

            {/* Expert Cards */}
            {filteredExperts.map((expert) => (
              <div key={expert.id} onClick={() => setSelectedExpert(expert)} className="bg-white rounded-2xl p-5 mt-3 border border-[#eee] cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]">
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-[72px] h-[72px] rounded-full bg-[#7A161A] text-white text-[22px] font-bold flex items-center justify-center">{expert.initials}</div>
                    {expert.online && <div className="absolute right-0 bottom-0 w-[14px] h-[14px] rounded-full bg-[#28b463] border-2 border-white"></div>}
                  </div>
                  <div className="flex-1">
                    <div className="text-[18px] font-semibold text-[#1f1f1f]">{expert.name}</div>
                    <div className="text-[#666] text-sm">{expert.title}</div>
                    <div className="text-sm mt-1">⭐ {expert.rating} ({expert.reviews} reviews)</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {expert.specialties.map((spec, i) => (
                        <span key={i} className="bg-[#f2eee8] px-2 py-1 rounded text-[11px] text-[#666]">{spec}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <div className="text-[28px] font-bold text-[#1f1f1f]">₹{expert.price}</div>
                      <small className="text-[#777]">per session</small>
                    </div>
                    <div className="text-right">
                      <div className="text-[22px] font-bold text-[#1f1f1f]">{expert.duration}</div>
                      <small className="text-[#777]">Duration</small>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-[#7A161A] to-[#8d2026] text-white px-5 py-3 rounded-xl font-semibold h-fit hover:shadow-lg transition-shadow">
                    Connect Now →
                  </button>
                </div>
              </div>
            ))}

            {/* Features */}
            <div className="bg-white rounded-2xl p-4 mt-5 grid grid-cols-4 gap-2">
              <div className="text-center text-[11px]">🛡️<br />Verified Experts</div>
              <div className="text-center text-[11px]">💬<br />Confidential</div>
              <div className="text-center text-[11px]">🌍<br />Global Perspective</div>
              <div className="text-center text-[11px]">📈<br />Result Driven</div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* EXPERT MODAL */}
      {/* ============================================ */}
      {selectedExpert && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40" onClick={() => setSelectedExpert(null)}>
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-black/5 flex items-center justify-between rounded-t-3xl z-10">
              <h2 className="text-[#1f1f1f] font-semibold">Expert Profile</h2>
              <button onClick={() => setSelectedExpert(null)} className="w-10 h-10 bg-[#f4f0ea] rounded-full flex items-center justify-center hover:bg-[#e9e3da] transition-colors">
                <X className="w-5 h-5 text-[#777]" />
              </button>
            </div>
            <div className="p-5 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-[#7A161A] text-white text-2xl font-bold flex items-center justify-center">{selectedExpert.initials}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[#1f1f1f] font-semibold text-xl">{selectedExpert.name}</h3>
                    {selectedExpert.verified && (
                      <div className="w-6 h-6 bg-[#154230] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <p className="text-[#666] text-sm mt-0.5">{selectedExpert.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-[#1f1f1f] font-medium">{selectedExpert.rating}</span>
                    <span className="text-[#777] text-sm">({selectedExpert.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#f4f0ea] rounded-2xl p-4">
                <p className="text-[#1f1f1f] text-sm leading-relaxed">{selectedExpert.bio}</p>
              </div>
              <div>
                <h4 className="text-[#777] text-xs font-medium mb-2 uppercase">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExpert.specialties.map((spec, i) => (
                    <span key={i} className="px-4 py-2 bg-[#f2eee8] text-[#1f1f1f] text-sm font-medium rounded-xl">{spec}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 bg-[#f4f0ea] rounded-2xl p-4 text-center">
                  <p className="text-[#777] text-xs mb-1">Per Session</p>
                  <p className="text-[#1f1f1f] font-bold text-xl">₹{selectedExpert.price}</p>
                </div>
                <div className="flex-1 bg-[#7A161A] rounded-2xl p-4 text-center">
                  <p className="text-white/70 text-xs mb-1">Duration</p>
                  <p className="text-white font-bold text-xl">{selectedExpert.duration}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-[#7A161A] to-[#8d2026] text-white py-4 rounded-2xl font-semibold hover:shadow-lg transition-shadow">
                  Connect Now →
                </button>
                <button className="flex-1 bg-[#f4f0ea] text-[#1f1f1f] py-4 rounded-2xl font-semibold hover:bg-[#e9e3da] transition-colors">
                  💬 Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="consultations" />
    </div>
  );
}
