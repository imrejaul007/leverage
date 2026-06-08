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
      <div className="min-h-screen bg-[#E6E2DA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#154230] border-t-transparent"></div>
      </div>
    );
  }

  const initials = getUserInitials(user);

  // Mobile: Show MobileHeader with hamburger + bottom nav
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#E6E2DA]">
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
    <div className="min-h-screen bg-[#E6E2DA] flex">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-black/5 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-5 border-b border-black/5">
          <Link href="/dashboard">
            <Image src="/logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain" />
          </Link>
        </div>

        {/* Post RFQ Button */}
        <div className="p-4 border-b border-black/5">
          <Link
            href="/rfqs/new"
            className="flex items-center justify-center gap-2 w-full h-11 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors"
          >
            <Plus className="w-4 h-4" />
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
                className={`flex items-center gap-3 px-4 py-2.5 mx-3 rounded-lg transition-all text-sm ${
                  isActive
                    ? 'bg-[#154230] text-white font-medium'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA] hover:text-[#101111]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#E6E2DA]">
            <div className="w-10 h-10 rounded-lg bg-[#154230] flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#101111] font-medium text-sm truncate">{user?.firstName || 'User'}</p>
              <p className="text-[#4A4A4A] text-xs truncate">{user?.email || ''}</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-[#4A4A4A] hover:text-[#5D1E21] hover:bg-white rounded-lg transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-[260px]">
        {/* Top Header */}
        <header className="h-[72px] bg-white/90 backdrop-blur-xl border-b border-black/5 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, suppliers, HS codes..."
                className="w-96 h-11 pl-12 pr-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] focus:ring-2 focus:ring-[#A6824A]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E6E2DA] rounded-full">
              <span className="w-2 h-2 bg-[#154230] rounded-full animate-pulse"></span>
              <span className="text-[#154230] text-xs font-medium">Live</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2.5 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5D1E21] rounded-full"></span>
            </button>

            {/* AI Button */}
            <Link href="/ai" className="flex items-center gap-2 px-4 py-2 bg-[#A6824A] text-white font-semibold rounded-lg hover:bg-[#b89560] transition-colors">
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
