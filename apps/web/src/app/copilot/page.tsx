'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Database, Zap, Bot, Globe, Package, DollarSign, Shield, Truck, FileText,
  Users, Sparkles, Send, Layers, Check, CreditCard, TrendingUp, BarChart3, ShoppingCart,
  MessageCircle, Phone, Mail, Search, Clock, AlertCircle, ArrowRight, PhoneCall, FileCheck,
  Building2, Scale, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// ============================================================================
// LEVERGE COPILOT - UNIVERSAL INTENT ENGINE
// ============================================================================

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'analytics' | 'commerce' | 'communication' | 'workflow' | 'document';
}

interface QuickAction {
  label: string;
  command: string;
  icon: string;
}

export default function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Welcome to LEVERGE Copilot 👋

I'm your AI-powered trade assistant. Ask me anything or give me commands.

📊 Analytics: "What are my sales?"
🛒 Buy: "I want to buy cotton shirts from Vietnam"
📦 Sell: "I want to sell tea to UAE"
🚢 Track: "Track shipment MSC123"
📄 Docs: "Generate invoice for order #5432"
💰 Finance: "Show outstanding invoices"
📞 Comms: "Answer my supplier calls"

How can I help today?`,
      type: 'analytics',
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [workflowSteps, setWorkflowSteps] = useState<{ agent: string; task: string; status: string }[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, workflowSteps]);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // ============================================================================
  // INTENT ENGINE
  // ============================================================================

  const identifyIntent = (text: string): { intent: string; category: string; entities: Record<string, string> } => {
    const lower = text.toLowerCase();

    // ANALYTICS Questions
    if (lower.match(/what are my sales|my sales|sales this month|revenue/i) ||
        lower.match(/how much.*sell|total.*order|turnover/i)) {
      return { intent: 'analytics_sales', category: 'Analytics', entities: {} };
    }

    if (lower.match(/top product|best selling|most popular/i)) {
      return { intent: 'analytics_top_products', category: 'Analytics', entities: {} };
    }

    if (lower.match(/supplier.*revenue|which supplier.*most|best supplier/i)) {
      return { intent: 'analytics_supplier_performance', category: 'Analytics', entities: {} };
    }

    if (lower.match(/compare|vs|versus|year over year|growth/i)) {
      return { intent: 'analytics_comparison', category: 'Analytics', entities: {} };
    }

    if (lower.match(/outstanding|invoice.*due|overdue|pending payment/i)) {
      return { intent: 'finance_outstanding', category: 'Finance', entities: {} };
    }

    // BUY Intent
    if (lower.match(/i want to buy|i want to purchase|need to import|buy.*from|import.*from/i)) {
      return { intent: 'buy_product', category: 'Commerce', entities: extractEntities(text) };
    }

    // SELL Intent
    if (lower.match(/i want to sell|i want to export|sell.*to|export.*to|find.*buyer|looking.*buyer/i)) {
      return { intent: 'sell_product', category: 'Commerce', entities: extractEntities(text) };
    }

    // TRACK Intent
    if (lower.match(/track|shipment|where is|delivery status|where.*order/i)) {
      const entities = extractEntities(text);
      const match = text.match(/(MSC[A-Z0-9]+|ABC\d+|ORD-\d+)/i);
      if (match) entities.shipmentId = match[1];
      return { intent: 'track_shipment', category: 'Logistics', entities };
    }

    // BOOK FREIGHT
    if (lower.match(/book.*freight|cheapest.*route|shipping.*to|book.*container/i)) {
      return { intent: 'book_freight', category: 'Logistics', entities: extractEntities(text) };
    }

    // DOCUMENT Intent
    if (lower.match(/generate.*invoice|create.*invoice|download.*invoice|invoice.*order/i)) {
      return { intent: 'generate_invoice', category: 'Documents', entities: extractEntities(text) };
    }

    if (lower.match(/generate.*(bill of lading|bl)|create.*bl|bill of lading/i)) {
      return { intent: 'generate_bl', category: 'Documents', entities: {} };
    }

    if (lower.match(/generate.*(coo|certificate of origin)|create.*coo/i)) {
      return { intent: 'generate_coo', category: 'Documents', entities: {} };
    }

    if (lower.match(/generate.*document|export.*document|all.*document/i)) {
      return { intent: 'generate_all_docs', category: 'Documents', entities: {} };
    }

    // PAYMENT / ESCROW
    if (lower.match(/create.*escrow|set up.*escrow|escrow.*order/i)) {
      return { intent: 'create_escrow', category: 'Finance', entities: {} };
    }

    if (lower.match(/lc|letter of credit|open.*lc/i)) {
      return { intent: 'create_lc', category: 'Finance', entities: {} };
    }

    // RFQ / QUOTATION
    if (lower.match(/create.*rfq|request.*quote|new.*quotation|send.*rfq/i)) {
      return { intent: 'create_rfq', category: 'Commerce', entities: {} };
    }

    // COMMUNICATION
    if (lower.match(/answer.*call|incoming.*call|phone.*call|take.*call/i)) {
      return { intent: 'handle_call', category: 'Communication', entities: {} };
    }

    if (lower.match(/whatsapp|message.*supplier|chat.*buyer/i)) {
      return { intent: 'handle_whatsapp', category: 'Communication', entities: {} };
    }

    if (lower.match(/reply.*email|email.*supplier|respond.*buyer/i)) {
      return { intent: 'handle_email', category: 'Communication', entities: {} };
    }

    // REPEAT / MEMORY
    if (lower.match(/repeat.*last|duplicate.*order|same.*order|last.*shipment/i)) {
      return { intent: 'repeat_order', category: 'Memory', entities: {} };
    }

    if (lower.match(/preferred.*supplier|usual.*provider|my.*logistics|use.*same.*supplier/i)) {
      return { intent: 'preferred_provider', category: 'Memory', entities: {} };
    }

    // SUPPORT
    if (lower.match(/support|help|issue|problem|not working/i)) {
      return { intent: 'support', category: 'Support', entities: {} };
    }

    // EXPAND / STRATEGY
    if (lower.match(/expand.*market|enter.*country|new.*market|go.*uae|go.*germany/i)) {
      return { intent: 'expand_market', category: 'Strategy', entities: extractEntities(text) };
    }

    // Default
    return { intent: 'general', category: 'General', entities: {} };
  };

  const extractEntities = (text: string): Record<string, string> => {
    const entities: Record<string, string> = {};

    // Extract product
    const products = ['cotton shirts', 'tea', 'rice', 'textiles', 'garments', 'fabric', 'yarn', 'cotton', 'denim'];
    for (const p of products) {
      if (text.toLowerCase().includes(p)) {
        entities.product = p;
        break;
      }
    }

    // Extract country
    const countries = ['vietnam', 'germany', 'uae', 'dubai', 'india', 'china', 'brazil', 'usa', 'uk'];
    for (const c of countries) {
      if (text.toLowerCase().includes(c)) {
        entities.country = c;
        break;
      }
    }

    // Extract quantity
    const qtyMatch = text.match(/(\d+[\d,]*)\s*(unit|pieces|shirts|kg|tons|containers)/i);
    if (qtyMatch) {
      entities.quantity = qtyMatch[1];
      entities.unit = qtyMatch[2];
    }

    // Extract budget
    const budgetMatch = text.match(/\$?(\d+[\d,]*)/);
    if (budgetMatch) {
      entities.amount = budgetMatch[1];
    }

    return entities;
  };

  // ============================================================================
  // RESPONSE GENERATORS
  // ============================================================================

  const getAnalyticsResponse = (intent: string): string => {
    const responses: Record<string, string> = {
      analytics_sales: `📊 Your Sales Overview

