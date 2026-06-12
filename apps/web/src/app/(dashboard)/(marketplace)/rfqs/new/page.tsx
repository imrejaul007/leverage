'use client';

import { useState } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';

const steps = [
  { id: 1, name: 'Product Category', description: 'Select product category and type' },
  { id: 2, name: 'Requirements', description: 'Define quantity and specifications' },
  { id: 3, name: 'Destination', description: 'Origin, destination, and timeline' },
  { id: 4, name: 'Review', description: 'Review and submit your RFQ' },
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link href="/rfqs" className="text-[#D8CCBC]/60 hover:text-[#F4F1EA] mb-4 inline-flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to RFQs
        </Link>
        <h1 className="text-3xl font-bold text-[#F4F1EA]">Create New RFQ</h1>
        <p className="text-[#D8CCBC]/60">Get quotes from verified suppliers worldwide</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                currentStep > step.id
                  ? 'bg-emerald-500 text-white'
                  : currentStep === step.id
                  ? 'bg-[#C49A6C] text-[#081512]'
                  : 'bg-[rgba(255,255,255,0.1)] text-[#D8CCBC]'
              }`}>
                {currentStep > step.id ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : step.id}
              </div>
              <div className="hidden md:block">
                <p className={`font-medium ${currentStep >= step.id ? 'text-[#F4F1EA]' : 'text-[#D8CCBC]/50'}`}>
                  {step.name}
                </p>
                <p className="text-xs text-[#D8CCBC]/50">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 md:w-24 h-0.5 mx-4 ${
                currentStep > step.id ? 'bg-emerald-500' : 'bg-[rgba(255,255,255,0.1)]'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="card">
        {/* Step 1: Product Category */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-[#F4F1EA] mb-4">Select Product Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => updateForm('category', cat.id)}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      formData.category === cat.id
                        ? 'border-[#C49A6C] bg-[#C49A6C]/10'
                        : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]'
                    }`}
                  >
                    <span className="text-3xl mb-2 block">{cat.icon}</span>
                    <p className={`text-sm font-medium ${formData.category === cat.id ? 'text-[#C49A6C]' : 'text-[#F4F1EA]'}`}>
                      {cat.name}
                    </p>
                    {cat.popular && (
                      <span className="text-xs text-[#C49A6C] bg-[#C49A6C]/20 px-2 py-0.5 rounded mt-1 inline-block">Popular</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Requirements */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#F4F1EA]">Define Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-[#D8CCBC] text-sm mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => updateForm('productName', e.target.value)}
                  placeholder="e.g., Premium Basmati Rice"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Quantity *</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => updateForm('quantity', e.target.value)}
                    placeholder="500"
                    className="input flex-1"
                  />
                  <select
                    value={formData.unit}
                    onChange={(e) => updateForm('unit', e.target.value)}
                    className="input w-24"
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
                <label className="block text-[#D8CCBC] text-sm mb-2">Target Price *</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={formData.targetPrice}
                    onChange={(e) => updateForm('targetPrice', e.target.value)}
                    placeholder="850"
                    className="input flex-1"
                  />
                  <select
                    value={formData.currency}
                    onChange={(e) => updateForm('currency', e.target.value)}
                    className="input w-24"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="AED">AED</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[#D8CCBC] text-sm mb-2">Detailed Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                  placeholder="Include specifications, grade requirements, certifications needed..."
                  rows={4}
                  className="input w-full resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Destination */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#F4F1EA]">Origin & Destination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Origin Country *</label>
                <select
                  value={formData.originCountry}
                  onChange={(e) => updateForm('originCountry', e.target.value)}
                  className="input w-full"
                >
                  <option value="">Select origin country</option>
                  {countries.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Destination Country *</label>
                <select
                  value={formData.destinationCountry}
                  onChange={(e) => updateForm('destinationCountry', e.target.value)}
                  className="input w-full"
                >
                  <option value="">Select destination country</option>
                  {countries.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Incoterms</label>
                <select
                  value={formData.incoterms}
                  onChange={(e) => updateForm('incoterms', e.target.value)}
                  className="input w-full"
                >
                  <option value="EXW">EXW - Ex Works</option>
                  <option value="FOB">FOB - Free On Board</option>
                  <option value="CIF">CIF - Cost, Insurance, Freight</option>
                  <option value="DDP">DDP - Delivered Duty Paid</option>
                  <option value="DAP">DAP - Delivered At Place</option>
                </select>
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Required Delivery Date</label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => updateForm('deliveryDate', e.target.value)}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-[#D8CCBC] text-sm mb-2">Payment Terms</label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) => updateForm('paymentTerms', e.target.value)}
                  className="input w-full"
                >
                  <option value="30% Advance">30% Advance</option>
                  <option value="50% Advance">50% Advance</option>
                  <option value="LC at Sight">LC at Sight</option>
                  <option value="TT 30 Days">TT 30 Days</option>
                  <option value="CAD">CAD - Cash Against Documents</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[#D8CCBC] text-sm mb-2">Additional Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateForm('notes', e.target.value)}
                  placeholder="Any additional requirements or special instructions..."
                  rows={3}
                  className="input w-full resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-[#F4F1EA]">Review Your RFQ</h2>
            <div className="bg-[rgba(255,255,255,0.02)] rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#D8CCBC]/50 text-sm">Category</p>
                  <p className="text-[#F4F1EA]">{categories.find(c => c.id === formData.category)?.name}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-sm">Product</p>
                  <p className="text-[#F4F1EA]">{formData.productName}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-sm">Quantity</p>
                  <p className="text-[#F4F1EA]">{formData.quantity} {formData.unit}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-sm">Target Price</p>
                  <p className="text-[#F4F1EA]">{formData.currency} {formData.targetPrice}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-sm">Origin</p>
                  <p className="text-[#F4F1EA]">{formData.originCountry}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-sm">Destination</p>
                  <p className="text-[#F4F1EA]">{formData.destinationCountry}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-sm">Incoterms</p>
                  <p className="text-[#F4F1EA]">{formData.incoterms}</p>
                </div>
                <div>
                  <p className="text-[#D8CCBC]/50 text-sm">Payment Terms</p>
                  <p className="text-[#F4F1EA]">{formData.paymentTerms}</p>
                </div>
              </div>
              {formData.description && (
                <div className="pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <p className="text-[#D8CCBC]/50 text-sm mb-1">Description</p>
                  <p className="text-[#F4F1EA]">{formData.description}</p>
                </div>
              )}
            </div>
            <div className="bg-[#0E3B36]/30 rounded-xl p-4">
              <p className="text-[#D8CCBC]/60 text-sm">
                <span className="text-[#C49A6C] font-medium">💡 AI Suggestion:</span> Your RFQ will be visible to {countries.length}+ verified suppliers matching your criteria.
                Expected response time: 4-24 hours.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[rgba(255,255,255,0.05)]">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              currentStep === 1
                ? 'opacity-50 cursor-not-allowed bg-[rgba(255,255,255,0.05)] text-[#D8CCBC]'
                : 'bg-[rgba(255,255,255,0.05)] text-[#F4F1EA] hover:bg-[rgba(255,255,255,0.1)]'
            }`}
          >
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                canProceed()
                  ? 'bg-[#C49A6C] text-[#081512] hover:bg-[#D4AA82]'
                  : 'opacity-50 cursor-not-allowed bg-[#C49A6C]/50 text-[#081512]/50'
              }`}
            >
              Continue
            </button>
          ) : (
            <button className="px-8 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors">
              Submit RFQ →
            </button>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeItem="rfqs" />
    </div>
  );
}
