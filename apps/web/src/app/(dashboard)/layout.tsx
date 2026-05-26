'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getUserInitials } from '@/hooks/useAuth';
import MobileNav from '@/components/MobileNav';
import MobileHeader from '@/components/MobileHeader';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'RFQs', href: '/rfqs', icon: '📋' },
  { name: 'Documents', href: '/documents', icon: '📄' },
  { name: 'Marketplace', href: '/marketplace', icon: '🌐' },
  { name: 'Compliance', href: '/compliance', icon: '✅' },
  { name: 'Freight', href: '/freight', icon: '🚢' },
  { name: 'Consultations', href: '/consultations', icon: '💬' },
  { name: 'Messaging', href: '/messages', icon: '✉️' },
  { name: 'AI Assistant', href: '/ai', icon: '🤖' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
  { name: 'Billing', href: '/billing', icon: '💳' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#081512] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  const initials = getUserInitials(user);

  // Mobile: Show MobileHeader only
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#081512]">
        <MobileHeader />
        <main className="pt-28 pb-24 px-4">
          {children}
        </main>
        <MobileNav />
      </div>
    );
  }

  // Desktop: Show sidebar
  return (
    <div className="min-h-screen bg-[#081512] flex">
      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - 280px width, #0E3B36 background */}
      <aside className={`fixed top-0 left-0 h-full bg-[#0E3B36] border-r border-[rgba(255,255,255,0.05)] flex flex-col z-50 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } w-[280px] hidden lg:flex`}>

        {/* Logo */}
        <div className="p-6 border-b border-[rgba(255,255,255,0.05)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C49A6C] to-[#D4AA82] flex items-center justify-center shadow-lg shadow-[#C49A6C]/20">
              <span className="text-[#081512] font-bold text-xl brand-font">L</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#C49A6C] text-xl font-bold brand-font leading-none">LEVERAGE</span>
              <span className="text-[#D8CCBC]/60 text-xs leading-none">Connecting Dots to Ports</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 transition-all ${
                  isActive
                    ? 'bg-[rgba(255,255,255,0.08)] text-[#F4F1EA] border-r-2 border-[#C49A6C]'
                    : 'text-[#D8CCBC]/70 hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F4F1EA]'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.03)]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C49A6C] to-[#D4AA82] flex items-center justify-center text-[#081512] font-semibold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#F4F1EA] font-medium truncate">{user?.firstName || 'User'}</p>
              <p className="text-[#D8CCBC]/50 text-sm truncate">{user?.email || ''}</p>
            </div>
            <button onClick={handleLogout} className="text-[#D8CCBC]/50 hover:text-red-400 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[280px]">
        {/* Header - 80px height */}
        <header className="h-[80px] bg-[#0E3B36]/50 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-[#D8CCBC]/70 hover:text-[#F4F1EA] transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="w-80 h-10 pl-10 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/50 focus:outline-none focus:border-[#C49A6C]"
              />
              <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-[#D8CCBC]/70 hover:text-[#F4F1EA] transition-colors hidden sm:block">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C49A6C] rounded-full"></span>
            </button>

            {/* AI Quick Action */}
            <Link href="/ai" className="px-4 py-2 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors flex items-center gap-2">
              <span>🤖</span>
              <span>AI</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
