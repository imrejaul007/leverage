'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Calculator,
  FileCheck,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Globe,
  Menu,
  X,
  BookOpen,
  Percent,
  ClipboardCheck,
  Lock,
  TrendingUp,
  Building,
  Bell,
  ArrowRight,
  FileText,
  Bot,
  Receipt,
  Megaphone,
  Users,
  Truck,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'AI Assistant', href: '/ai', icon: Bot },
  { name: 'Billing', href: '/billing', icon: Receipt },
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

const complianceTools = [
  { icon: Search, name: 'HS Code Search', desc: 'Find correct classifications', color: '#154230', href: '/compliance/hs-code-search' },
  { icon: Calculator, name: 'Duty Calculator', desc: 'Estimate import costs', color: '#A6824A', href: '/compliance/duty-rates' },
  { icon: ClipboardCheck, name: 'Compliance Check', desc: 'Verify requirements', color: '#5D1E21', href: '/compliance/hs-codes' },
  { icon: FileCheck, name: 'Document Review', desc: 'Validate trade docs', color: '#154230', href: '/compliance/document-review' },
];

const recentChecks = [
  { id: 'CC-2024-001', product: 'Electronics Components', hsCode: '8542.31', status: 'compliant', country: 'China → USA' },
  { id: 'CC-2024-002', product: 'Textile Fabrics', hsCode: '5208.22', status: 'review', country: 'India → EU' },
  { id: 'CC-2024-003', product: 'Auto Parts', hsCode: '8708.99', status: 'compliant', country: 'Japan → Canada' },
];

export default function ComplianceLandingPage() {
  const [activeTab, setActiveTab] = useState<'tools' | 'checks' | 'resources'>('tools');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hsSearch, setHsSearch] = useState('');

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      compliant: 'bg-green-100 text-green-700',
      review: 'bg-yellow-100 text-yellow-700',
      violation: 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
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
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/documents" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Compliance</Link>
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
              <Shield className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Trade Compliance Center
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Verify HS codes, calculate duties, and ensure your shipments meet all regulatory requirements.
            </p>
          </motion.div>

          {/* HS Code Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    value={hsSearch}
                    onChange={(e) => setHsSearch(e.target.value)}
                    placeholder="Search HS codes or product descriptions..."
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

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm text-white/70">HS Codes</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">180+</p>
              <p className="text-sm text-white/70">Countries</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">99.2%</p>
              <p className="text-sm text-white/70">Accuracy</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-white/70">Updates</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Compliance Tools - Alternating Solid Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {complianceTools.map((tool, index) => {
              const Icon = tool.icon;
              const isGreen = index % 2 === 0;
              return (
                <Link key={tool.name} href={tool.href} className={`rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-white/20">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{tool.name}</h3>
                  <p className="text-sm text-white/70">{tool.desc}</p>
                </Link>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button onClick={() => setActiveTab('tools')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'tools' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Shield className="w-4 h-4 inline mr-2" />
                Tools
              </button>
              <button onClick={() => setActiveTab('checks')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'checks' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <FileCheck className="w-4 h-4 inline mr-2" />
                Recent Checks
              </button>
              <button onClick={() => setActiveTab('resources')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'resources' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <BookOpen className="w-4 h-4 inline mr-2" />
                Resources
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'tools' && (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#101111] mb-2">Compliance Tools</h3>
                  <p className="text-[#4A4A4A] mb-4">Search HS codes, calculate duties, and verify compliance requirements.</p>
                  <Link href="/compliance/check" className="inline-block px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    Start Compliance Check
                  </Link>
                </div>
              )}

              {activeTab === 'checks' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#101111]">Recent Compliance Checks</h2>
                    <Link href="/compliance/hs-codes" className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                      <FileCheck className="w-4 h-4" />
                      New Check
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {recentChecks.map((check) => (
                      <Link key={check.id} href={`/compliance/checks/${check.id}`} className="block p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-sm text-[#4A4A4A]">Check ID</div>
                            <div className="text-lg font-bold text-[#101111]">{check.id}</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(check.status)}`}>
                            {check.status === 'compliant' ? 'Compliant' : 'Under Review'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mb-4">
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
                        </div>
                        <div className="flex items-center justify-between text-sm text-[#4A4A4A]">
                          <span className="flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            View full report
                          </span>
                          <span className="text-[#154230] font-medium hover:underline">View Details →</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/compliance/hs-code-guide" className="p-6 bg-[#154230] rounded-xl hover:bg-[#1d5240] transition-colors">
                    <BookOpen className="w-8 h-8 text-white mb-4" />
                    <h3 className="font-bold text-white mb-2">HS Code Guide</h3>
                    <p className="text-sm text-white/70 mb-4">Comprehensive guide to Harmonized System codes and classification.</p>
                    <span className="text-white font-medium flex items-center gap-1">
                      Read More <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link href="/compliance/duty-rates" className="p-6 bg-[#5D1E21] rounded-xl hover:bg-[#7b1c1f] transition-colors">
                    <Percent className="w-8 h-8 text-white mb-4" />
                    <h3 className="font-bold text-white mb-2">Duty Rates Database</h3>
                    <p className="text-sm text-white/70 mb-4">Latest duty rates for 180+ countries and trade agreements.</p>
                    <span className="text-white font-medium flex items-center gap-1">
                      Read More <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link href="/compliance/regulations" className="p-6 bg-[#154230] rounded-xl hover:bg-[#1d5240] transition-colors">
                    <Lock className="w-8 h-8 text-white mb-4" />
                    <h3 className="font-bold text-white mb-2">Import Regulations</h3>
                    <p className="text-sm text-white/70 mb-4">Stay updated on changing import regulations and restrictions.</p>
                    <span className="text-white font-medium flex items-center gap-1">
                      Read More <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Features - Alternating Solid Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/compliance/updates" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Real-Time Updates</h3>
              <p className="text-sm text-white/70">Latest regulatory changes</p>
            </Link>
            <Link href="/compliance/support" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Expert Support</h3>
              <p className="text-sm text-white/70">Dedicated compliance team</p>
            </Link>
            <Link href="/compliance/fta" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">FTA Benefits</h3>
              <p className="text-sm text-white/70">Maximize trade savings</p>
            </Link>
            <Link href="/compliance/risk" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Risk Mitigation</h3>
              <p className="text-sm text-white/70">Avoid penalties</p>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ensure Compliance from Day One</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Avoid costly penalties and delays. Get expert compliance guidance for every shipment.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Start Compliance Check <ArrowRight className="w-4 h-4" />
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
                <Link href="/security" className="text-white/70 hover:text-white text-sm transition-colors">Security</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}