'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, FileText, Truck, Package, User, MessageSquare, Settings, Bell, Menu, X, LogOut, BarChart3, CreditCard, Shield, HelpCircle, ChevronRight, Camera, Plus } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function AccountPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const accountSettings = [
    { icon: User, label: 'Profile Information', value: 'John Doe', href: '/settings' },
    { icon: CreditCard, label: 'Payment Methods', value: 'Visa •••• 4242', href: '/billing' },
    { icon: Shield, label: 'Privacy & Security', value: '', href: '/settings' },
    { icon: Bell, label: 'Notifications', value: 'On', href: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', value: '', href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

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
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-black/5 flex items-center justify-between">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-9 h-9 bg-[#E6E2DA] rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#4A4A4A] hover:bg-[#E6E2DA] transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/rfqs/new" className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">+</span>
            </Link>
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-8 pt-8 pb-6">
          <h1 className="text-white font-bold text-2xl">Account</h1>
          <p className="text-white/70 text-sm mt-1">Manage your account settings</p>
        </div>

        {/* Content */}
        <div className="px-4 lg:px-8 py-4 lg:py-6 space-y-4">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-[#154230] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">JD</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#A6824A] rounded-full flex items-center justify-center border-2 border-white">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-[#101111] font-bold text-xl">John Doe</h2>
                <p className="text-[#4A4A4A] text-sm">john@company.com</p>
                <p className="text-[#4A4A4A] text-sm">+1 555 123 4567</p>
              </div>
            </div>
          </div>

          {/* Account Settings List */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {accountSettings.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.href}
                  className={`flex items-center justify-between p-4 hover:bg-[#E6E2DA] transition-colors ${i !== accountSettings.length - 1 ? 'border-b border-black/5' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E6E2DA] rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#154230]" />
                    </div>
                    <span className="text-[#101111] font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-[#4A4A4A] text-sm">{item.value}</span>}
                    <ChevronRight className="w-5 h-5 text-[#4A4A4A]" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Subscription Card */}
          <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Current Plan</p>
                <p className="text-2xl font-bold">Pro</p>
              </div>
              <Link
                href="/billing"
                className="px-4 py-2 bg-white text-[#154230] rounded-xl font-semibold text-sm"
              >
                Upgrade
              </Link>
            </div>
          </div>

          {/* Logout Button */}
          <button className="w-full py-3 bg-white border border-red-200 text-red-600 rounded-xl font-semibold">
            Log Out
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="account" />
    </div>
  );
}