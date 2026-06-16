'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Building,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  Search,
  Menu,
  X,
  Bell,
  Calendar,
  Users,
  FileText,
  Clock,
  CheckCircle,
  HelpCircle,
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

const supportOptions = [
  { icon: MessageSquare, name: 'Live Chat', description: 'Chat with our team instantly', availability: '24/7' },
  { icon: Phone, name: 'Phone Support', description: 'Call our compliance experts', availability: 'Mon-Fri 9AM-6PM' },
  { icon: Mail, name: 'Email Support', description: 'Get help via email', availability: '< 24 hour response' },
  { icon: Calendar, name: 'Book Consultation', description: 'Schedule expert consultation', availability: 'Book Now' },
];

const faqs = [
  { question: 'How do I find the correct HS code?', answer: 'Use our AI-powered HS code search or browse our comprehensive HS code guide. You can also consult with our experts for complex classifications.' },
  { question: 'What are the duty rates for my products?', answer: 'Our duty calculator provides accurate rates based on HS code, origin, and destination. FTA benefits are automatically considered.' },
  { question: 'How do I apply for an import license?', answer: 'Requirements vary by product and country. Our experts can guide you through the application process for your specific situation.' },
  { question: 'What documents do I need for customs?', answer: 'Required documents typically include commercial invoice, packing list, bill of lading, and certificate of origin. Specific requirements depend on your trade route.' },
  { question: 'How can I reduce compliance costs?', answer: 'Strategies include optimizing HS code classification, leveraging FTA benefits, implementing automated compliance processes, and proactive risk management.' },
];

const recentTickets = [
  { id: 'TKT-001', subject: 'HS Code Classification Question', status: 'resolved', date: '2024-11-15' },
  { id: 'TKT-002', subject: 'Duty Rate Inquiry - Electronics', status: 'in_progress', date: '2024-11-14' },
  { id: 'TKT-003', subject: 'FTA Eligibility Check', status: 'resolved', date: '2024-11-12' },
];

export default function SupportPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    return status === 'resolved'
      ? { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle }
      : { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock };
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Compliance Support</span>
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
                <Building className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Compliance Support
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get expert help with your trade compliance questions. Our team of specialists is ready to assist you.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    placeholder="Search for help articles..."
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button className="h-14 px-6 bg-[#A6824A] hover:bg-[#8a6a3a] rounded-xl text-white font-semibold flex items-center justify-center transition-colors">
                  Search
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-white/70">Live Chat</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">&lt;1hr</p>
              <p className="text-sm text-white/70">Response Time</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">50+</p>
              <p className="text-sm text-white/70">Experts</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm text-white/70">Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Support Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              const isGreen = index % 2 === 0;
              return (
                <button key={option.name} className={`rounded-xl p-6 shadow-sm hover:opacity-90 transition-opacity text-left ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                  <Icon className="w-8 h-8 text-white mb-3" />
                  <h3 className="font-bold text-white mb-1">{option.name}</h3>
                  <p className="text-sm text-white/70 mb-2">{option.description}</p>
                  <span className="text-xs text-white/60">{option.availability}</span>
                </button>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-[#101111] mb-6">Submit a Support Request</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Category</label>
                <select className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20">
                  <option>Select a category</option>
                  <option>HS Code Classification</option>
                  <option>Duty Rates</option>
                  <option>Import/Export Regulations</option>
                  <option>Document Requirements</option>
                  <option>FTA Eligibility</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Describe your question or issue..."
                  className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20 resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <button className="h-12 px-8 bg-[#154230] hover:bg-[#1d5240] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  Submit Request
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#4A4A4A]" />
                Frequently Asked Questions
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className={`w-full p-4 text-left flex items-center justify-between ${
                        index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'
                      }`}
                    >
                      <span className="font-medium text-white">{faq.question}</span>
                      <ChevronRight className={`w-5 h-5 text-white transition-transform ${expandedFaq === index ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedFaq === index && (
                      <div className="p-4 bg-[#f7f5f1] border-t border-black/5">
                        <p className="text-[#4A4A4A]">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Tickets */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#4A4A4A]" />
                Recent Support Tickets
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {recentTickets.map((ticket, index) => {
                  const statusBadge = getStatusBadge(ticket.status);
                  const StatusIcon = statusBadge.icon;
                  return (
                    <div key={ticket.id} className={`p-4 rounded-xl ${index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white/60 text-sm font-mono">{ticket.id}</span>
                          <h3 className="font-medium text-white">{ticket.subject}</h3>
                          <span className="text-white/60 text-sm">{ticket.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text} flex items-center gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {ticket.status.replace('_', ' ')}
                          </span>
                          <Link href={`/support/tickets/${ticket.id}`} className="text-white font-medium text-sm hover:text-white/80">
                            View →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Our compliance experts are available 24/7 to help you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/consultations" className="px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Book Consultation
            </Link>
            <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors inline-flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Start Live Chat
            </button>
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
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}