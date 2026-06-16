'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Download, Check, X, Loader2, Plus, Trash2, AlertCircle, ArrowRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface RfqItem {
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  targetPrice: number;
  currency: string;
  origin: string;
  destination: string;
  description: string;
  status: 'pending' | 'valid' | 'invalid';
  errors?: string[];
}

const categories = ['Food & Agriculture', 'Textiles & Apparel', 'Electronics', 'Machinery', 'Chemicals', 'Metals & Minerals', 'Automotive', 'Pharmaceuticals'];
const csvTemplate = `product_name,category,quantity,unit,target_price,currency,origin,destination,description
Premium Basmati Rice,Food & Agriculture,500,MT,850,USD,India,United States,Long grain
Cotton Yarn 40s,Textiles & Apparel,10000,KG,3.5,USD,Vietnam,Germany,100% cotton
Industrial Steel Coils,Metals & Minerals,200,MT,750,USD,China,United States,Hot rolled
Solar Panels 550W,Electronics,1000,PCS,180,USD,China,Japan,Monocrystalline`;

const parseCSV = (content: string): RfqItem[] => {
  const lines = content.trim().split('\n');
  const items: RfqItem[] = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length >= 8) {
      const item: RfqItem = {
        productName: values[0] || '',
        category: values[1] || '',
        quantity: parseFloat(values[2]) || 0,
        unit: values[3] || 'PCS',
        targetPrice: parseFloat(values[4]) || 0,
        currency: values[5] || 'USD',
        origin: values[6] || '',
        destination: values[7] || '',
        description: values[8] || '',
        status: 'pending',
      };
      const errors: string[] = [];
      if (!item.productName) errors.push('Product name required');
      if (item.quantity <= 0) errors.push('Invalid quantity');
      if (item.targetPrice <= 0) errors.push('Invalid price');
      item.status = errors.length > 0 ? 'invalid' : 'valid';
      item.errors = errors;
      items.push(item);
    }
  }
  return items;
};

export default function BulkRfqPage() {
  const [step, setStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [items, setItems] = useState<RfqItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const content = await file.text();
    const parsed = parseCSV(content);
    setItems(parsed);
    setIsProcessing(false);
    setStep(2);
  };

  const handleDownloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rfq_bulk_template.csv';
    a.click();
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const validItems = items.filter(item => item.status === 'valid');
    if (validItems.length === 0) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    localStorage.setItem('bulk_rfq_items', JSON.stringify(validItems));
    setIsSubmitting(false);
    setStep(3);
  };

  const validCount = items.filter(i => i.status === 'valid').length;
  const invalidCount = items.filter(i => i.status === 'invalid').length;

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-4 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/rfqs" className="p-2 bg-white/10 rounded-lg text-white">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Link>
          <h1 className="text-white font-bold text-xl">Bulk RFQ Upload</h1>
        </div>
        <p className="text-white/70 text-sm">Upload multiple products at once</p>
      </div>

      <div className="px-4 -mt-6 space-y-5">
        {/* Progress */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          <div className="flex items-center justify-between relative z-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s ? 'bg-[#154230] text-white' : 'bg-[#E6E2DA] text-[#4A4A4A]'}`}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                <span className={`text-[10px] mt-1 ${step >= s ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}>
                  {s === 1 ? 'Upload' : s === 2 ? 'Review' : 'Done'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <>
            <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#154230]/10 rounded-xl flex items-center justify-center">
                    <Download className="w-6 h-6 text-[#154230]" />
                  </div>
                  <div>
                    <h2 className="text-[#101111] font-bold">CSV Template</h2>
                    <p className="text-[#4A4A4A] text-xs">Download our template to format your data correctly</p>
                  </div>
                </div>
                <button onClick={handleDownloadTemplate} className="w-full py-3 bg-[#E6E2DA] text-[#101111] rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#154230]/10">
                  <Download className="w-5 h-5" /> Download Template
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#A6824A]/10 rounded-xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-[#A6824A]" />
                  </div>
                  <div>
                    <h2 className="text-[#101111] font-bold">Upload Your CSV</h2>
                    <p className="text-[#4A4A4A] text-xs">Drag & drop or click to select file</p>
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} disabled={isProcessing} className="w-full py-8 border-2 border-dashed border-[#154230]/30 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-[#154230]/50 transition-colors">
                  {isProcessing ? (
                    <><Loader2 className="w-8 h-8 text-[#154230] animate-spin" /><span className="text-[#4A4A4A] text-sm">Processing file...</span></>
                  ) : (
                    <><Upload className="w-8 h-8 text-[#154230]" /><span className="text-[#101111] font-medium">Select CSV File</span></>
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#101111] font-bold">Review Items</h2>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[#16A34A]/10 text-[#16A34A] text-xs font-semibold rounded">{validCount} valid</span>
                    {invalidCount > 0 && <span className="px-2 py-1 bg-[#DC2626]/10 text-[#DC2626] text-xs font-semibold rounded">{invalidCount} errors</span>}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#E6E2DA] rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-[#154230]">{items.length}</p>
                    <p className="text-[10px] text-[#4A4A4A]">Total Items</p>
                  </div>
                  <div className="bg-[#E6E2DA] rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-[#16A34A]">{validCount}</p>
                    <p className="text-[10px] text-[#4A4A4A]">Ready</p>
                  </div>
                  <div className="bg-[#E6E2DA] rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-[#A6824A]">${items.reduce((sum, i) => sum + (i.targetPrice * i.quantity), 0).toLocaleString()}</p>
                    <p className="text-[10px] text-[#4A4A4A]">Est. Value</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-black/5"><h3 className="text-[#101111] font-bold">Products ({items.length})</h3></div>
              <div className="divide-y divide-black/5 max-h-[400px] overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {item.status === 'valid' ? <Check className="w-4 h-4 text-[#16A34A]" /> : <AlertCircle className="w-4 h-4 text-[#DC2626]" />}
                          <p className="text-[#101111] font-semibold">{item.productName || 'Untitled'}</p>
                        </div>
                        <p className="text-[#4A4A4A] text-xs mt-1">{item.quantity} {item.unit} @ {item.currency} {item.targetPrice}</p>
                        <p className="text-[#4A4A4A] text-xs">{item.origin} to {item.destination}</p>
                        {item.errors && item.errors.length > 0 && <div className="mt-2">{item.errors.map((err, i) => <p key={i} className="text-[#DC2626] text-xs">* {err}</p>)}</div>}
                      </div>
                      <button onClick={() => handleRemoveItem(index)} className="p-2 text-[#DC2626] hover:bg-[#DC2626]/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 bg-[#E6E2DA] text-[#101111] rounded-xl font-semibold">Back</button>
              <button onClick={handleSubmit} disabled={validCount === 0 || isSubmitting} className="flex-1 py-3 bg-[#154230] text-white rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</> : <><>Submit {validCount} RFQs</><ArrowRight className="w-5 h-5" /></>}
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <div className="w-20 h-20 bg-[#16A34A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-[#16A34A]" />
            </div>
            <h2 className="text-[#101111] font-bold text-xl mb-2">RFQs Created!</h2>
            <p className="text-[#4A4A4A] text-sm mb-6">Your {validCount} requests for quotes have been submitted.</p>
            <Link href="/rfqs" className="inline-flex items-center gap-2 px-6 py-3 bg-[#154230] text-white rounded-xl font-semibold">
              <ShoppingCart className="w-5 h-5" /> View My RFQs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
