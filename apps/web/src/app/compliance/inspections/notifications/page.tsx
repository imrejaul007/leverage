'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bell,
  Settings,
  Check,
  AlertCircle,
  ChevronRight,
  Menu,
  X,
  Mail,
  MessageSquare,
  Clock,
  Calendar,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Documents', href: '/documents' },
  { name: 'Freight', href: '/freight' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'AI Assistant', href: '/ai' },
  { name: 'Billing', href: '/billing' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

const notifications = [
  { id: 1, type: 'reminder', title: 'Inspection Scheduled', message: 'Your inspection INS-2024-001 is scheduled for tomorrow at 10:00 AM.', time: '2 hours ago', read: false },
  { id: 2, type: 'alert', title: 'Inspection Report Ready', message: 'Inspection report for INS-2024-002 is now available.', time: '5 hours ago', read: false },
  { id: 3, type: 'success', title: 'Inspection Completed', message: 'Factory audit INS-2024-003 has been completed successfully.', time: '1 day ago', read: true },
  { id: 4, type: 'reminder', title: 'Certificate Expiring', message: 'Your quality certificate expires in 30 days. Please renew.', time: '2 days ago', read: true },
];

const notificationSettings = [
  { id: 'inspection_scheduled', label: 'Inspection Scheduled', email: true, sms: true, inApp: true },
  { id: 'inspection_completed', label: 'Inspection Completed', email: true, sms: false, inApp: true },
  { id: 'report_ready', label: 'Report Ready', email: true, sms: true, inApp: true },
  { id: 'agent_assigned', label: 'Agent Assigned', email: true, sms: true, inApp: true },
  { id: 'certificate_expiry', label: 'Certificate Expiry', email: true, sms: false, inApp: true },
];

export default function InspectionNotificationsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Bell className="w-5 h-5 text-blue-500" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'bg-blue-100';
      case 'alert':
        return 'bg-yellow-100';
      case 'success':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Notifications</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium text-[#154230]">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#5D1E21] rounded-full"></span>
              </button>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pt-4 border-t border-black/5">
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Compliance</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-8 py-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          {/* Page Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-[#154230] rounded-2xl flex items-center justify-center">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#101111]">
                Inspection Notifications
              </h1>
            </div>
            <p className="text-lg text-[#4A4A4A] text-center max-w-2xl mx-auto">
              Stay updated on your inspection schedules, reports, and status changes.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'notifications' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Bell className="w-4 h-4 inline mr-2" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'settings' ? 'text-[#154230] border-b-2 border-[#154230]' : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Settings
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  {notifications.map((notification, index) => (
                    <div key={notification.id} className={`p-4 rounded-xl ${!notification.read ? 'bg-[#154230]' : index % 2 === 0 ? 'bg-[#5D1E21]' : 'bg-[#f7f5f1]'}`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getTypeBg(notification.type)}`}>
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-medium ${!notification.read ? 'text-white' : 'text-[#101111]'}`}>{notification.title}</h3>
                            <span className={`text-sm ${!notification.read ? 'text-white/60' : 'text-[#4A4A4A]'}`}>{notification.time}</span>
                          </div>
                          <p className={`text-sm ${!notification.read ? 'text-white/80' : 'text-[#4A4A4A]'}`}>{notification.message}</p>
                          {!notification.read && (
                            <Link href={`/compliance/inspections/track/${notification.id}`} className="inline-flex items-center gap-1 mt-2 text-white font-medium text-sm hover:text-white/80">
                              View Details <ChevronRight className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="p-4 bg-[#f7f5f1] rounded-xl">
                    <h3 className="font-bold text-[#101111] mb-2">Notification Preferences</h3>
                    <p className="text-sm text-[#4A4A4A] mb-4">Choose how you want to receive inspection notifications.</p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#4A4A4A]" />
                        <span className="text-sm text-[#101111]">Email</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#4A4A4A]" />
                        <span className="text-sm text-[#101111]">SMS</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#4A4A4A]" />
                        <span className="text-sm text-[#101111]">In-App</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {notificationSettings.map((setting, index) => (
                      <div key={setting.id} className={`p-4 rounded-xl ${index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{setting.label}</span>
                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" defaultChecked={setting.email} className="w-4 h-4 rounded" />
                              <span className="text-white text-sm">Email</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" defaultChecked={setting.sms} className="w-4 h-4 rounded" />
                              <span className="text-white text-sm">SMS</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" defaultChecked={setting.inApp} className="w-4 h-4 rounded" />
                              <span className="text-white text-sm">App</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/compliance/inspections/schedule" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Calendar className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Schedule Inspection</h3>
              <p className="text-sm text-white/70 mb-4">Book a new inspection session.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Schedule <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/track" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <Clock className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Track Inspections</h3>
              <p className="text-sm text-white/70 mb-4">View all your scheduled inspections.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Track <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/inspections/reports" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <Bell className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">View Reports</h3>
              <p className="text-sm text-white/70 mb-4">Access inspection reports.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Reports <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer - 50% Green / 50% Maroon */}
      <footer className="bg-[#154230]">
        <div className="bg-[#154230] px-4 sm:px-8 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain mb-4 brightness-0 invert" />
                <p className="text-white/70 text-sm mb-4">
                  The operating system for global trade.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Platform</h4>
                <ul className="space-y-2 text-sm">
                  {platformLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Company</h4>
                <ul className="space-y-2 text-sm">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Legal</h4>
                <ul className="space-y-2 text-sm">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/70 text-sm">
                © 2024 LEVERAGE. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy</Link>
                <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">Terms</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}