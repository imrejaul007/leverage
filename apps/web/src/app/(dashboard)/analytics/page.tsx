'use client';

import { useState, useEffect } from 'react';

interface ChartData {
  label: string;
  value: number;
}

const chartColors = ['#C49A6C', '#0E3B36', '#D4AA82', '#F4F1EA', '#81C784', '#64B5F6'];

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
    // Generate mock data based on date range
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

    // Update totals based on range
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
    { name: 'Hydraulic Pump HP-500', sales: 145, revenue: 181250 },
    { name: 'Safety Gloves (Box)', sales: 2100, revenue: 52479 },
  ];

  const topMarkets = [
    { country: 'United States', revenue: 425000, percentage: 50 },
    { country: 'Germany', revenue: 170000, percentage: 20 },
    { country: 'United Kingdom', revenue: 127125, percentage: 15 },
    { country: 'Japan', revenue: 84750, percentage: 10 },
    { country: 'Australia', revenue: 40625, percentage: 5 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.value));
  const maxOrders = Math.max(...ordersData.map(d => d.value));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081512] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F4F1EA]">Analytics</h1>
          <p className="text-[#D8CCBC]/60 text-sm">Track your business performance</p>
        </div>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="h-10 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C49A6C]">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, change: '+12.5%', up: true },
          { label: 'Orders', value: stats.orders.toLocaleString(), change: '+8.2%', up: true },
          { label: 'Avg. Order Value', value: `$${stats.avgOrderValue.toLocaleString()}`, change: '+4.1%', up: true },
          { label: 'Active Products', value: stats.activeProducts.toString(), change: '+15', up: true },
        ].map((stat, i) => (
          <div key={i} className="card">
            <p className="text-[#D8CCBC]/50 text-xs mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-[#F4F1EA]">{stat.value}</p>
            <div className="flex items-center gap-1 mt-2">
              <svg className={`w-4 h-4 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.up ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
              </svg>
              <span className={`text-xs ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Revenue Trend</h2>
          <div className="h-64 flex items-end gap-1">
            {revenueData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-[#0E3B36] to-[#C49A6C] rounded-t transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(data.value / maxRevenue) * 100}%` }}
                  title={`$${data.value.toLocaleString()}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[#D8CCBC]/50 text-xs overflow-x-auto">
            {revenueData.filter((_, i) => i % Math.ceil(revenueData.length / 7) === 0).map((d, i) => (
              <span key={i}>{d.label}</span>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Orders Trend</h2>
          <div className="h-64 flex items-end gap-1">
            {ordersData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-[#0E3B36] to-[#D4AA82] rounded-t transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(data.value / maxOrders) * 100}%` }}
                  title={data.value.toString()}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[#D8CCBC]/50 text-xs overflow-x-auto">
            {ordersData.filter((_, i) => i % Math.ceil(ordersData.length / 7) === 0).map((d, i) => (
              <span key={i}>{d.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[#C49A6C] font-bold w-6">{i + 1}</span>
                <div className="flex-1">
                  <p className="text-[#F4F1EA] font-medium">{product.name}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[#D8CCBC]/50 text-sm">{product.sales} sales</span>
                    <div className="flex-1 h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C49A6C] rounded-full"
                        style={{ width: `${(product.revenue / topProducts[0].revenue) * 100}%` }}
                      />
                    </div>
                    <span className="text-[#C49A6C] font-medium text-sm">${(product.revenue / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Markets */}
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Top Markets</h2>
          <div className="space-y-4">
            {topMarkets.map((market, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[#C49A6C] font-bold w-6">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#F4F1EA]">{market.country}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[#D8CCBC]/50 text-sm">{market.percentage}%</span>
                      <span className="text-[#C49A6C] font-medium">${(market.revenue / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                  <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${market.percentage}%`, backgroundColor: chartColors[i] || '#C49A6C' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
