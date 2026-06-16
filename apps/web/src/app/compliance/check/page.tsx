'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Search,
  FileCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Plus,
  Filter,
  Menu,
  X,
  Bell,
  Download,
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

const recentChecks = [
  { id: 'CC-2024-001', product: 'Electronics Components', hsCode: '8542.31', status: 'compliant', country: 'China → USA', date: '2024-11-15' },
  { id: 'CC-2024-002', product: 'Textile Fabrics', hsCode: '5208.22', status: 'review', country: 'India → EU', date: '2024-11-14' },
  { id: 'CC-2024-003', product: 'Auto Parts', hsCode: '8708.99', status: 'compliant', country: 'Japan → Canada', date: '2024-11-12' },
  { id: 'CC-2024-004', product: 'Medical Devices', hsCode: '9018.90', status: 'violation', country: 'Germany → USA', date: '2024-11-10' },
];

const complianceCategories = [
  { name: 'HS Code Verification', items: 24, compliant: 22 },
  { name: 'Import Licensing', items: 8, compliant: 8 },
  { name: 'Labeling Requirements', items: 12, compliant: 10 },
  { name: 'Documentation', items: 15, compliant: 15 },
];

export default function ComplianceCheckPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: any }> = {
      compliant: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      review: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertTriangle },
      violation: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
    };
    return styles[status] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: AlertTriangle };
  };

  const filteredChecks = filter === 'all'
    ? recentChecks
    : recentChecks.filter(c => c.status === filter);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Compliance Check</span>
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
                <ClipboardCheck className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Compliance Check
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Verify your shipments against import regulations, HS codes, and documentation requirements.
            </p>
          </motion.div>

          {/* Quick Check Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-[#101111] mb-4">Start a New Compliance Check</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-1">
                    <label className="block text-sm text-[#4A4A4A] mb-2">HS Code</label>
                    <input
                      type="text"
                      placeholder="e.g., 8542.31"
                      className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-sm text-[#4A4A4A] mb-2">Product Description</label>
                    <input
                      type="text"
                      placeholder="Product name"
                      className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    />
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-sm text-[#4A4A4A] mb-2">Origin Country</label>
                    <select className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20">
                      <option>Select country</option>
                      <option>China</option>
                      <option>India</option>
                      <option>Vietnam</option>
                      <option>Germany</option>
                    </select>
                  </div>
                  <div className="lg:col-span-1">
                    <label className="block text-sm text-[#4A4A4A] mb-2">Destination</label>
                    <select className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20">
                      <option>Select country</option>
                      <option>USA</option>
                      <option>Canada</option>
                      <option>EU</option>
                      <option>UK</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href="/compliance/check/new" className="h-12 px-6 bg-[#154230] hover:bg-[#1d5240] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                    <Search className="w-5 h-5" />
                    Run Check
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">150+</p>
              <p className="text-sm text-white/70">Checks Run</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">92%</p>
              <p className="text-sm text-white/70">Compliance Rate</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-white/70">Issues Found</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">&lt;2min</p>
              <p className="text-sm text-white/70">Avg. Check Time</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Compliance Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {complianceCategories.map((cat, index) => {
              const isGreen = index % 2 === 0;
              return (
                <div key={cat.name} className={`rounded-xl p-6 shadow-sm ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                  <h3 className="font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-sm text-white/70">{cat.items} items, {cat.compliant} compliant</p>
                </div>
              );
            })}
          </div>

          {/* Recent Checks */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#4A4A4A]" />
                Recent Compliance Checks
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#f7f5f1] rounded-lg p-1">
                  <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-white shadow-sm text-[#101111]' : 'text-[#4A4A4A]'}`}>All</button>
                  <button onClick={() => setFilter('compliant')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'compliant' ? 'bg-white shadow-sm text-[#101111]' : 'text-[#4A4A4A]'}`}>Compliant</button>
                  <button onClick={() => setFilter('review')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'review' ? 'bg-white shadow-sm text-[#101111]' : 'text-[#4A4A4A]'}`}>Review</button>
                  <button onClick={() => setFilter('violation')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${filter === 'violation' ? 'bg-white shadow-sm text-[#101111]' : 'text-[#4A4A4A]'}`}>Issues</button>
                </div>
                <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                  <Filter className="w-5 h-5 text-[#4A4A4A]" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredChecks.map((check) => {
                  const status = getStatusBadge(check.status);
                  const StatusIcon = status.icon;
                  return (
                    <div key={check.id} className="p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-sm text-[#4A4A4A]">Check ID</div>
                          <div className="text-lg font-bold text-[#101111]">{check.id}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.text} flex items-center gap-1`}>
                          <StatusIcon className="w-4 h-4" />
                          {check.status === 'compliant' ? 'Compliant' : check.status === 'review' ? 'Under Review' : 'Issue Found'}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 mb-4 flex-wrap">
                        <div>
                          <span className="text-xs text-[#4A4A4A]">Product</span>
                          <p className="font-medium text-sm">{check.product}</p>
                        </div>
                        <div>
                          <span className="text-xs text-[#4A4A4A]">HS Code</span>
                          <p className="font-medium text-sm font-mono">{check.hsCode}</p>
                        </div>
                        <div>
                          <span className="text-xs text-[#4A4A4A]">Trade Route</span>
                          <p className="font-medium text-sm">{check.country}</p>
                        </div>
                        <div>
                          <span className="text-xs text-[#4A4A4A]">Date</span>
                          <p className="font-medium text-sm">{check.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <Link href={`/compliance/check/${check.id}`} className="text-[#154230] font-medium hover:underline flex items-center gap-1">
                          View Full Report <ChevronRight className="w-4 h-4" />
                        </Link>
                        <button className="text-[#4A4A4A] hover:text-[#101111] flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/compliance/hs-code-guide" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Search className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">HS Code Lookup</h3>
              <p className="text-sm text-white/70 mb-4">Search and verify Harmonized System codes for your products.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Search Codes <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/duty-rates" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <FileCheck className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Duty Calculator</h3>
              <p className="text-sm text-white/70 mb-4">Calculate accurate duty rates based on HS code and trade route.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Calculate <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/regulations" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <AlertTriangle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Regulation Updates</h3>
              <p className="text-sm text-white/70 mb-4">Stay updated on changing import regulations and restrictions.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Updates <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ensure Compliance Before You Ship</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Run a comprehensive compliance check and avoid costly delays and penalties.
          </p>
          <Link href="/compliance/check/new" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            <Plus className="w-4 h-4" />
            Start New Check
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