'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  CheckCircle,
  AlertCircle,
  Home,
  User,
  Bell,
} from 'lucide-react';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

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
        <div className="rounded-full h-10 w-10 border-2 border-[#154230] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      {/* Green Gradient Header */}
      <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-5 pt-8 pb-6">
        {/* Header Content */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-white font-bold text-2xl tracking-wide">LEVERAGE</h1>
            <p className="text-white/70 text-xs mt-1 font-medium tracking-wider">CONNECTING DOTS TO PORTS</p>
          </div>
          <button className="relative p-2">
            <Bell className="w-6 h-6 text-white" />
            {stats.unreadMessages > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#5D1E21] rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{stats.unreadMessages}</span>
              </span>
            )}
          </button>
        </div>

        {/* Welcome Message */}
        <div>
          <h2 className="text-white font-semibold text-lg">Welcome back!</h2>
          <p className="text-white/70 text-sm font-medium">Track your shipments and RFQs</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 -mt-4 space-y-5">
        {/* Quick Stats Grid - 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/rfqs" className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#154230] flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-[#101111]">{stats.activeRFQs}</p>
            <p className="text-[#4A4A4A] text-sm font-semibold mt-1">Active RFQs</p>
          </Link>

          <Link href="/orders" className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#154230] flex items-center justify-center mb-3">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-[#101111]">{stats.shipments}</p>
            <p className="text-[#4A4A4A] text-sm font-semibold mt-1">In Transit</p>
          </Link>

          <Link href="/orders" className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#5D1E21] flex items-center justify-center mb-3">
              <Package className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-[#101111]">{stats.orders}</p>
            <p className="text-[#4A4A4A] text-sm font-semibold mt-1">Total Orders</p>
          </Link>

          <Link href="/marketplace/inbox" className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-10 h-10 rounded-xl bg-[#5D1E21] flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-[#101111]">{stats.unreadMessages}</p>
            <p className="text-[#4A4A4A] text-sm font-semibold mt-1">Messages</p>
            {stats.unreadMessages > 0 && (
              <span className="absolute top-4 right-4 w-4 h-4 bg-[#A6824A] rounded-full"></span>
            )}
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold text-base mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-3">
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

            <Link href="/documents" className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#154230]" />
              </div>
              <span className="text-[#4A4A4A] text-xs font-medium">Documents</span>
            </Link>

            <Link href="/ai" className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#154230]" />
              </div>
              <span className="text-[#4A4A4A] text-xs font-medium">AI Assist</span>
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
      </div>

      {/* Burgundy Bottom Stats Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-[#5D1E21] px-5 py-4">
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 px-4 py-2">
        <div className="flex items-center justify-around">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 py-2 px-4">
            <div className="w-10 h-10 rounded-xl bg-[#154230] flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-[#154230] text-xs font-semibold">Home</span>
          </Link>

          <Link href="/marketplace" className="flex flex-col items-center gap-1 py-2 px-4">
            <div className="w-10 h-10 rounded-xl bg-[#E6E2DA] flex items-center justify-center">
              <Search className="w-5 h-5 text-[#4A4A4A]" />
            </div>
            <span className="text-[#4A4A4A] text-xs font-medium">Browse</span>
          </Link>

          <Link href="/rfqs/new" className="flex flex-col items-center gap-1 py-2 px-4 -mt-4">
            <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#4A4A4A] text-xs font-medium mt-1">Post RFQ</span>
          </Link>

          <Link href="/marketplace/inbox" className="flex flex-col items-center gap-1 py-2 px-4 relative">
            <div className="w-10 h-10 rounded-xl bg-[#E6E2DA] flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-[#4A4A4A]" />
            </div>
            {stats.unreadMessages > 0 && (
              <span className="absolute top-1 right-2 w-4 h-4 bg-[#5D1E21] rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{stats.unreadMessages}</span>
              </span>
            )}
            <span className="text-[#4A4A4A] text-xs font-medium">Inbox</span>
          </Link>

          <Link href="/account" className="flex flex-col items-center gap-1 py-2 px-4">
            <div className="w-10 h-10 rounded-xl bg-[#E6E2DA] flex items-center justify-center">
              <User className="w-5 h-5 text-[#4A4A4A]" />
            </div>
            <span className="text-[#4A4A4A] text-xs font-medium">Account</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
