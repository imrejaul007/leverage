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
  images?: string[];
  sku?: string;
}

// Mock data for demo
const mockProducts: Product[] = [
  { id: '1', name: 'Premium Basmati Rice - 1121', category: 'Food & Agriculture', price: 850, stock: 500, status: 'active', sku: 'RICE-1121' },
  { id: '2', name: 'Cotton Yarn 40/1 Combed', category: 'Textiles', price: 3.20, stock: 50, status: 'active', sku: 'COT-401' },
  { id: '3', name: 'Solar Panels - 550W Mono PERC', category: 'Electronics', price: 165, stock: 1000, status: 'active', sku: 'SOL-550M' },
  { id: '4', name: 'Steel Billets - Grade A', category: 'Metals & Minerals', price: 620, stock: 2000, status: 'active', sku: 'STL-GA' },
  { id: '5', name: 'Pharmaceutical Raw Materials', category: 'Healthcare', price: 45, stock: 5000, status: 'active', sku: 'PHA-RAW' },
  { id: '6', name: 'Bicycle Components Set', category: 'Automotive', price: 28, stock: 250, status: 'active', sku: 'BIC-SET' },
  { id: '7', name: 'LED Display Panels - 55 inch', category: 'Electronics', price: 450, stock: 150, status: 'active', sku: 'LED-55' },
  { id: '8', name: 'Organic Coffee Beans - Arabica', category: 'Food & Agriculture', price: 12.50, stock: 100, status: 'active', sku: 'COF-ARA' },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const products = mockProducts;
  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#F4F1EA] mb-2">Products</h1>
          <p className="text-[#D8CCBC]/60">Manage your product catalog</p>
        </div>
        <Link href="/products/new" className="px-6 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
          + Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-10"
          />
          <svg className="w-5 h-5 text-[#D8CCBC]/50 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input w-auto"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="aspect-square bg-[#0E3B36]/50 rounded-xl mb-4"></div>
              <div className="h-5 bg-[#0E3B36]/50 rounded w-3/4 mb-3"></div>
              <div className="h-8 bg-[#0E3B36]/50 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📦</span>
          </div>
          <p className="text-[#D8CCBC]/50 text-lg mb-4">No products found</p>
          <Link href="/products/new" className="text-[#C49A6C] hover:text-[#D4AA82] font-medium">
            Add your first product
          </Link>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="card hover:border-[#C49A6C]/30 transition-all group"
            >
              <div className="aspect-square bg-[#0E3B36]/50 rounded-xl mb-4 flex items-center justify-center group-hover:bg-[#0E3B36] transition-colors">
                <span className="text-6xl opacity-50 group-hover:opacity-100 transition-opacity">📦</span>
              </div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[#F4F1EA] font-semibold line-clamp-2">{product.name}</h3>
              </div>
              <p className="text-[#D8CCBC]/50 text-sm mb-3">{product.category}</p>
              <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <span className="text-2xl font-bold text-[#C49A6C]">
                  ${product.price.toFixed(2)}
                </span>
                {product.stock !== undefined && (
                  <span className={`text-sm ${product.stock < 10 ? 'text-red-400' : 'text-[#D8CCBC]/50'}`}>
                    {product.stock} in stock
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
