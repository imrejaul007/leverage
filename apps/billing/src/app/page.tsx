'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  DollarSign,
  FileText,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Plus,
  ChevronRight,
  ArrowRight,
  Download,
  Send,
  Settings,
  Menu,
  X,
  Bell,
  User,
  Building2,
  Receipt,
  Wallet,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Eye,
  Edit3,
  Copy,
  Bookmark,
} from 'lucide-react';

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  createdAt: string;
}

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: string;
  category: string;
}

const invoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    client: 'ABC Imports Ltd',
    amount: 24500,
    status: 'paid',
    dueDate: '2024-06-15',
    createdAt: '2024-06-01',
  },
  {
    id: '2',
    number: 'INV-2024-002',
    client: 'Global Trade Co',
    amount: 18200,
    status: 'pending',
    dueDate: '2024-07-01',
    createdAt: '2024-06-10',
  },
  {
    id: '3',
    number: 'INV-2024-003',
    client: 'Pacific Rim Exports',
    amount: 31500,
    status: 'pending',
    dueDate: '2024-07-15',
    createdAt: '2024-06-15',
  },
  {
    id: '4',
    number: 'INV-2024-004',
    client: 'Euro Logistics GmbH',
    amount: 8900,
    status: 'overdue',
    dueDate: '2024-06-01',
    createdAt: '2024-05-15',
  },
];

const transactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    description: 'Payment from ABC Imports',
    amount: 24500,
    date: '2024-06-15',
    category: 'Invoice Payment',
  },
  {
    id: '2',
    type: 'expense',
    description: 'Freight charges - Shipment #1234',
    amount: 3200,
    date: '2024-06-14',
    category: 'Shipping',
  },
  {
    id: '3',
    type: 'income',
    description: 'Deposit from Global Trade',
    amount: 5000,
    date: '2024-06-12',
    category: 'Advance Payment',
  },
  {
    id: '4',
    type: 'expense',
    description: 'Customs duty payment',
    amount: 1850,
    date: '2024-06-10',
    category: 'Duties & Taxes',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'bg-green-100 text-green-700';
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    case 'overdue': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'payments'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalRevenue = 128500;
  const pendingAmount = 58600;
  const overdueAmount = 8900;
  const paidThisMonth = 42700;

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-lg">
                <DollarSign className="w-4 h-4" />
                Billing
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Home</Link>
              <Link href="/marketplace" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Marketplace</Link>
              <Link href="/docs" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Documents</Link>
              <Link href="/freight" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Freight</Link>
              <Link href="/compliance" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Compliance</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/billing/invoices/new" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-lg hover:bg-[#154230]/20 transition-colors">
                <Plus className="w-4 h-4" />
                New Invoice
              </Link>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-black/5"
            >
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
              <Receipt className="w-4 h-4" />
              Billing & Payments
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Get Paid Faster, Track Everything
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Create professional invoices, track payments, and manage your cash flow. Integrated with all LEVERAGE services.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Total Revenue</div>
              <div className="text-2xl font-bold text-[#101111]">${totalRevenue.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                <TrendingUp className="w-4 h-4" />
                +12.5%
              </div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Pending</div>
              <div className="text-2xl font-bold text-[#101111]">${pendingAmount.toLocaleString()}</div>
              <div className="text-sm text-[#4A4A4A] mt-1">8 invoices</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Overdue</div>
              <div className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</div>
              <div className="text-sm text-red-600 mt-1">1 invoice</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="text-sm text-[#4A4A4A] mb-1">Paid This Month</div>
              <div className="text-2xl font-bold text-green-600">${paidThisMonth.toLocaleString()}</div>
              <div className="text-sm text-[#4A4A4A] mt-1">12 invoices</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-20 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'invoices'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Invoices
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'payments'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <CreditCard className="w-4 h-4 inline mr-2" />
                Payments
              </button>
            </div>

            {activeTab === 'overview' && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Invoices */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-[#101111]">Recent Invoices</h2>
                      <button className="text-[#154230] font-medium text-sm hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                      {invoices.slice(0, 3).map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                          <div>
                            <div className="font-medium text-[#101111]">{invoice.number}</div>
                            <div className="text-sm text-[#4A4A4A]">{invoice.client}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-[#101111]">${invoice.amount.toLocaleString()}</div>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                              {invoice.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-[#101111]">Recent Transactions</h2>
                      <button className="text-[#154230] font-medium text-sm hover:underline">View All</button>
                    </div>
                    <div className="space-y-3">
                      {transactions.slice(0, 3).map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {tx.type === 'income' ? (
                                <ArrowDownRight className="w-5 h-5 text-green-600" />
                              ) : (
                                <ArrowUpRight className="w-5 h-5 text-red-600" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-[#101111]">{tx.description}</div>
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
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#101111]">All Invoices</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    <Plus className="w-4 h-4" />
                    New Invoice
                  </button>
                </div>
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-sm text-[#4A4A4A] mb-1">Invoice</div>
                          <div className="text-lg font-bold text-[#101111]">{invoice.number}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-[#4A4A4A]">Client</div>
                          <div className="font-medium">{invoice.client}</div>
                        </div>
                        <div>
                          <div className="text-sm text-[#4A4A4A]">Amount</div>
                          <div className="text-xl font-bold text-[#154230]">${invoice.amount.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-[#4A4A4A]">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {invoice.dueDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white rounded-lg transition-colors" title="View">
                            <Eye className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Edit">
                            <Edit3 className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Download">
                            <Download className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                          <button className="p-2 hover:bg-white rounded-lg transition-colors" title="Send">
                            <Send className="w-4 h-4 text-[#4A4A4A]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-6">Payment History</h2>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="p-6 bg-[#f7f5f1] rounded-xl flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {tx.type === 'income' ? (
                          <ArrowDownRight className="w-6 h-6 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[#101111]">{tx.description}</div>
                        <div className="text-sm text-[#4A4A4A]">{tx.date} • {tx.category}</div>
                      </div>
                      <div className={`text-xl font-bold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#101111] mb-8 text-center">Why Choose LEVERAGE Billing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
              <div className="text-center">
                <div className="w-14 h-14 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-[#154230]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Professional Invoices</h3>
                <p className="text-sm text-[#4A4A4A]">Create branded invoices that get you paid faster.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#A6824A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-7 h-7 text-[#A6824A]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Multiple Payment Methods</h3>
                <p className="text-sm text-[#4A4A4A]">Accept credit cards, wire transfers, and more.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#5D1E21]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-[#5D1E21]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Automated Reminders</h3>
                <p className="text-sm text-[#4A4A4A]">Never miss a payment with smart reminders.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-7 h-7 text-[#154230]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Cash Flow Insights</h3>
                <p className="text-sm text-[#4A4A4A]">Track your revenue and expenses in real-time.</p>
              </div>
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
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
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