'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  Bell,
  Menu,
  X,
  Globe,
  ShoppingCart,
  Clock,
  CheckCircle,
  Truck,
  DollarSign,
  ArrowRight,
  Filter,
  ChevronDown,
  Star,
  Package,
  AlertCircle,
  BarChart3,
  Calendar,
  RefreshCw,
} from 'lucide-react';

const sampleOrders = [
  {
    id: 'ORD-2024-001',
    product: 'Premium Basmati Rice 1121',
    supplier: 'Global Trade Exports',
    quantity: '50 MT',
    total: 42500,
    status: 'in_transit',
    statusLabel: 'In Transit',
    date: '2024-01-15',
    eta: '2024-02-10',
  },
  {
    id: 'ORD-2024-002',
    product: 'Organic Cotton Yarn 40s',
    supplier: 'Cotton World Ltd',
    quantity: '2,000 KG',
    total: 8400,
    status: 'processing',
    statusLabel: 'Processing',
    date: '2024-01-18',
    eta: '2024-02-20',
  },
  {
    id: 'ORD-2024-003',
    product: 'Copper Cathode 99.99%',
    supplier: 'MetalLink Global',
    quantity: '25 MT',
    total: 181250,
    status: 'delivered',
    statusLabel: 'Delivered',
    date: '2024-01-05',
    eta: '2024-01-25',
  },
  {
    id: 'ORD-2024-004',
    product: 'Solar Panels 550W Mono',
    supplier: 'Shanghai Import Co.',
    quantity: '500 units',
    total: 82500,
    status: 'pending',
    statusLabel: 'Pending Payment',
    date: '2024-01-20',
    eta: '2024-03-15',
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-[#A6824A]/10 text-[#A6824A]',
  processing: 'bg-blue-100 text-blue-700',
  in_transit: 'bg-purple-100 text-purple-700',
  delivered: 'bg-[#154230]/10 text-[#154230]',
  cancelled: 'bg-red-100 text-red-700',
};

const benefits = [
  { icon: Truck, title: 'Track Shipments', desc: 'Real-time freight tracking' },
  { icon: FileText, title: 'Auto Documents', desc: 'Trade docs generated automatically' },
  { icon: CheckCircle, title: 'Quality Check', desc: 'Inspection services available' },
  { icon: DollarSign, title: 'Secure Payments', desc: 'Escrow and payment protection' },
];

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: BarChart3 },
  { name: 'AI Assistant', href: '/ai', icon: BarChart3 },
  { name: 'Billing', href: '/billing', icon: DollarSign },
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

export default function OrdersMarketplacePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/rfqs" className="nav-link font-medium">RFQs</Link>
              <Link href="/orders" className="nav-link font-medium text-[#154230]">Orders</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
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
                <Link href="/rfqs" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">RFQs</Link>
                <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Orders</Link>
                <Link href="/documents" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
                <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
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
              <ShoppingCart className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Your Orders
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Track, manage, and monitor all your trade orders in one place. From placement to delivery.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by order ID, product, or supplier..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#5D1E21] hover:bg-[#7b1c1f] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-white/70">Total Orders</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">$2.4M</p>
              <p className="text-sm text-white/70">Total Value</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-white/70">In Transit</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-white/70">On-Time Rate</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Orders List */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#101111]">Recent Orders</h2>
                  <p className="text-sm text-[#4A4A4A]">Track and manage your purchase orders</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#f7f5f1] hover:bg-[#E6E2DA] rounded-lg transition-colors text-sm font-medium"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <Link href="/marketplace" className="flex items-center gap-2 px-4 py-2 bg-[#154230] hover:bg-[#1d5240] text-white rounded-lg transition-colors text-sm font-medium">
                    <ShoppingCart className="w-4 h-4" />
                    New Order
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {sampleOrders.map((order) => (
                  <Link key={order.id} href={`/orders/${order.id}`} className="block bg-[#f7f5f1] rounded-xl p-5 hover:bg-[#E6E2DA] transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm text-[#4A4A4A]">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                            {order.statusLabel}
                          </span>
                        </div>
                        <h3 className="font-bold text-[#101111] text-lg mb-1">{order.product}</h3>
                        <p className="text-sm text-[#4A4A4A] mb-2">by {order.supplier}</p>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[#4A4A4A]">
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {order.quantity}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {order.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Truck className="w-4 h-4" />
                            ETA: {order.eta}
                          </span>
                        </div>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#101111]">${order.total.toLocaleString()}</p>
                          <p className="text-xs text-[#4A4A4A]">Total Value</p>
                        </div>
                        <button
                          onClick={(e) => { e.preventDefault(); }}
                          className="px-4 py-2 bg-[#5D1E21] text-white text-sm font-medium rounded-lg hover:bg-[#7b1c1f] transition-colors flex items-center gap-2"
                        >
                          Track Order
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/orders" className="inline-flex items-center gap-2 px-6 py-3 text-[#154230] font-semibold hover:underline">
                  View All Orders
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="bg-[#154230] rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-white/70">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#154230] to-[#5D1E21] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Your Next Order</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Browse our marketplace and place your first order with secure payment protection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/marketplace" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Browse Marketplace
            </Link>
            <Link href="/rfqs/new" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              Post RFQ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - 50% Green / 50% Maroon */}
      <footer className="bg-[#154230]">
        {/* Top section - Green */}
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

        {/* Bottom section - Maroon */}
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
