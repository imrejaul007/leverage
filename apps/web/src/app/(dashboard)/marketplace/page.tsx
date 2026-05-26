'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface Supplier {
  id: string;
  name: string;
  country: string;
  countryCode: string;
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
  image: string;
  category: string;
  supplier: Supplier;
  tradeTerms: string[];
  featured?: boolean;
  reviews: number;
  salesCount: number;
  isNew?: boolean;
}

const suppliers: Supplier[] = [
  { id: '1', name: 'Global Trade Exports', country: 'India', countryCode: '🇮🇳', verified: true, rating: 4.8, responseTime: '< 2h', products: 45 },
  { id: '2', name: 'Shanghai Import Co.', country: 'China', countryCode: '🇨🇳', verified: true, rating: 4.6, responseTime: '< 4h', products: 128 },
  { id: '3', name: 'Turkey Merchants', country: 'Turkey', countryCode: '🇹🇷', verified: true, rating: 4.9, responseTime: '< 1h', products: 67 },
  { id: '4', name: 'Vietnam Sourcing', country: 'Vietnam', countryCode: '🇻🇳', verified: false, rating: 4.3, responseTime: '< 6h', products: 34 },
  { id: '5', name: 'UAE Trading Hub', country: 'UAE', countryCode: '🇦🇪', verified: true, rating: 4.7, responseTime: '< 3h', products: 89 },
];

const products: Product[] = [
  { id: '1', name: 'Premium Basmati Rice 1121', description: 'Extra long grain, aromatic basmati rice. Aged 2 years.', price: 850, originalPrice: 950, currency: 'USD', moq: '50 MT', image: '🍚', category: 'Food & Agriculture', supplier: suppliers[0], tradeTerms: ['FOB', 'CIF', 'EXW'], featured: true, reviews: 128, salesCount: 1248, isNew: false },
  { id: '2', name: 'Organic Cotton Yarn 40/1', description: '100% organic cotton yarn. OEKO-TEX certified.', price: 3.20, currency: 'USD', moq: '10 MT', image: '🧶', category: 'Textiles', supplier: suppliers[0], tradeTerms: ['FOB', 'CIF'], reviews: 45, salesCount: 520 },
  { id: '3', name: 'Solar Panels 550W Mono PERC', description: 'Tier 1 solar panels. 25-year warranty.', price: 165, currency: 'USD', moq: '100 units', image: '☀️', category: 'Energy', supplier: suppliers[1], tradeTerms: ['FOB', 'CIF', 'DDP'], featured: true, reviews: 89, salesCount: 2100 },
  { id: '4', name: 'Steel Billets Grade A', description: 'IS 2062 certified steel billets.', price: 620, originalPrice: 680, currency: 'USD', moq: '100 MT', image: '⚙️', category: 'Metals & Minerals', supplier: suppliers[2], tradeTerms: ['FOB', 'CIF'], reviews: 32, salesCount: 890 },
  { id: '5', name: 'Olive Oil Extra Virgin', description: 'Cold pressed, first harvest olive oil.', price: 4.50, currency: 'USD', moq: '5 MT', image: '🫒', category: 'Food & Agriculture', supplier: suppliers[2], tradeTerms: ['FOB', 'CIF', 'EXW'], featured: true, reviews: 156, salesCount: 3450 },
  { id: '6', name: 'Leather Wallets - Bulk', description: 'Genuine leather wallets. Custom branding.', price: 12, currency: 'USD', moq: '500 units', image: '👛', category: 'Leather', supplier: suppliers[2], tradeTerms: ['FOB', 'EXW'], reviews: 28, salesCount: 1200 },
  { id: '7', name: 'PCB Electronic Components', description: 'Multi-layer PCBs. RoHS compliant.', price: 2.80, currency: 'USD', moq: '1000 units', image: '🔌', category: 'Electronics', supplier: suppliers[1], tradeTerms: ['FOB', 'EXW', 'DDP'], reviews: 67, salesCount: 8900 },
  { id: '8', name: 'Black Pepper MG1 Grade', description: 'Steam sterilized. Fair trade certified.', price: 4500, currency: 'USD', moq: '5 MT', image: '🌶️', category: 'Food & Agriculture', supplier: suppliers[3], tradeTerms: ['FOB', 'CIF'], reviews: 41, salesCount: 670 },
  { id: '9', name: 'Ceramic Porcelain Tiles', description: 'Glossy porcelain tiles. CE certified.', price: 4.20, currency: 'USD', moq: '500 sqm', image: '🏠', category: 'Building Materials', supplier: suppliers[4], tradeTerms: ['FOB', 'CIF', 'DDP'], featured: true, reviews: 93, salesCount: 15000 },
  { id: '10', name: 'Fresh Arabica Coffee Beans', description: 'Premium single origin coffee beans.', price: 8.50, currency: 'USD', moq: '1 MT', image: '☕', category: 'Food & Agriculture', supplier: suppliers[3], tradeTerms: ['FOB', 'CIF'], reviews: 78, salesCount: 2340, isNew: true },
  { id: '11', name: 'LED Solar Street Lights', description: 'All-in-one solar LED street lighting.', price: 89, currency: 'USD', moq: '50 units', image: '💡', category: 'Energy', supplier: suppliers[4], tradeTerms: ['FOB', 'EXW'], reviews: 52, salesCount: 4500, isNew: true },
  { id: '12', name: 'Medical Grade PVC Tubing', description: 'FDA certified medical tubing.', price: 2.40, currency: 'USD', moq: '500 kg', image: '💉', category: 'Healthcare', supplier: suppliers[1], tradeTerms: ['FOB', 'DDP'], reviews: 35, salesCount: 8900 },
];

