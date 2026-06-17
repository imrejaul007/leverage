'use client';

import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { Phone, Mail, Calendar, MessageSquare } from 'lucide-react';

export default function ComplianceSupportPage() {
  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="Compliance Support" subtitle="Get expert help" backHref="/compliance" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-semibold mb-4">Contact Our Compliance Team</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-[#E6E2DA] rounded-xl flex items-center gap-3">
              <Phone className="w-6 h-6 text-[#154230]" />
              <div className="text-left flex-1">
                <p className="font-medium text-[#101111]">Call Us</p>
                <p className="text-sm text-[#4A4A4A]">+1 (888) 555-0123</p>
              </div>
            </button>
            <button className="w-full p-4 bg-[#E6E2DA] rounded-xl flex items-center gap-3">
              <Mail className="w-6 h-6 text-[#154230]" />
              <div className="text-left flex-1">
                <p className="font-medium text-[#101111]">Email</p>
                <p className="text-sm text-[#4A4A4A]">compliance@leverge.one</p>
              </div>
            </button>
            <button className="w-full p-4 bg-[#E6E2DA] rounded-xl flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#154230]" />
              <div className="text-left flex-1">
                <p className="font-medium text-[#101111]">Schedule Consultation</p>
                <p className="text-sm text-[#4A4A4A]">Book an expert call</p>
              </div>
            </button>
            <button className="w-full p-4 bg-[#E6E2DA] rounded-xl flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-[#154230]" />
              <div className="text-left flex-1">
                <p className="font-medium text-[#101111]">Live Chat</p>
                <p className="text-sm text-[#4A4A4A]">Chat with a specialist</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
