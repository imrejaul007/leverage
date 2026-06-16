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
  Clock,
  DollarSign,
  Scale,
  MapPin,
  ArrowDown,
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

const shippingModes = [
  { id: 'air', icon: Plane, name: 'Air Freight', transit: '3-7 days', color: '#154230' },
  { id: 'ocean', icon: Ship, name: 'Ocean Freight', transit: '14-45 days', color: '#A6824A' },
  { id: 'land', icon: Truck, name: 'Land Transport', transit: '5-21 days', color: '#5D1E21' },
];

const mockQuotes = [
  { carrier: 'Maersk Line', mode: 'ocean', price: 2450, currency: 'USD', transitDays: 21, rating: 4.8 },
  { carrier: 'MSC', mode: 'ocean', price: 2280, currency: 'USD', transitDays: 24, rating: 4.6 },
  { carrier: 'COSCO', mode: 'ocean', price: 2150, currency: 'USD', transitDays: 28, rating: 4.5 },
  { carrier: 'Evergreen', mode: 'ocean', price: 2350, currency: 'USD', transitDays: 22, rating: 4.7 },
];

export default function QuotePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    mode: 'ocean',
    cargoType: 'general',
    incoterm: 'CIF',
  });
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'air': return Plane;
      case 'ocean': return Ship;
      case 'land': return Truck;
      default: return Ship;
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
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-20">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Get a Freight Quote
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Compare shipping rates from top carriers worldwide. Get instant quotes for air, ocean, and land freight.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {!showResults ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#154230] text-white' : 'bg-gray-200'}`}>
                      {step > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">Route</span>
                  </div>
                  <div className="w-12 h-px bg-gray-200"></div>
                  <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#154230] text-white' : 'bg-gray-200'}`}>
                      {step > 2 ? <CheckCircle className="w-4 h-4" /> : '2'}
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">Cargo</span>
                  </div>
                  <div className="w-12 h-px bg-gray-200"></div>
                  <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#154230] text-white' : 'bg-gray-200'}`}>
                      3
                    </div>
                    <span className="text-sm font-medium hidden sm:inline">Results</span>
                  </div>
                </div>

                {/* Step 1: Route */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#101111] mb-6">Where are you shipping from and to?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#101111] mb-2">Origin Port or City</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                          <input
                            type="text"
                            value={formData.origin}
                            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                            placeholder="e.g., Shanghai, China"
                            className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#101111] mb-2">Destination Port or City</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                          <input
                            type="text"
                            value={formData.destination}
                            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                            placeholder="e.g., Los Angeles, USA"
                            className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#101111] mb-3">Shipping Mode</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {shippingModes.map((mode) => {
                          const Icon = mode.icon;
                          return (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, mode: mode.id })}
                              className={`p-4 rounded-xl border-2 transition-all text-left ${formData.mode === mode.id ? 'border-[#154230] bg-[#154230]/5' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: mode.color + '15' }}>
                                  <Icon className="w-6 h-6" style={{ color: mode.color }} />
                                </div>
                                <div>
                                  <p className="font-semibold text-[#101111]">{mode.name}</p>
                                  <p className="text-sm text-[#4A4A4A]">{mode.transit}</p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.origin || !formData.destination}
                        className="flex items-center gap-2 px-6 py-3 bg-[#154230] hover:bg-[#1d5240] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold rounded-lg transition-colors"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Cargo Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-[#101111] mb-6">Tell us about your cargo</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[#101111] mb-2">Total Weight (kg)</label>
                        <div className="relative">
                          <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                          <input
                            type="number"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            placeholder="e.g., 5000"
                            className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#101111] mb-2">Cargo Type</label>
                        <select
                          value={formData.cargoType}
                          onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
                          className="w-full h-14 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                        >
                          <option value="general">General Cargo</option>
                          <option value="hazardous">Hazardous Materials</option>
                          <option value="perishable">Perishable Goods</option>
                          <option value="oversized">Oversized Cargo</option>
                          <option value="fragile">Fragile Items</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#101111] mb-3">Dimensions (cm)</label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <input
                            type="number"
                            value={formData.length}
                            onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                            placeholder="Length"
                            className="w-full h-14 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={formData.width}
                            onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                            placeholder="Width"
                            className="w-full h-14 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            value={formData.height}
                            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                            placeholder="Height"
                            className="w-full h-14 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#101111] mb-2">Incoterm</label>
                      <select
                        value={formData.incoterm}
                        onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                        className="w-full h-14 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      >
                        <option value="EXW">EXW - Ex Works</option>
                        <option value="FOB">FOB - Free on Board</option>
                        <option value="CIF">CIF - Cost, Insurance, Freight</option>
                        <option value="DDP">DDP - Delivered Duty Paid</option>
                        <option value="DAP">DAP - Delivered at Place</option>
                      </select>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 border border-gray-300 text-[#101111] font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-colors"
                      >
                        Get Quotes
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Quote Summary */}
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#101111] mb-2">Your Quote Summary</h2>
                    <div className="flex items-center gap-4 text-sm text-[#4A4A4A]">
                      <span>{formData.origin}</span>
                      <ArrowRight className="w-4 h-4" />
                      <span>{formData.destination}</span>
                      <span className="px-2 py-1 bg-[#f7f5f1] rounded">{formData.weight} kg</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-sm text-[#154230] font-medium hover:underline"
                  >
                    Modify Search
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#101111]">{mockQuotes.length} Quotes Found</h3>
                {mockQuotes.map((quote, index) => {
                  const Icon = getModeIcon(quote.mode);
                  return (
                    <motion.div
                      key={quote.carrier}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-[#f7f5f1] flex items-center justify-center">
                            <Icon className="w-7 h-7 text-[#154230]" />
                          </div>
                          <div>
                            <p className="font-bold text-[#101111] text-lg">{quote.carrier}</p>
                            <div className="flex items-center gap-3 text-sm text-[#4A4A4A]">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {quote.transitDays} days
                              </span>
                              <span className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                {quote.rating} rating
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#101111]">{quote.currency} {quote.price.toLocaleString()}</p>
                            <p className="text-sm text-[#4A4A4A]">Total cost</p>
                          </div>
                          <button className="px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-colors">
                            Book Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-[#101111] text-center mb-12">Why Get a Quote with LEVERAGE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#154230]/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#154230]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-2">Compare Multiple Carriers</h3>
              <p className="text-[#4A4A4A] text-sm">Get quotes from 50+ verified carriers in one place. No more visiting multiple websites.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#A6824A]/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[#A6824A]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-2">Instant Results</h3>
              <p className="text-[#4A4A4A] text-sm">Receive competitive quotes within minutes. Save time on your shipping research.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#5D1E21]/10 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-[#5D1E21]" />
              </div>
              <h3 className="font-bold text-[#101111] mb-2">Transparent Pricing</h3>
              <p className="text-[#4A4A4A] text-sm">No hidden fees. See all costs upfront including fuel surcharges and port fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Ship?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust LEVERAGE for their global logistics needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Get Started Free
            </Link>
            <Link href="/freight/tracking" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Track a Shipment
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
