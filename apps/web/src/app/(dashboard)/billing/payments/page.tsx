'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Receipt,
  CreditCard,
  Plus,
  Search,
  Filter,
  Download,
  Menu,
  X,
  FileText,
  Truck,
  Globe,
  Bot,
  Shield,
  Megaphone,
  Users,
  Bell,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Edit,
  Eye,
  Building,
  Calendar,
  ChevronRight,
  Wallet,
  Banknote,
  ShieldCheck,
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

const paymentMethods = [
  {
    id: 'pm-001',
    type: 'credit_card',
    name: 'Business Visa',
    last4: '4242',
    expiry: '12/26',
    isDefault: true,
    brand: 'visa',
  },
  {
    id: 'pm-002',
    type: 'bank_account',
    name: 'Business Checking',
    last4: '6789',
    isDefault: false,
    bank: 'Chase',
  },
  {
    id: 'pm-003',
    type: 'credit_card',
    name: 'Corporate Amex',
    last4: '1234',
    expiry: '03/27',
    isDefault: false,
    brand: 'amex',
  },
];

const recentPayments = [
  { id: 'PAY-2024-001', description: 'Platform Subscription - Pro Plan', amount: '$299.00', status: 'completed', date: 'Jan 15, 2024', method: 'Visa ****4242' },
  { id: 'PAY-2024-002', description: 'AI Credits Pack - Enterprise', amount: '$199.00', status: 'completed', date: 'Jan 12, 2024', method: 'Visa ****4242' },
  { id: 'PAY-2024-003', description: 'Consultation - Sarah Chen', amount: '$149.00', status: 'completed', date: 'Jan 10, 2024', method: 'Amex ****1234' },
  { id: 'PAY-2024-004', description: 'Platform Subscription - Pro Plan', amount: '$299.00', status: 'pending', date: 'Jan 20, 2024', method: 'Visa ****4242' },
  { id: 'PAY-2024-005', description: 'Export Certificate - 5 pack', amount: '$49.00', status: 'failed', date: 'Jan 8, 2024', method: 'Bank ****6789' },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
    refunded: 'bg-blue-100 text-blue-700',
  };
  return styles[status] || 'bg-gray-100 text-gray-700';
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
    refunded: 'Refunded',
  };
  return labels[status] || status;
};

export default function PaymentsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Payments</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
              <Link href="/billing" className="nav-link font-medium text-[#154230]">Billing</Link>
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
                <Link href="/billing" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Billing</Link>
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
              <CreditCard className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Payment Methods
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Manage your payment methods and view your payment history. Add cards, bank accounts, and more.
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
                    placeholder="Search payments..."
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
              <p className="text-2xl font-bold">$2,847</p>
              <p className="text-sm text-white/70">Total Spent</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-white/70">Transactions</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-white/70">Payment Methods</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">$0</p>
              <p className="text-sm text-white/70">Refunded</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Quick Actions - Alternating Solid Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setShowAddCard(true)}
              className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Add Card</h3>
                <p className="text-sm text-white/70">Add new credit card</p>
              </div>
            </button>
            <Link href="/billing/payments/bank" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Building className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Add Bank</h3>
                <p className="text-sm text-white/70">Link bank account</p>
              </div>
            </Link>
            <Link href="/billing/payments/export" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Download className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white">Export</h3>
                <p className="text-sm text-white/70">Download statements</p>
              </div>
            </Link>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#101111]">Saved Payment Methods</h2>
              <span className="text-sm text-[#4A4A4A]">{paymentMethods.length} methods</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={method.id}
                  className={`p-6 rounded-xl ${
                    index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      {method.type === 'credit_card' ? (
                        <CreditCard className="w-6 h-6 text-white" />
                      ) : (
                        <Building className="w-6 h-6 text-white" />
                      )}
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                        Default
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-1">{method.name}</h3>
                  <p className="text-white/70 text-sm mb-4">
                    {method.type === 'credit_card' ? (
                      <>**** **** **** {method.last4}</>
                    ) : (
                      <>****{method.last4}</>
                    )}
                  </p>
                  {method.type === 'credit_card' && method.expiry && (
                    <p className="text-white/50 text-xs mb-4">Expires {method.expiry}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 py-2 bg-white text-[#154230] font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    {!method.isDefault && (
                      <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-black/5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#101111]">Payment History</h2>
                <Link href="/billing/payments/history" className="flex items-center gap-1 text-[#154230] font-medium hover:underline">
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-black/5">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="p-6 hover:bg-[#f7f5f1] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        payment.status === 'completed' ? 'bg-green-100' :
                        payment.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        {payment.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : payment.status === 'pending' ? (
                          <Clock className="w-6 h-6 text-yellow-600" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#101111]">{payment.description}</h3>
                        <div className="flex items-center gap-3 text-sm text-[#4A4A4A]">
                          <span className="font-mono">{payment.id}</span>
                          <span>•</span>
                          <span>{payment.method}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(payment.status)}`}>
                        {getStatusLabel(payment.status)}
                      </span>
                      <span className="font-bold text-[#101111]">{payment.amount}</span>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-[#f7f5f1] rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-[#4A4A4A]" />
                        </button>
                        <button className="p-2 hover:bg-[#f7f5f1] rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-[#4A4A4A]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features - Alternating Solid Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/billing/payments/security" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Secure</h3>
              <p className="text-sm text-white/70">Bank-level encryption</p>
            </Link>
            <Link href="/billing/payments/autopay" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">AutoPay</h3>
              <p className="text-sm text-white/70">Never miss a payment</p>
            </Link>
            <Link href="/billing/payments/refunds" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Banknote className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Refunds</h3>
              <p className="text-sm text-white/70">Easy refund requests</p>
            </Link>
            <Link href="/billing/payments/support" className="bg-[#154230] rounded-xl p-6 shadow-sm text-center hover:opacity-90 transition-opacity">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-1">Support</h3>
              <p className="text-sm text-white/70">24/7 billing help</p>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Manage Your Payments</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Add payment methods, track your spending, and manage your billing preferences.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Get Started <ArrowRight className="w-4 h-4" />
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
                © 2026 LEVERAGE. All rights reserved.
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
