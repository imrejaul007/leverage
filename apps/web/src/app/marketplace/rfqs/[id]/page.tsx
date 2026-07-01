'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import {
  Search,
  Phone,
  ShoppingCart,
  ArrowLeft,
  MapPin,
  Clock,
  CheckCircle,
  MessageSquare,
  FileText,
  User,
  Send,
} from 'lucide-react';

function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const rfqData = {
  id: 'rfq-001',
  title: 'Basmati Rice 1121 Steam',
  quantity: '500 MT',
  budget: '$4,50,000',
  location: 'Dubai, UAE',
  deadline: '15 days',
  responses: 12,
  category: 'Food & Agriculture',
  status: 'active',
  description: 'Looking for premium quality 1121 Steam Basmati Rice for export to UAE market. Need consistent quality supply for long-term partnership.',
  postedBy: 'UAE Trading Co.',
  postedOn: '2 days ago',
};

const quotes = [
  { id: 1, supplier: 'Global Trade Exports', rating: 4.8, price: '$4,20,000', validFor: '30 days', delivery: '15 days', message: 'We can supply premium quality 1121 Steam Basmati Rice as per your requirements. ISO certified facility.', date: '1 day ago' },
  { id: 2, supplier: 'India Rice exporters', rating: 4.6, price: '$4,35,000', validFor: '20 days', delivery: '20 days', message: 'Quality assurance guaranteed with APEDA certification.', date: '2 days ago' },
];

export default function RFQDetailPage() {
  const params = useParams();
  const [quoteMessage, setQuoteMessage] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-0">
      <Toaster position="top-right" />

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <Link href="/marketplace/rfqs" className="p-2 -ml-2 mr-2"><ArrowLeft className="w-5 h-5 text-gray-600" /></Link>
          <span className="font-medium text-gray-900 flex-1">RFQ Details</span>
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#154230]">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/marketplace/rfqs" className="text-gray-500 hover:text-[#154230]">RFQs</Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#154230]">{rfqData.title}</span>
        </div>

        {/* RFQ Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">{rfqData.category}</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Active</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{rfqData.title}</h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-gray-900">{rfqData.quantity}</p>
              <p className="text-sm text-gray-500">Quantity</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-gray-900">{rfqData.budget}</p>
              <p className="text-sm text-gray-500">Budget</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-gray-900">{rfqData.location}</p>
              <p className="text-sm text-gray-500">Delivery</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-gray-900">{rfqData.deadline}</p>
              <p className="text-sm text-gray-500">Deadline</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold text-gray-900 mb-2">Requirements</h3>
            <p className="text-gray-600">{rfqData.description}</p>
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><User className="w-4 h-4" />{rfqData.postedBy}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{rfqData.postedOn}</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button className="flex-1 py-3 bg-[#154230] hover:bg-[#1a5a3a] text-white font-bold rounded-lg">Submit Quote</button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
              <WhatsAppIcon className="w-5 h-5" />WhatsApp
            </button>
          </div>
        </div>

        {/* Quotes */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Supplier Quotes ({quotes.length})</h2>
          <div className="space-y-4">
            {quotes.map(quote => (
              <div key={quote.id} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{quote.supplier}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-amber-400">★★★★★</span>
                      <span>{quote.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">{quote.price}</p>
                    <p className="text-xs text-gray-500">Valid: {quote.validFor}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{quote.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Received {quote.date}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs border border-gray-200 rounded text-gray-600 hover:bg-gray-50">Message</button>
                    <button className="px-3 py-1.5 text-xs bg-[#154230] text-white rounded">Contact</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-2 z-40">
        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#154230] text-[#154230] font-bold rounded-lg"><WhatsAppIcon className="w-5 h-5" />WhatsApp</button>
        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#5D1E21] text-white font-bold rounded-lg">Submit Quote</button>
      </div>

      {/* Desktop Footer */}
      <footer className="hidden md:block bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} LEVERAGE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
