'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Heart,
  GitCompare,
  Star,
  CheckCircle,
  Plus,
  Bell,
  Globe,
  Ship,
  Package,
  Home,
  FileText,
  MessageSquare,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  Truck,
  BarChart3,
  Briefcase,
} from 'lucide-react';

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

const bottomNavLinks = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs/new', icon: Plus, label: 'Post RFQ', primary: true },
  { href: '/marketplace/inbox', icon: MessageSquare, label: 'Inbox' },
  { href: '/account', icon: User, label: 'Account' },
];

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-[#101111] font-bold text-lg tracking-tight">LEVERAGE</h1>
              <p className="text-[#4A4A4A] text-[10px] tracking-wider">CONNECTING DOTS TO PORTS</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
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

        {/* User Profile */}
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

      {/* Mobile Header & Overlay - Visible only on mobile */}
      <div className="lg:hidden">
        {/* Green Gradient Header */}
        <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-4 pt-6 pb-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="6" cy="12" r="2" fill="currentColor" />
                  <circle cx="18" cy="12" r="2" fill="currentColor" />
                  <circle cx="12" cy="6" r="2" fill="currentColor" />
                  <circle cx="12" cy="18" r="2" fill="currentColor" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-tight">LEVERAGE</p>
                <p className="text-white/50 text-[9px] tracking-wider">CONNECTING DOTS TO PORTS</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-white">
                <Bell className="w-5 h-5" />
              </button>
              <button onClick={() => setSidebarOpen(true)} className="p-2 text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="relative z-10">
            <h1 className="text-white text-2xl font-bold mb-0.5">Marketplace</h1>
            <p className="text-white/70 text-sm">{products.length} products from verified suppliers worldwide</p>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <aside className="relative w-72 bg-white h-full flex flex-col shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="6" cy="12" r="2" fill="currentColor" />
                      <circle cx="18" cy="12" r="2" fill="currentColor" />
                      <circle cx="12" cy="6" r="2" fill="currentColor" />
                      <circle cx="12" cy="18" r="2" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-[#101111] font-bold text-lg tracking-tight">LEVERAGE</h1>
                    <p className="text-[#4A4A4A] text-[10px] tracking-wider">CONNECTING DOTS TO PORTS</p>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-[#E6E2DA] rounded-lg">
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
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pb-24 lg:pb-8">
        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white font-bold text-2xl">Marketplace</h2>
              <p className="text-white/70 text-sm mt-1">{products.length} products from verified suppliers worldwide</p>
            </div>
            <button className="relative p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Content Area */}
        <div className="lg:hidden px-4 -mt-6 space-y-4 pb-4">
          {/* Search Card */}
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

          {/* Categories */}
          <div>
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
          <div className="flex items-center justify-between">
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
            <div className="bg-white rounded-2xl p-4 shadow-lg shadow-[#154230]/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#101111] font-semibold text-sm">Compare ({compareList.length}/3)</span>
                <button onClick={() => setCompareList([])} className="text-[#4A4A4A] hover:text-[#101111] text-xs font-medium">Clear</button>
              </div>
              <Link href={`/marketplace/compare?ids=${compareList.join(',')}`} className="block w-full py-3 bg-[#154230] text-white font-semibold rounded-xl text-center text-sm hover:bg-[#1d5240] transition-colors shadow-lg shadow-[#154230]/20">
                Compare Products
              </Link>
            </div>
          )}

          {/* Products Grid - Mobile 1 column */}
          <div className="grid grid-cols-1 gap-4">
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

        {/* Desktop Content Area */}
        <div className="hidden lg:block px-8 py-8 space-y-6">
          {/* Desktop Search & Filters Row */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, suppliers..."
                  className="w-full h-12 pl-12 pr-4 bg-[#F7F6F2] border-2 border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm font-medium"
                />
              </div>
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#154230] text-white'
                        : 'bg-[#E6E2DA] text-[#4A4A4A] hover:bg-[#154230]/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-12 pl-4 pr-10 bg-[#E6E2DA] rounded-xl text-[#101111] text-sm font-medium focus:outline-none appearance-none"
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
          </div>

          {/* Compare Bar */}
          {compareList.length > 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[#101111] font-semibold">Compare ({compareList.length}/3)</span>
                <div className="flex gap-2">
                  {compareList.map(id => {
                    const product = products.find(p => p.id === id);
                    return product ? (
                      <span key={id} className="px-2 py-1 bg-[#E6E2DA] rounded-lg text-xs font-medium">{product.name}</span>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setCompareList([])} className="text-[#4A4A4A] hover:text-[#101111] text-sm font-medium">Clear</button>
                <Link href={`/marketplace/compare?ids=${compareList.join(',')}`} className="px-6 py-2.5 bg-[#154230] text-white font-semibold rounded-xl text-sm hover:bg-[#1d5240] transition-colors">
                  Compare
                </Link>
              </div>
            </div>
          )}

          {/* Products Grid - Desktop 4 columns */}
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
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
                      <span className="absolute top-3 left-3 px-3 py-1 bg-[#A6824A] text-white text-xs font-semibold rounded-md">Featured</span>
                    )}
                    {product.isNew && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-[#154230] text-white text-xs font-semibold rounded-md">NEW</span>
                    )}
                    {product.originalPrice && (
                      <span className="absolute bottom-3 left-3 px-3 py-1 bg-[#5D1E21] text-white text-xs font-semibold rounded-md">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-4 space-y-3">
                  <div>
                    <Link href={`/marketplace/${product.id}`}>
                      <h3 className="text-[#101111] font-semibold line-clamp-1 hover:text-[#A6824A] transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-[#4A4A4A] text-sm line-clamp-2 mt-1">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-[#101111]">${product.price}</span>
                      <span className="text-[#4A4A4A] text-sm">/{product.currency}</span>
                    </div>
                    <span className="text-[#4A4A4A] text-sm font-medium">MOQ: {product.moq}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#4A4A4A]">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                      {product.reviews}
                    </span>
                    <span>{product.salesCount.toLocaleString()} sold</span>
                  </div>

                  <div className="pt-3 border-t border-black/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F7F6F2] flex items-center justify-center text-sm font-bold text-[#A6824A]">
                        {product.supplier.country.charAt(0)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#101111] text-sm font-medium">{product.supplier.name}</span>
                        {product.supplier.verified && <CheckCircle className="w-4 h-4 text-[#154230]" />}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/marketplace/${product.id}`} className="flex-1 py-3 bg-[#154230] text-white font-semibold rounded-xl text-center text-sm hover:bg-[#1d5240] transition-colors shadow-lg shadow-[#154230]/20">
                      View
                    </Link>
                    <button onClick={() => toggleFavorite(product.id)} className={`p-3 rounded-xl border transition-colors ${favorites.has(product.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-black/5 text-[#4A4A4A] hover:border-red-200 hover:text-red-500'}`}>
                      <Heart className="w-5 h-5" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button onClick={() => toggleCompare(product.id)} className={`p-3 rounded-xl border transition-colors ${compareList.includes(product.id) ? 'bg-[#A6824A]/10 border-[#A6824A]/30 text-[#A6824A]' : 'border-black/5 text-[#4A4A4A] hover:border-[#A6824A]/30 hover:text-[#A6824A]'}`}>
                      <GitCompare className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Stats Section */}
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-1 bg-[#5D1E21] rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-2xl font-bold">2,847</p>
                <p className="text-white/60 text-sm">Products</p>
              </div>
            </div>
            <div className="col-span-1 bg-[#5D1E21] rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Ship className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-2xl font-bold">523</p>
                <p className="text-white/60 text-sm">Suppliers</p>
              </div>
            </div>
            <div className="col-span-1 bg-[#5D1E21] rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-2xl font-bold">45</p>
                <p className="text-white/60 text-sm">Countries</p>
              </div>
            </div>
            <div className="col-span-1 bg-[#5D1E21] rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-2xl font-bold">98%</p>
                <p className="text-white/60 text-sm">Verified</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 px-4 py-2 z-30">
        <div className="flex items-center justify-around">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === '/marketplace';
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 ${
                  link.primary ? '-mt-4' : ''
                }`}
              >
                {link.primary ? (
                  <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-[#154230]' : 'bg-[#E6E2DA]'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#4A4A4A]'}`} />
                  </div>
                )}
                <span className={`text-xs font-medium ${isActive ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
