'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import { FileText, Plus, Trash2, Save, Send } from 'lucide-react';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const clients = [
  { id: '1', name: 'ABC Imports', email: 'billing@abcimports.com' },
  { id: '2', name: 'XYZ Corporation', email: 'accounts@xyzcorp.com' },
  { id: '3', name: 'Global Trade Co', email: 'ap@globaltrade.com' },
];

export default function NewInvoicePage() {
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [clientId, setClientId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0, total: 0 }
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter(item => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          updated.total = updated.quantity * updated.unitPrice;
        }
        return updated;
      }
      return item;
    }));
  };

  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader title="New Invoice" subtitle="Create a new invoice" backHref="/billing/invoices" />

      <div className="px-4 -mt-6 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Invoice Number</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Client</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              >
                <option value="">Select client</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#101111] font-bold">Line Items</h3>
            <button
              onClick={addLineItem}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#154230]/10 text-[#154230] rounded-lg text-xs font-medium"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          <div className="space-y-3">
            {lineItems.map((item, index) => (
              <div key={item.id} className="bg-[#E6E2DA] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#4A4A4A]">Item {index + 1}</span>
                  <button
                    onClick={() => removeLineItem(item.id)}
                    className="text-[#5D1E21] hover:bg-[#5D1E21]/10 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                  className="w-full px-4 py-2 bg-white rounded-lg border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] text-sm"
                />
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[#4A4A4A] text-xs mb-1">Qty</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-xs mb-1">Unit Price</label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-xs mb-1">Total</label>
                    <div className="px-3 py-2 bg-white rounded-lg border border-black/5 text-[#101111] text-sm font-medium">
                      ${item.total.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-[#101111] font-bold mb-4">Notes</h3>
          <textarea
            placeholder="Payment terms, bank details, or additional notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] text-sm resize-none"
          />
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#4A4A4A]">Subtotal</span>
              <span className="text-[#101111]">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4A4A4A]">Tax (10%)</span>
              <span className="text-[#101111]">${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-black/10">
              <span className="text-[#101111]">Total</span>
              <span className="text-[#154230]">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-[#E6E2DA] text-[#101111] rounded-xl font-semibold flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> Save Draft
          </button>
          <button className="flex-1 py-3 bg-[#154230] text-white rounded-xl font-semibold flex items-center justify-center gap-2">
            <Send className="w-5 h-5" /> Send Invoice
          </button>
        </div>
      </div>

      <BottomNav activeItem="billing" />
    </div>
  );
}
