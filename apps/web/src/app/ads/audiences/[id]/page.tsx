'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Users,
  ArrowLeft,
  Edit,
  Trash2,
  Copy,
  Download,
  Menu,
  X,
  Bell,
  Target,
  MapPin,
  Building,
  Briefcase,
  Globe,
  DollarSign,
  Zap,
  TrendingUp,
  Eye,
  MousePointer,
  BarChart3,
  ChevronDown,
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

const audienceData = {
  id: 'importers-usa',
  name: 'Importers - USA',
  size: '45K',
  match: '98%',
  created: 'May 15, 2024',
  lastUpdated: 'June 10, 2024',
  industries: ['Import/Export', 'Manufacturing', 'Retail & Wholesale'],
  jobTitles: ['CEO / Owner', 'VP / Director', 'Procurement Manager', 'Supply Chain Manager'],
  regions: [
    { code: 'NA', name: 'North America', users: '45K' },
  ],
  companySizes: ['51-200 employees', '201-1000 employees', '1000+ employees'],
  campaigns: [
    { id: 1, name: 'Summer Export Promo', status: 'active', reach: '850K' },
    { id: 2, name: 'Q3 Trade Campaign', status: 'draft', reach: '0' },
  ],
};

export default function AudienceDetailPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            Back to Audiences
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4 text-white">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{audienceData.name}</h1>
                <p className="text-white/70 mt-1">Created {audienceData.created}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-5 py-3 bg-white text-[#154230] rounded-xl font-semibold transition-colors hover:bg-white/90">
                <Edit className="w-5 h-5" />
                Edit
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold transition-colors">
                <Copy className="w-5 h-5" />
                Duplicate
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
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-[#154230]">{audienceData.size}</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Total Users</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-[#A6824A]">{audienceData.match}</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Match Quality</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-[#5D1E21]">{audienceData.industries.length}</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Industries</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm text-center">
              <p className="text-3xl font-bold text-[#154230]">{audienceData.campaigns.length}</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Active Campaigns</p>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Audience Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Industries */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#154230]" />
                  Industries
                </h2>
                <div className="flex flex-wrap gap-2">
                  {audienceData.industries.map((industry) => (
                    <span key={industry} className="px-4 py-2 bg-[#154230] text-white rounded-full text-sm font-medium">
                      {industry}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Job Titles */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#154230]" />
                  Job Titles / Roles
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {audienceData.jobTitles.map((title) => (
                    <div key={title} className="p-3 bg-[#f7f5f1] rounded-xl text-center">
                      <span className="text-sm font-medium text-[#101111]">{title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Geographic */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#154230]" />
                  Geographic Regions
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {audienceData.regions.map((region) => (
                    <div key={region.code} className="p-4 bg-[#154230] rounded-xl text-center text-white">
                      <p className="text-2xl font-bold">{region.code}</p>
                      <p className="text-xs text-white/70 mt-1">{region.users}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Company Sizes */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#154230]" />
                  Company Sizes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {audienceData.companySizes.map((size) => (
                    <span key={size} className="px-4 py-2 bg-[#f7f5f1] text-[#101111] rounded-full text-sm font-medium">
                      {size}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Campaigns Using This Audience */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4">Campaigns</h2>
                <div className="space-y-3">
                  {audienceData.campaigns.map((campaign) => (
                    <Link key={campaign.id} href={`/ads/campaigns/${campaign.id}`} className="block p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-[#101111]">{campaign.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#4A4A4A]">{campaign.reach} reach</p>
                    </Link>
                  ))}
                </div>
                <Link href="/ads/campaigns/new" className="block mt-4 p-4 border-2 border-dashed border-black/10 rounded-xl text-center text-[#154230] hover:border-[#154230] hover:bg-[#154230]/5 transition-colors font-medium">
                  + Create New Campaign
                </Link>
              </motion.div>

              {/* Quick Actions */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <span className="font-medium text-[#101111]">Export List</span>
                    <Download className="w-5 h-5 text-[#4A4A4A]" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                    <span className="font-medium text-[#101111]">Duplicate</span>
                    <Copy className="w-5 h-5 text-[#4A4A4A]" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-[#A6824A] text-white rounded-xl hover:bg-[#b8925a] transition-colors">
                    <span className="font-semibold">AI Expand</span>
                    <Zap className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>

              {/* Last Updated */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#154230] rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Audience Info</h3>
                <p className="text-sm text-white/70">Last updated: {audienceData.lastUpdated}</p>
                <p className="text-sm text-white/70 mt-1">ID: {audienceData.id}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Expand Your Reach</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Use AI to find more prospects similar to your current audience.
          </p>
          <Link href="/ads/ai-optimization" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Try AI Audience Expansion
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
