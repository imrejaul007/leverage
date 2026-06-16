'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  Bell,
  Plus,
  ShoppingCart,
  Heart,
  Star,
  Filter,
  Globe,
  Shield,
  Truck,
  Users,
  ChevronRight,
  ArrowRight,
  Package,
  Menu,
  X,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  moq: string;
  category: string;
  supplier: string;
  rating: number;
  reviews: number;
  salesCount: number;
  featured?: boolean;
  image: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Basmati Rice 1121',
    description: 'Extra long grain aromatic basmati rice for export. Perfect for international trade.',
    price: 850,
    originalPrice: 950,
    currency: 'USD/MT',
    moq: '50 MT',
    category: 'Food & Agriculture',
    supplier: 'Global Trade Exports',
    rating: 4.8,
    reviews: 128,
    salesCount: 1248,
    featured: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
  },
  {
    id: '2',
    name: 'Organic Cotton Yarn 40s',
    description: 'Premium organic cotton yarn for textiles. Sustainable and certified.',
    price: 4.20,
    currency: 'USD/KG',
    moq: '1000 KG',
    category: 'Textiles',
    supplier: 'Cotton World Ltd',
    rating: 4.7,
    reviews: 96,
    salesCount: 890,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
  },
  {
    id: '3',
    name: 'Copper Cathode 99.99%',
    description: 'Industrial grade copper cathode for manufacturing.',
    price: 7250,
    currency: 'USD/MT',
    moq: '25 MT',
    category: 'Metals & Minerals',
    supplier: 'MetalLink Global',
    rating: 4.9,
    reviews: 78,
    salesCount: 560,
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800',
  },
  {
    id: '4',
    name: 'Solar Panels 550W',
    description: 'Tier 1 solar panels with high efficiency rating.',
    price: 165,
    currency: 'USD/unit',
    moq: '100 units',
    category: 'Energy',
    supplier: 'Shanghai Import Co.',
    rating: 4.6,
    reviews: 89,
    salesCount: 2100,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
  },
  {
    id: '5',
    name: 'Extra Virgin Olive Oil',
    description: 'Cold pressed, first harvest olive oil. Premium quality.',
    price: 4.50,
    currency: 'USD/L',
    moq: '5 MT',
    category: 'Food & Agriculture',
    supplier: 'Turkey Merchants',
    rating: 4.9,
    reviews: 156,
    salesCount: 3450,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
  },
  {
    id: '6',
    name: 'Steel Billets Grade A',
    description: 'IS 2062 certified steel billets for construction.',
    price: 620,
    currency: 'USD/MT',
    moq: '100 MT',
    category: 'Metals & Minerals',
    supplier: 'Turkey Merchants',
    rating: 4.9,
    reviews: 32,
    salesCount: 890,
    image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800',
  },
  {
    id: '7',
    name: 'Fresh Green Coffee Beans',
    description: 'Arabica coffee beans, washed process.',
    price: 3200,
    currency: 'USD/MT',
    moq: '10 MT',
    category: 'Food & Agriculture',
    supplier: 'Ethiopia Direct',
    rating: 4.8,
    reviews: 64,
    salesCount: 420,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
  },
  {
    id: '8',
    name: 'Wheat Grain Grade 1',
    description: 'High quality wheat for milling and export.',
    price: 280,
    currency: 'USD/MT',
    moq: '100 MT',
    category: 'Food & Agriculture',
    supplier: 'Ukraine Grain Co.',
    rating: 4.5,
    reviews: 45,
    salesCount: 2100,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
  },
];

const categories = [
  { name: 'All', emoji: '🛒' },
  { name: 'Food & Agriculture', emoji: '🌾' },
  { name: 'Textiles', emoji: '🧵' },
  { name: 'Electronics', emoji: '💻' },
  { name: 'Metals & Minerals', emoji: '⚙️' },
  { name: 'Energy', emoji: '⚡' },
  { name: 'Chemicals', emoji: '🧪' },
  { name: 'Machinery', emoji: '🔧' },
];

