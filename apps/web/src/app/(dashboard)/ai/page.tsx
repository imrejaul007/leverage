'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, Sparkles, MessageSquare, Shield, FileText, Truck, Package, Globe, CreditCard, AlertTriangle, Scale, Plane, Ship, MapPin, Calculator, BookOpen, Building2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';
import {
  AI_DATA,
  HS_CODES,
  COUNTRIES,
  PORTS_CODES,
  INCOTERMS,
  DOCUMENTS,
  PAYMENT_TERMS,
  FREIGHT_ROUTES,
  CONTAINERS,
  CURRENCIES,
  TRADE_AGREEMENTS,
  ABBREVIATIONS,
  AIRPORTS,
  HAZMAT_CLASSES,
} from '@/lib/ai-data';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickPrompt {
  icon: React.ReactNode;
  text: string;
  query: string;
}

// Helper functions for AI responses
const findHSCode = (query: string) => {
  const lowerQuery = query.toLowerCase();
  const keywords = lowerQuery.split(/\s+/);

  // Search by description, category, or code
  const matches = HS_CODES.filter(hs => {
    const descLower = hs.description.toLowerCase();
    const catLower = hs.category.toLowerCase();
    const codeMatch = hs.code.includes(lowerQuery.replace(/[^0-9]/g, ''));
    return keywords.some(kw => descLower.includes(kw) || catLower.includes(kw) || codeMatch);
  }).slice(0, 5);

  return matches;
};

const findCountry = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(lowerQuery) ||
    c.code.toLowerCase() === lowerQuery ||
    c.region.toLowerCase().includes(lowerQuery)
  ).slice(0, 3);
};

const findPort = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return PORTS_CODES.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.code.toLowerCase().includes(lowerQuery) ||
    p.country.toLowerCase() === lowerQuery
  ).slice(0, 5);
};

const findIncoterm = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return INCOTERMS.filter(i =>
    i.code.toLowerCase().includes(lowerQuery.replace('incoterm', '').trim()) ||
    i.name.toLowerCase().includes(lowerQuery)
  ).slice(0, 3);
};

const findDocument = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return DOCUMENTS.filter(d =>
    d.name.toLowerCase().includes(lowerQuery) ||
    d.code.toLowerCase().includes(lowerQuery)
  ).slice(0, 3);
};

const findPaymentTerm = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return PAYMENT_TERMS.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.code.toLowerCase().includes(lowerQuery)
  ).slice(0, 3);
};

const findFreightRoute = (query: string) => {
  const lowerQuery = query.toLowerCase();
  const parts = lowerQuery.split(/\s+to\s+|\s+from\s+|\s+->\s+/);

  if (parts.length >= 2) {
    return FREIGHT_ROUTES.filter(r => {
      const origin = (r.origin + ' ' + (r.originCountry || '')).toLowerCase();
      const dest = (r.dest + ' ' + (r.destCountry || '')).toLowerCase();
      return parts.some(p => origin.includes(p) || dest.includes(p));
    }).slice(0, 5);
  }

  return FREIGHT_ROUTES.filter(r =>
    r.origin.toLowerCase().includes(lowerQuery) ||
    r.dest.toLowerCase().includes(lowerQuery)
  ).slice(0, 5);
};

const findContainer = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return CONTAINERS.filter(c =>
    c.type.toLowerCase().includes(lowerQuery) ||
    c.name.toLowerCase().includes(lowerQuery)
  ).slice(0, 3);
};

const findAirport = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return AIRPORTS.filter(a =>
    a.code.toLowerCase().includes(lowerQuery) ||
    a.name.toLowerCase().includes(lowerQuery) ||
    a.city.toLowerCase().includes(lowerQuery)
  ).slice(0, 3);
};

const findTradeAgreement = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return TRADE_AGREEMENTS.filter(t =>
    t.name.toLowerCase().includes(lowerQuery) ||
    t.countries.some(c => c.toLowerCase().includes(lowerQuery))
  ).slice(0, 3);
};