This Month: $1.28M (+18% ↑)
Last Month: $1.08M

Top Products:
1. Cotton Shirts - $520K (41%)
2. Denim Jeans - $310K (24%)
3. Polo T-Shirts - $180K (14%)

Top Markets:
• Germany - $420K
• UAE - $380K
• France - $280K

Growth vs Last Year: +30%`,
      analytics_top_products: `🏆 Top Performing Products

1. Cotton Shirts
   Revenue: $520K
   Units Sold: 52,000
   Margin: 18%

2. Denim Jeans
   Revenue: $310K
   Units Sold: 18,000
   Margin: 22%

3. Polo T-Shirts
   Revenue: $180K
   Units Sold: 24,000
   Margin: 15%

4. Linen Trousers
   Revenue: $140K
   Units Sold: 12,000
   Margin: 20%`,
      analytics_supplier_performance: `🏭 Supplier Performance

Top Supplier by Revenue:

1. Vietnam Textiles Ltd
   Purchases: $2.4M
   Orders: 23
   Success Rate: 95%
   Avg Delivery: 17 days

2. Germany Trading GmbH
   Purchases: $1.8M
   Orders: 45
   Success Rate: 98%
   Avg Delivery: 5 days

3. UAE Merchants LLC
   Purchases: $1.2M
   Orders: 32
   Success Rate: 92%
   Avg Delivery: 12 days`,
      analytics_comparison: `📈 Year-over-Year Comparison

