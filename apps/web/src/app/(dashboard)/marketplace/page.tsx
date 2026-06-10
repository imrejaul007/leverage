'use client';

import { useState, useMemo, useEffect } from 'react';
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
  Plus,
  ShoppingCart,
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
    category: 'Food& Agriculture',
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
    currency: 'USD',
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
    currency: 'USD',
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
    name: 'Black Pepper MG1 Grade',
    description: 'Steam sterilized, fair trade certified.',
    price: 4500,
    currency: 'USD',
    moq: '5 MT',
    category: 'Food & Agriculture',
    supplier: 'Vietnam Sourcing',
    rating: 4.3,
    reviews: 41,
    salesCount: 670,
    image: 'https://images.unsplash.com/photo-1599909533853-13f35e21b9fe?w=800',
  },
  {
    id: '8',
    name: 'LED Solar Street Lights',
    description: 'All-in-one solar LED street lighting.',
    price: 89,
    currency: 'USD',
    moq: '50 units',
    category: 'Energy',
    supplier: 'UAE Trading Hub',
    rating: 4.7,
    reviews: 52,
    salesCount: 4500,
    image: 'https://images.unsplash.com/photo-1534239697798-120952b76f2a?w=800',
  },
];

const categories = [
  { name: 'All', icon: '📦' },
  { name: 'Food& Agriculture', icon: '🌾' },
  { name: 'Textiles', icon: '🧵' },
  { name: 'Electronics', icon: '💻' },
  { name: 'Metals & Minerals', icon: '⛏️' },
  { name: 'Energy', icon: '⚡' },
];

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