const categories = [
  { name: 'All Products', count: products.length, icon: '🛒' },
  { name: 'Food & Agriculture', count: 42, icon: '🍚' },
  { name: 'Textiles', count: 28, icon: '🧵' },
  { name: 'Electronics', count: 24, icon: '📱' },
  { name: 'Metals & Minerals', count: 18, icon: '⚙️' },
  { name: 'Energy', count: 15, icon: '☀️' },
  { name: 'Chemicals', count: 12, icon: '🧪' },
  { name: 'Building Materials', count: 10, icon: '🏗️' },
  { name: 'Leather', count: 8, icon: '👝' },
  { name: 'Healthcare', count: 6, icon: '🏥' },
];

type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'popular';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [showFilters, setShowFilters] = useState(false);
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
        product.supplier.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesVerified = !verifiedOnly || product.supplier.verified;

      let matchesPrice = true;
      if (priceRange) {
        matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      }

      return matchesSearch && matchesCategory && matchesVerified && matchesPrice;
    });

    // Sort
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
      case 'featured':
      default:
        result = result.filter(p => p.featured).concat(result.filter(p => !p.featured));
    }

    return result;
  }, [search, selectedCategory, verifiedOnly, sortBy, priceRange]);

  const featuredProducts = products.filter(p => p.featured);
  const compareProducts = products.filter(p => compareList.includes(p.id));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">Global Marketplace</h1>
          <p className="text-[#D8CCBC]/60 text-sm">{products.length} products from {suppliers.length} verified suppliers</p>
        </div>
        <Link href="/rfqs/new" className="px-4 py-2 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl hover:bg-[#D4AA82] transition-colors text-center">
          Post RFQ
        </Link>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, suppliers..."
            className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C]"
          />
          <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] flex items-center gap-2 hover:border-[#C49A6C] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[#F4F1EA] font-semibold">Filters</h3>
            <button onClick={() => setShowFilters(false)} className="text-[#D8CCBC] hover:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Verified Only */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-5 h-5 rounded border-[rgba(255,255,255,0.2)] bg-transparent text-[#C49A6C] focus:ring-[#C49A6C]"
            />
            <span className="text-[#D8CCBC]">Verified suppliers only</span>
          </label>

          {/* Price Range */}
          <div>
            <label className="text-[#D8CCBC] text-sm mb-2 block">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                onChange={(e) => setPriceRange(prev => [parseInt(e.target.value) || 0, prev ? prev[1] : 999999])}
                className="w-full h-10 px-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C49A6C]"
              />
              <input
                type="number"
                placeholder="Max"
                onChange={(e) => setPriceRange(prev => [prev ? prev[0] : 0, parseInt(e.target.value) || 999999])}
                className="w-full h-10 px-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-[#F4F1EA] text-sm focus:outline-none focus:border-[#C49A6C]"
              />
            </div>
          </div>

          <button
            onClick={() => { setVerifiedOnly(false); setPriceRange(null); }}
            className="text-[#C49A6C] text-sm hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Categories - Horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl transition-colors ${
              selectedCategory === cat.name
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#D8CCBC]'
            }`}
          >
            <span className="text-lg">{cat.icon}</span>
            <span className="font-medium whitespace-nowrap text-sm">{cat.name}</span>
            <span className={`text-xs ${selectedCategory === cat.name ? 'text-[#081512]/60' : 'text-[#D8CCBC]/50'}`}>{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-[#0E3B36] border border-[#C49A6C]/30 rounded-xl p-4 shadow-2xl z-40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#F4F1EA] font-medium">Compare ({compareList.length}/3)</span>
            <button onClick={() => setCompareList([])} className="text-[#D8CCBC] hover:text-white text-sm">Clear</button>
          </div>
          <div className="flex gap-2 mb-3">
            {compareProducts.map(p => (
              <div key={p.id} className="w-12 h-12 bg-[#081512] rounded-lg flex items-center justify-center text-2xl relative">
                {p.image}
                <button onClick={() => toggleCompare(p.id)} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs">×</button>
              </div>
            ))}
            {[...Array(3 - compareList.length)].map((_, i) => (
              <div key={i} className="w-12 h-12 border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded-lg" />
            ))}
          </div>
          <Link href={`/marketplace/compare?ids=${compareList.join(',')}`} className="block w-full py-2 bg-[#C49A6C] text-[#081512] font-semibold rounded-lg text-center">
            Compare Products
          </Link>
        </div>
      )}

      {/* Featured Products */}
      {selectedCategory === 'All Products' && !search && !sortBy && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-[#F4F1EA]">Featured Products</h2>
            <Link href="/marketplace?filter=featured" className="text-[#C49A6C] text-sm hover:underline">View All</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                featured
                compact
                isFavorite={favorites.has(product.id)}
                onFavorite={() => toggleFavorite(product.id)}
                onCompare={() => toggleCompare(product.id)}
                isComparing={compareList.includes(product.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Products */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-[#F4F1EA]">
            {selectedCategory === 'All Products' ? 'All Products' : selectedCategory}
          </h2>
          <span className="text-[#D8CCBC]/60 text-sm">{filteredProducts.length} products</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="card text-center py-12">
            <span className="text-5xl mb-4 block">🔍</span>
            <h3 className="text-[#F4F1EA] font-semibold mb-2">No products found</h3>
            <p className="text-[#D8CCBC]/60 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.has(product.id)}
                onFavorite={() => toggleFavorite(product.id)}
                onCompare={() => toggleCompare(product.id)}
                isComparing={compareList.includes(product.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* FAB - Mobile */}
      <Link
        href="/rfqs/new"
        className="fixed bottom-24 right-4 w-14 h-14 bg-[#C49A6C] rounded-full flex items-center justify-center shadow-lg shadow-[#C49A6C]/30 hover:scale-110 transition-transform sm:hidden"
      >
        <svg className="w-6 h-6 text-[#081512]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
}

function ProductCard({
  product,
  featured,
  compact,
  isFavorite,
  onFavorite,
  onCompare,
  isComparing,
}: {
  product: Product;
  featured?: boolean;
  compact?: boolean;
  isFavorite: boolean;
  onFavorite: () => void;
  onCompare: () => void;
  isComparing: boolean;
}) {
  if (compact) {
    return (
      <Link href={`/marketplace/${product.id}`} className="flex-shrink-0 w-64 sm:w-auto bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-3 hover:border-[#C49A6C]/30 transition-all">
        <div className="flex gap-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-lg flex items-center justify-center flex-shrink-0 relative">
            <span className="text-3xl sm:text-4xl">{product.image}</span>
            {product.isNew && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-emerald-500 text-white text-[10px] rounded">NEW</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[#F4F1EA] font-medium text-sm line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-lg">{product.supplier.countryCode}</span>
              <span className="text-[#D8CCBC]/50 text-xs">{product.supplier.name.split(' ')[0]}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-[#C49A6C] font-bold">${product.price}<span className="text-[#D8CCBC]/50 text-xs">/{product.currency}</span></p>
              <button onClick={(e) => { e.preventDefault(); onFavorite(); }} className={`p-1 ${isFavorite ? 'text-red-400' : 'text-[#D8CCBC]/50'}`}>
                <svg className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl overflow-hidden hover:border-[#C49A6C]/30 transition-all group">
      <Link href={`/marketplace/${product.id}`} className="block">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center relative">
          <span className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform">{product.image}</span>
          {featured && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#C49A6C] text-[#081512] text-xs font-semibold rounded">Featured</span>
          )}
          {product.isNew && (
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-semibold rounded">NEW</span>
          )}
          {product.originalPrice && (
            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <Link href={`/marketplace/${product.id}`}>
            <h3 className="text-[#F4F1EA] font-medium line-clamp-1 hover:text-[#C49A6C] transition-colors">{product.name}</h3>
          </Link>
          <p className="text-[#D8CCBC]/50 text-xs line-clamp-2 mt-1">{product.description}</p>
        </div>

        {/* Price & MOQ */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#C49A6C]">${product.price}</span>
            <span className="text-[#D8CCBC]/50 text-xs">/{product.currency}</span>
            {product.originalPrice && (
              <span className="ml-2 text-[#D8CCBC]/50 text-xs line-through">${product.originalPrice}</span>
            )}
          </div>
          <span className="text-[#D8CCBC]/60 text-xs">MOQ: {product.moq}</span>
        </div>

        {/* Rating & Sales */}
        <div className="flex items-center gap-3 text-xs text-[#D8CCBC]/60">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {product.reviews}
          </span>
          <span>|</span>
          <span>{product.salesCount.toLocaleString()} sold</span>
        </div>

        {/* Supplier */}
        <div className="pt-2 border-t border-[rgba(255,255,255,0.05)]">
          <Link href={`/suppliers/${product.supplier.id}`} className="flex items-center gap-2">
            <span className="text-lg">{product.supplier.countryCode}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[#F4F1EA] text-xs font-medium truncate">{product.supplier.name}</span>
                {product.supplier.verified && (
                  <svg className="w-3.5 h-3.5 text-[#C49A6C] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-[#D8CCBC]/50 text-xs">Responds {product.supplier.responseTime}</p>
            </div>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link href={`/marketplace/${product.id}`} className="flex-1 py-2 bg-[#C49A6C] text-[#081512] font-semibold rounded-lg text-center text-sm hover:bg-[#D4AA82] transition-colors">
            View Details
          </Link>
          <button onClick={onFavorite} className={`p-2 rounded-lg border transition-colors ${isFavorite ? 'bg-red-500/20 border-red-500 text-red-400' : 'border-[rgba(255,255,255,0.1)] text-[#D8CCBC] hover:border-red-500 hover:text-red-400'}`}>
            <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button onClick={onCompare} className={`p-2 rounded-lg border transition-colors ${isComparing ? 'bg-[#C49A6C]/20 border-[#C49A6C] text-[#C49A6C]' : 'border-[rgba(255,255,255,0.1)] text-[#D8CCBC] hover:border-[#C49A6C] hover:text-[#C49A6C]'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
