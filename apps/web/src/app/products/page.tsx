'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Package,
  Users,
  Search,
  Plus,
  Grid3X3,
  List,
  Star,
  ArrowRight,
  Menu,
  X,
  Bell,
  FileText,
  Bot,
  Truck,
  Shield,
  Megaphone,
  Receipt,
  Globe,
  Edit,
  Trash2,
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

const products = [
  { id: '1', name: 'Premium Basmati Rice 1121', price: '$850/MT', moq: '50 MT', views: 1234, inquiries: 45, rating: 4.8 },
  { id: '2', name: 'Organic Cotton Yarn 40s', price: '$4.20/KG', moq: '1000 KG', views: 987, inquiries: 32, rating: 4.7 },
  { id: '3', name: 'Electronic Components Set', price: '$250/unit', moq: '100 units', views: 756, inquiries: 28, rating: 4.9 },
  { id: '4', name: 'Industrial Steel Pipes', price: '$800/ton', moq: '25 tons', views: 543, inquiries: 19, rating: 4.6 },
];

export default function ProductsLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Products</span>
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
              <Package className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">My Products</h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">Manage your product listings, track performance, and reach more buyers worldwide.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap justify-center gap-3">
            <Link href="/products/new" className="flex items-center gap-2 px-5 py-3 bg-white text-[#154230] font-semibold rounded-xl hover:bg-white/90 transition-colors">
              <Plus className="w-5 h-5" />Add Product
            </Link>
            <button className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors">
              <Search className="w-5 h-5" />Search Products
            </button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">48</p><p className="text-sm text-white/70">Active Products</p></div>
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">12.5K</p><p className="text-sm text-white/70">Total Views</p></div>
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">156</p><p className="text-sm text-white/70">Inquiries</p></div>
            <div className="bg-white/10 rounded-xl p-4 text-center"><p className="text-2xl font-bold">4.7</p><p className="text-sm text-white/70">Avg Rating</p></div>
          </motion.div>
        </div>
      </section>

      {/* Products List */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#101111]">My Products</h2>
              <Link href="/products/new" className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                <Plus className="w-4 h-4" />Add Product
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`} className="p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#154230] rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#101111]">{product.name}</h3>
                        <p className="text-sm text-[#154230] font-semibold">{product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div><span className="text-[#4A4A4A]">MOQ</span><p className="font-medium">{product.moq}</p></div>
                    <div><span className="text-[#4A4A4A]">Views</span><p className="font-medium">{product.views}</p></div>
                    <div><span className="text-[#4A4A4A]">Inquiries</span><p className="font-medium">{product.inquiries}</p></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-[#154230] rounded-xl p-6 text-center"><Plus className="w-8 h-8 text-white mx-auto mb-3" /><h3 className="font-bold text-white">Add Products</h3><p className="text-sm text-white/70 mt-1">Unlimited listings</p></div>
            <div className="bg-[#5D1E21] rounded-xl p-6 text-center"><Search className="w-8 h-8 text-white mx-auto mb-3" /><h3 className="font-bold text-white">Get Found</h3><p className="text-sm text-white/70 mt-1">SEO optimized</p></div>
            <div className="bg-[#5D1E21] rounded-xl p-6 text-center"><Users className="w-8 h-8 text-white mx-auto mb-3" /><h3 className="font-bold text-white">Reach Buyers</h3><p className="text-sm text-white/70 mt-1">Global marketplace</p></div>
            <div className="bg-[#154230] rounded-xl p-6 text-center"><ArrowRight className="w-8 h-8 text-white mx-auto mb-3" /><h3 className="font-bold text-white">Track Performance</h3><p className="text-sm text-white/70 mt-1">Real-time analytics</p></div>
          </div>
        </div>
      </main>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Showcase Your Products</h2>
          <p className="text-lg text-white/80 mb-8">List your products and reach thousands of verified buyers.</p>
          <Link href="/products/new" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">Add Your First Product <ArrowRight className="w-4 h-4" /></Link>
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
