'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import {
  Plane,
  Ship,
  Truck,
  Train,
  Package,
  MapPin,
  ArrowRight,
  ArrowUpDown,
  Clock,
  DollarSign,
  Star,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Filter,
  Heart,
  Loader2,
  Shield,
  Zap,
  Globe,
  Calendar,
  Package2,
  Scale,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Bookmark,
  Share2,
  Info,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Timer,
  Anchor,
  Move,
  Sparkles,
} from 'lucide-react';
import { freightApi, FreightQuote, Carrier } from '@/lib/api';

// Demo data - shows sample quotes when page loads
const DEMO_QUOTES: FreightQuote[] = [
  {
    quoteId: 'QT-AIR-001',
    carrierId: 'MAERSK',
    carrierCode: 'MA',
    carrierName: 'Maersk Air',
    serviceType: 'Express Air',
    originPort: 'PVG',
    destinationPort: 'LAX',
    transitDays: 5,
    baseRate: 2800,
    fuelSurcharge: 420,
    originCharges: 180,
    destCharges: 150,
    totalRate: 3550,
    currency: 'USD',
    estimatedDeparture: new Date(Date.now() + 86400000 * 2).toISOString(),
    estimatedArrival: new Date(Date.now() + 86400000 * 7).toISOString(),
    inclusions: ['Real-time Tracking', 'Customs Clearance', 'Insurance up to $10K'],
    validUntil: new Date(Date.now() + 86400000 * 7).toISOString(),
  },
  {
    quoteId: 'QT-AIR-002',
    carrierId: 'HAPAG',
    carrierCode: 'HPL',
    carrierName: 'Hapag-Lloyd Air',
    serviceType: 'Standard Air',
    originPort: 'PVG',
    destinationPort: 'LAX',
    transitDays: 7,
    baseRate: 2400,
    fuelSurcharge: 380,
    originCharges: 120,
    destCharges: 100,
    totalRate: 3000,
    currency: 'USD',
    estimatedDeparture: new Date(Date.now() + 86400000 * 3).toISOString(),
    estimatedArrival: new Date(Date.now() + 86400000 * 10).toISOString(),
    inclusions: ['Real-time Tracking', 'Basic Insurance'],
    validUntil: new Date(Date.now() + 86400000 * 14).toISOString(),
  },
  {
    quoteId: 'QT-AIR-003',
    carrierId: 'EMIRATES',
    carrierCode: 'EK',
    carrierName: 'Emirates SkyCargo',
    serviceType: 'Priority Air',
    originPort: 'PVG',
    destinationPort: 'JFK',
    transitDays: 4,
    baseRate: 3200,
    fuelSurcharge: 550,
    originCharges: 200,
    destCharges: 175,
    totalRate: 4125,
    currency: 'USD',
    estimatedDeparture: new Date(Date.now() + 86400000 * 1).toISOString(),
    estimatedArrival: new Date(Date.now() + 86400000 * 5).toISOString(),
    inclusions: ['Real-time Tracking', 'Customs Clearance', 'Insurance up to $25K', 'Priority Handling'],
    validUntil: new Date(Date.now() + 86400000 * 3).toISOString(),
  },
  {
    quoteId: 'QT-AIR-004',
    carrierId: 'SINOTRANS',
    carrierCode: 'ST',
    carrierName: 'SinoTrans Air',
    serviceType: 'Economy Air',
    originPort: 'CAN',
    destinationPort: 'LAX',
    transitDays: 10,
    baseRate: 1800,
    fuelSurcharge: 280,
    originCharges: 80,
    destCharges: 70,
    totalRate: 2230,
    currency: 'USD',
    estimatedDeparture: new Date(Date.now() + 86400000 * 5).toISOString(),
    estimatedArrival: new Date(Date.now() + 86400000 * 15).toISOString(),
    inclusions: ['Basic Tracking'],
    validUntil: new Date(Date.now() + 86400000 * 21).toISOString(),
  },
  {
    quoteId: 'QT-AIR-005',
    carrierId: 'CHINAAIR',
    carrierCode: 'CA',
    carrierName: 'Air China Cargo',
    serviceType: 'Standard Air',
    originPort: 'PEK',
    destinationPort: 'ORD',
    transitDays: 8,
    baseRate: 2100,
    fuelSurcharge: 340,
    originCharges: 100,
    destCharges: 90,
    totalRate: 2630,
    currency: 'USD',
    estimatedDeparture: new Date(Date.now() + 86400000 * 4).toISOString(),
    estimatedArrival: new Date(Date.now() + 86400000 * 12).toISOString(),
    inclusions: ['Real-time Tracking', 'Customs Clearance'],
    validUntil: new Date(Date.now() + 86400000 * 10).toISOString(),
  },
];

