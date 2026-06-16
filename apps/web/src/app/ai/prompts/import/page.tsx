'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Bot,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Globe,
  FileText as FileTextIcon,
  Truck,
  Shield,
  Megaphone,
  Receipt,
  Users,
  ArrowRight,
  Menu,
  X,
  Bell,
  Download,
  Zap,
} from 'lucide-react';

const platformLinks = [
  { name: 'Marketplace', href: '/marketplace', icon: Globe },
  { name: 'Documents', href: '/documents', icon: FileTextIcon },
  { name: 'Freight', href: '/freight', icon: Truck },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'AI Assistant', href: '/ai', icon: Bot },
  { name: 'Billing', href: '/billing', icon: Receipt },
  { name: 'Ads', href: '/ads', icon: Megaphone },
  { name: 'Consultations', href: '/consultations', icon: Users },
];

const importFormats = [
  { format: 'JSON', description: 'Standard prompt export format', icon: '{ }' },
  { format: 'CSV', description: 'Bulk import with variables', icon: '📊' },
  { format: 'Markdown', description: 'Prompt documentation format', icon: '📝' },
  { format: 'OpenAI', description: 'OpenAI prompt format', icon: '🤖' },
];

export default function ImportPromptsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importComplete, setImportComplete] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      setImporting(true);
      setTimeout(() => {
        setImporting(false);
        setImportComplete(true);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="container mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/ai" className="flex items-center gap-3">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={144} height={48} className="object-contain" />
              <span className="hidden sm:inline text-sm text-[#4A4A4A] font-medium">Import Prompts</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="nav-link font-medium">Home</Link>
              <Link href="/marketplace" className="nav-link font-medium">Marketplace</Link>
              <Link href="/documents" className="nav-link font-medium">Documents</Link>
              <Link href="/freight" className="nav-link font-medium">Freight</Link>
              <Link href="/compliance" className="nav-link font-medium">Compliance</Link>
              <Link href="/ai" className="nav-link font-medium text-[#154230]">AI</Link>
              <Link href="/consultations" className="nav-link font-medium">Consultations</Link>
            </nav>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 rounded-xl transition-colors"><Bell className="w-5 h-5 text-[#4A4A4A]" /></button>
              <Link href="/login" className="px-5 py-2.5 bg-[#154230] hover:bg-[#1d5240] text-white font-semibold rounded-lg transition-all text-sm">Sign In</Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-black/5 rounded-xl transition-colors">{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
            </div>
          </div>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pt-4 border-t border-black/5">
              <nav className="flex flex-col gap-2">
                <Link href="/" className="p-3 hover:bg-black/5 rounded-lg font-medium">Home</Link>
                <Link href="/marketplace" className="p-3 hover:bg-black/5 rounded-lg font-medium">Marketplace</Link>
                <Link href="/documents" className="p-3 hover:bg-black/5 rounded-lg font-medium">Documents</Link>
                <Link href="/freight" className="p-3 hover:bg-black/5 rounded-lg font-medium">Freight</Link>
                <Link href="/compliance" className="p-3 hover:bg-black/5 rounded-lg font-medium">Compliance</Link>
                <Link href="/ai" className="p-3 hover:bg-black/5 rounded-lg font-medium">AI</Link>
                <Link href="/consultations" className="p-3 hover:bg-black/5 rounded-lg font-medium">Consultations</Link>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#154230] to-[#1a5a3a] px-4 sm:px-8 pt-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          <Link href="/ai/prompts" className="text-white/70 hover:text-white">← Back to Prompts</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <Upload className="w-10 h-10 text-white" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Import Prompts</h1>
            </div>
            <p className="text-lg text-white/80">Bulk import AI prompts from files or other platforms</p>
          </motion.div>
        </div>
      </section>

      {/* Import Form */}
      <main className="px-4 sm:px-8 -mt-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            {/* Supported Formats */}
            <div className="mb-6">
              <h3 className="font-bold text-[#101111] mb-4">Supported Formats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {importFormats.map((item) => (
                  <div key={item.format} className="p-4 bg-[#f7f5f1] rounded-xl text-center">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="font-bold text-[#101111]">{item.format}</p>
                    <p className="text-xs text-[#4A4A4A] mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-12 text-center mb-6 transition-colors ${
                dragActive
                  ? 'border-[#154230] bg-[#154230]/5'
                  : 'border-[#154230]/20 hover:border-[#154230]/40'
              }`}
            >
              {importing ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 border-4 border-[#154230] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-[#4A4A4A]">Importing prompts...</p>
                </div>
              ) : importComplete ? (
                <div className="space-y-4">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                  <p className="text-green-600 font-bold">Import Complete!</p>
                  <p className="text-[#4A4A4A]">12 prompts imported successfully</p>
                  <Link href="/ai/prompts" className="inline-flex items-center gap-2 px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors mt-4">
                    View Prompts <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="w-16 h-16 text-[#154230] mx-auto" />
                  <div>
                    <p className="font-bold text-[#101111] mb-2">Drag and drop your file here</p>
                    <p className="text-sm text-[#4A4A4A] mb-4">or</p>
                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-[#154230] text-white font-semibold rounded-lg hover:bg-[#1d5240] transition-colors cursor-pointer">
                      <FileText className="w-5 h-5" />
                      Browse Files
                      <input type="file" className="hidden" accept=".json,.csv,.md,.txt" onChange={() => {
                        setImporting(true);
                        setTimeout(() => {
                          setImporting(false);
                          setImportComplete(true);
                        }, 2000);
                      }} />
                    </label>
                  </div>
                  <p className="text-xs text-[#4A4A4A]">Maximum file size: 10MB</p>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link href="/ai/prompts/create" className="flex items-center gap-3 p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                <Zap className="w-6 h-6 text-[#154230]" />
                <div>
                  <p className="font-bold text-[#101111]">Create New</p>
                  <p className="text-xs text-[#4A4A4A]">Build from scratch</p>
                </div>
              </Link>
              <Link href="/ai/agents/templates" className="flex items-center gap-3 p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                <Bot className="w-6 h-6 text-[#154230]" />
                <div>
                  <p className="font-bold text-[#101111]">Templates</p>
                  <p className="text-xs text-[#4A4A4A]">Use pre-built</p>
                </div>
              </Link>
              <a href="/sample-prompts.json" download className="flex items-center gap-3 p-4 bg-[#f7f5f1] rounded-xl hover:bg-[#E6E2DA] transition-colors">
                <Download className="w-6 h-6 text-[#154230]" />
                <div>
                  <p className="font-bold text-[#101111]">Download Sample</p>
                  <p className="text-xs text-[#4A4A4A]">JSON template</p>
                </div>
              </a>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-[#154230] rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Import Tips
            </h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>• Ensure your JSON file follows the correct schema format</li>
              <li>• Variable names must be unique within each prompt</li>
              <li>• Use {"{{variable}}"} syntax for dynamic values</li>
              <li>• CSV files should have headers: name, template, variables</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#154230]">
        <div className="bg-[#154230] px-4 sm:px-8 py-12">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2 md:col-span-1">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={140} height={46} className="object-contain mb-4 brightness-0 invert" />
                <p className="text-white/70 text-sm mb-4">The operating system for global trade.</p>
              </div>
              <div><h4 className="text-white font-bold mb-4 text-sm">Platform</h4><ul className="space-y-2 text-sm">{platformLinks.map((link) => (<li key={link.name}><Link href={link.href} className="text-white/70 hover:text-white transition-colors">{link.name}</Link></li>))}</ul></div>
            </div>
          </div>
        </div>
        <div className="bg-[#5D1E21] px-4 sm:px-8 py-6">
          <div className="container mx-auto max-w-6xl">
            <p className="text-white/70 text-sm text-center">© 2024 LEVERAGE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
