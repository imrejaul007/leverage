'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ArrowLeft,
  Download,
  Calendar,
  Menu,
  X,
  Bell,
  DollarSign,
  Target,
  Users,
  Globe,
  BarChart3,
  ArrowRight,
  ChevronDown,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: Globe },
  { name: 'Freight', href: '/freight', icon: Globe },
  { name: 'Compliance', href: '/compliance', icon: Globe },
  { name: 'AI Assistant', href: '/ai', icon: TrendingUp },
  { name: 'Billing', href: '/billing', icon: DollarSign },
  { name: 'Ads', href: '/ads', icon: TrendingUp },
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

const roiMetrics = [
  { label: 'Total Revenue', value: '$42,500', change: '+28%', icon: DollarSign, color: '#154230' },
  { label: 'Total Spend', value: '$8,500', change: '+8%', icon: TrendingUp, color: '#A6824A' },
  { label: 'ROAS', value: '5.0x', change: '+18%', icon: Target, color: '#5D1E21' },
  { label: 'CPA', value: '$4.62', change: '-12%', icon: Users, color: '#154230' },
];

const campaignROI = [
  { name: 'Summer Export Promo', spend: '$1,845', revenue: '$9,850', roas: '5.3x', status: 'excellent', conversions: 920 },
  { name: 'Product Launch - EU', spend: '$2,100', revenue: '$8,200', roas: '3.9x', status: 'good', conversions: 680 },
  { name: 'Trade Show Follow-up', spend: '$800', revenue: '$4,800', roas: '6.0x', status: 'excellent', conversions: 240 },
  { name: 'Q3 Trade Campaign', spend: '$3,755', revenue: '$19,650', roas: '5.2x', status: 'excellent', conversions: 1840 },
];

const monthlyData = [
  { month: 'Jan', spend: 5800, revenue: 24500, roas: 4.2 },
  { month: 'Feb', spend: 6200, revenue: 28200, roas: 4.5 },
  { month: 'Mar', spend: 7100, revenue: 32500, roas: 4.6 },
  { month: 'Apr', spend: 7800, revenue: 35800, roas: 4.6 },
  { month: 'May', spend: 8200, revenue: 38900, roas: 4.7 },
  { month: 'Jun', spend: 8500, revenue: 42500, roas: 5.0 },
];

const conversionFunnel = [
  { stage: 'Impressions', value: '2.4M', rate: '100%' },
  { stage: 'Clicks', value: '48K', rate: '2.0%' },
  { stage: 'Landing Page Views', value: '28K', rate: '58%' },
  { stage: 'Leads', value: '4.2K', rate: '15%' },
  { stage: 'Conversions', value: '1.84K', rate: '44%' },
];

