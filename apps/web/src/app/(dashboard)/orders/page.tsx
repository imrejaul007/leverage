'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Package, Clock, CheckCircle, Truck, X, ArrowRight, ShoppingCart, DollarSign, Ship, Globe } from 'lucide-react';

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
    <div className="space-y-4 relative overflow-hidden">
      {/* Background decorations - Orders/Commerce themed */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large Globe with Commerce Routes */}
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] animate-[spin_75s_linear_infinite]">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.06]">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#154230" strokeWidth="1" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#154230" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#154230" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="90" fill="none" stroke="#A6824A" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#154230" strokeWidth="0.5" transform="rotate(60 200 200)" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#154230" strokeWidth="0.5" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#154230" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Shopping Cart/Order Pattern */}
        <svg className="absolute top-0 left-0 w-[300px] h-[300px] opacity-[0.05]" viewBox="0 0 300 300">
          {/* Shopping cart icon */}
          <path d="M50,80 L70,80 L90,200 L240,200 L260,80 L70,80" fill="none" stroke="#A6824A" strokeWidth="2" rx="5" />
          <circle cx="100" cy="230" r="15" fill="none" stroke="#A6824A" strokeWidth="2" />
          <circle cx="220" cy="230" r="15" fill="none" stroke="#A6824A" strokeWidth="2" />
          <line x1="50" y1="80" x2="50" y2="60" stroke="#A6824A" strokeWidth="2" />
          <line x1="260" y1="80" x2="260" y2="60" stroke="#A6824A" strokeWidth="2" />
          {/* Package boxes */}
          <rect x="120" y="100" width="40" height="40" fill="none" stroke="#154230" strokeWidth="1" rx="3" />
          <rect x="140" y="120" width="40" height="40" fill="none" stroke="#154230" strokeWidth="1" rx="3" />
          <line x1="125" y1="120" x2="155" y2="120" stroke="#154230" strokeWidth="0.5" />
          <line x1="140" y1="105" x2="140" y2="135" stroke="#154230" strokeWidth="0.5" />
        </svg>

        {/* Package/Box Pattern */}
        <svg className="absolute bottom-10 right-10 w-[200px] h-[200px] opacity-[0.04]" viewBox="0 0 200 200">
          <rect x="20" y="20" width="160" height="160" fill="none" stroke="#5D1E21" strokeWidth="2" rx="8" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="#5D1E21" strokeWidth="1" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="#5D1E21" strokeWidth="1" />
          <path d="M20,20 L100,100 L180,20" fill="none" stroke="#5D1E21" strokeWidth="1" />
          <path d="M20,180 L100,100 L180,180" fill="none" stroke="#5D1E21" strokeWidth="1" />
        </svg>

        {/* Currency/Dollar Pattern */}
        <svg className="absolute bottom-20 left-20 w-[150px] h-[150px] opacity-[0.04]" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r="60" fill="none" stroke="#A6824A" strokeWidth="2" />
          <circle cx="75" cy="75" r="50" fill="none" stroke="#A6824A" strokeWidth="1" />
          <text x="75" y="85" textAnchor="middle" fill="#A6824A" fontSize="40" fontFamily="serif" fontWeight="bold">$</text>
        </svg>

        {/* Floating Order Particles */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded"
            style={{
              left: `${4 + (i * 5.2)}%`,
              top: `${12 + (i % 7) * 11}%`,
              width: i % 3 === 0 ? '6px' : i % 3 === 1 ? '8px' : '10px',
              height: i % 3 === 0 ? '6px' : i % 3 === 1 ? '8px' : '10px',
              backgroundColor: i % 4 === 0 ? '#5D1E21' : i % 4 === 1 ? '#A6824A' : i % 4 === 2 ? '#154230' : '#A6824A',
              animation: `pulse ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.1 + (i % 4) * 0.04,
            }}
          />
        ))}

        {/* Truck/Delivery Pattern */}
        <svg className="absolute top-1/3 left-10 w-[120px] h-[80px] opacity-[0.04]" viewBox="0 0 120 80">
          <rect x="5" y="20" width="70" height="40" fill="none" stroke="#154230" strokeWidth="2" rx="3" />
          <rect x="75" y="30" width="35" height="30" fill="none" stroke="#154230" strokeWidth="2" rx="3" />
          <circle cx="25" cy="65" r="8" fill="none" stroke="#154230" strokeWidth="2" />
          <circle cx="55" cy="65" r="8" fill="none" stroke="#154230" strokeWidth="2" />
          <circle cx="90" cy="65" r="8" fill="none" stroke="#154230" strokeWidth="2" />
        </svg>

        {/* Wave Pattern */}
        <svg className="absolute bottom-0 left-0 right-0 h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 Q180,15 360,40 T720,40 T1080,40 T1440,40 L1440,80 L0,80 Z" fill="#154230" opacity="0.02" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#154230] rounded-xl flex items-center justify-center shadow-lg">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Order Management</h1>
            <p className="text-[#4A4A4A] text-sm">{orders.length} orders in system</p>
          </div>
        </div>
        <Link href="/marketplace" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors text-sm shadow-lg">
          <Package className="w-4 h-4" />
          New Order
        </Link>
      </div>

      {/* Orders Stats Bar */}
      <div className="flex items-center gap-6 p-4 bg-white border border-black/5 rounded-xl overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-[#154230]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{stats.total}</p>
            <p className="text-[#4A4A4A] text-xs">Total</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#A6824A]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{stats.active}</p>
            <p className="text-[#4A4A4A] text-xs">Active</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-[#154230]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">{stats.completed}</p>
            <p className="text-[#4A4A4A] text-xs">Completed</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-[#5D1E21]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">${(stats.totalValue / 1000).toFixed(0)}K</p>
            <p className="text-[#4A4A4A] text-xs">Value</p>
          </div>
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
