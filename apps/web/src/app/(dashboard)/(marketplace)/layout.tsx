'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DashboardSidebar, { MobileDashboardSidebar } from '@/components/DashboardSidebar';
import { Search, Bell, Plus, Menu, Home, LayoutGrid } from 'lucide-react';

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#E6E2DA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#154230] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-black/5">
        {/* Logo & Section Indicator */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-black/5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
          </Link>
        </div>

        {/* Section Badge */}
        <div className="px-4 py-3">
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#154230]/10 text-[#154230] text-sm font-medium rounded-lg hover:bg-[#154230]/20 transition-colors">
            <Home className="w-4 h-4" />
            Back to Portal
          </Link>
        </div>

        <DashboardSidebar section="marketplace" />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-black/5">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#154230] flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#154230] font-bold text-sm">Marketplace</span>
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <Link href="/marketplace" className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <Search className="w-4 h-4" />
              </Link>
              <Link href="/marketplace/inbox" className="relative p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <Bell className="w-4 h-4" />
              </Link>
              <Link href="/rfqs/new" className="flex items-center gap-1 px-2.5 py-1.5 bg-[#154230] hover:bg-[#1d5240] text-white rounded-lg transition-colors">
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              </Link>
              <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Sidebar */}
      <MobileDashboardSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        section="marketplace"
      />

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="min-h-screen pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}