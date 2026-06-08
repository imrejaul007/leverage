'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, GitCompare, Star, CheckCircle, Plus, Bell, Globe, Ship, Package, Home, FileText, Mail, User, X } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  country: string;
  verified: boolean;
  rating: number;
  responseTime: string;
  products: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  moq: string;
  category: string;
  supplier: Supplier;
  tradeTerms: string[];
  featured?: boolean;
  reviews: number;
  salesCount: number;
  isNew?: boolean;
  image: string;
}

const suppliers: Supplier[] = [
  { id: '1', name: 'Global Trade Exports', country: 'India', verified: true, rating: 4.8, responseTime: '< 2h', products: 45 },
  { id: '2', name: 'Shanghai Import Co.', country: 'China', verified: true, rating: 4.6, responseTime: '< 4h', products: 128 },
  { id: '3', name: 'Turkey Merchants', country: 'Turkey', verified: true, rating: 4.9, responseTime: '< 1h', products: 67 },
  { id: '4', name: 'Vietnam Sourcing', country: 'Vietnam', verified: false, rating: 4.3, responseTime: '< 6h', products: 34 },
  { id: '5', name: 'UAE Trading Hub', country: 'UAE', verified: true, rating: 4.7, responseTime: '< 3h', products: 89 },
];

const products: Product[] = [
  { id: '1', name: 'Premium Basmati Rice 1121', description: 'Extra long grain, aromatic basmati rice. Aged 2 years. Perfect for biryani and pilaf.', price: 850, originalPrice: 950, currency: 'USD', moq: '50 MT', category: 'Food& Agriculture', supplier: suppliers[0], tradeTerms: ['FOB', 'CIF', 'EXW'], featured: true, reviews: 128, salesCount: 1248, isNew: false, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop' },
  { id: '2', name: 'Organic Cotton Yarn 40/1', description: '100% organic cotton yarn. OEKO-TEX certified. Ideal for premium textiles.', price: 3.20, currency: 'USD', moq: '10 MT', category: 'Textiles', supplier: suppliers[0], tradeTerms: ['FOB', 'CIF'], reviews: 45, salesCount: 520, image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop' },
  { id: '3', name: 'Solar Panels 550W Mono PERC', description: 'Tier 1 solar panels with 25-year warranty. High efficiency for commercial use.', price: 165, currency: 'USD', moq: '100 units', category: 'Energy', supplier: suppliers[1], tradeTerms: ['FOB', 'CIF', 'DDP'], featured: true, reviews: 89, salesCount: 2100, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=400&fit=crop' },
  { id: '4', name: 'Steel Billets Grade A', description: 'IS 2062 certified steel billets. Premium quality for construction and manufacturing.', price: 620, originalPrice: 680, currency: 'USD', moq: '100 MT', category: 'Metals & Minerals', supplier: suppliers[2], tradeTerms: ['FOB', 'CIF'], reviews: 32, salesCount: 890, image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=400&h=400&fit=crop' },
  { id: '5', name: 'Extra Virgin Olive Oil', description: 'Cold pressed, first harvest olive oil. Premium Mediterranean quality.', price: 4.50, currency: 'USD', moq: '5 MT', category: 'Food & Agriculture', supplier: suppliers[2], tradeTerms: ['FOB', 'CIF', 'EXW'], featured: true, reviews: 156, salesCount: 3450, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop' },
  { id: '6', name: 'Black Pepper MG1 Grade', description: 'Steam sterilized. Fair trade certified. Premium spice for global markets.', price: 4500, currency: 'USD', moq: '5 MT', category: 'Food & Agriculture', supplier: suppliers[3], tradeTerms: ['FOB', 'CIF'], reviews: 41, salesCount: 670, isNew: true, image: 'https://images.unsplash.com/photo-1599909533853-13f35e21b9fe?w=400&h=400&fit=crop' },
  { id: '7', name: 'LED Solar Street Lights', description: 'All-in-one solar LED street lighting. Energy efficient for urban areas.', price: 89, currency: 'USD', moq: '50 units', category: 'Energy', supplier: suppliers[4], tradeTerms: ['FOB', 'EXW'], reviews: 52, salesCount: 4500, isNew: true, image: 'https://images.unsplash.com/photo-1534239697798-120952b76f2a?w=400&h=400&fit=crop' },
  { id: '8', name: 'Raw Cotton Bales', description: 'Premium raw cotton bales. Soft texture, high absorbency for textile industry.', price: 1.80, currency: 'USD', moq: '20 MT', category: 'Textiles', supplier: suppliers[1], tradeTerms: ['FOB', 'CIF'], reviews: 38, salesCount: 780, image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop' },
];

const categories = ['All', 'Food & Agriculture', 'Textiles', 'Electronics', 'Metals & Minerals', 'Energy'];

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'popular';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [compareList, setCompareList] = useState<string[]>([]);
  const [activeNav, setActiveNav] = useState('browse');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/dashboard' },
    { id: 'browse', label: 'Browse', icon: Search, href: '/marketplace' },
    { id: 'rfq', label: 'Post RFQ', icon: FileText, href: '/rfqs' },
    { id: 'inbox', label: 'Inbox', icon: Mail, href: '/messages' },
    { id: 'account', label: 'Account', icon: User, href: '/settings' },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.supplier.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.salesCount - a.salesCount);
        break;
      default:
        result = result.filter(p => p.featured).concat(result.filter(p => !p.featured));
    }
    return result;
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#154230] via-[#1d5240] to-[#154230] px-4 pt-6 pb-10 rounded-b-[32px] relative overflow-hidden">
        {/* Logo Row */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#A6824A] rounded-lg flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-tight leading-none">LEVERAGE</p>
              <p className="text-white/50 text-[9px] tracking-wider mt-0.5">CONNECTING DOTS TO PORTS</p>
            </div>
          </div>
          <button className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Bell className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Page Title */}
        <h1 className="text-white text-2xl font-bold mb-0.5 relative z-10">Marketplace</h1>
        <p className="text-white/70 text-sm relative z-10">{products.length} products from verified suppliers worldwide</p>
      </div>

      {/* Search Card */}
      <div className="mx-4 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl p-4 shadow-xl shadow-black/5">
          <div className="relative">
            <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, suppliers..."
              className="w-full h-12 pl-11 pr-4 bg-[#F7F6F2] border-2 border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mx-4 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#154230] text-white'
                  : 'bg-white text-[#4A4A4A] shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort and Count */}
      <div className="mx-4 mt-4 flex items-center justify-between">
        <span className="text-[#4A4A4A] text-sm font-medium">{filteredProducts.length} products</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-10 pl-4 pr-10 bg-white rounded-xl text-[#101111] text-sm font-medium focus:outline-none appearance-none shadow-sm"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low</option>
            <option value="price-high">Price: High</option>
            <option value="popular">Popular</option>
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A] pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-lg shadow-[#154230]/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#101111] font-semibold text-sm">Compare ({compareList.length}/3)</span>
            <button onClick={() => setCompareList([])} className="text-[#4A4A4A] hover:text-[#101111] text-xs font-medium">Clear</button>
          </div>
          <Link href={`/marketplace/compare?ids=${compareList.join(',')}`} className="block w-full py-3 bg-[#154230] text-white font-semibold rounded-xl text-center text-sm hover:bg-[#1d5240] transition-colors shadow-lg shadow-[#154230]/20">
            Compare Products
          </Link>
        </div>
      )}

      {/* Products Grid */}
      <div className="mx-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <Link href={`/marketplace/${product.id}`} className="block">
              <div className="aspect-square bg-[#F7F6F2] relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {product.featured && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#A6824A] text-white text-[10px] font-semibold rounded-md">Featured</span>
                )}
                {product.isNew && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#154230] text-white text-[10px] font-semibold rounded-md">NEW</span>
                )}
                {product.originalPrice && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#5D1E21] text-white text-[10px] font-semibold rounded-md">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </Link>

            <div className="p-3 space-y-2">
              <div>
                <Link href={`/marketplace/${product.id}`}>
                  <h3 className="text-[#101111] font-semibold text-sm line-clamp-1 hover:text-[#A6824A] transition-colors">{product.name}</h3>
                </Link>
                <p className="text-[#4A4A4A] text-xs line-clamp-2 mt-0.5">{product.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-[#101111]">${product.price}</span>
                  <span className="text-[#4A4A4A] text-xs">/{product.currency}</span>
                </div>
                <span className="text-[#4A4A4A] text-xs font-medium">MOQ: {product.moq}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#4A4A4A]">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#A6824A] fill-[#A6824A]" />
                  {product.reviews}
                </span>
                <span>{product.salesCount.toLocaleString()} sold</span>
              </div>

              <div className="pt-2 border-t border-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#F7F6F2] flex items-center justify-center text-[10px] font-bold text-[#A6824A]">
                    {product.supplier.country.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#101111] text-xs font-medium">{product.supplier.name}</span>
                    {product.supplier.verified && <CheckCircle className="w-3 h-3 text-[#154230]" />}
                  </div>
                </div>
              </div>

              <div className="flex gap-1.5 pt-1.5">
                <Link href={`/marketplace/${product.id}`} className="flex-1 py-2.5 bg-[#154230] text-white font-semibold rounded-xl text-center text-xs hover:bg-[#1d5240] transition-colors shadow-lg shadow-[#154230]/20">
                  View
                </Link>
                <button onClick={() => toggleFavorite(product.id)} className={`p-2.5 rounded-xl border transition-colors ${favorites.has(product.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-black/5 text-[#4A4A4A] hover:border-red-200 hover:text-red-500'}`}>
                  <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                </button>
                <button onClick={() => toggleCompare(product.id)} className={`p-2.5 rounded-xl border transition-colors ${compareList.includes(product.id) ? 'bg-[#A6824A]/10 border-[#A6824A]/30 text-[#A6824A]' : 'border-black/5 text-[#4A4A4A] hover:border-[#A6824A]/30 hover:text-[#A6824A]'}`}>
                  <GitCompare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Stats Bar */}
      <div className="mx-4 mt-4">
        <div className="bg-[#5D1E21] rounded-2xl p-4 shadow-lg shadow-[#5D1E21]/20">
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <Package className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm font-bold leading-tight">2,847</p>
              <p className="text-white/60 text-[10px]">Products</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <Ship className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm font-bold leading-tight">523</p>
              <p className="text-white/60 text-[10px]">Suppliers</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm font-bold leading-tight">45</p>
              <p className="text-white/60 text-[10px]">Countries</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-white text-sm font-bold leading-tight">98%</p>
              <p className="text-white/60 text-[10px]">Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-8" />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-2 pb-6 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id)}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${isActive ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-[#154230] shadow-lg shadow-[#154230]/30' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
