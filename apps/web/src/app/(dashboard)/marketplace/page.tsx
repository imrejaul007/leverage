'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Bell,
  Settings,
  Home,
  FileText,
  Truck,
  Package,
  User,
  MessageSquare,
  BarChart3,
  X,
  Plus,
  Globe,
  CheckCircle,
  ShoppingCart,
  LogOut,
  Menu,
  Heart,
  Filter,
  SlidersHorizontal,
  ChevronDown,
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
    description: 'Extra long grain aromatic basmati rice.',
    price: 850,
    originalPrice: 950,
    currency: 'USD',
    moq: '50 MT',
    category: 'Food & Agriculture',
    supplier: 'Global Trade Exports',
    rating: 4.8,
    reviews: 128,
    salesCount: 1248,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
  },
  {
    id: '2',
    name: 'Organic Cotton Yarn 40s Count',
    description: 'Premium organic cotton yarn for textiles.',
    price: 4.20,
    currency: 'KG',
    moq: '1000 KG',
    category: 'Textiles',
    supplier: 'Cotton World Ltd',
    rating: 4.7,
    reviews: 96,
    salesCount: 890,
    featured: true,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
  },
  {
    id: '3',
    name: 'Copper Cathode 99.99% Purity',
    description: 'Industrial grade copper cathode for manufacturing.',
    price: 7250,
    currency: 'MT',
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
    name: 'Solar Panels 550W Mono PERC',
    description: 'Tier 1 solar panels with high efficiency.',
    price: 165,
    currency: 'USD',
    moq: '100 units',
    category: 'Electronics',
    supplier: 'SunPower Solutions',
    rating: 4.6,
    reviews: 156,
    salesCount: 2100,
    featured: true,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
  },
  {
    id: '5',
    name: 'Steel Billets - Grade A',
    description: 'Premium quality steel billets for construction.',
    price: 620,
    currency: 'MT',
    moq: '100 MT',
    category: 'Metals & Minerals',
    supplier: 'Steel Works International',
    rating: 4.5,
    reviews: 89,
    salesCount: 780,
    image: 'https://images.unsplash.com/photo-1567168544230-03a2da9c858f?w=800',
  },
  {
    id: '6',
    name: 'Pharmaceutical Raw Materials',
    description: 'GMP certified raw materials.',
    price: 45,
    currency: 'KG',
    moq: '500 KG',
    category: 'Healthcare',
    supplier: 'MediChem Industries',
    rating: 4.8,
    reviews: 67,
    salesCount: 340,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800',
  },
];

const categories = ['All', 'Food & Agriculture', 'Textiles', 'Metals & Minerals', 'Electronics', 'Healthcare'];
const sortOptions = ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Newest First'];

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse', active: true },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];


export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [cart, setCart] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.supplier.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'Price: Low to High':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'Newest First':
        filtered = [...filtered].sort((a, b) => b.id.localeCompare(a.id));
        break;
    }
    return filtered;
  }, [search, selectedCategory, sortBy]);

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

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar - Fixed on left */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#154230] text-white'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-black/5 flex items-center justify-between">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-9 h-9 bg-[#E6E2DA] rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#154230] text-white'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/rfqs/new" className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </Link>
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-2xl">Global Marketplace</h1>
              <p className="text-white/70 text-sm mt-1">Browse verified suppliers and products</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-80 h-11 pl-10 pr-4 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <button className="relative w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5D1E21] rounded-full flex items-center justify-center text-xs font-bold">3</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-8 py-4 lg:py-6">
          {/* Mobile Search */}
          <div className="lg:hidden mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
              <input
                type="text"
                placeholder="Search products, suppliers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-white rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/30 shadow-sm"
              />
            </div>
          </div>

          {/* Category Pills - Mobile */}
          <div className="lg:hidden mb-4 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#154230] text-white'
                    : 'bg-white text-[#4A4A4A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filters Row - Desktop */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl">
                <SlidersHorizontal className="w-4 h-4 text-[#4A4A4A]" />
                <span className="text-sm font-medium text-[#101111]">Filters</span>
              </div>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white px-4 py-2 pr-10 rounded-xl text-sm font-medium text-[#101111] cursor-pointer focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A] pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white px-4 py-2 pr-10 rounded-xl text-sm font-medium text-[#101111] cursor-pointer focus:outline-none"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A] pointer-events-none" />
              </div>
            </div>
            <p className="text-sm text-[#4A4A4A]">{filteredProducts.length} products found</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-36 lg:h-44">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  {product.featured && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-[#154230] text-white text-[10px] font-bold rounded-lg">
                      FEATURED
                    </span>
                  )}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-[#5D1E21] text-[#5D1E21]' : 'text-[#4A4A4A]'}`} />
                  </button>
                </div>
                <div className="p-3 lg:p-4">
                  <p className="text-[10px] text-[#4A4A4A] font-medium mb-1">{product.category}</p>
                  <h3 className="text-sm font-bold text-[#101111] line-clamp-1 mb-1">{product.name}</h3>
                  <p className="text-xs text-[#4A4A4A] mb-2">{product.supplier}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#A6824A]">★</span>
                    <span className="text-xs font-medium text-[#101111]">{product.rating}</span>
                    <span className="text-xs text-[#4A4A4A]">({product.reviews})</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-bold text-[#154230]">${product.price.toLocaleString()}</p>
                      <p className="text-[10px] text-[#4A4A4A]">per {product.currency}</p>
                    </div>
                    <button
                      onClick={() => toggleCart(product.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        cart.has(product.id)
                          ? 'bg-[#154230] text-white'
                          : 'bg-[#E6E2DA] text-[#154230]'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Card - Mobile */}
          <div className="lg:hidden mt-6 bg-[#5D1E21] rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-white text-xl font-bold">500+</p>
                <p className="text-white/70 text-xs">Verified Suppliers</p>
              </div>
              <div>
                <p className="text-white text-xl font-bold">10K+</p>
                <p className="text-white/70 text-xs">Products</p>
              </div>
              <div>
                <p className="text-white text-xl font-bold">140+</p>
                <p className="text-white/70 text-xs">Countries</p>
              </div>
            </div>
          </div>

          {/* Desktop Stats */}
          <div className="hidden lg:grid grid-cols-4 gap-6 mt-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-[#154230]" />
              </div>
              <p className="text-2xl font-bold text-[#101111]">500+</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Verified Suppliers</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-[#154230]" />
              </div>
              <p className="text-2xl font-bold text-[#101111]">10K+</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Products Available</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
              <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-[#154230]" />
              </div>
              <p className="text-2xl font-bold text-[#101111]">140+</p>
              <p className="text-sm text-[#4A4A4A] mt-1">Countries Served</p>
            </div>
            <div className="bg-[#5D1E21] rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-white">98%</p>
              <p className="text-sm text-white/70 mt-1">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="browse" />
    </div>
  );
}
