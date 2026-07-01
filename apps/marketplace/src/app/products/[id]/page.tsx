'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  MessageSquare,
  Phone,
  Share2,
  CheckCircle,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Shield,
  Truck,
  Award,
  FileText,
  Camera,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shared/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/useToast';
import { getProduct, getRelatedProducts, Product } from '@/data/products';
import { getSupplier } from '@/data/suppliers';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProduct(productId);
  const supplier = product ? getSupplier(product.supplierId) : undefined;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'certifications'>('specs');

  const { cartItems, addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const images = product?.images || [product?.image].filter(Boolean) as string[] || [];
  const discount = product?.originalPrice
    ? Math.round((1 - product!.price / product!.originalPrice) * 100)
    : 0;

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getRelatedProducts(product.id, product.category, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header cartCount={cartCount} />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (isInCart(product.id)) {
      showToast(`${product.name} is already in your cart`, 'info');
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      currency: product.currency,
      moq: product.moq,
    }, quantity);
    showToast(`${quantity}x ${product.name} added to cart`, 'success');
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    showToast(
      isFavorite(product.id) ? 'Removed from favorites' : 'Added to favorites',
      'success'
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} notificationCount={3} />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500">
          <Link href="/" className="hover:text-[#154230]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#154230]">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-[#154230]">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Images */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && (
                    <Badge variant="accent">Featured</Badge>
                  )}
                  {discount > 0 && (
                    <Badge variant="error">{discount}% OFF</Badge>
                  )}
                </div>

                {/* Share & Favorite */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={handleToggleFavorite}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
                      isFavorite(product.id) ? 'bg-[#5D1E21] text-white' : 'bg-white/90 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Image Counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white rounded-full text-sm flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    {selectedImageIndex + 1}/{images.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${
                        selectedImageIndex === i ? 'border-[#154230]' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Contact Card - Mobile */}
            <div className="lg:hidden mt-4 bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  leftIcon={<MessageSquare className="w-5 h-5" />}
                >
                  Send Inquiry
                </Button>
                <Button
                  variant="accent"
                  className="flex-1"
                  leftIcon={<Phone className="w-5 h-5" />}
                >
                  Call Now
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Title & Category */}
              <Badge variant="emerald" size="sm" className="mb-2">{product.category}</Badge>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>

              {/* Location */}
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{product.location}</span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-gray-900">
                    ${typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                  </span>
                  <span className="text-lg text-gray-500">/{product.currency}</span>
                </div>
                {product.originalPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-400 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="error" size="sm">{discount}% OFF</Badge>
                  </div>
                )}
              </div>

              {/* Key Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">MOQ</span>
                  <span className="font-medium">{product.moq}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-400">({product.reviews})</span>
                  </div>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Sales</span>
                  <span className="font-medium">{product.salesCount.toLocaleString()}+ orders</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {product.gstVerified && (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    GST Verified
                  </div>
                )}
                {product.trustseal && (
                  <div className="flex items-center gap-1 text-sm text-[#154230]">
                    <Award className="w-4 h-4" />
                    TrustSEAL
                  </div>
                )}
                {product.yearsInBusiness && (
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {product.yearsInBusiness}+ years
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 h-10 text-center border-x border-gray-200 focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">Min order: {product.moq}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  leftIcon={<ShoppingCart className="w-5 h-5" />}
                >
                  {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </Button>
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    leftIcon={<MessageSquare className="w-5 h-5" />}
                  >
                    Inquiry
                  </Button>
                  <Button
                    size="lg"
                    variant="accent"
                    className="flex-1"
                    leftIcon={<Phone className="w-5 h-5" />}
                  >
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Card */}
          <div className="lg:col-span-3">
            {supplier && (
              <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24">
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {supplier.logo ? (
                      <Image
                        src={supplier.logo}
                        alt={supplier.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#154230] font-bold text-xl bg-gradient-to-br from-[#154230] to-[#1a5a3a] text-white">
                        {supplier.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{supplier.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{supplier.location}</span>
                    </div>
                  </div>
                </div>

                {/* Trust */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {supplier.verified && (
                    <Badge variant="success" size="sm" className="gap-1">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </Badge>
                  )}
                  {supplier.trustseal && (
                    <Badge variant="emerald" size="sm" className="gap-1">
                      <Award className="w-3 h-3" /> TrustSEAL
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="font-bold text-gray-900">{supplier.rating}</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="font-bold text-gray-900">{supplier.products}</p>
                    <p className="text-xs text-gray-500">Products</p>
                  </div>
                </div>

                {/* Business Info */}
                <div className="space-y-2 text-sm mb-4 pb-4 border-b border-gray-100">
                  {supplier.businessType && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Business Type</span>
                      <span className="text-gray-900">{supplier.businessType}</span>
                    </div>
                  )}
                  {supplier.yearsInBusiness && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Established</span>
                      <span className="text-gray-900">{supplier.established}</span>
                    </div>
                  )}
                  {supplier.responseTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Response</span>
                      <span className="text-gray-900">{supplier.responseTime}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Link href={`/suppliers/${supplier.id}`}>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full text-[#5D1E21]" leftIcon={<MessageSquare className="w-4 h-4" />}>
                    Send Inquiry
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200">
          {/* Tabs Header */}
          <div className="flex border-b border-gray-200">
            {['specs', 'description', 'certifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#154230] text-[#154230]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'specs' && 'Specifications'}
                {tab === 'description' && 'Description'}
                {tab === 'certifications' && 'Certifications'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'specs' && product.specifications && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">{key}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'description' && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
              </div>
            )}

            {activeTab === 'certifications' && (
              <div className="flex flex-wrap gap-3">
                {product.certifications?.map((cert) => (
                  <Badge key={cert} variant="emerald" className="gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {cert}
                  </Badge>
                ))}
                {product.packaging && (
                  <div className="w-full mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Packaging Available</h4>
                    <p className="text-gray-600">{product.packaging}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={() => {
                    addToCart({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      image: p.image,
                      currency: p.currency,
                      moq: p.moq,
                    });
                    showToast(`${p.name} added to cart`, 'success');
                  }}
                  isInCart={isInCart(p.id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
