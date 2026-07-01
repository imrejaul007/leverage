'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import {
  Plane,
  Ship,
  Truck,
  ArrowRight,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Clock,
  Package,
  MapPin,
  Filter,
  Star,
  Check,
  Loader2,
  Shield,
  Zap,
  DollarSign,
  BarChart3,
  Info,
  RefreshCw,
  Heart,
  X,
  Scale,
} from 'lucide-react';
import { freightApi, FreightQuote, FreightQuoteRequest, Carrier } from '@/lib/api';

type TransportMode = 'AIR' | 'OCEAN' | 'LAND';
type SortOption = 'price' | 'transit' | 'rating';
type ViewMode = 'cards' | 'table';

const transportModes: { mode: TransportMode; icon: typeof Plane; label: string; desc: string; bgColor: string }[] = [
  { mode: 'AIR', icon: Plane, label: 'Air', desc: '3-7 days', bgColor: 'bg-blue-500' },
  { mode: 'OCEAN', icon: Ship, label: 'Ocean', desc: '14-45 days', bgColor: 'bg-teal-500' },
  { mode: 'LAND', icon: Truck, label: 'Land', desc: '5-21 days', bgColor: 'bg-orange-500' },
];

const countries = [
  { code: 'CN', name: 'China', cities: ['Shanghai', 'Shenzhen', 'Guangzhou', 'Beijing'] },
  { code: 'US', name: 'United States', cities: ['Los Angeles', 'New York', 'Houston', 'Seattle'] },
  { code: 'DE', name: 'Germany', cities: ['Hamburg', 'Frankfurt', 'Munich'] },
  { code: 'JP', name: 'Japan', cities: ['Tokyo', 'Osaka', 'Yokohama'] },
  { code: 'GB', name: 'United Kingdom', cities: ['London', 'Liverpool', 'Felixstowe'] },
  { code: 'IN', name: 'India', cities: ['Mumbai', 'Chennai', 'Delhi'] },
  { code: 'NL', name: 'Netherlands', cities: ['Rotterdam', 'Amsterdam'] },
  { code: 'SG', name: 'Singapore', cities: ['Singapore'] },
  { code: 'AE', name: 'UAE', cities: ['Dubai', 'Abu Dhabi'] },
  { code: 'KR', name: 'South Korea', cities: ['Busan', 'Seoul'] },
];

