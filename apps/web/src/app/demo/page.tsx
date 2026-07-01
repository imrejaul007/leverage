'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import Link from 'next/link';
import {
  Globe, FileText, Truck, Shield, CreditCard, Bot, ShoppingCart, Package, Users,
  ArrowRight, Plus, Check, Star, Send, Play, Pause, TrendingUp, Clock, Search,
  Heart, Building2, CheckCircle2, FileCheck, Calculator, Anchor, Building,
  Lock, Sparkles, Layers, Network, Download, X, GitCompare, ShoppingBag, Globe2,
  Zap, RefreshCw, Cpu, Settings, Bell, AlertCircle, ChevronRight, Workflow, Timer, ListChecks, Rocket, Cog
} from 'lucide-react';

// ============================================================================
// LEVERAGE DEMO MODE - WITH AUTOMATION & LIVE TASKS
// ============================================================================

export default function DemoPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [animatedRoutes, setAnimatedRoutes] = useState<number[]>([]);
  const [comparisonProducts, setComparisonProducts] = useState<number[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [autoTask, setAutoTask] = useState<{ task: string; progress: number; status: 'running' | 'complete' | 'pending' }[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [liveActivity, setLiveActivity] = useState(true);

  const sections = [
    { id: 'hero', name: 'Trade OS', icon: Layers },
    { id: 'marketplace', name: 'Marketplace', icon: ShoppingCart },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'compliance', name: 'Compliance', icon: Shield },
    { id: 'freight', name: 'Freight', icon: Truck },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'ai', name: 'AI Copilot', icon: Bot },
    { id: 'network', name: 'Network', icon: Network },
  ];

  // Auto-run demo tasks
  useEffect(() => {
    if (demoPlaying) {
      // Section rotation
      const sectionInterval = setInterval(() => {
        setActiveSection(prev => (prev + 1) % sections.length);
      }, 8000);

      // Route animation
      const routeInterval = setInterval(() => {
        setAnimatedRoutes(prev => prev.length >= 6 ? [] : [...prev, (prev.length) % 6]);
      }, 500);

      // Run automation tasks per section
      runAutomationSequence();

      return () => {
        clearInterval(sectionInterval);
        clearInterval(routeInterval);
      };
    }
  }, [demoPlaying]);

  // Live automation tasks
  useEffect(() => {
    if (liveActivity) {
      // Initial tasks
      setAutoTask([
        { task: 'Monitoring trade routes...', progress: 100, status: 'running' },
        { task: 'Processing 47 supplier responses', progress: 100, status: 'complete' },
        { task: 'Auto-generating documents', progress: 65, status: 'running' },
        { task: 'Checking compliance rules', progress: 30, status: 'running' },
      ]);

      // Add new notifications
      const notifInterval = setInterval(() => {
        const messages = [
          '📦 New RFQ received from UAE Trading',
          '✅ Document generated successfully',
          '🚢 Shipment arriving at Dubai Port',
          '💰 Escrow payment confirmed',
          '🤖 AI matched 3 suppliers',
          '📊 Daily report generated',
          '🔔 New message from Cotton World Ltd',
          '⚡ Price alert: Steel prices +2.5%',
        ];
        setNotifications(prev => [messages[Math.floor(Math.random() * messages.length)], ...prev.slice(0, 4)]);
      }, 5000);

      // Update task progress
      const taskInterval = setInterval(() => {
        setAutoTask(prev => prev.map(t => ({
          ...t,
          progress: t.status === 'running' ? Math.min(100, t.progress + Math.random() * 10) : t.progress
        })));
      }, 2000);

      return () => {
        clearInterval(notifInterval);
        clearInterval(taskInterval);
      };
    }
  }, [liveActivity]);

  const runAutomationSequence = async () => {
    const tasks = [
      'Automating supplier search...',
      'Generating commercial invoice...',
      'Calculating import duties...',
      'Booking freight container...',
      'Processing escrow payment...',
      'Sending AI recommendations...',
    ];

    for (let i = 0; i < tasks.length; i++) {
      await new Promise(r => setTimeout(r, 2000));
      setAutoTask(prev => [
        { task: tasks[i], progress: 0, status: 'running' },
        ...prev.slice(0, 3)
      ]);
    }
  };

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev.slice(0, 4)]);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E6E2DA' }}>
      {/* Automation Status Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{ backgroundColor: '#154230', borderColor: '#154230' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#22C55E' }} />
              <span className="text-white text-sm font-medium">AUTOMATION ACTIVE</span>
            </div>
            <div className="h-4 w-px" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-white/60" />
              <span className="text-white/60 text-xs">{autoTask.length} tasks running</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLiveActivity(!liveActivity)}
              className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{ backgroundColor: liveActivity ? '#22C55E20' : 'rgba(255,255,255,0.1)', color: liveActivity ? '#22C55E' : 'white' }}
            >
              <Zap className="w-3 h-3" />
              {liveActivity ? 'Live' : 'Paused'}
            </button>
            <button
              onClick={() => setDemoPlaying(!demoPlaying)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{ backgroundColor: demoPlaying ? '#A6824A' : 'rgba(255,255,255,0.1)', color: 'white' }}
            >
              {demoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {demoPlaying ? 'Stop Demo' : 'Auto Demo'}
            </button>
          </div>
        </div>
      </div>

      {/* Live Notifications */}
      <AnimatePresence>
        {notifications.slice(0, 3).map((notif, i) => (
          <motion.div
            key={notif + i}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed right-4 z-50 px-4 py-3 rounded-xl shadow-lg"
            style={{
              backgroundColor: 'white',
              top: `${i * 80 + 60}px`,
              border: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4" style={{ color: '#A6824A' }} />
              <span className="text-sm" style={{ color: '#101111' }}>{notif}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Navigation */}
      <nav
        className="fixed top-12 left-0 right-0 z-40 backdrop-blur-md border-b"
        style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderColor: 'rgba(0,0,0,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#154230' }}>
              <Layers className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((section, i) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(i)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative"
                style={{
                  backgroundColor: activeSection === i ? '#15423015' : 'transparent',
                  color: activeSection === i ? '#154230' : '#4A4A4A',
                }}
              >
                {section.name}
                {activeSection === i && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5" style={{ backgroundColor: '#154230' }} />
                )}
              </button>
            ))}
          </div>

          <Link href="/demo" className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: '#154230', color: 'white' }}>
            Try Demo
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-24">
        <AnimatePresence mode="wait">
          {activeSection === 0 && <HeroSection key="hero" demoPlaying={demoPlaying} />}
          {activeSection === 1 && <MarketplaceSection key="marketplace" demoPlaying={demoPlaying} comparisonProducts={comparisonProducts} setComparisonProducts={setComparisonProducts} showCompareModal={showCompareModal} setShowCompareModal={setShowCompareModal} showCheckout={showCheckout} setShowCheckout={setShowCheckout} checkoutStep={checkoutStep} setCheckoutStep={setCheckoutStep} addNotification={addNotification} />}
          {activeSection === 2 && <DocumentsSection key="documents" demoPlaying={demoPlaying} addNotification={addNotification} />}
          {activeSection === 3 && <ComplianceSection key="compliance" demoPlaying={demoPlaying} addNotification={addNotification} />}
          {activeSection === 4 && <FreightSection key="freight" animatedRoutes={animatedRoutes} demoPlaying={demoPlaying} addNotification={addNotification} />}
          {activeSection === 5 && <PaymentsSection key="payments" demoPlaying={demoPlaying} addNotification={addNotification} />}
          {activeSection === 6 && <AISection key="ai" demoPlaying={demoPlaying} addNotification={addNotification} />}
          {activeSection === 7 && <NetworkSection key="network" animatedRoutes={animatedRoutes} demoPlaying={demoPlaying} />}
        </AnimatePresence>
      </main>

      {/* Automation Tasks Panel */}
      <div
        className="fixed bottom-24 left-4 z-40 w-80 rounded-2xl shadow-xl overflow-hidden"
        style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div className="p-4 border-b" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Workflow className="w-5 h-5" style={{ color: '#154230' }} />
              <span className="font-semibold" style={{ color: '#101111' }}>Automation Tasks</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#22C55E20', color: '#16A34A' }}>
              {autoTask.filter(t => t.status === 'running').length} active
            </span>
          </div>
        </div>
        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          {autoTask.map((task, i) => (
            <motion.div
              key={task.task + i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {task.status === 'running' && (
                    <RefreshCw className="w-4 h-4 animate-spin" style={{ color: '#A6824A' }} />
                  )}
                  {task.status === 'complete' && (
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />
                  )}
                  <span className="text-sm" style={{ color: '#101111' }}>{task.task}</span>
                </div>
                <span className="text-xs" style={{ color: '#4A4A4A' }}>{Math.round(task.progress)}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E6E2DA' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: task.status === 'complete' ? '#16A34A' : '#A6824A' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${task.progress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Section Navigation */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-2xl shadow-lg"
        style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}
      >
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(i)}
            className="p-3 rounded-xl transition-all duration-300"
            style={{
              backgroundColor: activeSection === i ? '#154230' : 'transparent',
              color: activeSection === i ? 'white' : '#4A4A4A',
            }}
          >
            <section.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// SECTION 1: HERO - TRADE OS
// ============================================================================

function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function HeroSection({ demoPlaying }: { demoPlaying: boolean }) {
  const stats = [
    { value: 50000, suffix: '+', label: 'Active Traders', icon: Users },
    { value: 2.5, suffix: 'B+', prefix: '$', label: 'Trade Volume', icon: TrendingUp },
    { value: 120, suffix: '+', label: 'Countries', icon: Globe },
    { value: 1, suffix: 'M+', label: 'Documents Generated', icon: FileCheck },
  ];

  const modules = [
    { name: 'Marketplace', icon: ShoppingCart, bgColor: '#154230', desc: 'Auto-match suppliers' },
    { name: 'Documents', icon: FileText, bgColor: '#A6824A', desc: 'One-click generation' },
    { name: 'Freight', icon: Truck, bgColor: '#5D1E21', desc: 'Real-time tracking' },
    { name: 'Compliance', icon: Shield, bgColor: '#7C3AED', desc: 'AI-powered checks' },
    { name: 'Payments', icon: CreditCard, bgColor: '#DC2626', desc: 'Escrow protected' },
    { name: 'AI Copilot', icon: Bot, bgColor: '#0891B2', desc: 'HOJAI powered' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-[calc(100vh-12rem)] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#154230 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: 'spring' }} className="mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              className="relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-xl"
              style={{ backgroundColor: '#154230' }}
              animate={{ boxShadow: ['0 0 40px rgba(21,66,48,0.3)', '0 0 80px rgba(21,66,48,0.15)', '0 0 40px rgba(21,66,48,0.3)'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Layers className="w-12 h-12 text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A6824A' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </motion.div>
          </div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tight brand-font"
            style={{ color: '#101111' }}
          >
            LEVERGE
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl mb-2" style={{ color: '#4A4A4A' }}>
            The Trade Operating System
          </motion.p>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="text-lg" style={{ color: '#A6824A' }}>
            One platform. Every trade function. Fully Automated.
          </motion.p>
        </motion.div>

        {/* Automation Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8"
          style={{ backgroundColor: '#15423015' }}
        >
          <Rocket className="w-5 h-5" style={{ color: '#154230' }} />
          <span className="font-medium" style={{ color: '#154230' }}>Automated workflows running 24/7</span>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="rounded-2xl p-4"
              style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: '#154230' }} />
              <div className="text-2xl font-bold" style={{ color: '#101111' }}>
                {stat.prefix && <span style={{ color: '#154230' }}>{stat.prefix}</span>}
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm" style={{ color: '#4A4A4A' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Module Grid */}
        <motion.div
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {modules.map((module, i) => (
            <motion.div
              key={module.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative rounded-2xl p-6 cursor-pointer"
              style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}
            >
              <motion.div
                className="absolute top-2 right-2"
                animate={{ rotate: demoPlaying ? 360 : 0 }}
                transition={{ duration: 2, repeat: demoPlaying ? Infinity : 0 }}
              >
                <Cog className="w-3 h-3" style={{ color: module.bgColor }} />
              </motion.div>
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${module.bgColor}15` }}>
                <module.icon className="w-6 h-6" style={{ color: module.bgColor }} />
              </div>
              <div className="text-sm font-medium mb-1" style={{ color: '#101111' }}>{module.name}</div>
              <div className="text-xs" style={{ color: '#4A4A4A' }}>{module.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SECTION 2: MARKETPLACE (with Automation)
// ============================================================================

interface Product {
  id: number; name: string; price: number; unit: string; moq: string; supplier: string;
  rating: number; reviews: number; image: string; category: string; origin: string; leadTime: string; certifications: string[];
}

function MarketplaceSection({ demoPlaying, comparisonProducts, setComparisonProducts, showCompareModal, setShowCompareModal, showCheckout, setShowCheckout, checkoutStep, setCheckoutStep, addNotification }: any) {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Premium Basmati Rice 1121', price: 850, unit: 'MT', moq: '50 MT', supplier: 'Global Trade Exports', rating: 4.8, reviews: 128, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', category: 'Food & Agriculture', origin: 'India', leadTime: '14-21 days', certifications: ['ISO 22000', 'HACCP'] },
    { id: 2, name: 'Organic Cotton Yarn 40s', price: 4.20, unit: 'KG', moq: '1000 KG', supplier: 'Cotton World Ltd', rating: 4.7, reviews: 96, image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400', category: 'Textiles', origin: 'India', leadTime: '7-14 days', certifications: ['GOTS', 'OEKO-TEX'] },
    { id: 3, name: 'Copper Cathode 99.99%', price: 7250, unit: 'MT', moq: '25 MT', supplier: 'MetalLink Global', rating: 4.9, reviews: 78, image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400', category: 'Metals', origin: 'Chile', leadTime: '21-30 days', certifications: ['LME', 'ISO 9001'] },
    { id: 4, name: 'Solar Panels 550W', price: 165, unit: 'Unit', moq: '100 Units', supplier: 'Shanghai Import Co.', rating: 4.6, reviews: 89, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400', category: 'Energy', origin: 'China', leadTime: '14-21 days', certifications: ['IEC', 'TUV'] },
    { id: 5, name: 'Extra Virgin Olive Oil', price: 4.50, unit: 'L', moq: '5000 L', supplier: 'Turkey Merchants', rating: 4.9, reviews: 156, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', category: 'Food & Agriculture', origin: 'Turkey', leadTime: '10-14 days', certifications: ['EU Organic', 'IFS'] },
    { id: 6, name: 'Steel Billets Grade A', price: 520, unit: 'MT', moq: '100 MT', supplier: 'India Steel Corp', rating: 4.5, reviews: 64, image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400', category: 'Metals', origin: 'India', leadTime: '14-21 days', certifications: ['BIS', 'ISO 9001'] },
  ]);

  const [rfqs] = useState([
    { id: 'RFQ-001', title: 'Basmati Rice 1121 Premium', buyer: 'UAE Trading LLC', quantity: '500 MT', deadline: 'Jul 15, 2026', responses: 5, status: 'OPEN' },
    { id: 'RFQ-002', title: 'Organic Cotton Yarn', buyer: 'Germany Textiles', quantity: '10,000 KG', deadline: 'Jul 20, 2026', responses: 3, status: 'OPEN' },
    { id: 'RFQ-003', title: 'Electronic Components', buyer: 'Singapore Tech', quantity: '5,000 Units', deadline: 'Jul 25, 2026', responses: 8, status: 'OPEN' },
  ]);

  const [activeTab, setActiveTab] = useState<'products' | 'rfqs'>('products');
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [newRfqResponses, setNewRfqResponses] = useState<number[]>([]);

  // Auto simulate supplier responses
  useEffect(() => {
    if (demoPlaying && activeTab === 'rfqs') {
      const interval = setInterval(() => {
        const randomRfq = Math.floor(Math.random() * rfqs.length);
        setNewRfqResponses(prev => [...prev, randomRfq]);
        addNotification(`✅ New quote received for ${rfqs[randomRfq].title}`);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [demoPlaying, activeTab]);

  const categories = ['all', 'Food & Agriculture', 'Textiles', 'Metals', 'Energy'];
  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
  const addToCart = (id: number) => { if (!cart.find(c => c.id === id)) setCart(prev => [...prev, { id, quantity: 1 }]); };
  const updateQuantity = (id: number, delta: number) => { setCart(prev => prev.map(c => c.id === id ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c)); };
  const toggleFavorite = (id: number) => { setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]); };
  const toggleCompare = (id: number) => { setComparisonProducts((prev: number[]) => { if (prev.includes(id)) return prev.filter(p => p !== id); if (prev.length >= 3) return prev; return [...prev, id]; }); };
  const cartTotal = cart.reduce((sum, item) => { const product = products.find(p => p.id === item.id); return sum + (product ? product.price * item.quantity : 0); }, 0);

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#15423015' }}>
            <ShoppingCart className="w-4 h-4" style={{ color: '#154230' }} />
            <span className="text-sm font-medium" style={{ color: '#154230' }}>Automated Marketplace</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 brand-font" style={{ color: '#101111' }}>Trade Globally</h2>
          <p className="text-lg" style={{ color: '#4A4A4A' }}>AI auto-matches suppliers • RFQs get responses in seconds</p>
        </div>

        {comparisonProducts.length >= 2 && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex justify-center mb-6">
            <button onClick={() => setShowCompareModal(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: '#A6824A', color: 'white' }}>
              <GitCompare className="w-5 h-5" /> Compare {comparisonProducts.length} Products (Auto-matched)
            </button>
          </motion.div>
        )}

        <div className="flex justify-center gap-4 mb-8">
          {[{ key: 'products', label: 'Products', icon: Package, count: filteredProducts.length }, { key: 'rfqs', label: 'RFQs', icon: FileText, count: rfqs.length }].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} className="px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2" style={{ backgroundColor: activeTab === tab.key ? '#154230' : 'white', color: activeTab === tab.key ? 'white' : '#4A4A4A', border: activeTab === tab.key ? '#154230' : '1px solid rgba(0,0,0,0.08)' }}>
              <tab.icon className="w-4 h-4" /> {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'products' && (
            <motion.div key="products" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="rounded-2xl overflow-hidden transition-all" style={{ backgroundColor: 'white', border: cart.find(c => c.id === product.id) ? '2px solid #A6824A' : '1px solid rgba(0,0,0,0.08)' }}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white' }}>{product.category}</div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button onClick={() => toggleCompare(product.id)} className="p-2 rounded-lg" style={{ backgroundColor: comparisonProducts.includes(product.id) ? '#A6824A' : 'rgba(0,0,0,0.7)', color: 'white' }}><GitCompare className="w-4 h-4" /></button>
                      <button onClick={() => toggleFavorite(product.id)} className="p-2 rounded-lg" style={{ backgroundColor: favorites.includes(product.id) ? '#DC2626' : 'rgba(0,0,0,0.7)', color: 'white' }}><Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} /></button>
                    </div>
                    {cart.find(c => c.id === product.id) && <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: '#A6824A', color: 'white' }}>In Cart</div>}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold mb-2 line-clamp-1" style={{ color: '#101111' }}>{product.name}</h3>
                    <p className="text-sm mb-3" style={{ color: '#4A4A4A' }}>{product.supplier}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm" style={{ color: '#101111' }}>{product.rating}</span>
                      <span className="text-sm" style={{ color: '#4A4A4A' }}>({product.reviews})</span>
                      <span className="text-xs px-2 py-0.5 rounded ml-auto" style={{ backgroundColor: '#22C55E20', color: '#16A34A' }}>{product.origin}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div><span className="text-2xl font-bold" style={{ color: '#154230' }}>${product.price}</span><span className="text-sm" style={{ color: '#4A4A4A' }}>/{product.unit}</span></div>
                      <span className="text-xs" style={{ color: '#4A4A4A' }}>MOQ: {product.moq}</span>
                    </div>
                    <button onClick={() => addToCart(product.id)} className="w-full mt-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2" style={{ backgroundColor: cart.find(c => c.id === product.id) ? '#A6824A20' : '#154230', color: cart.find(c => c.id === product.id) ? '#A6824A' : 'white' }}>
                      {cart.find(c => c.id === product.id) ? <><button onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, -1); }}><MinusCircle className="w-4 h-4" /></button><span>{cart.find(c => c.id === product.id)?.quantity}</span><button onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, 1); }}><PlusCircle className="w-4 h-4" /></button></> : 'Add to Cart'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'rfqs' && (
            <motion.div key="rfqs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {rfqs.map((rfq, i) => (
                <motion.div key={rfq.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-6" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#22C55E20', color: '#16A34A' }}>{rfq.status}</span>
                        <span className="text-sm" style={{ color: '#4A4A4A' }}>{rfq.id}</span>
                        <AnimatePresence>
                          {newRfqResponses.includes(i) && (
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: '#A6824A', color: 'white' }}>New Response!</motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#101111' }}>{rfq.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#4A4A4A' }}>
                        <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {rfq.buyer}</span>
                        <span className="flex items-center gap-1"><Package className="w-4 h-4" /> {rfq.quantity}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {rfq.deadline}</span>
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {rfq.responses} responses</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 rounded-xl text-sm font-medium" style={{ backgroundColor: '#A6824A10', color: '#A6824A' }}>View Details</button>
                      <button className="px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ backgroundColor: '#154230' }}>Submit Quote</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {cart.length > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="fixed bottom-32 right-6 rounded-2xl p-4 shadow-xl z-40" style={{ backgroundColor: 'white', border: '2px solid #A6824A' }}>
            <div className="flex items-center gap-4">
              <div className="relative"><ShoppingBag className="w-6 h-6" style={{ color: '#A6824A' }} /><span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#A6824A' }}>{cart.length}</span></div>
              <div><div className="text-sm" style={{ color: '#4A4A4A' }}>Cart Total</div><div className="text-lg font-bold" style={{ color: '#101111' }}>${cartTotal.toLocaleString()}</div></div>
              <button onClick={() => setShowCheckout(true)} className="px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ backgroundColor: '#A6824A' }}>Checkout</button>
            </div>
          </motion.div>
        )}

        <AnimatePresence>{showCompareModal && <ProductComparisonModal products={products.filter(p => comparisonProducts.includes(p.id))} onClose={() => setShowCompareModal(false)} />}</AnimatePresence>
        <AnimatePresence>{showCheckout && <CheckoutModal cart={cart} products={products} step={checkoutStep} setStep={setCheckoutStep} onClose={() => { setShowCheckout(false); setCheckoutStep(1); }} />}</AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// MODALS
// ============================================================================

function ProductComparisonModal({ products, onClose }: { products: Product[]; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden" style={{ backgroundColor: 'white' }} onClick={e => e.stopPropagation()}>
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: '#101111' }}><GitCompare className="w-6 h-6" style={{ color: '#A6824A' }} /> AI-Matched Comparison</h2>
          <button onClick={onClose} className="p-2 rounded-lg" style={{ backgroundColor: '#A6824A10' }}><X className="w-5 h-5" style={{ color: '#4A4A4A' }} /></button>
        </div>
        <div className="overflow-x-auto p-6">
          <table className="w-full">
            <thead><tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <th className="text-left py-4 px-4" style={{ color: '#4A4A4A' }}>Feature</th>
              {products.map(product => (<th key={product.id} className="text-center py-4 px-4 min-w-[200px]"><img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-xl mb-3" /><div className="font-semibold" style={{ color: '#101111' }}>{product.name}</div><div className="text-sm" style={{ color: '#4A4A4A' }}>{product.supplier}</div></th>))}
            </tr></thead>
            <tbody>
              {[{ label: 'Price', getValue: (p: Product) => `$${p.price}/${p.unit}` }, { label: 'MOQ', getValue: (p: Product) => p.moq }, { label: 'Origin', getValue: (p: Product) => p.origin }, { label: 'Lead Time', getValue: (p: Product) => p.leadTime }, { label: 'Rating', getValue: (p: Product) => `${p.rating}/5 (${p.reviews} reviews)` }, { label: 'Certifications', getValue: (p: Product) => p.certifications.join(', ') }].map(row => (
                <tr key={row.label} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <td className="py-4 px-4 font-medium" style={{ color: '#4A4A4A' }}>{row.label}</td>
                  {products.map(product => (<td key={product.id} className="py-4 px-4 text-center" style={{ color: '#101111' }}>{row.getValue(product)}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CheckoutModal({ cart, products, step, setStep, onClose }: any) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cartItems = cart.map((c: { id: number; quantity: number }) => ({ ...products.find((p: Product) => p.id === c.id)!, quantity: c.quantity }));
  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const shipping = 2500;
  const total = subtotal + shipping;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" style={{ backgroundColor: 'white' }} onClick={e => e.stopPropagation()}>
        {orderPlaced ? (
          <div className="p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#16A34A' }}><Check className="w-10 h-10 text-white" /></motion.div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#101111' }}>Order Placed!</h2>
            <p className="mb-6" style={{ color: '#4A4A4A' }}>Auto-processing your order #LEV-{Date.now().toString().slice(-6)}</p>
            <div className="rounded-xl p-4 mb-6 text-left" style={{ backgroundColor: '#A6824A10' }}>
              <div className="flex justify-between text-sm mb-2"><span style={{ color: '#4A4A4A' }}>Order Total:</span><span className="font-bold" style={{ color: '#101111' }}>${total.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span style={{ color: '#4A4A4A' }}>Auto-delivery:</span><span style={{ color: '#16A34A' }}>Jul 15-22, 2026</span></div>
            </div>
            <button onClick={onClose} className="px-8 py-3 rounded-xl font-medium text-white" style={{ backgroundColor: '#154230' }}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold" style={{ color: '#101111' }}>Auto-Checkout</h2>
                <div className="flex gap-2">
                  {[{ s: 1, n: 'Shipping' }, { s: 2, n: 'Payment' }, { s: 3, n: 'Review' }].map(tab => (
                    <button key={tab.s} onClick={() => setStep(tab.s)} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: step === tab.s ? '#154230' : step > tab.s ? '#15423020' : '#A6824A10', color: step === tab.s ? 'white' : step > tab.s ? '#154230' : '#4A4A4A' }}>{tab.n}</button>
                  ))}
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg" style={{ backgroundColor: '#A6824A10' }}><X className="w-5 h-5" style={{ color: '#4A4A4A' }} /></button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {step === 1 && <div className="space-y-4"><div className="grid grid-cols-2 gap-4"><div><label className="block text-sm mb-2" style={{ color: '#4A4A4A' }}>Company Name</label><input type="text" defaultValue="Your Company LLC" className="w-full px-4 py-3 rounded-xl" style={{ backgroundColor: '#A6824A10', border: '1px solid rgba(0,0,0,0.08)', color: '#101111' }} /></div><div><label className="block text-sm mb-2" style={{ color: '#4A4A4A' }}>Contact</label><input type="text" defaultValue="John Smith" className="w-full px-4 py-3 rounded-xl" style={{ backgroundColor: '#A6824A10', border: '1px solid rgba(0,0,0,0.08)', color: '#101111' }} /></div></div><div><label className="block text-sm mb-2" style={{ color: '#4A4A4A' }}>Shipping Address</label><input type="text" defaultValue="123 Trade Street, Dubai, UAE" className="w-full px-4 py-3 rounded-xl" style={{ backgroundColor: '#A6824A10', border: '1px solid rgba(0,0,0,0.08)', color: '#101111' }} /></div></div>}
              {step === 2 && <div className="p-4 rounded-xl" style={{ backgroundColor: '#15423010', border: '1px solid #15423030' }}><div className="flex items-center gap-3 mb-4"><CreditCard className="w-6 h-6" style={{ color: '#154230' }} /><span className="font-medium" style={{ color: '#101111' }}>Auto-Selected: Escrow Protected</span><Shield className="w-5 h-5 ml-auto" style={{ color: '#154230' }} /></div><p className="text-sm mb-4" style={{ color: '#4A4A4A' }}>AI auto-selected escrow for maximum protection.</p><div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'white', border: '2px solid #154230' }}><input type="radio" defaultChecked /><CreditCard className="w-5 h-5" style={{ color: '#4A4A4A' }} /><span style={{ color: '#101111' }}>Credit Card (Auto-confirmed)</span></div></div>}
              {step === 3 && <div className="space-y-4"><h3 className="font-medium" style={{ color: '#101111' }}>Order Summary</h3>{cartItems.map((item: any) => (<div key={item.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: '#A6824A10' }}><img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" /><div className="flex-1"><div className="font-medium" style={{ color: '#101111' }}>{item.name}</div><div className="text-sm" style={{ color: '#4A4A4A' }}>{item.quantity} × ${item.price}/{item.unit}</div></div><div className="font-bold" style={{ color: '#101111' }}>${(item.price * item.quantity).toLocaleString()}</div></div>))}<div className="pt-4 space-y-2" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}><div className="flex justify-between"><span style={{ color: '#4A4A4A' }}>Subtotal</span><span>${subtotal.toLocaleString()}</span></div><div className="flex justify-between"><span style={{ color: '#4A4A4A' }}>Shipping (FOB)</span><span>${shipping.toLocaleString()}</span></div><div className="flex justify-between font-bold text-lg pt-2" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}><span style={{ color: '#101111' }}>Total</span><span style={{ color: '#154230' }}>${total.toLocaleString()}</span></div></div></div>}
            </div>
            <div className="p-6 flex gap-3" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              {step > 1 && <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: '#A6824A10', color: '#A6824A' }}>Back</button>}
              <button onClick={step === 3 ? () => setOrderPlaced(true) : () => setStep(step + 1)} className="flex-1 px-6 py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2" style={{ backgroundColor: '#154230' }}>{step === 3 ? <><Lock className="w-4 h-4" /> Place Order (Auto-Protected)</> : <><>Continue <ArrowRight className="w-4 h-4" /></>}</button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// SECTION 3: DOCUMENTS (with Auto-Generation)
// ============================================================================

function DocumentsSection({ demoPlaying, addNotification }: { demoPlaying: boolean; addNotification: (msg: string) => void }) {
  const [selectedDoc, setSelectedDoc] = useState('invoice');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    if (demoPlaying) {
      const interval = setInterval(() => {
        setGenerating(true);
        setTimeout(() => { setGenerating(false); setGenerated(true); addNotification('📄 Document auto-generated'); }, 2000);
      setSelectedDoc(['invoice', 'packing', 'bol', 'coo'][Math.floor(Math.random() * 4)]);
      setGenerated(false);
      return () => clearInterval(interval);
    }
  }, [demoPlaying]);

  const documentTypes = [
    { id: 'invoice', name: 'Commercial Invoice', icon: FileText },
    { id: 'packing', name: 'Packing List', icon: Package },
    { id: 'bol', name: 'Bill of Lading', icon: Anchor },
    { id: 'coo', name: 'Certificate of Origin', icon: Globe2 },
    { id: 'lc', name: 'Letter of Credit', icon: Building },
    { id: 'insurance', name: 'Insurance Certificate', icon: Shield },
    { id: 'export', name: 'Export License', icon: FileCheck },
    { id: 'import', name: 'Bill of Entry', icon: Building2 },
  ];

  const generatePDF = () => {
    setGenerating(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.setTextColor(21, 66, 48);
      doc.text(documentTypes.find(d => d.id === selectedDoc)?.name.toUpperCase() || 'DOCUMENT', 105, 20, { align: 'center' });
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text('LEVERGE Trade OS - Auto-Generated', 105, 28, { align: 'center' });
      doc.line(20, 35, 190, 35);
      doc.setFontSize(11);
      doc.setTextColor(0);
      const details = [['Doc Number:', 'INV-2026-001'], ['Date:', new Date().toLocaleDateString()], ['Seller:', 'Global Trade Exports Pvt Ltd'], ['Buyer:', 'UAE Trading LLC'], ['Product:', 'Premium Basmati Rice 1121'], ['Quantity:', '50 MT'], ['Price:', '$42,500']];
      let y = 50;
      details.forEach(([label, value]) => { doc.text(label, 25, y); doc.text(value, 80, y); y += 10; });
      doc.setFontSize(14);
      doc.setTextColor(21, 66, 48);
      doc.text('Total: $42,500', 190, y + 20, { align: 'right' });
      doc.save(`${selectedDoc.toUpperCase()}-INV-2026-001.pdf`);
      setGenerating(false);
      setGenerated(true);
      addNotification('📄 Document downloaded automatically');
    }, 1500);
  };

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#A6824A15' }}>
            <FileText className="w-4 h-4" style={{ color: '#A6824A' }} />
            <span className="text-sm font-medium" style={{ color: '#A6824A' }}>Automated Document Generation</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 brand-font" style={{ color: '#101111' }}>Documents in Seconds</h2>
          <p className="text-lg" style={{ color: '#4A4A4A' }}>AI auto-fills templates • Generate instantly</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#101111' }}>Select Document Type</h3>
            <div className="grid grid-cols-2 gap-4">
              {documentTypes.map((doc, i) => (
                <motion.button key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => { setSelectedDoc(doc.id); setGenerated(false); }} whileHover={{ scale: 1.02 }} className="p-4 rounded-xl border text-left transition-all" style={{ backgroundColor: selectedDoc === doc.id ? '#15423010' : 'white', borderColor: selectedDoc === doc.id ? '#154230' : 'rgba(0,0,0,0.08)' }}>
                  <doc.icon className="w-8 h-8 mb-3" style={{ color: selectedDoc === doc.id ? '#154230' : '#A6824A' }} />
                  <div className="font-medium" style={{ color: '#101111' }}>{doc.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#101111' }}>Document Preview</h3>
            <div className="rounded-2xl p-8 shadow-xl min-h-[500px]" style={{ backgroundColor: 'white' }}>
              <div className="space-y-6" style={{ color: '#101111' }}>
                <div className="text-center pb-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: '#154230' }}>{documentTypes.find(d => d.id === selectedDoc)?.name?.toUpperCase()}</div>
                  <div style={{ color: '#4A4A4A' }}>LEVERGE Trade OS • Auto-Generated</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div><div className="text-xs uppercase mb-1" style={{ color: '#4A4A4A' }}>Doc Number</div><div className="font-medium">INV-2026-001</div></div>
                  <div><div className="text-xs uppercase mb-1" style={{ color: '#4A4A4A' }}>Date</div><div className="font-medium">{new Date().toLocaleDateString()}</div></div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div><div className="text-xs uppercase mb-1" style={{ color: '#4A4A4A' }}>Seller</div><div className="font-medium">Global Trade Exports Pvt Ltd</div></div>
                  <div><div className="text-xs uppercase mb-1" style={{ color: '#4A4A4A' }}>Buyer</div><div className="font-medium">UAE Trading LLC</div></div>
                </div>
                <div className="pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  <table className="w-full"><thead><tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}><th className="text-left py-2 text-xs" style={{ color: '#4A4A4A' }}>Description</th><th className="text-right py-2 text-xs" style={{ color: '#4A4A4A' }}>Price</th></tr></thead>
                    <tbody><tr style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}><td className="py-2">Premium Basmati Rice 1121</td><td className="text-right font-medium">$42,500</td></tr></tbody>
                    <tfoot><tr><td colSpan={2} className="text-right py-2 font-bold" style={{ color: '#154230' }}>Total: $42,500</td></tr></tfoot>
                  </table>
                </div>
                {generated && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 px-3 py-1 rounded-full text-sm" style={{ backgroundColor: '#22C55E20', color: '#16A34A' }}><Check className="w-4 h-4" /> Auto-Downloaded</motion.div>}
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={generatePDF} disabled={generating} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-white disabled:opacity-50" style={{ backgroundColor: '#154230' }}>
                {generating ? <><RefreshCw className="w-5 h-5 animate-spin" /> Auto-Generating...</> : <><Download className="w-5 h-5" /> Generate & Download PDF</>}
              </button>
              <button className="px-6 py-4 rounded-xl font-medium" style={{ backgroundColor: '#A6824A10', color: '#A6824A' }}><Share2 className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SECTIONS 4-8: Simplified versions (can expand as needed)
// ============================================================================

function ComplianceSection({ demoPlaying, addNotification }: { demoPlaying: boolean; addNotification: (msg: string) => void }) {
  const [hsCodeSearch, setHsCodeSearch] = useState('');
  const [dutyResult, setDutyResult] = useState<any>(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    if (demoPlaying) {
      setTimeout(() => {
        setHsCodeSearch('rice');
        setCalculating(true);
        setTimeout(() => {
          setDutyResult({ hsCode: '1006.30', dutyRate: 11.2, vat: 5, totalLandedCost: 11620 });
          setCalculating(false);
          addNotification('🛡️ Compliance check: All clear');
        }, 1500);
      }, 2000);
    }
  }, [demoPlaying]);

  const hsCodes = [
    { code: '1006.30', description: 'Rice, Semi-milled or Wholly Milled', duty: 11.2, vat: 6 },
    { code: '5201.00', description: 'Cotton, Not Carded or Combed', duty: 8.4, vat: 0 },
    { code: '7403.11', description: 'Copper Cathodes and Refined Copper', duty: 1.5, vat: 5 },
    { code: '8541.40', description: 'Solar Photovoltaic Cells', duty: 0, vat: 0 },
    { code: '1509.10', description: 'Olive Oil, Virgin', duty: 5.4, vat: 10 },
  ];

  const calculateDuty = () => {
    setCalculating(true);
    setTimeout(() => {
      const hs = hsCodes.find(h => h.code.includes(hsCodeSearch) || h.description.toLowerCase().includes(hsCodeSearch.toLowerCase()));
      if (hs) {
        const baseValue = 10000;
        const duty = baseValue * (hs.duty / 100);
        const vat = (baseValue + duty) * (hs.vat / 100);
        setDutyResult({ hsCode: hs.code, dutyRate: hs.duty, vat: hs.vat, totalLandedCost: baseValue + duty + vat });
        addNotification(`🛡️ Duty calculated for ${hs.code}: ${hs.duty}%`);
      }
      setCalculating(false);
    }, 1500);
  };

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#7C3AED15' }}><Shield className="w-4 h-4" style={{ color: '#7C3AED' }} /><span className="text-sm font-medium" style={{ color: '#7C3AED' }}>AI-Powered Compliance</span></motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 brand-font" style={{ color: '#101111' }}>Stay Compliant</h2>
          <p className="text-lg" style={{ color: '#4A4A4A' }}>Auto-check HS codes • Calculate duties instantly</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#101111' }}>HS Code Search</h3>
            <div className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: 'white' }}>
              <div className="relative mb-6"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#4A4A4A' }} /><input type="text" value={hsCodeSearch} onChange={(e) => setHsCodeSearch(e.target.value)} placeholder="Search HS code or product..." className="w-full pl-12 pr-4 py-4 rounded-xl" style={{ backgroundColor: '#A6824A10', border: '1px solid rgba(0,0,0,0.08)', color: '#101111' }} /></div>
              <div className="space-y-3">{hsCodes.filter(h => h.code.includes(hsCodeSearch) || h.description.toLowerCase().includes(hsCodeSearch.toLowerCase())).map((hs, i) => (<motion.div key={hs.code} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} onClick={() => setHsCodeSearch(hs.code)} className="p-4 rounded-xl cursor-pointer" style={{ backgroundColor: '#A6824A10' }}><div className="flex justify-between mb-2"><span className="font-mono font-medium" style={{ color: '#7C3AED' }}>{hs.code}</span><span className="text-sm" style={{ color: '#16A34A' }}>{hs.duty}% duty</span></div><div className="text-sm" style={{ color: '#4A4A4A' }}>{hs.description}</div></motion.div>))}</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#101111' }}>Duty Calculator</h3>
            <div className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: 'white' }}>
              <button onClick={calculateDuty} disabled={calculating} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-white disabled:opacity-50" style={{ backgroundColor: '#7C3AED' }}>{calculating ? <><RefreshCw className="w-5 h-5 animate-spin" /> Auto-Calculating...</> : <><Calculator className="w-5 h-5" /> Calculate Duty (AI)</>}</button>
              {dutyResult && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-6 rounded-xl" style={{ backgroundColor: '#16A34A10' }}><div className="flex items-center gap-2 mb-4"><CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} /><span className="font-medium" style={{ color: '#16A34A' }}>AI Calculation Complete</span></div><div className="space-y-3"><div className="flex justify-between"><span style={{ color: '#4A4A4A' }}>HS Code</span><span className="font-mono" style={{ color: '#101111' }}>{dutyResult.hsCode}</span></div><div className="flex justify-between"><span style={{ color: '#4A4A4A' }}>Import Duty</span><span style={{ color: '#CA8A04' }}>{dutyResult.dutyRate}%</span></div><div className="flex justify-between"><span style={{ color: '#4A4A4A' }}>VAT/GST</span><span style={{ color: '#3B82F6' }}>{dutyResult.vat}%</span></div><div className="flex justify-between font-bold text-lg pt-3" style={{ borderTop: '1px solid #16A34A30' }}><span style={{ color: '#101111' }}>Total Landed Cost</span><span style={{ color: '#16A34A' }}>${dutyResult.totalLandedCost.toLocaleString()}</span></div></div></motion.div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FreightSection({ animatedRoutes, demoPlaying, addNotification }: { animatedRoutes: number[]; demoPlaying: boolean; addNotification: (msg: string) => void }) {
  const [selectedQuote, setSelectedQuote] = useState<number | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const quotes = [
    { carrier: 'Maersk', price: 2850, transit: '18 days', type: '20ft Container', recommended: true },
    { carrier: 'MSC', price: 2650, transit: '21 days', type: '20ft Container', recommended: false },
    { carrier: 'CMA CGM', price: 2950, transit: '16 days', type: '20ft Container', recommended: false },
  ];

  useEffect(() => {
    if (demoPlaying) {
      setSelectedQuote(0);
      setTimeout(() => { setShowBooking(true); addNotification('🚢 Freight auto-booked'); }, 3000);
    }
  }, [demoPlaying]);

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#5D1E2115' }}><Truck className="w-4 h-4" style={{ color: '#5D1E21' }} /><span className="text-sm font-medium" style={{ color: '#5D1E21' }}>Automated Freight</span></motion.div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 brand-font" style={{ color: '#101111' }}>Ship Globally</h2>
        <p className="text-lg" style={{ color: '#4A4A4A' }}>Auto-compare carriers • Real-time tracking</p></div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-6 shadow-md h-full" style={{ backgroundColor: 'white' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#101111' }}>Global Trade Routes</h3>
              <div className="relative h-[400px] rounded-xl overflow-hidden" style={{ backgroundColor: '#F7F6F2' }}>
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  <path d="M150,120 Q200,100 280,130 Q320,150 340,200 Q350,250 320,300 Q280,340 220,350 Q160,340 140,280 Q120,220 150,120" fill="#A6824A20" /><path d="M450,80 Q520,60 600,90 Q660,120 680,180 Q690,240 660,280 Q620,310 560,320 Q500,330 460,290 Q420,250 440,180 Q450,120 450,80" fill="#A6824A20" /><path d="M700,150 Q760,130 820,160 Q870,200 860,260 Q840,310 780,320 Q720,320 700,270 Q680,220 700,150" fill="#A6824A20" />
                  {[{ from: [180, 180], to: [620, 200] }, { from: [620, 200], to: [850, 420] }].map((route, i) => (<g key={i}><motion.line x1={route.from[0]} y1={route.from[1]} x2={route.to[0]} y2={route.to[1]} stroke="#154230" strokeWidth="2" strokeDasharray="10 5" initial={{ pathLength: 0 }} animate={{ pathLength: 1, opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }} /><motion.circle r="4" fill="#154230" initial={{ cx: route.from[0], cy: route.from[1] }} animate={{ cx: route.to[0], cy: route.to[1] }} transition={{ duration: 4, repeat: Infinity }} /></g>))}
                  {[{ x: 180, y: 180, name: 'Mumbai' }, { x: 620, y: 200, name: 'Dubai' }, { x: 850, y: 420, name: 'Singapore' }, { x: 500, y: 100, name: 'Rotterdam' }].map((port, i) => (<g key={port.name}><motion.circle cx={port.x} cy={port.y} r="12" fill="none" stroke="#154230" strokeWidth="2" animate={{ r: [12, 24], opacity: [0.8, 0] }} transition={{ duration: 2, repeat: Infinity }} /><motion.circle cx={port.x} cy={port.y} r="4" fill="#154230" initial={{ scale: 0 }} animate={{ scale: 1 }} /><text x={port.x} y={port.y + 18} textAnchor="middle" fontSize="10" fill="#4A4A4A">{port.name}</text></g>))}
                </svg>
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}><div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#16A34A' }} /><span className="text-xs" style={{ color: '#4A4A4A' }}>Live Tracking Active</span></div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: 'white' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#101111' }}>Shipping Quotes</h3>
              <div className="space-y-3">{quotes.map((quote, i) => (<motion.div key={quote.carrier} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} onClick={() => setSelectedQuote(i)} className="p-4 rounded-xl border cursor-pointer transition-all" style={{ backgroundColor: selectedQuote === i ? '#15423010' : 'white', borderColor: selectedQuote === i ? '#154230' : 'rgba(0,0,0,0.08)' }}><div className="flex justify-between mb-2"><div className="flex items-center gap-2"><span className="font-medium" style={{ color: '#101111' }}>{quote.carrier}</span>{quote.recommended && <span className="px-2 py-0.5 rounded-full text-xs text-white" style={{ backgroundColor: '#16A34A' }}>Best</span>}</div><span className="text-lg font-bold" style={{ color: '#154230' }}>${quote.price}</span></div><div className="flex items-center gap-4 text-sm" style={{ color: '#4A4A4A' }}><span>{quote.transit}</span><span>•</span><span>{quote.type}</span></div></motion.div>))}</div>
              <button onClick={() => selectedQuote !== null && setShowBooking(true)} disabled={selectedQuote === null} className="w-full mt-4 py-3 rounded-xl font-medium text-white disabled:opacity-50" style={{ backgroundColor: '#5D1E21' }}>Book This Shipment (Auto-Book)</button>
            </div>
          </div>
        </div>
        <AnimatePresence>{showBooking && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowBooking(false)}><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-2xl p-8 max-w-md w-full text-center" style={{ backgroundColor: 'white' }}><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#16A34A' }}><Check className="w-8 h-8 text-white" /></motion.div><h3 className="text-xl font-bold mb-2" style={{ color: '#101111' }}>Shipment Auto-Booked!</h3><p className="mb-4" style={{ color: '#4A4A4A' }}>Tracking: LEV-{Date.now().toString().slice(-8)}</p><button onClick={() => setShowBooking(false)} className="w-full py-3 rounded-xl font-medium text-white" style={{ backgroundColor: '#154230' }}>Done</button></motion.div></motion.div>)}</AnimatePresence>
      </div>
    </div>
  );
}

function PaymentsSection({ demoPlaying, addNotification }: { demoPlaying: boolean; addNotification: (msg: string) => void }) {
  const [escrowStep, setEscrowStep] = useState(0);

  useEffect(() => {
    if (demoPlaying) {
      const timer = setTimeout(() => { if (escrowStep < 4) { setEscrowStep(prev => prev + 1); addNotification('💰 Payment step completed'); } }, 2000);
      return () => clearTimeout(timer);
    }
  }, [demoPlaying, escrowStep]);

  const escrowSteps = [
    { title: 'Buyer Deposits Funds', desc: 'Auto-escrowed securely', icon: CreditCard },
    { title: 'Seller Ships Goods', desc: 'Tracking auto-generated', icon: Truck },
    { title: 'Buyer Confirms Receipt', desc: 'Auto-verified', icon: Package },
    { title: 'Funds Released', desc: 'Auto-transferred', icon: CheckCircle2 },
  ];

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#DC262615' }}><CreditCard className="w-4 h-4" style={{ color: '#DC2626' }} /><span className="text-sm font-medium" style={{ color: '#DC2626' }}>Automated Payments</span></motion.div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 brand-font" style={{ color: '#101111' }}>Protected Transactions</h2>
        <p className="text-lg" style={{ color: '#4A4A4A' }}>Auto-escrow • Multi-currency • Secure</p></div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#101111' }}>How Escrow Works (Auto)</h3>
            <div className="rounded-2xl p-8 shadow-md" style={{ backgroundColor: 'white' }}>
              <div className="space-y-4">{escrowSteps.map((step, i) => (<motion.div key={step.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="flex items-center gap-4 p-4 rounded-xl transition-all" style={{ backgroundColor: escrowStep > i ? '#22C55E10' : escrowStep === i + 1 ? '#CA8A0410' : '#A6824A10' }}><div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: escrowStep > i ? '#16A34A' : escrowStep === i + 1 ? '#CA8A04' : '#A6824A' }}>{escrowStep > i ? <Check className="w-5 h-5 text-white" /> : <step.icon className="w-5 h-5 text-white" />}</div><div><div className="font-medium" style={{ color: escrowStep > i ? '#16A34A' : '#101111' }}>{step.title}</div><div className="text-sm" style={{ color: '#4A4A4A' }}>{step.desc}</div></div></motion.div>))}</div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#101111' }}>Payment Methods</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">{[{ name: 'Stripe', desc: 'International' }, { name: 'Razorpay', desc: 'India' }, { name: 'Wire Transfer', desc: 'Bank to Bank' }, { name: 'Letter of Credit', desc: 'Trade Finance' }].map((method, i) => (<motion.div key={method.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="p-4 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}><div className="w-10 h-10 rounded-xl mb-2 flex items-center justify-center text-2xl" style={{ backgroundColor: '#A6824A15' }}>{i === 0 ? '💳' : i === 1 ? '₹' : i === 2 ? '🏦' : '📄'}</div><div className="font-medium" style={{ color: '#101111' }}>{method.name}</div><div className="text-sm" style={{ color: '#4A4A4A' }}>{method.desc}</div></motion.div>))}</div>
            <div className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: 'white' }}><h4 className="font-medium mb-4" style={{ color: '#101111' }}>Multi-Currency Auto</h4><div className="flex flex-wrap gap-2">{['USD', 'EUR', 'GBP', 'AED', 'INR', 'CNY', 'SGD', 'JPY', 'AUD'].map((c, i) => (<motion.span key={c} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="px-3 py-1 rounded-lg text-sm" style={{ backgroundColor: '#A6824A10', color: '#101111' }}>{c}</motion.span>))}</div></div>
            <div className="mt-6 rounded-2xl p-6 shadow-md" style={{ backgroundColor: 'white', border: '2px solid #16A34A30' }}><div className="flex items-center gap-2 mb-4"><CheckCircle2 className="w-5 h-5" style={{ color: '#16A34A' }} /><span className="font-medium" style={{ color: '#16A34A' }}>Auto-Confirmed Transaction</span></div><div className="space-y-3"><div className="flex justify-between"><span style={{ color: '#4A4A4A' }}>Order</span><span style={{ color: '#101111' }}>INV-2026-001</span></div><div className="text-xl font-bold" style={{ color: '#16A34A' }}>$42,500 USD</div><div className="flex justify-between"><span style={{ color: '#4A4A4A' }}>Status</span><span className="px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#22C55E20', color: '#16A34A' }}>Escrow Protected</span></div></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AISection({ demoPlaying, addNotification }: { demoPlaying: boolean; addNotification: (msg: string) => void }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: "👋 I'm your AI assistant powered by HOJAI. I auto-handle:\n\n• Document generation\n• Duty calculations\n• Supplier matching\n• Compliance checks\n• Trade intelligence" }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (demoPlaying) {
      const prompts = ['Create export invoice', 'Calculate duty for rice', 'Find cotton suppliers', 'Track my shipment'];
      let i = 0;
      const interval = setInterval(() => {
        const prompt = prompts[i % prompts.length];
        setMessages(prev => [...prev, { role: 'user', content: prompt }]);
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          const responses: Record<string, string> = {
            'Create export invoice': "📄 Invoice auto-generated!\nSeller: Global Trade Exports\nProduct: Basmati Rice 50 MT\nValue: $42,500\nReady for download.",
            'Calculate duty for rice': "🧮 To UAE:\n• HS Code: 1006.30\n• Duty: 5%\n• VAT: 5%\n• Total: $11,000",
            'Find cotton suppliers': "🔍 Found 47 matches!\n• India: 23 suppliers\n• Pakistan: 15 suppliers\n• USA: 9 suppliers",
            'Track my shipment': "🚢 Status: In Transit\n• Location: Dubai Port\n• ETA: July 4, 2026",
          };
          setMessages(prev => [...prev, { role: 'assistant', content: responses[prompt] }]);
          addNotification(`🤖 AI completed: ${prompt}`);
        }, 2000);
        i++;
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [demoPlaying]);

  const responses: Record<string, string> = {
    'Create export invoice': "📄 Invoice auto-generated!\nSeller: Global Trade Exports\nProduct: Basmati Rice 50 MT\nValue: $42,500",
    'Calculate import duty': "🧮 To UAE:\n• HS: 1006.30\n• Duty: 5%\n• Total: $11,000",
    'Find cotton suppliers': "🔍 Found 47 suppliers:\n• India: 23 ⭐\n• Pakistan: 15 ⭐\n• USA: 9",
    'Track my shipment': "🚢 In Transit\n• Dubai Port\n• ETA: July 4",
    'default': "I can auto-handle any trade task!",
  };

  const sendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', content: responses[messageText] || responses['default'] }]);
      addNotification(`🤖 AI: ${messageText} completed`);
    }, 1500);
  };

  return (
    <div className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#0891B215' }}><Bot className="w-4 h-4" style={{ color: '#0891B2' }} /><span className="text-sm font-medium" style={{ color: '#0891B2' }}>Powered by HOJAI AI</span></motion.div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 brand-font" style={{ color: '#101111' }}>Your AI Trade Partner</h2>
        <p className="text-lg" style={{ color: '#4A4A4A' }}>Auto-handles documents, compliance, supplier matching</p></div>
        <div className="rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: 'white' }}>
          <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}><div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0891B2, #3B82F6)' }}><Bot className="w-6 h-6 text-white" /></div><div><div className="font-medium" style={{ color: '#101111' }}>HOJAI AI Copilot</div><div className="text-xs" style={{ color: '#16A34A' }}>Auto-mode active</div></div></div>
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (<motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className="max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-line" style={{ backgroundColor: msg.role === 'user' ? '#154230' : '#A6824A10', color: msg.role === 'user' ? 'white' : '#101111', borderBottomLeftRadius: msg.role === 'user' ? '8px' : '0', borderBottomRightRadius: msg.role === 'user' ? '0' : '8px' }}>{msg.content}</div></motion.div>))}
            {typing && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start"><div className="px-4 py-3 rounded-2xl rounded-bl-md" style={{ backgroundColor: '#A6824A10' }}><div className="flex gap-1">{[0, 1, 2].map(i => <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }} className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4A4A4A' }} />)}</div></div></motion.div>)}
          </div>
          <div className="p-4" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="flex flex-wrap gap-2 mb-4">{[{ text: 'Create invoice', icon: FileText }, { text: 'Calculate duty', icon: Calculator }, { text: 'Find suppliers', icon: Users }, { text: 'Track shipment', icon: Truck }].map(action => (<motion.button key={action.text} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={() => sendMessage(action.text)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ backgroundColor: '#A6824A10', color: '#A6824A' }}><action.icon className="w-4 h-4" />{action.text}</motion.button>))}</div>
            <div className="flex gap-3"><input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Ask anything..." className="flex-1 px-4 py-3 rounded-xl" style={{ backgroundColor: '#A6824A10', border: '1px solid rgba(0,0,0,0.08)', color: '#101111' }} /><button onClick={() => sendMessage()} className="px-6 py-3 rounded-xl font-medium text-white" style={{ backgroundColor: '#0891B2' }}><Send className="w-4 h-4" /></button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NetworkSection({ animatedRoutes, demoPlaying }: { animatedRoutes: number[]; demoPlaying: boolean }) {
  const [partners] = useState([
    { id: 1, name: 'Global Trade Exports', country: 'India', type: 'Exporter', products: 45, verified: true, tradeVolume: '$2.5M' },
    { id: 2, name: 'UAE Trading LLC', country: 'UAE', type: 'Importer', products: 120, verified: true, tradeVolume: '$5.8M' },
    { id: 3, name: 'Germany Textiles GmbH', country: 'Germany', type: 'Buyer', products: 89, verified: true, tradeVolume: '$3.2M' },
    { id: 4, name: 'Singapore Logistics', country: 'Singapore', type: 'Freight', products: 34, verified: true, tradeVolume: '$1.9M' },
    { id: 5, name: 'Shanghai Import Co.', country: 'China', type: 'Importer', products: 256, verified: true, tradeVolume: '$8.4M' },
    { id: 6, name: 'Brazil Commodities', country: 'Brazil', type: 'Exporter', products: 67, verified: false, tradeVolume: '$2.1M' },
  ]);
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = ['all', 'Exporter', 'Importer', 'Buyer', 'Freight'];
  const filteredPartners = activeFilter === 'all' ? partners : partners.filter(p => p.type === activeFilter);

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12"><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#6366F115' }}><Network className="w-4 h-4" style={{ color: '#6366F1' }} /><span className="text-sm font-medium" style={{ color: '#6366F1' }}>Global Network</span></motion.div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 brand-font" style={{ color: '#101111' }}>The Trade Network</h2>
        <p className="text-lg" style={{ color: '#4A4A4A' }}>Auto-connected businesses worldwide</p></div>
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8" style={{ backgroundColor: '#F7F6F2' }}>
          <svg viewBox="0 0 1000 400" className="w-full h-full">
            <path d="M150,100 Q200,80 280,110 Q320,130 340,180 Q350,230 320,280 Q280,320 220,330 Q160,320 140,260 Q120,200 150,100" fill="#A6824A20" /><path d="M450,60 Q520,40 600,70 Q660,100 680,160 Q690,220 660,260 Q620,290 560,300 Q500,310 460,270 Q420,230 440,160 Q450,100 450,60" fill="#A6824A20" /><path d="M700,130 Q760,110 820,140 Q870,180 860,240 Q840,290 780,300 Q720,300 700,250 Q680,200 700,130" fill="#A6824A20" />
            {animatedRoutes.map((routeIndex, i) => (<motion.circle key={i} cx={150 + routeIndex * 150} cy={100 + (routeIndex % 3) * 100} r="4" fill="#6366F1" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} />))}
            {partners.map((partner, i) => (<motion.circle key={partner.name} cx={100 + i * 150} cy={100 + (i % 3) * 100} r={partner.verified ? 8 : 6} fill={partner.verified ? '#16A34A' : '#6366F1'} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }} />))}
          </svg>
          <div className="absolute top-4 left-4 flex gap-4"><div className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}><div className="text-2xl font-bold" style={{ color: '#101111' }}>50,000+</div><div className="text-xs" style={{ color: '#4A4A4A' }}>Auto-connected</div></div><div className="px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}><div className="text-2xl font-bold" style={{ color: '#16A34A' }}>120+</div><div className="text-xs" style={{ color: '#4A4A4A' }}>Countries</div></div></div>
          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}><div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#16A34A' }} /><span className="text-sm" style={{ color: '#4A4A4A' }}>Auto-networking</span></div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-6"><h3 className="text-xl font-semibold" style={{ color: '#101111' }}>Verified Partners</h3><div className="flex gap-2">{filters.map(filter => (<button key={filter} onClick={() => setActiveFilter(filter)} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: activeFilter === filter ? '#6366F1' : '#A6824A10', color: activeFilter === filter ? 'white' : '#4A4A4A' }}>{filter.charAt(0).toUpperCase() + filter.slice(1)}</button>))}</div></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{filteredPartners.map((partner, i) => (<motion.div key={partner.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl p-6 shadow-md" style={{ backgroundColor: 'white', border: '1px solid rgba(0,0,0,0.08)' }}><div className="flex items-start justify-between mb-4"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #154230, #A6824A)' }}>{partner.name.charAt(0)}</div><div><div className="flex items-center gap-2"><span className="font-medium" style={{ color: '#101111' }}>{partner.name}</span>{partner.verified && <CheckCircle2 className="w-4 h-4" style={{ color: '#16A34A' }} />}</div><div className="text-sm" style={{ color: '#4A4A4A' }}>{partner.country} • {partner.type}</div></div></div><div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}><div><div className="text-sm" style={{ color: '#4A4A4A' }}>Products</div><div className="font-medium" style={{ color: '#101111' }}>{partner.products}</div></div><div><div className="text-sm" style={{ color: '#4A4A4A' }}>Trade Volume</div><div className="font-medium" style={{ color: '#16A34A' }}>{partner.tradeVolume}</div></div><button className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#6366F120', color: '#6366F1' }}>Connect</button></div></motion.div>))}</div>
        </div>
      </div>
    </div>
  );
}
