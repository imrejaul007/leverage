'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Shield,
  Bell,
  Building2,
  CreditCard,
  Link2,
  Key,
  Globe,
  Users,
  ChevronRight,
  Check,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  LogOut,
  Download,
  Trash2,
  AlertTriangle,
  FileText,
  BarChart3,
  Package,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

interface SettingItem {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

const settingSections = [
  {
    title: 'Account',
    items: [
      { icon: User, title: 'Profile', description: 'Update your personal information', href: '/settings/profile', badge: '', badgeColor: '' },
      { icon: Building2, title: 'Company', description: 'Business details and team', href: '/settings/company', badge: '', badgeColor: '' },
      { icon: Users, title: 'Team', description: 'Manage team members and roles', href: '/settings/team', badge: 'Coming Soon', badgeColor: '#A6824A' },
    ],
  },
  {
    title: 'Security',
    items: [
      { icon: Shield, title: 'Security', description: 'Password, 2FA, and sessions', href: '/settings/security', badge: '', badgeColor: '' },
      { icon: Key, title: 'API Keys', description: 'Manage API access', href: '/settings/api', badge: '', badgeColor: '' },
      { icon: Lock, title: 'Sessions', description: 'Active sessions and devices', href: '/settings/sessions', badge: '', badgeColor: '' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: Bell, title: 'Notifications', description: 'Email, push, and in-app alerts', href: '/settings/notifications', badge: '', badgeColor: '' },
      { icon: Globe, title: 'Language & Region', description: 'Currency, timezone, and language', href: '/settings/language', badge: '', badgeColor: '' },
      { icon: Moon, title: 'Appearance', description: 'Dark mode and display settings', href: '/settings/appearance', badge: '', badgeColor: '' },
    ],
  },
  {
    title: 'Billing',
    items: [
      { icon: CreditCard, title: 'Billing & Subscription', description: 'Plans, invoices, and payment methods', href: '/settings/billing', badge: 'Pro', badgeColor: '#154230' },
      { icon: FileText, title: 'Invoices', description: 'View and download invoices', href: '/settings/invoices', badge: '', badgeColor: '' },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { icon: Link2, title: 'Integrations', description: 'Connected apps and services', href: '/settings/integrations', badge: '', badgeColor: '' },
      { icon: Package, title: 'Marketplace Apps', description: 'Extend your workspace', href: '/settings/marketplace-apps', badge: 'Coming Soon', badgeColor: '#A6824A' },
    ],
  },
  {
    title: 'Data & Export',
    items: [
      { icon: Download, title: 'Export Data', description: 'Download your data', href: '/settings/export', badge: '', badgeColor: '' },
      { icon: BarChart3, title: 'Usage Statistics', description: 'API and storage usage', href: '/settings/usage', badge: '', badgeColor: '' },
    ],
  },
  {
    title: 'Danger Zone',
    items: [
      { icon: AlertTriangle, title: 'Delete Account', description: 'Permanently delete your account', href: '/settings/delete', badge: '', badgeColor: '' },
    ],
    isDanger: true,
  },
];

export default function SettingsPage() {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Settings"
        subtitle="Manage your account"
        showBack={false}
      />

      <div className="px-4 -mt-2 space-y-6">
        {/* Account Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 bg-[#154230] rounded-full flex items-center justify-center text-white text-xl font-bold">
              JD
            </div>
            <div className="flex-1">
              <h2 className="text-[#101111] font-bold text-lg">John Doe</h2>
              <p className="text-[#4A4A4A] text-sm">john@company.com</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-[#154230]/10 text-[#154230] text-xs font-semibold rounded">Pro Plan</span>
                <span className="px-2 py-0.5 bg-[#A6824A]/10 text-[#A6824A] text-xs font-semibold rounded">Verified</span>
              </div>
            </div>
            <Link
              href="/settings/profile"
              className="p-2 bg-[#E6E2DA] rounded-xl hover:bg-[#154230]/10 transition-colors"
            >
              <User className="w-5 h-5 text-[#4A4A4A]" />
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <CheckCircle2 className="w-6 h-6 text-[#154230] mx-auto mb-1" />
            <p className="text-[#101111] font-bold text-xl">156</p>
            <p className="text-[#4A4A4A] text-xs">Orders</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <Truck className="w-6 h-6 text-[#154230] mx-auto mb-1" />
            <p className="text-[#101111] font-bold text-xl">42</p>
            <p className="text-[#4A4A4A] text-xs">Shipments</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <FileText className="w-6 h-6 text-[#154230] mx-auto mb-1" />
            <p className="text-[#101111] font-bold text-xl">89</p>
            <p className="text-[#4A4A4A] text-xs">Documents</p>
          </div>
        </div>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <div key={section.title} className="space-y-3">
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${section.isDanger ? 'text-[#DC2626]' : 'text-[#4A4A4A]'}`}>
              {section.title}
            </h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const isLast = itemIndex === section.items.length - 1;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 p-4 hover:bg-[#f7f5f1] transition-colors ${!isLast ? 'border-b border-black/5' : ''}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${section.isDanger ? 'bg-[#DC2626]/10' : 'bg-[#E6E2DA]'}`}>
                      <item.icon className={`w-6 h-6 ${section.isDanger ? 'text-[#DC2626]' : 'text-[#154230]'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-semibold ${section.isDanger ? 'text-[#DC2626]' : 'text-[#101111]'}`}>
                          {item.title}
                        </h4>
                        {item.badge && (
                          <span
                            className="px-2 py-0.5 text-[10px] font-semibold rounded"
                            style={{
                              backgroundColor: item.badgeColor ? `${item.badgeColor}20` : '#E6E2DA',
                              color: item.badgeColor || '#4A4A4A'
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[#4A4A4A] text-sm">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#4A4A4A]/50" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 py-4 bg-white rounded-2xl shadow-sm text-[#DC2626] font-semibold hover:bg-[#DC2626]/5 transition-colors">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>

        {/* Version Info */}
        <p className="text-center text-[#4A4A4A]/50 text-xs pb-4">
          LEVERAGE v2.4.1 • Made with care for global trade
        </p>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
