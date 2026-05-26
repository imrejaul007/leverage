'use client';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/store';
import { analyticsApi } from '@/lib/api-client';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

interface DashboardMetric {
  value: number;
  previousValue?: number;
  change?: number;
  changeDirection?: 'up' | 'down' | 'stable';
}

interface DashboardData {
  revenue?: DashboardMetric;
  orders?: DashboardMetric;
  users?: DashboardMetric;
  activeProducts?: DashboardMetric;
  pendingShipments?: DashboardMetric;
}

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data, isLoading, isError } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await analyticsApi.getDashboard();
      return response.data.data;
    },
    retry: false,
  });

  // Fallback stats when API fails or for demo
  const stats = data ? [
    {
      name: 'Total Revenue',
      value: data.revenue ? formatCurrency(data.revenue.value) : '$0',
      change: data.revenue?.change ? `${data.revenue.change > 0 ? '+' : ''}${data.revenue.change.toFixed(1)}%` : '0%',
      up: (data.revenue?.changeDirection || 'stable') !== 'down'
    },
    {
      name: 'Active Orders',
      value: data.orders?.value?.toString() || '0',
      change: data.orders?.change ? `${data.orders.change > 0 ? '+' : ''}${data.orders.change.toFixed(0)}` : '0',
      up: (data.orders?.changeDirection || 'stable') !== 'down'
    },
    {
      name: 'Products',
      value: data.activeProducts?.value?.toString() || '0',
      change: data.activeProducts?.change ? `${data.activeProducts.change > 0 ? '+' : ''}${data.activeProducts.change.toFixed(0)}` : '0',
      up: (data.activeProducts?.changeDirection || 'stable') !== 'down'
    },
    {
      name: 'Shipments',
      value: data.pendingShipments?.value?.toString() || '0',
      change: data.pendingShipments?.change ? `${data.pendingShipments.change > 0 ? '+' : ''}${data.pendingShipments.change.toFixed(0)}` : '0',
      up: (data.pendingShipments?.changeDirection || 'stable') !== 'down'
    },
  ] : [
    { name: 'Total Revenue', value: '$0', change: '0%', up: true },
    { name: 'Active Orders', value: '0', change: '0', up: true },
    { name: 'Products', value: '0', change: '0', up: true },
    { name: 'Shipments', value: '0', change: '0', up: true },
  ];

  if (isError) {
    return (
      <div className="space-y-6">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-400">Unable to load dashboard data. Please check your connection.</p>
        </div>
        <StatsGrid stats={stats} isLoading={false} />
        <QuickActions />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.firstName || 'User'}
          </h1>
          <p className="text-gray-400 text-sm mt-1">Here&apos;s what&apos;s happening with your business</p>
        </div>
        <select className="bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      <StatsGrid stats={stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            {isLoading ? 'Loading...' : 'Connect your payment provider to see revenue charts'}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-12 bg-slate-700 rounded"></div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No recent activity. Start by creating a product or placing an order.</p>
            )}
          </div>
        </div>
      </div>

      <QuickActions />
    </div>
  );
}

interface Stat {
  name: string;
  value: string;
  change: string;
  up: boolean;
}

function StatsGrid({ stats, isLoading }: { stats: Stat[]; isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700 animate-pulse">
            <div className="h-4 bg-slate-700 rounded w-24 mb-4"></div>
            <div className="h-8 bg-slate-700 rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <p className="text-gray-400 text-sm">{stat.name}</p>
          <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
          <p className={`text-sm mt-2 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
            {stat.change} from last period
          </p>
        </div>
      ))}
    </div>
  );
}

function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Link href="/products/new" className="block w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors flex items-center gap-3">
            <span className="text-blue-400">+</span> Add New Product
          </Link>
          <Link href="/documents" className="block w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors flex items-center gap-3">
            <span className="text-emerald-400">$</span> Create Invoice
          </Link>
          <Link href="/freight" className="block w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors flex items-center gap-3">
            <span className="text-cyan-400">📦</span> Track Shipment
          </Link>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Pending Tasks</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-700/50 rounded-lg">
            <span className="text-gray-300 text-sm">Verify documents</span>
            <span className="badge badge-warning">Pending</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-slate-700/50 rounded-lg">
            <span className="text-gray-300 text-sm">Review RFQ responses</span>
            <span className="badge badge-info">New</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-slate-700/50 rounded-lg">
            <span className="text-gray-300 text-sm">Complete KYC</span>
            <span className="badge badge-error">Action Required</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">AI Assistant</h3>
        <p className="text-gray-400 text-sm mb-4">
          Get instant help with compliance, documentation, and trade questions.
        </p>
        <Link href="/ai" className="block w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold text-center transition-all">
          Chat with AI
        </Link>
      </div>
    </div>
  );
}
