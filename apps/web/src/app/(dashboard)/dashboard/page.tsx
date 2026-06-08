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
    quote: { icon: <FileText className="w-4 h-4" />, bg: 'bg-[#C49A6C]/10', color: 'text-[#C49A6C]' },
    rfq: { icon: <Plus className="w-4 h-4" />, bg: 'bg-blue-100', color: 'text-blue-600' },
    payment: { icon: <DollarSign className="w-4 h-4" />, bg: 'bg-emerald-100', color: 'text-emerald-600' },
    document: { icon: <Shield className="w-4 h-4" />, bg: 'bg-gray-100', color: 'text-gray-500' },
    order: { icon: <Truck className="w-4 h-4" />, bg: 'bg-gray-100', color: 'text-gray-500' },
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB]">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Top Stats Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Compliance Score */}
        <div className="bg-white border border-black/5 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs mb-1">Compliance Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.complianceScore}%</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#3E6A47]/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-[#3E6A47]" />
            </div>
          </div>
          <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#3E6A47] rounded-full" style={{ width: `${stats.complianceScore}%` }}></div>
          </div>
        </div>

        {/* Trade Volume */}
        <div className="bg-white border border-black/5 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs mb-1">Trade Volume</p>
              <p className="text-2xl font-bold text-gray-900">${stats.tradeVolume}M</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#C49A6C]/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#C49A6C]" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-emerald-600 text-xs">
            <TrendingUp className="w-3 h-3" />
            +12.5% this month
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-4 gap-2">
        <Link href="/rfqs" className="bg-white border border-black/5 rounded-xl p-3 hover:shadow-md transition-all">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.activeRFQs}</p>
          <p className="text-gray-500 text-xs mt-0.5">Active RFQs</p>
        </Link>

        <Link href="/orders" className="bg-white border border-black/5 rounded-xl p-3 hover:shadow-md transition-all">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center mb-3">
            <Truck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.shipments}</p>
          <p className="text-gray-500 text-xs mt-0.5">In Transit</p>
        </Link>

        <Link href="/orders" className="bg-white border border-black/5 rounded-xl p-3 hover:shadow-md transition-all">
          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
            <Package className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.orders}</p>
          <p className="text-gray-500 text-xs mt-0.5">Total Orders</p>
        </Link>

        <Link href="/marketplace/inbox" className="bg-white border border-black/5 rounded-xl p-3 hover:shadow-md transition-all relative">
          <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
            <MessageSquare className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-xl font-bold text-gray-900">{stats.unreadMessages}</p>
          <p className="text-gray-500 text-xs mt-0.5">Messages</p>
          {stats.unreadMessages > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full"></span>
          )}
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        <Link href="/marketplace" className="flex flex-col items-center gap-2 p-3 bg-white border border-black/5 rounded-xl hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Search className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-gray-500 text-xs">Browse</span>
        </Link>

        <Link href="/rfqs/new" className="flex flex-col items-center gap-2 p-3 bg-white border border-black/5 rounded-xl hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-[#C49A6C]/10 flex items-center justify-center">
            <Plus className="w-5 h-5 text-[#C49A6C]" />
          </div>
          <span className="text-gray-500 text-xs">Post RFQ</span>
        </Link>

        <Link href="/documents" className="flex flex-col items-center gap-2 p-3 bg-white border border-black/5 rounded-xl hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-[#3E6A47]/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#3E6A47]" />
          </div>
          <span className="text-gray-500 text-xs">Documents</span>
        </Link>

        <Link href="/ai" className="flex flex-col items-center gap-2 p-3 bg-white border border-black/5 rounded-xl hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-gray-500 text-xs">AI Assist</span>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-black/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-black/5 flex items-center justify-between">
          <h2 className="text-gray-900 font-semibold text-sm">Recent Activity</h2>
          <Link href="/marketplace/inbox" className="text-[#C49A6C] text-xs font-medium flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="divide-y divide-black/5">
          {recentActivity.map((activity) => (
            <Link
              key={activity.id}
              href={activity.link}
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-9 h-9 rounded-lg ${activityConfig[activity.type]?.bg} flex items-center justify-center ${activityConfig[activity.type]?.color}`}>
                {activityConfig[activity.type]?.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${activity.status === 'unread' ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                  {activity.text}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-400 text-xs">{activity.time}</span>
                </div>
              </div>
              {activity.status === 'unread' && (
                <div className="w-1.5 h-1.5 bg-[#C49A6C] rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Marketplace CTA */}
      <Link href="/marketplace" className="block bg-white border border-black/5 rounded-xl p-4 hover:shadow-md transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#C49A6C] to-[#D4AA82] flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold text-sm">Global Marketplace</h3>
              <p className="text-gray-500 text-xs">500+ verified suppliers</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>
      </Link>

      {/* Document Status */}
      <div className="bg-white border border-black/5 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-gray-900 font-semibold text-sm">Document Status</h2>
          <Link href="/documents" className="text-[#C49A6C] text-xs font-medium">Manage</Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">{stats.documents}</p>
            <p className="text-gray-500 text-xs">Verified</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">5</p>
            <p className="text-gray-500 text-xs">Pending</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">12</p>
            <p className="text-gray-500 text-xs">Processing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
