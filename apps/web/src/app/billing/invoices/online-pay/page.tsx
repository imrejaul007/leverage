'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Bell,
  Menu,
  X,
  ArrowRight,
  Smartphone,
  Monitor,
  Lock,
  CheckCircle,
  FileText,
  Globe,
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

const paymentMethods = [
  { id: 1, name: 'Credit Card', icon: CreditCard, enabled: true },
  { id: 2, name: 'Bank Transfer', icon: Monitor, enabled: true },
  { id: 3, name: 'Digital Wallet', icon: Smartphone, enabled: true },
];

const recentPayments = [
  { id: 'PAY-2024-001', invoice: 'INV-2024-001', amount: '$12,500', method: 'Credit Card', date: 'Jan 15, 2024', status: 'completed' },
  { id: 'PAY-2024-002', invoice: 'INV-2024-002', amount: '$8,200', method: 'Bank Transfer', date: 'Jan 14, 2024', status: 'completed' },
  { id: 'PAY-2024-003', invoice: 'INV-2024-003', amount: '$24,000', method: 'Credit Card', date: 'Jan 17, 2024', status: 'pending' },
];

export default function OnlinePayPage() {
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
      <section className="bg-gradient-to-br from-[#5D1E21] to-[#7a2830] px-4 sm:px-8 pt-8 pb-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CreditCard className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Online Pay
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Accept online payments from clients with secure payment links.
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
              <p className="text-2xl font-bold text-[#154230]">$89K</p>
              <p className="text-sm text-[#4A4A4A]">Online Payments</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">45</p>
              <p className="text-sm text-[#4A4A4A]">Transactions</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">98%</p>
              <p className="text-sm text-[#4A4A4A]">Success Rate</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-2xl font-bold text-[#154230]">2.9%</p>
              <p className="text-sm text-[#4A4A4A]">Processing Fee</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="p-6 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111]">Accepted Payment Methods</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id} className="flex items-center gap-4 p-4 bg-[#f7f5f1] rounded-xl">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-[#154230]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[#101111]">{method.name}</div>
                        <div className="text-sm text-[#4A4A4A]">{method.enabled ? 'Enabled' : 'Disabled'}</div>
                      </div>
                      <CheckCircle className={`w-5 h-5 ${method.enabled ? 'text-green-500' : 'text-gray-300'}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Online Payments */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111]">Recent Online Payments</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-[#154230]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[#101111]">{payment.id}</div>
                        <div className="text-sm text-[#4A4A4A]">{payment.invoice} - {payment.method} - {payment.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#101111]">{payment.amount}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${payment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-[#154230] rounded-xl p-6 text-center">
              <Lock className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Secure Payments</h3>
              <p className="text-sm text-white/70">PCI-compliant payment processing</p>
            </div>
            <div className="bg-[#5D1E21] rounded-xl p-6 text-center">
              <Smartphone className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Mobile Friendly</h3>
              <p className="text-sm text-white/70">Clients can pay from any device</p>
            </div>
            <div className="bg-[#154230] rounded-xl p-6 text-center">
              <CheckCircle className="w-10 h-10 text-white mx-auto mb-3" />
              <h3 className="font-bold text-white mb-2">Instant Notifications</h3>
              <p className="text-sm text-white/70">Get notified when payments arrive</p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get Paid Faster Online</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Send payment links and accept credit cards, bank transfers, and digital wallets.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Enable Online Pay <ArrowRight className="w-4 h-4" />
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