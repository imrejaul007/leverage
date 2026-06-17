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
  DollarSign,
  MapPin,
  FileText,
  Bot,
  Receipt,
  Megaphone,
  Truck,
  ArrowLeft,
  AlertCircle,
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
    id: 'video',
    icon: Video,
    title: 'Video Consultation',
    description: 'Face-to-face expert guidance via video call',
    duration: '30-60 min',
    price: 'From $99',
    color: '#154230',
  },
  {
    id: 'chat',
    icon: MessageSquare,
    title: 'Chat Consultation',
    description: 'Quick answers via instant messaging',
    duration: '24-48 hrs response',
    price: 'From $49',
    color: '#A6824A',
  },
  {
    id: 'phone',
    icon: Phone,
    title: 'Phone Consultation',
    description: 'Direct voice call with trade experts',
    duration: '15-30 min',
    price: 'From $79',
    color: '#5D1E21',
  },
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
];

const topics = [
  'Customs Clearance',
  'HS Code Classification',
  'Duty Optimization',
  'Import/Export Regulations',
  'Contract Review',
  'Supply Chain Strategy',
  'Freight & Logistics',
  'Trade Compliance',
  'Document Preparation',
  'Risk Assessment',
];

export default function ScheduleConsultationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');

  const getNextDays = (days: number) => {
    const dates = [];
    for (let i = 1; i <= days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleSubmit = () => {
    // Handle form submission
    alert('Consultation scheduled successfully!');
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Schedule Consultation</span>
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
              <Calendar className="w-10 h-10" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Schedule a Consultation
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Book a one-on-one session with our trade experts. Get personalized guidance on your import/export needs.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-white text-[#154230]' : 'bg-white/20 text-white'
                  }`}>
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                      step > s ? 'bg-white' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-8 mt-4 text-sm text-white/70">
              <span>Type</span>
              <span>Topic</span>
              <span>Date</span>
              <span>Confirm</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          {/* Step 1: Select Type */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-[#101111] mb-6">Select Consultation Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {consultationTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-6 rounded-xl text-left transition-all ${
                        selectedType === type.id
                          ? 'ring-2 ring-[#154230] shadow-lg'
                          : 'hover:shadow-md border border-black/5'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: type.color + '15' }}>
                        <Icon className="w-7 h-7" style={{ color: type.color }} />
                      </div>
                      <h3 className="font-bold text-[#101111] mb-2">{type.title}</h3>
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
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedType}
                  className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next: Select Topic <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Topic */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-[#101111] mb-6">Select Topic</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSelectedTopic(topic)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      selectedTopic === topic
                        ? 'bg-[#154230] text-white'
                        : 'bg-[#f7f5f1] hover:bg-[#E6E2DA] text-[#101111]'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-[#101111] mb-2">Additional Notes (optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your specific question or situation..."
                  className="w-full h-32 p-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20 resize-none"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-black/10 text-[#4A4A4A] font-semibold rounded-lg hover:bg-black/5 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedTopic}
                  className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next: Select Date <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Select Date & Time */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-[#101111] mb-6">Select Date & Time</h2>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="font-semibold text-[#101111] mb-4">Available Dates</h3>
                <div className="flex flex-wrap gap-3">
                  {getNextDays(14).map((date) => {
                    const dateStr = date.toISOString().split('T')[0];
                    return (
                      <button
                        key={dateStr}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`px-4 py-3 rounded-xl text-center transition-all ${
                          selectedDate === dateStr
                            ? 'bg-[#154230] text-white'
                            : 'bg-[#f7f5f1] hover:bg-[#E6E2DA] text-[#101111]'
                        }`}
                      >
                        <div className="text-xs font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <div className="text-lg font-bold">{date.getDate()}</div>
                        <div className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <h3 className="font-semibold text-[#101111] mb-4">Available Times</h3>
                  <div className="flex flex-wrap gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 rounded-lg transition-all ${
                          selectedTime === time
                            ? 'bg-[#154230] text-white'
                            : 'bg-[#f7f5f1] hover:bg-[#E6E2DA] text-[#101111]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border border-black/10 text-[#4A4A4A] font-semibold rounded-lg hover:bg-black/5 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedDate || !selectedTime}
                  className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next: Confirm <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold text-[#101111] mb-6">Confirm Your Booking</h2>

              <div className="bg-[#f7f5f1] rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm text-[#4A4A4A] mb-1">Consultation Type</h3>
                    <p className="font-semibold text-[#101111]">
                      {consultationTypes.find((t) => t.id === selectedType)?.title}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#4A4A4A] mb-1">Topic</h3>
                    <p className="font-semibold text-[#101111]">{selectedTopic}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#4A4A4A] mb-1">Date</h3>
                    <p className="font-semibold text-[#101111]">
                      {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm text-[#4A4A4A] mb-1">Time</h3>
                    <p className="font-semibold text-[#101111]">{selectedTime}</p>
                  </div>
                </div>
                {notes && (
                  <div className="mt-6 pt-6 border-t border-black/10">
                    <h3 className="text-sm text-[#4A4A4A] mb-1">Notes</h3>
                    <p className="text-[#101111]">{notes}</p>
                  </div>
                )}
              </div>

              <div className="bg-[#154230]/5 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#154230] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#4A4A4A]">
                  You will receive a confirmation email with the video call link or phone number. Payment will be processed after the consultation.
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 border border-black/10 text-[#4A4A4A] font-semibold rounded-lg hover:bg-black/5 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Confirm Booking
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

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
