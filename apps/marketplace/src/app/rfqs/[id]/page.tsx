'use client';

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
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';

const rfqData = {
  id: 'RFQ-2024-001',
  title: 'Premium Basmati Rice 1121',
  description: 'Looking for 500 MT of premium basmati rice for our distribution network in the Middle East. We require extra long grain rice with aromatic properties, suitable for retail and food service channels. Quality certifications and lab reports are required.',
  buyer: 'Global Imports LLC',
  buyerId: 'buyer-001',
  product: 'Basmati Rice',
  quantity: '500',
  unit: 'MT',
  targetPrice: '$800',
  currency: 'USD',
  deliveryCountry: 'UAE',
  deadline: 'Jun 25, 2026',
  status: 'OPEN' as const,
  responseCount: 5,
  createdAt: '2026-06-10',
};

const quotes = [
  {
    id: 1,
    supplier: 'Global Trade Exports',
    price: 820,
    unit: 'MT',
    validity: 'Jul 1, 2026',
    message: 'We can supply premium 1121 Basmati rice at competitive rates with full documentation.',
    rating: 4.8,
  },
  {
    id: 2,
    supplier: 'India Premium Foods',
    price: 850,
    unit: 'MT',
    validity: 'Jun 30, 2026',
    message: 'Factory-direct pricing with door-to-door logistics included.',
    rating: 4.6,
  },
  {
    id: 3,
    supplier: 'Rice Masters Trading',
    price: 795,
    unit: 'MT',
    validity: 'Jul 5, 2026',
    message: 'Best quality available. Sample available on request.',
    rating: 4.9,
  },
];

export default function RFQDetailPage() {
  const params = useParams();
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

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header />

      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-[#4A4A4A] hover:text-[#154230]">Home</Link>
          <span className="text-[#4A4A4A]">/</span>
          <Link href="/rfqs" className="text-[#4A4A4A] hover:text-[#154230]">RFQs</Link>
          <span className="text-[#4A4A4A]">/</span>
          <span className="text-[#101111]">{rfqData.id}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* RFQ Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="success" className="mb-2">Open</Badge>
                  <h1 className="text-2xl font-bold text-[#101111]">{rfqData.title}</h1>
                  <p className="text-sm text-[#4A4A4A]">RFQ ID: {rfqData.id}</p>
                </div>
              </div>

              <p className="text-[#4A4A4A] mb-6">{rfqData.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#f7f5f1] rounded-xl p-4">
                  <Package className="w-5 h-5 text-[#154230] mb-2" />
                  <p className="text-xs text-[#4A4A4A]">Quantity</p>
                  <p className="font-bold">{rfqData.quantity} {rfqData.unit}</p>
                </div>
                <div className="bg-[#f7f5f1] rounded-xl p-4">
                  <span className="text-sm text-[#4A4A4A]">Target Price</span>
                  <p className="font-bold">{rfqData.targetPrice}</p>
                </div>
                <div className="bg-[#f7f5f1] rounded-xl p-4">
                  <MapPin className="w-5 h-5 text-[#154230] mb-2" />
                  <p className="text-xs text-[#4A4A4A]">Delivery</p>
                  <p className="font-bold">{rfqData.deliveryCountry}</p>
                </div>
                <div className="bg-[#f7f5f1] rounded-xl p-4">
                  <Calendar className="w-5 h-5 text-[#154230] mb-2" />
                  <p className="text-xs text-[#4A4A4A]">Deadline</p>
                  <p className="font-bold">{rfqData.deadline}</p>
                </div>
              </div>
            </motion.div>

            {/* Quotes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#101111]">
                  Supplier Quotes
                </h2>
                <Badge variant="accent">{rfqData.responseCount} quotes</Badge>
              </div>

              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="border border-black/5 rounded-xl p-4 hover:border-[#154230]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-[#101111]">{quote.supplier}</h3>
                        <p className="text-sm text-[#4A4A4A]">Rating: {quote.rating}/5</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#154230]">${quote.price}</p>
                        <p className="text-sm text-[#4A4A4A]">/{quote.unit}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#4A4A4A] mb-4">{quote.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#4A4A4A]">Valid until: {quote.validity}</span>
                      <Button size="sm" variant="ghost">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submit Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-[#101111] mb-4">Submit Your Quote</h2>

              <div className="space-y-4">
                <Input
                  label="Your Price"
                  type="number"
                  placeholder="e.g., 850"
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(e.target.value)}
                  hint="Price per unit (USD)"
                />
                <Textarea
                  label="Message (optional)"
                  placeholder="Describe your offering..."
                  rows={3}
                  value={quoteMessage}
                  onChange={(e) => setQuoteMessage(e.target.value)}
                />
                <Button className="w-full" onClick={handleSubmitQuote} leftIcon={<Send className="w-4 h-4" />}>
                  Submit Quote
                </Button>
              </div>
            </motion.div>

            {/* Buyer Info */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-semibold text-[#101111] mb-4">Buyer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#154230] rounded-full flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <div>
                    <p className="font-medium">{rfqData.buyer}</p>
                    <p className="text-sm text-[#4A4A4A]">Verified Buyer</p>
                  </div>
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
