'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Bell,
  CheckCircle,
  FileText,
  Loader2,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Documents', href: '/documents' },
  { name: 'Freight', href: '/freight' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'AI Assistant', href: '/ai' },
  { name: 'Billing', href: '/billing' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

const defaultItems = [
  'Verify HS code classification',
  'Check import license requirements',
  'Confirm country of origin documentation',
  'Review labeling requirements',
  'Verify FDA/CPSC compliance',
  'Check duty rate applicability',
  'Confirm insurance coverage',
  'Review incoterm terms',
];

const steps = [
  { id: 1, name: 'Basic Info', description: 'Name and category' },
  { id: 2, name: 'Add Items', description: 'Build checklist items' },
  { id: 3, name: 'Review', description: 'Confirm and save' },
];

export default function NewChecklistPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [checklistName, setChecklistName] = useState('');
  const [category, setCategory] = useState('Import');
  const [items, setItems] = useState<string[]>(['']);
  const [isSaving, setIsSaving] = useState(false);

  const addItem = () => {
    setItems([...items, '']);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const addDefaultItems = () => {
    setItems([...items, ...defaultItems]);
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">New Checklist</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium text-[#154230]">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
              </button>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pt-4 border-t border-black/5">
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium text-[#154230]">Compliance</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-8 py-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-[#101111]">Create New Checklist</h1>
              <span className="text-sm text-[#4A4A4A]">Step {currentStep} of {steps.length}</span>
            </div>
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${currentStep >= step.id ? 'bg-[#154230] text-white' : 'bg-gray-100 text-[#4A4A4A]'}`}>
                    <span className="font-medium text-sm">{step.id}. {step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ${currentStep > step.id ? 'bg-[#154230]' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-bold text-[#101111] mb-6">Basic Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Checklist Name</label>
                    <input
                      type="text"
                      value={checklistName}
                      onChange={(e) => setChecklistName(e.target.value)}
                      placeholder="e.g., Electronics Import Checklist"
                      className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    >
                      <option>Import</option>
                      <option>Export</option>
                      <option>Regulatory</option>
                      <option>Safety</option>
                      <option>Financial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Description (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Describe what this checklist is for..."
                      className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#101111]">Checklist Items</h2>
                  <button
                    onClick={addDefaultItems}
                    className="px-4 py-2 bg-[#f7f5f1] text-[#154230] font-medium rounded-lg hover:bg-[#E6E2DA] transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4 inline mr-1" />
                    Add Common Items
                  </button>
                </div>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="cursor-grab text-[#4A4A4A]">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateItem(index, e.target.value)}
                        placeholder={`Item ${index + 1}`}
                        className="flex-1 h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      />
                      <button
                        onClick={() => removeItem(index)}
                        className="p-3 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addItem}
                  className="mt-4 w-full h-12 border-2 border-dashed border-gray-200 rounded-xl text-[#4A4A4A] font-medium hover:border-[#154230] hover:text-[#154230] transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Item
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-[#101111] mb-6">Review & Save</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-[#f7f5f1] rounded-xl">
                    <h3 className="font-bold text-[#101111] mb-3">Checklist Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#4A4A4A]">Name:</span>
                        <span className="ml-2 text-[#101111] font-medium">{checklistName || 'Untitled Checklist'}</span>
                      </div>
                      <div>
                        <span className="text-[#4A4A4A]">Category:</span>
                        <span className="ml-2 text-[#101111] font-medium">{category}</span>
                      </div>
                      <div>
                        <span className="text-[#4A4A4A]">Total Items:</span>
                        <span className="ml-2 text-[#101111] font-medium">{items.filter(i => i.trim()).length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#f7f5f1] rounded-xl">
                    <h3 className="font-bold text-[#101111] mb-3">Items Preview</h3>
                    <ul className="space-y-2">
                      {items.filter(i => i.trim()).map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-[#154230]" />
                          <span className="text-[#101111]">{item}</span>
                        </li>
                      ))}
                      {items.filter(i => i.trim()).length === 0 && (
                        <li className="text-[#4A4A4A] text-sm">No items added yet</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/5">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 text-[#4A4A4A] font-medium rounded-lg hover:bg-black/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSaving(true)}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors disabled:opacity-70"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      Save Checklist
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - 50% Green / 50% Maroon */}
      <footer className="bg-[#154230] mt-auto">
        <div className="bg-[#154230] px-4 sm:px-8 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain mb-4 brightness-0 invert" />
                <p className="text-white/70 text-sm mb-4">
                  The operating system for global trade.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Platform</h4>
                <ul className="space-y-2 text-sm">
                  {platformLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Company</h4>
                <ul className="space-y-2 text-sm">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4 text-sm">Legal</h4>
                <ul className="space-y-2 text-sm">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/70 text-sm">
                © 2024 LEVERAGE. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">Privacy</Link>
                <Link href="/terms" className="text-white/70 hover:text-white text-sm transition-colors">Terms</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}