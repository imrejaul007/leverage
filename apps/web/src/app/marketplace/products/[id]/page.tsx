'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import {
  Search,
  MapPin,
  Phone,
  Star,
  CheckCircle,
  Plus,
  ShoppingCart,
  ArrowLeft,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Truck,
  Shield,
  X,
} from 'lucide-react';
import { products } from '@/data/products';

// WhatsApp Icon
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find(p => p.id === productId);
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== productId).slice(0, 4);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const images = product?.images || [product?.image].filter(Boolean) as string[] || [];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/marketplace" className="text-[#154230] font-medium">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <Toaster position="top-right" />

      {/* ==================== MOBILE HEADER ==================== */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <Link href="/marketplace" className="p-2 -ml-2 mr-2">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <span className="font-medium text-gray-900 flex-1">Product Details</span>
          <Link href="/cart" className="p-2">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
      </header>

      {/* ==================== DESKTOP HEADER ==================== */}
      <header className="hidden md:block bg-gradient-to-br from-[#154230] via-[#1a5a3a] to-[#0d3d28]">
        <div className="bg-[#0d2e20]">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between text-sm text-white/80">
            <span>LEVERAGE Marketplace</span>
            <div className="flex items-center gap-4">
              <span>24x7 Support</span>
              <Link href="/contact" className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                +1-xxx-xxx-xxxx
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
            </Link>
            <div className="flex-1 max-w-xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-11 pl-12 pr-4 bg-white rounded-xl text-gray-900"
              />
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-4 py-2 bg-white/10 rounded-lg text-white">Sign In</Link>
              <Link href="/cart" className="relative p-2 bg-white/10 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="hidden md:block mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#154230]">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/marketplace" className="text-gray-500 hover:text-[#154230]">Marketplace</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#154230]">{product.category}</span>
          </div>
        </div>

        {/* Product Info - Mobile First */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Image Gallery */}
          <div className="relative bg-gray-100">
            <div
              className="aspect-square cursor-pointer"
              onClick={() => setShowGallery(true)}
            >
              <Image
                src={images[selectedImageIndex] || product.image}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Nav Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
              {selectedImageIndex + 1}/{images.length}
            </div>

            {/* Share/Save */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                    i === selectedImageIndex ? 'border-[#154230]' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}

          {/* Product Info */}
          <div className="p-4">
            {/* Title */}
            <h1 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h1>

            {/* Supplier */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <MapPin className="w-4 h-4" />
              <span>{product.location}</span>
              {product.trustseal && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> TrustSEAL
                </span>
              )}
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                <span className="text-gray-500">/{product.currency}</span>
                {discount > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">₹{product.originalPrice?.toLocaleString()}</span>
                    <span className="text-green-600 text-sm font-semibold">{discount}% off</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">MOQ: {product.moq}</p>
            </div>

            {/* Rating & Response */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-1">
                <span className="text-amber-400">★★★★★</span>
                <span className="font-bold text-gray-900">{product.rating}</span>
                <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Phone className="w-4 h-4" />
                87% Response Rate
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {product.gstVerified && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span>GST Verified</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Shield className="w-5 h-5" />
                <span>100% Verified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Truck className="w-5 h-5" />
                <span>On-time Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Fast Response</span>
              </div>
            </div>

            {/* CTAs - IndiaMART Style */}
            <div className="space-y-2">
              <button
                onClick={() => toast.success('Enquiry sent to supplier!')}
                className="w-full py-3 bg-[#154230] hover:bg-[#1a5a3a] text-white font-bold rounded-lg transition-colors"
              >
                Send Enquiry
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white font-semibold rounded-lg">
                  <Phone className="w-5 h-5" />
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-lg border border-gray-200 mt-4 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">Specifications</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex px-4 py-3">
                <span className="text-gray-500 w-1/3">{key}</span>
                <span className="font-semibold text-gray-900 flex-1">{value}</span>
              </div>
            ))}
            <div className="flex px-4 py-3">
              <span className="text-gray-500 w-1/3">Packaging</span>
              <span className="font-semibold text-gray-900 flex-1">{product.packaging || 'Standard'}</span>
            </div>
            <div className="flex px-4 py-3">
              <span className="text-gray-500 w-1/3">Country of Origin</span>
              <span className="font-semibold text-gray-900 flex-1">{product.country}</span>
            </div>
          </div>
        </div>

        {/* Supplier Info */}
        <div className="bg-white rounded-lg border border-gray-200 mt-4 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">Seller Information</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-[#154230] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {product.supplier.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900">{product.supplier}</p>
                <p className="text-sm text-gray-500">{product.location}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-amber-400 text-sm">★★★★★</span>
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
              </div>
            </div>
            {product.yearsInBusiness && (
              <p className="text-sm text-gray-500 mb-4">
                Business vintage: {product.yearsInBusiness} years
              </p>
            )}
            <Link
                href={`/marketplace/suppliers/${product.supplierId}`}
                className="block w-full py-2.5 border border-[#154230] text-[#154230] font-semibold text-center rounded-lg hover:bg-[#154230]/5"
              >
                View Full Profile
              </Link>
          </div>
        </div>

        {/* Certifications */}
        {product.certifications && product.certifications.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 mt-4 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="font-bold text-gray-900">Certifications</h2>
            </div>
            <div className="p-4 flex flex-wrap gap-2">
              {product.certifications.map(cert => (
                <span key={cert} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">More from this Category</h2>
            <div className="grid grid-cols-2 gap-3">
              {relatedProducts.map(rp => (
                <Link
                  key={rp.id}
                  href={`/marketplace/products/${rp.id}`}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <div className="relative h-32">
                    <Image src={rp.image} alt={rp.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{rp.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">₹{rp.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{rp.supplier}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ==================== MOBILE STICKY CTA ==================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2 z-40">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#154230] text-[#154230] font-bold rounded-lg">
          <WhatsAppIcon className="w-5 h-5" />
          WhatsApp
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-bold rounded-lg">
          <Phone className="w-5 h-5" />
          Call Now
        </button>
      </div>

      {/* ==================== DESKTOP FOOTER ==================== */}
      <footer className="hidden md:block bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <div>
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} className="object-contain brightness-0 invert mb-4" />
              <p className="text-gray-400 text-sm">The Global Trade Operating System</p>
            </div>
            <div className="flex gap-8 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Platform</h4>
                <ul className="space-y-1 text-gray-400">
                  <li><Link href="/marketplace">Products</Link></li>
                  <li><Link href="/marketplace/suppliers">Suppliers</Link></li>
                  <li><Link href="/marketplace/rfqs">RFQs</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Company</h4>
                <ul className="space-y-1 text-gray-400">
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} LEVERAGE. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ==================== GALLERY MODAL ==================== */}
      {showGallery && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative w-full h-full max-w-3xl max-h-[80vh]">
            <Image
              src={images[selectedImageIndex] || product.image}
              alt={product.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              <button
                onClick={() => setSelectedImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setSelectedImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
