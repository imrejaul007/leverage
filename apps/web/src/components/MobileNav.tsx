'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  PlusSquare,
  MessageCircle,
  User,
  Ship,
  FileText,
  BarChart3,
  Settings,
  CreditCard,
} from 'lucide-react';

const mainNavItems = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Search', href: '/marketplace', icon: Search },
  { name: 'Post RFQ', href: '/rfqs/new', icon: PlusSquare, isAction: true },
  { name: 'Messages', href: '/marketplace/inbox', icon: MessageCircle },
  { name: 'Profile', href: '/settings', icon: User },
];

const secondaryNavItems = [
  { name: 'My Orders', href: '/orders', icon: Ship },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* Main Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A1628] border-t border-[#1E293B] safe-area-bottom">
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
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] text-[#F97316] font-semibold mt-1">
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
                <div className={`relative ${isActive ? 'text-[#F97316]' : 'text-[#64748B]'}`}>
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                  {item.name === 'Messages' && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      3
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${
                  isActive ? 'text-[#F97316] font-semibold' : 'text-[#64748B]'
                }`}>
                  {item.name}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 w-1 h-1 bg-[#F97316] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* More Menu Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="fixed bottom-20 right-4 z-50 w-12 h-12 bg-[#1E293B] rounded-full flex items-center justify-center shadow-lg border border-[#334155]"
      >
        <svg
          className={`w-6 h-6 text-white transition-transform ${showMenu ? 'rotate-45' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* More Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-[60]" onClick={() => setShowMenu(false)}>
          <div className="absolute bottom-24 left-4 right-4 bg-[#0F172A] rounded-2xl border border-[#1E293B] shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-[#1E293B]">
              <h3 className="text-white font-semibold text-sm">Quick Access</h3>
            </div>
            <div className="grid grid-cols-3 gap-1 p-2">
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
                        ? 'bg-[#F97316]/20 text-[#F97316]'
                        : 'text-[#94A3B8] hover:bg-[#1E293B]'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-[#F97316]/20' : 'bg-[#1E293B]'
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
