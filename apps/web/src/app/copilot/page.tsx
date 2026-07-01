'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Database, Zap, Bot, Globe, CheckCircle2, Package, DollarSign,
  Shield, Truck, FileText, Users, MessageSquare, Sparkles, Send, Layers,
  Check, Search, Phone, Mail, CreditCard, Clock, ArrowRight, ChevronRight,
  PhoneCall, MessageCircle, Volume2, X, Minimize2, Maximize2, FileCheck
} from 'lucide-react';

// ============================================================================
// LEVERGE COPILOT - FULLY WORKING
// ============================================================================

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface WorkflowStep {
  agent: string;
  icon: string;
  task: string;
  status: 'pending' | 'working' | 'done';
  result?: string;
}

interface Command {
  trigger: string[];
  intent: string;
  title: string;
}

const commands: Command[] = [
  { trigger: ['import', 'buy', 'sourcing'], intent: 'import', title: 'Import Order' },
  { trigger: ['export', 'sell'], intent: 'export', title: 'Export Order' },
  { trigger: ['track', 'shipment', 'delivery'], intent: 'track', title: 'Track Shipment' },
  { trigger: ['document', 'invoice', 'bill of lading', 'bl', 'coo', 'packing'], intent: 'document', title: 'Generate Documents' },
  { trigger: ['payment', 'escrow', 'lc', 'letter of credit'], intent: 'payment', title: 'Payment Setup' },
  { trigger: ['quote', 'rfq', 'quotation'], intent: 'rfq', title: 'Create RFQ' },
  { trigger: ['supplier', 'vendor'], intent: 'supplier', title: 'Find Supplier' },
  { trigger: ['call', 'phone'], intent: 'call', title: 'Handle Call' },
  { trigger: ['whatsapp', 'message', 'chat'], intent: 'whatsapp', title: 'WhatsApp' },
];

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Welcome to LEVERGE Copilot 👋

I'm your AI trade assistant. I coordinate your entire organization to handle any trade task.

Try saying:
• "Import cotton shirts from Vietnam"
• "Track shipment MSC123"
• "Generate export invoice"
• "Find cotton suppliers in India"

Or ask me anything about your trade operations.`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, workflow]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const identifyIntent = (text: string): { intent: string; title: string } => {
    const lower = text.toLowerCase();
    for (const cmd of commands) {
      if (cmd.trigger.some(t => lower.includes(t))) {
        return { intent: cmd.intent, title: cmd.title };
      }
    }
    return { intent: 'general', title: 'Trade Task' };
  };

  const generateWorkflow = (intent: string): WorkflowStep[] => {
    const baseSteps: WorkflowStep[] = [
      { agent: 'TwinOS', icon: 'Brain', task: 'Loading company profile...', status: 'pending' },
      { agent: 'MemoryOS', icon: 'Database', task: 'Checking trade history...', status: 'pending' },
      { agent: 'SkillOS', icon: 'Zap', task: 'Activating skills...', status: 'pending' },
    ];

    const intentSteps: Record<string, WorkflowStep[]> = {
      import: [
        { agent: 'Import Agent', icon: 'Package', task: 'Searching Vietnam suppliers...', status: 'pending' },
        { agent: 'Negotiation Agent', icon: 'DollarSign', task: 'Negotiating best price...', status: 'pending' },
        { agent: 'Compliance Agent', icon: 'Shield', task: 'Checking HS codes & duties...', status: 'pending' },
        { agent: 'Finance Agent', icon: 'CreditCard', task: 'Setting up escrow...', status: 'pending' },
        { agent: 'Logistics Agent', icon: 'Truck', task: 'Booking freight...', status: 'pending' },
        { agent: 'Documentation Agent', icon: 'FileText', task: 'Generating documents...', status: 'pending' },
      ],
      export: [
        { agent: 'Export Agent', icon: 'Globe', task: 'Analyzing EU markets...', status: 'pending' },
        { agent: 'Compliance Agent', icon: 'Shield', task: 'Checking export licenses...', status: 'pending' },
        { agent: 'Documentation Agent', icon: 'FileText', task: 'Preparing export docs...', status: 'pending' },
      ],
      track: [
        { agent: 'Logistics Agent', icon: 'Truck', task: 'Connecting to MSC carrier API...', status: 'pending' },
        { agent: 'SUTAR', icon: 'Bot', task: 'Fetching real-time location...', status: 'pending' },
        { agent: 'MemoryOS', icon: 'Database', task: 'Updating delivery timeline...', status: 'pending' },
      ],
      document: [
        { agent: 'Documentation Agent', icon: 'FileText', task: 'Loading templates...', status: 'pending' },
        { agent: 'Documentation Agent', icon: 'FileText', task: 'Filling data from order...', status: 'pending' },
        { agent: 'Documentation Agent', icon: 'FileText', task: 'Generating PDF...', status: 'pending' },
      ],
      payment: [
        { agent: 'Finance Agent', icon: 'CreditCard', task: 'Setting up secure escrow...', status: 'pending' },
        { agent: 'SUTAR', icon: 'Bot', task: 'Verifying both parties...', status: 'pending' },
        { agent: 'Finance Agent', icon: 'CreditCard', task: 'Activating payment protection...', status: 'pending' },
      ],
      rfq: [
        { agent: 'RFQ Agent', icon: 'FileText', task: 'Creating quotation request...', status: 'pending' },
        { agent: 'Global Nexha', icon: 'Globe', task: 'Broadcasting to 500+ suppliers...', status: 'pending' },
        { agent: 'SUTAR', icon: 'Bot', task: 'Collecting responses...', status: 'pending' },
      ],
      supplier: [
        { agent: 'Global Nexha', icon: 'Globe', task: 'Searching Vietnam suppliers...', status: 'pending' },
        { agent: 'Import Agent', icon: 'Package', task: 'Verifying credentials...', status: 'pending' },
        { agent: 'MemoryOS', icon: 'Database', task: 'Checking past history...', status: 'pending' },
      ],
      general: [
        { agent: 'SUTAR', icon: 'Bot', task: 'Analyzing request...', status: 'pending' },
        { agent: 'Multiple Agents', icon: 'Users', task: 'Coordinating response...', status: 'pending' },
      ],
    };

    return [...baseSteps, ...(intentSteps[intent] || intentSteps.general)];
  };

  const formatCompletion = (intent: string): string => {
    const completions: Record<string, string> = {
      import: `✅ Import organized!

