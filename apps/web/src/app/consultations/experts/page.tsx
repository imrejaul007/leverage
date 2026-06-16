'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Phone,
  Video,
  MessageSquare,
  Calendar,
  Clock,
  User,
  Star,
  CheckCircle,
  Shield,
  Menu,
  X,
  Bell,
  ArrowRight,
  Users,
  Globe,
  Briefcase,
  ChevronRight,
  Search,
  Filter,
  MapPin,
  FileText,
  Bot,
  Receipt,
  Megaphone,
  Truck,
  ArrowLeft,
  GraduationCap,
  Award,
  ThumbsUp,
  DollarSign,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'AI Assistant', href: '/ai', icon: Bot },
  { name: 'Billing', href: '/billing', icon: Receipt },
  { name: 'Ads', href: '/ads', icon: Megaphone },
  { name: 'Consultations', href: '/consultations', icon: Users },
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

const experts = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Import/Export Compliance Specialist',
    rating: 4.9,
    reviews: 234,
    sessions: 512,
    location: 'San Francisco, CA',
    languages: ['English', 'Mandarin'],
    specialties: ['Customs Clearance', 'HS Codes', 'Duty Optimization', 'FTA Benefits'],
    bio: 'Former CBP officer with 15+ years experience in trade compliance. Helped 500+ companies navigate complex import regulations.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    hourlyRate: 150,
    available: true,
  },
  {
    id: 2,
    name: 'Michael Torres',
    title: 'International Trade Attorney',
    rating: 4.8,
    reviews: 189,
    sessions: 342,
    location: 'New York, NY',
    languages: ['English', 'Spanish'],
    specialties: ['Contract Review', 'Trade Disputes', 'Incoterms', 'Risk Assessment'],
    bio: 'Licensed attorney specializing in international trade law. Expert in contract negotiation and dispute resolution.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    hourlyRate: 250,
    available: true,
  },
  {
    id: 3,
    name: 'Aisha Patel',
    title: 'Supply Chain Director',
    rating: 5.0,
    reviews: 156,
    sessions: 278,
    location: 'Chicago, IL',
    languages: ['English', 'Hindi', 'Gujarati'],
    specialties: ['Logistics', 'Cost Reduction', 'Vendor Management', 'Inventory Optimization'],
    bio: 'Former Director of Supply Chain at Fortune 500 company. Specializes in optimizing supply chain operations.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
    hourlyRate: 175,
    available: false,
  },
  {
    id: 4,
    name: 'James Nakamura',
    title: 'Trade Finance Specialist',
    rating: 4.7,
    reviews: 98,
    sessions: 189,
    location: 'Los Angeles, CA',
    languages: ['English', 'Japanese'],
    specialties: ['Letters of Credit', 'Insurance', 'Payment Terms', 'Factoring'],
    bio: 'Former bank trade finance manager. Expert in structuring trade finance solutions for cross-border transactions.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    hourlyRate: 200,
    available: true,
  },
  {
    id: 5,
    name: 'Elena Rodriguez',
    title: 'EU Trade Compliance Expert',
    rating: 4.9,
    reviews: 167,
    sessions: 298,
    location: 'Madrid, Spain',
    languages: ['English', 'Spanish', 'Portuguese'],
    specialties: ['EU Regulations', 'REACH Compliance', 'CE Marking', 'VAT Optimization'],
    bio: 'Based in Madrid with deep expertise in EU import/export regulations. Former EU Commission trade advisor.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    hourlyRate: 160,
    available: true,
  },
  {
    id: 6,
    name: 'David Kim',
    title: 'Asia-Pacific Trade Specialist',
    rating: 4.8,
    reviews: 145,
    sessions: 267,
    location: 'Singapore',
    languages: ['English', 'Korean', 'Mandarin'],
    specialties: ['China Trade', 'ASEAN Regulations', 'Tariff Engineering', 'Transfer Pricing'],
    bio: 'Based in Singapore with extensive experience in Asia-Pacific trade. Former trade advisor for Fortune 100 companies.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    hourlyRate: 180,
    available: true,
  },
];

