'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
}

const suppliers: Supplier[] = [
  { id: '1', name: 'Global Trade Exports', country: 'India', verified: true, rating: 4.8, responseTime: '< 2h', products: 45 },
  { id: '2', name: 'Shanghai Import Co.', country: 'China', verified: true, rating: 4.6, responseTime: '< 4h', products: 128 },
  { id: '3', name: 'Turkey Merchants', country: 'Turkey', verified: true, rating: 4.9, responseTime: '< 1h', products: 67 },
  { id: '4', name: 'Vietnam Sourcing', country: 'Vietnam', verified: false, rating: 4.3, responseTime: '< 6h', products: 34 },
  { id: '5', name: 'UAE Trading Hub', country: 'UAE', verified: true, rating: 4.7, responseTime: '< 3h', products: 89 },
];

const products: Product[] = [
  { id: '1', name: 'Premium Basmati Rice 1121', description: 'Extra long grain, aromatic basmati rice. Aged 2 years.', price: 850, originalPrice: 950, currency: 'USD', moq: '50 MT', category: 'Food& Agriculture', supplier: suppliers[0], tradeTerms: ['FOB', 'CIF', 'EXW'], featured: true, reviews: 128, salesCount: 1248, isNew: false },
  { id: '2', name: 'Organic Cotton Yarn 40/1', description: '100% organic cotton yarn. OEKO-TEX certified.', price: 3.20, currency: 'USD', moq: '10 MT', category: 'Textiles', supplier: suppliers[0], tradeTerms: ['FOB', 'CIF'], reviews: 45, salesCount: 520 },
  { id: '3', name: 'Solar Panels 550W Mono PERC', description: 'Tier 1 solar panels. 25-year warranty.', price: 165, currency: 'USD', moq: '100 units', category: 'Energy', supplier: suppliers[1], tradeTerms: ['FOB', 'CIF', 'DDP'], featured: true, reviews: 89, salesCount: 2100 },
  { id: '4', name: 'Steel Billets Grade A', description: 'IS 2062 certified steel billets.', price: 620, originalPrice: 680, currency: 'USD', moq: '100 MT', category: 'Metals & Minerals', supplier: suppliers[2], tradeTerms: ['FOB', 'CIF'], reviews: 32, salesCount: 890 },
  { id: '5', name: 'Olive Oil Extra Virgin', description: 'Cold pressed, first harvest olive oil.', price: 4.50, currency: 'USD', moq: '5 MT', category: 'Food & Agriculture', supplier: suppliers[2], tradeTerms: ['FOB', 'CIF', 'EXW'], featured: true, reviews: 156, salesCount: 3450 },
  { id: '6', name: 'Black Pepper MG1 Grade', description: 'Steam sterilized. Fair trade certified.', price: 4500, currency: 'USD', moq: '5 MT', category: 'Food & Agriculture', supplier: suppliers[3], tradeTerms: ['FOB', 'CIF'], reviews: 41, salesCount: 670, isNew: true },
  { id: '7', name: 'LED Solar Street Lights', description: 'All-in-one solar LED street lighting.', price: 89, currency: 'USD', moq: '50 units', category: 'Energy', supplier: suppliers[4], tradeTerms: ['FOB', 'EXW'], reviews: 52, salesCount: 4500, isNew: true },
];

const categories = ['All', 'Food& Agriculture', 'Textiles', 'Electronics', 'Metals & Minerals', 'Energy'];

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
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">Browse Products</h1>
          <p className="text-gray-500 text-sm">{products.length} products from verified suppliers</p>
        </div>
        <Link href="/rfqs/new" className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3E6A47] text-white font-semibold rounded-lg hover:bg-[#4A7D55] transition-colors text-sm">
          <Plus className="w-4 h-4" />
          Post RFQ
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, suppliers..."
          className="w-full h-11 pl-11 pr-4 bg-white border border-black/5 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C49A6C] text-sm"
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
                ? 'bg-[#3E6A47] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-black/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">{filteredProducts.length} products</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="h-10 px-3 bg-white border border-black/5 rounded-lg text-gray-900 text-sm focus:outline-none focus:border-[#C49A6C]"
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
            <span className="text-gray-900 font-semibold text-sm">Compare ({compareList.length}/3)</span>
            <button onClick={() => setCompareList([])} className="text-gray-500 hover:text-gray-900 text-xs">Clear</button>
          </div>
          <Link href={`/marketplace/compare?ids=${compareList.join(',')}`} className="block w-full py-2.5 bg-[#3E6A47] text-white font-semibold rounded-lg text-center text-sm">
            Compare Products
          </Link>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white border border-black/5 rounded-xl overflow-hidden hover:shadow-md transition-all group">
            <Link href={`/marketplace/${product.id}`} className="block">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative p-8">
                <span className="text-5xl group-hover:scale-110 transition-transform">{product.category === 'Food & Agriculture' ? '🍚' : product.category === 'Textiles' ? '🧶' : product.category === 'Energy' ? '☀️' : '📦'}</span>
                {product.featured && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#C49A6C] text-white text-[10px] font-semibold rounded-md">Featured</span>
                )}
                {product.isNew && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-semibold rounded-md">NEW</span>
                )}
                {product.originalPrice && (
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-semibold rounded-md">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </Link>

            <div className="p-4 space-y-3">
              <div>
                <Link href={`/marketplace/${product.id}`}>
                  <h3 className="text-gray-900 font-medium text-sm line-clamp-1 hover:text-[#C49A6C] transition-colors">{product.name}</h3>
                </Link>
                <p className="text-gray-500 text-xs line-clamp-2 mt-1">{product.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <span className="text-gray-500 text-xs">/{product.currency}</span>
                </div>
                <span className="text-gray-500 text-xs">MOQ: {product.moq}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#C49A6C] fill-[#C49A6C]" />
                  {product.reviews}
                </span>
                <span>{product.salesCount.toLocaleString()} sold</span>
              </div>

              <div className="pt-3 border-t border-black/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-xs font-bold text-[#C49A6C]">
                      {product.supplier.country.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-900 text-xs">{product.supplier.name}</span>
                        {product.supplier.verified && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                      </div>
                      <span className="text-gray-400 text-xs">{product.supplier.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Link href={`/marketplace/${product.id}`} className="flex-1 py-2.5 bg-[#3E6A47] text-white font-semibold rounded-lg text-center text-xs hover:bg-[#4A7D55] transition-colors">
                  View Details
                </Link>
                <button onClick={() => toggleFavorite(product.id)} className={`p-2 rounded-lg border transition-colors ${favorites.has(product.id) ? 'bg-red-50 border-red-200 text-red-500' : 'border-black/5 text-gray-400 hover:border-red-200 hover:text-red-500'}`}>
                  <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'} />
                </button>
                <button onClick={() => toggleCompare(product.id)} className={`p-2 rounded-lg border transition-colors ${compareList.includes(product.id) ? 'bg-[#C49A6C]/10 border-[#C49A6C]/30 text-[#C49A6C]' : 'border-black/5 text-gray-400 hover:border-[#C49A6C]/30 hover:text-[#C49A6C]'}`}>
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
