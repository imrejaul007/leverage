'use client';

import { Package, Truck, Clock, CheckCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const orders = [
  { id: 'ORD-001', product: 'Premium Basmati Rice 1121', quantity: '50 MT', buyer: 'ABC Imports Ltd', status: 'shipped', date: 'Jan 15, 2024', amount: '$42,500' },
  { id: 'ORD-002', product: 'Organic Cotton Yarn 40s', quantity: '10,000 KG', buyer: 'Euro Textile Co', status: 'processing', date: 'Jan 14, 2024', amount: '$42,000' },
  { id: 'ORD-003', product: 'Industrial Steel Coils', quantity: '200 MT', buyer: 'Pacific Steel Inc', status: 'delivered', date: 'Jan 10, 2024', amount: '$150,000' },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    shipped: 'bg-blue-100 text-blue-700',
    processing: 'bg-yellow-100 text-yellow-700',
    delivered: 'bg-green-100 text-green-700',
  };
  return styles[status] || 'bg-gray-100 text-gray-700';
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Orders" subtitle="Track your order history" backHref="/dashboard" />

      <div className="px-4 -mt-6 space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[#4A4A4A] text-sm">Order ID</p>
                <p className="font-bold text-[#101111]">{order.id}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(order.status)}`}>
                {order.status}
              </span>
            </div>
            <h3 className="font-semibold text-[#101111] mb-2">{order.product}</h3>
            <div className="flex items-center gap-4 text-sm text-[#4A4A4A] mb-3">
              <span className="flex items-center gap-1"><Package className="w-4 h-4" /> {order.quantity}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {order.date}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-black/5">
              <span className="text-[#4A4A4A] text-sm">Buyer: {order.buyer}</span>
              <span className="font-bold text-[#154230]">{order.amount}</span>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeItem="orders" />
    </div>
  );
}
