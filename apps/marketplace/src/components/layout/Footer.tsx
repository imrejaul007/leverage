'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';

const platformLinks = [
  { name: 'Products', href: '/products' },
  { name: 'Suppliers', href: '/suppliers' },
  { name: 'RFQs', href: '/rfqs' },
  { name: 'Documents', href: '/documents' },
  { name: 'Freight', href: '/freight' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'AI Assistant', href: '/ai' },
  { name: 'Billing', href: '/billing' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Security', href: '/security' },
];

export function Footer() {
  return (
    <footer className="bg-[#154230]">
      {/* Main Footer */}
      <div className="px-4 sm:px-8 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain brightness-0 invert" />
              </Link>
              <p className="text-white/70 text-sm mb-4">
                The Global Trade Operating System. Connect, trade, and grow your business worldwide.
              </p>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Globe className="w-4 h-4" />
                <span>150+ Countries</span>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm">
                {platformLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} LEVERAGE Marketplace. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link href="/security" className="text-white/70 hover:text-white text-sm transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
