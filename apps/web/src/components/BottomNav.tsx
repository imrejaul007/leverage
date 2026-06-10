'use client';

import Link from 'next/link';
import { Home, Search, Plus, MessageSquare, FileText } from 'lucide-react';

interface BottomNavProps {
  activeItem?: string;
}

const navItems = [
  { id: 'home', href: '/dashboard', icon: Home, label: 'Home' },
  { id: 'browse', href: '/marketplace', icon: Search, label: 'Browse' },
  { id: 'sell', href: '/products/new', icon: Plus, label: 'Sell', primary: true },
  { id: 'rfq', href: '/rfqs/new', icon: FileText, label: 'Post RFQ' },
  { id: 'inbox', href: '/marketplace/inbox', icon: MessageSquare, label: 'Inbox' },
];

export default function BottomNav({ activeItem = 'home' }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 h-[72px] flex items-center justify-around z-30">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;

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