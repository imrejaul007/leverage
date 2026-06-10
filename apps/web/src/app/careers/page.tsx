'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Briefcase, Users, Globe, Heart } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Header */}
      <header className="bg-white border-b border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
            </Link>
            <Link href="/" className="flex items-center gap-2 text-[#4A4A4A] hover:text-[#101111] transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#154230] to-[#1a5a3a]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-white/80 mb-8">
            Help us build the future of global trade
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#101111] mb-8 text-center">Why Work With Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: 'Global Impact', description: 'Work on products that connect businesses across 150+ countries' },
              { icon: Users, title: 'Great Team', description: 'Collaborate with talented individuals from diverse backgrounds' },
              { icon: Heart, title: 'Work-Life Balance', description: 'Flexible work arrangements and comprehensive benefits' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-[#154230] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#101111] mb-2">{item.title}</h3>
                <p className="text-[#4A4A4A] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#101111] mb-8 text-center">Open Positions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              { title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote' },
              { title: 'Backend Developer', department: 'Engineering', location: 'Remote' },
              { title: 'Product Manager', department: 'Product', location: 'Remote' },
              { title: 'Sales Executive', department: 'Sales', location: 'Mumbai, India' },
            ].map((job, i) => (
              <div key={i} className="bg-[#E6E2DA] rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[#101111]">{job.title}</h3>
                  <p className="text-sm text-[#4A4A4A]">{job.department} • {job.location}</p>
                </div>
                <Link href="/contact" className="px-4 py-2 bg-[#154230] text-white text-sm font-medium rounded-lg hover:bg-[#1d5240] transition-colors">
                  Apply
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-[#5D1E21] text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Don't see a perfect fit?</h2>
        <p className="text-white/80 mb-6">Send us your resume and we'll keep you in mind for future opportunities.</p>
        <Link href="/contact" className="inline-block px-6 py-3 bg-white text-[#5D1E21] font-semibold rounded-lg hover:bg-white/90 transition-colors">
          Contact Us
        </Link>
      </section>
    </div>
  );
}
