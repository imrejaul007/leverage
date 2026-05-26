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
  quantity: string;
  createdAt: string;
}

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
  ];

  const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-500/20 text-amber-400',
    PROCESSING: 'bg-blue-500/20 text-blue-400',
    SHIPPED: 'bg-purple-500/20 text-purple-400',
    DELIVERED: 'bg-emerald-500/20 text-emerald-400',
    CANCELLED: 'bg-red-500/20 text-red-400',
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status.toLowerCase() === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">Orders</h1>
          <p className="text-[#D8CCBC]/60 text-sm">{filteredOrders.length} orders</p>
        </div>
        <Link href="/rfqs/new" className="w-full sm:w-auto px-4 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-center text-sm">
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
          className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm"
        />
        <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Tabs - Mobile scrollable */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#D8CCBC]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-[#0E3B36]/50 rounded w-24"></div>
                  <div className="h-3 bg-[#0E3B36]/50 rounded w-32"></div>
                </div>
                <div className="h-6 bg-[#0E3B36]/50 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Orders List - Mobile friendly cards */}
      {!isLoading && filteredOrders.length > 0 && (
        <div className="space-y-3">
          {filteredOrders.map(order => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block card p-4 hover:border-[#C49A6C]/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#C49A6C] font-mono text-xs sm:text-sm">{order.orderNumber}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full capitalize ${statusColors[order.status]}`}>
                      {order.status.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-[#F4F1EA] text-sm font-medium truncate">{order.product}</p>
                  <p className="text-[#C49A6C] text-xs truncate">{order.buyer}</p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <p className="text-lg sm:text-xl font-bold text-[#C49A6C]">${order.total.toLocaleString()}</p>
                  <p className="text-[#D8CCBC]/50 text-xs">{order.createdAt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <p className="text-[#D8CCBC]/50 text-sm">No orders found</p>
        </div>
      )}
    </div>
  );
}
