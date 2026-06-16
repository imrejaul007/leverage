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
  Box,
  Navigation,
  ChevronRight,
  AlertCircle,
  Package,
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

const trackingEvents = [
  { date: 'Jun 15, 2024', time: '14:30', location: 'Port of Los Angeles', status: 'Arrived at destination port', completed: true },
  { date: 'Jun 12, 2024', time: '08:15', location: 'Pacific Ocean', status: 'In transit - vessel on schedule', completed: true },
  { date: 'Jun 10, 2024', time: '22:00', location: 'Transshipment Hub, Busan', status: 'Container transferred', completed: true },
  { date: 'Jun 08, 2024', time: '16:45', location: 'Port of Busan', status: 'Departed port', completed: true },
  { date: 'Jun 05, 2024', time: '09:30', location: 'Port of Shanghai', status: 'Loaded onto vessel', completed: true },
  { date: 'Jun 03, 2024', time: '11:00', location: 'Port of Shanghai', status: 'Arrived at origin port', completed: true },
  { date: 'Jun 01, 2024', time: '08:00', location: 'Factory, Shanghai', status: 'Picked up from shipper', completed: true },
];

const recentShipments = [
  { id: 'LEV-2024-001', origin: 'Shanghai, China', dest: 'Los Angeles, USA', status: 'in-transit', mode: 'ocean', eta: 'Jun 20, 2024' },
  { id: 'LEV-2024-002', origin: 'Mumbai, India', dest: 'Rotterdam, NL', status: 'customs', mode: 'ocean', eta: 'Jun 22, 2024' },
  { id: 'LEV-2024-003', origin: 'Tokyo, Japan', dest: 'New York, USA', status: 'delivered', mode: 'air', eta: 'Jun 12, 2024' },
  { id: 'LEV-2024-004', origin: 'Hamburg, Germany', dest: 'Vancouver, Canada', status: 'pending', mode: 'ocean', eta: 'Jul 05, 2024' },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    'in-transit': 'bg-blue-100 text-blue-700',
    'customs': 'bg-yellow-100 text-yellow-700',
    'delivered': 'bg-green-100 text-green-700',
    'pending': 'bg-gray-100 text-gray-700',
    'delayed': 'bg-red-100 text-red-700',
  };
  return styles[status] || styles.pending;
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    'in-transit': 'In Transit',
    'customs': 'At Customs',
    'delivered': 'Delivered',
    'pending': 'Pending',
    'delayed': 'Delayed',
  };
  return labels[status] || status;
};

export default function TrackingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [searchedId, setSearchedId] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      setSearchedId(trackingInput.trim());
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'air': return Plane;
      case 'ocean': return Ship;
      case 'land': return Truck;
      default: return Box;
    }
  };

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
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Track Your Shipments
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Real-time tracking for shipments worldwide. Enter your tracking number to see live updates.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <form onSubmit={handleTrack} className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    placeholder="Enter tracking number (e.g., LEV-2024-001)..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button type="submit" className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Track</span>
                </button>
              </div>
            </form>
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
          {/* Search Result */}
          {searchedId && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#101111]">Shipment {searchedId}</h2>
                  <p className="text-[#4A4A4A]">Real-time tracking information</p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  In Transit
                </span>
              </div>

              {/* Route */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-[#f7f5f1] rounded-xl">
                <div className="text-center">
                  <p className="text-xs text-[#4A4A4A] uppercase tracking-wide">Origin</p>
                  <p className="text-lg font-bold text-[#101111]">CNSHA</p>
                  <p className="text-sm text-[#4A4A4A]">Shanghai, China</p>
                </div>
                <div className="flex-1 flex items-center gap-2 px-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <div className="w-10 h-10 rounded-full bg-[#154230]/10 flex items-center justify-center">
                    <Ship className="w-5 h-5 text-[#154230]" />
                  </div>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#4A4A4A] uppercase tracking-wide">Destination</p>
                  <p className="text-lg font-bold text-[#101111]">USLAX</p>
                  <p className="text-sm text-[#4A4A4A]">Los Angeles, USA</p>
                </div>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <p className="text-xs text-[#4A4A4A] uppercase tracking-wide mb-1">ETA</p>
                  <p className="font-semibold text-[#101111]">Jun 20, 2024</p>
                </div>
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <p className="text-xs text-[#4A4A4A] uppercase tracking-wide mb-1">Carrier</p>
                  <p className="font-semibold text-[#101111]">Maersk Line</p>
                </div>
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <p className="text-xs text-[#4A4A4A] uppercase tracking-wide mb-1">Vessel</p>
                  <p className="font-semibold text-[#101111]">Maersk Elba</p>
                </div>
                <div className="p-4 bg-[#f7f5f1] rounded-xl">
                  <p className="text-xs text-[#4A4A4A] uppercase tracking-wide mb-1">Container</p>
                  <p className="font-semibold text-[#101111]">MSKU1234567</p>
                </div>
              </div>

              <Link href={`/freight/shipments/${searchedId}`} className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-colors">
                View Full Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}

          {/* Recent Shipments */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111]">Recent Shipments</h2>
              <p className="text-[#4A4A4A] text-sm">Your tracked shipments</p>
            </div>
            <div className="divide-y divide-black/5">
              {recentShipments.map((shipment) => {
                const ModeIcon = getModeIcon(shipment.mode);
                return (
                  <Link key={shipment.id} href={`/freight/shipments/${shipment.id}`} className="block p-6 hover:bg-[#f7f5f1] transition-colors">
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
                      <ModeIcon className="w-4 h-4 text-[#154230]" />
                      <span className="font-medium text-sm">{shipment.origin}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-sm">{shipment.dest}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#4A4A4A]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        ETA: {shipment.eta}
                      </span>
                      <span className="text-[#154230] font-medium hover:underline">View Details</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="bg-white px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-[#101111] text-center mb-12">How Shipment Tracking Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#154230]/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-2">1. Enter Tracking Number</h3>
              <p className="text-[#4A4A4A] text-sm">Input your LEVERAGE tracking number or bill of lading number to start tracking.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#A6824A]/10 flex items-center justify-center mx-auto mb-4">
                <Navigation className="w-8 h-8 text-[#A6824A]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-2">2. Get Real-Time Updates</h3>
              <p className="text-[#4A4A4A] text-sm">See live location updates, estimated arrival times, and port status information.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#5D1E21]/10 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-[#5D1E21]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-2">3. Receive Notifications</h3>
              <p className="text-[#4A4A4A] text-sm">Get email or SMS alerts when your shipment status changes or arrives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Ship?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get instant shipping quotes and track your shipments in real-time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/freight/quote" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Get a Quote
            </Link>
            <Link href="/freight/rates" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Compare Rates
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
