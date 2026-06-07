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
  CheckSquare,
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
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0E3B36] border-t border-[rgba(255,255,255,0.1)] safe-area-bottom">
        <div className="flex items-center justify-around px-1 py-2">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;

            if (item.isAction) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center -mt-6"
                >
                  <div className="w-14 h-14 rounded-full bg-[#C49A6C] flex items-center justify-center shadow-lg shadow-[#C49A6C]/30">
                    <Icon className="w-7 h-7 text-[#081512]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] text-[#C49A6C] font-semibold mt-1">
                    {item.name}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-all ${
                  isActive ? 'scale-110' : ''
                }`}
              >
                <div className={`relative ${isActive ? 'text-[#C49A6C]' : 'text-[#D8CCBC]/60'}`}>
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                  {item.name === 'Inbox' && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      3
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${
                  isActive ? 'text-[#C49A6C] font-semibold' : 'text-[#D8CCBC]/60'
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
        className="fixed bottom-20 right-4 z-50 w-12 h-12 bg-[#C49A6C] rounded-full flex items-center justify-center shadow-lg border-2 border-[#081512]"
      >
        <svg
          className={`w-6 h-6 text-[#081512] transition-transform ${showMenu ? 'rotate-45' : ''}`}
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
          <div className="absolute bottom-24 left-4 right-4 bg-[#0E3B36] rounded-2xl border border-[rgba(255,255,255,0.1)] shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[rgba(255,255,255,0.05)]">
              <h3 className="text-[#F4F1EA] font-semibold text-sm">Trade Menu</h3>
              <p className="text-[#D8CCBC]/60 text-xs mt-1">Quick access to all features</p>
            </div>
            <div className="grid grid-cols-3 gap-2 p-3">
              {secondaryNavItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowMenu(false)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-[#C49A6C]/20 text-[#C49A6C]'
                        : 'text-[#D8CCBC] hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-[#C49A6C]/20' : 'bg-[rgba(255,255,255,0.05)]'
                    }`}>
                      <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    <span className="text-xs font-medium text-center leading-tight">
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
          className="fixed inset-0 bg-black/50 z-[55]"
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  );
}
