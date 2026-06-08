'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, BarChart3 } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);

  const [stats, setStats] = useState({
    totalRevenue: 847500,
    orders: 1234,
    avgOrderValue: 687,
    activeProducts: 342,
  });

  const [revenueData, setRevenueData] = useState<ChartData[]>([]);
  const [ordersData, setOrdersData] = useState<ChartData[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const days = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90;
    const revenue: ChartData[] = [];
    const orders: ChartData[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      revenue.push({ label, value: Math.floor(Math.random() * 50000) + 20000 });
      orders.push({ label, value: Math.floor(Math.random() * 50) + 20 });
    }

    setRevenueData(revenue);
    setOrdersData(orders);

    const multiplier = days / 30;
    setStats({
      totalRevenue: Math.floor(847500 * multiplier),
      orders: Math.floor(1234 * multiplier),
      avgOrderValue: 687,
      activeProducts: 342,
    });

    setTimeout(() => setIsLoading(false), 500);
  }, [dateRange]);

  const topProducts = [
    { name: 'Industrial Sensors X200', sales: 1250, revenue: 374625 },
    { name: 'Premium Steel Bearings', sales: 890, revenue: 79605 },
    { name: 'LED Display Module', sales: 720, revenue: 32400 },
    { name: 'Power Converter 500W', sales: 580, revenue: 29000 },
  ];

  const topMarkets = [
    { country: 'United States', value: 285000, percentage: 34 },
    { country: 'Germany', value: 156000, percentage: 18 },
    { country: 'UAE', value: 124000, percentage: 15 },
    { country: 'Singapore', value: 98000, percentage: 12 },
    { country: 'UK', value: 72000, percentage: 8 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.value));
  const maxOrders = Math.max(...ordersData.map(d => d.value));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Analytics</h1>
          <p className="text-[#4A4A4A] text-sm">Track your trade performance</p>
        </div>
        <div className="flex gap-1 bg-white border border-black/5 rounded-lg p-1">
          {['7d', '30d', '90d'].map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                dateRange === range ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-black/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#154230]" />
            </div>
            <span className="flex items-center gap-1 text-[#154230] text-xs font-medium">
              <TrendingUp className="w-3 h-3" /> +12.5%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#101111]">${(stats.totalRevenue / 1000).toFixed(0)}K</p>
          <p className="text-[#4A4A4A] text-xs">Total Revenue</p>
        </div>

        <div className="bg-white border border-black/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-[#5D1E21]" />
            </div>
            <span className="flex items-center gap-1 text-[#154230] text-xs font-medium">
              <TrendingUp className="w-3 h-3" /> +8.3%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#101111]">{stats.orders}</p>
          <p className="text-[#4A4A4A] text-xs">Total Orders</p>
        </div>

        <div className="bg-white border border-black/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#154230]" />
            </div>
            <span className="flex items-center gap-1 text-[#154230] text-xs font-medium">
              <TrendingUp className="w-3 h-3" /> +5.1%
            </span>
          </div>
          <p className="text-2xl font-bold text-[#101111]">${stats.avgOrderValue}</p>
          <p className="text-[#4A4A4A] text-xs">Avg Order Value</p>
        </div>

        <div className="bg-white border border-black/5 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#5D1E21]" />
            </div>
            <span className="text-[#4A4A4A] text-xs">Active</span>
          </div>
          <p className="text-2xl font-bold text-[#101111]">{stats.activeProducts}</p>
          <p className="text-[#4A4A4A] text-xs">Active Products</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white border border-black/5 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#101111] font-semibold text-sm">Revenue Trend</h2>
          <span className="text-[#154230] text-xs font-medium">${(stats.totalRevenue / 1000).toFixed(0)}K total</span>
        </div>
        <div className="h-48 flex items-end gap-1">
          {revenueData.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-[#154230] rounded-t transition-all"
                style={{ height: `${(item.value / maxRevenue) * 100}%`, minHeight: '4px' }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[#4A4A4A] text-xs">
          <span>{revenueData[0]?.label}</span>
          <span>{revenueData[revenueData.length - 1]?.label}</span>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Products */}
        <div className="bg-white border border-black/5 rounded-xl p-4">
          <h2 className="text-[#101111] font-semibold text-sm mb-3">Top Products</h2>
          <div className="space-y-2">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#E6E2DA] transition-colors">
                <span className="w-6 h-6 rounded bg-[#E6E2DA] text-[#4A4A4A] text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[#101111] text-sm font-medium truncate">{product.name}</p>
                  <p className="text-[#4A4A4A] text-xs">{product.sales} sales</p>
                </div>
                <span className="text-[#154230] text-sm font-semibold">${(product.revenue / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Markets */}
        <div className="bg-white border border-black/5 rounded-xl p-4">
          <h2 className="text-[#101111] font-semibold text-sm mb-3">Top Markets</h2>
          <div className="space-y-3">
            {topMarkets.map((market, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#101111] text-sm">{market.country}</span>
                  <span className="text-[#4A4A4A] text-xs">${(market.value / 1000).toFixed(0)}K ({market.percentage}%)</span>
                </div>
                <div className="h-2 bg-[#E6E2DA] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#154230] rounded-full transition-all"
                    style={{ width: `${market.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Chart */}
      <div className="bg-white border border-black/5 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#101111] font-semibold text-sm">Orders Trend</h2>
          <span className="text-[#5D1E21] text-xs font-medium">{stats.orders} orders</span>
        </div>
        <div className="h-32 flex items-end gap-1">
          {ordersData.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-[#A6824A] rounded-t transition-all"
                style={{ height: `${(item.value / maxOrders) * 100}%`, minHeight: '4px' }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[#4A4A4A] text-xs">
          <span>{ordersData[0]?.label}</span>
          <span>{ordersData[ordersData.length - 1]?.label}</span>
        </div>
      </div>
    </div>
  );
}
