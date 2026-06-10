'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Bell, Menu, Home, MessageSquare, User, Plus, X, Package, Truck, FileText, BarChart3, Settings } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredCodes = hsCodesData.filter(code =>
    code.code.includes(searchQuery) ||
    code.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-black/5 flex items-center justify-between">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-9 h-9 bg-[#E6E2DA] rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/rfqs/new" className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">+</span>
            </Link>
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <h1 className="text-white font-bold text-2xl">Compliance</h1>
          <p className="text-white/70 text-sm mt-1">Customs & trade regulations</p>
        </div>

        {/* Content */}
        <div className="px-5 lg:px-8 py-6">
          {/* Hero */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-[#101111] text-2xl lg:text-3xl font-bold">Compliance</h1>
              <p className="text-[#777777] text-sm mt-1">Customs & regulations</p>
            </div>
            <span className="text-6xl lg:text-7xl">📋</span>
          </div>

          {/* Compliance Card */}
          <div className="bg-[#5D1E21] rounded-2xl p-5 text-white mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  🛡
                </div>
                <div>
                  <div className="text-xl font-bold">Compliance Center</div>
                  <div className="text-white/80 text-sm mt-1">
                    HS codes, duties and trade regulations
                  </div>
                </div>
              </div>
              <button className="bg-[#fff7f0] text-[#1c1c1c] px-4 py-2.5 rounded-xl font-semibold text-sm cursor-pointer border-none whitespace-nowrap">
                View Checklist →
              </button>
            </div>

            <div className="bg-white/10 rounded-xl p-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">2,847</div>
                <div className="text-white/70 text-xs mt-1">HS Codes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-white/70 text-xs mt-1">Compliant</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">195+</div>
                <div className="text-white/70 text-xs mt-1">Countries</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-white/70 text-xs mt-1">Regulations</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 bg-white h-14 rounded-xl flex items-center px-4 shadow-sm">
              <Search className="w-5 h-5 text-[#888] mr-3" />
              <input
                type="text"
                placeholder="Search by HS code or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-none outline-none text-sm bg-transparent"
              />
            </div>
            <button className="w-14 h-14 border-none bg-white rounded-xl text-xl cursor-pointer shadow-sm">
              ☰
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {['hs-codes', 'regulations', 'checklist'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 h-12 rounded-xl border-none font-semibold text-sm cursor-pointer transition-colors ${
                  activeTab === tab
                    ? 'bg-[#154230] text-white'
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
                <div key={code.code} className="bg-white rounded-2xl p-4 mb-3 flex items-center justify-between shadow-sm">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-full bg-[#f5f5f5] flex items-center justify-center text-2xl flex-shrink-0">
                      {getItemIcon(code.code)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-bold text-[#5D1E21]">{code.code}</span>
                        <span className="bg-[#eaf6ea] text-[#2d6b2d] text-xs px-2 py-1 rounded-lg font-medium">
                          {code.duty} duty
                        </span>
                      </div>
                      <div className="text-sm text-[#333] mt-1">
                        {code.description}
                      </div>
                      <div className="text-xs text-[#888] mt-1">
                        Origin: {code.origin} {code.flag}
                      </div>
                    </div>
                  </div>
                  <button className="w-11 h-11 rounded-xl bg-[#f6f2ef] text-xl border-none cursor-pointer flex-shrink-0">
                    📋
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'regulations' && (
            <div className="bg-white rounded-2xl p-6 text-center">
              <p className="text-sm text-[#666]">Regulations content coming soon</p>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="bg-white rounded-2xl p-4">
              <h3 className="text-base font-bold text-[#1c1c1c] mb-4">Pre-Shipment Checklist</h3>
              <div className="space-y-2">
                {checklistData.map((check, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f6f2ef] cursor-pointer">
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      check.done ? 'bg-[#154230] border-[#154230]' : 'border-[#888]'
                    }`}>
                      {check.done && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm ${check.done ? 'text-[#888] line-through' : 'text-[#333]'}`}>
                      {check.item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="browse" />
    </div>
  );
}
