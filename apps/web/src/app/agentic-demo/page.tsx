'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Database, Zap, Bot, Globe, Target, CheckCircle2, Clock, Package, DollarSign,
  Shield, Truck, FileText, Users, Building2, ChevronRight, ArrowRight, Check, Sparkles,
  Layers, Play, Star, Phone, Mail, MessageCircle, Lock, Search, FileCheck, Truck as TruckIcon,
  Scale, FileBadge, ShoppingCart, BarChart3
} from 'lucide-react';

// ============================================================================
// INTERACTIVE AUTONOMOUS IMPORT DEMO
// ============================================================================

export default function AgenticDemoPage() {
  const [activePhase, setActivePhase] = useState<string>('input');

  const phases = [
    { id: 'input', name: 'Start', icon: Target },
    { id: 'twin', name: 'TwinOS', icon: Brain },
    { id: 'memory', name: 'MemoryOS', icon: Database },
    { id: 'skills', name: 'SkillOS', icon: Zap },
    { id: 'workforce', name: 'SUTAR', icon: Bot },
    { id: 'nexha', name: 'Nexha', icon: Globe },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'complete', name: 'Complete', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A', color: 'white' }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#154230' }}>
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</span>
                <div className="text-xs" style={{ color: '#666' }}>Autonomous Import Demo</div>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-full text-sm" style={{ backgroundColor: '#0891B215', color: '#0891B2' }}>
                <Sparkles className="w-4 h-4 inline mr-1" />
                Powered by HOJAI AI
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Phase Navigation */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {phases.map((phase, i) => (
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
          {activePhase === 'input' && <InputPhase key="input" onNext={() => setActivePhase('twin')} />}
          {activePhase === 'twin' && <TwinOSPhase key="twin" onNext={() => setActivePhase('memory')} />}
          {activePhase === 'memory' && <MemoryOSPhase key="memory" onNext={() => setActivePhase('skills')} />}
          {activePhase === 'skills' && <SkillOSPhase key="skills" onNext={() => setActivePhase('workforce')} />}
          {activePhase === 'workforce' && <WorkforcePhase key="workforce" onNext={() => setActivePhase('nexha')} />}
          {activePhase === 'nexha' && <NexhaPhase key="nexha" onNext={() => setActivePhase('documents')} />}
          {activePhase === 'documents' && <DocumentsPhase key="documents" onNext={() => setActivePhase('complete')} />}
          {activePhase === 'complete' && <CompletePhase key="complete" onReset={() => setActivePhase('input')} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ============================================================================
// PHASE 1: INPUT
// ============================================================================

function InputPhase({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <h1 className="text-5xl font-bold mb-4">Autonomous Import Assistant</h1>
        <p className="text-xl mb-8" style={{ color: '#888' }}>
          Powered by HOJAI AI × Global Nexha
        </p>
      </motion.div>

      {/* Merchant Card */}
      <div className="p-8 rounded-2xl mb-8 text-left" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: '#154230' }}>
            ABC
          </div>
          <div>
            <div className="font-bold">ABC Fashion Germany</div>
            <div className="text-sm" style={{ color: '#666' }}>Merchant Dashboard</div>
          </div>
        </div>

        <div className="p-6 rounded-xl" style={{ backgroundColor: '#0A0A0A' }}>
          <div className="text-sm mb-2" style={{ color: '#666' }}>What do you need?</div>
          <div className="text-lg font-medium mb-4">
            "Import 10,000 cotton shirts from Vietnam. Budget: $300,000. Delivery: 30 days."
          </div>
          <div className="text-sm" style={{ color: '#888' }}>
            Click <strong style={{ color: '#A6824A' }}>Start Autonomous Trade</strong> to watch the AI handle everything
          </div>
        </div>
      </div>

      <motion.button
        onClick={onNext}
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

function TwinOSPhase({ onNext }: { onNext: () => void }) {
  const [loaded, setLoaded] = useState(false);

  useState(() => {
    setTimeout(() => setLoaded(true), 500);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#0891B215' }}>
          <Brain className="w-5 h-5" style={{ color: '#0891B2' }} />
          <span style={{ color: '#0891B2' }}>TwinOS</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Merchant Twin Loaded</h2>
        <p style={{ color: '#888' }}>AI knows who you are and your trade preferences</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Company', value: 'ABC Fashion GmbH' },
          { label: 'Countries', value: 'Germany, Vietnam, India' },
          { label: 'Incoterm', value: 'FOB' },
          { label: 'Payment', value: 'Letter of Credit' },
          { label: 'Volume', value: '$2.4M annually' },
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
            <div className="text-xl font-bold">{item.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          style={{ backgroundColor: '#154230', color: 'white' }}
        >
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
  const [showMemories, setShowMemories] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#7C3AED15' }}>
          <Database className="w-5 h-5" style={{ color: '#7C3AED' }} />
          <span style={{ color: '#7C3AED' }}>MemoryOS</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Trade History</h2>
        <p style={{ color: '#888' }}>Click to see what AI remembers about your business</p>
      </div>

      {/* Memory Cards */}
      <div className="space-y-4 mb-8">
        {[
          { year: '2025', product: 'Cotton Shirts 8,000 units', supplier: 'Vietnam Textiles Ltd', amount: '$285,000', success: '95%' },
          { year: '2024', product: 'Polyester Fabric', supplier: 'Saigon Textiles', amount: '$142,000', success: '92%' },
          { year: '2024', product: 'Cotton Yarn', supplier: 'Vietnam Fabric Co', amount: '$98,000', success: '97%' },
        ].map((memory, i) => (
          <motion.button
            key={memory.supplier}
            onClick={() => { setShowMemories(true); setTimeout(() => setShowRecommendation(true), 500); }}
            whileHover={{ scale: 1.01 }}
            className="w-full p-6 rounded-xl text-left"
            style={{ backgroundColor: showMemories && i === 0 ? '#16A34A15' : '#111', border: showMemories && i === 0 ? '2px solid #16A34A' : '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#7C3AED20', color: '#7C3AED' }}>{memory.year}</span>
              <span className="flex items-center gap-1 text-sm" style={{ color: '#CA8A04' }}>
                <Star className="w-4 h-4 fill-current" /> {memory.success} success
              </span>
            </div>
            <div className="font-bold mb-1">{memory.product}</div>
            <div className="text-sm" style={{ color: '#888' }}>{memory.supplier} • {memory.amount}</div>
          </motion.button>
        ))}
      </div>

      {/* Recommendation */}
      <AnimatePresence>
        {showRecommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 rounded-xl text-center"
            style={{ backgroundColor: '#16A34A15', border: '2px solid #16A34A' }}
          >
            <Sparkles className="w-8 h-8 mx-auto mb-2" style={{ color: '#16A34A' }} />
            <div className="font-bold mb-1" style={{ color: '#16A34A' }}>AI Recommendation</div>
            <div>Use <strong>Vietnam Textiles Ltd</strong> again</div>
            <div className="text-sm mt-1" style={{ color: '#888' }}>Previous success: 95% • Preferred partner</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center mt-8">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          style={{ backgroundColor: '#154230', color: 'white' }}
        >
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
    { name: 'Negotiation Skill', desc: 'Auto-negotiate best prices', icon: DollarSign },
    { name: 'Compliance Skill', desc: 'EU textile regulations', icon: Shield },
    { name: 'Freight Skill', desc: 'Container booking', icon: Truck },
    { name: 'Documentation Skill', desc: 'Invoice, BL, COO', icon: FileCheck },
    { name: 'Translation Skill', desc: 'Vietnamese ↔ German', icon: Globe },
    { name: 'WhatsApp Skill', desc: 'Supplier chat', icon: MessageCircle },
  ];

  const toggleSkill = (name: string) => {
    setEnabledSkills(prev => prev.includes(name) ? prev : [...prev, name]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#A6824A15' }}>
          <Zap className="w-5 h-5" style={{ color: '#A6824A' }} />
          <span style={{ color: '#A6824A' }}>SkillOS</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Skills Marketplace</h2>
        <p style={{ color: '#888' }}>Click skills to enable them for your AI workforce</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {skills.map((skill) => (
          <motion.button
            key={skill.name}
            onClick={() => toggleSkill(skill.name)}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl text-left flex items-center gap-4"
            style={{
              backgroundColor: enabledSkills.includes(skill.name) ? '#16A34A15' : '#111',
              border: enabledSkills.includes(skill.name) ? '2px solid #16A34A' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: enabledSkills.includes(skill.name) ? '#16A34A' : '#222' }}>
              {enabledSkills.includes(skill.name) ? (
                <Check className="w-6 h-6" style={{ color: 'white' }} />
              ) : (
                <skill.icon className="w-6 h-6" style={{ color: '#666' }} />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold" style={{ color: enabledSkills.includes(skill.name) ? '#16A34A' : 'white' }}>{skill.name}</div>
              <div className="text-sm" style={{ color: '#888' }}>{skill.desc}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          style={{ backgroundColor: '#154230', color: 'white' }}
        >
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
    { name: 'Import Agent', task: 'Searching suppliers...', icon: Package, color: '#0891B2' },
    { name: 'Negotiation Agent', task: 'Negotiating price...', icon: DollarSign, color: '#A6824A' },
    { name: 'Compliance Agent', task: 'Checking regulations...', icon: Shield, color: '#DC2626' },
    { name: 'Finance Agent', task: 'Setting up escrow...', icon: Lock, color: '#CA8A04' },
    { name: 'Logistics Agent', task: 'Booking freight...', icon: Truck, color: '#7C3AED' },
    { name: 'Documentation Agent', task: 'Preparing docs...', icon: FileText, color: '#6366F1' },
  ];

  const clickAgent = (index: number) => {
    if (index === activeAgent) {
      // Complete this agent
      setCompletedAgents(prev => [...prev, agents[index].name]);
      setActiveAgent(null);
    } else {
      setActiveAgent(index);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#0891B215' }}>
          <Bot className="w-5 h-5" style={{ color: '#0891B2' }} />
          <span style={{ color: '#0891B2' }}>SUTAR Workforce</span>
        </div>
        <h2 className="text-3xl font-bold mb-2">Your AI Team</h2>
        <p style={{ color: '#888' }}>Click each agent to watch them work. Click again to complete.</p>
      </div>

      <div className="space-y-3 mb-8">
        {agents.map((agent, i) => {
          const isCompleted = completedAgents.includes(agent.name);
          const isActive = activeAgent === i;

          return (
            <motion.button
              key={agent.name}
              onClick={() => clickAgent(i)}
              whileHover={{ scale: 1.01 }}
              className="w-full p-4 rounded-xl flex items-center gap-4"
              style={{
                backgroundColor: isCompleted ? '#16A34A15' : isActive ? `${agent.color}20` : '#111',
                border: isCompleted ? '2px solid #16A34A' : isActive ? `2px solid ${agent.color}` : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: isCompleted ? '#16A34A' : agent.color }}>
                {isCompleted ? (
                  <Check className="w-6 h-6" style={{ color: 'white' }} />
                ) : isActive ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                    <agent.icon className="w-6 h-6" style={{ color: 'white' }} />
                  </motion.div>
                ) : (
                  <agent.icon className="w-6 h-6" style={{ color: 'white' }} />
                )}
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold">{agent.name}</div>
                <div className="text-sm" style={{ color: '#888' }}>
                  {isCompleted ? 'Task completed' : isActive ? 'Working...' : 'Waiting'}
                </div>
              </div>
              {isActive && (
                <Sparkles className="w-5 h-5" style={{ color: agent.color }} />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="flex justify-center">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          style={{ backgroundColor: '#154230', color: 'white' }}
        >
          Next: Global Nexha <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 6: GLOBAL NEXHA
// ============================================================================

function NexhaPhase({ onNext }: { onNext: () => void }) {
  const [searching, setSearching] = useState(true);
  const [results, setResults] = useState<{ name: string; score: number; price: string }[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const search = () => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setResults([
        { name: 'Vietnam Textiles Ltd', score: 96, price: '$3.15' },
        { name: 'Saigon Apparel Co', score: 93, price: '$3.22' },
        { name: 'Asia Garments Ltd', score: 91, price: '$3.28' },
      ]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
            <motion.button
              onClick={search}
              whileHover={{ scale: 1.02 }}
              className="px-6 py-3 rounded-xl font-medium"
              style={{ backgroundColor: '#6366F1', color: 'white' }}
            >
              Search Global Network
            </motion.button>
          )}
        </div>
      )}

      {results.length > 0 && !selectedSupplier && (
        <div className="space-y-4 mb-8">
          <div className="text-sm mb-2" style={{ color: '#888' }}>Found suppliers:</div>
          {results.map((supplier, i) => (
            <motion.button
              key={supplier.name}
              onClick={() => setSelectedSupplier(supplier.name)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.01 }}
              className="w-full p-6 rounded-xl text-left flex items-center gap-4"
              style={{
                backgroundColor: i === 0 ? '#16A34A15' : '#111',
                border: i === 0 ? '2px solid #16A34A' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ backgroundColor: '#154230' }}>
                {supplier.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-bold">{supplier.name}</div>
                <div className="flex items-center gap-4 text-sm" style={{ color: '#888' }}>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" style={{ color: '#CA8A04' }} /> {supplier.score}%
                  </span>
                  <span>{supplier.price}/unit</span>
                </div>
              </div>
              {i === 0 && <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#16A34A', color: 'white' }}>Best Match</span>}
            </motion.button>
          ))}

          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: '#16A34A15', border: '1px solid #16A34A' }}>
            <div className="font-bold" style={{ color: '#16A34A' }}>Savings vs Market Rate</div>
            <div className="text-2xl font-bold">$25,000</div>
          </div>
        </div>
      )}

      {selectedSupplier && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-xl text-center"
          style={{ backgroundColor: '#16A34A15', border: '2px solid #16A34A' }}
        >
          <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: '#16A34A' }} />
          <div className="font-bold text-lg mb-2">Supplier Selected</div>
          <div className="text-2xl font-bold mb-4">{selectedSupplier}</div>
          <div className="text-sm" style={{ color: '#888' }}>Click Next to continue</div>
        </motion.div>
      )}

      <div className="flex justify-center mt-8">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          style={{ backgroundColor: '#154230', color: 'white' }}
        >
          Next: Documents <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 7: DOCUMENTS
// ============================================================================

function DocumentsPhase({ onNext }: { onNext: () => void }) {
  const [generatedDocs, setGeneratedDocs] = useState<string[]>([]);

  const generateDocs = () => {
    const docs = ['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin'];
    docs.forEach((doc, i) => {
      setTimeout(() => {
        setGeneratedDocs(prev => [...prev, doc]);
      }, i * 500);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
          <motion.button
            onClick={generateDocs}
            whileHover={{ scale: 1.02 }}
            className="px-6 py-3 rounded-xl font-medium"
            style={{ backgroundColor: '#6366F1', color: 'white' }}
          >
            Generate Documents
          </motion.button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {['Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin'].map((doc) => (
          <motion.div
            key={doc}
            animate={generatedDocs.includes(doc) ? { scale: [0.9, 1.05, 1] } : {}}
            className="p-6 rounded-xl flex items-center gap-4"
            style={{
              backgroundColor: generatedDocs.includes(doc) ? '#16A34A15' : '#111',
              border: generatedDocs.includes(doc) ? '2px solid #16A34A' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: generatedDocs.includes(doc) ? '#16A34A' : '#333' }}>
              {generatedDocs.includes(doc) ? (
                <Check className="w-6 h-6" style={{ color: 'white' }} />
              ) : (
                <FileText className="w-6 h-6" style={{ color: '#666' }} />
              )}
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
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.02 }}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2"
          style={{ backgroundColor: '#154230', color: 'white' }}
        >
          View Summary <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// PHASE 8: COMPLETE
// ============================================================================

function CompletePhase({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring' }}
        className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
        style={{ backgroundColor: '#16A34A' }}
      >
        <Check className="w-10 h-10" style={{ color: 'white' }} />
      </motion.div>

      <h2 className="text-3xl font-bold mb-2">Autonomous Import Complete</h2>
      <p className="mb-8" style={{ color: '#888' }}>AI handled everything. Just review and approve.</p>

      {/* Summary */}
      <div className="text-left p-6 rounded-2xl mb-8" style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Supplier', value: 'Vietnam Textiles Ltd', icon: Users },
            { label: 'Product', value: '10,000 Cotton Shirts', icon: Package },
            { label: 'Unit Price', value: '$3.15 (Saved $0.25)', icon: DollarSign },
            { label: 'Total', value: '$31,500', icon: Building2 },
            { label: 'Duty', value: '12% EU Textile', icon: Scale },
            { label: 'ETA', value: '18 days via MSC', icon: Truck },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <item.icon className="w-5 h-5" style={{ color: '#A6824A' }} />
              <div>
                <div className="text-sm" style={{ color: '#666' }}>{item.label}</div>
                <div className="font-medium">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="flex justify-center gap-4 mb-8">
        {['Invoice', 'Packing List', 'BL', 'COO'].map(doc => (
          <span key={doc} className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: '#16A34A15', color: '#16A34A' }}>
            <Check className="w-4 h-4 inline mr-1" /> {doc}
          </span>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.02 }}
          className="px-8 py-4 rounded-xl font-bold text-lg"
          style={{ backgroundColor: '#16A34A', color: 'white' }}
        >
          <CheckCircle2 className="w-5 h-5 inline mr-2" />
          Approve & Execute
        </motion.button>
      </div>
    </motion.div>
  );
}
