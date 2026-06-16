'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Globe,
  Bell,
  Menu,
  X,
  ArrowRight,
  DollarSign,
  TrendingUp,
  CreditCard,
  Settings,
  FileText,
  Bot,
  Megaphone,
  Truck,
  Shield,
  Receipt,
  Users,
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

const popularCurrencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.00 },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 7.24 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 149.50 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.53 },
];

const recentTransactions = [
  { id: 'TXN-001', client: 'ABC Imports', amount: '€12,500', base: '$13,587', currency: 'EUR', date: 'Jan 15, 2024' },
  { id: 'TXN-002', client: 'Global Trade Co', amount: '£8,200', base: '$10,380', currency: 'GBP', date: 'Jan 14, 2024' },
  { id: 'TXN-003', client: 'Pacific Rim Ltd', amount: '¥2,400,000', base: '$16,055', currency: 'JPY', date: 'Jan 17, 2024' },
];

export default function MultiCurrencyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Billing</span>
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
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Multi-Currency Billing
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Accept and manage payments in multiple currencies with real-time exchange rates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">50+</p>
              <p className="text-sm text-[#4A4A4A]">Supported Currencies</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">$245K</p>
              <p className="text-sm text-[#4A4A4A]">Multi-Currency Revenue</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">Real-time</p>
              <p className="text-sm text-[#4A4A4A]">Exchange Rates</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">0.5%</p>
              <p className="text-sm text-[#4A4A4A]">FX Conversion Fee</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Link href="/billing/invoices/new" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Create Invoice</h3>
                <p className="text-sm text-white/70">In any currency</p>
              </div>
            </Link>
            <button className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Manage Currencies</h3>
                <p className="text-sm text-white/70">Add or remove currencies</p>
              </div>
            </button>
            <button className="bg-[#A6824A] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">View Reports</h3>
                <p className="text-sm text-white/70">Currency conversion reports</p>
              </div>
            </button>
          </div>

          {/* Currency Rates */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111]">Popular Currency Rates (USD Base)</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularCurrencies.map((currency) => (
                  <div key={currency.code} className="p-4 bg-[#f7f5f1] rounded-xl text-center">
                    <div className="text-2xl font-bold text-[#154230]">{currency.symbol}</div>
                    <div className="font-medium text-[#101111]">{currency.code}</div>
                    <div className="text-sm text-[#4A4A4A]">{currency.rate}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111]">Recent Multi-Currency Transactions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentTransactions.map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <Globe className="w-6 h-6 text-[#154230]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#101111]">{txn.client}</div>
                        <div className="text-sm text-[#4A4A4A]">{txn.id} - {txn.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-[#101111]">{txn.amount}</div>
                        <div className="text-sm text-[#4A4A4A]">~{txn.base} USD</div>
                      </div>
                      <span className="px-3 py-1 bg-[#154230]/10 text-[#154230] rounded-full text-xs font-medium">
                        {txn.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-[#5D1E21] rounded-xl p-6 text-center">
              <Globe className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Global Coverage</h3>
              <p className="text-sm text-white/70">50+ currencies from major markets worldwide</p>
            </div>
            <div className="bg-[#154230] rounded-xl p-6 text-center">
              <TrendingUp className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Real-Time Rates</h3>
              <p className="text-sm text-white/70">Exchange rates update every few minutes</p>
            </div>
            <div className="bg-[#5D1E21] rounded-xl p-6 text-center">
              <CreditCard className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Automatic Conversion</h3>
              <p className="text-sm text-white/70">Convert to your base currency automatically</p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Go Global with Multi-Currency</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Accept payments from clients worldwide in their preferred currency.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Start Multi-Currency <ArrowRight className="w-4 h-4" />
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