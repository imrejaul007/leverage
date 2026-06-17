'use client';

import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const categories = ['Food & Agriculture', 'Textiles & Apparel', 'Electronics', 'Machinery', 'Chemicals', 'Metals & Minerals'];

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    currency: 'USD',
    moq: '',
    description: '',
  });

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Add New Product" subtitle="List your product for buyers" backHref="/products" />

      <div className="px-4 -mt-6 space-y-4">
        {/* Image Upload */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#101111] font-semibold mb-3">Product Images</p>
          <div className="border-2 border-dashed border-[#154230]/30 rounded-xl p-8 text-center hover:bg-[#154230]/5 transition-colors cursor-pointer">
            <ImageIcon className="w-12 h-12 text-[#154230] mx-auto mb-2" />
            <p className="text-[#4A4A4A]">Click to upload or drag and drop</p>
            <p className="text-[#4A4A4A] text-sm">PNG, JPG up to 10MB</p>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#101111] font-semibold mb-4">Basic Information</p>
          <div className="space-y-4">
            <div>
              <label className="text-[#4A4A4A] text-sm mb-1 block">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:outline-none focus:border-[#154230]"
              />
            </div>
            <div>
              <label className="text-[#4A4A4A] text-sm mb-1 block">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:outline-none focus:border-[#154230]"
              >
                <option value="">Select category</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[#4A4A4A] text-sm mb-1 block">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:outline-none focus:border-[#154230]"
                />
              </div>
              <div>
                <label className="text-[#4A4A4A] text-sm mb-1 block">MOQ</label>
                <input
                  type="text"
                  value={formData.moq}
                  onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                  placeholder="e.g., 100 MT"
                  className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:outline-none focus:border-[#154230]"
                />
              </div>
            </div>
            <div>
              <label className="text-[#4A4A4A] text-sm mb-1 block">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product..."
                rows={4}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:outline-none focus:border-[#154230] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button className="w-full py-4 bg-[#154230] text-white rounded-xl font-semibold">
          Publish Product
        </button>
      </div>

      <BottomNav activeItem="products" />
    </div>
  );
}
