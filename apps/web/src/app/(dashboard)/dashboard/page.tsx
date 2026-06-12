'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Package,
  FileText,
  Truck,
  DollarSign,
  MessageSquare,
  Clock,
  ArrowRight,
  Search,
  Plus,
  BarChart3,
  Shield,
  Briefcase,
  Home,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  Calendar,
  ShoppingBag,
  Megaphone,
  LayoutGrid,
  X,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('leverage_user');
    router.push('/login');
  };

  const stats = {
    activeRFQs: 127,
    orders: 48,
    documents: 156,
    shipments: 23,
    unreadMessages: 5,
    complianceScore: 92,
    tradeVolume: 18.5,
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E6E2DA]">
        <div className="rounded-full h-10 w-10 border-2 border-[#154230] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Header */}
      <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-bold text-2xl">Dashboard</h2>
            <p className="text-white/70 text-sm mt-1">Welcome back! Choose a section to get started</p>
          </div>
          <button className="relative p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors">
            <Bell className="w-6 h-6" />
            {stats.unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5D1E21] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{stats.unreadMessages}</span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-white">
                <Bell className="w-5 h-5" />
                {stats.unreadMessages > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#5D1E21] rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">{stats.unreadMessages}</span>
                  </span>
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Welcome back!</h2>
            <p className="text-white/70 text-sm">Choose a section to get started</p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative w-72 bg-white h-full flex flex-col shadow-xl ml-auto">
            <div className="flex items-center justify-between p-6 border-b border-black/5">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-[#E6E2DA] rounded-lg">
                <X className="w-5 h-5 text-[#4A4A4A]" />
              </button>
            </div>
            <div className="p-4 border-t border-black/5">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JD</span>
                </div>
                <div className="flex-1">
                  <p className="text-[#101111] font-semibold text-sm">John Doe</p>
                  <p className="text-[#4A4A4A] text-xs">john@company.com</p>
                </div>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-[#4A4A4A] hover:bg-[#E6E2DA] rounded-lg mt-2">
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="min-h-screen pb-24 lg:pb-8">
        {/* Mobile Content */}
        <div className="lg:hidden px-4 -mt-6 space-y-5 pb-24">
          {/* Marketplace Section Card */}
          <Link href="/marketplace" className="block bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#154230] flex items-center justify-center shadow-lg">
                <LayoutGrid className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#101111] font-bold text-lg">Marketplace</h3>
                <p className="text-[#4A4A4A] text-sm">Browse products, manage RFQs & orders</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#A6824A]" />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-black/5">
              <Link href="/marketplace" className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
                  <Search className="w-4 h-4 text-[#154230]" />
                </div>
                <span className="text-[10px] text-[#4A4A4A] font-medium">Browse</span>
              </Link>
              <Link href="/rfqs" className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#154230]" />
                </div>
                <span className="text-[10px] text-[#4A4A4A] font-medium">RFQs</span>
              </Link>
              <Link href="/orders" className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-[#154230]" />
                </div>
                <span className="text-[10px] text-[#4A4A4A] font-medium">Orders</span>
              </Link>
              <Link href="/products" className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-[#154230]" />
                </div>
                <span className="text-[10px] text-[#4A4A4A] font-medium">Products</span>
              </Link>
            </div>
          </Link>

          {/* Operations Section Card */}
          <Link href="/documents" className="block bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#A6824A] flex items-center justify-center shadow-lg">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#101111] font-bold text-lg">Operations</h3>
                <p className="text-[#4A4A4A] text-sm">Documents, compliance & logistics</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#A6824A]" />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-black/5">
              <Link href="/documents" className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center">
                  <Package className="w-4 h-4 text-[#A6824A]" />
                </div>
                <span className="text-[10px] text-[#4A4A4A] font-medium">Docs</span>
              </Link>
              <Link href="/freight" className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-[#A6824A]" />
                </div>
                <span className="text-[10px] text-[#4A4A4A] font-medium">Freight</span>
              </Link>
              <Link href="/compliance" className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#A6824A]" />
                </div>
                <span className="text-[10px] text-[#4A4A4A] font-medium">Compliance</span>
              </Link>
              <Link href="/ai" className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-[#A6824A]" />
                </div>
                <span className="text-[10px] text-[#4A4A4A] font-medium">AI</span>
              </Link>
            </div>
          </Link>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-[#101111] font-bold text-base mb-4">Your Stats</h3>
            <div className="grid grid-cols-4 gap-3">
              <Link href="/rfqs" className="text-center">
                <p className="text-2xl font-bold text-[#154230]">{stats.activeRFQs}</p>
                <p className="text-[#4A4A4A] text-xs font-medium mt-1">Active RFQs</p>
              </Link>
              <Link href="/orders" className="text-center">
                <p className="text-2xl font-bold text-[#154230]">{stats.shipments}</p>
                <p className="text-[#4A4A4A] text-xs font-medium mt-1">In Transit</p>
              </Link>
              <Link href="/orders" className="text-center">
                <p className="text-2xl font-bold text-[#5D1E21]">{stats.orders}</p>
                <p className="text-[#4A4A4A] text-xs font-medium mt-1">Total Orders</p>
              </Link>
              <Link href="/messages" className="text-center relative">
                <p className="text-2xl font-bold text-[#5D1E21]">{stats.unreadMessages}</p>
                <p className="text-[#4A4A4A] text-xs font-medium mt-1">Messages</p>
                {stats.unreadMessages > 0 && (
                  <span className="absolute top-0 right-2 w-4 h-4 bg-[#A6824A] rounded-full"></span>
                )}
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-[#101111] font-bold text-base mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-3">
              <Link href="/rfqs/new" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Post RFQ</span>
              </Link>
              <Link href="/products/new" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#A6824A] flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Add Product</span>
              </Link>
              <Link href="/network" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Network</span>
              </Link>
              <Link href="/analytics" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Analytics</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="hidden lg:block px-8 py-8 space-y-6">
          {/* Section Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Marketplace Card */}
            <Link href="/marketplace" className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border-2 border-transparent hover:border-[#154230]">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#154230] flex items-center justify-center shadow-lg">
                  <LayoutGrid className="w-8 h-8 text-white" />
                </div>
                <ArrowRight className="w-6 h-6 text-[#A6824A] group-hover:translate-x-2 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-[#101111] mb-2">Marketplace</h3>
              <p className="text-[#4A4A4A] mb-6">Browse products, manage RFQs, track orders, and grow your network</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-[#154230]/10 text-[#154230] text-sm font-medium rounded-lg">Browse Products</span>
                <span className="px-3 py-1.5 bg-[#154230]/10 text-[#154230] text-sm font-medium rounded-lg">RFQs</span>
                <span className="px-3 py-1.5 bg-[#154230]/10 text-[#154230] text-sm font-medium rounded-lg">Orders</span>
                <span className="px-3 py-1.5 bg-[#154230]/10 text-[#154230] text-sm font-medium rounded-lg">Network</span>
              </div>
            </Link>

            {/* Operations Card */}
            <Link href="/documents" className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border-2 border-transparent hover:border-[#A6824A]">
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#A6824A] flex items-center justify-center shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <ArrowRight className="w-6 h-6 text-[#A6824A] group-hover:translate-x-2 transition-transform" />
              </div>
              <h3 className="text-2xl font-bold text-[#101111] mb-2">Operations</h3>
              <p className="text-[#4A4A4A] mb-6">Manage documents, compliance, freight, and business analytics</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-[#A6824A]/10 text-[#A6824A] text-sm font-medium rounded-lg">Documents</span>
                <span className="px-3 py-1.5 bg-[#A6824A]/10 text-[#A6824A] text-sm font-medium rounded-lg">Freight</span>
                <span className="px-3 py-1.5 bg-[#A6824A]/10 text-[#A6824A] text-sm font-medium rounded-lg">Compliance</span>
                <span className="px-3 py-1.5 bg-[#A6824A]/10 text-[#A6824A] text-sm font-medium rounded-lg">AI</span>
              </div>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-6">
            <Link href="/rfqs" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-[#154230]">{stats.activeRFQs}</p>
              <p className="text-[#4A4A4A] text-sm font-medium mt-2">Active RFQs</p>
            </Link>
            <Link href="/orders" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-[#154230]">{stats.shipments}</p>
              <p className="text-[#4A4A4A] text-sm font-medium mt-2">In Transit</p>
            </Link>
            <Link href="/orders" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-3xl font-bold text-[#5D1E21]">{stats.orders}</p>
              <p className="text-[#4A4A4A] text-sm font-medium mt-2">Total Orders</p>
            </Link>
            <Link href="/messages" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
              <p className="text-3xl font-bold text-[#5D1E21]">{stats.unreadMessages}</p>
              <p className="text-[#4A4A4A] text-sm font-medium mt-2">Messages</p>
              {stats.unreadMessages > 0 && (
                <span className="absolute top-6 right-6 w-5 h-5 bg-[#A6824A] rounded-full"></span>
              )}
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-[#101111] font-bold text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-6 gap-4">
              <Link href="/rfqs/new" className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#154230] flex items-center justify-center hover:bg-[#1a5a3a] transition-colors">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#4A4A4A] text-sm font-medium">Post RFQ</span>
              </Link>
              <Link href="/products/new" className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#A6824A] flex items-center justify-center hover:bg-[#8a6a3a] transition-colors">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#4A4A4A] text-sm font-medium">Add Product</span>
              </Link>
              <Link href="/marketplace" className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                  <Search className="w-6 h-6 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-sm font-medium">Browse</span>
              </Link>
              <Link href="/network" className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                  <User className="w-6 h-6 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-sm font-medium">Network</span>
              </Link>
              <Link href="/analytics" className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                  <TrendingUp className="w-6 h-6 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-sm font-medium">Analytics</span>
              </Link>
              <Link href="/billing" className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                  <DollarSign className="w-6 h-6 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-sm font-medium">Billing</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="home" />
    </div>
  );
}