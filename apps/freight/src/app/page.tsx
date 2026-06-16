'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Package,
  Truck,
  Ship,
  Plane,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Plus,
  ChevronRight,
  ArrowRight,
  Globe,
  Anchor,
  BarChart3,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  User,
  Building2,
  Navigation,
  Box,
  Users,
  Route,
  Bookmark,
} from 'lucide-react';

interface Shipment {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: 'in-transit' | 'delivered' | 'pending' | 'customs';
  mode: 'air' | 'ocean' | 'land';
  eta: string;
  carrier: string;
  weight: string;
  containers: number;
}

const shipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'LEV-2024-001234',
    origin: 'Shanghai, China',
    destination: 'Los Angeles, USA',
    status: 'in-transit',
    mode: 'ocean',
    eta: '2024-07-15',
    carrier: 'Maersk Line',
    weight: '24,500 kg',
    containers: 2,
  },
  {
    id: '2',
    trackingNumber: 'LEV-2024-001235',
    origin: 'Mumbai, India',
    destination: 'Rotterdam, Netherlands',
    status: 'customs',
    mode: 'ocean',
    eta: '2024-07-20',
    carrier: 'MSC',
    weight: '18,200 kg',
    containers: 1,
  },
  {
    id: '3',
    trackingNumber: 'LEV-2024-001236',
    origin: 'Tokyo, Japan',
    destination: 'New York, USA',
    status: 'delivered',
    mode: 'air',
    eta: '2024-06-28',
    carrier: 'FedEx Freight',
    weight: '3,400 kg',
    containers: 0,
  },
  {
    id: '4',
    trackingNumber: 'LEV-2024-001237',
    origin: 'Dubai, UAE',
    destination: 'Hamburg, Germany',
    status: 'pending',
    mode: 'ocean',
    eta: '2024-08-05',
    carrier: 'Hapag-Lloyd',
    weight: '31,000 kg',
    containers: 3,
  },
];

const shippingModes = [
  {
    mode: 'air',
    name: 'Air Freight',
    icon: Plane,
    description: 'Fast delivery for time-sensitive cargo',
    color: '#154230',
    avgTime: '3-7 days',
  },
  {
    mode: 'ocean',
    name: 'Ocean Freight',
    icon: Ship,
    description: 'Cost-effective for large volumes',
    color: '#A6824A',
    avgTime: '14-45 days',
  },
  {
    mode: 'land',
    name: 'Land Transport',
    icon: Truck,
    description: 'Door-to-door ground shipping',
    color: '#5D1E21',
    avgTime: '5-21 days',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-700';
    case 'in-transit': return 'bg-blue-100 text-blue-700';
    case 'customs': return 'bg-yellow-100 text-yellow-700';
    case 'pending': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'delivered': return 'Delivered';
    case 'in-transit': return 'In Transit';
    case 'customs': return 'At Customs';
    case 'pending': return 'Pending';
    default: return status;
  }
};

const getModeIcon = (mode: string) => {
  switch (mode) {
    case 'air': return <Plane className="w-5 h-5" />;
    case 'ocean': return <Ship className="w-5 h-5" />;
    case 'land': return <Truck className="w-5 h-5" />;
    default: return <Package className="w-5 h-5" />;
  }
};

