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
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#154230] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Stats Row - 60% Emerald Green, 40% Burgundy */}
      <div className="grid grid-cols-2 gap-4">
        {/* Compliance Score - Emerald Green */}
        <div className="bg-[#154230] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs mb-1">Compliance Score</p>
              <p className="text-2xl font-bold text-white">{stats.complianceScore}%</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: `${stats.complianceScore}%` }}></div>
          </div>
        </div>

        {/* Trade Volume - Burgundy */}
        <div className="bg-[#5D1E21] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs mb-1">Trade Volume</p>
              <p className="text-2xl font-bold text-white">${stats.tradeVolume}M</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3 text-white/90 text-xs font-medium">
            <TrendingUp className="w-3 h-3" />
            +12.5% this month
          </div>
        </div>
      </div>

      {/* Quick Stats Grid - 60% Emerald, 40% mixed */}
      <div className="grid grid-cols-4 gap-3">
        <Link href="/rfqs" className="bg-[#154230] rounded-xl p-4 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.activeRFQs}</p>
          <p className="text-white/70 text-xs mt-1">Active RFQs</p>
        </Link>

        <Link href="/orders" className="bg-[#154230] rounded-xl p-4 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.shipments}</p>
          <p className="text-white/70 text-xs mt-1">In Transit</p>
        </Link>

        <Link href="/orders" className="bg-[#5D1E21] rounded-xl p-4 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
            <Package className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.orders}</p>
          <p className="text-white/70 text-xs mt-1">Total Orders</p>
        </Link>

        <Link href="/marketplace/inbox" className="bg-[#5D1E21] rounded-xl p-4 hover:opacity-90 transition-opacity relative">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <p className="text-2xl font-bold text-white">{stats.unreadMessages}</p>
          <p className="text-white/70 text-xs mt-1">Messages</p>
          {stats.unreadMessages > 0 && (
            <span className="absolute top-3 right-3 w-4 h-4 bg-white rounded-full"></span>
          )}
        </Link>
      </div>

      {/* Quick Actions - Emerald Green buttons */}
      <div className="grid grid-cols-4 gap-3">
        <Link href="/marketplace" className="flex flex-col items-center gap-2 p-4 bg-white border border-black/5 rounded-xl hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <Search className="w-5 h-5 text-[#154230]" />
          </div>
          <span className="text-[#4A4A4A] text-xs font-medium">Browse</span>
        </Link>

        <Link href="/rfqs/new" className="flex flex-col items-center gap-2 p-4 bg-white border border-black/5 rounded-xl hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-[#154230] flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className="text-[#4A4A4A] text-xs font-medium">Post RFQ</span>
        </Link>

        <Link href="/documents" className="flex flex-col items-center gap-2 p-4 bg-white border border-black/5 rounded-xl hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#154230]" />
          </div>
          <span className="text-[#4A4A4A] text-xs font-medium">Documents</span>
        </Link>

        <Link href="/ai" className="flex flex-col items-center gap-2 p-4 bg-white border border-black/5 rounded-xl hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[#154230]" />
          </div>
          <span className="text-[#4A4A4A] text-xs font-medium">AI Assist</span>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-black/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-black/5 flex items-center justify-between">
          <h2 className="text-[#101111] font-semibold text-sm">Recent Activity</h2>
          <Link href="/marketplace/inbox" className="text-[#154230] text-xs font-medium flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="divide-y divide-black/5">
          {recentActivity.map((activity) => (
            <Link
              key={activity.id}
              href={activity.link}
              className="flex items-center gap-3 p-4 hover:bg-[#E6E2DA]/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg ${activityConfig[activity.type]?.bg} flex items-center justify-center ${activityConfig[activity.type]?.color}`}>
                {activityConfig[activity.type]?.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${activity.status === 'unread' ? 'text-[#101111] font-medium' : 'text-[#4A4A4A]'}`}>
                  {activity.text}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-[#4A4A4A]/50" />
                  <span className="text-[#4A4A4A] text-xs">{activity.time}</span>
                </div>
              </div>
              {activity.status === 'unread' && (
                <div className="w-1.5 h-1.5 bg-[#5D1E21] rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Marketplace CTA - Emerald Green */}
      <Link href="/marketplace" className="block bg-[#154230] rounded-xl p-5 hover:opacity-90 transition-opacity">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Global Marketplace</h3>
              <p className="text-white/70 text-xs">500+ verified suppliers</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-white/70" />
        </div>
      </Link>

      {/* Document Status - 60% Emerald, 40% Burgundy */}
      <div className="bg-white border border-black/5 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#101111] font-semibold text-sm">Document Status</h2>
          <Link href="/documents" className="text-[#154230] text-xs font-medium">Manage</Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-[#154230]/10 rounded-lg">
            <CheckCircle className="w-5 h-5 text-[#154230] mx-auto mb-2" />
            <p className="text-lg font-bold text-[#101111]">{stats.documents}</p>
            <p className="text-[#4A4A4A] text-xs">Verified</p>
          </div>
          <div className="text-center p-3 bg-[#5D1E21]/10 rounded-lg">
            <AlertCircle className="w-5 h-5 text-[#5D1E21] mx-auto mb-2" />
            <p className="text-lg font-bold text-[#101111]">5</p>
            <p className="text-[#4A4A4A] text-xs">Pending</p>
          </div>
          <div className="text-center p-3 bg-[#154230]/10 rounded-lg">
            <Clock className="w-5 h-5 text-[#154230] mx-auto mb-2" />
            <p className="text-lg font-bold text-[#101111]">12</p>
            <p className="text-[#4A4A4A] text-xs">Processing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
