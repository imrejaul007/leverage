'use client';

import { useState } from 'react';
import { Search, Bell, Menu, Home, Package, MessageSquare, User } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f8f6f3]">
      {/* ========== HEADER ========== */}
      <header className="bg-white shadow-sm">
        <div className="max-w-[480px] mx-auto">
          {/* Status Bar */}
          <div className="bg-white px-5 py-1.5 flex justify-between items-center">
            <span className="text-xs font-medium text-[#1c1c1c]">10:25</span>
            <div className="flex items-center gap-3">
              {/* Signal Bars */}
              <div className="flex items-end gap-[2px] h-3">
                <div className="w-[2px] h-1.5 bg-[#1c1c1c] rounded-[1px]"></div>
                <div className="w-[2px] h-2 bg-[#1c1c1c] rounded-[1px]"></div>
                <div className="w-[2px] h-2.5 bg-[#1c1c1c] rounded-[1px]"></div>
                <div className="w-[2px] h-3 bg-[#1c1c1c] rounded-[1px]"></div>
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
          <div className="flex justify-between items-center px-5 pt-3 pb-2">
            {/* Logo */}
            <div>
              <div className="text-[28px] font-extrabold text-[#0f7c59] leading-none">LEVERGE</div>
              <div className="text-[9px] font-medium text-[#b89b3f] mt-1">CONNECTING THE DOTS OF TRADE</div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="p-1">
                <span className="text-[22px]">🔍</span>
              </button>
              <button className="relative p-1">
                <span className="text-[22px]">🔔</span>
                <span className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-[#7b1113] text-white text-[10px] flex items-center justify-center font-bold">
                  3
                </span>
              </button>
              <button className="w-[46px] h-[46px] rounded-[10px] bg-[#0b5c3f] text-white text-[28px] font-bold border-none cursor-pointer flex items-center justify-center">
                +
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="max-w-[480px] mx-auto px-6 py-3 pb-24">
        {/* Hero */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-[46px] font-extrabold text-[#1c1c1c] leading-tight">Compliance</h1>
            <p className="text-[24px] text-[#6f6f6f] mt-1">Customs & regulations</p>
          </div>
          <span className="text-[90px] leading-none">📋</span>
        </div>

        {/* Compliance Card */}
        <div className="bg-[#70171a] rounded-[18px] p-[18px] text-white mt-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-3 items-start">
              <div className="w-[60px] h-[60px] bg-white rounded-[12px] flex items-center justify-center text-[28px] flex-shrink-0">
                🛡
              </div>
              <div>
                <div className="text-[24px] font-bold">Compliance Center</div>
                <div className="text-[18px] opacity-90 mt-1 leading-tight">
                  HS codes, duties and<br />trade regulations
                </div>
              </div>
            </div>
            <button className="bg-[#fff7f0] text-[#1c1c1c] px-4 py-3 rounded-[10px] font-semibold text-[16px] cursor-pointer border-none whitespace-nowrap">
              View Checklist →
            </button>
          </div>

          <div className="bg-white rounded-[14px] p-4 grid grid-cols-4 gap-[10px] text-center">
            <div>
              <div className="text-[24px] font-extrabold text-[#222]">2,847</div>
              <div className="text-[12px] text-[#666] mt-1">HS Codes</div>
            </div>
            <div>
              <div className="text-[24px] font-extrabold text-[#222]">98%</div>
              <div className="text-[12px] text-[#666] mt-1">Compliant</div>
            </div>
            <div>
              <div className="text-[24px] font-extrabold text-[#222]">195+</div>
              <div className="text-[12px] text-[#666] mt-1">Countries</div>
            </div>
            <div>
              <div className="text-[24px] font-extrabold text-[#222]">12</div>
              <div className="text-[12px] text-[#666] mt-1">Regulations</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-3 mt-4">
          <div className="flex-1 bg-white h-[58px] rounded-[12px] flex items-center px-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <span className="text-[18px] mr-3">🔍</span>
            <input
              type="text"
              placeholder="Search by HS code or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-none outline-none text-[15px] bg-transparent"
            />
          </div>
          <button className="w-[58px] h-[58px] border-none bg-white rounded-[12px] text-[22px] cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            ☰
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-[10px] py-4">
          {['hs-codes', 'regulations', 'checklist'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 h-[50px] rounded-[12px] border-none font-semibold text-[15px] cursor-pointer transition-colors ${
                activeTab === tab
                  ? 'bg-[#0b5c3f] text-white'
                  : 'bg-white text-[#444]'
              }`}
            >
              {tab === 'hs-codes' ? 'HS Codes' : tab === 'regulations' ? 'Regulations' : 'Checklist'}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'hs-codes' && (
          <div>
            {filteredCodes.map((code) => (
              <div key={code.code} className="bg-white rounded-[16px] p-4 mb-[14px] flex items-center justify-between shadow-[0_2px_5px_rgba(0,0,0,0.04)]">
                <div className="flex gap-[14px] items-center">
                  <div className="w-[58px] h-[58px] rounded-full bg-[#f5f5f5] flex items-center justify-center text-[28px] flex-shrink-0">
                    {getItemIcon(code.code)}
                  </div>
                  <div>
                    <div>
                      <span className="text-[18px] font-bold text-[#7b1113]">{code.code}</span>
                      <span className="ml-[10px] bg-[#eaf6ea] text-[#2d6b2d] text-[12px] px-2 py-[3px] rounded-[8px] font-semibold">
                        {code.duty} duty
                      </span>
                    </div>
                    <div className="text-[15px] text-[#333] mt-1.5 leading-tight">
                      {code.description.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </div>
                    <div className="text-[13px] text-[#888] mt-1.5">
                      Origin: {code.origin} {code.flag}
                    </div>
                  </div>
                </div>
                <button className="w-[44px] h-[44px] rounded-[10px] bg-[#f6f2ef] text-[20px] border-none cursor-pointer flex-shrink-0">
                  📋
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'regulations' && (
          <div className="bg-white rounded-[16px] p-6 text-center">
            <p className="text-[15px] text-[#666]">Regulations content coming soon</p>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="bg-white rounded-[16px] p-4">
            <h3 className="text-[18px] font-bold text-[#1c1c1c] mb-4">Pre-Shipment Checklist</h3>
            <div className="space-y-2">
              {checklistData.map((check, i) => (
                <label key={i} className="flex items-center gap-3 p-3 rounded-[10px] hover:bg-[#f6f2ef] cursor-pointer">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                    check.done ? 'bg-[#0b5c3f] border-[#0b5c3f]' : 'border-[#888]'
                  }`}>
                    {check.done && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-[15px] ${check.done ? 'text-[#888] line-through' : 'text-[#333]'}`}>
                    {check.item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FAB */}
      <button className="fixed right-7 bottom-[110px] w-[62px] h-[62px] rounded-full bg-[#7b1113] text-white text-[34px] border-none shadow-[0_8px_20px_rgba(0,0,0,0.2)] cursor-pointer z-40">
        +
      </button>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center h-[85px] border-t border-[#eee] z-50 max-w-[480px] mx-auto">
        <button className="flex flex-col items-center gap-1.5">
          <span className="text-[24px]">🏠</span>
          <span className="text-[12px] text-[#555]">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1.5">
          <span className="text-[24px]">🔍</span>
          <span className="text-[12px] text-[#555]">Browse</span>
        </button>
        <button className="w-[62px] h-[62px] rounded-full bg-[#0b5c3f] flex items-center justify-center text-[34px] text-white -mt-4 shadow-lg">
          +
        </button>
        <button className="flex flex-col items-center gap-1.5 relative">
          <span className="text-[24px]">📥</span>
          <span className="text-[12px] text-[#555]">Inbox</span>
        </button>
        <button className="flex flex-col items-center gap-1.5">
          <span className="text-[24px]">👤</span>
          <span className="text-[12px] text-[#555]">Account</span>
        </button>
      </nav>
    </div>
  );
}