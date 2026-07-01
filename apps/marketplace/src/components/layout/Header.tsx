'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  ShoppingCart,
  Search,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Phone,
} from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
  notificationCount?: number;
  activeRoute?: string;
}

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/rfqs', label: 'RFQs' },
];

const popularCities = [
  'Mumbai', 'Delhi', 'Ahmedabad', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'
];

export function Header({ cartCount = 0, notificationCount = 0, activeRoute }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('All India');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Top Bar - IndiaMART Style */}
        <div className="bg-[#154230] text-white">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="hidden sm:flex items-center gap-4">
                <span>Welcome to LEVERAGE Marketplace</span>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <Link href="/contact" className="hidden md:block hover:underline">
                  Help Center
                </Link>
                <Link href="/contact" className="hidden md:block hover:underline">
                  24x7 Support
                </Link>
                <Link href="/contact" className="flex items-center gap-1 hover:underline">
                  <Phone className="w-4 h-4" />
                  +1-xxx-xxx-xxxx
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 sm:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
            </Link>

            {/* Location Selector - Desktop */}
            <div className="hidden lg:block">
              <button
                onClick={() => setLocationOpen(!locationOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <MapPin className="w-4 h-4 text-[#154230]" />
                <span className="text-sm font-medium text-gray-700">{selectedLocation}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${locationOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Location Dropdown */}
              <AnimatePresence>
                {locationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-50"
                  >
                    <div className="p-2 border-b border-gray-100">
                      <input
                        type="text"
                        placeholder="Search city..."
                        className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      />
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <button
                        onClick={() => { setSelectedLocation('All India'); setLocationOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                          selectedLocation === 'All India' ? 'bg-[#154230]/10 text-[#154230]' : 'hover:bg-gray-50'
                        }`}
                      >
                        All India
                      </button>
                      {popularCities.map((city) => (
                        <button
                          key={city}
                          onClick={() => { setSelectedLocation(city); setLocationOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                            selectedLocation === city ? 'bg-[#154230]/10 text-[#154230]' : 'hover:bg-gray-50'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, suppliers..."
                  className="w-full h-11 pl-12 pr-4 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154230]/20 focus:bg-white transition-colors"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Messages */}
              <Link
                href="/inbox"
                className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5D1E21] rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#A6824A] rounded-full flex items-center justify-center text-xs font-bold text-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Sign In */}
              <Link
                href="/login"
                className="hidden sm:inline-flex px-4 py-2 bg-[#154230] hover:bg-[#1a5a3a] text-white font-medium rounded-lg transition-colors text-sm"
              >
                Sign In
              </Link>

              {/* Post Free Ad */}
              <Link
                href="/rfqs/new"
                className="hidden sm:inline-flex px-4 py-2 bg-[#A6824A] hover:bg-[#8a6a3a] text-white font-medium rounded-lg transition-colors text-sm"
              >
                + Post RFQ
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-sm transition-colors ${
                  activeRoute === link.href
                    ? 'text-[#154230]'
                    : 'text-gray-600 hover:text-[#154230]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex-1" />
            <Link href="/suppliers" className="text-sm text-gray-500 hover:text-[#154230]">
              Sell on LEVERAGE
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-[#154230]">
              Help
            </Link>
          </nav>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden px-4 pb-4"
            >
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, suppliers..."
                    className="w-full h-12 pl-12 pr-4 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-3 rounded-lg font-medium ${
                      activeRoute === link.href
                        ? 'bg-[#154230]/5 text-[#154230]'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-2">
                  <Link
                    href="/rfqs/new"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 bg-[#A6824A] text-white rounded-lg font-medium text-center"
                  >
                    + Post RFQ
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 bg-[#154230] text-white rounded-lg font-medium text-center"
                  >
                    Sign In
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
