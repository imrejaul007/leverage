'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Plus,
  LayoutGrid,
  Briefcase,
} from 'lucide-react';

// Marketplace links
const marketplaceLinks = [
  { href: '/marketplace', icon: Search, label: 'Browse Products' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/products', icon: ShoppingBag, label: 'My Products' },
  { href: '/network', icon: User, label: 'Network' },
];

// Operations links
const operationsLinks = [
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/freight', icon: Truck, label: 'Freight' },
  { href: '/compliance', icon: Shield, label: 'Compliance' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/billing', icon: DollarSign, label: 'Billing' },
];

// Tools links (shared)
const toolsLinks = [
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/ads', icon: Megaphone, label: 'Ads' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarSectionProps {
  title: string;
  links: Array<{ href: string; icon: any; label: string }>;
  pathname: string;
  onClose?: () => void;
}

function SidebarSection({ title, links, pathname, onClose }: SidebarSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="px-4 text-xs font-semibold text-[#4A4A4A] uppercase tracking-wider mb-2">{title}</h3>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
              isActive
                ? 'bg-[#154230] text-white'
                : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium text-sm">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
  section: 'marketplace' | 'operations';
}

export default function DashboardSidebar({ mobileOpen, onClose, section }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('leverage_user');
    router.push('/login');
  };

  const links = section === 'marketplace' ? marketplaceLinks : operationsLinks;

  return (
    <nav className="flex-1 p-4 overflow-y-auto">
      {/* Section Header */}
      <div className="px-4 py-3 mb-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
          section === 'marketplace' ? 'bg-[#154230]/10 text-[#154230]' : 'bg-[#A6824A]/10 text-[#A6824A]'
        }`}>
          {section === 'marketplace' ? <LayoutGrid className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
          <span className="text-sm font-semibold capitalize">{section}</span>
        </div>
      </div>

      {/* Section Links */}
      <SidebarSection title={section === 'marketplace' ? 'Trading' : 'Operations'} links={links} pathname={pathname} onClose={onClose} />

      {/* Tools Section (Shared) */}
      <div className="border-t border-black/5 pt-4 mt-4">
        <SidebarSection title="Tools" links={toolsLinks} pathname={pathname} onClose={onClose} />
      </div>
    </nav>
  );
}

// Mobile Sidebar for Dashboard
interface MobileDashboardSidebarProps {
  open: boolean;
  onClose: () => void;
  section: 'marketplace' | 'operations';
}

export function MobileDashboardSidebar({ open, onClose, section }: MobileDashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('leverage_user');
    router.push('/login');
  };

  const links = section === 'marketplace' ? marketplaceLinks : operationsLinks;

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

        {/* Section Header */}
        <div className="px-4 py-3">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            section === 'marketplace' ? 'bg-[#154230]/10 text-[#154230]' : 'bg-[#A6824A]/10 text-[#A6824A]'
          }`}>
            {section === 'marketplace' ? <LayoutGrid className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            <span className="text-sm font-semibold capitalize">{section}</span>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <SidebarSection title={section === 'marketplace' ? 'Trading' : 'Operations'} links={links} pathname={pathname} onClose={onClose} />

          <div className="border-t border-black/5 pt-4 mt-4">
            <SidebarSection title="Tools" links={toolsLinks} pathname={pathname} onClose={onClose} />
          </div>
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
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full text-[#4A4A4A] hover:bg-[#E6E2DA] rounded-lg mt-2">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
}