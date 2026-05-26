'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Supplier {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  verified: boolean;
  rating: number;
  responseTime: string;
  established: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  moq: string;
  image: string;
  category: string;
  supplier: Supplier;
  tradeTerms: string[];
  featured?: boolean;
  specifications: Record<string, string>;
  packaging: string;
  paymentTerms: string[];
  supplyCapacity: string;
  certifications: string[];
}

const supplier: Supplier = {
  id: '1',
  name: 'Global Trade Exports',
  country: 'India',
  countryCode: '🇮🇳',
  verified: true,
  rating: 4.8,
  responseTime: '< 2h',
  established: '2015',
};

const products: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Premium Basmati Rice 1121',
    description: 'Extra long grain, aromatic basmati rice. Aged 2 years for perfect cooking. Preferred by restaurants and hotels worldwide. Sourced directly from farms in Haryana, India. Non-sticky texture and fluffy appearance when cooked.',
    price: 850,
    currency: 'USD',
    moq: '50 MT',
    image: '🍚',
    category: 'Food & Agriculture',
    supplier: supplier,
    tradeTerms: ['FOB', 'CIF', 'EXW'],
    featured: true,
    specifications: {
      'Grain Length': '8.35mm+',
      'Moisture': '12% max',
      'Broken': '1% max',
      'Origin': 'Haryana, India',
      'Crop Year': '2023',
      'Purity': '99.5% min',
    },
    packaging: '25kg/50kg PP Bags',
    paymentTerms: ['LC at Sight', 'TT 30% Advance'],
    supplyCapacity: '500 MT/month',
    certifications: ['FSSAI', 'ISO 22000', 'HACCP'],
  },
  '2': {
    id: '2',
    name: 'Cotton Yarn 40/1 Combed',
    description: 'Premium quality 100% organic cotton yarn. OEKO-TEX certified for sustainable textiles.',
    price: 3.20,
    currency: 'USD',
    moq: '10 MT',
    image: '🧶',
    category: 'Textiles',
    supplier: supplier,
    tradeTerms: ['FOB', 'CIF'],
    specifications: {
      'Count': 'Ne 40/1',
      'Type': 'Combed',
      'Material': '100% Organic Cotton',
      'Strength': '280 cN min',
    },
    packaging: 'Cone 1.5kg',
    paymentTerms: ['LC at Sight', 'TT 30% Advance'],
    supplyCapacity: '100 MT/month',
    certifications: ['OEKO-TEX', 'GOTS'],
  },
  '3': {
    id: '3',
    name: 'Solar Panels 550W Mono PERC',
    description: 'Tier 1 monocrystalline solar panels with PERC technology.',
    price: 165,
    currency: 'USD',
    moq: '100 units',
    image: '☀️',
    category: 'Energy',
    supplier: { ...supplier, id: '2', name: 'Shanghai Import Co.', country: 'China', countryCode: '🇨🇳', rating: 4.6, responseTime: '< 4h' },
    tradeTerms: ['FOB', 'CIF', 'DDP'],
    featured: true,
    specifications: {
      'Power': '550W',
      'Efficiency': '21.5%',
      'Cell Type': 'Monocrystalline PERC',
      'Warranty': '25 years linear',
    },
    packaging: '31 pcs/pallet',
    paymentTerms: ['LC at Sight', 'T/T 30%'],
    supplyCapacity: '5MW/month',
    certifications: ['IEC 61215', 'CE', 'TUV'],
  },
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'quote' | 'bid'>('quote');
  const [quantity, setQuantity] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTradeTerm, setSelectedTradeTerm] = useState('FOB');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const product = products[params.id] || products['1'];

  const handleQuoteRequest = async () => {
    if (!quantity || !message) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setQuantity('');
      setMessage('');
    }, 3000);
  };

  const handleBid = async () => {
    if (!quantity || !bidAmount || !message) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setQuantity('');
      setBidAmount('');
      setMessage('');
    }, 3000);
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-24 sm:pb-6">
      {/* Back Button */}
      <Link href="/marketplace" className="inline-flex items-center gap-2 text-[#D8CCBC] hover:text-[#F4F1EA] text-sm">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {activeTab === 'quote' ? 'Quote request sent!' : 'Bid submitted successfully!'}
        </div>
      )}

      {/* Product Image */}
      <div className="bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-2xl p-8 sm:p-12 flex items-center justify-center relative">
        <span className="text-8xl sm:text-9xl">{product.image}</span>
        {product.featured && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-[#C49A6C] text-[#081512] text-xs font-semibold rounded-lg">
            Featured
          </span>
        )}
      </div>

      {/* Product Info */}
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="px-2 py-1 bg-[#0E3B36] text-[#D8CCBC] text-xs rounded">{product.category}</span>
          {product.tradeTerms.slice(0, 2).map(term => (
            <span key={term} className="px-2 py-1 bg-[#0E3B36] text-[#D8CCBC]/70 text-xs rounded">{term}</span>
          ))}
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#F4F1EA] mb-2">{product.name}</h1>
        <p className="text-[#D8CCBC]/70 text-sm">{product.description}</p>
      </div>

      {/* Price Card */}
      <div className="bg-gradient-to-br from-[#0E3B36]/50 to-transparent rounded-2xl p-4 sm:p-6">
        <div className="flex items-end gap-4 mb-4">
          <div>
            <p className="text-[#D8CCBC]/60 text-sm">Reference Price</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#C49A6C]">${product.price}</p>
            <p className="text-[#D8CCBC]/50 text-sm">per MT</p>
          </div>
          <div className="flex-1">
            <p className="text-[#D8CCBC]/60 text-sm">MOQ</p>
            <p className="text-lg font-semibold text-[#F4F1EA]">{product.moq}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setActiveTab('quote')}
            className={`py-3 rounded-xl font-semibold text-sm transition-colors ${
              activeTab === 'quote'
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#F4F1EA]'
            }`}
          >
            Get Quote
          </button>
          <button
            onClick={() => setActiveTab('bid')}
            className={`py-3 rounded-xl font-semibold text-sm transition-colors ${
              activeTab === 'bid'
                ? 'bg-emerald-500 text-white'
                : 'bg-[#0E3B36] text-[#F4F1EA]'
            }`}
          >
            Place Bid
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-[#C49A6C]">{product.supplyCapacity}</p>
          <p className="text-[#D8CCBC]/50 text-xs">Supply</p>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-[#C49A6C]">{product.supplier.responseTime}</p>
          <p className="text-[#D8CCBC]/50 text-xs">Response</p>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-[#C49A6C]">{product.supplier.rating}</p>
          <p className="text-[#D8CCBC]/50 text-xs">Rating</p>
        </div>
      </div>

      {/* Supplier Card */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-xl">
            {product.supplier.countryCode}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[#F4F1EA]">{product.supplier.name}</h3>
              {product.supplier.verified && (
                <svg className="w-4 h-4 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-[#D8CCBC]/50 text-sm">Est. {product.supplier.established}</p>
          </div>
        </div>
      </div>

      {/* Quote/Bid Form */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 sm:p-6">
        {activeTab === 'quote' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Quantity *</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="MT"
                  className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]"
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Trade Terms</label>
                <select
                  value={selectedTradeTerm}
                  onChange={(e) => setSelectedTradeTerm(e.target.value)}
                  className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]"
                >
                  {product.tradeTerms.map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your requirements..."
                rows={3}
                className="w-full p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C] resize-none"
              />
            </div>
            <button
              onClick={handleQuoteRequest}
              disabled={isSubmitting}
              className="w-full py-4 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl hover:bg-[#D4AA82] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-[#081512]/30 border-t-[#081512] rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                '📤 Send Quote Request'
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Quantity *</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="MT"
                  className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]"
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Your Bid Price *</label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="per MT"
                  className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]"
                />
              </div>
            </div>
            <div className="bg-[#0E3B36]/30 rounded-xl p-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#D8CCBC]/60">Market Price:</span>
                <span className="text-[#F4F1EA]">${product.price}/MT</span>
              </div>
              {bidAmount && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#D8CCBC]/60">Your Bid:</span>
                  <span className={parseFloat(bidAmount) < product.price ? 'text-emerald-400' : 'text-[#F4F1EA]'}>
                    ${bidAmount}/MT
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add notes for supplier..."
                rows={3}
                className="w-full p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C] resize-none"
              />
            </div>
            <button
              onClick={handleBid}
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                '🎯 Submit Bid'
              )}
            </button>
          </div>
        )}
      </div>

      {/* Specifications */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Specifications</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="bg-[#0E3B36]/30 rounded-lg p-3">
              <p className="text-[#D8CCBC]/60 text-xs">{key}</p>
              <p className="text-[#F4F1EA] font-medium text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Certifications</h2>
        <div className="flex flex-wrap gap-2">
          {product.certifications.map(cert => (
            <span key={cert} className="px-3 py-1.5 bg-[#0E3B36] text-[#C49A6C] rounded-lg text-sm font-medium">
              ✓ {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Payment & Packaging */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#F4F1EA] mb-2">Payment Terms</h3>
          <div className="space-y-1">
            {product.paymentTerms.map(term => (
              <p key={term} className="text-[#D8CCBC]/70 text-xs">• {term}</p>
            ))}
          </div>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-4">
          <h3 className="text-sm font-semibold text-[#F4F1EA] mb-2">Packaging</h3>
          <p className="text-[#D8CCBC]/70 text-xs">{product.packaging}</p>
        </div>
      </div>
    </div>
  );
}