const specialties = [
  'Customs Clearance',
  'HS Codes',
  'Contract Review',
  'Logistics',
  'Trade Finance',
  'EU Regulations',
  'Asia Trade',
  'Risk Assessment',
];

export default function ExpertDirectoryPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);

  const filteredExperts = experts.filter((expert) => {
    if (searchQuery && !expert.name.toLowerCase().includes(searchQuery.toLowerCase()) && !expert.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedSpecialty && !expert.specialties.includes(selectedSpecialty)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Expert Directory</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
              <Link href="/consultations" className="nav-link font-medium text-[#154230]">Consultations</Link>
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
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
                <Link href="/ai" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
                <Link href="/consultations" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Consultations</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-16">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Users className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Expert Directory
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Browse our vetted network of trade experts. Find the right specialist for your import/export needs.
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
                    placeholder="Search experts by name or specialty..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-white/70">Trade Experts</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">2,500+</p>
              <p className="text-sm text-white/70">Sessions Completed</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">4.9</p>
              <p className="text-sm text-white/70">Average Rating</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">30+</p>
              <p className="text-sm text-white/70">Countries Covered</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#4A4A4A]" />
                <span className="text-sm text-[#4A4A4A]">Filter by specialty:</span>
              </div>
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(selectedSpecialty === specialty ? null : specialty)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedSpecialty === specialty
                      ? 'bg-[#154230] text-white'
                      : 'bg-[#f7f5f1] text-[#4A4A4A] hover:bg-[#E6E2DA]'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>

          {/* Expert Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map((expert, index) => (
              <div
                key={expert.id}
                className={`bg-white rounded-2xl shadow-sm overflow-hidden ${
                  selectedExpert === expert.id ? 'ring-2 ring-[#154230]' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-[#101111]">{expert.name}</h3>
                        {expert.available ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Available</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">Busy</span>
                        )}
                      </div>
                      <p className="text-sm text-[#4A4A4A] mb-2">{expert.title}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                        <span className="text-sm font-medium">{expert.rating}</span>
                        <span className="text-sm text-[#4A4A4A]">({expert.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#4A4A4A] mb-4 line-clamp-2">{expert.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {expert.specialties.slice(0, 3).map((specialty) => (
                      <span key={specialty} className="px-2 py-1 bg-[#f7f5f1] rounded-lg text-xs text-[#4A4A4A]">
                        {specialty}
                      </span>
                    ))}
                    {expert.specialties.length > 3 && (
                      <span className="px-2 py-1 bg-[#f7f5f1] rounded-lg text-xs text-[#4A4A4A]">
                        +{expert.specialties.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      <MapPin className="w-4 h-4" />
                      {expert.location}
                    </div>
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      <Globe className="w-4 h-4" />
                      {expert.languages.join(', ')}
                    </div>
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      <Briefcase className="w-4 h-4" />
                      {expert.sessions} sessions
                    </div>
                    <div className="flex items-center gap-2 text-[#4A4A4A]">
                      <DollarSign className="w-4 h-4" />
                      ${expert.hourlyRate}/hr
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/consultations/schedule"
                      className={`flex-1 py-2 text-center font-medium rounded-lg transition-colors ${
                        expert.available
                          ? 'bg-[#154230] text-white hover:bg-[#1d5240]'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Book Session
                    </Link>
                    <button className="p-2 border border-black/10 rounded-lg hover:bg-black/5 transition-colors">
                      <ChevronRight className="w-5 h-5 text-[#4A4A4A]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredExperts.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#101111] mb-2">No Experts Found</h3>
              <p className="text-[#4A4A4A] mb-4">Try adjusting your search or filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty(null);
                }}
                className="px-6 py-2 bg-[#154230] text-white font-medium rounded-lg hover:bg-[#1d5240] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#A6824A] to-[#8a6a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Become an Expert</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Share your trade expertise and help businesses navigate international trade. Apply to become a consultant.
          </p>
          <Link href="/consultations/become-expert" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#A6824A] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Apply Now <ArrowRight className="w-4 h-4" />
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
                <Link href="/security" className="text-white/70 hover:text-white text-sm transition-colors">Security</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
