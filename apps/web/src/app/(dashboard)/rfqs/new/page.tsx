'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, FileText, Truck, Shield, DollarSign } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const steps = [
  { id: 1, name: 'Product Category', description: 'Select product category and type', icon: FileText },
  { id: 2, name: 'Requirements', description: 'Define quantity and specifications', icon: DollarSign },
  { id: 3, name: 'Destination', description: 'Origin, destination, and timeline', icon: Truck },
  { id: 4, name: 'Review', description: 'Review and submit your RFQ', icon: Shield },
];

const categories = [
  { id: 'food', name: 'Food & Agriculture', icon: '🌾', popular: true },
  { id: 'textiles', name: 'Textiles & Apparel', icon: '👕' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'machinery', name: 'Machinery', icon: '⚙️' },
  { id: 'chemicals', name: 'Chemicals', icon: '🧪' },
  { id: 'metals', name: 'Metals & Minerals', icon: '⛓️' },
  { id: 'automotive', name: 'Automotive', icon: '🚗' },
  { id: 'pharma', name: 'Pharmaceuticals', icon: '💊' },
];

const countries = [
  'United States', 'China', 'India', 'Germany', 'Japan', 'South Korea',
  'United Kingdom', 'France', 'Italy', 'Brazil', 'Canada', 'Australia',
  'UAE', 'Saudi Arabia', 'Singapore', 'Hong Kong', 'Vietnam', 'Thailand',
  'Indonesia', 'Malaysia', 'Turkey', 'Egypt', 'South Africa', 'Nigeria',
];

