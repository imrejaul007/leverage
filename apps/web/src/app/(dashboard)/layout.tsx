'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getUserInitials } from '@/hooks/useAuth';
import MobileNav from '@/components/MobileNav';
import MobileHeader from '@/components/MobileHeader';
import {
  LayoutDashboard,
  ShoppingCart,
  Mail,
  FileText,
  Package,
  MessageSquare,
  Truck,
  Shield,
  Bot,
  BarChart3,
  CreditCard,
  Settings,
  Search,
  Bell,
  LogOut,
  ChevronRight,
  Users,
  Plus,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Browse Products', href: '/marketplace', icon: ShoppingCart },
  { name: 'My Messages', href: '/marketplace/inbox', icon: Mail },
  { name: 'My RFQs', href: '/rfqs', icon: FileText },
  { name: 'Orders', href: '/orders', icon: Package },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'Network', href: '/network', icon: Users },
  { name: 'AI Assistant', href: '/ai', icon: Bot },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  const initials = getUserInitials(user);

  // Mobile: Show MobileHeader with hamburger + bottom nav
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0A1628]">
        <MobileHeader />
        <main className="pt-32 pb-24 px-4">
          {children}
        </main>
        <MobileNav />
      </div>
    );
  }

  // Desktop: Always show sidebar
  return (
    <div className="min-h-screen bg-[#0A1628] flex">
      {/* Sidebar */}
      <aside className="w-[280px] bg-[#0F172A] border-r border-[#1E293B] flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-5 border-b border-[#1E293B]">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V8l9-5 9 5v13M3 8l9 5 9-5M9 21V12h6v9" />
              </svg>
            </div>
            <div>
              <span className="text-white text-xl font-bold brand-font">LEVERAGE</span>
              <p className="text-[#64748B] text-xs">Global Trade Platform</p>
            </div>
          </Link>
        </div>

        {/* Post RFQ Button */}
        <div className="p-4 border-b border-[#1E293B]">
          <Link
            href="/rfqs/new"
            className="flex items-center justify-center gap-2 w-full h-12 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20"
          >
            <Plus className="w-5 h-5" />
            Post New RFQ
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3 mx-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#F97316]/15 text-[#F97316] border-l-2 border-[#F97316]'
                    : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#F97316]' : ''}`} />
                <span className="font-medium text-sm">{item.name}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#1E293B]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1E293B]">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{user?.firstName || 'User'}</p>
              <p className="text-[#64748B] text-xs truncate">{user?.email || ''}</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-[#64748B] hover:text-red-400 hover:bg-[#334155] rounded-lg transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-[280px]">
        {/* Top Header */}
        <header className="h-[72px] bg-[#0F172A]/80 backdrop-blur-xl border-b border-[#1E293B] flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-[#64748B] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, suppliers, HS codes..."
                className="w-96 h-11 pl-12 pr-4 bg-[#1E293B] border border-[#334155] rounded-xl text-white placeholder-[#64748B] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E293B] rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[#94A3B8] text-xs font-medium">Live</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* AI Button */}
            <Link href="/ai" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20">
              <Bot className="w-5 h-5" />
              <span className="text-sm">AI Assistant</span>
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