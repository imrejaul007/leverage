'use client';

import { useState } from 'react';
import {
  BarChart3,
  Database,
  Zap,
  Clock,
  TrendingUp,
  TrendingDown,
  Loader2,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const usageStats = [
  { label: 'API Requests', value: '2,450', change: '+12%', trend: 'up', limit: '10,000', used: 24.5 },
  { label: 'Storage', value: '2.4 GB', change: '+0.5 GB', trend: 'up', limit: '10 GB', used: 24 },
  { label: 'Documents', value: '234', change: '+18', trend: 'up', limit: '500', used: 46.8 },
  { label: 'Team Members', value: '8', change: '+2', trend: 'up', limit: '25', used: 32 },
];

const apiUsage = [
  { endpoint: '/api/orders', requests: 890, avgTime: '120ms' },
  { endpoint: '/api/shipments', requests: 567, avgTime: '95ms' },
  { endpoint: '/api/documents', requests: 445, avgTime: '180ms' },
  { endpoint: '/api/products', requests: 298, avgTime: '85ms' },
  { endpoint: '/api/users', requests: 250, avgTime: '45ms' },
];

const monthlyUsage = [
  { month: 'Jan', requests: 1800 },
  { month: 'Feb', requests: 2100 },
  { month: 'Mar', requests: 1950 },
  { month: 'Apr', requests: 2400 },
  { month: 'May', requests: 2200 },
  { month: 'Jun', requests: 2450 },
];

export default function UsageSettingsPage() {
  const [period, setPeriod] = useState('month');
  const maxRequests = Math.max(...monthlyUsage.map(m => m.requests));

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Usage Statistics"
        subtitle="Monitor your account usage"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Period Selector */}
        <div className="flex gap-2">
          {['week', 'month', 'year'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-xl font-medium text-sm transition-colors ${
                period === p
                  ? 'bg-[#154230] text-white'
                  : 'bg-white text-[#4A4A4A] hover:bg-[#154230]/10'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-2 gap-3">
          {usageStats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                {stat.label === 'API Requests' && <Zap className="w-4 h-4 text-[#154230]" />}
                {stat.label === 'Storage' && <Database className="w-4 h-4 text-[#154230]" />}
                {stat.label === 'Documents' && <BarChart3 className="w-4 h-4 text-[#154230]" />}
                {stat.label === 'Team Members' && <Clock className="w-4 h-4 text-[#154230]" />}
                <span className="text-[#4A4A4A] text-xs">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-[#101111]">{stat.value}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`flex items-center gap-1 text-xs ${
                  stat.trend === 'up' ? 'text-[#DC2626]' : 'text-[#16A34A]'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-2 h-2 bg-[#E6E2DA] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#154230] rounded-full"
                  style={{ width: `${stat.used}%` }}
                />
              </div>
              <p className="text-[#4A4A4A] text-xs mt-1">{stat.used}% of {stat.limit} used</p>
            </div>
          ))}
        </div>

        {/* Usage Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">API Requests Over Time</h3>
          <div className="flex items-end gap-2 h-32">
            {monthlyUsage.map((month, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-[#154230] rounded-t-lg transition-all hover:bg-[#1d5240]"
                  style={{ height: `${(month.requests / maxRequests) * 100}%` }}
                />
                <span className="text-[#4A4A4A] text-xs">{month.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Endpoints */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Top API Endpoints</h3>
          <div className="space-y-3">
            {apiUsage.map((api, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl">
                <span className="text-[#4A4A4A] text-sm w-4">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-[#101111] font-medium font-mono text-sm">{api.endpoint}</p>
                  <p className="text-[#4A4A4A] text-xs">{api.requests} requests</p>
                </div>
                <span className="text-[#154230] text-sm font-medium">{api.avgTime}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Need More Resources?</p>
              <p className="text-white/70 text-sm">Upgrade to Enterprise for unlimited usage</p>
            </div>
            <button className="px-4 py-2 bg-white text-[#154230] rounded-lg font-semibold text-sm">
              Upgrade
            </button>
          </div>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
