'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  FileText,
  Truck,
  Shield,
  CreditCard,
  Bot,
  ShoppingCart,
  Package,
  Users,
  MapPin,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  Check,
  Star,
  Send,
  Mic,
  Menu,
  X,
  Play,
  Pause,
  Zap,
  TrendingUp,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Heart,
  Share2,
  Building2,
  BarChart3,
  CheckCircle2,
  FileCheck,
  Calculator,
  Ship,
  Building,
  Scale,
  Lock,
  Sparkles,
  Layers,
  Link2,
  Cpu,
  Database,
  Network,
  Activity,
} from 'lucide-react';

// ============================================================================
// LEVERAGE DEMO MODE - Full Feature Showcase
// ============================================================================

export default function DemoPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [animatedRoutes, setAnimatedRoutes] = useState<number[]>([]);

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

  useEffect(() => {
    if (demoPlaying) {
      const interval = setInterval(() => {
        setAnimatedRoutes(prev => {
          if (prev.length >= 6) return [];
          return [...prev, (prev.length) % 6];
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [demoPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">LEVERGE</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Trade OS Demo</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {sections.map((section, i) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === i
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {section.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setDemoPlaying(!demoPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all"
          >
            {demoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden sm:inline">{demoPlaying ? 'Stop Demo' : 'Auto Demo'}</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {activeSection === 0 && <HeroSection key="hero" animatedRoutes={animatedRoutes} />}
          {activeSection === 1 && <MarketplaceSection key="marketplace" />}
          {activeSection === 2 && <DocumentsSection key="documents" />}
          {activeSection === 3 && <ComplianceSection key="compliance" />}
          {activeSection === 4 && <FreightSection key="freight" />}
          {activeSection === 5 && <PaymentsSection key="payments" />}
          {activeSection === 6 && <AISection key="ai" />}
          {activeSection === 7 && <NetworkSection key="network" animatedRoutes={animatedRoutes} />}
        </AnimatePresence>
      </main>

      {/* Section Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(i)}
            className={`p-3 rounded-xl transition-all ${
              activeSection === i
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
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

function HeroSection({ animatedRoutes }: { animatedRoutes: number[] }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const modules = [
    { name: 'Marketplace', icon: ShoppingCart, color: 'emerald', delay: 0 },
    { name: 'Documents', icon: FileText, color: 'blue', delay: 0.1 },
    { name: 'Freight', icon: Truck, color: 'amber', delay: 0.2 },
    { name: 'Compliance', icon: Shield, color: 'purple', delay: 0.3 },
    { name: 'Payments', icon: CreditCard, color: 'rose', delay: 0.4 },
    { name: 'AI Copilot', icon: Bot, color: 'cyan', delay: 0.5 },
  ];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-5rem)] flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(16, 185, 129, 0.5), transparent 50%),
                             linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 60px 60px, 60px 60px',
          }}
        />

        {/* Floating Nodes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/50 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30"
              animate={{
                boxShadow: [
                  '0 0 60px rgba(16, 185, 129, 0.4)',
                  '0 0 100px rgba(16, 185, 129, 0.2)',
                  '0 0 60px rgba(16, 185, 129, 0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Layers className="w-10 h-10 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-slate-950" />
              </div>
            </motion.div>
          </div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight"
          >
            LEVERGE
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-slate-400 mb-2"
          >
            The Trade Operating System
          </motion.p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-slate-500"
          >
            One platform. Every trade function.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'Active Traders', value: '50,000+', icon: Users },
            { label: 'Trade Volume', value: '$2.5B+', icon: TrendingUp },
            { label: 'Countries', value: '120+', icon: Globe },
            { label: 'Documents', value: '1M+', icon: FileCheck },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm"
            >
              <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Module Grid */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {modules.map((module, i) => (
            <motion.div
              key={module.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 cursor-pointer backdrop-blur-sm overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-${module.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`w-12 h-12 rounded-xl bg-${module.color}-500/20 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                <module.icon className={`w-6 h-6 text-${module.color}-400`} />
              </div>
              <div className="text-sm font-medium text-slate-300">{module.name}</div>
              <motion.div
                className="absolute inset-0 border-2 border-emerald-500/0 rounded-2xl"
                animate={{ borderColor: ['rgba(16, 185, 129, 0)', 'rgba(16, 185, 129, 0.5)', 'rgba(16, 185, 129, 0)'] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Connection Lines Animation */}
        <motion.svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${20 + (i % 3) * 30}%`}
              y2={`${20 + Math.floor(i / 3) * 30}%`}
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="10 10"
              animate={{
                strokeDashoffset: [0, -20],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SECTION 2: MARKETPLACE
// ============================================================================

function MarketplaceSection() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Basmati Rice 1121', price: 850, unit: 'MT', moq: '50 MT', supplier: 'Global Trade Exports', rating: 4.8, reviews: 128, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', category: 'Food & Agriculture' },
    { id: 2, name: 'Organic Cotton Yarn 40s', price: 4.20, unit: 'KG', moq: '1000 KG', supplier: 'Cotton World Ltd', rating: 4.7, reviews: 96, image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400', category: 'Textiles' },
    { id: 3, name: 'Copper Cathode 99.99%', price: 7250, unit: 'MT', moq: '25 MT', supplier: 'MetalLink Global', rating: 4.9, reviews: 78, image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400', category: 'Metals' },
    { id: 4, name: 'Solar Panels 550W', price: 165, unit: 'Unit', moq: '100 Units', supplier: 'Shanghai Import Co.', rating: 4.6, reviews: 89, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400', category: 'Energy' },
    { id: 5, name: 'Extra Virgin Olive Oil', price: 4.50, unit: 'L', moq: '5000 L', supplier: 'Turkey Merchants', rating: 4.9, reviews: 156, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', category: 'Food & Agriculture' },
    { id: 6, name: 'Steel Billets Grade A', price: 520, unit: 'MT', moq: '100 MT', supplier: 'India Steel Corp', rating: 4.5, reviews: 64, image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400', category: 'Metals' },
  ]);

  const [rfqs, setRfqs] = useState([
    { id: 'RFQ-001', title: 'Basmati Rice 1121 Premium', buyer: 'UAE Trading LLC', quantity: '500 MT', deadline: 'Jul 15, 2026', responses: 5, status: 'OPEN' },
    { id: 'RFQ-002', title: 'Organic Cotton Yarn', buyer: 'Germany Textiles', quantity: '10,000 KG', deadline: 'Jul 20, 2026', responses: 3, status: 'OPEN' },
    { id: 'RFQ-003', title: 'Electronic Components', buyer: 'Singapore Tech', quantity: '5,000 Units', deadline: 'Jul 25, 2026', responses: 8, status: 'OPEN' },
  ]);

  const [activeTab, setActiveTab] = useState<'products' | 'rfqs'>('products');
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showRFQForm, setShowRFQForm] = useState(false);
  const [newRFQ, setNewRFQ] = useState({ title: '', quantity: '', unit: 'MT', targetPrice: '', deadline: '' });

  const addToCart = (id: number) => {
    setCart(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const submitRFQ = () => {
    if (newRFQ.title && newRFQ.quantity) {
      setRfqs(prev => [...prev, {
        id: `RFQ-${String(prev.length + 1).padStart(3, '0')}`,
        title: newRFQ.title,
        buyer: 'Your Company',
        quantity: `${newRFQ.quantity} ${newRFQ.unit}`,
        deadline: newRFQ.deadline || 'Aug 1, 2026',
        responses: 0,
        status: 'OPEN'
      }]);
      setNewRFQ({ title: '', quantity: '', unit: 'MT', targetPrice: '', deadline: '' });
      setShowRFQForm(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-5rem)] py-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4"
          >
            <ShoppingCart className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Global B2B Marketplace</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trade Globally</h2>
          <p className="text-slate-400 text-lg">Connect with verified suppliers and buyers worldwide</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'products'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('rfqs')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'rfqs'
                ? 'bg-emerald-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            RFQs ({rfqs.length})
          </button>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all hover:border-emerald-500/50 ${
                    cart.includes(product.id) ? 'ring-2 ring-amber-500' : ''
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-lg text-xs text-slate-300">
                      {product.category}
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-lg backdrop-blur-sm transition-all ${
                          favorites.includes(product.id) ? 'bg-rose-500 text-white' : 'bg-slate-900/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg text-slate-400 hover:text-white transition-all">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                    {cart.includes(product.id) && (
                      <div className="absolute bottom-3 left-3 px-3 py-1 bg-amber-500 text-slate-900 rounded-lg text-xs font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> In Cart
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-slate-500 mb-3">{product.supplier}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm text-slate-300">{product.rating}</span>
                      <span className="text-sm text-slate-500">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-emerald-400">${product.price}</span>
                        <span className="text-sm text-slate-500">/{product.unit}</span>
                      </div>
                      <span className="text-xs text-slate-500">MOQ: {product.moq}</span>
                    </div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className={`w-full mt-4 py-3 rounded-xl font-medium transition-all ${
                        cart.includes(product.id)
                          ? 'bg-amber-500/20 text-amber-400 cursor-default'
                          : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      }`}
                    >
                      {cart.includes(product.id) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'rfqs' && (
            <motion.div
              key="rfqs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setShowRFQForm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Create RFQ
                </button>
              </div>

              {/* RFQ Form */}
              <AnimatePresence>
                {showRFQForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">Create New RFQ</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Product Title</label>
                        <input
                          type="text"
                          value={newRFQ.title}
                          onChange={(e) => setNewRFQ(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., Premium Basmati Rice"
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-slate-400 mb-2">Quantity</label>
                          <input
                            type="text"
                            value={newRFQ.quantity}
                            onChange={(e) => setNewRFQ(prev => ({ ...prev, quantity: e.target.value }))}
                            placeholder="500"
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-slate-400 mb-2">Unit</label>
                          <select
                            value={newRFQ.unit}
                            onChange={(e) => setNewRFQ(prev => ({ ...prev, unit: e.target.value }))}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                          >
                            <option value="MT">MT</option>
                            <option value="KG">KG</option>
                            <option value="Units">Units</option>
                            <option value="L">L</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Target Price (Optional)</label>
                        <input
                          type="text"
                          value={newRFQ.targetPrice}
                          onChange={(e) => setNewRFQ(prev => ({ ...prev, targetPrice: e.target.value }))}
                          placeholder="$800/MT"
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Deadline</label>
                        <input
                          type="date"
                          value={newRFQ.deadline}
                          onChange={(e) => setNewRFQ(prev => ({ ...prev, deadline: e.target.value }))}
                          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={submitRFQ}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all"
                      >
                        Submit RFQ
                      </button>
                      <button
                        onClick={() => setShowRFQForm(false)}
                        className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* RFQ List */}
              <div className="grid gap-4">
                {rfqs.map((rfq, i) => (
                  <motion.div
                    key={rfq.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                            {rfq.status}
                          </span>
                          <span className="text-slate-500 text-sm">{rfq.id}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">{rfq.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {rfq.buyer}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {rfq.quantity}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {rfq.deadline}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {rfq.responses} responses
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-all">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-all">
                          Submit Quote
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-24 right-6 bg-slate-900 border border-amber-500/50 rounded-2xl p-4 shadow-2xl shadow-amber-500/10"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-amber-400" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-slate-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              </div>
              <div>
                <div className="text-sm text-slate-400">Cart Total</div>
                <div className="text-lg font-bold text-white">
                  ${products.filter(p => cart.includes(p.id)).reduce((sum, p) => sum + p.price, 0).toLocaleString()}
                </div>
              </div>
              <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-sm font-medium transition-all">
                Checkout
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================================================
// SECTION 3: DOCUMENTS
// ============================================================================

function DocumentsSection() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [orderData, setOrderData] = useState({
    invoiceNumber: 'INV-2026-001',
    date: '2026-07-01',
    sellerName: 'Global Trade Exports Pvt Ltd',
    sellerAddress: '123 Industrial Area, Mumbai, India',
    buyerName: 'UAE Trading LLC',
    buyerAddress: '456 Trade Center, Dubai, UAE',
    product: 'Premium Basmati Rice 1121',
    quantity: '50 MT',
    price: '$42,500',
    terms: 'FOB Mumbai',
  });

  const documents = [
    { id: 'invoice', name: 'Commercial Invoice', icon: FileText, color: 'emerald' },
    { id: 'packing', name: 'Packing List', icon: Package, color: 'blue' },
    { id: 'bol', name: 'Bill of Lading', icon: Ship, color: 'amber' },
    { id: 'coo', name: 'Certificate of Origin', icon: Globe, color: 'purple' },
    { id: 'lc', name: 'Letter of Credit', icon: CreditCard, color: 'rose' },
    { id: 'insurance', name: 'Insurance Certificate', icon: Shield, color: 'cyan' },
    { id: 'export', name: 'Export License', icon: FileCheck, color: 'green' },
    { id: 'import', name: 'Bill of Entry', icon: Scale, color: 'indigo' },
  ];

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-5rem)] py-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">Trade Documents</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Generate Documents in Seconds</h2>
          <p className="text-slate-400 text-lg">Create compliant trade documents with AI-powered automation</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Document Types */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Select Document Type</h3>
            <div className="grid grid-cols-2 gap-4">
              {documents.map((doc, i) => (
                <motion.button
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setSelectedDoc(doc.id); setGenerated(false); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    selectedDoc === doc.id
                      ? `bg-${doc.color}-500/20 border-${doc.color}-500 bg-${doc.color}-500/10`
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <doc.icon className={`w-8 h-8 mb-3 text-${doc.color}-400`} />
                  <div className="font-medium text-white">{doc.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Document Preview */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Document Preview</h3>
            <div className="bg-white rounded-2xl p-8 shadow-2xl min-h-[500px] relative overflow-hidden">
              {generating ? (
                <div className="absolute inset-0 bg-white flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full mx-auto mb-4"
                    />
                    <p className="text-slate-600 font-medium">Generating document...</p>
                    <p className="text-slate-400 text-sm">Using AI to fill template</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-slate-800">
                  <div className="text-center border-b pb-4">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">COMMERCIAL INVOICE</div>
                    <div className="text-slate-500">LEVERGE Trade OS</div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-slate-400 uppercase mb-1">Invoice Number</div>
                      <div className="font-medium">{orderData.invoiceNumber}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase mb-1">Date</div>
                      <div className="font-medium">{orderData.date}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-slate-400 uppercase mb-1">Seller</div>
                      <div className="font-medium">{orderData.sellerName}</div>
                      <div className="text-sm text-slate-500">{orderData.sellerAddress}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase mb-1">Buyer</div>
                      <div className="font-medium">{orderData.buyerName}</div>
                      <div className="text-sm text-slate-500">{orderData.buyerAddress}</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 text-xs text-slate-400">Description</th>
                          <th className="text-right py-2 text-xs text-slate-400">Qty</th>
                          <th className="text-right py-2 text-xs text-slate-400">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">{orderData.product}</td>
                          <td className="text-right py-2">{orderData.quantity}</td>
                          <td className="text-right py-2 font-medium">{orderData.price}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={2} className="text-right py-2 font-medium">Total:</td>
                          <td className="text-right py-2 font-bold text-emerald-600">{orderData.price}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-xs text-slate-400 uppercase mb-1">Incoterms</div>
                      <div className="font-medium">{orderData.terms}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase mb-1">Payment Terms</div>
                      <div className="font-medium">Letter of Credit</div>
                    </div>
                  </div>

                  {generated && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
                    >
                      <Check className="w-4 h-4" />
                      Generated
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white rounded-xl font-medium transition-all"
              >
                {generating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate with AI
                  </>
                )}
              </button>
              <button className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all">
                Download PDF
              </button>
              <button className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SECTION 4: COMPLIANCE
// ============================================================================

function ComplianceSection() {
  const [hsCodeSearch, setHsCodeSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [dutyResult, setDutyResult] = useState<{
    hsCode: string;
    description: string;
    dutyRate: number;
    vat: number;
    totalLandedCost: number;
  } | null>(null);
  const [calculating, setCalculating] = useState(false);

  const hsCodes = [
    { code: '1006.30', description: 'Rice, Semi-milled or Wholly Milled', duty: 11.2, vat: 6 },
    { code: '5201.00', description: 'Cotton, Not Carded or Combed', duty: 8.4, vat: 0 },
    { code: '7403.11', description: 'Copper Cathodes and Refined Copper', duty: 1.5, vat: 5 },
    { code: '8541.40', description: 'Solar Photovoltaic Cells', duty: 0, vat: 0 },
    { code: '1509.10', description: 'Olive Oil, Virgin', duty: 5.4, vat: 10 },
  ];

  const countries = ['USA', 'UAE', 'Germany', 'India', 'China', 'Singapore', 'UK', 'Australia'];

  const calculateDuty = () => {
    if (!hsCodeSearch) return;
    setCalculating(true);
    setTimeout(() => {
      const hs = hsCodes.find(h => h.code.includes(hsCodeSearch) || h.description.toLowerCase().includes(hsCodeSearch.toLowerCase()));
      if (hs) {
        const baseValue = 10000;
        const duty = baseValue * (hs.duty / 100);
        const vat = (baseValue + duty) * (hs.vat / 100);
        setDutyResult({
          hsCode: hs.code,
          description: hs.description,
          dutyRate: hs.duty,
          vat: hs.vat,
          totalLandedCost: baseValue + duty + vat,
        });
      }
      setCalculating(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-5rem)] py-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4"
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Trade Compliance</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Stay Compliant, Every Time</h2>
          <p className="text-slate-400 text-lg">AI-powered HS code suggestions and instant duty calculations</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* HS Code Search */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">HS Code Search</h3>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={hsCodeSearch}
                  onChange={(e) => setHsCodeSearch(e.target.value)}
                  placeholder="Search HS code or product name..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-3">
                {hsCodes
                  .filter(h => h.code.includes(hsCodeSearch) || h.description.toLowerCase().includes(hsCodeSearch.toLowerCase()))
                  .map((hs, i) => (
                    <motion.div
                      key={hs.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl cursor-pointer hover:border-purple-500/50 transition-all"
                      onClick={() => setHsCodeSearch(hs.code)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-purple-400 font-medium">{hs.code}</span>
                        <span className="text-sm text-emerald-400">{hs.duty}% duty</span>
                      </div>
                      <div className="text-sm text-slate-400">{hs.description}</div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>

          {/* Duty Calculator */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Duty Calculator</h3>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Product Value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      type="text"
                      placeholder="10,000"
                      className="w-full pl-8 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Destination Country</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  >
                    {countries.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={calculateDuty}
                disabled={calculating || !hsCodeSearch}
                className="w-full flex items-center justify-center gap-2 py-4 bg-purple-500 hover:bg-purple-600 disabled:bg-slate-700 text-white rounded-xl font-medium transition-all"
              >
                {calculating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    Calculate Duty
                  </>
                )}
              </button>

              {dutyResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 bg-slate-800/50 border border-emerald-500/30 rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Calculation Complete</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">HS Code</span>
                      <span className="text-white font-mono">{dutyResult.hsCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Import Duty</span>
                      <span className="text-amber-400">{dutyResult.dutyRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">VAT/GST</span>
                      <span className="text-blue-400">{dutyResult.vat}%</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="text-white font-medium">Total Landed Cost</span>
                      <span className="text-2xl font-bold text-emerald-400">
                        ${dutyResult.totalLandedCost.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Compliance Checklist */}
            <div className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4">Pre-Shipment Checklist</h4>
              <div className="space-y-3">
                {[
                  { item: 'Commercial Invoice', done: true },
                  { item: 'Packing List', done: true },
                  { item: 'Certificate of Origin', done: true },
                  { item: 'Bill of Lading', done: false },
                  { item: 'Insurance Certificate', done: false },
                ].map((item, i) => (
                  <div key={item.item} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${item.done ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                      {item.done && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={item.done ? 'text-slate-300' : 'text-slate-500'}>{item.item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SECTION 5: FREIGHT
// ============================================================================

function FreightSection() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTracking, setShowTracking] = useState(false);
  const [shipmentStatus, setShipmentStatus] = useState({
    current: 2,
    stages: [
      { name: 'Order Confirmed', date: 'Jun 25, 2026', completed: true },
      { name: 'Picked Up', date: 'Jun 26, 2026', completed: true },
      { name: 'In Transit', date: 'Jun 28, 2026', completed: true, active: true },
      { name: 'Customs Clearance', date: 'Jul 2, 2026', completed: false },
      { name: 'Delivered', date: 'Jul 4, 2026', completed: false },
    ]
  });

  const quotes = [
    { carrier: 'Maersk', price: 2850, transit: '18 days', type: '20ft Container', recommended: true },
    { carrier: 'MSC', price: 2650, transit: '21 days', type: '20ft Container', recommended: false },
    { carrier: 'CMA CGM', price: 2950, transit: '16 days', type: '20ft Container', recommended: false },
    { carrier: 'Hapag-Lloyd', price: 2780, transit: '19 days', type: '20ft Container', recommended: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-5rem)] py-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4"
          >
            <Truck className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Freight & Logistics</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Ship Globally, Track Instantly</h2>
          <p className="text-slate-400 text-lg">Compare carriers, book shipments, and track cargo in real-time</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipping Routes Map */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full">
              <h3 className="text-lg font-semibold text-white mb-4">Global Trade Routes</h3>
              <div className="relative h-[400px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden">
                {/* World Map SVG */}
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  {/* Simplified continents */}
                  <path d="M150,120 Q200,100 280,130 Q320,150 340,200 Q350,250 320,300 Q280,340 220,350 Q160,340 140,280 Q120,220 150,120" fill="#334155" opacity="0.5"/>
                  <path d="M450,80 Q520,60 600,90 Q660,120 680,180 Q690,240 660,280 Q620,310 560,320 Q500,330 460,290 Q420,250 440,180 Q450,120 450,80" fill="#334155" opacity="0.5"/>
                  <path d="M700,150 Q760,130 820,160 Q870,200 860,260 Q840,310 780,320 Q720,320 700,270 Q680,220 700,150" fill="#334155" opacity="0.5"/>
                  <path d="M200,380 Q260,360 320,380 Q360,400 350,440 Q330,470 270,470 Q210,460 200,420 Q195,400 200,380" fill="#334155" opacity="0.5"/>
                  <path d="M780,380 Q840,360 900,390 Q940,420 920,460 Q890,490 830,490 Q770,480 760,440 Q755,410 780,380" fill="#334155" opacity="0.5"/>

                  {/* Trade routes */}
                  {[
                    { from: [180, 180], to: [620, 200] },
                    { from: [620, 200], to: [850, 420] },
                    { from: [280, 420], to: [620, 200] },
                    { from: [180, 180], to: [850, 420] },
                  ].map((route, i) => (
                    <motion.line
                      key={i}
                      x1={route.from[0]}
                      y1={route.from[1]}
                      x2={route.to[0]}
                      y2={route.to[1]}
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray="10 5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        pathLength: { duration: 2, delay: i * 0.3 },
                        opacity: { duration: 2, repeat: Infinity, delay: i * 0.3 }
                      }}
                    />
                  ))}

                  {/* Port markers */}
                  {[
                    { x: 180, y: 180, name: 'Mumbai', pulse: true },
                    { x: 620, y: 200, name: 'Dubai', pulse: false },
                    { x: 850, y: 420, name: 'Singapore', pulse: true },
                    { x: 280, y: 420, name: 'Santos', pulse: false },
                    { x: 500, y: 100, name: 'Rotterdam', pulse: true },
                    { x: 200, y: 130, name: 'New York', pulse: false },
                  ].map((port, i) => (
                    <g key={port.name}>
                      {port.pulse && (
                        <motion.circle
                          cx={port.x}
                          cy={port.y}
                          r="8"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                          animate={{ r: [8, 20], opacity: [0.8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        />
                      )}
                      <motion.circle
                        cx={port.x}
                        cy={port.y}
                        r="4"
                        fill="#10b981"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      />
                      <text x={port.x} y={port.y + 18} textAnchor="middle" fill="#94a3b8" fontSize="10" className="text-xs">
                        {port.name}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Live indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-lg">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs text-slate-300">Live Tracking Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Tracking */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Track Shipment</h3>
              <div className="relative mb-4">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                />
                <button
                  onClick={() => setShowTracking(true)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4 text-white" />
                </button>
              </div>

              {showTracking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-1"
                >
                  {shipmentStatus.stages.map((stage, i) => (
                    <div key={stage.name} className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          stage.completed
                            ? stage.active
                              ? 'bg-amber-500 animate-pulse'
                              : 'bg-emerald-500'
                            : 'bg-slate-700'
                        }`}>
                          {stage.completed && <Check className="w-2 h-2 text-white" />}
                        </div>
                        {i < shipmentStatus.stages.length - 1 && (
                          <div className={`w-0.5 h-8 ${stage.completed ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                        )}
                      </div>
                      <div className="flex-1 py-1">
                        <div className={`text-sm ${stage.completed ? 'text-white' : 'text-slate-500'}`}>
                          {stage.name}
                        </div>
                        {stage.completed && (
                          <div className="text-xs text-slate-500">{stage.date}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Shipping Quotes */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Shipping Quotes</h3>
              <div className="space-y-3">
                {quotes.map((quote, i) => (
                  <motion.div
                    key={quote.carrier}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      quote.recommended
                        ? 'bg-emerald-500/10 border-emerald-500/50'
                        : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{quote.carrier}</span>
                        {quote.recommended && (
                          <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full">Best</span>
                        )}
                      </div>
                      <span className="text-lg font-bold text-emerald-400">${quote.price}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{quote.transit}</span>
                      <span>•</span>
                      <span>{quote.type}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all">
                Book This Shipment
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SECTION 6: PAYMENTS
// ============================================================================

function PaymentsSection() {
  const [escrowStep, setEscrowStep] = useState(0);

  const escrowSteps = [
    { title: 'Buyer Deposits Funds', desc: 'Payment secured in escrow', icon: CreditCard },
    { title: 'Seller Ships Goods', desc: 'Tracking number generated', icon: Truck },
    { title: 'Buyer Confirms Receipt', desc: 'Goods verified and accepted', icon: Package },
    { title: 'Funds Released', desc: 'Payment transferred to seller', icon: CheckCircle2 },
  ];

  useEffect(() => {
    if (escrowStep < 4) {
      const timer = setTimeout(() => setEscrowStep(prev => prev + 1), 2000);
      return () => clearTimeout(timer);
    }
  }, [escrowStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-5rem)] py-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full mb-4"
          >
            <CreditCard className="w-4 h-4 text-rose-400" />
            <span className="text-rose-400 text-sm font-medium">Secure Payments</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Protected Transactions</h2>
          <p className="text-slate-400 text-lg">Escrow payments, multi-currency support, and secure transfers</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Escrow Visualization */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">How Escrow Works</h3>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              {/* Visual */}
              <div className="relative h-[300px] mb-8">
                {/* Escrow Vault */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
                  animate={escrowStep >= 1 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1 }}
                >
                  <div className={`w-full h-full rounded-2xl flex items-center justify-center ${
                    escrowStep >= 1 ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}>
                    <Lock className={`w-12 h-12 ${escrowStep >= 1 ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                </motion.div>

                {/* Buyer */}
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                  animate={escrowStep === 1 ? { x: [0, 20, 0] } : {}}
                  transition={{ duration: 1 }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    escrowStep >= 1 ? 'bg-blue-500' : 'bg-slate-800'
                  }`}>
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center text-xs text-slate-400 mt-1">Buyer</div>
                </motion.div>

                {/* Seller */}
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  animate={escrowStep === 3 ? { x: [0, -20, 0] } : {}}
                  transition={{ duration: 1 }}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    escrowStep >= 3 ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}>
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center text-xs text-slate-400 mt-1">Seller</div>
                </motion.div>

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                  <motion.line
                    x1="64"
                    y1="150"
                    x2="468"
                    y2="150"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0 }}
                    animate={escrowStep >= 1 ? { pathLength: 1 } : {}}
                  />
                  <motion.line
                    x1="468"
                    y1="150"
                    x2="64"
                    y2="150"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0 }}
                    animate={escrowStep >= 3 ? { pathLength: 1 } : {}}
                  />
                </svg>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {escrowSteps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      escrowStep > i ? 'bg-emerald-500/10 border border-emerald-500/30' :
                      escrowStep === i + 1 ? 'bg-amber-500/10 border border-amber-500/30 animate-pulse' :
                      'bg-slate-800/50 border border-slate-700'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      escrowStep > i ? 'bg-emerald-500' :
                      escrowStep === i + 1 ? 'bg-amber-500' :
                      'bg-slate-700'
                    }`}>
                      {escrowStep > i ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <step.icon className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className={`font-medium ${escrowStep > i ? 'text-emerald-400' : 'text-white'}`}>
                        {step.title}
                      </div>
                      <div className="text-sm text-slate-400">{step.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Supported Payment Methods</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { name: 'Stripe', desc: 'International', icon: '💳' },
                { name: 'Razorpay', desc: 'India', icon: '₹' },
                { name: 'Wire Transfer', desc: 'Bank to Bank', icon: '🏦' },
                { name: 'Letter of Credit', desc: 'Trade Finance', icon: '📄' },
              ].map((method, i) => (
                <motion.div
                  key={method.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 bg-slate-900 border border-slate-800 rounded-xl"
                >
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <div className="font-medium text-white">{method.name}</div>
                  <div className="text-sm text-slate-500">{method.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Multi-currency */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-white font-medium mb-4">Multi-Currency Support</h4>
              <div className="flex flex-wrap gap-2">
                {['USD', 'EUR', 'GBP', 'AED', 'INR', 'CNY', 'SGD', 'JPY', 'AUD'].map((currency, i) => (
                  <motion.span
                    key={currency}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-sm"
                  >
                    {currency}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Transaction Summary */}
            <div className="mt-6 bg-slate-900 border border-emerald-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Recent Transaction</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Order</span>
                  <span className="text-white">INV-2026-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount</span>
                  <span className="text-xl font-bold text-emerald-400">$42,500 USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status</span>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">Escrow Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SECTION 7: AI COPILOT
// ============================================================================

function AISection() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "👋 Hi! I'm your AI trade assistant powered by HOJAI. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const quickActions = [
    { text: 'Create export invoice', icon: FileText },
    { text: 'Calculate import duty', icon: Calculator },
    { text: 'Find suppliers for cotton', icon: Users },
    { text: 'Track my shipment', icon: Truck },
  ];

  const responses = {
    'Create export invoice': "I'll help you create an export invoice. Let me prepare the template with your company details and product information...",
    'Calculate import duty': "For importing to the UAE, I need a few details: Product value, HS code, and country of origin. I've found your HS code is 1006.30 for rice. Estimated duty is 5%.",
    'Find suppliers for cotton': "I found 47 verified cotton suppliers matching your criteria. Top matches: India (23), Pakistan (15), USA (9). Want me to show their profiles?",
    'Track my shipment': "Found your shipment! It's currently in Dubai port, cleared customs, and will be delivered by July 4th.",
  };

  const sendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responses[messageText as keyof typeof responses] || "I'll help you with that. Let me process your request..."
      }]);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-5rem)] py-12 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Powered by HOJAI AI</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Your AI Trade Partner</h2>
          <p className="text-slate-400 text-lg">Natural language commands for documents, compliance, and insights</p>
        </div>

        {/* Chat Interface */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
            </div>
            <div>
              <div className="font-medium text-white">HOJAI Trade Copilot</div>
              <div className="text-xs text-emerald-400">Online • Ready to assist</div>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                <Cpu className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-cyan-500 text-white rounded-br-md'
                    : 'bg-slate-800 text-slate-100 rounded-bl-md'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                      className="w-2 h-2 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                      className="w-2 h-2 bg-slate-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-slate-400 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action, i) => (
                <motion.button
                  key={action.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => sendMessage(action.text)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-sm text-slate-300 transition-all"
                >
                  <action.icon className="w-4 h-4 text-cyan-400" />
                  {action.text}
                </motion.button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything about trade..."
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              <button className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={() => sendMessage()}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Document Gen', desc: 'Create trade docs' },
            { name: 'Duty Calc', desc: 'Instant calculations' },
            { name: 'Supplier Match', desc: 'AI recommendations' },
            { name: 'Risk Analysis', desc: 'Fraud detection' },
          ].map((cap, i) => (
            <motion.div
              key={cap.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-center"
            >
              <Activity className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="font-medium text-white text-sm">{cap.name}</div>
              <div className="text-xs text-slate-500">{cap.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// SECTION 8: NETWORK
// ============================================================================

function NetworkSection({ animatedRoutes }: { animatedRoutes: number[] }) {
  const [partners, setPartners] = useState([
    { id: 1, name: 'Global Trade Exports', country: 'India', type: 'Exporter', products: 45, verified: true, tradeVolume: '$2.5M' },
    { id: 2, name: 'UAE Trading LLC', country: 'UAE', type: 'Importer', products: 120, verified: true, tradeVolume: '$5.8M' },
    { id: 3, name: 'Germany Textiles GmbH', country: 'Germany', type: 'Buyer', products: 89, verified: true, tradeVolume: '$3.2M' },
    { id: 4, name: 'Singapore Logistics', country: 'Singapore', type: 'Freight', products: 34, verified: true, tradeVolume: '$1.9M' },
    { id: 5, name: 'Shanghai Import Co.', country: 'China', type: 'Importer', products: 256, verified: true, tradeVolume: '$8.4M' },
    { id: 6, name: 'Brazil Commodities', country: 'Brazil', type: 'Exporter', products: 67, verified: false, tradeVolume: '$2.1M' },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'Exporter', 'Importer', 'Buyer', 'Freight'];

  const filteredPartners = activeFilter === 'all'
    ? partners
    : partners.filter(p => p.type === activeFilter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-5rem)] py-12 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4"
          >
            <Network className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-sm font-medium">Global Network</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Trade Network</h2>
          <p className="text-slate-400 text-lg">Connect with verified businesses worldwide</p>
        </div>

        {/* World Map */}
        <div className="relative h-[400px] bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl overflow-hidden mb-8">
          {/* Animated background */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-indigo-400/50 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* SVG World Map */}
          <svg viewBox="0 0 1000 400" className="w-full h-full relative z-10">
            {/* Simplified world outline */}
            <path d="M150,100 Q200,80 280,110 Q320,130 340,180 Q350,230 320,280 Q280,320 220,330 Q160,320 140,260 Q120,200 150,100" fill="#1e293b" />
            <path d="M450,60 Q520,40 600,70 Q660,100 680,160 Q690,220 660,260 Q620,290 560,300 Q500,310 460,270 Q420,230 440,160 Q450,100 450,60" fill="#1e293b" />
            <path d="M700,130 Q760,110 820,140 Q870,180 860,240 Q840,290 780,300 Q720,300 700,250 Q680,200 700,130" fill="#1e293b" />
            <path d="M200,360 Q260,340 320,360 Q360,380 350,420 Q330,450 270,450 Q210,440 200,400 Q195,380 200,360" fill="#1e293b" />
            <path d="M780,360 Q840,340 900,370 Q940,400 920,440 Q890,470 830,470 Q770,460 760,420 Q755,390 780,360" fill="#1e293b" />

            {/* Animated trade routes */}
            {animatedRoutes.map((routeIndex, i) => (
              <motion.g key={i}>
                <motion.circle
                  cx={150 + routeIndex * 150}
                  cy={100 + (routeIndex % 3) * 100}
                  r="4"
                  fill="#818cf8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.g>
            ))}

            {/* Connection lines */}
            {partners.slice(0, 6).map((partner, i) => (
              <motion.path
                key={partner.name}
                d={`M${500},${200} Q${200 + i * 100},${100 + i * 50} ${100 + i * 150},${100 + (i % 3) * 100}`}
                stroke="#6366f1"
                strokeWidth="1"
                fill="none"
                strokeDasharray="5 5"
                animate={{
                  strokeDashoffset: [0, -20],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            ))}

            {/* Company nodes */}
            {partners.map((partner, i) => (
              <motion.g key={partner.name}>
                <motion.circle
                  cx={100 + i * 150}
                  cy={100 + (i % 3) * 100}
                  r={partner.verified ? 8 : 6}
                  fill={partner.verified ? '#10b981' : '#6366f1'}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                />
                {partner.verified && (
                  <motion.circle
                    cx={100 + i * 150}
                    cy={100 + (i % 3) * 100}
                    r="12"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.g>
            ))}
          </svg>

          {/* Stats overlay */}
          <div className="absolute top-4 left-4 flex gap-4">
            <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-sm rounded-lg">
              <div className="text-2xl font-bold text-white">50,000+</div>
              <div className="text-xs text-slate-400">Connected Businesses</div>
            </div>
            <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-sm rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">120+</div>
              <div className="text-xs text-slate-400">Countries</div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-sm rounded-lg">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-slate-300">Network Active</span>
          </div>
        </div>

        {/* Partner Directory */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Verified Partners</h3>
            <div className="flex gap-2">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPartners.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {partner.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{partner.name}</span>
                        {partner.verified && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                      <div className="text-sm text-slate-500">{partner.country} • {partner.type}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div>
                    <div className="text-sm text-slate-500">Products</div>
                    <div className="font-medium text-white">{partner.products}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Trade Volume</div>
                    <div className="font-medium text-emerald-400">{partner.tradeVolume}</div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg text-sm font-medium transition-colors">
                    Connect
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
