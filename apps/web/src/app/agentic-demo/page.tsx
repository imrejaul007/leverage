'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Database, Zap, Bot, Globe, Target, CheckCircle2, Clock, Package, DollarSign,
  Shield, Truck, FileText, Users, Building2, ArrowRight, Check, Sparkles,
  Layers, Star, MessageCircle, Phone, Mail, Lock, Search, FileCheck,
  MessageSquare, PhoneCall, ChevronRight, Volume2
} from 'lucide-react';

// ============================================================================
// INTERACTIVE AUTONOMOUS IMPORT DEMO - FULLY WORKING
// ============================================================================

export default function AgenticDemoPage() {
  const [activePhase, setActivePhase] = useState<string>('start');

  const phases = [
    { id: 'start', name: 'Start', icon: Target },
    { id: 'twin', name: 'TwinOS', icon: Brain },
    { id: 'memory', name: 'MemoryOS', icon: Database },
    { id: 'skills', name: 'SkillOS', icon: Zap },
    { id: 'workforce', name: 'SUTAR', icon: Bot },
    { id: 'nexha', name: 'Nexha', icon: Globe },
    { id: 'negotiation', name: 'Negotiate', icon: DollarSign },
    { id: 'comms', name: 'Comms', icon: MessageCircle },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'complete', name: 'Complete', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A', color: 'white' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/demo" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#154230' }}>
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</span>
                <div className="text-xs" style={{ color: '#666' }}>Agentic Demo</div>
              </div>
            </Link>
            <Link href="/demo" className="px-4 py-2 rounded-xl text-sm" style={{ backgroundColor: '#222', color: '#888' }}>
              ← Back to Demo Home
            </Link>
          </div>
        </div>
      </header>

      {/* Phase Navigation */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: activePhase === phase.id ? '#154230' : 'transparent',
                  color: activePhase === phase.id ? 'white' : '#666',
                  border: activePhase === phase.id ? 'none' : '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <phase.icon className="w-4 h-4" />
                {phase.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activePhase === 'start' && <StartPhase key="start" onNext={() => setActivePhase('twin')} />}
          {activePhase === 'twin' && <TwinOSPhase key="twin" onNext={() => setActivePhase('memory')} />}
          {activePhase === 'memory' && <MemoryOSPhase key="memory" onNext={() => setActivePhase('skills')} />}
          {activePhase === 'skills' && <SkillOSPhase key="skills" onNext={() => setActivePhase('workforce')} />}
          {activePhase === 'workforce' && <WorkforcePhase key="workforce" onNext={() => setActivePhase('nexha')} />}
          {activePhase === 'nexha' && <NexhaPhase key="nexha" onNext={() => setActivePhase('negotiation')} />}
          {activePhase === 'negotiation' && <NegotiationPhase key="negotiation" onNext={() => setActivePhase('comms')} />}
          {activePhase === 'comms' && <CommsPhase key="comms" onNext={() => setActivePhase('documents')} />}
          {activePhase === 'documents' && <DocumentsPhase key="documents" onNext={() => setActivePhase('complete')} />}
          {activePhase === 'complete' && <CompletePhase key="complete" onReset={() => setActivePhase('start')} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ============================================================================
// PHASE 1: START
// ============================================================================

function StartPhase({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center">
      <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity }}>
        <h1 className="text-5xl font-bold mb-4">Autonomous Import Demo</h1>
        <p className="text-xl mb-8" style={{ color: '#888' }}>Powered by HOJAI AI × Global Nexha</p>
      </motion.div>

      <div className="p-8 rounded-2xl mb-8 text-left max-w-2xl mx-auto" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: '#154230' }}>ABC</div>
          <div>
            <div className="font-bold">ABC Fashion Germany</div>
            <div className="text-sm" style={{ color: '#666' }}>Merchant</div>
          </div>
        </div>
        <div className="p-6 rounded-xl" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="text-sm mb-2" style={{ color: '#666' }}>What do you need?</div>
          <div className="text-lg font-medium mb-4">
            "Import 10,000 cotton shirts from Vietnam. Budget: $300,000. Delivery: 30 days."
          </div>
        </div>
      </div>

      <motion.button onClick={onNext} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="px-8 py-4 rounded-xl font-bold text-lg" style={{ backgroundColor: '#154230', color: 'white' }}>
        <Sparkles className="w-5 h-5 inline mr-2" />
        Start Autonomous Trade
      </motion.button>
    </motion.div>
  );
}