// Main AI response generator
const generateAIResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();

  // HS Code lookup
  if (lowerQuery.includes('hs code') || lowerQuery.includes('classif') || lowerQuery.includes('tariff code') || lowerQuery.includes('classify')) {
    const matches = findHSCode(query);
    if (matches.length > 0) {
      const countryMatch = lowerQuery.match(/(?:to|for|in)\s+(\w+)/);
      const country = countryMatch ? findCountry(countryMatch[1])[0] : null;

      let response = `**HS Code Classification Results**\n\nFound ${matches.length} relevant codes:\n\n`;
      matches.forEach((hs, i) => {
        response += `**${i + 1}. ${hs.code}** - ${hs.description}\n`;
        response += `   Category: ${hs.category}\n`;
        if (country) {
          response += `   Duty to ${country.name}: ${hs[`duty_${country.code.toLowerCase()}` as keyof typeof hs] || hs.duty_us}%\n`;
        } else {
          response += `   Duty: US ${hs.duty_us}%, EU ${hs.duty_eu}%, UK ${hs.duty_uk}%\n`;
        }
        response += '\n';
      });

      response += `**Tip:** The first 6 digits of HS codes are internationally standardized. Digits 7-10 vary by country.\n\n`;
      response += `Would you like more details on any specific code, or shall I calculate duties for a specific destination?`;
      return response;
    }
    return `I can help you find HS codes for your products. Please describe your product in more detail (e.g., "laptop computer", "cotton t-shirt", "industrial motor").\n\nI have a database of 200+ common HS codes including electronics, textiles, machinery, chemicals, food products, and more.`;
  }

  // Country duty lookup
  if (lowerQuery.includes('duty') || lowerQuery.includes('tariff') || lowerQuery.includes('import tax') || lowerQuery.includes('vat')) {
    const countries = findCountry(query.replace(/duty|tariff|import tax|vat/g, '').trim());
    if (countries.length > 0) {
      const country = countries[0];
      let response = `**Import Duties to ${country.name}**\n\n`;
      response += `| Metric | Rate |\n|--------|------|\n`;
      response += `| Average Duty | ${country.avgDuty}% |\n`;
      response += `| VAT/GST | ${country.vat}% |\n`;
      response += `| Region | ${country.region} |\n`;
      response += `| Major Ports | ${country.majorPorts.slice(0, 3).join(', ')} |\n\n`;

      response += `**Key Restrictions:**\n`;
      country.restrictions.forEach(r => {
        response += `- ${r}\n`;
      });

      response += `\n**Pro Tip:** The actual duty rate depends on the specific HS code of your product. Would you like me to calculate for a specific product?`;
      return response;
    }
    return `I can help you find import duty rates. Please specify a destination country (e.g., "import duties to Germany" or "tariffs for Japan").`;
  }

  // Port lookup
  if (lowerQuery.includes('port') || lowerQuery.includes('airport') || lowerQuery.includes('hub')) {
    const ports = findPort(query);
    const airports = findAirport(query);

    if (ports.length > 0 || airports.length > 0) {
      let response = `**Port Information**\n\n`;

      ports.forEach(p => {
        response += `**${p.name}** (${p.code})\n`;
        response += `   Country: ${p.country}\n`;
        response += `   Type: ${p.type}\n`;
        response += `   Volume: ${p.volume}\n\n`;
      });

      airports.forEach(a => {
        response += `**${a.city} - ${a.name}** (${a.code})\n`;
        response += `   Country: ${a.country}\n`;
        response += `   Cargo Volume: ${a.cargoVolume}\n\n`;
      });

      return response;
    }
  }

  // Incoterms
  if (lowerQuery.includes('incoterm') || lowerQuery.includes('fob') || lowerQuery.includes('cif') || lowerQuery.includes('ddp') || lowerQuery.includes('exw') || lowerQuery.includes('shipping terms') || lowerQuery.includes('delivery terms')) {
    const incoterms = findIncoterm(query);
    if (incoterms.length > 0) {
      let response = `**Incoterms 2020 Reference**\n\n`;
      incoterms.forEach(i => {
        response += `**${i.code} - ${i.name}**\n`;
        response += `${i.description}\n\n`;
        response += `| Aspect | Details |\n|--------|---------|\n`;
        response += `| Risk transfers | ${i.risk} |\n`;
        response += `| Seller covers | ${i.sellerCosts.slice(0, 3).join(', ')} |\n`;
        response += `| Buyer covers | ${i.buyerCosts.slice(0, 3).join(', ')} |\n\n`;
      });
      response += `Would you like a detailed comparison between specific incoterms?`;
      return response;
    }
  }

  // Documents
  if (lowerQuery.includes('document') || lowerQuery.includes('invoice') || lowerQuery.includes('b/l') || lowerQuery.includes('bill of lading') || lowerQuery.includes('certificate') || lowerQuery.includes('packing list') || lowerQuery.includes('coo') || lowerQuery.includes('certificate of origin')) {
    const docs = findDocument(query);
    if (docs.length > 0) {
      let response = `**Trade Documents**\n\n`;
      docs.forEach(d => {
        response += `**${d.code} - ${d.name}**\n`;
        response += `${d.description}\n`;
        response += `Required: ${d.required ? '✅ Yes' : '⚠️ Conditional'}\n`;
        response += `Timing: ${d.timing}\n`;
        response += `Key fields: ${(d.keyFields || []).slice(0, 4).join(', ')}\n\n`;
      });
      response += `Need help generating any of these documents through our Documents section?`;
      return response;
    }
  }

  // Payment terms
  if (lowerQuery.includes('payment') || lowerQuery.includes('letter of credit') || lowerQuery.includes('lc') || lowerQuery.includes('t/t') || lowerQuery.includes('wire transfer') || lowerQuery.includes('open account') || lowerQuery.includes('d/p') || lowerQuery.includes('d/a')) {
    const payments = findPaymentTerm(query);
    if (payments.length > 0) {
      let response = `**Payment Methods in International Trade**\n\n`;
      payments.forEach(p => {
        response += `**${p.code} - ${p.name}**\n`;
        response += `${p.description}\n\n`;
        response += `| Aspect | Details |\n|--------|---------|\n`;
        response += `| Risk Level | ${p.risk} |\n`;
        response += `| Popularity | ${p.popularity}% |\n`;
        response += `| Best For | ${p.suitable.slice(0, 2).join(', ')} |\n`;
        response += `| Pros | ${p.pros[0]} |\n`;
        response += `| Cons | ${p.cons[0]} |\n\n`;
      });
      response += `**Recommendation:** For new buyers, I recommend Letter of Credit (L/C) for security. For trusted partners, T/T or Open Account can reduce costs.`;
      return response;
    }
  }

  // Shipping/Freight
  if (lowerQuery.includes('ship') || lowerQuery.includes('freight') || lowerQuery.includes('shipping') || lowerQuery.includes('logistic') || lowerQuery.includes('container')) {
    if (lowerQuery.includes('container')) {
      const containers = findContainer(query);
      if (containers.length > 0) {
        let response = `**Container Specifications**\n\n`;
        containers.forEach(c => {
          response += `**${c.type} - ${c.name}**\n`;
          response += `Length: ${c.length} | Max Volume: ${c.maxCBM} CBM | Max Weight: ${c.maxWeight} kg\n`;
          response += `Best for: ${c.bestFor.slice(0, 2).join(', ')}\n\n`;
        });
        return response;
      }
    }

    const routes = findFreightRoute(query);
    if (routes.length > 0) {
      let response = `**Freight Routes**\n\n`;
      routes.forEach(r => {
        response += `**${r.origin} → ${r.dest}** (${r.mode})\n`;
        response += `   Transit: ${r.transitDays} days\n`;
        response += `   Rate: $${r.ratePerCBM}/CBM or $${r.ratePerKg}/kg\n\n`;
      });
      response += `Want a more detailed quote? Use our Freight Explorer to compare carriers.`;
      return response;
    }

    return `I can help with shipping options. For specific routes, try "shipping from Shanghai to Los Angeles".\n\n**Common Shipping Modes:**\n- **Sea Freight**: 14-35 days, best for large volumes\n- **Air Freight**: 3-7 days, best for urgent/valuable cargo\n- **Truck/Rail**: 5-21 days, for regional shipping\n\nUse our Freight Explorer for live quotes!`;
  }

  // Air freight
  if (lowerQuery.includes('air freight') || lowerQuery.includes('air cargo') || lowerQuery.includes('airport')) {
    const airports = findAirport(query);
    let response = `**Air Cargo Information**\n\n`;

    if (airports.length > 0) {
      airports.forEach(a => {
        response += `**${a.name}** (${a.code})\n`;
        response += `City: ${a.city}, ${a.country}\n`;
        response += `Cargo Volume: ${a.cargoVolume}\n\n`;
      });
    } else {
      response += `**Major Air Cargo Hubs:**\n`;
      AIRPORTS.slice(0, 5).forEach(a => {
        response += `- ${a.name}: ${a.cargoVolume}\n`;
      });
    }

    response += `\n**Air Freight Tips:**\n`;
    response += `- Air freight is 5-10x more expensive than sea\n`;
    response += `- Best for high-value, time-sensitive goods\n`;
    response += `- Typical transit: 3-7 days door-to-door`;
    return response;
  }

  // Trade agreements
  if (lowerQuery.includes('trade agreement') || lowerQuery.includes('fta') || lowerQuery.includes('free trade') || lowerQuery.includes('usmca') || lowerQuery.includes('rcep') || lowerQuery.includes('cptpp')) {
    const agreements = findTradeAgreement(query);
    if (agreements.length > 0) {
      let response = `**Trade Agreements**\n\n`;
      agreements.forEach(t => {
        response += `**${t.name}** - ${t.fullName}\n`;
        response += `Countries: ${t.countries.join(', ')}\n`;
        response += `Duty Reduction: ${t.dutyReduction}\n`;
        response += `Key Products: ${t.products.slice(0, 3).join(', ')}\n`;
        response += `Signed: ${t.yearSigned}\n\n`;
      });
      response += `Trade agreements can significantly reduce import duties if your goods qualify!`;
      return response;
    }
  }

  // Compliance
  if (lowerQuery.includes('compliance') || lowerQuery.includes('regulation') || lowerQuery.includes('restrict') || lowerQuery.includes('ce marking') || lowerQuery.includes('fcc') || lowerQuery.includes('certification')) {
    let response = `**Trade Compliance Checklist**\n\n`;

    response += `**Pre-Shipment:**\n`;
    response += `- Verify buyer not on sanctions/DPL lists\n`;
    response += `- Confirm product compliance with destination\n`;
    response += `- Obtain required export licenses\n`;
    response += `- Ensure accurate HS code classification\n\n`;

    response += `**Product Certifications:**\n`;
    response += `- **CE**: European Union (electronics, toys, machinery)\n`;
    response += `- **FCC**: USA (electronics, wireless devices)\n`;
    response += `- **CCC**: China (mandatory products)\n`;
    response += `- **BIS**: India (electronics, chemicals)\n`;
    response += `- **KC**: South Korea (electronics)\n`;
    response += `- **PSE**: Japan (electronics)\n\n`;

    response += `Need help checking specific compliance requirements?`;
    return response;
  }

  // Calculator
  if (lowerQuery.includes('calculate') || lowerQuery.includes('cost') || lowerQuery.includes('estimate')) {
    return `**Cost Estimation**\n\nTo calculate your total landed cost, I need:\n\n1. **Product Details**\n   - HS Code\n   - Value (FOB)\n   - Weight/Volume\n\n2. **Shipping**\n   - Origin & Destination\n   - Transport mode (sea/air/truck)\n\n3. **Additional Costs**\n   - Import duties (based on HS code + destination)\n   - VAT/GST at destination\n   - Customs broker fees\n   - Insurance\n\n**Example Formula:**\n\`\`\`\nTotal = FOB + Freight + Insurance + Duties + VAT + Fees\n\`\`\`\n\nTry our Freight Calculator for instant estimates!`;
  }

  // Abbreviations
  if (lowerQuery.includes('what is') && (
    lowerQuery.includes('bl') || lowerQuery.includes('cbm') || lowerQuery.includes('teu') ||
    lowerQuery.includes('hs') || lowerQuery.includes('fob') || lowerQuery.includes('cif')
  )) {
    const term = ABBREVIATIONS.find(a => lowerQuery.includes(a.term.toLowerCase()));
    if (term) {
      return `**${term.term}**\n\n${term.definition}`;
    }
  }

  // Default response with suggestions
  return `I can help with:\n\n📦 HS codes & classification\n💰 Import duties & tariffs\n📄 Trade documents\n💳 Payment methods\n🚢 Shipping & freight\n📋 Incoterms\n\nAsk me anything about global trade!`;
};

