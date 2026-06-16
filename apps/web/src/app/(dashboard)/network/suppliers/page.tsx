'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, Star, CheckCircle, Clock, TrendingUp, MessageSquare, Shield, Award, Users, Globe, ArrowRight, ChevronDown, X, Phone, Mail, ExternalLink, Loader2, Building2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

interface Supplier {
  id: string;
  name: string;
  company: string;
  country: string;
  countryCode: string;
  city: string;
  flag: string;
  category: string;
  rating: number;
  reviewCount: number;
  trades: number;
  responseRate: string;
  responseTime: string;
  verified: boolean;
  verificationBadges: string[];
  creditScore: number;
  creditRating: 'AAA' | 'AA' | 'A' | 'B' | 'C' | 'D';
  established: number;
  employees: string;
  annualRevenue: string;
  specialization: string[];
  description: string;
  topProducts: string[];
  certifications: string[];
  recentTrades: { product: string; country: string; amount: string }[];
  reviews: Review[];
  isFavorite: boolean;
}

interface Review {
  id: string;
  buyer: string;
  buyerCountry: string;
  rating: number;
  date: string;
  comment: string;
  tradeValue: string;
  product: string;
}

const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'Wei Zhang',
    company: 'Shanghai Steel Works Co., Ltd.',
    country: 'China',
    countryCode: 'CN',
    city: 'Shanghai',
    flag: '🇨🇳',
    category: 'Metals & Minerals',
    rating: 4.9,
    reviewCount: 247,
    trades: 1250,
    responseRate: '98%',
    responseTime: '< 1 hour',
    verified: true,
    verificationBadges: ['Verified Manufacturer', 'Gold Supplier', 'Trade Assured'],
    creditScore: 95,
    creditRating: 'AAA',
    established: 2008,
    employees: '500-1000',
    annualRevenue: '$50M-$100M',
    specialization: ['Steel Coils', 'Steel Sheets', 'Steel Pipes'],
    description: 'Leading manufacturer of industrial steel products with 15+ years of experience. ISO 9001 certified with annual production capacity of 500,000 tons.',
    topProducts: ['Hot Rolled Steel Coils', 'Cold Rolled Steel Sheets', 'Galvanized Steel'],
    certifications: ['ISO 9001', 'ISO 14001', 'CE', 'SGS Verified'],
    recentTrades: [
      { product: 'Steel Coils 200MT', country: 'USA', amount: '$180,000' },
      { product: 'Steel Pipes 50MT', country: 'Germany', amount: '$65,000' },
      { product: 'Steel Sheets 100MT', country: 'UAE', amount: '$95,000' },
    ],
    reviews: [
      { id: '1', buyer: 'John Trading Co.', buyerCountry: 'USA', rating: 5, date: '2024-01-15', comment: 'Excellent quality and on-time delivery. Will order again.', tradeValue: '$180,000', product: 'Steel Coils' },
      { id: '2', buyer: 'Berlin Imports', buyerCountry: 'Germany', rating: 5, date: '2024-01-10', comment: 'Professional communication and fast response.', tradeValue: '$65,000', product: 'Steel Pipes' },
    ],
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    company: 'Mumbai Textiles Export',
    country: 'India',
    countryCode: 'IN',
    city: 'Mumbai',
    flag: '🇮🇳',
    category: 'Textiles & Apparel',
    rating: 4.7,
    reviewCount: 156,
    trades: 780,
    responseRate: '95%',
    responseTime: '< 2 hours',
    verified: true,
    verificationBadges: ['Verified Exporter', 'Quality Assured'],
    creditScore: 88,
    creditRating: 'AA',
    established: 2015,
    employees: '100-500',
    annualRevenue: '$10M-$50M',
    specialization: ['Cotton Yarn', 'Fabrics', 'Apparel'],
    description: 'Premium textile exporter specializing in organic cotton and sustainable fabrics. GOTS certified with direct factory access.',
    topProducts: ['Cotton Yarn 40s', 'Organic Cotton Fabric', 'Bedding Sets'],
    certifications: ['GOTS', 'OEKO-TEX', 'ISO 9001'],
    recentTrades: [
      { product: 'Cotton Yarn 10,000kg', country: 'Vietnam', amount: '$45,000' },
      { product: 'Bed Sheets 5,000 sets', country: 'UK', amount: '$38,000' },
    ],
    reviews: [
      { id: '1', buyer: 'Fashion Hub Ltd', buyerCountry: 'UK', rating: 5, date: '2024-01-12', comment: 'Outstanding quality organic cotton. Very reliable supplier.', tradeValue: '$38,000', product: 'Bed Sheets' },
    ],
    isFavorite: true,
  },
  {
    id: '3',
    name: 'Kim Jong-ho',
    company: 'Seoul Electronics Korea',
    country: 'South Korea',
    countryCode: 'KR',
    city: 'Seoul',
    flag: '🇰🇷',
    category: 'Electronics',
    rating: 4.8,
    reviewCount: 312,
    trades: 890,
    responseRate: '99%',
    responseTime: '< 30 min',
    verified: true,
    verificationBadges: ['Verified Manufacturer', 'Top Rated', 'Trade Assured'],
    creditScore: 92,
    creditRating: 'AA',
    established: 2010,
    employees: '200-500',
    annualRevenue: '$30M-$50M',
    specialization: ['Consumer Electronics', 'LED Components', 'Semiconductors'],
    description: 'High-tech electronics manufacturer specializing in LED displays and consumer electronics. Samsung and LG partner.',
    topProducts: ['LED TV 55"', 'LED Strip Lights', 'Power Banks'],
    certifications: ['ISO 9001', 'KC', 'CE', 'FCC'],
    recentTrades: [
      { product: 'LED TVs 200 units', country: 'USA', amount: '$120,000' },
      { product: 'LED Strips 5,000m', country: 'Japan', amount: '$42,000' },
    ],
    reviews: [
      { id: '1', buyer: 'Tech Distributors', buyerCountry: 'USA', rating: 5, date: '2024-01-18', comment: 'Premium quality products. Fast shipping.', tradeValue: '$120,000', product: 'LED TVs' },
    ],
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Ahmed Hassan',
    company: 'Gulf Chemical Trading',
    country: 'UAE',
    countryCode: 'AE',
    city: 'Dubai',
    flag: '🇦🇪',
    category: 'Chemicals',
    rating: 4.6,
    reviewCount: 89,
    trades: 456,
    responseRate: '92%',
    responseTime: '< 3 hours',
    verified: true,
    verificationBadges: ['Verified Supplier', 'Quality Assured'],
    creditScore: 82,
    creditRating: 'A',
    established: 2012,
    employees: '50-100',
    annualRevenue: '$5M-$10M',
    specialization: ['Industrial Chemicals', 'Petrochemicals', 'Additives'],
    description: 'Established chemical trader based in Dubai with global sourcing capabilities. Specializing in industrial and petrochemical products.',
    topProducts: ['Polyethylene', 'Polypropylene', 'Industrial Solvents'],
    certifications: ['ISO 9001', 'REACH'],
    recentTrades: [
      { product: 'Polyethylene 100MT', country: 'India', amount: '$115,000' },
    ],
    reviews: [
      { id: '1', buyer: 'Mumbai Industries', buyerCountry: 'India', rating: 4, date: '2024-01-05', comment: 'Good quality chemicals. Competitive prices.', tradeValue: '$115,000', product: 'Polyethylene' },
    ],
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Maria Garcia',
    company: 'Mexico Auto Parts SA de CV',
    country: 'Mexico',
    countryCode: 'MX',
    city: 'Monterrey',
    flag: '🇲🇽',
    category: 'Automotive',
    rating: 4.5,
    reviewCount: 67,
    trades: 234,
    responseRate: '88%',
    responseTime: '< 4 hours',
    verified: true,
    verificationBadges: ['Verified Manufacturer'],
    creditScore: 78,
    creditRating: 'A',
    established: 2018,
    employees: '100-200',
    annualRevenue: '$5M-$10M',
    specialization: ['Auto Parts', 'Engine Components', 'Brake Systems'],
    description: 'Tier 1 and Tier 2 automotive parts supplier with USMCA compliance. Exporting to North American OEMs.',
    topProducts: ['Brake Pads', 'Engine Gaskets', 'Suspension Parts'],
    certifications: ['ISO 9001', 'IATF 16949', 'USMCA'],
    recentTrades: [
      { product: 'Brake Pads 10,000 sets', country: 'USA', amount: '$85,000' },
    ],
    reviews: [],
    isFavorite: false,
  },
  {
    id: '6',
    name: 'Tanaka Hiroshi',
    company: 'Tokyo Machinery Ltd',
    country: 'Japan',
    countryCode: 'JP',
    city: 'Tokyo',
    flag: '🇯🇵',
    category: 'Machinery',
    rating: 4.9,
    reviewCount: 178,
    trades: 567,
    responseRate: '97%',
    responseTime: '< 1 hour',
    verified: true,
    verificationBadges: ['Verified Manufacturer', 'Top Rated', 'Premium Supplier'],
    creditScore: 98,
    creditRating: 'AAA',
    established: 1995,
    employees: '1000+',
    annualRevenue: '$100M+',
    specialization: ['CNC Machines', 'Industrial Robots', 'Precision Parts'],
    description: 'World-class machinery manufacturer with 30+ years of experience. Leading supplier to automotive, aerospace, and electronics industries.',
    topProducts: ['CNC Milling Machine', 'Industrial Robot Arm', 'Precision Gears'],
    certifications: ['ISO 9001', 'JIS', 'CE', 'UL'],
    recentTrades: [
      { product: 'CNC Machine 2 units', country: 'Germany', amount: '$450,000' },
      { product: 'Robot Arms 5 units', country: 'USA', amount: '$320,000' },
    ],
    reviews: [
      { id: '1', buyer: 'Auto Parts Germany', buyerCountry: 'Germany', rating: 5, date: '2024-01-20', comment: 'Exceptional quality. Best-in-class machinery.', tradeValue: '$450,000', product: 'CNC Machine' },
    ],
    isFavorite: false,
  },
];

