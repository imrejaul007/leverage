'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Database, Zap, Bot, Globe, CheckCircle2, Package, DollarSign,
  Shield, Truck, FileText, Users, MessageSquare, Sparkles, Send, Layers,
  Check, Search, Phone, Mail, CreditCard, Clock, ArrowRight
} from 'lucide-react';

// ============================================================================
// LEVERGE COPILOT - Single Command Interface
// ============================================================================

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Step {
  agent: string;
  task: string;
  status: 'pending' | 'working' | 'done';
  result?: string;
}

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Welcome to LEVERGE Copilot.

I'm your AI trade assistant.

Tell me what you need — I'll coordinate everything.

Try: "Import 10,000 cotton shirts from Vietnam"`,
    },
  ]);
  const [input, setInput] = useState('');
  const [workflow, setWorkflow] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, workflow]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const identifyIntent = (command: string): string => {
    const lower = command.toLowerCase();
    if (lower.includes('import')) return 'import';
    if (lower.includes('export')) return 'export';
    if (lower.includes('track') || lower.includes('shipment')) return 'track';
    if (lower.includes('doc') || lower.includes('invoice') || lower.includes('bl') || lower.includes('coo')) return 'document';
    if (lower.includes('payment') || lower.includes('escrow') || lower.includes('lc')) return 'payment';
    return 'general';
  };

  const generateWorkflow = (intent: string): Step[] => {
    const steps: Step[] = [
      { agent: 'TwinOS', task: 'Loading company profile...', status: 'pending' },
      { agent: 'MemoryOS', task: 'Checking trade history...', status: 'pending' },
    ];

    switch (intent) {
      case 'import':
        steps.push(
          { agent: 'Import Agent', task: 'Searching Vietnam suppliers...', status: 'pending' },
          { agent: 'Negotiation Agent', task: 'Negotiating best price...', status: 'pending' },
          { agent: 'Compliance Agent', task: 'Checking HS codes & duties...', status: 'pending' },
          { agent: 'Finance Agent', task: 'Setting up escrow...', status: 'pending' },
          { agent: 'Logistics Agent', task: 'Booking freight...', status: 'pending' },
          { agent: 'Documentation Agent', task: 'Generating documents...', status: 'pending' },
          { agent: 'SUTAR', task: 'Coordinating everything...', status: 'pending' },
        );
        break;
      case 'export':
        steps.push(
          { agent: 'Export Agent', task: 'Analyzing export markets...', status: 'pending' },
          { agent: 'SUTAR', task: 'Finding buyers...', status: 'pending' },
          { agent: 'Compliance Agent', task: 'Checking licenses...', status: 'pending' },
        );
        break;
      case 'track':
        steps.push(
          { agent: 'Logistics Agent', task: 'Connecting to carriers...', status: 'pending' },
          { agent: 'SUTAR', task: 'Fetching tracking data...', status: 'pending' },
        );
        break;
      case 'document':
        steps.push(
          { agent: 'Documentation Agent', task: 'Loading templates...', status: 'pending' },
          { agent: 'Documentation Agent', task: 'Filling data...', status: 'pending' },
          { agent: 'Documentation Agent', task: 'Generating PDF...', status: 'pending' },
        );
        break;
      default:
        steps.push({ agent: 'SUTAR', task: 'Processing request...', status: 'pending' });
    }
    return steps;
  };

  const formatCompletion = (intent: string): string => {
    switch (intent) {
      case 'import':
        return `Import organized!

I've coordinated the entire organization:

✓ TwinOS loaded your profile
✓ MemoryOS found Vietnam Textiles Ltd (95% success rate)
✓ 12 suppliers discovered
✓ Best price negotiated: $3.15/unit
✓ Duties calculated: 12%
✓ Escrow funded: $31,500
✓ Freight booked: MSC, 18 days
✓ Documents ready: Invoice, PL, BL, COO

Ready for your approval.`;
      case 'export':
        return `Export analysis complete.

✓ EU markets analyzed
✓ 23 buyers found
✓ License requirements checked
✓ Document checklist ready

What would you like to do next?`;
      case 'track':
        return `Shipment tracked!

Current Status:
• Container: MSCKU123456
• Location: Singapore Port
• Vessel: Maersk Everest
• ETA: July 15, 2026
• All docs verified ✓`;
      case 'document':
        return `Documents generated!

✓ Commercial Invoice
✓ Packing List
✓ Bill of Lading
✓ Certificate of Origin

