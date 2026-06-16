'use client';

import { useState, useRef } from 'react';
import { FileText, Download, Loader2, Check, ArrowRight, Plus, Trash2, Building2, Plane, Ship, Truck, File, Printer, Package, Globe } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

interface LineItem {
  id: string;
  description: string;
  hsCode: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface DocumentFormData {
  documentType: 'commercial_invoice' | 'packing_list' | 'bill_of_lading' | 'certificate_of_origin' | 'proforma_invoice';
  // Seller Info
  sellerName: string;
  sellerAddress: string;
  sellerCity: string;
  sellerCountry: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerTaxId: string;
  // Buyer Info
  buyerName: string;
  buyerAddress: string;
  buyerCity: string;
  buyerCountry: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerTaxId: string;
  // Shipment Info
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  originCountry: string;
  destinationCountry: string;
  portOfLoading: string;
  portOfDischarge: string;
  shippingMethod: 'air' | 'sea' | 'truck';
  vesselName: string;
  voyageNumber: string;
  // Financial
  currency: string;
  paymentTerms: string;
  totalAmount: number;
  // Line Items
  lineItems: LineItem[];
}

const documentTypes = [
  { id: 'commercial_invoice', name: 'Commercial Invoice', desc: 'Required for customs clearance', icon: FileText },
  { id: 'packing_list', name: 'Packing List', desc: 'Contents of each package', icon: Package },
  { id: 'bill_of_lading', name: 'Bill of Lading', desc: 'Proof of shipment contract', icon: Truck },
  { id: 'certificate_of_origin', name: 'Certificate of Origin', desc: 'Proves country of origin', icon: Globe },
  { id: 'proforma_invoice', name: 'Proforma Invoice', desc: 'Quote before shipment', icon: File },
];

const countries = [
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
];

const ports = [
  'Shanghai', 'Shenzhen', 'Ningbo', 'Guangzhou', 'Busan', 'Hong Kong',
  'Los Angeles', 'Long Beach', 'New York', 'Savannah', 'Rotterdam',
  'Hamburg', 'Antwerp', 'Felixstowe', 'Dubai', 'Singapore', 'Tanjung Pelepas',
];

const shippingMethods = [
  { id: 'sea', name: 'Sea Freight', icon: Ship, desc: 'Most cost-effective for large shipments' },
  { id: 'air', name: 'Air Freight', icon: Plane, desc: 'Fast delivery, higher cost' },
  { id: 'truck', name: 'Truck/Rail', icon: Truck, desc: 'Land transport for regional trade' },
];

const currencies = ['USD', 'EUR', 'GBP', 'CNY', 'AED', 'INR', 'JPY', 'SGD'];
const paymentTerms = ['T/T 30 Days', 'T/T 60 Days', 'T/T at Sight', 'L/C 30 Days', 'L/C 60 Days', 'D/P', 'D/A'];
const units = ['PCS', 'KG', 'MT', 'SETS', 'BOXES', 'PALLET', '20FT', '40FT'];

export default function DocumentGeneratorPage() {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<{ type: string; preview: string } | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<DocumentFormData>({
    documentType: 'commercial_invoice',
    sellerName: '',
    sellerAddress: '',
    sellerCity: '',
    sellerCountry: 'CN',
    sellerPhone: '',
    sellerEmail: '',
    sellerTaxId: '',
    buyerName: '',
    buyerAddress: '',
    buyerCity: '',
    buyerCountry: 'US',
    buyerPhone: '',
    buyerEmail: '',
    buyerTaxId: '',
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    originCountry: 'CN',
    destinationCountry: 'US',
    portOfLoading: 'Shanghai',
    portOfDischarge: 'Los Angeles',
    shippingMethod: 'sea',
    vesselName: '',
    voyageNumber: '',
    currency: 'USD',
    paymentTerms: 'T/T 30 Days',
    totalAmount: 0,
    lineItems: [
      { id: '1', description: '', hsCode: '', quantity: 1, unit: 'PCS', unitPrice: 0, total: 0 }
    ],
  });

  const updateField = (field: keyof DocumentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          updated.total = updated.quantity * updated.unitPrice;
          return updated;
        }
        return item;
      }),
      totalAmount: prev.lineItems.reduce((sum, item) => {
        if (item.id === id) {
          return sum + (value * item.unitPrice);
        }
        return sum + item.total;
      }, 0),
    }));
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { id: Date.now().toString(), description: '', hsCode: '', quantity: 1, unit: 'PCS', unitPrice: 0, total: 0 }],
    }));
  };

  const removeLineItem = (id: string) => {
    if (formData.lineItems.length > 1) {
      setFormData(prev => ({
        ...prev,
        lineItems: prev.lineItems.filter(item => item.id !== id),
        totalAmount: prev.lineItems.filter(item => item.id !== id).reduce((sum, item) => sum + item.total, 0),
      }));
    }
  };

  const calculateTotals = () => {
    const subtotal = formData.lineItems.reduce((sum, item) => sum + item.total, 0);
    const freight = subtotal * 0.05; // 5% estimated freight
    const insurance = subtotal * 0.01; // 1% insurance
    const total = subtotal + freight + insurance;
    return { subtotal, freight, insurance, total };
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedDoc({ type: formData.documentType, preview: 'generated' });
    setIsGenerating(false);
  };

  const handleDownload = () => {
    // In production, this would trigger actual PDF download
    alert('PDF download would be triggered here. In production, this generates a real PDF document.');
  };

  const handlePrint = () => {
    window.print();
  };

  const { subtotal, freight, insurance, total } = calculateTotals();
  const selectedDocType = documentTypes.find(d => d.id === formData.documentType);

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      <PageHeader
        title="Generate Documents"
        subtitle="Create trade documents instantly"
        backHref="/documents"
      />

      <div className="px-4 -mt-6 space-y-5">
        {/* Document Type Selection */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

          <div className="relative z-10">
            <h2 className="text-[#101111] font-bold mb-4">Select Document Type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {documentTypes.map(doc => {
                const Icon = doc.icon;
                const isSelected = formData.documentType === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => updateField('documentType', doc.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      isSelected
                        ? 'border-[#154230] bg-[#154230]/5'
                        : 'border-black/5 hover:border-[#154230]/30'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-[#154230]' : 'text-[#4A4A4A]'}`} />
                    <p className={`text-xs font-semibold ${isSelected ? 'text-[#154230]' : 'text-[#101111]'}`}>{doc.name}</p>
                    <p className="text-[10px] text-[#4A4A4A] mt-1">{doc.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-2 mb-6 relative z-10">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  step === s
                    ? 'bg-[#154230] text-white'
                    : step > s
                    ? 'bg-[#154230]/20 text-[#154230]'
                    : 'bg-[#E6E2DA] text-[#4A4A4A]'
                }`}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
                <span className="hidden sm:inline">
                  {s === 1 ? 'Parties' : s === 2 ? 'Shipment' : 'Items'}
                </span>
              </button>
            ))}
          </div>

          <div className="relative z-10">
            {/* Step 1: Buyer & Seller Info */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Seller */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-[#154230]" />
                    <h3 className="text-[#101111] font-bold">Seller / Exporter</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Company Name *</label>
                      <input
                        type="text"
                        value={formData.sellerName}
                        onChange={(e) => updateField('sellerName', e.target.value)}
                        placeholder="ABC Trading Co., Ltd."
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Address *</label>
                      <input
                        type="text"
                        value={formData.sellerAddress}
                        onChange={(e) => updateField('sellerAddress', e.target.value)}
                        placeholder="123 Trade Street, Pudong District"
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">City</label>
                      <input
                        type="text"
                        value={formData.sellerCity}
                        onChange={(e) => updateField('sellerCity', e.target.value)}
                        placeholder="Shanghai"
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Country</label>
                      <select
                        value={formData.sellerCountry}
                        onChange={(e) => updateField('sellerCountry', e.target.value)}
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      >
                        {countries.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Tax ID</label>
                      <input
                        type="text"
                        value={formData.sellerTaxId}
                        onChange={(e) => updateField('sellerTaxId', e.target.value)}
                        placeholder="91XXXXXXXXXXX"
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.sellerEmail}
                        onChange={(e) => updateField('sellerEmail', e.target.value)}
                        placeholder="trade@abc.cn"
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                  </div>
                </div>

                {/* Buyer */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-[#A6824A]" />
                    <h3 className="text-[#101111] font-bold">Buyer / Importer</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Company Name *</label>
                      <input
                        type="text"
                        value={formData.buyerName}
                        onChange={(e) => updateField('buyerName', e.target.value)}
                        placeholder="XYZ Imports Inc."
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Address *</label>
                      <input
                        type="text"
                        value={formData.buyerAddress}
                        onChange={(e) => updateField('buyerAddress', e.target.value)}
                        placeholder="456 Commerce Ave, Suite 200"
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">City</label>
                      <input
                        type="text"
                        value={formData.buyerCity}
                        onChange={(e) => updateField('buyerCity', e.target.value)}
                        placeholder="Los Angeles"
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Country</label>
                      <select
                        value={formData.buyerCountry}
                        onChange={(e) => updateField('buyerCountry', e.target.value)}
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      >
                        {countries.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Tax ID / EIN</label>
                      <input
                        type="text"
                        value={formData.buyerTaxId}
                        onChange={(e) => updateField('buyerTaxId', e.target.value)}
                        placeholder="XX-XXXXXXX"
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.buyerEmail}
                        onChange={(e) => updateField('buyerEmail', e.target.value)}
                        placeholder="orders@xyzimports.com"
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-[#154230] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step 2: Shipment Details */}
            {step === 2 && (
              <div className="space-y-4">
                {/* Invoice Info */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Invoice No.</label>
                    <input
                      type="text"
                      value={formData.invoiceNumber}
                      onChange={(e) => updateField('invoiceNumber', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Invoice Date</label>
                    <input
                      type="date"
                      value={formData.invoiceDate}
                      onChange={(e) => updateField('invoiceDate', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Due Date</label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => updateField('dueDate', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    />
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <label className="block text-[#4A4A4A] text-xs font-medium mb-2">Shipping Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    {shippingMethods.map(method => {
                      const Icon = method.icon;
                      const isSelected = formData.shippingMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          onClick={() => updateField('shippingMethod', method.id)}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${
                            isSelected
                              ? 'border-[#154230] bg-[#154230]/5'
                              : 'border-black/5'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-1 ${isSelected ? 'text-[#154230]' : 'text-[#4A4A4A]'}`} />
                          <p className={`text-xs font-semibold ${isSelected ? 'text-[#154230]' : 'text-[#101111]'}`}>{method.name}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Route */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Country of Origin</label>
                    <select
                      value={formData.originCountry}
                      onChange={(e) => updateField('originCountry', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    >
                      {countries.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Destination Country</label>
                    <select
                      value={formData.destinationCountry}
                      onChange={(e) => updateField('destinationCountry', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    >
                      {countries.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Port of Loading</label>
                    <select
                      value={formData.portOfLoading}
                      onChange={(e) => updateField('portOfLoading', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    >
                      {ports.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Port of Discharge</label>
                    <select
                      value={formData.portOfDischarge}
                      onChange={(e) => updateField('portOfDischarge', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    >
                      {ports.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                {/* Financial */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Currency</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => updateField('currency', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    >
                      {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-xs font-medium mb-1">Payment Terms</label>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) => updateField('paymentTerms', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    >
                      {paymentTerms.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 bg-[#E6E2DA] text-[#101111] rounded-xl font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 bg-[#154230] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Line Items */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[#101111] font-bold">Product Details</h3>
                  <button
                    onClick={addLineItem}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#154230]/10 text-[#154230] rounded-lg text-xs font-medium"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                </div>

                {/* Line Items */}
                <div className="space-y-3">
                  {formData.lineItems.map((item, index) => (
                    <div key={item.id} className="bg-[#E6E2DA] rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#4A4A4A]">Item {index + 1}</span>
                        {formData.lineItems.length > 1 && (
                          <button
                            onClick={() => removeLineItem(item.id)}
                            className="text-[#5D1E21] hover:bg-[#5D1E21]/10 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                        placeholder="Product description"
                        className="w-full px-3 py-2 bg-white rounded-lg border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] text-sm"
                      />
                      <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-1">
                          <label className="block text-[10px] text-[#4A4A4A] mb-1">HS Code</label>
                          <input
                            type="text"
                            value={item.hsCode}
                            onChange={(e) => updateLineItem(item.id, 'hsCode', e.target.value)}
                            placeholder="8542.31"
                            className="w-full px-2 py-2 bg-white rounded-lg border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] text-sm"
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-[10px] text-[#4A4A4A] mb-1">Qty</label>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-2 bg-white rounded-lg border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] text-sm"
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-[10px] text-[#4A4A4A] mb-1">Unit</label>
                          <select
                            value={item.unit}
                            onChange={(e) => updateLineItem(item.id, 'unit', e.target.value)}
                            className="w-full px-2 py-2 bg-white rounded-lg border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] text-sm"
                          >
                            {units.map(u => <option key={u} value={u}>{u}</option>)}
                          </select>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-[10px] text-[#4A4A4A] mb-1">Price</label>
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="w-full px-2 py-2 bg-white rounded-lg border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="bg-[#154230]/5 rounded-xl p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#4A4A4A]">Subtotal</span>
                      <span className="text-[#101111] font-medium">{formData.currency} {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A4A4A]">Est. Freight (5%)</span>
                      <span className="text-[#101111] font-medium">{formData.currency} {freight.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4A4A4A]">Est. Insurance (1%)</span>
                      <span className="text-[#101111] font-medium">{formData.currency} {insurance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#154230]/20">
                      <span className="text-[#101111] font-bold">Total</span>
                      <span className="text-[#154230] font-bold text-lg">{formData.currency} {total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 bg-[#E6E2DA] text-[#101111] rounded-xl font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex-1 py-3 bg-[#154230] text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate {selectedDocType?.name} <FileText className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generated Document Preview */}
        {generatedDoc && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#101111] font-bold flex items-center gap-2">
                <Check className="w-5 h-5 text-[#16A34A]" />
                Document Generated!
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="p-2 bg-[#E6E2DA] rounded-lg hover:bg-[#154230]/10"
                >
                  <Printer className="w-5 h-5 text-[#4A4A4A]" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 bg-[#154230] rounded-lg text-white hover:bg-[#1a5a3a]"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Preview would go here - simplified for demo */}
            <div className="bg-[#E6E2DA] rounded-xl p-6 min-h-[300px]">
              <div className="text-center text-[#4A4A4A]">
                <FileText className="w-12 h-12 mx-auto mb-2 text-[#154230]/50" />
                <p className="font-medium">{selectedDocType?.name}</p>
                <p className="text-sm mt-1">Ready for download</p>
              </div>
            </div>
          </div>
        )}

        {/* Premium Badge */}
        <div className="bg-gradient-to-r from-[#154230] to-[#1a5a3a] rounded-2xl p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold">Premium Feature</p>
              <p className="text-sm text-white/70">Generate professional PDF documents with your company branding</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav activeItem="compliance" />
    </div>
  );
}
