'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { FileText, Download, CheckCircle, Calendar, TrendingUp } from 'lucide-react';

export default function TaxReadyPage() {
  const [taxYear, setTaxYear] = useState('2026');

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Tax-Ready" subtitle="Prepare for tax season" backHref="/billing" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Tax Preparation</p>
              <p className="text-sm text-white/70">Export-ready reports for your accountant</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#101111] font-bold">Tax Year</h3>
            <select
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value)}
              className="px-4 py-2 bg-[#E6E2DA] rounded-lg border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-[#E6E2DA] rounded-xl p-4">
              <p className="text-xs text-[#4A4A4A]">Total Revenue</p>
              <p className="text-xl font-bold text-[#154230]">$245,000</p>
            </div>
            <div className="bg-[#E6E2DA] rounded-xl p-4">
              <p className="text-xs text-[#4A4A4A]">Total Expenses</p>
              <p className="text-xl font-bold text-[#5D1E21]">$78,500</p>
            </div>
          </div>

          <div className="bg-[#E6E2DA] rounded-xl p-4">
            <p className="text-xs text-[#4A4A4A]">Net Income</p>
            <p className="text-2xl font-bold text-green-600">$166,500</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Tax Documents</h3>
          <div className="space-y-2">
            {[
              { name: 'Profit & Loss Statement', format: 'PDF', status: 'ready' },
              { name: 'Expense Report', format: 'XLSX', status: 'ready' },
              { name: 'Invoice Summary', format: 'PDF', status: 'ready' },
              { name: '1099 Form Data', format: 'CSV', status: 'pending' },
            ].map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#E6E2DA] rounded-xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#154230]" />
                  <div>
                    <p className="text-[#101111] font-medium">{doc.name}</p>
                    <p className="text-xs text-[#4A4A4A]">{doc.format}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {doc.status === 'ready' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <button className="p-2 bg-[#154230] rounded-lg text-white">
                        <Download className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-[#4A4A4A]">Generating...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Key Dates</h3>
          <div className="space-y-2">
            {[
              { date: 'Jan 15, 2027', event: 'Q4 Estimated Tax Due', icon: Calendar },
              { date: 'Apr 15, 2027', event: 'Tax Filing Deadline', icon: TrendingUp },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl">
                  <Icon className="w-5 h-5 text-[#154230]" />
                  <div className="flex-1">
                    <p className="text-[#101111] font-medium">{item.event}</p>
                    <p className="text-xs text-[#4A4A4A]">{item.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav activeItem="billing" />
    </div>
  );
}
