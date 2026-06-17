'use client';

import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { FileText, ExternalLink, ChevronRight } from 'lucide-react';

const regulations = [
  { name: 'CBP Entry Requirements', country: 'USA', updated: 'Jun 2024', category: 'Customs' },
  { name: 'FDA Food Facility Registration', country: 'USA', updated: 'May 2024', category: 'Food' },
  { name: 'EPA TSCA Chemical Reporting', country: 'USA', updated: 'Apr 2024', category: 'Chemicals' },
  { name: 'USDA Import Regulations', country: 'USA', updated: 'Jun 2024', category: 'Agriculture' },
  { name: 'FCC Equipment Authorization', country: 'USA', updated: 'Mar 2024', category: 'Electronics' },
];

export default function RegulationsPage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Import Regulations" subtitle="Latest requirements by agency" backHref="/compliance" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-semibold mb-4">US Import Regulations</h3>
          <div className="space-y-3">
            {regulations.map((reg) => (
              <div key={reg.name} className="p-4 bg-[#E6E2DA] rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-[#154230]" />
                    <div>
                      <p className="font-medium text-[#101111]">{reg.name}</p>
                      <p className="text-sm text-[#4A4A4A]">{reg.country} • {reg.category} • Updated {reg.updated}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-[#4A4A4A]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
