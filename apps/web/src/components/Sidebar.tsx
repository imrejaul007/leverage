'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Home,
  Search,
  FileText,
  Truck,
  Package,
  User,
  MessageSquare,
  BarChart3,
  Settings,
  ShoppingBag,
  Calendar,
  Shield,
  Megaphone,
  DollarSign,
  X,
  LogOut,
} from 'lucide-react';

export const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/products', icon: ShoppingBag, label: 'Products' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/freight', icon: Truck, label: 'Freight' },
  { href: '/consultations', icon: Calendar, label: 'Consultations' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/compliance', icon: Shield, label: 'Compliance' },
  { href: '/ads', icon: Megaphone, label: 'Ads' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/billing', icon: DollarSign, label: 'Billing' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
      {sidebarLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
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
  );
}

// Mobile Sidebar Overlay Component
interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <aside className="relative w-72 bg-white h-full flex flex-col shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
          <button onClick={onClose} className="p-2 hover:bg-[#E6E2DA] rounded-lg">
            <X className="w-5 h-5 text-[#4A4A4A]" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
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
          <button className="flex items-center gap-3 px-4 py-3 w-full text-[#4A4A4A] hover:bg-[#E6E2DA] rounded-xl mt-2">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
}