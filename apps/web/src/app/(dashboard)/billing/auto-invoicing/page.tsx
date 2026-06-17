'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Zap, Clock, Check, Settings } from 'lucide-react';

export default function AutoInvoicingPage() {
  const [autoInvoicing, setAutoInvoicing] = useState({
    enabled: false,
    sendReminders: true,
    autoCharge: false,
    graceDays: 7,
  });

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Auto-Invoicing" subtitle="Automate your billing workflow" backHref="/billing" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${autoInvoicing.enabled ? 'bg-green-100' : 'bg-gray-100'}`}>
              <Zap className={`w-6 h-6 ${autoInvoicing.enabled ? 'text-green-600' : 'text-gray-400'}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-[#101111] font-bold">Auto-Invoicing</h3>
              <p className="text-sm text-[#4A4A4A]">Automatically send invoices on schedule</p>
            </div>
            <button
              onClick={() => setAutoInvoicing({ ...autoInvoicing, enabled: !autoInvoicing.enabled })}
              className={`w-14 h-8 rounded-full transition-colors relative ${
                autoInvoicing.enabled ? 'bg-[#154230]' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                autoInvoicing.enabled ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#4A4A4A]" />
                <div>
                  <p className="text-[#101111] font-medium">Payment Reminders</p>
                  <p className="text-xs text-[#4A4A4A]">Send reminders before due date</p>
                </div>
              </div>
              <button
                onClick={() => setAutoInvoicing({ ...autoInvoicing, sendReminders: !autoInvoicing.sendReminders })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  autoInvoicing.sendReminders ? 'bg-[#154230]' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  autoInvoicing.sendReminders ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#4A4A4A]" />
                <div>
                  <p className="text-[#101111] font-medium">Auto-Charge</p>
                  <p className="text-xs text-[#4A4A4A]">Charge saved payment methods</p>
                </div>
              </div>
              <button
                onClick={() => setAutoInvoicing({ ...autoInvoicing, autoCharge: !autoInvoicing.autoCharge })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  autoInvoicing.autoCharge ? 'bg-[#154230]' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  autoInvoicing.autoCharge ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            <div className="pt-3 border-t border-black/5">
              <label className="text-[#4A4A4A] text-sm">Grace Period (days)</label>
              <select
                value={autoInvoicing.graceDays}
                onChange={(e) => setAutoInvoicing({ ...autoInvoicing, graceDays: parseInt(e.target.value) })}
                className="w-full mt-1 px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              >
                <option value={3}>3 days</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Reminder Schedule</h3>
          <div className="space-y-2">
            {[
              { day: 7, label: '7 days before', enabled: true },
              { day: 1, label: '1 day before', enabled: true },
              { day: 0, label: 'On due date', enabled: true },
              { day: -3, label: '3 days overdue', enabled: false },
            ].map((reminder) => (
              <div key={reminder.day} className="flex items-center justify-between p-3 bg-[#E6E2DA] rounded-xl">
                <span className="text-[#101111]">{reminder.label}</span>
                <Check className={`w-5 h-5 ${reminder.enabled ? 'text-green-600' : 'text-gray-300'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="billing" />
    </div>
  );
}
