'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, Menu, Home, Package, MessageSquare, User, FileText, CheckCircle, Globe, Copy, Plus, X, Settings, LogOut, BarChart3, Truck } from 'lucide-react';

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/compliance', icon: CheckCircle, label: 'Compliance', active: true },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

const bottomNavLinks = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs/new', icon: Plus, label: 'Post RFQ', primary: true },
  { href: '/marketplace/inbox', icon: MessageSquare, label: 'Inbox' },
  { href: '/account', icon: User, label: 'Account' },
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
      {/* Desktop Sidebar - Fixed on left */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        <div className="p-6 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-[#101111] font-bold text-lg tracking-tight">LEVERAGE</h1>
              <p className="text-[#4A4A4A] text-[10px] tracking-wider">CONNECTING DOTS TO PORTS</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#154230] text-white'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
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
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-[#101111] font-bold text-lg tracking-tight">LEVERAGE</h1>
              <p className="text-[#4A4A4A] text-[10px] tracking-wider">CONNECTING DOTS TO PORTS</p>
            </div>
          </div>
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
            const isActive = link.active;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#154230] text-white'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
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
            <div className="w-8 h-8 bg-[#154230] rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[#154230] font-bold text-lg">LEVERAGE</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/rfqs/new" className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </Link>
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-2xl">Trade Compliance</h1>
              <p className="text-white/70 text-sm mt-1">HS codes, duties, and import requirements</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search HS codes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 h-11 pl-10 pr-4 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <button className="relative w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-8 py-4 lg:py-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('hs-codes')}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'hs-codes'
                  ? 'bg-[#154230] text-white'
                  : 'bg-white text-[#4A4A4A]'
              }`}
            >
              HS Codes
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === 'checklist'
                  ? 'bg-[#154230] text-white'
                  : 'bg-white text-[#4A4A4A]'
              }`}
            >
              Import Checklist
            </button>
          </div>

          {/* HS Codes Tab */}
          {activeTab === 'hs-codes' && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#E6E2DA]">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A4A4A]">HS Code</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Description</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Duty</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-[#4A4A4A]">Origin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCodes.map((code, i) => (
                      <tr key={code.code} className={`border-t border-black/5 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F7F6F2]'}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <code className="text-[#154230] font-mono font-semibold">{code.code}</code>
                            <button className="p-1 hover:bg-[#E6E2DA] rounded">
                              <Copy className="w-4 h-4 text-[#4A4A4A]" />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-[#101111]">{code.description}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${code.duty === '0%' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {code.duty}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{code.flag} {code.origin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="space-y-3">
                {checklistData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[#F7F6F2] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.done ? 'bg-[#154230]' : 'border-2 border-[#4A4A4A]'}`}>
                        {item.done && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`text-sm ${item.done ? 'text-[#101111] line-through opacity-60' : 'text-[#101111]'}`}>
                        {item.item}
                      </span>
                    </div>
                    {item.done && (
                      <span className="px-2 py-1 bg-[#154230]/10 text-[#154230] text-xs font-medium rounded-lg">Completed</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats - Mobile */}
          <div className="lg:hidden mt-6 bg-[#5D1E21] rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-white text-xl font-bold">98%</p>
                <p className="text-white/70 text-xs">Compliance Rate</p>
              </div>
              <div>
                <p className="text-white text-xl font-bold">140+</p>
                <p className="text-white/70 text-xs">Countries</p>
              </div>
              <div>
                <p className="text-white text-xl font-bold">24/7</p>
                <p className="text-white/70 text-xs">AI Support</p>
              </div>
            </div>
          </div>

          {/* Desktop Stats */}
          <div className="hidden lg:grid grid-cols-4 gap-6 mt-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-[#154230]" />
              </div>
              <p className="text-2xl font-bold text-[#101111]">98%</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Compliance Rate</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-[#154230]" />
              </div>
              <p className="text-2xl font-bold text-[#101111]">140+</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Countries Covered</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-[#154230]" />
              </div>
              <p className="text-2xl font-bold text-[#101111]">10K+</p>
              <p className="text-sm text-[#4A4A4A] mt-1">HS Codes</p>
            </div>
            <div className="bg-[#5D1E21] rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">24/7</p>
              <p className="text-sm text-white/70 mt-1">AI Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#eee] h-[72px] flex items-center justify-around z-30">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#666]">
          <span className="text-2xl">🏠</span>
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/marketplace" className="flex flex-col items-center gap-1 text-[#666]">
          <span className="text-2xl">🔍</span>
          <span className="text-[10px] font-medium">Browse</span>
        </Link>
        <Link href="/rfqs/new" className="flex flex-col items-center -mt-4">
          <div className="w-12 h-12 bg-[#154230] rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
            +
          </div>
        </Link>
        <Link href="/marketplace/inbox" className="flex flex-col items-center gap-1 text-[#666]">
          <span className="text-2xl">💬</span>
          <span className="text-[10px] font-medium">Inbox</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center gap-1 text-[#666]">
          <span className="text-2xl">👤</span>
          <span className="text-[10px] font-medium">Account</span>
        </Link>
      </nav>
    </div>
  );
}
