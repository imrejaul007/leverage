'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Box,
  Truck,
  Ship,
  Plane,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  Share2,
  Bell,
  Menu,
  X,
  ChevronRight,
  Package,
  Anchor,
  Building,
  Weight,
  Ruler,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Box },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: AlertCircle },
  { name: 'AI Assistant', href: '/ai', icon: Bell },
  { name: 'Billing', href: '/billing', icon: FileText },
  { name: 'Ads', href: '/ads', icon: Bell },
  { name: 'Consultations', href: '/consultations', icon: Box },
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

export default function ShipmentDetailPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'documents' | 'timeline'>('details');

  // Mock shipment data - in real app this would come from params
  const shipment = {
    id: 'LEV-2024-001',
    status: 'in-transit',
    origin: 'Shanghai, China',
    originCode: 'CNSHA',
    destination: 'Los Angeles, USA',
    destinationCode: 'USLAX',
    mode: 'ocean',
    carrier: 'Maersk Line',
    vessel: 'Maersk Elba',
    voyage: '224E',
    eta: 'Jun 20, 2024',
    etd: 'Jun 05, 2024',
    containerNumber: 'MSKU1234567',
    containerType: '40ft High Cube',
    weight: '18,500 kg',
    volume: '32 cbm',
    pieces: '4 pallets',
    bookingNumber: 'MAEU123456789',
    billOfLading: 'MSKU123456789',
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'air': return Plane;
      case 'ocean': return Ship;
      case 'land': return Truck;
      default: return Box;
    }
  };

  const ModeIcon = getModeIcon(shipment.mode);

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

      {/* Main Content */}
      <main className="px-4 sm:px-8 py-8 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Back Link */}
          <Link href="/freight" className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#154230] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Freight</span>
          </Link>

          {/* Header Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-2xl font-bold text-[#101111]">{shipment.id}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(shipment.status)}`}>
                    {getStatusLabel(shipment.status)}
                  </span>
                </div>

                {/* Route Display */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-xs text-[#4A4A4A] uppercase tracking-wide">Origin</p>
                    <p className="text-lg font-bold text-[#101111]">{shipment.originCode}</p>
                    <p className="text-sm text-[#4A4A4A]">{shipment.origin}</p>
                  </div>
                  <div className="flex-1 flex items-center gap-2 px-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <div className="w-10 h-10 rounded-full bg-[#154230]/10 flex items-center justify-center">
                      <ModeIcon className="w-5 h-5 text-[#154230]" />
                    </div>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#4A4A4A] uppercase tracking-wide">Destination</p>
                    <p className="text-lg font-bold text-[#101111]">{shipment.destinationCode}</p>
                    <p className="text-sm text-[#4A4A4A]">{shipment.destination}</p>
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-[#4A4A4A] uppercase tracking-wide mb-1">ETA</p>
                    <p className="font-semibold text-[#101111] flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#154230]" />
                      {shipment.eta}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] uppercase tracking-wide mb-1">ETD</p>
                    <p className="font-semibold text-[#101111] flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#A6824A]" />
                      {shipment.etd}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] uppercase tracking-wide mb-1">Carrier</p>
                    <p className="font-semibold text-[#101111]">{shipment.carrier}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#4A4A4A] uppercase tracking-wide mb-1">Vessel</p>
                    <p className="font-semibold text-[#101111]">{shipment.vessel}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#f7f5f1] hover:bg-[#E6E2DA] text-[#101111] font-medium rounded-lg transition-colors text-sm">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#f7f5f1] hover:bg-[#E6E2DA] text-[#101111] font-medium rounded-lg transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] hover:bg-[#1d5240] text-white font-medium rounded-lg transition-colors text-sm">
                  <FileText className="w-4 h-4" />
                  Documents
                </button>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="flex border-b border-black/5">
              <button onClick={() => setActiveTab('details')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'details' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Package className="w-4 h-4 inline mr-2" />
                Shipment Details
              </button>
              <button onClick={() => setActiveTab('documents')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'documents' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <FileText className="w-4 h-4 inline mr-2" />
                Documents
              </button>
              <button onClick={() => setActiveTab('timeline')} className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${activeTab === 'timeline' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'}`}>
                <Clock className="w-4 h-4 inline mr-2" />
                Timeline
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Cargo Details */}
                  <div>
                    <h3 className="text-lg font-bold text-[#101111] mb-4">Cargo Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-[#f7f5f1] rounded-xl">
                        <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                          <Weight className="w-6 h-6 text-[#154230]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#4A4A4A]">Total Weight</p>
                          <p className="font-semibold text-[#101111]">{shipment.weight}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-[#f7f5f1] rounded-xl">
                        <div className="w-12 h-12 rounded-xl bg-[#A6824A]/10 flex items-center justify-center">
                          <Ruler className="w-6 h-6 text-[#A6824A]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#4A4A4A]">Volume</p>
                          <p className="font-semibold text-[#101111]">{shipment.volume}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-[#f7f5f1] rounded-xl">
                        <div className="w-12 h-12 rounded-xl bg-[#5D1E21]/10 flex items-center justify-center">
                          <Box className="w-6 h-6 text-[#5D1E21]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#4A4A4A]">Pieces</p>
                          <p className="font-semibold text-[#101111]">{shipment.pieces}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Container Details */}
                  <div>
                    <h3 className="text-lg font-bold text-[#101111] mb-4">Container Information</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-[#f7f5f1] rounded-xl">
                        <p className="text-sm text-[#4A4A4A] mb-1">Container Number</p>
                        <p className="font-semibold text-[#101111] text-lg">{shipment.containerNumber}</p>
                      </div>
                      <div className="p-4 bg-[#f7f5f1] rounded-xl">
                        <p className="text-sm text-[#4A4A4A] mb-1">Container Type</p>
                        <p className="font-semibold text-[#101111]">{shipment.containerType}</p>
                      </div>
                      <div className="p-4 bg-[#f7f5f1] rounded-xl">
                        <p className="text-sm text-[#4A4A4A] mb-1">Bill of Lading</p>
                        <p className="font-semibold text-[#101111]">{shipment.billOfLading}</p>
                      </div>
                      <div className="p-4 bg-[#f7f5f1] rounded-xl">
                        <p className="text-sm text-[#4A4A4A] mb-1">Booking Number</p>
                        <p className="font-semibold text-[#101111]">{shipment.bookingNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-[#101111] mb-4">Shipping Documents</h3>
                  {[
                    { name: 'Bill of Lading', date: 'Jun 01, 2024' },
                    { name: 'Packing List', date: 'Jun 01, 2024' },
                    { name: 'Commercial Invoice', date: 'Jun 01, 2024' },
                    { name: 'Certificate of Origin', date: 'Jun 02, 2024' },
                    { name: 'Delivery Order', date: 'Pending' },
                  ].map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#154230]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#101111]">{doc.name}</p>
                          <p className="text-sm text-[#4A4A4A]">{doc.date}</p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors">
                        <Download className="w-5 h-5 text-[#4A4A4A]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'timeline' && (
                <div>
                  <h3 className="text-lg font-bold text-[#101111] mb-6">Shipment Timeline</h3>
                  <div className="space-y-0">
                    {trackingEvents.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${event.completed ? 'bg-[#154230]' : 'bg-gray-200'}`}>
                            {event.completed ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                            )}
                          </div>
                          {index < trackingEvents.length - 1 && (
                            <div className={`w-0.5 flex-1 ${event.completed ? 'bg-[#154230]/30' : 'bg-gray-200'}`}></div>
                          )}
                        </div>
                        <div className={`flex-1 pb-8 ${index === 0 ? '' : ''}`}>
                          <p className={`font-semibold ${index === 0 ? 'text-[#101111]' : 'text-[#4A4A4A]'}`}>{event.status}</p>
                          <p className="text-sm text-[#4A4A4A] flex items-center gap-2 mt-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </p>
                          <p className="text-xs text-[#4A4A4A] mt-1">
                            {event.date} at {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need to Ship Something?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get instant shipping quotes and manage all your shipments in one place.
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
