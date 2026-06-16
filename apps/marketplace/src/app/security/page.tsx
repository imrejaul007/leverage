'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield, Lock, Eye, Server, FileKey, AlertTriangle, CheckCircle, Users, CreditCard } from 'lucide-react';

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Encryption',
      description: 'All data is encrypted in transit and at rest using industry-standard AES-256 encryption.',
    },
    {
      icon: Server,
      title: 'Secure Infrastructure',
      description: 'Our servers are hosted in secure, SOC 2 compliant data centers with 24/7 monitoring.',
    },
    {
      icon: Users,
      title: 'Identity Verification',
      description: 'Multi-level verification for suppliers and buyers to ensure legitimate business relationships.',
    },
    {
      icon: Shield,
      title: 'Fraud Protection',
      description: 'AI-powered fraud detection systems to identify and prevent suspicious activities.',
    },
    {
      icon: FileKey,
      title: 'Access Controls',
      description: 'Role-based access control and multi-factor authentication for all user accounts.',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'PCI DSS compliant payment processing with secure escrow services.',
    },
  ];

  const bestPractices = [
    'Use a strong, unique password for your account',
    'Enable two-factor authentication (2FA)',
    'Keep your email and contact information up to date',
    'Review your account activity regularly',
    'Be cautious of phishing attempts',
    'Report suspicious activity immediately',
    'Use secure networks when accessing your account',
    'Log out after using shared devices',
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header />

      <main className="container mx-auto px-4 sm:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#154230] rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4">Security at LEVERAGE</h1>
          <p className="text-[#4A4A4A] max-w-2xl mx-auto">
            Your trust is our priority. We employ enterprise-grade security measures to protect your data and ensure safe trading on our platform.
          </p>
        </motion.div>

        {/* Security Features */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-[#101111] mb-6">Our Security Measures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#154230]" />
                </div>
                <h3 className="text-lg font-bold text-[#101111] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#4A4A4A]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#101111] mb-6 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-[#154230]" />
              Security Best Practices
            </h2>
            <p className="text-[#4A4A4A] mb-6">
              While we work hard to keep your account secure, you also play a crucial role. Follow these best practices:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bestPractices.map((practice, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#154230] flex-shrink-0 mt-0.5" />
                  <span className="text-[#4A4A4A]">{practice}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Report Security Issue */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#5D1E21] rounded-2xl p-6 sm:p-8 text-white"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Report a Security Issue</h2>
                <p className="text-white/80 mb-4">
                  If you&apos;ve discovered a security vulnerability or have concerns about your account security, please contact our security team immediately.
                </p>
                <Link
                  href="mailto:security@leverge.one"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#5D1E21] font-semibold rounded-xl hover:bg-white/90 transition-colors"
                >
                  Contact Security Team
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}