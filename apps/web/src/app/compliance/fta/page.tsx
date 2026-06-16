'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Globe,
  FileText,
  Calculator,
  ChevronRight,
  Search,
  Menu,
  X,
  Bell,
  TrendingDown,
  Shield,
  Clock,
  Star,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Documents', href: '/documents' },
  { name: 'Freight', href: '/freight' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'AI Assistant', href: '/ai' },
  { name: 'Billing', href: '/billing' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

const ftaAgreements = [
  { name: 'USMCA', fullName: 'United States-Mexico-Canada Agreement', countries: ['USA', 'Mexico', 'Canada'], savings: 'Up to 100%', status: 'active' },
  { name: 'US-Korea FTA', fullName: 'Korea-US Free Trade Agreement', countries: ['USA', 'South Korea'], savings: 'Up to 80%', status: 'active' },
  { name: 'US-Australia FTA', fullName: 'US-Australia Free Trade Agreement', countries: ['USA', 'Australia'], savings: 'Up to 100%', status: 'active' },
  { name: 'US-Singapore FTA', fullName: 'US-Singapore Free Trade Agreement', countries: ['USA', 'Singapore'], savings: 'Up to 100%', status: 'active' },
  { name: 'US-Jordan FTA', fullName: 'US-Jordan Free Trade Agreement', countries: ['USA', 'Jordan'], savings: 'Up to 100%', status: 'active' },
  { name: 'US-Colombia FTA', fullName: 'US-Colombia Trade Promotion Agreement', countries: ['USA', 'Colombia'], savings: 'Up to 85%', status: 'active' },
];

const eligibilityChecks = [
  { name: 'Origin Criteria', description: 'Product meets rules of origin requirements', status: 'pending' },
  { name: 'HS Code Classification', description: 'Correct HS code for preferential treatment', status: 'pending' },
  { name: '区域价值含量 (RVC)', description: 'Regional value content meets threshold', status: 'pending' },
  { name: 'Direct Transport', description: 'Goods shipped directly between parties', status: 'pending' },
  { name: 'Certificate of Origin', description: 'Valid CO issued by authorized party', status: 'pending' },
];

export default function FTAPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFTA, setSelectedFTA] = useState('');

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">FTA Benefits</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium text-[#154230]">Compliance</Link>
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
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Compliance</Link>
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
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                FTA Benefits
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Maximize your trade savings with Free Trade Agreements. Check eligibility and generate certificates of origin.
            </p>
          </motion.div>

          {/* FTA Selector */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <select
                    value={selectedFTA}
                    onChange={(e) => setSelectedFTA(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none"
                  >
                    <option value="">Select FTA agreement</option>
                    {ftaAgreements.map((fta) => (
                      <option key={fta.name} value={fta.name}>{fta.name} - {fta.fullName}</option>
                    ))}
                  </select>
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Calculator className="w-5 h-5" />
                  <span>Calculate Savings</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">14</p>
              <p className="text-sm text-white/70">Active FTAs</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">20+</p>
              <p className="text-sm text-white/70">Partner Countries</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">$50K+</p>
              <p className="text-sm text-white/70">Avg. Annual Savings</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm text-white/70">Duty-Free Items</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* FTA Agreements */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#4A4A4A]" />
                US Free Trade Agreements
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ftaAgreements.map((fta, index) => {
                  const isGreen = index % 2 === 0;
                  return (
                    <div key={fta.name} className={`p-5 rounded-xl ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-white" />
                          <h3 className="font-bold text-white text-lg">{fta.name}</h3>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                          {fta.status}
                        </span>
                      </div>
                      <p className="text-sm text-white/70 mb-3">{fta.fullName}</p>
                      <div className="flex items-center gap-2 mb-3">
                        {fta.countries.map((country) => (
                          <span key={country} className="px-2 py-0.5 bg-white/10 rounded text-xs text-white">
                            {country}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/60">Potential Savings</p>
                          <p className="text-lg font-bold text-white">{fta.savings}</p>
                        </div>
                        <Link href={`/compliance/fta/${fta.name.toLowerCase()}`} className="text-white font-medium text-sm hover:text-white/80 flex items-center gap-1">
                          Details <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Eligibility Checklist */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#4A4A4A]" />
                FTA Eligibility Checklist
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {eligibilityChecks.map((check, index) => (
                  <div key={check.name} className="flex items-center gap-4 p-4 bg-[#f7f5f1] rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#4A4A4A]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#101111]">{check.name}</h3>
                      <p className="text-sm text-[#4A4A4A]">{check.description}</p>
                    </div>
                    <button className="px-4 py-2 bg-[#154230] text-white text-sm font-medium rounded-lg hover:bg-[#1d5240] transition-colors">
                      Verify
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/compliance/duty-rates" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Calculator className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Duty Savings Calculator</h3>
              <p className="text-sm text-white/70 mb-4">Calculate exactly how much you can save with FTA benefits.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Calculate <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/documents" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <FileText className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">CO Templates</h3>
              <p className="text-sm text-white/70 mb-4">Access pre-built Certificate of Origin templates.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Get Templates <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/check" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <CheckCircle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Rules of Origin</h3>
              <p className="text-sm text-white/70 mb-4">Understand product-specific rules of origin requirements.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Learn More <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Maximize Your FTA Benefits</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our experts can help you determine FTA eligibility and generate certificates of origin.
          </p>
          <Link href="/consultations" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Get FTA Analysis <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer - 50% Green / 50% Maroon */}
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
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}