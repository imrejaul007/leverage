'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = {
    rfqs: 127,
    revenue: 24500000,
    consultations: 48,
    activeBuyers: 892,
  };

  const recentActivity = [
    { type: 'rfq', text: 'New RFQ from Germany - Industrial Equipment', time: '5 min ago', status: 'pending' },
    { type: 'payment', text: 'Payment received - $125,000 USD', time: '12 min ago', status: 'completed' },
    { type: 'document', text: 'Invoice #INV-2024-089 verified', time: '1 hour ago', status: 'completed' },
    { type: 'rfq', text: 'Quote sent to Singapore - $45,000', time: '2 hours ago', status: 'sent' },
    { type: 'partner', text: 'New partner verified: Tokyo Trading Co.', time: '3 hours ago', status: 'new' },
  ];

  const quickActions = [
    { label: 'Create RFQ', icon: '📋', href: '/rfqs/new' },
    { label: 'Upload Document', icon: '📄', href: '/documents' },
    { label: 'Book Shipment', icon: '🚢', href: '/freight' },
    { label: 'AI Assistant', icon: '🤖', href: '/ai' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081512] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header - Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F4F1EA]">
            Good morning, <span className="text-[#C49A6C]">{user?.firstName || 'User'}</span>
          </h1>
          <p className="text-[#D8CCBC]/60 text-sm mt-1">Welcome back to your dashboard</p>
        </div>
        <div className="flex gap-2">
          <Link href="/rfqs/new" className="flex-1 sm:flex-none px-4 py-2.5 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-medium text-center text-sm">
            + RFQ
          </Link>
          <Link href="/ai" className="flex-1 sm:flex-none px-4 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-center text-sm">
            🤖 AI
          </Link>
        </div>
      </div>

      {/* KPI Cards - Mobile: 2 columns, Tablet: 4 columns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KPICard title="RFQs" value={stats.rfqs.toString()} change="+12" trend="up" />
        <KPICard title="Revenue" value={`$${(stats.revenue / 1000000).toFixed(1)}M`} change="+8.2%" trend="up" />
        <KPICard title="Consults" value={stats.consultations.toString()} change="+5" trend="up" />
        <KPICard title="Buyers" value={stats.activeBuyers.toString()} change="+23" trend="up" />
      </div>

      {/* Quick Actions - Mobile: Horizontal scroll */}
      <div className="card">
        <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Quick Actions</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0 sm:-mx-0 sm:px-0">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex-shrink-0 flex flex-col items-center gap-2 p-4 bg-[#0E3B36]/50 rounded-xl hover:bg-[#0E3B36] transition-colors min-w-[80px]"
            >
              <span className="text-2xl sm:text-3xl">{action.icon}</span>
              <span className="text-[#F4F1EA] text-xs font-medium whitespace-nowrap">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Global Trade Map - Full width on mobile */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#F4F1EA]">Global Trade Activity</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs bg-[#0E3B36] text-[#C49A6C] rounded-lg">Live</button>
            <button className="px-3 py-1.5 text-xs text-[#D8CCBC]/60">7D</button>
          </div>
        </div>

        <div className="relative h-48 sm:h-64 md:h-80 lg:h-[420px] rounded-xl overflow-hidden bg-gradient-to-b from-[#0E3B36]/20 to-[#081512]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-80 lg:h-80 rounded-full border-2 border-[#C49A6C]/20"></div>
            <div className="absolute w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full border border-[#C49A6C]/10"></div>
          </div>

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <path d="M80,200 Q200,100 320,180" stroke="#C49A6C" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="8,4" />
            <path d="M120,100 Q220,180 350,120" stroke="#C49A6C" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="8,4" />
            <path d="M60,150 Q180,250 340,100" stroke="#C49A6C" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="8,4" />
          </svg>

          <div className="absolute top-1/4 left-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-[#C49A6C] rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-[#C49A6C] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-[#C49A6C] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Trade Stats - Mobile: 2x2 grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { label: 'Shipments', value: '127' },
            { label: 'Countries', value: '45' },
            { label: 'Volume', value: '$2.4M' },
            { label: 'On-Time', value: '98.5%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-2 sm:p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
              <p className="text-[#C49A6C] text-base sm:text-xl font-semibold">{stat.value}</p>
              <p className="text-[#D8CCBC]/60 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout - Mobile: Stack vertically */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-[rgba(255,255,255,0.05)] last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-[#C49A6C] flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F4F1EA] text-sm truncate">{activity.text}</p>
                  <p className="text-[#D8CCBC]/50 text-xs mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Markets */}
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Top Markets</h2>
          <div className="space-y-2">
            {['United States', 'Germany', 'China', 'Singapore', 'UAE'].map((market, i) => (
              <div key={market} className="flex items-center gap-3 p-2">
                <span className="w-5 text-[#D8CCBC]/50 text-xs">{i + 1}</span>
                <span className="flex-1 text-[#F4F1EA] text-sm">{market}</span>
                <span className="text-[#C49A6C] text-sm">${(Math.random() * 5 + 1).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Mobile: Stack */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Compliance Alerts */}
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Compliance</h2>
          <div className="space-y-3">
            <div className="p-3 bg-[#C49A6C]/10 border border-[#C49A6C]/20 rounded-xl">
              <p className="text-[#F4F1EA] text-sm font-medium">Document Review</p>
              <p className="text-[#D8CCBC]/60 text-xs">Invoice #INV-2024-092</p>
            </div>
            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
              <p className="text-[#F4F1EA] text-sm font-medium">HS Code Updated</p>
              <p className="text-[#D8CCBC]/60 text-xs">8471.30.00 → 8471.50.00</p>
            </div>
          </div>
        </div>

        {/* Trade Wallet */}
        <div className="card sm:col-span-2 lg:col-span-2">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Trade Wallet</h2>
          <div className="p-4 bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-xl border border-[#C49A6C]/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[#D8CCBC]/60 text-sm">Available Balance</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#F4F1EA] mt-1">$124,580.00</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#C49A6C] text-[#081512] rounded-lg text-sm font-semibold">Add</button>
                <button className="px-4 py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg text-sm font-medium border border-[rgba(255,255,255,0.1)]">Withdraw</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, trend }: { title: string; value: string; change: string; trend: 'up' | 'down' }) {
  return (
    <div className="card p-3 sm:p-4">
      <p className="text-[#D8CCBC]/70 text-xs sm:text-sm mb-1">{title}</p>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#F4F1EA]">{value}</p>
      <p className={`text-xs ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
        {trend === 'up' ? '↑' : '↓'} {change}
      </p>
    </div>
  );
}
