'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Package,
  Users,
  Clock,
  CheckCircle,
  MessageSquare,
  Send,
  Star,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';
import { getRFQ } from '@/data/rfqs';

// Sample quotes data
const sampleQuotes = [
  {
    id: 1,
    supplier: 'Global Trade Exports',
    price: 820,
    unit: 'MT',
    validity: 'Jul 1, 2026',
    message: 'We can supply premium 1121 Basmati rice at competitive rates with full documentation.',
    rating: 4.8,
    verified: true,
  },
  {
    id: 2,
    supplier: 'India Premium Foods',
    price: 850,
    unit: 'MT',
    validity: 'Jun 30, 2026',
    message: 'Factory-direct pricing with door-to-door logistics included.',
    rating: 4.6,
    verified: true,
  },
  {
    id: 3,
    supplier: 'Rice Masters Trading',
    price: 795,
    unit: 'MT',
    validity: 'Jul 5, 2026',
    message: 'Best quality available. Sample available on request.',
    rating: 4.9,
    verified: false,
  },
];

const statusColors: Record<string, string> = {
  OPEN: 'bg-emerald-100 text-emerald-700',
  IN_REVIEW: 'bg-amber-100 text-amber-700',
  CLOSED: 'bg-gray-100 text-gray-600',
  AWARDED: 'bg-blue-100 text-blue-700',
};

const statusLabels: Record<string, string> = {
  OPEN: 'Open',
  IN_REVIEW: 'In Review',
  CLOSED: 'Closed',
  AWARDED: 'Awarded',
};

export default function RFQDetailPage() {
  const params = useParams();
  const rfqId = params.id as string;
  const rfq = getRFQ(rfqId);
  const { showToast } = useToast();
  const [quoteMessage, setQuoteMessage] = useState('');
  const [quotePrice, setQuotePrice] = useState('');

  const handleSubmitQuote = () => {
    if (!quotePrice) {
      showToast('Please enter your quote price', 'error');
      return;
    }
    showToast('Quote submitted successfully!', 'success');
    setQuoteMessage('');
    setQuotePrice('');
  };

  if (!rfq) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">RFQ Not Found</h1>
          <p className="text-gray-500 mb-8">The RFQ you're looking for doesn't exist.</p>
          <Link href="/rfqs">
            <Button>Browse RFQs</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isExpired = new Date(rfq.deadline) < new Date();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6 text-gray-500">
          <Link href="/" className="hover:text-[#154230]">Home</Link>
          <span>/</span>
          <Link href="/rfqs" className="hover:text-[#154230]">RFQs</Link>
          <span>/</span>
          <span className="text-gray-900">{rfq.id}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* RFQ Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${statusColors[rfq.status]}`}>
                    {statusLabels[rfq.status]}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900 mt-2">{rfq.title}</h1>
                  <p className="text-sm text-gray-500">RFQ ID: {rfq.id}</p>
                </div>
                {isExpired && (
                  <Badge variant="error">Expired</Badge>
                )}
              </div>

              <p className="text-gray-600 mb-6">{rfq.description}</p>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <Package className="w-5 h-5 text-[#154230] mb-2" />
                  <p className="text-xs text-gray-500">Quantity</p>
                  <p className="font-bold text-gray-900">{rfq.quantity} {rfq.unit}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm text-gray-500">Target Price</span>
                  <p className="font-bold text-gray-900">{rfq.targetPrice || 'Negotiable'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <MapPin className="w-5 h-5 text-[#154230] mb-2" />
                  <p className="text-xs text-gray-500">Delivery</p>
                  <p className="font-bold text-gray-900">{rfq.deliveryCountry}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <Calendar className="w-5 h-5 text-[#154230] mb-2" />
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className={`font-bold ${isExpired ? 'text-red-500' : 'text-gray-900'}`}>{rfq.deadline}</p>
                </div>
              </div>

              {/* Additional Details */}
              {rfq.specifications && rfq.specifications.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-medium text-gray-900 mb-3">Specifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {rfq.specifications.map((spec, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Quotes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Supplier Quotes
                </h2>
                <Badge variant="accent">{rfq.responseCount} quotes</Badge>
              </div>

              <div className="space-y-4">
                {sampleQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-[#154230]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#154230] rounded-full flex items-center justify-center text-white font-bold">
                          {quote.supplier.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{quote.supplier}</h3>
                            {quote.verified && (
                              <CheckCircle className="w-4 h-4 text-[#154230]" />
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{quote.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${quote.price}</p>
                        <p className="text-sm text-gray-500">/{quote.unit}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{quote.message}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Valid until: {quote.validity}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Submit Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Submit Your Quote</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Price (USD)</label>
                  <input
                    type="number"
                    placeholder="e.g., 850"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154230]/20 focus:border-[#154230]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                  <textarea
                    placeholder="Describe your offering..."
                    rows={3}
                    value={quoteMessage}
                    onChange={(e) => setQuoteMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#154230]/20 focus:border-[#154230] resize-none"
                  />
                </div>
                <Button className="w-full" onClick={handleSubmitQuote} leftIcon={<Send className="w-4 h-4" />}>
                  Submit Quote
                </Button>
              </div>
            </motion.div>

            {/* Buyer Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Buyer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#154230] rounded-full flex items-center justify-center text-white font-bold">
                    {rfq.buyer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{rfq.buyer}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-[#154230]" />
                      Verified Buyer
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">Posted on {rfq.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
