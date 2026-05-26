'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api-client';

interface Order {
  id: string;
  orderNumber?: string;
  status: string;
  total: number;
  buyer?: string;
  seller?: string;
  product?: string;
  quantity?: number;
  createdAt?: string;
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, isError } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await ordersApi.list();
      return response.data.data || [];
    },
    retry: false,
  });

  const orders = data || [];

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'PENDING').length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'PROCESSING').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'SHIPPED').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'DELIVERED').length },
  ];

  const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-600/20 text-amber-400',
    PROCESSING: 'bg-blue-600/20 text-blue-400',
    SHIPPED: 'bg-purple-600/20 text-purple-400',
    DELIVERED: 'bg-emerald-600/20 text-emerald-400',
    CANCELLED: 'bg-red-600/20 text-red-400',
    pending: 'bg-amber-600/20 text-amber-400',
    processing: 'bg-blue-600/20 text-blue-400',
    shipped: 'bg-purple-600/20 text-purple-400',
    delivered: 'bg-emerald-600/20 text-emerald-400',
    cancelled: 'bg-red-600/20 text-red-400',
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.orderNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.buyer || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <Link
          href="/rfqs/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          + Create Order
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Error State */}
      {isError && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-400">Failed to load orders. Please try again.</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
              <div className="h-8 bg-slate-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No orders found</p>
          <Link href="/products" className="text-blue-400 hover:text-blue-300">
            Browse products to place an order
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
              className="block bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {order.orderNumber || order.id}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[order.status] || 'bg-gray-600/20 text-gray-400'}`}>
                      {order.status}
                    </span>
                  </div>
                  {order.buyer && (
                    <p className="text-gray-400 text-sm">Buyer: {order.buyer}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">
                    ${order.total?.toFixed(2) || '0.00'}
                  </p>
                  {order.createdAt && (
                    <p className="text-gray-400 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