const features = [
  { icon: Shield, title: 'Verified Suppliers', description: 'All suppliers are vetted and verified' },
  { icon: Globe, title: '150+ Countries', description: 'Global reach for your business' },
  { icon: Truck, title: 'Integrated Logistics', description: 'End-to-end shipping solutions' },
  { icon: Users, title: '20K+ Buyers', description: 'Growing community of traders' },
];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCart = (id: string) => {
    setCart(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.supplier.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Marketplace</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/products" className="nav-link font-medium">Products</Link>
              <Link href="/suppliers" className="nav-link font-medium">Suppliers</Link>
              <Link href="/rfqs" className="nav-link font-medium">RFQs</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/inbox" className="relative p-2 hover:bg-black/5 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5D1E21] rounded-full flex items-center justify-center text-xs font-bold text-white">3</span>
              </Link>
              <Link href="/cart" className="relative p-2 hover:bg-black/5 rounded-xl transition-colors">
                <ShoppingCart className="w-5 h-5 text-[#4A4A4A]" />
                {cart.size > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A6824A] rounded-full flex items-center justify-center text-xs font-bold text-white">{cart.size}</span>
                )}
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
                <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Products</Link>
                <Link href="/suppliers" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Suppliers</Link>
                <Link href="/rfqs" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">RFQs</Link>
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Global B2B Marketplace
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Connect with verified suppliers and buyers from 150+ countries
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, suppliers, categories..."
                  className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                />
              </div>
              <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center text-white"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-bold">2,847</p>
              <p className="text-sm text-white/70">Products</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold">523</p>
              <p className="text-sm text-white/70">Suppliers</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold">150+</p>
              <p className="text-sm text-white/70">Countries</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold">98%</p>
              <p className="text-sm text-white/70">Verified</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-20 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Categories */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors ${
                  selectedCategory === cat.name
                    ? 'bg-[#154230] text-white'
                    : 'bg-white text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <span>{cat.emoji}</span>
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Post RFQ Banner */}
          <div className="bg-gradient-to-r from-[#A6824A] to-[#8a6a3a] rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h3 className="text-xl font-bold mb-1">Can&apos;t find what you need?</h3>
              <p className="text-white/80">Post a Request for Quote and let suppliers come to you</p>
            </div>
            <Link href="/rfqs/new" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#A6824A] font-semibold rounded-xl hover:bg-white/90 transition-colors">
              <Plus className="w-5 h-5" />
              Post RFQ
            </Link>
          </div>

          {/* Products Grid */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#101111]">
              {selectedCategory === 'All' ? 'Featured Products' : selectedCategory}
            </h2>
            <span className="text-sm text-[#4A4A4A]">{filteredProducts.length} products</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-[#5D1E21] text-white px-2.5 py-1 text-xs font-bold rounded-lg">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  {product.featured && !product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-[#A6824A] text-white px-2.5 py-1 text-xs font-bold rounded-lg">Featured</div>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-[#5D1E21] text-[#5D1E21]' : 'text-[#4A4A4A]'}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-[#101111] line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[#4A4A4A]">
                      <Star className="w-3 h-3 fill-[#A6824A] text-[#A6824A]" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A4A4A] line-clamp-2 mb-3">{product.description}</p>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-xl font-bold text-[#154230]">${product.price.toLocaleString()}</span>
                    <span className="text-xs text-[#4A4A4A]">/{product.currency}</span>
                  </div>
                  <p className="text-xs text-[#4A4A4A] mb-3">MOQ: {product.moq}</p>

                  <div className="flex items-center justify-between text-xs text-[#4A4A4A] mb-3">
                    <span>{product.supplier}</span>
                    <span>{product.salesCount.toLocaleString()} sold</span>
                  </div>

                  <button
                    onClick={() => toggleCart(product.id)}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                      cart.has(product.id)
                        ? 'bg-[#A6824A] text-white'
                        : 'bg-[#154230] text-white hover:bg-[#1a5a3a]'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {cart.has(product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-[#4A4A4A]/30 mx-auto mb-4" />
              <p className="text-[#4A4A4A] text-lg">No products found</p>
              <p className="text-[#4A4A4A] text-sm mt-2">Try adjusting your search or category</p>
            </div>
          )}
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-4">
              Why Choose LEVERAGE Marketplace?
            </h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">
              The trusted platform for global B2B trade
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="text-center p-6">
                  <div className="w-14 h-14 bg-[#154230]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#154230]" />
                  </div>
                  <h3 className="font-semibold text-[#101111] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#4A4A4A]">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-8 bg-[#E6E2DA]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-4">
            Ready to start trading?
          </h2>
          <p className="text-[#4A4A4A] mb-8 max-w-xl mx-auto">
            Join thousands of businesses already trading globally on LEVERAGE Marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary-group">
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="btn-secondary-group">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-8 bg-[#154230]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain brightness-0 invert" />
              <span className="text-white font-semibold">Marketplace</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Globe className="w-4 h-4" />
              <span>Trusted by 20K+ businesses worldwide</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © 2026 LEVERAGE Marketplace. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/50">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/security" className="hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
