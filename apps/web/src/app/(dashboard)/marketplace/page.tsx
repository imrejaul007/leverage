'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import {
  Bell,
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Phone,
  Filter,
  Star,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Plus,
  Grid3X3,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';

const categories = [
  { value: 'all', label: 'All Products', emoji: '🛒' },
  { value: 'Food & Agriculture', label: 'Food & Agriculture', emoji: '🌾' },
  { value: 'Textiles', label: 'Textiles', emoji: '🧵' },
  { value: 'Metals & Minerals', label: 'Metals & Minerals', emoji: '⚙️' },
  { value: 'Energy', label: 'Energy', emoji: '⚡' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'sales', label: 'Most Selling' },
];

export default function MarketplacePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All India');

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'sales': result.sort((a, b) => b.salesCount - a.salesCount); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Top Bar */}
        <div className="bg-[#154230] text-white">
          <div className="container mx-auto px-4 py-2 text-sm flex justify-between items-center">
            <span>Welcome to LEVERAGE Marketplace</span>
            <div className="hidden md:flex items-center gap-4">
              <span>24x7 Support</span>
              <Link href="/contact" className="flex items-center gap-1 hover:underline">
                <Phone className="w-4 h-4" />
                +1-xxx-xxx-xxxx
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
            </Link>

            {/* Location Selector */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#154230]" />
                <span className="text-sm font-medium text-gray-700">{selectedLocation}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              <AnimatePresence>
                {locationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50"
                  >
                    {['All India', 'Mumbai', 'Delhi', 'Ahmedabad', 'Dubai'].map(city => (
                      <button
                        key={city}
                        onClick={() => { setSelectedLocation(city); setLocationOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg ${selectedLocation === city ? 'bg-[#154230]/10 text-[#154230]' : 'hover:bg-gray-50'}`}
                      >
                        {city}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Bar */}
            <form className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, suppliers..."
                  className="w-full h-11 pl-12 pr-4 bg-gray-100 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#154230]/20 transition-all"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link href="/inbox" className="relative p-2 hover:bg-gray-100 rounded-xl">
                <Bell className="w-5 h-5 text-gray-600" />
              </Link>
              <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-xl">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
              </Link>
              <Link href="/login" className="hidden sm:inline-flex px-4 py-2 bg-[#154230] text-white rounded-lg text-sm font-medium">
                Sign In
              </Link>
              <Link href="/rfqs/new" className="hidden sm:inline-flex px-4 py-2 bg-[#A6824A] text-white rounded-lg text-sm font-medium">
                + Post RFQ
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-gray-100 rounded-xl lg:hidden">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] via-[#1a5a3a] to-[#0d3d28] px-4 py-10">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">Global B2B Marketplace</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Connect with verified suppliers and buyers from 150+ countries
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Products', value: '2,847' },
              { label: 'Suppliers', value: '523' },
              { label: 'Countries', value: '150+' },
              { label: 'Verified', value: '98%' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-[#154230] text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#154230]'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:border-[#154230]">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <span className="text-sm text-gray-500">{filteredProducts.length} products</span>
        </div>

        {/* Products List - IndiaMART Style */}
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex">
                {/* Image */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-gray-100 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {product.featured && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#A6824A] text-white text-xs font-medium rounded">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-3 flex flex-col min-w-0">
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-600 hover:text-blue-700 line-clamp-2 text-sm sm:text-base cursor-pointer">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {product.location}
                    </p>

                    {/* Quick specs */}
                    <div className="flex gap-1 mt-2">
                      <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Price & Trust */}
                  <div className="mt-2">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-lg font-bold text-gray-900">
                        ${typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                      </span>
                      <span className="text-xs text-gray-500">/{product.currency}</span>
                    </div>

                    {/* Trust badges */}
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      {product.gstVerified && (
                        <span className="flex items-center gap-0.5 text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          GST Verified
                        </span>
                      )}
                      {product.trustseal && (
                        <span className="flex items-center gap-0.5 text-[#154230]">
                          <CheckCircle className="w-3 h-3" />
                          TrustSEAL
                        </span>
                      )}
                      {product.yearsInBusiness && (
                        <span>{product.yearsInBusiness}+ yrs</span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="hidden sm:flex flex-col justify-center gap-2 p-3 border-l border-gray-100">
                  <Button
                    size="sm"
                    className="bg-[#A6824A] hover:bg-[#8a6a3a] whitespace-nowrap"
                    onClick={() => toast.success('Enquiry sent!')}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Enquire
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="whitespace-nowrap"
                    onClick={() => toast('Call feature coming soon')}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to start trading?</h2>
        <p className="text-white/80 mb-8">Join thousands of businesses already trading globally</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="bg-white text-[#154230] hover:bg-white/90">
              Create Free Account
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#154230] text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain brightness-0 invert mb-4" />
              <p className="text-white/70 text-sm">The Global Trade Operating System</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/marketplace" className="hover:text-white">Products</Link></li>
                <li><Link href="/suppliers" className="hover:text-white">Suppliers</Link></li>
                <li><Link href="/rfqs" className="hover:text-white">RFQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
            © {new Date().getFullYear()} LEVERAGE Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
