'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Megaphone,
  ArrowLeft,
  Play,
  Pause,
  Edit,
  Trash2,
  Menu,
  X,
  Bell,
  Users,
  Target,
  DollarSign,
  TrendingUp,
  Eye,
  MousePointer,
  Calendar,
  Globe,
  BarChart3,
  Zap,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: Globe },
  { name: 'Freight', href: '/freight', icon: Globe },
  { name: 'Compliance', href: '/compliance', icon: Globe },
  { name: 'AI Assistant', href: '/ai', icon: Zap },
  { name: 'Billing', href: '/billing', icon: DollarSign },
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

const campaignData = {
  id: 1,
  name: 'Summer Export Promo',
  status: 'active',
  budget: '$3,000',
  spent: '$1,845',
  reach: '850K',
  ctr: '3.2%',
  impressions: '1.2M',
  clicks: '38K',
  conversions: '1,240',
  startDate: 'June 1, 2024',
  endDate: 'June 30, 2024',
  platforms: ['LinkedIn', 'Google Ads', 'Trade Publications'],
  audience: 'Importers - USA',
};

const dailyData = [
  { date: 'Jun 1', spent: 95, reach: 28000 },
  { date: 'Jun 3', spent: 102, reach: 31000 },
  { date: 'Jun 5', spent: 88, reach: 27000 },
  { date: 'Jun 7', spent: 110, reach: 35000 },
  { date: 'Jun 9', spent: 98, reach: 29000 },
  { date: 'Jun 11', spent: 105, reach: 33000 },
  { date: 'Jun 13', spent: 115, reach: 38000 },
];

const topAds = [
  { id: 1, title: 'Export Opportunities - Q3 2024', clicks: 12500, ctr: '4.2%', status: 'active' },
  { id: 2, title: 'Trade Finance Solutions', clicks: 8200, ctr: '2.8%', status: 'active' },
  { id: 3, title: 'Freight Services - Global', clicks: 5300, ctr: '2.1%', status: 'paused' },
];

export default function CampaignDetailPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(campaignData.status === 'paused');

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-700',
      paused: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-blue-100 text-blue-700',
      draft: 'bg-gray-100 text-gray-700',
    };
    return styles[status] || styles.draft;
  };

  const budgetUsed = (parseFloat(campaignData.spent.replace('$', '').replace(',', '')) / parseFloat(campaignData.budget.replace('$', '').replace(',', ''))) * 100;

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/ads" className="flex items-center gap-3">
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
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-16">
        <div className="container mx-auto max-w-6xl">
          <Link href="/ads" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <Megaphone className="w-8 h-8" />
                <h1 className="text-2xl sm:text-3xl font-bold">{campaignData.name}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(isPaused ? 'paused' : 'active')}`}>
                  {isPaused ? 'Paused' : 'Active'}
                </span>
                <span className="text-white/70 text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {campaignData.startDate} - {campaignData.endDate}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors ${
                  isPaused
                    ? 'bg-white text-[#154230] hover:bg-white/90'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-colors">
                <Edit className="w-5 h-5" />
                Edit
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl text-white font-semibold transition-colors">
                <Trash2 className="w-5 h-5" />
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-sm text-[#4A4A4A]">Budget</span>
              </div>
              <p className="text-2xl font-bold text-[#101111]">{campaignData.budget}</p>
              <p className="text-sm text-[#4A4A4A]">Total budget</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#A6824A]" />
                </div>
                <span className="text-sm text-[#4A4A4A]">Spent</span>
              </div>
              <p className="text-2xl font-bold text-[#101111]">{campaignData.spent}</p>
              <div className="mt-2 h-2 bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#A6824A] rounded-full" style={{ width: `${budgetUsed}%` }} />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#5D1E21]" />
                </div>
                <span className="text-sm text-[#4A4A4A]">Impressions</span>
              </div>
              <p className="text-2xl font-bold text-[#101111]">{campaignData.impressions}</p>
              <p className="text-sm text-green-600">+12% this week</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
                  <MousePointer className="w-5 h-5 text-[#154230]" />
                </div>
                <span className="text-sm text-[#4A4A4A]">Clicks</span>
              </div>
              <p className="text-2xl font-bold text-[#101111]">{campaignData.clicks}</p>
              <p className="text-sm text-green-600">+8% this week</p>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#154230]" />
                Performance Over Time
              </h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#154230] text-white text-sm rounded-lg">Daily</button>
                <button className="px-3 py-1.5 bg-black/5 text-[#4A4A4A] text-sm rounded-lg hover:bg-black/10 transition-colors">Weekly</button>
                <button className="px-3 py-1.5 bg-black/5 text-[#4A4A4A] text-sm rounded-lg hover:bg-black/10 transition-colors">Monthly</button>
              </div>
            </div>
            <div className="h-64 bg-[#f7f5f1] rounded-xl flex items-end justify-around px-4 py-8">
              {dailyData.map((day, index) => (
                <div key={day.date} className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 bg-gradient-to-t from-[#154230] to-[#1d8a5a] rounded-t-md transition-all hover:from-[#1d5240] hover:to-[#2a9968]"
                    style={{ height: `${(day.spent / 120) * 200}px` }}
                  />
                  <span className="text-xs text-[#4A4A4A]">{day.date}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-[#4A4A4A]">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#154230]" />
                Daily Spend
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#A6824A]" />
                Reach
              </span>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Performing Ads */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#101111]">Top Performing Ads</h2>
                <button className="text-[#154230] hover:text-[#1d5240] font-medium text-sm flex items-center gap-1">
                  View All <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {topAds.map((ad) => (
                  <div key={ad.id} className="p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-[#101111] mb-1">{ad.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(ad.status)}`}>
                          {ad.status === 'active' ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4 text-[#4A4A4A]" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-[#4A4A4A]">Clicks</span>
                        <p className="font-bold text-[#101111]">{ad.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-xs text-[#4A4A4A]">CTR</span>
                        <p className="font-bold text-[#101111]">{ad.ctr}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Settings */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#101111] mb-6">Campaign Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <span className="text-xs text-[#4A4A4A]">Platforms</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {campaignData.platforms.map((platform) => (
                      <span key={platform} className="px-3 py-1 bg-[#154230] text-white text-xs rounded-full">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <span className="text-xs text-[#4A4A4A]">Target Audience</span>
                  <p className="font-bold text-[#101111] mt-1">{campaignData.audience}</p>
                  <Link href="/ads/audiences/importers-usa" className="text-[#154230] hover:text-[#1d5240] text-sm font-medium">
                    View Audience
                  </Link>
                </div>
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <span className="text-xs text-[#4A4A4A]">Campaign ID</span>
                  <p className="font-bold text-[#101111] mt-1">#{campaignData.id.toString().padStart(6, '0')}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-black/5">
                <Link href="/ads/analytics" className="flex items-center justify-between p-4 bg-[#154230] text-white rounded-xl hover:bg-[#1d5240] transition-colors">
                  <span className="font-semibold">View Full Analytics</span>
                  <BarChart3 className="w-5 h-5" />
                </Link>
                <Link href="/ads/ai-optimization" className="flex items-center justify-between p-4 bg-[#A6824A] text-white rounded-xl hover:bg-[#b8925a] transition-colors mt-3">
                  <span className="font-semibold">AI Optimization</span>
                  <Zap className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Scale Your Campaign</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Double your reach with our AI-powered optimization and targeting tools.
          </p>
          <Link href="/ads/ai-optimization" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Try AI Optimization
          </Link>
        </div>
      </section>

      {/* Footer - 50% Green / 50% Burgundy */}
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
