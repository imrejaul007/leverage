'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Package,
  FileText,
  Truck,
  DollarSign,
  MessageSquare,
  ArrowRight,
  Search,
  Plus,
  BarChart3,
  Shield,
  Briefcase,
  User,
  Bell,
  LogOut,
  Menu,
  ShoppingBag,
  LayoutGrid,
  X,
  ChevronRight,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('leverage_user');
    router.push('/login');
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E6E2DA]">
        <div className="rounded-full h-10 w-10 border-2 border-[#154230] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-6 sm:pt-8 pb-20 sm:pb-24">
        <div className="flex items-center justify-between mb-4">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-white">
              <Bell className="w-5 h-5" />
            </button>
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-white font-bold text-xl sm:text-2xl">Welcome to LEVERAGE</h2>
          <p className="text-white/70 text-sm mt-1">Select a section to get started</p>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative w-72 bg-white h-full flex flex-col shadow-xl ml-auto">
            <div className="flex items-center justify-between p-6 border-b border-black/5">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-[#E6E2DA] rounded-lg">
                <X className="w-5 h-5 text-[#4A4A4A]" />
              </button>
            </div>
            <div className="p-4 border-t border-black/5">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JD</span>
                </div>
                <div className="flex-1">
                  <p className="text-[#101111] font-semibold text-sm">John Doe</p>
                  <p className="text-[#4A4A4A] text-xs">john@company.com</p>
                </div>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-[#4A4A4A] hover:bg-[#E6E2DA] rounded-lg mt-2">
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content - Entry Portal */}
      <main className="px-4 sm:px-8 -mt-16 sm:-mt-20 pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Section Selection Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
          >
            {/* Marketplace Card */}
            <Link
              href="/marketplace"
              className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-[#154230]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#154230] flex items-center justify-center shadow-lg">
                  <LayoutGrid className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <ChevronRight className="w-6 h-6 text-[#A6824A] group-hover:translate-x-2 transition-transform" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-2">Marketplace</h3>
              <p className="text-[#4A4A4A] mb-6">Browse products, manage RFQs, track orders, and grow your network</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-[#154230]/10 text-[#154230] text-sm font-medium rounded-lg">Browse Products</span>
                <span className="px-3 py-1.5 bg-[#154230]/10 text-[#154230] text-sm font-medium rounded-lg">RFQs</span>
                <span className="px-3 py-1.5 bg-[#154230]/10 text-[#154230] text-sm font-medium rounded-lg">Orders</span>
              </div>
            </Link>

            {/* Operations Card */}
            <Link
              href="/documents"
              className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-[#A6824A]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#A6824A] flex items-center justify-center shadow-lg">
                  <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <ChevronRight className="w-6 h-6 text-[#A6824A] group-hover:translate-x-2 transition-transform" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-2">Operations</h3>
              <p className="text-[#4A4A4A] mb-6">Manage documents, compliance, freight, and business analytics</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-[#A6824A]/10 text-[#A6824A] text-sm font-medium rounded-lg">Documents</span>
                <span className="px-3 py-1.5 bg-[#A6824A]/10 text-[#A6824A] text-sm font-medium rounded-lg">Freight</span>
                <span className="px-3 py-1.5 bg-[#A6824A]/10 text-[#A6824A] text-sm font-medium rounded-lg">Compliance</span>
              </div>
            </Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-[#101111] font-bold text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <Link href="/rfqs/new" className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[#E6E2DA] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#154230] flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#4A4A4A] text-sm font-medium text-center">Post RFQ</span>
              </Link>
              <Link href="/products/new" className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[#E6E2DA] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#A6824A] flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-[#4A4A4A] text-sm font-medium text-center">Add Product</span>
              </Link>
              <Link href="/marketplace" className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[#E6E2DA] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <Search className="w-6 h-6 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-sm font-medium text-center">Browse</span>
              </Link>
              <Link href="/ai" className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[#E6E2DA] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#154230]/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[#154230]" />
                </div>
                <span className="text-[#4A4A4A] text-sm font-medium text-center">AI Help</span>
              </Link>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-[#101111] font-bold text-lg mb-4">Overview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-xl bg-[#E6E2DA]/50">
                <p className="text-2xl sm:text-3xl font-bold text-[#154230]">127</p>
                <p className="text-[#4A4A4A] text-xs sm:text-sm mt-1">Active RFQs</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-[#E6E2DA]/50">
                <p className="text-2xl sm:text-3xl font-bold text-[#154230]">48</p>
                <p className="text-[#4A4A4A] text-xs sm:text-sm mt-1">Total Orders</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-[#E6E2DA]/50">
                <p className="text-2xl sm:text-3xl font-bold text-[#5D1E21]">156</p>
                <p className="text-[#4A4A4A] text-xs sm:text-sm mt-1">Documents</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-[#E6E2DA]/50">
                <p className="text-2xl sm:text-3xl font-bold text-[#5D1E21]">23</p>
                <p className="text-[#4A4A4A] text-xs sm:text-sm mt-1">In Transit</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="home" />
    </div>
  );
}