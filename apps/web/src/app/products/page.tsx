'use client';

import { useState } from 'react';
import { Plus, Search, Package, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const products = [
  { id: '1', name: 'Premium Basmati Rice 1121', category: 'Food & Agriculture', price: '$850/MT', moq: '50 MT', status: 'active', views: 1245 },
  { id: '2', name: 'Organic Cotton Yarn 40s', category: 'Textiles', price: '$4.20/KG', moq: '1000 KG', status: 'active', views: 892 },
  { id: '3', name: 'Industrial Steel Coils', category: 'Metals', price: '$750/MT', moq: '200 MT', status: 'draft', views: 0 },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="My Products" subtitle="Manage your product catalog" backHref="/dashboard" />

      <div className="px-4 -mt-6 space-y-4">
        {/* Search & Add */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full h-12 pl-12 pr-4 bg-white rounded-xl border border-black/5 focus:outline-none focus:border-[#154230]"
            />
          </div>
          <Link href="/products/new" className="h-12 px-6 bg-[#154230] text-white rounded-xl font-semibold flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add
          </Link>
        </div>

        {/* Products List */}
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-[#E6E2DA] rounded-xl flex items-center justify-center">
                <Package className="w-8 h-8 text-[#154230]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#101111]">{product.name}</h3>
                <p className="text-[#4A4A4A] text-sm">{product.category}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="font-bold text-[#154230]">{product.price}</span>
                  <span className="text-[#4A4A4A] text-sm">MOQ: {product.moq}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#E6E2DA] rounded-lg"><Eye className="w-5 h-5 text-[#4A4A4A]" /></button>
                <button className="p-2 hover:bg-[#E6E2DA] rounded-lg"><Edit className="w-5 h-5 text-[#4A4A4A]" /></button>
                <button className="p-2 hover:bg-[#E6E2DA] rounded-lg"><Trash2 className="w-5 h-5 text-[#DC2626]" /></button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {product.status}
              </span>
              <span className="text-[#4A4A4A] text-sm">{product.views} views</span>
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeItem="products" />
    </div>
  );
}