const DEMO_CARRIERS: Carrier[] = [
  { id: 'MAERSK', code: 'MA', name: 'Maersk Air', types: ['Ocean', 'Air'], rating: 4.8, isActive: true, headquarters: 'Denmark', established: 1904, description: 'Leading global container logistics company', services: ['Ocean', 'Air', 'Land'], certifications: ['ISO 9001', 'AEO'] },
  { id: 'HAPAG', code: 'HPL', name: 'Hapag-Lloyd Air', types: ['Ocean', 'Air'], rating: 4.6, isActive: true, headquarters: 'Germany', established: 1847, description: 'German global transport company', services: ['Ocean', 'Air'], certifications: ['ISO 9001'] },
  { id: 'EMIRATES', code: 'EK', name: 'Emirates SkyCargo', types: ['Air', 'Express'], rating: 4.9, isActive: true, headquarters: 'UAE', established: 1985, description: 'Premium air cargo services', services: ['Air', 'Express'], certifications: ['IATA', 'TAPA-A'] },
  { id: 'SINOTRANS', code: 'ST', name: 'SinoTrans', types: ['Ocean', 'Air', 'Land'], rating: 4.3, isActive: true, headquarters: 'China', established: 1985, description: 'China\'s leading logistics provider', services: ['Ocean', 'Air', 'Land', 'Warehouse'], certifications: ['ISO 9001', 'C-TPAT'] },
  { id: 'CHINAAIR', code: 'CA', name: 'Air China Cargo', types: ['Air', 'Express'], rating: 4.5, isActive: true, headquarters: 'China', established: 1988, description: 'National airline cargo division', services: ['Air', 'Express'], certifications: ['IATA', 'ISO 9001'] },
];

type TransportMode = 'AIR' | 'OCEAN' | 'LAND' | 'MULTIMODAL';
type SortOption = 'price' | 'transit' | 'rating' | 'recommended';
type ViewMode = 'split' | 'list';

interface SearchCriteria {
  origin: { country: string; city: string };
  destination: { country: string; city: string };
  weight: number;
  transportMode: TransportMode;
}

const countries = [
  { code: 'CN', name: 'China', cities: ['Shanghai', 'Shenzhen', 'Guangzhou', 'Beijing'] },
  { code: 'US', name: 'United States', cities: ['Los Angeles', 'New York', 'Houston', 'Seattle'] },
  { code: 'DE', name: 'Germany', cities: ['Hamburg', 'Frankfurt', 'Munich'] },
  { code: 'JP', name: 'Japan', cities: ['Tokyo', 'Osaka', 'Yokohama'] },
  { code: 'GB', name: 'United Kingdom', cities: ['London', 'Liverpool'] },
  { code: 'IN', name: 'India', cities: ['Mumbai', 'Chennai', 'Delhi'] },
  { code: 'NL', name: 'Netherlands', cities: ['Rotterdam', 'Amsterdam'] },
  { code: 'SG', name: 'Singapore', cities: ['Singapore'] },
  { code: 'AE', name: 'UAE', cities: ['Dubai', 'Abu Dhabi'] },
  { code: 'KR', name: 'South Korea', cities: ['Busan', 'Seoul'] },
  { code: 'BR', name: 'Brazil', cities: ['Sao Paulo', 'Santos'] },
  { code: 'MX', name: 'Mexico', cities: ['Mexico City', 'Veracruz'] },
];

