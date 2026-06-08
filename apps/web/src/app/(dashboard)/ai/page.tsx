'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bot, Send, Sparkles, Loader2, Globe, Shield, FileText, Home, Search, Mail, User, Bell, Package, Truck, CheckCircle, Plus, Menu, X, Settings, LogOut, MessageSquare, BarChart3 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockResponses = [
  "Based on the HS code classification, your product falls under Chapter 84. The applicable HS code is 8471.30.00 for portable digital automatic data processing machines.",
  "For importing goods from San Francisco to the USA, you'll need to comply with Section 301 tariffs. Additional documentation including COO, Commercial Invoice, and Bill of Lading are required.",
  "The estimated import duty for your product (HS Code 8471.30.00) is approximately 0% under MFN tariff rate. Additional fees may apply including Customs Processing Fees.",
  "I recommend using Incoterms 2020 CIF for your shipment to include insurance coverage. This protects both buyer and seller during transit.",
  "For sea freight from Shanghai to Los Angeles, transit time is typically 14-21 days. Air freight takes 3-5 days but is approximately 3-4x more expensive.",
];

const quickActions = [
  { label: 'HS Code Lookup', prompt: 'What is the HS code for ' },
  { label: 'Duty Calculator', prompt: 'Calculate duty for importing ' },
  { label: 'Compliance Check', prompt: 'What compliance docs for importing from ' },
  { label: 'Freight Estimate', prompt: 'Estimate shipping cost from ' },
];

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant', active: true },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

