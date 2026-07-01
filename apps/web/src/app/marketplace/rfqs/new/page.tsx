'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import {
  Search,
  Phone,
  Plus,
  ShoppingCart,
  ArrowLeft,
  Upload,
  X,
  CheckCircle,
} from 'lucide-react';

const categories = ['Food & Agriculture', 'Textiles', 'Metals & Minerals', 'Energy', 'Chemicals', 'Machinery'];

export default function NewRFQPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    quantity: '',
    unit: 'MT',
    budget: '',
    location: '',
    deadline: '',
    description: '',
    attachments: [] as string[],
  });

  const handleSubmit = () => {
    if (!formData.title || !formData.category || !formData.quantity) {
      toast.error('Please fill all required fields');
      return;
    }
    toast.success('RFQ posted successfully!');
    setTimeout(() => window.location.href = '/marketplace/rfqs', 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <Toaster position="top-right" />

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <Link href="/marketplace/rfqs" className="p-2 -ml-2 mr-2"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
          <span className="font-medium text-gray-900 flex-1">Post RFQ</span>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden md:block bg-gradient-to-br from-[#154230] via-[#1a5a3a] to-[#0d3d28]">
        <div className="bg-[#0d2e20]">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between text-sm text-white/80">
            <span>LEVERAGE Marketplace</span>
            <div className="flex items-center gap-4"><span>24x7 Support</span><Link href="/contact" className="flex items-center gap-1"><Phone className="w-4 h-4" />+1-xxx-xxx-xxxx</Link></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/"><Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" /></Link>
            <div className="flex-1 max-w-xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search products..." className="w-full h-11 pl-12 pr-4 bg-white rounded-xl text-gray-900" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#154230]">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/marketplace/rfqs" className="text-gray-500 hover:text-[#154230]">RFQs</Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#154230]">Post New RFQ</span>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-[#154230] text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
              {s < 3 && <div className={`w-12 h-1 mx-2 ${step > s ? 'bg-[#154230]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., Basmati Rice 1121 Steam" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]">
                  <option value="">Select category</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input type="text" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} placeholder="e.g., 500" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]">
                    <option>MT</option><option>KG</option><option>units</option><option>pieces</option>
                  </select>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full py-3 bg-[#154230] hover:bg-[#1a5a3a] text-white font-bold rounded-lg">Continue</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Requirements</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (USD)</label>
                <input type="text" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} placeholder="e.g., 50,000" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Location</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g., Dubai, UAE" className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required By</label>
                <input type="date" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Specifications</label>
                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe your requirements in detail..." rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#154230] resize-none" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 py-3 bg-[#154230] hover:bg-[#1a5a3a] text-white font-bold rounded-lg">Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Review & Post</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between"><span className="text-gray-500">Product:</span><span className="font-medium">{formData.title || '-'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Category:</span><span className="font-medium">{formData.category || '-'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Quantity:</span><span className="font-medium">{formData.quantity} {formData.unit}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Budget:</span><span className="font-medium">{formData.budget ? `$${formData.budget}` : '-'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Location:</span><span className="font-medium">{formData.location || '-'}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg">Back</button>
                <button onClick={handleSubmit} className="flex-1 py-3 bg-[#5D1E21] hover:bg-[#7a2629] text-white font-bold rounded-lg">Post RFQ</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-40">
        <button onClick={handleSubmit} className="w-full py-3 bg-[#5D1E21] text-white font-bold rounded-lg">Post RFQ</button>
      </div>

      {/* Footer */}
      <footer className="hidden md:block bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} LEVERAGE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
