'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bot, Brain, Sparkles, Layers, ChevronRight, Zap, Globe, Database, Activity, Rocket, Play, Pause, RefreshCw, DollarSign, Package, Truck, FileText, Users, TrendingUp } from 'lucide-react';

// ============================================================================
// FUNCTIONAL DEMO PAGE - INTERACTIVE SHOWCASE
// ============================================================================

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [counter, setCounter] = useState(0);

  // Auto-increment counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(c => c + Math.floor(Math.random() * 1000));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const demos = [
    {
      id: 'import',
      name: 'Import Demo',
      icon: Package,
      color: '#00D4FF',
      steps: [
        'TwinOS loading company profile...',
        'MemoryOS checking past suppliers...',
        'Global Nexha searching Vietnam...',
        '17 suppliers found',
        'Best match: Vietnam Textiles Ltd',
        'Negotiation in progress...',
        'Price locked: $3.15/unit',
        'Escrow created: $31,500',
        'Freight booked: MSC, 18 days',
        'Documents generated ✓',
        'Order #5432 READY!',
      ],
    },
    {
      id: 'export',
      name: 'Export Demo',
      icon: Globe,
      color: '#FF00FF',
      steps: [
        'Analyzing UAE market...',
        'Finding buyer agents...',
        '23 potential buyers found',
        'Matching products...',
        'Creating export offers...',
        'Sending to Dubai Trading LLC...',
        'Sending to Abu Dhabi Market...',
        'Pricing optimized',
        'Export license verified',
        'Documents prepared ✓',
        'Ready for execution!',
      ],
    },
    {
      id: 'track',
      name: 'Track Demo',
      icon: Truck,
      color: '#FF6B00',
      steps: [
        'Connecting to carrier API...',
        'Fetching MSC database...',
        'Container: MSCKU123456',
        'Location: Singapore Port',
        'Vessel: Maersk Everest',
        'ETA: July 18, 2026',
        'All docs verified ✓',
        'Customs: Pending',
        'Delivery: On Schedule',
        'Notifications enabled',
        'Tracking ACTIVE!',
      ],
    },
    {
      id: 'finance',
      name: 'Finance Demo',
      icon: DollarSign,
      color: '#FFD700',
      steps: [
        'Scanning invoices...',
        '67 invoices found',
        '3 overdue: $67,000',
        'Processing reminders...',
        'ABC Retail notified',
        'Berlin Fashion notified',
        'Escrow checking...',
        '$31,500 secured',
        'Payment terms verified',
        'Bank connection active',
        'Finance MANAGED!',
      ],
    },
  ];

  const runDemo = (demoId: string) => {
    const demo = demos.find(d => d.id === demoId);
    if (!demo) return;

    setActiveDemo(demoId);
    setDemoRunning(true);
    setDemoStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setDemoStep(step);
      if (step >= demo.steps.length - 1) {
        clearInterval(interval);
        setDemoRunning(false);
      }
    }, 1500);
  };

  const stats = [
    { label: 'Active Orders', value: 12, color: '#00D4FF' },
    { label: 'Revenue Today', value: '$45.2K', color: '#00FF88' },
    { label: 'Pending Tasks', value: 7, color: '#FFD700' },
    { label: 'Messages', value: 23, color: '#FF00FF' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050510' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        <div className="absolute inset-0" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
          opacity: 0.3,
        }} />
        <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)' }} />
        <motion.div animate={{ x: ['100%', '-100%'] }} transition={{ duration: 30, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[1000px] h-[1000px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,0,255,0.15) 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b" style={{ borderColor: 'rgba(0,212,255,0.2)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}>
                <Layers className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold" style={{ color: '#00D4FF' }}>LEVERGE</span>
                <div className="text-xs" style={{ color: '#666' }}>Interactive Demo</div>
              </div>
            </Link>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}>
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00FF88' }} />
              <span className="text-xs font-medium" style={{ color: '#00FF88' }}>LIVE</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6" style={{ color: 'white' }}>
            <span style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AGENTIC COMMERCE
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl mb-4" style={{ color: '#888' }}>
            Click any demo below to see it in action
          </motion.p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${stat.color}30` }}>
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.label === 'Revenue Today' ? '$' : ''}{stat.value}{stat.label === 'Revenue Today' ? 'K' : ''}
              </div>
              <div className="text-sm" style={{ color: '#666' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Demo Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {demos.map((demo, i) => (
            <motion.div key={demo.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-3xl h-full cursor-pointer overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${demo.color}40`,
                  boxShadow: activeDemo === demo.id ? `0 0 40px ${demo.color}40` : 'none',
                }}
                onClick={() => runDemo(demo.id)}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${demo.color}20` }}>
                    <demo.icon className="w-7 h-7" style={{ color: demo.color }} />
                  </div>
                  {activeDemo === demo.id && (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                      <RefreshCw className="w-5 h-5" style={{ color: demo.color }} />
                    </motion.div>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: demo.color }}>{demo.name}</h3>
                <p className="text-sm mb-4" style={{ color: '#888' }}>
                  Click to run live demo
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-xl font-medium text-sm"
                  style={{ backgroundColor: `${demo.color}20`, color: demo.color, border: `1px solid ${demo.color}40` }}>
                  {activeDemo === demo.id && demoRunning ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        <RefreshCw className="w-4 h-4" />
                      </motion.div>
                      Running...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" /> Run Demo
                    </span>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Demo Output */}
        {activeDemo && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl" style={{ backgroundColor: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.3)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: '#00D4FF' }}>
                {demos.find(d => d.id === activeDemo)?.name} - Live Output
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00FF88' }} />
                <span className="text-sm" style={{ color: '#00FF88' }}>LIVE</span>
              </div>
            </div>

            <div className="space-y-2 font-mono text-sm">
              {demos.find(d => d.id === activeDemo)?.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: i <= demoStep ? 1 : 0.3, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    backgroundColor: i === demoStep ? 'rgba(0,212,255,0.1)' : 'rgba(0,0,0,0.3)',
                    border: i === demoStep ? '1px solid rgba(0,212,255,0.5)' : '1px solid transparent',
                  }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: i <= demoStep ? '#00FF88' : 'rgba(255,255,255,0.1)' }}>
                    {i < demoStep ? (
                      <span className="text-black text-xs">✓</span>
                    ) : i === demoStep ? (
                      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
                        <Bot className="w-4 h-4 text-black" />
                      </motion.div>
                    ) : (
                      <span className="text-white text-xs">{i + 1}</span>
                    )}
                  </div>
                  <span style={{ color: i <= demoStep ? 'white' : '#666' }}>{step}</span>
                </motion.div>
              ))}
            </div>

            {demoStep >= (demos.find(d => d.id === activeDemo)?.steps.length || 0) - 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 rounded-xl text-center"
                style={{ backgroundColor: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}>
                <span className="text-lg font-bold" style={{ color: '#00FF88' }}>✓ Demo Complete!</span>
                <p className="text-sm mt-2" style={{ color: '#888' }}>Click another demo or try the full AI Copilot</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* CTA */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <Link href="/copilot">
            <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-3xl text-center"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))', border: '1px solid rgba(0,212,255,0.4)' }}>
              <Bot className="w-16 h-16 mx-auto mb-4" style={{ color: '#00D4FF' }} />
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#00D4FF' }}>AI Copilot</h3>
              <p className="mb-4" style={{ color: '#888' }}>Type commands and interact with AI</p>
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
                style={{ backgroundColor: '#00D4FF', color: 'white' }}>
                Launch Copilot <ChevronRight className="w-4 h-4" />
              </span>
            </motion.div>
          </Link>

          <Link href="/agentic-demo">
            <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-3xl text-center"
              style={{ background: 'linear-gradient(135deg, rgba(255,0,255,0.2), rgba(255,0,255,0.05))', border: '1px solid rgba(255,0,255,0.4)' }}>
              <Brain className="w-16 h-16 mx-auto mb-4" style={{ color: '#FF00FF' }} />
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#FF00FF' }}>Agentic Flow</h3>
              <p className="mb-4" style={{ color: '#888' }}>Step-by-step walkthrough</p>
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
                style={{ backgroundColor: '#FF00FF', color: 'white' }}>
                Launch Flow <ChevronRight className="w-4 h-4" />
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Architecture */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-8" style={{ color: 'white' }}>Architecture</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['TwinOS', 'MemoryOS', 'SkillOS', 'SUTAR', 'Nexha'].map((item, i) => (
              <motion.div key={item} whileHover={{ scale: 1.1 }}
                className="px-6 py-4 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }}>
                <span className="font-bold" style={{ color: ['#00D4FF', '#FF00FF', '#FFD700', '#00FF88', '#FF6B00'][i] }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t py-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <p className="text-sm" style={{ color: '#666' }}>LEVERGE × HOJAI AI × GLOBAL NEXHA</p>
      </footer>
    </div>
  );
}
