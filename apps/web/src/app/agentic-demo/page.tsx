'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, MemoryStick, Users, Bot, Zap, Globe, ShoppingCart, FileText, Truck, Shield,
  CheckCircle2, Clock, Database, Building, Package, DollarSign, Lock, ArrowRight,
  Check, Sparkles, Layers, Target, TrendingUp, Activity, MessageCircle, Mail,
  Phone, Settings, ChevronRight, BarChart3, Navigation, CreditCard, Briefcase,
  Network, Package as PackageIcon, Building2, Play, Pause, FileCheck
} from 'lucide-react';

// ============================================================================
// AGENTIC COMMERCE DEMO - LEVERAGE × HOJAI × GLOBAL NEXHA
// ============================================================================

export default function AgenticDemoPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRunning, setIsRunning] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'twin', label: 'Merchant Twin', icon: Brain },
    { id: 'memory', label: 'MemoryOS', icon: Database },
    { id: 'skills', label: 'SkillOS', icon: Zap },
    { id: 'sutars', label: 'SUTAR Workforce', icon: Bot },
    { id: 'nexha', label: 'Global Nexha', icon: Globe },
    { id: 'scenario', label: 'Import Scenario', icon: Target },
  ];

  useEffect(() => {
    if (isRunning) {
      const agentTimer = setInterval(() => {
        setActiveAgent(prev => {
          const agents = ['ceo', 'import', 'negotiation', 'finance', 'logistics', 'documentation'];
          const current = agents.indexOf(prev || 'ceo');
          return agents[(current + 1) % agents.length];
        });
      }, 2000);
      return () => clearInterval(agentTimer);
    }
  }, [isRunning]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E6E2DA' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderColor: 'rgba(0,0,0,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#154230' }}>
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</span>
                <div className="text-xs" style={{ color: '#4A4A4A' }}>Agentic Commerce</div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: '#0891B215' }}>
                <Brain className="w-4 h-4" style={{ color: '#0891B2' }} />
                <span className="text-sm font-medium" style={{ color: '#0891B2' }}>AI Agentic Engine Active</span>
              </div>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white"
                style={{ backgroundColor: isRunning ? '#DC2626' : '#154230' }}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isRunning ? 'Stop Demo' : 'Auto Demo'}
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: activeTab === tab.id ? '#154230' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#4A4A4A',
                }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <Dashboard key="dashboard" isRunning={isRunning} setActiveTab={setActiveTab} />}
          {activeTab === 'twin' && <MerchantTwin key="twin" isRunning={isRunning} />}
          {activeTab === 'memory' && <MemoryOS key="memory" isRunning={isRunning} />}
          {activeTab === 'skills' && <SkillOS key="skills" isRunning={isRunning} />}
          {activeTab === 'sutars' && <SUTARWorkforce key="sutars" isRunning={isRunning} activeAgent={activeAgent} />}
          {activeTab === 'nexha' && <GlobalNexha key="nexha" isRunning={isRunning} />}
          {activeTab === 'scenario' && <ImportScenario key="scenario" isRunning={isRunning} setActiveTab={setActiveTab} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

// ============================================================================
// DASHBOARD
// ============================================================================

function Dashboard({ isRunning, setActiveTab }: { isRunning: boolean; setActiveTab: (tab: string) => void }) {
  const stats = [
    { label: 'Active Agents', value: 12, icon: Bot, color: '#0891B2', tab: 'sutars' },
    { label: 'Pending Approvals', value: 3, icon: Clock, color: '#CA8A04', tab: 'scenario' },
    { label: 'Global Nexha Activity', value: 47, icon: Globe, color: '#7C3AED', tab: 'nexha' },
    { label: 'Trade Volume', value: '$2.4M', icon: TrendingUp, color: '#16A34A', tab: 'twin' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#101111' }}>Agentic Trade Dashboard</h1>
        <p style={{ color: '#4A4A4A' }}>Monitor your AI workforce and trade operations</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveTab(stat.tab)}
            className="p-6 rounded-2xl cursor-pointer"
            style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
              <ChevronRight className="w-5 h-5" style={{ color: '#4A4A4A' }} />
            </div>
            <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-sm" style={{ color: '#4A4A4A' }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Agent Activity */}
        <div className="p-6 rounded-2xl" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-3 mb-6">
            <Bot className="w-6 h-6" style={{ color: '#0891B2' }} />
            <h2 className="text-xl font-bold" style={{ color: '#101111' }}>Active Agents</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: 'CEO Agent', status: 'Analyzing trade opportunities', progress: 78 },
              { name: 'Import Agent', status: 'Processing 12 shipments', progress: 92 },
              { name: 'Negotiation Agent', status: 'Chatting with 5 suppliers', progress: 65 },
              { name: 'Finance Agent', status: 'Managing 8 escrows', progress: 85 },
            ].map((agent) => (
              <div key={agent.name} className="p-4 rounded-xl" style={{ backgroundColor: '#F7F6F2' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium" style={{ color: '#101111' }}>{agent.name}</span>
                  <span className="text-sm" style={{ color: '#4A4A4A' }}>{agent.progress}%</span>
                </div>
                <div className="h-2 rounded-full" style={{ backgroundColor: '#E5E5E5' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#0891B2' }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${agent.progress}%` }}
                  />
                </div>
                <div className="text-sm mt-2" style={{ color: '#4A4A4A' }}>{agent.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 rounded-2xl" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6" style={{ color: '#16A34A' }} />
            <h2 className="text-xl font-bold" style={{ color: '#101111' }}>Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {[
              { icon: '📄', text: 'Invoice INV-2024-001 generated', time: '2 min ago' },
              { icon: '🚢', text: 'Shipment MSC123 tracked to Hamburg', time: '5 min ago' },
              { icon: '💰', text: 'Escrow $45,000 secured', time: '8 min ago' },
              { icon: '📞', text: 'Call with Vietnam Textiles completed', time: '12 min ago' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ backgroundColor: '#F7F6F2' }}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div style={{ color: '#101111' }}>{item.text}</div>
                  <div className="text-sm" style={{ color: '#4A4A4A' }}>{item.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MERCHANT TWIN
// ============================================================================

function MerchantTwin({ isRunning }: { isRunning: boolean }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-8 h-8" style={{ color: '#0891B2' }} />
          <h1 className="text-4xl font-bold" style={{ color: '#101111' }}>Merchant Twin</h1>
        </div>
        <p style={{ color: '#4A4A4A' }}>Digital representation of your company - Source of truth for AI agents</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#101111' }}>Company Profile</h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#154230' }}>
              ABC
            </div>
            <div>
              <div className="text-xl font-bold" style={{ color: '#101111' }}>ABC Global Textiles Ltd</div>
              <div style={{ color: '#4A4A4A' }}>Textiles & Apparel</div>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />
                <span className="text-sm" style={{ color: '#16A34A' }}>Verified Merchant</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#F7F6F2' }}>
              <div className="text-2xl font-bold" style={{ color: '#0891B2' }}>98%</div>
              <div className="text-sm" style={{ color: '#4A4A4A' }}>Trust Score</div>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: '#F7F6F2' }}>
              <div className="text-2xl font-bold" style={{ color: '#0891B2' }}>47</div>
              <div className="text-sm" style={{ color: '#4A4A4A' }}>Network Members</div>
            </div>
          </div>

          <h3 className="font-bold mb-3" style={{ color: '#101111' }}>Operating Countries</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {['India', 'Vietnam', 'Germany', 'UAE'].map(country => (
              <span key={country} className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#15423015', color: '#154230' }}>
                {country}
              </span>
            ))}
          </div>

          <h3 className="font-bold mb-3" style={{ color: '#101111' }}>Trade Goals</h3>
          <div className="space-y-2">
            {['Expand EU exports', 'Reduce freight cost by 10%', 'New supplier relationships'].map(goal => (
              <div key={goal} className="flex items-center gap-2">
                <Target className="w-4 h-4" style={{ color: '#0891B2' }} />
                <span style={{ color: '#101111' }}>{goal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#101111' }}>Trade Preferences</h2>
          <p className="text-sm mb-6" style={{ color: '#4A4A4A' }}>Agents use these for autonomous decisions</p>

          <div className="space-y-4">
            {[
              { label: 'Incoterm', value: 'FOB' },
              { label: 'Shipping', value: 'Ocean Freight' },
              { label: 'Payment', value: 'Letter of Credit' },
              { label: 'Currency', value: 'USD' },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: '#F7F6F2' }}>
                <span className="text-sm" style={{ color: '#4A4A4A' }}>{pref.label}</span>
                <span className="font-medium" style={{ color: '#101111' }}>{pref.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl" style={{ backgroundColor: '#0891B215', border: '1px solid rgba(8,145,178,0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5" style={{ color: '#0891B2' }} />
              <span className="font-medium" style={{ color: '#0891B2' }}>Agent Access</span>
            </div>
            <p className="text-sm" style={{ color: '#4A4A4A' }}>
              All SUTAR agents work against this Twin. No UI state access.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MEMORY OS
// ============================================================================

function MemoryOS({ isRunning }: { isRunning: boolean }) {
  const [activeMemory, setActiveMemory] = useState('trade');

  const memories = {
    trade: [
      { title: 'Order #ORD-001', preview: '50 MT Basmati Rice - $42,500 - Shipped' },
      { title: 'RFQ #RFQ-2024-089', preview: 'Cotton Yarn 10,000 KG - Pending quotes' },
      { title: 'Contract #CT-2024-045', preview: 'Steel Billets - $125,000 - Active' },
    ],
    relationships: [
      { title: 'Vietnam Textiles Ltd', preview: 'Last order: 3 weeks ago - Trust: 95%', location: 'Vietnam' },
      { title: 'Germany Trading GmbH', preview: 'Last order: 1 week ago - Trust: 98%', location: 'Germany' },
      { title: 'UAE Merchants LLC', preview: 'Last order: 2 days ago - Trust: 92%', location: 'UAE' },
    ],
  };

  const currentMemories = activeMemory === 'trade' ? memories.trade : memories.relationships;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <MemoryStick className="w-8 h-8" style={{ color: '#7C3AED' }} />
          <h1 className="text-4xl font-bold" style={{ color: '#101111' }}>MemoryOS</h1>
        </div>
        <p style={{ color: '#4A4A4A' }}>Persistent memory for trade intelligence</p>
      </div>

      <div className="flex gap-2 mb-6">
        {['trade', 'relationships'].map(type => (
          <button
            key={type}
            onClick={() => setActiveMemory(type)}
            className="px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all"
            style={{
              backgroundColor: activeMemory === type ? '#7C3AED' : '#F7F6F2',
              color: activeMemory === type ? 'white' : '#4A4A4A',
            }}
          >
            {type === 'trade' ? 'Trade Memory' : 'Relationships'}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {currentMemories.map((item: any, i: number) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl cursor-pointer"
            style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium" style={{ color: '#101111' }}>{item.title}</span>
              <ChevronRight className="w-5 h-5" style={{ color: '#4A4A4A' }} />
            </div>
            <p className="text-sm mb-2" style={{ color: '#4A4A4A' }}>{item.preview}</p>
            {item.location && (
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#7C3AED15', color: '#7C3AED' }}>
                {item.location}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: '#7C3AED15', border: '2px solid rgba(124,58,237,0.3)' }}>
        <h3 className="font-bold mb-4" style={{ color: '#101111' }}>Example Query</h3>
        <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: 'white' }}>
          <div className="text-sm" style={{ color: '#4A4A4A' }}>"Use the same logistics provider we used last year for Germany shipments"</div>
        </div>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5" style={{ color: '#7C3AED' }} />
          <div className="flex-1 p-4 rounded-xl" style={{ backgroundColor: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.3)' }}>
            <div className="font-medium" style={{ color: '#16A34A' }}>Memory Retrieved:</div>
            <div style={{ color: '#101111' }}>Provider: <strong>MSC Logistics</strong></div>
            <div style={{ color: '#4A4A4A' }}>Success Rate: <strong>97%</strong> • Average Cost: <strong>$4,200</strong></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SKILL OS
// ============================================================================

function SkillOS({ isRunning }: { isRunning: boolean }) {
  const skills = [
    { name: 'Email Assistant', enabled: true, icon: Mail },
    { name: 'WhatsApp Integration', enabled: true, icon: MessageCircle },
    { name: 'Voice Calls', enabled: true, icon: Phone },
    { name: 'RFQ Management', enabled: true, icon: FileText },
    { name: 'Freight Booking', enabled: true, icon: Truck },
    { name: 'Escrow Management', enabled: true, icon: Lock },
    { name: 'Document Generation', enabled: true, icon: FileCheck },
    { name: 'Translation', enabled: true, icon: Globe },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-8 h-8" style={{ color: '#A6824A' }} />
          <h1 className="text-4xl font-bold" style={{ color: '#101111' }}>SkillOS</h1>
        </div>
        <p style={{ color: '#4A4A4A' }}>App Store for AI workers - Enable skills your agents can use</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl"
            style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <skill.icon className="w-5 h-5" style={{ color: '#A6824A' }} />
              <span style={{ color: '#101111' }}>{skill.name}</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#16A34A20', color: '#16A34A' }}>
              Enabled
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-2xl text-center" style={{ backgroundColor: '#A6824A15', border: '2px solid rgba(166,130,74,0.3)' }}>
        <Sparkles className="w-8 h-8 mx-auto mb-3" style={{ color: '#A6824A' }} />
        <h3 className="text-lg font-bold mb-2" style={{ color: '#101111' }}>Skills power your SUTAR Workforce</h3>
        <p style={{ color: '#4A4A4A' }}>Enable skills to give your AI agents new capabilities</p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SUTAR WORKFORCE
// ============================================================================

function SUTARWorkforce({ isRunning, activeAgent }: { isRunning: boolean; activeAgent: string | null }) {
  const agents = [
    { id: 'ceo', name: 'CEO Agent', desc: 'Strategic decisions', color: '#7C3AED' },
    { id: 'import', name: 'Import Agent', desc: 'Sourcing & procurement', color: '#0891B2' },
    { id: 'export', name: 'Export Agent', desc: 'Market expansion', color: '#154230' },
    { id: 'negotiation', name: 'Negotiation Agent', desc: 'Deals & contracts', color: '#A6824A' },
    { id: 'finance', name: 'Finance Agent', desc: 'Payments & escrow', color: '#CA8A04' },
    { id: 'compliance', name: 'Compliance Agent', desc: 'Regulations & duties', color: '#DC2626' },
    { id: 'documentation', name: 'Documentation Agent', desc: 'Invoices & BL & COO', color: '#6366F1' },
    { id: 'logistics', name: 'Logistics Agent', desc: 'Shipping & tracking', color: '#8B5CF6' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Bot className="w-8 h-8" style={{ color: '#0891B2' }} />
          <h1 className="text-4xl font-bold" style={{ color: '#101111' }}>SUTAR Workforce</h1>
        </div>
        <p style={{ color: '#4A4A4A' }}>Your autonomous AI workforce - Not a chatbot, an AI company</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl cursor-pointer relative overflow-hidden"
            style={{
              backgroundColor: 'white',
              border: activeAgent === agent.id ? `2px solid ${agent.color}` : '1px solid rgba(0,0,0,0.08)',
            }}
          >
            {activeAgent === agent.id && (
              <motion.div
                className="absolute top-2 right-2 w-3 h-3 rounded-full"
                style={{ backgroundColor: agent.color }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${agent.color}20` }}>
              <Bot className="w-6 h-6" style={{ color: agent.color }} />
            </div>
            <div className="font-bold mb-1" style={{ color: '#101111' }}>{agent.name}</div>
            <div className="text-sm" style={{ color: '#4A4A4A' }}>{agent.desc}</div>
            {isRunning && activeAgent === agent.id && (
              <div className="mt-3 flex items-center gap-2">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <Sparkles className="w-4 h-4" style={{ color: agent.color }} />
                </motion.div>
                <span className="text-xs" style={{ color: agent.color }}>Active</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-2xl" style={{ backgroundColor: '#0891B215', border: '2px solid rgba(8,145,178,0.3)' }}>
        <h3 className="font-bold mb-4" style={{ color: '#101111' }}>Agent Architecture</h3>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {['Merchant', 'SUTAR', 'Skills', 'Global Nexha'].map((item, i) => (
            <div key={item} className="flex items-center">
              <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: 'white' }}>
                {item}
              </div>
              {i < 3 && <ArrowRight className="w-5 h-5 mx-2" style={{ color: '#0891B2' }} />}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// GLOBAL NEXHA
// ============================================================================

function GlobalNexha({ isRunning }: { isRunning: boolean }) {
  const networks = [
    { name: 'Supplier Network', count: 50000, icon: Users },
    { name: 'Logistics Partners', count: 1200, icon: Truck },
    { name: 'Insurance Providers', count: 45, icon: Shield },
    { name: 'Banks & Finance', count: 200, icon: Building2 },
    { name: 'Customs Brokers', count: 500, icon: FileCheck },
    { name: 'Warehouses', count: 800, icon: Package },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Network className="w-8 h-8" style={{ color: '#7C3AED' }} />
          <h1 className="text-4xl font-bold" style={{ color: '#101111' }}>Global Nexha</h1>
        </div>
        <p style={{ color: '#4A4A4A' }}>Your gateway to the global agent network</p>
      </div>

      <div className="grid md:grid-cols-6 gap-4 mb-8">
        {networks.map((network) => (
          <motion.div
            key={network.name}
            whileHover={{ scale: 1.05 }}
            className="p-4 rounded-xl text-center"
            style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}
          >
            <network.icon className="w-8 h-8 mx-auto mb-2" style={{ color: '#7C3AED' }} />
            <div className="text-2xl font-bold" style={{ color: '#7C3AED' }}>{network.count.toLocaleString()}+</div>
            <div className="text-xs" style={{ color: '#4A4A4A' }}>{network.name}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { name: 'Supplier Agent Network', desc: 'Auto-negotiate, auto-match' },
          { name: 'Freight Agent Network', desc: 'Compare & book carriers' },
          { name: 'Insurance Agent Network', desc: 'Instant quotes & claims' },
        ].map((agent) => (
          <div key={agent.name} className="p-4 rounded-xl flex items-center gap-4" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#7C3AED15' }}>
              <Globe className="w-6 h-6" style={{ color: '#7C3AED' }} />
            </div>
            <div>
              <div className="font-medium" style={{ color: '#101111' }}>{agent.name}</div>
              <div className="text-sm" style={{ color: '#4A4A4A' }}>{agent.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================================
// IMPORT SCENARIO
// ============================================================================

function ImportScenario({ isRunning, setActiveTab }: { isRunning: boolean; setActiveTab: (tab: string) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const steps = [
    { agent: 'AI Copilot', action: 'Intent Detection', desc: 'Import order detected' },
    { agent: 'Import Agent', action: 'Sourcing', desc: 'Finding suppliers...' },
    { agent: 'Negotiation Agent', action: 'Supplier Discovery', desc: '12 suppliers found' },
    { agent: 'Negotiation Agent', action: 'Price Negotiation', desc: 'Best price: $3.10/kg' },
    { agent: 'Compliance Agent', action: 'HS Code Check', desc: '620520 - Duty: 12%' },
    { agent: 'Finance Agent', action: 'Escrow Created', desc: '$31,000 secured' },
    { agent: 'Logistics Agent', action: 'Freight Booking', desc: 'MSC - 18 days' },
    { agent: 'Documentation Agent', action: 'Docs Generated', desc: 'Invoice, BL, COO ready' },
    { agent: 'Merchant', action: 'Approval Required', desc: 'Review & confirm' },
  ];

  useEffect(() => {
    if (isSimulating && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isSimulating]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-8 h-8" style={{ color: '#DC2626' }} />
          <h1 className="text-4xl font-bold" style={{ color: '#101111' }}>Import Scenario</h1>
        </div>
        <p style={{ color: '#4A4A4A' }}>Watch autonomous execution from goal to completion</p>
      </div>

      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: '#154230', color: 'white' }}>
        <div className="text-sm mb-2 opacity-70">User Input</div>
        <div className="text-lg font-medium">
          "Import 10,000 cotton shirts from Vietnam to Germany. Budget: $300,000. Delivery: 30 days."
        </div>
      </div>

      {!isSimulating && currentStep === 0 && (
        <button
          onClick={() => { setCurrentStep(1); setIsSimulating(true); }}
          className="w-full py-4 rounded-xl font-bold text-white mb-6"
          style={{ backgroundColor: '#DC2626' }}
        >
          ▶️ Start Autonomous Execution
        </button>
      )}

      <div className="space-y-3 mb-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.agent + i}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: i < currentStep ? 1 : i === currentStep ? 1 : 0.3,
              x: 0,
              scale: i === currentStep ? 1.02 : 1,
            }}
            className="p-4 rounded-xl flex items-center gap-4"
            style={{
              backgroundColor: i < currentStep ? 'rgba(22,163,74,0.1)' : i === currentStep ? 'rgba(220,38,38,0.1)' : '#F7F6F2',
              border: i === currentStep ? '2px solid #DC2626' : '1px solid transparent',
            }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: i < currentStep ? '#16A34A' : i === currentStep ? '#DC2626' : '#4A4A4A',
              }}>
              {i < currentStep ? (
                <Check className="w-5 h-5 text-white" />
              ) : i === currentStep ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
              ) : (
                <span className="text-white text-sm">{i + 1}</span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium" style={{ color: i < currentStep ? '#16A34A' : '#101111' }}>{step.agent}</span>
                <ArrowRight className="w-4 h-4" style={{ color: '#4A4A4A' }} />
                <span style={{ color: '#101111' }}>{step.action}</span>
              </div>
              <div className="text-sm" style={{ color: '#4A4A4A' }}>{step.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {currentStep >= steps.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-2xl text-center"
          style={{ backgroundColor: 'rgba(22,163,74,0.1)', border: '2px solid #16A34A' }}
        >
          <CheckCircle2 className="w-12 h-12 mx-auto mb-4" style={{ color: '#16A34A' }} />
          <h3 className="text-xl font-bold mb-2" style={{ color: '#101111' }}>Ready for Approval</h3>
          <p className="mb-4" style={{ color: '#4A4A4A' }}>All agents have completed their tasks autonomously</p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 rounded-xl font-medium text-white" style={{ backgroundColor: '#DC2626' }}>
              Approve & Execute
            </button>
            <button className="px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: '#F7F6F2', color: '#101111' }}>
              Modify Request
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
