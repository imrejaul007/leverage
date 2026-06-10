'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, BarChart3, Home, Search, Truck, FileText, User, MessageSquare, Settings, Bell, Menu, X, LogOut, Plus } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];


interface ChartData {
  label: string;
  value: number;
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('leverage_user');
    router.push('/login');
  };

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

  const maxRevenue = Math.max(...revenueData.map(d => d.value));
  const maxOrders = Math.max(...ordersData.map(d => d.value));

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-black/5 flex items-center justify-between">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-9 h-9 bg-[#E6E2DA] rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
          </div>
          <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Bell className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <h1 className="text-white font-bold text-2xl">Analytics</h1>
          <p className="text-white/70 text-sm mt-1">Track your trade performance</p>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-8 py-4 lg:py-6 space-y-4">
          {/* Date Range Selector */}
          <div className="flex gap-1 bg-white border border-black/5 rounded-lg p-1 w-fit">
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
                <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="flex items-center gap-1 text-[#5D1E21] text-xs font-medium">
                  <TrendingDown className="w-3 h-3" /> -3.2%
                </span>
              </div>
              <p className="text-2xl font-bold text-[#101111]">{stats.orders.toLocaleString()}</p>
              <p className="text-[#4A4A4A] text-xs">Total Orders</p>
            </div>

            <div className="bg-white border border-black/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-xs">Avg</span>
              </div>
              <p className="text-2xl font-bold text-[#101111]">${stats.avgOrderValue}</p>
              <p className="text-[#4A4A4A] text-xs">Avg Order Value</p>
            </div>

            <div className="bg-white border border-black/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="flex items-center gap-1 text-[#154230] text-xs font-medium">
                  <TrendingUp className="w-3 h-3" /> +8.1%
                </span>
              </div>
              <p className="text-2xl font-bold text-[#101111]">{stats.activeProducts}</p>
              <p className="text-[#4A4A4A] text-xs">Active Products</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Revenue Chart */}
            <div className="bg-white border border-black/5 rounded-xl p-4">
              <h3 className="font-semibold text-[#101111] mb-4">Revenue Trend</h3>
              <div className="h-40 flex items-end gap-1">
                {revenueData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-[#154230]/20 rounded-t"
                      style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                    />
                    <span className="text-[10px] text-[#4A4A4A] rotate-[-45deg] origin-center whitespace-nowrap">
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders Chart */}
            <div className="bg-white border border-black/5 rounded-xl p-4">
              <h3 className="font-semibold text-[#101111] mb-4">Orders Trend</h3>
              <div className="h-40 flex items-end gap-1">
                {ordersData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-[#A6824A]/30 rounded-t"
                      style={{ height: `${(d.value / maxOrders) * 100}%` }}
                    />
                    <span className="text-[10px] text-[#4A4A4A] rotate-[-45deg] origin-center whitespace-nowrap">
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white border border-black/5 rounded-xl p-4">
            <h3 className="font-semibold text-[#101111] mb-4">Top Products</h3>
            <div className="space-y-3">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#F7F6F2] rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-[#154230] text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-[#101111]">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#101111]">${product.revenue.toLocaleString()}</p>
                    <p className="text-xs text-[#4A4A4A]">{product.sales} sales</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="ai" />
    </div>
  );
}