export default function FreightPage() {
  const [activeTab, setActiveTab] = useState<'track' | 'shipments' | 'quotes'>('track');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [searchResults, setSearchResults] = useState<Shipment[] | null>(null);

  const handleTrack = () => {
    if (trackingInput.trim()) {
      const results = shipments.filter(s =>
        s.trackingNumber.toLowerCase().includes(trackingInput.toLowerCase()) ||
        s.origin.toLowerCase().includes(trackingInput.toLowerCase()) ||
        s.destination.toLowerCase().includes(trackingInput.toLowerCase())
      );
      setSearchResults(results.length > 0 ? results : []);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Freight</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/freight" className="nav-link font-medium">Track</Link>
              <Link href="/freight/quotes" className="nav-link font-medium">Get Quote</Link>
              <Link href="/freight/shipments" className="nav-link font-medium">My Shipments</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-black/5"
            >
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Track</Link>
                <Link href="/freight/quotes" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Get Quote</Link>
                <Link href="/freight/shipments" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">My Shipments</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
              <Navigation className="w-4 h-4" />
              Global Logistics Platform
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ship Anywhere, Track Everything
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Track shipments in real-time, get instant freight quotes, and manage your entire supply chain from one platform.
            </p>
          </motion.div>

          {/* Tracking Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-2xl p-2 shadow-xl">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter tracking number, port, or destination..."
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-[#101111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                  />
                </div>
                <button
                  onClick={handleTrack}
                  className="px-6 py-4 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Track</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-sm text-white/70">Active Shipments</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">98.5%</div>
              <div className="text-sm text-white/70">On-Time Delivery</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">156</div>
              <div className="text-sm text-white/70">Countries Served</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/70">Tracking Support</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-20 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button
                onClick={() => setActiveTab('track')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'track'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Search className="w-4 h-4 inline mr-2" />
                Track Shipment
              </button>
              <button
                onClick={() => setActiveTab('shipments')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'shipments'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Box className="w-4 h-4 inline mr-2" />
                My Shipments
              </button>
              <button
                onClick={() => setActiveTab('quotes')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'quotes'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <DollarSign className="w-4 h-4 inline mr-2" />
                Get Quote
              </button>
            </div>

            {activeTab === 'track' && (
              <div className="p-6">
                {searchResults !== null ? (
                  <div>
                    <h2 className="text-xl font-bold text-[#101111] mb-6">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </h2>
                    {searchResults.length > 0 ? (
                      <div className="space-y-4">
                        {searchResults.map((shipment) => (
                          <div key={shipment.id} className="p-6 bg-[#f7f5f1] rounded-xl">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="text-sm text-[#4A4A4A] mb-1">Tracking Number</div>
                                <div className="text-lg font-bold text-[#101111]">{shipment.trackingNumber}</div>
                              </div>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                                {getStatusLabel(shipment.status)}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <div className="text-sm text-[#4A4A4A]">Origin</div>
                                <div className="font-medium">{shipment.origin}</div>
                              </div>
                              <div>
                                <div className="text-sm text-[#4A4A4A]">Destination</div>
                                <div className="font-medium">{shipment.destination}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-[#4A4A4A]">
                              <span className="flex items-center gap-1">
                                {getModeIcon(shipment.mode)}
                                {shipment.mode.charAt(0).toUpperCase() + shipment.mode.slice(1)}
                              </span>
                              <span>ETA: {shipment.eta}</span>
                              <span>Carrier: {shipment.carrier}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-[#4A4A4A]">No shipments found matching your search.</p>
                      </div>
                    )}
                    <button
                      onClick={() => { setSearchResults(null); setTrackingInput(''); }}
                      className="mt-4 text-[#154230] font-medium hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Navigation className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[#101111] mb-2">Track Your Shipment</h3>
                    <p className="text-[#4A4A4A] max-w-md mx-auto">
                      Enter a tracking number, port name, or destination to find your shipment.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shipments' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#101111]">Active Shipments</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    <Plus className="w-4 h-4" />
                    New Shipment
                  </button>
                </div>
                <div className="space-y-4">
                  {shipments.map((shipment) => (
                    <div key={shipment.id} className="p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-sm text-[#4A4A4A] mb-1">Tracking Number</div>
                          <div className="text-lg font-bold text-[#101111]">{shipment.trackingNumber}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                          {getStatusLabel(shipment.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-[#154230]" />
                        <span className="font-medium">{shipment.origin}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{shipment.destination}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-[#4A4A4A]">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            {getModeIcon(shipment.mode)}
                            {shipment.carrier}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            ETA: {shipment.eta}
                          </span>
                          <span className="flex items-center gap-1">
                            <Box className="w-4 h-4" />
                            {shipment.containers} containers
                          </span>
                        </div>
                        <button className="text-[#154230] font-medium hover:underline flex items-center gap-1">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'quotes' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-6">Get Freight Quote</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {shippingModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <div key={mode.mode} className="p-6 border-2 border-black/5 rounded-xl hover:border-[#154230]/30 transition-colors">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: mode.color + '20' }}>
                          <Icon className="w-6 h-6" style={{ color: mode.color }} />
                        </div>
                        <h3 className="text-lg font-bold text-[#101111] mb-2">{mode.name}</h3>
                        <p className="text-sm text-[#4A4A4A] mb-4">{mode.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#4A4A4A]">Avg. Transit Time</span>
                          <span className="font-medium text-[#101111]">{mode.avgTime}</span>
                        </div>
                        <button className="w-full mt-4 py-3 bg-[#154230] text-white font-semibold rounded-xl hover:bg-[#1d5240] transition-colors">
                          Request Quote
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Shipping Modes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {shippingModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <motion.div
                  key={mode.mode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: mode.color + '15' }}>
                    <Icon className="w-7 h-7" style={{ color: mode.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-[#101111] mb-2">{mode.name}</h3>
                  <p className="text-sm text-[#4A4A4A] mb-4">{mode.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <span className="text-sm text-[#4A4A4A]">Transit Time</span>
                    <span className="font-semibold text-[#101111]">{mode.avgTime}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#101111] mb-8 text-center">Why Choose LEVERAGE Freight</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
              <div className="text-center">
                <div className="w-14 h-14 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Navigation className="w-7 h-7 text-[#154230]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Real-Time Tracking</h3>
                <p className="text-sm text-[#4A4A4A]">Track every shipment in real-time with live updates and notifications.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#A6824A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-[#A6824A]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Instant Quotes</h3>
                <p className="text-sm text-[#4A4A4A]">Get competitive freight quotes in seconds, not days.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#5D1E21]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-[#5D1E21]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Global Network</h3>
                <p className="text-sm text-[#4A4A4A]">Access to carriers and partners across 156+ countries.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Route className="w-7 h-7 text-[#154230]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Route Optimization</h3>
                <p className="text-sm text-[#4A4A4A]">AI-powered route planning for faster, cheaper deliveries.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#101111] text-white px-4 sm:px-8 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain mb-4 brightness-0 invert" />
              <p className="text-sm text-gray-400">The Trade OS for import/export businesses.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link href="/freight" className="hover:text-white transition-colors">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; 2024 LEVERAGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}