'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { PenTool, Send, Check, Clock, Users } from 'lucide-react';

export default function SignPage() {
  const [signing, setSigning] = useState(false);

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="E-Signature" subtitle="Sign documents electronically" backHref="/documents" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <PenTool className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Legally Binding</p>
              <p className="text-sm text-white/70">ESIGN Act & eIDAS compliant signatures</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Request Signature</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[#4A4A4A] text-sm font-medium mb-1">Document</label>
              <select className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]">
                <option>Select a document</option>
                <option>Invoice INV-2026-045</option>
                <option>B/L BOL-2026-012</option>
              </select>
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-sm font-medium mb-1">Recipient Email</label>
              <input
                type="email"
                placeholder="signer@example.com"
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-sm font-medium mb-1">Message (Optional)</label>
              <textarea
                rows={3}
                placeholder="Add a message for the signer..."
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] resize-none"
              />
            </div>
            <button
              onClick={() => setSigning(true)}
              className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" /> Send for Signature
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Pending Signatures</h3>
          <div className="space-y-3">
            {[
              { doc: 'Invoice INV-2026-044', sent: '2 hours ago', status: 'pending' },
              { doc: 'Contract CT-2026-008', sent: '1 day ago', status: 'viewed' },
            ].map((item, index) => (
              <div key={index} className="bg-[#E6E2DA] rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-[#101111]">{item.doc}</p>
                    <p className="text-xs text-[#4A4A4A] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Sent {item.sent}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    item.status === 'viewed' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <button className="text-xs text-[#154230] font-medium">Resend Reminder</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
