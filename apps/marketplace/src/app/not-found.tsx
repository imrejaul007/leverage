'use client';

import Link from 'next/link';
import { Package, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f5f1] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-[#154230]" />
        </div>
        <h1 className="text-4xl font-bold text-[#101111] mb-4">404</h1>
        <h2 className="text-xl font-semibold text-[#101111] mb-2">Page Not Found</h2>
        <p className="text-[#4A4A4A] mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#154230] text-white font-semibold rounded-xl hover:bg-[#1d5240] transition-colors">
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#154230] text-[#154230] font-semibold rounded-xl hover:bg-[#E6E2DA] transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
