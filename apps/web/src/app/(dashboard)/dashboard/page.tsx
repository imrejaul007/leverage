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
    quote: { icon: <FileText className="w-5 h-5" />, bg: 'bg-orange-500/20', color: 'text-orange-400' },
    rfq: { icon: <Plus className="w-5 h-5" />, bg: 'bg-blue-500/20', color: 'text-blue-400' },
    payment: { icon: <DollarSign className="w-5 h-5" />, bg: 'bg-green-500/20', color: 'text-green-400' },
    document: { icon: <Shield className="w-5 h-5" />, bg: 'bg-purple-500/20', color: 'text-purple-400' },
    order: { icon: <Truck className="w-5 h-5" />, bg: 'bg-cyan-500/20', color: 'text-cyan-400' },
  };

  const quickStats = [
    { label: 'Active RFQs', value: stats.activeRFQs, icon: <FileText className="w-5 h-5" />, color: 'orange' },
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
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-3">
        {quickStats.map((stat) => (
          <div key={stat.label} className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                stat.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                stat.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                stat.color === 'green' ? 'bg-green-500/20 text-green-400' :
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
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-[#64748B] text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Card */}
      <div className="bg-gradient-to-br from-[#F97316]/20 to-[#EA580C]/10 border border-[#F97316]/30 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[#94A3B8] text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-white mt-1">
              ${(stats.revenue / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-[#F97316]/20 flex items-center justify-center">
            <TrendingUp className="w-7 h-7 text-orange-400" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          +12.5% from last month
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        <Link href="/marketplace" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#111827] border border-[#1E293B] hover:border-orange-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Search className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-[#94A3B8] text-xs font-medium text-center">Browse</span>
        </Link>

        <Link href="/rfqs/new" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#111827] border border-[#1E293B] hover:border-orange-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Plus className="w-6 h-6 text-orange-400" />
          </div>
          <span className="text-[#94A3B8] text-xs font-medium text-center">Post RFQ</span>
        </Link>

        <Link href="/marketplace/inbox" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#111827] border border-[#1E293B] hover:border-orange-500/50 transition-colors relative">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-purple-400" />
          </div>
          <span className="text-[#94A3B8] text-xs font-medium text-center">Messages</span>
          {stats.unreadMessages > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {stats.unreadMessages}
            </span>
          )}
        </Link>

        <Link href="/ai" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#111827] border border-[#1E293B] hover:border-orange-500/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-[#94A3B8] text-xs font-medium text-center">AI Help</span>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[#1E293B] flex items-center justify-between">
          <h2 className="text-white font-semibold">Recent Activity</h2>
          <Link href="/marketplace/inbox" className="text-orange-400 text-sm font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-[#1E293B]">
          {recentActivity.map((activity) => (
            <Link
              key={activity.id}
              href={activity.link}
              className="flex items-center gap-4 p-4 hover:bg-[#1E293B]/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl ${activityConfig[activity.type]?.bg} flex items-center justify-center flex-shrink-0 ${activityConfig[activity.type]?.color}`}>
                {activityConfig[activity.type]?.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${activity.status === 'unread' ? 'text-white font-medium' : 'text-[#94A3B8]'}`}>
                  {activity.text}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-[#64748B]" />
                  <span className="text-[#64748B] text-xs">{activity.time}</span>
                </div>
              </div>
              {activity.status === 'unread' && (
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Marketplace CTA */}
      <Link href="/marketplace" className="block bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-5 hover:border-blue-500/50 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Package className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Global Marketplace</h3>
              <p className="text-[#64748B] text-sm">500+ verified suppliers worldwide</p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-blue-400" />
        </div>
      </Link>

      {/* Documents Section */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Trade Documents</h2>
          <Link href="/documents" className="text-orange-400 text-sm font-medium">Manage</Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-[#1E293B] rounded-xl">
            <p className="text-2xl font-bold text-white">{stats.documents}</p>
            <p className="text-[#64748B] text-xs mt-1">Documents</p>
          </div>
          <div className="text-center p-3 bg-[#1E293B] rounded-xl">
            <p className="text-2xl font-bold text-white">23</p>
            <p className="text-[#64748B] text-xs mt-1">Verified</p>
          </div>
          <div className="text-center p-3 bg-[#1E293B] rounded-xl">
            <p className="text-2xl font-bold text-white">5</p>
            <p className="text-[#64748B] text-xs mt-1">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}