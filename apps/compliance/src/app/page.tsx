'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  Shield,
  Scale,
  Calculator,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Menu,
  X,
  BookOpen,
  FileText,
  ChevronRight,
} from 'lucide-react';

const hsCodes = [
  { code: '8471.30.01', desc: 'Portable data processing machines', duty: '0%' },
  { code: '8517.12.00', desc: 'Mobile phones', duty: '0%' },
  { code: '6204.62.40', desc: "Women's cotton trousers", duty: '16.6%' },
  { code: '6402.91.50', desc: 'Rubber footwear', duty: '37.5%' },
];

const complianceChecks = [
  { name: 'Export License', status: 'pass' },
  { name: 'FDA Registration', status: 'warning' },
  { name: 'CE Marking', status: 'pass' },
  { name: 'Sanctions Check', status: 'pass' },
];

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<'hs-codes' | 'calculator' | 'checks'>('hs-codes');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusIcon = (status: string) => {
    if (status === 'pass') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'warning') return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <AlertTriangle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Compliance</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/compliance" className="nav-link font-medium">HS Codes</Link>
              <Link href="/compliance/calculator" className="nav-link font-medium">Duty Calculator</Link>
              <Link href="/compliance/checks" className="nav-link font-medium">Checks</Link>
            </nav>

            <div className="flex items-center gap-3">
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
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">HS Codes</Link>
                <Link href="/compliance/calculator" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Duty Calculator</Link>
                <Link href="/compliance/checks" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Checks</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Trade Compliance Platform
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Verify HS codes, calculate duties, and ensure compliance across 180+ countries.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search HS codes or products..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <BookOpen className="w-6 h-6" />
              <span className="text-sm font-medium">HS Lookup</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <Calculator className="w-6 h-6" />
              <span className="text-sm font-medium">Duty Calc</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <FileCheck className="w-6 h-6" />
              <span className="text-sm font-medium">Compliance</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <Shield className="w-6 h-6" />
              <span className="text-sm font-medium">Learn</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button onClick={() => setActiveTab('hs-codes')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'hs-codes' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <BookOpen className="w-4 h-4 inline mr-2" />
                HS Codes
              </button>
              <button onClick={() => setActiveTab('calculator')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'calculator' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Calculator className="w-4 h-4 inline mr-2" />
                Duty Calculator
              </button>
              <button onClick={() => setActiveTab('checks')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'checks' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <FileCheck className="w-4 h-4 inline mr-2" />
                Compliance
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'hs-codes' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#101111]">HS Code Database</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                      <Plus className="w-4 h-4" />
                      Add Product
                    </button>
                  </div>
                  <div className="space-y-4">
                    {hsCodes.map((hs) => (
                      <div key={hs.code} className="p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm text-[#4A4A4A]">HS Code</div>
                            <div className="text-xl font-bold text-[#101111]">{hs.code}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-[#4A4A4A]">Duty Rate</div>
                            <div className="text-xl font-bold text-[#154230]">{hs.duty}</div>
                          </div>
                        </div>
                        <p className="text-sm text-[#4A4A4A] mt-2">{hs.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'calculator' && (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#101111] mb-2">Duty Calculator</h3>
                  <p className="text-[#4A4A4A] mb-4">Calculate landed costs including duties and taxes.</p>
                  <button className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    Calculate Duty
                  </button>
                </div>
              )}

              {activeTab === 'checks' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#101111]">Compliance Checklist</h2>
                    <div className="px-4 py-2 bg-[#154230]/10 rounded-lg text-sm font-medium text-[#154230]">
                      Score: 75%
                    </div>
                  </div>
                  <div className="space-y-4">
                    {complianceChecks.map((check) => (
                      <div key={check.name} className="flex items-center gap-4 p-4 bg-[#f7f5f1] rounded-xl">
                        {getStatusIcon(check.status)}
                        <div className="flex-1">
                          <div className="font-medium text-[#101111]">{check.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#101111] text-white px-4 sm:px-8 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain mb-4 brightness-0 invert" />
              <p className="text-sm text-gray-400">The Trade OS for import/export businesses.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link href="/freight" className="hover:text-white transition-colors">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; 2024 LEVERAGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}