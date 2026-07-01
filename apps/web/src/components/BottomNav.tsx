'use client';

import Link from 'next/link';
import { Home, Search, Plus, MessageSquare, FileText, Package, Truck, Settings, User, BarChart3, Shield, Briefcase, Headphones, MapPin } from 'lucide-react';

interface BottomNavProps {
  activeItem?: string;
}

// Map page-specific IDs to nav items
const idMapping: Record<string, string> = {
  'home': 'home',
  'orders': 'home',
  'order': 'home',
  'products': 'home',
  'product': 'home',
  'compliance': 'compliance',
  'ai': 'ai',
  'settings': 'settings',
  'account': 'settings',
  'analytics': 'analytics',
  'freight': 'freight',
  'freight/quotes': 'freight',
  'freight/features': 'freight',
  'consultations': 'consultations',
  'consultations/schedule': 'consultations',
  'browse': 'browse',
  'marketplace': 'browse',
  'sell': 'sell',
  'products/new': 'sell',
  'rfq': 'rfq',
  'rfqs': 'rfq',
  'rfqs/new': 'rfq',
  'inbox': 'inbox',
  'messages': 'inbox',
  'marketplace/inbox': 'inbox',
};

const navItems = [
  { id: 'home', href: '/dashboard', icon: Home, label: 'Home' },
  { id: 'freight', href: '/freight', icon: Truck, label: 'Freight' },
  { id: 'sell', href: '/products/new', icon: Plus, label: 'Sell', primary: true },
  { id: 'consultations', href: '/consultations', icon: Headphones, label: 'Experts' },
  { id: 'inbox', href: '/messages', icon: MessageSquare, label: 'Inbox' },
];

export default function BottomNav({ activeItem = 'home' }: BottomNavProps) {
  // Map the activeItem to a valid nav ID
  const mappedId = idMapping[activeItem?.toLowerCase()] || 'home';

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 h-[72px] flex items-center justify-around z-30">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = mappedId === item.id;

        if (item.primary) {
          return (
            <Link key={item.id} href={item.href} className="flex flex-col items-center -mt-4">
              <div className="w-12 h-12 bg-[#154230] rounded-full flex items-center justify-center text-white shadow-lg">
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-[#154230]' : 'text-[#666]'}`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}