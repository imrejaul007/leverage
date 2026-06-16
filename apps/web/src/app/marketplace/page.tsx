'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  Package,
  Users,
  Star,
  ShoppingCart,
  Filter,
  Grid3X3,
  List,
  Plus,
  Bell,
  Menu,
  X,
  Globe,
  Shield,
  Truck,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

const featuredProducts = [
  {
    id: '1',
    name: 'Premium Basmati Rice 1121',
    description: 'Extra long grain aromatic basmati rice, export quality.',
    price: 850,
    currency: 'USD',
    moq: '50 MT',
    supplier: 'Global Trade Exports',
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
  },
  {
    id: '2',
    name: 'Organic Cotton Yarn 40s',
    description: 'Premium organic cotton yarn for textiles.',
    price: 4.20,
    currency: 'KG',
    moq: '1000 KG',
    supplier: 'Cotton World Ltd',
    rating: 4.7,
    reviews: 96,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
  },
  {
    id: '3',
    name: 'Copper Cathode 99.99%',
    description: 'Industrial grade copper cathode for manufacturing.',
    price: 7250,
    currency: 'MT',
    moq: '25 MT',
    supplier: 'MetalLink Global',
    rating: 4.9,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800',
  },
  {
    id: '4',
    name: 'Solar Panels 550W Mono',
    description: 'Tier 1 solar panels with high efficiency.',
    price: 165,
    currency: 'USD',
    moq: '100 units',
    supplier: 'Shanghai Import Co.',
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
  },
];

const categories = [
  { name: 'Food & Agriculture', icon: '🌾', count: '1,245' },
  { name: 'Textiles', icon: '🧵', count: '892' },
  { name: 'Electronics', icon: '💻', count: '1,102' },
  { name: 'Metals & Minerals', icon: '⛏️', count: '654' },
  { name: 'Energy', icon: '⚡', count: '423' },
  { name: 'Machinery', icon: '⚙️', count: '789' },
];

const benefits = [
  { icon: Shield, title: 'Verified Suppliers', desc: 'All suppliers are vetted and verified' },
  { icon: Truck, title: 'Global Shipping', desc: 'Freight integration for worldwide delivery' },
  { icon: CheckCircle, title: 'Quality Assured', desc: 'Trade documents and compliance built-in' },
  { icon: TrendingUp, title: 'Market Insights', desc: 'Real-time pricing and trend data' },
];

export default function MarketplaceLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Marketplace</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium text-[#154230]">Browse</Link>
              <Link href="/rfqs" className="nav-link font-medium">RFQs</Link>
              <Link href="/orders" className="nav-link font-medium">Orders</Link>
              <Link href="/network" className="nav-link font-medium">Network</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#5D1E21] rounded-full text-white text-[10px] flex items-center justify-center font-bold">3</span>
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
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Browse</Link>
                <Link href="/rfqs" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">RFQs</Link>
                <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Orders</Link>
                <Link href="/network" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Network</Link>
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
              <Globe className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Global Trade Marketplace
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Connect with verified suppliers and buyers worldwide. Source products, post RFQs, and grow your trade business.
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
                    placeholder="Search products, suppliers, or categories..."
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
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-sm text-white/70">Products</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">523</p>
              <p className="text-sm text-white/70">Suppliers</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-white/70">Verified</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">45</p>
              <p className="text-sm text-white/70">Countries</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {categories.map((cat) => (
              <button key={cat.name} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <span className="text-3xl mb-2">{cat.icon}</span>
                <span className="font-medium text-sm text-[#101111]">{cat.name}</span>
                <span className="text-xs text-[#4A4A4A]">{cat.count} items</span>
              </button>
            ))}
          </div>

          {/* Featured Products */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#101111]">Featured Products</h2>
                  <p className="text-sm text-[#4A4A4A]">Handpicked deals from top suppliers</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#154230] text-white' : 'hover:bg-black/5'}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#154230] text-white' : 'hover:bg-black/5'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
                {featuredProducts.map((product) => (
                  <div key={product.id} className={`bg-[#f7f5f1] rounded-xl overflow-hidden hover:bg-[#E6E2DA] transition-colors ${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`relative ${viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'h-40'}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex items-center' : ''}`}>
                      <div className={viewMode === 'list' ? 'flex-1' : ''}>
                        <h3 className="font-bold text-[#101111] mb-1">{product.name}</h3>
                        <p className="text-sm text-[#4A4A4A] mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-center gap-2 text-sm text-[#4A4A4A] mb-2">
                          <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                          <span>{product.rating} ({product.reviews})</span>
                        </div>
                        <p className="text-xs text-[#4A4A4A] mb-2">MOQ: {product.moq}</p>
                        <p className="text-xs text-[#4A4A4A] mb-3">by {product.supplier}</p>
                      </div>
                      <div className={viewMode === 'list' ? 'text-right ml-4' : ''}>
                        <div className="text-xl font-bold text-[#101111]">${product.price}<span className="text-sm font-normal text-[#4A4A4A]">/{product.currency}</span></div>
                        <button className="mt-2 w-full sm:w-auto px-4 py-2 bg-[#154230] text-white text-sm font-medium rounded-lg hover:bg-[#1d5240] transition-colors flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/rfqs/new" className="inline-flex items-center gap-2 px-6 py-3 bg-[#A6824A] text-white font-semibold rounded-lg hover:bg-[#8a6a3a] transition-colors">
                  <Plus className="w-5 h-5" />
                  Post a Request for Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#154230]" />
                  </div>
                  <h3 className="font-bold text-[#101111] mb-1">{benefit.title}</h3>
                  <p className="text-sm text-[#4A4A4A]">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses trading on LEVERAGE. Get started with your free account today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Create Free Account
            </Link>
            <Link href="/marketplace/compare" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              Compare Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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