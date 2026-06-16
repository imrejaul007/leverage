'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/hooks/useToast';

const steps = [
  { id: 1, title: 'Product Details', description: 'Describe what you need' },
  { id: 2, title: 'Quantity & Budget', description: 'Set quantity and price range' },
  { id: 3, title: 'Delivery', description: 'Specify delivery requirements' },
  { id: 4, title: 'Review', description: 'Confirm your RFQ' },
];

const categories = [
  { value: '', label: 'Select a category' },
  { value: 'food', label: 'Food & Agriculture' },
  { value: 'textiles', label: 'Textiles' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'metals', label: 'Metals & Minerals' },
  { value: 'energy', label: 'Energy' },
  { value: 'chemicals', label: 'Chemicals' },
  { value: 'machinery', label: 'Machinery' },
];

const units = [
  { value: 'MT', label: 'Metric Ton (MT)' },
  { value: 'KG', label: 'Kilogram (KG)' },
  { value: 'units', label: 'Units' },
  { value: 'L', label: 'Liters (L)' },
];

const countries = [
  { value: '', label: 'Select country' },
  { value: 'UAE', label: 'United Arab Emirates' },
  { value: 'USA', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'Germany', label: 'Germany' },
  { value: 'China', label: 'China' },
  { value: 'India', label: 'India' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  { value: 'Spain', label: 'Spain' },
];

export default function NewRFQPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: '',
    unit: 'MT',
    targetPrice: '',
    currency: 'USD',
    deliveryCountry: '',
    deliveryDeadline: '',
    notes: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return formData.quantity && formData.unit;
      case 3:
        return formData.deliveryCountry && formData.deliveryDeadline;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    showToast('RFQ posted successfully!', 'success');
    router.push('/rfqs');
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header />

      <main className="container mx-auto px-4 sm:px-8 py-8">
        {/* Back */}
        <Link
          href="/rfqs"
          className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#154230] mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to RFQs
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#101111] mb-2">
            Post a Request for Quote
          </h1>
          <p className="text-[#4A4A4A]">
            Tell us what you need and let suppliers compete for your business.
          </p>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-3 ${
                  currentStep >= step.id ? 'text-[#154230]' : 'text-[#4A4A4A]'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep > step.id
                      ? 'bg-[#154230] text-white'
                      : currentStep === step.id
                      ? 'bg-[#154230] text-white'
                      : 'bg-[#E6E2DA]'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="hidden sm:block">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-xs">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-[#154230]' : 'bg-[#E6E2DA]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 sm:p-8 mb-8"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#101111]">Product Details</h2>
              <Input
                label="RFQ Title"
                placeholder="e.g., Premium Basmati Rice 1121"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
              />
              <Select
                label="Category"
                options={categories}
                value={formData.category}
                onChange={(v) => updateField('category', v)}
              />
              <Textarea
                label="Product Description"
                placeholder="Describe the product specifications, quality requirements, certifications needed, etc."
                rows={4}
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#101111]">Quantity & Budget</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Quantity"
                  type="number"
                  placeholder="e.g., 500"
                  value={formData.quantity}
                  onChange={(e) => updateField('quantity', e.target.value)}
                />
                <Select
                  label="Unit"
                  options={units}
                  value={formData.unit}
                  onChange={(v) => updateField('unit', v)}
                />
              </div>
              <Input
                label="Target Price (optional)"
                placeholder="e.g., 800"
                hint="Per unit price you're targeting"
                value={formData.targetPrice}
                onChange={(e) => updateField('targetPrice', e.target.value)}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#101111]">Delivery Requirements</h2>
              <Select
                label="Delivery Country"
                options={countries}
                value={formData.deliveryCountry}
                onChange={(v) => updateField('deliveryCountry', v)}
              />
              <Input
                label="Delivery Deadline"
                type="date"
                value={formData.deliveryDeadline}
                onChange={(e) => updateField('deliveryDeadline', e.target.value)}
              />
              <Textarea
                label="Additional Notes (optional)"
                placeholder="Any special requirements, packaging, labeling, etc."
                rows={3}
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#101111]">Review Your RFQ</h2>
              <div className="bg-[#f7f5f1] rounded-xl p-6 space-y-4">
                <div>
                  <p className="text-sm text-[#4A4A4A]">Title</p>
                  <p className="font-medium">{formData.title}</p>
                </div>
                <div>
                  <p className="text-sm text-[#4A4A4A]">Category</p>
                  <p className="font-medium">{categories.find(c => c.value === formData.category)?.label}</p>
                </div>
                <div>
                  <p className="text-sm text-[#4A4A4A]">Description</p>
                  <p className="font-medium">{formData.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#4A4A4A]">Quantity</p>
                    <p className="font-medium">{formData.quantity} {formData.unit}</p>
                  </div>
                  {formData.targetPrice && (
                    <div>
                      <p className="text-sm text-[#4A4A4A]">Target Price</p>
                      <p className="font-medium">${formData.targetPrice}/{formData.unit}</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#4A4A4A]">Delivery Country</p>
                    <p className="font-medium">{countries.find(c => c.value === formData.deliveryCountry)?.label}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#4A4A4A]">Deadline</p>
                    <p className="font-medium">{formData.deliveryDeadline}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              Post RFQ
            </Button>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
