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
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-black/5">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo& Title */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Image src="/logo.png" alt="LEVERAGE" width={96} height={32} className="object-contain" />
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications */}
          <Link
            href="/marketplace/inbox"
            className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C49A6C] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Quick Post */}
          <Link
            href="/rfqs/new"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#3E6A47] hover:bg-[#4A7D55] text-white rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span className="text-xs font-semibold hidden sm:inline">Post RFQ</span>
          </Link>
        </div>
      </div>

      {/* Mobile Page Title (only on sm+) */}
      <div className="sm:hidden px-4 pb-2.5">
        <h1 className="text-gray-900 font-semibold text-sm">{currentPageInfo.title}</h1>
        <p className="text-gray-500 text-xs">{currentPageInfo.subtitle}</p>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-black/5 p-3 shadow-lg">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, suppliers, HS codes..."
              className="w-full h-10 pl-10 pr-10 bg-gray-50 border border-black/5 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C49A6C] text-sm"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Search Suggestions */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {['Electronics', 'Textiles', 'Machinery', 'Chemicals'].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setSearchQuery(term);
                  router.push(`/marketplace?search=${encodeURIComponent(term)}`);
                  setShowSearch(false);
                }}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 hover:text-gray-900 transition-colors"
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
