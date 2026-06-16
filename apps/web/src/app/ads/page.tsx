'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Megaphone,
  Target,
  TrendingUp,
  Users,
  Play,
  Pause,
  Plus,
  Search,
  Filter,
  BarChart3,
  Eye,
  MousePointer,
  DollarSign,
  Globe,
  Menu,
  X,
  Zap,
  Calendar,
  ChevronRight,
  MessageSquare,
  Mail,
  Bell,
  ArrowRight,
  FileText,
  Bot,
  Receipt,
  Truck,
  Shield,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'AI Assistant', href: '/ai', icon: Bot },
  { name: 'Billing', href: '/billing', icon: Receipt },
  { name: 'Ads', href: '/ads', icon: Megaphone },
  { name: 'Consultations', href: '/consultations', icon: Users },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Security', href: '/security' },
];

const campaignStats = [
  { label: 'Active Campaigns', value: '12', change: '+3', icon: Megaphone },
  { label: 'Total Reach', value: '2.4M', change: '+15%', icon: Users },
  { label: 'Engagements', value: '48K', change: '+22%', icon: MousePointer },
  { label: 'Ad Spend', value: '$8,500', change: '+8%', icon: DollarSign },
];

const activeCampaigns = [
  { id: 1, name: 'Summer Export Promo', status: 'active', budget: '$3,000', spent: '$1,845', reach: '850K', ctr: '3.2%' },
  { id: 2, name: 'Product Launch - EU', status: 'active', budget: '$5,000', spent: '$2,100', reach: '1.2M', ctr: '2.8%' },
  { id: 3, name: 'Trade Show Follow-up', status: 'paused', budget: '$1,500', spent: '$800', reach: '125K', ctr: '4.1%' },
];

const audiences = [
  { name: 'Importers - USA', size: '45K', match: '98%' },
  { name: 'Exporters - EU', size: '32K', match: '95%' },
  { name: 'Logistics Managers', size: '18K', match: '92%' },
  { name: 'Supply Chain Directors', size: '8K', match: '89%' },
];

const platforms = [
  { name: 'LinkedIn', color: '#0077B5', icon: Users, desc: 'B2B decision makers' },
  { name: 'Google Ads', color: '#4285F4', icon: Search, desc: 'Search intent targeting' },
  { name: 'Trade Publications', color: '#A6824A', icon: Globe, desc: 'Industry publications' },
  { name: 'Email', color: '#154230', icon: Mail, desc: 'Direct outreach' },
];

export default function AdsLandingPage() {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'analytics' | 'audiences'>('campaigns');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      paused: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-blue-100 text-blue-700',
      draft: 'bg-gray-100 text-gray-700',
    };
    return styles[status] || styles.draft;
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Ads</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
              <Link href="/consultations" className="nav-link font-medium">Consultations</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
              </button>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pt-4 border-t border-black/5">
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/documents" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
                <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
                <Link href="/consultations" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Consultations</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Megaphone className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Trade Advertising Platform
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Reach global buyers and sellers with targeted B2B advertising campaigns.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors">
                <Plus className="w-5 h-5" />
                New Campaign
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors">
                <Users className="w-5 h-5" />
                Create Audience
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors">
                <BarChart3 className="w-5 h-5" />
                View Reports
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {campaignStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                  <span className="text-xs text-green-300">+{stat.change} this week</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Platforms - Alternating Solid Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              const isGreen = index % 2 === 0;
              return (
                <Link key={platform.name} href={`/ads/${platform.name.toLowerCase().replace(/\s+/g, '-')}`} className={`rounded-xl p-4 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-3 ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{platform.name}</h3>
                    <p className="text-xs text-white/70">{platform.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button onClick={() => setActiveTab('campaigns')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'campaigns' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Megaphone className="w-4 h-4 inline mr-2" />
                Campaigns
              </button>
              <button onClick={() => setActiveTab('analytics')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'analytics' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Analytics
              </button>
              <button onClick={() => setActiveTab('audiences')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'audiences' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Users className="w-4 h-4 inline mr-2" />
                Audiences
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'campaigns' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#101111]">Active Campaigns</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                      <Plus className="w-4 h-4" />
                      New Campaign
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activeCampaigns.map((campaign) => (
                      <div key={campaign.id} className="p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-[#101111] mb-1">{campaign.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(campaign.status)}`}>
                              {campaign.status === 'active' ? 'Active' : 'Paused'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {campaign.status === 'active' ? (
                              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                <Pause className="w-4 h-4 text-[#4A4A4A]" />
                              </button>
                            ) : (
                              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                <Play className="w-4 h-4 text-[#154230]" />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <span className="text-xs text-[#4A4A4A]">Budget</span>
                            <p className="font-bold text-[#101111]">{campaign.budget}</p>
                          </div>
                          <div>
                            <span className="text-xs text-[#4A4A4A]">Spent</span>
                            <p className="font-bold text-[#101111]">{campaign.spent}</p>
                          </div>
                          <div>
                            <span className="text-xs text-[#4A4A4A]">Reach</span>
                            <p className="font-bold text-[#101111]">{campaign.reach}</p>
                          </div>
                          <div>
                            <span className="text-xs text-[#4A4A4A]">CTR</span>
                            <p className="font-bold text-[#101111]">{campaign.ctr}</p>
                          </div>
                        </div>
                        <div className="mt-4 h-2 bg-black/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#154230] rounded-full" style={{ width: `${(parseFloat(campaign.spent.replace('$', '').replace(',', '')) / parseFloat(campaign.budget.replace('$', '').replace(',', ''))) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#101111] mb-2">Campaign Analytics</h3>
                  <p className="text-[#4A4A4A]">Track performance across all campaigns.</p>
                </div>
              )}

              {activeTab === 'audiences' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#101111]">Saved Audiences</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                      <Plus className="w-4 h-4" />
                      Create Audience
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {audiences.map((audience) => (
                      <div key={audience.name} className="p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                            <Users className="w-6 h-6 text-[#154230]" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#101111]">{audience.name}</h3>
                            <p className="text-sm text-[#4A4A4A]">{audience.size} users</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-[#154230]">{audience.match} match</span>
                          <button className="block text-[#4A4A4A] hover:text-[#101111]">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Precision Targeting</h3>
              <p className="text-sm text-[#4A4A4A]">Reach decision makers</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">AI Optimization</h3>
              <p className="text-sm text-[#4A4A4A]">Automated bid management</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Real-Time ROI</h3>
              <p className="text-sm text-[#4A4A4A]">Track every dollar</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Global Reach</h3>
              <p className="text-sm text-[#4A4A4A]">190+ countries</p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Reach Global Trade Professionals</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Target the right audience with precision B2B advertising across multiple channels.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Start Advertising <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer - 50% Green / 50% Maroon */}
      <footer className="bg-[#154230]">
        <div className="bg-[#154230] px-4 sm:px-8 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain mb-4 brightness-0 invert" />
                <p className="text-white/70 text-sm mb-4">
                  The operating system for global trade.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Platform</h4>
                <ul className="space-y-2 text-sm">
                  {platformLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Company</h4>
                <ul className="space-y-2 text-sm">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Legal</h4>
                <ul className="space-y-2 text-sm">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/70 text-sm">
                © 2024 LEVERAGE. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy</Link>
                <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">Terms</Link>
                <Link href="/security" className="text-white/70 hover:text-white text-sm transition-colors">Security</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}