const categories = ['All Categories', 'Metals & Minerals', 'Textiles & Apparel', 'Electronics', 'Chemicals', 'Automotive', 'Machinery', 'Food & Agriculture'];
const countries = ['All Countries', '🇨🇳 China', '🇮🇳 India', '🇰🇷 South Korea', '🇦🇪 UAE', '🇲🇽 Mexico', '🇯🇵 Japan', '🇩🇪 Germany', '🇺🇸 USA'];
const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'trades', label: 'Most Trades' },
  { value: 'response', label: 'Fastest Response' },
  { value: 'credit', label: 'Credit Score' },
];

const getCreditColor = (rating: string) => {
  switch (rating) {
    case 'AAA': return { bg: '#16A34A/10', text: '#16A34A', label: 'AAA - Excellent' };
    case 'AA': return { bg: '#154230/10', text: '#154230', label: 'AA - Very Good' };
    case 'A': return { bg: '#A6824A/10', text: '#A6824A', label: 'A - Good' };
    case 'B': return { bg: '#CA8A04/10', text: '#CA8A04', label: 'B - Fair' };
    case 'C': return { bg: '#EA580C/10', text: '#EA580C', label: 'C - Poor' };
    default: return { bg: '#DC2626/10', text: '#DC2626', label: 'D - High Risk' };
  }
};

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [favorites, setFavorites] = useState<string[]>(suppliers.filter(s => s.isFavorite).map(s => s.id));

  const filteredSuppliers = suppliers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.specialization.some(sp => sp.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All Categories' || s.category === selectedCategory;
    const matchesCountry = selectedCountry === 'All Countries' || s.flag === selectedCountry.split(' ')[0];
    return matchesSearch && matchesCategory && matchesCountry;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating': return b.rating - a.rating;
      case 'trades': return b.trades - a.trades;
      case 'response': return parseInt(a.responseRate) - parseInt(b.responseRate);
      case 'credit': return b.creditScore - a.creditScore;
      default: return 0;
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const creditInfo = (supplier: Supplier) => getCreditColor(supplier.creditRating);

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Verified Suppliers"
        subtitle="Connect with trusted global partners"
        backHref="/network"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

          <div className="relative z-10">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search suppliers, products, or companies..."
                className="w-full pl-12 pr-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white rounded-full text-sm font-medium whitespace-nowrap"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-[#E6E2DA] rounded-full text-sm font-medium whitespace-nowrap border-none focus:outline-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-4 py-2 bg-[#E6E2DA] rounded-full text-sm font-medium whitespace-nowrap border-none focus:outline-none"
              >
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-[#E6E2DA] rounded-full text-sm font-medium whitespace-nowrap border-none focus:outline-none"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-black/5 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[#4A4A4A] text-sm">Verification:</span>
                  {['Verified Manufacturer', 'Gold Supplier', 'Top Rated'].map(badge => (
                    <button key={badge} className="px-3 py-1 bg-[#E6E2DA] rounded-full text-xs font-medium hover:bg-[#154230]/10">
                      {badge}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[#4A4A4A] text-sm">Credit Rating:</span>
                  {['AAA', 'AA', 'A'].map(rating => (
                    <button key={rating} className="px-3 py-1 bg-[#E6E2DA] rounded-full text-xs font-medium hover:bg-[#154230]/10">
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Count */}
            <p className="text-[#4A4A4A] text-xs mt-3">
              {filteredSuppliers.length} verified suppliers found
            </p>
          </div>
        </div>

        {/* Supplier Cards */}
        <div className="space-y-4">
          {filteredSuppliers.map(supplier => {
            const credit = creditInfo(supplier);
            const isFavorite = favorites.includes(supplier.id);

            return (
              <div
                key={supplier.id}
                className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedSupplier(supplier)}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

                <div className="relative z-10">
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-[#E6E2DA] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {supplier.flag}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-[#101111] font-bold">{supplier.name}</h3>
                            {supplier.verified && (
                              <CheckCircle className="w-4 h-4 text-[#154230]" />
                            )}
                          </div>
                          <p className="text-[#4A4A4A] text-sm truncate">{supplier.company}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(supplier.id); }}
                          className={`p-2 rounded-lg ${isFavorite ? 'text-[#DC2626] bg-[#DC2626]/10' : 'text-[#4A4A4A] bg-[#E6E2DA]'}`}
                        >
                          <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {supplier.verificationBadges.slice(0, 2).map(badge => (
                          <span key={badge} className="px-2 py-0.5 bg-[#154230]/10 text-[#154230] text-[10px] font-medium rounded">
                            {badge}
                          </span>
                        ))}
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${credit.bg} ${credit.text}`}>
                          {credit.label}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mt-3 text-xs text-[#4A4A4A]">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-[#A6824A] fill-current" />
                          <span className="font-semibold text-[#101111]">{supplier.rating}</span>
                          <span>({supplier.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{supplier.trades} trades</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{supplier.responseTime}</span>
                        </div>
                      </div>

                      {/* Specialization */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {supplier.specialization.map(sp => (
                          <span key={sp} className="px-2 py-0.5 bg-[#E6E2DA] text-[#4A4A4A] text-[10px] rounded">
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center">
            <Building2 className="w-12 h-12 text-[#4A4A4A] mx-auto mb-3" />
            <p className="text-[#101111] font-semibold">No suppliers found</p>
            <p className="text-[#4A4A4A] text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Supplier Detail Modal */}
      {selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end lg:items-center justify-center">
          <div className="bg-white w-full lg:max-w-2xl lg:rounded-2xl max-h-[90vh] overflow-y-auto rounded-t-3xl">
            {/* Header */}
            <div className="sticky top-0 bg-white p-4 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-[#101111] font-bold">Supplier Profile</h2>
              <button onClick={() => setSelectedSupplier(null)} className="p-2 bg-[#E6E2DA] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Basic Info */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-[#E6E2DA] rounded-xl flex items-center justify-center text-3xl">
                  {selectedSupplier.flag}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[#101111] font-bold text-lg">{selectedSupplier.name}</h3>
                    {selectedSupplier.verified && <CheckCircle className="w-5 h-5 text-[#154230]" />}
                  </div>
                  <p className="text-[#4A4A4A]">{selectedSupplier.company}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4 text-[#4A4A4A]" />
                    <span className="text-[#4A4A4A] text-sm">{selectedSupplier.city}, {selectedSupplier.country}</span>
                  </div>
                </div>
              </div>

              {/* Credit Score */}
              <div className="bg-[#E6E2DA] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#4A4A4A] text-xs">Credit Score</p>
                    <p className="text-[#101111] font-bold text-2xl">{selectedSupplier.creditScore}/100</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl ${creditInfo(selectedSupplier).bg}`}>
                    <span className={`font-bold ${creditInfo(selectedSupplier).text}`}>{selectedSupplier.creditRating}</span>
                  </div>
                </div>
                <div className="mt-3 h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#154230] rounded-full"
                    style={{ width: `${selectedSupplier.creditScore}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-[#E6E2DA] rounded-xl p-3 text-center">
                  <Star className="w-5 h-5 text-[#A6824A] mx-auto fill-current" />
                  <p className="text-[#101111] font-bold mt-1">{selectedSupplier.rating}</p>
                  <p className="text-[#4A4A4A] text-[10px]">Rating</p>
                </div>
                <div className="bg-[#E6E2DA] rounded-xl p-3 text-center">
                  <TrendingUp className="w-5 h-5 text-[#154230] mx-auto" />
                  <p className="text-[#101111] font-bold mt-1">{selectedSupplier.trades}</p>
                  <p className="text-[#4A4A4A] text-[10px]">Trades</p>
                </div>
                <div className="bg-[#E6E2DA] rounded-xl p-3 text-center">
                  <Clock className="w-5 h-5 text-[#A6824A] mx-auto" />
                  <p className="text-[#101111] font-bold mt-1">{selectedSupplier.responseRate}</p>
                  <p className="text-[#4A4A4A] text-[10px]">Response</p>
                </div>
                <div className="bg-[#E6E2DA] rounded-xl p-3 text-center">
                  <Users className="w-5 h-5 text-[#154230] mx-auto" />
                  <p className="text-[#101111] font-bold mt-1">{selectedSupplier.established}</p>
                  <p className="text-[#4A4A4A] text-[10px]">Est.</p>
                </div>
              </div>

              {/* About */}
              <div>
                <h4 className="text-[#101111] font-bold mb-2">About</h4>
                <p className="text-[#4A4A4A] text-sm">{selectedSupplier.description}</p>
              </div>

              {/* Top Products */}
              <div>
                <h4 className="text-[#101111] font-bold mb-2">Top Products</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.topProducts.map(product => (
                    <span key={product} className="px-3 py-1.5 bg-[#154230]/10 text-[#154230] text-sm rounded-lg">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-[#101111] font-bold mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplier.certifications.map(cert => (
                    <span key={cert} className="px-3 py-1.5 bg-[#A6824A]/10 text-[#A6824A] text-sm rounded-lg flex items-center gap-1">
                      <Award className="w-4 h-4" /> {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Trades */}
              {selectedSupplier.recentTrades.length > 0 && (
                <div>
                  <h4 className="text-[#101111] font-bold mb-2">Recent Trades</h4>
                  <div className="space-y-2">
                    {selectedSupplier.recentTrades.map((trade, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-[#E6E2DA] rounded-xl">
                        <div>
                          <p className="text-[#101111] text-sm font-medium">{trade.product}</p>
                          <p className="text-[#4A4A4A] text-xs">To {trade.country}</p>
                        </div>
                        <span className="text-[#154230] font-semibold">{trade.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-[#154230] text-white rounded-xl font-semibold flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Contact
                </button>
                <button className="flex-1 py-3 bg-[#A6824A] text-white rounded-xl font-semibold flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" /> Request Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNav activeItem="home" />
    </div>
  );
}
