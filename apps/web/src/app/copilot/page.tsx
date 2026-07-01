'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Bot, Globe, Sparkles, Send, Layers, Check, CreditCard, BarChart3,
  ShoppingCart, TrendingUp, Truck, FileText, Users, MessageCircle, Phone, Lock,
  Mic, Menu, X, Zap, ChevronRight
} from 'lucide-react';

// ============================================================================
// FUTURISTIC COPILOT - GLASSMORPHISM DESIGN
// ============================================================================

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface QuickAction {
  label: string;
  command: string;
  color: string;
}

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Welcome to LEVERGE Copilot ✨

I'm your AI-powered trade assistant. Tell me what you need.

Try:
• "What are my sales?"
• "I want to buy cotton shirts from Vietnam"
• "Track shipment MSC123"
• "Generate invoice"

How can I help?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState<{ agent: string; task: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, workflowSteps]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // ============================================================================
  // INTENT ENGINE
  // ============================================================================

  const identifyIntent = (text: string): { intent: string; category: string } => {
    const lower = text.toLowerCase();

    if (lower.match(/what are my sales|my sales|sales this month|revenue/i)) {
      return { intent: 'analytics_sales', category: 'Analytics' };
    }
    if (lower.match(/outstanding|invoice.*due|overdue|show.*invoice/i)) {
      return { intent: 'finance_outstanding', category: 'Finance' };
    }
    if (lower.match(/buy|import.*from/i)) {
      return { intent: 'buy', category: 'Commerce' };
    }
    if (lower.match(/sell|export.*to|sell.*to/i)) {
      return { intent: 'sell', category: 'Commerce' };
    }
    if (lower.match(/track|shipment|where is/i)) {
      return { intent: 'track', category: 'Logistics' };
    }
    if (lower.match(/invoice|generate.*doc/i)) {
      return { intent: 'invoice', category: 'Documents' };
    }
    if (lower.match(/supplier|which.*most|best supplier/i)) {
      return { intent: 'supplier', category: 'Analytics' };
    }
    if (lower.match(/compare|year.*vs|growth/i)) {
      return { intent: 'compare', category: 'Analytics' };
    }
    if (lower.match(/book.*freight|cheapest|shipping/i)) {
      return { intent: 'freight', category: 'Logistics' };
    }
    if (lower.match(/escrow|payment protection/i)) {
      return { intent: 'escrow', category: 'Finance' };
    }
    if (lower.match(/call|answer.*phone/i)) {
      return { intent: 'call', category: 'Comms' };
    }
    if (lower.match(/repeat|duplicate|last.*order/i)) {
      return { intent: 'repeat', category: 'Memory' };
    }
    if (lower.match(/yes|yeah|confirm|proceed|approve/i)) {
      return { intent: 'confirm', category: 'Confirmation' };
    }

    return { intent: 'general', category: 'General' };
  };

  // ============================================================================
  // RESPONSE GENERATOR
  // ============================================================================

  const getResponse = (intent: string): { steps: { agent: string; task: string }[]; response: string } => {
    const responses: Record<string, { steps: { agent: string; task: string }[]; response: string }> = {
      analytics_sales: {
        steps: [
          { agent: 'TwinOS', task: 'Loading merchant profile...' },
          { agent: 'Analytics Engine', task: 'Fetching sales data...' },
          { agent: 'MemoryOS', task: 'Compiling insights...' },
        ],
        response: `📊 Your Sales Performance

This Month: $1.28M (+18% ↑)
Last Month: $1.08M

Top Products:
1. Cotton Shirts - $520K (41%)
2. Denim Jeans - $310K (24%)
3. Polo T-Shirts - $180K (14%)

Top Markets:
• Germany - $420K
• UAE - $380K
• France - $280K`,
      },
      finance_outstanding: {
        steps: [
          { agent: 'Finance Agent', task: 'Scanning invoices...' },
          { agent: 'MemoryOS', task: 'Checking payment history...' },
        ],
        response: `💰 Outstanding Invoices

Total: $67,000

• ABC Retail GmbH: $45,000 (15 days overdue)
• Berlin Fashion: $22,000 (3 days overdue)

Recent:
• Paris Mode SA: $38,000 ✓ Paid
• Dubai Traders: $52,000 ✓ Paid

Send payment reminders?`,
      },
      buy: {
        steps: [
          { agent: 'TwinOS', task: 'Loading preferences...' },
          { agent: 'MemoryOS', task: 'Checking past suppliers...' },
          { agent: 'Global Nexha', task: 'Searching Vietnam suppliers...' },
          { agent: 'Negotiation Agent', task: 'Preparing strategy...' },
          { agent: 'Compliance Agent', task: 'Checking regulations...' },
          { agent: 'Finance Agent', task: 'Setting up payment...' },
          { agent: 'Logistics Agent', task: 'Calculating freight...' },
        ],
        response: `🛒 Purchase Order Ready

Product: 10,000 Cotton Shirts
Supplier: Vietnam Textiles Ltd ⭐
Price: $3.15/unit
Total: $31,500

✅ HS Code: 6205.20 (12% duty)
✅ Escrow: Ready to fund
✅ Freight: MSC, 18 days

Shall I proceed with order?`,
      },
      sell: {
        steps: [
          { agent: 'Export Agent', task: 'Analyzing market...' },
          { agent: 'Global Nexha', task: 'Finding UAE buyers...' },
          { agent: 'Pricing Agent', task: 'Setting prices...' },
        ],
        response: `📦 Export Opportunity

Market: UAE
Demand: 50,000 units/month

Top Buyers:
1. Dubai Food Trading LLC
2. Abu Dhabi Organic Market
3. Sharjah Retail Group

Ready to create offers?`,
      },
      track: {
        steps: [
          { agent: 'Logistics Agent', task: 'Connecting to MSC...' },
          { agent: 'Global Nexha', task: 'Fetching location...' },
          { agent: 'MemoryOS', task: 'Updating timeline...' },
        ],
        response: `🚢 Shipment Status

Container: MSCKU123456
Vessel: Maersk Everest

📍 Location: Singapore Port
⏱ ETA: July 18, 2026

Milestones:
✅ Order confirmed
✅ Payment received
✅ Loaded vessel
🔄 In transit
⏳ Customs pending`,
      },
      invoice: {
        steps: [
          { agent: 'Documentation Agent', task: 'Loading template...' },
          { agent: 'MemoryOS', task: 'Fetching order data...' },
          { agent: 'Documentation Agent', task: 'Generating PDF...' },
        ],
        response: `📄 Documents Generated

✅ Commercial Invoice #INV-2026-5432
✅ Packing List
✅ Bill of Lading
✅ Certificate of Origin

Download ready in Documents section.`,
      },
      supplier: {
        steps: [
          { agent: 'MemoryOS', task: 'Analyzing supplier data...' },
          { agent: 'Analytics Engine', task: 'Calculating rankings...' },
        ],
        response: `🏭 Top Supplier by Revenue

Vietnam Textiles Ltd
Revenue: $2.4M (12 months)
Orders: 23 successful
Success Rate: 95%
Avg Delivery: 17 days

View full supplier analysis?`,
      },
      confirm: {
        steps: [
          { agent: 'SUTAR', task: 'Executing order...' },
          { agent: 'Finance Agent', task: 'Funding escrow...' },
          { agent: 'Documentation Agent', task: 'Finalizing docs...' },
          { agent: 'Logistics Agent', task: 'Booking vessel...' },
        ],
        response: `✅ ORDER CONFIRMED!

Order #5432 is now active.

🔒 Escrow: $31,500 secured
📋 Documents: Invoice, PL, BL, COO
🚢 Shipping: MSC booked
📍 ETA: July 18, 2026

I'll keep you updated on progress.`,
      },
      freight: {
        steps: [
          { agent: 'Logistics Agent', task: 'Comparing carriers...' },
          { agent: 'Global Nexha', task: 'Checking rates...' },
        ],
        response: `🚢 Freight Options

1. MSC Ocean - $4,200 ⭐
   Transit: 18 days

2. Maersk - $4,600
   Transit: 16 days

3. CMA CGM - $4,850
   Transit: 15 days

Book MSC at $4,200?`,
      },
    };

    return responses[intent] || {
      steps: [{ agent: 'SUTAR', task: 'Processing request...' }],
      response: 'I can help with sales, buying, selling, tracking, documents, and more. What would you like to do?'
    };
  };

  // ============================================================================
  // PROCESS COMMAND
  // ============================================================================

  const processCommand = async (command: string) => {
    if (!command.trim()) return;

    setIsProcessing(true);
    setShowWorkflow(true);
    setWorkflowSteps([]);
    setCurrentStep(-1);

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: command }]);
    setInput('');

    await delay(600);

    const { intent, category } = identifyIntent(command);
    const { steps, response } = getResponse(intent);
    setWorkflowSteps(steps);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await delay(800);
    }

    await delay(400);

    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);

    setShowWorkflow(false);
    setWorkflowSteps([]);
    setCurrentStep(-1);
    setIsProcessing(false);
  };

  // ============================================================================
  // QUICK ACTIONS
  // ============================================================================

  const quickActions: QuickAction[] = [
    { label: '💰 Outstanding', command: 'Show outstanding invoices', color: '#CA8A04' },
    { label: '📊 Sales', command: 'What are my sales this month?', color: '#16A34A' },
    { label: '🛒 Buy', command: 'I want to buy cotton shirts from Vietnam', color: '#0891B2' },
    { label: '📦 Sell', command: 'I want to sell tea to UAE', color: '#7C3AED' },
    { label: '🚢 Track', command: 'Track shipment MSCKU123456', color: '#154230' },
    { label: '📄 Invoice', command: 'Generate invoice for order #5432', color: '#A6824A' },
  ];

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#030712' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #0891B2 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #A6824A 0%, transparent 70%)' }} />
      </div>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden" style={{ backgroundColor: 'rgba(3,7,18,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#154230' }}>
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</span>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed inset-0 z-40 pt-16 md:hidden"
            style={{ backgroundColor: 'rgba(3,7,18,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="p-4 space-y-4">
              <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-sm font-medium mb-3" style={{ color: '#666' }}>Organization</div>
                {['TwinOS', 'MemoryOS', 'SkillOS', 'SUTAR', 'Nexha'].map(org => (
                  <div key={org} className="flex items-center gap-2 p-2 rounded-lg" style={{ color: 'white' }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#16A34A' }} />
                    {org}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl" style={{ backgroundColor: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)' }}>
                <div className="text-sm font-medium mb-2" style={{ color: '#7C3AED' }}>Global Nexha</div>
                <div className="text-xs" style={{ color: '#666' }}>50,000+ suppliers • 1,200+ carriers</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col shrink-0 relative" style={{ backgroundColor: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(20px)' }}>
        <div className="p-6 space-y-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #154230, #1a5a3a)', boxShadow: '0 0 30px rgba(21,66,48,0.5)' }}>
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</span>
              <div className="text-xs" style={{ color: '#666' }}>AI Copilot</div>
            </div>
          </Link>

          {/* Organization */}
          <div>
            <div className="text-xs uppercase mb-3 tracking-wider" style={{ color: '#666' }}>Organization</div>
            <div className="space-y-2">
              {[
                { name: 'TwinOS', color: '#0891B2', glow: 'rgba(8,145,178,0.3)' },
                { name: 'MemoryOS', color: '#7C3AED', glow: 'rgba(124,58,237,0.3)' },
                { name: 'SkillOS', color: '#A6824A', glow: 'rgba(166,130,74,0.3)' },
                { name: 'SUTAR', color: '#0891B2', glow: 'rgba(8,145,178,0.3)' },
                { name: 'Nexha', color: '#7C3AED', glow: 'rgba(124,58,237,0.3)' },
              ].map(org => (
                <motion.div
                  key={org.name}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                  style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: org.glow }}>
                    <Brain className="w-4 h-4" style={{ color: org.color }} />
                  </div>
                  <span className="text-sm" style={{ color: 'white' }}>{org.name}</span>
                  <div className="w-2 h-2 rounded-full ml-auto" style={{ backgroundColor: '#16A34A', boxShadow: '0 0 10px #16A34A' }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Global Nexha */}
          <div className="p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(124,58,237,0.05))', border: '1px solid rgba(124,58,237,0.3)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5" style={{ color: '#7C3AED' }} />
              <span className="text-sm font-medium" style={{ color: '#7C3AED' }}>Global Nexha</span>
            </div>
            <div className="space-y-2 text-xs" style={{ color: '#666' }}>
              <div className="flex justify-between"><span>Suppliers</span><span style={{ color: '#7C3AED' }}>50,000+</span></div>
              <div className="flex justify-between"><span>Carriers</span><span style={{ color: '#7C3AED' }}>1,200+</span></div>
              <div className="flex justify-between"><span>Banks</span><span style={{ color: '#7C3AED' }}>200+</span></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col relative pt-14 md:pt-0">
        {/* Header */}
        <header className="shrink-0" style={{ backgroundColor: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center justify-between p-4 md:p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0891B2, #7C3AED)', boxShadow: '0 0 20px rgba(8,145,178,0.3)' }}>
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg" style={{ color: 'white' }}>LEVERGE Copilot</h1>
                <p className="text-xs" style={{ color: '#666' }}>Powered by HOJAI AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(22,163,74,0.2)' }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#16A34A' }} />
                <span className="text-xs font-medium" style={{ color: '#16A34A' }}>Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[85%] md:max-w-xl px-5 py-4"
                style={{
                  backgroundColor: msg.role === 'user' ? 'rgba(21,66,48,0.8)' : 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(10px)',
                  border: msg.role === 'user' ? '1px solid rgba(21,66,48,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: msg.role === 'user' ? '1.5rem 1.5rem 0.5rem 1.5rem' : '1.5rem 1.5rem 1.5rem 0.5rem',
                  boxShadow: msg.role === 'user' ? '0 0 30px rgba(21,66,48,0.3)' : 'none',
                }}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" style={{ color: '#0891B2' }} />
                    <span className="text-xs font-medium" style={{ color: '#0891B2' }}>Copilot</span>
                  </div>
                )}
                <div className="whitespace-pre-line text-sm md:text-base leading-relaxed" style={{ color: 'white' }}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Workflow Animation */}
          {showWorkflow && workflowSteps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 md:p-6 rounded-2xl"
              style={{ backgroundColor: 'rgba(8,145,178,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(8,145,178,0.3)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(8,145,178,0.2)' }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: '#0891B2' }} />
                </motion.div>
                <div>
                  <div className="font-medium" style={{ color: '#0891B2' }}>Coordinating Organization</div>
                  <div className="text-xs" style={{ color: '#666' }}>{currentStep + 1} of {workflowSteps.length} agents active</div>
                </div>
              </div>

              <div className="space-y-2">
                {workflowSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      backgroundColor: i <= currentStep ? 'rgba(22,163,74,0.15)' : 'rgba(0,0,0,0.3)',
                      border: i === currentStep ? '1px solid rgba(8,145,178,0.5)' : '1px solid transparent',
                    }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: i <= currentStep ? '#16A34A' : 'rgba(255,255,255,0.1)' }}>
                      {i < currentStep ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : i === currentStep ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                          <Bot className="w-4 h-4 text-white" />
                        </motion.div>
                      ) : (
                        <span className="text-xs" style={{ color: '#666' }}>{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: i <= currentStep ? 'white' : '#666' }}>{step.agent}</div>
                      <div className="text-xs truncate" style={{ color: '#888' }}>{step.task}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-2 md:px-6 md:pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickActions.map(action => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => processCommand(action.command)}
                className="px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 transition-all"
                style={{ backgroundColor: `${action.color}20`, border: `1px solid ${action.color}40`, color: action.color }}
              >
                {action.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(20px)' }}>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && processCommand(input)}
                placeholder="Tell me what you need..."
                className="w-full px-5 py-4 rounded-2xl text-white placeholder-gray-500 outline-none"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <Mic className="w-5 h-5" style={{ color: '#666' }} />
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => processCommand(input)}
              disabled={!input.trim() || isProcessing}
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #154230, #1a5a3a)', boxShadow: '0 0 30px rgba(21,66,48,0.5)' }}
            >
              {isProcessing ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <Send className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}
