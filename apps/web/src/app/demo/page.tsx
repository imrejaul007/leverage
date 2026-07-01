'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bot, Brain, Sparkles, Layers, ChevronRight, Zap, Globe, Database } from 'lucide-react';

// ============================================================================
// CYBERPUNK DEMO PAGE - ULTRA FUTURISTIC
// ============================================================================

export default function DemoPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050510' }}>
      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        <motion.div
          animate={{ x: ['-100%', '100%'], y: ['-100%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: ['100%', '-100%'], y: ['100%', '-100%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-0 w-[1000px] h-[1000px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,0,255,0.1) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ y: ['0%', '100%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 70%)' }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b" style={{ borderColor: 'rgba(0,212,255,0.2)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}>
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold" style={{ color: '#00D4FF' }}>LEVERGE</span>
              <div className="text-xs" style={{ color: '#666' }}>Agentic Commerce Demo</div>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
            style={{ backgroundColor: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#00D4FF' }} />
            <span className="text-sm font-medium" style={{ color: '#00D4FF' }}>Powered by HOJAI AI</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span style={{ color: '#FFFFFF' }}>AGENTIC</span>
            <br />
            <span style={{ color: '#00D4FF' }}>COMMERCE</span>
          </h1>

          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: '#888' }}>
            Tell the AI what you need. It coordinates everything.
          </p>
        </motion.div>

        {/* Demo Options */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Copilot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/copilot"
              className="block p-8 rounded-2xl transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(0,212,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,212,255,0.3)',
                boxShadow: '0 0 50px rgba(0,212,255,0.1)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(255,0,255,0.2))', boxShadow: '0 0 40px rgba(0,212,255,0.3)' }}>
                  <Bot className="w-10 h-10" style={{ color: '#00D4FF' }} />
                </div>
                <ChevronRight className="w-8 h-8" style={{ color: '#00D4FF' }} />
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'white' }}>AI COPILOT</h2>
              <p className="mb-4 text-sm" style={{ color: '#888' }}>
                Type commands and watch the AI coordinate your entire organization in real-time.
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#00D4FF' }}>
                Try now <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>

          {/* Agentic Flow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/agentic-demo"
              className="block p-8 rounded-2xl transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(255,0,255,0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,0,255,0.3)',
                boxShadow: '0 0 50px rgba(255,0,255,0.1)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(255,0,255,0.2), rgba(0,212,255,0.2))', boxShadow: '0 0 40px rgba(255,0,255,0.3)' }}>
                  <Brain className="w-10 h-10" style={{ color: '#FF00FF' }} />
                </div>
                <ChevronRight className="w-8 h-8" style={{ color: '#FF00FF' }} />
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'white' }}>AGENTIC FLOW</h2>
              <p className="mb-4 text-sm" style={{ color: '#888' }}>
                Step-by-step walkthrough: TwinOS → MemoryOS → SkillOS → SUTAR → Global Nexha
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#FF00FF' }}>
                Explore <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Architecture */}
      <div className="relative z-10 border-t" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'white' }}>THE ARCHITECTURE</h2>
            <p className="text-sm" style={{ color: '#666' }}>Your AI-powered trade organization</p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'TwinOS', desc: 'Digital twin', color: '#00D4FF' },
              { name: 'MemoryOS', desc: 'Trade history', color: '#FF00FF' },
              { name: 'SkillOS', desc: 'Capabilities', color: '#FFD700' },
              { name: 'SUTAR', desc: 'AI workforce', color: '#00FF88' },
              { name: 'Nexha', desc: 'Global network', color: '#FF6B00' },
            ].map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${feature.color}20` }}
              >
                <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${feature.color}20`, boxShadow: `0 0 30px ${feature.color}30` }}>
                  {i === 0 && <Database className="w-7 h-7" style={{ color: feature.color }} />}
                  {i === 1 && <Database className="w-7 h-7" style={{ color: feature.color }} />}
                  {i === 2 && <Zap className="w-7 h-7" style={{ color: feature.color }} />}
                  {i === 3 && <Bot className="w-7 h-7" style={{ color: feature.color }} />}
                  {i === 4 && <Globe className="w-7 h-7" style={{ color: feature.color }} />}
                </div>
                <h3 className="font-bold mb-1" style={{ color: feature.color }}>{feature.name}</h3>
                <p className="text-xs" style={{ color: '#666' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Flow */}
          <div className="flex items-center justify-center mt-8">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="text-sm mb-2 font-mono" style={{ color: '#666' }}>Merchant → Copilot → Organization → Execution</span>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00D4FF', boxShadow: '0 0 20px #00D4FF' }} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'white' }}>HOW IT WORKS</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'TELL THE AI', desc: 'Type naturally: "Import 10,000 cotton shirts from Vietnam"', color: '#00D4FF' },
            { step: '02', title: 'AI COORDINATES', desc: 'TwinOS, MemoryOS, SUTAR agents work together to execute', color: '#FF00FF' },
            { step: '03', title: 'YOU APPROVE', desc: 'AI handles everything, you just review and approve at the end', color: '#00FF88' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold" style={{ backgroundColor: `${item.color}20`, color: item.color, boxShadow: `0 0 40px ${item.color}40` }}>
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: item.color }}>{item.title}</h3>
              <p className="text-sm font-mono" style={{ color: '#888' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 border-t" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'white' }}>READY TO EXPERIENCE?</h2>
            <p className="mb-8" style={{ color: '#888' }}>Choose a demo above to see the future of trade</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/copilot"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold"
                style={{ background: 'linear-gradient(135deg, #00D4FF, #FF00FF)', boxShadow: '0 0 50px rgba(0,212,255,0.4)' }}
              >
                <Bot className="w-5 h-5" />
                Try AI Copilot
              </Link>
              <Link
                href="/agentic-demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold"
                style={{ backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.2)', color: 'white' }}
              >
                <Brain className="w-5 h-5" />
                See Agentic Flow
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t py-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="text-sm font-mono" style={{ color: '#666' }}>
          LEVERGE × HOJAI AI × GLOBAL NEXHA
        </div>
      </footer>
    </div>
  );
}
