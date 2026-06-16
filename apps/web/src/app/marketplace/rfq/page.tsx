'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  Bell,
  Menu,
  X,
  Globe,
  Plus,
  Clock,
  CheckCircle,
  Users,
  ArrowRight,
  Filter,
  ChevronDown,
  Star,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  Truck,
  BarChart3,
} from 'lucide-react';

const sampleRfqs = [
  {
    id: 'rfq-001',
    title: 'Basmati Rice 1121 - 500 MT Monthly',
    description: 'Looking for premium quality Basmati Rice 1121, extra long grain. Need 500 MT per month for ongoing supply.',
    category: 'Food & Agriculture',
    quantity: '500 MT',
    frequency: 'Monthly',
    destination: 'United Arab Emirates',
    bids: 12,
    daysLeft: 5,
    verified: true,
    supplier: 'AgroEx Global',
    rating: 4.8,
  },
  {
    id: 'rfq-002',
    title: 'Organic Cotton Yarn 40s Combed',
    description: 'Require organic certified cotton yarn, 40s count combed for textile manufacturing.',
    category: 'Textiles',
    quantity: '10,000 KG',
    frequency: 'One-time',
    destination: 'Vietnam',
    bids: 8,
    daysLeft: 12,
    verified: true,
    supplier: 'Textile Connect Ltd',
    rating: 4.6,
  },
  {
    id: 'rfq-003',
    title: 'Solar Panels 550W Mono PERC',
    description: 'Tier 1 solar panels, 550W monocrystalline PERC modules. Full container orders.',
    category: 'Energy',
    quantity: '2,000 units',
    frequency: 'Quarterly',
    destination: 'Germany',
    bids: 15,
    daysLeft: 3,
    verified: false,
    supplier: 'GreenTech Solutions',
    rating: 4.9,
  },
  {
    id: 'rfq-004',
    title: 'Copper Cathode 99.99% Grade A',
    description: 'LME registered copper cathode, minimum 99.99% purity for electrical manufacturing.',
    category: 'Metals & Minerals',
    quantity: '100 MT',
    frequency: 'Monthly',
    destination: 'United States',
    bids: 6,
    daysLeft: 18,
    verified: true,
    supplier: 'MetalTrade Inc',
    rating: 4.7,
  },
];

const benefits = [
  { icon: Shield, title: 'Verified Buyers', desc: 'All buyers are vetted for authenticity' },
  { icon: Truck, title: 'Global Reach', desc: 'Connect with buyers worldwide' },
  { icon: CheckCircle, title: 'Quality Match', desc: 'AI-powered supplier matching' },
  { icon: TrendingUp, title: 'Market Rates', desc: 'Real-time pricing insights' },
];

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'AI Assistant', href: '/ai', icon: BarChart3 },
  { name: 'Billing', href: '/billing', icon: DollarSign },
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

export default function RFQMarketplacePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/rfqs" className="nav-link font-medium text-[#154230]">RFQs</Link>
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
                <Link href="/rfqs" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">RFQs</Link>
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
              <FileText className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Request for Quotes
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Post your requirements and receive competitive bids from verified suppliers worldwide. Streamline your procurement process.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search RFQs by product, category, or location..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#5D1E21] hover:bg-[#7b1c1f] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-sm text-white/70">Active RFQs</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">3,892</p>
              <p className="text-sm text-white/70">Total Bids</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">$45M</p>
              <p className="text-sm text-white/70">Trade Value</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">89%</p>
              <p className="text-sm text-white/70">Match Rate</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* RFQ List */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#101111]">Active RFQs</h2>
                  <p className="text-sm text-[#4A4A4A]">Browse and submit quotes for open requests</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#f7f5f1] hover:bg-[#E6E2DA] rounded-lg transition-colors text-sm font-medium"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <Link href="/rfqs/new" className="flex items-center gap-2 px-4 py-2 bg-[#154230] hover:bg-[#1d5240] text-white rounded-lg transition-colors text-sm font-medium">
                    <Plus className="w-4 h-4" />
                    Post RFQ
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {sampleRfqs.map((rfq) => (
                  <Link key={rfq.id} href={`/rfqs/${rfq.id}`} className="block bg-[#f7f5f1] rounded-xl p-5 hover:bg-[#E6E2DA] transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-[#101111] text-lg">{rfq.title}</h3>
                          {rfq.verified && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-[#154230]/10 text-[#154230] text-xs font-medium rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#4A4A4A] mb-3 line-clamp-2">{rfq.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[#4A4A4A]">
                          <span className="flex items-center gap-1">
                            <span className="px-2 py-0.5 bg-[#A6824A]/10 text-[#A6824A] rounded font-medium">{rfq.category}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Qty:</span> {rfq.quantity}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Freq:</span> {rfq.frequency}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">To:</span> {rfq.destination}
                          </span>
                        </div>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center">
                            <p className="font-bold text-[#101111]">{rfq.bids}</p>
                            <p className="text-xs text-[#4A4A4A]">Bids</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-[#5D1E21]">{rfq.daysLeft}d</p>
                            <p className="text-xs text-[#4A4A4A]">Left</p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => { e.preventDefault(); }}
                          className="px-4 py-2 bg-[#5D1E21] text-white text-sm font-medium rounded-lg hover:bg-[#7b1c1f] transition-colors flex items-center gap-2"
                        >
                          Submit Quote
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/rfqs" className="inline-flex items-center gap-2 px-6 py-3 text-[#154230] font-semibold hover:underline">
                  View All RFQs
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="bg-[#154230] rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-white/70">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#154230] to-[#5D1E21] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Source Products?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Post your RFQ and receive competitive quotes from verified suppliers within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/rfqs/new" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Post Your RFQ
            </Link>
            <Link href="/marketplace" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - 50% Green / 50% Maroon */}
      <footer className="bg-[#154230]">
        {/* Top section - Green */}
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

        {/* Bottom section - Maroon */}
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
