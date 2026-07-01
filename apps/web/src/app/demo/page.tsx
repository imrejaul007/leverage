'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bot, Brain, Sparkles, Layers, ChevronRight, Zap, Globe, Database } from 'lucide-react';

// ============================================================================
// FUTURISTIC DEMO PAGE - GLASSMORPHISM DESIGN
// ============================================================================

export default function DemoPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030712' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #0891B2 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #A6824A 0%, transparent 70%)' }} />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #16A34A 0%, transparent 70%)' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #154230, #1a5a3a)', boxShadow: '0 0 30px rgba(21,66,48,0.5)' }}>
              <Layers className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</span>
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
            style={{ backgroundColor: 'rgba(21,66,48,0.3)', border: '1px solid rgba(21,66,48,0.5)' }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#A6824A' }} />
            <span className="text-sm font-medium" style={{ color: '#A6824A' }}>Powered by HOJAI AI</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span style={{ color: 'white' }}>Agentic</span>
            <br />
            <span style={{ color: '#A6824A' }}>Commerce</span>
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
                backgroundColor: 'rgba(8,145,178,0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(8,145,178,0.3)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(8,145,178,0.2)', boxShadow: '0 0 30px rgba(8,145,178,0.3)' }}>
                  <Bot className="w-8 h-8" style={{ color: '#0891B2' }} />
                </div>
                <ChevronRight className="w-6 h-6" style={{ color: '#0891B2' }} />
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'white' }}>AI Copilot</h2>
              <p className="mb-4 text-sm" style={{ color: '#888' }}>
                Type commands and watch the AI coordinate your entire organization in real-time.
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#0891B2' }}>
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
                backgroundColor: 'rgba(124,58,237,0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(124,58,237,0.3)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(124,58,237,0.2)', boxShadow: '0 0 30px rgba(124,58,237,0.3)' }}>
                  <Brain className="w-8 h-8" style={{ color: '#7C3AED' }} />
                </div>
                <ChevronRight className="w-6 h-6" style={{ color: '#7C3AED' }} />
              </div>
              <h2 className="text-2xl font-bold mb-3" style={{ color: 'white' }}>Agentic Flow</h2>
              <p className="mb-4 text-sm" style={{ color: '#888' }}>
                Step-by-step walkthrough: TwinOS → MemoryOS → SkillOS → SUTAR → Global Nexha
              </p>
              <div className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#7C3AED' }}>
                Explore <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Architecture */}
      <div className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'white' }}>The Architecture</h2>
            <p className="text-sm" style={{ color: '#666' }}>Your AI-powered trade organization</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'TwinOS', desc: 'Digital twin', color: '#0891B2', icon: Brain },
              { name: 'MemoryOS', desc: 'Trade history', color: '#7C3AED', icon: Database },
              { name: 'SkillOS', desc: 'Capabilities', color: '#A6824A', icon: Zap },
              { name: 'SUTAR', desc: 'AI workforce', color: '#0891B2', icon: Bot },
              { name: 'Nexha', desc: 'Global network', color: '#7C3AED', icon: Globe },
            ].map((feature, i) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl text-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${feature.color}20`, boxShadow: `0 0 20px ${feature.color}30` }}>
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="font-bold mb-1" style={{ color: 'white' }}>{feature.name}</h3>
                <p className="text-xs" style={{ color: '#666' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Flow Arrow */}
          <div className="flex items-center justify-center mt-8">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <span className="text-sm mb-2" style={{ color: '#666' }}>Merchant → Copilot → Organization → Execution</span>
              <ChevronRight className="w-6 h-6 rotate-90" style={{ color: '#A6824A' }} />
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'white' }}>How It Works</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Tell the AI',
              desc: 'Type naturally: "Import 10,000 cotton shirts from Vietnam, budget $300,000"',
              color: '#0891B2',
            },
            {
              step: '02',
              title: 'AI Coordinates',
              desc: 'TwinOS, MemoryOS, SUTAR agents work together to execute the trade',
              color: '#7C3AED',
            },
            {
              step: '03',
              title: 'You Approve',
              desc: 'AI handles everything, you just review and approve at the end',
              color: '#A6824A',
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: `${item.color}20`, color: item.color, boxShadow: `0 0 30px ${item.color}30` }}>
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'white' }}>{item.title}</h3>
              <p className="text-sm" style={{ color: '#888' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'white' }}>Ready to Experience?</h2>
            <p className="mb-8" style={{ color: '#888' }}>Choose a demo above to see the future of trade</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/copilot"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold"
                style={{ background: 'linear-gradient(135deg, #0891B2, #7C3AED)', boxShadow: '0 0 40px rgba(8,145,178,0.4)' }}
              >
                <Bot className="w-5 h-5" />
                Try AI Copilot
              </Link>
              <Link
                href="/agentic-demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
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
        <div className="text-sm" style={{ color: '#666' }}>
          LEVERGE × HOJAI AI × Global Nexha
        </div>
      </footer>
    </div>
  );
}