const quickPrompts: QuickPrompt[] = [
  { icon: <FileText className="w-4 h-4" />, text: 'HS Code', query: 'HS code for laptop computer' },
  { icon: <Calculator className="w-4 h-4" />, text: 'Duties', query: 'Import duties to Germany' },
  { icon: <Truck className="w-4 h-4" />, text: 'Freight', query: 'Freight from Shanghai to Los Angeles' },
  { icon: <BookOpen className="w-4 h-4" />, text: 'Incoterms', query: 'Explain FOB vs CIF vs DDP' },
  { icon: <CreditCard className="w-4 h-4" />, text: 'Payments', query: 'Letter of credit vs T/T wire transfer' },
  { icon: <Shield className="w-4 h-4" />, text: 'Compliance', query: 'CE marking requirements for electronics' },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 **LEVERAGE AI Trade Assistant**

I'm here to help with HS codes, duties, shipping, documents & more.

Try asking:
• "HS code for laptop"
• "Import duties to Germany"
• "Freight from Shanghai to LA"
• "FOB vs CIF vs DDP"`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = generateAIResponse(input);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleQuickPrompt = (prompt: QuickPrompt) => {
    setInput(prompt.query);
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] pb-24 flex flex-col">
      <PageHeader
        title="AI Trade Assistant"
        subtitle="Get expert help with your trade questions"
        backHref="/dashboard"
      />

      {/* Quick Prompts */}
      <div className="px-4 -mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleQuickPrompt(prompt)}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-full text-xs font-medium text-[#4A4A4A] whitespace-nowrap hover:bg-[#154230]/10 transition-colors"
            >
              {prompt.icon}
              {prompt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' ? 'bg-[#154230]' : 'bg-[#A6824A]'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              message.role === 'user'
                ? 'bg-[#154230] text-white rounded-tr-sm'
                : 'bg-white text-[#101111] rounded-tl-sm shadow-sm'
            }`}>
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#A6824A] flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm shadow-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#4A4A4A]/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-[#4A4A4A]/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-[#4A4A4A]/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 bg-white border-t border-black/5">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about HS codes, duties, compliance..."
              rows={1}
              className="w-full px-4 py-3 bg-[#E6E2DA] rounded-xl border border-black/5 focus:border-[#154230] focus:outline-none text-[#101111] placeholder:text-[#4A4A4A]/50 resize-none text-sm"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              input.trim()
                ? 'bg-[#154230] text-white hover:bg-[#1a5a3a]'
                : 'bg-[#E6E2DA] text-[#4A4A4A] cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[#4A4A4A] text-xs text-center mt-2">
          <Sparkles className="w-3 h-3 inline mr-1" />
          AI may produce inaccurate information. Always verify critical data.
        </p>
      </div>

      <BottomNav activeItem="ai" />
    </div>
  );
}
