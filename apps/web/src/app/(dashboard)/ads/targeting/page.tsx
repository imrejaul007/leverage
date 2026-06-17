'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Target,
  ArrowLeft,
  Save,
  Menu,
  X,
  Bell,
  MapPin,
  Building,
  Briefcase,
  Globe,
  DollarSign,
  Zap,
  Users,
  Check,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: Globe },
  { name: 'Freight', href: '/freight', icon: Globe },
  { name: 'Compliance', href: '/compliance', icon: Globe },
  { name: 'AI Assistant', href: '/ai', icon: Zap },
  { name: 'Billing', href: '/billing', icon: DollarSign },
  { name: 'Ads', href: '/ads', icon: Target },
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

const industries = [
  'Import/Export',
  'Manufacturing',
  'Logistics & Freight',
  'Retail & Wholesale',
  'Technology',
  'Agriculture',
  'Energy & Resources',
  'Automotive',
];

const jobLevels = [
  { value: 'c_suite', label: 'C-Suite / Executive', count: '12K' },
  { value: 'vp_director', label: 'VP / Director', count: '28K' },
  { value: 'manager', label: 'Manager', count: '45K' },
  { value: 'professional', label: 'Professional', count: '62K' },
];

const regions = [
  { code: 'NA', name: 'North America', users: '85K' },
  { code: 'EU', name: 'Europe', users: '72K' },
  { code: 'APAC', name: 'Asia Pacific', users: '95K' },
  { code: 'LATAM', name: 'Latin America', users: '35K' },
  { code: 'ME', name: 'Middle East', users: '18K' },
  { code: 'AF', name: 'Africa', users: '12K' },
];

