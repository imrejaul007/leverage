'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Megaphone,
  Target,
  TrendingUp,
  Eye,
  MousePointer,
  DollarSign,
  Search,
  Plus,
  ChevronRight,
  ArrowRight,
  Play,
  BarChart3,
  Users,
  Globe,
  Settings,
  Menu,
  X,
  Bell,
  User,
  Building2,
  Zap,
  Calendar,
  Filter,
  Star,
  Bookmark,
  Pause,
  PlayCircle,
  Edit3,
  Trash2,
} from 'lucide-react';

interface AdCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  startDate: string;
  endDate: string;
}

const campaigns: AdCampaign[] = [
  {
    id: '1',
    name: 'Summer Electronics Promotion',
    status: 'active',
    budget: 5000,
    spent: 2340,
    impressions: 45600,
    clicks: 1230,
    ctr: 2.7,
    conversions: 45,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
  },
  {
    id: '2',
    name: 'Textile Export Campaign',
    status: 'active',
    budget: 3000,
    spent: 1870,
    impressions: 32100,
    clicks: 890,
    ctr: 2.8,
    conversions: 32,
    startDate: '2024-05-15',
    endDate: '2024-07-15',
  },
  {
    id: '3',
    name: 'Machinery Showcase',
    status: 'paused',
    budget: 2500,
    spent: 890,
    impressions: 12400,
    clicks: 340,
    ctr: 2.7,
    conversions: 12,
    startDate: '2024-04-01',
    endDate: '2024-06-30',
  },
  {
    id: '4',
    name: 'Q1 Product Launch',
    status: 'completed',
    budget: 4000,
    spent: 4000,
    impressions: 89000,
    clicks: 2450,
    ctr: 2.8,
    conversions: 89,
    startDate: '2024-01-01',
    endDate: '2024-03-31',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-700';
    case 'paused': return 'bg-yellow-100 text-yellow-700';
    case 'completed': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const audienceTargets = [
  { label: 'Importers', count: '12.5K' },
  { label: 'Exporters', count: '8.3K' },
  { label: 'Wholesalers', count: '15.2K' },
  { label: 'Manufacturers', count: '6.8K' },
];

export default function AdsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'create'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalSpend = 5100;
  const totalImpressions = 189100;
  const totalClicks = 4910;
  const totalConversions = 178;

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-lg">
                <Megaphone className="w-4 h-4" />
                Ads
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Home</Link>
              <Link href="/marketplace" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Marketplace</Link>
              <Link href="/docs" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Documents</Link>
              <Link href="/freight" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Freight</Link>
              <Link href="/compliance" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Compliance</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/ads/campaigns/new" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-lg hover:bg-[#154230]/20 transition-colors">
                <Plus className="w-4 h-4" />
                Create Ad
              </Link>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-black/5"
            >
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
              <Target className="w-4 h-4" />
              Trade Advertising Platform
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Reach Verified Trade Businesses
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Promote your products to importers, exporters, and wholesalers on the LEVERAGE network. Target by industry, location, and trade volume.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Total Spend</div>
              <div className="text-2xl font-bold text-[#101111]">${totalSpend.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                <TrendingUp className="w-4 h-4" />
                +8.2%
              </div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Impressions</div>
              <div className="text-2xl font-bold text-[#101111]">{(totalImpressions / 1000).toFixed(1)}K</div>
              <div className="text-sm text-[#4A4A4A] mt-1">this month</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Click Rate</div>
              <div className="text-2xl font-bold text-[#101111]">{(totalClicks / totalImpressions * 100).toFixed(1)}%</div>
              <div className="text-sm text-[#4A4A4A] mt-1">avg CTR</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Conversions</div>
              <div className="text-2xl font-bold text-[#154230]">{totalConversions}</div>
              <div className="text-sm text-[#4A4A4A] mt-1">leads generated</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-20 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('campaigns')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'campaigns'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Megaphone className="w-4 h-4 inline mr-2" />
                Campaigns
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'create'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Create Ad
              </button>
            </div>

            {activeTab === 'overview' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Active Campaigns */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-[#101111]">Active Campaigns</h2>
                      <button className="text-[#154230] font-medium text-sm hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                      {campaigns.filter(c => c.status === 'active').map((campaign) => (
                        <div key={campaign.id} className="p-4 bg-[#f7f5f1] rounded-xl">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-medium text-[#101111]">{campaign.name}</div>
                              <div className="text-sm text-[#4A4A4A]">${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                              {campaign.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[#4A4A4A]">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {(campaign.impressions / 1000).toFixed(1)}K
                            </span>
                            <span className="flex items-center gap-1">
                              <MousePointer className="w-4 h-4" />
                              {campaign.clicks}
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {campaign.ctr}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Audience Insights */}
                  <div>
                    <h2 className="text-lg font-bold text-[#101111] mb-4">Your Audience</h2>
                    <div className="p-6 bg-[#f7f5f1] rounded-xl mb-4">
                      <div className="text-sm text-[#4A4A4A] mb-2">Total Reach</div>
                      <div className="text-3xl font-bold text-[#101111]">42.8K</div>
                      <div className="text-sm text-green-600 mt-1">verified trade businesses</div>
                    </div>
                    <div className="space-y-3">
                      {audienceTargets.map((target) => (
                        <div key={target.label} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                          <span className="font-medium text-[#101111]">{target.label}</span>
                          <span className="font-bold text-[#154230]">{target.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#101111]">All Campaigns</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    <Plus className="w-4 h-4" />
                    New Campaign
                  </button>
                </div>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-lg font-bold text-[#101111]">{campaign.name}</div>
                          <div className="text-sm text-[#4A4A4A] mt-1">
                            {campaign.startDate} - {campaign.endDate}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-[#4A4A4A]">Budget</div>
                          <div className="font-bold text-[#101111]">${campaign.budget.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-[#4A4A4A]">Spent</div>
                          <div className="font-bold text-[#101111]">${campaign.spent.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-[#4A4A4A]">Impressions</div>
                          <div className="font-bold text-[#101111]">{(campaign.impressions / 1000).toFixed(1)}K</div>
                        </div>
                        <div>
                          <div className="text-sm text-[#4A4A4A]">Conversions</div>
                          <div className="font-bold text-[#154230]">{campaign.conversions}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#4A4A4A]">CTR: {campaign.ctr}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {campaign.status === 'active' && (
                            <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Pause">
                              <Pause className="w-4 h-4 text-yellow-600" />
                            </button>
                          )}
                          {campaign.status === 'paused' && (
                            <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Resume">
                              <PlayCircle className="w-4 h-4 text-green-600" />
                            </button>
                          )}
                          <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Edit">
                            <Edit3 className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'create' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-6">Create New Campaign</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#101111] mb-2">Campaign Name</label>
                      <input
                        type="text"
                        placeholder="Enter campaign name..."
                        className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#101111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#101111] mb-2">Ad Type</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20">
                        <option>Product Showcase</option>
                        <option>Brand Awareness</option>
                        <option>Lead Generation</option>
                        <option>Video Ad</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#101111] mb-2">Daily Budget (USD)</label>
                      <input
                        type="number"
                        placeholder="Enter budget..."
                        className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#101111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#101111] mb-2">Start Date</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#101111] mb-2">End Date</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                        />
                      </div>
                    </div>
                    <button className="w-full py-3 bg-[#154230] text-white font-semibold rounded-xl hover:bg-[#1d5240] transition-colors">
                      Create Campaign
                    </button>
                  </div>
                  <div className="bg-[#f7f5f1] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-[#101111] mb-4">Target Audience</h3>
                    <div className="space-y-3">
                      {audienceTargets.map((target) => (
                        <label key={target.label} className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-[#E6E2DA] transition-colors">
                          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[#154230] focus:ring-[#154230]" defaultChecked />
                          <span className="flex-1 font-medium text-[#101111]">{target.label}</span>
                          <span className="text-sm text-[#4A4A4A]">{target.count}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-black/10">
                      <div className="text-sm text-[#4A4A4A]">Estimated Reach</div>
                      <div className="text-2xl font-bold text-[#154230]">42.8K businesses</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#101111] mb-8 text-center">Why Advertise on LEVERAGE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
              <div className="text-center">
                <div className="w-14 h-14 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-[#154230]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Verified Audience</h3>
                <p className="text-sm text-[#4A4A4A]">Reach only verified trade businesses, not random consumers.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#A6824A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-[#A6824A]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Precise Targeting</h3>
                <p className="text-sm text-[#4A4A4A]">Target by industry, country, trade volume, and more.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#5D1E21]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-7 h-7 text-[#5D1E21]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Real-Time Analytics</h3>
                <p className="text-sm text-[#4A4A4A]">Track impressions, clicks, and conversions in real-time.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-[#154230]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Quick Results</h3>
                <p className="text-sm text-[#4A4A4A]">Start campaigns in minutes and see results immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#101111] text-white px-4 sm:px-8 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain mb-4 brightness-0 invert" />
              <p className="text-sm text-gray-400">The Trade OS for import/export businesses.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link href="/freight" className="hover:text-white transition-colors">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; 2024 LEVERAGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}