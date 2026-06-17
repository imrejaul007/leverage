'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Users,
  ArrowLeft,
  Plus,
  Trash2,
  ChevronRight,
  Menu,
  X,
  Bell,
  Target,
  Filter,
  MapPin,
  Building,
  Briefcase,
  Globe,
  DollarSign,
  Zap,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: Globe },
  { name: 'Freight', href: '/freight', icon: Globe },
  { name: 'Compliance', href: '/compliance', icon: Globe },
  { name: 'AI Assistant', href: '/ai', icon: Zap },
  { name: 'Billing', href: '/billing', icon: DollarSign },
  { name: 'Ads', href: '/ads', icon: Users },
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
  'Textiles & Apparel',
  'Food & Beverage',
];

const jobTitles = [
  'CEO / Owner',
  'VP / Director',
  'Supply Chain Manager',
  'Procurement Manager',
  'Logistics Manager',
  'Operations Manager',
  'Sales Manager',
  'International Trade Specialist',
];

const regions = [
  { name: 'North America', code: 'NA' },
  { name: 'Europe', code: 'EU' },
  { name: 'Asia Pacific', code: 'APAC' },
  { name: 'Latin America', code: 'LATAM' },
  { name: 'Middle East', code: 'ME' },
  { name: 'Africa', code: 'AF' },
];

export default function NewAudiencePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audienceName, setAudienceName] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(['Import/Export']);
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>(['CEO / Owner', 'VP / Director']);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['NA', 'EU']);
  const [companySize, setCompanySize] = useState('all');
  const [annualRevenue, setAnnualRevenue] = useState('all');

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
              <Users className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Create Custom Audience
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Build precise target audiences for your B2B advertising campaigns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
            {/* Audience Name */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-[#154230]" />
                Audience Details
              </h2>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Audience Name</label>
                <input
                  type="text"
                  value={audienceName}
                  onChange={(e) => setAudienceName(e.target.value)}
                  placeholder="e.g., European Importers"
                  className="w-full px-4 py-3 bg-[#f7f5f1] border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#154230]/20 focus:border-[#154230] transition-all"
                />
              </div>
            </div>

            {/* Industry Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#154230]" />
                Industries
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {industries.map((industry) => (
                  <label
                    key={industry}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedIndustries.includes(industry)
                        ? 'border-[#154230] bg-[#154230]/5'
                        : 'border-black/5 hover:border-black/10'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndustries.includes(industry)}
                      onChange={() => toggleItem(industry, selectedIndustries, setSelectedIndustries)}
                      className="w-5 h-5 text-[#154230] rounded focus:ring-[#154230]"
                    />
                    <span className="text-sm font-medium text-[#101111]">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Job Titles */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#154230]" />
                Job Titles / Roles
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {jobTitles.map((title) => (
                  <label
                    key={title}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedJobTitles.includes(title)
                        ? 'border-[#154230] bg-[#154230]/5'
                        : 'border-black/5 hover:border-black/10'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedJobTitles.includes(title)}
                      onChange={() => toggleItem(title, selectedJobTitles, setSelectedJobTitles)}
                      className="w-4 h-4 text-[#154230] rounded focus:ring-[#154230]"
                    />
                    <span className="text-sm font-medium text-[#101111]">{title}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Geographic */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#154230]" />
                Geographic Regions
              </h2>
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
                    <span className="text-xs text-center">{region.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Company Size */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#154230]" />
                Company Size
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'all', label: 'All Sizes' },
                  { value: '1-10', label: '1-10 employees' },
                  { value: '11-50', label: '11-50 employees' },
                  { value: '51-200', label: '51-200 employees' },
                  { value: '201-1000', label: '201-1000 employees' },
                  { value: '1000+', label: '1000+ employees' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      companySize === option.value
                        ? 'border-[#154230] bg-[#154230]/5'
                        : 'border-black/5 hover:border-black/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="companySize"
                      value={option.value}
                      checked={companySize === option.value}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-5 h-5 text-[#154230] focus:ring-[#154230]"
                    />
                    <span className="text-sm font-medium text-[#101111]">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Annual Revenue */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#101111] mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#154230]" />
                Annual Revenue
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: 'all', label: 'Any Revenue' },
                  { value: '0-1m', label: 'Under $1M' },
                  { value: '1m-10m', label: '$1M - $10M' },
                  { value: '10m-50m', label: '$10M - $50M' },
                  { value: '50m-100m', label: '$50M - $100M' },
                  { value: '100m+', label: '$100M+' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      annualRevenue === option.value
                        ? 'border-[#154230] bg-[#154230]/5'
                        : 'border-black/5 hover:border-black/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="annualRevenue"
                      value={option.value}
                      checked={annualRevenue === option.value}
                      onChange={(e) => setAnnualRevenue(e.target.value)}
                      className="w-5 h-5 text-[#154230] focus:ring-[#154230]"
                    />
                    <span className="text-sm font-medium text-[#101111]">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-black/5">
              <Link href="/ads" className="flex-1 sm:flex-none px-6 py-3 border border-black/10 rounded-xl font-medium text-[#4A4A4A] hover:bg-black/5 transition-colors text-center">
                Cancel
              </Link>
              <button className="flex-1 px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Save Audience
              </button>
            </div>
          </div>

          {/* Estimated Reach */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-[#101111] mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#154230]" />
              Estimated Audience Size
            </h3>
            <div className="flex items-center justify-center p-8 bg-[#f7f5f1] rounded-xl">
              <div className="text-center">
                <p className="text-5xl font-bold text-[#154230] mb-2">~32K</p>
                <p className="text-[#4A4A4A]">Potential Reach</p>
                <p className="text-sm text-green-600 mt-2">98% match quality</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="font-bold text-[#101111]">15K</p>
                <p className="text-[#4A4A4A]">North America</p>
              </div>
              <div>
                <p className="font-bold text-[#101111]">12K</p>
                <p className="text-[#4A4A4A]">Europe</p>
              </div>
              <div>
                <p className="font-bold text-[#101111]">5K</p>
                <p className="text-[#4A4A4A]">Other</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Build Your Perfect Audience</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Use our AI-powered audience builder to find the most relevant B2B contacts for your campaigns.
          </p>
          <Link href="/ads/ai-optimization" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Try AI Audience Builder
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
