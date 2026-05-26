'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Supplier {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  verified: boolean;
  rating: number;
  responseTime: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  moq: string;
  image: string;
  category: string;
  supplier: Supplier;
  tradeTerms: string[];
  featured?: boolean;
}

const suppliers: Supplier[] = [
  { id: '1', name: 'Global Trade Exports', country: 'India', countryCode: '🇮🇳', verified: true, rating: 4.8, responseTime: '< 2h' },
  { id: '2', name: 'Shanghai Import Co.', country: 'China', countryCode: '🇨🇳', verified: true, rating: 4.6, responseTime: '< 4h' },
  { id: '3', name: 'Turkey Merchants', country: 'Turkey', countryCode: '🇹🇷', verified: true, rating: 4.9, responseTime: '< 1h' },
  { id: '4', name: 'Vietnam Sourcing', country: 'Vietnam', countryCode: '🇻🇳', verified: false, rating: 4.3, responseTime: '< 6h' },
  { id: '5', name: 'UAE Trading Hub', country: 'UAE', countryCode: '🇦🇪', verified: true, rating: 4.7, responseTime: '< 3h' },
];

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Basmati Rice 1121',
    description: 'Extra long grain, aromatic basmati rice. Aged 2 years. Preferred by restaurants worldwide.',
    price: 850,
    currency: 'USD',
    moq: '50 MT',
    image: '🍚',
    category: 'Food & Agriculture',
    supplier: suppliers[0],
    tradeTerms: ['FOB', 'CIF', 'EXW'],
    featured: true,
  },
  {
    id: '2',
    name: 'Cotton Yarn 40/1 Combed',
    description: '100% organic cotton yarn. OEKO-TEX certified. Suitable for weaving and knitting.',
    price: 3.20,
    currency: 'USD',
    moq: '10 MT',
    image: '🧶',
    category: 'Textiles',
    supplier: suppliers[0],
    tradeTerms: ['FOB', 'CIF'],
  },
  {
    id: '3',
    name: 'Solar Panels 550W Mono PERC',
    description: 'Tier 1 solar panels. 25-year warranty. High efficiency for commercial projects.',
    price: 165,
    currency: 'USD',
    moq: '100 units',
    image: '☀️',
    category: 'Energy',
    supplier: suppliers[1],
    tradeTerms: ['FOB', 'CIF', 'DDP'],
    featured: true,
  },
  {
    id: '4',
    name: 'Steel Billets Grade A',
    description: 'IS 2062 certified steel billets. For construction and manufacturing.',
    price: 620,
    currency: 'USD',
    moq: '100 MT',
    image: '⚙️',
    category: 'Metals & Minerals',
    supplier: suppliers[2],
    tradeTerms: ['FOB', 'CIF'],
  },
  {
    id: '5',
    name: 'Olive Oil Extra Virgin',
    description: 'Cold pressed, first harvest. Premium quality from Turkish farms.',
    price: 4.50,
    currency: 'USD',
    moq: '5 MT',
    image: '🫒',
    category: 'Food & Agriculture',
    supplier: suppliers[2],
    tradeTerms: ['FOB', 'CIF', 'EXW'],
    featured: true,
  },
  {
    id: '6',
    name: 'Leather Goods - Wallets',
    description: 'Genuine leather wallets. Custom branding available. Bulk orders.',
    price: 12,
    currency: 'USD',
    moq: '500 units',
    image: '👛',
    category: 'Leather',
    supplier: suppliers[2],
    tradeTerms: ['FOB', 'EXW'],
  },
  {
    id: '7',
    name: 'Electronic Components - PCB',
    description: 'Multi-layer PCBs. Custom designs. RoHS compliant.',
    price: 2.80,
    currency: 'USD',
    moq: '1000 units',
    image: '🔌',
    category: 'Electronics',
    supplier: suppliers[1],
    tradeTerms: ['FOB', 'EXW', 'DDP'],
  },
  {
    id: '8',
    name: 'Spices - Black Pepper',
    description: 'MG1 Grade black pepper. Steam sterilized. Fair trade certified.',
    price: 4500,
    currency: 'USD',
    moq: '5 MT',
    image: '🌶️',
    category: 'Food & Agriculture',
    supplier: suppliers[3],
    tradeTerms: ['FOB', 'CIF'],
  },
  {
    id: '9',
    name: 'Ceramic Tiles - Porcelain',
    description: 'Glossy porcelain tiles. Matt and polished finishes. CE certified.',
    price: 4.20,
    currency: 'USD',
    moq: '500 sqm',
    image: '🏠',
    category: 'Building Materials',
    supplier: suppliers[4],
    tradeTerms: ['FOB', 'CIF', 'DDP'],
    featured: true,
  },
];

