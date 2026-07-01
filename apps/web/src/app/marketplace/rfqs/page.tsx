'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import {
  Search,
  MapPin,
  Phone,
  Plus,
  ShoppingCart,
  Clock,
  CheckCircle,
  FileText,
  MessageSquare,
  Filter,
  ArrowRight,
} from 'lucide-react';

const rfqsData = [
  { id: 'rfq-001', title: 'Basmati Rice 1121 Steam', quantity: '500 MT', budget: '$4,50,000', location: 'Dubai, UAE', deadline: '15 days', responses: 12, category: 'Food & Agriculture', status: 'active' },
  { id: 'rfq-002', title: 'Copper Cathode 99.99%', quantity: '100 MT', budget: '$7,50,000', location: 'Mumbai, India', deadline: '7 days', responses: 8, category: 'Metals & Minerals', status: 'active' },
  { id: 'rfq-003', title: 'Cotton Yarn 40s Ne', quantity: '50,000 KG', budget: '$2,10,000', location: 'Surat, India', deadline: '30 days', responses: 5, category: 'Textiles', status: 'active' },
  { id: 'rfq-004', title: 'Solar Panels 550W', quantity: '10,000 units', budget: '$16,50,000', location: 'Riyadh, Saudi Arabia', deadline: '45 days', responses: 3, category: 'Energy', status: 'active' },
  { id: 'rfq-005', title: 'Olive Oil Extra Virgin', quantity: '20 MT', budget: '$90,000', location: 'London, UK', deadline: '20 days', responses: 15, category: 'Food & Agriculture', status: 'closed' },
  { id: 'rfq-006', title: 'Steel Billets IS 2062', quantity: '200 MT', budget: '$1,24,000', location: 'Singapore', deadline: '10 days', responses: 7, category: 'Metals & Minerals', status: 'active' },
  { id: 'rfq-007', title: 'Coffee Beans Arabica', quantity: '50 MT', budget: '$1,60,000', location: 'Hamburg, Germany', deadline: '25 days', responses: 4, category: 'Food & Agriculture', status: 'active' },
  { id: 'rfq-008', title: 'Cotton Fabric Grey', quantity: '100,000 meters', budget: '$80,000', location: 'Jakarta, Indonesia', deadline: '30 days', responses: 9, category: 'Textiles', status: 'active' },
];

const categories = ['All', 'Food & Agriculture', 'Textiles', 'Metals & Minerals', 'Energy', 'Chemicals'];

export default function RFQsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRFQs = rfqsData.filter(rfq => {
    if (selectedCategory !== 'All' && rfq.category !== selectedCategory) return false;
    if (searchQuery && !rfq.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
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
              <input type="text" placeholder="Search RFQs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-9 pl-10 pr-4 bg-gray-100 rounded-lg text-sm" />
            </div>
          </div>
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
              <input type="text" placeholder="Search RFQs..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-12 pl-12 pr-4 bg-white rounded-xl text-gray-900" />
            </div>
            <div className="flex items-center gap-4">
              <Link href="/marketplace/login" className="px-5 py-2.5 bg-white/10 rounded-lg text-white">Sign In</Link>
              <Link href="/marketplace/rfqs/new" className="px-5 py-2.5 bg-[#5D1E21] rounded-lg text-white flex items-center gap-2"><Plus className="w-4 h-4" />Post RFQ</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-4 text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Request for Quotes</h1>
          <p className="text-white/80">Post your requirements and get quotes from verified suppliers</p>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#154230]">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#154230] font-medium">RFQs</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedCategory === cat ? 'bg-[#154230] text-white' : 'bg-gray-100 text-gray-600'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">{filteredRFQs.length} RFQs found</span>
        </div>

        {/* RFQ Cards */}
        <div className="space-y-4">
          {filteredRFQs.map(rfq => (
            <RFQCard key={rfq.id} rfq={rfq} />
          ))}
        </div>

        {filteredRFQs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No RFQs found</p>
            <Link href="/marketplace/rfqs/new" className="mt-4 inline-block text-[#154230] font-medium">Post your first RFQ</Link>
          </div>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2 z-40">
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

function RFQCard({ rfq }: { rfq: typeof rfqsData[0] }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">{rfq.category}</span>
              {rfq.status === 'closed' && <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">Closed</span>}
            </div>
            <Link href={`/marketplace/rfqs/${rfq.id}`} className="text-lg font-bold text-gray-900 hover:text-[#154230]">{rfq.title}</Link>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1"><FileText className="w-4 h-4" />{rfq.quantity}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{rfq.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{rfq.deadline}</span>
            </div>
          </div>
          <div className="text-right ml-4">
            <p className="text-lg font-bold text-gray-900">{rfq.budget}</p>
            <p className="text-xs text-gray-500">Budget</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" />{rfq.responses} quotes</span>
        </div>
        <Link href={`/marketplace/rfqs/${rfq.id}`} className="flex items-center gap-1 text-[#154230] font-medium text-sm hover:underline">
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
