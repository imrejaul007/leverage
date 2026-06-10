'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const blogPosts = [
  {
    title: 'How AI is Transforming Global Trade Compliance',
    excerpt: 'Discover how artificial intelligence is helping businesses navigate complex trade regulations and reduce compliance costs.',
    author: 'Sarah Chen',
    date: 'June 15, 2024',
    category: 'AI & Technology',
  },
  {
    title: '5 Tips for Faster Customs Clearance',
    excerpt: 'Learn proven strategies to speed up your customs clearance process and avoid costly delays.',
    author: 'Michael Park',
    date: 'June 10, 2024',
    category: 'Logistics',
  },
  {
    title: 'Understanding HS Codes: A Complete Guide',
    excerpt: 'Everything you need to know about Harmonized System codes and how to classify your products correctly.',
    author: 'Priya Sharma',
    date: 'June 5, 2024',
    category: 'Compliance',
  },
  {
    title: 'The Future of B2B Marketplaces',
    excerpt: 'Exploring trends shaping the future of B2B commerce and how digital platforms are changing trade.',
    author: 'James Wilson',
    date: 'May 28, 2024',
    category: 'Industry Insights',
  },
];

export default function BlogPage() {
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
      <section className="py-16 px-4 bg-gradient-to-br from-[#154230] to-[#1a5a3a]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Trade Insights Blog</h1>
          <p className="text-xl text-white/80">
            Expert advice, industry news, and guides for global trade professionals
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
              <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-[#154230] to-[#1a5a3a] flex items-center justify-center">
                  <span className="text-6xl opacity-50">📝</span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-[#154230]/10 text-[#154230] text-xs font-medium rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-bold text-[#101111] mb-3">{post.title}</h2>
                  <p className="text-[#4A4A4A] text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-[#777777]">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#101111] mb-4">Stay Updated</h2>
          <p className="text-[#4A4A4A] mb-6">Subscribe to our newsletter for the latest trade insights and platform updates.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-[#E8E3DA] rounded-lg focus:outline-none focus:border-[#154230]"
            />
            <button className="px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
