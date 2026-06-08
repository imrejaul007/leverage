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
    quote: { icon: <FileText className="w-4 h-4" />, bg: 'bg-[#C49A6C]/10', color: 'text-[#C49A6C]' },
    rfq: { icon: <Plus className="w-4 h-4" />, bg: 'bg-blue-500/10', color: 'text-blue-400' },
    payment: { icon: <DollarSign className="w-4 h-4" />, bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
    document: { icon: <Shield className="w-4 h-4" />, bg: 'bg-white/5', color: 'text-[#8a8f94]' },
    order: { icon: <Truck className="w-4 h-4" />, bg: 'bg-white/5', color: 'text-[#8a8f94]' },
  };

  const quickStats = [
    { label: 'Active RFQs', value: stats.activeRFQs, icon: <FileText className="w-4 h-4" />, color: 'accent' },
    { label: 'In Transit', value: stats.shipments, icon: <Truck className="w-4 h-4" />, color: 'blue' },
    { label: 'Total Orders', value: stats.orders, icon: <Package className="w-4 h-4" />, color: 'green' },
    { label: 'Messages', value: stats.unreadMessages, icon: <MessageSquare className="w-4 h-4" />, color: 'purple' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Trade Stats Grid - Clean 2x2 */}
      <div className="grid grid-cols-2 gap-3">
        {quickStats.map((stat) => (
          <div key={stat.label} className="bg-[#151c24] border border-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                stat.color === 'accent' ? 'bg-[#C49A6C]/10 text-[#C49A6C]' :
                stat.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                stat.color === 'green' ? 'bg-emerald-500/10 text-emerald-400' :
                'bg-purple-500/10 text-purple-400'
              }`}>
                {stat.icon}
              </span>
              {stat.label === 'Messages' && stat.value > 0 && (
                <span className="w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {stat.value}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-[#F4F1EA]">{stat.value}</p>
            <p className="text-[#8a8f94] text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Card */}
      <div className="bg-[#151c24] border border-[#C49A6C]/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[#8a8f94] text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-[#F4F1EA] mt-1">
              ${(stats.revenue / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="w-11 h-11 rounded-lg bg-[#C49A6C]/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#C49A6C]" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          +12.5% from last month
        </div>
      </div>

      {/* Quick Actions - Clean grid */}
      <div className="grid grid-cols-4 gap-2">
        <Link href="/marketplace" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#151c24] border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Search className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[#8a8f94] text-[11px] font-medium text-center">Browse</span>
        </Link>

        <Link href="/rfqs/new" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#151c24] border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-[#C49A6C]/10 flex items-center justify-center">
            <Plus className="w-5 h-5 text-[#C49A6C]" />
          </div>
          <span className="text-[#8a8f94] text-[11px] font-medium text-center">Post RFQ</span>
        </Link>

        <Link href="/marketplace/inbox" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#151c24] border border-white/5 hover:border-white/10 transition-colors relative">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-purple-400" />
          </div>
          <span className="text-[#8a8f94] text-[11px] font-medium text-center">Inbox</span>
          {stats.unreadMessages > 0 && (
            <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {stats.unreadMessages}
            </span>
          )}
        </Link>

        <Link href="/orders" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#151c24] border border-white/5 hover:border-white/10 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
            <Truck className="w-5 h-5 text-[#8a8f94]" />
          </div>
          <span className="text-[#8a8f94] text-[11px] font-medium text-center">Orders</span>
        </Link>
      </div>

      {/* Recent Activity - Clean design */}
      <div className="bg-[#151c24] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-[#F4F1EA] font-semibold text-sm">Trade Updates</h2>
            <p className="text-[#8a8f94] text-xs">Recent activity on your trades</p>
          </div>
          <Link href="/marketplace/inbox" className="text-[#C49A6C] text-xs font-medium flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="divide-y divide-white/5">
          {recentActivity.map((activity) => (
            <Link
              key={activity.id}
              href={activity.link}
              className="flex items-center gap-3 p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className={`w-9 h-9 rounded-lg ${activityConfig[activity.type]?.bg} flex items-center justify-center flex-shrink-0 ${activityConfig[activity.type]?.color}`}>
                {activityConfig[activity.type]?.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${activity.status === 'unread' ? 'text-[#F4F1EA] font-medium' : 'text-[#8a8f94]'}`}>
                  {activity.text}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-[#8a8f94]/50" />
                  <span className="text-[#8a8f94] text-xs">{activity.time}</span>
                </div>
              </div>
              {activity.status === 'unread' && (
                <div className="w-1.5 h-1.5 bg-[#C49A6C] rounded-full flex-shrink-0"></div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Marketplace CTA */}
      <Link href="/marketplace" className="block bg-[#151c24] border border-white/5 rounded-xl p-4 hover:border-[#C49A6C]/20 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#C49A6C] to-[#D4AA82] flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#0a0f14]" />
            </div>
            <div>
              <h3 className="text-[#F4F1EA] font-semibold text-sm">Global Marketplace</h3>
              <p className="text-[#8a8f94] text-xs">500+ verified suppliers worldwide</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-[#C49A6C]" />
        </div>
      </Link>

      {/* Trade Documents Quick Stats */}
      <div className="bg-[#151c24] border border-white/5 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[#F4F1EA] font-semibold text-sm">Trade Documents</h2>
            <p className="text-[#8a8f94] text-xs">Bill of Lading, Invoice, COO</p>
          </div>
          <Link href="/documents" className="text-[#C49A6C] text-xs font-medium">Manage</Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <p className="text-xl font-bold text-[#F4F1EA]">{stats.documents}</p>
            <p className="text-[#8a8f94] text-xs mt-0.5">Total Docs</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <p className="text-xl font-bold text-emerald-400">23</p>
            <p className="text-[#8a8f94] text-xs mt-0.5">Verified</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <p className="text-xl font-bold text-amber-400">5</p>
            <p className="text-[#8a8f94] text-xs mt-0.5">Pending</p>
          </div>
        </div>
      </div>

      {/* AI Assistant Quick Access */}
      <Link href="/ai" className="block bg-[#151c24] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[#8a8f94]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#F4F1EA] font-semibold text-sm">AI Trade Assistant</h3>
            <p className="text-[#8a8f94] text-xs">HS codes, duties & compliance help</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#8a8f94]" />
        </div>
      </Link>
    </div>
  );
}