'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/marketplace': 'Marketplace',
  '/marketplace/inbox': 'My Inbox',
  '/marketplace/compare': 'Compare',
  '/rfqs': 'RFQs',
  '/rfqs/new': 'New RFQ',
  '/documents': 'Documents',
  '/consultations': 'Consultations',
  '/ai': 'AI Assistant',
  '/freight': 'Freight',
  '/compliance': 'Compliance',
  '/messages': 'Messages',
  '/orders': 'Orders',
  '/products': 'Products',
  '/analytics': 'Analytics',
  '/billing': 'Billing',
  '/settings': 'Settings',
  '/network': 'Network',
  '/ads': 'Ads',
};

const quickActions = [
  { name: 'Browse', href: '/marketplace', icon: 'M3 3h18v18H3V3zm2 6h14v2H5V9zm0 4h14v2H5v-2zm0 4h10v2H5v-2z' },
  { name: 'New RFQ', href: '/rfqs/new', icon: 'M12 4v16m8-8H4' },
  { name: 'My Inbox', href: '/marketplace/inbox', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M14 15a2 2 0 11-4 0 2 2 0 014 0z' },
  { name: 'AI Chat', href: '/ai', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
];

export default function MobileHeader() {
  const pathname = usePathname();
  const [showActions, setShowActions] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const getPageTitle = () => {
    for (const [path, title] of Object.entries(pageTitles)) {
      if (pathname === path || pathname.startsWith(path + '/')) {
        return title;
      }
    }
    return 'LEVERAGE';
  };

  const isInbox = pathname.includes('/inbox') || pathname.includes('/messages');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0E3B36]/95 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)]">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
            <span className="text-[#C49A6C] font-bold text-lg brand-font">{getPageTitle()}</span>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Inbox Notification */}
          <Link
            href="/marketplace/inbox"
            className="relative p-2 text-[#D8CCBC] hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M14 15a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C49A6C] text-[#081512] text-xs font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Notifications */}
          <button className="relative p-2 text-[#D8CCBC] hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <Link href="/settings" className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C49A6C] to-[#D4AA82] flex items-center justify-center text-[#081512] font-bold text-sm">
            {user?.firstName?.[0] || 'U'}
          </Link>
        </div>
      </div>

      {/* Quick Actions Dropdown */}
      {showActions && (
        <div className="absolute top-full left-0 right-0 bg-[#0E3B36] border-b border-[rgba(255,255,255,0.1)] p-4">
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map(action => (
              <Link
                key={action.name}
                href={action.href}
                onClick={() => setShowActions(false)}
                className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#081512] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                  </svg>
                </div>
                <span className="text-[#F4F1EA] text-xs font-medium">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
