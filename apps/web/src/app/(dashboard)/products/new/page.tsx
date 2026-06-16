'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Upload } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import PageHeader from '@/components/PageHeader';

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
    hsCode: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating product:', formData);
  };

  const categories = ['Electronics', 'Hardware', 'Machinery', 'Raw Materials', 'Safety', 'Components'];

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Add New Product"
        subtitle="Add products to your catalog"
        backHref="/products"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Form Card */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
            {/* Top accent border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
            {/* Trade elements background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute -top-4 -right-4 w-20 h-20 border border-[#154230] rounded-full" />
            </div>

            <div className="relative z-10 space-y-4">
              <h2 className="text-[#101111] font-bold text-lg">Basic Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#4A4A4A] text-sm mb-2">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#4A4A4A] text-sm mb-2">SKU *</label>
                    <input
                      type="text"
                      required
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                      placeholder="e.g., PROD-001"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4A4A] text-sm mb-2">Category *</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    >
                      <option value="">Select</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#4A4A4A] text-sm mb-2">Price (USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-[#4A4A4A] text-sm mb-2">Initial Stock *</label>
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#4A4A4A] text-sm mb-2">HS Code</label>
                  <input
                    type="text"
                    value={formData.hsCode}
                    onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
                    className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                    placeholder="e.g., 8542.31.00"
                  />
                </div>

                <div>
                  <label className="block text-[#4A4A4A] text-sm mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50 resize-none"
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
            {/* Top accent border */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

            <div className="relative z-10">
              <h2 className="text-[#101111] font-bold text-lg mb-4">Product Images</h2>
              <div className="border-2 border-dashed border-black/10 rounded-xl p-8 text-center">
                <Upload className="w-10 h-10 text-[#4A4A4A] mx-auto mb-3" />
                <p className="text-[#4A4A4A] mb-1">Drag and drop images or click to upload</p>
                <p className="text-[#4A4A4A]/50 text-sm">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <a
              href="/products"
              className="px-5 py-3 bg-[#E6E2DA] text-[#101111] rounded-xl font-medium hover:bg-[#154230]/10 transition-colors"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="px-6 py-3 bg-[#154230] text-white rounded-xl font-semibold hover:bg-[#1a5a3a] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Product
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeItem="products" />
    </div>
  );
}
