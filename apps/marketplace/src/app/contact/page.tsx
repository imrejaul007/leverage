'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';

const inquiryTypes = [
  { value: '', label: 'Select inquiry type' },
  { value: 'sales', label: 'Sales Inquiry' },
  { value: 'support', label: 'Technical Support' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
];

const offices = [
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'Business Bay, Downtown Dubai',
    phone: '+971 4 XXX XXXX',
    email: 'dubai@leverge.one',
  },
  {
    city: 'Mumbai',
    country: 'India',
    address: 'Bandra Kurla Complex',
    phone: '+91 22 XXXX XXXX',
    email: 'mumbai@leverge.one',
  },
];

export default function ContactPage() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
    setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header />

      <main className="container mx-auto px-4 sm:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4">Contact Us</h1>
          <p className="text-[#4A4A4A] max-w-2xl mx-auto">
            Have questions about LEVERAGE? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6"
            >
              <h2 className="text-lg font-bold text-[#101111] mb-6">Get in Touch</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#154230]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#101111]">Email</p>
                    <p className="text-sm text-[#4A4A4A]">support@leverge.one</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#154230]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#101111]">Phone</p>
                    <p className="text-sm text-[#4A4A4A]">+971 4 XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#154230]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#154230]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#101111]">Business Hours</p>
                    <p className="text-sm text-[#4A4A4A]">Sun-Thu: 9AM - 6PM (GST)</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#154230] rounded-2xl p-6 text-white"
            >
              <h2 className="text-lg font-bold mb-4">Live Chat</h2>
              <p className="text-white/80 mb-4">
                Get instant support through our live chat. Our team is available during business hours.
              </p>
              <Button variant="secondary" className="w-full" leftIcon={<MessageSquare className="w-4 h-4" />}>
                Start Chat
              </Button>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8"
          >
            <h2 className="text-lg font-bold text-[#101111] mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Full Name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Phone (optional)"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <Select
                  label="Inquiry Type"
                  options={inquiryTypes}
                  value={formData.inquiryType}
                  onChange={(v) => setFormData({ ...formData, inquiryType: v as string })}
                />
              </div>

              <Textarea
                label="Message"
                placeholder="How can we help you?"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <Button type="submit" className="w-full sm:w-auto" isLoading={isSubmitting} leftIcon={<Send className="w-4 h-4" />}>
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Global Offices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-[#101111] mb-6">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offices.map((office, index) => (
              <div key={index} className="bg-white rounded-2xl p-6">
                <h3 className="text-lg font-bold text-[#101111] mb-2">{office.city}</h3>
                <p className="text-sm text-[#4A4A4A] mb-4">{office.country}</p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2 text-[#4A4A4A]">
                    <MapPin className="w-4 h-4" />
                    {office.address}
                  </p>
                  <p className="flex items-center gap-2 text-[#4A4A4A]">
                    <Phone className="w-4 h-4" />
                    {office.phone}
                  </p>
                  <p className="flex items-center gap-2 text-[#4A4A4A]">
                    <Mail className="w-4 h-4" />
                    {office.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}