'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { id: '1', name: 'Industrial Sensors X200', category: 'Electronics', price: 299.99, stock: 150, status: 'active' },
    { id: '2', name: 'Premium Steel Bearings', category: 'Hardware', price: 89.50, stock: 500, status: 'active' },
    { id: '3', name: 'LED Display Module', category: 'Electronics', price: 45.00, stock: 200, status: 'low_stock' },
    { id: '4', name: 'Hydraulic Pump HP-500', category: 'Machinery', price: 1250.00, stock: 25, status: 'active' },
    { id: '5', name: 'Copper Wire Spools', category: 'Raw Materials', price: 320.00, stock: 0, status: 'out_of_stock' },
    { id: '6', name: 'Safety Gloves (Box)', category: 'Safety', price: 24.99, stock: 1000, status: 'active' },
  ];

  const categories = ['all', 'Electronics', 'Hardware', 'Machinery', 'Raw Materials', 'Safety'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 pl-10 border border-slate-700 focus:outline-none focus:border-blue-500"
          />
          <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-700 focus:outline-none focus:border-blue-500"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.status === 'active' ? 'bg-emerald-600/20 text-emerald-400' :
                product.status === 'low_stock' ? 'bg-amber-600/20 text-amber-400' :
                'bg-red-600/20 text-red-400'
              }`}>
                {product.status.replace('_', ' ')}
              </span>
            </div>
            <h3 className="text-white font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-3">{product.category}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
              <span className="text-gray-400 text-sm">{product.stock} in stock</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