export default function TargetingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(['Import/Export', 'Manufacturing']);
  const [selectedJobLevels, setSelectedJobLevels] = useState<string[]>(['vp_director', 'manager']);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['NA', 'EU']);
  const [bidStrategy, setBidStrategy] = useState('auto');
  const [ageRange, setAgeRange] = useState([25, 65]);
  const [lookbackWindow, setLookbackWindow] = useState('30');

  const toggleItem = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
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
              <Target className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Targeting Settings
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Configure your targeting parameters to reach the right B2B audience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Industries */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#154230]" />
                  Industries
                </h2>
                <p className="text-sm text-[#4A4A4A] mb-4">Select the industries you want to target.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {industries.map((industry) => (
                    <label
                      key={industry}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedIndustries.includes(industry)
                          ? 'border-[#154230] bg-[#154230]/5'
                          : 'border-black/5 hover:border-black/10'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedIndustries.includes(industry)
                          ? 'border-[#154230] bg-[#154230]'
                          : 'border-black/20'
                      }`}>
                        {selectedIndustries.includes(industry) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-[#101111]">{industry}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Job Levels */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#154230]" />
                  Job Level / Title
                </h2>
                <p className="text-sm text-[#4A4A4A] mb-4">Target professionals by their seniority level.</p>
                <div className="space-y-3">
                  {jobLevels.map((level) => (
                    <label
                      key={level.value}
                      className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedJobLevels.includes(level.value)
                          ? 'border-[#154230] bg-[#154230]/5'
                          : 'border-black/5 hover:border-black/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedJobLevels.includes(level.value)
                            ? 'border-[#154230] bg-[#154230]'
                            : 'border-black/20'
                        }`}>
                          {selectedJobLevels.includes(level.value) && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="font-medium text-[#101111]">{level.label}</span>
                      </div>
                      <span className="text-sm text-[#4A4A4A]">{level.count}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Geographic */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#154230]" />
                  Geographic Regions
                </h2>
                <p className="text-sm text-[#4A4A4A] mb-4">Target users in specific regions worldwide.</p>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {regions.map((region) => (
                    <label
                      key={region.code}
                      className={`flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedRegions.includes(region.code)
                          ? 'border-[#154230] bg-[#154230] text-white'
                          : 'border-black/5 hover:border-black/10'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedRegions.includes(region.code)}
                        onChange={() => toggleItem(region.code, selectedRegions, setSelectedRegions)}
                        className="sr-only"
                      />
                      <span className="text-2xl font-bold mb-1">{region.code}</span>
                      <span className={`text-xs text-center ${selectedRegions.includes(region.code) ? 'text-white/70' : 'text-[#4A4A4A]'}`}>
                        {region.users}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Bid Strategy */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#154230]" />
                  Bidding Strategy
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'auto', label: 'Auto Bidding', desc: 'AI optimizes bids automatically' },
                    { value: 'target_cpa', label: 'Target CPA', desc: 'Optimize for conversions' },
                    { value: 'manual', label: 'Manual Bidding', desc: 'Set your own max bid' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        bidStrategy === option.value
                          ? 'border-[#154230] bg-[#154230]/5'
                          : 'border-black/5 hover:border-black/10'
                      }`}
                    >
                      <input
                        type="radio"
                        name="bidStrategy"
                        value={option.value}
                        checked={bidStrategy === option.value}
                        onChange={(e) => setBidStrategy(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mb-3 ${
                        bidStrategy === option.value
                          ? 'border-[#154230] bg-[#154230]'
                          : 'border-black/20'
                      }`}>
                        {bidStrategy === option.value && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <h3 className="font-bold text-[#101111] mb-1">{option.label}</h3>
                      <p className="text-xs text-[#4A4A4A]">{option.desc}</p>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Targeting Settings
                </button>
                <Link href="/ads/ai-optimization" className="px-6 py-3 bg-[#A6824A] hover:bg-[#b8925a] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Optimize
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Estimated Reach */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#154230]" />
                  Estimated Reach
                </h3>
                <div className="text-center p-6 bg-[#f7f5f1] rounded-xl mb-4">
                  <p className="text-5xl font-bold text-[#154230]">~180K</p>
                  <p className="text-[#4A4A4A] mt-2">Potential Reach</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">Match Quality</span>
                    <span className="font-medium text-[#154230]">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">Weekly Impressions</span>
                    <span className="font-medium text-[#101111]">450K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A4A4A]">Est. CPC</span>
                    <span className="font-medium text-[#101111]">$1.85</span>
                  </div>
                </div>
              </motion.div>

              {/* Lookback Window */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-[#101111] mb-4">Conversion Lookback</h3>
                <select
                  value={lookbackWindow}
                  onChange={(e) => setLookbackWindow(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f7f5f1] border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#154230]/20 focus:border-[#154230] transition-all"
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days (recommended)</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
                <p className="text-xs text-[#4A4A4A] mt-3">
                  How far back to track conversions for attribution.
                </p>
              </motion.div>

              {/* Quick Tips */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-[#154230] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-3">Pro Tips</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Start with broader targeting, then narrow based on performance.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Use at least 2-3 targeting dimensions for best results.
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Enable auto-bidding for hands-off optimization.
                  </li>
                </ul>
              </motion.div>

              {/* Related Links */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-[#101111] mb-4">Related</h3>
                <div className="space-y-3">
                  <Link href="/ads/audiences/new" className="flex items-center justify-between p-3 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <span className="text-sm font-medium text-[#101111]">Create Custom Audience</span>
                    <ArrowRight className="w-4 h-4 text-[#4A4A4A]" />
                  </Link>
                  <Link href="/ads/ai-optimization" className="flex items-center justify-between p-3 bg-[#A6824A]/10 rounded-xl hover:bg-[#A6824A]/20 transition-colors">
                    <span className="text-sm font-medium text-[#A6824A]">AI Audience Expansion</span>
                    <Zap className="w-4 h-4 text-[#A6824A]" />
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Let AI Find Your Audience</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our AI analyzes millions of data points to identify the best prospects for your campaigns.
          </p>
          <Link href="/ads/ai-optimization" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Try AI Targeting
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