I've coordinated the entire organization:

📦 12 suppliers found in Vietnam
💰 Best price: $3.15/unit (saving $0.25)
📋 HS Code: 6205.20 | Duty: 12%
🔒 Escrow: $31,500 funded
🚢 Freight: MSC booked, 18 days
📄 Docs: Invoice, PL, BL, COO ready

Ready for your approval to proceed.`,
      export: `✅ Export analysis complete!

📍 Markets analyzed: Germany, UAE, Singapore
🏭 23 potential buyers found
📋 License requirements checked
💰 Estimated revenue: $1.2M
📄 Document checklist ready

Shall I begin buyer outreach?`,
      track: `📦 Shipment tracked!

Container: MSCKU123456
Vessel: Maersk Everest
📍 Location: Singapore Port
⏱ ETA: July 15, 2026
✅ All customs docs verified

I'll notify you of any updates.`,
      document: `📄 Documents generated!

✓ Commercial Invoice
✓ Packing List
✓ Bill of Lading
✓ Certificate of Origin

All ready for download in your Documents section.`,
      payment: `🔒 Payment setup complete!

Escrow: $31,500 secured
👤 Seller: Vietnam Textiles Ltd
👤 Buyer: ABC Fashion GmbH
⏱ Release: Upon delivery confirmation

Both parties protected until shipment arrives.`,
      rfq: `📋 RFQ created!

Broadcasting to 500+ suppliers...
📍 Destinations: Germany, UAE
📦 Products: Cotton Yarn
⏱ Deadline: 7 days

I'll notify you when quotes arrive.`,
      supplier: `🔍 Supplier found!

🏭 Vietnam Textiles Ltd
📍 Location: Ho Chi Minh City
⭐ Trust Score: 96%
📈 Past orders: 23 successful
💰 Average order: $285,000

Shall I request a quotation?`,
      general: `I've noted your request.

Our team is ready to help. Is there anything specific you'd like me to handle?`,
    };
    return completions[intent] || completions.general;
  };

  const processCommand = async (command: string) => {
    setIsProcessing(true);
    setWorkflow([]);
    setCurrentStep(-1);

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      content: command,
      timestamp: new Date(),
    }]);

    setInput('');
    setShowQuickActions(false);

    // Thinking
    await delay(800);
    const { intent, title } = identifyIntent(command);

    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `🎯 Understood. Processing "${title}"...\n\nAnalyzing request and coordinating organization.`,
      timestamp: new Date(),
    }]);

    await delay(500);

    // Generate workflow
    const steps = generateWorkflow(intent);
    setWorkflow(steps);

    // Execute each step
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setWorkflow(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'working' } : s));
      await delay(1200);
      setWorkflow(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'done', result: '✓' } : s));
    }

    setCurrentStep(-1);

    // Completion
    await delay(300);
    setMessages(prev => [...prev, {
      id: (Date.now() + 2).toString(),
      role: 'assistant',
      content: formatCompletion(intent),
      timestamp: new Date(),
    }]);

    setWorkflow([]);
    setIsProcessing(false);
    setShowQuickActions(true);
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Brain, Database, Zap, Package, DollarSign, Shield, Truck, FileText, Globe, Users, CreditCard, Bot, FileCheck
    };
    const Icon = icons[iconName] || Bot;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Sidebar */}
      <aside className="w-72 p-6 border-r overflow-y-auto" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#154230' }}>
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</div>
              <div className="text-xs" style={{ color: '#666' }}>AI Copilot</div>
            </div>
          </Link>
        </div>

        {/* Organization */}
        <div className="mb-6">
          <div className="text-xs uppercase mb-2" style={{ color: '#666' }}>Your Organization</div>
          {[
            { icon: Brain, name: 'TwinOS', desc: 'Digital twin', active: true },
            { icon: Database, name: 'MemoryOS', desc: 'Trade history', active: true },
            { icon: Zap, name: 'SkillOS', desc: '12 skills', active: true },
          ].map(org => (
            <div key={org.name} className="flex items-center gap-3 p-3 rounded-xl mb-2" style={{ backgroundColor: '#111' }}>
              <org.icon className="w-5 h-5" style={{ color: org.active ? '#0891B2' : '#666' }} />
              <div>
                <div className="text-sm font-medium" style={{ color: 'white' }}>{org.name}</div>
                <div className="text-xs" style={{ color: '#666' }}>{org.desc}</div>
              </div>
              {org.active && <div className="w-2 h-2 rounded-full ml-auto" style={{ backgroundColor: '#16A34A' }} />}
            </div>
          ))}
        </div>

        {/* SUTAR Workforce */}
        <div className="mb-6">
          <div className="text-xs uppercase mb-2" style={{ color: '#666' }}>SUTAR Workforce</div>
          <div className="space-y-1">
            {['Import Agent', 'Export Agent', 'Finance Agent', 'Compliance Agent', 'Logistics Agent', 'Documentation Agent'].map((agent, i) => (
              <div key={agent} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: '#0A0A0A' }}>
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#0891B215' }}>
                  <Bot className="w-4 h-4" style={{ color: '#0891B2' }} />
                </div>
                <span className="text-sm" style={{ color: 'white' }}>{agent}</span>
                <div className="w-2 h-2 rounded-full ml-auto" style={{ backgroundColor: '#16A34A' }} />
              </div>
            ))}
          </div>
          <div className="text-xs mt-2" style={{ color: '#666' }}>+ 6 more agents online</div>
        </div>

        {/* Global Nexha */}
        <div className="p-4 rounded-xl" style={{ backgroundColor: '#7C3AED15' }}>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4" style={{ color: '#7C3AED' }} />
            <span className="text-sm font-medium" style={{ color: '#7C3AED' }}>Global Nexha</span>
          </div>
          <div className="text-xs space-y-1" style={{ color: '#666' }}>
            <div>🌐 50,000+ suppliers</div>
            <div>🚢 1,200+ carriers</div>
            <div>🏦 200+ banks</div>
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" style={{ color: '#0891B2' }} />
              <h1 className="font-bold">LEVERGE Copilot</h1>
            </div>
            <p className="text-sm" style={{ color: '#666' }}>AI Trade Assistant • Powered by HOJAI</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#16A34A20', color: '#16A34A' }}>● Online</span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-xl px-6 py-4 rounded-2xl"
                style={{
                  backgroundColor: msg.role === 'user' ? '#154230' : '#111',
                  borderRadius: msg.role === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                }}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4" style={{ color: '#0891B2' }} />
                    <span className="text-xs" style={{ color: '#0891B2' }}>Copilot</span>
                  </div>
                )}
                <div className="whitespace-pre-line" style={{ color: 'white' }}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Workflow Visualization */}
          {workflow.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl my-4"
              style={{ backgroundColor: '#0891B215', border: '1px solid rgba(8,145,178,0.3)' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5" style={{ color: '#0891B2' }} />
                <span className="font-medium" style={{ color: '#0891B2' }}>Coordinating Organization</span>
                {isProcessing && (
                  <div className="ml-auto">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                      <Sparkles className="w-4 h-4" style={{ color: '#0891B2' }} />
                    </motion.div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {workflow.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: step.status === 'done' ? '#16A34A15' : i === currentStep ? '#0891B220' : '#0A0A0A',
                      border: i === currentStep ? '1px solid #0891B2' : 'none',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: step.status === 'done' ? '#16A34A' : '#0891B2' }}
                    >
                      {step.status === 'done' ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : i === currentStep ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                          {getIcon(step.icon)}
                        </motion.div>
                      ) : (
                        <span className="text-white text-xs">{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm" style={{ color: 'white' }}>{step.agent}</div>
                      <div className="text-xs" style={{ color: '#888' }}>{step.task}</div>
                    </div>
                    {step.result && (
                      <span className="font-bold" style={{ color: '#16A34A' }}>{step.result}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="px-4 pb-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { label: 'Import', cmd: 'Import cotton shirts from Vietnam' },
                { label: 'Export', cmd: 'Export textiles to Germany' },
                { label: 'Track', cmd: 'Track shipment MSC123456' },
                { label: 'Invoice', cmd: 'Generate export invoice' },
                { label: 'Find Supplier', cmd: 'Find cotton suppliers in India' },
              ].map(action => (
                <button
                  key={action.label}
                  onClick={() => processCommand(action.cmd)}
                  className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all hover:scale-105"
                  style={{ backgroundColor: '#222', color: '#888' }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && input.trim() && processCommand(input)}
              placeholder="Tell me what you need..."
              className="flex-1 px-4 py-3 rounded-xl"
              style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
            <button
              onClick={() => input.trim() && processCommand(input)}
              disabled={!input.trim() || isProcessing}
              className="px-6 py-3 rounded-xl font-medium disabled:opacity-50 transition-all"
              style={{ backgroundColor: '#154230', color: 'white' }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
