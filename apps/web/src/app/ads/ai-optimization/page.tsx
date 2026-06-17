'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Zap,
  ArrowLeft,
  Play,
  Pause,
  Settings,
  Menu,
  X,
  Bell,
  TrendingUp,
  Target,
  Users,
  Globe,
  DollarSign,
  BarChart3,
  Check,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Clock,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: Globe },
  { name: 'Freight', href: '/freight', icon: Globe },
  { name: 'Compliance', href: '/compliance', icon: Globe },
  { name: 'AI Assistant', href: '/ai', icon: Zap },
  { name: 'Billing', href: '/billing', icon: DollarSign },
  { name: 'Ads', href: '/ads', icon: Zap },
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

const aiFeatures = [
  {
    title: 'Smart Bidding',
    description: 'AI automatically adjusts bids based on conversion probability.',
    enabled: true,
    icon: TrendingUp,
    metric: '+23% ROAS',
  },
  {
    title: 'Audience Expansion',
    description: 'Find similar high-value prospects using machine learning.',
    enabled: true,
    icon: Users,
    metric: '+45% Reach',
  },
  {
    title: 'Ad Copy Generation',
    description: 'Generate compelling ad copy tailored to your audience.',
    enabled: false,
    icon: Sparkles,
    metric: '3x faster',
  },
  {
    title: 'Budget Optimization',
    description: 'Automatically allocate budget to top-performing campaigns.',
    enabled: true,
    icon: DollarSign,
    metric: '+18% efficiency',
  },
  {
    title: 'Creative Analysis',
    description: 'Identify which visuals and messaging resonate best.',
    enabled: false,
    icon: BarChart3,
    metric: '+31% CTR',
  },
  {
    title: 'Predictive Targeting',
    description: 'Predict which users are most likely to convert.',
    enabled: true,
    icon: Target,
    metric: '+28% conversions',
  },
];

const recentOptimizations = [
  { action: 'Increased bid on Summer Export Promo', time: '2 hours ago', impact: '+$120 revenue' },
  { action: 'Expanded audience for EU campaign', time: '5 hours ago', impact: '+12K impressions' },
  { action: 'Paused underperforming keywords', time: '1 day ago', impact: '-$45 spend saved' },
  { action: 'Updated targeting for better match', time: '2 days ago', impact: '+8% CTR' },
];

export default function AIOptimizationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOptimizationEnabled, setIsOptimizationEnabled] = useState(true);

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
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold">AI Optimization</h1>
              </div>
              <p className="text-white/80 mt-2 max-w-xl">
                Let our AI continuously optimize your campaigns for maximum ROI with automated bidding, targeting, and creative insights.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                <div className={`w-3 h-3 rounded-full ${isOptimizationEnabled ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-white font-medium">
                  {isOptimizationEnabled ? 'AI Active' : 'AI Paused'}
                </span>
              </div>
              <button
                onClick={() => setIsOptimizationEnabled(!isOptimizationEnabled)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-colors ${
                  isOptimizationEnabled
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-white'
                    : 'bg-white text-[#154230] hover:bg-white/90'
                }`}
              >
                {isOptimizationEnabled ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isOptimizationEnabled ? 'Pause AI' : 'Enable AI'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Performance Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-[#154230]">+32%</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Avg ROAS Increase</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-[#A6824A]">-18%</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Cost Reduction</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-[#5D1E21]">247</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Optimizations/Month</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-[#154230]">$42K</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Revenue Generated</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Features Grid */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#A6824A]" />
                    AI Features
                  </h2>
                  <button className="text-[#154230] hover:text-[#1d5240] font-medium text-sm flex items-center gap-1">
                    <Settings className="w-4 h-4" />
                    Configure
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.title}
                        className={`p-4 rounded-xl border transition-all ${
                          feature.enabled
                            ? 'border-[#154230] bg-[#154230]/5'
                            : 'border-black/5 bg-[#f7f5f1]'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              feature.enabled ? 'bg-[#154230]/20' : 'bg-black/10'
                            }`}>
                              <Icon className={`w-5 h-5 ${feature.enabled ? 'text-[#154230]' : 'text-[#4A4A4A]'}`} />
                            </div>
                            <h3 className="font-bold text-[#101111]">{feature.title}</h3>
                          </div>
                          <button
                            onClick={() => feature.enabled = !feature.enabled}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                              feature.enabled ? 'bg-[#154230]' : 'bg-black/20'
                            }`}
                          >
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                              feature.enabled ? 'right-1' : 'left-1'
                            }`} />
                          </button>
                        </div>
                        <p className="text-sm text-[#4A4A4A] mb-3">{feature.description}</p>
                        {feature.enabled && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            {feature.metric}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Optimization History */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#101111]">Recent Optimizations</h2>
                  <button className="text-[#154230] hover:text-[#1d5240] font-medium text-sm flex items-center gap-1">
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>
                <div className="space-y-4">
                  {recentOptimizations.map((opt, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-[#f7f5f1] rounded-xl">
                      <div className="w-8 h-8 bg-[#154230]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-[#154230]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#101111]">{opt.action}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-[#4A4A4A] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {opt.time}
                          </span>
                          <span className="text-xs font-medium text-green-600">{opt.impact}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Status */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Optimization Level</span>
                    <span className="font-bold">Advanced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Last Optimization</span>
                    <span className="font-medium">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Campaigns Optimized</span>
                    <span className="font-bold">3/3</span>
                  </div>
                  <div className="pt-4 border-t border-white/20">
                    <div className="flex items-center justify-center gap-2 text-green-300">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-sm font-medium">All systems operational</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-[#101111] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <RefreshCw className="w-5 h-5 text-[#154230]" />
                    <span className="font-medium text-[#101111]">Run Manual Optimization</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-4 bg-[#A6824A] text-white rounded-xl hover:bg-[#b8925a] transition-colors">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">Generate AI Copy</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <Users className="w-5 h-5 text-[#154230]" />
                    <span className="font-medium text-[#101111]">Expand Audience</span>
                  </button>
                </div>
              </motion.div>

              {/* Insights */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#A6824A] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Insight
                </h3>
                <p className="text-sm text-white/90 mb-3">
                  Based on your campaign performance, AI recommends increasing budget for LinkedIn ads by 20% to capture high-intent B2B buyers.
                </p>
                <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                  Apply Recommendation
                </button>
              </motion.div>

              {/* Related */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-[#101111] mb-4">Related Pages</h3>
                <div className="space-y-3">
                  <Link href="/ads/analytics" className="flex items-center justify-between p-3 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <span className="text-sm font-medium text-[#101111]">Analytics Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-[#4A4A4A]" />
                  </Link>
                  <Link href="/ads/targeting" className="flex items-center justify-between p-3 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <span className="text-sm font-medium text-[#101111]">Targeting Settings</span>
                    <ArrowRight className="w-4 h-4 text-[#4A4A4A]" />
                  </Link>
                  <Link href="/ads/roi" className="flex items-center justify-between p-3 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <span className="text-sm font-medium text-[#101111]">ROI Tracking</span>
                    <ArrowRight className="w-4 h-4 text-[#4A4A4A]" />
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Scale?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Let AI do the heavy lifting while you focus on growing your business.
          </p>
          <Link href="/ads/campaigns/new" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Create AI-Optimized Campaign
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