const bottomNavLinks = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs/new', icon: Plus, label: 'Post RFQ', primary: true },
  { href: '/marketplace/inbox', icon: MessageSquare, label: 'Inbox' },
  { href: '/account', icon: User, label: 'Account' },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm your AI Trade Assistant. I can help with:\n\n• HS code classification\n• Compliance requirements\n• Document analysis\n• Trade regulations\n• Duty calculations\n\nHow can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA]">
      {/* Desktop Sidebar - Fixed on left for lg+ screens */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 bg-white border-r border-black/5 shadow-xl z-40">
        {/* Logo */}
        <div className="p-6 border-b border-black/5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center shadow-lg shadow-[#154230]/20">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="12" r="2" fill="currentColor" />
                <circle cx="18" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="6" r="2" fill="currentColor" />
                <circle cx="12" cy="18" r="2" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-[#101111] font-bold text-lg tracking-tight leading-none">LEVERAGE</p>
              <p className="text-[#4A4A4A] text-[10px] tracking-wider mt-0.5">CONNECTING DOTS TO PORTS</p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#154230] text-white shadow-lg shadow-[#154230]/20'
                    : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-black/5">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-[#4A4A4A] hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut className="w-5 h-5" strokeWidth={2} />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar Panel */}
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-slide-in">
            {/* Logo */}
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center shadow-lg shadow-[#154230]/20">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="12" r="2" fill="currentColor" />
                    <circle cx="18" cy="12" r="2" fill="currentColor" />
                    <circle cx="12" cy="6" r="2" fill="currentColor" />
                    <circle cx="12" cy="18" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#101111] font-bold text-lg tracking-tight leading-none">LEVERAGE</p>
                  <p className="text-[#4A4A4A] text-[10px] tracking-wider mt-0.5">CONNECTING DOTS TO PORTS</p>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-9 h-9 bg-[#E6E2DA] rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-[#4A4A4A]" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = link.active;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#154230] text-white shadow-lg shadow-[#154230]/20'
                        : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-black/5">
              <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-[#4A4A4A] hover:bg-red-50 hover:text-red-600 transition-all">
                <LogOut className="w-5 h-5" strokeWidth={2} />
                <span className="font-medium text-sm">Log Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content - Offset for desktop sidebar */}
      <main className="lg:ml-64">
        {/* Mobile Header with Green Gradient */}
        <div className="lg:hidden bg-gradient-to-br from-[#154230] via-[#1d5240] to-[#154230] px-4 pt-6 pb-10 rounded-b-[32px] relative overflow-hidden">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm mb-4"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>

          {/* Logo Row */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#A6824A] rounded-lg flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="6" cy="12" r="2" fill="currentColor" />
                  <circle cx="18" cy="12" r="2" fill="currentColor" />
                  <circle cx="12" cy="6" r="2" fill="currentColor" />
                  <circle cx="12" cy="18" r="2" fill="currentColor" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-tight leading-none">LEVERAGE</p>
                <p className="text-white/50 text-[9px] tracking-wider mt-0.5">CONNECTING DOTS TO PORTS</p>
              </div>
            </div>
            <button className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Bell className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Page Title */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold">AI Trade Assistant</h1>
              <p className="text-white/70 text-sm">Powered by advanced trade intelligence</p>
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-[#E6E2DA] px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#154230] to-[#1d5240] rounded-2xl flex items-center justify-center shadow-lg shadow-[#154230]/20">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-[#101111] text-3xl font-bold">AI Trade Assistant</h1>
                <p className="text-[#4A4A4A] text-base">Powered by advanced trade intelligence</p>
              </div>
            </div>
            <button className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-black/5">
              <Bell className="w-5 h-5 text-[#4A4A4A]" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="px-4 lg:px-8 pb-32 lg:pb-8 -mt-4 lg:mt-0">
          {/* AI Capabilities Bar */}
          <div className="max-w-4xl">
            <div className="bg-white rounded-2xl p-4 shadow-xl shadow-black/5">
              <div className="flex items-center justify-between gap-2 overflow-x-auto hide-scrollbar">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#154230]" />
                  <span className="text-[#101111] text-xs font-semibold whitespace-nowrap">Compliance</span>
                </div>
                <div className="h-5 w-px bg-black/10" />
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#A6824A]" />
                  <span className="text-[#101111] text-xs font-semibold whitespace-nowrap">HS Codes</span>
                </div>
                <div className="h-5 w-px bg-black/10" />
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#5D1E21]" />
                  <span className="text-[#101111] text-xs font-semibold whitespace-nowrap">Trade Routes</span>
                </div>
                <div className="h-5 w-px bg-black/10" />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#154230]" />
                  <span className="text-[#101111] text-xs font-semibold whitespace-nowrap">Duty Calc</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="max-w-4xl mt-4">
            <div className="flex gap-2 overflow-x-auto pb-3 hide-scrollbar">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="flex-shrink-0 px-4 py-2.5 bg-white border border-black/5 rounded-xl text-[#101111] text-xs font-semibold hover:bg-[#E6E2DA] transition-colors shadow-sm whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 inline mr-1.5 text-[#A6824A]" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Container */}
          <div className="max-w-4xl mt-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm shadow-black/5 h-[calc(100vh-420px)] min-h-[400px] max-h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 hide-scrollbar">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-[#154230] text-white rounded-br-md'
                          : 'bg-[#E6E2DA] text-[#101111] rounded-bl-md'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-[#154230] flex items-center justify-center">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-[#101111] font-semibold text-xs">AI Assistant</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#E6E2DA] rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#154230] flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-[#A6824A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-[#A6824A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-[#A6824A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="bg-[#F7F6F2] border-2 border-transparent rounded-xl p-1 focus-within:border-[#A6824A] transition-colors">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about HS codes, duties, compliance..."
                    className="flex-1 h-11 px-4 bg-transparent text-[#101111] placeholder-[#4A4A4A] focus:outline-none text-sm font-medium"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-11 h-11 bg-[#154230] text-white rounded-lg flex items-center justify-center hover:bg-[#1d5240] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#154230]/20"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="max-w-4xl mt-4">
            <div className="bg-[#5D1E21] rounded-2xl p-4 shadow-lg shadow-[#5D1E21]/20">
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-bold leading-tight">24/7</p>
                  <p className="text-white/60 text-[10px]">AI Available</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-bold leading-tight">10K+</p>
                  <p className="text-white/60 text-[10px]">HS Codes</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-bold leading-tight">140+</p>
                  <p className="text-white/60 text-[10px]">Countries</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1.5">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white text-sm font-bold leading-tight">98%</p>
                  <p className="text-white/60 text-[10px]">Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation - Hidden on desktop */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-2 pb-6 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {bottomNavLinks.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/ai';
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${isActive ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${item.primary ? 'bg-[#154230] shadow-lg shadow-[#154230]/30' : isActive ? 'bg-[#154230] shadow-lg shadow-[#154230]/30' : ''}`}>
                  <Icon className={`w-5 h-5 ${item.primary ? 'text-white' : isActive ? 'text-white' : ''}`} strokeWidth={item.primary ? 2.5 : 2} />
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
