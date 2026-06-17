'use client';

import { TrendingUp, TrendingDown, Eye, Users, DollarSign, Package } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const stats = [
  { label: 'Total Views', value: '12,456', change: '+15%', trend: 'up', icon: Eye },
  { label: 'Unique Visitors', value: '3,892', change: '+8%', trend: 'up', icon: Users },
  { label: 'Conversion Rate', value: '4.2%', change: '-0.3%', trend: 'down', icon: Package },
  { label: 'Revenue', value: '$45,200', change: '+22%', trend: 'up', icon: DollarSign },
];

const topProducts = [
  { name: 'Premium Basmati Rice 1121', views: 2450, inquiries: 45, orders: 8 },
  { name: 'Organic Cotton Yarn 40s', views: 1890, inquiries: 32, orders: 5 },
  { name: 'Industrial Steel Coils', views: 1234, inquiries: 28, orders: 3 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Analytics" subtitle="Track your performance" backHref="/dashboard" />

      <div className="px-4 -mt-6 space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-[#154230]" />
                  <span className="text-[#4A4A4A] text-sm">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-[#101111]">{stat.value}</p>
                <div className={`flex items-center gap-1 mt-1 ${stat.trend === 'up' ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Top Performing Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div key={i} className="p-4 bg-[#E6E2DA] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-[#101111]">{product.name}</span>
                  <span className="text-[#4A4A4A] text-sm">#{i + 1}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#4A4A4A]">
                  <span>{product.views} views</span>
                  <span>{product.inquiries} inquiries</span>
                  <span>{product.orders} orders</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="analytics" />
    </div>
  );
}
