'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  ChevronRight,
  ArrowRight,
  Truck,
  Ship,
  Plane,
  Menu,
  X,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Box,
  Calendar,
  Navigation,
  BarChart3,
  DollarSign,
} from 'lucide-react';

const shippingModes = [
  { icon: Plane, name: 'Air Freight', desc: 'Fast delivery', color: '#154230', time: '3-7 days' },
  { icon: Ship, name: 'Ocean Freight', desc: 'Cost-effective', color: '#A6824A', time: '14-45 days' },
  { icon: Truck, name: 'Land Transport', desc: 'Door-to-door', color: '#5D1E21', time: '5-21 days' },
];

const recentShipments = [
  { id: 'LEV-2024-001', origin: 'Shanghai, China', dest: 'Los Angeles, USA', status: 'in-transit', mode: 'ocean', eta: 'Jul 15, 2024' },
  { id: 'LEV-2024-002', origin: 'Mumbai, India', dest: 'Rotterdam, NL', status: 'customs', mode: 'ocean', eta: 'Jul 20, 2024' },
  { id: 'LEV-2024-003', origin: 'Tokyo, Japan', dest: 'New York, USA', status: 'delivered', mode: 'air', eta: 'Jun 28, 2024' },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    'in-transit': 'bg-blue-100 text-blue-700',
    'customs': 'bg-yellow-100 text-yellow-700',
    'delivered': 'bg-green-100 text-green-700',
    'pending': 'bg-gray-100 text-gray-700',
  };
  return styles[status] || styles.pending;
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    'in-transit': 'In Transit',
    'customs': 'At Customs',
    'delivered': 'Delivered',
    'pending': 'Pending',
  };
  return labels[status] || status;
};

export default function FreightPage() {
  const [activeTab, setActiveTab] = useState<'track' | 'shipments' | 'quote'>('track');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');

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
              <Link href="/freight" className="nav-link font-medium">Track</Link>
              <Link href="/freight/quotes" className="nav-link font-medium">Get Quote</Link>
              <Link href="/freight/shipments" className="nav-link font-medium">My Shipments</Link>
            </nav>

            <div className="flex items-center gap-3">
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
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Track</Link>
                <Link href="/freight/quotes" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Get Quote</Link>
                <Link href="/freight/shipments" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">My Shipments</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Global Logistics Platform
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Track shipments worldwide. Compare shipping rates. Manage your entire supply chain.
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
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Enter tracking number, port, or destination..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Track</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-sm text-white/70">Active Shipments</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">98.5%</p>
              <p className="text-sm text-white/70">On-Time Delivery</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-white/70">Countries Served</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-white/70">Tracking Support</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Shipping Modes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {shippingModes.map((mode) => {
              const Icon = mode.icon;
              return (
                <div key={mode.name} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: mode.color + '15' }}>
                    <Icon className="w-7 h-7" style={{ color: mode.color }} />
                  </div>
                  <h3 className="font-bold text-[#101111] mb-1">{mode.name}</h3>
                  <p className="text-sm text-[#4A4A4A] mb-2">{mode.desc}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#4A4A4A]">Transit Time</span>
                    <span className="font-medium text-[#101111]">{mode.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button onClick={() => setActiveTab('track')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'track' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Search className="w-4 h-4 inline mr-2" />
                Track
              </button>
              <button onClick={() => setActiveTab('shipments')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'shipments' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Box className="w-4 h-4 inline mr-2" />
                My Shipments
              </button>
              <button onClick={() => setActiveTab('quote')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'quote' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <DollarSign className="w-4 h-4 inline mr-2" />
                Get Quote
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'track' && (
                <div className="text-center py-12">
                  <Navigation className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#101111] mb-2">Track Your Shipment</h3>
                  <p className="text-[#4A4A4A]">Enter a tracking number above to see real-time updates.</p>
                </div>
              )}

              {activeTab === 'shipments' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#101111]">Active Shipments</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                      <Plus className="w-4 h-4" />
                      New Shipment
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentShipments.map((shipment) => (
                      <div key={shipment.id} className="p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="text-sm text-[#4A4A4A]">Tracking Number</div>
                            <div className="text-lg font-bold text-[#101111]">{shipment.id}</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(shipment.status)}`}>
                            {getStatusLabel(shipment.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-4 h-4 text-[#154230]" />
                          <span className="font-medium text-sm">{shipment.origin}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-sm">{shipment.dest}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-[#4A4A4A]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            ETA: {shipment.eta}
                          </span>
                          <button className="text-[#154230] font-medium hover:underline">View Details</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'quote' && (
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#101111] mb-2">Get a Freight Quote</h3>
                  <p className="text-[#4A4A4A] mb-4">Compare rates from top carriers worldwide.</p>
                  <button className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    Request Quote
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - 50% Green / 50% Burgundy */}
      <footer className="bg-[#154230]">
        <div className="bg-[#154230] px-4 sm:px-8 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain mb-4 brightness-0 invert" />
                <p className="text-white/70 text-sm mb-4">The operating system for global trade.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Platform</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/marketplace" className="text-white/70 hover:text-white transition-colors">Marketplace</Link></li>
                  <li><Link href="/documents" className="text-white/70 hover:text-white transition-colors">Documents</Link></li>
                  <li><Link href="/freight" className="text-white/70 hover:text-white transition-colors">Freight</Link></li>
                  <li><Link href="/compliance" className="text-white/70 hover:text-white transition-colors">Compliance</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/ai" className="text-white/70 hover:text-white transition-colors">AI Assistant</Link></li>
                  <li><Link href="/billing" className="text-white/70 hover:text-white transition-colors">Billing</Link></li>
                  <li><Link href="/ads" className="text-white/70 hover:text-white transition-colors">Ads</Link></li>
                  <li><Link href="/consultations" className="text-white/70 hover:text-white transition-colors">Consultations</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/careers" className="text-white/70 hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/70 text-sm">© 2024 LEVERAGE. All rights reserved.</p>
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
