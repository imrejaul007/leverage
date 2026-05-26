'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api-client';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  stock?: number;
  status?: 'active' | 'inactive' | 'draft';
  images?: string[];
  sku?: string;
  createdAt?: string;
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productsApi.list();
      return response.data.data || [];
    },
    retry: false,
  });

  const products = data || [];
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))] as string[];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400">Active</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">Draft</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400">Inactive</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400">Unknown</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <Link
          href="/products/new"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
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
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      {/* Error State */}
      {isError && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
          <p className="text-red-400">Failed to load products. Please try again.</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-slate-800 rounded-xl p-6 border border-slate-700 animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-slate-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No products found</p>
          <Link href="/products/new" className="text-blue-400 hover:text-blue-300">
            Add your first product
          </Link>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  {getStatusBadge(product.status)}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                {product.category && (
                  <p className="text-sm text-gray-400 mb-3">{product.category}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.stock !== undefined && (
                    <span className={`text-sm ${product.stock < 10 ? 'text-red-400' : 'text-gray-400'}`}>
                      {product.stock} in stock
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
