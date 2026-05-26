'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  shippingAddress?: { name: string; address: string; city: string; country: string; phone: string };
  items?: Array<{ name: string; sku: string; quantity: number; price: number }>;
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-500/20 text-amber-400',
  PROCESSING: 'bg-blue-500/20 text-blue-400',
  SHIPPED: 'bg-purple-500/20 text-purple-400',
  DELIVERED: 'bg-emerald-500/20 text-emerald-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
};

const statusLabels: Record<string, string> = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

const timelineSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = params.id as string;
    const stored = localStorage.getItem('leverage_orders');
    if (stored) {
      const orders: Order[] = JSON.parse(stored);
      const found = orders.find(o => o.id === id);
      setOrder(found || null);
    }
    setIsLoading(false);
  }, [params.id]);

  const getCurrentStep = () => {
    if (!order) return 0;
    const index = timelineSteps.indexOf(statusLabels[order.status]);
    return index >= 0 ? index : 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#081512] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/orders" className="text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Link>
          <h1 className="text-2xl font-bold text-[#F4F1EA]">Order Not Found</h1>
        </div>
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-3xl">📋</span></div>
          <p className="text-[#D8CCBC]/50 mb-4">This order does not exist or has been removed.</p>
          <Link href="/orders" className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">Back to Orders</Link>
        </div>
      </div>
    );
  }

  const currentStep = getCurrentStep();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/orders" className="text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#F4F1EA]">{order.orderNumber}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>{statusLabels[order.status]}</span>
          </div>
          <p className="text-[#D8CCBC]/50 text-sm mt-1">Placed on {order.createdAt}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-[#F4F1EA] mb-6">Order Timeline</h2>
            <div className="flex items-center justify-between">
              {timelineSteps.map((step, index) => {
                const isActive = index <= currentStep;
                const isCompleted = index < currentStep;
                return (
                  <div key={step} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${isCompleted ? 'bg-emerald-500 text-white' : isActive ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[rgba(255,255,255,0.1)] text-[#D8CCBC]/50'}`}>
                        {isCompleted ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> : index + 1}
                      </div>
                      <span className={`text-xs mt-2 ${isActive ? 'text-[#F4F1EA]' : 'text-[#D8CCBC]/50'}`}>{step}</span>
                    </div>
                    {index < timelineSteps.length - 1 && <div className={`flex-1 h-1 mx-2 rounded ${index < currentStep ? 'bg-emerald-500' : 'bg-[rgba(255,255,255,0.1)]'}`} />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items ? order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#0E3B36]/50 rounded-lg flex items-center justify-center"><span className="text-2xl opacity-50">📦</span></div>
                    <div><p className="text-[#F4F1EA] font-medium">{item.name}</p><p className="text-[#D8CCBC]/50 text-sm">SKU: {item.sku}</p></div>
                  </div>
                  <div className="text-right"><p className="text-[#F4F1EA]">{item.quantity} x ${item.price.toLocaleString()}</p><p className="text-[#C49A6C] font-semibold">${(item.quantity * item.price).toLocaleString()}</p></div>
                </div>
              )) : (
                <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#0E3B36]/50 rounded-lg flex items-center justify-center"><span className="text-2xl opacity-50">📦</span></div>
                    <div><p className="text-[#F4F1EA] font-medium">{order.product}</p><p className="text-[#D8CCBC]/50 text-sm">{order.quantity}</p></div>
                  </div>
                  <div className="text-right"><p className="text-[#C49A6C] font-semibold">{order.currency} {order.total.toLocaleString()}</p></div>
                </div>
              )}
            </div>
            <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)]">
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-[#D8CCBC]/50">Subtotal</span><span className="text-[#F4F1EA]">{order.currency} {order.total.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#D8CCBC]/50">Shipping</span><span className="text-[#F4F1EA]">$0.00</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#D8CCBC]/50">Tax</span><span className="text-[#F4F1EA]">$0.00</span></div>
                <div className="flex justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]"><span className="text-[#F4F1EA] font-semibold">Total</span><span className="text-[#C49A6C] font-bold text-xl">{order.currency} {order.total.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-[#F4F1EA] font-semibold mb-4">Buyer Information</h3>
            <div className="space-y-3"><div><p className="text-[#D8CCBC]/50 text-xs">Company</p><p className="text-[#F4F1EA]">{order.buyer}</p></div></div>
          </div>

          <div className="card">
            <h3 className="text-[#F4F1EA] font-semibold mb-4">Shipping Address</h3>
            {order.shippingAddress ? (
              <div className="space-y-1">
                <p className="text-[#F4F1EA] font-medium">{order.shippingAddress.name}</p>
                <p className="text-[#D8CCBC]/70 text-sm">{order.shippingAddress.address}</p>
                <p className="text-[#D8CCBC]/70 text-sm">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                <p className="text-[#D8CCBC]/50 text-sm mt-2">{order.shippingAddress.phone}</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-[#F4F1EA] font-medium">{order.buyer}</p>
                <p className="text-[#D8CCBC]/70 text-sm">123 Business Park Drive</p>
                <p className="text-[#D8CCBC]/70 text-sm">San Francisco, CA 94105</p>
                <p className="text-[#D8CCBC]/70 text-sm">United States</p>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="text-[#F4F1EA] font-semibold mb-4">Order Details</h3>
            <dl className="space-y-3">
              <div><dt className="text-[#D8CCBC]/50 text-xs">Order Number</dt><dd className="text-[#F4F1EA] font-mono">{order.orderNumber}</dd></div>
              <div><dt className="text-[#D8CCBC]/50 text-xs">Created</dt><dd className="text-[#F4F1EA]">{order.createdAt}</dd></div>
              <div><dt className="text-[#D8CCBC]/50 text-xs">Last Updated</dt><dd className="text-[#F4F1EA]">{order.updatedAt}</dd></div>
            </dl>
          </div>

          <div className="card">
            <h3 className="text-[#F4F1EA] font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              <Link href="/documents" className="flex items-center justify-center gap-2 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>View Documents</Link>
              <Link href="/messages" className="flex items-center justify-center gap-2 py-3 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-medium hover:bg-[#0E3B36]/80 transition-colors border border-[rgba(255,255,255,0.1)]"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>Message Buyer</Link>
              <button className="w-full py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.1)]">Download Invoice</button>
              {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && <button className="w-full py-3 bg-red-500/10 text-red-400 rounded-xl font-medium hover:bg-red-500/20 transition-colors border border-red-500/20">Cancel Order</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
