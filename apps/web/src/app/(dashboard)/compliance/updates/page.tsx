'use client';

import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Bell, AlertTriangle, ChevronRight } from 'lucide-react';

const updates = [
  { id: 1, title: 'Section 301 Tariff Updates', date: 'Jun 15, 2024', urgent: true, desc: 'New tariffs on Chinese goods announced' },
  { id: 2, title: 'USMCA Certificate Requirements', date: 'Jun 10, 2024', urgent: false, desc: 'New rules for certificate of origin' },
  { id: 3, title: 'FDA Import Alert', date: 'Jun 5, 2024', urgent: true, desc: 'Increased inspections for certain products' },
  { id: 4, title: 'CBP ACE Portal Update', date: 'Jun 1, 2024', urgent: false, desc: 'New filing requirements in ACE' },
];

export default function ComplianceUpdatesPage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Compliance Updates" subtitle="Latest regulatory changes" backHref="/compliance" />

      <div className="px-4 -mt-6 space-y-3">
        {updates.map((update) => (
          <div key={update.id} className={`bg-white rounded-2xl p-4 shadow-sm ${update.urgent ? 'border-l-4 border-red-500' : ''}`}>
            <div className="flex items-start gap-3">
              {update.urgent && <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />}
              <div className="flex-1">
                <p className="text-xs text-[#4A4A4A] mb-1">{update.date}</p>
                <h3 className="font-semibold text-[#101111]">{update.title}</h3>
                <p className="text-sm text-[#4A4A4A] mt-1">{update.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#4A4A4A]" />
            </div>
          </div>
        ))}
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
