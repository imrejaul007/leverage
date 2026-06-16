'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  Calculator,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Globe,
  BookOpen,
  DollarSign,
  Truck,
  Settings,
  Menu,
  X,
  Bell,
  User,
  Building2,
  ClipboardList,
  Scale,
  FileText,
  Bookmark,
  Download,
  Plus,
} from 'lucide-react';

interface HSCode {
  code: string;
  description: string;
  dutyRate: string;
  unit: string;
  notes: string;
}

const sampleHSCodes: HSCode[] = [
  {
    code: '8471.30.01',
    description: 'Portable automatic data processing machines weighing not more than 10 kg',
    dutyRate: '0%',
    unit: 'No.',
    notes: 'Laptops and notebook computers',
  },
  {
    code: '8517.12.00',
    description: 'Telephones for cellular networks or wireless networks',
    dutyRate: '0%',
    unit: 'No.',
    notes: 'Mobile phones and smartphones',
  },
  {
    code: '6204.62.40',
    description: "Women's or girls' trousers, breeches and shorts, of cotton",
    dutyRate: '16.6%',
    unit: 'Doz.',
    notes: 'Denim jeans and casual pants',
  },
  {
    code: '6402.91.50',
    description: 'Footwear with outer soles and uppers of rubber or plastics',
    dutyRate: '37.5%',
    unit: 'Pairs',
    notes: 'Rubber boots and work shoes',
  },
  {
    code: '9403.60.80',
    description: 'Wooden furniture, other than for office, kitchen, or bedroom',
    dutyRate: '0%',
    unit: 'No.',
    notes: 'Wooden tables, chairs, cabinets',
  },
];

