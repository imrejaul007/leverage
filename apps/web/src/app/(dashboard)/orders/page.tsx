'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Package, Clock, CheckCircle, Truck, X, FileText } from 'lucide-react';

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

const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  PENDING: { color: 'text-amber-400', bg: 'bg-amber-500/20', icon: <Clock className="w-4 h-4" /> },
  PROCESSING: { color: 'text-blue-400', bg: 'bg-blue-500/20', icon: <Package className="w-4 h-4" /> },
  SHIPPED: { color: 'text-purple-400', bg: 'bg-purple-500/20', icon: <Truck className="w-4 h-4" /> },
  DELIVERED: { color: 'text-green-400', bg: 'bg-green-500/20', icon: <CheckCircle className="w-4 h-4" /> },
  CANCELLED: { color: 'text-red-400', bg: 'bg-red-500/20', icon: <X className="w-4 h-4" /> },
};

const statusLabels: Record<string, string> = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

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

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'PENDING', label: 'Pending' },
    { id: 'PROCESSING', label: 'Processing' },
    { id: 'SHIPPED', label: 'Shipped' },
    { id: 'DELIVERED', label: 'Delivered' },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusCounts = () => ({
    all: orders.length,
    PENDING: orders.filter(o => o.status === 'PENDING').length,
    PROCESSING: orders.filter(o => o.status === 'PROCESSING').length,
    SHIPPED: orders.filter(o => o.status === 'SHIPPED').length,
    DELIVERED: orders.filter(o => o.status === 'DELIVERED').length,
  });

  const counts = getStatusCounts();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">My Orders</h1>
          <p className="text-[#D8CCBC] text-sm">{filteredOrders.length} orders</p>
        </div>
        <Link href="/rfqs/new" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl hover:bg-[#D4AA82] transition-colors">
          <Package className="w-5 h-5" />
          Create Order
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/50 focus:outline-none focus:border-[#C49A6C]"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] hover:bg-[rgba(255,255,255,0.1)]'
            }`}
          >
            {tab.label} ({counts[tab.id as keyof typeof counts]})
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 animate-pulse">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <div className="h-5 bg-[rgba(255,255,255,0.05)] rounded w-32"></div>
                  <div className="h-4 bg-[rgba(255,255,255,0.05)] rounded w-48"></div>
                </div>
                <div className="h-8 bg-[rgba(255,255,255,0.05)] rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[rgba(255,255,255,0.05)] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-[#D8CCBC]" />
          </div>
          <p className="text-[#D8CCBC] text-sm">No orders found</p>
        </div>
      )}

      {/* Orders List */}
      {!isLoading && filteredOrders.length > 0 && (
        <div className="space-y-3">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              onClick={() => setViewingOrder(order)}
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 cursor-pointer hover:border-[#C49A6C]/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#C49A6C] font-mono text-sm">{order.orderNumber}</span>
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                      {statusConfig[order.status].icon}
                      {statusLabels[order.status]}
                    </span>
                  </div>
                  <p className="text-[#F4F1EA] font-medium">{order.product}</p>
                  <p className="text-[#D8CCBC] text-sm">{order.buyer}</p>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <p className="text-xl font-bold text-emerald-400">{order.currency} {order.total.toLocaleString()}</p>
                  <p className="text-[#D8CCBC] text-xs">{order.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Order Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setViewingOrder(null)}>
          <div className="bg-[#0E3B36] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#F4F1EA]">{viewingOrder.orderNumber}</h2>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold mt-2 ${statusConfig[viewingOrder.status].bg} ${statusConfig[viewingOrder.status].color}`}>
                  {statusConfig[viewingOrder.status].icon}
                  {statusLabels[viewingOrder.status]}
                </span>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-2 text-[#D8CCBC] hover:text-white hover:bg-[rgba(255,255,255,0.1)] rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-[rgba(255,255,255,0.05)] rounded-xl">
                <div>
                  <p className="text-[#D8CCBC] text-xs mb-1">Product</p>
                  <p className="text-[#F4F1EA] font-medium">{viewingOrder.product}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC] text-xs mb-1">Quantity</p>
                  <p className="text-[#F4F1EA]">{viewingOrder.quantity}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC] text-xs mb-1">Buyer</p>
                  <p className="text-[#F4F1EA]">{viewingOrder.buyer}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC] text-xs mb-1">Total</p>
                  <p className="text-emerald-400 text-xl font-bold">{viewingOrder.currency} {viewingOrder.total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC] text-xs mb-1">Created</p>
                  <p className="text-[#F4F1EA]">{viewingOrder.createdAt}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC] text-xs mb-1">Updated</p>
                  <p className="text-[#F4F1EA]">{viewingOrder.updatedAt}</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="p-4 bg-[rgba(255,255,255,0.05)] rounded-xl">
                <p className="text-[#F4F1EA] text-sm font-semibold mb-4">Order Progress</p>
                <div className="flex items-center justify-between">
                  {['Pending', 'Processing', 'Shipped', 'Delivered'].map((status, i) => {
                    const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];
                    const isActive = statuses.indexOf(viewingOrder.status) >= i;
                    const currentIndex = statuses.indexOf(viewingOrder.status);
                    const isLast = i === 3;
                    return (
                      <div key={status} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-[#C49A6C]' : 'bg-[rgba(255,255,255,0.1)]'}`}>
                            {isActive ? <CheckCircle className="w-5 h-5 text-[#081512]" /> : <span className="text-[#D8CCBC] text-sm">{i + 1}</span>}
                          </div>
                          <span className={`text-xs mt-2 ${isActive ? 'text-[#F4F1EA]' : 'text-[#D8CCBC]'}`}>{status}</span>
                        </div>
                        {!isLast && (
                          <div className={`w-8 sm:w-16 h-0.5 mx-1 ${currentIndex >= i ? 'bg-[#C49A6C]' : 'bg-[rgba(255,255,255,0.1)]'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <Link href="/documents" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[rgba(255,255,255,0.1)] text-[#F4F1EA] font-semibold rounded-xl hover:bg-[rgba(255,255,255,0.15)] transition-colors">
                  <FileText className="w-5 h-5" />
                  Documents
                </Link>
                <Link href="/freight" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl hover:bg-[#D4AA82] transition-colors">
                  <Truck className="w-5 h-5" />
                  Track Shipment
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}