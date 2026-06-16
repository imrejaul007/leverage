'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Megaphone,
  ArrowLeft,
  Plus,
  Trash2,
  ChevronRight,
  Menu,
  X,
  Bell,
  Users,
  Target,
  DollarSign,
  Calendar,
  Globe,
  BarChart3,
  Zap,
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

export default function NewCampaignPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('30');
  const [platforms, setPlatforms] = useState<string[]>(['linkedin']);
  const [audience, setAudience] = useState('');

  const togglePlatform = (platform: string) => {
    setPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Megaphone className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Create New Campaign
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Set up your B2B advertising campaign and start reaching global trade professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            {/* Campaign Basics */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#154230]" />
                Campaign Basics
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Campaign Name</label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="e.g., Summer Export Promo"
                    className="w-full px-4 py-3 bg-[#f7f5f1] border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#154230]/20 focus:border-[#154230] transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Daily Budget (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                      <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="100"
                        className="w-full pl-10 pr-4 py-3 bg-[#f7f5f1] border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#154230]/20 focus:border-[#154230] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Duration (Days)</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#f7f5f1] border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#154230]/20 focus:border-[#154230] transition-all appearance-none"
                      >
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                        <option value="60">60 days</option>
                        <option value="90">90 days</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#154230]" />
                Select Platforms
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'linkedin', name: 'LinkedIn', desc: 'B2B Professionals', color: '#0077B5' },
                  { id: 'google', name: 'Google Ads', desc: 'Search Intent', color: '#4285F4' },
                  { id: 'trade', name: 'Trade Publications', desc: 'Industry Media', color: '#A6824A' },
                  { id: 'email', name: 'Email', desc: 'Direct Outreach', color: '#154230' },
                ].map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      platforms.includes(platform.id)
                        ? 'border-[#154230] bg-[#154230]/5'
                        : 'border-black/5 hover:border-black/10'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: platform.color + '20' }}>
                      <Globe className="w-5 h-5" style={{ color: platform.color }} />
                    </div>
                    <h3 className="font-bold text-[#101111] text-sm">{platform.name}</h3>
                    <p className="text-xs text-[#4A4A4A]">{platform.desc}</p>
                    {platforms.includes(platform.id) && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#154230] text-white text-xs rounded-full">
                          <Plus className="w-3 h-3" />
                          Selected
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#154230]" />
                Target Audience
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'importers-usa', name: 'Importers - USA', size: '45K' },
                  { id: 'exporters-eu', name: 'Exporters - EU', size: '32K' },
                  { id: 'logistics', name: 'Logistics Managers', size: '18K' },
                  { id: 'supply-chain', name: 'Supply Chain Directors', size: '8K' },
                ].map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      audience === option.id
                        ? 'border-[#154230] bg-[#154230]/5'
                        : 'border-black/5 hover:border-black/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="audience"
                        value={option.id}
                        checked={audience === option.id}
                        onChange={(e) => setAudience(e.target.value)}
                        className="w-5 h-5 text-[#154230] focus:ring-[#154230]"
                      />
                      <span className="font-medium text-[#101111]">{option.name}</span>
                    </div>
                    <span className="text-sm text-[#4A4A4A]">{option.size} users</span>
                  </label>
                ))}
              </div>
              <Link href="/ads/audiences/new" className="inline-flex items-center gap-2 mt-4 text-[#154230] hover:text-[#1d5240] font-medium text-sm">
                <Plus className="w-4 h-4" />
                Create Custom Audience
              </Link>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-black/5">
              <Link href="/ads" className="flex-1 sm:flex-none px-6 py-3 border border-black/10 rounded-xl font-medium text-[#4A4A4A] hover:bg-black/5 transition-colors text-center">
                Cancel
              </Link>
              <button className="flex-1 px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                <Megaphone className="w-5 h-5" />
                Launch Campaign
              </button>
            </div>
          </div>

          {/* Estimated Reach */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-[#101111] mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#154230]" />
              Estimated Reach
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-[#f7f5f1] rounded-xl">
                <p className="text-2xl font-bold text-[#154230]">150K-250K</p>
                <p className="text-sm text-[#4A4A4A]">Impressions</p>
              </div>
              <div className="text-center p-4 bg-[#f7f5f1] rounded-xl">
                <p className="text-2xl font-bold text-[#A6824A]">2.5K-5K</p>
                <p className="text-sm text-[#4A4A4A]">Clicks</p>
              </div>
              <div className="text-center p-4 bg-[#f7f5f1] rounded-xl">
                <p className="text-2xl font-bold text-[#5D1E21]">1.5%-3%</p>
                <p className="text-sm text-[#4A4A4A]">Est. CTR</p>
              </div>
            </div>
            <p className="text-xs text-[#4A4A4A] mt-4 text-center">
              Estimates based on selected platforms and audience. Actual results may vary.
            </p>
          </motion.div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Help Setting Up?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our team can help you create and optimize your campaign for maximum ROI.
          </p>
          <Link href="/consultations" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Book a Consultation
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
