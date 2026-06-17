'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  BarChart3,
  ArrowLeft,
  Download,
  Calendar,
  Menu,
  X,
  Bell,
  TrendingUp,
  Eye,
  MousePointer,
  DollarSign,
  Users,
  Target,
  Globe,
  Megaphone,
  Zap,
  ArrowRight,
  ChevronDown,
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

const overviewStats = [
  { label: 'Total Spend', value: '$8,500', change: '+12%', icon: DollarSign, color: '#154230' },
  { label: 'Impressions', value: '2.4M', change: '+18%', icon: Eye, color: '#A6824A' },
  { label: 'Clicks', value: '48K', change: '+22%', icon: MousePointer, color: '#5D1E21' },
  { label: 'Conversions', value: '1,840', change: '+15%', icon: Target, color: '#154230' },
];

const campaignPerformance = [
  { name: 'Summer Export Promo', spend: '$1,845', impressions: '1.2M', clicks: '38K', ctr: '3.2%', conversions: '920', roas: '4.2x' },
  { name: 'Product Launch - EU', spend: '$2,100', impressions: '1.5M', clicks: '42K', ctr: '2.8%', conversions: '680', roas: '3.8x' },
  { name: 'Trade Show Follow-up', spend: '$800', impressions: '125K', clicks: '5.1K', ctr: '4.1%', conversions: '240', roas: '5.1x' },
];

const platformBreakdown = [
  { name: 'LinkedIn', spend: '$3,200', impressions: '850K', clicks: '18K', ctr: '2.1%', color: '#0077B5' },
  { name: 'Google Ads', spend: '$2,800', impressions: '1.1M', clicks: '22K', ctr: '2.0%', color: '#4285F4' },
  { name: 'Trade Publications', spend: '$1,500', impressions: '320K', clicks: '5.8K', ctr: '1.8%', color: '#A6824A' },
  { name: 'Email', spend: '$1,000', impressions: '150K', clicks: '2.2K', ctr: '1.5%', color: '#154230' },
];

const weeklyData = [
  { week: 'Week 1', spend: 1200, impressions: 320000, clicks: 6200 },
  { week: 'Week 2', spend: 1450, impressions: 380000, clicks: 7500 },
  { week: 'Week 3', spend: 1380, impressions: 410000, clicks: 8100 },
  { week: 'Week 4', spend: 1650, impressions: 450000, clicks: 9200 },
  { week: 'Week 5', spend: 1720, impressions: 480000, clicks: 9800 },
  { week: 'Week 6', spend: 1100, impressions: 260000, clicks: 5100 },
];

export default function AnalyticsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState('30d');

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
            Back to Ads
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-10 h-10" />
                <h1 className="text-3xl sm:text-4xl font-bold">Campaign Analytics</h1>
              </div>
              <p className="text-white/80 mt-2">Track performance across all your advertising campaigns.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white rounded-xl text-[#101111] font-medium appearance-none cursor-pointer"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="ytd">Year to date</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-5 py-3 bg-white text-[#154230] rounded-xl font-semibold hover:bg-white/90 transition-colors">
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Overview Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {overviewStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '15' }}>
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#101111]">{stat.value}</p>
                  <p className="text-sm text-[#4A4A4A]">{stat.label}</p>
                  <span className="text-xs text-green-600 font-medium">{stat.change} vs last period</span>
                </div>
              );
            })}
          </motion.div>

          {/* Performance Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#101111]">Performance Over Time</h2>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-[#154230] text-white text-sm rounded-lg">Spend</button>
                <button className="px-3 py-1.5 bg-black/5 text-[#4A4A4A] text-sm rounded-lg hover:bg-black/10 transition-colors">Impressions</button>
                <button className="px-3 py-1.5 bg-black/5 text-[#4A4A4A] text-sm rounded-lg hover:bg-black/10 transition-colors">Clicks</button>
              </div>
            </div>
            <div className="h-72 bg-[#f7f5f1] rounded-xl flex items-end justify-around px-4 py-8">
              {weeklyData.map((week, index) => (
                <div key={week.week} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 bg-gradient-to-t from-[#154230] to-[#1d8a5a] rounded-t-md transition-all hover:from-[#1d5240] hover:to-[#2a9968]"
                    style={{ height: `${(week.spend / 1800) * 260}px` }}
                  />
                  <span className="text-xs text-[#4A4A4A]">{week.week}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-[#4A4A4A]">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-[#154230]" />
                Daily Spend ($)
              </span>
            </div>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Campaign Performance Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#101111]">Campaign Performance</h2>
                <Link href="/ads/campaigns/new" className="text-[#154230] hover:text-[#1d5240] font-medium text-sm flex items-center gap-1">
                  View All <ChevronDown className="w-4 h-4" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black/5">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A4A4A]">Campaign</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#4A4A4A]">Spend</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#4A4A4A]">Impressions</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#4A4A4A]">Clicks</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#4A4A4A]">CTR</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#4A4A4A]">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignPerformance.map((campaign) => (
                      <tr key={campaign.name} className="border-b border-black/5 hover:bg-[#f7f5f1] transition-colors">
                        <td className="py-4 px-4">
                          <Link href={`/ads/campaigns/${campaign.name.toLowerCase().replace(/\s+/g, '-')}`} className="font-medium text-[#101111] hover:text-[#154230]">
                            {campaign.name}
                          </Link>
                        </td>
                        <td className="py-4 px-4 text-right font-medium text-[#101111]">{campaign.spend}</td>
                        <td className="py-4 px-4 text-right text-[#4A4A4A]">{campaign.impressions}</td>
                        <td className="py-4 px-4 text-right text-[#4A4A4A]">{campaign.clicks}</td>
                        <td className="py-4 px-4 text-right text-[#4A4A4A]">{campaign.ctr}</td>
                        <td className="py-4 px-4 text-right font-bold text-[#154230]">{campaign.roas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Platform Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-[#101111] mb-6">Platform Breakdown</h2>
              <div className="space-y-4">
                {platformBreakdown.map((platform) => (
                  <div key={platform.name} className="p-4 bg-[#f7f5f1] rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                        <span className="font-medium text-[#101111]">{platform.name}</span>
                      </div>
                      <span className="font-bold text-[#101111]">{platform.spend}</span>
                    </div>
                    <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(parseFloat(platform.spend.replace('$', '').replace(',', '')) / 3200) * 100}%`,
                          backgroundColor: platform.color
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-[#4A4A4A]">
                      <span>{platform.impressions} impressions</span>
                      <span>{platform.ctr} CTR</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-[#A6824A]/10 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#4A4A4A]">Average CTR</span>
                  <span className="font-bold text-[#101111]">1.9%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4A4A4A]">Average ROAS</span>
                  <span className="font-bold text-[#154230]">4.2x</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Overall Campaign ROI</h2>
                <p className="text-white/70">Track your return on ad spend across all campaigns.</p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold">4.2x</p>
                  <p className="text-sm text-white/70">Avg ROAS</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold">$35.7K</p>
                  <p className="text-sm text-white/70">Total Revenue</p>
                </div>
                <Link href="/ads/roi" className="flex items-center gap-2 px-6 py-3 bg-white text-[#154230] font-semibold rounded-xl hover:bg-white/90 transition-colors">
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Optimize Your Campaigns</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Use AI-powered insights to improve your ad performance and reduce costs.
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
                © 2026 LEVERAGE. All rights reserved.
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