All ready for download.`;
      default:
        return `Understood. I'm coordinating the organization. What else do you need?`;
    }
  };

  const processCommand = async (command: string) => {
    setIsProcessing(true);
    setWorkflow([]);
    setCurrentStep(0);

    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: command }]);
    setInput('');

    // Thinking
    await delay(800);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Analyzing command...\n' }]);

    await delay(500);
    const intent = identifyIntent(command);
    const steps = generateWorkflow(intent);
    setWorkflow(steps);

    // Execute each step
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await delay(1200);
      setWorkflow(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'done', result: 'Complete' } : s));
    }

    // Completion
    await delay(500);
    setMessages(prev => [...prev, { id: (Date.now() + 2).toString(), role: 'assistant', content: formatCompletion(intent) }]);

    setWorkflow([]);
    setIsProcessing(false);
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
              <div className="text-xs" style={{ color: '#666' }}>Copilot Mode</div>
            </div>
          </Link>
        </div>

        {/* Organization Stack */}
        <div className="mb-6">
          <div className="text-xs uppercase mb-2" style={{ color: '#666' }}>Your Organization</div>
          {[
            { icon: Brain, name: 'TwinOS', desc: 'Your digital twin' },
            { icon: Database, name: 'MemoryOS', desc: 'Trade history' },
            { icon: Zap, name: 'SkillOS', desc: '12 skills active' },
          ].map(org => (
            <div key={org.name} className="flex items-center gap-3 p-3 rounded-xl mb-2" style={{ backgroundColor: '#111' }}>
              <org.icon className="w-5 h-5" style={{ color: '#888' }} />
              <div>
                <div className="text-sm font-medium" style={{ color: 'white' }}>{org.name}</div>
                <div className="text-xs" style={{ color: '#666' }}>{org.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* SUTAR Workforce */}
        <div className="mb-6">
          <div className="text-xs uppercase mb-2" style={{ color: '#666' }}>SUTAR Workforce</div>
          <div className="space-y-1">
            {['Import Agent', 'Export Agent', 'Finance Agent', 'Compliance Agent', 'Logistics Agent', 'Documentation Agent'].map(agent => (
              <div key={agent} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: '#0A0A0A' }}>
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: '#0891B215' }}>
                  <Bot className="w-4 h-4" style={{ color: '#0891B2' }} />
                </div>
                <span className="text-sm" style={{ color: 'white' }}>{agent}</span>
              </div>
            ))}
          </div>
          <div className="text-xs mt-2" style={{ color: '#666' }}>+ 6 more agents</div>
        </div>

        {/* Global Nexha */}
        <div className="p-4 rounded-xl" style={{ backgroundColor: '#7C3AED15' }}>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4" style={{ color: '#7C3AED' }} />
            <span className="text-sm font-medium" style={{ color: '#7C3AED' }}>Global Nexha</span>
          </div>
          <div className="text-xs" style={{ color: '#666' }}>
            50,000+ suppliers<br />
            1,200+ carriers<br />
            200+ banks
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div>
            <h1 className="font-bold">Copilot</h1>
            <p className="text-sm" style={{ color: '#666' }}>Tell me what you need — I'll coordinate everything</p>
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

          {/* Workflow */}
          {workflow.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl my-4"
              style={{ backgroundColor: '#0891B215' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5" style={{ color: '#0891B2' }} />
                <span className="font-medium" style={{ color: '#0891B2' }}>Coordinating Organization</span>
              </div>
              <div className="space-y-2">
                {workflow.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      backgroundColor: step.status === 'done' ? '#16A34A20' : i === currentStep ? '#0891B220' : '#0A0A0A',
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
                          <Sparkles className="w-4 h-4" style={{ color: 'white' }} />
                        </motion.div>
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium" style={{ color: 'white' }}>{step.agent}</div>
                      <div className="text-sm" style={{ color: '#888' }}>{step.task}</div>
                    </div>
                    {step.result && (
                      <span style={{ color: '#16A34A' }}>{step.result}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

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
              className="px-6 py-3 rounded-xl font-medium disabled:opacity-50"
              style={{ backgroundColor: '#154230', color: 'white' }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            {['Import', 'Export', 'Track', 'Documents'].map(cmd => (
              <button
                key={cmd}
                onClick={() => processCommand(cmd.toLowerCase() + ' cotton shirts from Vietnam')}
                className="px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: '#222', color: '#888' }}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
