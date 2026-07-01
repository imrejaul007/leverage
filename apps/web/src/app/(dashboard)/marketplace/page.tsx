'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import {
  Bell,
  ShoppingCart,
  Search,
  MapPin,
  Phone,
  Filter,
  Star,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  SlidersHorizontal,
  X,
  List,
  Shield,
  Truck,
  Globe,
  Users,
  Plus,
} from 'lucide-react';
import { products } from '@/data/products';

// WhatsApp Icon Component
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const categories = [
  { name: 'Food & Agriculture', emoji: '🌾', count: products.filter(p => p.category === 'Food & Agriculture').length },
  { name: 'Textiles', emoji: '🧵', count: products.filter(p => p.category === 'Textiles').length },
  { name: 'Metals & Minerals', emoji: '⚙️', count: products.filter(p => p.category === 'Metals & Minerals').length },
  { name: 'Energy', emoji: '⚡', count: products.filter(p => p.category === 'Energy').length },
  { name: 'Chemicals', emoji: '🧪', count: 156 },
  { name: 'Machinery', emoji: '🔧', count: 234 },
];

const priceFilters = ['Under ₹500', '₹500 - ₹1K', '₹1K - ₹5K', 'Above ₹5K'];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    return result;
  }, [selectedCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      filteredProducts.forEach(p => {
        if (hoveredProduct === p.id && p.images && p.images.length > 1) {
          setCurrentImageIndex(prev => ({
            ...prev,
            [p.id]: ((prev[p.id] || 0) + 1) % p.images!.length
          }));
        }
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [filteredProducts, hoveredProduct]);

  const scroll = (productId: string, direction: 'left' | 'right') => {
    const el = scrollRefs.current[productId];
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* ==================== HOMEPAGE HEADER (From Screenshot) ==================== */}
      <header className="bg-gradient-to-br from-[#154230] via-[#1a5a3a] to-[#0d3d28]">
        {/* Top Bar */}
        <div className="bg-[#0d2e20]">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm text-white/80">
              <div className="flex items-center gap-4">
                <span>Welcome to LEVERAGE Marketplace</span>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <span>24x7 Support</span>
                <Link href="/contact" className="flex items-center gap-1 hover:text-white">
                  <Phone className="w-4 h-4" />
                  +1-xxx-xxx-xxxx
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header with Logo & Search */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex-shrink-0">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={47} className="object-contain" />
            </Link>

            {/* Search Bar */}
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
                <button className="px-8 h-12 bg-[#A6824A] hover:bg-[#8a6a3a] text-white font-semibold rounded-r-xl transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors">
                Sign In
              </Link>
              <Link href="/rfqs/new" className="px-5 py-2.5 bg-[#A6824A] hover:bg-[#8a6a3a] text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Post RFQ
              </Link>
              <Link href="/cart" className="relative p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="text-center text-white mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Global B2B Marketplace
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Connect with verified suppliers and buyers from 150+ countries
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Products', value: '2,847' },
              { label: 'Suppliers', value: '523' },
              { label: 'Countries', value: '150+' },
              { label: 'Verified', value: '98%' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ==================== POST RFQ BANNER ==================== */}
      <div className="bg-gradient-to-r from-[#A6824A] to-[#8a6a3a] py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="text-white">
            <h3 className="font-bold text-lg">Can't find what you need?</h3>
            <p className="text-white/80 text-sm">Post a Request for Quote and let suppliers come to you</p>
          </div>
          <Link href="/rfqs/new" className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#A6824A] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            <Plus className="w-5 h-5" />
            Post RFQ
          </Link>
        </div>
      </div>

      {/* ==================== CATEGORIES SECTION ==================== */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Browse Categories</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedCategory === cat.name
                    ? 'border-[#154230] bg-[#154230]/5'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                <span className="text-3xl mb-2 block">{cat.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                <span className="text-xs text-gray-400 block mt-1">{cat.count}+</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRODUCT LISTING (IndiaMART Style) ==================== */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4 sticky top-4">
              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Price</h3>
                <div className="space-y-2">
                  {['Under ₹500', '₹500 - ₹1,000', '₹1,000 - ₹5,000', '₹5,000 - ₹10,000', 'Above ₹10,000'].map(p => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#154230]" />
                      <span className="text-sm text-gray-600">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Business Credentials */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Business Type</h3>
                <div className="space-y-2">
                  {['Manufacturer', 'Exporter', 'Wholesaler', 'Distributor', 'Retailer'].map(b => (
                    <label key={b} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#154230]" />
                      <span className="text-sm text-gray-600">{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">Filters</h3>
                <div className="space-y-2">
                  {['GST Verified', 'TrustSEAL Verified', 'On-Time Delivery', 'Bulk Quantity'].map(f => (
                    <label key={f} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#154230]" />
                      <span className="text-sm text-gray-600">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{filteredProducts.length} results</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="text-sm font-medium text-[#154230] bg-transparent border-0 focus:outline-none cursor-pointer">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products - IndiaMART Style */}
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div
                      className="relative w-40 h-40 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <Image
                        src={product.images?.[currentImageIndex[product.id] || 0] || product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />

                      {/* Image dots */}
                      {product.images && product.images.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {product.images.map((_, i) => (
                            <span key={i} className={`w-1.5 h-1.5 rounded-full ${(currentImageIndex[product.id] || 0) === i ? 'bg-white' : 'bg-white/50'}`} />
                          ))}
                        </div>
                      )}

                      {/* Scroll buttons */}
                      {product.images && product.images.length > 1 && hoveredProduct === product.id && (
                        <>
                          <button onClick={() => scroll(product.id, 'left')} className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow">‹</button>
                          <button onClick={() => scroll(product.id, 'right')} className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow">›</button>
                        </>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-blue-600 hover:text-blue-700 font-medium text-lg leading-tight cursor-pointer mb-1">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{product.location}</span>
                        {product.yearsInBusiness && <span className="ml-2">| {product.yearsInBusiness}+ yrs</span>}
                      </div>

                      {/* Trust Badges */}
                      <div className="flex items-center gap-3 mb-3">
                        {product.gstVerified && (
                          <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle className="w-3 h-3" /> GST Verified</span>
                        )}
                        {product.trustseal && (
                          <span className="flex items-center gap-1 text-xs text-[#154230]"><CheckCircle className="w-3 h-3" /> TrustSEAL</span>
                        )}
                        <span className="text-xs text-gray-400"><Star className="w-3 h-3 inline text-amber-400" /> {product.rating} ({product.reviews})</span>
                      </div>

                      {/* Specs Pills */}
                      <div className="flex flex-wrap gap-2">
                        {product.specifications && Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                          <span key={key} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{value}</span>
                        ))}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex flex-col items-end justify-between w-40">
                      <div>
                        <div className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">per {product.currency}</div>
                        <div className="text-xs text-gray-400 mt-1">MOQ: {product.moq}</div>
                      </div>

                      <button onClick={() => toast.success('Enquiry sent!')} className="w-full py-2 bg-[#154230] hover:bg-[#1a5a3a] text-white text-sm font-medium rounded-lg transition-colors">
                        Contact Supplier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose LEVERAGE?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Verified Suppliers', desc: 'All suppliers vetted' },
              { icon: Globe, title: '150+ Countries', desc: 'Global reach' },
              { icon: Truck, title: 'Logistics', desc: 'Integrated shipping' },
              { icon: Users, title: '20K+ Buyers', desc: 'Growing community' },
            ].map((f, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-xl">
                <f.icon className="w-10 h-10 text-[#154230] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to start trading?</h2>
          <p className="text-white/80 mb-6">Join thousands of businesses already trading globally</p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="px-6 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Create Free Account
            </Link>
            <Link href="/contact" className="px-6 py-3 border-2 border-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain brightness-0 invert mb-4" />
              <p className="text-gray-400 text-sm">The Global Trade Operating System</p>
            </div>
            <div className="flex gap-8 text-sm text-gray-400">
              <div>
                <h4 className="font-semibold text-white mb-2">Platform</h4>
                <ul className="space-y-1">
                  <li><Link href="/products">Products</Link></li>
                  <li><Link href="/suppliers">Suppliers</Link></li>
                  <li><Link href="/rfqs">RFQs</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Company</h4>
                <ul className="space-y-1">
                  <li><Link href="/about">About</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} LEVERAGE Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
