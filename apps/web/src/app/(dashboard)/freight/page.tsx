'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Truck, Plane, Ship, Clock, DollarSign, MapPin, CheckCircle, X } from 'lucide-react';

interface Quote {
  id: string;
  carrier: string;
  logo: string;
  type: string;
  transit: string;
  price: number;
  currency: string;
  rating: number;
}

const mockQuotes: Quote[] = [
  { id: '1', carrier: 'Maersk Line', logo: '🚢', type: 'Sea Freight', transit: '25-30 days', price: 2800, currency: 'USD', rating: 4.8 },
  { id: '2', carrier: 'MSC', logo: '🚢', type: 'Sea Freight', transit: '28-32 days', price: 2600, currency: 'USD', rating: 4.6 },
  { id: '3', carrier: 'COSCO', logo: '🚢', type: 'Sea Freight', transit: '30-35 days', price: 2400, currency: 'USD', rating: 4.5 },
  { id: '4', carrier: 'DHL Air', logo: '✈️', type: 'Air Freight', transit: '3-5 days', price: 8500, currency: 'USD', rating: 4.9 },
  { id: '5', carrier: 'FedEx Air', logo: '✈️', type: 'Air Freight', transit: '4-6 days', price: 9200, currency: 'USD', rating: 4.7 },
  { id: '6', carrier: 'Emirates SkyCargo', logo: '✈️', type: 'Air Freight', transit: '4-7 days', price: 7800, currency: 'USD', rating: 4.8 },
];

const popularRoutes = [
  { from: 'Shanghai', to: 'Los Angeles', seaPrice: 2800, airPrice: 9500 },
  { from: 'Shenzhen', to: 'Hamburg', seaPrice: 3200, airPrice: 11000 },
  { from: 'Hong Kong', to: 'Dubai', seaPrice: 1800, airPrice: 6500 },
  { from: 'Singapore', to: 'Mumbai', seaPrice: 1200, airPrice: 4800 },
];

