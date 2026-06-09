'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Bell, Menu, Home, Package, MessageSquare, User, FileText, CheckCircle, Globe, Plus } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

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

const getItemIcon = (code: string) => {
  const icons: Record<string, string> = {
    '8471.30': '💻',
    '8471.41': '🗄',
    '8471.50': '🧠',
    '8471.70': '🖥',
    '8471.80': '💾',
    '8542.31': '🔌',
    '8542.39': '📟',
    '3004.90': '💊',
    '1006.30': '🍚',
    '7210.41': '🔩',
  };
  return icons[code] || '📦';
};

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('hs-codes');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCodes = hsCodesData.filter(code =>
    code.code.includes(searchQuery) ||
    code.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* ========== HEADER ========== */}
      <header className="bg-white shadow-sm">
        <div className="max-w-[480px] mx-auto">
          {/* Status Bar - Mobile Only */}
          <div className="bg-white px-4 py-1.5 flex justify-between items-center">
            <span className="text-xs font-medium text-[#1c1c1c]">10:25</span>
            <div className="flex items-center gap-3">
              {/* Signal Bars */}
              <div className="flex items-end gap-[2px] h-3">
                <div className="w-[2px] h-1.5 bg-[#1c1c1c] rounded-sm"></div>
                <div className="w-[2px] h-2 bg-[#1c1c1c] rounded-sm"></div>
                <div className="w-[2px] h-2.5 bg-[#1c1c1c] rounded-sm"></div>
                <div className="w-[2px] h-3 bg-[#1c1c1c] rounded-sm"></div>
              </div>
              {/* 5G */}
              <span className="text-[10px] font-bold text-[#1c1c1c]">5G</span>
              {/* Incognito Mode Badge */}
              <div className="flex items-center gap-1 bg-[#0b5c3f]/10 px-2 py-0.5 rounded">
                <svg className="w-3 h-3 text-[#0b5c3f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                <span className="text-[10px] text-[#0b5c3f] font-medium">Incognito mode is on</span>
              </div>
            </div>
          </div>

          {/* Header Content */}
          <div className="flex justify-between items-center px-4 py-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <button className="p-1.5">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="relative p-1.5">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#7b1113] text-white text-[9px] flex items-center justify-center font-bold">
                  3
                </span>
              </button>
              <button className="w-10 h-10 rounded-lg bg-[#0b5c3f] text-white text-2xl font-bold border-none cursor-pointer flex items-center justify-center">
                +
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="max-w-[480px] mx-auto px-4 py-4 pb-24">
        {/* Hero */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-[38px] font-extrabold text-[#1c1c1c] leading-tight">Compliance</h1>
            <p className="text-[18px] text-[#6f6f6f] mt-0.5">Customs & regulations</p>
          </div>
          <span className="text-[56px] leading-none">📋</span>
        </div>

        {/* Compliance Card */}
        <div className="bg-[#70171a] rounded-xl p-4 text-white mb-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              🛡
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold">Compliance Center</div>
              <div className="text-sm opacity-90 mt-0.5 leading-tight">
                HS codes, duties and trade regulations
              </div>
            </div>
            <button className="bg-[#fff7f0] text-[#1c1c1c] px-3 py-2 rounded-lg font-semibold text-xs whitespace-nowrap">
              View Checklist →
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-base font-extrabold">2,847</div>
              <div className="text-[10px] text-white/70 mt-0.5">HS Codes</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-base font-extrabold">98%</div>
              <div className="text-[10px] text-white/70 mt-0.5">Compliant</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-base font-extrabold">195+</div>
              <div className="text-[10px] text-white/70 mt-0.5">Countries</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-base font-extrabold">12</div>
              <div className="text-[10px] text-white/70 mt-0.5">Regulations</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-white h-11 rounded-lg flex items-center px-3 shadow-sm">
            <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by HS code or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-none outline-none text-sm bg-transparent"
            />
          </div>
          <button className="w-11 h-11 border-none bg-white rounded-lg text-lg cursor-pointer shadow-sm flex items-center justify-center">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-3">
          {['hs-codes', 'regulations', 'checklist'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 h-10 rounded-lg border-none font-semibold text-xs cursor-pointer transition-all ${
                activeTab === tab
                  ? 'bg-[#0b5c3f] text-white shadow-md'
                  : 'bg-white text-[#444]'
              }`}
            >
              {tab === 'hs-codes' ? 'HS Codes' : tab === 'regulations' ? 'Regulations' : 'Checklist'}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'hs-codes' && (
          <div className="space-y-3">
            {filteredCodes.map((code) => (
              <div key={code.code} className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center text-xl flex-shrink-0">
                  {getItemIcon(code.code)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-[#7b1113]">{code.code}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      code.duty === '0%' ? 'bg-[#eaf6ea] text-[#2d6b2d]' : 'bg-[#fff3e0] text-[#e65100]'
                    }`}>
                      {code.duty} duty
                    </span>
                  </div>
                  <p className="text-xs text-[#333] mt-1 leading-tight line-clamp-2">
                    {code.description}
                  </p>
                  <p className="text-[10px] text-[#888] mt-1">
                    Origin: {code.origin} {code.flag}
                  </p>
                </div>
                <button className="w-9 h-9 rounded-lg bg-[#f6f2ef] text-base border-none cursor-pointer flex-shrink-0 flex items-center justify-center">
                  📋
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'regulations' && (
          <div className="bg-white rounded-xl p-5 text-center">
            <p className="text-sm text-[#666]">Regulations content coming soon</p>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <h3 className="text-sm font-bold text-[#1c1c1c] mb-3">Pre-Shipment Checklist</h3>
            <div className="space-y-1.5">
              {checklistData.map((check, i) => (
                <label key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f6f2ef] cursor-pointer">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    check.done ? 'bg-[#0b5c3f] border-[#0b5c3f]' : 'border-[#888]'
                  }`}>
                    {check.done && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-xs ${check.done ? 'text-[#888] line-through' : 'text-[#333]'}`}>
                    {check.item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FAB */}
      <button className="fixed right-4 bottom-20 w-14 h-14 rounded-full bg-[#7b1113] text-white text-3xl border-none shadow-lg cursor-pointer z-40">
        +
      </button>

      {/* Bottom Nav */}
      <BottomNav activeItem="browse" />
    </div>
  );
}