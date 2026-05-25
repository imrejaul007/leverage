'use client';

import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/lib/api-client';

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await analyticsApi.getDashboard();
      return response.data.data;
    },
  });

  const stats = [
    { name: 'Total Revenue', value: '$124,500', change: '+12.5%', up: true },
    { name: 'Active Orders', value: '45', change: '+5', up: true },
    { name: 'Products', value: '128', change: '+12', up: true },
    { name: 'Shipments', value: '23', change: '-2', up: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-2">
          <select className="bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <p className="text-gray-400 text-sm">{stat.name}</p>
            <p className="text-3xl font-bold text-white mt-2">{isLoading ? '...' : stat.value}</p>
            <p className={`text-sm mt-2 ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {stat.change} from last period
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart placeholder
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { title: 'New order received', desc: 'Order #LBL-2024-ABC123', time: '2 min ago' },
              { title: 'Shipment delivered', desc: 'DHL shipment to Mumbai', time: '1 hour ago' },
              { title: 'Document signed', desc: 'Commercial Invoice approved', time: '3 hours ago' },
              { title: 'New RFQ response', desc: '5 new quotes for RFQ-456', time: '5 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                <div>
                  <p className="text-white text-sm">{activity.title}</p>
                  <p className="text-gray-400 text-xs">{activity.desc}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors flex items-center gap-3">
              <span className="text-blue-400">+</span> Add New Product
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors flex items-center gap-3">
              <span className="text-emerald-400">$</span> Create Invoice
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors flex items-center gap-3">
              <span className="text-cyan-400">📦</span> Track Shipment
            </button>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Pending Tasks</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300 text-sm">Verify 3 documents</span>
              <span className="badge badge-warning">Pending</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300 text-sm">Review 2 RFQ responses</span>
              <span className="badge badge-info">New</span>
            </div>
            <div className="flex items-center justify-between px-4 py-2 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300 text-sm">Complete KYC verification</span>
              <span className="badge badge-error">Action Required</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">AI Assistant</h3>
          <p className="text-gray-400 text-sm mb-4">
            Get instant help with compliance, documentation, and trade questions.
          </p>
          <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all">
            Chat with AI
          </button>
        </div>
      </div>
    </div>
  );
}
