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
  Bell,
  BarChart3,
  Shield,
  Users,
  ShoppingCart,
  Briefcase,
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
  };

  const recentActivity = [
    { id: '1', type: 'quote', text: 'Quote received - 500 tons Steel Coils', time: '5 min ago', status: 'unread', link: '/marketplace/inbox' },
    { id: '2', type: 'rfq', text: 'New RFQ from Germany - Machinery Parts', time: '12 min ago', status: 'pending', link: '/rfqs' },
    { id: '3', type: 'payment', text: 'Payment received - $125,000 USD', time: '1 hour ago', status: 'completed', link: '/billing' },
    { id: '4', type: 'document', text: 'Bill of Lading verified', time: '2 hours ago', status: 'completed', link: '/documents' },
    { id: '5', type: 'order', text: 'Order shipped - Electronics Components', time: '3 hours ago', status: 'shipped', link: '/orders' },
  ];

  const activityConfig: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
    quote: { icon: <FileText className="w-5 h-5" />, bg: 'bg-[#C49A6C]/20', color: 'text-[#C49A6C]' },
    rfq: { icon: <Plus className="w-5 h-5" />, bg: 'bg-blue-500/20', color: 'text-blue-400' },
    payment: { icon: <DollarSign className="w-5 h-5" />, bg: 'bg-emerald-500/20', color: 'text-emerald-400' },
    document: { icon: <Shield className="w-5 h-5" />, bg: 'bg-purple-500/20', color: 'text-purple-400' },
    order: { icon: <Truck className="w-5 h-5" />, bg: 'bg-cyan-500/20', color: 'text-cyan-400' },
  };

  const quickStats = [
    { label: 'Active RFQs', value: stats.activeRFQs, icon: <FileText className="w-5 h-5" />, color: 'accent' },
    { label: 'In Transit', value: stats.shipments, icon: <Truck className="w-5 h-5" />, color: 'blue' },
    { label: 'Total Orders', value: stats.orders, icon: <Package className="w-5 h-5" />, color: 'green' },
    { label: 'Messages', value: stats.unreadMessages, icon: <MessageSquare className="w-5 h-5" />, color: 'purple' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Trade Stats Grid - Mobile optimized 2x2 */}
      <div className="grid grid-cols-2 gap-3">
        {quickStats.map((stat) => (
          <div key={stat.label} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                stat.color === 'accent' ? 'bg-[#C49A6C]/20 text-[#C49A6C]' :
                stat.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                stat.color === 'green' ? 'bg-emerald-500/20 text-emerald-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {stat.icon}
              </span>
              {stat.label === 'Messages' && stat.value > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {stat.value}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-[#F4F1EA]">{stat.value}</p>
            <p className="text-[#D8CCBC] text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Card */}
      <div className="bg-gradient-to-br from-[#C49A6C]/20 to-[#D4AA82]/10 border border-[#C49A6C]/30 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[#D8CCBC] text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-[#F4F1EA] mt-1">
              ${(stats.revenue / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#C49A6C]/20 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-[#C49A6C]" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          +12.5% from last month
        </div>
      </div>

      {/* Quick Actions - Trade focused grid */}
      <div className="grid grid-cols-4 gap-2">
        <Link href="/marketplace" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-[#C49A6C]/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Search className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-[#D8CCBC] text-xs font-medium text-center">Browse</span>
        </Link>

        <Link href="/rfqs/new" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-[#C49A6C]/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#C49A6C]/20 flex items-center justify-center">
            <Plus className="w-6 h-6 text-[#C49A6C]" />
          </div>
          <span className="text-[#D8CCBC] text-xs font-medium text-center">Post RFQ</span>
        </Link>

        <Link href="/marketplace/inbox" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-[#C49A6C]/50 transition-colors relative">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-purple-400" />
          </div>
          <span className="text-[#D8CCBC] text-xs font-medium text-center">Inbox</span>
          {stats.unreadMessages > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {stats.unreadMessages}
            </span>
          )}
        </Link>

        <Link href="/orders" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] hover:border-[#C49A6C]/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <Truck className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-[#D8CCBC] text-xs font-medium text-center">Orders</span>
        </Link>
      </div>

      {/* Recent Activity - Trade Updates */}
      <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[rgba(255,255,255,0.05)] flex items-center justify-between">
          <div>
            <h2 className="text-[#F4F1EA] font-semibold">Trade Updates</h2>
            <p className="text-[#D8CCBC]/60 text-xs">Recent activity on your trades</p>
          </div>
          <Link href="/marketplace/inbox" className="text-[#C49A6C] text-sm font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-[rgba(255,255,255,0.05)]">
          {recentActivity.map((activity) => (
            <Link
              key={activity.id}
              href={activity.link}
              className="flex items-center gap-4 p-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${activityConfig[activity.type]?.bg} flex items-center justify-center flex-shrink-0 ${activityConfig[activity.type]?.color}`}>
                {activityConfig[activity.type]?.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${activity.status === 'unread' ? 'text-[#F4F1EA] font-medium' : 'text-[#D8CCBC]'}`}>
                  {activity.text}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-[#D8CCBC]" />
                  <span className="text-[#D8CCBC] text-xs">{activity.time}</span>
                </div>
              </div>
              {activity.status === 'unread' && (
                <div className="w-2 h-2 bg-[#C49A6C] rounded-full flex-shrink-0"></div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Marketplace CTA */}
      <Link href="/marketplace" className="block bg-gradient-to-r from-[#C49A6C]/10 to-[#D4AA82]/10 border border-[#C49A6C]/20 rounded-2xl p-5 hover:border-[#C49A6C]/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C49A6C] to-[#D4AA82] flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-[#081512]" />
            </div>
            <div>
              <h3 className="text-[#F4F1EA] font-semibold text-lg">Global Marketplace</h3>
              <p className="text-[#D8CCBC] text-sm">500+ verified suppliers worldwide</p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-[#C49A6C]" />
        </div>
      </Link>

      {/* Trade Documents Quick Stats */}
      <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[#F4F1EA] font-semibold">Trade Documents</h2>
            <p className="text-[#D8CCBC]/60 text-xs">Bill of Lading, Invoice, COO</p>
          </div>
          <Link href="/documents" className="text-[#C49A6C] text-sm font-medium">Manage</Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-[rgba(255,255,255,0.05)] rounded-xl">
            <p className="text-2xl font-bold text-[#F4F1EA]">{stats.documents}</p>
            <p className="text-[#D8CCBC] text-xs mt-1">Total Docs</p>
          </div>
          <div className="text-center p-3 bg-[rgba(255,255,255,0.05)] rounded-xl">
            <p className="text-2xl font-bold text-emerald-400">23</p>
            <p className="text-[#D8CCBC] text-xs mt-1">Verified</p>
          </div>
          <div className="text-center p-3 bg-[rgba(255,255,255,0.05)] rounded-xl">
            <p className="text-2xl font-bold text-amber-400">5</p>
            <p className="text-[#D8CCBC] text-xs mt-1">Pending</p>
          </div>
        </div>
      </div>

      {/* AI Assistant Quick Access */}
      <Link href="/ai" className="block bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-4 hover:border-purple-500/50 transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#F4F1EA] font-semibold">AI Trade Assistant</h3>
            <p className="text-[#D8CCBC] text-xs">HS codes, duties & compliance help</p>
          </div>
          <ArrowRight className="w-5 h-5 text-purple-400" />
        </div>
      </Link>
    </div>
  );
}
