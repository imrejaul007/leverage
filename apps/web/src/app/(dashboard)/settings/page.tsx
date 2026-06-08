'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, Save, Globe, Ship, Users, Shield, Home, Search, FileText, Mail, User, ChevronDown, Check, Bell, CreditCard, Lock, HelpCircle, Menu, X, Settings, LogOut, Plus, MessageSquare, Package, Truck, BarChart3 } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar - Fixed on left */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 lg:bg-[#154230] lg:z-40">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-base tracking-tight leading-none">LEVERAGE</p>
              <p className="text-white/50 text-[10px] tracking-wider mt-0.5">CONNECTING DOTS TO PORTS</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.active || pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">Log Out</span>
          </button>
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
      <aside className={`lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-[#154230] z-50 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-base tracking-tight leading-none">LEVERAGE</p>
              <p className="text-white/50 text-[10px] tracking-wider mt-0.5">CONNECTING DOTS TO PORTS</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.active || pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gradient-to-br from-[#154230] via-[#1d5240] to-[#154230] px-4 pt-6 pb-10 rounded-b-[32px] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute -right-8 -top-8 w-56 h-56 opacity-10" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="white" strokeWidth="0.5" />
              <ellipse cx="100" cy="100" rx="90" ry="35" fill="none" stroke="white" strokeWidth="0.5" />
              <ellipse cx="100" cy="100" rx="90" ry="60" fill="none" stroke="white" strokeWidth="0.3" />
            </svg>
          </div>

          {/* Logo Row */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-2 ml-2">
                <div className="w-9 h-9 bg-[#A6824A] rounded-lg flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="12" r="2" fill="currentColor" />
                    <circle cx="18" cy="12" r="2" fill="currentColor" />
                    <circle cx="12" cy="6" r="2" fill="currentColor" />
                    <circle cx="12" cy="18" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-tight leading-none">LEVERAGE</p>
                  <p className="text-white/50 text-[9px] tracking-wider mt-0.5">CONNECTING DOTS TO PORTS</p>
                </div>
              </div>
            </div>
            <button className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bell className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Settings Title */}
          <h1 className="text-white text-2xl font-bold mb-0.5 relative z-10">Settings</h1>
          <p className="text-white/70 text-sm relative z-10">Welcome back, {profile.firstName}</p>
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

        {/* Content - responsive padding */}
        <div className="px-4 lg:px-8 py-6">
          {/* Mobile: negative margin to pull cards up into header */}
          <div className="lg:mt-0 -mt-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-4 shadow-xl shadow-black/5">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#154230] to-[#1d5240] flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#A6824A] rounded-full flex items-center justify-center border-[3px] border-white shadow-md">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                  {/* Verified Badge */}
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-[#154230] rounded-full flex items-center justify-center border-[3px] border-white shadow-md">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 min-w-0 pt-1">
                  <h2 className="text-[#101111] font-bold text-lg leading-tight">{profile.firstName} {profile.lastName}</h2>
                  <p className="text-[#4A4A4A] text-sm truncate">{profile.email}</p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="px-2 py-0.5 bg-[#154230]/10 text-[#154230] text-xs font-medium rounded-full">{profile.role}</span>
                    <span className="px-2 py-0.5 bg-[#A6824A]/10 text-[#A6824A] text-xs font-medium rounded-full">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu List */}
          <div className="mt-4">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center justify-between p-4 hover:bg-[#F7F6F2] transition-colors ${index !== menuItems.length - 1 ? 'border-b border-black/5' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#F7F6F2] rounded-xl flex items-center justify-center">
                        <Icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <span className="text-[#101111] font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.value && (
                        <span className="text-[#4A4A4A] text-sm">{item.value}</span>
                      )}
                      <ChevronDown className="w-4 h-4 text-[#4A4A4A] rotate-[-90deg]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Card */}
          <div className="mt-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#101111] font-semibold mb-4">Account Details</h3>

              <div className="space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full h-12 px-4 bg-[#F7F6F2] border-2 border-transparent rounded-xl text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm transition-all font-medium"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full h-12 px-4 bg-[#F7F6F2] border-2 border-transparent rounded-xl text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm transition-all font-medium"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full h-12 px-4 bg-[#F7F6F2] border-2 border-transparent rounded-xl text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm transition-all font-medium"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full h-12 px-4 bg-[#F7F6F2] border-2 border-transparent rounded-xl text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm transition-all font-medium"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="w-full h-12 px-4 bg-[#F7F6F2] border-2 border-transparent rounded-xl text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm transition-all font-medium"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-[#4A4A4A] text-xs font-medium mb-1.5">Role</label>
                  <div className="relative">
                    <select
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="w-full h-12 px-4 bg-[#F7F6F2] border-2 border-transparent rounded-xl text-[#101111] focus:outline-none focus:border-[#A6824A] text-sm transition-all font-medium appearance-none pr-10"
                    >
                      <option>Administrator</option>
                      <option>Manager</option>
                      <option>Trader</option>
                      <option>Viewer</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={saveProfile}
                className="w-full mt-6 flex items-center justify-center gap-2 h-12 bg-[#154230] text-white font-semibold rounded-xl text-sm hover:bg-[#1d5240] transition-colors shadow-lg shadow-[#154230]/20 active:scale-[0.98]"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved Successfully
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="mt-4 pb-24 lg:pb-8">
            <div className="bg-[#5D1E21] rounded-2xl p-4 shadow-lg shadow-[#5D1E21]/20">
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-bold leading-tight">150+</p>
                  <p className="text-white/60 text-[10px]">Countries</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                    <Ship className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-bold leading-tight">1M+</p>
                  <p className="text-white/60 text-[10px]">Shipments</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-bold leading-tight">20K+</p>
                  <p className="text-white/60 text-[10px]">Businesses</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-bold leading-tight">99.9%</p>
                  <p className="text-white/60 text-[10px]">Compliance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-2 pb-6 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-30">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {bottomNavLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${isActive ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}
              >
                {item.primary ? (
                  <div className="w-11 h-11 bg-gradient-to-br from-[#154230] to-[#1d5240] rounded-xl flex items-center justify-center shadow-lg shadow-[#154230]/30 -mt-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-[#154230] shadow-lg shadow-[#154230]/30' : ''}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                  </div>
                )}
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}