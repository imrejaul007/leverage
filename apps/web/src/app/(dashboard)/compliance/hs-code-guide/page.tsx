'use client';

import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Book, ChevronRight } from 'lucide-react';

const chapters = [
  { code: '01-05', name: 'Live Animals & Products', count: 458 },
  { code: '06-14', name: 'Vegetable Products', count: 892 },
  { code: '15', name: 'Animal/Vegetable Fats & Oils', count: 156 },
  { code: '16-24', name: 'Foodstuffs', count: 678 },
  { code: '25-27', name: 'Minerals & Products', count: 445 },
  { code: '28-38', name: 'Chemicals', count: 1234 },
  { code: '39-40', name: 'Plastics & Rubber', count: 567 },
  { code: '41-43', name: 'Leather & Hides', count: 234 },
  { code: '44-46', name: 'Wood & Articles', count: 312 },
  { code: '50-63', name: 'Textiles & Apparel', count: 2156 },
  { code: '64-67', name: 'Footwear & Headgear', count: 234 },
  { code: '84-85', name: 'Machinery & Electronics', count: 3456 },
  { code: '86-89', name: 'Transportation', count: 890 },
];

export default function HSCodeGuidePage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="HS Code Guide" subtitle="Understanding the harmonized system" backHref="/compliance" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-8 h-8 text-[#154230]" />
            <div>
              <h3 className="text-[#101111] font-semibold">HS Code Structure</h3>
              <p className="text-sm text-[#4A4A4A]">99.99% accurate classification</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-[#E6E2DA] rounded-xl">
              <p className="text-xs text-[#4A4A4A]">Chapter</p>
              <p className="font-mono font-bold text-[#154230]">XX</p>
            </div>
            <div className="p-3 bg-[#E6E2DA] rounded-xl">
              <p className="text-xs text-[#4A4A4A]">Heading</p>
              <p className="font-mono font-bold text-[#154230]">XXXX</p>
            </div>
            <div className="p-3 bg-[#E6E2DA] rounded-xl">
              <p className="text-xs text-[#4A4A4A]">Subheading</p>
              <p className="font-mono font-bold text-[#154230]">XXXX.XX</p>
            </div>
            <div className="p-3 bg-[#E6E2DA] rounded-xl">
              <p className="text-xs text-[#4A4A4A]">National</p>
              <p className="font-mono font-bold text-[#154230]">XXXX.XX.XX</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-semibold mb-4">Chapters</h3>
          <div className="space-y-2">
            {chapters.map((ch) => (
              <button key={ch.code} className="w-full flex items-center justify-between p-3 bg-[#E6E2DA] rounded-xl hover:bg-[#D5D1C9]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#154230]">{ch.code}</span>
                  <span className="text-[#101111]">{ch.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#4A4A4A]">{ch.count} codes</span>
                  <ChevronRight className="w-4 h-4 text-[#4A4A4A]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
