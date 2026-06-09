'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Bell, Menu, Home, Package, MessageSquare, User, FileText, CheckCircle, Globe, Plus, X, BarChart3, Settings, Truck, Shield } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/compliance', icon: Shield, label: 'Compliance', active: true },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

const hsCodesData = [
  { code: '8471.30', description: 'Portable digital automatic data processing machines', duty: '0%' },
  { code: '8471.41', description: 'Other digital automatic data processing machines', duty: '0%' },
  { code: '8471.50', description: 'Digital processing units, other', duty: '0%' },
  { code: '8471.70', description: 'Input or output units, whether or not containing', duty: '0%' },
  { code: '8471.80', description: 'Units of automatic data processing machines', duty: '0%' },
  { code: '8542.31', description: 'Electronic integrated circuits - processors', duty: '0%' },
  { code: '8542.39', description: 'Electronic integrated circuits - other', duty: '0%' },
  { code: '3004.90', description: 'Medicaments, measured doses', duty: '0%' },
  { code: '1006.30', description: 'Semi-milled or wholly milled rice', duty: '6%' },
  { code: '7210.41', description: 'Flat-rolled iron or non-alloy steel', duty: '20%' },
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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('hs-codes');
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
            const isActive = link.active;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
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
            const isActive = link.active;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
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
              <Plus className="w-5 h-5 text-white" />
            </Link>
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl">Compliance Center</h1>
              <p className="text-white/70 text-sm mt-1">HS codes, regulations, and trade compliance</p>
            </div>
          </div>
        </div>

        {/* Mobile Header Content */}
        <div className="lg:hidden bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-4 pt-6 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Compliance Center</h1>
              <p className="text-white/70 text-sm">HS codes & regulations</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-8 py-4 lg:py-6 space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Globe className="w-5 h-5 text-[#154230]" />
              </div>
              <p className="text-xl font-bold text-[#101111]">195+</p>
              <p className="text-xs text-[#4A4A4A]">Countries</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <FileText className="w-5 h-5 text-[#154230]" />
              </div>
              <p className="text-xl font-bold text-[#101111]">50K+</p>
              <p className="text-xs text-[#4A4A4A]">HS Codes</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-5 h-5 text-[#154230]" />
              </div>
              <p className="text-xl font-bold text-[#101111]">12</p>
              <p className="text-xs text-[#4A4A4A]">Regulations</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {['hs-codes', 'checklist'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === tab ? 'bg-[#154230] text-white' : 'bg-white text-[#4A4A4A]'
                }`}
              >
                {tab === 'hs-codes' ? 'HS Codes' : 'Checklist'}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
            <input
              type="text"
              placeholder="Search by HS code or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white border border-black/5 rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A]"
            />
          </div>

          {/* HS Codes Tab */}
          {activeTab === 'hs-codes' && (
            <div className="space-y-3">
              {filteredCodes.map((code, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-black/5">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono font-bold text-[#154230]">{code.code}</span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      code.duty === '0%' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {code.duty} Duty
                    </span>
                  </div>
                  <p className="text-sm text-[#4A4A4A]">{code.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="bg-white rounded-xl overflow-hidden">
              {checklistData.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-4 ${i !== checklistData.length - 1 ? 'border-b border-black/5' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    item.done ? 'bg-green-500' : 'bg-[#E6E2DA]'
                  }`}>
                    {item.done && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`flex-1 text-sm ${item.done ? 'text-[#4A4A4A] line-through' : 'text-[#101111]'}`}>
                    {item.item}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}