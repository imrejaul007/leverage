'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Search,
  Menu,
  X,
  Bell,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  DollarSign,
  Globe,
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

const riskFactors = [
  { name: 'Customs Delays', score: 72, trend: 'up', description: 'Average clearance time increasing' },
  { name: 'Tariff Changes', score: 65, trend: 'stable', description: 'Recent trade policy adjustments' },
  { name: 'Document Compliance', score: 88, trend: 'down', description: 'Improved documentation standards' },
  { name: 'Product Restrictions', score: 45, trend: 'down', description: 'Fewer restrictions in target markets' },
];

const riskAlerts = [
  { id: 1, title: 'Steel Imports Tariff Investigation', severity: 'high', description: 'US initiating Section 232 investigation on steel imports.', action: 'Review pricing strategy' },
  { id: 2, title: 'Electronics Counterfeit Risk', severity: 'medium', description: 'Increased counterfeit electronics detected at ports.', action: 'Verify supplier certification' },
  { id: 3, title: 'Textile Labeling Non-Compliance', severity: 'low', description: 'Multiple shipments held for labeling issues.', action: 'Update label templates' },
];

const countryRisks = [
  { country: 'China', riskScore: 72, trend: 'up', factors: ['Tariffs', 'Regulations'] },
  { country: 'India', riskScore: 58, trend: 'stable', factors: ['Documentation', 'Delays'] },
  { country: 'Vietnam', riskScore: 35, trend: 'down', factors: ['Political', 'Supply Chain'] },
  { country: 'Germany', riskScore: 22, trend: 'stable', factors: ['Environmental'] },
];

export default function RiskPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getSeverityBadge = (severity: string) => {
    const styles: Record<string, string> = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700',
    };
    return styles[severity] || 'bg-gray-100 text-gray-700';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
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
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Risk Assessment</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium text-[#154230]">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium">AI</Link>
              <Link href="/consultations" className="nav-link font-medium">Consultations</Link>
            </nav>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-[#4A4A4A]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#5D1E21] rounded-full"></span>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-white mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Risk Assessment
              </h1>
            </div>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Identify and mitigate trade compliance risks. Get real-time alerts and actionable insights.
            </p>
          </motion.div>

          {/* Overall Risk Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
                <h3 className="text-sm text-[#4A4A4A] mb-2">Overall Risk Score</h3>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-6xl font-bold text-[#154230]">68</span>
                  <div className="text-left">
                    <div className="flex items-center gap-1 text-[#4A4A4A]">
                      <TrendingDown className="w-4 h-4 text-green-500" />
                      <span className="text-sm">-5 points</span>
                    </div>
                    <p className="text-sm text-[#4A4A4A]">from last month</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Low-Moderate Risk</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-white/70">Active Alerts</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">$12K</p>
              <p className="text-sm text-white/70">Risks Mitigated</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-sm text-white/70">On-Time Delivery</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-white/70">Monitoring</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-4 sm:px-8 -mt-12 pb-16">
        <div className="container mx-auto max-w-7xl">
          {/* Risk Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {riskFactors.map((factor, index) => {
              const isGreen = index % 2 === 0;
              return (
                <div key={factor.name} className={`rounded-xl p-6 shadow-sm ${isGreen ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white">{factor.name}</h3>
                    {getTrendIcon(factor.trend)}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-3xl font-bold text-white">{factor.score}</span>
                      <span className="text-white/60 text-sm ml-1">/100</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mt-2">{factor.description}</p>
                </div>
              );
            })}
          </div>

          {/* Risk Alerts */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#4A4A4A]" />
                Risk Alerts
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {riskAlerts.map((alert, index) => (
                  <div key={alert.id} className={`p-6 rounded-xl ${index % 2 === 0 ? 'bg-[#154230]' : 'bg-[#5D1E21]'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-white" />
                        <h3 className="font-bold text-white">{alert.title}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityBadge(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-white/70 mb-4">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Recommended action:</span>
                      <button className="px-4 py-2 bg-white text-[#154230] font-medium rounded-lg hover:bg-white/90 transition-colors text-sm">
                        {alert.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Country Risk Matrix */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-black/5">
              <h2 className="text-xl font-bold text-[#101111] flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#4A4A4A]" />
                Country Risk Matrix
              </h2>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#f7f5f1]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Country</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Risk Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Trend</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#4A4A4A] uppercase tracking-wider">Key Factors</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {countryRisks.map((country) => (
                      <tr key={country.country} className="hover:bg-[#f7f5f1] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#4A4A4A]" />
                            <span className="font-medium text-[#101111]">{country.country}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${country.riskScore > 60 ? 'bg-red-500' : country.riskScore > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                style={{ width: `${country.riskScore}%` }}
                              />
                            </div>
                            <span className="font-medium text-[#101111]">{country.riskScore}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getTrendIcon(country.trend)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {country.factors.map((factor) => (
                              <span key={factor} className="px-2 py-1 bg-[#f7f5f1] rounded text-xs text-[#4A4A4A]">
                                {factor}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/compliance/regulations" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <AlertTriangle className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Regulation Updates</h3>
              <p className="text-sm text-white/70 mb-4">Stay updated on changing regulations.</p>
              <span className="text-white font-medium flex items-center gap-1">
                View Updates <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/check" className="bg-[#5D1E21] rounded-xl p-6 shadow-sm hover:bg-[#7b1c1f] transition-colors">
              <Shield className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Compliance Check</h3>
              <p className="text-sm text-white/70 mb-4">Verify your compliance status.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Start Check <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/compliance/support" className="bg-[#154230] rounded-xl p-6 shadow-sm hover:bg-[#1d5240] transition-colors">
              <DollarSign className="w-8 h-8 text-white mb-4" />
              <h3 className="font-bold text-white mb-2">Risk Mitigation</h3>
              <p className="text-sm text-white/70 mb-4">Learn strategies to reduce risk.</p>
              <span className="text-white font-medium flex items-center gap-1">
                Learn More <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 py-16">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Protect Your Business</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Get personalized risk assessments and mitigation strategies from our compliance experts.
          </p>
          <Link href="/consultations" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#154230] font-semibold rounded-lg hover:bg-white/90 transition-colors">
            Get Risk Assessment <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer - 50% Green / 50% Maroon */}
      <footer className="bg-[#154230]">
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