'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search, Truck, Plane, Ship, Clock, DollarSign, MapPin, CheckCircle, X,
  Anchor, Globe, Bell, Menu, Settings, LogOut, Home, User, Plus,
  MessageSquare, FileText, Package, BarChart3
} from 'lucide-react';

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

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/freight', icon: Ship, label: 'Freight', active: true },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

const bottomNavLinks = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs/new', icon: Plus, label: 'Post RFQ', primary: true },
  { href: '/marketplace/inbox', icon: MessageSquare, label: 'Inbox' },
  { href: '/account', icon: User, label: 'Account' },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar - Fixed on left */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#154230] text-white'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header & Overlay - Visible only on mobile */}
      <div className="lg:hidden">
        {/* Green Gradient Header */}
        <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            {/* Logo and Tagline */}
            <div className="flex items-center gap-2">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
              </button>
              <button onClick={() => setSidebarOpen(true)} className="p-2 text-white">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Freight & Logistics</h2>
            <p className="text-white/70 text-sm">Compare shipping rates from top carriers</p>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <aside className="relative w-72 bg-white h-full flex flex-col shadow-xl">
              <div className="flex items-center justify-between p-6 border-b border-black/5">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-[#E6E2DA] rounded-lg">
                  <X className="w-5 h-5 text-[#4A4A4A]" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = link.active;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-[#154230] text-white'
                          : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-black/5">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JD</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#101111] font-semibold text-sm">John Doe</p>
                    <p className="text-[#4A4A4A] text-xs">john@company.com</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="lg:ml-64 pb-24 lg:pb-0">
        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-b from-[#154230] to-[#1d5240] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-2xl">Freight & Logistics</h1>
              <p className="text-white/70 text-sm mt-1">Compare shipping rates from top carriers worldwide</p>
            </div>
            <button className="relative p-3 text-white/80 hover:text-white transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="px-4 lg:px-8 py-6 space-y-4">
          {/* Freight Stats Bar - Burgundy */}
          <div className="bg-[#5D1E21] rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Ship className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">50+</p>
                  <p className="text-white/60 text-xs font-medium">Carriers</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Anchor className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">120+</p>
                  <p className="text-white/60 text-xs font-medium">Ports</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">45</p>
                  <p className="text-white/60 text-xs font-medium">Countries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Form Card */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-[#101111] text-xs font-semibold mb-1.5">Origin</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#4A4A4A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="City or Port"
                    className="w-full h-11 pl-10 pr-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#101111] text-xs font-semibold mb-1.5">Destination</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#4A4A4A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="City or Port"
                    className="w-full h-11 pl-10 pr-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#101111] text-xs font-semibold mb-1.5">Shipping Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShippingType('sea')}
                    className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm transition-colors ${
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
                    className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm transition-colors ${
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
              className="w-full h-12 bg-[#154230] text-white font-semibold rounded-xl hover:bg-[#1d5240] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Getting Quotes...' : 'Get Quotes'}
            </button>
          </div>

          {/* Success Message */}
          {bookingSuccess && (
            <div className="bg-[#154230] text-white p-4 rounded-2xl flex items-center gap-3 shadow-md">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium text-sm">Booking confirmed! You will receive confirmation via email.</span>
            </div>
          )}

          {/* Quotes */}
          {quotes.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-[#101111] font-semibold text-sm">{quotes.length} quotes found</h2>
              {quotes.map(quote => (
                <div key={quote.id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E6E2DA] flex items-center justify-center text-2xl">
                      {quote.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[#101111] font-semibold text-sm">{quote.carrier}</h3>
                        <span className="flex items-center gap-1 text-[#A6824A] text-xs font-medium">
                          ★ {quote.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[#4A4A4A] text-xs font-medium">
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
                      <p className="text-[#4A4A4A] text-xs font-medium">per container</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedQuote(quote);
                        setShowBookingModal(true);
                      }}
                      className="px-4 py-2 bg-[#154230] text-white font-semibold rounded-xl text-sm hover:bg-[#1d5240] transition-colors"
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
            <div className="bg-white rounded-2xl shadow-md p-4">
              <h2 className="text-[#101111] font-semibold text-sm mb-3">Popular Routes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {popularRoutes.map((route, i) => (
                  <div key={i} className="p-3 bg-[#E6E2DA] rounded-xl">
                    <div className="flex items-center gap-2 text-[#101111] text-sm font-semibold">
                      <MapPin className="w-3 h-3 text-[#A6824A]" />
                      {route.from}
                      <span className="text-[#4A4A4A]">→</span>
                      {route.to}
                    </div>
                    <div className="flex gap-3 mt-2 text-xs font-medium">
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

          {/* Bottom Stats Summary - Burgundy */}
          <div className="bg-[#5D1E21] rounded-2xl p-4">
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">$18M+</p>
                <p className="text-white/60 text-xs font-medium">Saved by users</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">2,500+</p>
                <p className="text-white/60 text-xs font-medium">Shipments booked</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 px-4 py-2 z-30">
        <div className="flex items-center justify-around">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href === '/freight';
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 py-2 px-3 ${
                  link.primary ? '-mt-4' : ''
                }`}
              >
                {link.primary ? (
                  <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-[#154230]' : 'bg-[#E6E2DA]'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#4A4A4A]'}`} />
                  </div>
                )}
                <span className={`text-xs font-medium ${isActive ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Booking Modal */}
      {showBookingModal && selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setShowBookingModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-black/5 flex items-center justify-between">
              <div>
                <h2 className="text-[#101111] font-semibold text-sm">Book with {selectedQuote.carrier}</h2>
                <p className="text-[#4A4A4A] text-xs font-medium">{selectedQuote.type} • {selectedQuote.transit}</p>
              </div>
              <button onClick={() => setShowBookingModal(false)} className="p-2 text-[#4A4A4A] hover:text-[#101111] hover:bg-[#E6E2DA] rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-[#101111] text-xs font-semibold mb-1.5">Container Type</label>
                <select
                  value={bookingForm.containerType}
                  onChange={(e) => setBookingForm({ ...bookingForm, containerType: e.target.value })}
                  className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm"
                >
                  <option value="20ft">20ft Container</option>
                  <option value="40ft">40ft Container</option>
                  <option value="40hq">40ft High Cube</option>
                </select>
              </div>
              <div>
                <label className="block text-[#101111] text-xs font-semibold mb-1.5">Shipper Name</label>
                <input
                  type="text"
                  value={bookingForm.shipperName}
                  onChange={(e) => setBookingForm({ ...bookingForm, shipperName: e.target.value })}
                  placeholder="Enter shipper name"
                  className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                />
              </div>
              <div>
                <label className="block text-[#101111] text-xs font-semibold mb-1.5">Consignee Name</label>
                <input
                  type="text"
                  value={bookingForm.consigneeName}
                  onChange={(e) => setBookingForm({ ...bookingForm, consigneeName: e.target.value })}
                  placeholder="Enter consignee name"
                  className="w-full h-11 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                />
              </div>
              <div className="p-3 bg-[#E6E2DA] rounded-xl">
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A4A4A] font-medium">Estimated Cost</span>
                  <span className="text-[#101111] font-bold">${selectedQuote.price.toLocaleString()} {selectedQuote.currency}</span>
                </div>
              </div>
              <button
                onClick={handleBook}
                className="w-full h-12 bg-[#154230] text-white font-semibold rounded-xl hover:bg-[#1d5240] transition-colors"
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