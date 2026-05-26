'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  sku: string;
  minOrder: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!params.id) return;
    const products = JSON.parse(localStorage.getItem('leverage_products') || '[]') as Product[];
    const found = products.find(p => p.id === params.id);
    if (found) setProduct(found);
  }, [params.id]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C49A6C] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/products" className="text-[#D8CCBC] hover:text-[#F4F1EA] flex items-center gap-2 text-sm">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <div className="aspect-square bg-[#0E3B36]/50 rounded-xl flex items-center justify-center">
            <span className="text-9xl opacity-30">📦</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#C49A6C] font-mono text-sm">SKU: {product.sku}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
                {product.status}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#F4F1EA]">{product.name}</h1>
            <p className="text-[#D8CCBC]/60 mt-2">{product.category}</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-xl border border-[#C49A6C]/20">
            <p className="text-[#D8CCBC]/60 text-sm">Price per unit</p>
            <p className="text-4xl font-bold text-[#C49A6C]">${product.price.toFixed(2)} {product.currency}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Quantity</label>
              <input type="number" min="1" className="input w-32" defaultValue="1" />
              <p className="text-[#D8CCBC]/50 text-sm mt-1">{product.stock} available</p>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold">Add to Cart</button>
              <button className="py-3 px-6 bg-[#0E3B36] text-[#F4F1EA] rounded-xl font-medium border border-[rgba(255,255,255,0.1)]">Contact Supplier</button>
            </div>
          </div>

          <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-xl space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#D8CCBC]/60">Minimum Order</span>
              <span className="text-[#F4F1EA]">{product.minOrder}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#D8CCBC]/60">Stock</span>
              <span className="text-[#F4F1EA]">{product.stock} units</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Description</h2>
        <p className="text-[#D8CCBC] leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}
