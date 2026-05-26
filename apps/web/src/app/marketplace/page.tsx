'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api-client';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  images?: string[];
  seller?: { name: string };
}

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ['marketplace-products'],
    queryFn: async () => {
      const response = await productsApi.list();
      return response.data.data || [];
    },
    retry: false,
  });

  const products = data || [];

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))] as string[];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-white text-xl font-semibold">Leverage</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/login" className="text-gray-300 hover:text-white">Sign In</Link>
              <Link href="/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Global Trade Marketplace
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Connect with verified suppliers and buyers worldwide. Source products, get quotes, and manage orders in one platform.
        </p>
        <div className="flex gap-4 justify-center max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-white mb-6">Featured Products</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-slate-800 rounded-xl p-4 animate-pulse">
                <div className="h-48 bg-slate-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-slate-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No products found. Be the first to list!</p>
            <Link href="/signup" className="text-blue-400 hover:text-blue-300 mt-4 inline-block">
              Create an account to sell
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="bg-slate-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
              >
                <div className="h-48 bg-slate-700 flex items-center justify-center">
                  <span className="text-6xl">📦</span>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1">{product.name}</h3>
                  {product.category && (
                    <p className="text-sm text-gray-400 mb-2">{product.category}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">${product.price?.toFixed(2)}</span>
                    {product.seller && (
                      <span className="text-sm text-gray-500">{product.seller.name}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No products match your search.</p>
            <Link href="/products/new" className="text-blue-400 hover:text-blue-300">
              List your first product
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
