'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Search, Bell, Plus, Menu, X, ChevronDown } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/marketplace': 'Browse Products',
  '/marketplace/inbox': 'Messages',
  '/marketplace/compare': 'Compare',
  '/rfqs': 'My RFQs',
  '/rfqs/new': 'Post New RFQ',
  '/documents': 'Documents',
  '/consultations': 'Expert Help',
  '/ai': 'AI Assistant',
  '/freight': 'Freight Quotes',
  '/compliance': 'Compliance',
  '/messages': 'Messages',
  '/orders': 'My Orders',
  '/products': 'My Products',
  '/analytics': 'Analytics',
  '/billing': 'Billing',
  '/settings': 'Profile',
  '/network': 'Network',
  '/ads': 'Advertisements',
};

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(3);
  const user = useSelector((state: RootState) => state.auth.user);

  const getPageTitle = () => {
    for (const [path, title] of Object.entries(pageTitles)) {
      if (pathname === path || pathname.startsWith(path + '/')) {
        return title;
      }
    }
    return 'LEVERAGE';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A1628] border-b border-[#1E293B]">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo& Title */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V8l9-5 9 5v13M3 8l9 5 9-5M9 21V12h6v9" />
              </svg>
            </div>
            <div>
              <span className="text-white font-bold text-lg brand-font">LEVERAGE</span>
              <p className="text-[#64748B] text-[10px] -mt-0.5">Global Trade</p>
            </div>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2.5 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] rounded-xl transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <Link
            href="/marketplace/inbox"
            className="relative p-2.5 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>

          {/* Quick Post */}
          <Link
            href="/rfqs/new"
            className="flex items-center gap-1.5 px-3 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-sm font-semibold">Post RFQ</span>
          </Link>
        </div>
      </div>

      {/* Page Title Bar */}
      <div className="px-4 py-2 bg-[#0F172A] border-t border-[#1E293B]">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-semibold text-base">{getPageTitle()}</h1>
          <div className="flex items-center gap-2 text-[#64748B] text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="absolute top-full left-0 right-0 bg-[#0F172A] border-b border-[#1E293B] p-4 shadow-xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, suppliers, HS codes..."
              className="w-full h-12 pl-12 pr-4 bg-[#1E293B] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#F97316]"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowSearch(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
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
                className="px-3 py-1.5 bg-[#1E293B] text-[#94A3B8] text-xs rounded-full hover:bg-[#334155] hover:text-white transition-colors"
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
