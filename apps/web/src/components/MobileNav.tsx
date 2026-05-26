'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/dashboard', icon: '🏠' },
  { name: 'RFQs', href: '/rfqs', icon: '📋' },
  { name: 'Docs', href: '/documents', icon: '📄' },
  { name: 'Consult', href: '/consultations', icon: '💬' },
  { name: 'AI', href: '/ai', icon: '🤖' },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, lastScrollY]);

  if (!isMobile) return null;

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showNav ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-[#0E3B36] border-t border-[rgba(255,255,255,0.1)] px-2 py-2 safe-area-bottom">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#C49A6C]/20 text-[#C49A6C]'
                    : 'text-[#D8CCBC]/60 hover:text-[#D8CCBC]'
                }`}
              >
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className={`text-xs font-medium ${isActive ? 'text-[#C49A6C]' : ''}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
