'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All Orders', count: 24 },
    { id: 'pending', label: 'Pending', count: 5 },
    { id: 'processing', label: 'Processing', count: 8 },
    { id: 'shipped', label: 'Shipped', count: 6 },
    { id: 'delivered', label: 'Delivered', count: 5 },
  ];

  const orders = [
    { id: 'LBL-2024-001', buyer: 'TechCorp Inc.', product: 'Industrial Sensors X200', quantity: 50, total: 14999.50, status: 'processing', date: '2024-01-15' },
    { id: 'LBL-2024-002', buyer: 'Global Supplies Ltd.', product: 'Premium Steel Bearings', quantity: 200, total: 17900.00, status: 'shipped', date: '2024-01-14' },
    { id: 'LBL-2024-003', buyer: 'Manufacturing Pro', product: 'LED Display Module', quantity: 100, total: 4500.00, status: 'pending', date: '2024-01-16' },
    { id: 'LBL-2024-004', buyer: 'Industrial Solutions', product: 'Hydraulic Pump HP-500', quantity: 10, total: 12500.00, status: 'delivered', date: '2024-01-10' },
    { id: 'LBL-2024-005', buyer: 'AutoParts Unlimited', product: 'Safety Gloves (Box)', quantity: 500, total: 12495.00, status: 'processing', date: '2024-01-15' },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-600/20 text-amber-400',
    processing: 'bg-blue-600/20 text-blue-400',
    shipped: 'bg-purple-600/20 text-purple-400',
    delivered: 'bg-emerald-600/20 text-emerald-400',
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.buyer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Orders</h1>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 pl-10 border border-slate-700 focus:outline-none focus:border-blue-500"
        />
        <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Order ID</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Buyer</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Product</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Qty</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Total</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} className="border-b border-slate-700/50 hover:bg-slate-700/50">
                <td className="px-6 py-4">
                  <Link href={`/orders/${order.id}`} className="text-blue-400 hover:text-blue-300 font-mono">
                    {order.id}
                  </Link>
                </td>
                <td className="px-6 py-4 text-white">{order.buyer}</td>
                <td className="px-6 py-4 text-gray-300">{order.product}</td>
                <td className="px-6 py-4 text-gray-300">{order.quantity}</td>
                <td className="px-6 py-4 text-white font-semibold">${order.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
