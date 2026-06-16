'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Globe,
  ArrowLeft,
  Save,
  Menu,
  X,
  Bell,
  MapPin,
  Check,
  DollarSign,
  TrendingUp,
  Users,
  Megaphone,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: Globe },
  { name: 'Freight', href: '/freight', icon: Globe },
  { name: 'Compliance', href: '/compliance', icon: Globe },
  { name: 'AI Assistant', href: '/ai', icon: TrendingUp },
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

const regions = [
  { code: 'NA', name: 'North America', flag: '🇺🇸', users: '85K', ctr: '2.8%', selected: true },
  { code: 'EU', name: 'Europe', flag: '🇪🇺', users: '72K', ctr: '3.1%', selected: true },
  { code: 'APAC', name: 'Asia Pacific', flag: '🌏', users: '95K', ctr: '2.4%', selected: false },
  { code: 'LATAM', name: 'Latin America', flag: '🌎', users: '35K', ctr: '1.9%', selected: false },
  { code: 'ME', name: 'Middle East', flag: '🏜️', users: '18K', ctr: '2.2%', selected: false },
  { code: 'AF', name: 'Africa', flag: '🌍', users: '12K', ctr: '1.7%', selected: false },
];

const countries = [
  { name: 'United States', code: 'US', region: 'NA' },
  { name: 'United Kingdom', code: 'GB', region: 'EU' },
  { name: 'Germany', code: 'DE', region: 'EU' },
  { name: 'France', code: 'FR', region: 'EU' },
  { name: 'Canada', code: 'CA', region: 'NA' },
  { name: 'Australia', code: 'AU', region: 'APAC' },
  { name: 'Japan', code: 'JP', region: 'APAC' },
  { name: 'China', code: 'CN', region: 'APAC' },
  { name: 'Brazil', code: 'BR', region: 'LATAM' },
  { name: 'Mexico', code: 'MX', region: 'LATAM' },
  { name: 'UAE', code: 'AE', region: 'ME' },
  { name: 'Saudi Arabia', code: 'SA', region: 'ME' },
  { name: 'South Africa', code: 'ZA', region: 'AF' },
  { name: 'Nigeria', code: 'NG', region: 'AF' },
];

const languages = [
  { code: 'en', name: 'English', native: 'English', regions: ['NA', 'EU', 'APAC'] },
  { code: 'es', name: 'Spanish', native: 'Español', regions: ['EU', 'LATAM'] },
  { code: 'fr', name: 'French', native: 'Français', regions: ['EU', 'AF'] },
  { code: 'de', name: 'German', native: 'Deutsch', regions: ['EU'] },
  { code: 'zh', name: 'Chinese', native: '中文', regions: ['APAC'] },
  { code: 'ar', name: 'Arabic', native: 'العربية', regions: ['ME', 'AF'] },
  { code: 'pt', name: 'Portuguese', native: 'Português', regions: ['LATAM', 'AF'] },
  { code: 'ja', name: 'Japanese', native: '日本語', regions: ['APAC'] },
];

