'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Bell,
  FileText,
  Code,
  Lightbulb,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Documents', href: '/documents' },
  { name: 'Freight', href: '/freight' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'AI Assistant', href: '/ai' },
  { name: 'Billing', href: '/billing' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

const hsChapters = [
  { chapter: '1-5', name: 'Live Animals & Products', description: 'Live animals, meat, fish, dairy, and animal products' },
  { chapter: '6-14', name: 'Plants & Products', description: 'Plants, vegetables, fruits, grains, and plant products' },
  { chapter: '15-24', name: 'Fats, Foods, Beverages', description: 'Animal/vegetable fats, food preparations, beverages, tobacco' },
  { chapter: '25-27', name: 'Minerals & Fuels', description: 'Minerals, ores, petroleum products, gases' },
  { chapter: '28-38', name: 'Chemicals', description: 'Chemicals, plastics, rubber, and related products' },
  { chapter: '39-40', name: 'Plastics & Rubber', description: 'Plastics, articles of plastics, rubber, articles of rubber' },
  { chapter: '41-43', name: 'Leather & Hides', description: 'Leather, furskins, handbags, travel goods' },
  { chapter: '44-49', name: 'Wood & Paper', description: 'Wood, cork, paper, printed materials' },
  { chapter: '50-63', name: 'Textiles', description: 'Silk, wool, cotton, flax, textile articles' },
  { chapter: '64-67', name: 'Footwear & Headgear', description: 'Footwear, headgear, umbrellas, artificial flowers' },
  { chapter: '68-70', name: 'Stone, Ceramics, Glass', description: 'Stone, gypsum, cement, ceramics, glassware' },
  { chapter: '71-83', name: 'Base Metals & Articles', description: 'Base metals, iron, steel, copper, nickel, tools' },
  { chapter: '84-85', name: 'Machinery & Electronics', description: 'Machinery, mechanical appliances, electrical equipment' },
  { chapter: '86-89', name: 'Vehicles & Transport', description: 'Railway vehicles, automobiles, aircraft, ships' },
  { chapter: '90-92', name: 'Optical & Medical', description: 'Optical instruments, medical appliances, clocks, musical instruments' },
  { chapter: '93-97', name: 'Miscellaneous', description: 'Arms, furniture, toys, works of art, antiques' },
];

const classificationTips = [
  { title: 'Start with the General', content: 'Begin by identifying the broad category your product falls into, then narrow down to the specific subcategory.' },
  { title: 'Use Product Descriptions', content: 'Look for keywords in your product description that match HS code descriptions. The most specific code applies.' },
  { title: 'Consider Composition', content: 'For products made of multiple materials, the primary material usually determines the classification.' },
  { title: 'Check Chapter Notes', content: 'Legal notes at the beginning of each chapter contain important definitions and exclusions.' },
  { title: 'When in Doubt, Ask', content: 'If you are unsure, request a binding ruling from customs or use our AI classification assistant.' },
];

export default function HSCodeGuidePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">HS Code Guide</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium text-[#154230]">Compliance</Link>
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
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Compliance</Link>
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
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                HS Code Guide
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Learn how to correctly classify your products using the Harmonized System. Comprehensive guide to HS codes and classification.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search HS codes or product descriptions..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Code className="w-5 h-5" />
                  <span>Search Codes</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">5,000+</p>
              <p className="text-sm text-white/70">HS Codes</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">97</p>
              <p className="text-sm text-white/70">Chapters</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">180+</p>
              <p className="text-sm text-white/70">Countries</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">Daily</p>
              <p className="text-sm text-white/70">Updates</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* HS Code Structure */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <Code className="w-5 h-5 text-[#4A4A4A]" />
                Understanding HS Code Structure
              </h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="flex-1 text-center p-4 bg-[#154230] rounded-xl">
                  <p className="text-xs text-white/60 mb-1">Chapter (2 digits)</p>
                  <p className="text-2xl font-bold text-white">85</p>
                </div>
                <div className="flex-1 text-center p-4 bg-[#154230] rounded-xl">
                  <p className="text-xs text-white/60 mb-1">Heading (4 digits)</p>
                  <p className="text-2xl font-bold text-white">8542</p>
                </div>
                <div className="flex-1 text-center p-4 bg-[#A6824A] rounded-xl">
                  <p className="text-xs text-white/60 mb-1">Subheading (6 digits)</p>
                  <p className="text-2xl font-bold text-white">8542.31</p>
                </div>
                <div className="flex-1 text-center p-4 bg-[#5D1E21] rounded-xl">
                  <p className="text-xs text-white/60 mb-1">National (8-10 digits)</p>
                  <p className="text-2xl font-bold text-white">8542.31.10</p>
                </div>
              </div>
              <p className="text-[#4A4A4A] text-center">
                The first 6 digits are internationally standardized. Additional digits vary by country.
              </p>
            </div>
          </div>

          {/* HS Chapters */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#4A4A4A]" />
                HS Code Chapters
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {hsChapters.map((chapter, index) => {
                  const isGreen = index % 2 === 0;
                  const isExpanded = expandedChapter === chapter.chapter;
                  return (
                    <div key={chapter.chapter} className="rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedChapter(isExpanded ? null : chapter.chapter)}
                        className={`w-full p-4 flex items-center justify-between ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono font-bold text-white text-lg">{chapter.chapter}</span>
                          <span className="font-medium text-white">{chapter.name}</span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-white transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      {isExpanded && (
                        <div className="p-4 bg-[#f7f5f1] border-t border-black/5">
                          <p className="text-[#4A4A4A]">{chapter.description}</p>
                          <Link href={`/compliance/hs-code-guide/chapter/${chapter.chapter}`} className="inline-flex items-center gap-1 mt-3 text-[#154230] font-medium text-sm hover:underline">
                            Browse Chapter <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Classification Tips */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#4A4A4A]" />
                Classification Tips
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classificationTips.map((tip, index) => (
                  <div key={tip.title} className={`p-4 rounded-xl ${index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                    <h3 className="font-bold text-white mb-2">{tip.title}</h3>
                    <p className="text-sm text-white/70">{tip.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/compliance/ai-assist" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Lightbulb className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">AI Classification</h3>
              <p className="text-sm text-white/70 mb-4">Get AI-powered HS code suggestions based on product descriptions.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Try AI <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/duty-rates" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <FileText className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Duty Rates</h3>
              <p className="text-sm text-white/70 mb-4">Look up duty rates for specific HS codes and trade routes.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Check Rates <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/check" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <CheckCircle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Compliance Check</h3>
              <p className="text-sm text-white/70 mb-4">Run a full compliance check with your HS code.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Start Check <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Help with HS Classification?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our AI assistant can help you find the correct HS code for your products.
          </p>
          <Link href="/compliance/ai-assist" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Get AI Assistance <ChevronRight className="w-4 h-4" />
          </Link>
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
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}