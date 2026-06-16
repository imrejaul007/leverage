'use client';

import { useState } from 'react';
import {
  CreditCard,
  Check,
  Loader2,
  Zap,
  ArrowRight,
  Download,
  Plus,
  Trash2,
  Calendar,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    features: ['5 team members', '100 documents/month', 'Basic analytics', 'Email support'],
    current: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 149,
    features: ['25 team members', '500 documents/month', 'Advanced analytics', 'Priority support', 'API access'],
    current: true,
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    features: ['Unlimited members', 'Unlimited documents', 'Custom analytics', 'Dedicated support', 'Full API access', 'SSO & SAML'],
    current: false,
  },
];

const invoices = [
  { id: 'INV-2024-012', date: 'Jun 1, 2024', amount: '$149.00', status: 'Paid' },
  { id: 'INV-2024-011', date: 'May 1, 2024', amount: '$149.00', status: 'Paid' },
  { id: 'INV-2024-010', date: 'Apr 1, 2024', amount: '$149.00', status: 'Paid' },
];

const paymentMethods = [
  { id: '1', type: 'Visa', last4: '4242', exp: '12/25', default: true },
  { id: '2', type: 'Mastercard', last4: '8888', exp: '06/26', default: false },
];

export default function BillingSettingsPage() {
  const [loading, setLoading] = useState(false);

  const currentPlan = plans.find(p => p.current);

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Billing"
        subtitle="Plans and payments"
        backHref="/settings"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Current Plan */}
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="font-bold">Current Plan</span>
            </div>
            <span className="px-2 py-0.5 bg-white/20 rounded text-sm font-semibold">
              {currentPlan?.name}
            </span>
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-3xl font-bold">${currentPlan?.price}</span>
            <span className="text-white/70">/month</span>
          </div>
          <p className="text-white/70 text-sm mb-4">
            Next billing date: July 1, 2024
          </p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-white text-[#154230] rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Upgrade Plan
            </button>
            <button className="py-2 px-4 border border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Manage
            </button>
          </div>
        </div>

        {/* Usage */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">This Month Usage</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#4A4A4A]">Team Members</span>
                <span className="text-[#101111] font-medium">8 / 25</span>
              </div>
              <div className="h-2 bg-[#E6E2DA] rounded-full overflow-hidden">
                <div className="h-full bg-[#154230] rounded-full" style={{ width: '32%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#4A4A4A]">Documents</span>
                <span className="text-[#101111] font-medium">234 / 500</span>
              </div>
              <div className="h-2 bg-[#E6E2DA] rounded-full overflow-hidden">
                <div className="h-full bg-[#154230] rounded-full" style={{ width: '47%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#4A4A4A]">Storage</span>
                <span className="text-[#101111] font-medium">2.4 GB / 10 GB</span>
              </div>
              <div className="h-2 bg-[#E6E2DA] rounded-full overflow-hidden">
                <div className="h-full bg-[#A6824A] rounded-full" style={{ width: '24%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="space-y-3">
          <h3 className="text-[#4A4A4A] text-xs font-semibold uppercase tracking-wider">Available Plans</h3>
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden ${
                plan.current ? 'border-2 border-[#154230]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#A6824A] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
              <div className="relative z-10 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-[#101111] font-bold text-lg">{plan.name}</h4>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#101111]">${plan.price}</span>
                      <span className="text-[#4A4A4A] text-sm">/month</span>
                    </div>
                  </div>
                  {plan.current && (
                    <span className="px-3 py-1 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-full flex items-center gap-1">
                      <Check className="w-4 h-4" /> Current
                    </span>
                  )}
                </div>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <Check className="w-4 h-4 text-[#154230]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {!plan.current && (
                  <button className="w-full py-2 bg-[#154230] text-white rounded-xl font-semibold hover:bg-[#1d5240] transition-colors">
                    Switch to {plan.name}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#101111] font-bold">Payment Methods</h3>
            <button className="flex items-center gap-1 text-[#154230] text-sm font-medium">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {paymentMethods.map(method => (
              <div key={method.id} className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl">
                <CreditCard className="w-6 h-6 text-[#154230]" />
                <div className="flex-1">
                  <p className="text-[#101111] font-medium">{method.type} •••• {method.last4}</p>
                  <p className="text-[#4A4A4A] text-xs">Expires {method.exp}</p>
                </div>
                {method.default && (
                  <span className="px-2 py-0.5 bg-[#154230]/10 text-[#154230] text-xs font-semibold rounded">Default</span>
                )}
                <button className="p-2 hover:bg-white rounded-lg">
                  <Trash2 className="w-4 h-4 text-[#DC2626]" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Recent Invoices</h3>
          <div className="space-y-2">
            {invoices.map(invoice => (
              <div key={invoice.id} className="flex items-center gap-3 p-3 bg-[#E6E2DA] rounded-xl">
                <div className="flex-1">
                  <p className="text-[#101111] font-medium">{invoice.id}</p>
                  <p className="text-[#4A4A4A] text-xs">{invoice.date}</p>
                </div>
                <span className="text-[#101111] font-semibold">{invoice.amount}</span>
                <span className="px-2 py-0.5 bg-[#16A34A]/10 text-[#16A34A] text-xs font-semibold rounded">{invoice.status}</span>
                <button className="p-2 hover:bg-white rounded-lg">
                  <Download className="w-4 h-4 text-[#4A4A4A]" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav activeItem="settings" />
    </div>
  );
}
