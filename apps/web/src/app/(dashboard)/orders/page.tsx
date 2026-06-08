'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Package, Clock, ArrowRight, Bell, Menu, X, Settings, LogOut, Home, User, Plus, MessageSquare, FileText, Truck, BarChart3 } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  currency: string;
  buyer: string;
  product: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
}

const initialOrders: Order[] = [
  { id: '1', orderNumber: 'ORD-2024-001', status: 'SHIPPED', total: 85000, currency: 'USD', buyer: 'Tokyo Trading Co.', product: 'Premium Basmati Rice', quantity: '100 MT', createdAt: '2024-01-15', updatedAt: '2024-01-18' },
  { id: '2', orderNumber: 'ORD-2024-002', status: 'PROCESSING', total: 125000, currency: 'USD', buyer: 'Berlin Imports GmbH', product: 'Solar Panels - 550W', quantity: '500 units', createdAt: '2024-01-18', updatedAt: '2024-01-20' },
  { id: '3', orderNumber: 'ORD-2024-003', status: 'PENDING', total: 45000, currency: 'USD', buyer: 'Singapore Logistics Pte', product: 'Cotton Yarn 40/1', quantity: '15 MT', createdAt: '2024-01-20', updatedAt: '2024-01-20' },
  { id: '4', orderNumber: 'ORD-2024-004', status: 'DELIVERED', total: 620000, currency: 'USD', buyer: 'Dubai Trading LLC', product: 'Steel Billets', quantity: '1000 MT', createdAt: '2024-01-10', updatedAt: '2024-01-17' },
  { id: '5', orderNumber: 'ORD-2024-005', status: 'PROCESSING', total: 22500, currency: 'USD', buyer: 'Mumbai Pharma Ltd', product: 'Pharmaceutical Raw Materials', quantity: '500 kg', createdAt: '2024-01-19', updatedAt: '2024-01-21' },
];

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  PENDING: { color: 'text-[#5D1E21]', bg: 'bg-[#5D1E21]/10', label: 'Pending' },
  PROCESSING: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Processing' },
  SHIPPED: { color: 'text-[#154230]', bg: 'bg-[#154230]/10', label: 'Shipped' },
  DELIVERED: { color: 'text-[#154230]', bg: 'bg-[#154230]/10', label: 'Delivered' },
  CANCELLED: { color: 'text-[#5D1E21]', bg: 'bg-[#5D1E21]/10', label: 'Cancelled' },
};

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders', active: true },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

