'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FileText, AlertTriangle, Users, ShoppingCart, Scale, Gavel } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header />

      <main className="container mx-auto px-4 sm:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4">Terms of Service</h1>
            <p className="text-[#4A4A4A]">Last updated: January 1, 2024</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#154230]" />
                Agreement to Terms
              </h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                By accessing or using LEVERAGE Marketplace (&quot;the Platform&quot;), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-[#154230]" />
                User Accounts
              </h2>
              <p className="text-[#4A4A4A] mb-4">To access certain features of the Platform, you must register for an account. You agree to:</p>
              <ul className="list-disc list-inside text-[#4A4A4A] space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-[#154230]" />
                Trading on the Platform
              </h2>
              <p className="text-[#4A4A4A] mb-4">LEVERAGE Marketplace facilitates B2B trade between verified buyers and suppliers. When conducting transactions:</p>
              <ul className="list-disc list-inside text-[#4A4A4A] space-y-2">
                <li>All transactions are between buyers and suppliers directly</li>
                <li>LEVERAGE does not become a party to any transaction</li>
                <li>Users are responsible for verifying counterparty legitimacy</li>
                <li>Disputes should be resolved between the parties involved</li>
                <li>Platform fees and commissions apply as disclosed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 text-[#154230]" />
                User Conduct
              </h2>
              <p className="text-[#4A4A4A] mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-[#4A4A4A] space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Post false, misleading, or fraudulent content</li>
                <li>Infringe on intellectual property rights</li>
                <li>Distribute malware or harmful code</li>
                <li>Attempt to gain unauthorized access to systems</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <Gavel className="w-6 h-6 text-[#154230]" />
                Intellectual Property
              </h2>
              <p className="text-[#4A4A4A]">
                The Platform and its original content, features, and functionality are owned by LEVERAGE and are protected by international copyright, trademark, patent, and other intellectual property laws. You retain ownership of content you submit but grant us a license to use it on the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-[#154230]" />
                Limitation of Liability
              </h2>
              <p className="text-[#4A4A4A]">
                To the fullest extent permitted by law, LEVERAGE shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Platform. Our total liability shall not exceed the amount you paid us in the past twelve months.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#154230]" />
                Changes to Terms
              </h2>
              <p className="text-[#4A4A4A]">
                We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of significant changes. Your continued use of the Platform after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4">Contact Information</h2>
              <p className="text-[#4A4A4A]">
                If you have any questions about these Terms, please contact us at{' '}
                <Link href="mailto:legal@leverge.one" className="text-[#154230] hover:underline">
                  legal@leverge.one
                </Link>
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}