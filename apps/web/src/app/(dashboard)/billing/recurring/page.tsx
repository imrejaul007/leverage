'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { RefreshCw, Plus, Calendar, DollarSign, MoreVertical } from 'lucide-react';

const recurringInvoices = [
  { id: '1', client: 'ABC Imports', amount: 15000, frequency: 'Monthly', nextDate: 'Jul 1, 2026', status: 'active' },
  { id: '2', client: 'XYZ Corporation', amount: 8500, frequency: 'Monthly', nextDate: 'Jul 15, 2026', status: 'active' },
  { id: '3', client: 'Global Trade Co', amount: 22000, frequency: 'Quarterly', nextDate: 'Aug 1, 2026', status: 'paused' },
];

const statusColors = {
  active: 'bg-green-100 text-green-700',
  paused: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function RecurringPage() {
  const [invoices] = useState(recurringInvoices);

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Recurring Invoices" subtitle="Manage automated billing" backHref="/billing" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-[#154230]" />
              <h3 className="text-[#101111] font-bold">Active Recurring</h3>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-[#154230] text-white rounded-lg text-xs font-medium">
              <Plus className="w-4 h-4" /> New
            </button>
          </div>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="bg-[#E6E2DA] rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-[#101111]">{inv.client}</h4>
                    <p className="text-sm text-[#4A4A4A]">{inv.frequency} billing</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[inv.status as keyof typeof statusColors]}`}>
                      {inv.status}
                    </span>
                    <button className="p-1 hover:bg-white rounded">
                      <MoreVertical className="w-4 h-4 text-[#4A4A4A]" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-[#4A4A4A]">
                    <Calendar className="w-4 h-4" />
                    Next: {inv.nextDate}
                  </div>
                  <div className="flex items-center gap-1 font-bold text-[#154230]">
                    <DollarSign className="w-4 h-4" />
                    ${inv.amount.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Auto-Billing</p>
              <p className="text-sm text-white/70">Set up automatic payments for repeat clients</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeItem="billing" />
    </div>
  );
}
