'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Truck,
  Ship,
  Plane,
  Menu,
  X,
  Bell,
  FileText,
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ArrowDown,
  Filter,
  Star,
  Globe,
  BarChart3,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: FileText },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: CheckCircle },
  { name: 'AI Assistant', href: '/ai', icon: Bell },
  { name: 'Billing', href: '/billing', icon: FileText },
  { name: 'Ads', href: '/ads', icon: Bell },
  { name: 'Consultations', href: '/consultations', icon: FileText },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Security', href: '/security' },
];

const routes = [
  { origin: 'Shanghai', originCode: 'CNSHA', destination: 'Los Angeles', destCode: 'USLAX', avgPrice: 2450, trend: 'stable' },
  { origin: 'Shenzhen', originCode: 'CNSZN', destination: 'Rotterdam', destCode: 'NLRTM', avgPrice: 3200, trend: 'down' },
  { origin: 'Singapore', originCode: 'SGSIN', destination: 'New York', destCode: 'USNYC', avgPrice: 4100, trend: 'up' },
  { origin: 'Hong Kong', originCode: 'HKHKG', destination: 'Hamburg', destCode: 'DEHAM', avgPrice: 2900, trend: 'stable' },
  { origin: 'Busan', originCode: 'KRPUS', destination: 'Vancouver', destCode: 'CAVAN', avgPrice: 2100, trend: 'down' },
  { origin: 'Tokyo', originCode: 'JPTYO', destination: 'Sydney', destCode: 'AUSYD', avgPrice: 1800, trend: 'stable' },
];

const carriers = [
  { name: 'Maersk Line', type: 'Ocean', rating: 4.8, shipments: 12500, priceLevel: 3, reliability: 98 },
  { name: 'MSC', type: 'Ocean', rating: 4.6, shipments: 11200, priceLevel: 2, reliability: 96 },
  { name: 'COSCO', type: 'Ocean', rating: 4.5, shipments: 9800, priceLevel: 1, reliability: 94 },
  { name: 'Evergreen', type: 'Ocean', rating: 4.7, shipments: 8500, priceLevel: 2, reliability: 97 },
  { name: 'Hapag-Lloyd', type: 'Ocean', rating: 4.9, shipments: 6200, priceLevel: 4, reliability: 99 },
  { name: 'FedEx Freight', type: 'Air/Land', rating: 4.7, shipments: 8900, priceLevel: 4, reliability: 98 },
  { name: 'DHL Freight', type: 'Air/Land', rating: 4.6, shipments: 9400, priceLevel: 4, reliability: 97 },
  { name: 'UPS Freight', type: 'Air/Land', rating: 4.5, shipments: 7800, priceLevel: 3, reliability: 96 },
];

const shippingModes = [
  { id: 'all', icon: Globe, name: 'All Modes', count: 156 },
  { id: 'ocean', icon: Ship, name: 'Ocean Freight', count: 89 },
  { id: 'air', icon: Plane, name: 'Air Freight', count: 42 },
  { id: 'land', icon: Truck, name: 'Land Transport', count: 25 },
];

