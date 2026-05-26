'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/rfqs': 'RFQs',
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

export default function MobileHeader() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  const getPageTitle = () => {
    for (const [path, title] of Object.entries(pageTitles)) {
      if (pathname === path || pathname.startsWith(path + '/')) {
        return title;
      }
    }
    return 'Leverage';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0E3B36]/95 backdrop-blur-lg border-b border-[rgba(255,255,255,0.1)]">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#C49A6C] flex items-center justify-center">
            <span className="text-[#081512] font-bold text-sm">L</span>
          </div>
          <span className="text-[#C49A6C] font-bold text-lg">LEVERAGE</span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 text-[#D8CCBC] hover:text-[#F4F1EA]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[#D8CCBC] hover:text-[#F4F1EA]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Page Title */}
      <div className="px-4 pb-3">
        <h1 className="text-xl font-bold text-[#F4F1EA]">{getPageTitle()}</h1>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0E3B36] border-b border-[rgba(255,255,255,0.1)] shadow-xl">
          <div className="p-4 space-y-1">
            {[
              { name: 'Dashboard', href: '/dashboard', icon: '📊' },
              { name: 'RFQs', href: '/rfqs', icon: '📋' },
              { name: 'Documents', href: '/documents', icon: '📄' },
              { name: 'Marketplace', href: '/marketplace', icon: '🌐' },
              { name: 'Compliance', href: '/compliance', icon: '✅' },
              { name: 'Freight', href: '/freight', icon: '🚢' },
              { name: 'Orders', href: '/orders', icon: '📦' },
              { name: 'Products', href: '/products', icon: '🛍️' },
              { name: 'Messages', href: '/messages', icon: '💬' },
              { name: 'AI Assistant', href: '/ai', icon: '🤖' },
              { name: 'Analytics', href: '/analytics', icon: '📈' },
              { name: 'Billing', href: '/billing', icon: '💳' },
              { name: 'Settings', href: '/settings', icon: '⚙️' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#D8CCBC] hover:text-[#F4F1EA] hover:bg-[rgba(255,255,255,0.05)] rounded-xl transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
