'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield, Lock, Eye, UserCheck, FileText, RefreshCw, Mail } from 'lucide-react';

export default function PrivacyPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold text-[#101111] mb-4">Privacy Policy</h1>
            <p className="text-[#4A4A4A]">Last updated: January 1, 2024</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#154230]" />
                Introduction
              </h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                LEVERAGE Marketplace (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services. Please read this privacy policy carefully. By using our platform, you consent to the practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <Eye className="w-6 h-6 text-[#154230]" />
                Information We Collect
              </h2>
              <p className="text-[#4A4A4A] mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside text-[#4A4A4A] space-y-2">
                <li>Account information (name, email, phone, company details)</li>
                <li>Profile information and preferences</li>
                <li>Business verification documents</li>
                <li>Communication history and messages</li>
                <li>Transaction data and order history</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-[#154230]" />
                How We Use Your Information
              </h2>
              <p className="text-[#4A4A4A] mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-[#4A4A4A] space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-[#154230]" />
                Information Sharing
              </h2>
              <p className="text-[#4A4A4A]">
                We do not sell your personal information. We may share your information with third parties in the following circumstances: with your consent, to service providers who assist us in operating our platform, to comply with legal requirements, or in connection with a merger or acquisition.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#154230]" />
                Data Retention
              </h2>
              <p className="text-[#4A4A4A]">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. You may request deletion of your account and associated data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <RefreshCw className="w-6 h-6 text-[#154230]" />
                Your Rights
              </h2>
              <p className="text-[#4A4A4A] mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-[#4A4A4A] space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#101111] mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-[#154230]" />
                Contact Us
              </h2>
              <p className="text-[#4A4A4A]">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <Link href="mailto:privacy@leverge.one" className="text-[#154230] hover:underline">
                  privacy@leverge.one
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