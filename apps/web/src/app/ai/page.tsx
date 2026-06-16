'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, Sparkles, MessageSquare, Shield, FileText, Truck } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import BottomNav from '@/components/BottomNav';

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

// AI response templates based on keywords
const generateAIResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('hs code') || lowerQuery.includes('classif')) {
    return `Based on your query, here are some insights on HS code classification:

**Understanding HS Codes:**
HS (Harmonized System) codes are 6-10 digit numbers used to classify products for international trade.

**Tips for Classification:**
1. Start with the broad category (chapter)
2. Narrow down using the heading and subheading
3. The first 6 digits are internationally standardized
4. Additional digits (7-10) vary by country

**Need Help?**
I can help classify specific products. Just describe your product in detail and I'll provide HS code suggestions with confidence levels.

Would you like me to look up a specific product?`;
  }

  if (lowerQuery.includes('duty') || lowerQuery.includes('tariff') || lowerQuery.includes('tax')) {
    return `Great question about import duties! Here's what you need to know:

**Duty Calculation Factors:**
- **MFN Rate**: Standard rate for most countries
- **FTA Benefits**: Reduced rates under free trade agreements
- **Product Value**: Declared value of your shipment
- **HS Code**: Determines the specific tariff rate

**Common Destinations:**
| Country | Average Duty | VAT/GST |
|---------|--------------|---------|
| USA | 2-5% | 8.25% |
| EU | 4-7% | 19-27% |
| UK | 4-7% | 20% |

**Pro Tip:** Use our Duty Calculator tool to get accurate estimates for your specific product and route.`;
  }

  if (lowerQuery.includes('document') || lowerQuery.includes('invoice') || lowerQuery.includes('b/l') || lowerQuery.includes('bill of lading')) {
    return `Here are the key documents you'll need for international trade:

**Essential Documents:**
1. **Commercial Invoice** - Details the transaction
2. **Bill of Lading (B/L)** - Proof of shipment
3. **Packing List** - Contents breakdown
4. **Certificate of Origin** - Proves product origin
5. **Letter of Credit (L/C)** - Payment guarantee

**For Specific Industries:**
- **Food**: Health certificates, phytosanitary certificates
- **Electronics**: CE/FCC certifications
- **Textiles**: Cotton content certificates

Need help generating any of these documents? I can guide you through the process!`;
  }

  if (lowerQuery.includes('ship') || lowerQuery.includes('freight') || lowerQuery.includes('shipping') || lowerQuery.includes('logistic')) {
    return `Let me help you understand your shipping options:

**Shipping Methods:**
1. **Sea Freight** - Best for large volumes, 2-6 weeks
2. **Air Freight** - Fast but expensive, 3-7 days
3. **Express** - Door-to-door in 1-5 days

**Incoterms to Know:**
- **FOB** (Free On Board) - Seller handles delivery to port
- **CIF** (Cost, Insurance, Freight) - Seller covers shipping & insurance
- **DDP** (Delivered Duty Paid) - All inclusive, buyer pays at destination

**Tip:** Compare freight quotes using our Freight section to find the best rates!`;
  }

  if (lowerQuery.includes('compliance') || lowerQuery.includes('regulation') || lowerQuery.includes('restrict')) {
    return `Trade compliance is crucial. Here's what you need to know:

**Key Compliance Areas:**
- **Product Restrictions**: Some items require special permits
- **Sanctions Lists**: Check denied parties before trading
- **Labeling Requirements**: Country-specific regulations
- **Safety Certifications**: CE, FCC, UL, etc.

**Common Restricted Categories:**
- Dual-use goods (can have military applications)
- Food products (FDA/EU regulations)
- Electronics (EMC, safety standards)
- Chemicals (REACH compliance)

**Recommended Actions:**
1. Verify your buyer isn't on sanctions lists
2. Check product-specific regulations
3. Obtain necessary certifications before shipping

Need help with a specific compliance question?`;
  }

  if (lowerQuery.includes('payment') || lowerQuery.includes('lc') || lowerQuery.includes('letter of credit') || lowerQuery.includes('transfer')) {
    return `Understanding payment methods in international trade:

**Common Payment Terms:**

| Method | Risk Level | Best For |
|--------|------------|----------|
| T/T (Wire) | Medium | Established relationships |
| L/C (Letter of Credit) | Low | New buyers/sellers |
| D/P | Medium | Good relationships |
| OA (Open Account) | High | Trusted partners |

**Letter of Credit (L/C) Tips:**
- Always verify through the issuing bank
- Ensure terms match your contract exactly
- Work with experienced freight forwarders
- Consider usance L/C for better cash flow

**My Recommendation:** Start with L/C for new relationships, then move to T/T as trust builds.`;
  }

  // Default response
  return `Thank you for your question! I'm here to help with all your global trade needs.

**I can assist with:**
- HS Code classification & product categorization
- Duty and tariff calculations
- Trade compliance and regulations
- Document preparation and requirements
- Freight and shipping options
- Payment methods and Letter of Credit guidance

**Popular Topics:**
- "What HS code should I use for [product]?"
- "What are the import duties to [country]?"
- "What documents do I need for [product type]?"
- "How do I handle payment for international orders?"

Feel free to ask any specific question!`;
};

const quickPrompts: QuickPrompt[] = [
  { icon: <FileText className="w-4 h-4" />, text: 'HS Code Help', query: 'Help me find the HS code for my product' },
  { icon: <Shield className="w-4 h-4" />, text: 'Compliance', query: 'What are the compliance requirements?' },
  { icon: <Truck className="w-4 h-4" />, text: 'Shipping', query: 'What are my shipping options?' },
  { icon: <MessageSquare className="w-4 h-4" />, text: 'Documents', query: 'What documents do I need?' },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 Welcome to the LEVERAGE AI Trade Assistant!

I'm here to help you with:
• **HS Code Classification** - Find the right codes for your products
• **Duty Calculations** - Estimate import/export costs
• **Compliance Guidance** - Navigate regulations
• **Document Requirements** - Know what you need
• **Trade Best Practices** - Expert advice for global trade

**Try these prompts:**
• "What HS code for electronics?"
• "Import duties from San Francisco to USA?"
• "Documents needed for textile exports?"

What can I help you with today?`,
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