const categories = [
  { name: 'All Products', count: 156, icon: '🛒' },
  { name: 'Food & Agriculture', count: 42, icon: '🍚' },
  { name: 'Textiles', count: 28, icon: '🧵' },
  { name: 'Electronics', count: 24, icon: '📱' },
  { name: 'Metals & Minerals', count: 18, icon: '⚙️' },
  { name: 'Energy', count: 15, icon: '☀️' },
  { name: 'Chemicals', count: 12, icon: '🧪' },
  { name: 'Building Materials', count: 10, icon: '🏗️' },
  { name: 'Leather', count: 8, icon: '👝' },
];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      product.supplier.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;

    const matchesVerified = !verifiedOnly || product.supplier.verified;

    return matchesSearch && matchesCategory && matchesVerified;
  });

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#F4F1EA]">Global Marketplace</h1>
          <p className="text-[#D8CCBC]/60 text-sm">Source products from verified suppliers worldwide</p>
        </div>
        <Link href="/rfqs/new" className="px-4 py-2 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl hover:bg-[#D4AA82] transition-colors">
          Post RFQ
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, suppliers, or categories..."
          className="input pl-12"
        />
        <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Categories - Horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
              selectedCategory === cat.name
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#D8CCBC]'
            }`}
          >
            <span>{cat.icon}</span>
            <span className="font-medium whitespace-nowrap">{cat.name}</span>
            <span className={`text-xs ${selectedCategory === cat.name ? 'text-[#081512]/60' : 'text-[#D8CCBC]/50'}`}>{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => setVerifiedOnly(e.target.checked)}
            className="w-5 h-5 rounded border-[rgba(255,255,255,0.2)] bg-transparent text-[#C49A6C] focus:ring-[#C49A6C]"
          />
          <span className="text-[#D8CCBC]">Verified suppliers only</span>
        </label>
      </div>

      {/* Featured Products */}
      {selectedCategory === 'All Products' && !search && (
        <section>
          <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} featured />
            ))}
          </div>
        </section>
      )}

      {/* All Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#F4F1EA]">
            {selectedCategory === 'All Products' ? 'All Products' : selectedCategory}
          </h2>
          <span className="text-[#D8CCBC]/60 text-sm">{filteredProducts.length} products</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="card text-center py-12">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-[#F4F1EA] font-semibold mb-2">No products found</h3>
            <p className="text-[#D8CCBC]/60 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ProductCard({ product, featured }: { product: Product; featured?: boolean }) {
  return (
    <div className="card hover:border-[#C49A6C]/30 transition-all group">
      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
        <span className="text-6xl group-hover:scale-110 transition-transform">{product.image}</span>
        {featured && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-[#C49A6C] text-[#081512] text-xs font-semibold rounded">
            Featured
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-[#F4F1EA] font-semibold line-clamp-1">{product.name}</h3>
          <p className="text-[#D8CCBC]/50 text-sm line-clamp-2 mt-1">{product.description}</p>
        </div>

        {/* Price & MOQ */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-[#C49A6C]">${product.price}</span>
            <span className="text-[#D8CCBC]/50 text-sm">/{product.currency}</span>
          </div>
          <span className="text-[#D8CCBC]/60 text-sm">MOQ: {product.moq}</span>
        </div>

        {/* Trade Terms */}
        <div className="flex flex-wrap gap-1">
          {product.tradeTerms.map(term => (
            <span key={term} className="px-2 py-1 bg-[#0E3B36] text-[#D8CCBC]/70 text-xs rounded">
              {term}
            </span>
          ))}
        </div>

        {/* Supplier */}
        <div className="pt-3 border-t border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2">
            <span className="text-lg">{product.supplier.countryCode}</span>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="text-[#F4F1EA] text-sm font-medium">{product.supplier.name}</span>
                {product.supplier.verified && (
                  <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#D8CCBC]/50">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {product.supplier.rating}
                </span>
                <span>•</span>
                <span>{product.supplier.responseTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3">
          <button className="flex-1 py-2.5 bg-[#C49A6C] text-[#081512] font-semibold rounded-lg hover:bg-[#D4AA82] transition-colors">
            Contact
          </button>
          <button className="px-4 py-2.5 border border-[rgba(255,255,255,0.1)] text-[#D8CCBC] rounded-lg hover:border-[#C49A6C] hover:text-[#C49A6C] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
