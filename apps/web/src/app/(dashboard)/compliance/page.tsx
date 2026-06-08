'use client';

import { useState } from 'react';
import { Search, Bell, Menu, Home, Package, MessageSquare, User, FileText, CheckCircle, Globe, Copy } from 'lucide-react';

const hsCodesData = [
  { code: '8471.30', description: 'Portable digital automatic data processing machines', duty: '0%', origin: 'USA', flag: '🇺🇸' },
  { code: '8471.41', description: 'Other digital automatic data processing machines', duty: '0%', origin: 'USA', flag: '🇺🇸' },
  { code: '8471.50', description: 'Digital processing units, other', duty: '0%', origin: 'USA', flag: '🇺🇸' },
  { code: '8471.70', description: 'Input or output units, whether or not containing', duty: '0%', origin: 'USA', flag: '🇺🇸' },
  { code: '8471.80', description: 'Units of automatic data processing machines', duty: '0%', origin: 'USA', flag: '🇺🇸' },
  { code: '8542.31', description: 'Electronic integrated circuits - processors', duty: '0%', origin: 'USA', flag: '🇺🇸' },
  { code: '8542.39', description: 'Electronic integrated circuits - other', duty: '0%', origin: 'USA', flag: '🇺🇸' },
  { code: '3004.90', description: 'Medicaments, measured doses', duty: '0%', origin: 'USA', flag: '🇺🇸' },
  { code: '1006.30', description: 'Semi-milled or wholly milled rice', duty: '6%', origin: 'USA', flag: '🇺🇸' },
  { code: '7210.41', description: 'Flat-rolled iron or non-alloy steel', duty: '20%', origin: 'USA', flag: '🇺🇸' },
];

