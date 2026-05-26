'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  total: number;
  buyer: string;
  product: string;
  quantity: number;
  createdAt: string;
}

// Mock data for demo
const mockOrders: Order[] = [
  { id: '1', orderNumber: 'ORD-2024-001', status: 'SHIPPED', total: 85000, buyer: 'Tokyo Trading Co.', product: 'Premium Basmati Rice', quantity: '100 MT', createdAt: '2024-01-15' },
  { id: '2', orderNumber: 'ORD-2024-002', status: 'PROCESSING', total: 125000, buyer: 'Berlin Imports GmbH', product: 'Solar Panels - 550W', quantity: '500 units', createdAt: '2024-01-18' },
  { id: '3', orderNumber: 'ORD-2024-003', status: 'PENDING', total: 45000, buyer: 'Singapore Logistics Pte', product: 'Cotton Yarn 40/1', quantity: '15 MT', createdAt: '2024-01-20' },
  { id: '4', orderNumber: 'ORD-2024-004', status: 'DELIVERED', total: 620000, buyer: 'Dubai Trading LLC', product: 'Steel Billets', quantity: '1000 MT', createdAt: '2024-01-10' },
  { id: '5', orderNumber: 'ORD-2024-005', status: 'PROCESSING', total: 22500, buyer: 'Mumbai Pharma Ltd', product: 'Pharmaceutical Raw Materials', quantity: '500 kg', createdAt: '2024-01-19' },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'PENDING').length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'PROCESSING').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'SHIPPED').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'DELIVERED').length },
  ];

  const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-500/20 text-amber-400',
    PROCESSING: 'bg-blue-500/20 text-blue-400',
    SHIPPED: 'bg-purple-500/20 text-purple-400',
    DELIVERED: 'bg-emerald-500/20 text-emerald-400',
    CANCELLED: 'bg-red-500/20 text-red-400',
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F4F1EA] mb-2">Orders</h1>
          <p className="text-[#D8CCBC]/60">Manage your orders and track shipments</p>
        </div>
        <Link href="/rfqs/new" className="px-6 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
          + Create Order
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input w-full pl-10"
        />
        <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#D8CCBC] hover:bg-[#0E3B36]/80'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-3">
                  <div className="h-5 bg-[#0E3B36]/50 rounded w-32"></div>
                  <div className="h-4 bg-[#0E3B36]/50 rounded w-48"></div>
                </div>
                <div className="h-8 bg-[#0E3B36]/50 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredOrders.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📋</span>
          </div>
          <p className="text-[#D8CCBC]/50 text-lg mb-4">No orders found</p>
          <Link href="/products" className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">
            Browse products
          </Link>
        </div>
      )}

      {/* Orders List */}
      {!isLoading && filteredOrders.length > 0 && (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="card hover:border-[#C49A6C]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-[#F4F1EA] font-semibold">{order.orderNumber}</h3>
                    <span className={`px-3 py-1 text-xs rounded-full capitalize ${statusColors[order.status]}`}>
                      {order.status.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-[#D8CCBC]/50 text-sm">{order.product} • {order.quantity}</p>
                  <p className="text-[#C49A6C] text-sm">Buyer: {order.buyer}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#C49A6C]">${order.total.toLocaleString()}</p>
                  <p className="text-[#D8CCBC]/50 text-sm">{order.createdAt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
