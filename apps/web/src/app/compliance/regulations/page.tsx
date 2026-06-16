'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Lock,
  Globe,
  AlertTriangle,
  ChevronRight,
  Search,
  Menu,
  X,
  Bell,
  FileText,
  Shield,
  TrendingUp,
  Clock,
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

const regulationUpdates = [
  { id: 1, title: 'FDA Food Labeling Requirements Updated', category: 'FDA', severity: 'high', date: '2024-11-15', summary: 'New nutritional labeling standards effective January 2025.' },
  { id: 2, title: 'EU Chemical Regulations (REACH) Amendment', category: 'EU', severity: 'medium', date: '2024-11-12', summary: 'Additional substances added to restricted chemicals list.' },
  { id: 3, title: 'US Customs ACE Portal Update', category: 'Customs', severity: 'low', date: '2024-11-10', summary: 'New electronic entry requirements for certain goods.' },
  { id: 4, title: 'China Tariff Exclusions Extended', category: 'China', severity: 'medium', date: '2024-11-08', summary: 'Temporary tariff exclusions on select products extended.' },
];

const regulationCategories = [
  { name: 'Customs & Trade', count: 45, icon: Globe },
  { name: 'Product Safety', count: 32, icon: Shield },
  { name: 'Environmental', count: 28, icon: TrendingUp },
  { name: 'Labor & Social', count: 21, icon: AlertTriangle },
];

export default function RegulationsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const getSeverityBadge = (severity: string) => {
    const styles: Record<string, string> = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-blue-100 text-blue-700',
    };
    return styles[severity] || 'bg-gray-100 text-gray-700';
  };

  const filteredUpdates = filter === 'all'
    ? regulationUpdates
    : regulationUpdates.filter(u => u.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Regulations</span>
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
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Import Regulations
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Stay updated on changing import regulations, restrictions, and compliance requirements for global trade.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    placeholder="Search regulations..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center transition-colors">
                  Search
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">150+</p>
              <p className="text-sm text-white/70">Regulations</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-white/70">Countries</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">Daily</p>
              <p className="text-sm text-white/70">Updates</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-white/70">Monitoring</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {regulationCategories.map((cat, index) => {
              const Icon = cat.icon;
              const isGreen = index % 2 === 0;
              return (
                <button key={cat.name} className={`rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity text-left ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                  <Icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-sm text-white/70">{cat.count} regulations</p>
                </button>
              );
            })}
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#4A4A4A]" />
                Recent Regulatory Updates
              </h2>
              <div className="flex items-center gap-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 bg-[#f7f5f1] rounded-lg text-sm text-[#101111] focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="fda">FDA</option>
                  <option value="eu">EU</option>
                  <option value="customs">Customs</option>
                  <option value="china">China</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredUpdates.map((update, index) => (
                  <div key={update.id} className={`p-6 rounded-xl ${index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 bg-white/20 rounded text-xs text-white">{update.category}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityBadge(update.severity)}`}>
                            {update.severity}
                          </span>
                        </div>
                        <h3 className="font-bold text-white">{update.title}</h3>
                      </div>
                      <span className="flex items-center gap-1 text-white/60 text-sm">
                        <Clock className="w-4 h-4" />
                        {update.date}
                      </span>
                    </div>
                    <p className="text-white/70 mb-4">{update.summary}</p>
                    <Link href={`/compliance/regulations/${update.id}`} className="text-white font-medium text-sm flex items-center gap-1 hover:text-white/80">
                      Read More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/compliance/ai-assist" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <AlertTriangle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">AI Regulation Assistant</h3>
              <p className="text-sm text-white/70 mb-4">Get answers to your specific regulation questions.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Ask AI <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/check" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <Shield className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Compliance Check</h3>
              <p className="text-sm text-white/70 mb-4">Verify your products meet all requirements.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Start Check <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/support" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Globe className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Country-Specific</h3>
              <p className="text-sm text-white/70 mb-4">View regulations for specific countries.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Browse <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Help with Regulations?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our compliance experts can help you understand and navigate complex import regulations.
          </p>
          <Link href="/consultations" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Get Expert Help <ChevronRight className="w-4 h-4" />
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