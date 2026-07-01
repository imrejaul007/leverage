'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import {
  Search,
  MapPin,
  Phone,
  CheckCircle,
  Plus,
  ShoppingCart,
  Star,
  Filter,
  SlidersHorizontal,
  Users,
  Building2,
  Globe,
  Clock,
} from 'lucide-react';
import { products } from '@/data/products';

// Sample suppliers data
const suppliersData = [
  // India
  { id: 'sup-001', name: 'Global Trade Exports', location: 'Mumbai, Maharashtra', country: 'India', rating: 4.8, reviews: 128, products: 45, years: 12, gst: true, verified: true, type: 'Exporter' },
  { id: 'sup-002', name: 'Cotton World Ltd', location: 'Ahmedabad, Gujarat', country: 'India', rating: 4.7, reviews: 96, products: 32, years: 8, gst: true, verified: true, type: 'Manufacturer' },
  { id: 'sup-006', name: 'Spice Route International', location: 'Kochi, Kerala', country: 'India', rating: 4.9, reviews: 210, products: 78, years: 15, gst: true, verified: true, type: 'Exporter' },
  // UAE
  { id: 'sup-003', name: 'MetalLink Global', location: 'Dubai, UAE', country: 'UAE', rating: 4.9, reviews: 78, products: 28, years: 15, gst: true, verified: true, type: 'Exporter' },
  { id: 'sup-007', name: 'Gulf Trading House', location: 'Abu Dhabi, UAE', country: 'UAE', rating: 4.6, reviews: 45, products: 34, years: 10, gst: true, verified: true, type: 'Distributor' },
  // China
  { id: 'sup-004', name: 'Shanghai Import Co.', location: 'Shanghai, China', country: 'China', rating: 4.6, reviews: 89, products: 56, years: 6, gst: false, verified: false, type: 'Manufacturer' },
  { id: 'sup-008', name: 'Shenzhen Electronics', location: 'Shenzhen, China', country: 'China', rating: 4.5, reviews: 67, products: 89, years: 8, gst: false, verified: false, type: 'Manufacturer' },
  // Turkey
  { id: 'sup-005', name: 'Turkey Merchants', location: 'Istanbul, Turkey', country: 'Turkey', rating: 4.9, reviews: 156, products: 67, years: 18, gst: true, verified: true, type: 'Exporter' },
  // Singapore
  { id: 'sup-009', name: 'Asia Pacific Trading', location: 'Singapore', country: 'Singapore', rating: 4.8, reviews: 92, products: 54, years: 12, gst: true, verified: true, type: 'Exporter' },
  // USA
  { id: 'sup-010', name: 'American Imports LLC', location: 'Houston, Texas', country: 'USA', rating: 4.7, reviews: 58, products: 41, years: 9, gst: false, verified: true, type: 'Importer' },
  // Germany
  { id: 'sup-011', name: 'EuroTrade GmbH', location: 'Hamburg, Germany', country: 'Germany', rating: 4.9, reviews: 134, products: 62, years: 20, gst: true, verified: true, type: 'Distributor' },
  { id: 'sup-006', name: 'Ethiopia Direct', location: 'Addis Claude, Ethiopia', country: 'Ethiopia', rating: 4.8, reviews: 64, products: 23, years: 10, gst: true, verified: true, type: 'Exporter', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200' },
];

const cities = [
  'All India',
  // India
  'Mumbai', 'Delhi', 'Ahmedabad', 'Surat', 'Pune', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Jaipur', 'Lucknow', 'Chandigarh',
  // Middle East
  'Dubai', 'Abu Dhabi', 'Riyadh', 'Jeddah', 'Doha', 'Muscat', 'Kuwait City', 'Manama', 'Beirut',
  // Southeast Asia
  'Singapore', 'Kuala Lumpur', 'Bangkok', 'Jakarta', 'Manila', 'Ho Chi Minh City', 'Hanoi',
  // East Asia
  'Shanghai', 'Beijing', 'Hong Kong', 'Tokyo', 'Seoul',
  // Europe
  'London', 'Amsterdam', 'Hamburg', 'Milan', 'Paris', 'Frankfurt',
  // USA
  'New York', 'Los Angeles', 'Houston', 'Chicago',
  // Africa
  'Cairo', 'Lagos', 'Nairobi', 'Johannesburg'
];
const businessTypes = ['All Types', 'Manufacturer', 'Exporter', 'Wholesaler', 'Distributor'];

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function SuppliersPage() {
  const [selectedCity, setSelectedCity] = useState('All India');
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredSuppliers = suppliersData.filter(s => {
    if (selectedCity !== 'All India' && !s.location.includes(selectedCity)) return false;
    if (selectedType !== 'All Types' && s.type !== selectedType) return false;
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <Toaster position="top-right" />

      {/* Mobile Header */}
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
            <Link href="/marketplace"><Image src="/leverage-logo.png" alt="LEVERAGE" width={90} height={30} className="object-contain" /></Link>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search suppliers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-9 pl-10 pr-4 bg-gray-100 rounded-lg text-sm" />
            </div>
          </div>
        </div>
        <div className="px-4 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide">
          {cities.map(city => (
            <button key={city} onClick={() => setSelectedCity(city)} className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap ${selectedCity === city ? 'bg-[#154230] text-white' : 'bg-gray-100 text-gray-600'}`}>{city}</button>
          ))}
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
            <Link href="/marketplace"><Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={47} className="object-contain" /></Link>
            <div className="flex-1 max-w-2xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search suppliers, products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-12 pl-12 pr-4 bg-white rounded-xl text-gray-900" />
            </div>
            <div className="flex items-center gap-4">
              <Link href="/marketplace/login" className="px-5 py-2.5 bg-white/10 rounded-lg text-white">Sign In</Link>
              <Link href="/marketplace/rfqs/new" className="px-5 py-2.5 bg-[#5D1E21] rounded-lg text-white flex items-center gap-2"><Plus className="w-4 h-4" />Post RFQ</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-4 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Verified Suppliers Directory</h1>
          <p className="text-white/80">Connect with trusted manufacturers and exporters worldwide</p>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#154230]">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#154230] font-medium">Suppliers</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            {businessTypes.map(type => (
              <button key={type} onClick={() => setSelectedType(type)} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedType === type ? 'bg-[#154230] text-white' : 'bg-gray-100 text-gray-600'}`}>{type}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">{filteredSuppliers.length} suppliers found</span>
          <select className="text-sm font-medium text-[#154230] bg-transparent border-0">
            <option>Relevance</option>
            <option>Rating: High to Low</option>
            <option>Products: Most</option>
            <option>Years: Oldest</option>
          </select>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map(supplier => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No suppliers found</p>
            <button onClick={() => { setSelectedCity('All India'); setSelectedType('All Types'); setSearchQuery(''); }} className="mt-4 text-[#154230] font-medium">Clear filters</button>
          </div>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2 z-40">
        <button onClick={() => setShowFilters(true)} className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg"><Filter className="w-4 h-4" />Filters</button>
        <Link href="/marketplace/rfqs/new" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#5D1E21] text-white font-semibold rounded-lg"><Plus className="w-4 h-4" />Post RFQ</Link>
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

function SupplierCard({ supplier }: { supplier: typeof suppliersData[0] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex p-3">
          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {supplier.image ? (
              <Image src={supplier.image} alt={supplier.name} width={80} height={80} className="object-cover" unoptimized />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#154230]">{supplier.name.charAt(0)}</div>
            )}
          </div>
          <div className="flex-1 ml-3">
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-gray-900 text-sm leading-tight">{supplier.name}</h3>
              {supplier.verified && <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[8px] font-bold rounded-full flex items-center gap-0.5"><CheckCircle className="w-2 h-2" />Verified</span>}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1"><MapPin className="w-2.5 h-2.5" />{supplier.location}</div>
            <div className="flex items-center gap-1 text-[10px] text-gray-500"><Globe className="w-2.5 h-2.5" />{supplier.country}</div>
          </div>
        </div>
        <div className="border-t border-gray-100 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-gray-500">
            <span>★★★★★ {supplier.rating}</span>
            <span>({supplier.reviews})</span>
          </div>
          <div className="text-[10px] text-gray-500">{supplier.products} products</div>
        </div>
        <div className="border-t border-gray-100 px-3 py-2 flex items-center justify-between text-[10px] text-gray-500">
          <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{supplier.type}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{supplier.years}+ yrs</span>
        </div>
        <div className="grid grid-cols-2 border-t border-gray-100">
          <button onClick={() => toast.success('Opening WhatsApp...')} className="flex items-center justify-center gap-1 py-2.5 border-r border-gray-100 text-green-700 font-semibold text-xs"><WhatsAppIcon className="w-3.5 h-3.5" />WhatsApp</button>
          <button onClick={() => toast('Calling...')} className="flex items-center justify-center gap-1 py-2.5 bg-green-600 text-white font-semibold text-xs"><Phone className="w-3.5 h-3.5" />Call</button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            {supplier.image ? (
              <Image src={supplier.image} alt={supplier.name} width={64} height={64} className="object-cover" unoptimized />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-[#154230]">{supplier.name.charAt(0)}</div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <Link href={`/marketplace/suppliers/${supplier.id}`} className="font-bold text-gray-900 hover:text-[#154230]">{supplier.name}</Link>
              {supplier.verified && <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full flex items-center gap-1"><CheckCircle className="w-3 h-3" />TrustSEAL</span>}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1"><MapPin className="w-4 h-4" />{supplier.location}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400" />{supplier.rating} ({supplier.reviews})</span>
          <span>|</span>
          <span>{supplier.products} products</span>
          <span>|</span>
          <span>{supplier.type}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {supplier.gst && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">GST Verified</span>}
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">{supplier.years}+ years</span>
          </div>
        </div>

        <Link href={`/marketplace/suppliers/${supplier.id}`} className="block w-full py-2.5 text-center border border-[#154230] text-[#154230] font-semibold rounded-lg hover:bg-[#154230]/5">
          View Profile
        </Link>
      </div>
    </div>
  );
}
