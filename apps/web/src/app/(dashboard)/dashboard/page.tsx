'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  // Mock data for demo - no API calls
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
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
      <div className="min-h-screen bg-[#081512] p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#081512] p-8" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-[#C49A6C] mb-2 brand-font">LEVERAGE</h1>
          <p className="text-[#D8CCBC]/70">
            Good morning, <span className="text-[#F4F1EA]">{user?.firstName || 'User'}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/rfqs/new" className="px-5 py-3 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-medium hover:bg-[#0f4a42] transition-colors">
            + New RFQ
          </Link>
          <Link href="/ai" className="px-5 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
            AI Assistant
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard title="Active RFQs" value={stats.rfqs.toString()} change="+12" trend="up" />
        <KPICard title="Revenue YTD" value={`$${(stats.revenue / 1000000).toFixed(1)}M`} change="+8.2%" trend="up" />
        <KPICard title="Consultations" value={stats.consultations.toString()} change="+5" trend="up" />
        <KPICard title="Active Buyers" value={stats.activeBuyers.toString()} change="+23" trend="up" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Global Trade Map - 2 columns */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[#F4F1EA]">Global Trade Activity</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm bg-[#0E3B36] text-[#C49A6C] rounded-lg">Live</button>
              <button className="px-4 py-2 text-sm text-[#D8CCBC]/60 hover:text-[#F4F1EA] transition-colors">7D</button>
            </div>
          </div>

          {/* Globe Visualization */}
          <div className="relative h-[420px] rounded-xl overflow-hidden bg-gradient-to-b from-[#0E3B36]/20 to-[#081512]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full border-2 border-[#C49A6C]/20"></div>
              <div className="absolute w-64 h-64 rounded-full border border-[#C49A6C]/10"></div>
              <div className="absolute w-48 h-48 rounded-full border border-[#C49A6C]/10"></div>
            </div>

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
              <path d="M80,200 Q200,100 320,180" stroke="#C49A6C" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="8,4" />
              <path d="M120,100 Q220,180 350,120" stroke="#C49A6C" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="8,4" />
              <path d="M60,150 Q180,250 340,100" stroke="#C49A6C" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="8,4" />
            </svg>

            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-[#C49A6C] rounded-full animate-pulse shadow-lg shadow-[#C49A6C]/50"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#C49A6C] rounded-full animate-pulse shadow-lg shadow-[#C49A6C]/50" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-[#C49A6C] rounded-full animate-pulse shadow-lg shadow-[#C49A6C]/50" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-[#C49A6C] rounded-full animate-pulse shadow-lg shadow-[#C49A6C]/50" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-[#F4F1EA] rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-[#F4F1EA] rounded-full"></div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
              <p className="text-[#C49A6C] text-xl font-semibold">127</p>
              <p className="text-[#D8CCBC]/60 text-xs">Active Shipments</p>
            </div>
            <div className="text-center p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
              <p className="text-[#C49A6C] text-xl font-semibold">45</p>
              <p className="text-[#D8CCBC]/60 text-xs">Countries</p>
            </div>
            <div className="text-center p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
              <p className="text-[#C49A6C] text-xl font-semibold">$2.4M</p>
              <p className="text-[#D8CCBC]/60 text-xs">Trade Volume</p>
            </div>
            <div className="text-center p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
              <p className="text-[#C49A6C] text-xl font-semibold">98.5%</p>
              <p className="text-[#D8CCBC]/60 text-xs">On-Time</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-5">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href} className="flex flex-col items-center gap-2 p-4 bg-[#0E3B36]/50 rounded-xl hover:bg-[#0E3B36] transition-colors group">
                  <span className="text-3xl">{action.icon}</span>
                  <span className="text-[#F4F1EA] text-sm font-medium group-hover:text-[#C49A6C] transition-colors">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-[#F4F1EA] mb-5">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#C49A6C]"></div>
                  <div className="flex-1">
                    <p className="text-[#F4F1EA] text-sm">{activity.text}</p>
                    <p className="text-[#D8CCBC]/50 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="card">
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-5">Top Markets</h2>
          <div className="space-y-4">
            {['United States', 'Germany', 'China', 'Singapore', 'UAE'].map((market, i) => (
              <div key={market} className="flex items-center gap-3">
                <span className="w-6 text-[#D8CCBC]/50 text-sm">{i + 1}</span>
                <span className="flex-1 text-[#F4F1EA] text-sm">{market}</span>
                <span className="text-[#C49A6C] text-sm">${(Math.random() * 5 + 1).toFixed(1)}M</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-5">Compliance Alerts</h2>
          <div className="space-y-3">
            <div className="p-3 bg-[#C49A6C]/10 border border-[#C49A6C]/20 rounded-xl">
              <p className="text-[#F4F1EA] text-sm font-medium">Document Review Required</p>
              <p className="text-[#D8CCBC]/60 text-xs mt-1">Invoice #INV-2024-092</p>
            </div>
            <div className="p-3 bg-[rgba(255,255,255,0.03)] rounded-xl">
              <p className="text-[#F4F1EA] text-sm font-medium">HS Code Updated</p>
              <p className="text-[#D8CCBC]/60 text-xs mt-1">8471.30.00 → 8471.50.00</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-5">Trade Wallet</h2>
          <div className="p-4 bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-xl border border-[#C49A6C]/20">
            <p className="text-[#D8CCBC]/60 text-sm">Available Balance</p>
            <p className="text-3xl font-bold text-[#F4F1EA] mt-1">$124,580.00</p>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 bg-[#C49A6C] text-[#081512] rounded-lg text-sm font-semibold">Add Funds</button>
              <button className="flex-1 py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-lg text-sm font-medium border border-[rgba(255,255,255,0.1)]">Withdraw</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, trend }: { title: string; value: string; change: string; trend: 'up' | 'down' }) {
  return (
    <div className="card hover:border-[#C49A6C]/30 transition-colors">
      <p className="text-[#D8CCBC]/70 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-[#F4F1EA] mb-2">{value}</p>
      <p className={`text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
        {trend === 'up' ? '↑' : '↓'} {change} this month
      </p>
    </div>
  );
}
