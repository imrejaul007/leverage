'use client';

import Link from 'next/link';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';

interface BottomNavProps {
  activeItem?: string;
}

const navItems = [
  { id: 'home', href: '/dashboard', icon: Home, label: 'Home' },
  { id: 'browse', href: '/marketplace', icon: Search, label: 'Browse' },
  { id: 'post', href: '/rfqs/new', icon: Plus, label: 'Post RFQ', primary: true },
  { id: 'inbox', href: '/marketplace/inbox', icon: MessageSquare, label: 'Inbox' },
  { id: 'account', href: '/account', icon: User, label: 'Account' },
];

export default function BottomNav({ activeItem = 'home' }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#eee] h-[70px] sm:h-[82px] flex justify-around items-center z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;

        if (item.primary) {
          return (
            <Link key={item.id} href={item.href} className="flex flex-col items-center">
              <div className="w-[52px] h-[52px] sm:w-[62px] sm:h-[62px] rounded-full bg-[#154230] text-white flex items-center justify-center text-[28px] sm:text-[34px] mt-[-24px] sm:mt-[-30px] shadow-lg active:scale-95 transition-transform">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-colors ${
              isActive ? 'text-[#154230]' : 'text-[#777]'
            }`}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}