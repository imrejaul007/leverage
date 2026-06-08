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
  X,
  Plus,
  Globe,
  Package as PackageIcon,
  Ship,
  CheckCircle,
  ShoppingCart,
  LogOut,
  Menu,
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
  { name: 'Food & Agriculture', icon: '🌾' },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {/* Desktop Sidebar - White background with green (#154230) active links */}
      {isDesktop && (
        <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
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
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.active;
              return (
                <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'}`}>
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
      )}

      {/* Main Content */}
      <div className={`w-full bg-[#f7f5f1] min-h-screen pb-[95px] sm:pb-[100px] ${isDesktop ? 'lg:ml-64' : ''}`}>
        {/* MOBILE HEADER - Clean header with hamburger + logo + bell */}
        {isMobile && (
          <div className="px-5 pt-5 pb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="w-[42px] h-[42px] rounded-xl bg-white flex items-center justify-center shadow-sm"
                >
                  <Menu className="w-5 h-5 text-[#154230]" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-[42px] h-[42px] bg-[#154230] rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="6" cy="12" r="2" fill="currentColor" />
                      <circle cx="18" cy="12" r="2" fill="currentColor" />
                      <circle cx="12" cy="6" r="2" fill="currentColor" />
                      <circle cx="12" cy="18" r="2" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[22px] font-bold text-[#101111] leading-none tracking-tight">LEVERAGE</div>
                    <div className="text-[8px] text-[#4A4A4A] tracking-widest">CONNECTING DOTS TO PORTS</div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-[20px] p-1.5">🔍</button>
                <div className="text-[20px] relative">
                  🔔
                  <span className="absolute -top-1 -right-1 w-[15px] h-[15px] rounded-full bg-[#7b1113] text-white text-[9px] flex items-center justify-center font-bold">3</span>
                </div>
                <button className="w-[44px] h-[44px] rounded-xl bg-[#154230] text-white text-[24px] flex items-center justify-center border-none font-light">+</button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-2xl">
              <div className="p-6 border-b border-black/5 flex justify-between items-center">
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
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors"
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
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'}`}
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
          </>
        )}

        {/* Desktop Header */}
        {isDesktop && (
          <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-[#154230] to-[#1d5c3e]">
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
        )}

        {/* HERO - Mobile & Tablet */}
        {(isMobile || isTablet) && !isMobile && (
          <div className="px-5 pb-4 relative">
            <div className="relative z-10">
              <h1 className={`${isMobile ? 'text-[26px]' : 'text-[28px]'} font-bold text-[#111] leading-tight`}>Marketplace</h1>
              <p className="text-[13px] text-[#666] mt-1">Browse suppliers & products</p>
            </div>
            <div className="absolute right-0 top-[-20px] text-[100px] opacity-30 select-none pointer-events-none">🌍</div>
          </div>
        )}

        {/* MARKET CARD */}
        <div className={`${isMobile ? 'mx-5 mb-4 p-5' : isTablet ? 'mx-6 mb-5 p-6' : 'mx-8 mb-6 p-7'} bg-gradient-to-r from-[#154230] via-[#1d5c3e] to-[#154230] rounded-2xl text-white shadow-lg`}>
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div className="flex gap-3 sm:gap-4 items-center">
              <div className={`${isMobile ? 'w-[52px] h-[52px] text-[26px]' : 'w-[56px] h-[56px] text-[28px]'} rounded-2xl bg-white/15 flex items-center justify-center`}>
                🌐
              </div>
              <div>
                <div className={`${isMobile ? 'text-[22px]' : 'text-[24px]'} font-bold leading-tight`}>Global Marketplace</div>
                <div className="text-[12px] sm:text-[13px] mt-0.5 opacity-90">{products.length} products from verified suppliers worldwide</div>
              </div>
            </div>
            <button className="bg-[#8b1c21] border-none text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-[13px] sm:text-[14px]">
              + Post RFQ
            </button>
          </div>

          <div className={`mt-4 sm:mt-5 bg-white/10 rounded-2xl p-4 sm:p-5 ${isDesktop ? 'grid grid-cols-4 gap-4' : ''}`}>
            {isDesktop && (
              <div className="col-span-1">
                <h3 className="text-3xl font-extrabold leading-none">2,847</h3>
                <p className="text-[12px] mt-0.5 opacity-80">Products</p>
              </div>
            )}
            <div className={`${isDesktop ? 'col-span-1' : 'text-center'} ${!isDesktop && !isMobile ? 'border-x border-white/20' : ''} ${!isDesktop ? 'grid-cols-3' : ''}`}>
              {!isDesktop && (
                <>
                  <h3 className={`${isMobile ? 'text-[26px]' : 'text-[28px]'} font-extrabold leading-none`}>2,847</h3>
                  <p className={`${isMobile ? 'text-[11px]' : 'text-[12px]'} mt-0.5 opacity-80`}>Products</p>
                </>
              )}
            </div>
            <div className={`${!isDesktop ? 'text-center border-x border-white/20' : 'col-span-1'}`}>
              {!isDesktop && (
                <>
                  <h3 className={`${isMobile ? 'text-[26px]' : 'text-[28px]'} font-extrabold leading-none`}>523</h3>
                  <p className={`${isMobile ? 'text-[11px]' : 'text-[12px]'} mt-0.5 opacity-80`}>Suppliers</p>
                </>
              )}
              {isDesktop && (
                <>
                  <h3 className="text-3xl font-extrabold leading-none">523</h3>
                  <p className="text-[12px] mt-0.5 opacity-80">Suppliers</p>
                </>
              )}
            </div>
            <div className={`${!isDesktop ? 'text-center' : 'col-span-1'}`}>
              {!isDesktop && (
                <>
                  <h3 className={`${isMobile ? 'text-[26px]' : 'text-[28px]'} font-extrabold leading-none`}>98%</h3>
                  <p className={`${isMobile ? 'text-[11px]' : 'text-[12px]'} mt-0.5 opacity-80`}>Verified</p>
                </>
              )}
              {isDesktop && (
                <>
                  <h3 className="text-3xl font-extrabold leading-none">98%</h3>
                  <p className="text-[12px] mt-0.5 opacity-80">Verified</p>
                </>
              )}
            </div>
            {isDesktop && (
              <div className="col-span-1">
                <h3 className="text-3xl font-extrabold leading-none">45</h3>
                <p className="text-[12px] mt-0.5 opacity-80">Countries</p>
              </div>
            )}
          </div>
        </div>

        {/* SEARCH */}
        <div className={`${isMobile ? 'px-5 mb-4' : isTablet ? 'px-6 mb-5' : 'px-8 mb-6'} flex gap-2 sm:gap-3`}>
          <div className={`flex-1 ${isMobile ? 'h-[48px]' : 'h-[52px]'} rounded-xl flex items-center px-4 shadow-sm bg-white`}>
            <Search className="w-5 h-5 text-[#666]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, suppliers..."
              className="border-none outline-none w-full text-[14px] sm:text-[15px] ml-3 bg-transparent text-[#333]"
            />
          </div>
          <button className={`${isMobile ? 'h-[48px] w-[48px]' : 'h-[52px] w-[52px]'} bg-white border-none rounded-xl flex items-center justify-center text-[18px] shadow-sm`}>
            ⚙️
          </button>
        </div>

        {/* CATEGORIES */}
        <div className={`mb-4 sm:mb-5 ${isMobile ? 'px-5' : isTablet ? 'px-6' : 'px-8'} flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide`}>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`${isMobile ? 'min-w-[95px] h-[80px]' : isTablet ? 'min-w-[105px] h-[85px]' : 'min-w-[110px] h-[90px]'} rounded-2xl flex flex-col items-center justify-center text-center border-none flex-shrink-0 ${
                selectedCategory === cat.name
                  ? 'bg-[#154230] text-white'
                  : 'bg-white text-[#555] shadow-sm'
              }`}
            >
              <span className={`${isMobile ? 'text-[22px] mb-1' : 'text-[24px] mb-1.5'}`}>{cat.icon}</span>
              <span className={`${isMobile ? 'text-[11px]' : 'text-[12px]'}`}>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* FEATURED PRODUCTS */}
        <div className={`${isMobile ? 'px-5' : isTablet ? 'px-6' : 'px-8'} mb-3 sm:mb-4 flex justify-between items-center`}>
          <h3 className={`${isMobile ? 'text-[18px]' : 'text-[20px]'} font-bold text-[#111]`}>Featured Products</h3>
          <span className="text-[12px] sm:text-[13px] text-[#666]">{filteredProducts.length} products ›</span>
        </div>

        {/* Product Grid - Responsive */}
        <div className={`${isMobile ? 'px-5 pb-4' : isTablet ? 'px-6 pb-5' : 'px-8 pb-6'} ${isMobile ? 'flex gap-3 overflow-x-auto scrollbar-hide' : 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5'}`}>
          {filteredProducts.map(product => (
            <div key={product.id} className={`${isMobile ? 'min-w-[240px]' : ''} bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow`}>
              <div className={`${isMobile ? 'h-[145px]' : isTablet ? 'h-[155px]' : 'h-[170px]'} overflow-hidden relative`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={170}
                  className="w-full h-full object-cover"
                  unoptimized
                />
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-[#7b1113] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] rounded-md font-bold">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}
                {product.featured && !product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-[#d4a33d] text-white px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] rounded-md font-bold">
                    Featured
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute right-2 top-2 w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] rounded-full bg-white/95 flex items-center justify-center text-[15px] sm:text-[16px] shadow-sm hover:scale-110 transition-transform"
                >
                  {favorites.has(product.id) ? '❤️' : '♡'}
                </button>
              </div>

              <div className="p-3 sm:p-4">
                <div className={`${isMobile ? 'text-[15px]' : 'text-[16px]'} font-bold text-[#111] leading-tight line-clamp-1`}>
                  {product.name}
                </div>
                <div className={`text-[11px] sm:text-[12px] text-[#666] mt-1.5 sm:mt-2 leading-snug line-clamp-2`}>
                  {product.description}
                </div>
                <div className="mt-2.5 sm:mt-3">
                  <span className={`${isMobile ? 'text-[24px]' : 'text-[26px]'} font-extrabold text-[#111]`}>${product.price}</span>
                  <span className="text-[11px] sm:text-[12px] text-[#666]">/{product.currency}</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#777] mt-0.5 sm:mt-1">
                  MOQ: {product.moq}
                </div>
                <div className="mt-2 sm:mt-2.5 flex items-center justify-between text-[10px] sm:text-[11px] text-[#666]">
                  <span>⭐ {product.rating} ({product.reviews})</span>
                  <span>{product.salesCount.toLocaleString()} sold</span>
                </div>
                <div className="mt-2 sm:mt-2.5 text-[10px] sm:text-[11px] text-[#444]">
                  🏢 {product.supplier}
                </div>
                {isDesktop && (
                  <button
                    onClick={() => toggleCart(product.id)}
                    className={`w-full mt-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                      cart.has(product.id)
                        ? 'bg-[#d4a33d] text-white'
                        : 'bg-[#154230] text-white hover:bg-[#1d5c3e]'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {cart.has(product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* BANNER */}
        <div className={`${isMobile ? 'mx-5 mt-3' : isTablet ? 'mx-6 mt-4' : 'mx-8 mt-5'} ${isMobile ? 'p-4' : isTablet ? 'p-5' : 'p-6'} bg-gradient-to-r from-[#8d7a28] to-[#7b1113] rounded-xl sm:rounded-[16px] flex justify-between items-center text-white shadow-lg flex-wrap gap-3`}>
          <div>
            <h4 className={`${isMobile ? 'text-[18px]' : 'text-[20px]'} font-bold`}>Trade with Confidence</h4>
            <p className="text-[11px] sm:text-[12px] mt-0.5 sm:mt-1 opacity-90">All suppliers are verified and quality assured</p>
          </div>
          <button className="bg-white border-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-[#7b1113] text-[12px] sm:text-[13px]">
            Learn More
          </button>
        </div>

        {/* SPACER FOR NAV */}
        <div className={`${isMobile ? 'h-[15px]' : 'h-[20px]'}`} />

        {/* BOTTOM NAVIGATION - Mobile Only */}
        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto h-[70px] bg-white flex justify-around items-center border-t border-[#e5e5e5] z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
            <Link href="/dashboard" className="flex flex-col items-center text-[10px] text-[#888] gap-0.5 py-2">
              <span className="text-[22px]">🏠</span>
              <span>Home</span>
            </Link>
            <Link href="/marketplace" className="flex flex-col items-center text-[10px] text-[#154230] font-bold gap-0.5 py-2">
              <span className="text-[22px]">🔍</span>
              <span>Browse</span>
            </Link>
            <Link href="/rfqs/new" className="w-[52px] h-[52px] rounded-full bg-[#154230] text-white flex items-center justify-center text-[26px] -mt-[26px] shadow-[0_6px_14px_rgba(21,66,48,0.3)] border-[3px] border-white">
              +
            </Link>
            <Link href="/messages" className="flex flex-col items-center text-[10px] text-[#888] gap-0.5 py-2 relative">
              <span className="text-[22px]">💬</span>
              <span>Inbox</span>
            </Link>
            <Link href="/settings" className="flex flex-col items-center text-[10px] text-[#888] gap-0.5 py-2">
              <span className="text-[22px]">👤</span>
              <span>Account</span>
            </Link>
          </nav>
        )}

        {/* Tablet Navigation */}
        {isTablet && (
          <nav className="fixed bottom-0 left-0 right-0 max-w-[768px] mx-auto h-[75px] bg-white flex justify-around items-center border-t border-[#e5e5e5] z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
            <Link href="/dashboard" className="flex flex-col items-center text-[11px] text-[#888] gap-1 py-2">
              <span className="text-[24px]">🏠</span>
              <span>Home</span>
            </Link>
            <Link href="/marketplace" className="flex flex-col items-center text-[11px] text-[#154230] font-bold gap-1 py-2">
              <span className="text-[24px]">🔍</span>
              <span>Browse</span>
            </Link>
            <Link href="/rfqs/new" className="w-[56px] h-[56px] rounded-full bg-[#154230] text-white flex items-center justify-center text-[28px] -mt-[28px] shadow-[0_6px_14px_rgba(21,66,48,0.3)] border-[3px] border-white">
              +
            </Link>
            <Link href="/messages" className="flex flex-col items-center text-[11px] text-[#888] gap-1 py-2 relative">
              <span className="text-[24px]">💬</span>
              <span>Inbox</span>
            </Link>
            <Link href="/settings" className="flex flex-col items-center text-[11px] text-[#888] gap-1 py-2">
              <span className="text-[24px]">👤</span>
              <span>Account</span>
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}