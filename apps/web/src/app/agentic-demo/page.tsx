'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Database, Zap, Bot, Globe, Target, CheckCircle2, Clock, Package, DollarSign, Shield,
  Truck, FileText, MessageCircle, Phone, Mail, Users, Building2, ChevronRight, ArrowRight,
  Check, Sparkles, Layers, Play, Pause, Star, Send, Phone as PhoneIcon
} from 'lucide-react';

// ============================================================================
// AUTONOMOUS IMPORT ASSISTANT DEMO
// ============================================================================

export default function AgenticDemoPage() {
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState('');

  const phases = [
    { id: 'input', name: 'User Input', icon: Target },
    { id: 'twin', name: 'TwinOS', icon: Brain },
    { id: 'memory', name: 'MemoryOS', icon: Database },
    { id: 'skills', name: 'SkillOS', icon: Zap },
    { id: 'workforce', name: 'SUTAR', icon: Bot },
    { id: 'nexha', name: 'Global Nexha', icon: Globe },
    { id: 'complete', name: 'Complete', icon: CheckCircle2 },
  ];

  // Auto-play through phases
  useEffect(() => {
    if (isPlaying && phase < phases.length) {
      const timer = setTimeout(() => {
        setPhase(p => p + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, phase]);

  const handleStart = () => {
    setPhase(1);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setPhase(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#154230' }}>
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</span>
              <div className="text-xs" style={{ color: '#666' }}>Autonomous Import Assistant</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#0891B215', color: '#0891B2' }}>
              Powered by HOJAI AI
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Phase Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {phases.map((p, i) => (
            <div key={p.id} className="flex items-center">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: i <= phase ? '#154230' : 'transparent',
                  border: i <= phase ? 'none' : '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <p.icon className="w-4 h-4" style={{ color: i <= phase ? 'white' : '#666' }} />
                <span className="text-sm font-medium hidden sm:inline" style={{ color: i <= phase ? 'white' : '#666' }}>
                  {p.name}
                </span>
              </div>
              {i < phases.length - 1 && <ArrowRight className="w-4 h-4 mx-1" style={{ color: '#333' }} />}
            </div>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {phase === 0 && <InputPhase key="input" onStart={handleStart} userInput={userInput} setUserInput={setUserInput} />}
          {phase === 1 && <TwinOSPhase key="twin" />}
          {phase === 2 && <MemoryOSPhase key="memory" />}
          {phase === 3 && <SkillOSPhase key="skills" />}
          {phase === 4 && <WorkforcePhase key="workforce" isPlaying={isPlaying} />}
          {phase === 5 && <NexhaPhase key="nexha" isPlaying={isPlaying} />}
          {phase === 6 && <CompletePhase key="complete" onReset={handleReset} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ============================================================================
// PHASE 1: USER INPUT
// ============================================================================

function InputPhase({ onStart, userInput, setUserInput }: { onStart: () => void; userInput: string; setUserInput: (v: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'white' }}>
          Autonomous Import Assistant
        </h1>
        <p className="text-xl mb-8" style={{ color: '#888' }}>
          Powered by HOJAI AI × Global Nexha
        </p>
      </motion.div>

      {/* Merchant Card */}
      <div className="p-8 rounded-2xl mb-8" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: '#154230', color: 'white' }}>
            ABC
          </div>
          <div className="text-left">
            <div className="font-bold" style={{ color: 'white' }}>ABC Fashion Germany</div>
            <div className="text-sm" style={{ color: '#666' }}>Merchant Dashboard</div>
          </div>
        </div>

        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Describe what you need..."
          className="w-full p-4 rounded-xl text-lg resize-none"
          style={{ backgroundColor: '#0A0A0A', border: '1px solid rgba(255,255,255,0.2)', color: 'white', minHeight: '120px' }}
        />
      </div>

      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-4 rounded-xl font-bold text-lg"
        style={{ backgroundColor: '#154230', color: 'white' }}
      >
        <Sparkles className="w-5 h-5 inline mr-2" />
        Start Autonomous Trade
      </motion.button>
    </motion.div>
  );
}

// ============================================================================
// PHASE 2: TWINOS
// ============================================================================

function TwinOSPhase() {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#0891B215' }}>
          <Brain className="w-5 h-5" style={{ color: '#0891B2' }} />
          <span className="text-sm font-medium" style={{ color: '#0891B2' }}>TwinOS</span>
        </div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'white' }}>Merchant Twin Loaded</h2>
        <p style={{ color: '#888' }}>Your digital profile for autonomous decisions</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { label: 'Company', value: 'ABC Fashion GmbH' },
          { label: 'Countries', value: 'Germany, Vietnam, India' },
          { label: 'Preferred Incoterm', value: 'FOB' },
          { label: 'Preferred Payment', value: 'Letter of Credit' },
          { label: 'Trade Volume', value: '$2.4M annually' },
          { label: 'Trust Score', value: '98%' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl"
            style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="text-sm mb-1" style={{ color: '#666' }}>{item.label}</div>
            <div className="text-xl font-bold" style={{ color: 'white' }}>{item.value}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-6 rounded-xl text-center"
        style={{ backgroundColor: '#15423020', border: '1px solid #154230' }}
      >
        <Check className="w-8 h-8 mx-auto mb-2" style={{ color: '#16A34A' }} />
        <div style={{ color: 'white' }}>TwinOS ready. AI knows who you are.</div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 3: MEMORYOS
// ============================================================================

function MemoryOSPhase() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#7C3AED15' }}>
          <Database className="w-5 h-5" style={{ color: '#7C3AED' }} />
          <span className="text-sm font-medium" style={{ color: '#7C3AED' }}>MemoryOS</span>
        </div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'white' }}>Past Trade History</h2>
        <p style={{ color: '#888' }}>AI remembers everything about your business</p>
      </motion.div>

      {/* Memory Cards */}
      <div className="space-y-4 mb-8">
        {[
          { year: '2025', product: 'Cotton Shirts', supplier: 'Vietnam Textiles Ltd', amount: '$285,000', success: '95%' },
          { year: '2024', product: 'Polyester Fabric', supplier: 'Saigon Textiles', amount: '$142,000', success: '92%' },
          { year: '2024', product: 'Cotton Yarn', supplier: 'Vietnam Fabric Co', amount: '$98,000', success: '97%' },
        ].map((memory, i) => (
          <motion.div
            key={memory.year}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 rounded-xl"
            style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: '#7C3AED20', color: '#7C3AED' }}>{memory.year}</span>
              <span className="flex items-center gap-1 text-sm" style={{ color: '#16A34A' }}>
                <Star className="w-4 h-4 fill-current" /> {memory.success} success
              </span>
            </div>
            <div className="font-bold mb-1" style={{ color: 'white' }}>{memory.product}</div>
            <div className="text-sm" style={{ color: '#666' }}>{memory.supplier} • {memory.amount}</div>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-6 rounded-xl text-center"
        style={{ backgroundColor: '#16A34A15', border: '2px solid #16A34A' }}
      >
        <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: '#16A34A' }} />
        <div className="font-bold text-lg mb-2" style={{ color: '#16A34A' }}>AI Recommendation</div>
        <div style={{ color: 'white' }}>
          Use <strong>Vietnam Textiles Ltd</strong> again
        </div>
        <div className="text-sm mt-1" style={{ color: '#888' }}>Previous success rate: 95%</div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 4: SKILLOS
// ============================================================================

function SkillOSPhase() {
  const skills = [
    { name: 'Negotiation Skill', desc: 'Auto-negotiate best prices' },
    { name: 'Compliance Skill', desc: 'EU textile regulations' },
    { name: 'Freight Skill', desc: 'Container booking' },
    { name: 'Documentation Skill', desc: 'Invoice, BL, COO generation' },
    { name: 'Translation Skill', desc: 'Vietnamese ↔ German' },
    { name: 'WhatsApp Skill', desc: 'Supplier communication' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#A6824A15' }}>
          <Zap className="w-5 h-5" style={{ color: '#A6824A' }} />
          <span className="text-sm font-medium" style={{ color: '#A6824A' }}>SkillOS</span>
        </div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'white' }}>Skills Activated</h2>
        <p style={{ color: '#888' }}>Capabilities installed into your AI workforce</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className="p-6 rounded-xl flex items-center gap-4"
            style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#A6824A20' }}>
              <Zap className="w-6 h-6" style={{ color: '#A6824A' }} />
            </div>
            <div>
              <div className="font-bold" style={{ color: 'white' }}>{skill.name}</div>
              <div className="text-sm" style={{ color: '#666' }}>{skill.desc}</div>
            </div>
            <Check className="w-6 h-6 ml-auto" style={{ color: '#16A34A' }} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 5: SUTAR WORKFORCE
// ============================================================================

function WorkforcePhase({ isPlaying }: { isPlaying: boolean }) {
  const [activeAgent, setActiveAgent] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setActiveAgent(prev => (prev + 1) % 6);
      }, 600);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const agents = [
    { name: 'Import Agent', status: 'Searching suppliers...', color: '#0891B2' },
    { name: 'Negotiation Agent', status: 'Negotiating price...', color: '#A6824A' },
    { name: 'Compliance Agent', status: 'Checking EU regulations...', color: '#DC2626' },
    { name: 'Finance Agent', status: 'Setting up escrow...', color: '#CA8A04' },
    { name: 'Logistics Agent', status: 'Booking freight...', color: '#7C3AED' },
    { name: 'Documentation Agent', status: 'Generating docs...', color: '#6366F1' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#0891B215' }}>
          <Bot className="w-5 h-5" style={{ color: '#0891B2' }} />
          <span className="text-sm font-medium" style={{ color: '#0891B2' }}>SUTAR Workforce</span>
        </div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'white' }}>AI Team at Work</h2>
        <p style={{ color: '#888' }}>Your autonomous workforce executes the trade</p>
      </motion.div>

      <div className="space-y-3">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: activeAgent === i ? 1.02 : 1,
            }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl flex items-center gap-4"
            style={{
              backgroundColor: activeAgent === i ? `${agent.color}20` : '#111',
              border: activeAgent === i ? `2px solid ${agent.color}` : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: agent.color }}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-medium" style={{ color: 'white' }}>{agent.name}</div>
              <div className="text-sm" style={{ color: '#888' }}>{agent.status}</div>
            </div>
            {activeAgent === i ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                <Sparkles className="w-5 h-5" style={{ color: agent.color }} />
              </motion.div>
            ) : i < activeAgent ? (
              <Check className="w-5 h-5" style={{ color: '#16A34A' }} />
            ) : (
              <Clock className="w-5 h-5" style={{ color: '#666' }} />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 6: GLOBAL NEXHA
// ============================================================================

function NexhaPhase({ isPlaying }: { isPlaying: boolean }) {
  const [suppliers, setSuppliers] = useState<{ name: string; score: number; price: string }[]>([]);

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => setSuppliers([
        { name: 'Vietnam Textiles Ltd', score: 96, price: '$3.15' },
        { name: 'Saigon Apparel Co', score: 93, price: '$3.22' },
        { name: 'Asia Garments Ltd', score: 91, price: '$3.28' },
      ]), 1000);
    }
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#6366F115' }}>
          <Globe className="w-5 h-5" style={{ color: '#6366F1' }} />
          <span className="text-sm font-medium" style={{ color: '#6366F1' }}>Global Nexha</span>
        </div>
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'white' }}>Supplier Discovery</h2>
        <p style={{ color: '#888' }}>Connected to global trade network</p>
      </motion.div>

      {suppliers.length === 0 ? (
        <div className="text-center py-16">
          <Globe className="w-16 h-16 mx-auto mb-4" style={{ color: '#6366F1' }} />
          <div className="animate-pulse" style={{ color: '#888' }}>Searching global network...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {suppliers.map((supplier, i) => (
            <motion.div
              key={supplier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-6 rounded-xl flex items-center gap-4"
              style={{ backgroundColor: i === 0 ? '#16A34A15' : '#111', border: i === 0 ? '2px solid #16A34A' : '1px solid rgba(255,255,255,0.1)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: '#154230' }}>
                {supplier.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-bold" style={{ color: 'white' }}>{supplier.name}</div>
                <div className="flex items-center gap-4 text-sm" style={{ color: '#888' }}>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" style={{ color: '#CA8A04' }} />
                    {supplier.score}%
                  </span>
                  <span>{supplier.price}/unit</span>
                </div>
              </div>
              {i === 0 && <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#16A34A', color: 'white' }}>Best Match</span>}
              {i === 0 && <CheckCircle2 className="w-6 h-6" style={{ color: '#16A34A' }} />}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 p-4 rounded-xl text-center"
            style={{ backgroundColor: '#16A34A15', border: '1px solid #16A34A' }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-5 h-5" style={{ color: '#16A34A' }} />
              <span className="font-bold" style={{ color: '#16A34A' }}>Savings: $25,000</span>
            </div>
            <div className="text-sm" style={{ color: '#888' }}>vs market rate negotiation</div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// PHASE 7: COMPLETE
// ============================================================================

function CompletePhase({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring' }}
        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ backgroundColor: '#16A34A' }}
      >
        <Check className="w-10 h-10 text-white" />
      </motion.div>

      <h2 className="text-3xl font-bold mb-2" style={{ color: 'white' }}>Autonomous Trade Complete</h2>
      <p className="mb-8" style={{ color: '#888' }}>AI handled everything. Just review and approve.</p>

      {/* Summary */}
      <div className="text-left p-6 rounded-xl mb-8" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Supplier', value: 'Vietnam Textiles Ltd', icon: Users },
            { label: 'Product', value: '10,000 Cotton Shirts', icon: Package },
            { label: 'Unit Price', value: '$3.15 (Saved $0.25/unit)', icon: DollarSign },
            { label: 'Total', value: '$31,500', icon: Building2 },
            { label: 'Duty', value: '12% (EU textile', icon: Shield },
            { label: 'ETA', value: '18 days via MSC', icon: Truck },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="w-5 h-5" style={{ color: '#A6824A' }} />
              <div>
                <div className="text-sm" style={{ color: '#666' }}>{item.label}</div>
                <div className="font-medium" style={{ color: 'white' }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="mb-8">
        <div className="text-sm mb-3" style={{ color: '#888' }}>Documents Generated</div>
        <div className="flex justify-center gap-4">
          {['Invoice', 'Packing List', 'BL', 'COO'].map((doc) => (
            <div key={doc} className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#16A34A15', color: '#16A34A' }}>
              <Check className="w-4 h-4 inline mr-1" /> {doc}
            </div>
          ))}
        </div>
      </div>

      <motion.button
        onClick={onReset}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-4 rounded-xl font-bold text-lg"
        style={{ backgroundColor: '#154230', color: 'white' }}
      >
        <CheckCircle2 className="w-5 h-5 inline mr-2" />
        Approve & Execute Trade
      </motion.button>
    </motion.div>
  );
}
