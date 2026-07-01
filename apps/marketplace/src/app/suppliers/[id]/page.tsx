'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  CheckCircle,
  MapPin,
  MessageSquare,
  Globe,
  Calendar,
  Package,
  Phone,
  Award,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shared/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/useToast';
import { getSupplier, suppliers } from '@/data/suppliers';
import { products } from '@/data/products';

export default function SupplierProfilePage() {
  const params = useParams();
  const supplierId = params.id as string;
  const supplier = getSupplier(supplierId);
  const { cartItems, addToCart, isInCart } = useCart();
  const { showToast } = useToast();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Get products from this supplier
  const supplierProducts = products.filter(p => p.supplierId === supplierId);

  if (!supplier) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header cartCount={cartCount} />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Supplier Not Found</h1>
          <p className="text-gray-500 mb-8">The supplier you're looking for doesn't exist.</p>
          <Link href="/suppliers">
            <Button>Browse Suppliers</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} notificationCount={3} />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500">
          <Link href="/" className="hover:text-[#154230]">Home</Link>
          <span>/</span>
          <Link href="/suppliers" className="hover:text-[#154230]">Suppliers</Link>
          <span>/</span>
          <span className="text-gray-900">{supplier.name}</span>
        </nav>

        {/* Supplier Header */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="relative h-32 sm:h-48 bg-gradient-to-r from-[#154230] to-[#1a5a3a]">
            {supplier.coverImage && (
              <Image
                src={supplier.coverImage}
                alt=""
                fill
                className="object-cover opacity-50"
                unoptimized
              />
            )}
          </div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              {/* Logo */}
              <div className="relative w-24 h-24 bg-white rounded-xl border-4 border-white shadow-lg overflow-hidden flex-shrink-0">
                {supplier.logo ? (
                  <Image
                    src={supplier.logo}
                    alt={supplier.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#154230] font-bold text-3xl bg-gradient-to-br from-[#154230] to-[#1a5a3a] text-white">
                    {supplier.name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">{supplier.name}</h1>
                  {supplier.verified && (
                    <Badge variant="success" className="gap-1">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{supplier.location}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  Send Inquiry
                </Button>
                <Button leftIcon={<Phone className="w-4 h-4" />}>
                  View Phone
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: About & Products */}
          <div className="lg:col-span-8 space-y-6">
            {/* About */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {supplier.name}</h2>
              <p className="text-gray-600 mb-6">{supplier.description}</p>

              {/* Business Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {supplier.businessType && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Business Type</p>
                    <p className="font-medium text-sm">{supplier.businessType}</p>
                  </div>
                )}
                {supplier.established && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Established</p>
                    <p className="font-medium text-sm">{supplier.established}</p>
                  </div>
                )}
                {supplier.annualRevenue && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Annual Revenue</p>
                    <p className="font-medium text-sm">{supplier.annualRevenue}</p>
                  </div>
                )}
                {supplier.exportPercentage && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Export</p>
                    <p className="font-medium text-sm">{supplier.exportPercentage}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            {supplierProducts.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Products ({supplierProducts.length})</h2>
                  <Link href={`/products?supplier=${supplierId}`} className="text-[#154230] font-medium hover:underline flex items-center gap-1 text-sm">
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {supplierProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={() => {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          currency: product.currency,
                          moq: product.moq,
                        });
                        showToast(`${product.name} added to cart`, 'success');
                      }}
                      isInCart={isInCart(product.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Supplier Stats</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-gray-900">{supplier.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">{supplier.reviews} reviews</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="font-bold text-gray-900 mb-1">{supplier.products}</p>
                  <p className="text-xs text-gray-500">Products</p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 mb-6">
                {supplier.gstVerified && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>GST Verified</span>
                  </div>
                )}
                {supplier.trustseal && (
                  <div className="flex items-center gap-2 text-sm text-[#154230]">
                    <Award className="w-4 h-4" />
                    <span>TrustSEAL Verified</span>
                  </div>
                )}
                {supplier.yearsInBusiness && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{supplier.yearsInBusiness}+ Years in Business</span>
                  </div>
                )}
                {supplier.responseTime && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>Response: {supplier.responseTime}</span>
                  </div>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {supplier.categories.map((cat) => (
                    <Badge key={cat} variant="default" size="sm">{cat}</Badge>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                {supplier.phone && (
                  <Button variant="outline" className="w-full" leftIcon={<Phone className="w-4 h-4" />}>
                    {supplier.phone}
                  </Button>
                )}
                {supplier.whatsapp && (
                  <Button variant="accent" className="w-full">
                    WhatsApp
                  </Button>
                )}
                <Button variant="ghost" className="w-full text-[#5D1E21]" leftIcon={<MessageSquare className="w-4 h-4" />}>
                  Send Inquiry
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
