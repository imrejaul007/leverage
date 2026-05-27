'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  const stats = {
    rfqs: 127,
    orders: 48,
    documents: 156,
    shipments: 23,
    revenue: 24500000,
    consultations: 12,
    marketplaceInquiries: 34,
    pendingQuotes: 8,
    unreadMessages: 5,
  };

  const recentActivity = [
    { id: '1', type: 'quote_response', text: 'New quote from Global Trade Exports - Basmati Rice', time: '5 min ago', status: 'unread', link: '/marketplace/inbox' },
    { id: '2', type: 'rfq', text: 'New RFQ from Germany - Industrial Equipment', time: '12 min ago', status: 'pending', link: '/rfqs' },
    { id: '3', type: 'payment', text: 'Payment received - $125,000 USD', time: '1 hour ago', status: 'completed', link: '/billing' },
    { id: '4', type: 'document', text: 'Invoice #INV-2024-089 verified', time: '2 hours ago', status: 'completed', link: '/documents' },
    { id: '5', type: 'bid', text: 'Bid accepted on Solar Panels - $160/unit', time: '3 hours ago', status: 'accepted', link: '/marketplace/inbox' },
    { id: '6', type: 'requirement', text: 'Supplier responded to your requirements - Cotton Yarn', time: '4 hours ago', status: 'responded', link: '/marketplace/inbox' },
  ];

  const quickActions = [
    { label: 'Browse Products', icon: '🛒', href: '/marketplace', color: 'from-[#C49A6C] to-[#D4AA82]' },
    { label: 'My Inbox', icon: '📨', href: '/marketplace/inbox', badge: stats.unreadMessages, color: 'from-blue-500 to-blue-600' },
    { label: 'Create RFQ', icon: '📋', href: '/rfqs/new', color: 'from-emerald-500 to-emerald-600' },
    { label: 'AI Assistant', icon: '🤖', href: '/ai', color: 'from-violet-500 to-violet-600' },
  ];

  const activityConfig: Record<string, { icon: string; bg: string; color: string }> = {
    quote_response: { icon: '💬', bg: 'bg-emerald-500/20', color: 'text-emerald-400' },
    rfq: { icon: '📋', bg: 'bg-[#C49A6C]/20', color: 'text-[#C49A6C]' },
    payment: { icon: '💰', bg: 'bg-green-500/20', color: 'text-green-400' },
    document: { icon: '📄', bg: 'bg-blue-500/20', color: 'text-blue-400' },
    bid: { icon: '🎯', bg: 'bg-amber-500/20', color: 'text-amber-400' },
    requirement: { icon: '📝', bg: 'bg-blue-500/20', color: 'text-blue-400' },
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081512] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">Welcome back!</h1>
        <p className="text-[#D8CCBC]/60 text-sm">Here's what's happening with your trade activities</p>
      </div>

      {/* Quick Actions - Horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
        {quickActions.map(action => (
          <Link
            key={action.label}
            href={action.href}
            className="flex-shrink-0 w-32 sm:w-36 h-24 rounded-xl bg-gradient-to-br flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform relative"
            style={{ background: `linear-gradient(135deg, ${action.color.includes('#C49A6C') ? '#C49A6C' : action.color.split(' ')[0].replace('from-', '').replace('-500', '-400')}, ${action.color.split(' ')[1].replace('to-', '').replace('-600', '-500')})` }}
          >
            <span className="text-3xl">{action.icon}</span>
            <span className="text-white text-sm font-medium">{action.label}</span>
            {action.badge && (
              <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {action.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active RFQs', value: stats.rfqs, icon: '📋', color: 'text-[#C49A6C]' },
          { label: 'Orders', value: stats.orders, icon: '📦', color: 'text-emerald-400' },
          { label: 'Marketplace Inquiries', value: stats.marketplaceInquiries, icon: '🛒', color: 'text-blue-400' },
          { label: 'Pending Quotes', value: stats.pendingQuotes, icon: '⏳', color: 'text-amber-400' },
        ].map(stat => (
          <Link key={stat.label} href={stat.label.includes('RFQ') ? '/rfqs' : '/marketplace/inbox'} className="card flex flex-col justify-between min-h-[100px] sm:min-h-[120px] hover:border-[#C49A6C]/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-[#F4F1EA]">{stat.value}</p>
              <p className="text-[#D8CCBC]/60 text-sm">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#F4F1EA]">Recent Activity</h2>
            <Link href="/marketplace/inbox" className="text-[#C49A6C] text-sm font-medium hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentActivity.map(activity => (
              <Link
                key={activity.id}
                href={activity.link}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.03)] transition-colors -mx-2"
              >
                <div className={`w-10 h-10 rounded-xl ${activityConfig[activity.type]?.bg} flex items-center justify-center text-xl flex-shrink-0`}>
                  {activityConfig[activity.type]?.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${activity.status === 'unread' ? 'text-[#F4F1EA] font-medium' : 'text-[#D8CCBC]/80'}`}>
                    {activity.text}
                  </p>
                  <p className="text-[#D8CCBC]/50 text-xs mt-1">{activity.time}</p>
                </div>
                {activity.status === 'unread' && (
                  <div className="w-2 h-2 bg-[#C49A6C] rounded-full flex-shrink-0 mt-2"></div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          {/* Revenue Card */}
          <div className="card bg-gradient-to-br from-[#0E3B36]/80 to-[#081512]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[#D8CCBC]/60 text-sm">Total Revenue</p>
                <p className="text-3xl sm:text-4xl font-bold text-[#F4F1EA] mt-1">
                  ${(stats.revenue / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-[#C49A6C]/20 flex items-center justify-center">
                <span className="text-3xl">💵</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +12.5% from last month
            </div>
          </div>

          {/* Marketplace Activity */}
          <div className="card">
            <h3 className="text-lg font-semibold text-[#F4F1EA] mb-4">Marketplace Activity</h3>
            <div className="space-y-3">
              {[
                { label: 'Quotes Sent', value: 23, icon: '📋', color: 'text-[#C49A6C]' },
                { label: 'Bids Placed', value: 8, icon: '🎯', color: 'text-emerald-400' },
                { label: 'Requirements Sent', value: 12, icon: '📝', color: 'text-blue-400' },
                { label: 'Pending Responses', value: stats.pendingQuotes, icon: '⏳', color: 'text-amber-400' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`${item.color}`}>{item.icon}</span>
                    <span className="text-[#D8CCBC]">{item.label}</span>
                  </div>
                  <span className={`font-bold ${item.color}`}>{item.value}</span>
                </div>
              ))}
            </div>
            <Link href="/marketplace/inbox" className="block mt-4 py-3 bg-[#0E3B36] text-[#F4F1EA] font-medium rounded-xl text-center hover:bg-[#0f4a42] transition-colors">
              View My Inbox
            </Link>
          </div>
        </div>
      </div>

      {/* Browse Products CTA */}
      <Link href="/marketplace" className="block card bg-gradient-to-r from-[#0E3B36]/50 to-[#081512] border border-[#C49A6C]/20 hover:border-[#C49A6C]/40 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#C49A6C]/20 flex items-center justify-center">
              <span className="text-3xl">🌍</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F4F1EA]">Global Marketplace</h3>
              <p className="text-[#D8CCBC]/60 text-sm">Browse products from verified suppliers worldwide</p>
            </div>
          </div>
          <svg className="w-6 h-6 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
