'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  X,
  Calendar,
  ShoppingBag,
  Megaphone,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import Sidebar, { MobileSidebar } from '@/components/Sidebar';


export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = {
    activeRFQs: 127,
    orders: 48,
    documents: 156,
    shipments: 23,
    revenue: 24500000,
    unreadMessages: 5,
    complianceScore: 92,
    tradeVolume: 18.5,
  };

  const recentActivity = [
    { id: '1', type: 'quote', text: 'Quote received - 500 tons Steel Coils', time: '5 min ago', status: 'unread', link: '/marketplace/inbox' },
    { id: '2', type: 'rfq', text: 'New RFQ from Germany - Machinery Parts', time: '12 min ago', status: 'pending', link: '/rfqs' },
    { id: '3', type: 'payment', text: 'Payment received - $125,000 USD', time: '1 hour ago', status: 'completed', link: '/billing' },
    { id: '4', type: 'document', text: 'Bill of Lading verified', time: '2 hours ago', status: 'completed', link: '/documents' },
    { id: '5', type: 'order', text: 'Order shipped - Electronics Components', time: '3 hours ago', status: 'shipped', link: '/orders' },
  ];

  const activityConfig: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
    quote: { icon: <FileText className="w-4 h-4" />, bg: 'bg-[#154230]/10', color: 'text-[#154230]' },
    rfq: { icon: <Plus className="w-4 h-4" />, bg: 'bg-[#154230]/10', color: 'text-[#154230]' },
    payment: { icon: <DollarSign className="w-4 h-4" />, bg: 'bg-[#154230]/10', color: 'text-[#154230]' },
    document: { icon: <Shield className="w-4 h-4" />, bg: 'bg-[#E6E2DA]', color: 'text-[#4A4A4A]' },
    order: { icon: <Truck className="w-4 h-4" />, bg: 'bg-[#E6E2DA]', color: 'text-[#4A4A4A]' },
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
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>

        {/* Navigation */}
        <Sidebar onClose={() => setSidebarOpen(false)} />

        {/* User Profile */}
        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Overlay - Visible only on mobile */}
      <div className="lg:hidden">
        {/* Green Gradient Header */}
        <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-white">
                <Bell className="w-5 h-5" />
                {stats.unreadMessages > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#5D1E21] rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">{stats.unreadMessages}</span>
                  </span>
                )}
              </button>
              <button onClick={() => setSidebarOpen(true)} className="p-2 text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Welcome back!</h2>
            <p className="text-white/70 text-sm">Track your shipments and RFQs</p>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pb-24 lg:pb-8">
        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-bold text-2xl">Dashboard</h2>
              <p className="text-white/70 text-sm mt-1">Welcome back! Track your shipments and RFQs</p>
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

        {/* Mobile Content Area */}
        <div className="lg:hidden px-4 -mt-6 space-y-5 pb-24">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-[#101111] font-bold text-base mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 lg:grid-cols-6 gap-3">
              <Link href="/marketplace" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <Search className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Browse</span>
              </Link>

              <Link href="/rfqs/new" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Post RFQ</span>
              </Link>

              <Link href="/consultations" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Consult</span>
              </Link>

              <Link href="/orders" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Orders</span>
              </Link>

              <Link href="/products" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Products</span>
              </Link>

              <Link href="/freight" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Freight</span>
              </Link>

              <Link href="/documents" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Documents</span>
              </Link>

              <Link href="/compliance" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Compliance</span>
              </Link>

              <Link href="/ai" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">AI</span>
              </Link>

              <Link href="/billing" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Billing</span>
              </Link>

              <Link href="/ads" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Ads</span>
              </Link>

              <Link href="/analytics" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Analytics</span>
              </Link>

              <Link href="/network" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Network</span>
              </Link>

              <Link href="/messages" className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">Messages</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-black/5 flex items-center justify-between">
              <h3 className="text-[#101111] font-bold text-base">Recent Activity</h3>
              <Link href="/marketplace/inbox" className="text-[#154230] text-sm font-semibold flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="divide-y divide-black/5">
              {recentActivity.map((activity) => (
                <Link
                  key={activity.id}
                  href={activity.link}
                  className="flex items-center gap-3 p-4 hover:bg-[#E6E2DA]/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl ${activityConfig[activity.type]?.bg} flex items-center justify-center ${activityConfig[activity.type]?.color}`}>
                    {activityConfig[activity.type]?.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${activity.status === 'unread' ? 'text-[#101111] font-semibold' : 'text-[#4A4A4A] font-medium'}`}>
                      {activity.text}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3 text-[#4A4A4A]/50" />
                      <span className="text-[#4A4A4A] text-xs font-medium">{activity.time}</span>
                    </div>
                  </div>
                  {activity.status === 'unread' && (
                    <div className="w-1.5 h-1.5 bg-[#5D1E21] rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Global Marketplace CTA */}
          <Link href="/marketplace" className="block bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[#101111] font-bold text-base">Global Marketplace</h3>
                  <p className="text-[#4A4A4A] text-sm font-medium">500+ verified suppliers</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#A6824A]" />
            </div>
          </Link>

          {/* Mobile Burgundy Stats Bar */}
          <div className="bg-[#5D1E21] rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-medium">Compliance</p>
                  <p className="text-white font-bold text-lg">{stats.complianceScore}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-medium">Trade Volume</p>
                  <p className="text-white font-bold text-lg">${stats.tradeVolume}M</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section - at bottom, after burgundy bar */}
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

              <Link href="/marketplace/inbox" className="text-center relative">
                <p className="text-2xl font-bold text-[#5D1E21]">{stats.unreadMessages}</p>
                <p className="text-[#4A4A4A] text-xs font-medium mt-1">Messages</p>
                {stats.unreadMessages > 0 && (
                  <span className="absolute top-0 right-2 w-4 h-4 bg-[#A6824A] rounded-full"></span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Content Area */}
        <div className="hidden lg:block px-8 py-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6">
            <Link href="/rfqs" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#101111]">{stats.activeRFQs}</p>
              <p className="text-[#4A4A4A] text-sm font-medium mt-2">Active RFQs</p>
            </Link>

            <Link href="/orders" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#101111]">{stats.shipments}</p>
              <p className="text-[#4A4A4A] text-sm font-medium mt-2">In Transit</p>
            </Link>

            <Link href="/orders" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#5D1E21] flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#101111]">{stats.orders}</p>
              <p className="text-[#4A4A4A] text-sm font-medium mt-2">Total Orders</p>
            </Link>

            <Link href="/marketplace/inbox" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 rounded-xl bg-[#5D1E21] flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-[#101111]">{stats.unreadMessages}</p>
              <p className="text-[#4A4A4A] text-sm font-medium mt-2">Messages</p>
              {stats.unreadMessages > 0 && (
                <span className="absolute top-6 right-6 w-5 h-5 bg-[#A6824A] rounded-full"></span>
              )}
            </Link>
          </div>

          {/* Quick Actions & Stats Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-[#101111] font-bold text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-3 gap-4">
                <Link href="/marketplace" className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                    <Search className="w-6 h-6 text-[#154230]" />
                  </div>
                  <span className="text-[#4A4A4A] text-sm font-medium">Browse</span>
                </Link>

                <Link href="/rfqs/new" className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#154230] flex items-center justify-center hover:bg-[#1a5a3a] transition-colors">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[#4A4A4A] text-sm font-medium">Post RFQ</span>
                </Link>

                <Link href="/compliance" className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                    <Shield className="w-6 h-6 text-[#154230]" />
                  </div>
                  <span className="text-[#4A4A4A] text-sm font-medium">Compliance</span>
                </Link>

                <Link href="/ai" className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                    <BarChart3 className="w-6 h-6 text-[#154230]" />
                  </div>
                  <span className="text-[#4A4A4A] text-sm font-medium">AI</span>
                </Link>

                <Link href="/orders" className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                    <Truck className="w-6 h-6 text-[#154230]" />
                  </div>
                  <span className="text-[#4A4A4A] text-sm font-medium">Orders</span>
                </Link>

                <Link href="/documents" className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                    <Package className="w-6 h-6 text-[#154230]" />
                  </div>
                  <span className="text-[#4A4A4A] text-sm font-medium">Documents</span>
                </Link>

                <Link href="/freight" className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                    <Truck className="w-6 h-6 text-[#154230]" />
                  </div>
                  <span className="text-[#4A4A4A] text-sm font-medium">Freight</span>
                </Link>

                <Link href="/network" className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                    <User className="w-6 h-6 text-[#154230]" />
                  </div>
                  <span className="text-[#4A4A4A] text-sm font-medium">Network</span>
                </Link>

                <Link href="/messages" className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-[#154230]/10 flex items-center justify-center hover:bg-[#154230]/20 transition-colors">
                    <MessageSquare className="w-6 h-6 text-[#154230]" />
                  </div>
                  <span className="text-[#4A4A4A] text-sm font-medium">Messages</span>
                </Link>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="xl:col-span-2 bg-[#5D1E21] rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6 h-full">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Compliance Score</p>
                    <p className="text-white font-bold text-2xl">{stats.complianceScore}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">Trade Volume</p>
                    <p className="text-white font-bold text-2xl">${stats.tradeVolume}M</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity & Marketplace */}
          <div className="grid grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="col-span-2 bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-black/5 flex items-center justify-between">
                <h3 className="text-[#101111] font-bold text-lg">Recent Activity</h3>
                <Link href="/marketplace/inbox" className="text-[#154230] text-sm font-semibold flex items-center gap-1 hover:underline">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="divide-y divide-black/5">
                {recentActivity.map((activity) => (
                  <Link
                    key={activity.id}
                    href={activity.link}
                    className="flex items-center gap-4 p-4 hover:bg-[#E6E2DA]/50 transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-xl ${activityConfig[activity.type]?.bg} flex items-center justify-center ${activityConfig[activity.type]?.color}`}>
                      {activityConfig[activity.type]?.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${activity.status === 'unread' ? 'text-[#101111] font-semibold' : 'text-[#4A4A4A] font-medium'}`}>
                        {activity.text}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Clock className="w-4 h-4 text-[#4A4A4A]/50" />
                        <span className="text-[#4A4A4A] text-xs font-medium">{activity.time}</span>
                      </div>
                    </div>
                    {activity.status === 'unread' && (
                      <div className="w-2 h-2 bg-[#5D1E21] rounded-full"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Global Marketplace CTA */}
            <Link href="/marketplace" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#154230] flex items-center justify-center mb-4 mx-auto">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#101111] font-bold text-lg text-center mb-2">Global Marketplace</h3>
              <p className="text-[#4A4A4A] text-sm font-medium text-center mb-4">500+ verified suppliers</p>
              <div className="flex items-center justify-center gap-2 text-[#154230] font-semibold">
                Browse Now <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="home" />
    </div>
  );
}
