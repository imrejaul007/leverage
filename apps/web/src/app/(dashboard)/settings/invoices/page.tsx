'use client';

import { useState } from 'react';
import {
  FileText,
  Download,
  Search,
  Filter,
  Check,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const invoices = [
  { id: 'INV-2024-012', date: 'Jun 1, 2024', dueDate: 'Jun 15, 2024', amount: '$149.00', status: 'Paid', items: ['Pro Plan - Monthly'] },
  { id: 'INV-2024-011', date: 'May 1, 2024', dueDate: 'May 15, 2024', amount: '$149.00', status: 'Paid', items: ['Pro Plan - Monthly'] },
  { id: 'INV-2024-010', date: 'Apr 1, 2024', dueDate: 'Apr 15, 2024', amount: '$149.00', status: 'Paid', items: ['Pro Plan - Monthly'] },
  { id: 'INV-2024-009', date: 'Mar 1, 2024', dueDate: 'Mar 15, 2024', amount: '$149.00', status: 'Paid', items: ['Pro Plan - Monthly'] },
  { id: 'INV-2024-008', date: 'Feb 1, 2024', dueDate: 'Feb 15, 2024', amount: '$149.00', status: 'Paid', items: ['Pro Plan - Monthly'] },
  { id: 'INV-2024-007', date: 'Jan 1, 2024', dueDate: 'Jan 15, 2024', amount: '$149.00', status: 'Paid', items: ['Pro Plan - Monthly'] },
];

export default function InvoicesSettingsPage() {
  const [search, setSearch] = useState('');
  const [downloading, setDownloading] = useState<string | null>(null);

  const filteredInvoices = invoices.filter(inv =>
    inv.id.toLowerCase().includes(search.toLowerCase()) ||
    inv.date.includes(search)
  );

  const totalPaid = invoices.filter(i => i.status === 'Paid').length;
  const totalAmount = invoices.reduce((sum, i) => sum + parseFloat(i.amount.replace('$', '')), 0);

  const handleDownload = async (id: string) => {
    setDownloading(id);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDownloading(null);
    alert(`Invoice ${id} downloaded!`);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Invoices"
        subtitle="Billing history"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Summary */}
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/70 text-sm">Total Paid</p>
              <p className="text-2xl font-bold">{totalPaid} invoices</p>
            </div>
            <div>
              <p className="text-white/70 text-sm">Total Amount</p>
              <p className="text-2xl font-bold">${totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search invoices..."
              className="w-full h-12 pl-12 pr-4 bg-[#E6E2DA] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#154230] border border-transparent"
            />
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {filteredInvoices.map((invoice, i) => (
            <div
              key={invoice.id}
              className={`p-4 ${i !== filteredInvoices.length - 1 ? 'border-b border-black/5' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#154230]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[#101111] font-semibold">{invoice.id}</h4>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                      invoice.status === 'Paid'
                        ? 'bg-[#16A34A]/10 text-[#16A34A]'
                        : 'bg-[#CA8A04]/10 text-[#CA8A04]'
                    }`}>
                      {invoice.status}
                    </span>
                  </div>
                  <p className="text-[#4A4A4A] text-sm">{invoice.date}</p>
                  <p className="text-[#101111] font-bold mt-1">{invoice.amount}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(invoice.id)}
                    disabled={downloading === invoice.id}
                    className="p-2 bg-[#E6E2DA] rounded-lg hover:bg-[#154230]/10 transition-colors disabled:opacity-50"
                  >
                    {downloading === invoice.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 text-[#154230]" />
                    )}
                  </button>
                  <button className="p-2 bg-[#E6E2DA] rounded-lg hover:bg-[#154230]/10 transition-colors">
                    <ExternalLink className="w-4 h-4 text-[#154230]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredInvoices.length === 0 && (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-[#4A4A4A] mx-auto mb-3" />
              <p className="text-[#4A4A4A]">No invoices found</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
