'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Search, Bell, Plus, X } from 'lucide-react';

const pageInfo: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Your trade overview' },
  '/marketplace': { title: 'Marketplace', subtitle: 'Browse suppliers& products' },
  '/marketplace/inbox': { title: 'Inbox', subtitle: 'Messages & quotes' },
  '/marketplace/compare': { title: 'Compare', subtitle: 'Compare selected products' },
  '/rfqs': { title: 'My RFQs', subtitle: 'Manage your requests for quotes' },
  '/rfqs/new': { title: 'Post RFQ', subtitle: 'Create new quote request' },
  '/documents': { title: 'Documents', subtitle: 'Trade documents & certificates' },
  '/consultations': { title: 'Consultations', subtitle: 'Expert trade advice' },
  '/ai': { title: 'AI Assistant', subtitle: 'HS codes, duties & compliance' },
  '/freight': { title: 'Freight', subtitle: 'Shipping & logistics' },
  '/compliance': { title: 'Compliance', subtitle: 'Customs & regulations' },
  '/messages': { title: 'Messages', subtitle: 'Direct messages' },
  '/orders': { title: 'Orders', subtitle: 'Track your shipments' },
  '/products': { title: 'Products', subtitle: 'Your product catalog' },
  '/analytics': { title: 'Analytics', subtitle: 'Trade performance reports' },
  '/billing': { title: 'Billing', subtitle: 'Payments & invoices' },
  '/settings': { title: 'Settings', subtitle: 'Account preferences' },
  '/network': { title: 'Network', subtitle: 'Suppliers & buyers' },
  '/ads': { title: 'Ads', subtitle: 'Promote your business' },
};

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);

  const getPageInfo = (): { title: string; subtitle: string } => {
    for (const [path, info] of Object.entries(pageInfo)) {
      if (pathname === path || pathname.startsWith(path + '/')) {
        return info;
      }
    }
    return { title: 'LEVERAGE', subtitle: 'Global Trade Platform' };
  };

  const currentPageInfo = getPageInfo();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0E3B36] border-b border-[rgba(255,255,255,0.05)]">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo& Title */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="LEVERAGE" width={36} height={36} className="object-contain" />
            <div className="hidden sm:block">
              <span className="text-[#C49A6C] font-bold text-lg brand-font">{currentPageInfo.title}</span>
              <p className="text-[#D8CCBC]/60 text-[10px] -mt-1">{currentPageInfo.subtitle}</p>
            </div>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2.5 text-[#D8CCBC] hover:text-white hover:bg-[rgba(255,255,255,0.1)] rounded-xl transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <Link
            href="/marketplace/inbox"
            className="relative p-2.5 text-[#D8CCBC] hover:text-white hover:bg-[rgba(255,255,255,0.1)] rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C49A6C] text-[#081512] text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Quick Post */}
          <Link
            href="/rfqs/new"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#C49A6C] hover:bg-[#D4AA82] text-[#081512] rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-sm font-semibold hidden sm:inline">Post RFQ</span>
          </Link>
        </div>
      </div>

      {/* Mobile Page Title (only on sm+) */}
      <div className="sm:hidden px-4 pb-3">
        <h1 className="text-[#F4F1EA] font-semibold">{currentPageInfo.title}</h1>
        <p className="text-[#D8CCBC]/60 text-xs">{currentPageInfo.subtitle}</p>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-[#0E3B36] border-b border-[rgba(255,255,255,0.05)] p-4 shadow-xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D8CCBC]/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, suppliers, HS codes..."
              className="w-full h-12 pl-12 pr-12 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder-[#D8CCBC]/50 focus:outline-none focus:border-[#C49A6C]"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D8CCBC] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Search Suggestions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {['Electronics', 'Textiles', 'Machinery', 'Chemicals'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  router.push(`/marketplace?search=${encodeURIComponent(term)}`);
                  setShowSearch(false);
                }}
                className="px-3 py-1.5 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] text-sm rounded-full hover:bg-[rgba(255,255,255,0.1)] hover:text-white transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