export default function ROIPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState('6m');

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      excellent: 'bg-green-100 text-green-700',
      good: 'bg-blue-100 text-blue-700',
      average: 'bg-yellow-100 text-yellow-700',
      poor: 'bg-red-100 text-red-700',
    };
    return styles[status] || styles.average;
  };

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
                <TrendingUp className="w-10 h-10" />
                <h1 className="text-3xl sm:text-4xl font-bold">ROI Tracking</h1>
              </div>
              <p className="text-white/80 mt-2">Track your advertising spend and returns across all campaigns.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white rounded-xl text-[#101111] font-medium appearance-none cursor-pointer"
                >
                  <option value="30d">Last 30 days</option>
                  <option value="3m">Last 3 months</option>
                  <option value="6m">Last 6 months</option>
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
          {/* ROI Metrics */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {roiMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: metric.color + '15' }}>
                      <Icon className="w-5 h-5" style={{ color: metric.color }} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-[#101111]">{metric.value}</p>
                  <p className="text-sm text-[#4A4A4A]">{metric.label}</p>
                  <span className={`text-xs font-medium ${metric.change.startsWith('+') ? 'text-green-600' : 'text-green-600'}`}>
                    {metric.change} vs last period
                  </span>
                </div>
              );
            })}
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* ROAS Trend Chart */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#101111]">Revenue vs Spend Trend</h2>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-[#154230] text-white text-sm rounded-lg">ROAS</button>
                    <button className="px-3 py-1.5 bg-black/5 text-[#4A4A4A] text-sm rounded-lg hover:bg-black/10 transition-colors">Revenue</button>
                  </div>
                </div>
                <div className="h-64 bg-[#f7f5f1] rounded-xl p-4">
                  <div className="flex items-end justify-around h-full gap-2">
                    {monthlyData.map((month, index) => (
                      <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex gap-1 items-end" style={{ height: '80%' }}>
                          <div
                            className="flex-1 bg-[#154230] rounded-t-md transition-all hover:bg-[#1d5240]"
                            style={{ height: `${(month.revenue / 45000) * 100}%` }}
                            title={`Revenue: $${month.revenue.toLocaleString()}`}
                          />
                          <div
                            className="flex-1 bg-[#A6824A] rounded-t-md transition-all hover:bg-[#b8925a]"
                            style={{ height: `${(month.spend / 45000) * 100}%` }}
                            title={`Spend: $${month.spend.toLocaleString()}`}
                          />
                        </div>
                        <span className="text-xs text-[#4A4A4A]">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4 text-sm text-[#4A4A4A]">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#154230]" />
                    Revenue
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[#A6824A]" />
                    Ad Spend
                  </span>
                </div>
              </motion.div>

              {/* Campaign ROI Table */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#101111]">Campaign Performance</h2>
                  <Link href="/ads/analytics" className="text-[#154230] hover:text-[#1d5240] font-medium text-sm flex items-center gap-1">
                    View All <ChevronDown className="w-4 h-4" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-black/5">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A4A4A]">Campaign</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#4A4A4A]">Spend</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#4A4A4A]">Revenue</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#4A4A4A]">ROAS</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-[#4A4A4A]">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignROI.map((campaign) => (
                        <tr key={campaign.name} className="border-b border-black/5 hover:bg-[#f7f5f1] transition-colors">
                          <td className="py-4 px-4">
                            <Link href={`/ads/campaigns/${campaign.name.toLowerCase().replace(/\s+/g, '-')}`} className="font-medium text-[#101111] hover:text-[#154230]">
                              {campaign.name}
                            </Link>
                          </td>
                          <td className="py-4 px-4 text-right text-[#4A4A4A]">{campaign.spend}</td>
                          <td className="py-4 px-4 text-right font-medium text-[#101111]">{campaign.revenue}</td>
                          <td className="py-4 px-4 text-right font-bold text-[#154230]">{campaign.roas}</td>
                          <td className="py-4 px-4 text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(campaign.status)}`}>
                              {campaign.status === 'excellent' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                              {campaign.status === 'excellent' ? 'Excellent' : 'Good'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Conversion Funnel */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#154230]" />
                  Conversion Funnel
                </h3>
                <div className="space-y-3">
                  {conversionFunnel.map((stage, index) => (
                    <div key={stage.stage} className="relative">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[#4A4A4A]">{stage.stage}</span>
                        <div className="text-right">
                          <span className="font-bold text-[#101111]">{stage.value}</span>
                          <span className="text-xs text-[#4A4A4A] ml-2">{stage.rate}</span>
                        </div>
                      </div>
                      <div className="h-3 bg-black/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#154230] to-[#1d8a5a] rounded-full transition-all"
                          style={{ width: `${100 - (index * 15)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Key Insights */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-[#154230] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Key Insights
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Your ROAS has increased 19% compared to last month.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Trade Show campaign has highest ROAS at 6.0x.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">Consider increasing budget for top-performing campaigns.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Quick Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-[#101111] mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-[#f7f5f1] rounded-xl">
                    <p className="text-sm text-[#4A4A4A]">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-[#101111]">$23.10</p>
                    <p className="text-xs text-green-600">+12% vs last period</p>
                  </div>
                  <div className="p-4 bg-[#f7f5f1] rounded-xl">
                    <p className="text-sm text-[#4A4A4A]">Lifetime Value</p>
                    <p className="text-2xl font-bold text-[#101111]">$156</p>
                    <p className="text-xs text-green-600">+8% vs last period</p>
                  </div>
                </div>
              </motion.div>

              {/* Related */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-[#101111] mb-4">Related</h3>
                <div className="space-y-3">
                  <Link href="/ads/analytics" className="flex items-center justify-between p-3 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <span className="text-sm font-medium text-[#101111]">Full Analytics</span>
                    <ArrowRight className="w-4 h-4 text-[#4A4A4A]" />
                  </Link>
                  <Link href="/ads/ai-optimization" className="flex items-center justify-between p-3 bg-[#A6824A]/10 rounded-xl hover:bg-[#A6824A]/20 transition-colors">
                    <span className="text-sm font-medium text-[#A6824A]">AI Optimization</span>
                    <TrendingUp className="w-4 h-4 text-[#A6824A]" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Improve Your ROI</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Use AI-powered insights to optimize your campaigns and increase returns.
          </p>
          <Link href="/ads/ai-optimization" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Start AI Optimization
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
