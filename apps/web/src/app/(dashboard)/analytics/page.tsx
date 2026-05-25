'use client';

import { useState } from 'react';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30d');

  const stats = [
    { label: 'Total Revenue', value: '$847,500', change: '+12.5%', up: true },
    { label: 'Orders', value: '1,234', change: '+8.2%', up: true },
    { label: 'Average Order Value', value: '$687', change: '+4.1%', up: true },
    { label: 'Active Products', value: '342', change: '+15', up: true },
  ];

  const topProducts = [
    { name: 'Industrial Sensors X200', sales: 1250, revenue: '$374,625' },
    { name: 'Premium Steel Bearings', sales: 890, revenue: '$79,605' },
    { name: 'LED Display Module', sales: 720, revenue: '$32,400' },
    { name: 'Hydraulic Pump HP-500', sales: 145, revenue: '$181,250' },
    { name: 'Safety Gloves (Box)', sales: 2100, revenue: '$52,479' },
  ];

  const topMarkets = [
    { country: 'United States', revenue: '$425,000', percentage: 50 },
    { country: 'Germany', revenue: '$170,000', percentage: 20 },
    { country: 'United Kingdom', revenue: '$127,125', percentage: 15 },
    { country: 'Japan', revenue: '$84,750', percentage: 10 },
    { country: 'Australia', revenue: '$40,625', percentage: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-700 focus:outline-none focus:border-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            <p className={`text-sm mt-2 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {stat.change} from last period
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm w-6">{i + 1}</span>
                  <span className="text-white">{product.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{product.revenue}</p>
                  <p className="text-gray-400 text-sm">{product.sales} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Top Markets</h2>
          <div className="space-y-4">
            {topMarkets.map((market, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">{market.country}</span>
                  <span className="text-gray-400 text-sm">{market.revenue}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 rounded-full h-2"
                    style={{ width: `${market.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New order received', desc: 'Order #LBL-2024-ABC123', time: '2 min ago', type: 'order' },
            { action: 'Product viewed', desc: 'Industrial Sensors X200', time: '5 min ago', type: 'view' },
            { action: 'New RFQ', desc: 'Quote request from Germany', time: '12 min ago', type: 'rfq' },
            { action: 'Shipment delivered', desc: 'DHL to Mumbai', time: '1 hour ago', type: 'shipment' },
          ].map((activity, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'order' ? 'bg-emerald-400' :
                activity.type === 'view' ? 'bg-blue-400' :
                activity.type === 'rfq' ? 'bg-amber-400' : 'bg-cyan-400'
              }`} />
              <div>
                <p className="text-white text-sm">{activity.action}</p>
                <p className="text-gray-400 text-xs">{activity.desc}</p>
                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
