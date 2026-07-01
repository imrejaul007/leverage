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
  CheckCircle,
  Plus,
  ShoppingCart,
  ArrowLeft,
  Star,
  Clock,
  Globe,
  Building2,
  Package,
  Award,
  Shield,
} from 'lucide-react';
import { products } from '@/data/products';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const supplierData: Record<string, any> = {
  'sup-001': { name: 'Global Trade Exports', location: 'Mumbai, Maharashtra', country: 'India', rating: 4.8, reviews: 128, years: 12, gst: true, verified: true, type: 'Exporter', description: 'Leading exporter of premium agricultural products including basmati rice, spices, and pulses. We serve clients in 50+ countries with quality assurance at every step.', products: 45, image: null },
  'sup-002': { name: 'Cotton World Ltd', location: 'Ahmedabad, Gujarat', country: 'India', rating: 4.7, reviews: 96, years: 8, gst: true, verified: true, type: 'Manufacturer', description: 'Premier manufacturer of organic and conventional cotton yarn, fabrics, and garments. GOTS certified facility with modern machinery.', products: 32, image: null },
  'sup-003': { name: 'MetalLink Global', location: 'Dubai, UAE', country: 'UAE', rating: 4.9, reviews: 78, years: 15, gst: true, verified: true, type: 'Exporter', description: 'Trusted supplier of industrial metals including copper, aluminum, and steel products. LME registered with global logistics capabilities.', products: 28, image: null },
};

export default function SupplierDetailPage() {
  const params = useParams();
  const supplierId = params.id as string;
  const supplier = supplierData[supplierId] || supplierData['sup-001'];
  const supplierProducts = products.filter(p => p.supplierId === supplierId).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <Toaster position="top-right" />

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <Link href="/marketplace/suppliers" className="p-2 -ml-2 mr-2"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
          <span className="font-medium text-gray-900 flex-1">Supplier Profile</span>
          <Link href="/marketplace/cart" className="p-2"><ShoppingCart className="w-5 h-5 text-gray-600" /></Link>
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
            <div className="flex items-center gap-3">
              <Link href="/marketplace/login" className="px-4 py-2 bg-white/10 rounded-lg text-white">Sign In</Link>
              <Link href="/marketplace/cart" className="relative p-2 bg-white/10 rounded-lg"><ShoppingCart className="w-5 h-5 text-white" /></Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="hidden md:block mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#154230]">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/marketplace/suppliers" className="text-gray-500 hover:text-[#154230]">Suppliers</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#154230]">{supplier.name}</span>
          </div>
        </div>

        {/* Supplier Card */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-[#154230] rounded-lg flex items-center justify-center text-white text-4xl font-bold">
                  {supplier.name.charAt(0)}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{supplier.name}</h1>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{supplier.location}</span>
                      <span className="text-gray-400">|</span>
                      <Globe className="w-4 h-4" />
                      <span>{supplier.country}</span>
                    </div>
                  </div>
                  {supplier.verified && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-bold rounded-full flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> TrustSEAL
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mt-4">{supplier.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-400 mb-1"><Star className="w-5 h-5" /><span className="text-2xl font-bold text-gray-900">{supplier.rating}</span></div>
                    <p className="text-sm text-gray-500">Rating</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{supplier.reviews}</p>
                    <p className="text-sm text-gray-500">Reviews</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{supplier.products}</p>
                    <p className="text-sm text-gray-500">Products</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">{supplier.years}+</p>
                    <p className="text-sm text-gray-500">Years</p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {supplier.gst && <span className="px-3 py-1.5 bg-green-100 text-green-700 text-sm rounded-lg flex items-center gap-1"><CheckCircle className="w-4 h-4" />GST Verified</span>}
                  <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded-lg flex items-center gap-1"><Shield className="w-4 h-4" />Verified Supplier</span>}
                  <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg flex items-center gap-1"><Award className="w-4 h-4" />{supplier.type}</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button onClick={() => toast.success('Enquiry sent!')} className="flex-1 py-3 bg-[#154230] hover:bg-[#1a5a3a] text-white font-bold rounded-lg">Send Enquiry</button>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 flex items-center gap-2"><WhatsAppIcon className="w-5 h-5" />WhatsApp</button>
                    <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg flex items-center gap-2"><Phone className="w-5 h-5" />Call</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        {supplierProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Products by {supplier.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {supplierProducts.map(product => (
                <Link key={product.id} href={`/marketplace/products/${product.id}`} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-40"><Image src={product.image} alt={product.name} fill className="object-cover" unoptimized /></div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">{product.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-2">₹{product.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">{product.moq} MOQ</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2 z-40">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#154230] text-[#154230] font-bold rounded-lg"><WhatsAppIcon className="w-5 h-5" />WhatsApp</button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white font-bold rounded-lg"><Phone className="w-5 h-5" />Call Now</button>
      </div>

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
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
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} LEVERAGE. All rights reserved.</div>
      </footer>
    </div>
  );
}
