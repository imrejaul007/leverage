'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import {
  Search,
  MapPin,
  Phone,
  Star,
  CheckCircle,
  Plus,
  Bell,
  ShoppingCart,
  ChevronDown,
  SlidersHorizontal,
  Menu,
} from 'lucide-react';
import { products } from '@/data/products';

// WhatsApp Icon Component
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const categories = [
  { name: 'All', emoji: '🛒' },
  { name: 'Food & Agriculture', emoji: '🌾' },
  { name: 'Textiles', emoji: '🧵' },
  { name: 'Metals & Minerals', emoji: '⚙️' },
  { name: 'Energy', emoji: '⚡' },
];

const nearbyCities = ['All India', 'Delhi', 'Mumbai', 'Ahmedabad', 'Surat', 'Pune', 'Bangalore'];

const priceFilters = ['All Prices', 'Under 500', '500-1K', '1K-5K', 'Above 5K'];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All India');
  const [selectedPrice, setSelectedPrice] = useState<string>('All Prices');

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }
    return result;
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <Toaster position="top-right" />

      {/* ==================== MOBILE HEADER ==================== */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Top strip */}
        <div className="bg-[#154230] px-4 py-2">
          <div className="flex items-center justify-between">
            <span className="text-white text-xs">Welcome to LEVERAGE</span>
            <Link href="/login" className="text-white text-xs font-medium">Sign In</Link>
          </div>
        </div>

        {/* Logo + Search */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
            </Link>
            <Link href="/cart" className="ml-auto relative p-2">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-10 pl-10 pr-4 bg-gray-100 rounded-lg text-sm"
            />
          </div>
        </div>

        {/* City Pills */}
        <div className="px-4 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide">
          {nearbyCities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${
                selectedCity === city
                  ? 'bg-[#154230] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </header>

      {/* ==================== DESKTOP HEADER ==================== */}
      <header className="hidden md:block bg-gradient-to-br from-[#154230] via-[#1a5a3a] to-[#0d3d28]">
        <div className="bg-[#0d2e20]">
          <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between text-sm text-white/80">
            <span>Welcome to LEVERAGE Marketplace</span>
            <div className="flex items-center gap-4">
              <span>24x7 Support</span>
              <Link href="/contact" className="flex items-center gap-1 hover:text-white">
                <Phone className="w-4 h-4" />
                +1-xxx-xxx-xxxx
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={47} className="object-contain" />
            </Link>
            <div className="flex-1 max-w-3xl">
              <div className="relative flex">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products, suppliers..."
                    className="w-full h-12 pl-12 pr-4 bg-white rounded-l-xl text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <button className="px-8 h-12 bg-[#5D1E21] hover:bg-[#7a2629] text-white font-semibold rounded-r-xl">
                  Search
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg">
                Sign In
              </Link>
              <Link href="/rfqs/new" className="px-5 py-2.5 bg-[#5D1E21] hover:bg-[#7a2629] text-white font-medium rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Post RFQ
              </Link>
              <Link href="/cart" className="relative p-2.5 bg-white/10 rounded-lg">
                <ShoppingCart className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 pb-8 text-center text-white">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">Global B2B Marketplace</h1>
          <p className="text-lg text-white/80">Connect with verified suppliers from 150+ countries</p>
          <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
            {[{label:'Products',value:'2,847'},{label:'Suppliers',value:'523'},{label:'Countries',value:'150+'},{label:'Verified',value:'98%'}].map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ==================== POST RFQ BANNER ==================== */}
      <div className="bg-gradient-to-r from-[#5D1E21] to-[#7a2629] py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-white">
            <h3 className="font-bold">Can't find what you need?</h3>
            <p className="text-white/80 text-sm">Post an RFQ and let suppliers come to you</p>
          </div>
          <Link href="/rfqs/new" className="flex items-center gap-2 px-4 py-2 bg-white text-[#5D1E21] font-semibold rounded-lg">
            <Plus className="w-4 h-4" />
            Post RFQ
          </Link>
        </div>
      </div>

      {/* ==================== CATEGORIES ==================== */}
      <div className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
                  selectedCategory === cat.name
                    ? 'bg-[#154230] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
          {/* Price Filters - Desktop */}
          <div className="hidden md:flex gap-2 mt-4">
            {priceFilters.map(price => (
              <button
                key={price}
                onClick={() => setSelectedPrice(price)}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  selectedPrice === price
                    ? 'border-[#154230] bg-[#154230]/10 text-[#154230]'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                {price}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== PRODUCT LISTING ==================== */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Desktop Only */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4 sticky top-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Price</h3>
                {['Under ₹500', '₹500 - ₹1K', '₹1K - ₹5K', '₹5K - ₹10K', 'Above ₹10K'].map(p => (
                  <label key={p} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#154230]" />
                    <span className="text-sm text-gray-600">{p}</span>
                  </label>
                ))}
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Business Type</h3>
                {['Manufacturer', 'Exporter', 'Wholesaler', 'Distributor'].map(b => (
                  <label key={b} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#154230]" />
                    <span className="text-sm text-gray-600">{b}</span>
                  </label>
                ))}
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Filters</h3>
                {['GST Verified', 'TrustSEAL', 'On-Time Delivery'].map(f => (
                  <label key={f} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#154230]" />
                    <span className="text-sm text-gray-600">{f}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{filteredProducts.length} results</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort:</span>
                <select className="text-sm font-medium text-[#154230] bg-transparent border-0">
                  <option>Relevance</option>
                </select>
              </div>
            </div>

            {/* Product Cards */}
            <div className="space-y-3">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* ==================== MOBILE STICKY BOTTOM BAR ==================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2 z-40">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#5D1E21] text-[#5D1E21] font-semibold rounded-lg">
          <WhatsAppIcon />
          WhatsApp
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#5D1E21] text-white font-semibold rounded-lg">
          <Phone className="w-4 h-4" />
          Call Now
        </button>
      </div>

      {/* ==================== FEATURES ==================== */}
      <section className="hidden md:block bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose LEVERAGE?</h2>
          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: '🛡️', title: 'Verified Suppliers', desc: 'All vetted' },
              { icon: '🌍', title: '150+ Countries', desc: 'Global reach' },
              { icon: '🚚', title: 'Logistics', desc: 'Integrated' },
              { icon: '👥', title: '20K+ Buyers', desc: 'Growing' },
            ].map((f, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-xl">
                <span className="text-4xl mb-3 block">{f.icon}</span>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="hidden md:block bg-gradient-to-r from-[#154230] to-[#1a5a3a] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to start trading?</h2>
          <p className="text-white/80 mb-6">Join thousands of businesses globally</p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="px-6 py-3 bg-white text-[#154230] font-semibold rounded-lg">
              Create Free Account
            </Link>
            <Link href="/contact" className="px-6 py-3 border-2 border-white font-semibold rounded-lg">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="hidden md:block bg-gray-900 text-white py-8">
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
                  <li><Link href="/products">Products</Link></li>
                  <li><Link href="/suppliers">Suppliers</Link></li>
                  <li><Link href="/rfqs">RFQs</Link></li>
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
    </div>
  );
}

// ==================== PRODUCT CARD COMPONENT ====================
function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex">
          {/* Image */}
          <div className="relative w-28 h-28 flex-shrink-0 bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-2 min-w-0">
            <h3 className="text-blue-600 text-sm font-medium line-clamp-2 leading-tight">
              {product.name}
            </h3>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
              <MapPin className="w-2.5 h-2.5" />
              <span className="truncate">{product.location}</span>
            </div>

            {/* Trust badges */}
            <div className="flex gap-2 mt-1">
              {product.gstVerified && (
                <span className="text-[9px] text-green-600 font-medium">GST ✓</span>
              )}
              {product.trustseal && (
                <span className="text-[9px] text-[#154230] font-medium">TrustSEAL</span>
              )}
            </div>

            {/* Price */}
            <div className="mt-1">
              <span className="text-sm font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              <span className="text-[10px] text-gray-500">/{product.currency}</span>
            </div>

            {/* Mobile CTAs - IndiaMART Style */}
            <div className="flex gap-1.5 mt-2">
              <button
                onClick={() => toast.success('Opening WhatsApp...')}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-green-600 text-green-600 text-[10px] font-medium rounded"
              >
                <WhatsAppIcon />
                WhatsApp
              </button>
              <button
                onClick={() => toast('Calling supplier...')}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-green-600 text-white text-[10px] font-medium rounded"
              >
                <Phone className="w-3 h-3" />
                Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - IndiaMART Style */}
      <div className="hidden md:block p-4">
        <div className="flex gap-4">
          {/* Image */}
          <div className="relative w-36 h-36 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
            />
            {/* Image dots */}
            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.images.map((_, i) => (
                  <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-blue-600 hover:text-blue-700 font-medium text-lg leading-tight cursor-pointer mb-1">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <MapPin className="w-3 h-3" />
              <span>{product.location}</span>
              {product.yearsInBusiness && (
                <span className="ml-2 text-gray-400">| {product.yearsInBusiness}+ yrs</span>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-3 mb-2">
              {product.gstVerified && (
                <span className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="w-3 h-3" /> GST Verified
                </span>
              )}
              {product.trustseal && (
                <span className="flex items-center gap-1 text-xs text-[#154230]">
                  <CheckCircle className="w-3 h-3" /> TrustSEAL
                </span>
              )}
              <span className="text-xs text-gray-400">
                <Star className="w-3 h-3 inline text-amber-400" /> {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Specs */}
            <div className="flex flex-wrap gap-1.5">
              {product.specifications && Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                <span key={key} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                  {value}
                </span>
              ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex flex-col items-end justify-between w-36">
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</div>
              <div className="text-xs text-gray-500">/{product.currency}</div>
              <div className="text-xs text-gray-400 mt-1">MOQ: {product.moq}</div>
            </div>

            <button
              onClick={() => toast.success('Enquiry sent!')}
              className="w-full py-2 bg-[#154230] hover:bg-[#1a5a3a] text-white text-sm font-medium rounded-lg transition-colors"
            >
              Contact Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
