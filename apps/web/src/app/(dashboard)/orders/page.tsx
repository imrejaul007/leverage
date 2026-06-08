'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Package, Clock, CheckCircle, Truck, X, ArrowRight } from 'lucide-react';

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#101111]">My Orders</h1>
          <p className="text-[#4A4A4A] text-sm">{orders.length} orders • ${(stats.totalValue / 1000).toFixed(0)}K total value</p>
        </div>
        <Link href="/marketplace" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors text-sm">
          <Package className="w-4 h-4" />
          New Order
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-[#101111]">{stats.total}</p>
          <p className="text-[#4A4A4A] text-xs">Total Orders</p>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-[#5D1E21]">{stats.active}</p>
          <p className="text-[#4A4A4A] text-xs">In Progress</p>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-[#154230]">{stats.completed}</p>
          <p className="text-[#4A4A4A] text-xs">Completed</p>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-[#101111]">${(stats.totalValue / 1000).toFixed(0)}K</p>
          <p className="text-[#4A4A4A] text-xs">Total Value</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-lg text-[#101111] placeholder-[#5A5A5A] focus:outline-none focus:border-[#A6824A] text-sm"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {statusFilters.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              statusFilter === s
                ? 'bg-[#154230] text-white'
                : 'bg-white text-[#4A4A4A] hover:bg-[#E6E2DA] border border-black/5'
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
            <div key={i} className="bg-white border border-black/5 rounded-xl p-4 animate-pulse">
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
          <div className="w-14 h-14 bg-[#E6E2DA] rounded-xl flex items-center justify-center mx-auto mb-4">
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
        <div className="space-y-2">
          {filteredOrders.map(order => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block bg-white border border-black/5 rounded-xl p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#5D1E21] font-mono text-xs">{order.orderNumber}</span>
                    <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                      {statusConfig[order.status].label}
                    </span>
                  </div>
                  <h3 className="text-[#101111] font-medium text-sm truncate">{order.product}</h3>
                  <p className="text-[#4A4A4A] text-xs mt-0.5">{order.quantity} • {order.buyer}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-[#4A4A4A]">
                    <Clock className="w-3 h-3" />
                    <span>Updated {order.updatedAt}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#101111]">${(order.total / 1000).toFixed(0)}K</p>
                  <p className="text-[#4A4A4A] text-xs">{order.currency}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
