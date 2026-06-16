'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  Search,
  FileCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Bell,
  Upload,
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

const steps = [
  { id: 1, name: 'Product Info', description: 'Enter product details' },
  { id: 2, name: 'Trade Route', description: 'Origin and destination' },
  { id: 3, name: 'Documents', description: 'Upload supporting docs' },
  { id: 4, name: 'Review', description: 'Confirm and submit' },
];

const complianceChecks = [
  { name: 'HS Code Classification', status: 'pending', description: 'Verify correct HS code assignment' },
  { name: 'Import License Requirements', status: 'pending', description: 'Check if import license is required' },
  { name: 'Duty Rate Calculation', status: 'pending', description: 'Calculate applicable duty rates' },
  { name: 'Labeling Requirements', status: 'pending', description: 'Verify product labeling compliance' },
  { name: 'FDA/CPSC Requirements', status: 'pending', description: 'Check product safety regulations' },
  { name: 'Documentation Review', status: 'pending', description: 'Validate required documents' },
];

export default function NewComplianceCheckPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecking, setIsChecking] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">New Compliance Check</span>
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
        <div className="container mx-auto max-w-5xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-[#101111]">New Compliance Check</h1>
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
                <h2 className="text-xl font-bold text-[#101111] mb-6">Product Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Product Name</label>
                    <input
                      type="text"
                      placeholder="Enter product name"
                      className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">HS Code</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4A4A4A]" />
                      <input
                        type="text"
                        placeholder="Search or enter HS code"
                        className="w-full h-12 pl-12 pr-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Product Description</label>
                    <textarea
                      rows={4}
                      placeholder="Describe the product in detail for better HS code matching"
                      className="w-full px-4 py-3 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Product Category</label>
                    <select className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20">
                      <option>Select category</option>
                      <option>Electronics</option>
                      <option>Textiles</option>
                      <option>Machinery</option>
                      <option>Chemicals</option>
                      <option>Food Products</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Estimated Value</label>
                    <input
                      type="text"
                      placeholder="Enter value (USD)"
                      className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-bold text-[#101111] mb-6">Trade Route</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Country of Origin</label>
                    <select className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20">
                      <option>Select origin country</option>
                      <option>China</option>
                      <option>India</option>
                      <option>Vietnam</option>
                      <option>Germany</option>
                      <option>Japan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Destination Country</label>
                    <select className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20">
                      <option>Select destination country</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>European Union</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Port of Entry</label>
                    <input
                      type="text"
                      placeholder="Enter port name"
                      className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Incoterm</label>
                    <select className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20">
                      <option>Select incoterm</option>
                      <option>FOB - Free On Board</option>
                      <option>CIF - Cost, Insurance, Freight</option>
                      <option>DDP - Delivered Duty Paid</option>
                      <option>EXW - Ex Works</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Transport Mode</label>
                    <select className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20">
                      <option>Select transport mode</option>
                      <option>Sea Freight</option>
                      <option>Air Freight</option>
                      <option>Land Transport</option>
                      <option>Rail Transport</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">Expected Shipment Date</label>
                    <input
                      type="date"
                      className="w-full h-12 px-4 bg-[#f7f5f1] rounded-xl text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-bold text-[#101111] mb-6">Supporting Documents</h2>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6">
                  <Upload className="w-12 h-12 text-[#4A4A4A] mx-auto mb-4" />
                  <p className="text-[#101111] font-medium mb-2">Drag and drop files here or click to upload</p>
                  <p className="text-sm text-[#4A4A4A] mb-4">PDF, DOC, or images up to 10MB</p>
                  <button className="px-6 py-2 bg-[#154230] text-white font-medium rounded-lg hover:bg-[#1d5240] transition-colors">
                    Choose Files
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-[#154230]" />
                      <div>
                        <p className="font-medium text-[#101111]">commercial_invoice.pdf</p>
                        <p className="text-xs text-[#4A4A4A]">Uploaded 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-600 font-medium text-sm">Remove</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f7f5f1] rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-5 h-5 text-[#154230]" />
                      <div>
                        <p className="font-medium text-[#101111]">packing_list.pdf</p>
                        <p className="text-xs text-[#4A4A4A]">Uploaded 2 hours ago</p>
                      </div>
                    </div>
                    <button className="text-red-500 hover:text-red-600 font-medium text-sm">Remove</button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-bold text-[#101111] mb-6">Review & Submit</h2>
                <div className="space-y-6">
                  <div className="p-4 bg-[#f7f5f1] rounded-xl">
                    <h3 className="font-bold text-[#101111] mb-3">Product Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#4A4A4A]">Product:</span>
                        <span className="ml-2 text-[#101111] font-medium">Electronics Components</span>
                      </div>
                      <div>
                        <span className="text-[#4A4A4A]">HS Code:</span>
                        <span className="ml-2 text-[#101111] font-medium font-mono">8542.31</span>
                      </div>
                      <div>
                        <span className="text-[#4A4A4A]">Category:</span>
                        <span className="ml-2 text-[#101111] font-medium">Electronics</span>
                      </div>
                      <div>
                        <span className="text-[#4A4A4A]">Value:</span>
                        <span className="ml-2 text-[#101111] font-medium">$15,000 USD</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#f7f5f1] rounded-xl">
                    <h3 className="font-bold text-[#101111] mb-3">Trade Route</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#4A4A4A]">Origin:</span>
                        <span className="ml-2 text-[#101111] font-medium">China</span>
                      </div>
                      <div>
                        <span className="text-[#4A4A4A]">Destination:</span>
                        <span className="ml-2 text-[#101111] font-medium">United States</span>
                      </div>
                      <div>
                        <span className="text-[#4A4A4A]">Transport:</span>
                        <span className="ml-2 text-[#101111] font-medium">Sea Freight</span>
                      </div>
                      <div>
                        <span className="text-[#4A4A4A]">Incoterm:</span>
                        <span className="ml-2 text-[#101111] font-medium">FOB</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#f7f5f1] rounded-xl">
                    <h3 className="font-bold text-[#101111] mb-3">Documents</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <FileCheck className="w-4 h-4 text-[#154230]" />
                      <span className="text-[#101111]">commercial_invoice.pdf</span>
                      <span className="text-[#4A4A4A]">•</span>
                      <FileCheck className="w-4 h-4 text-[#154230]" />
                      <span className="text-[#101111]">packing_list.pdf</span>
                    </div>
                  </div>
                  <div className="border-t border-black/5 pt-6">
                    <h3 className="font-bold text-[#101111] mb-4">Compliance Checks to Run</h3>
                    <div className="space-y-3">
                      {complianceChecks.map((check) => (
                        <div key={check.name} className="flex items-center gap-3">
                          {getStatusIcon(check.status)}
                          <div>
                            <p className="font-medium text-[#101111]">{check.name}</p>
                            <p className="text-xs text-[#4A4A4A]">{check.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsChecking(true)}
                  disabled={isChecking}
                  className="flex items-center gap-2 px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors disabled:opacity-70"
                >
                  {isChecking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Running Checks...
                    </>
                  ) : (
                    <>
                      <ClipboardCheck className="w-4 h-4" />
                      Run Compliance Check
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