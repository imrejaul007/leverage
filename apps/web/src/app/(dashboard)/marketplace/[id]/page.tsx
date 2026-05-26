'use client';

import { useState, useMemo } from 'react';
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
  products: number;
  responseRate: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  moq: string;
  image: string;
  images: string[];
  category: string;
  supplier: Supplier;
  tradeTerms: string[];
  featured?: boolean;
  specifications: Record<string, string>;
  packaging: string;
  paymentTerms: string[];
  supplyCapacity: string;
  certifications: string[];
  reviews: Review[];
  relatedProducts: string[];
  salesCount: number;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  country: string;
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
  products: 45,
  responseRate: '98%',
};

const products: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Premium Basmati Rice 1121',
    description: 'Extra long grain, aromatic basmati rice. Aged 2 years for perfect cooking. Preferred by restaurants and hotels worldwide.',
    price: 850,
    originalPrice: 950,
    currency: 'USD',
    moq: '50 MT',
    image: '🍚',
    images: ['🍚', '🌾', '🍲'],
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
    paymentTerms: ['LC at Sight', 'TT 30% Advance', 'D/P'],
    supplyCapacity: '500 MT/month',
    certifications: ['FSSAI', 'ISO 22000', 'HACCP'],
    salesCount: 1248,
    relatedProducts: ['5', '8', '10'],
    reviews: [
      { id: '1', author: 'Ahmed K.', rating: 5, date: '2024-01-15', comment: 'Excellent quality rice.', country: '🇦🇪' },
      { id: '2', author: 'Sarah M.', rating: 5, date: '2024-01-10', comment: 'Fast delivery.', country: '🇬🇧' },
    ],
  },
  '2': {
    id: '2',
    name: 'Organic Cotton Yarn 40/1',
    description: 'Premium quality 100% organic cotton yarn.',
    price: 3.20,
    currency: 'USD',
    moq: '10 MT',
    image: '🧶',
    images: ['🧶', '🧵'],
    category: 'Textiles',
    supplier: supplier,
    tradeTerms: ['FOB', 'CIF'],
    specifications: {
      'Count': 'Ne 40/1',
      'Type': 'Combed',
      'Material': '100% Organic',
    },
    packaging: 'Cone 1.5kg',
    paymentTerms: ['LC at Sight', 'TT 30% Advance'],
    supplyCapacity: '100 MT/month',
    certifications: ['OEKO-TEX', 'GOTS'],
    salesCount: 520,
    relatedProducts: ['1', '6'],
    reviews: [],
  },
  '5': {
    id: '5',
    name: 'Olive Oil Extra Virgin',
    description: 'Cold pressed, first harvest olive oil.',
    price: 4.50,
    currency: 'USD',
    moq: '5 MT',
    image: '🫒',
    images: ['🫒'],
    category: 'Food & Agriculture',
    supplier: { ...supplier, id: '3', name: 'Turkey Merchants', country: 'Turkey', countryCode: '🇹🇷', rating: 4.9 },
    tradeTerms: ['FOB', 'CIF', 'EXW'],
    featured: true,
    specifications: {
      'Grade': 'Extra Virgin',
      'Acidity': '0.5% max',
      'Origin': 'Aegean, Turkey',
    },
    packaging: '5L Tin / 1L Bottle',
    paymentTerms: ['LC at Sight', 'TT 30%'],
    supplyCapacity: '200 MT/month',
    certifications: ['USDA Organic', 'EU Organic'],
    salesCount: 3450,
    relatedProducts: ['1', '8'],
    reviews: [],
  },
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'quote' | 'bid' | 'requirement'>('quote');
  const [quantity, setQuantity] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTradeTerm, setSelectedTradeTerm] = useState('FOB');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Requirement form state
  const [requirementForm, setRequirementForm] = useState({
    quantity: '',
    targetPrice: '',
    customSpecs: '',
    deliveryLocation: '',
    deliveryTimeline: '',
    paymentTerms: '',
    additionalRequirements: '',
  });

  const product = products[params.id] || products['1'];
  const relatedProducts = product.relatedProducts?.map(id => products[id]).filter(Boolean) || [];

  const averageRating = useMemo(() => {
    if (!product.reviews.length) return 0;
    return product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
  }, [product.reviews]);

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

  const handleRequirementSubmit = async () => {
    if (!requirementForm.quantity || !requirementForm.deliveryLocation) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setRequirementForm({
        quantity: '',
        targetPrice: '',
        customSpecs: '',
        deliveryLocation: '',
        deliveryTimeline: '',
        paymentTerms: '',
        additionalRequirements: '',
      });
    }, 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Leverage`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const updateRequirement = (field: string, value: string) => {
    setRequirementForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-24 sm:pb-6">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between">
        <Link href="/marketplace" className="inline-flex items-center gap-2 text-[#D8CCBC] hover:text-[#F4F1EA] text-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Marketplace
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={handleShare} className="p-2 text-[#D8CCBC] hover:text-[#F4F1EA]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-2.4-2.6-4-4-4-1.6 0-3 1.6-3 4 0 1.6 1.6 3 4 3 2.482 0 2.938.114 3.342.658M9.144 7.758C9.09 7.348 9 6.897 9 6.5c0-2.4-2.6-4-4-4s-4 1.6-4 4c0 .397.09.848.144 1.258M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button onClick={() => setIsFavorite(!isFavorite)} className={`p-2 ${isFavorite ? 'text-red-400' : 'text-[#D8CCBC]'} hover:text-red-400`}>
            <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {activeTab === 'quote' ? 'Quote request sent!' : activeTab === 'bid' ? 'Bid submitted!' : 'Requirements sent to supplier!'}
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="text-sm text-[#D8CCBC]/60">
        <Link href="/marketplace" className="hover:text-[#C49A6C]">Marketplace</Link>
        <span className="mx-2">/</span>
        <Link href={`/marketplace?category=${product.category}`} className="hover:text-[#C49A6C]">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-[#F4F1EA]">{product.name}</span>
      </nav>

      {/* Product Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="aspect-square bg-gradient-to-br from-[#0E3B36] to-[#081512] rounded-2xl p-8 flex items-center justify-center relative">
            <span className="text-8xl sm:text-9xl">{product.images?.[selectedImage] || product.image}</span>
            {product.featured && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#C49A6C] text-[#081512] text-xs font-semibold rounded-lg">Featured</span>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg bg-[#0E3B36] flex items-center justify-center ${selectedImage === i ? 'ring-2 ring-[#C49A6C]' : ''}`}>
                  <span className="text-2xl">{img}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
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

          {/* Rating & Sales */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(star => (
                <svg key={star} className={`w-4 h-4 ${star <= averageRating ? 'text-[#C49A6C]' : 'text-[#D8CCBC]/30'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-[#F4F1EA] font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-[#D8CCBC]/50">({product.reviews.length} reviews)</span>
            </div>
            <span className="text-[#D8CCBC]/50">|</span>
            <span className="text-[#D8CCBC]/70">{product.salesCount.toLocaleString()} sold</span>
          </div>

          {/* Price Card */}
          <div className="bg-gradient-to-br from-[#0E3B36]/50 to-transparent rounded-2xl p-4 sm:p-6">
            <div className="flex items-end gap-4 mb-4">
              <div>
                <p className="text-[#D8CCBC]/60 text-sm">Reference Price</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#C49A6C]">${product.price}</p>
                <p className="text-[#D8CCBC]/50 text-sm">/{product.currency}</p>
              </div>
              <div className="flex-1">
                <p className="text-[#D8CCBC]/60 text-sm">MOQ</p>
                <p className="text-lg font-semibold text-[#F4F1EA]">{product.moq}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-3 text-center">
              <p className="text-sm font-bold text-[#C49A6C]">{product.supplyCapacity}</p>
              <p className="text-[#D8CCBC]/50 text-xs">Supply</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-3 text-center">
              <p className="text-sm font-bold text-[#C49A6C]">{product.supplier.responseTime}</p>
              <p className="text-[#D8CCBC]/50 text-xs">Response</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-3 text-center">
              <p className="text-sm font-bold text-[#C49A6C]">{product.supplier.responseRate}</p>
              <p className="text-[#D8CCBC]/50 text-xs">Response Rate</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-3 text-center">
              <p className="text-sm font-bold text-[#C49A6C]">{product.supplier.products}</p>
              <p className="text-[#D8CCBC]/50 text-xs">Products</p>
            </div>
          </div>

          {/* Supplier Card */}
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-2xl">
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
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="flex items-center gap-1 text-[#C49A6C]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {product.supplier.rating}
                  </span>
                  <span className="text-[#D8CCBC]/50">Est. {product.supplier.established}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message Supplier */}
          <button className="w-full py-3 bg-[#0E3B36] text-[#D8CCBC] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#0f4a42] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Message Supplier
          </button>
        </div>
      </div>

      {/* Action Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        <button onClick={() => setActiveTab('quote')}
          className={`px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'quote' ? 'bg-[#C49A6C] text-[#081512]' : 'bg-[#0E3B36] text-[#D8CCBC]'}`}>
          📋 Get Quote
        </button>
        <button onClick={() => setActiveTab('bid')}
          className={`px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'bid' ? 'bg-emerald-500 text-white' : 'bg-[#0E3B36] text-[#D8CCBC]'}`}>
          🎯 Place Bid
        </button>
        <button onClick={() => setActiveTab('requirement')}
          className={`px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'requirement' ? 'bg-blue-500 text-white' : 'bg-[#0E3B36] text-[#D8CCBC]'}`}>
          📝 Send Requirements
        </button>
      </div>

      {/* Quote Form */}
      {activeTab === 'quote' && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 sm:p-6 space-y-4">
          <h3 className="text-lg font-semibold text-[#F4F1EA]">Request Quotation</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Quantity *</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="MT"
                className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]" />
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Trade Terms</label>
              <select value={selectedTradeTerm} onChange={(e) => setSelectedTradeTerm(e.target.value)}
                className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]">
                {product.tradeTerms.map(term => <option key={term} value={term}>{term}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[#D8CCBC] text-sm mb-2">Message *</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
              placeholder="Describe your requirements, destination port, delivery timeline..."
              className="w-full p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C] resize-none" />
          </div>
          <button onClick={handleQuoteRequest} disabled={isSubmitting}
            className="w-full py-4 bg-[#C49A6C] text-[#081512] font-semibold rounded-xl hover:bg-[#D4AA82] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {isSubmitting ? <><span className="w-5 h-5 border-2 border-[#081512]/30 border-t-[#081512] rounded-full animate-spin" />Sending...</> : '📤 Send Quote Request'}
          </button>
        </div>
      )}

      {/* Bid Form */}
      {activeTab === 'bid' && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 sm:p-6 space-y-4">
          <h3 className="text-lg font-semibold text-[#F4F1EA]">Place Your Bid</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Quantity *</label>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="MT"
                className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]" />
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Your Bid Price *</label>
              <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder="per MT"
                className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C]" />
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
                  ${bidAmount}/MT {parseFloat(bidAmount) < product.price ? '(Competitive!)' : ''}
                </span>
              </div>
            )}
          </div>
          <div>
            <label className="block text-[#D8CCBC] text-sm mb-2">Message *</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
              placeholder="Add notes for supplier..."
              className="w-full p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-[#C49A6C] resize-none" />
          </div>
          <button onClick={handleBid} disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {isSubmitting ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</> : '🎯 Submit Bid'}
          </button>
        </div>
      )}

      {/* Requirements Form */}
      {activeTab === 'requirement' && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F4F1EA]">Send Your Requirements</h3>
              <p className="text-[#D8CCBC]/60 text-sm">Tell the supplier exactly what you need</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Required Quantity *</label>
              <input type="text" value={requirementForm.quantity} onChange={(e) => updateRequirement('quantity', e.target.value)}
                placeholder="e.g., 100 MT"
                className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Target Price (Optional)</label>
              <input type="text" value={requirementForm.targetPrice} onChange={(e) => updateRequirement('targetPrice', e.target.value)}
                placeholder="e.g., $800/MT"
                className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-[#D8CCBC] text-sm mb-2">Custom Specifications *</label>
            <textarea value={requirementForm.customSpecs} onChange={(e) => updateRequirement('customSpecs', e.target.value)} rows={3}
              placeholder="Describe your exact requirements:&#10;• Specific grade or quality needed&#10;• Required certifications&#10;• Packaging preferences&#10;• Any customization needs..."
              className="w-full p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-blue-500 resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Delivery Location *</label>
              <input type="text" value={requirementForm.deliveryLocation} onChange={(e) => updateRequirement('deliveryLocation', e.target.value)}
                placeholder="e.g., Dubai, UAE"
                className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-[#D8CCBC] text-sm mb-2">Delivery Timeline</label>
              <input type="text" value={requirementForm.deliveryTimeline} onChange={(e) => updateRequirement('deliveryTimeline', e.target.value)}
                placeholder="e.g., Within 30 days"
                className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-[#D8CCBC] text-sm mb-2">Preferred Payment Terms</label>
            <select value={requirementForm.paymentTerms} onChange={(e) => updateRequirement('paymentTerms', e.target.value)}
              className="w-full h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-blue-500">
              <option value="">Select payment terms</option>
              {product.paymentTerms.map(term => <option key={term} value={term}>{term}</option>)}
              <option value="LC 90 Days">LC 90 Days</option>
              <option value="TT 30% Advance">TT 30% Advance</option>
              <option value="Open Account">Open Account</option>
            </select>
          </div>

          <div>
            <label className="block text-[#D8CCBC] text-sm mb-2">Additional Requirements</label>
            <textarea value={requirementForm.additionalRequirements} onChange={(e) => updateRequirement('additionalRequirements', e.target.value)} rows={3}
              placeholder="Any other requirements:&#10;• Sample needed?&#10;• Inspection requirements&#10;• Insurance preferences&#10;• Special handling needs..."
              className="w-full p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] focus:outline-none focus:border-blue-500 resize-none" />
          </div>

          <button onClick={handleRequirementSubmit} disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
            ) : (
              <>📤 Send Requirements to Supplier</>
            )}
          </button>
        </div>
      )}

      {/* Specifications */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Product Specifications</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="bg-[#0E3B36]/30 rounded-lg p-3">
              <p className="text-[#D8CCBC]/60 text-xs">{key}</p>
              <p className="text-[#F4F1EA] font-medium text-sm mt-1">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Certifications</h2>
        <div className="flex flex-wrap gap-2">
          {product.certifications.map(cert => (
            <span key={cert} className="px-4 py-2 bg-[#0E3B36] text-[#C49A6C] rounded-xl font-medium">
              ✓ {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-[#F4F1EA] mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map(review => (
              <div key={review.id} className="border-b border-[rgba(255,255,255,0.05)] pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{review.country}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[#F4F1EA] font-medium">{review.author}</span>
                      <div className="flex">
                        {[1,2,3,4,5].map(star => (
                          <svg key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-[#C49A6C]' : 'text-[#D8CCBC]/30'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-[#D8CCBC]/50 text-xs">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-[#D8CCBC]/80 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
