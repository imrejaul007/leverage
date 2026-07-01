'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bot, Brain, Sparkles, Layers, ChevronRight, Zap, Globe, Database, Activity, Bell, Rocket, Cpu, Shield, Zap as ZapIcon } from 'lucide-react';

// ============================================================================
// ULTRA FUTURISTIC DEMO PAGE - CYBERPUNK DESIGN
// ============================================================================

export default function DemoPage() {
  const features = [
    { icon: Brain, name: 'TwinOS', desc: 'Digital twin of your company', color: '#00D4FF' },
    { icon: Database, name: 'MemoryOS', desc: 'Trade history & relationships', color: '#FF00FF' },
    { icon: Zap, name: 'SkillOS', desc: 'AI capabilities', color: '#FFD700' },
    { icon: Bot, name: 'SUTAR', desc: 'Autonomous workforce', color: '#00FF88' },
    { icon: Globe, name: 'Nexha', desc: 'Global trade network', color: '#FF6B00' },
  ];

  const stats = [
    { label: 'Suppliers', value: '50,000+', color: '#00D4FF' },
    { label: 'Carriers', value: '1,200+', color: '#FF00FF' },
    { label: 'Banks', value: '200+', color: '#FFD700' },
    { label: 'Orders', value: '1M+', color: '#00FF88' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050510' }}>
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
        {/* Animated Orbs */}
        <motion.div animate={{ x: ['-100%', '100%'], y: ['-50%', '150%'] }} transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)' }} />
        <motion.div animate={{ x: ['100%', '-100%'], y: ['100%', '-50%'] }} transition={{ duration: 30, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[1000px] h-[1000px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,0,255,0.15) 0%, transparent 70%)' }} />
        <motion.div animate={{ y: ['0%', '100%'] }} transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)' }} />
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b" style={{ borderColor: 'rgba(0,212,255,0.2)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}>
              <Layers className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <span className="text-xl font-bold" style={{ color: '#00D4FF' }}>LEVERGE</span>
              <div className="text-xs" style={{ color: '#666' }}>Agentic Commerce</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}>
              <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00FF88' }} />
              <span className="text-xs font-medium" style={{ color: '#00FF88' }}>SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Badge */}
          <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
            style={{ backgroundColor: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', boxShadow: '0 0 30px rgba(0,212,255,0.2)' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#00D4FF' }} />
            <span className="text-sm font-medium" style={{ color: '#00D4FF' }}>Powered by HOJAI AI</span>
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
            <span style={{ color: '#FFFFFF' }}>AGENTIC</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>COMMERCE</span>
          </h1>

          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: '#888' }}>
            Tell the AI what you need. It coordinates everything.
          </p>
        </motion.div>

        {/* Demo Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Copilot Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link href="/copilot"
              className="block p-8 rounded-3xl transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,212,255,0.02))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,212,255,0.4)',
                boxShadow: '0 0 50px rgba(0,212,255,0.2), inset 0 0 50px rgba(0,212,255,0.05)',
              }}>
              <div className="flex items-center justify-between mb-6">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.3), rgba(0,212,255,0.1))', boxShadow: '0 0 40px rgba(0,212,255,0.4)' }}>
                  <Bot className="w-10 h-10" style={{ color: '#00D4FF' }} />
                </motion.div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,212,255,0.2)' }}>
                  <Rocket className="w-6 h-6" style={{ color: '#00D4FF' }} />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#00D4FF' }}>AI COPILOT</h2>
              <p className="mb-4 text-sm" style={{ color: '#888' }}>
                Type commands and watch the AI coordinate your entire organization in real-time.
              </p>
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#00D4FF' }}>
                <span>Launch Demo</span>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>
            </Link>
          </motion.div>

          {/* Agentic Flow Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link href="/agentic-demo"
              className="block p-8 rounded-3xl transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, rgba(255,0,255,0.1), rgba(255,0,255,0.02))',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,0,255,0.4)',
                boxShadow: '0 0 50px rgba(255,0,255,0.2), inset 0 0 50px rgba(255,0,255,0.05)',
              }}>
              <div className="flex items-center justify-between mb-6">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(255,0,255,0.3), rgba(255,0,255,0.1))', boxShadow: '0 0 40px rgba(255,0,255,0.4)' }}>
                  <Brain className="w-10 h-10" style={{ color: '#FF00FF' }} />
                </motion.div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,0,255,0.2)' }}>
                  <Cpu className="w-6 h-6" style={{ color: '#FF00FF' }} />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: '#FF00FF' }}>AGENTIC FLOW</h2>
              <p className="mb-4 text-sm" style={{ color: '#888' }}>
                Step-by-step walkthrough: TwinOS → MemoryOS → SkillOS → SUTAR → Global Nexha
              </p>
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#FF00FF' }}>
                <span>Explore</span>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="relative z-10 border-t" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'white' }}>THE ARCHITECTURE</h2>
            <p className="text-sm" style={{ color: '#666' }}>Your AI-powered trade organization</p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {features.map((feature, i) => (
              <motion.div key={feature.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl text-center transition-all hover:scale-105"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${feature.color}20` }}>
                <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${feature.color}20`, boxShadow: `0 0 30px ${feature.color}30` }}>
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </motion.div>
                <h3 className="font-bold mb-1" style={{ color: feature.color }}>{feature.name}</h3>
                <p className="text-xs" style={{ color: '#666' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${stat.color}20` }}>
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-sm" style={{ color: '#666' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Flow Arrow */}
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center">
            <span className="text-sm mb-4 font-mono" style={{ color: '#666' }}>Merchant → Copilot → Organization → Execution</span>
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#00D4FF', boxShadow: '0 0 30px #00D4FF' }} />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'white' }}>HOW IT WORKS</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'TELL THE AI', desc: 'Type naturally: "Import 10,000 cotton shirts from Vietnam, budget $300,000"', color: '#00D4FF' },
            { step: '02', title: 'AI COORDINATES', desc: 'TwinOS, MemoryOS, SUTAR agents work together to execute the trade', color: '#FF00FF' },
            { step: '03', title: 'YOU APPROVE', desc: 'AI handles everything, you just review and approve at the end', color: '#00FF88' },
          ].map((item, i) => (
            <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.2 }} className="text-center">
              <motion.div whileHover={{ scale: 1.1 }} className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold"
                style={{ backgroundColor: `${item.color}20`, color: item.color, boxShadow: `0 0 50px ${item.color}40` }}>
                {item.step}
              </motion.div>
              <h3 className="text-xl font-bold mb-3" style={{ color: item.color }}>{item.title}</h3>
              <p className="text-sm font-mono" style={{ color: '#888' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 border-t" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'white' }}>READY TO EXPERIENCE?</h2>
            <p className="mb-8" style={{ color: '#888' }}>Choose a demo above to see the future of trade</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/copilot"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 50px rgba(0,212,255,0.4)' }}>
                <Bot className="w-6 h-6" />
                Launch AI Copilot
              </Link>
              <Link href="/agentic-demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
                style={{ backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.2)', color: 'white' }}>
                <Brain className="w-6 h-6" />
                See Agentic Flow
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t py-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-mono" style={{ color: '#666' }}>LEVERGE</span>
          <span style={{ color: '#666' }}>×</span>
          <span className="text-sm font-mono" style={{ color: '#00D4FF' }}>HOJAI AI</span>
          <span style={{ color: '#666' }}>×</span>
          <span className="text-sm font-mono" style={{ color: '#FF00FF' }}>GLOBAL NEXHA</span>
        </div>
      </footer>
    </div>
  );
}
