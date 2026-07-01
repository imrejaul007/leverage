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

// Country and City data - hierarchical
const locationData = [
  {
    country: 'All Countries',
    cities: ['All Cities']
  },
  {
    country: 'India',
    cities: ['All India', 'Mumbai', 'Delhi NCR', 'Ahmedabad', 'Surat', 'Pune', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Jaipur', 'Lucknow', 'Chandigarh', 'Kochi', 'Indore', 'Nagpur', 'Vadodara', 'Bhopal']
  },
  {
    country: 'UAE',
    cities: ['All UAE', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah']
  },
  {
    country: 'Saudi Arabia',
    cities: ['All Saudi', 'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam']
  },
  {
    country: 'Qatar',
    cities: ['All Qatar', 'Doha', 'Al Rayyan', 'Al Wakrah']
  },
  {
    country: 'Oman',
    cities: ['All Oman', 'Muscat', 'Salalah', 'Sohar']
  },
  {
    country: 'Kuwait',
    cities: ['All Kuwait', 'Kuwait City', 'Al Ahmadi', 'Hawalli']
  },
  {
    country: 'Bahrain',
    cities: ['All Bahrain', 'Manama', 'Muharraq', 'Riffa']
  },
  {
    country: 'Lebanon',
    cities: ['All Lebanon', 'Beirut', 'Tripoli', 'Sidon']
  },
  {
    country: 'Singapore',
    cities: ['Singapore']
  },
  {
    country: 'Malaysia',
    cities: ['All Malaysia', 'Kuala Lumpur', 'Penang', 'Johor Bahru']
  },
  {
    country: 'Thailand',
    cities: ['All Thailand', 'Bangkok', 'Phuket', 'Chiang Mai']
  },
  {
    country: 'Indonesia',
    cities: ['All Indonesia', 'Jakarta', 'Surabaya', 'Bandung']
  },
  {
    country: 'Philippines',
    cities: ['All Philippines', 'Manila', 'Cebu', 'Davao']
  },
  {
    country: 'Vietnam',
    cities: ['All Vietnam', 'Ho Chi Minh City', 'Hanoi', 'Da Nang']
  },
  {
    country: 'China',
    cities: ['All China', 'Shanghai', 'Beijing', 'Shenzhen', 'Guangzhou', 'Hong Kong']
  },
  {
    country: 'Japan',
    cities: ['All Japan', 'Tokyo', 'Osaka', 'Yokohama', 'Nagoya']
  },
  {
    country: 'South Korea',
    cities: ['All Korea', 'Seoul', 'Busan', 'Incheon']
  },
  {
    country: 'UK',
    cities: ['All UK', 'London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds']
  },
  {
    country: 'Germany',
    cities: ['All Germany', 'Hamburg', 'Berlin', 'Frankfurt', 'Munich', 'Dusseldorf']
  },
  {
    country: 'Netherlands',
    cities: ['All Netherlands', 'Amsterdam', 'Rotterdam', 'The Hague']
  },
  {
    country: 'France',
    cities: ['All France', 'Paris', 'Lyon', 'Marseille']
  },
  {
    country: 'Italy',
    cities: ['All Italy', 'Milan', 'Rome', 'Naples', 'Turin']
  },
  {
    country: 'Spain',
    cities: ['All Spain', 'Madrid', 'Barcelona', 'Valencia', 'Seville']
  },
  {
    country: 'USA',
    cities: ['All USA', 'New York', 'Los Angeles', 'Houston', 'Chicago', 'Miami', 'San Francisco', 'Seattle', 'Dallas']
  },
  {
    country: 'Canada',
    cities: ['All Canada', 'Toronto', 'Vancouver', 'Montreal', 'Calgary']
  },
  {
    country: 'Mexico',
    cities: ['All Mexico', 'Mexico City', 'Guadalajara', 'Monterrey']
  },
  {
    country: 'Brazil',
    cities: ['All Brazil', 'Sao Paulo', 'Rio de Janeiro', 'Brasilia']
  },
  {
    country: 'Egypt',
    cities: ['All Egypt', 'Cairo', 'Alexandria', 'Giza']
  },
  {
    country: 'Nigeria',
    cities: ['All Nigeria', 'Lagos', 'Abuja', 'Kano']
  },
  {
    country: 'Kenya',
    cities: ['All Kenya', 'Nairobi', 'Mombasa', 'Kisumu']
  },
  {
    country: 'South Africa',
    cities: ['All SA', 'Johannesburg', 'Cape Town', 'Durban']
  },
  {
    country: 'Ethiopia',
    cities: ['All Ethiopia', 'Addis Claude', 'Dire Dawa', 'Harar']
  },
  {
    country: 'Turkey',
    cities: ['All Turkey', 'Istanbul', 'Ankara', 'Izmir', 'Antalya']
  },
];

const priceFilters = ['All Prices', 'Under ₹500', '₹500-₹1K', '₹1K-₹5K', 'Above ₹5K'];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All Countries');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedPrice, setSelectedPrice] = useState<string>('All Prices');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Get cities for selected country
  const currentCountryData = locationData.find(l => l.country === selectedCountry);
  const cities = currentCountryData?.cities || [];

  // Reset city when country changes
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    const countryData = locationData.find(l => l.country === country);
    setSelectedCity(countryData?.cities[0] || 'All Cities');
  };

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
        <div className="bg-[#154230] px-4 py-2 flex justify-between items-center">
          <span className="text-white text-xs font-medium">LEVERAGE</span>
          <div className="flex items-center gap-3">
            <Link href="/marketplace/cart" className="text-white"><ShoppingCart className="w-4 h-4" /></Link>
            <Link href="/marketplace/login" className="text-white text-xs font-medium">Sign In</Link>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="flex items-center gap-3">
            <Link href="/"><Image src="/leverage-logo.png" alt="LEVERAGE" width={90} height={30} className="object-contain" /></Link>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search products..." className="w-full h-9 pl-10 pr-4 bg-gray-100 rounded-lg text-sm" />
            </div>
          </div>
        </div>
        <div className="px-4 py-2 border-t border-gray-100">
          {/* Country Pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {['All', 'India', 'UAE', 'USA', 'UK', 'China'].map(c => (
              <button
                key={c}
                onClick={() => handleCountryChange(c === 'All' ? 'All Countries' : c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap flex-shrink-0 ${
                  (c === 'All' ? selectedCountry === 'All Countries' : selectedCountry === c)
                    ? 'bg-[#154230] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
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
            <Link href="/" className="flex-shrink-0">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={47} className="object-contain" />
            </Link>

            {/* Location Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">{selectedCountry === 'All Countries' ? 'All Countries' : `${selectedCity}, ${selectedCountry}`}</span>
                <ChevronDown className={`w-4 h-4 text-white/70 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown */}
              {showLocationDropdown && (
                <div className="absolute top-full mt-2 left-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden flex">
                  {/* Countries */}
                  <div className="w-1/3 border-r border-gray-100 overflow-y-auto">
                    {locationData.map(loc => (
                      <button
                        key={loc.country}
                        onClick={() => handleCountryChange(loc.country)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedCountry === loc.country
                            ? 'bg-[#154230]/10 text-[#154230] font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {loc.country}
                      </button>
                    ))}
                  </div>
                  {/* Cities */}
                  <div className="w-2/3 overflow-y-auto max-h-96">
                    {cities.map(city => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setShowLocationDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          selectedCity === city
                            ? 'bg-[#154230]/10 text-[#154230] font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
                <button className="px-8 h-12 bg-[#5D1E21] hover:bg-[#7a2629] text-white font-semibold rounded-r-xl transition-colors">
                  Search
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors">
                Sign In
              </Link>
              <Link href="/rfqs/new" className="px-5 py-2.5 bg-[#5D1E21] hover:bg-[#7a2629] text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Post RFQ
              </Link>
              <Link href="/cart" className="relative p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
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
          <Link href="/rfqs/new" className="flex items-center gap-2 px-4 py-2 bg-white text-[#5D1E21] font-semibold rounded-lg hover:bg-white/90 transition-colors">
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
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{filteredProducts.length} results</span>
                <div className="hidden md:flex gap-2">
                  {priceFilters.map(price => (
                    <button
                      key={price}
                      onClick={() => setSelectedPrice(price)}
                      className={`px-3 py-1.5 rounded-lg border text-sm ${
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
              <select className="text-sm font-medium text-[#154230] bg-transparent border-0">
                <option>Relevance</option>
              </select>
            </div>

            <div className="space-y-3">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
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

      {/* Features */}
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

      {/* CTA */}
      <section className="hidden md:block bg-gradient-to-r from-[#154230] to-[#1a5a3a] py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Ready to start trading?</h2>
          <p className="text-white/80 mb-6">Join thousands of businesses globally</p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="px-6 py-3 bg-white text-[#154230] font-semibold rounded-lg">Create Free Account</Link>
            <Link href="/contact" className="px-6 py-3 border-2 border-white font-semibold rounded-lg">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  <li><Link href="/marketplace">Products</Link></li>
                  <li><Link href="/marketplace/suppliers">Suppliers</Link></li>
                  <li><Link href="/marketplace/rfqs">RFQs</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} LEVERAGE. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// ==================== PRODUCT CARD COMPONENT ====================
function ProductCard({ product }: { product: typeof products[0] }) {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex">
          <Link href={`/marketplace/products/${product.id}`} className="relative w-24 h-24 m-2 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
          </Link>
          <div className="flex-1 p-2 pr-3 min-w-0">
            <div className="flex items-start justify-between gap-1 mb-1">
              <Link href={`/marketplace/products/${product.id}`} className="text-blue-700 font-bold text-sm leading-tight flex-1 hover:text-blue-800">
                {product.name}
              </Link>
              {product.trustseal && (
                <span className="flex-shrink-0 px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[8px] font-bold rounded-full flex items-center gap-0.5">
                  <CheckCircle className="w-2 h-2" /> TrustSEAL
                </span>
              )}
            </div>
            <Link href={`/marketplace/products/${product.id}`} className="block mb-2">
              <span className="text-base font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              <span className="text-xs text-gray-500">/{product.currency}</span>
            </Link>
            <div className="space-y-0.5 mb-2 text-[11px]">
              {product.specifications && Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="text-gray-600">{key}:</span>
                  <span className="font-semibold text-gray-900 ml-1">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 px-3 py-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-900">{product.supplier}</p>
            <p className="text-[10px] text-gray-500">{product.country}{product.yearsInBusiness && ` · ${product.yearsInBusiness} yrs`}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-xs font-semibold text-gray-900">{product.rating}</span>
              <span className="text-[10px] text-gray-500">({product.reviews})</span>
            </div>
            <p className="text-[10px] text-gray-500">📞 87% Response Rate</p>
          </div>
        </div>
        <div className="grid grid-cols-2 border-t border-gray-100">
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success('Opening WhatsApp...'); }} className="flex items-center justify-center gap-1 py-3 border-r border-gray-100 bg-white text-green-700 font-semibold text-sm">
            <WhatsAppIcon className="w-4 h-4" />WhatsApp
          </button>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast('Calling supplier...'); }} className="flex items-center justify-center gap-1 py-3 bg-green-600 text-white font-semibold text-sm">
            <Phone className="w-4 h-4" />Call Now
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block p-4">
        <div className="flex gap-4">
          <Link href={`/marketplace/products/${product.id}`} className="relative w-36 h-36 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {product.images.map((_, i) => (
                  <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            )}
          </Link>
          <div className="flex-1 min-w-0">
            <Link href={`/marketplace/products/${product.id}`} className="text-blue-600 hover:text-blue-700 font-medium text-lg leading-tight mb-1 block">
              {product.name}
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <MapPin className="w-3 h-3" />
              <span>{product.location}</span>
              {product.yearsInBusiness && <span className="ml-2 text-gray-400">| {product.yearsInBusiness}+ yrs</span>}
            </div>
            <div className="flex items-center gap-3 mb-2">
              {product.gstVerified && (
                <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle className="w-3 h-3" /> GST Verified</span>
              )}
              {product.trustseal && (
                <span className="flex items-center gap-1 text-xs text-[#154230]"><CheckCircle className="w-3 h-3" /> TrustSEAL</span>
              )}
              <span className="text-xs text-gray-400"><Star className="w-3 h-3 inline text-amber-400" /> {product.rating} ({product.reviews})</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.specifications && Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                <span key={key} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">{value}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end justify-between w-36">
            <Link href={`/marketplace/products/${product.id}`} className="text-right block">
              <div className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</div>
              <div className="text-xs text-gray-500">/{product.currency}</div>
              <div className="text-xs text-gray-400 mt-1">MOQ: {product.moq}</div>
            </Link>
            <button onClick={(e) => { e.preventDefault(); toast.success('Enquiry sent!'); }} className="w-full py-2 bg-[#154230] hover:bg-[#1a5a3a] text-white text-sm font-medium rounded-lg transition-colors">
              Contact Supplier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
