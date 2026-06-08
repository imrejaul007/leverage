'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Truck, Plane, Ship, Clock, DollarSign, MapPin, CheckCircle, X, Anchor, Globe } from 'lucide-react';

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
    <div className="space-y-4 relative overflow-hidden">
      {/* Background decorations - Ship/Port themed */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large Globe with Shipping Routes */}
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] animate-[spin_60s_linear_infinite]">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.06]">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#154230" strokeWidth="1" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#154230" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#154230" strokeWidth="0.5" transform="rotate(60 200 200)" />
            {/* Shipping route lines */}
            <path d="M80,280 Q200,100 320,220" fill="none" stroke="#A6824A" strokeWidth="0.5" strokeDasharray="4,2" />
            <path d="M100,100 Q250,200 340,120" fill="none" stroke="#A6824A" strokeWidth="0.5" strokeDasharray="4,2" />
          </svg>
        </div>

        {/* Port/Crane Silhouette */}
        <svg className="absolute left-0 bottom-0 w-[300px] h-[200px] opacity-[0.05]" viewBox="0 0 300 200">
          {/* Crane */}
          <rect x="20" y="40" width="8" height="140" fill="#154230" />
          <rect x="10" y="30" width="100" height="6" fill="#154230" />
          <rect x="100" y="30" width="4" height="80" fill="#154230" />
          <rect x="95" y="100" width="15" height="12" fill="#154230" />
          {/* Containers */}
          <rect x="130" y="120" width="35" height="25" fill="#A6824A" rx="2" />
          <rect x="130" y="90" width="35" height="25" fill="#A6824A" rx="2" />
          <rect x="130" y="60" width="35" height="25" fill="#A6824A" rx="2" />
          <rect x="170" y="105" width="35" height="25" fill="#154230" rx="2" />
          <rect x="170" y="75" width="35" height="25" fill="#154230" rx="2" />
          {/* Ship in water */}
          <path d="M220,150 L240,170 L290,170 L300,150 L290,140 L230,140 Z" fill="#A6824A" />
          {/* Water waves */}
          <path d="M210,175 Q230,165 250,175 T290,175" fill="none" stroke="#154230" strokeWidth="1" />
          <path d="M220,185 Q240,175 260,185 T300,185" fill="none" stroke="#154230" strokeWidth="1" />
        </svg>

        {/* Trade Route Lines */}
        <svg className="absolute top-20 left-0 w-[500px] h-[300px] opacity-[0.08]" viewBox="0 0 500 300">
          <path d="M20,250 Q150,100 350,200 Q420,240 480,180" fill="none" stroke="#A6824A" strokeWidth="1.5" strokeDasharray="8,4" />
          <path d="M50,50 Q200,180 400,100" fill="none" stroke="#154230" strokeWidth="1" strokeDasharray="4,4" />
          {/* Port markers */}
          <circle cx="20" cy="250" r="5" fill="#A6824A" className="animate-pulse" />
          <circle cx="480" cy="180" r="5" fill="#A6824A" className="animate-pulse" />
          <circle cx="50" cy="50" r="4" fill="#154230" className="animate-pulse" />
          <circle cx="400" cy="100" r="4" fill="#154230" className="animate-pulse" />
          {/* Animated ship marker */}
          <g>
            <path d="M0,0 L10,5 L0,10 L-5,5 Z" fill="#A6824A">
              <animateMotion dur="6s" repeatCount="indefinite" path="M20,250 Q150,100 350,200 Q420,240 480,180" />
            </path>
          </g>
        </svg>

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${3 + (i * 6)}%`,
              top: `${10 + (i % 7) * 12}%`,
              width: i % 3 === 0 ? '3px' : i % 3 === 1 ? '2px' : '4px',
              height: i % 3 === 0 ? '3px' : i % 3 === 1 ? '2px' : '4px',
              backgroundColor: i % 4 === 0 ? '#154230' : i % 4 === 1 ? '#A6824A' : i % 4 === 2 ? '#5D1E21' : '#154230',
              animation: `pulse ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.15 + (i % 4) * 0.08,
            }}
          />
        ))}

        {/* Wave Pattern */}
        <svg className="absolute bottom-0 left-0 right-0 h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,60 Q120,30 240,60 T480,60 T720,60 T960,60 T1200,60 T1440,60 L1440,100 L0,100 Z" fill="#154230" opacity="0.03" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Ship icon */}
          <div className="w-12 h-12 bg-[#154230] rounded-xl flex items-center justify-center shadow-lg">
            <Ship className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#101111]">Freight & Logistics</h1>
            <p className="text-[#4A4A4A] text-sm">Compare shipping rates from top carriers worldwide</p>
          </div>
        </div>
      </div>

      {/* Freight Stats Bar */}
      <div className="flex items-center gap-6 p-4 bg-white border border-black/5 rounded-xl overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <Ship className="w-5 h-5 text-[#154230]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">50+</p>
            <p className="text-[#4A4A4A] text-xs">Carriers</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#A6824A]/10 flex items-center justify-center">
            <Anchor className="w-5 h-5 text-[#A6824A]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">120+</p>
            <p className="text-[#4A4A4A] text-xs">Ports</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#5D1E21]/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#5D1E21]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">45</p>
            <p className="text-[#4A4A4A] text-xs">Countries</p>
          </div>
        </div>
        <div className="h-8 w-px bg-black/5" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#154230]/10 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-[#154230]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#101111]">$18M+</p>
            <p className="text-[#4A4A4A] text-xs">Saved</p>
          </div>
        </div>
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