const transportModes: { mode: TransportMode; icon: typeof Plane; label: string; desc: string; eta: string; carbon: string; bestFor: string[] }[] = [
  {
    mode: 'AIR',
    icon: Plane,
    label: 'Air Freight',
    desc: 'Fastest delivery worldwide',
    eta: '3-7 days',
    carbon: 'High',
    bestFor: ['Urgent shipments', 'High-value goods', 'Perishables']
  },
  {
    mode: 'OCEAN',
    icon: Ship,
    label: 'Ocean Freight',
    desc: 'Most cost-effective for large volumes',
    eta: '14-45 days',
    carbon: 'Low',
    bestFor: ['Bulk cargo', 'Heavy machinery', 'Cost-sensitive']
  },
  {
    mode: 'LAND',
    icon: Truck,
    label: 'Land Transport',
    desc: 'Door-to-door reliability',
    eta: '5-21 days',
    carbon: 'Medium',
    bestFor: ['Regional shipping', 'Cross-border trade', 'Last mile']
  },
  {
    mode: 'MULTIMODAL',
    icon: Train,
    label: 'Multimodal',
    desc: 'Combined transport solutions',
    eta: '20-35 days',
    carbon: 'Low-Medium',
    bestFor: ['Complex routes', 'Optimization', 'Environmental']
  },
];

