'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  rfqs: number;
  orders: number;
  documents: number;
  shipments: number;
  revenue: number;
  consultations: number;
  activeBuyers: number;
}

interface RecentActivity {
  id: string;
  type: 'rfq' | 'payment' | 'document' | 'partner';
  text: string;
  time: string;
  status: 'pending' | 'completed' | 'new' | 'sent';
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    rfqs: 0,
    orders: 0,
    documents: 0,
    shipments: 0,
    revenue: 24500000,
    consultations: 0,
    activeBuyers: 892,
  });

  const recentActivity: RecentActivity[] = [
    { id: '1', type: 'rfq', text: 'New RFQ from Germany - Industrial Equipment', time: '5 min ago', status: 'pending' },
    { id: '2', type: 'payment', text: 'Payment received - $125,000 USD', time: '12 min ago', status: 'completed' },
    { id: '3', type: 'document', text: 'Invoice #INV-2024-089 verified', time: '1 hour ago', status: 'completed' },
    { id: '4', type: 'rfq', text: 'Quote sent to Singapore - $45,000', time: '2 hours ago', status: 'sent' },
    { id: '5', type: 'partner', text: 'New partner verified: Tokyo Trading Co.', time: '3 hours ago', status: 'new' },
  ];

  const quickActions = [
    { label: 'Create RFQ', icon: '📋', href: '/rfqs/new', color: 'bg-[#C49A6C]' },
    { label: 'Upload Document', icon: '📄', href: '/documents', color: 'bg-[#0E3B36]' },
    { label: 'Book Shipment', icon: '🚢', href: '/freight', color: 'bg-[#0E3B36]' },
    { label: 'AI Assistant', icon: '🤖', href: '/ai', color: 'bg-[#0E3B36]' },
  ];

  useEffect(() => {
    // Load counts from localStorage
    const rfqs = JSON.parse(localStorage.getItem('leverage_rfqs') || '[]');
    const orders = JSON.parse(localStorage.getItem('leverage_orders') || '[]');
    const documents = JSON.parse(localStorage.getItem('leverage_documents') || '[]');
    const shipments = JSON.parse(localStorage.getItem('leverage_shipments') || '[]');

    // Initialize with default data if empty
    if (rfqs.length === 0) {
      localStorage.setItem('leverage_rfqs', JSON.stringify([
        { id: '1', title: 'Industrial Sensors X200', status: 'PENDING', buyer: 'Tokyo Trading Co.', amount: 85000, createdAt: '2024-01-20' },
        { id: '2', title: 'Cotton Yarn 40/1', status: 'SENT', buyer: 'Berlin Imports GmbH', amount: 45000, createdAt: '2024-01-19' },
      ]));
    }
    if (orders.length === 0) {
      localStorage.setItem('leverage_orders', JSON.stringify([
        { id: '1', orderNumber: 'ORD-2024-001', status: 'SHIPPED', total: 85000, currency: 'USD', buyer: 'Tokyo Trading Co.', product: 'Premium Basmati Rice', quantity: '100 MT', createdAt: '2024-01-15', updatedAt: '2024-01-18' },
        { id: '2', orderNumber: 'ORD-2024-002', status: 'PROCESSING', total: 125000, currency: 'USD', buyer: 'Berlin Imports GmbH', product: 'Solar Panels', quantity: '500 units', createdAt: '2024-01-18', updatedAt: '2024-01-20' },
      ]));
    }
    if (documents.length === 0) {
      localStorage.setItem('leverage_documents', JSON.stringify([
        { id: '1', name: 'Commercial Invoice - Order #1234', type: 'INVOICE', status: 'VALIDATED', createdAt: '2024-01-20', updatedAt: '2024-01-20', fileSize: '245 KB' },
        { id: '2', name: 'Bill of Lading - Shipment #5678', type: 'BILL_OF_LADING', status: 'PENDING', createdAt: '2024-01-19', updatedAt: '2024-01-19', fileSize: '128 KB' },
      ]));
    }
    if (shipments.length === 0) {
      localStorage.setItem('leverage_shipments', JSON.stringify([
        { id: 'SHP-001', trackingNumber: 'MSKU1234567890', container: 'MSKU1234567', origin: 'Shanghai, China', destination: 'Los Angeles, USA', status: 'in_transit', eta: '2024-02-15', carrier: 'Maersk Line', createdAt: '2024-01-15', lastUpdate: '2024-01-20' },
      ]));
    }

    // Update stats from localStorage
    const updatedRfqs = JSON.parse(localStorage.getItem('leverage_rfqs') || '[]');
    const updatedOrders = JSON.parse(localStorage.getItem('leverage_orders') || '[]');
    const updatedDocs = JSON.parse(localStorage.getItem('leverage_documents') || '[]');
    const updatedShipments = JSON.parse(localStorage.getItem('leverage_shipments') || '[]');

    setStats(prev => ({
      ...prev,
      rfqs: updatedRfqs.length + 125,
      orders: updatedOrders.length + 127,
      documents: updatedDocs.length + 45,
      shipments: updatedShipments.length + 12,
    }));

    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-500/20 text-amber-400',
    completed: 'bg-emerald-500/20 text-emerald-400',
    new: 'bg-blue-500/20 text-blue-400',
    sent: 'bg-purple-500/20 text-purple-400',
  };

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
          <h1 className="text-2xl font-bold text-[#F4F1EA]">Welcome back</h1>
          <p className="text-[#D8CCBC]/60 text-sm">Here's your business overview</p>
        </div>
        <div className="flex gap-2">
          <Link href="/ai" className="px-4 py-2 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-medium text-sm hover:bg-[#0f4a42] transition-colors">
            AI Assistant
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active RFQs', value: stats.rfqs, icon: '📋', color: 'text-blue-400' },
          { label: 'Total Orders', value: stats.orders.toLocaleString(), icon: '📦', color: 'text-purple-400' },
          { label: 'Revenue', value: `$${(stats.revenue / 1000000).toFixed(1)}M`, icon: '💰', color: 'text-emerald-400' },
          { label: 'Active Shipments', value: stats.shipments, icon: '🚢', color: 'text-amber-400' },
        ].map((stat, i) => (
          <div key={i} className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-xs font-medium ${stat.color}`}>Live</span>
            </div>
            <p className="text-3xl font-bold text-[#F4F1EA]">{stat.value}</p>
            <p className="text-[#D8CCBC]/50 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-[rgba(255,255,255,0.02)] rounded-xl">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'rfq' ? 'bg-blue-500/20' :
                  activity.type === 'payment' ? 'bg-emerald-500/20' :
                  activity.type === 'document' ? 'bg-purple-500/20' :
                  'bg-amber-500/20'
                }`}>
                  <span className={
                    activity.type === 'rfq' ? 'text-blue-400' :
                    activity.type === 'payment' ? 'text-emerald-400' :
                    activity.type === 'document' ? 'text-purple-400' :
                    'text-amber-400'
                  }>
                    {activity.type === 'rfq' ? '📋' :
                     activity.type === 'payment' ? '💰' :
                     activity.type === 'document' ? '📄' : '🤝'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F4F1EA] font-medium truncate">{activity.text}</p>
                  <p className="text-[#D8CCBC]/50 text-sm">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[activity.status]}`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex flex-col items-center gap-3 p-4 bg-[rgba(255,255,255,0.02)] rounded-xl hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                <span className="text-3xl">{action.icon}</span>
                <span className="text-[#F4F1EA] text-sm font-medium text-center">{action.label}</span>
              </Link>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)]">
            <h3 className="text-[#F4F1EA] font-medium mb-4">At a Glance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#D8CCBC]/50">Documents</span>
                <span className="text-[#F4F1EA] font-medium">{stats.documents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#D8CCBC]/50">Active Buyers</span>
                <span className="text-[#F4F1EA] font-medium">{stats.activeBuyers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#D8CCBC]/50">Consultations</span>
                <span className="text-[#F4F1EA] font-medium">{stats.consultations || 48}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