type ScreenSize = 'mobile' | 'tablet' | 'desktop' | 'large';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [screenSize, setScreenSize] = useState<ScreenSize>('mobile');
  const [cart, setCart] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else if (width < 1440) {
        setScreenSize('desktop');
      } else {
        setScreenSize('large');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';
  const isDesktop = screenSize === 'desktop' || screenSize === 'large';

  return (
    <div className="min-h-screen bg-[#f7f5f1] flex justify-center">
      {/* Desktop Sidebar - Hidden on mobile/tablet */}
      {isDesktop && (
        <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex flex-col z-40">
          {/* Logo */}
          <div className="p-6 border-b border-black/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0b6b4d] rounded-xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                  <circle cx="6" cy="12" r="2" />
                  <circle cx="18" cy="12" r="2" />
                  <circle cx="12" cy="6" r="2" />
                  <circle cx="12" cy="18" r="2" />
                </svg>
              </div>
              <div>
                <h1 className="text-[#0b6b4d] font-extrabold text-lg tracking-tight">LEVERGE</h1>
                <p className="text-[#b79a45] text-[9px] tracking-wider font-semibold">CONNECTING DOTS TO PORTS</p>
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
                      ? 'bg-[#0b6b4d] text-white'
                      : 'text-[#555] hover:bg-[#f7f5f1]'
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
              <div className="w-10 h-10 bg-[#b79a45] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">JD</span>
              </div>
              <div className="flex-1">
                <p className="text-[#111] font-semibold text-sm">John Doe</p>
                <p className="text-[#666] text-xs">john@company.com</p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className={`w-full bg-[#f7f5f1] min-h-screen pb-[95px] ${isDesktop ? 'lg:ml-64' : ''}`}>

        {/* ==================== MOBILE VIEW ==================== */}
        {isMobile && (
          <div className="max-w-[480px] mx-auto">

            {/* HEADER */}
            <div className="px-5 pt-5 pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-[42px] h-[42px] bg-[#0b6b4d] rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                      <circle cx="6" cy="12" r="2" />
                      <circle cx="18" cy="12" r="2" />
                      <circle cx="12" cy="6" r="2" />
                      <circle cx="12" cy="18" r="2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[24px] font-extrabold text-[#0b6b4d] leading-none tracking-tight">LEVERGE</div>
                    <div className="text-[8px] text-[#b79a45] tracking-widest font-semibold">CONNECTING DOTS TO PORTS</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-[20px] p-1.5">🔍</button>
                  <div className="text-[20px] relative">
                    🔔
                    <span className="absolute -top-1 -right-1 w-[15px] h-[15px] rounded-full bg-[#7b1113] text-white text-[9px] flex items-center justify-center font-bold">3</span>
                  </div>
                  <button className="w-[44px] h-[44px] rounded-xl bg-[#0b6b4d] text-white text-[24px] flex items-center justify-center border-none font-light">+</button>
                </div>
              </div>
            </div>

            {/* HERO */}
            <div className="px-5 pb-4 relative">
              <div className="relative z-10">
                <h1 className="text-[26px] font-bold text-[#111] leading-tight">Marketplace</h1>
                <p className="text-[13px] text-[#666] mt-1">Browse suppliers& products</p>
              </div>
              <div className="absolute right-0 top-[-20px] text-[100px] opacity-30 select-none pointer-events-none">🌍</div>
            </div>

            {/* MARKET CARD */}
            <div className="mx-5 mb-4 bg-gradient-to-r from-[#0b6b4d] via-[#0f7a52] to-[#0b6b4d] rounded-[20px] p-5 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="w-[52px] h-[52px] rounded-2xl bg-white/15 flex items-center justify-center text-[26px]">🌐</div>
                  <div>
                    <div className="text-[22px] font-bold leading-tight">Global Marketplace</div>
                    <div className="text-[12px] mt-0.5 opacity-90">{products.length} products from verified suppliers worldwide</div>
                  </div>
                </div>
                <button className="bg-[#8b1c21] border-none text-white px-4 py-2.5 rounded-xl font-semibold text-[13px]">+ Post RFQ</button>
              </div>

              <div className="mt-4 bg-white/10 rounded-2xl p-4">
                <div className="grid grid-cols-3 text-center">
                  <div>
                    <h3 className="text-[26px] font-extrabold leading-none">2,847</h3>
                    <p className="text-[11px] mt-0.5 opacity-80">Products</p>
                  </div>
                  <div className="border-x border-white/20">
                    <h3 className="text-[26px] font-extrabold leading-none">523</h3>
                    <p className="text-[11px] mt-0.5 opacity-80">Suppliers</p>
                  </div>
                  <div>
                    <h3 className="text-[26px] font-extrabold leading-none">98%</h3>
                    <p className="text-[11px] mt-0.5 opacity-80">Verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SEARCH */}
            <div className="px-5 mb-4 flex gap-2">
              <div className="flex-1 bg-white h-[48px] rounded-xl flex items-center px-4 shadow-sm">
                <span className="text-[16px]">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, suppliers..."
                  className="border-none outline-none w-full text-[14px] ml-2.5 bg-transparent text-[#333]"
                />
              </div>
              <button className="w-[48px] h-[48px] bg-white border-none rounded-xl flex items-center justify-center text-[18px] shadow-sm">⚙️</button>
            </div>

            {/* CATEGORIES */}
            <div className="mb-4 px-5 flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`min-w-[95px] h-[80px] rounded-2xl flex flex-col items-center justify-center text-[11px] text-center border-none flex-shrink-0 ${
                    selectedCategory === cat.name
                      ? 'bg-[#0b6b4d] text-white'
                      : 'bg-white text-[#555] shadow-sm'
                  }`}
                >
                  <span className="text-[22px] mb-1">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* FEATURED PRODUCTS */}
            <div className="mb-3 px-5 flex justify-between items-center">
              <h3 className="text-[18px] font-bold text-[#111]">Featured Products</h3>
              <span className="text-[12px] text-[#666]">{filteredProducts.length} products ›</span>
            </div>

            {/* PRODUCTS - Horizontal Scroll */}
            <div className="flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-hide">
              {filteredProducts.map(product => (
                <div key={product.id} className="min-w-[240px] bg-white rounded-[16px] overflow-hidden shadow-sm">
                  <div className="h-[145px] overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={240}
                      height={145}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-[#7b1113] text-white px-2 py-0.5 text-[10px] rounded-md font-bold">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    {product.featured && !product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-[#d4a33d] text-white px-2 py-0.5 text-[10px] rounded-md font-bold">Featured</div>
                    )}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute right-2 top-2 w-[30px] h-[30px] rounded-full bg-white/95 flex items-center justify-center text-[15px] shadow-sm"
                    >
                      {favorites.has(product.id) ? '❤️' : '♡'}
                    </button>
                  </div>

                  <div className="p-3">
                    <div className="text-[15px] font-bold text-[#111] leading-tight">{product.name}</div>
                    <div className="text-[11px] text-[#666] mt-1 leading-snug">{product.description}</div>
                    <div className="mt-2.5">
                      <span className="text-[24px] font-extrabold text-[#111]">${product.price}</span>
                      <span className="text-[11px] text-[#666]">/{product.currency}</span>
                    </div>
                    <div className="text-[10px] text-[#777] mt-0.5">MOQ: {product.moq}</div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-[#666]">
                      <span>⭐ {product.rating} ({product.reviews})</span>
                      <span>{product.salesCount.toLocaleString()} sold</span>
                    </div>
                    <div className="mt-2 text-[10px] text-[#444]">🏢 {product.supplier}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* BANNER */}
            <div className="mx-5 mt-3 bg-gradient-to-r from-[#8d7a28] to-[#7b1113] rounded-[16px] p-4 flex justify-between items-center text-white shadow-lg">
              <div>
                <h4 className="text-[18px] font-bold">Trade with Confidence</h4>
                <p className="text-[11px] mt-0.5 opacity-90">All suppliers are verified and quality assured</p>
              </div>
              <button className="bg-white border-none px-4 py-2 rounded-xl font-semibold text-[#7b1113] text-[12px]">Learn More</button>
            </div>

            {/* SPACER */}
            <div className="h-[15px]" />

            {/* BOTTOM NAVIGATION */}
            <BottomNav activeItem="marketplace" />
          </div>
        )}

        {/* ==================== TABLET VIEW ==================== */}
        {isTablet && (
          <div className="max-w-[768px] mx-auto">

            {/* HEADER */}
            <div className="px-6 pt-6 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-[48px] h-[48px] bg-[#0b6b4d] rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                      <circle cx="6" cy="12" r="2" />
                      <circle cx="18" cy="12" r="2" />
                      <circle cx="12" cy="6" r="2" />
                      <circle cx="12" cy="18" r="2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[26px] font-extrabold text-[#0b6b4d] leading-none tracking-tight">LEVERGE</div>
                    <div className="text-[9px] text-[#b79a45] tracking-widest font-semibold">CONNECTING DOTS TO PORTS</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-[22px] p-2">🔍</button>
                  <div className="text-[22px] relative">
                    🔔
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#7b1113] text-white text-[10px] flex items-center justify-center font-bold">3</span>
                  </div>
                  <button className="w-[48px] h-[48px] rounded-xl bg-[#0b6b4d] text-white text-[26px] flex items-center justify-center border-none font-light">+</button>
                </div>
              </div>
            </div>

            {/* HERO */}
            <div className="px-6 pb-5 relative">
              <div className="relative z-10">
                <h1 className="text-[28px] font-bold text-[#111] leading-tight">Marketplace</h1>
                <p className="text-[14px] text-[#666] mt-1">Browse suppliers & products</p>
              </div>
              <div className="absolute right-0 top-[-20px] text-[100px] opacity-30 select-none pointer-events-none">🌍</div>
            </div>

            {/* MARKET CARD */}
            <div className="mx-6 mb-5 bg-gradient-to-r from-[#0b6b4d] via-[#0f7a52] to-[#0b6b4d] rounded-[20px] p-6 text-white shadow-lg">
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div className="flex gap-4 items-center">
                  <div className="w-[56px] h-[56px] rounded-2xl bg-white/15 flex items-center justify-center text-[28px]">🌐</div>
                  <div>
                    <div className="text-[24px] font-bold leading-tight">Global Marketplace</div>
                    <div className="text-[13px] mt-0.5 opacity-90">{products.length} products from verified suppliers worldwide</div>
                  </div>
                </div>
                <button className="bg-[#8b1c21] border-none text-white px-5 py-3 rounded-xl font-semibold text-[14px]">+ Post RFQ</button>
              </div>

              <div className="mt-5 bg-white/10 rounded-2xl p-5">
                <div className="grid grid-cols-3 text-center">
                  <div>
                    <h3 className="text-[28px] font-extrabold leading-none">2,847</h3>
                    <p className="text-[12px] mt-0.5 opacity-80">Products</p>
                  </div>
                  <div className="border-x border-white/20">
                    <h3 className="text-[28px] font-extrabold leading-none">523</h3>
                    <p className="text-[12px] mt-0.5 opacity-80">Suppliers</p>
                  </div>
                  <div>
                    <h3 className="text-[28px] font-extrabold leading-none">98%</h3>
                    <p className="text-[12px] mt-0.5 opacity-80">Verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SEARCH */}
            <div className="px-6 mb-5 flex gap-3">
              <div className="flex-1 bg-white h-[52px] rounded-xl flex items-center px-4 shadow-sm">
                <span className="text-[18px]">🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, suppliers..."
                  className="border-none outline-none w-full text-[15px] ml-3 bg-transparent text-[#333]"
                />
              </div>
              <button className="w-[52px] h-[52px] bg-white border-none rounded-xl flex items-center justify-center text-[20px] shadow-sm">⚙️</button>
            </div>

            {/* CATEGORIES */}
            <div className="mb-5 px-6 flex gap-3 overflow-x-auto scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`min-w-[105px] h-[85px] rounded-2xl flex flex-col items-center justify-center text-[12px] text-center border-none flex-shrink-0 ${
                    selectedCategory === cat.name
                      ? 'bg-[#0b6b4d] text-white'
                      : 'bg-white text-[#555] shadow-sm'
                  }`}
                >
                  <span className="text-[24px] mb-1.5">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* FEATURED PRODUCTS */}
            <div className="mb-4 px-6 flex justify-between items-center">
              <h3 className="text-[20px] font-bold text-[#111]">Featured Products</h3>
              <span className="text-[13px] text-[#666]">{filteredProducts.length} products ›</span>
            </div>

            {/* PRODUCTS - Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto px-6 pb-5 scrollbar-hide">
              {filteredProducts.map(product => (
                <div key={product.id} className="min-w-[260px] bg-white rounded-[18px] overflow-hidden shadow-sm">
                  <div className="h-[155px] overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={260}
                      height={155}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-[#7b1113] text-white px-2 py-0.5 text-[10px] rounded-md font-bold">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    {product.featured && !product.originalPrice && (
                      <div className="absolute top-2 left-2 bg-[#d4a33d] text-white px-2 py-0.5 text-[10px] rounded-md font-bold">Featured</div>
                    )}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute right-2 top-2 w-[32px] h-[32px] rounded-full bg-white/95 flex items-center justify-center text-[16px] shadow-sm"
                    >
                      {favorites.has(product.id) ? '❤️' : '♡'}
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="text-[16px] font-bold text-[#111] leading-tight">{product.name}</div>
                    <div className="text-[12px] text-[#666] mt-1.5 leading-snug">{product.description}</div>
                    <div className="mt-3">
                      <span className="text-[26px] font-extrabold text-[#111]">${product.price}</span>
                      <span className="text-[12px] text-[#666]">/{product.currency}</span>
                    </div>
                    <div className="text-[11px] text-[#777] mt-1">MOQ: {product.moq}</div>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#666]">
                      <span>⭐ {product.rating} ({product.reviews})</span>
                      <span>{product.salesCount.toLocaleString()} sold</span>
                    </div>
                    <div className="mt-2.5 text-[11px] text-[#444]">🏢 {product.supplier}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* BANNER */}
            <div className="mx-6 mt-4 bg-gradient-to-r from-[#8d7a28] to-[#7b1113] rounded-[16px] p-5 flex justify-between items-center text-white shadow-lg">
              <div>
                <h4 className="text-[20px] font-bold">Trade with Confidence</h4>
                <p className="text-[12px] mt-1 opacity-90">All suppliers are verified and quality assured</p>
              </div>
              <button className="bg-white border-none px-5 py-2.5 rounded-xl font-semibold text-[#7b1113] text-[13px]">Learn More</button>
            </div>

            {/* SPACER */}
            <div className="h-[20px]" />

            {/* BOTTOM NAVIGATION */}
            <BottomNav activeItem="marketplace" />
          </div>
        )}

        {/* ==================== DESKTOP VIEW ==================== */}
        {isDesktop && (
          <div>

            {/* Desktop Header */}
            <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-[#0b6b4d] to-[#0f7a52]">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-white text-3xl font-bold">Marketplace</h1>
                  <p className="text-white/70 text-sm mt-1">Browse suppliers & products</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="relative p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#7b1113] text-white text-xs flex items-center justify-center font-bold">3</span>
                  </button>
                  <button className="relative p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors">
                    <ShoppingCart className="w-6 h-6" />
                    {cart.size > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#d4a33d] text-white text-xs flex items-center justify-center font-bold">{cart.size}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* MARKET CARD */}
            <div className="mx-8 mb-6 bg-gradient-to-r from-[#0b6b4d] via-[#0f7a52] to-[#0b6b4d] rounded-[20px] p-7 text-white shadow-lg">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-[60px] h-[60px] rounded-2xl bg-white/15 flex items-center justify-center text-[30px]">🌐</div>
                  <div>
                    <div className="text-[28px] font-bold leading-tight">Global Marketplace</div>
                    <div className="text-[14px] mt-0.5 opacity-90">{products.length} products from verified suppliers worldwide</div>
                  </div>
                </div>
                <button className="bg-[#8b1c21] border-none text-white px-6 py-3.5 rounded-xl font-semibold text-[15px]">+ Post RFQ</button>
              </div>

              <div className="mt-6 bg-white/10 rounded-2xl p-6 grid grid-cols-4 gap-4 text-center">
                <div>
                  <h3 className="text-[32px] font-extrabold leading-none">2,847</h3>
                  <p className="text-[13px] mt-0.5 opacity-80">Products</p>
                </div>
                <div>
                  <h3 className="text-[32px] font-extrabold leading-none">523</h3>
                  <p className="text-[13px] mt-0.5 opacity-80">Suppliers</p>
                </div>
                <div>
                  <h3 className="text-[32px] font-extrabold leading-none">98%</h3>
                  <p className="text-[13px] mt-0.5 opacity-80">Verified</p>
                </div>
                <div>
                  <h3 className="text-[32px] font-extrabold leading-none">45</h3>
                  <p className="text-[13px] mt-0.5 opacity-80">Countries</p>
                </div>
              </div>
            </div>

            {/* SEARCH */}
            <div className="px-8 mb-6 flex gap-3">
              <div className="flex-1 bg-white h-[56px] rounded-xl flex items-center px-5 shadow-sm">
                <Search className="w-5 h-5 text-[#666]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, suppliers..."
                  className="border-none outline-none w-full text-[15px] ml-3 bg-transparent text-[#333]"
                />
              </div>
              <button className="w-[56px] h-[56px] bg-white border-none rounded-xl flex items-center justify-center text-[20px] shadow-sm">⚙️</button>
            </div>

            {/* CATEGORIES */}
            <div className="mb-6 px-8 flex gap-3 overflow-x-auto scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`min-w-[110px] h-[90px] rounded-2xl flex flex-col items-center justify-center text-[12px] text-center border-none flex-shrink-0 ${
                    selectedCategory === cat.name
                      ? 'bg-[#0b6b4d] text-white'
                      : 'bg-white text-[#555] shadow-sm'
                  }`}
                >
                  <span className="text-[24px] mb-1.5">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* FEATURED PRODUCTS */}
            <div className="px-8 mb-4 flex justify-between items-center">
              <h3 className="text-[22px] font-bold text-[#111]">Featured Products</h3>
              <span className="text-[13px] text-[#666]">{filteredProducts.length} products ›</span>
            </div>

            {/* PRODUCTS - Grid */}
            <div className="px-8 pb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-[18px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  <div className="h-[170px] overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={170}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 bg-[#7b1113] text-white px-2.5 py-1 text-[11px] rounded-md font-bold">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
                    {product.featured && !product.originalPrice && (
                      <div className="absolute top-3 left-3 bg-[#d4a33d] text-white px-2.5 py-1 text-[11px] rounded-md font-bold">Featured</div>
                    )}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute right-3 top-3 w-[34px] h-[34px] rounded-full bg-white/95 flex items-center justify-center text-[16px] shadow-sm hover:scale-110 transition-transform"
                    >
                      {favorites.has(product.id) ? '❤️' : '♡'}
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="text-[16px] font-bold text-[#111] leading-tight line-clamp-1">{product.name}</div>
                    <div className="text-[12px] text-[#666] mt-2 leading-snug line-clamp-2">{product.description}</div>
                    <div className="mt-3">
                      <span className="text-[26px] font-extrabold text-[#111]">${product.price}</span>
                      <span className="text-[12px] text-[#666]">/{product.currency}</span>
                    </div>
                    <div className="text-[11px] text-[#777] mt-1">MOQ: {product.moq}</div>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#666]">
                      <span>⭐ {product.rating} ({product.reviews})</span>
                      <span>{product.salesCount.toLocaleString()} sold</span>
                    </div>
                    <div className="mt-2.5 text-[11px] text-[#444]">🏢 {product.supplier}</div>
                    <button
                      onClick={() => toggleCart(product.id)}
                      className={`w-full mt-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                        cart.has(product.id)
                          ? 'bg-[#d4a33d] text-white'
                          : 'bg-[#0b6b4d] text-white hover:bg-[#0a5c3e]'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {cart.has(product.id) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* BANNER */}
            <div className="mx-8 mt-5 bg-gradient-to-r from-[#8d7a28] to-[#7b1113] rounded-[16px] p-6 flex justify-between items-center text-white shadow-lg">
              <div>
                <h4 className="text-[22px] font-bold">Trade with Confidence</h4>
                <p className="text-[12px] mt-1 opacity-90">All suppliers are verified and quality assured</p>
              </div>
              <button className="bg-white border-none px-5 py-2.5 rounded-xl font-semibold text-[#7b1113] text-[13px]">Learn More</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}