export default function FeaturesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [selectedMode, setSelectedMode] = useState<TransportMode>('AIR');
  const [selectedQuote, setSelectedQuote] = useState<FreightQuote | null>(null);
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['QT-AIR-001', 'QT-AIR-003']));
  const [compareList, setCompareList] = useState<FreightQuote[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(true); // Start with demo data visible
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [quotes, setQuotes] = useState<FreightQuote[]>(DEMO_QUOTES);
  const [carriers, setCarriers] = useState<Carrier[]>(DEMO_CARRIERS);

  // Search form state
  const [originCountry, setOriginCountry] = useState('CN');
  const [originCity, setOriginCity] = useState('Shanghai');
  const [destCountry, setDestCountry] = useState('US');
  const [destCity, setDestCity] = useState('Los Angeles');
  const [weight, setWeight] = useState('500');

  // Filter state
  const [maxPrice, setMaxPrice] = useState(10000);
  const [maxTransit, setMaxTransit] = useState(60);
  const [minRating, setMinRating] = useState(0);
  const [selectedCarriers, setSelectedCarriers] = useState<Set<string>>(new Set());
  const [priceType, setPriceType] = useState<'all' | 'door' | 'port'>('all');

  const selectedOrigin = countries.find(c => c.code === originCountry);
  const selectedDest = countries.find(c => c.code === destCountry);

  const loadCarriers = async () => {
    try {
      const data = await freightApi.getCarriers();
      setCarriers(data);
    } catch (error) {
      console.error('Failed to load carriers:', error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setIsDemoMode(false);
    setHasSearched(true);

    try {
      const response = await freightApi.getQuotes({
        origin: {
          country: countries.find(c => c.code === originCountry)?.name || '',
          city: originCity || selectedOrigin?.cities[0] || ''
        },
        destination: {
          country: countries.find(c => c.code === destCountry)?.name || '',
          city: destCity || selectedDest?.cities[0] || ''
        },
        cargoDetails: { weight: parseFloat(weight) || 100 },
        transportMode: selectedMode,
      });
      setQuotes(response.rates);
    } catch (error) {
      console.error('Search failed:', error);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    setQuotes(DEMO_QUOTES);
    setCarriers(DEMO_CARRIERS);
    setIsDemoMode(true);
    setHasSearched(true);
    setOriginCountry('CN');
    setOriginCity('Shanghai');
    setDestCountry('US');
    setDestCity('Los Angeles');
    setWeight('500');
  };

  const getCarrierInfo = (carrierId: string) => {
    return carriers.find(c => c.id === carrierId) || { name: 'Carrier', rating: 4.0 };
  };

  const toggleFavorite = (quoteId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(quoteId) ? next.delete(quoteId) : next.add(quoteId);
      return next;
    });
  };

  const toggleCompare = (quote: FreightQuote) => {
    setCompareList(prev => {
      if (prev.find(q => q.quoteId === quote.quoteId)) {
        return prev.filter(q => q.quoteId !== quote.quoteId);
      }
      if (prev.length >= 3) return prev;
      return [...prev, quote];
    });
  };

  const getRecommendedScore = (quote: FreightQuote) => {
    const carrier = getCarrierInfo(quote.carrierId);
    const priceScore = 100 - (quote.totalRate / Math.max(...quotes.map(q => q.totalRate)) * 100);
    const transitScore = 100 - (quote.transitDays / Math.max(...quotes.map(q => q.transitDays)) * 100);
    const ratingScore = (carrier.rating / 5) * 100;
    return priceScore * 0.4 + transitScore * 0.3 + ratingScore * 0.3;
  };

  const sortedQuotes = [...quotes].sort((a, b) => {
    switch (sortBy) {
      case 'price': return a.totalRate - b.totalRate;
      case 'transit': return a.transitDays - b.transitDays;
      case 'rating': return getCarrierInfo(b.carrierId).rating - getCarrierInfo(a.carrierId).rating;
      case 'recommended': return getRecommendedScore(b) - getRecommendedScore(a);
      default: return 0;
    }
  });

  const filteredQuotes = sortedQuotes.filter(q => {
    if (q.totalRate > maxPrice) return false;
    if (q.transitDays > maxTransit) return false;
    const carrier = getCarrierInfo(q.carrierId);
    if (carrier.rating < minRating) return false;
    if (selectedCarriers.size > 0 && !selectedCarriers.has(q.carrierId)) return false;
    if (priceType === 'door' && q.originCharges === 0) return false;
    if (priceType === 'port' && q.originCharges > 0) return false;
    return true;
  });

  const avgPrice = filteredQuotes.length > 0
    ? filteredQuotes.reduce((sum, q) => sum + q.totalRate, 0) / filteredQuotes.length
    : 0;

  const avgTransit = filteredQuotes.length > 0
    ? filteredQuotes.reduce((sum, q) => sum + q.transitDays, 0) / filteredQuotes.length
    : 0;

  return (
    <div className="min-h-screen bg-[#f7f5f1] pb-24">
      <PageHeader title="Freight Explorer" subtitle="Compare all shipping options" backHref="/freight" />

      {/* Demo Banner */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-[#A6824A] to-[#c9a066] px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-white text-sm">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Demo Mode:</span>
              <span>Showing sample data from Shanghai → Los Angeles (500kg Air Freight)</span>
            </div>
            <button
              onClick={handleSearch}
              className="px-3 py-1 bg-white text-[#A6824A] text-xs font-semibold rounded-lg hover:bg-white/90 transition-colors"
            >
              Search Real Routes →
            </button>
          </div>
        </div>
      )}

      {/* Mode Selector - Full Width Tabs */}
      <div className="sticky top-16 z-40 bg-white border-b border-black/5 px-4">
        <div className="flex overflow-x-auto scrollbar-hide">
          {transportModes.map(({ mode, icon: Icon, label, desc }) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`flex-1 min-w-[120px] flex flex-col items-center py-3 px-4 border-b-2 transition-colors ${
                selectedMode === mode
                  ? 'border-[#154230] text-[#154230]'
                  : 'border-transparent text-[#4A4A4A] hover:text-[#101111]'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-semibold whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Search Form */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-[#4A4A4A] mb-1">
                <MapPin className="w-3 h-3 inline mr-1" />
                From
              </label>
              <select
                value={originCountry}
                onChange={(e) => { setOriginCountry(e.target.value); setOriginCity(''); }}
                className="w-full px-3 py-2 bg-[#E6E2DA] rounded-xl text-sm"
              >
                <option value="">Country</option>
                {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
              {selectedOrigin && (
                <select
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  className="w-full px-3 py-2 mt-2 bg-[#E6E2DA] rounded-xl text-sm"
                >
                  <option value="">Port/City</option>
                  {selectedOrigin.cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-[#4A4A4A] mb-1">
                <MapPin className="w-3 h-3 inline mr-1" />
                To
              </label>
              <select
                value={destCountry}
                onChange={(e) => { setDestCountry(e.target.value); setDestCity(''); }}
                className="w-full px-3 py-2 bg-[#E6E2DA] rounded-xl text-sm"
              >
                <option value="">Country</option>
                {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
              </select>
              {selectedDest && (
                <select
                  value={destCity}
                  onChange={(e) => setDestCity(e.target.value)}
                  className="w-full px-3 py-2 mt-2 bg-[#E6E2DA] rounded-xl text-sm"
                >
                  <option value="">Port/City</option>
                  {selectedDest.cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-[#4A4A4A] mb-1">
                <Package className="w-3 h-3 inline mr-1" />
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 bg-[#E6E2DA] rounded-xl text-sm"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !originCountry || !destCountry}
              className="self-end px-6 py-2.5 bg-[#A6824A] hover:bg-[#8a6a3a] disabled:bg-gray-300 text-white font-semibold rounded-xl flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
              Search
            </button>
          </div>
        </div>

        {/* Transport Mode Info Card */}
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 mb-4 text-white">
          {(() => {
            const mode = transportModes.find(m => m.mode === selectedMode)!;
            const Icon = mode.icon;
            return (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{mode.label}</h3>
                  <p className="text-white/80 text-sm">{mode.desc}</p>
                  <div className="flex gap-4 mt-2 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {mode.eta}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {mode.carbon} CO₂
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Compare Bar (when items selected) */}
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-20 left-4 right-4 bg-[#154230] text-white rounded-2xl p-3 shadow-xl z-50 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5" />
              <span className="text-sm font-medium">{compareList.length} quotes selected</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCompareList([])}
                className="px-3 py-1.5 text-sm bg-white/20 rounded-lg"
              >
                Clear
              </button>
              <button
                onClick={() => setShowCompare(true)}
                className="px-4 py-1.5 text-sm bg-white text-[#154230] font-semibold rounded-lg"
              >
                Compare
              </button>
            </div>
          </motion.div>
        )}

        {/* Results Stats */}
        {hasSearched && filteredQuotes.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#101111]">{filteredQuotes.length} quotes found</h3>
                {isDemoMode && (
                  <span className="px-2 py-0.5 bg-[#A6824A]/10 text-[#A6824A] text-xs font-medium rounded-full">
                    Demo
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-lg ${showFilters ? 'bg-[#154230] text-white' : 'bg-[#E6E2DA] text-[#4A4A4A]'}`}
                >
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 bg-[#E6E2DA] rounded-xl">
                <p className="text-lg font-bold text-[#154230]">${Math.min(...filteredQuotes.map(q => q.totalRate)).toLocaleString()}</p>
                <p className="text-xs text-[#4A4A4A]">Best Price</p>
              </div>
              <div className="text-center p-2 bg-[#E6E2DA] rounded-xl">
                <p className="text-lg font-bold text-[#A6824A]">{Math.min(...filteredQuotes.map(q => q.transitDays))}d</p>
                <p className="text-xs text-[#4A4A4A]">Fastest</p>
              </div>
              <div className="text-center p-2 bg-[#E6E2DA] rounded-xl">
                <p className="text-lg font-bold text-[#5D1E21]">{carriers.length}</p>
                <p className="text-xs text-[#4A4A4A]">Carriers</p>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {(['recommended', 'price', 'transit', 'rating'] as SortOption[]).map(opt => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
                    sortBy === opt ? 'bg-[#154230] text-white' : 'bg-[#E6E2DA] text-[#4A4A4A]'
                  }`}
                >
                  {opt === 'recommended' && <Star className="w-3 h-3 inline mr-1" />}
                  {opt === 'price' && <DollarSign className="w-3 h-3 inline mr-1" />}
                  {opt === 'transit' && <Clock className="w-3 h-3 inline mr-1" />}
                  {opt === 'rating' && <TrendingUp className="w-3 h-3 inline mr-1" />}
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white rounded-2xl p-4 shadow-sm mb-4 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#101111]">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="p-1">
                  <X className="w-5 h-5 text-[#4A4A4A]" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="flex justify-between text-sm text-[#4A4A4A] mb-1">
                    <span>Max Price: ${maxPrice}</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full accent-[#154230]"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-[#4A4A4A] mb-1">
                    <span>Max Transit: {maxTransit} days</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={maxTransit}
                    onChange={(e) => setMaxTransit(parseInt(e.target.value))}
                    className="w-full accent-[#154230]"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-[#4A4A4A] mb-1">
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
                  <label className="block text-sm text-[#4A4A4A] mb-2">Price Type</label>
                  <div className="flex gap-2">
                    {(['all', 'door', 'port'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => setPriceType(type)}
                        className={`px-3 py-1.5 text-xs rounded-lg ${
                          priceType === type ? 'bg-[#154230] text-white' : 'bg-[#E6E2DA] text-[#4A4A4A]'
                        }`}
                      >
                        {type === 'all' ? 'All' : type === 'door' ? 'Door-to-Door' : 'Port-to-Port'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#4A4A4A] mb-2">Carriers</label>
                  <div className="flex flex-wrap gap-2">
                    {carriers.map(carrier => (
                      <button
                        key={carrier.id}
                        onClick={() => {
                          setSelectedCarriers(prev => {
                            const next = new Set(prev);
                            next.has(carrier.id) ? next.delete(carrier.id) : next.add(carrier.id);
                            return next;
                          });
                        }}
                        className={`px-3 py-1.5 text-xs rounded-lg ${
                          selectedCarriers.has(carrier.id) ? 'bg-[#154230] text-white' : 'bg-[#E6E2DA] text-[#4A4A4A]'
                        }`}
                      >
                        {carrier.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quote Cards */}
        {loading && (
          <div className="text-center py-16">
            <Loader2 className="w-12 h-12 text-[#154230] animate-spin mx-auto mb-4" />
            <p className="text-[#4A4A4A]">Searching carriers...</p>
          </div>
        )}

        {!loading && filteredQuotes.length === 0 && hasSearched && (
          <div className="text-center py-16 bg-white rounded-2xl">
            <Package2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#101111] mb-2">No quotes found</h3>
            <p className="text-[#4A4A4A]">Try adjusting your filters or search criteria.</p>
          </div>
        )}

        {!loading && filteredQuotes.map((quote, index) => {
          const carrier = getCarrierInfo(quote.carrierId);
          const isTopPick = index === 0 && sortBy === 'recommended';
          const isSelected = selectedQuote?.quoteId === quote.quoteId;
          const isInCompare = compareList.find(q => q.quoteId === quote.quoteId);

          return (
            <motion.div
              key={quote.quoteId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`bg-white rounded-2xl shadow-sm mb-3 overflow-hidden transition-all ${
                isSelected ? 'ring-2 ring-[#154230]' : ''
              } ${isTopPick ? 'border-2 border-[#A6824A]' : ''}`}
            >
              {/* Top Pick Badge */}
              {isTopPick && (
                <div className="bg-[#A6824A] text-white text-xs font-bold px-4 py-1.5 flex items-center gap-2">
                  <Star className="w-3 h-3" />
                  TOP PICK - Best Price/Transit Balance
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* Compare Checkbox */}
                  <button
                    onClick={() => toggleCompare(quote)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      isInCompare
                        ? 'bg-[#154230] border-[#154230] text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {isInCompare && <Check className="w-3 h-3" />}
                  </button>

                  {/* Carrier Logo */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white ${
                    selectedMode === 'AIR' ? 'bg-blue-500' :
                    selectedMode === 'OCEAN' ? 'bg-teal-500' :
                    selectedMode === 'LAND' ? 'bg-orange-500' : 'bg-purple-500'
                  }`}>
                    {quote.carrierCode.slice(0, 2)}
                  </div>

                  {/* Carrier Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-[#101111]">{quote.carrierName}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-0.5 text-xs">
                            <Star className="w-3 h-3 text-[#A6824A] fill-[#A6824A]" />
                            {carrier.rating.toFixed(1)}
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
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <span className="flex items-center gap-1 text-[#A6824A]">
                    <Clock className="w-4 h-4" />
                    {quote.transitDays} days
                  </span>
                  <span className="flex items-center gap-1 text-[#4A4A4A]">
                    <Calendar className="w-4 h-4" />
                    {new Date(quote.estimatedArrival).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 text-[#4A4A4A]">
                    {quote.originCharges > 0 ? (
                      <><Move className="w-4 h-4" /> Door-to-door</>
                    ) : (
                      <><Anchor className="w-4 h-4" /> Port-to-port</>
                    )}
                  </span>
                </div>

                {/* Price vs Average Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-[#4A4A4A] mb-1">
                    <span>vs avg ${avgPrice.toFixed(0)}</span>
                    <span className={quote.totalRate < avgPrice ? 'text-green-600' : 'text-red-600'}>
                      {quote.totalRate < avgPrice ? '-' : '+'}
                      {Math.abs(Math.round((quote.totalRate / avgPrice - 1) * 100))}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#E6E2DA] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        quote.totalRate < avgPrice ? 'bg-green-500' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.min((quote.totalRate / Math.max(...filteredQuotes.map(q => q.totalRate))) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-4">
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
                    className="p-2.5 bg-[#E6E2DA] text-[#4A4A4A] rounded-xl"
                  >
                    {expandedQuote === quote.quoteId ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedQuote(isSelected ? null : quote)}
                    className="flex-1 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-xl transition-colors"
                  >
                    {isSelected ? 'Selected ✓' : 'Select'}
                  </button>
                </div>
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
                        <div>
                          <h4 className="font-semibold text-[#101111] text-sm mb-2">Price Breakdown</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[#4A4A4A]">Base Rate</span>
                              <span>${quote.baseRate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#4A4A4A]">Fuel Surcharge</span>
                              <span>${quote.fuelSurcharge}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#4A4A4A]">Origin Charges</span>
                              <span>${quote.originCharges}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[#4A4A4A]">Dest Charges</span>
                              <span>${quote.destCharges}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-black/10 font-semibold">
                              <span>Total</span>
                              <span className="text-[#154230]">${quote.totalRate}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[#101111] text-sm mb-2">Timeline</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#154230] rounded-full" />
                              <span className="text-sm">{new Date(quote.estimatedDeparture).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#A6824A] rounded-full" />
                              <span className="text-sm">{quote.transitDays} days transit</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#5D1E21] rounded-full" />
                              <span className="text-sm">{new Date(quote.estimatedArrival).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-black/10">
                        <h4 className="font-semibold text-[#101111] text-sm mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Included Services
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {['Real-time Tracking', 'Customs Clearance', 'Insurance up to $5K', 'Delivery Confirmation'].map((service, i) => (
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

        {/* Empty State */}
        {!loading && !hasSearched && (
          <div className="text-center py-16">
            <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#101111] mb-2">Freight Explorer</h3>
            <p className="text-[#4A4A4A] max-w-xs mx-auto mb-4">
              Enter your route and weight above to compare freight rates from all carriers.
            </p>
            <button
              onClick={loadDemoData}
              className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-xl hover:bg-[#1d5240] transition-colors"
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              View Demo
            </button>
          </div>
        )}
      </div>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompare && compareList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setShowCompare(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl w-full max-w-2xl max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white p-4 border-b border-black/5 flex items-center justify-between">
                <h2 className="font-bold text-lg">Compare Quotes</h2>
                <button onClick={() => setShowCompare(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f7f5f1]">
                        <th className="p-3 text-left font-semibold">Feature</th>
                        {compareList.map(quote => (
                          <th key={quote.quoteId} className="p-3 text-center font-semibold">
                            {quote.carrierName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 text-[#4A4A4A]">Price</td>
                        {compareList.map(quote => (
                          <td key={quote.quoteId} className="p-3 text-center font-bold text-[#154230]">
                            ${quote.totalRate.toLocaleString()}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-[#4A4A4A]">Transit Time</td>
                        {compareList.map(quote => (
                          <td key={quote.quoteId} className="p-3 text-center">
                            {quote.transitDays} days
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-[#4A4A4A]">Service Type</td>
                        {compareList.map(quote => (
                          <td key={quote.quoteId} className="p-3 text-center">
                            {quote.serviceType}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-[#4A4A4A]">Rating</td>
                        {compareList.map(quote => (
                          <td key={quote.quoteId} className="p-3 text-center">
                            <span className="flex items-center justify-center gap-1">
                              <Star className="w-3 h-3 text-[#A6824A] fill-[#A6824A]" />
                              {getCarrierInfo(quote.carrierId).rating.toFixed(1)}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-[#4A4A4A]">Price Type</td>
                        {compareList.map(quote => (
                          <td key={quote.quoteId} className="p-3 text-center">
                            {quote.originCharges > 0 ? 'Door-to-Door' : 'Port-to-Port'}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 text-[#4A4A4A]">ETA</td>
                        {compareList.map(quote => (
                          <td key={quote.quoteId} className="p-3 text-center">
                            {new Date(quote.estimatedArrival).toLocaleDateString()}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-t">
                        <td className="p-3"></td>
                        {compareList.map(quote => (
                          <td key={quote.quoteId} className="p-3 text-center">
                            <button className="px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg">
                              Book
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeItem="freight" />
    </div>
  );
}
