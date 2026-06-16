'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calculator,
  Percent,
  Search,
  ChevronRight,
  Globe,
  FileText,
  Download,
  Menu,
  X,
  Bell,
  TrendingUp,
  TrendingDown,
  Info,
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

const popularTradeRoutes = [
  { origin: 'China', destination: 'USA', avgDuty: '6.2%', fta: 'No' },
  { origin: 'Vietnam', destination: 'USA', avgDuty: '12.5%', fta: 'TPP Candidate' },
  { origin: 'Germany', destination: 'USA', avgDuty: '3.1%', fta: 'US-Germany' },
  { origin: 'India', destination: 'USA', avgDuty: '8.4%', fta: 'No' },
  { origin: 'Mexico', destination: 'USA', avgDuty: '0%', fta: 'USMCA' },
  { origin: 'Canada', destination: 'USA', avgDuty: '0%', fta: 'USMCA' },
];

const dutyRates = [
  { hsCode: '8542.31', description: 'Electronic integrated circuits', mfnRate: '0%', usaRate: '0%', euRate: '0%', chinaRate: '0%' },
  { hsCode: '6204.62', description: "Women's cotton trousers", mfnRate: '16.6%', usaRate: '16.6%', euRate: '12%', chinaRate: '20%' },
  { hsCode: '8708.99', description: 'Motor vehicle parts', mfnRate: '2.5%', usaRate: '2.5%', euRate: '3.5%', chinaRate: '10%' },
  { hsCode: '8471.30', description: 'Portable digital computers', mfnRate: '0%', usaRate: '0%', euRate: '0%', chinaRate: '0%' },
  { hsCode: '6110.20', description: 'Sweaters, knitted cotton', mfnRate: '16.5%', usaRate: '16.5%', euRate: '12%', chinaRate: '14%' },
];

export default function DutyRatesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hsSearch, setHsSearch] = useState('');

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Duty Rates</span>
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
                <Calculator className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Duty Rates Database
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Calculate accurate import duties for 180+ countries. Search by HS code or browse trade routes.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    value={hsSearch}
                    onChange={(e) => setHsSearch(e.target.value)}
                    placeholder="Search HS code or product description..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Calculator className="w-5 h-5" />
                  <span>Calculate</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">180+</p>
              <p className="text-sm text-white/70">Countries</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">5,000+</p>
              <p className="text-sm text-white/70">HS Codes</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">20+</p>
              <p className="text-sm text-white/70">FTAs Covered</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">Daily</p>
              <p className="text-sm text-white/70">Updates</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Popular Trade Routes */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#4A4A4A]" />
                Popular Trade Routes
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularTradeRoutes.map((route, index) => {
                  const isGreen = index % 2 === 0;
                  return (
                    <div key={`${route.origin}-${route.destination}`} className={`p-4 rounded-xl ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                      <p className="text-xs text-white/60 mb-1">Trade Route</p>
                      <p className="font-bold text-white">{route.origin} → {route.destination}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/60">Avg. Duty</p>
                          <p className="text-lg font-bold text-white">{route.avgDuty}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/60">FTA</p>
                          <p className="text-sm font-medium text-white">{route.fta}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Duty Rates Table */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <Percent className="w-5 h-5 text-[#4A4A4A]" />
                Sample Duty Rates
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#f7f5f1] text-[#154230] text-sm font-medium rounded-lg hover:bg-[#E6E2DA] transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f7f5f1]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">HS Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">MFN Rate</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">USA</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">EU</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">China</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {dutyRates.map((rate) => (
                    <tr key={rate.hsCode} className="hover:bg-[#f7f5f1] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono font-medium text-[#101111]">{rate.hsCode}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#101111]">{rate.description}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-[#101111]">{rate.mfnRate}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-[#101111]">{rate.usaRate}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-[#101111]">{rate.euRate}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-[#101111]">{rate.chinaRate}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/compliance/fta" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <TrendingDown className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">FTA Savings Calculator</h3>
              <p className="text-sm text-white/70 mb-4">Calculate how much you can save with Free Trade Agreements.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Calculate Savings <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/hs-code-guide" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <FileText className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">HS Code Guide</h3>
              <p className="text-sm text-white/70 mb-4">Learn how to find the correct HS code for your products.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Read Guide <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/regulations" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Info className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Anti-Dumping Duties</h3>
              <p className="text-sm text-white/70 mb-4">Check for special duties that may apply to your products.</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Help with Duty Calculations?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our trade experts can help you understand complex duty rates and optimize your supply chain.
          </p>
          <Link href="/consultations" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Book Consultation <ChevronRight className="w-4 h-4" />
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