export default function GlobalPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['NA', 'EU']);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['US', 'GB', 'DE', 'CA']);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['en', 'es']);
  const [bidMultiplier, setBidMultiplier] = useState('1.0');

  const toggleRegion = (code: string) => {
    setSelectedRegions(prev =>
      prev.includes(code) ? prev.filter(r => r !== code) : [...prev, code]
    );
  };

  const toggleCountry = (code: string) => {
    setSelectedCountries(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  const toggleLanguage = (code: string) => {
    setSelectedLanguages(prev =>
      prev.includes(code) ? prev.filter(l => l !== code) : [...prev, code]
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
              <Globe className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Global Reach Settings
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Configure your advertising reach across 190+ countries and regions worldwide.
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
              {/* Regions */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#154230]" />
                  Target Regions
                </h2>
                <p className="text-sm text-[#4A4A4A] mb-4">Select the regions you want to advertise in.</p>
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
                        onChange={() => toggleRegion(region.code)}
                        className="sr-only"
                      />
                      <span className="text-2xl mb-1">{region.flag}</span>
                      <span className="text-sm font-bold">{region.code}</span>
                      <span className={`text-xs mt-1 ${selectedRegions.includes(region.code) ? 'text-white/70' : 'text-[#4A4A4A]'}`}>
                        {region.users}
                      </span>
                      <span className={`text-xs ${selectedRegions.includes(region.code) ? 'text-green-300' : 'text-[#4A4A4A]'}`}>
                        {region.ctr} CTR
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Countries */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#154230]" />
                      Target Countries
                    </h2>
                    <p className="text-sm text-[#4A4A4A] mt-1">Fine-tune your targeting by specific countries.</p>
                  </div>
                  <button className="text-[#154230] hover:text-[#1d5240] font-medium text-sm">
                    Select All
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {countries.map((country) => (
                    <label
                      key={country.code}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedCountries.includes(country.code)
                          ? 'border-[#154230] bg-[#154230]/5'
                          : 'border-black/5 hover:border-black/10'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedCountries.includes(country.code)
                          ? 'border-[#154230] bg-[#154230]'
                          : 'border-black/20'
                      }`}>
                        {selectedCountries.includes(country.code) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-[#101111]">{country.name}</span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Languages */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#154230]" />
                  Ad Languages
                </h2>
                <p className="text-sm text-[#4A4A4A] mb-4">Select languages for your ad creatives.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {languages.map((lang) => (
                    <label
                      key={lang.code}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedLanguages.includes(lang.code)
                          ? 'border-[#154230] bg-[#154230]/5'
                          : 'border-black/5 hover:border-black/10'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedLanguages.includes(lang.code)
                          ? 'border-[#154230] bg-[#154230]'
                          : 'border-black/20'
                      }`}>
                        {selectedLanguages.includes(lang.code) && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-[#101111]">{lang.name}</span>
                        <p className="text-xs text-[#4A4A4A]">{lang.native}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Bid Adjustment */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#154230]" />
                  Regional Bid Adjustments
                </h2>
                <div className="space-y-4">
                  {selectedRegions.map((regionCode) => {
                    const region = regions.find(r => r.code === regionCode);
                    return (
                      <div key={regionCode} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{region?.flag}</span>
                          <span className="font-medium text-[#101111]">{region?.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <select
                            value={bidMultiplier}
                            onChange={(e) => setBidMultiplier(e.target.value)}
                            className="px-4 py-2 bg-white border border-black/10 rounded-lg text-[#101111] font-medium"
                          >
                            <option value="0.5">-50%</option>
                            <option value="0.75">-25%</option>
                            <option value="1.0">No change</option>
                            <option value="1.25">+25%</option>
                            <option value="1.5">+50%</option>
                            <option value="2.0">+100%</option>
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Global Settings
                </button>
                <Link href="/ads/ai-optimization" className="px-6 py-3 bg-[#A6824A] hover:bg-[#b8925a] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5" />
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
                  Estimated Global Reach
                </h3>
                <div className="text-center p-6 bg-[#f7f5f1] rounded-xl mb-4">
                  <p className="text-5xl font-bold text-[#154230]">~157K</p>
                  <p className="text-[#4A4A4A] mt-2">Potential Reach</p>
                </div>
                <div className="space-y-2 text-sm">
                  {selectedRegions.map((regionCode) => {
                    const region = regions.find(r => r.code === regionCode);
                    return (
                      <div key={regionCode} className="flex justify-between">
                        <span className="text-[#4A4A4A] flex items-center gap-2">
                          <span>{region?.flag}</span>
                          {region?.name}
                        </span>
                        <span className="font-medium text-[#101111]">{region?.users}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Coverage Stats */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#154230] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-4">Global Coverage</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Countries</span>
                    <span className="font-bold">{selectedCountries.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Regions</span>
                    <span className="font-bold">{selectedRegions.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Languages</span>
                    <span className="font-bold">{selectedLanguages.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Coverage</span>
                    <span className="font-bold text-green-300">82% of target</span>
                  </div>
                </div>
              </motion.div>

              {/* Tips */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-[#101111] mb-4">Pro Tips</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#154230] mt-0.5 flex-shrink-0" />
                    <span className="text-[#4A4A4A]">Start with 2-3 high-performing regions, then expand.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#154230] mt-0.5 flex-shrink-0" />
                    <span className="text-[#4A4A4A]">Use AI to identify emerging markets with high intent.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#154230] mt-0.5 flex-shrink-0" />
                    <span className="text-[#4A4A4A]">Localize ads for better engagement in each region.</span>
                  </li>
                </ul>
              </motion.div>

              {/* Related */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-[#101111] mb-4">Related</h3>
                <div className="space-y-3">
                  <Link href="/ads/targeting" className="flex items-center justify-between p-3 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <span className="text-sm font-medium text-[#101111]">Targeting Settings</span>
                    <ArrowRight className="w-4 h-4 text-[#4A4A4A]" />
                  </Link>
                  <Link href="/ads/audiences/new" className="flex items-center justify-between p-3 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <span className="text-sm font-medium text-[#101111]">Create Audience</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Go Global with Confidence</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Reach trade professionals across 190+ countries with localized campaigns.
          </p>
          <Link href="/ads/campaigns/new" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Create Global Campaign
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