export default function RatesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('all');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'reliability'>('price');
  const [showFilters, setShowFilters] = useState(false);

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'air': return Plane;
      case 'ocean': return Ship;
      case 'land': return Truck;
      default: return Globe;
    }
  };

  const getPriceLevel = (level: number) => {
    return Array(level).fill('$').join('');
  };

  const sortedCarriers = [...carriers].sort((a, b) => {
    if (sortBy === 'price') return a.priceLevel - b.priceLevel;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reliability - a.reliability;
  });

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Freight</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium text-[#154230]">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
              <Link href="/consultations" className="nav-link font-medium">Consultations</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
              </button>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pt-4 border-t border-black/5">
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/documents" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
                <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
                <Link href="/consultations" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Consultations</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Compare Shipping Rates
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Find the best shipping rates from verified carriers. Compare ocean, air, and land freight options.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    placeholder="Search routes, carriers..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Shipping Modes Filter */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <div className="flex items-center gap-2 overflow-x-auto">
              {shippingModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${selectedMode === mode.id ? 'bg-[#154230] text-white' : 'bg-[#f7f5f1] text-[#101111] hover:bg-[#E6E2DA]'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {mode.name}
                    <span className={`px-2 py-0.5 rounded text-xs ${selectedMode === mode.id ? 'bg-white/20' : 'bg-gray-200'}`}>
                      {mode.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Popular Routes */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-black/5">
                  <h2 className="text-lg font-bold text-[#101111]">Popular Routes</h2>
                  <p className="text-[#4A4A4A] text-sm">Most searched trade lanes</p>
                </div>
                <div className="divide-y divide-black/5">
                  {routes.map((route) => (
                    <Link key={`${route.originCode}-${route.destCode}`} href="/freight/quote" className="block p-4 hover:bg-[#f7f5f1] transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#101111]">{route.originCode}</span>
                          <ArrowRight className="w-3 h-3 text-gray-400" />
                          <span className="font-bold text-[#101111]">{route.destCode}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${route.trend === 'up' ? 'bg-red-100 text-red-700' : route.trend === 'down' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {route.trend === 'up' ? '↑' : route.trend === 'down' ? '↓' : '→'} {route.trend}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#4A4A4A]">{route.origin} to {route.destination}</span>
                        <span className="font-semibold text-[#154230]">${route.avgPrice.toLocaleString()}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Carrier Comparison */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-black/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#101111]">Carrier Comparison</h2>
                    <p className="text-[#4A4A4A] text-sm">Compare rates and reliability</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showFilters ? 'bg-[#154230] text-white' : 'bg-[#f7f5f1] text-[#101111] hover:bg-[#E6E2DA]'}`}
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                    </button>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'reliability')}
                      className="px-4 py-2 bg-[#f7f5f1] rounded-lg text-sm text-[#101111] focus:outline-none"
                    >
                      <option value="price">Sort by Price</option>
                      <option value="rating">Sort by Rating</option>
                      <option value="reliability">Sort by Reliability</option>
                    </select>
                  </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-6 border-b border-black/5 bg-[#f7f5f1]">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#101111] mb-2">Carrier Type</label>
                        <select className="w-full px-4 py-2 bg-white rounded-lg text-sm focus:outline-none">
                          <option>All Types</option>
                          <option>Ocean</option>
                          <option>Air</option>
                          <option>Land</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#101111] mb-2">Price Range</label>
                        <select className="w-full px-4 py-2 bg-white rounded-lg text-sm focus:outline-none">
                          <option>Any Price</option>
                          <option>Budget ($)</option>
                          <option>Standard ($$)</option>
                          <option>Premium ($$$)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#101111] mb-2">Minimum Rating</label>
                        <select className="w-full px-4 py-2 bg-white rounded-lg text-sm focus:outline-none">
                          <option>Any Rating</option>
                          <option>4.0+</option>
                          <option>4.5+</option>
                          <option>4.8+</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Carrier List */}
                <div className="divide-y divide-black/5">
                  {sortedCarriers.map((carrier, index) => (
                    <motion.div
                      key={carrier.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 hover:bg-[#f7f5f1] transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#f7f5f1] flex items-center justify-center">
                            <BarChart3 className="w-6 h-6 text-[#154230]" />
                          </div>
                          <div>
                            <p className="font-bold text-[#101111]">{carrier.name}</p>
                            <p className="text-sm text-[#4A4A4A]">{carrier.type}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="flex items-center gap-1 justify-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span className="font-bold text-[#101111]">{carrier.rating}</span>
                            </div>
                            <p className="text-xs text-[#4A4A4A]">Rating</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-[#101111]">{carrier.reliability}%</p>
                            <p className="text-xs text-[#4A4A4A]">Reliability</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-[#101111]">{carrier.shipments.toLocaleString()}</p>
                            <p className="text-xs text-[#4A4A4A]">Shipments</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-[#A6824A]">{getPriceLevel(carrier.priceLevel)}</p>
                            <p className="text-xs text-[#4A4A4A]">Price Level</p>
                          </div>
                          <Link href="/freight/quote" className="px-4 py-2 bg-[#154230] hover:bg-[#1d5240] text-white font-medium rounded-lg transition-colors text-sm">
                            Get Quote
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Price Index Section */}
      <section className="bg-white px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-[#101111] text-center mb-4">Freight Rate Index</h2>
          <p className="text-[#4A4A4A] text-center mb-12 max-w-2xl mx-auto">
            Current market rates for major trade lanes. Updated daily based on carrier submissions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { lane: 'Asia - North America', ocean: '$2.45/kg', air: '$4.20/kg' },
              { lane: 'Asia - Europe', ocean: '$3.20/kg', air: '$5.50/kg' },
              { lane: 'Europe - North America', ocean: '$1.80/kg', air: '$3.80/kg' },
              { lane: 'Intra-Asia', ocean: '$0.95/kg', air: '$2.40/kg' },
            ].map((rate) => (
              <div key={rate.lane} className="p-6 bg-[#f7f5f1] rounded-xl">
                <h3 className="font-bold text-[#101111] mb-4">{rate.lane}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#4A4A4A] flex items-center gap-2">
                      <Ship className="w-4 h-4" /> Ocean
                    </span>
                    <span className="font-semibold text-[#101111]">{rate.ocean}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[#4A4A4A] flex items-center gap-2">
                      <Plane className="w-4 h-4" /> Air
                    </span>
                    <span className="font-semibold text-[#101111]">{rate.air}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Ship?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get instant shipping quotes and lock in the best rates for your cargo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/freight/quote" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Get a Quote
            </Link>
            <Link href="/freight/tracking" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Track Shipment
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - 50% Green / 50% Maroon */}
      <footer className="bg-[#154230]">
        <div className="bg-[#154230] px-4 sm:px-8 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain mb-4 brightness-0 invert" />
                <p className="text-white/70 text-sm mb-4">
                  The operating system for global trade.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Platform</h4>
                <ul className="space-y-2 text-sm">
                  {platformLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Company</h4>
                <ul className="space-y-2 text-sm">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Legal</h4>
                <ul className="space-y-2 text-sm">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/70 text-sm">
                © 2024 LEVERAGE. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy</Link>
                <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">Terms</Link>
                <Link href="/security" className="text-white/70 hover:text-white text-sm transition-colors">Security</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
