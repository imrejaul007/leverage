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
  Grid3X3,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  BarChart3,
  Truck,
  Shield,
  DollarSign,
  Package,
  Leaf,
  Cpu,
  Zap,
  Cog,
  Wheat,
  Shirt,
  Smartphone,
  Gem,
  Sun,
  Warehouse,
} from 'lucide-react';

const categories = [
  {
    name: 'Food & Agriculture',
    icon: Wheat,
    count: '1,245',
    description: 'Grains, spices, fruits, vegetables, and agricultural products',
    color: '#A6824A',
    featured: ['Basmati Rice', 'Organic Spices', 'Fresh Fruits'],
  },
  {
    name: 'Textiles',
    icon: Shirt,
    count: '892',
    description: 'Fabrics, yarn, garments, and textile raw materials',
    color: '#5D1E21',
    featured: ['Cotton Yarn', 'Silk Fabrics', 'Technical Textiles'],
  },
  {
    name: 'Electronics',
    icon: Smartphone,
    count: '1,102',
    description: 'Consumer electronics, components, and accessories',
    color: '#154230',
    featured: ['Smartphones', 'PCBs', 'Display Panels'],
  },
  {
    name: 'Metals & Minerals',
    icon: Gem,
    count: '654',
    description: 'Industrial metals, minerals, and raw materials',
    color: '#4A4A4A',
    featured: ['Copper Cathode', 'Aluminum', 'Steel'],
  },
  {
    name: 'Energy',
    icon: Sun,
    count: '423',
    description: 'Solar panels, batteries, and renewable energy products',
    color: '#A6824A',
    featured: ['Solar Panels', 'Inverters', 'Batteries'],
  },
  {
    name: 'Machinery',
    icon: Cog,
    count: '789',
    description: 'Industrial machinery, equipment, and spare parts',
    color: '#5D1E21',
    featured: ['CNC Machines', 'Generators', 'Pumps'],
  },
  {
    name: 'Chemicals',
    icon: Leaf,
    count: '456',
    description: 'Industrial chemicals, fertilizers, and coatings',
    color: '#154230',
    featured: ['Industrial Chemicals', 'Fertilizers', 'Polymers'],
  },
  {
    name: 'Automotive',
    icon: Warehouse,
    count: '678',
    description: 'Vehicle parts, accessories, and components',
    color: '#4A4A4A',
    featured: ['Engine Parts', 'Tires', 'Electronics'],
  },
];

const subcategories: Record<string, string[]> = {
  'Food & Agriculture': ['Grains & Rice', 'Spices & Seasonings', 'Fresh Produce', 'Coffee & Tea', 'Nuts & Dried Fruits', 'Edible Oils'],
  'Textiles': ['Cotton', 'Silk', 'Synthetic', 'Wool', 'Technical Textiles', 'Garments'],
  'Electronics': ['Consumer Electronics', 'Components', 'PCBs', 'Displays', 'Batteries', 'Cables'],
  'Metals & Minerals': ['Ferrous Metals', 'Non-Ferrous Metals', 'Precious Metals', 'Industrial Minerals', 'Alloys', 'Scrap'],
  'Energy': ['Solar', 'Wind', 'Storage', 'Grid Equipment', 'Renewable Components', 'Utilities'],
  'Machinery': ['Industrial Machinery', 'Construction Equipment', 'Agricultural Machinery', 'Packaging', 'HVAC', 'Spare Parts'],
  'Chemicals': ['Industrial Chemicals', 'Petrochemicals', 'Fertilizers', 'Coatings', 'Polymers', 'Adhesives'],
  'Automotive': ['Engine Components', 'Body Parts', 'Electronics', 'Tires', 'Interior', 'Accessories'],
};

const benefits = [
  { icon: Shield, title: 'Verified Categories', desc: 'All categories vetted for trade' },
  { icon: Truck, title: 'Global Shipping', desc: 'Freight integration built-in' },
  { icon: CheckCircle, title: 'Quality Assured', desc: 'Inspection services available' },
  { icon: TrendingUp, title: 'Market Trends', desc: 'Real-time pricing data' },
];

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'AI Assistant', href: '/ai', icon: BarChart3 },
  { name: 'Billing', href: '/billing', icon: DollarSign },
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

function CheckCircle(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.className?.split(' ')[1]?.split('h-')[1]?.split(' ')[0] || 24} height={props.className?.split(' ')[1]?.split('h-')[1]?.split(' ')[0] || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function CategoriesBrowsePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
              <Link href="/marketplace" className="nav-link font-medium text-[#154230]">Marketplace</Link>
              <Link href="/rfqs" className="nav-link font-medium">RFQs</Link>
              <Link href="/suppliers" className="nav-link font-medium">Suppliers</Link>
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
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Marketplace</Link>
                <Link href="/rfqs" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">RFQs</Link>
                <Link href="/suppliers" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Suppliers</Link>
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
              <Grid3X3 className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Browse Categories
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Explore our comprehensive product categories to find exactly what you need for your trade business.
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
                    placeholder="Search categories, products, or subcategories..."
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
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-white/70">Main Categories</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">48</p>
              <p className="text-sm text-white/70">Subcategories</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">6,239</p>
              <p className="text-sm text-white/70">Products</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">523</p>
              <p className="text-sm text-white/70">Suppliers</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Categories Grid */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#101111]">Product Categories</h2>
                  <p className="text-sm text-[#4A4A4A]">Browse by category to find products and suppliers</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#4A4A4A]">Showing all categories</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={`/marketplace?category=${encodeURIComponent(category.name)}`}
                      className="bg-[#f7f5f1] rounded-xl p-5 hover:bg-[#E6E2DA] transition-colors group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <Icon className="w-6 h-6" style={{ color: category.color }} />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#101111]">{category.name}</h3>
                          <p className="text-sm text-[#4A4A4A]">{category.count} products</p>
                        </div>
                      </div>
                      <p className="text-sm text-[#4A4A4A] mb-3 line-clamp-2">{category.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {category.featured.map((item) => (
                          <span key={item} className="px-2 py-0.5 bg-white text-xs text-[#4A4A4A] rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#4A4A4A]">
                          {subcategories[category.name]?.length || 0} subcategories
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#4A4A4A] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Subcategories Section */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="p-6 border-b border-black/5">
              <div>
                <h2 className="text-xl font-bold text-[#101111]">Popular Subcategories</h2>
                <p className="text-sm text-[#4A4A4A]">Quick access to frequently traded subcategories</p>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {Object.entries(subcategories).flatMap(([category, subs]) =>
                  subs.map((sub) => (
                    <Link
                      key={`${category}-${sub}`}
                      href={`/marketplace?category=${encodeURIComponent(category)}&sub=${encodeURIComponent(sub)}`}
                      className="bg-[#f7f5f1] rounded-lg p-3 hover:bg-[#E6E2DA] transition-colors text-center group"
                    >
                      <p className="font-medium text-sm text-[#101111] group-hover:text-[#154230] transition-colors">{sub}</p>
                      <p className="text-xs text-[#4A4A4A] mt-1">{category}</p>
                    </Link>
                  ))
                )}
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Find What You Need</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Browse our categories and connect with verified suppliers for all your trade requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/marketplace" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
              <Package className="w-5 h-5" />
              Browse Marketplace
            </Link>
            <Link href="/rfqs/new" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              Post RFQ <ArrowRight className="w-4 h-4" />
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
