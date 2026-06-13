'use client';

import { useState, useMemo } from 'react';
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
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

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
    description: 'Extra long grain aromatic basmati rice for export.',
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
    description: 'Premium organic cotton yarn for textiles.',
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
    description: 'Industrial grade copper cathode.',
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
    description: 'Tier 1 solar panels with high efficiency.',
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
    description: 'Cold pressed, first harvest olive oil.',
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
    description: 'IS 2062 certified steel billets.',
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
];

const categories = [
  { name: 'All', emoji: '🛒' },
  { name: 'Food & Agriculture', emoji: '🌾' },
  { name: 'Textiles', emoji: '🧵' },
  { name: 'Electronics', emoji: '💻' },
  { name: 'Metals & Minerals', emoji: '⚙️' },
  { name: 'Energy', emoji: '⚡' },
];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());

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

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.supplier.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-6 pb-20 sm:pb-24">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">Marketplace</h1>
            <p className="text-white/70 text-sm mt-1">Browse products from verified suppliers</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/marketplace/inbox" className="relative p-2 bg-white/10 rounded-xl text-white hover:bg-white/20">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5D1E21] rounded-full flex items-center justify-center text-xs font-bold">3</span>
            </Link>
            <Link href="/orders" className="relative p-2 bg-white/10 rounded-xl text-white hover:bg-white/20">
              <ShoppingCart className="w-5 h-5" />
              {cart.size > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A6824A] rounded-full flex items-center justify-center text-xs font-bold">{cart.size}</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-16 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Search & Stats Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
            {/* Stats */}
            <div className="hidden sm:grid grid-cols-4 gap-4 mb-4 pb-4 border-b border-black/5">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#154230]">2,847</p>
                <p className="text-xs text-[#4A4A4A]">Products</p>
              </div>
              <div className="text-center border-l border-black/5">
                <p className="text-2xl font-bold text-[#154230]">523</p>
                <p className="text-xs text-[#4A4A4A]">Suppliers</p>
              </div>
              <div className="text-center border-l border-black/5">
                <p className="text-2xl font-bold text-[#154230]">98%</p>
                <p className="text-xs text-[#4A4A4A]">Verified</p>
              </div>
              <div className="text-center border-l border-black/5">
                <p className="text-2xl font-bold text-[#154230]">45</p>
                <p className="text-xs text-[#4A4A4A]">Countries</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, suppliers..."
                  className="w-full h-12 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                />
              </div>
              <button className="h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <Link href="/rfqs/new" className="h-12 px-6 bg-[#154230] hover:bg-[#1a5a3a] rounded-xl text-white font-semibold flex items-center gap-2 transition-colors">
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Post RFQ</span>
              </Link>
            </div>
          </div>

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

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
              <p className="text-[#4A4A4A] text-lg">No products found</p>
              <p className="text-[#4A4A4A] text-sm mt-2">Try adjusting your search or category</p>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="marketplace" />
    </div>
  );
}