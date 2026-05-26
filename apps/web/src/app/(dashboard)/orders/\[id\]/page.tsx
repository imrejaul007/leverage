'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  currency: string;
  buyer: string;
  product: string;
  quantity: string;
  createdAt: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!params.id) return;
    const orders = JSON.parse(localStorage.getItem('leverage_orders') || '[]') as Order[];
    const found = orders.find(o => o.id === params.id);
    if (found) setOrder(found);
  }, [params.id]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-500/20 text-amber-400',
    PROCESSING: 'bg-blue-500/20 text-blue-400',
    SHIPPED: 'bg-purple-500/20 text-purple-400',
    DELIVERED: 'bg-emerald-500/20 text-emerald-400',
    CANCELLED: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Link href="/orders" className="text-[#D8CCBC] hover:text-[#F4F1EA] flex items-center gap-2 text-sm">
        ← Back to Orders
      </Link>

      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#F4F1EA]">{order.orderNumber}</h1>
            <p className="text-[#D8CCBC]/60 mt-1">Created {order.createdAt}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[order.status] || ''}`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Order Details</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[#D8CCBC]/60 text-sm">Product</p>
            <p className="text-[#F4F1EA] font-medium">{order.product}</p>
          </div>
          <div>
            <p className="text-[#D8CCBC]/60 text-sm">Quantity</p>
            <p className="text-[#F4F1EA] font-medium">{order.quantity}</p>
          </div>
          <div>
            <p className="text-[#D8CCBC]/60 text-sm">Buyer</p>
            <p className="text-[#F4F1EA] font-medium">{order.buyer}</p>
          </div>
          <div>
            <p className="text-[#D8CCBC]/60 text-sm">Total Amount</p>
            <p className="text-2xl font-bold text-[#C49A6C]">{order.currency} {order.total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/documents" className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-center">View Documents</Link>
        <Link href="/messages" className="flex-1 py-3 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-medium text-center border border-[rgba(255,255,255,0.1)]">Contact Buyer</Link>
      </div>
    </div>
  );
}
