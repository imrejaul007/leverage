'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Plus,
  Bell,
  Menu,
  X,
  ArrowRight,
  Save,
  Send,
  FileText,
  Globe,
  Bot,
  Megaphone,
  Truck,
  Shield,
  Receipt,
  Trash2,
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

const lineItems = [
  { id: 1, description: 'Consulting Services - Q1 2024', quantity: 1, rate: 5000 },
  { id: 2, description: 'Logistics Coordination', quantity: 10, rate: 250 },
];

export default function NewInvoicePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-2024-005',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    issueDate: '2024-01-18',
    dueDate: '2024-02-18',
    notes: '',
  });

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
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Plus className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                New Invoice
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Create professional invoices in minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Invoice Form */}
            <div className="p-6 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111]">Invoice Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#101111] mb-2">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#101111] mb-2">Issue Date</label>
                  <input
                    type="date"
                    value={invoiceData.issueDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
                    className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#101111] mb-2">Client Name</label>
                  <input
                    type="text"
                    placeholder="Enter client name"
                    value={invoiceData.clientName}
                    onChange={(e) => setInvoiceData({ ...invoiceData, clientName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#101111] mb-2">Due Date</label>
                  <input
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                    className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#101111] mb-2">Client Email</label>
                  <input
                    type="email"
                    placeholder="Enter client email"
                    value={invoiceData.clientEmail}
                    onChange={(e) => setInvoiceData({ ...invoiceData, clientEmail: e.target.value })}
                    className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#101111] mb-2">Client Address</label>
                  <textarea
                    placeholder="Enter client address"
                    value={invoiceData.clientAddress}
                    onChange={(e) => setInvoiceData({ ...invoiceData, clientAddress: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230] resize-none"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#101111]">Line Items</h3>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-[#154230] text-white text-sm font-medium rounded-lg hover:bg-[#1d5240] transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>
                <div className="space-y-3">
                  {lineItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-[#f7f5f1] rounded-xl">
                      <div className="flex-1">
                        <input
                          type="text"
                          defaultValue={item.description}
                          className="w-full px-3 py-2 bg-white rounded-lg text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]"
                        />
                      </div>
                      <div className="w-20">
                        <input
                          type="number"
                          defaultValue={item.quantity}
                          className="w-full px-3 py-2 bg-white rounded-lg text-[#101111] text-center focus:outline-none focus:ring-2 focus:ring-[#154230]"
                        />
                      </div>
                      <div className="w-32">
                        <input
                          type="number"
                          defaultValue={item.rate}
                          className="w-full px-3 py-2 bg-white rounded-lg text-[#101111] text-center focus:outline-none focus:ring-2 focus:ring-[#154230]"
                        />
                      </div>
                      <div className="w-32 text-right font-bold text-[#101111]">
                        ${(item.quantity * item.rate).toLocaleString()}
                      </div>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#101111] mb-2">Notes</label>
                <textarea
                  placeholder="Add any notes or payment terms..."
                  value={invoiceData.notes}
                  onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230] resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#154230] text-white font-semibold rounded-xl hover:bg-[#1d5240] transition-colors">
                  <Save className="w-5 h-5" />
                  Save as Draft
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#A6824A] text-white font-semibold rounded-xl hover:bg-[#8a6a3a] transition-colors">
                  <Send className="w-5 h-5" />
                  Create & Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

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