export default function NewRfqPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: '',
    productName: '',
    description: '',
    quantity: '',
    unit: 'MT',
    targetPrice: '',
    currency: 'USD',
    originCountry: '',
    destinationCountry: '',
    incoterms: 'CIF',
    deliveryDate: '',
    paymentTerms: '30% Advance',
    notes: '',
  });

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return !!formData.category;
      case 2: return formData.productName && formData.quantity && formData.targetPrice;
      case 3: return formData.originCountry && formData.destinationCountry;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24">
      {/* Mobile Header */}
      <div className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] rounded-b-[32px] px-4 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/rfqs" className="p-2 bg-white/10 rounded-lg text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-white font-bold text-xl">Create New RFQ</h1>
        </div>
        <p className="text-white/70 text-sm">Get quotes from verified suppliers worldwide</p>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 space-y-5">
        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          {/* Top accent border */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          {/* Trade elements background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute -top-4 -right-4 w-20 h-20 border border-[#154230] rounded-full" />
          </div>

          <div className="flex items-center justify-between relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep > step.id
                        ? 'bg-[#154230] text-white'
                        : currentStep === step.id
                        ? 'bg-[#A6824A] text-white'
                        : 'bg-[#E6E2DA] text-[#4A4A4A]'
                    }`}>
                      {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-[10px] mt-1 font-medium ${
                      currentStep >= step.id ? 'text-[#101111]' : 'text-[#4A4A4A]/50'
                    }`}>{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 ${
                      currentStep > step.id ? 'bg-[#154230]' : 'bg-[#E6E2DA]'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm relative overflow-hidden">
          {/* Top accent border */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#5D1E21]" />
          {/* Trade elements background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#154230] rounded-full" />
            <div className="absolute bottom-2 -left-6 w-16 h-16 border border-[#A6824A] rounded-full" />
          </div>

          <div className="relative z-10">
            {/* Step 1: Product Category */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-[#101111] font-bold text-lg">Select Product Category</h2>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => updateForm('category', cat.id)}
                      className={`p-3 rounded-xl border transition-all text-left ${
                        formData.category === cat.id
                          ? 'border-[#154230] bg-[#154230]/10'
                          : 'border-black/5 hover:border-[#154230]/30'
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{cat.icon}</span>
                      <p className={`text-xs font-medium ${formData.category === cat.id ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}>
                        {cat.name}
                      </p>
                      {cat.popular && (
                        <span className="text-[10px] text-[#A6824A] bg-[#A6824A]/10 px-2 py-0.5 rounded mt-1 inline-block">Popular</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Requirements */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-[#101111] font-bold text-lg">Define Requirements</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#4A4A4A] text-sm mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => updateForm('productName', e.target.value)}
                      placeholder="e.g., Premium Basmati Rice"
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4A4A] text-sm mb-2">Quantity *</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => updateForm('quantity', e.target.value)}
                          placeholder="500"
                          className="flex-1 px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                        />
                        <select
                          value={formData.unit}
                          onChange={(e) => updateForm('unit', e.target.value)}
                          className="px-3 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                        >
                          <option value="MT">MT</option>
                          <option value="KG">KG</option>
                          <option value="TONS">TONS</option>
                          <option value="PCS">PCS</option>
                          <option value="SETS">SETS</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#4A4A4A] text-sm mb-2">Target Price *</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={formData.targetPrice}
                          onChange={(e) => updateForm('targetPrice', e.target.value)}
                          placeholder="850"
                          className="flex-1 px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50"
                        />
                        <select
                          value={formData.currency}
                          onChange={(e) => updateForm('currency', e.target.value)}
                          className="px-3 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="AED">AED</option>
                          <option value="INR">INR</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-sm mb-2">Detailed Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateForm('description', e.target.value)}
                      placeholder="Include specifications, grade requirements, certifications needed..."
                      rows={3}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Destination */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-[#101111] font-bold text-lg">Origin & Destination</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#4A4A4A] text-sm mb-2">Origin Country *</label>
                    <select
                      value={formData.originCountry}
                      onChange={(e) => updateForm('originCountry', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    >
                      <option value="">Select origin country</option>
                      {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-sm mb-2">Destination Country *</label>
                    <select
                      value={formData.destinationCountry}
                      onChange={(e) => updateForm('destinationCountry', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    >
                      <option value="">Select destination country</option>
                      {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#4A4A4A] text-sm mb-2">Incoterms</label>
                      <select
                        value={formData.incoterms}
                        onChange={(e) => updateForm('incoterms', e.target.value)}
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      >
                        <option value="EXW">EXW</option>
                        <option value="FOB">FOB</option>
                        <option value="CIF">CIF</option>
                        <option value="DDP">DDP</option>
                        <option value="DAP">DAP</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#4A4A4A] text-sm mb-2">Delivery Date</label>
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => updateForm('deliveryDate', e.target.value)}
                        className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#4A4A4A] text-sm mb-2">Payment Terms</label>
                    <select
                      value={formData.paymentTerms}
                      onChange={(e) => updateForm('paymentTerms', e.target.value)}
                      className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111]"
                    >
                      <option value="30% Advance">30% Advance</option>
                      <option value="50% Advance">50% Advance</option>
                      <option value="LC at Sight">LC at Sight</option>
                      <option value="TT 30 Days">TT 30 Days</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-[#101111] font-bold text-lg">Review Your RFQ</h2>
                <div className="bg-[#E6E2DA] rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[#4A4A4A] text-xs">Category</p>
                      <p className="text-[#101111] font-medium text-sm">{categories.find(c => c.id === formData.category)?.name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[#4A4A4A] text-xs">Product</p>
                      <p className="text-[#101111] font-medium text-sm">{formData.productName || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[#4A4A4A] text-xs">Quantity</p>
                      <p className="text-[#101111] font-medium text-sm">{formData.quantity} {formData.unit}</p>
                    </div>
                    <div>
                      <p className="text-[#4A4A4A] text-xs">Target Price</p>
                      <p className="text-[#101111] font-medium text-sm">{formData.currency} {formData.targetPrice}</p>
                    </div>
                    <div>
                      <p className="text-[#4A4A4A] text-xs">Origin</p>
                      <p className="text-[#101111] font-medium text-sm">{formData.originCountry || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[#4A4A4A] text-xs">Destination</p>
                      <p className="text-[#101111] font-medium text-sm">{formData.destinationCountry || '-'}</p>
                    </div>
                  </div>
                  {formData.description && (
                    <div className="pt-3 border-t border-black/5">
                      <p className="text-[#4A4A4A] text-xs mb-1">Description</p>
                      <p className="text-[#101111] text-sm">{formData.description}</p>
                    </div>
                  )}
                </div>
                <div className="bg-[#154230]/10 rounded-xl p-4">
                  <p className="text-[#4A4A4A] text-sm">
                    <span className="text-[#154230] font-semibold">💡 AI Suggestion:</span> Your RFQ will be visible to {countries.length}+ verified suppliers matching your criteria.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/5">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`px-5 py-3 rounded-xl font-medium transition-colors ${
                  currentStep === 1
                    ? 'opacity-50 cursor-not-allowed bg-[#E6E2DA] text-[#4A4A4A]'
                    : 'bg-[#E6E2DA] text-[#101111] hover:bg-[#154230]/10'
                }`}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  disabled={!canProceed()}
                  className={`px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                    canProceed()
                      ? 'bg-[#154230] text-white hover:bg-[#1a5a3a]'
                      : 'opacity-50 cursor-not-allowed bg-[#154230]/50 text-white/50'
                  }`}
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="px-6 py-3 bg-[#154230] text-white rounded-xl font-semibold hover:bg-[#1a5a3a] transition-colors flex items-center gap-2">
                  Submit RFQ <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeItem="rfqs" />
    </div>
  );
}