2025 Full Year: $8.2M
2026 YTD: $10.7M

Growth: +30% ↑

Breakdown:
• Exports: +42%
• Domestic: +15%

Top Growth Markets:
• Germany: +38%
• UAE: +45%
• France: +28%

Product Mix Shift:
• Higher value products +25%
• Bulk orders +18%`,
      finance_outstanding: `💰 Outstanding Invoices

Total Outstanding: $67,000

• ABC Retail GmbH: $45,000
  Due: 15 days ago

• Berlin Fashion: $22,000
  Due: 3 days ago

Recent Payments:
• Paris Mode SA: $38,000 ✓
• Dubai Traders: $52,000 ✓

Would you like me to send payment reminders?`,
    };
    return responses[intent] || responses.analytics_sales;
  };

  const getCommerceWorkflow = (intent: string, entities: Record<string, string>): { steps: { agent: string; task: string }[]; response: string } => {
    if (intent === 'buy_product') {
      return {
        steps: [
          { agent: 'TwinOS', task: 'Loading company preferences...' },
          { agent: 'MemoryOS', task: 'Checking previous suppliers...' },
          { agent: 'Global Nexha', task: 'Searching Vietnam suppliers...' },
          { agent: 'Import Agent', task: 'Verifying credentials...' },
          { agent: 'Negotiation Agent', task: 'Preparing negotiation strategy...' },
          { agent: 'Compliance Agent', task: 'Checking import regulations...' },
          { agent: 'Finance Agent', task: 'Setting up payment terms...' },
          { agent: 'Logistics Agent', task: 'Comparing freight options...' },
        ],
        response: `🛒 Buy Order Initiated

I've coordinated the organization:

📍 Source: Vietnam
🏭 Suppliers Found: 17
⭐ Best Match: Vietnam Textiles Ltd (96%)

Preliminary Quote:
• Product: ${entities.product || 'Cotton Shirts'}
• Price: $3.15/unit
• Quantity: ${entities.quantity || '10,000'} units
• Total: $31,500

⚠️ Awaiting negotiation completion.

Shall I proceed with negotiation?`,
      };
    }

    if (intent === 'sell_product') {
      return {
        steps: [
          { agent: 'TwinOS', task: 'Loading export preferences...' },
          { agent: 'Global Nexha', task: 'Analyzing UAE market...' },
          { agent: 'Export Agent', task: 'Finding buyer agents...' },
          { agent: 'Sales Agent', task: 'Matching product to buyers...' },
          { agent: 'Compliance Agent', task: 'Checking export licenses...' },
          { agent: 'Pricing Agent', task: 'Setting competitive prices...' },
        ],
        response: `📦 Sell Opportunity Initiated

I've coordinated the organization:

📍 Target Market: ${entities.country || 'UAE'}
🔍 Potential Buyers: 23 found

Top Matches:
1. Dubai Food Trading LLC
2. Abu Dhabi Organic Market
3. Sharjah Retail Group

Estimated Demand: 50,000 units/month

Would you like me to:
• Create product listings?
• Send offers to buyers?
• Prepare export documentation?`,
      };
    }

    if (intent === 'create_rfq') {
      return {
        steps: [
          { agent: 'RFQ Agent', task: 'Creating RFQ template...' },
          { agent: 'Global Nexha', task: 'Broadcasting to 500+ suppliers...' },
          { agent: 'MemoryOS', task: 'Filtering preferred suppliers...' },
          { agent: 'SUTAR', task: 'Setting up response tracking...' },
        ],
        response: `📋 RFQ Created

Broadcasting to Global Nexha network...

✓ 500+ suppliers notified
✓ 23 preferred suppliers targeted
⏱ Response deadline: 7 days

