'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, Save, Globe, Ship, Users, Shield, Home, Search, FileText, Mail, User, ChevronDown, Check, Bell, CreditCard, Lock, HelpCircle, Menu, X, Settings, LogOut, Plus, MessageSquare, Package, Truck, BarChart3, Search as SearchIcon } from 'lucide-react';

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings', active: true },
];

const bottomNavLinks = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs/new', icon: Plus, label: 'Post RFQ', primary: true },
  { href: '/marketplace/inbox', icon: MessageSquare, label: 'Inbox' },
  { href: '/account', icon: User, label: 'Account' },
];

type TabType = 'profile' | 'company' | 'notifications' | 'security';

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 555 123 4567',
    role: 'Administrator',
    company: 'Acme Trading Co.',
  });
  const [saved, setSaved] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const pathname = usePathname();

  const saveProfile = () => {
    localStorage.setItem('leverage_profile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const menuItems = [
    { icon: Bell, label: 'Notifications', value: 'On', color: 'text-[#154230]' },
    { icon: CreditCard, label: 'Payment Methods', value: 'Visa •••• 4242', color: 'text-[#4A4A4A]' },
    { icon: Shield, label: 'Privacy & Security', value: '', color: 'text-[#4A4A4A]' },
    { icon: HelpCircle, label: 'Help & Support', value: '', color: 'text-[#4A4A4A]' },
  ];

  const tabs: { key: TabType; label: string }[] = [
    { key: 'profile', label: 'Profile' },
    { key: 'company', label: 'Company' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'security', label: 'Security' },
  ];

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar - Fixed on left */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-black/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-[#101111] font-bold text-lg tracking-tight">LEVERAGE</h1>
              <p className="text-[#4A4A4A] text-[10px] tracking-wider">CONNECTING DOTS TO PORTS</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active || pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#154230] text-white'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
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
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-[#101111] font-bold text-lg tracking-tight">LEVERAGE</h1>
              <p className="text-[#4A4A4A] text-[10px] tracking-wider">CONNECTING DOTS TO PORTS</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-9 h-9 bg-[#E6E2DA] rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active || pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-[#154230] text-white'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
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

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden px-4 pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
            <div className="w-8 h-8 bg-[#154230] rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[#154230] font-bold text-lg">LEVERAGE</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/rfqs/new" className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </Link>
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Bell className="w-5 h-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>

        {/* Hero Section - Mobile */}
        <div className="lg:hidden px-5 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-[#101111] text-xl font-bold mb-1">Settings</h1>
            <p className="text-[#777777] text-sm">Account preferences</p>
          </div>
          <div className="text-7xl opacity-80">🚢</div>
        </div>

        {/* Tabs - Mobile */}
        <div className="lg:hidden px-5 py-3 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-2 text-xs font-medium rounded-lg border transition-all ${
                activeTab === tab.key
                  ? 'bg-[#154230] text-white border-[#154230]'
                  : 'bg-white text-[#777777] border-[#E8E3DA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Banner - Mobile */}
        <div className="lg:hidden mx-5 mt-3 rounded-2xl p-5 bg-gradient-to-r from-[#084733] via-[#0B5D40] to-[#0D6C45] text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-[72px] h-[72px] rounded-full border-[3px] border-[#C9A34A] flex items-center justify-center text-3xl font-bold">
              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
            </div>
            <div>
              <p className="text-white/80 text-sm">Welcome back,</p>
              <p className="text-white font-bold text-2xl">{profile.firstName} {profile.lastName}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-white/12 rounded-full text-xs">Verified Account</span>
            </div>
          </div>
          <div className="text-6xl">🛡️</div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-white border-b border-black/5 px-8 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <h1 className="text-[#101111] text-xl font-bold">Settings</h1>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 bg-[#F7F6F2] rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#154230] to-[#1d5240] flex items-center justify-center text-white font-bold">
                {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 lg:px-8 py-6">
          {/* Form Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#154230] font-semibold text-base">Profile Information</h3>
              <button className="px-4 py-2.5 border border-[#C9A34A] text-[#9b7a2a] rounded-xl text-sm font-medium flex items-center gap-2">
                📷 Change Photo
              </button>
            </div>

            {/* First/Last Name Row */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-[#4A4A4A] text-xs font-semibold mb-2">First Name</label>
                <div className="h-[52px] border border-[#E8E3DA] rounded-xl flex items-center px-4 text-[#333] text-sm">
                  {profile.firstName}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-[#4A4A4A] text-xs font-semibold mb-2">Last Name</label>
                <div className="h-[52px] border border-[#E8E3DA] rounded-xl flex items-center px-4 text-[#333] text-sm">
                  {profile.lastName}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-[#4A4A4A] text-xs font-semibold mb-2">Email Address</label>
              <div className="h-[52px] border border-[#E8E3DA] rounded-xl flex items-center px-4 text-[#333] text-sm">
                {profile.email}
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-[#4A4A4A] text-xs font-semibold mb-2">Phone Number</label>
              <div className="h-[52px] border border-[#E8E3DA] rounded-xl flex items-center px-4 text-[#333] text-sm">
                {profile.phone}
              </div>
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-[#4A4A4A] text-xs font-semibold mb-2">Role</label>
              <div className="h-[52px] border border-[#E8E3DA] rounded-xl flex items-center px-4 text-[#333] text-sm">
                {profile.role}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={saveProfile}
              className="w-full mt-4 flex items-center justify-center gap-2 h-[55px] bg-gradient-to-r from-[#084733] via-[#0B5D40] to-[#0D6C45] text-white font-semibold rounded-xl text-base shadow-lg active:scale-[0.98] transition-transform"
            >
              💾 Save Changes
            </button>
          </div>

          {/* Stats Bar - Mobile */}
          <div className="lg:hidden mt-4 rounded-2xl bg-gradient-to-r from-[#7A161A] via-[#8B1D22] to-[#7A161A] p-5 text-white">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <h2 className="text-xl font-bold">150+</h2>
                <p className="text-[10px] mt-1 opacity-90">Countries Connected</p>
              </div>
              <div>
                <h2 className="text-xl font-bold">1M+</h2>
                <p className="text-[10px] mt-1 opacity-90">Shipments Processed</p>
              </div>
              <div>
                <h2 className="text-xl font-bold">20K+</h2>
                <p className="text-[10px] mt-1 opacity-90">Businesses Active</p>
              </div>
              <div>
                <h2 className="text-xl font-bold">99.9%</h2>
                <p className="text-[10px] mt-1 opacity-90">Compliance Rate</p>
              </div>
            </div>
          </div>

          {/* Desktop Stats */}
          <div className="hidden lg:block mt-6 rounded-2xl bg-[#5D1E21] p-6 shadow-lg">
            <div className="grid grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-2xl font-bold">150+</p>
                <p className="text-white/70 text-sm mt-1">Countries Connected</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                  <Ship className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-2xl font-bold">1M+</p>
                <p className="text-white/70 text-sm mt-1">Shipments Processed</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-2xl font-bold">20K+</p>
                <p className="text-white/70 text-sm mt-1">Businesses Active</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <p className="text-white text-2xl font-bold">99.9%</p>
                <p className="text-white/70 text-sm mt-1">Compliance Rate</p>
              </div>
            </div>
          </div>

          {/* Menu List */}
          <div className="mt-4 lg:mt-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center justify-between p-4 hover:bg-[#F7F4EF] transition-colors ${index !== menuItems.length - 1 ? 'border-b border-black/5' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F7F4EF] rounded-xl flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="text-[#101111] font-medium text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.value && (
                        <span className="text-[#4A4A4A] text-xs">{item.value}</span>
                      )}
                      <ChevronDown className="w-4 h-4 text-[#4A4A4A] rotate-[-90deg]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* FAB - Mobile */}
      <Link href="/rfqs/new" className="lg:hidden fixed right-6 bottom-[90px] w-[60px] h-[60px] bg-[#7A161A] rounded-full flex items-center justify-center text-white text-3xl shadow-lg z-30">
        +
      </Link>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 h-[72px] flex items-center justify-around z-30">
        <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[#666]">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/marketplace" className="flex flex-col items-center gap-1 text-[#666]">
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium">Browse</span>
        </Link>
        <Link href="/rfqs/new" className="flex flex-col items-center -mt-4">
          <div className="w-12 h-12 bg-[#154230] rounded-full flex items-center justify-center text-white shadow-lg">
            <Plus className="w-6 h-6" />
          </div>
        </Link>
        <Link href="/marketplace/inbox" className="flex flex-col items-center gap-1 text-[#666]">
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-medium">Inbox</span>
        </Link>
        <Link href="/account" className="flex flex-col items-center gap-1 text-[#154230]">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Account</span>
        </Link>
      </nav>
    </div>
  );
}
