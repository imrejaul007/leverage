'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Bot, Globe, Sparkles, Send, Layers, Check, Mic, Menu, X, Zap,
  Bell, Plus, Image, Paperclip, ChevronDown, Volume2, Settings, Activity
} from 'lucide-react';

// ============================================================================
// ULTRA FUTURISTIC COPILOT - ALL FEATURES
// ============================================================================

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hasButtons?: boolean;
  buttons?: { label: string; action: string; color: string }[];
  type?: 'notification' | 'normal';
}

interface Notification {
  id: string;
  message: string;
  icon: string;
  time: string;
}

interface Stats {
  activeOrders: number;
  pending: number;
  revenueToday: string;
  unreadMessages: number;
}

// Sound effects (simulated)
const playSound = (type: 'click' | 'notify') => {
  // In production, use actual audio files
  console.log(`🔊 Sound: ${type}`);
};

export default function CopilotPage() {
  // States
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: `✨ LEVERGE COPILOT ONLINE

━━━━━━━━━━━━━━━━━━━━━━━━━

Your AI-powered trade assistant is ready.

Quick commands:
• "What are my sales?"
• "Show outstanding invoices"
• "I want to buy cotton shirts"

Or click any quick action below.` },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Stats
  const [stats] = useState<Stats>({
    activeOrders: 12,
    pending: 3,
    revenueToday: '$45.2K',
    unreadMessages: 7,
  });

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, workflowSteps, isTyping]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // ============================================================================
  // COMMANDS & RESPONSES
  // ============================================================================

  const responses: Record<string, { steps: string[]; response: string; hasButtons?: boolean; buttons?: Message['buttons'] }> = {
    sales: {
      steps: ['TwinOS loading...', 'Analytics engine...', 'MemoryOS compiling...'],
      response: `📊 SALES PERFORMANCE

━━━━━━━━━━━━━━━━━━━━━━━━━
THIS MONTH: $1.28M (+18% ↑)
━━━━━━━━━━━━━━━━━━━━━━━━━

🏆 TOP PRODUCTS
1. Cotton Shirts - $520K (41%)
2. Denim Jeans - $310K (24%)
3. Polo T-Shirts - $180K (14%)

🌍 TOP MARKETS
• Germany - $420K
• UAE - $380K
• France - $280K

━━━━━━━━━━━━━━━━━━━━━━━━━`,
      hasButtons: true,
      buttons: [
        { label: '📈 Full Report', action: 'full_report', color: '#00D4FF' },
        { label: '📊 Compare', action: 'compare', color: '#FF00FF' },
      ],
    },
    outstanding: {
      steps: ['Finance Agent scanning...', 'MemoryOS checking...', 'Compiling...'],
      response: `💰 OUTSTANDING INVOICES

━━━━━━━━━━━━━━━━━━━━━━━━━
Total: $67,000
━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 ABC Retail GmbH
   $45,000 | 15 days overdue

🟡 Berlin Fashion
   $22,000 | 3 days overdue

✅ RECENT PAYMENTS
• Paris Mode SA: $38,000 ✓
• Dubai Traders: $52,000 ✓

━━━━━━━━━━━━━━━━━━━━━━━━━`,
      hasButtons: true,
      buttons: [
        { label: '🔔 Send Reminders', action: 'send_reminders', color: '#FFD700' },
        { label: '💰 Details', action: 'details', color: '#00FF88' },
      ],
    },
    buy: {
      steps: ['TwinOS loading...', 'MemoryOS checking...', 'Global Nexha...', 'Negotiation...', 'Compliance...', 'Finance...', 'Logistics...'],
      response: `🛒 PURCHASE ORDER READY

━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER #5432 - DRAFT
━━━━━━━━━━━━━━━━━━━━━━━━━

Product: 10,000 Cotton Shirts
Supplier: Vietnam Textiles Ltd ⭐
Price: $3.15/unit
Total: $31,500

✅ HS Code: 6205.20 (12% duty)
✅ Escrow: Ready
✅ Freight: MSC, 18 days

━━━━━━━━━━━━━━━━━━━━━━━━━`,
      hasButtons: true,
      buttons: [
        { label: '✅ Yes, Proceed', action: 'proceed', color: '#00FF88' },
        { label: '✏️ Modify', action: 'modify', color: '#FFD700' },
        { label: '❌ Cancel', action: 'cancel', color: '#FF6B00' },
      ],
    },
    sell: {
      steps: ['Export Agent...', 'Global Nexha...', 'Pricing Agent...'],
      response: `📦 EXPORT OPPORTUNITY

━━━━━━━━━━━━━━━━━━━━━━━━━
Market: UAE
━━━━━━━━━━━━━━━━━━━━━━━━━

Top Buyers:
1. Dubai Food Trading LLC ⭐
2. Abu Dhabi Organic Market
3. Sharjah Retail Group

Demand: 50,000 units/month

━━━━━━━━━━━━━━━━━━━━━━━━━`,
      hasButtons: true,
      buttons: [
        { label: '📤 Create Offers', action: 'create_offers', color: '#00D4FF' },
        { label: '📋 Details', action: 'details', color: '#FF00FF' },
      ],
    },
    track: {
      steps: ['Logistics Agent...', 'Global Nexha...', 'MemoryOS...'],
      response: `🚢 SHIPMENT STATUS

━━━━━━━━━━━━━━━━━━━━━━━━━
Container: MSCKU123456
Vessel: Maersk Everest
━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Singapore Port
⏱ ETA: July 18, 2026

✅ Confirmed → ✅ Paid → ✅ Loaded
→ In Transit → ⏳ Customs

━━━━━━━━━━━━━━━━━━━━━━━━━`,
    },
    invoice: {
      steps: ['Documentation Agent...', 'MemoryOS...', 'Generating...'],
      response: `📄 DOCUMENTS GENERATED

━━━━━━━━━━━━━━━━━━━━━━━━━
Order #5432
━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Commercial Invoice
✅ Packing List
✅ Bill of Lading
✅ Certificate of Origin

Download ready ✓

━━━━━━━━━━━━━━━━━━━━━━━━━`,
    },
    supplier: {
      steps: ['MemoryOS analyzing...', 'Analytics...'],
      response: `🏭 TOP SUPPLIER

━━━━━━━━━━━━━━━━━━━━━━━━━
Vietnam Textiles Ltd
━━━━━━━━━━━━━━━━━━━━━━━━━

Revenue: $2.4M (12 months)
Orders: 23 successful
Success Rate: 95% ⭐
Avg Delivery: 17 days

━━━━━━━━━━━━━━━━━━━━━━━━━`,
    },
    compare: {
      steps: ['Analytics comparing...', 'MemoryOS...'],
      response: `📈 COMPARISON

━━━━━━━━━━━━━━━━━━━━━━━━━
2025: $8.2M
2026 YTD: $10.7M
━━━━━━━━━━━━━━━━━━━━━━━━━

GROWTH: +30% ↑↑

Exports: +42%
Domestic: +15%

Top Markets Growth:
• Germany: +38%
• UAE: +45%

━━━━━━━━━━━━━━━━━━━━━━━━━`,
    },
    repeat: {
      steps: ['MemoryOS searching...', 'Order found...', 'Duplicating...'],
      response: `🔄 LAST ORDER FOUND

━━━━━━━━━━━━━━━━━━━━━━━━━
Order #2341 (March 2026)
━━━━━━━━━━━━━━━━━━━━━━━━━

Supplier: Vietnam Textiles Ltd
Product: Cotton Shirts 8,000 units
Price: $26,400
Delivery: 17 days
Status: Completed ✓

━━━━━━━━━━━━━━━━━━━━━━━━━`,
      hasButtons: true,
      buttons: [
        { label: '🔄 Duplicate Order', action: 'duplicate', color: '#00D4FF' },
      ],
    },
    call: {
      steps: ['Voice Agent...', 'Answering...', 'Transcribing...'],
      response: `📞 VOICE AGENT ACTIVE

━━━━━━━━━━━━━━━━━━━━━━━━━
Call: Vietnam Textiles Ltd
━━━━━━━━━━━━━━━━━━━━━━━━━

Agent: "Hello, this is ABC's
AI Trade Assistant..."

CALL SUMMARY:
• Delivery confirmation request
• July 18 confirmed
• Email sent to buyer

Task created ✓

━━━━━━━━━━━━━━━━━━━━━━━━━`,
    },
  };

  const scenarios = [
    { id: 'import', name: 'Import Cotton', icon: '🛒', desc: '10,000 shirts from Vietnam' },
    { id: 'export', name: 'Export Textiles', icon: '📦', desc: 'Tea to UAE market' },
    { id: 'track', name: 'Track Shipment', icon: '🚢', desc: 'Live tracking demo' },
    { id: 'invoice', name: 'Generate Docs', icon: '📄', desc: 'Export documents' },
  ];

  // ============================================================================
  // INTENT ENGINE
  // ============================================================================

  const identifyCommand = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes('outstanding') || lower.includes('overdue') || lower.includes('show') && lower.includes('invoice')) return 'outstanding';
    if (lower.includes('sales') || lower.includes('revenue') || lower.includes('my sales')) return 'sales';
    if (lower.includes('buy') || lower.includes('purchase') || lower.includes('import')) return 'buy';
    if (lower.includes('sell') || lower.includes('export') || lower.includes('uae')) return 'sell';
    if (lower.includes('track') || lower.includes('shipment')) return 'track';
    if (lower.includes('invoice') || lower.includes('document') || lower.includes('generate')) return 'invoice';
    if (lower.includes('supplier') || lower.includes('vendor')) return 'supplier';
    if (lower.includes('compare') || lower.includes('growth') || lower.includes('year')) return 'compare';
    if (lower.includes('repeat') || lower.includes('duplicate') || lower.includes('last')) return 'repeat';
    if (lower.includes('call') || lower.includes('phone') || lower.includes('voice')) return 'call';
    return 'sales';
  };

  // ============================================================================
  // PROCESS COMMAND
  // ============================================================================

  const processCommand = async (command: string) => {
    if (!command.trim()) return;
    playSound('click');
    setIsProcessing(true);
    setShowWorkflow(true);
    setWorkflowSteps([]);
    setCurrentStep(-1);

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: command }]);
    setInput('');
    setIsTyping(true);

    await delay(500);

    const key = identifyCommand(command);
    const data = responses[key] || responses.sales;
    setWorkflowSteps(data.steps);

    for (let i = 0; i < data.steps.length; i++) {
      setCurrentStep(i);
      await delay(700);
    }

    await delay(300);
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: data.response,
      hasButtons: data.hasButtons,
      buttons: data.buttons,
    }]);

    // Add notification
    addNotification('New data loaded', '📊');

    setShowWorkflow(false);
    setWorkflowSteps([]);
    setCurrentStep(-1);
    setIsProcessing(false);
  };

  const handleButtonClick = (action: string) => {
    playSound('click');
    const actionResponses: Record<string, string> = {
      proceed: '✅ Order #5432 CONFIRMED!\n\n🔒 Escrow: $31,500 secured\n📋 Docs: All generated\n🚢 Shipping: MSC booked\n\nOrder is now ACTIVE!',
      modify: '✏️ What would you like to modify?\n\n• Quantity\n• Supplier\n• Price\n• Delivery date',
      cancel: '❌ Order cancelled.\n\nNo charges applied.',
      send_reminders: '🔔 Payment reminders sent!\n\n• ABC Retail: Reminder #1\n• Berlin Fashion: Reminder #1\n\nAwaiting response.',
      create_offers: '📤 Export offers created!\n\n• Dubai Food Trading LLC\n• Abu Dhabi Organic Market\n• Sharjah Retail Group\n\nAwaiting responses.',
      duplicate: '🔄 Order #5433 created!\n\nBased on Order #2341\n\nReady for review.',
      full_report: '📈 Full Sales Report Generated!\n\n• 45 pages\n• Charts & graphs\n• Market analysis\n• Download ready.',
    };

    const response = actionResponses[action] || 'Processing...';
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: response,
    }]);
  };

  // ============================================================================
  // NOTIFICATIONS
  // ============================================================================

  const addNotification = (message: string, icon: string) => {
    const newNotif: Notification = {
      id: Date.now().toString(),
      message,
      icon,
      time: 'Just now',
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 4)]);
    playSound('notify');
  };

  // Simulate random notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const notifs = [
          'New quote received', 'Shipment updated', 'Payment received',
          'Supplier replied', 'Document ready', 'Alert triggered'
        ];
        addNotification(notifs[Math.floor(Math.random() * notifs.length)], '🔔');
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#050510' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
          opacity: 0.3,
        }} />
        {/* Orbs */}
        <motion.div animate={{ x: ['-100%', '100%'], y: ['-100%', '100%'] }} transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)' }} />
        <motion.div animate={{ x: ['100%', '-100%'], y: ['100%', '-100%'] }} transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,0,255,0.1) 0%, transparent 70%)' }} />
        <motion.div animate={{ y: ['0%', '100%'] }} transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)' }} />
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
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <motion.div animate={{ scale: [1, 1.2, 1] }} className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: '#FF6B00', color: 'white' }}>
                  {notifications.length}
                </motion.div>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-16 right-4 z-50 w-72 max-h-96 overflow-y-auto rounded-2xl p-4"
            style={{ backgroundColor: 'rgba(5,5,16,0.98)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.3)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold" style={{ color: '#00D4FF' }}>Notifications</span>
              <button onClick={() => setNotifications([])} className="text-xs" style={{ color: '#666' }}>Clear all</button>
            </div>
            {notifications.map(notif => (
              <div key={notif.id} className="flex items-center gap-3 p-3 rounded-xl mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <span>{notif.icon}</span>
                <div className="flex-1">
                  <div className="text-sm" style={{ color: 'white' }}>{notif.message}</div>
                  <div className="text-xs" style={{ color: '#666' }}>{notif.time}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            className="md:hidden fixed inset-0 z-40 pt-16" style={{ backgroundColor: 'rgba(5,5,16,0.98)' }}>
            <div className="p-4 space-y-4">
              {/* Stats */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}>
                <div className="text-xs mb-3" style={{ color: '#666' }}>Live Stats</div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Active Orders', value: stats.activeOrders },
                    { label: 'Pending', value: stats.pending },
                    { label: 'Revenue Today', value: stats.revenueToday },
                    { label: 'Messages', value: stats.unreadMessages },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xl font-bold" style={{ color: '#00D4FF' }}>{stat.value}</div>
                      <div className="text-xs" style={{ color: '#666' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Scenarios */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255,0,255,0.1)', border: '1px solid rgba(255,0,255,0.3)' }}>
                <div className="text-xs mb-3" style={{ color: '#FF00FF' }}>Quick Scenarios</div>
                <div className="space-y-2">
                  {scenarios.map(s => (
                    <button key={s.id} onClick={() => { processCommand(s.id === 'import' ? 'buy cotton shirts' : s.id === 'export' ? 'sell to uae' : s.id === 'track' ? 'track shipment' : 'generate invoice'); setMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-left" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                      <span>{s.icon}</span>
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'white' }}>{s.name}</div>
                        <div className="text-xs" style={{ color: '#666' }}>{s.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 flex-col shrink-0 relative" style={{ backgroundColor: 'rgba(5,5,16,0.8)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(0,212,255,0.2)' }}>
        <div className="p-6 space-y-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}>
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold" style={{ color: '#00D4FF' }}>LEVERGE</span>
              <div className="text-xs" style={{ color: '#666' }}>AI Copilot</div>
            </div>
          </Link>

          {/* Live Stats */}
          <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(255,0,255,0.05))', border: '1px solid rgba(0,212,255,0.3)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4" style={{ color: '#00FF88' }} />
              <span className="text-xs font-medium" style={{ color: '#00FF88' }}>LIVE STATS</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Active Orders', value: stats.activeOrders, color: '#00D4FF' },
                { label: 'Pending', value: stats.pending, color: '#FFD700' },
                { label: 'Revenue Today', value: stats.revenueToday, color: '#00FF88' },
                { label: 'Messages', value: stats.unreadMessages, color: '#FF00FF' },
              ].map(stat => (
                <div key={stat.label} className="text-center p-2 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: '#666' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Scenarios */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(255,0,255,0.05)', border: '1px solid rgba(255,0,255,0.2)' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium" style={{ color: '#FF00FF' }}>SCENARIOS</span>
              <ChevronDown className="w-4 h-4" style={{ color: '#666' }} />
            </div>
            <div className="space-y-2">
              {scenarios.map(s => (
                <button key={s.id} onClick={() => processCommand(s.id === 'import' ? 'buy cotton shirts' : s.id === 'export' ? 'sell to uae' : s.id === 'track' ? 'track shipment' : 'generate invoice')}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:scale-[1.02]" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'white' }}>{s.name}</div>
                    <div className="text-xs" style={{ color: '#666' }}>{s.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Organization */}
          <div>
            <div className="text-xs uppercase mb-3" style={{ color: '#666' }}>Organization</div>
            <div className="space-y-2">
              {['TwinOS', 'MemoryOS', 'SkillOS', 'SUTAR', 'Nexha'].map((item, i) => (
                <motion.div key={item} whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer" style={{ backgroundColor: 'rgba(0,212,255,0.05)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(0,212,255,0.2)' }}>
                    <Brain className="w-4 h-4" style={{ color: '#00D4FF' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'white' }}>{item}</span>
                  <div className="w-2 h-2 rounded-full ml-auto" style={{ backgroundColor: '#00FF88', boxShadow: '0 0 10px #00FF88' }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sound Toggle */}
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="flex items-center gap-2 p-3 rounded-xl w-full" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
            <Volume2 className="w-4 h-4" style={{ color: soundEnabled ? '#00D4FF' : '#666' }} />
            <span className="text-sm" style={{ color: soundEnabled ? 'white' : '#666' }}>Sound {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>
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
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00FF88', boxShadow: '0 0 10px #00FF88' }} />
                <span className="text-xs font-medium" style={{ color: '#00FF88' }}>ONLINE</span>
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[90%] md:max-w-xl" style={{
                backgroundColor: msg.role === 'user' ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: msg.role === 'user' ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                boxShadow: msg.role === 'user' ? '0 0 30px rgba(0,212,255,0.2)' : 'none',
              }}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 px-5 pt-4 pb-2">
                    <Sparkles className="w-4 h-4" style={{ color: '#00D4FF' }} />
                    <span className="text-xs font-medium" style={{ color: '#00D4FF' }}>COPILOT</span>
                  </div>
                )}
                <div className="px-5 pb-4">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed" style={{ fontFamily: 'monospace', color: 'white' }}>{msg.content}</pre>
                  {/* Interactive Buttons */}
                  {msg.hasButtons && msg.buttons && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {msg.buttons.map(btn => (
                        <motion.button key={btn.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={() => handleButtonClick(btn.action)}
                          className="px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: `${btn.color}20`, border: `1px solid ${btn.color}50`, color: btn.color }}>
                          {btn.label}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-start">
                <div className="px-5 py-4 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div className="flex items-center gap-2">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00D4FF' }} />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00D4FF' }} />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00D4FF' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Workflow */}
          {showWorkflow && workflowSteps.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 md:p-6 rounded-2xl" style={{ backgroundColor: 'rgba(0,212,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.3)' }}>
              <div className="flex items-center gap-3 mb-4">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0,212,255,0.2)' }}>
                  <Zap className="w-5 h-5" style={{ color: '#00D4FF' }} />
                </motion.div>
                <div>
                  <div className="font-medium" style={{ color: '#00D4FF' }}>COORDINATING</div>
                  <div className="text-xs" style={{ color: '#666' }}>{currentStep + 1} / {workflowSteps.length} agents</div>
                </div>
              </div>
              <div className="space-y-2">
                {workflowSteps.map((step, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 rounded-xl" style={{
                      backgroundColor: i <= currentStep ? 'rgba(0,255,136,0.1)' : 'rgba(0,0,0,0.3)',
                      border: i === currentStep ? '1px solid #00D4FF' : '1px solid transparent',
                    }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: i <= currentStep ? '#00FF88' : 'rgba(255,255,255,0.1)' }}>
                      {i < currentStep ? <Check className="w-4 h-4 text-black" /> : i === currentStep ? (
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
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { label: '💰 Outstanding', cmd: 'show outstanding invoices', color: '#FFD700' },
              { label: '📊 Sales', cmd: 'what are my sales', color: '#00FF88' },
              { label: '🛒 Buy', cmd: 'buy cotton shirts', color: '#00D4FF' },
              { label: '📦 Sell', cmd: 'sell to uae', color: '#FF00FF' },
              { label: '🚢 Track', cmd: 'track shipment', color: '#FF6B00' },
              { label: '📄 Invoice', cmd: 'generate invoice', color: '#A6824A' },
            ].map(action => (
              <motion.button key={action.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => processCommand(action.cmd)}
                className="px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 font-medium"
                style={{ backgroundColor: `${action.color}20`, border: `1px solid ${action.color}50`, color: action.color }}>
                {action.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 md:p-6 border-t" style={{ backgroundColor: 'rgba(5,5,16,0.9)', backdropFilter: 'blur(20px)', borderColor: 'rgba(0,212,255,0.2)' }}>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              {/* Attachment buttons */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 flex gap-1">
                <button className="p-2 rounded-lg transition-all hover:scale-110" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <Plus className="w-4 h-4" style={{ color: '#666' }} />
                </button>
              </div>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && processCommand(input)}
                placeholder="Enter command..." className="w-full pl-12 pr-12 py-4 rounded-2xl text-white placeholder-gray-600 outline-none"
                style={{ backgroundColor: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }} />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <button className="p-2 rounded-lg transition-all hover:scale-110" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <Mic className="w-4 h-4" style={{ color: '#666' }} />
                </button>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => processCommand(input)} disabled={!input.trim() || isProcessing}
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}>
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
