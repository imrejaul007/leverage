'use client';

import { useState, useEffect } from 'react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'ended';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  startDate: string;
  endDate: string;
}

export default function AdsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [newCampaign, setNewCampaign] = useState({ name: '', budget: '', target: '', duration: '30' });

  useEffect(() => {
    const stored = localStorage.getItem('leverage_campaigns');
    if (stored) {
      setCampaigns(JSON.parse(stored));
    } else {
      const initial: Campaign[] = [
        { id: '1', name: 'Spring Sale 2024', status: 'active', budget: 5000, spent: 3240, impressions: 125000, clicks: 3450, ctr: 2.76, startDate: '2024-01-01', endDate: '2024-03-31' },
        { id: '2', name: 'New Product Launch', status: 'paused', budget: 3000, spent: 1200, impressions: 45000, clicks: 890, ctr: 1.98, startDate: '2024-01-15', endDate: '2024-02-15' },
        { id: '3', name: 'Brand Awareness', status: 'active', budget: 2000, spent: 890, impressions: 200000, clicks: 2100, ctr: 1.05, startDate: '2024-01-10', endDate: '2024-04-10' },
        { id: '4', name: 'Holiday Promotion', status: 'ended', budget: 4000, spent: 4000, impressions: 180000, clicks: 5200, ctr: 2.89, startDate: '2023-12-01', endDate: '2023-12-31' },
      ];
      setCampaigns(initial);
      localStorage.setItem('leverage_campaigns', JSON.stringify(initial));
    }
  }, []);

  const saveCampaigns = (data: Campaign[]) => {
    setCampaigns(data);
    localStorage.setItem('leverage_campaigns', JSON.stringify(data));
  };

  const handleCreate = () => {
    if (!newCampaign.name || !newCampaign.budget) return;
    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      status: 'active',
      budget: parseFloat(newCampaign.budget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + parseInt(newCampaign.duration) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
    saveCampaigns([campaign, ...campaigns]);
    setShowCreate(false);
    setNewCampaign({ name: '', budget: '', target: '', duration: '30' });
  };

  const toggleStatus = (id: string) => {
    const updated = campaigns.map(c => {
      if (c.id === id) {
        return { ...c, status: (c.status === 'active' ? 'paused' : 'active') as 'active' | 'paused' | 'ended' };
      }
      return c;
    });
    saveCampaigns(updated);
  };

  const stats = {
    active: campaigns.filter(c => c.status === 'active').length,
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    totalImpressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    avgCtr: campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length : 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F4F1EA]">Ad Campaigns</h1>
          <p className="text-[#D8CCBC]/60 text-sm">Manage your advertising campaigns</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="px-4 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-sm">
          + Create Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Active', value: stats.active },
          { label: 'Budget', value: `$${stats.totalBudget.toLocaleString()}` },
          { label: 'Spent', value: `$${stats.totalSpent.toLocaleString()}` },
          { label: 'Impressions', value: (stats.totalImpressions / 1000).toFixed(0) + 'K' },
          { label: 'Avg CTR', value: stats.avgCtr.toFixed(2) + '%' },
        ].map((stat, i) => (
          <div key={i} className="card">
            <p className="text-[#D8CCBC]/60 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-[#F4F1EA] mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Campaigns */}
      <div className="space-y-4">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${campaign.status === 'active' ? 'bg-emerald-400' : campaign.status === 'paused' ? 'bg-amber-400' : 'bg-gray-400'}`} />
                <div>
                  <h3 className="text-[#F4F1EA] font-semibold">{campaign.name}</h3>
                  <p className="text-[#D8CCBC]/50 text-sm">{campaign.startDate} - {campaign.endDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleStatus(campaign.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {campaign.status === 'active' ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={() => setSelectedCampaign(campaign)}
                  className="px-3 py-1.5 bg-[#0E3B36] text-[#F4F1EA] rounded-lg text-xs font-medium"
                >
                  View
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
              <div>
                <p className="text-[#D8CCBC]/50 text-xs">Budget</p>
                <p className="text-[#F4F1EA] font-semibold">${campaign.budget.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[#D8CCBC]/50 text-xs">Spent</p>
                <p className="text-[#F4F1EA] font-semibold">${campaign.spent.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[#D8CCBC]/50 text-xs">Impressions</p>
                <p className="text-[#F4F1EA] font-semibold">{(campaign.impressions / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-[#D8CCBC]/50 text-xs">CTR</p>
                <p className="text-[#C49A6C] font-semibold">{campaign.ctr.toFixed(2)}%</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C49A6C] rounded-full"
                  style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-[#F4F1EA] mb-4">Create Campaign</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  className="w-full input"
                  placeholder="e.g., Spring Sale 2024"
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Budget (USD)</label>
                <input
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                  className="w-full input"
                  placeholder="1000"
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Duration (days)</label>
                <select
                  value={newCampaign.duration}
                  onChange={(e) => setNewCampaign({ ...newCampaign, duration: e.target.value })}
                  className="w-full input"
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowCreate(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">Cancel</button>
                <button onClick={handleCreate} className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#F4F1EA]">{selectedCampaign.name}</h2>
              <button onClick={() => setSelectedCampaign(null)} className="text-[#D8CCBC] hover:text-[#F4F1EA]">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <p className="text-[#D8CCBC]/50 text-xs">Impressions</p>
                <p className="text-2xl font-bold text-[#F4F1EA]">{selectedCampaign.impressions.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <p className="text-[#D8CCBC]/50 text-xs">Clicks</p>
                <p className="text-2xl font-bold text-[#F4F1EA]">{selectedCampaign.clicks.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <p className="text-[#D8CCBC]/50 text-xs">CTR</p>
                <p className="text-2xl font-bold text-[#C49A6C]">{selectedCampaign.ctr.toFixed(2)}%</p>
              </div>
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl">
                <p className="text-[#D8CCBC]/50 text-xs">Spent / Budget</p>
                <p className="text-2xl font-bold text-[#F4F1EA]">${selectedCampaign.spent}/${selectedCampaign.budget}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
