'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Heart, GitCompare, Star, CheckCircle, Plus, X } from 'lucide-react';

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
  { id: '1', name: 'Premium Basmati Rice 1121', description: 'Extra long grain, aromatic basmati rice. Aged 2 years. Perfect for biryani and pilaf.', price: 850, originalPrice: 950, currency: 'USD', moq: '50 MT', category: 'Food & Agriculture', supplier: suppliers[0], tradeTerms: ['FOB', 'CIF', 'EXW'], featured: true, reviews: 128, salesCount: 1248, isNew: false, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop' },
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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Browse Products</h1>
          <p className="text-[#4A4A4A] text-sm">{products.length} products from verified suppliers</p>
        </div>
        <Link href="/rfqs/new" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Post RFQ
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#4A4A4A] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, suppliers..."
          className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedCategory === cat
                ? 'bg-[#154230] text-white'
                : 'bg-white text-[#4A4A4A] hover:bg-[#E6E2DA] border border-black/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between">
        <span className="text-[#4A4A4A] text-sm">{filteredProducts.length} products</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="h-10 px-3 bg-white border border-black/5 rounded-lg text-[#101111] text-sm focus:outline-none focus:border-[#A6824A]"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low</option>
          <option value="price-high">Price: High</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-28 left-4 right-4 sm:left-auto sm:right-8 sm:w-96 bg-white border border-black/5 rounded-xl p-4 shadow-2xl z-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#101111] font-semibold text-sm">Compare ({compareList.length}/3)</span>
            <button onClick={() => setCompareList([])} className="text-[#4A4A4A] hover:text-[#101111] text-xs">Clear</button>
          </div>
          <Link href={`/marketplace/compare?ids=${compareList.join(',')}`} className="block w-full py-2.5 bg-[#154230] text-white font-semibold rounded-lg text-center text-sm">
            Compare Products
          </Link>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white border border-black/5 rounded-xl overflow-hidden hover:shadow-lg transition-all group">
            <Link href={`/marketplace/${product.id}`} className="block">
              <div className="aspect-square bg-[#E6E2DA] relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
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
                  <h3 className="text-[#101111] font-medium text-sm line-clamp-1 hover:text-[#A6824A] transition-colors">{product.name}</h3>
                </Link>
                <p className="text-[#4A4A4A] text-xs line-clamp-2 mt-0.5">{product.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-[#101111]">${product.price}</span>
                  <span className="text-[#4A4A4A] text-xs">/{product.currency}</span>
                </div>
                <span className="text-[#4A4A4A] text-xs">MOQ: {product.moq}</span>
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
                  <div className="w-6 h-6 rounded bg-[#E6E2DA] flex items-center justify-center text-[10px] font-bold text-[#A6824A]">
                    {product.supplier.country.charAt(0)}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#101111] text-xs">{product.supplier.name}</span>
                    {product.supplier.verified && <CheckCircle className="w-3 h-3 text-[#154230]" />}
                  </div>
                </div>
              </div>

              <div className="flex gap-1.5 pt-1.5">
                <Link href={`/marketplace/${product.id}`} className="flex-1 py-2 bg-[#154230] text-white font-semibold rounded-lg text-center text-xs hover:bg-[#1d5240] transition-colors">
                  View
                </Link>
                <button onClick={() => toggleFavorite(product.id)} className={`p-2 rounded-lg border transition-colors ${favorites.has(product.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-black/5 text-[#4A4A4A] hover:border-red-200 hover:text-red-500'}`}>
                  <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                </button>
                <button onClick={() => toggleCompare(product.id)} className={`p-2 rounded-lg border transition-colors ${compareList.includes(product.id) ? 'bg-[#A6824A]/10 border-[#A6824A]/30 text-[#A6824A]' : 'border-black/5 text-[#4A4A4A] hover:border-[#A6824A]/30 hover:text-[#A6824A]'}`}>
                  <GitCompare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