RFQ Details:
• Product: ${entities.product || 'Cotton Shirts'}
• Quantity: ${entities.quantity || '10,000'} units
• Destination: ${entities.country || 'Germany'}

I'll notify you when quotes arrive.`,
      };
    }

    return {
      steps: [{ agent: 'SUTAR', task: 'Processing request...' }],
      response: 'Processing your request...',
    };
  };

  const getLogisticsWorkflow = (intent: string, entities: Record<string, string>): { steps: { agent: string; task: string }[]; response: string } => {
    if (intent === 'track_shipment') {
      return {
        steps: [
          { agent: 'Logistics Agent', task: 'Connecting to carrier API...' },
          { agent: 'SUTAR', task: 'Fetching location data...' },
          { agent: 'MemoryOS', task: 'Updating timeline...' },
        ],
        response: `🚢 Shipment Tracking

Container: ${entities.shipmentId || 'MSCKU123456'}
Vessel: Maersk Everest

Current Status:
📍 Location: Singapore Port
🚢 Status: On vessel
⏱ ETA: July 18, 2026

Milestones:
✓ Order confirmed
✓ Payment received
✓ Loaded in Ho Chi Minh
→ Currently in transit
○ Customs clearance pending
○ Delivery

All documents verified. On schedule.`,
      };
    }

    if (intent === 'book_freight') {
      return {
        steps: [
          { agent: 'Logistics Agent', task: 'Connecting to carrier network...' },
          { agent: 'Global Nexha', task: 'Comparing 12 carriers...' },
          { agent: 'SUTAR', task: 'Analyzing optimal routes...' },
        ],
        response: `🚢 Freight Options

Best rates for ${entities.country || 'Germany'} route:

1. MSC Ocean
   Price: $4,200
   Transit: 18 days
   ⭐ Recommended

2. Maersk
   Price: $4,600
   Transit: 16 days

3. CMA CGM
   Price: $4,850
   Transit: 15 days

Shall I book MSC Ocean at $4,200?`,
      };
    }

    return {
      steps: [{ agent: 'Logistics Agent', task: 'Processing...' }],
      response: 'Processing logistics request...',
    };
  };

  const getDocumentWorkflow = (intent: string): { steps: { agent: string; task: string }[]; response: string } => {
    const steps: { agent: string; task: string }[] = [
      { agent: 'Documentation Agent', task: 'Loading templates...' },
      { agent: 'MemoryOS', task: 'Fetching order data...' },
      { agent: 'Documentation Agent', task: 'Filling document fields...' },
    ];

    let response = '';
    let doc = '';

    switch (intent) {
      case 'generate_invoice':
        steps.push({ agent: 'Documentation Agent', task: 'Generating Commercial Invoice...' });
        doc = '✓ Commercial Invoice';
        break;
      case 'generate_bl':
        steps.push({ agent: 'Documentation Agent', task: 'Generating Bill of Lading...' });
        doc = '✓ Bill of Lading';
        break;
      case 'generate_coo':
        steps.push({ agent: 'Documentation Agent', task: 'Generating Certificate of Origin...' });
        doc = '✓ Certificate of Origin';
        break;
      case 'generate_all_docs':
        steps.push({ agent: 'Documentation Agent', task: 'Generating all documents...' });
        doc = '✓ Commercial Invoice\n✓ Packing List\n✓ Bill of Lading\n✓ Certificate of Origin';
        break;
      default:
        doc = '✓ Documents';
    }

    steps.push({ agent: 'SUTAR', task: 'Final verification...' });
    steps.push({ agent: 'Merchant', task: 'Awaiting approval...' });

    response = `📄 Document Generation Complete

${doc}

Status: Ready for Download

Documents saved to your Documents section and emailed to buyer.`;

    return { steps, response };
  };

  const getFinanceWorkflow = (intent: string): { steps: { agent: string; task: string }[]; response: string } => {
    const steps: { agent: string; task: string }[] = [
      { agent: 'Finance Agent', task: 'Setting up secure payment...' },
      { agent: 'SUTAR', task: 'Verifying both parties...' },
    ];

    let response = '';

    if (intent === 'create_escrow') {
      steps.push({ agent: 'Finance Agent', task: 'Creating escrow account...' });
      steps.push({ agent: 'SUTAR', task: 'Confirming terms...' });
      response = `🔒 Escrow Created

Amount: $31,500
Buyer: ABC Fashion GmbH
Seller: Vietnam Textiles Ltd

Release Conditions:
• Goods delivered and verified
• Documents submitted
• Buyer confirmation received

Funds secured until delivery complete.

Payment link sent to both parties.`;
    } else if (intent === 'create_lc') {
      steps.push({ agent: 'Finance Agent', task: 'Initiating Letter of Credit...' });
      steps.push({ agent: 'SUTAR', task: 'Coordinating with bank...' });
      response = `📃 Letter of Credit Initiated

LC Amount: $50,000
Issuing Bank: Deutsche Bank
Advising Bank: VietinBank

Documents Required:
• Commercial Invoice
• Bill of Lading
• Certificate of Origin
• Packing List
• Insurance Certificate

LC Number: LC-2026-5432
Valid Until: August 30, 2026`;
    } else {
      response = 'Processing payment request...';
    }

    return { steps, response };
  };

  const getCommunicationWorkflow = (intent: string): { steps: { agent: string; task: string }[]; response: string } => {
    const steps: { agent: string; task: string }[] = [
      { agent: 'Communication Agent', task: 'Activating communication skills...' },
    ];

    let response = '';

    if (intent === 'handle_call') {
      steps.push({ agent: 'Voice Agent', task: 'Answering incoming call...' });
      steps.push({ agent: 'SUTAR', task: 'Transcribing conversation...' });
      steps.push({ agent: 'MemoryOS', task: 'Updating supplier records...' });
      response = `📞 Voice Assistant Active

Incoming call from: Vietnam Textiles Ltd

SUTAR Voice Agent answered:

"Hello, this is ABC Fashion's AI Assistant. How may I help you today?"

Call Summary (saved to MemoryOS):
• Caller: Nguyen Van Minh, Vietnam Textiles
• Request: Delivery confirmation for Order #5432
• Action: Delivery confirmed for July 18
• Follow-up: Invoice copy sent via email

Task created for your review.`;
    } else if (intent === 'handle_whatsapp') {
      steps.push({ agent: 'WhatsApp Agent', task: 'Monitoring messages...' });
      steps.push({ agent: 'MemoryOS', task: 'Retrieving conversation history...' });
      response = `💬 WhatsApp Integration Active

Latest Message from Vietnam Textiles:

"Can we confirm delivery for July 18?"

Auto-Response Sent (based on your preferences):
"July 18 delivery confirmed. Thank you!"

✓ Message logged to MemoryOS
✓ Supplier relationship updated
✓ Delivery status synced`;
    } else if (intent === 'handle_email') {
      steps.push({ agent: 'Email Agent', task: 'Scanning inbox...' });
      steps.push({ agent: 'SUTAR', task: 'Categorizing emails...' });
      steps.push({ agent: 'MemoryOS', task: 'Linking to orders...' });
      response = `📧 Email Processing Complete

Processed: 7 emails

• 3 RFQ requests → Forwarded to RFQ Agent
• 2 delivery confirmations → Logged to orders
• 1 payment receipt → Updated in Finance
• 1 query → Responded automatically

Summary saved to your inbox.`;
    }

    return { steps, response };
  };

  const getMemoryResponse = (intent: string): { steps: { agent: string; task: string }[]; response: string } => {
    const steps: { agent: string; task: string }[] = [
      { agent: 'MemoryOS', task: 'Searching trade memory...' },
    ];

    let response = '';

    if (intent === 'repeat_order') {
      steps.push({ agent: 'MemoryOS', task: 'Found Order #2341...' });
      steps.push({ agent: 'SUTAR', task: 'Duplicating order details...' });
      response = `📋 Last Order Found

Order #2341 (March 2026)
Supplier: Vietnam Textiles Ltd
Product: Cotton Shirts 8,000 units
Price: $26,400
Delivery: 17 days
Status: Completed ✓
Satisfaction: 95%

Would you like me to create a new order with these details?`;
    } else if (intent === 'preferred_provider') {
      steps.push({ agent: 'MemoryOS', task: 'Loading provider history...' });
      response = `🚢 Preferred Provider

Based on your order history:

MSC Logistics
• Shipments: 12
• Success Rate: 97%
• Avg Cost: $4,200
• Avg Transit: 17 days

I'll use MSC for all future shipments unless you specify otherwise.`;
    }

    return { steps, response };
  };

  // ============================================================================
  // MAIN PROCESSOR
  // ============================================================================

  const processCommand = async (command: string) => {
    setIsProcessing(true);
    setWorkflowSteps([]);
    setCurrentStep(-1);

    // Add user message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: command }]);
    setInput('');

    await delay(500);

    // Identify intent
    const { intent, category, entities } = identifyIntent(command);

    // Start typing indicator
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `🎯 Intent: ${category}\nAnalyzing and coordinating...`,
    }]);

    await delay(800);

    // Determine which workflow to run
    let steps: { agent: string; task: string }[] = [];
    let response = '';

    if (category === 'Analytics') {
      response = getAnalyticsResponse(intent);
    } else if (category === 'Commerce') {
      const commerce = getCommerceWorkflow(intent, entities);
      steps = commerce.steps;
      response = commerce.response;
    } else if (category === 'Logistics') {
      const logistics = getLogisticsWorkflow(intent, entities);
      steps = logistics.steps;
      response = logistics.response;
    } else if (category === 'Documents') {
      const docs = getDocumentWorkflow(intent);
      steps = docs.steps;
      response = docs.response;
    } else if (category === 'Finance') {
      const finance = getFinanceWorkflow(intent);
      steps = finance.steps;
      response = finance.response;
    } else if (category === 'Communication') {
      const comms = getCommunicationWorkflow(intent);
      steps = comms.steps;
      response = comms.response;
    } else if (category === 'Memory') {
      const memory = getMemoryResponse(intent);
      steps = memory.steps;
      response = memory.response;
    } else {
      response = `I can help with:

📊 Analytics: Sales, products, suppliers
🛒 Commerce: Buy, sell, RFQs
🚢 Logistics: Track, book freight
📄 Documents: Invoice, BL, COO
💰 Finance: Escrow, LC, invoices
📞 Comms: Calls, WhatsApp, email
💾 Memory: Repeat orders, preferred providers

What would you like to do?`;
    }

    // Execute workflow steps if any
    if (steps.length > 0) {
      setWorkflowSteps(steps.map(s => ({ ...s, status: 'pending' })));

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        await delay(1000);
      }
      setCurrentStep(-1);
      setWorkflowSteps([]);
    }

    // Send response
    await delay(300);
    setMessages(prev => [...prev, {
      id: (Date.now() + 2).toString(),
      role: 'assistant',
      content: response,
      type: category === 'Analytics' ? 'analytics' : 'commerce',
    }]);

    setIsProcessing(false);
  };

  // ============================================================================
  // QUICK ACTIONS
  // ============================================================================

  const quickActions: QuickAction[] = [
    { label: 'Sales', command: 'What are my sales this month?', icon: 'BarChart3' },
    { label: 'Buy', command: 'I want to buy cotton shirts from Vietnam', icon: 'ShoppingCart' },
    { label: 'Sell', command: 'I want to sell tea to UAE', icon: 'TrendingUp' },
    { label: 'Track', command: 'Track shipment MSCKU123456', icon: 'Truck' },
    { label: 'Invoice', command: 'Generate invoice for order #5432', icon: 'FileText' },
    { label: 'Suppliers', command: 'Which supplier generated the most revenue?', icon: 'Users' },
  ];

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Sidebar */}
      <aside className="w-72 p-6 border-r overflow-y-auto" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="mb-6">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#154230' }}>
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold brand-font" style={{ color: '#A6824A' }}>LEVERGE</div>
              <div className="text-xs" style={{ color: '#666' }}>AI Copilot</div>
            </div>
          </Link>
        </div>

        {/* Organization Stack */}
        <div className="mb-6">
          <div className="text-xs uppercase mb-2" style={{ color: '#666' }}>Organization</div>
          {[
            { icon: Brain, name: 'TwinOS', color: '#0891B2' },
            { icon: Database, name: 'MemoryOS', color: '#7C3AED' },
            { icon: Zap, name: 'SkillOS', color: '#A6824A' },
            { icon: Bot, name: 'SUTAR', color: '#0891B2' },
            { icon: Globe, name: 'Nexha', color: '#7C3AED' },
          ].map(org => (
            <div key={org.name} className="flex items-center gap-3 p-3 rounded-xl mb-2" style={{ backgroundColor: '#111' }}>
              <org.icon className="w-5 h-5" style={{ color: org.color }} />
              <span className="text-sm" style={{ color: 'white' }}>{org.name}</span>
            </div>
          ))}
        </div>

        {/* Intent Categories */}
        <div className="mb-6">
          <div className="text-xs uppercase mb-2" style={{ color: '#666' }}>Capabilities</div>
          {[
            { icon: BarChart3, name: 'Analytics', color: '#16A34A' },
            { icon: ShoppingCart, name: 'Commerce', color: '#0891B2' },
            { icon: Truck, name: 'Logistics', color: '#7C3AED' },
            { icon: FileText, name: 'Documents', color: '#A6824A' },
            { icon: CreditCard, name: 'Finance', color: '#CA8A04' },
            { icon: MessageCircle, name: 'Comms', color: '#25D366' },
          ].map(cap => (
            <div key={cap.name} className="flex items-center gap-3 p-2 rounded-lg" style={{ backgroundColor: '#0A0A0A' }}>
              <cap.icon className="w-4 h-4" style={{ color: cap.color }} />
              <span className="text-sm" style={{ color: '#888' }}>{cap.name}</span>
            </div>
          ))}
        </div>

        {/* Global Nexha Stats */}
        <div className="p-4 rounded-xl" style={{ backgroundColor: '#7C3AED15' }}>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4" style={{ color: '#7C3AED' }} />
            <span className="text-sm font-medium" style={{ color: '#7C3AED' }}>Global Nexha</span>
          </div>
          <div className="text-xs space-y-1" style={{ color: '#666' }}>
            <div>50,000+ suppliers</div>
            <div>1,200+ carriers</div>
            <div>200+ banks</div>
          </div>
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" style={{ color: '#0891B2' }} />
              <h1 className="font-bold">LEVERGE Copilot</h1>
            </div>
            <p className="text-sm" style={{ color: '#666' }}>Universal Trade Assistant</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#16A34A20', color: '#16A34A' }}>● Online</span>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-xl px-6 py-4 rounded-2xl"
                style={{
                  backgroundColor: msg.role === 'user' ? '#154230' : '#111',
                  borderRadius: msg.role === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                }}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4" style={{ color: '#0891B2' }} />
                    <span className="text-xs" style={{ color: '#0891B2' }}>Copilot</span>
                  </div>
                )}
                <div className="whitespace-pre-line" style={{ color: 'white' }}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Workflow */}
          {workflowSteps.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl"
              style={{ backgroundColor: '#0891B215' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5" style={{ color: '#0891B2' }} />
                <span className="font-medium" style={{ color: '#0891B2' }}>Coordinating Organization</span>
                {isProcessing && (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="ml-auto">
                    <Sparkles className="w-4 h-4" style={{ color: '#0891B2' }} />
                  </motion.div>
                )}
              </div>
              <div className="space-y-2">
                {workflowSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{
                      backgroundColor: i < currentStep || currentStep === -1 ? '#16A34A15' : i === currentStep ? '#0891B220' : '#0A0A0A',
                    }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: i < currentStep || currentStep === -1 ? '#16A34A' : '#0891B2' }}>
                      {i < currentStep || currentStep === -1 ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : i === currentStep ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                          <Bot className="w-4 h-4 text-white" />
                        </motion.div>
                      ) : (
                        <span className="text-white text-xs">{i + 1}</span>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm" style={{ color: 'white' }}>{step.agent}</div>
                      <div className="text-xs" style={{ color: '#888' }}>{step.task}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActions.map(action => (
              <button
                key={action.label}
                onClick={() => processCommand(action.command)}
                className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all hover:scale-105"
                style={{ backgroundColor: '#222', color: '#888' }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && input.trim() && processCommand(input)}
              placeholder="Ask me anything or give me a command..."
              className="flex-1 px-4 py-3 rounded-xl"
              style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
            />
            <button
              onClick={() => input.trim() && processCommand(input)}
              disabled={!input.trim() || isProcessing}
              className="px-6 py-3 rounded-xl font-medium disabled:opacity-50"
              style={{ backgroundColor: '#154230', color: 'white' }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