const complianceChecks = [
  {
    id: '1',
    name: 'Export License Required',
    status: 'pass',
    description: 'Your destination country requires an export license for this product category.',
  },
  {
    id: '2',
    name: 'FDA Registration',
    status: 'warning',
    description: 'Food products require FDA registration before shipment.',
  },
  {
    id: '3',
    name: 'CE Marking',
    status: 'pass',
    description: 'Electronics require CE marking for EU market entry.',
  },
  {
    id: '4',
    name: 'Sanctions Check',
    status: 'pass',
    description: 'No sanctions restrictions found for the specified trade lanes.',
  },
];

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<'hs-codes' | 'calculator' | 'checks'>('hs-codes');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hsSearch, setHsSearch] = useState('');
  const [searchResults, setSearchResults] = useState<HSCode[]>(sampleHSCodes);
  const [productValue, setProductValue] = useState('');
  const [originCountry, setOriginCountry] = useState('China');
  const [destinationCountry, setDestinationCountry] = useState('United States');
  const [calculatedDuty, setCalculatedDuty] = useState<number | null>(null);

  const handleHSSearch = () => {
    if (hsSearch.trim()) {
      const results = sampleHSCodes.filter(
        (hs) =>
          hs.code.includes(hsSearch.toLowerCase()) ||
          hs.description.toLowerCase().includes(hsSearch.toLowerCase())
      );
      setSearchResults(results.length > 0 ? results : []);
    } else {
      setSearchResults(sampleHSCodes);
    }
  };

  const calculateDuty = () => {
    const value = parseFloat(productValue);
    if (value > 0) {
      const dutyRate = destinationCountry === 'United States' ? 0.06 : 0.05;
      setCalculatedDuty(value * dutyRate);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'fail':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-400" />;
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
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-lg">
                <Shield className="w-4 h-4" />
                Compliance
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Home</Link>
              <Link href="/marketplace" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Marketplace</Link>
              <Link href="/docs" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Documents</Link>
              <Link href="/freight" className="text-sm font-medium text-[#4A4A4A] hover:text-[#101111] transition-colors">Freight</Link>
              <Link href="/compliance" className="text-sm font-medium text-[#154230] transition-colors">Compliance</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/compliance/hs-codes" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#154230]/10 text-[#154230] text-sm font-semibold rounded-lg hover:bg-[#154230]/20 transition-colors">
                <Bookmark className="w-4 h-4" />
                HS Database
              </Link>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">
                Sign In
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-black/5"
            >
              <nav className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" onClick={() => setMobileMenuOpen(false)} className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#154230]/10 rounded-lg font-medium text-[#154230]">Compliance</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-32">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4">
              <Scale className="w-4 h-4" />
              Trade Compliance Platform
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Trade With Confidence
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Verify HS codes, calculate duties, and ensure compliance across 180+ countries. AI-powered classification and real-time updates.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <Search className="w-6 h-6" />
              <span className="text-sm font-medium">HS Lookup</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <Calculator className="w-6 h-6" />
              <span className="text-sm font-medium">Duty Calc</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
              <FileCheck className="w-6 h-6" />
              <span className="text-sm font-medium">Compliance</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-[#A6824A] hover:bg-[#b8945a] rounded-xl transition-colors">
              <BookOpen className="w-6 h-6" />
              <span className="text-sm font-medium">Learn</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-20 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="flex border-b border-black/5">
              <button
                onClick={() => setActiveTab('hs-codes')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'hs-codes'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Search className="w-4 h-4 inline mr-2" />
                HS Codes
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'calculator'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <Calculator className="w-4 h-4 inline mr-2" />
                Duty Calculator
              </button>
              <button
                onClick={() => setActiveTab('checks')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'checks'
                    ? 'text-[#154230] border-b-2 border-[#154230]'
                    : 'text-[#4A4A4A] hover:text-[#101111]'
                }`}
              >
                <FileCheck className="w-4 h-4 inline mr-2" />
                Compliance
              </button>
            </div>

            {activeTab === 'hs-codes' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#101111]">HS Code Database</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#154230] text-white text-sm font-semibold rounded-lg hover:bg-[#1d5240] transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Product
                  </button>
                </div>
                <div className="flex gap-2 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by HS code or product description..."
                      value={hsSearch}
                      onChange={(e) => setHsSearch(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleHSSearch()}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-black/10 text-[#101111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                    />
                  </div>
                  <button
                    onClick={handleHSSearch}
                    className="px-6 py-3 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-xl transition-colors"
                  >
                    Search
                  </button>
                </div>
                <div className="space-y-4">
                  {searchResults.map((hs) => (
                    <div key={hs.code} className="p-6 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-sm text-[#4A4A4A] mb-1">HS Code</div>
                          <div className="text-xl font-bold text-[#101111]">{hs.code}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-[#4A4A4A] mb-1">Duty Rate</div>
                          <div className="text-xl font-bold text-[#154230]">{hs.dutyRate}</div>
                        </div>
                      </div>
                      <p className="text-[#4A4A4A] mb-4">{hs.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-[#4A4A4A]">Unit: {hs.unit}</span>
                          <span className="text-[#4A4A4A]">Notes: {hs.notes}</span>
                        </div>
                        <button className="text-[#154230] font-medium hover:underline flex items-center gap-1">
                          View Details
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-6">Duty Calculator</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#101111] mb-2">Product Value (USD)</label>
                      <input
                        type="number"
                        placeholder="Enter product value..."
                        value={productValue}
                        onChange={(e) => setProductValue(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#101111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#101111] mb-2">Country of Origin</label>
                      <select
                        value={originCountry}
                        onChange={(e) => setOriginCountry(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      >
                        <option>China</option>
                        <option>India</option>
                        <option>Vietnam</option>
                        <option>Bangladesh</option>
                        <option>Indonesia</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#101111] mb-2">Destination Country</label>
                      <select
                        value={destinationCountry}
                        onChange={(e) => setDestinationCountry(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-black/10 text-[#101111] focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      >
                        <option>United States</option>
                        <option>European Union</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <button
                      onClick={calculateDuty}
                      className="w-full py-3 bg-[#154230] text-white font-semibold rounded-xl hover:bg-[#1d5240] transition-colors"
                    >
                      Calculate Duty
                    </button>
                  </div>
                  <div className="bg-[#f7f5f1] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-[#101111] mb-4">Estimated Duty</h3>
                    {calculatedDuty !== null ? (
                      <div>
                        <div className="text-4xl font-bold text-[#154230] mb-2">
                          ${calculatedDuty.toFixed(2)}
                        </div>
                        <div className="text-sm text-[#4A4A4A]">
                          Based on {destinationCountry} duty rates for products from {originCountry}
                        </div>
                        <div className="mt-4 pt-4 border-t border-black/10">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-[#4A4A4A]">Product Value</span>
                            <span className="font-medium">${parseFloat(productValue || '0').toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-[#4A4A4A]">Estimated Duty (6%)</span>
                            <span className="font-medium">${calculatedDuty.toFixed(2)}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-black/10">
                            <span>Total Cost</span>
                            <span className="text-[#154230]">${(parseFloat(productValue || '0') + calculatedDuty).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Calculator className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-[#4A4A4A]">Enter product details to calculate duty</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'checks' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#101111] mb-6">Compliance Checklist</h2>
                <div className="space-y-4">
                  {complianceChecks.map((check) => (
                    <div key={check.id} className="p-6 bg-[#f7f5f1] rounded-xl flex items-start gap-4">
                      <div className="mt-1">{getStatusIcon(check.status)}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[#101111] mb-1">{check.name}</h3>
                        <p className="text-sm text-[#4A4A4A]">{check.description}</p>
                      </div>
                      <button className="text-[#154230] font-medium hover:underline text-sm">
                        Details
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-6 bg-[#154230]/5 rounded-xl border border-[#154230]/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#154230] rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#101111]">Compliance Score: 75%</h3>
                      <p className="text-sm text-[#4A4A4A]">3 of 4 checks passed</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#4A4A4A]">
                    Complete FDA registration to achieve full compliance for your product category.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#101111] mb-8 text-center">Why Choose LEVERAGE Compliance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
              <div className="text-center">
                <div className="w-14 h-14 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-[#154230]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">HS Code Lookup</h3>
                <p className="text-sm text-[#4A4A4A]">Search across 5,000+ HS codes with instant results and duty rates.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#A6824A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-7 h-7 text-[#A6824A]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Duty Calculator</h3>
                <p className="text-sm text-[#4A4A4A]">Calculate landed costs including duties, taxes, and fees.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#5D1E21]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="w-7 h-7 text-[#5D1E21]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">Compliance Checks</h3>
                <p className="text-sm text-[#4A4A4A]">Automated checks for licenses, sanctions, and regulations.</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-[#154230]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-[#154230]" />
                </div>
                <h3 className="font-bold text-[#101111] mb-2">180+ Countries</h3>
                <p className="text-sm text-[#4A4A4A]">Coverage across all major trading nations and regions.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#101111] text-white px-4 sm:px-8 py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain mb-4 brightness-0 invert" />
              <p className="text-sm text-gray-400">The Trade OS for import/export businesses.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link href="/freight" className="hover:text-white transition-colors">Freight</Link></li>
                <li><Link href="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; 2024 LEVERAGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}