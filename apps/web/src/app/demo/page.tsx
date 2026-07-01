'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Bot, Brain, Database, Zap, Globe, Users, Package, FileText, Shield,
  Truck, CreditCard, MessageSquare, Phone, Mail, ArrowRight, Play, Layers,
  Sparkles, CheckCircle2, Target, TrendingUp, ChevronRight
} from 'lucide-react';

// ============================================================================
// LEVERAGE DEMO - Main Entry Point
// ============================================================================

export default function DemoPage() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 'copilot', name: 'Copilot', icon: Bot, color: '#0891B2', desc: 'Natural language commands' },
    { id: 'agentic', name: 'Agentic Flow', icon: Brain, color: '#7C3AED', desc: 'Phase-by-phase walkthrough' },
  ];

  const features = [
    { icon: Brain, name: 'TwinOS', desc: 'Your digital company twin' },
    { icon: Database, name: 'MemoryOS', desc: 'Trade history & relationships' },
    { icon: Zap, name: 'SkillOS', desc: 'Capabilities for AI agents' },
    { icon: Bot, name: 'SUTAR', desc: 'Autonomous workforce' },
    { icon: Globe, name: 'Nexha', desc: 'Global trade network' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A', color: 'white' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#154230' }}>
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</span>
              <div className="text-xs" style={{ color: '#666' }}>Demo Mode</div>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#154230' }}>
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Powered by HOJAI AI</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Agentic Commerce
            <br />
            <span style={{ color: '#A6824A' }}>Demo</span>
          </h1>

          <p className="text-xl mb-12 max-w-2xl mx-auto" style={{ color: '#888' }}>
            Experience the future of trade. Tell the AI what you need — it coordinates everything.
          </p>
        </motion.div>

        {/* Demo Options */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Copilot Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/copilot"
              className="block p-8 rounded-2xl text-left transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: '#111', border: '2px solid #0891B2' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#0891B220' }}>
                  <Bot className="w-8 h-8" style={{ color: '#0891B2' }} />
                </div>
                <ChevronRight className="w-6 h-6" style={{ color: '#0891B2' }} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Copilot Demo</h2>
              <p className="mb-4" style={{ color: '#888' }}>
                Type commands like "Import cotton shirts from Vietnam" and watch the AI coordinate the entire organization.
              </p>
              <div className="flex items-center gap-2 font-medium" style={{ color: '#0891B2' }}>
                Try it now <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>

          {/* Agentic Flow Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/agentic-demo"
              className="block p-8 rounded-2xl text-left transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: '#111', border: '2px solid #7C3AED' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#7C3AED20' }}>
                  <Brain className="w-8 h-8" style={{ color: '#7C3AED' }} />
                </div>
                <ChevronRight className="w-6 h-6" style={{ color: '#7C3AED' }} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Agentic Flow Demo</h2>
              <p className="mb-4" style={{ color: '#888' }}>
                Step-by-step walkthrough: TwinOS → MemoryOS → SkillOS → SUTAR → Global Nexha
              </p>
              <div className="flex items-center gap-2 font-medium" style={{ color: '#7C3AED' }}>
                Explore phases <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Architecture */}
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-center mb-12">The Architecture</h2>

          <div className="grid md:grid-cols-5 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl text-center"
                style={{ backgroundColor: '#111' }}
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#154230' }}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-1">{feature.name}</h3>
                <p className="text-sm" style={{ color: '#666' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <ArrowRight className="w-6 h-6 mx-auto" style={{ color: '#A6824A' }} />
            <p className="text-sm mt-2" style={{ color: '#666' }}>Merchant → Copilot → Organization → Execution</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: '#154230' }}>
              1
            </div>
            <h3 className="font-bold mb-2">Tell the AI</h3>
            <p style={{ color: '#888' }}>
              Type in natural language: "Import 10,000 cotton shirts from Vietnam, budget $300,000"
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: '#154230' }}>
              2
            </div>
            <h3 className="font-bold mb-2">AI Coordinates</h3>
            <p style={{ color: '#888' }}>
              TwinOS loads your profile, MemoryOS checks history, SUTAR agents execute tasks
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: '#154230' }}>
              3
            </div>
            <h3 className="font-bold mb-2">You Approve</h3>
            <p style={{ color: '#888' }}>
              AI handles everything, you just review and approve at the end
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t text-center py-16" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <h2 className="text-3xl font-bold mb-4">Ready to Experience?</h2>
        <p className="mb-8" style={{ color: '#888' }}>
          Choose a demo above to see the future of trade
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/copilot"
            className="px-8 py-4 rounded-xl font-bold"
            style={{ backgroundColor: '#0891B2', color: 'white' }}
          >
            <Bot className="w-5 h-5 inline mr-2" />
            Try Copilot
          </Link>
          <Link
            href="/agentic-demo"
            className="px-8 py-4 rounded-xl font-bold"
            style={{ backgroundColor: '#7C3AED', color: 'white' }}
          >
            <Brain className="w-5 h-5 inline mr-2" />
            See Agentic Flow
          </Link>
        </div>
      </div>
    </div>
  );
}
