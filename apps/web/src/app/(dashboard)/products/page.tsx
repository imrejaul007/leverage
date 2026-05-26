'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  stock?: number;
  status: 'active' | 'inactive' | 'draft';
  sku?: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Premium Basmati Rice - 1121', category: 'Food & Agriculture', price: 850, stock: 500, status: 'active', sku: 'RICE-1121' },
  { id: '2', name: 'Cotton Yarn 40/1 Combed', category: 'Textiles', price: 3.20, stock: 50, status: 'active', sku: 'COT-401' },
  { id: '3', name: 'Solar Panels - 550W Mono', category: 'Electronics', price: 165, stock: 1000, status: 'active', sku: 'SOL-550M' },
  { id: '4', name: 'Steel Billets - Grade A', category: 'Metals & Minerals', price: 620, stock: 2000, status: 'active', sku: 'STL-GA' },
  { id: '5', name: 'Pharmaceutical Raw Materials', category: 'Healthcare', price: 45, stock: 5000, status: 'active', sku: 'PHA-RAW' },
  { id: '6', name: 'Bicycle Components Set', category: 'Automotive', price: 28, stock: 250, status: 'active', sku: 'BIC-SET' },
  { id: '7', name: 'LED Display Panels - 55 inch', category: 'Electronics', price: 450, stock: 150, status: 'active', sku: 'LED-55' },
  { id: '8', name: 'Organic Coffee Beans', category: 'Food & Agriculture', price: 12.50, stock: 100, status: 'active', sku: 'COF-ARA' },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA]">Products</h1>
          <p className="text-[#D8CCBC]/60 text-sm">{filteredProducts.length} products</p>
        </div>
        <Link href="/products/new" className="w-full sm:w-auto px-4 py-2.5 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold text-center text-sm">
          + Add Product
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm"
          />
          <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#D8CCBC] text-sm focus:outline-none focus:border-[#C49A6C]"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="aspect-square bg-[#0E3B36]/50 rounded-xl mb-4"></div>
              <div className="h-4 bg-[#0E3B36]/50 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-[#0E3B36]/50 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      )}

      {/* Products Grid - Mobile: 2 columns */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="card p-3 sm:p-4 hover:border-[#C49A6C]/30 transition-all"
            >
              <div className="aspect-square bg-[#0E3B36]/50 rounded-xl mb-3 flex items-center justify-center">
                <span className="text-4xl sm:text-5xl opacity-50">📦</span>
              </div>
              <h3 className="text-[#F4F1EA] font-medium text-sm sm:text-base line-clamp-2 mb-1">{product.name}</h3>
              <p className="text-[#D8CCBC]/50 text-xs mb-2 truncate">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl font-bold text-[#C49A6C]">
                  ${product.price.toFixed(2)}
                </span>
                {product.stock !== undefined && (
                  <span className={`text-xs ${product.stock < 10 ? 'text-red-400' : 'text-[#D8CCBC]/50'}`}>
                    {product.stock} in stock
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📦</span>
          </div>
          <p className="text-[#D8CCBC]/50 text-sm mb-4">No products found</p>
          <Link href="/products/new" className="text-[#C49A6C] hover:text-[#D4AA82] font-medium text-sm">
            Add your first product
          </Link>
        </div>
      )}
    </div>
  );
}
