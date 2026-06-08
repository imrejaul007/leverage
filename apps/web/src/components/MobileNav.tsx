'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Search,
  Plus,
  MessageSquare,
  User,
  Package,
  FileText,
  Truck,
  CreditCard,
  Settings,
  BarChart3,
  Briefcase,
  Compass,
} from 'lucide-react';

const mainNavItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Browse', href: '/marketplace', icon: Compass },
  { name: 'Post RFQ', href: '/rfqs/new', icon: Plus, isAction: true },
  { name: 'Inbox', href: '/marketplace/inbox', icon: MessageSquare },
  { name: 'Account', href: '/settings', icon: User },
];

const secondaryNavItems = [
  { name: 'My Orders', href: '/orders', icon: Package, desc: 'Track shipments' },
  { name: 'My RFQs', href: '/rfqs', icon: FileText, desc: 'Manage quotes' },
  { name: 'Documents', href: '/documents', icon: FileText, desc: 'Trade papers' },
  { name: 'Freight', href: '/freight', icon: Truck, desc: 'Shipping' },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, desc: 'Reports' },
  { name: 'Billing', href: '/billing', icon: CreditCard, desc: 'Payments' },
  { name: 'Network', href: '/network', icon: Briefcase, desc: 'Suppliers' },
  { name: 'Settings', href: '/settings', icon: Settings, desc: 'Account' },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Main Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0f14]/95 backdrop-blur-xl border-t border-white/5 safe-area-bottom">
        <div className="flex items-center justify-around px-1 py-1.5">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            if (item.isAction) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center -mt-5"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C49A6C] flex items-center justify-center shadow-lg shadow-[#C49A6C]/20">
                    <Icon className="w-6 h-6 text-[#0a0f14]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[9px] text-[#C49A6C] font-semibold mt-1">
                    {item.name}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 transition-all ${
                  isActive ? 'scale-105' : ''
                }`}
              >
                <div className={`relative ${isActive ? 'text-[#C49A6C]' : 'text-[#8a8f94]'}`}>
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  {item.name === 'Inbox' && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      3
                    </span>
                  )}
                </div>
                <span className={`text-[9px] font-medium ${
                  isActive ? 'text-[#C49A6C] font-semibold' : 'text-[#8a8f94]'
                }`}>
                  {item.name}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 w-1 h-1 bg-[#C49A6C] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* More Menu Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed bottom-16 right-4 z-50 w-10 h-10 bg-[#C49A6C] rounded-full flex items-center justify-center shadow-lg shadow-[#C49A6C]/20 border-2 border-[#0a0f14]"
      >
        <svg
          className={`w-5 h-5 text-[#0a0f14] transition-transform ${showMenu ? 'rotate-45' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* More Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-[60]" onClick={() => setShowMenu(false)}>
          <div className="absolute bottom-20 left-4 right-4 bg-[#121820] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="p-3 border-b border-white/5">
              <h3 className="text-[#F4F1EA] font-semibold text-sm">Trade Menu</h3>
              <p className="text-[#8a8f94] text-xs">Quick access to all features</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5 p-2.5">
              {secondaryNavItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowMenu(false)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-[#C49A6C]/10 text-[#C49A6C]'
                        : 'text-[#8a8f94] hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-[#C49A6C]/10' : 'bg-white/5'
                    }`}>
                      <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <span className="text-[11px] font-medium text-center leading-tight">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Overlay backdrop */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/60 z-[55]"
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  );
}