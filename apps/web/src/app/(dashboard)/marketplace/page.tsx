'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Heart, GitCompare, Star, Clock, CheckCircle, Plus, X, Filter } from 'lucide-react';

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
}

const suppliers: Supplier[] = [
  { id: '1', name: 'Global Trade Exports', country: 'India', verified: true, rating: 4.8, responseTime: '< 2h', products: 45 },
  { id: '2', name: 'Shanghai Import Co.', country: 'China', verified: true, rating: 4.6, responseTime: '< 4h', products: 128 },
  { id: '3', name: 'Turkey Merchants', country: 'Turkey', verified: true, rating: 4.9, responseTime: '< 1h', products: 67 },
  { id: '4', name: 'Vietnam Sourcing', country: 'Vietnam', verified: false, rating: 4.3, responseTime: '< 6h', products: 34 },
  { id: '5', name: 'UAE Trading Hub', country: 'UAE', verified: true, rating: 4.7, responseTime: '< 3h', products: 89 },
];

const products: Product[] = [
  { id: '1', name: 'Premium Basmati Rice 1121', description: 'Extra long grain, aromatic basmati rice. Aged 2 years.', price: 850, originalPrice: 950, currency: 'USD', moq: '50 MT', category: 'Food & Agriculture', supplier: suppliers[0], tradeTerms: ['FOB', 'CIF', 'EXW'], featured: true, reviews: 128, salesCount: 1248, isNew: false },
  { id: '2', name: 'Organic Cotton Yarn 40/1', description: '100% organic cotton yarn. OEKO-TEX certified.', price: 3.20, currency: 'USD', moq: '10 MT', category: 'Textiles', supplier: suppliers[0], tradeTerms: ['FOB', 'CIF'], reviews: 45, salesCount: 520 },
  { id: '3', name: 'Solar Panels 550W Mono PERC', description: 'Tier 1 solar panels. 25-year warranty.', price: 165, currency: 'USD', moq: '100 units', category: 'Energy', supplier: suppliers[1], tradeTerms: ['FOB', 'CIF', 'DDP'], featured: true, reviews: 89, salesCount: 2100 },
  { id: '4', name: 'Steel Billets Grade A', description: 'IS 2062 certified steel billets.', price: 620, originalPrice: 680, currency: 'USD', moq: '100 MT', category: 'Metals & Minerals', supplier: suppliers[2], tradeTerms: ['FOB', 'CIF'], reviews: 32, salesCount: 890 },
  { id: '5', name: 'Olive Oil Extra Virgin', description: 'Cold pressed, first harvest olive oil.', price: 4.50, currency: 'USD', moq: '5 MT', category: 'Food & Agriculture', supplier: suppliers[2], tradeTerms: ['FOB', 'CIF', 'EXW'], featured: true, reviews: 156, salesCount: 3450 },
  { id: '6', name: 'Black Pepper MG1 Grade', description: 'Steam sterilized. Fair trade certified.', price: 4500, currency: 'USD', moq: '5 MT', category: 'Food & Agriculture', supplier: suppliers[3], tradeTerms: ['FOB', 'CIF'], reviews: 41, salesCount: 670, isNew: true },
  { id: '7', name: 'LED Solar Street Lights', description: 'All-in-one solar LED street lighting.', price: 89, currency: 'USD', moq: '50 units', category: 'Energy', supplier: suppliers[4], tradeTerms: ['FOB', 'EXW'], reviews: 52, salesCount: 4500, isNew: true },
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
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">Browse Products</h1>
          <p className="text-[#D8CCBC] text-sm">{products.length} products from verified suppliers</p>
        </div>
        <Link href="/rfqs/new" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl hover:bg-[#D4AA82] transition-colors">
          <Plus className="w-5 h-5" />
          Post RFQ
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, suppliers..."
          className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/50 focus:outline-none focus:border-[#C49A6C]"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
              selectedCategory === cat
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] hover:bg-[rgba(255,255,255,0.1)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between">
        <span className="text-[#D8CCBC] text-sm">{filteredProducts.length} products</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="h-10 px-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C49A6C]"
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
        <div className="fixed bottom-28 left-4 right-4 sm:left-auto sm:right-8 sm:w-96 bg-[#0E3B36] border border-[#C49A6C]/30 rounded-2xl p-4 shadow-2xl z-50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#F4F1EA] font-semibold">Compare ({compareList.length}/3)</span>
            <button onClick={() => setCompareList([])} className="text-[#D8CCBC] hover:text-white text-sm">Clear</button>
          </div>
          <Link href={`/marketplace/compare?ids=${compareList.join(',')}`} className="block w-full py-2.5 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl text-center">
            Compare Products
          </Link>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden hover:border-[#C49A6C]/30 transition-all group">
            <Link href={`/marketplace/${product.id}`} className="block">
              <div className="aspect-square bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center relative p-8">
                <span className="text-6xl group-hover:scale-110 transition-transform">{product.category === 'Food & Agriculture' ? '🍚' : product.category === 'Textiles' ? '🧶' : product.category === 'Energy' ? '☀️' : '📦'}</span>
                {product.featured && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-[#C49A6C] text-[#081512] text-xs font-semibold rounded-lg">Featured</span>
                )}
                {product.isNew && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-lg">NEW</span>
                )}
                {product.originalPrice && (
                  <span className="absolute bottom-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </Link>

            <div className="p-4 space-y-3">
              <div>
                <Link href={`/marketplace/${product.id}`}>
                  <h3 className="text-[#F4F1EA] font-semibold line-clamp-1 hover:text-[#C49A6C] transition-colors">{product.name}</h3>
                </Link>
                <p className="text-[#D8CCBC] text-sm line-clamp-2 mt-1">{product.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-emerald-400">${product.price}</span>
                  <span className="text-[#D8CCBC] text-xs">/{product.currency}</span>
                </div>
                <span className="text-[#D8CCBC] text-xs">MOQ: {product.moq}</span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#D8CCBC]">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#C49A6C] fill-[#C49A6C]" />
                  {product.reviews}
                </span>
                <span>{product.salesCount.toLocaleString()} sold</span>
              </div>

              <div className="pt-3 border-t border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] flex items-center justify-center text-sm font-bold text-[#C49A6C]">
                      {product.supplier.country.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-[#F4F1EA] text-xs font-medium">{product.supplier.name}</span>
                        {product.supplier.verified && <CheckCircle className="w-3 h-3 text-emerald-400" />}
                      </div>
                      <span className="text-[#D8CCBC] text-xs">{product.supplier.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Link href={`/marketplace/${product.id}`} className="flex-1 py-2.5 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl text-center text-sm hover:bg-[#D4AA82] transition-colors">
                  View Details
                </Link>
                <button onClick={() => toggleFavorite(product.id)} className={`p-2.5 rounded-xl border transition-colors ${favorites.has(product.id) ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-[rgba(255,255,255,0.1)] text-[#D8CCBC] hover:border-red-500 hover:text-red-400'}`}>
                  <Heart className="w-5 h-5" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                </button>
                <button onClick={() => toggleCompare(product.id)} className={`p-2.5 rounded-xl border transition-colors ${compareList.includes(product.id) ? 'bg-[#C49A6C]/20 border-[#C49A6C] text-[#C49A6C]' : 'border-[rgba(255,255,255,0.1)] text-[#D8CCBC] hover:border-[#C49A6C] hover:text-[#C49A6C]'}`}>
                  <GitCompare className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}