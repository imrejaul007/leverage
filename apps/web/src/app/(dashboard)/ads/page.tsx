'use client';

import Link from 'next/link';

export default function AdsPage() {
  const campaigns = [
    { id: '1', name: 'Spring Sale 2024', status: 'active', budget: 5000, spent: 3240, impressions: 125000, clicks: 3450, ctr: 2.76, cpc: 0.94 },
    { id: '2', name: 'New Product Launch', status: 'paused', budget: 3000, spent: 1200, impressions: 45000, clicks: 890, ctr: 1.98, cpc: 1.35 },
    { id: '3', name: 'Brand Awareness', status: 'active', budget: 2000, spent: 890, impressions: 200000, clicks: 2100, ctr: 1.05, cpc: 0.42 },
    { id: '4', name: 'Holiday Promotion', status: 'ended', budget: 4000, spent: 4000, impressions: 180000, clicks: 5200, ctr: 2.89, cpc: 0.77 },
  ];

  const statusColors: Record<string, string> = {
    active: 'bg-emerald-600/20 text-emerald-400',
    paused: 'bg-amber-600/20 text-amber-400',
    ended: 'bg-gray-600/20 text-gray-400',
  };

  const totalStats = {
    activeCampaigns: 2,
    totalBudget: 14000,
    totalSpent: 9330,
    totalImpressions: 550000,
    avgCtr: 2.17,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Ad Campaigns</h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          + Create Campaign
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Active Campaigns</p>
          <p className="text-2xl font-bold text-white mt-1">{totalStats.activeCampaigns}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Total Budget</p>
          <p className="text-2xl font-bold text-white mt-1">${totalStats.totalBudget.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Total Spent</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">${totalStats.totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Impressions</p>
          <p className="text-2xl font-bold text-white mt-1">{(totalStats.totalImpressions / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Avg CTR</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{totalStats.avgCtr}%</p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Campaign</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Budget</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Spent</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Impressions</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Clicks</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">CTR</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">CPC</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-slate-700/50 hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <Link href={`/ads/${campaign.id}`} className="text-white hover:text-blue-400 font-medium">
                      {campaign.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">${campaign.budget.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-white">${campaign.spent.toLocaleString()}</span>
                      <div className="w-16 h-1 bg-slate-600 rounded-full mt-1">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{(campaign.impressions / 1000).toFixed(0)}K</td>
                  <td className="px-6 py-4 text-gray-300">{campaign.clicks.toLocaleString()}</td>
                  <td className="px-6 py-4 text-emerald-400">{campaign.ctr}%</td>
                  <td className="px-6 py-4 text-white">${campaign.cpc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
