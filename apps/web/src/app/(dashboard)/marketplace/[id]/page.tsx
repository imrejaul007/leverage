'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import {
  Star,
  Heart,
  Share2,
  MessageSquare,
  Check,
  Truck,
  Package,
  Shield,
  Clock,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react';

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
  countryCode: 'IN',
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
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
      'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800',
    ],
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
      { id: '1', author: 'Ahmed K.', rating: 5, date: '2024-01-15', comment: 'Excellent quality rice. Will order again!', country: 'AE' },
      { id: '2', author: 'Sarah M.', rating: 5, date: '2024-01-10', comment: 'Fast delivery and great packaging.', country: 'GB' },
      { id: '3', author: 'John D.', rating: 4, date: '2024-01-05', comment: 'Good product, slightly higher moisture than expected.', country: 'US' },
    ],
  },
  '2': {
    id: '2',
    name: 'Organic Cotton Yarn 40/1',
    description: 'Premium quality 100% organic cotton yarn for weaving and knitting.',
    price: 4.20,
    currency: 'USD',
    moq: '10 MT',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
    images: ['https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800'],
    category: 'Textiles',
    supplier: supplier,
    tradeTerms: ['FOB', 'CIF'],
    specifications: {
      'Count': 'Ne 40/1',
      'Type': 'Combed',
      'Material': '100% Organic Cotton',
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
    name: 'Olive Oil Extra Virgin Premium',
    description: 'Cold pressed, first harvest olive oil from Aegean region.',
    price: 4.50,
    currency: 'USD',
    moq: '5 MT',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800'],
    category: 'Food & Agriculture',
    supplier: { ...supplier, id: '3', name: 'Turkey Merchants', country: 'Turkey', rating: 4.9 },
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
  const [activeTab, setActiveTab] = useState<'quote' | 'bid'>('quote');
  const [quantity, setQuantity] = useState('50');
  const [selectedTradeTerm, setSelectedTradeTerm] = useState('FOB');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = products[params.id] || products['1'];
  const relatedProducts = product.relatedProducts?.map(id => products[id]).filter(Boolean) || [];

  const averageRating = useMemo(() => {
    if (!product.reviews.length) return 0;
    return product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
  }, [product.reviews]);

  const handleQuoteRequest = async () => {
    if (!quantity) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title={product.name}
        subtitle={product.category}
        backHref="/marketplace"
      />

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#16A34A] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          Quote request sent successfully!
        </div>
      )}

      <div className="px-4 -mt-6 space-y-4">
        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.featured && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#A6824A] text-white text-xs font-semibold rounded-lg">
                Featured
              </span>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full shadow ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-[#4A4A4A]'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full bg-white shadow text-[#4A4A4A]">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="p-4 flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                    selectedImage === i ? 'border-[#154230]' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" width={64} height={64} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[#4A4A4A] text-sm">{product.category}</p>
              <h1 className="text-xl font-bold text-[#101111]">{product.name}</h1>
            </div>
            {product.supplier.verified && (
              <span className="px-2 py-1 bg-[#154230]/10 text-[#154230] text-xs font-medium rounded-lg flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>

          <p className="text-[#4A4A4A] text-sm mb-4">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${star <= averageRating ? 'text-[#A6824A] fill-[#A6824A]' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-[#101111] font-medium text-sm">{averageRating.toFixed(1)}</span>
            <span className="text-[#4A4A4A] text-sm">({product.reviews.length} reviews)</span>
            <span className="text-[#4A4A4A]">|</span>
            <span className="text-[#4A4A4A] text-sm">{product.salesCount.toLocaleString()} sold</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-4 p-4 bg-[#E6E2DA] rounded-xl mb-4">
            <div>
              <p className="text-[#4A4A4A] text-xs">Reference Price</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#154230]">${product.price}</span>
                <span className="text-[#4A4A4A]">/{product.currency}</span>
              </div>
              {product.originalPrice && (
                <p className="text-[#4A4A4A] text-sm line-through">${product.originalPrice}</p>
              )}
            </div>
            <div className="flex-1">
              <p className="text-[#4A4A4A] text-xs">MOQ</p>
              <p className="text-lg font-semibold text-[#101111]">{product.moq}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-[#E6E2DA] rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#154230]" />
              </div>
              <div>
                <p className="text-[#101111] font-medium text-sm">{product.supplyCapacity}</p>
                <p className="text-[#4A4A4A] text-xs">Supply Capacity</p>
              </div>
            </div>
            <div className="p-3 bg-[#E6E2DA] rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#154230]" />
              </div>
              <div>
                <p className="text-[#101111] font-medium text-sm">{product.supplier.responseTime}</p>
                <p className="text-[#4A4A4A] text-xs">Response Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#101111] font-bold mb-3">Supplier</p>
          <div className="flex items-center gap-4 p-3 bg-[#E6E2DA] rounded-xl">
            <div className="w-14 h-14 bg-[#154230] rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {product.supplier.countryCode}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-[#101111]">{product.supplier.name}</p>
                {product.supplier.verified && (
                  <Check className="w-4 h-4 text-[#154230]" />
                )}
              </div>
              <p className="text-[#4A4A4A] text-sm">{product.supplier.country} | Est. {product.supplier.established}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-[#A6824A] text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  {product.supplier.rating}
                </span>
                <span className="text-[#4A4A4A] text-sm">{product.supplier.products} products</span>
              </div>
            </div>
            <button className="px-4 py-2 border border-[#154230] text-[#154230] rounded-lg text-sm font-medium hover:bg-[#154230]/5">
              View Profile
            </button>
          </div>
        </div>

        {/* Trade Terms */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#101111] font-bold mb-3">Trade Terms</p>
          <div className="flex flex-wrap gap-2">
            {product.tradeTerms.map((term) => (
              <span key={term} className="px-3 py-1 bg-[#E6E2DA] text-[#101111] rounded-lg text-sm font-medium">
                {term}
              </span>
            ))}
          </div>
        </div>

        {/* Request Quote Form */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#101111] font-bold mb-3">Request Quote</p>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('quote')}
              className={`flex-1 py-2 rounded-xl font-medium text-sm ${
                activeTab === 'quote'
                  ? 'bg-[#154230] text-white'
                  : 'bg-[#E6E2DA] text-[#4A4A4A]'
              }`}
            >
              Get Quote
            </button>
            <button
              onClick={() => setActiveTab('bid')}
              className={`flex-1 py-2 rounded-xl font-medium text-sm ${
                activeTab === 'bid'
                  ? 'bg-[#A6824A] text-white'
                  : 'bg-[#E6E2DA] text-[#4A4A4A]'
              }`}
            >
              Place Bid
            </button>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="text-[#4A4A4A] text-sm mb-2 block">Quantity</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, parseInt(quantity) - 1).toString())}
                className="w-12 h-12 bg-[#E6E2DA] rounded-xl flex items-center justify-center"
              >
                <Minus className="w-5 h-5 text-[#4A4A4A]" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="flex-1 h-12 px-4 bg-[#E6E2DA] rounded-xl text-center text-[#101111] font-medium focus:outline-none"
              />
              <button
                onClick={() => setQuantity((parseInt(quantity) + 1).toString())}
                className="w-12 h-12 bg-[#E6E2DA] rounded-xl flex items-center justify-center"
              >
                <Plus className="w-5 h-5 text-[#4A4A4A]" />
              </button>
              <span className="text-[#4A4A4A]">{product.currency}</span>
            </div>
            <p className="text-[#4A4A4A] text-xs mt-2">MOQ: {product.moq}</p>
          </div>

          {/* Trade Term */}
          <div className="mb-4">
            <label className="text-[#4A4A4A] text-sm mb-2 block">Trade Terms</label>
            <select
              value={selectedTradeTerm}
              onChange={(e) => setSelectedTradeTerm(e.target.value)}
              className="w-full h-12 px-4 bg-[#E6E2DA] rounded-xl text-[#101111] focus:outline-none"
            >
              {product.tradeTerms.map((term) => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>

          {/* Total Estimate */}
          <div className="p-4 bg-[#154230]/5 rounded-xl mb-4">
            <div className="flex justify-between items-center">
              <span className="text-[#4A4A4A]">Estimated Total</span>
              <span className="text-xl font-bold text-[#154230]">
                ${(product.price * parseInt(quantity || '0')).toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={handleQuoteRequest}
            disabled={isSubmitting}
            className="w-full py-4 bg-[#154230] text-white rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <MessageSquare className="w-5 h-5" />
                Request Quote
              </>
            )}
          </button>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#101111] font-bold mb-3">Specifications</p>
          <div className="space-y-2">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-black/5 last:border-0">
                <span className="text-[#4A4A4A]">{key}</span>
                <span className="text-[#101111] font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#101111] font-bold mb-3">Certifications</p>
          <div className="flex flex-wrap gap-2">
            {product.certifications.map((cert) => (
              <span key={cert} className="px-4 py-2 bg-[#154230]/10 text-[#154230] rounded-xl font-medium text-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Packaging */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#101111] font-bold mb-3">Packaging</p>
          <p className="text-[#4A4A4A]">{product.packaging}</p>
        </div>

        {/* Payment Terms */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#101111] font-bold mb-3">Payment Terms</p>
          <div className="flex flex-wrap gap-2">
            {product.paymentTerms.map((term) => (
              <span key={term} className="px-3 py-1 bg-[#E6E2DA] text-[#101111] rounded-lg text-sm">
                {term}
              </span>
            ))}
          </div>
        </div>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#101111] font-bold">Reviews ({product.reviews.length})</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                <span className="font-medium text-[#101111]">{averageRating.toFixed(1)}</span>
              </div>
            </div>
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="p-4 bg-[#E6E2DA] rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#154230] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {review.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#101111]">{review.author}</span>
                        <span className="text-[#4A4A4A] text-sm">{review.country}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${star <= review.rating ? 'text-[#A6824A] fill-[#A6824A]' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-[#4A4A4A] text-sm">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-[#4A4A4A] text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-[#101111] font-bold mb-3">Related Products</p>
            <div className="space-y-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/marketplace/${rel.id}`}
                  className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl hover:bg-[#154230]/10 transition-colors"
                >
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    <Image src={rel.image} alt={rel.name} width={64} height={64} className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#101111] truncate">{rel.name}</p>
                    <p className="text-[#154230] font-semibold">${rel.price}/{rel.currency}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#4A4A4A]" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav activeItem="marketplace" />
    </div>
  );
}
