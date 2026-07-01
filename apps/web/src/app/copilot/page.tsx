'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Bot, Globe, Sparkles, Send, Layers, Check, Mic, Menu, X, Zap
} from 'lucide-react';

// ============================================================================
// CYBERPUNK COPILOT - ULTRA FUTURISTIC
// ============================================================================

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const quickActions = [
  { label: '💰 Outstanding', command: 'Show outstanding invoices', color: '#FFD700' },
  { label: '📊 Sales', command: 'What are my sales this month?', color: '#00FF88' },
  { label: '🛒 Buy', command: 'I want to buy cotton shirts from Vietnam', color: '#00D4FF' },
  { label: '📦 Sell', command: 'I want to sell tea to UAE', color: '#FF00FF' },
  { label: '🚢 Track', command: 'Track shipment MSCKU123456', color: '#FF6B00' },
  { label: '📄 Invoice', command: 'Generate invoice for order #5432', color: '#A6824A' },
];

const responses: Record<string, { steps: string[]; response: string }> = {
  outstanding: {
    steps: ['Finance Agent scanning...', 'MemoryOS checking history...', 'Compiling results...'],
    response: `💰 OUTSTANDING INVOICES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Outstanding: $67,000
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 ABC Retail GmbH
   Amount: $45,000
   Status: 15 days overdue
   Contact: +49 30 123456

🟡 Berlin Fashion
   Amount: $22,000
   Status: 3 days overdue
   Contact: +49 30 654321

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ RECENT PAYMENTS
• Paris Mode SA: $38,000 ✓
• Dubai Traders: $52,000 ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Send payment reminders?`
  },
  sales: {
    steps: ['TwinOS loading...', 'Analytics engine processing...', 'MemoryOS compiling...'],
    response: `📊 SALES PERFORMANCE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THIS MONTH: $1.28M (+18% ↑)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏆 TOP PRODUCTS
1. Cotton Shirts - $520K (41%)
2. Denim Jeans - $310K (24%)
3. Polo T-Shirts - $180K (14%)

🌍 TOP MARKETS
• Germany - $420K
• UAE - $380K
• France - $280K

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Growth vs Last Year: +30%`
  },
  buy: {
    steps: ['TwinOS loading...', 'MemoryOS checking history...', 'Global Nexha searching...', 'Negotiation Agent...', 'Compliance Agent...', 'Finance Agent...', 'Logistics Agent...'],
    response: `🛒 PURCHASE ORDER READY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER #5432 - DRAFT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product: 10,000 Cotton Shirts
Supplier: Vietnam Textiles Ltd ⭐
Price: $3.15/unit
Total: $31,500

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ HS Code: 6205.20 (12% duty)
✅ Escrow: Ready to fund
✅ Freight: MSC, 18 days

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Shall I proceed with order?`
  },
};

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: `✨ LEVERGE COPILOT ACTIVE

I'm your AI-powered trade assistant.

Try any command or click below:

• "What are my sales?"
• "Show outstanding invoices"
• "I want to buy cotton shirts"

How can I help?` },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, workflowSteps]);
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const identifyCommand = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('outstanding') || lower.includes('invoice due') || lower.includes('overdue')) return 'outstanding';
    if (lower.includes('sales') || lower.includes('revenue')) return 'sales';
    if (lower.includes('buy') || lower.includes('purchase') || lower.includes('import')) return 'buy';
    if (lower.includes('track') || lower.includes('shipment')) return 'track';
    return 'sales';
  };

  const processCommand = async (command: string) => {
    if (!command.trim()) return;
    setIsProcessing(true);
    setShowWorkflow(true);
    setWorkflowSteps([]);
    setCurrentStep(-1);

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: command }]);
    setInput('');

    await delay(500);
    const key = identifyCommand(command);
    const data = responses[key] || responses.sales;
    setWorkflowSteps(data.steps);

    for (let i = 0; i < data.steps.length; i++) {
      setCurrentStep(i);
      await delay(700);
    }

    await delay(300);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.response }]);
    setShowWorkflow(false);
    setWorkflowSteps([]);
    setCurrentStep(-1);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#050510' }}>
      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        <motion.div
          animate={{ x: ['-100%', '100%'], y: ['-100%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: ['100%', '-100%'], y: ['100%', '-100%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,0,255,0.1) 0%, transparent 70%)' }}
        />
      </div>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3" style={{ backgroundColor: 'rgba(5,5,16,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 20px rgba(0,212,255,0.5)' }}>
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold" style={{ color: '#00D4FF' }}>LEVERGE</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="md:hidden fixed inset-0 z-40 pt-16"
            style={{ backgroundColor: 'rgba(5,5,16,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="p-4 space-y-4">
              {['TwinOS', 'MemoryOS', 'SkillOS', 'SUTAR', 'Nexha'].map((item, i) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00FF88', boxShadow: '0 0 10px #00FF88' }} />
                  <span style={{ color: 'white' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col shrink-0 relative" style={{ backgroundColor: 'rgba(5,5,16,0.8)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(0,212,255,0.2)' }}>
        <div className="p-6 space-y-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}>
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold" style={{ color: '#00D4FF' }}>LEVERGE</span>
              <div className="text-xs" style={{ color: '#666' }}>AI Copilot</div>
            </div>
          </Link>

          <div>
            <div className="text-xs uppercase mb-3" style={{ color: '#666' }}>Organization</div>
            <div className="space-y-2">
              {['TwinOS', 'MemoryOS', 'SkillOS', 'SUTAR', 'Nexha'].map((item, i) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer"
                  style={{ backgroundColor: 'rgba(0,212,255,0.05)' }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(0,212,255,0.2)' }}>
                    <Brain className="w-4 h-4" style={{ color: '#00D4FF' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'white' }}>{item}</span>
                  <div className="w-2 h-2 rounded-full ml-auto" style={{ backgroundColor: '#00FF88', boxShadow: '0 0 10px #00FF88' }} />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(255,0,255,0.1), rgba(0,212,255,0.1))', border: '1px solid rgba(255,0,255,0.3)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5" style={{ color: '#FF00FF' }} />
              <span className="text-sm font-medium" style={{ color: '#FF00FF' }}>Global Nexha</span>
            </div>
            <div className="space-y-1 text-xs" style={{ color: '#888' }}>
              <div className="flex justify-between"><span>Suppliers</span><span style={{ color: '#FF00FF' }}>50,000+</span></div>
              <div className="flex justify-between"><span>Carriers</span><span style={{ color: '#FF00FF' }}>1,200+</span></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col relative pt-14 md:pt-0">
        {/* Header */}
        <header className="shrink-0" style={{ backgroundColor: 'rgba(5,5,16,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,212,255,0.2)' }}>
          <div className="flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 20px rgba(0,212,255,0.4)' }}>
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold" style={{ color: 'white' }}>LEVERGE Copilot</h1>
                <p className="text-xs" style={{ color: '#666' }}>Powered by HOJAI AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00FF88', boxShadow: '0 0 10px #00FF88' }} />
              <span className="text-xs font-medium" style={{ color: '#00FF88' }}>ONLINE</span>
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
                className="max-w-[90%] md:max-w-xl px-5 py-4"
                style={{
                  backgroundColor: msg.role === 'user' ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  border: msg.role === 'user' ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  boxShadow: msg.role === 'user' ? '0 0 30px rgba(0,212,255,0.2)' : 'none',
                }}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" style={{ color: '#00D4FF' }} />
                    <span className="text-xs font-medium" style={{ color: '#00D4FF' }}>COPILOT</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm leading-relaxed" style={{ fontFamily: 'monospace', color: 'white' }}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Workflow */}
          {showWorkflow && workflowSteps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 md:p-6 rounded-2xl"
              style={{ backgroundColor: 'rgba(0,212,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.3)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(0,212,255,0.2)' }}
                >
                  <Zap className="w-5 h-5" style={{ color: '#00D4FF' }} />
                </motion.div>
                <div>
                  <div className="font-medium" style={{ color: '#00D4FF' }}>COORDINATING</div>
                  <div className="text-xs" style={{ color: '#666' }}>{currentStep + 1} / {workflowSteps.length} agents active</div>
                </div>
              </div>

              <div className="space-y-2">
                {workflowSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      backgroundColor: i <= currentStep ? 'rgba(0,255,136,0.1)' : 'rgba(0,0,0,0.3)',
                      border: i === currentStep ? '1px solid #00D4FF' : '1px solid transparent',
                    }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: i <= currentStep ? '#00FF88' : 'rgba(255,255,255,0.1)' }}>
                      {i < currentStep ? (
                        <Check className="w-4 h-4 text-black" />
                      ) : i === currentStep ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                          <Bot className="w-4 h-4 text-black" />
                        </motion.div>
                      ) : (
                        <span className="text-xs" style={{ color: '#666' }}>{i + 1}</span>
                      )}
                    </div>
                    <span className="text-sm font-mono" style={{ color: i <= currentStep ? 'white' : '#666' }}>{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-2 md:px-6 md:pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActions.map(action => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => processCommand(action.command)}
                className="px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 font-medium"
                style={{ backgroundColor: `${action.color}20`, border: `1px solid ${action.color}50`, color: action.color }}
              >
                {action.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 border-t" style={{ backgroundColor: 'rgba(5,5,16,0.9)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,212,255,0.2)' }}>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && processCommand(input)}
              placeholder="Enter command..."
              className="flex-1 px-5 py-4 rounded-2xl text-white placeholder-gray-600 outline-none font-mono text-sm"
              style={{ backgroundColor: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => processCommand(input)}
              disabled={!input.trim() || isProcessing}
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}
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