export default function QuotesPage() {
  const [selectedMode, setSelectedMode] = useState<TransportMode>('AIR');
  const [quotes, setQuotes] = useState<FreightQuote[]>([]);
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [bookingLoading, setBookingLoading] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  // Filters
  const [sortBy, setSortBy] = useState<SortOption>('price');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [maxTransitDays, setMaxTransitDays] = useState<number>(60);
  const [selectedCarriers, setSelectedCarriers] = useState<Set<string>>(new Set());
  const [minRating, setMinRating] = useState<number>(0);

  // Search form
  const [originCode, setOriginCode] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [destCode, setDestCode] = useState('');
  const [destCity, setDestCity] = useState('');
  const [weight, setWeight] = useState('100');

  const selectedOriginCountry = countries.find(c => c.code === originCode);
  const selectedDestCountry = countries.find(c => c.code === destCode);

  useEffect(() => {
    loadCarriers();
  }, []);

  const loadCarriers = async () => {
    try {
      const data = await freightApi.getCarriers();
      setCarriers(data);
    } catch (error) {
      console.error('Failed to load carriers:', error);
    }
  };

  const handleSearch = async () => {
    if (!originCode || !destCode || !weight) return;

    setLoading(true);
    setSearched(true);
    setExpandedQuote(null);
    setBookingSuccess(null);

    try {
      const request: FreightQuoteRequest = {
        origin: {
          country: countries.find(c => c.code === originCode)?.name || originCode,
          city: originCity || selectedOriginCountry?.cities[0] || ''
        },
        destination: {
          country: countries.find(c => c.code === destCode)?.name || destCode,
          city: destCity || selectedDestCountry?.cities[0] || ''
        },
        cargoDetails: { weight: parseFloat(weight) },
        transportMode: selectedMode,
      };

      const response = await freightApi.getQuotes(request);
      setQuotes(response.rates);

      if (response.rates.length > 0) {
        const prices = response.rates.map(q => q.totalRate);
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
      }
    } catch (error) {
      console.error('Failed to get quotes:', error);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (quote: FreightQuote) => {
    setBookingLoading(quote.quoteId);
    try {
      const booking = await freightApi.bookQuote(quote.quoteId);
      setBookingSuccess(booking.bookingReference);
      setTimeout(() => setBookingSuccess(null), 5000);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setBookingLoading(null);
    }
  };

  const toggleFavorite = (quoteId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(quoteId)) next.delete(quoteId);
      else next.add(quoteId);
      return next;
    });
  };

  const toggleCarrier = (carrierId: string) => {
    setSelectedCarriers(prev => {
      const next = new Set(prev);
      if (next.has(carrierId)) next.delete(carrierId);
      else next.add(carrierId);
      return next;
    });
  };

  const filteredQuotes = quotes
    .filter(q => q.totalRate >= priceRange[0] && q.totalRate <= priceRange[1])
    .filter(q => q.transitDays <= maxTransitDays)
    .filter(q => selectedCarriers.size === 0 || selectedCarriers.has(q.carrierId))
    .filter(q => {
      const carrier = carriers.find(c => c.id === q.carrierId);
      return (carrier?.rating || 4) >= minRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return a.totalRate - b.totalRate;
        case 'transit': return a.transitDays - b.transitDays;
        case 'rating': {
          const carrierA = carriers.find(c => c.id === a.carrierId);
          const carrierB = carriers.find(c => c.id === b.carrierId);
          return (carrierB?.rating || 0) - (carrierA?.rating || 0);
        }
        default: return 0;
      }
    });

  const avgPrice = filteredQuotes.length > 0
    ? filteredQuotes.reduce((a, b) => a + b.totalRate, 0) / filteredQuotes.length
    : 0;

  const getBestValue = () => {
    if (filteredQuotes.length === 0) return null;
    // Best value = lowest price with reasonable transit time
    return filteredQuotes.reduce((best, q) => {
      const bestScore = (1 / best.totalRate) * (1 / best.transitDays);
      const qScore = (1 / q.totalRate) * (1 / q.transitDays);
      return qScore > bestScore ? q : best;
    });
  };

  const bestValue = getBestValue();

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Compare Rates" subtitle="Find the best freight deals" backHref="/freight" />

      <div className="px-4 -mt-6 space-y-4">
        {/* Search Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          {/* Transport Mode Tabs */}
          <div className="flex gap-2 mb-4">
            {transportModes.map(({ mode, icon: Icon, label, bgColor }) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                  selectedMode === mode
                    ? `${bgColor} text-white shadow-lg`
                    : 'bg-[#E6E2DA] text-[#4A4A4A]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Route Selection */}
          <div className="relative mb-4">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-10 h-10 bg-[#154230] text-white rounded-full flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#4A4A4A] mb-1">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  From
                </label>
                <select
                  value={originCode}
                  onChange={(e) => { setOriginCode(e.target.value); setOriginCity(''); }}
                  className="w-full px-3 py-2.5 bg-[#E6E2DA] rounded-xl text-[#101111] text-sm focus:ring-2 focus:ring-[#154230] outline-none"
                >
                  <option value="">Country</option>
                  {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
                {selectedOriginCountry && (
                  <select
                    value={originCity}
                    onChange={(e) => setOriginCity(e.target.value)}
                    className="w-full px-3 py-2.5 mt-2 bg-[#E6E2DA] rounded-xl text-[#101111] text-sm focus:ring-2 focus:ring-[#154230] outline-none"
                  >
                    <option value="">Port/City</option>
                    {selectedOriginCountry.cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4A4A4A] mb-1">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  To
                </label>
                <select
                  value={destCode}
                  onChange={(e) => { setDestCode(e.target.value); setDestCity(''); }}
                  className="w-full px-3 py-2.5 bg-[#E6E2DA] rounded-xl text-[#101111] text-sm focus:ring-2 focus:ring-[#154230] outline-none"
                >
                  <option value="">Country</option>
                  {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
                {selectedDestCountry && (
                  <select
                    value={destCity}
                    onChange={(e) => setDestCity(e.target.value)}
                    className="w-full px-3 py-2.5 mt-2 bg-[#E6E2DA] rounded-xl text-[#101111] text-sm focus:ring-2 focus:ring-[#154230] outline-none"
                  >
                    <option value="">Port/City</option>
                    {selectedDestCountry.cities.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Weight Input */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-[#4A4A4A] mb-1">
                <Package className="w-3 h-3 inline mr-1" />
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 100"
                className="w-full px-3 py-2.5 bg-[#E6E2DA] rounded-xl text-[#101111] text-sm focus:ring-2 focus:ring-[#154230] outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading || !originCode || !destCode || !weight}
                className="w-full h-11 bg-[#A6824A] hover:bg-[#8a6a3a] disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {searched && !loading && filteredQuotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-3 gap-2"
          >
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <DollarSign className="w-5 h-5 mx-auto mb-1 text-[#154230]" />
              <p className="text-lg font-bold text-[#101111]">${Math.min(...filteredQuotes.map(q => q.totalRate)).toLocaleString()}</p>
              <p className="text-xs text-[#4A4A4A]">Best Price</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <Clock className="w-5 h-5 mx-auto mb-1 text-[#A6824A]" />
              <p className="text-lg font-bold text-[#101111]">{Math.min(...filteredQuotes.map(q => q.transitDays))}d</p>
              <p className="text-xs text-[#4A4A4A]">Fastest</p>
            </div>
            <div className="bg-white rounded-xl p-3 text-center shadow-sm">
              <BarChart3 className="w-5 h-5 mx-auto mb-1 text-[#5D1E21]" />
              <p className="text-lg font-bold text-[#101111]">{filteredQuotes.length}</p>
              <p className="text-xs text-[#4A4A4A]">Options</p>
            </div>
          </motion.div>
        )}

        {/* Sort & Filter Bar */}
        {searched && !loading && filteredQuotes.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(['price', 'transit', 'rating'] as SortOption[]).map(option => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  sortBy === option
                    ? 'bg-[#154230] text-white'
                    : 'bg-white text-[#4A4A4A]'
                }`}
              >
                {option === 'price' && '$ Price'}
                {option === 'transit' && '⏱ Transit'}
                {option === 'rating' && '★ Rating'}
              </button>
            ))}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`ml-auto px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
                showFilters ? 'bg-[#154230] text-white' : 'bg-white text-[#4A4A4A]'
              }`}
            >
              <Filter className="w-3 h-3" />
              Filters
              {selectedCarriers.size > 0 && (
                <span className="w-4 h-4 bg-[#A6824A] text-white text-[10px] rounded-full flex items-center justify-center">
                  {selectedCarriers.size}
                </span>
              )}
            </button>

            <div className="flex items-center bg-white rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 ${viewMode === 'cards' ? 'bg-[#154230] text-white' : 'text-[#4A4A4A]'}`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 ${viewMode === 'table' ? 'bg-[#154230] text-white' : 'text-[#4A4A4A]'}`}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl p-4 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#101111]">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-1">
                  <X className="w-5 h-5 text-[#4A4A4A]" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex justify-between text-sm text-[#4A4A4A] mb-2">
                    <span>Max Price: ${priceRange[1]}</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-[#154230]"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-[#4A4A4A] mb-2">
                    <span>Max Transit: {maxTransitDays} days</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={maxTransitDays}
                    onChange={(e) => setMaxTransitDays(parseInt(e.target.value))}
                    className="w-full accent-[#154230]"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-[#4A4A4A] mb-2">
                    <span>Min Rating: {minRating}+</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className="w-full accent-[#154230]"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#4A4A4A] mb-2">Carriers</label>
                  <div className="flex flex-wrap gap-2">
                    {carriers.map(carrier => (
                      <button
                        key={carrier.id}
                        onClick={() => toggleCarrier(carrier.id)}
                        className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                          selectedCarriers.has(carrier.id)
                            ? 'bg-[#154230] text-white'
                            : 'bg-[#E6E2DA] text-[#4A4A4A]'
                        }`}
                      >
                        {carrier.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setMaxTransitDays(60);
                    setMinRating(0);
                    setSelectedCarriers(new Set());
                  }}
                  className="w-full py-2 text-sm text-[#154230] border border-[#154230] rounded-lg"
                >
                  Reset All
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 text-[#154230] animate-spin mx-auto mb-4" />
            <p className="text-[#4A4A4A]">Comparing {carriers.length} carriers...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && searched && filteredQuotes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#101111] mb-2">No quotes found</h3>
            <p className="text-[#4A4A4A]">Try adjusting your filters or search criteria.</p>
          </div>
        )}

        {/* Cards View */}
        {!loading && filteredQuotes.length > 0 && viewMode === 'cards' && (
          <div className="space-y-3">
            {filteredQuotes.map((quote, index) => {
              const carrier = carriers.find(c => c.id === quote.carrierId);
              const isBestValue = bestValue?.quoteId === quote.quoteId;

              return (
                <motion.div
                  key={quote.quoteId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-2xl shadow-sm overflow-hidden ${
                    isBestValue ? 'ring-2 ring-[#A6824A]' : ''
                  }`}
                >
                  {isBestValue && (
                    <div className="bg-[#A6824A] text-white text-xs font-bold px-4 py-1 flex items-center gap-2">
                      <Scale className="w-3 h-3" />
                      BEST VALUE - Best price/transit ratio
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white ${
                        selectedMode === 'AIR' ? 'bg-blue-500' :
                        selectedMode === 'OCEAN' ? 'bg-teal-500' : 'bg-orange-500'
                      }`}>
                        {quote.carrierCode.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[#101111]">{quote.carrierName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-1 text-xs text-[#4A4A4A]">
                            <Star className="w-3 h-3 text-[#A6824A] fill-[#A6824A]" />
                            {(carrier?.rating || 4).toFixed(1)}
                          </span>
                          <span className="px-2 py-0.5 bg-[#E6E2DA] rounded text-xs text-[#4A4A4A]">
                            {quote.serviceType}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#154230]">
                          ${quote.totalRate.toLocaleString()}
                        </p>
                        <p className="text-xs text-[#4A4A4A]">/ {weight}kg</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <span className="flex items-center gap-1 text-[#4A4A4A]">
                        <MapPin className="w-4 h-4" />
                        {quote.originCharges > 0 ? 'Door-to-door' : 'Port-to-port'}
                      </span>
                      <span className="flex items-center gap-1 text-[#A6824A]">
                        <Clock className="w-4 h-4" />
                        {quote.transitDays} days
                      </span>
                      <span className="text-[#4A4A4A]">
                        ETA: {new Date(quote.estimatedArrival).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Price Comparison Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-[#4A4A4A] mb-1">
                        <span>vs. avg ${avgPrice.toFixed(0)}</span>
                        <span className={quote.totalRate < avgPrice ? 'text-green-600' : 'text-red-600'}>
                          {quote.totalRate < avgPrice ? '-' : '+'}
                          {Math.abs(Math.round((quote.totalRate / avgPrice - 1) * 100))}%
                        </span>
                      </div>
                      <div className="h-2 bg-[#E6E2DA] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            quote.totalRate < avgPrice ? 'bg-green-500' : 'bg-red-400'
                          }`}
                          style={{ width: `${Math.min((quote.totalRate / Math.max(...filteredQuotes.map(q => q.totalRate))) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(quote.quoteId)}
                        className={`p-2.5 rounded-xl transition-colors ${
                          favorites.has(quote.quoteId)
                            ? 'bg-red-50 text-red-500'
                            : 'bg-[#E6E2DA] text-[#4A4A4A]'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.has(quote.quoteId) ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => setExpandedQuote(expandedQuote === quote.quoteId ? null : quote.quoteId)}
                        className="p-2.5 bg-[#E6E2DA] text-[#4A4A4A] rounded-xl transition-colors"
                      >
                        {expandedQuote === quote.quoteId ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>

                      <button
                        onClick={() => handleBook(quote)}
                        disabled={bookingLoading !== null}
                        className="flex-1 py-3 bg-[#154230] hover:bg-[#1d5240] disabled:bg-gray-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        {bookingLoading === quote.quoteId ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : bookingSuccess ? (
                          <><Check className="w-4 h-4" /> Booked!</>
                        ) : (
                          <>Book Now <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>

                    {/* Booking Success */}
                    {bookingSuccess && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"
                      >
                        Booking confirmed! Ref: {bookingSuccess}
                      </motion.div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedQuote === quote.quoteId && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="border-t border-black/5 overflow-hidden"
                      >
                        <div className="p-4 bg-[#f7f5f1]">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Price Breakdown */}
                            <div>
                              <h4 className="font-semibold text-[#101111] text-sm mb-2">Price Breakdown</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-[#4A4A4A]">Base</span>
                                  <span>${quote.baseRate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#4A4A4A]">Fuel</span>
                                  <span>${quote.fuelSurcharge}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#4A4A4A]">Origin</span>
                                  <span>${quote.originCharges}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-[#4A4A4A]">Dest</span>
                                  <span>${quote.destCharges}</span>
                                </div>
                              </div>
                            </div>

                            {/* Timeline */}
                            <div>
                              <h4 className="font-semibold text-[#101111] text-sm mb-2">Timeline</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-[#154230] rounded-full" />
                                  <span>{new Date(quote.estimatedDeparture).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-[#A6824A] rounded-full" />
                                  <span>{quote.transitDays} days transit</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-[#5D1E21] rounded-full" />
                                  <span>{new Date(quote.estimatedArrival).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Included Services */}
                          <div className="mt-4 pt-4 border-t border-black/10">
                            <h4 className="font-semibold text-[#101111] text-sm mb-2 flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              Included Services
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {['Real-time tracking', 'Customs clearance', 'Insurance up to $5K', 'Delivery confirmation'].map((service, i) => (
                                <div key={i} className="flex items-center gap-1 text-xs text-[#4A4A4A]">
                                  <Check className="w-3 h-3 text-[#154230]" />
                                  {service}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Table View */}
        {!loading && filteredQuotes.length > 0 && viewMode === 'table' && (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f7f5f1]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#4A4A4A]">Carrier</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#4A4A4A]">Type</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#4A4A4A]">Transit</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#4A4A4A]">Price</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#4A4A4A]">vs Avg</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-[#4A4A4A]"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((quote, index) => {
                    const carrier = carriers.find(c => c.id === quote.carrierId);
                    return (
                      <tr key={quote.quoteId} className={`border-t border-black/5 ${index === 0 ? 'bg-[#A6824A]/5' : ''}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white ${
                              selectedMode === 'AIR' ? 'bg-blue-500' :
                              selectedMode === 'OCEAN' ? 'bg-teal-500' : 'bg-orange-500'
                            }`}>
                              {quote.carrierCode.slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-medium text-[#101111] text-sm">{quote.carrierName}</p>
                              <p className="text-xs text-[#4A4A4A] flex items-center gap-1">
                                <Star className="w-3 h-3 text-[#A6824A] fill-[#A6824A]" />
                                {(carrier?.rating || 4).toFixed(1)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-[#4A4A4A]">{quote.serviceType}</td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-sm font-medium text-[#A6824A]">{quote.transitDays}d</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-lg font-bold text-[#154230]">${quote.totalRate.toLocaleString()}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={`text-sm font-medium ${quote.totalRate < avgPrice ? 'text-green-600' : 'text-red-600'}`}>
                            {quote.totalRate < avgPrice ? '-' : '+'}
                            {Math.abs(Math.round((quote.totalRate / avgPrice - 1) * 100))}%
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => toggleFavorite(quote.quoteId)}
                              className="p-1.5 rounded-lg hover:bg-[#E6E2DA]"
                            >
                              <Heart className={`w-4 h-4 ${favorites.has(quote.quoteId) ? 'text-red-500 fill-current' : 'text-[#4A4A4A]'}`} />
                            </button>
                            <button
                              onClick={() => handleBook(quote)}
                              disabled={bookingLoading !== null}
                              className="px-3 py-1.5 bg-[#154230] text-white text-xs font-semibold rounded-lg"
                            >
                              Book
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Initial Empty State */}
        {!loading && !searched && (
          <div className="text-center py-16">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#101111] mb-2">Compare Freight Rates</h3>
            <p className="text-[#4A4A4A]">Enter your route and weight above to compare rates from top carriers.</p>
          </div>
        )}
      </div>

      <BottomNav activeItem="freight" />
    </div>
  );
}
