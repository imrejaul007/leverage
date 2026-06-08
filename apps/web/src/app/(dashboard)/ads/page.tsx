'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BarChart3, TrendingUp, Eye, MousePointer, DollarSign, Plus, X, Home, Search, Truck, FileText, User, MessageSquare, Settings, Bell, Menu, LogOut, Package } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    const updated = [...campaigns, campaign];
    saveCampaigns(updated);
    setNewCampaign({ name: '', budget: '', target: '', duration: '30' });
    setShowCreate(false);
  };

  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-black/5 flex items-center justify-between">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-9 h-9 bg-[#E6E2DA] rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <span className="text-[#154230] font-bold text-lg">LEVERAGE</span>
          </div>
          <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <Bell className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-2xl">Advertising</h1>
              <p className="text-white/70 text-sm mt-1">Manage your ad campaigns</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-[#154230] rounded-xl font-semibold text-sm"
            >
              <Plus className="w-5 h-5" />
              Create Campaign
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-8 py-4 lg:py-6 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="bg-white border border-black/5 rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center mb-2">
                <Eye className="w-5 h-5 text-[#154230]" />
              </div>
              <p className="text-2xl font-bold text-[#101111]">{(totalImpressions / 1000).toFixed(0)}K</p>
              <p className="text-xs text-[#4A4A4A]">Total Impressions</p>
            </div>
            <div className="bg-white border border-black/5 rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center mb-2">
                <MousePointer className="w-5 h-5 text-[#154230]" />
              </div>
              <p className="text-2xl font-bold text-[#101111]">{(totalClicks / 1000).toFixed(1)}K</p>
              <p className="text-xs text-[#4A4A4A]">Total Clicks</p>
            </div>
            <div className="bg-white border border-black/5 rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-[#154230]" />
              </div>
              <p className="text-2xl font-bold text-[#101111]">{avgCTR}%</p>
              <p className="text-xs text-[#4A4A4A]">Avg CTR</p>
            </div>
            <div className="bg-white border border-black/5 rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center mb-2">
                <DollarSign className="w-5 h-5 text-[#5D1E21]" />
              </div>
              <p className="text-2xl font-bold text-[#101111]">${totalSpent.toLocaleString()}</p>
              <p className="text-xs text-[#4A4A4A]">Total Spent</p>
            </div>
          </div>

          {/* Create Campaign Button - Mobile */}
          <button
            onClick={() => setShowCreate(true)}
            className="lg:hidden w-full py-3 bg-[#154230] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Campaign
          </button>

          {/* Campaigns List */}
          <div className="space-y-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white border border-black/5 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#101111]">{campaign.name}</h3>
                    <p className="text-xs text-[#4A4A4A]">{campaign.startDate} - {campaign.endDate}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                    campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <p className="text-sm font-bold text-[#101111]">{(campaign.impressions / 1000).toFixed(0)}K</p>
                    <p className="text-[10px] text-[#4A4A4A]">Impressions</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#101111]">{(campaign.clicks / 1000).toFixed(1)}K</p>
                    <p className="text-[10px] text-[#4A4A4A]">Clicks</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#101111]">{campaign.ctr}%</p>
                    <p className="text-[10px] text-[#4A4A4A]">CTR</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#101111]">${campaign.spent.toLocaleString()}</p>
                    <p className="text-[10px] text-[#4A4A4A]">Spent</p>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-[#E6E2DA] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#154230] rounded-full"
                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#4A4A4A] mt-1">${campaign.spent} of ${campaign.budget} budget</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-[#101111]">Create Campaign</h3>
              <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-[#E6E2DA] rounded-lg">
                <X className="w-5 h-5 text-[#4A4A4A]" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="Enter campaign name"
                  className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Budget (USD)</label>
                <input
                  type="number"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                  placeholder="Enter budget"
                  className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Duration (days)</label>
                <input
                  type="number"
                  value={newCampaign.duration}
                  onChange={(e) => setNewCampaign({ ...newCampaign, duration: e.target.value })}
                  placeholder="30"
                  className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A]"
                />
              </div>
              <button
                onClick={handleCreate}
                className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="browse" />
    </div>
  );
}
