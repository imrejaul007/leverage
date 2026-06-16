'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Receipt,
  CreditCard,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Menu,
  X,
  FileText,
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  Users,
  Bell,
  ArrowRight,
} from 'lucide-react';

const billingStats = [
  { label: 'Total Revenue', value: '$124,500', change: '+12.5%', up: true, icon: DollarSign },
  { label: 'Outstanding', value: '$18,200', change: '-3.2%', up: false, icon: Wallet },
  { label: 'Paid This Month', value: '$45,800', change: '+8.1%', up: true, icon: CheckCircle },
  { label: 'Pending Invoices', value: '23', change: '-5', up: false, icon: Clock },
];

const recentInvoices = [
  { id: 'INV-2024-001', client: 'ABC Imports Ltd', amount: '$12,500', status: 'paid', date: 'Jan 15, 2024' },
  { id: 'INV-2024-002', client: 'Global Trade Co', amount: '$8,200', status: 'pending', date: 'Jan 14, 2024' },
  { id: 'INV-2024-003', client: 'Pacific Rim Ltd', amount: '$24,000', status: 'sent', date: 'Jan 17, 2024' },
  { id: 'INV-2024-004', client: 'Euro Logistics', amount: '$6,800', status: 'draft', date: 'Jan 18, 2024' },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    paid: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    sent: 'bg-blue-100 text-blue-700',
    draft: 'bg-gray-100 text-gray-700',
    overdue: 'bg-red-100 text-red-700',
  };
  return styles[status] || styles.draft;
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    paid: 'Paid',
    pending: 'Pending',
    sent: 'Sent',
    draft: 'Draft',
    overdue: 'Overdue',
  };
  return labels[status] || status;
};

export default function BillingLandingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'payments'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
              <Link href="/billing" className="nav-link font-medium text-[#154230]">Overview</Link>
              <Link href="/billing/invoices" className="nav-link font-medium">Invoices</Link>
              <Link href="/billing/payments" className="nav-link font-medium">Payments</Link>
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
                <Link href="/billing" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Overview</Link>
                <Link href="/billing/invoices" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Invoices</Link>
                <Link href="/billing/payments" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Payments</Link>
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
              <Receipt className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Trade Billing Platform
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Manage invoices, track payments, and stay on top of your trade finances.
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
                    placeholder="Search invoices or clients..."
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
            {billingStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/70">{stat.label}</p>
                  <div className={`flex items-center justify-center gap-1 mt-1 ${stat.up ? 'text-green-300' : 'text-red-300'}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span className="text-xs">{stat.change}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
              <div className="w-14 h-14 bg-[#154230]/10 rounded-xl flex items-center justify-center">
                <Plus className="w-7 h-7 text-[#154230]" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[#101111]">New Invoice</h3>
                <p className="text-sm text-[#4A4A4A]">Create a new invoice</p>
              </div>
            </button>
            <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
              <div className="w-14 h-14 bg-[#A6824A]/10 rounded-xl flex items-center justify-center">
                <Receipt className="w-7 h-7 text-[#A6824A]" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[#101111]">Recurring</h3>
                <p className="text-sm text-[#4A4A4A]">Set up recurring bills</p>
              </div>
            </button>
            <button className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
              <div className="w-14 h-14 bg-[#5D1E21]/10 rounded-xl flex items-center justify-center">
                <PiggyBank className="w-7 h-7 text-[#5D1E21]" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-[#101111]">Expenses</h3>
                <p className="text-sm text-[#4A4A4A]">Track business expenses</p>
              </div>
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button onClick={() => setActiveTab('overview')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'overview' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Overview
              </button>
              <button onClick={() => setActiveTab('invoices')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'invoices' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Receipt className="w-4 h-4 inline mr-2" />
                Invoices
              </button>
              <button onClick={() => setActiveTab('payments')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'payments' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <CreditCard className="w-4 h-4 inline mr-2" />
                Payments
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#101111] mb-2">Financial Overview</h3>
                  <p className="text-[#4A4A4A]">Track your revenue, expenses, and financial health.</p>
                </div>
              )}

              {activeTab === 'invoices' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#101111]">Recent Invoices</h2>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-4 py-2 border border-black/10 rounded-lg text-sm font-medium hover:bg-black/5 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                        <Plus className="w-4 h-4" />
                        New Invoice
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {recentInvoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-[#154230]" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#101111]">{invoice.id}</div>
                            <div className="text-sm text-[#4A4A4A]">{invoice.client} - {invoice.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#101111]">{invoice.amount}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(invoice.status)}`}>
                            {getStatusLabel(invoice.status)}
                          </span>
                          <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#101111] mb-2">Payment History</h3>
                  <p className="text-[#4A4A4A] mb-4">View all your payment transactions.</p>
                  <button className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    View All Payments
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Receipt className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Auto-Invoicing</h3>
              <p className="text-sm text-[#4A4A4A]">Generate invoices automatically</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Multi-Currency</h3>
              <p className="text-sm text-[#4A4A4A]">Support for 50+ currencies</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Bank Sync</h3>
              <p className="text-sm text-[#4A4A4A]">Automatic reconciliation</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-1">Tax Ready</h3>
              <p className="text-sm text-[#4A4A4A]">VAT & GST compliant</p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Manage Your Trade Finances</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Create professional invoices, track payments, and stay on top of your cash flow.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Start Billing Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

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
                <li><Link href="/documents" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link href="/freight" className="hover:text-white transition-colors">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
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