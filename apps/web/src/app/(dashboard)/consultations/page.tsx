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
  Target,
  TrendingUp,
  DollarSign,
  FileText,
  Bot,
  Receipt,
  Megaphone,
  Truck,
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

const consultationTypes = [
  {
    icon: Video,
    title: 'Video Consultation',
    description: 'Face-to-face expert guidance via video call',
    duration: '30-60 min',
    color: '#154230',
    price: 'From $99',
  },
  {
    icon: MessageSquare,
    title: 'Chat Consultation',
    description: 'Quick answers via instant messaging',
    duration: '24-48 hrs',
    color: '#A6824A',
    price: 'From $49',
  },
  {
    icon: Phone,
    title: 'Phone Consultation',
    description: 'Direct voice call with trade experts',
    duration: '15-30 min',
    color: '#5D1E21',
    price: 'From $79',
  },
];

const experts = [
  {
    name: 'Sarah Chen',
    title: 'Import/Export Compliance Specialist',
    rating: 4.9,
    reviews: 234,
    specialties: ['Customs Clearance', 'HS Codes', 'Duty Optimization'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
  {
    name: 'Michael Torres',
    title: 'International Trade Attorney',
    rating: 4.8,
    reviews: 189,
    specialties: ['Contract Review', 'Trade Disputes', 'FTA Benefits'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    name: 'Aisha Patel',
    title: 'Supply Chain Director',
    rating: 5.0,
    reviews: 156,
    specialties: ['Logistics', 'Cost Reduction', 'Vendor Management'],
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
  },
];

const features = [
  { icon: Shield, title: 'Verified Experts', desc: 'All consultants are vetted professionals' },
  { icon: Clock, title: 'Flexible Scheduling', desc: 'Book at your convenience' },
  { icon: Globe, title: 'Global Coverage', desc: 'Experts in 50+ countries' },
  { icon: Target, title: 'Industry Specific', desc: 'Tailored trade advice' },
];

const testimonials = [
  {
    quote: "Saved us $50K in duties by optimizing our HS code classifications.",
    author: 'James Wilson',
    company: 'Tech Imports LLC',
  },
  {
    quote: "The expert helped us navigate complex EU import regulations seamlessly.",
    author: 'Elena Rodriguez',
    company: 'EuroTrade Solutions',
  },
  {
    quote: "Quick, professional, and worth every penny. Highly recommend!",
    author: 'David Kim',
    company: 'Pacific Rim Exports',
  },
];

export default function ConsultationsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Expert Consultations</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/consultations" className="nav-link font-medium text-[#154230]">Consultations</Link>
              <Link href="/consultations/schedule" className="nav-link font-medium">Book Session</Link>
              <Link href="/consultations/experts" className="nav-link font-medium">Our Experts</Link>
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
                <Link href="/consultations" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Consultations</Link>
                <Link href="/consultations/schedule" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Book Session</Link>
                <Link href="/consultations/experts" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Our Experts</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Expert Trade Consultations
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get personalized guidance from vetted trade experts. Navigate customs, compliance, logistics, and more with one-on-one expert consultations.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-white/70">Expert Sessions</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-white/70">Satisfaction Rate</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-white/70">Trade Experts</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-white/70">Support Available</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Consultation Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {consultationTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.title}
                  onClick={() => setSelectedType(type.title)}
                  className={`bg-white rounded-2xl p-6 shadow-sm text-left transition-all ${
                    selectedType === type.title
                      ? 'ring-2 ring-[#154230] shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: type.color + '15' }}>
                    <Icon className="w-8 h-8" style={{ color: type.color }} />
                  </div>
                  <h3 className="font-bold text-xl text-[#101111] mb-2">{type.title}</h3>
                  <p className="text-sm text-[#4A4A4A] mb-4">{type.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <Clock className="w-4 h-4" />
                      {type.duration}
                    </div>
                    <span className="font-bold text-[#154230]">{type.price}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Featured Experts */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#101111]">Featured Experts</h2>
                <p className="text-sm text-[#4A4A4A]">Top-rated trade professionals ready to help</p>
              </div>
              <Link href="/consultations/experts" className="flex items-center gap-1 text-[#154230] font-medium hover:underline">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {experts.map((expert) => (
                <div key={expert.name} className="p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      width={60}
                      height={60}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                    <div>
                      <h3 className="font-bold text-[#101111]">{expert.name}</h3>
                      <p className="text-sm text-[#4A4A4A]">{expert.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 text-[#A6824A] fill-[#A6824A]" />
                        <span className="text-sm font-medium">{expert.rating}</span>
                        <span className="text-sm text-[#4A4A4A]">({expert.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {expert.specialties.map((specialty) => (
                      <span key={specialty} className="px-2 py-1 bg-white rounded-lg text-xs text-[#4A4A4A]">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/consultations/schedule"
                    className="mt-4 w-full block text-center px-4 py-2 bg-[#154230] text-white font-medium rounded-lg hover:bg-[#1d5240] transition-colors"
                  >
                    Book Consultation
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-[#101111] mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#154230] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">1</div>
                <h3 className="font-bold text-[#101111] mb-2">Choose Topic</h3>
                <p className="text-sm text-[#4A4A4A]">Select your area of need - customs, compliance, logistics, or contracts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#A6824A] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">2</div>
                <h3 className="font-bold text-[#101111] mb-2">Pick Expert</h3>
                <p className="text-sm text-[#4A4A4A]">Browse verified experts with ratings and specialty matching</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#5D1E21] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">3</div>
                <h3 className="font-bold text-[#101111] mb-2">Book Time</h3>
                <p className="text-sm text-[#4A4A4A]">Schedule a session at your convenience via video, phone, or chat</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#154230] rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">4</div>
                <h3 className="font-bold text-[#101111] mb-2">Get Solutions</h3>
                <p className="text-sm text-[#4A4A4A]">Receive personalized advice and actionable next steps</p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-6 text-center">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/10 rounded-xl p-4">
                  <p className="text-white/90 mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-white">{testimonial.author}</p>
                    <p className="text-sm text-white/70">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#154230]" />
                  </div>
                  <h3 className="font-bold text-[#101111] mb-1">{feature.title}</h3>
                  <p className="text-sm text-[#4A4A4A]">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#A6824A] to-[#8a6a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Expert Guidance?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Book a consultation today and get personalized trade advice from industry experts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/consultations/schedule" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Book a Consultation
            </Link>
            <Link href="/signup" className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Create Free Account
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
                © 2026 LEVERAGE. All rights reserved.
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