const checklistData = [
  { item: 'HS Code Classification', done: true },
  { item: 'Duty Calculation', done: true },
  { item: 'Country of Origin Certificate', done: true },
  { item: 'Commercial Invoice', done: false },
  { item: 'Packing List', done: false },
  { item: 'Bill of Lading / Airway Bill', done: false },
  { item: 'Insurance Certificate', done: false },
  { item: 'Import License (if required)', done: false },
];

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('hs-codes');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCodes = hsCodesData.filter(code =>
    code.code.includes(searchQuery) ||
    code.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* ========== HEADER ========== */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-9 h-9 lg:w-11 lg:h-11 bg-[#0f7c59] rounded-lg lg:rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm lg:text-base">L</span>
              </div>
              <div>
                <div className="text-lg lg:text-[22px] font-extrabold text-[#0f7c59] leading-tight">LEVERGE</div>
                <div className="text-[8px] lg:text-[9px] font-medium text-[#b89b3f] leading-tight hidden xs2:block">
                  CONNECTING THE DOTS OF TRADE
                </div>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              {/* Search - Hidden on mobile */}
              <button className="p-2 hover:bg-gray-100 rounded-lg hidden min-[480px]:block">
                <Search className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-[#7b1113] text-white text-[9px] lg:text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
              </button>

              {/* Plus Button */}
              <button className="w-10 h-10 lg:w-11 lg:h-11 rounded-lg lg:rounded-xl bg-[#0b5c3f] text-white text-xl lg:text-2xl font-bold border-none cursor-pointer flex items-center justify-center">
                +
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 lg:py-8">

        {/* ========== MOBILE LAYOUT (< 640px) ========== */}
        <div className="lg:hidden">
          {/* Hero Mobile */}
          <div className="flex justify-between items-center mb-5 sm:mb-6">
            <div>
              <h1 className="text-[32px] xs:text-[38px] sm:text-[42px] font-extrabold text-[#1c1c1c] leading-tight">
                Compliance
              </h1>
              <p className="text-base sm:text-lg text-[#6f6f6f] mt-1">Customs & regulations</p>
            </div>
            <span className="text-[50px] xs:text-[60px] sm:text-[70px] leading-none">📋</span>
          </div>

          {/* Compliance Card Mobile */}
          <div className="bg-[#70171a] rounded-2xl p-4 xs:p-5 text-white mb-5 sm:mb-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center text-2xl xs:text-[28px] sm:text-3xl flex-shrink-0">
                  🛡
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-lg xs:text-xl sm:text-2xl font-bold">Compliance Center</div>
                  <div className="text-xs xs:text-sm sm:text-base opacity-90 mt-1 leading-tight">
                    HS codes, duties and trade regulations
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-2 xs:gap-3">
                <div className="bg-white/10 rounded-xl p-2 xs:p-3 text-center">
                  <div className="text-base xs:text-lg sm:text-xl font-extrabold">2,847</div>
                  <div className="text-[9px] xs:text-[10px] sm:text-xs text-white/70 mt-0.5">HS Codes</div>
                </div>
                <div className="bg-white/10 rounded-xl p-2 xs:p-3 text-center">
                  <div className="text-base xs:text-lg sm:text-xl font-extrabold">98%</div>
                  <div className="text-[9px] xs:text-[10px] sm:text-xs text-white/70 mt-0.5">Compliant</div>
                </div>
                <div className="bg-white/10 rounded-xl p-2 xs:p-3 text-center">
                  <div className="text-base xs:text-lg sm:text-xl font-extrabold">195+</div>
                  <div className="text-[9px] xs:text-[10px] sm:text-xs text-white/70 mt-0.5">Countries</div>
                </div>
                <div className="bg-white/10 rounded-xl p-2 xs:p-3 text-center">
                  <div className="text-base xs:text-lg sm:text-xl font-extrabold">12</div>
                  <div className="text-[9px] xs:text-[10px] sm:text-xs text-white/70 mt-0.5">Regulations</div>
                </div>
              </div>

              <button className="w-full bg-[#fff7f0] text-[#1c1c1c] py-2.5 xs:py-3 rounded-xl font-semibold text-sm xs:text-base cursor-pointer border-none">
                View Checklist →
              </button>
            </div>
          </div>

          {/* Search Mobile */}
          <div className="flex gap-2 xs:gap-3 mb-4 sm:mb-5">
            <div className="flex-1 bg-white h-11 xs:h-12 rounded-xl flex items-center px-3 xs:px-4 shadow-sm">
              <Search className="w-4 h-4 xs:w-5 xs:h-5 text-gray-400 mr-2 xs:mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by HS code or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-none outline-none text-sm xs:text-[15px] bg-transparent min-w-0"
              />
            </div>
            <button className="w-11 h-11 xs:w-12 xs:h-12 border-none bg-white rounded-xl text-lg xs:text-xl cursor-pointer shadow-sm flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs Mobile */}
          <div className="flex gap-2 mb-4 sm:mb-5">
            {['hs-codes', 'regulations', 'checklist'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 h-10 xs:h-11 rounded-xl border-none font-semibold text-xs xs:text-sm cursor-pointer transition-all ${
                  activeTab === tab
                    ? 'bg-[#0b5c3f] text-white shadow-md'
                    : 'bg-white text-[#444]'
                }`}
              >
                {tab === 'hs-codes' ? 'HS Codes' : tab === 'regulations' ? 'Regulations' : 'Checklist'}
              </button>
            ))}
          </div>

          {/* Content Mobile */}
          {activeTab === 'hs-codes' && (
            <div className="space-y-3">
              {filteredCodes.map((code) => (
                <div key={code.code} className="bg-white rounded-2xl p-3 xs:p-4 flex items-center gap-3 shadow-sm">
                  <div className="w-12 h-12 xs:w-14 xs:h-14 rounded-full bg-[#f5f5f5] flex items-center justify-center text-xl xs:text-2xl flex-shrink-0">
                    {code.code === '8471.30' ? '💻' : code.code === '8471.41' ? '🗄' : code.code === '8471.50' ? '🧠' : code.code === '8471.70' ? '🖥' : code.code === '8471.80' ? '💾' : code.code === '8542.31' ? '🔌' : code.code === '8542.39' ? '📟' : code.code === '3004.90' ? '💊' : code.code === '1006.30' ? '🍚' : '🔩'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm xs:text-base font-bold text-[#7b1113]">{code.code}</span>
                      <span className={`text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 rounded-lg font-semibold ${
                        code.duty === '0%' ? 'bg-[#eaf6ea] text-[#2d6b2d]' : 'bg-[#fff3e0] text-[#e65100]'
                      }`}>
                        {code.duty} duty
                      </span>
                    </div>
                    <p className="text-xs xs:text-sm text-[#333] mt-1 leading-tight line-clamp-2">
                      {code.description}
                    </p>
                    <p className="text-[10px] xs:text-xs text-[#888] mt-1">
                      Origin: {code.origin} {code.flag}
                    </p>
                  </div>
                  <button className="w-9 h-9 xs:w-10 xs:h-10 rounded-lg xs:rounded-xl bg-[#f6f2ef] text-base xs:text-lg border-none cursor-pointer flex-shrink-0 flex items-center justify-center">
                    📋
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'regulations' && (
            <div className="bg-white rounded-2xl p-4 xs:p-5 text-center">
              <p className="text-sm text-[#666]">Regulations content coming soon</p>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="bg-white rounded-2xl p-3 xs:p-4 shadow-sm">
              <h3 className="text-sm xs:text-base font-bold text-[#1c1c1c] mb-3 xs:mb-4">Pre-Shipment Checklist</h3>
              <div className="space-y-1.5 xs:space-y-2">
                {checklistData.map((check, i) => (
                  <label key={i} className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 rounded-xl hover:bg-[#f6f2ef] cursor-pointer">
                    <div className={`w-5 h-5 xs:w-6 xs:h-6 rounded border-2 flex items-center justify-center ${
                      check.done ? 'bg-[#0b5c3f] border-[#0b5c3f]' : 'border-[#888]'
                    }`}>
                      {check.done && (
                        <svg className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs xs:text-sm ${check.done ? 'text-[#888] line-through' : 'text-[#333]'}`}>
                      {check.item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* FAB Mobile */}
          <button className="fixed right-4 xs:right-5 sm:right-6 bottom-20 xs:bottom-24 w-14 h-14 xs:w-[60px] xs:h-[60px] rounded-full bg-[#7b1113] text-white text-3xl xs:text-[34px] border-none shadow-lg cursor-pointer z-40">
            +
          </button>

          {/* Bottom Nav Mobile */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center h-[70px] xs:h-[80px] border-t border-[#eee] z-50">
            <button className="flex flex-col items-center gap-1 px-3 py-2">
              <Home className="w-5 h-5 xs:w-6 xs:h-6 text-[#555]" />
              <span className="text-[10px] xs:text-xs text-[#555]">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 px-3 py-2">
              <Package className="w-5 h-5 xs:w-6 xs:h-6 text-[#555]" />
              <span className="text-[10px] xs:text-xs text-[#555]">Browse</span>
            </button>
            <button className="flex flex-col items-center -mt-4">
              <div className="w-12 h-12 xs:w-[52px] xs:h-[52px] rounded-full bg-[#0b5c3f] flex items-center justify-center text-white text-2xl xs:text-3xl shadow-lg">
                +
              </div>
            </button>
            <button className="flex flex-col items-center gap-1 px-3 py-2 relative">
              <MessageSquare className="w-5 h-5 xs:w-6 xs:h-6 text-[#555]" />
              <span className="text-[10px] xs:text-xs text-[#555]">Inbox</span>
              <span className="absolute top-1 right-1 w-4 h-4 xs:w-5 xs:h-5 rounded-full bg-[#b89b3f] flex items-center justify-center">
                <span className="text-white text-[9px] xs:text-[10px] font-bold">3</span>
              </span>
            </button>
            <button className="flex flex-col items-center gap-1 px-3 py-2">
              <User className="w-5 h-5 xs:w-6 xs:h-6 text-[#555]" />
              <span className="text-[10px] xs:text-xs text-[#555]">Account</span>
            </button>
          </nav>
        </div>

        {/* ========== DESKTOP LAYOUT (>= 1024px) ========== */}
        <div className="hidden lg:block">
          {/* Hero Desktop */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl xl:text-5xl font-extrabold text-[#1c1c1c]">Compliance</h1>
              <p className="text-lg xl:text-xl text-[#6f6f6f] mt-2">Customs & regulations</p>
            </div>
            <span className="text-6xl xl:text-7xl 2xl:text-8xl leading-none">📋</span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {/* Compliance Card - Takes 2 columns */}
            <div className="xl:col-span-2 bg-[#70171a] rounded-2xl p-6 xl:p-7 text-white">
              <div className="flex items-start gap-4 xl:gap-5 mb-5 xl:mb-6">
                <div className="w-16 h-16 xl:w-20 xl:h-20 bg-white rounded-xl xl:rounded-2xl flex items-center justify-center text-3xl xl:text-4xl flex-shrink-0">
                  🛡
                </div>
                <div>
                  <h2 className="text-xl xl:text-2xl font-bold">Compliance Center</h2>
                  <p className="text-sm xl:text-base opacity-90 mt-1">HS codes, duties and trade regulations</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 xl:gap-4 mb-5 xl:mb-6">
                {[
                  { value: '2,847', label: 'HS Codes', icon: FileText },
                  { value: '98%', label: 'Compliant', icon: CheckCircle },
                  { value: '195+', label: 'Countries', icon: Globe },
                  { value: '12', label: 'Regulations', icon: FileText },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-3 xl:p-4 text-center">
                    <div className="text-xl xl:text-2xl font-extrabold">{stat.value}</div>
                    <div className="text-[10px] xl:text-xs text-white/70 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-[#fff7f0] text-[#1c1c1c] py-3 xl:py-4 rounded-xl font-semibold text-sm xl:text-base cursor-pointer border-none">
                View Checklist →
              </button>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white rounded-2xl p-5 xl:p-6 shadow-sm">
              <h3 className="text-base xl:text-lg font-bold text-[#1c1c1c] mb-4">Quick Overview</h3>
              <div className="space-y-3 xl:space-y-4">
                <div className="flex items-center justify-between p-3 xl:p-4 bg-[#f8f6f3] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 bg-[#0b5c3f]/10 rounded-xl flex items-center justify-center text-xl xl:text-2xl">📋</div>
                    <div>
                      <div className="font-semibold text-[#1c1c1c] text-sm xl:text-base">Active Shipments</div>
                      <div className="text-xs text-[#666]">24 pending review</div>
                    </div>
                  </div>
                  <span className="text-xl xl:text-2xl font-bold text-[#0b5c3f]">156</span>
                </div>
                <div className="flex items-center justify-between p-3 xl:p-4 bg-[#f8f6f3] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 bg-[#70171a]/10 rounded-xl flex items-center justify-center text-xl xl:text-2xl">⚠️</div>
                    <div>
                      <div className="font-semibold text-[#1c1c1c] text-sm xl:text-base">Alerts</div>
                      <div className="text-xs text-[#666]">Requires attention</div>
                    </div>
                  </div>
                  <span className="text-xl xl:text-2xl font-bold text-[#70171a]">3</span>
                </div>
                <div className="flex items-center justify-between p-3 xl:p-4 bg-[#f8f6f3] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 bg-[#b89b3f]/10 rounded-xl flex items-center justify-center text-xl xl:text-2xl">✅</div>
                    <div>
                      <div className="font-semibold text-[#1c1c1c] text-sm xl:text-base">Completed Today</div>
                      <div className="text-xs text-[#666]">Shipments cleared</div>
                    </div>
                  </div>
                  <span className="text-xl xl:text-2xl font-bold text-[#b89b3f]">42</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Tabs Row */}
          <div className="flex flex-col xl:flex-row gap-4 mb-6">
            {/* Search Desktop */}
            <div className="flex-1 flex gap-3">
              <div className="flex-1 bg-white h-12 xl:h-14 rounded-xl flex items-center px-4 xl:px-5 shadow-sm">
                <Search className="w-5 h-5 xl:w-5 text-gray-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by HS code or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-none outline-none text-sm xl:text-base bg-transparent"
                />
              </div>
              <button className="h-12 xl:h-14 px-5 xl:px-6 border-none bg-white rounded-xl text-base xl:text-lg cursor-pointer shadow-sm flex items-center gap-2">
                <Menu className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Tabs Desktop */}
            <div className="flex gap-2">
              {['hs-codes', 'regulations', 'checklist'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 xl:px-6 h-12 xl:h-14 rounded-xl border-none font-semibold text-sm xl:text-base cursor-pointer transition-colors ${
                    activeTab === tab
                      ? 'bg-[#0b5c3f] text-white'
                      : 'bg-white text-[#444]'
                  }`}
                >
                  {tab === 'hs-codes' ? 'HS Codes' : tab === 'regulations' ? 'Regulations' : 'Checklist'}
                </button>
              ))}
            </div>
          </div>

          {/* Content Desktop */}
          {activeTab === 'hs-codes' && (
            <div className="bg-white rounded-2xl p-5 xl:p-6 shadow-sm">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredCodes.map((code) => (
                  <div key={code.code} className="flex items-center gap-4 p-4 bg-[#f8f6f3] rounded-xl hover:bg-[#f0ede8] transition-colors">
                    <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-full bg-white flex items-center justify-center text-2xl xl:text-3xl flex-shrink-0">
                      {code.code === '8471.30' ? '💻' : code.code === '8471.41' ? '🗄' : code.code === '8471.50' ? '🧠' : code.code === '8471.70' ? '🖥' : code.code === '8471.80' ? '💾' : code.code === '8542.31' ? '🔌' : code.code === '8542.39' ? '📟' : code.code === '3004.90' ? '💊' : code.code === '1006.30' ? '🍚' : '🔩'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-base xl:text-lg font-bold text-[#7b1113]">{code.code}</span>
                        <span className={`text-xs xl:text-sm px-2 xl:px-3 py-1 rounded-lg font-semibold ${
                          code.duty === '0%' ? 'bg-[#eaf6ea] text-[#2d6b2d]' : 'bg-[#fff3e0] text-[#e65100]'
                        }`}>
                          {code.duty} duty
                        </span>
                      </div>
                      <p className="text-sm xl:text-[15px] text-[#333] mt-1">{code.description}</p>
                      <p className="text-xs xl:text-sm text-[#888] mt-1">Origin: {code.origin} {code.flag}</p>
                    </div>
                    <button className="w-11 h-11 xl:w-12 xl:h-12 rounded-xl bg-white text-xl xl:text-2xl border-none cursor-pointer flex items-center justify-center flex-shrink-0 hover:bg-[#e8e5e0] transition-colors">
                      📋
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'regulations' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {[
                { flag: '🇺🇸', name: 'USA Import Regulations', desc: 'All imports to the USA must comply with CBP regulations regarding proper classification, valuation, and country of origin marking.', updated: 'Jan 15, 2024' },
                { flag: '🇪🇺', name: 'EU Product Standards', desc: 'Products entering the EU must meet CE marking requirements, REACH regulations, and proper documentation standards.', updated: 'Jan 10, 2024' },
                { flag: '🇨🇳', name: 'China Trade Agreement', desc: 'Phase one trade agreement tariff exclusions and trade deal provisions for US-China commerce.', updated: 'Jan 8, 2024' },
                { flag: '🇬🇧', name: 'UK Customs Requirements', desc: 'Post-Brexit customs procedures, documentation requirements, and trade compliance for UK imports.', updated: 'Jan 5, 2024' },
              ].map((reg, i) => (
                <div key={i} className="bg-white rounded-xl p-5 xl:p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-3xl xl:text-4xl flex-shrink-0">{reg.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-[#1c1c1c] text-base xl:text-lg">{reg.name}</h4>
                    <p className="text-sm text-[#666] mt-1">{reg.desc}</p>
                    <p className="text-xs text-[#888] mt-2">Last updated: {reg.updated}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="bg-white rounded-2xl p-5 xl:p-6 shadow-sm">
              <h3 className="text-lg xl:text-xl font-bold text-[#1c1c1c] mb-5 xl:mb-6">Pre-Shipment Checklist</h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 xl:gap-4">
                {checklistData.map((check, i) => (
                  <label key={i} className="flex items-center gap-4 p-4 bg-[#f8f6f3] rounded-xl hover:bg-[#f0ede8] cursor-pointer transition-colors">
                    <div className={`w-7 h-7 xl:w-8 xl:h-8 rounded-lg border-2 flex items-center justify-center ${
                      check.done ? 'bg-[#0b5c3f] border-[#0b5c3f]' : 'border-[#888]'
                    }`}>
                      {check.done && (
                        <svg className="w-4 h-4 xl:w-5 xl:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm xl:text-base ${check.done ? 'text-[#888] line-through' : 'text-[#333]'}`}>
                      {check.item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Spacer for mobile bottom nav */}
      <div className="h-[90px] lg:hidden" />
    </div>
  );
}