const bottomNavLinks = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs/new', icon: Plus, label: 'Post RFQ', primary: true },
  { href: '/marketplace/inbox', icon: MessageSquare, label: 'Inbox' },
  { href: '/account', icon: User, label: 'Account' },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('leverage_orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    } else {
      setOrders(initialOrders);
      localStorage.setItem('leverage_orders', JSON.stringify(initialOrders));
    }
    setIsLoading(false);
  }, []);

  const statusFilters = ['all', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    active: orders.filter(o => ['PENDING', 'PROCESSING', 'SHIPPED'].includes(o.status)).length,
    completed: orders.filter(o => o.status === 'DELIVERED').length,
    totalValue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Desktop Sidebar - Fixed left */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        <div className="p-6 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-[#101111] font-bold text-lg tracking-tight">LEVERAGE</h1>
              <p className="text-[#4A4A4A] text-[10px] tracking-wider">CONNECTING DOTS TO PORTS</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'}`}>
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
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-black/5 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-[#101111]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#154230] rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[#101111] font-bold text-sm tracking-tight">LEVERAGE</span>
          </div>
          <Link
            href="/marketplace/inbox"
            className="relative p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-[#101111]" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#5D1E21] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </Link>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl overflow-y-auto">
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="12" r="2" fill="currentColor" />
                    <circle cx="18" cy="12" r="2" fill="currentColor" />
                    <circle cx="12" cy="6" r="2" fill="currentColor" />
                    <circle cx="12" cy="18" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-[#101111] font-bold text-lg tracking-tight">LEVERAGE</h1>
                  <p className="text-[#4A4A4A] text-[10px] tracking-wider">CONNECTING DOTS TO PORTS</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#4A4A4A]" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = link.active;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'}`}
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
                <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
                  <LogOut className="w-4 h-4 text-[#4A4A4A]" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="lg:ml-64 pb-24 lg:pb-4">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {/* Page Title - Mobile */}
          <div className="lg:hidden">
            <h1 className="text-[#101111] text-xl font-bold">Orders</h1>
            <p className="text-[#4A4A4A] text-xs">Connecting Dots to Ports</p>
          </div>

          {/* Search - Desktop */}
          <div className="hidden lg:block relative">
            <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-xl text-[#101111] placeholder-[#5A5A5A] focus:outline-none focus:border-[#A6824A] text-sm shadow-sm"
            />
          </div>

          {/* Desktop Stats */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-2xl font-bold text-[#101111]">{stats.total}</p>
              <p className="text-[#4A4A4A] text-sm">Total Orders</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
              <p className="text-[#4A4A4A] text-sm">Active</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">{stats.completed}</p>
              <p className="text-[#4A4A4A] text-sm">Completed</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <p className="text-2xl font-bold text-[#101111]">${(stats.totalValue / 1000).toFixed(0)}K</p>
              <p className="text-[#4A4A4A] text-sm">Total Value</p>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden relative">
            <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-xl text-[#101111] placeholder-[#5A5A5A] focus:outline-none focus:border-[#A6824A] text-sm shadow-sm"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {statusFilters.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
                  statusFilter === s
                    ? 'bg-[#154230] text-white'
                    : 'bg-white text-[#4A4A4A] hover:bg-[#E6E2DA] border border-black/5 shadow-sm'
                }`}
              >
                {s === 'all' ? 'All' : statusConfig[s]?.label || s}
              </button>
            ))}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <div className="h-5 bg-[#E6E2DA] rounded w-48"></div>
                      <div className="h-4 bg-[#E6E2DA] rounded w-32"></div>
                    </div>
                    <div className="h-8 bg-[#E6E2DA] rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Package className="w-7 h-7 text-[#4A4A4A]" />
              </div>
              <p className="text-[#4A4A4A] text-sm mb-4">No orders found</p>
              <Link href="/marketplace" className="text-[#5D1E21] hover:underline font-medium text-sm">
                Browse products
              </Link>
            </div>
          )}

          {/* Orders List */}
          {!isLoading && filteredOrders.length > 0 && (
            <div className="space-y-3">
              {filteredOrders.map(order => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="block bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[#5D1E21] font-mono text-xs">{order.orderNumber}</span>
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                          {statusConfig[order.status].label}
                        </span>
                      </div>
                      <h3 className="text-[#101111] font-semibold text-sm truncate">{order.product}</h3>
                      <p className="text-[#4A4A4A] text-xs mt-1">{order.quantity} - {order.buyer}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-[#4A4A4A]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Updated {order.updatedAt}</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="text-lg font-bold text-[#101111]">${(order.total / 1000).toFixed(0)}K</p>
                      <p className="text-[#4A4A4A] text-xs">{order.currency}</p>
                      <ArrowRight className="w-4 h-4 text-[#4A4A4A] mt-2" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Mobile Burgundy Stats Bar */}
          <div className="lg:hidden bg-[#5D1E21] rounded-2xl p-4 mt-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-white/70 text-xs mt-1">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{stats.active}</p>
                <p className="text-white/70 text-xs mt-1">Active</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{stats.completed}</p>
                <p className="text-white/70 text-xs mt-1">Done</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">${(stats.totalValue / 1000).toFixed(0)}K</p>
                <p className="text-white/70 text-xs mt-1">Value</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-2 py-2 z-40">
        <div className="flex items-center justify-around">
          {bottomNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                link.primary
                  ? 'bg-[#154230] text-white -mt-4 rounded-full px-4 py-3 shadow-lg'
                  : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
              }`}
            >
              <link.icon className={`w-5 h-5 ${link.primary ? '' : ''}`} />
              {!link.primary && <span className="text-[10px] font-medium">{link.label}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
