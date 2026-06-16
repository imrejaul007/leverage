'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  Trash2,
  Check,
  Loader2,
  Shield,
  ExternalLink,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

export default function DeleteAccountSettingsPage() {
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') return;
    setDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setDeleting(false);
    setDeleted(true);
  };

  if (deleted) {
    return (
      <div className="min-h-screen bg-[#E6E2DA] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-[#16A34A]" />
          </div>
          <h2 className="text-xl font-bold text-[#101111] mb-2">Account Deleted</h2>
          <p className="text-[#4A4A4A] mb-6">
            Your account has been scheduled for deletion. You will receive a confirmation email shortly.
          </p>
          <p className="text-[#4A4A4A] text-sm">
            Thank you for using LEVERAGE. We hope to see you again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Delete Account"
        subtitle="Permanently remove your account"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Warning */}
        <div className="bg-[#DC2626]/5 rounded-2xl p-4 border border-[#DC2626]/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-[#DC2626] flex-shrink-0" />
            <div>
              <p className="text-[#DC2626] font-bold">Warning: This action cannot be undone</p>
              <p className="text-[#4A4A4A] text-sm mt-2">
                Deleting your account will permanently remove all your data, including:
              </p>
              <ul className="text-[#4A4A4A] text-sm mt-2 space-y-1 list-disc list-inside">
                <li>All orders and transaction history</li>
                <li>Shipment records and tracking data</li>
                <li>Trade documents and certificates</li>
                <li>Company profile and team members</li>
                <li>Payment methods and billing history</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What happens */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">What happens when you delete?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#DC2626]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#DC2626] text-sm font-bold">1</span>
              </div>
              <p className="text-[#4A4A4A] text-sm">Your account will be deactivated immediately</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#DC2626]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#DC2626] text-sm font-bold">2</span>
              </div>
              <p className="text-[#4A4A4A] text-sm">All data will be scheduled for permanent deletion after 30 days</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#DC2626]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#DC2626] text-sm font-bold">3</span>
              </div>
              <p className="text-[#4A4A4A] text-sm">Active subscriptions will be cancelled</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#DC2626]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#DC2626] text-sm font-bold">4</span>
              </div>
              <p className="text-[#4A4A4A] text-sm">You won't be able to recover your account</p>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Legal Notice</h3>
          <p className="text-[#4A4A4A] text-sm">
            Deleting your account is subject to our{' '}
            <a href="/terms" className="text-[#154230] underline">Terms of Service</a>{' '}
            and{' '}
            <a href="/privacy" className="text-[#154230] underline">Privacy Policy</a>.
            LEVERAGE may retain certain data as required by law.
          </p>
        </div>

        {/* Contact Support */}
        <div className="bg-[#154230]/5 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#154230]" />
            <div className="flex-1">
              <p className="text-[#101111] font-medium text-sm">Need help?</p>
              <p className="text-[#4A4A4A] text-xs">
                If you're having issues with your account, our support team can help.
              </p>
            </div>
            <a href="/contact" className="px-4 py-2 bg-[#154230] text-white rounded-lg text-sm font-semibold">
              Contact Support
            </a>
          </div>
        </div>

        {/* Confirmation */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Confirm Deletion</h3>
          <p className="text-[#4A4A4A] text-sm mb-4">
            To confirm, type <strong>DELETE</strong> below:
          </p>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#DC2626] focus:outline-none text-[#101111] mb-4"
          />
          <button
            onClick={handleDelete}
            disabled={confirmText !== 'DELETE' || deleting}
            className="w-full py-3 bg-[#DC2626] text-white rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting Account...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete My Account
              </>
            )}
          </button>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
