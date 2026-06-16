'use client';

import {
  Package,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

export default function MarketplaceAppsSettingsPage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Marketplace Apps"
        subtitle="Extend your workspace"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-[#A6824A] to-[#8a6a3a] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-xl">Coming Soon</p>
              <p className="text-white/70">Marketplace Apps are under development</p>
            </div>
          </div>
          <p className="text-white/80 text-sm">
            Soon you'll be able to extend your LEVERAGE workspace with third-party apps and integrations from our marketplace.
          </p>
        </div>

        {/* Features Preview */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">What&apos;s Coming</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-[#E6E2DA] rounded-xl">
              <div className="w-8 h-8 bg-[#154230]/10 rounded-lg flex items-center justify-center">
                <span className="text-[#154230] font-bold">1</span>
              </div>
              <div>
                <p className="text-[#101111] font-medium">One-click Install</p>
                <p className="text-[#4A4A4A] text-sm">Install apps with a single click</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#E6E2DA] rounded-xl">
              <div className="w-8 h-8 bg-[#154230]/10 rounded-lg flex items-center justify-center">
                <span className="text-[#154230] font-bold">2</span>
              </div>
              <div>
                <p className="text-[#101111] font-medium">Verified Publishers</p>
                <p className="text-[#4A4A4A] text-sm">All apps are vetted for security</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-[#E6E2DA] rounded-xl">
              <div className="w-8 h-8 bg-[#154230]/10 rounded-lg flex items-center justify-center">
                <span className="text-[#154230] font-bold">3</span>
              </div>
              <div>
                <p className="text-[#101111] font-medium">Developer API</p>
                <p className="text-[#4A4A4A] text-sm">Build your own apps for LEVERAGE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stay Updated */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Stay Updated</h3>
          <p className="text-[#4A4A4A] text-sm mb-4">
            Be the first to know when marketplace apps launch.
          </p>
          <button className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold">
            Notify Me
          </button>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
