'use client';

import { motion } from 'framer-motion';
import { Search, Shield, Globe, Truck, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  showSearch?: boolean;
  searchPlaceholder?: string;
  stats?: { label: string; value: string }[];
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href?: string };
}

const defaultStats = [
  { label: 'Products', value: '2,847' },
  { label: 'Suppliers', value: '523' },
  { label: 'Countries', value: '150+' },
  { label: 'Verified', value: '98%' },
];

export function HeroSection({
  title,
  subtitle,
  icon,
  showSearch = true,
  searchPlaceholder = 'Search products, suppliers, categories...',
  stats = defaultStats,
  primaryCTA,
  secondaryCTA,
}: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
      <div className="container mx-auto max-w-6xl">
        {/* Title & Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white mb-8"
        >
          {icon && (
            <div className="flex items-center justify-center gap-3 mb-4">
              {icon}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* CTAs (if provided) */}
        {(primaryCTA || secondaryCTA) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {primaryCTA && (
              <Link
                href={primaryCTA.href}
                className="flex items-center gap-2 px-5 py-3 bg-white text-[#154230] font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                {primaryCTA.label}
              </Link>
            )}
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href || '#'}
                className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-colors"
              >
                {secondaryCTA.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>
        )}

        {/* Search Bar */}
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto"
          >
            <form action="/products" method="GET">
              <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                  <input
                    type="text"
                    name="search"
                    placeholder={searchPlaceholder}
                    className="w-full h-14 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="h-14 px-6 bg-[#5D1E21] hover:bg-[#7a2629] rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