export default function FreightPage() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [shippingType, setShippingType] = useState<'sea' | 'air'>('sea');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    containerType: '20ft',
    cargoType: '',
    shipperName: '',
    shipperAddress: '',
    consigneeName: '',
    consigneeAddress: '',
  });

  const handleGetQuote = () => {
    if (!origin || !destination) return;
    setIsLoading(true);
    setTimeout(() => {
      const filtered = mockQuotes.filter(q =>
        shippingType === 'air' ? q.type === 'Air Freight' : q.type === 'Sea Freight'
      );
      setQuotes(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const handleBook = () => {
    setShowBookingModal(false);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Freight Rates</h1>
        <p className="text-[#4A4A4A] text-sm">Compare shipping rates from top carriers</p>
      </div>

      {/* Quote Form */}
      <div className="bg-white border border-black/5 rounded-xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-[#101111] text-xs font-medium mb-1.5">Origin</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#4A4A4A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="City or Port"
                className="w-full h-11 pl-10 pr-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#101111] text-xs font-medium mb-1.5">Destination</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#4A4A4A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="City or Port"
                className="w-full h-11 pl-10 pr-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#101111] text-xs font-medium mb-1.5">Shipping Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setShippingType('sea')}
                className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-lg font-medium text-sm transition-colors ${
                  shippingType === 'sea'
                    ? 'bg-[#154230] text-white'
                    : 'bg-[#E6E2DA] text-[#101111]'
                }`}
              >
                <Ship className="w-4 h-4" />
                Sea
              </button>
              <button
                onClick={() => setShippingType('air')}
                className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-lg font-medium text-sm transition-colors ${
                  shippingType === 'air'
                    ? 'bg-[#154230] text-white'
                    : 'bg-[#E6E2DA] text-[#101111]'
                }`}
              >
                <Plane className="w-4 h-4" />
                Air
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleGetQuote}
          disabled={!origin || !destination || isLoading}
          className="w-full h-12 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Getting Quotes...' : 'Get Quotes'}
        </button>
      </div>

      {/* Success Message */}
      {bookingSuccess && (
        <div className="bg-[#154230] text-white p-4 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Booking confirmed! You will receive confirmation via email.</span>
        </div>
      )}

      {/* Quotes */}
      {quotes.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-[#101111] font-semibold text-sm">{quotes.length} quotes found</h2>
          {quotes.map(quote => (
            <div key={quote.id} className="bg-white border border-black/5 rounded-xl p-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E6E2DA] flex items-center justify-center text-2xl">
                  {quote.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[#101111] font-semibold text-sm">{quote.carrier}</h3>
                    <span className="flex items-center gap-1 text-[#A6824A] text-xs">
                      ★ {quote.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[#4A4A4A] text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {quote.transit}
                    </span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      {quote.type}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#101111]">${quote.price.toLocaleString()}</p>
                  <p className="text-[#4A4A4A] text-xs">per container</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedQuote(quote);
                    setShowBookingModal(true);
                  }}
                  className="px-4 py-2 bg-[#154230] text-white font-semibold rounded-lg text-sm hover:bg-[#1d5240] transition-colors"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popular Routes */}
      {quotes.length === 0 && (
        <div className="bg-white border border-black/5 rounded-xl p-4">
          <h2 className="text-[#101111] font-semibold text-sm mb-3">Popular Routes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {popularRoutes.map((route, i) => (
              <div key={i} className="p-3 bg-[#E6E2DA] rounded-lg">
                <div className="flex items-center gap-2 text-[#101111] text-sm font-medium">
                  <MapPin className="w-3 h-3 text-[#A6824A]" />
                  {route.from}
                  <span className="text-[#4A4A4A]">→</span>
                  {route.to}
                </div>
                <div className="flex gap-3 mt-2 text-xs">
                  <span className="flex items-center gap-1 text-[#4A4A4A]">
                    <Ship className="w-3 h-3" /> ${route.seaPrice}
                  </span>
                  <span className="flex items-center gap-1 text-[#4A4A4A]">
                    <Plane className="w-3 h-3" /> ${route.airPrice}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-white border border-black/5 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-black/5 flex items-center justify-between">
              <div>
                <h2 className="text-[#101111] font-semibold text-sm">Book with {selectedQuote.carrier}</h2>
                <p className="text-[#4A4A4A] text-xs">{selectedQuote.type} • {selectedQuote.transit}</p>
              </div>
              <button onClick={() => setShowBookingModal(false)} className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-[#101111] text-xs font-medium mb-1.5">Container Type</label>
                <select
                  value={bookingForm.containerType}
                  onChange={(e) => setBookingForm({ ...bookingForm, containerType: e.target.value })}
                  className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm"
                >
                  <option value="20ft">20ft Container</option>
                  <option value="40ft">40ft Container</option>
                  <option value="40hq">40ft High Cube</option>
                </select>
              </div>
              <div>
                <label className="block text-[#101111] text-xs font-medium mb-1.5">Shipper Name</label>
                <input
                  type="text"
                  value={bookingForm.shipperName}
                  onChange={(e) => setBookingForm({ ...bookingForm, shipperName: e.target.value })}
                  placeholder="Enter shipper name"
                  className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                />
              </div>
              <div>
                <label className="block text-[#101111] text-xs font-medium mb-1.5">Consignee Name</label>
                <input
                  type="text"
                  value={bookingForm.consigneeName}
                  onChange={(e) => setBookingForm({ ...bookingForm, consigneeName: e.target.value })}
                  placeholder="Enter consignee name"
                  className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                />
              </div>
              <div className="p-3 bg-[#E6E2DA] rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A4A4A]">Estimated Cost</span>
                  <span className="text-[#101111] font-semibold">${selectedQuote.price.toLocaleString()} {selectedQuote.currency}</span>
                </div>
              </div>
              <button
                onClick={handleBook}
                className="w-full h-12 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
