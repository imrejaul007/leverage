'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Search,
  FileText,
  Bell,
  Menu,
  X,
  Globe,
  Users,
  Star,
  CheckCircle,
  MapPin,
  Truck,
  Shield,
  ArrowRight,
  Filter,
  ChevronDown,
  Building2,
  Award,
  BarChart3,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';

const sampleSuppliers = [
  {
    id: 'sup-001',
    name: 'Global Trade Exports',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Leading exporter of premium agricultural products including rice, spices, and pulses.',
    location: 'Mumbai, India',
    verified: true,
    rating: 4.8,
    reviews: 128,
    products: 245,
    responseTime: '< 2 hours',
    categories: ['Food & Agriculture', 'Spices'],
  },
  {
    id: 'sup-002',
    name: 'Cotton World Ltd',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Specialized in organic and conventional cotton yarn, fabrics, and textile raw materials.',
    location: 'Ahmedabad, India',
    verified: true,
    rating: 4.7,
    reviews: 96,
    products: 128,
    responseTime: '< 4 hours',
    categories: ['Textiles', 'Raw Materials'],
  },
  {
    id: 'sup-003',
    name: 'MetalLink Global',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Industrial metals and minerals supplier with global logistics capabilities.',
    location: 'Dubai, UAE',
    verified: true,
    rating: 4.9,
    reviews: 78,
    products: 89,
    responseTime: '< 1 hour',
    categories: ['Metals & Minerals', 'Industrial'],
  },
  {
    id: 'sup-004',
    name: 'Shanghai Import Co.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200',
    description: 'Electronics and solar energy products manufacturer and exporter.',
    location: 'Shanghai, China',
    verified: false,
    rating: 4.6,
    reviews: 89,
    products: 156,
    responseTime: '< 6 hours',
    categories: ['Electronics', 'Energy'],
  },
];

const benefits = [
  { icon: Shield, title: 'Verified Suppliers', desc: 'All suppliers are vetted and verified' },
  { icon: CheckCircle, title: 'Quality Assured', desc: 'Inspection and compliance services' },
  { icon: Truck, title: 'Global Shipping', desc: 'Integrated freight and logistics' },
  { icon: BarChart3, title: 'Real-time Data', desc: 'Live pricing and market insights' },
];

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'AI Assistant', href: '/ai', icon: BarChart3 },
  { name: 'Billing', href: '/billing', icon: BarChart3 },
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

export default function SuppliersDirectoryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/rfqs" className="nav-link font-medium">RFQs</Link>
              <Link href="/suppliers" className="nav-link font-medium text-[#154230]">Suppliers</Link>
              <Link href="/buyers" className="nav-link font-medium">Buyers</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
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
                <Link href="/rfqs" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">RFQs</Link>
                <Link href="/suppliers" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Suppliers</Link>
                <Link href="/buyers" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Buyers</Link>
                <Link href="/documents" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Building2 className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Supplier Directory
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover verified suppliers from around the world. Connect with trusted partners for your trade business.
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search suppliers by name, product, or location..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#5D1E21] hover:bg-[#7b1c1f] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">523</p>
              <p className="text-sm text-white/70">Verified Suppliers</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">45</p>
              <p className="text-sm text-white/70">Countries</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">12K+</p>
              <p className="text-sm text-white/70">Products</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-white/70">Response Rate</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Suppliers Grid */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#101111]">Featured Suppliers</h2>
                  <p className="text-sm text-[#4A4A4A]">Top-rated suppliers ready to do business</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#f7f5f1] hover:bg-[#E6E2DA] rounded-lg transition-colors text-sm font-medium"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <Link href="/suppliers/register" className="flex items-center gap-2 px-4 py-2 bg-[#154230] hover:bg-[#1d5240] text-white rounded-lg transition-colors text-sm font-medium">
                    <Building2 className="w-4 h-4" />
                    Register as Supplier
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleSuppliers.map((supplier) => (
                  <Link key={supplier.id} href={`/suppliers/${supplier.id}`} className="bg-[#f7f5f1] rounded-xl p-5 hover:bg-[#E6E2DA] transition-colors">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                        <Image
                          src={supplier.logo}
                          alt={supplier.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-[#101111] truncate">{supplier.name}</h3>
                          {supplier.verified && (
                            <CheckCircle className="w-4 h-4 text-[#154230] flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-[#4A4A4A] mb-2 line-clamp-2">{supplier.description}</p>
                        <div className="flex items-center gap-2 text-sm text-[#4A4A4A] mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{supplier.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {supplier.categories.map((cat) => (
                            <span key={cat} className="px-2 py-0.5 bg-[#A6824A]/10 text-[#A6824A] text-xs rounded font-medium">
                              {cat}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                              <span className="font-medium">{supplier.rating}</span>
                              <span className="text-[#4A4A4A]">({supplier.reviews})</span>
                            </span>
                            <span className="text-[#4A4A4A]">{supplier.products} products</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-black/10 flex items-center justify-between">
                      <span className="text-xs text-[#4A4A4A]">Response: {supplier.responseTime}</span>
                      <button
                        onClick={(e) => { e.preventDefault(); }}
                        className="px-3 py-1.5 bg-[#5D1E21] text-white text-xs font-medium rounded-lg hover:bg-[#7b1c1f] transition-colors flex items-center gap-1"
                      >
                        Contact
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link href="/suppliers" className="inline-flex items-center gap-2 px-6 py-3 text-[#154230] font-semibold hover:underline">
                  View All Suppliers
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="bg-[#154230] rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-white/70">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#154230] to-[#5D1E21] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Become a Verified Supplier</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join our network of verified suppliers and reach buyers from around the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/suppliers/register" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Register Now
            </Link>
            <Link href="/contact" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              Contact Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - 50% Green / 50% Maroon */}
      <footer className="bg-[#154230]">
        {/* Top section - Green */}
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

        {/* Bottom section - Maroon */}
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
