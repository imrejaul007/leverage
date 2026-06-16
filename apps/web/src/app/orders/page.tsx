'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Users,
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  ArrowRight,
  Menu,
  X,
  Bell,
  FileText,
  Bot,
  Shield,
  Megaphone,
  Receipt,
  Globe,
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

const orders = [
  { id: 'ORD-2024-001', buyer: 'Global Imports LLC', product: 'Basmati Rice 1121 Premium', quantity: '100 MT', value: '$85,000', status: 'in_transit', date: 'Jun 15, 2024' },
  { id: 'ORD-2024-002', buyer: 'EuroTrade Partners', product: 'Organic Cotton Yarn 40s', quantity: '5,000 KG', value: '$21,000', status: 'confirmed', date: 'Jun 14, 2024' },
  { id: 'ORD-2024-003', buyer: 'Asia Pacific Trading', product: 'Electronic Components', quantity: '10,000 pcs', value: '$45,000', status: 'delivered', date: 'Jun 10, 2024' },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    in_transit: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-yellow-100 text-yellow-700',
    delivered: 'bg-green-100 text-green-700',
    pending: 'bg-gray-100 text-gray-700',
  };
  return styles[status] || styles.pending;
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    in_transit: 'In Transit',
    confirmed: 'Confirmed',
    delivered: 'Delivered',
    pending: 'Pending',
  };
  return labels[status] || status;
};

export default function OrdersLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Orders</span>
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
              <button className="p-2 hover:bg-black/5 rounded-xl transition-colors"><Bell className="w-5 h-5 text-[#4A4A4A]" /></button>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">Sign In</Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors">{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
            </div>
          </div>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pt-4 border-t border-black/5">
              <nav className="flex flex-col gap-2">
                <Link href="/" className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/documents" className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
                <Link href="/ai" className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
                <Link href="/consultations" className="p-3 hover:bg-black/5 rounded-lg font-medium">Consultations</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingCart className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Order Management</h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Track and manage all your trade orders in one place. From confirmation to delivery.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                <input type="text" placeholder="Search orders by ID or product..." className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none" />
              </div>
              <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors"><Search className="w-5 h-5" /><span>Search</span></button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">1,247</p><p className="text-sm text-white/70">Total Orders</p></div>
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">$5.2M</p><p className="text-sm text-white/70">Order Value</p></div>
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">89%</p><p className="text-sm text-white/70">On-Time Delivery</p></div>
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">4.8</p><p className="text-sm text-white/70">Avg Rating</p></div>
          </motion.div>
        </div>
      </section>

      {/* Orders List */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#101111]">Recent Orders</h2>
              <Link href="/orders/new" className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                <Package className="w-4 h-4" />New Order
              </Link>
            </div>
            <div className="divide-y divide-black/5">
              {orders.map((order) => (
                <Link key={order.id} href={`/orders/${order.id}`} className="block p-4 hover:bg-[#f7f5f1] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-sm text-[#4A4A4A]">Order ID</span>
                      <h3 className="font-bold text-[#101111]">{order.id}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>{getStatusLabel(order.status)}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><span className="text-[#4A4A4A]">Buyer</span><p className="font-medium">{order.buyer}</p></div>
                    <div><span className="text-[#4A4A4A]">Product</span><p className="font-medium truncate">{order.product}</p></div>
                    <div><span className="text-[#4A4A4A]">Quantity</span><p className="font-medium">{order.quantity}</p></div>
                    <div><span className="text-[#4A4A4A]">Value</span><p className="font-medium">{order.value}</p></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#154230] rounded-xl p-6 text-center"><Package className="w-8 h-8 text-white mx-auto mb-3" /><h3 className="font-bold text-white">Track Orders</h3><p className="text-sm text-white/70 mt-1">Real-time updates</p></div>
            <div className="bg-[#5D1E21] rounded-xl p-6 text-center"><Truck className="w-8 h-8 text-white mx-auto mb-3" /><h3 className="font-bold text-white">Logistics</h3><p className="text-sm text-white/70 mt-1">Integrated shipping</p></div>
            <div className="bg-[#5D1E21] rounded-xl p-6 text-center"><FileText className="w-8 h-8 text-white mx-auto mb-3" /><h3 className="font-bold text-white">Documents</h3><p className="text-sm text-white/70 mt-1">Auto-generated</p></div>
            <div className="bg-[#154230] rounded-xl p-6 text-center"><CheckCircle className="w-8 h-8 text-white mx-auto mb-3" /><h3 className="font-bold text-white">Payments</h3><p className="text-sm text-white/70 mt-1">Secure transactions</p></div>
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Manage Your Orders</h2>
          <p className="text-lg text-white/80 mb-8">Track shipments, manage documents, and close deals faster.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">Get Started <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#154230]">
        <div className="bg-[#154230] px-4 sm:px-8 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain mb-4 brightness-0 invert" />
                <p className="text-white/70 text-sm mb-4">The operating system for global trade.</p>
              </div>
              <div><h4 className="text-white font-bold mb-4 text-sm">Platform</h4><ul className="space-y-2 text-sm">{platformLinks.map((link) => (<li key={link.name}><Link href={link.href} className="text-white/70 hover:text-white transition-colors">{link.name}</Link></li>))}</ul></div>
              <div><h4 className="text-white font-bold mb-4 text-sm">Company</h4><ul className="space-y-2 text-sm">{companyLinks.map((link) => (<li key={link.name}><Link href={link.href} className="text-white/70 hover:text-white transition-colors">{link.name}</Link></li>))}</ul></div>
              <div><h4 className="text-white font-bold mb-4 text-sm">Legal</h4><ul className="space-y-2 text-sm">{legalLinks.map((link) => (<li key={link.name}><Link href={link.href} className="text-white/70 hover:text-white transition-colors">{link.name}</Link></li>))}</ul></div>
            </div>
          </div>
        </div>
        <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/70 text-sm">© 2024 LEVERAGE. All rights reserved.</p>
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
