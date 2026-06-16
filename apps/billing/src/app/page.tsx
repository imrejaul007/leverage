'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Plus,
  DollarSign,
  FileText,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  Calendar,
  Clock,
  Eye,
  Download,
  Send,
} from 'lucide-react';

const invoices = [
  { id: 'INV-2024-001', client: 'ABC Imports', amount: 24500, status: 'paid', date: 'Jun 15, 2024' },
  { id: 'INV-2024-002', client: 'Global Trade Co', amount: 18200, status: 'pending', date: 'Jul 1, 2024' },
  { id: 'INV-2024-003', client: 'Pacific Rim', amount: 31500, status: 'pending', date: 'Jul 15, 2024' },
  { id: 'INV-2024-004', client: 'Euro Logistics', amount: 8900, status: 'overdue', date: 'Jun 1, 2024' },
];

const transactions = [
  { type: 'income', desc: 'Payment from ABC Imports', amount: 24500, date: 'Jun 15, 2024' },
  { type: 'expense', desc: 'Freight charges', amount: 3200, date: 'Jun 14, 2024' },
  { type: 'income', desc: 'Deposit from Global Trade', amount: 5000, date: 'Jun 12, 2024' },
];

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'payments'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      overdue: 'bg-red-100 text-red-700',
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
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Billing</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/billing" className="nav-link font-medium">Overview</Link>
              <Link href="/billing/invoices" className="nav-link font-medium">Invoices</Link>
              <Link href="/billing/payments" className="nav-link font-medium">Payments</Link>
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Billing & Payments
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Create invoices, track payments, and manage your cash flow. Integrated with all LEVERAGE services.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Total Revenue</div>
              <div className="text-2xl font-bold text-[#101111]">$128,500</div>
              <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                <TrendingUp className="w-4 h-4" />
                +12.5%
              </div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Pending</div>
              <div className="text-2xl font-bold text-[#101111]">$58,600</div>
              <div className="text-sm text-[#4A4A4A] mt-1">8 invoices</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Overdue</div>
              <div className="text-2xl font-bold text-red-600">$8,900</div>
              <div className="text-sm text-red-600 mt-1">1 invoice</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Paid This Month</div>
              <div className="text-2xl font-bold text-green-600">$42,700</div>
              <div className="text-sm text-[#4A4A4A] mt-1">12 invoices</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button onClick={() => setActiveTab('overview')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'overview' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Overview
              </button>
              <button onClick={() => setActiveTab('invoices')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'invoices' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <FileText className="w-4 h-4 inline mr-2" />
                Invoices
              </button>
              <button onClick={() => setActiveTab('payments')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'payments' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <CreditCard className="w-4 h-4 inline mr-2" />
                Payments
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-[#101111]">Recent Invoices</h2>
                      <button className="text-[#154230] font-medium text-sm hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                      {invoices.slice(0, 3).map((inv) => (
                        <div key={inv.id} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                          <div>
                            <div className="font-medium text-[#101111]">{inv.id}</div>
                            <div className="text-sm text-[#4A4A4A]">{inv.client}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-[#101111]">${inv.amount.toLocaleString()}</div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(inv.status)}`}>{inv.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-[#101111]">Recent Transactions</h2>
                      <button className="text-[#154230] font-medium text-sm hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                      {transactions.map((tx) => (
                        <div key={tx.desc} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                              {tx.type === 'income' ? <ArrowDownRight className="w-5 h-5 text-green-600" /> : <ArrowUpRight className="w-5 h-5 text-red-600" />}
                            </div>
                            <div>
                              <div className="font-medium text-[#101111]">{tx.desc}</div>
                              <div className="text-sm text-[#4A4A4A]">{tx.date}</div>
                            </div>
                          </div>
                          <div className={`font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                            {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'invoices' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#101111]">All Invoices</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                      <Plus className="w-4 h-4" />
                      New Invoice
                    </button>
                  </div>
                  <div className="space-y-4">
                    {invoices.map((inv) => (
                      <div key={inv.id} className="p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-sm text-[#4A4A4A]">Invoice</div>
                            <div className="text-lg font-bold text-[#101111]">{inv.id}</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(inv.status)}`}>{inv.status}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[#4A4A4A]">Client: </span>
                            <span className="font-medium">{inv.client}</span>
                          </div>
                          <div className="text-xl font-bold text-[#154230]">${inv.amount.toLocaleString()}</div>
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
                  <p className="text-[#4A4A4A]">View all your income and expense transactions.</p>
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