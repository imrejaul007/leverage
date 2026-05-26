'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/Toast';

interface Supplier {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  verified: boolean;
  rating: number;
  responseTime: string;
  established: string;
  employees: string;
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
  employees: '50-100',
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
    packaging: '25kg/50kg PP Bags or Custom',
    paymentTerms: ['LC at Sight', 'TT 30% Advance', 'D/P'],
    supplyCapacity: '500 MT/month',
    certifications: ['FSSAI', 'ISO 22000', 'HACCP', 'APEDA Certified'],
  },
  '2': {
    id: '2',
    name: 'Cotton Yarn 40/1 Combed',
    description: 'Premium quality 100% organic cotton yarn. OEKO-TEX certified for sustainable textiles. Perfect for weaving and knitting applications. Consistent quality with minimal slubs.',
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
      'Twist': 'S/Z',
      'Evenness': 'CV% 12 max',
      'Strength': '280 cN min',
    },
    packaging: 'Cone 1.5kg or Tube 2.5kg',
    paymentTerms: ['LC at Sight', 'TT 30% Advance'],
    supplyCapacity: '100 MT/month',
    certifications: ['OEKO-TEX', 'GOTS', 'ISO 9001'],
  },
  '3': {
    id: '3',
    name: 'Solar Panels 550W Mono PERC',
    description: 'Tier 1 monocrystalline solar panels with PERC technology. Industry-leading 21.5% efficiency. 25-year linear power warranty. Perfect for commercial and industrial solar installations.',
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
      'Dimensions': '2274×1134×35mm',
      'Weight': '28.9 kg',
      'Warranty': '25 years linear',
    },
    packaging: '31 pcs/pallet, 124 pcs/20FT',
    paymentTerms: ['LC at Sight', 'T/T 30% Deposit'],
    supplyCapacity: '5MW/month',
    certifications: ['IEC 61215', 'IEC 61730', 'CE', 'TUV'],
  },
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'quote' | 'bid'>('quote');
  const [quantity, setQuantity] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTradeTerm, setSelectedTradeTerm] = useState('FOB');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = products[params.id] || products['1'];

  const handleQuoteRequest = async () => {
    if (!quantity || !message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    showToast('Quote request sent successfully!', 'success');
    setIsSubmitting(false);
    setQuantity('');
    setMessage('');
  };

  const handleBid = async () => {
    if (!quantity || !bidAmount || !message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    showToast('Bid submitted successfully!', 'success');
    setIsSubmitting(false);
    setQuantity('');
    setBidAmount('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/marketplace" className="inline-flex items-center gap-2 text-[#D8CCBC] hover:text-[#F4F1EA] transition-colors">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Marketplace
      </Link>

      {/* Product Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="card">
          <div className="aspect-square bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-2xl flex items-center justify-center relative">
            <span className="text-9xl">{product.image}</span>
            {product.featured && (
              <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#C49A6C] text-[#081512] text-sm font-semibold rounded-lg">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-[#0E3B36] text-[#D8CCBC] text-xs rounded">{product.category}</span>
              {product.tradeTerms.map(term => (
                <span key={term} className="px-2 py-1 bg-[#0E3B36] text-[#D8CCBC]/70 text-xs rounded">{term}</span>
              ))}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#F4F1EA] mb-2">{product.name}</h1>
            <p className="text-[#D8CCBC]/70">{product.description}</p>
          </div>

          {/* Price & MOQ */}
          <div className="card bg-gradient-to-br from-[#0E3B36]/50 to-transparent">
            <div className="flex items-end gap-4 mb-4">
              <div>
                <p className="text-[#D8CCBC]/60 text-sm">Reference Price</p>
                <p className="text-3xl font-bold text-[#C49A6C]">${product.price}</p>
                <p className="text-[#D8CCBC]/50 text-sm">per MT</p>
              </div>
              <div className="flex-1">
                <p className="text-[#D8CCBC]/60 text-sm">MOQ</p>
                <p className="text-xl font-semibold text-[#F4F1EA]">{product.moq}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 py-3 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl hover:bg-[#D4AA82] transition-colors"
              >
                Get Quote
              </button>
              <button
                onClick={() => document.getElementById('bid-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 py-3 bg-[#0E3B36] text-[#F4F1EA] font-semibold rounded-xl hover:bg-[#0f4a42] transition-colors border border-[#C49A6C]/30"
              >
                Place Bid
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-3">
            <div className="card text-center py-4">
              <p className="text-2xl font-bold text-[#C49A6C]">{product.supplyCapacity}</p>
              <p className="text-[#D8CCBC]/60 text-xs mt-1">Supply Capacity</p>
            </div>
            <div className="card text-center py-4">
              <p className="text-2xl font-bold text-[#C49A6C]">{product.supplier.responseTime}</p>
              <p className="text-[#D8CCBC]/60 text-xs mt-1">Response Time</p>
            </div>
            <div className="card text-center py-4">
              <p className="text-2xl font-bold text-[#C49A6C]">{product.packaging.split(',')[0]}</p>
              <p className="text-[#D8CCBC]/60 text-xs mt-1">Packaging</p>
            </div>
          </div>

          {/* Supplier Card */}
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-2xl">
                {product.supplier.countryCode}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-[#F4F1EA]">{product.supplier.name}</h3>
                  {product.supplier.verified && (
                    <svg className="w-5 h-5 text-[#C49A6C]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="flex items-center gap-1 text-[#C49A6C]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {product.supplier.rating}
                  </span>
                  <span className="text-[#D8CCBC]/50">•</span>
                  <span className="text-[#D8CCBC]/70">{product.supplier.established} Established</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="card" id="contact-section">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('quote')}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'quote'
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#D8CCBC] hover:bg-[#0f4a42]'
            }`}
          >
            📋 Request Quotation
          </button>
          <button
            onClick={() => setActiveTab('bid')}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'bid'
                ? 'bg-[#C49A6C] text-[#081512]'
                : 'bg-[#0E3B36] text-[#D8CCBC] hover:bg-[#0f4a42]'
            }`}
          >
            🎯 Place Bid
          </button>
        </div>

        {activeTab === 'quote' ? (
          <div className="space-y-4" id="quote-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Quantity *</label>
                <div className="flex">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    className="input flex-1 rounded-r-none"
                  />
                  <span className="px-4 bg-[#0E3B36] border border-l-0 border-[rgba(255,255,255,0.1)] rounded-r-xl flex items-center text-[#D8CCBC]">
                    MT
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Trade Terms *</label>
                <select
                  value={selectedTradeTerm}
                  onChange={(e) => setSelectedTradeTerm(e.target.value)}
                  className="input"
                >
                  {product.tradeTerms.map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Your Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your requirements, destination port, delivery timeline, etc."
                rows={4}
                className="input resize-none"
              />
            </div>
            <button
              onClick={handleQuoteRequest}
              disabled={isSubmitting}
              className="w-full py-4 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl hover:bg-[#D4AA82] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-[#081512]/30 border-t-[#081512] rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                '📤 Send Quote Request'
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4" id="bid-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Quantity *</label>
                <div className="flex">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity"
                    className="input flex-1 rounded-r-none"
                  />
                  <span className="px-4 bg-[#0E3B36] border border-l-0 border-[rgba(255,255,255,0.1)] rounded-r-xl flex items-center text-[#D8CCBC]">
                    MT
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Your Bid Price *</label>
                <div className="flex">
                  <span className="px-4 bg-[#0E3B36] border border-r-0 border-[rgba(255,255,255,0.1)] rounded-l-xl flex items-center text-[#D8CCBC]">
                    $
                  </span>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid"
                    className="input flex-1 rounded-l-none"
                  />
                  <span className="px-4 bg-[#0E3B36] border border-l-0 border-[rgba(255,255,255,0.1)] rounded-r-xl flex items-center text-[#D8CCBC]">
                    /MT
                  </span>
                </div>
              </div>
            </div>

            {/* Price Comparison */}
            <div className="card bg-gradient-to-br from-[#0E3B36]/50 to-transparent">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#D8CCBC]/60">Current Market Price:</span>
                <span className="text-[#F4F1EA] font-semibold">${product.price}/MT</span>
              </div>
              {bidAmount && (
                <div className="flex items-center justify-between">
                  <span className="text-[#D8CCBC]/60">Your Bid:</span>
                  <span className={parseFloat(bidAmount) < product.price ? 'text-emerald-400 font-semibold' : 'text-[#F4F1EA] font-semibold'}>
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
                placeholder="Add any notes for the supplier..."
                rows={3}
                className="input resize-none"
              />
            </div>
            <button
              onClick={handleBid}
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Bid...
                </span>
              ) : (
                '🎯 Submit Bid'
              )}
            </button>
          </div>
        )}
      </div>

      {/* Specifications */}
      <div className="card">
        <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Product Specifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="bg-[#0E3B36]/30 rounded-xl p-3">
              <p className="text-[#D8CCBC]/60 text-sm">{key}</p>
              <p className="text-[#F4F1EA] font-medium mt-1">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="card">
        <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Certifications & Standards</h2>
        <div className="flex flex-wrap gap-3">
          {product.certifications.map(cert => (
            <span key={cert} className="px-4 py-2 bg-[#0E3B36] text-[#C49A6C] rounded-xl font-medium">
              ✓ {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Payment & Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-3">Payment Terms</h2>
          <div className="space-y-2">
            {product.paymentTerms.map(term => (
              <div key={term} className="flex items-center gap-2 text-[#D8CCBC]">
                <svg className="w-5 h-5 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {term}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-3">Packaging & Delivery</h2>
          <div className="space-y-2 text-[#D8CCBC]">
            <p>📦 {product.packaging}</p>
            <p>🚢 Supply: {product.supplyCapacity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