// ============================================================================
// PHASE 2: TWINOS
// ============================================================================

function TwinOSPhase({ onNext }: { onNext: () => void }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#0891B215' }}>
          <Brain className="w-5 h-5" style={{ color: '#0891B2' }} />
          <span style={{ color: '#0891B2' }}>TwinOS</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Merchant Twin Loaded</h2>
        <p style={{ color: '#888' }}>Your digital profile for autonomous decisions</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Company', value: 'ABC Fashion GmbH' },
          { label: 'Countries', value: 'Germany, Vietnam, India' },
          { label: 'Incoterm', value: 'FOB' },
          { label: 'Payment', value: 'Letter of Credit' },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="text-sm mb-1" style={{ color: '#666' }}>{item.label}</div>
            <div className="text-xl font-bold">{item.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button onClick={onNext} whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2" style={{ backgroundColor: '#154230', color: 'white' }}>
          Next: MemoryOS <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 3: MEMORYOS
// ============================================================================

function MemoryOSPhase({ onNext }: { onNext: () => void }) {
  const [showRecommendation, setShowRecommendation] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#7C3AED15' }}>
          <Database className="w-5 h-5" style={{ color: '#7C3AED' }} />
          <span style={{ color: '#7C3AED' }}>MemoryOS</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Trade History</h2>
        <p style={{ color: '#888' }}>Click to see AI remembers past trades</p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { product: 'Cotton Shirts 8,000 units', supplier: 'Vietnam Textiles Ltd', success: '95%' },
          { product: 'Polyester Fabric', supplier: 'Saigon Textiles', success: '92%' },
        ].map((memory, i) => (
          <motion.button key={memory.supplier} onClick={() => setShowRecommendation(true)} whileHover={{ scale: 1.01 }}
            className="w-full p-6 rounded-xl text-left" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: '#7C3AED' }}>{memory.supplier}</span>
              <span className="flex items-center gap-1 text-sm" style={{ color: '#CA8A04' }}>
                <Star className="w-4 h-4 fill-current" /> {memory.success}
              </span>
            </div>
            <div className="font-bold">{memory.product}</div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showRecommendation && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl text-center mb-8" style={{ backgroundColor: '#16A34A15', border: '2px solid #16A34A' }}>
            <Sparkles className="w-8 h-8 mx-auto mb-2" style={{ color: '#16A34A' }} />
            <div className="font-bold mb-1" style={{ color: '#16A34A' }}>AI Recommendation</div>
            <div>Use <strong>Vietnam Textiles Ltd</strong> again</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center">
        <motion.button onClick={onNext} whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2" style={{ backgroundColor: '#154230', color: 'white' }}>
          Next: SkillOS <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 4: SKILLOS
// ============================================================================

function SkillOSPhase({ onNext }: { onNext: () => void }) {
  const [enabledSkills, setEnabledSkills] = useState<string[]>([]);

  const skills = [
    { name: 'Negotiation Skill', icon: DollarSign },
    { name: 'Compliance Skill', icon: Shield },
    { name: 'Freight Skill', icon: Truck },
    { name: 'Documentation Skill', icon: FileCheck },
  ];

  const toggleSkill = (name: string) => {
    setEnabledSkills(prev => prev.includes(name) ? prev : [...prev, name]);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#A6824A15' }}>
          <Zap className="w-5 h-5" style={{ color: '#A6824A' }} />
          <span style={{ color: '#A6824A' }}>SkillOS</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Skills Marketplace</h2>
        <p style={{ color: '#888' }}>Click skills to enable them for SUTAR agents</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {skills.map((skill) => (
          <motion.button key={skill.name} onClick={() => toggleSkill(skill.name)} whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl text-left flex items-center gap-4"
            style={{ backgroundColor: enabledSkills.includes(skill.name) ? '#16A34A15' : '#111', border: enabledSkills.includes(skill.name) ? '2px solid #16A34A' : '1px solid rgba(255,255,255,0.1)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: enabledSkills.includes(skill.name) ? '#16A34A' : '#222' }}>
              {enabledSkills.includes(skill.name) ? <Check className="w-6 h-6" style={{ color: 'white' }} /> : <skill.icon className="w-6 h-6" style={{ color: '#666' }} />}
            </div>
            <div className="font-bold" style={{ color: enabledSkills.includes(skill.name) ? '#16A34A' : 'white' }}>{skill.name}</div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button onClick={onNext} whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2" style={{ backgroundColor: '#154230', color: 'white' }}>
          Next: SUTAR Workforce <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 5: SUTAR WORKFORCE
// ============================================================================

function WorkforcePhase({ onNext }: { onNext: () => void }) {
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);

  const agents = [
    { name: 'Import Agent', icon: Package, color: '#0891B2' },
    { name: 'Negotiation Agent', icon: DollarSign, color: '#A6824A' },
    { name: 'Compliance Agent', icon: Shield, color: '#DC2626' },
    { name: 'Finance Agent', icon: Lock, color: '#CA8A04' },
    { name: 'Logistics Agent', icon: Truck, color: '#7C3AED' },
    { name: 'Documentation Agent', icon: FileText, color: '#6366F1' },
  ];

  const clickAgent = (index: number) => {
    if (index === activeAgent) {
      setCompletedAgents(prev => [...prev, agents[index].name]);
      setActiveAgent(null);
    } else {
      setActiveAgent(index);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#0891B215' }}>
          <Bot className="w-5 h-5" style={{ color: '#0891B2' }} />
          <span style={{ color: '#0891B2' }}>SUTAR Workforce</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Your AI Team</h2>
        <p style={{ color: '#888' }}>Click each agent to watch them work</p>
      </div>

      <div className="space-y-3 mb-8">
        {agents.map((agent, i) => {
          const isCompleted = completedAgents.includes(agent.name);
          const isActive = activeAgent === i;
          return (
            <motion.button key={agent.name} onClick={() => clickAgent(i)} whileHover={{ scale: 1.01 }}
              className="w-full p-4 rounded-xl flex items-center gap-4"
              style={{ backgroundColor: isCompleted ? '#16A34A15' : isActive ? `${agent.color}20` : '#111', border: isCompleted ? '2px solid #16A34A' : isActive ? `2px solid ${agent.color}` : '1px solid rgba(255,255,255,0.1)' }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: isCompleted ? '#16A34A' : agent.color }}>
                {isCompleted ? <Check className="w-6 h-6" style={{ color: 'white' }} /> : isActive ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                  <agent.icon className="w-6 h-6" style={{ color: 'white' }} /></motion.div> : <agent.icon className="w-6 h-6" style={{ color: 'white' }} />}
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold">{agent.name}</div>
                <div className="text-sm" style={{ color: '#888' }}>{isCompleted ? 'Task completed' : isActive ? 'Working...' : 'Waiting'}</div>
              </div>
              {isActive && <Sparkles className="w-5 h-5" style={{ color: agent.color }} />}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <motion.button onClick={onNext} whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2" style={{ backgroundColor: '#154230', color: 'white' }}>
          Next: Supplier Discovery <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 6: GLOBAL NEXHA
// ============================================================================

function NexhaPhase({ onNext }: { onNext: () => void }) {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<{ name: string; score: number; price: string }[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const search = () => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setResults([
        { name: 'Vietnam Textiles Ltd', score: 96, price: '$3.15' },
        { name: 'Saigon Apparel Co', score: 93, price: '$3.22' },
      ]);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#6366F115' }}>
          <Globe className="w-5 h-5" style={{ color: '#6366F1' }} />
          <span style={{ color: '#6366F1' }}>Global Nexha</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Supplier Discovery</h2>
        <p style={{ color: '#888' }}>Click search to connect to global trade network</p>
      </div>

      {!results.length && (
        <div className="text-center py-16">
          {searching ? (
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Search className="w-16 h-16 mx-auto mb-4" style={{ color: '#6366F1' }} />
              <div className="text-lg" style={{ color: '#888' }}>Searching global network...</div>
            </motion.div>
          ) : (
            <motion.button onClick={search} whileHover={{ scale: 1.02 }}
              className="px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: '#6366F1', color: 'white' }}>
              Search Global Network
            </motion.button>
          )}
        </div>
      )}

      {results.length > 0 && !selectedSupplier && (
        <div className="space-y-4 mb-8">
          {results.map((supplier, i) => (
            <motion.button key={supplier.name} onClick={() => setSelectedSupplier(supplier.name)} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.01 }} className="w-full p-6 rounded-xl text-left flex items-center gap-4"
              style={{ backgroundColor: i === 0 ? '#16A34A15' : '#111', border: i === 0 ? '2px solid #16A34A' : '1px solid rgba(255,255,255,0.1)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: '#154230' }}>{supplier.name.charAt(0)}</div>
              <div className="flex-1">
                <div className="font-bold">{supplier.name}</div>
                <div className="flex items-center gap-4 text-sm" style={{ color: '#888' }}>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-current" style={{ color: '#CA8A04' }} /> {supplier.score}%</span>
                  <span>{supplier.price}/unit</span>
                </div>
              </div>
              {i === 0 && <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#16A34A', color: 'white' }}>Best Match</span>}
            </motion.button>
          ))}
        </div>
      )}

      {selectedSupplier && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-xl text-center mb-8" style={{ backgroundColor: '#16A34A15', border: '2px solid #16A34A' }}>
          <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: '#16A34A' }} />
          <div className="font-bold text-lg mb-2">Supplier Selected</div>
          <div className="text-2xl font-bold mb-4">{selectedSupplier}</div>
        </motion.div>
      )}

      <div className="flex justify-center">
        <motion.button onClick={onNext} whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2" style={{ backgroundColor: '#154230', color: 'white' }}>
          Next: Negotiation <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 7: NEGOTIATION
// ============================================================================

function NegotiationPhase({ onNext }: { onNext: () => void }) {
  const [stage, setStage] = useState(0);
  const [negotiating, setNegotiating] = useState(false);

  const stages = [
    { label: 'Supplier asks', value: '$3.40', color: '#DC2626' },
    { label: 'Agent counters', value: '$3.00', color: '#0891B2' },
    { label: 'Supplier responds', value: '$3.25', color: '#DC2626' },
    { label: 'Agent final offer', value: '$3.10', color: '#0891B2' },
    { label: 'DEAL ACCEPTED', value: '$3.15', color: '#16A34A' },
  ];

  const startNegotiation = () => {
    setNegotiating(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= stages.length) {
        clearInterval(interval);
      } else {
        setStage(i);
      }
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#A6824A15' }}>
          <DollarSign className="w-5 h-5" style={{ color: '#A6824A' }} />
          <span style={{ color: '#A6824A' }}>Negotiation Agent</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">AI Negotiation</h2>
        <p style={{ color: '#888' }}>Watch AI negotiate the best price</p>
      </div>

      {!negotiating && (
        <div className="text-center">
          <motion.button onClick={startNegotiation} whileHover={{ scale: 1.02 }}
            className="px-8 py-4 rounded-xl font-bold text-lg" style={{ backgroundColor: '#A6824A', color: 'white' }}>
            Start Negotiation
          </motion.button>
        </div>
      )}

      {negotiating && (
        <div className="space-y-4 mb-8">
          {stages.slice(0, stage + 1).map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-xl flex items-center justify-between"
              style={{ backgroundColor: i === stages.length - 1 ? '#16A34A15' : '#111', border: i === stages.length - 1 ? '2px solid #16A34A' : '1px solid rgba(255,255,255,0.1)' }}>
              <div className="font-bold" style={{ color: s.color }}>{s.label}</div>
              <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
            </motion.div>
          ))}
          {stage < stages.length - 1 && (
            <div className="flex justify-center">
              <motion.div animate={{ opacity: [0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <span className="text-sm" style={{ color: '#888' }}>Negotiating...</span>
              </motion.div>
            </div>
          )}
        </div>
      )}

      {stage >= stages.length - 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-6 rounded-xl mb-8"
          style={{ backgroundColor: '#16A34A15', border: '2px solid #16A34A' }}>
          <div className="font-bold text-lg mb-2" style={{ color: '#16A34A' }}>Savings: $25,000</div>
          <div className="text-sm" style={{ color: '#888' }}>vs market rate</div>
        </motion.div>
      )}

      <div className="flex justify-center">
        <motion.button onClick={onNext} whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2" style={{ backgroundColor: '#154230', color: 'white' }}>
          Next: Comms Demo <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 8: COMMUNICATIONS
// ============================================================================

function CommsPhase({ onNext }: { onNext: () => void }) {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showCall, setShowCall] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#25D36615' }}>
          <MessageCircle className="w-5 h-5" style={{ color: '#25D366' }} />
          <span style={{ color: '#25D366' }}>Communication Assistant</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">SUTAR Handles Communications</h2>
        <p style={{ color: '#888' }}>AI manages WhatsApp, calls, and emails for you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* WhatsApp Demo */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
              <MessageCircle className="w-5 h-5" style={{ color: 'white' }} />
            </div>
            <span className="font-bold">WhatsApp</span>
          </div>
          {!showWhatsApp ? (
            <motion.button onClick={() => setShowWhatsApp(true)} whileHover={{ scale: 1.02 }}
              className="w-full py-3 rounded-xl font-medium" style={{ backgroundColor: '#25D366', color: 'white' }}>
              Simulate Supplier Message
            </motion.button>
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-xl" style={{ backgroundColor: '#DCF8C6', color: '#000' }}>
                Can we deliver in 25 days?
              </div>
              <div className="p-3 rounded-xl ml-auto" style={{ backgroundColor: '#25D366', color: 'white', maxWidth: '80%' }}>
                Based on your preferences, 25 days is acceptable. Please proceed.
              </div>
              <div className="text-xs" style={{ color: '#888' }}>SUTAR responded automatically using MemoryOS preferences</div>
            </div>
          )}
        </div>

        {/* Call Demo */}
        <div className="p-6 rounded-xl" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#16A34A' }}>
              <Phone className="w-5 h-5" style={{ color: 'white' }} />
            </div>
            <span className="font-bold">Voice Agent</span>
          </div>
          {!showCall ? (
            <motion.button onClick={() => setShowCall(true)} whileHover={{ scale: 1.02 }}
              className="w-full py-3 rounded-xl font-medium" style={{ backgroundColor: '#16A34A', color: 'white' }}>
              Simulate Incoming Call
            </motion.button>
          ) : (
            <div className="text-center">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#16A34A' }}>
                <PhoneCall className="w-10 h-10" style={{ color: 'white' }} />
              </motion.div>
              <div className="font-bold mb-2">Voice Agent Answered</div>
              <div className="p-3 rounded-xl text-left text-sm" style={{ backgroundColor: '#0A0A0A' }}>
                "Hello, this is ABC Fashion's AI Assistant. How may I help you?"
              </div>
              <div className="text-xs mt-2" style={{ color: '#888' }}>Call summary saved to MemoryOS</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button onClick={onNext} whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2" style={{ backgroundColor: '#154230', color: 'white' }}>
          Next: Documents <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 9: DOCUMENTS
// ============================================================================

function DocumentsPhase({ onNext }: { onNext: () => void }) {
  const [generatedDocs, setGeneratedDocs] = useState<string[]>([]);

  const generateDocs = () => {
    const docs = ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin'];
    docs.forEach((doc, i) => {
      setTimeout(() => { setGeneratedDocs(prev => [...prev, doc]); }, i * 500);
    });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#6366F115' }}>
          <FileText className="w-5 h-5" style={{ color: '#6366F1' }} />
          <span style={{ color: '#6366F1' }}>Documentation Agent</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Documents Generated</h2>
        <p style={{ color: '#888' }}>Click to generate trade documents</p>
      </div>

      {generatedDocs.length < 4 && (
        <div className="text-center mb-8">
          <motion.button onClick={generateDocs} whileHover={{ scale: 1.02 }}
            className="px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: '#6366F1', color: 'white' }}>
            Generate Documents
          </motion.button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin'].map((doc) => (
          <motion.div key={doc} animate={generatedDocs.includes(doc) ? { scale: [0.9, 1.05, 1] } : {}}
            className="p-6 rounded-xl flex items-center gap-4"
            style={{ backgroundColor: generatedDocs.includes(doc) ? '#16A34A15' : '#111', border: generatedDocs.includes(doc) ? '2px solid #16A34A' : '1px solid rgba(255,255,255,0.1)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: generatedDocs.includes(doc) ? '#16A34A' : '#333' }}>
              {generatedDocs.includes(doc) ? <Check className="w-6 h-6" style={{ color: 'white' }} /> : <FileText className="w-6 h-6" style={{ color: '#666' }} />}
            </div>
            <div>
              <div className="font-medium">{doc}</div>
              <div className="text-sm" style={{ color: generatedDocs.includes(doc) ? '#16A34A' : '#666' }}>
                {generatedDocs.includes(doc) ? 'Generated ✓' : 'Pending'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button onClick={onNext} whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2" style={{ backgroundColor: '#154230', color: 'white' }}>
          View Summary <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 10: COMPLETE
// ============================================================================

function CompletePhase({ onReset }: { onReset: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#16A34A' }}>
        <Check className="w-10 h-10" style={{ color: 'white' }} />
      </motion.div>

      <h2 className="text-3xl font-bold mb-2">Autonomous Import Complete</h2>
      <p className="mb-8" style={{ color: '#888' }}>AI handled everything. Just review and approve.</p>

      <div className="text-left p-6 rounded-2xl mb-8" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Supplier', value: 'Vietnam Textiles Ltd' },
            { label: 'Product', value: '10,000 Cotton Shirts' },
            { label: 'Price', value: '$3.15 (Saved $0.25)' },
            { label: 'Total', value: '$31,500' },
            { label: 'Duty', value: '12% EU Textile' },
            { label: 'ETA', value: '18 days via MSC' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div>
                <div className="text-sm" style={{ color: '#666' }}>{item.label}</div>
                <div className="font-medium">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        {['Invoice', 'Packing List', 'BL', 'COO'].map(doc => (
          <span key={doc} className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: '#16A34A15', color: '#16A34A' }}>
            <Check className="w-4 h-4 inline mr-1" /> {doc}
          </span>
        ))}
      </div>

      <motion.button onClick={onReset} whileHover={{ scale: 1.02 }}
        className="px-8 py-4 rounded-xl font-bold text-lg" style={{ backgroundColor: '#16A34A', color: 'white' }}>
        <CheckCircle2 className="w-5 h-5 inline mr-2" />
        Approve & Execute
      </motion.button>
    </motion.div>
  );
}
