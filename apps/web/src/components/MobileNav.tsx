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
  Shield,
  Bot,
  Headphones,
} from 'lucide-react';

const mainNavItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Browse', href: '/marketplace', icon: Search },
  { name: 'Post RFQ', href: '/rfqs/new', icon: Plus, isAction: true },
  { name: 'Inbox', href: '/marketplace/inbox', icon: MessageSquare },
  { name: 'Account', href: '/settings', icon: User },
];

const secondaryNavItems = [
  { name: 'My Orders', href: '/orders', icon: Package },
  { name: 'My RFQs', href: '/rfqs', icon: FileText },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Consultations', href: '/consultations', icon: Headphones },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'Network', href: '/network', icon: Briefcase },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'AI Assistant', href: '/ai', icon: Bot },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Main Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-black/5 safe-area-bottom">
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
                  <div className="w-12 h-12 rounded-full bg-[#154230] flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-[9px] text-[#154230] font-semibold mt-1">
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
                <div className={`relative ${isActive ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}>
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  {item.name === 'Inbox' && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#A6824A] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                      3
                    </span>
                  )}
                </div>
                <span className={`text-[9px] font-medium ${
                  isActive ? 'text-[#154230] font-semibold' : 'text-[#4A4A4A]'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* More Menu Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed bottom-16 right-4 z-50 w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center shadow-lg border-2 border-white"
      >
        <svg
          className={`w-5 h-5 text-white transition-transform ${showMenu ? 'rotate-45' : ''}`}
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
          <div className="absolute bottom-20 left-4 right-4 bg-white rounded-2xl border border-black/5 shadow-2xl overflow-hidden">
            <div className="p-3 border-b border-black/5">
              <h3 className="text-[#101111] font-semibold text-sm">More Options</h3>
              <p className="text-[#4A4A4A] text-xs">Quick access to all features</p>
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
                        ? 'bg-[#154230]/10 text-[#154230]'
                        : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-[#154230]/10' : 'bg-[#E6E2DA]'
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
          className="fixed inset-0 bg-black/20 z-[55]"
          onClick={() => setShowMenu(false)}
        />
      )}
    </>
  );
}
