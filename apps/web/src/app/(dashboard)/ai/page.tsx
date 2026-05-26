'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Mock AI responses for demo
const mockResponses = [
  "Based on the HS code classification, your product falls under Chapter 84 of the Harmonized System. The applicable HS code is 8471.30.00 for portable digital automatic data processing machines.",
  "For importing goods from China to the USA, you'll need to comply with Section 301 tariffs. Additional documentation including COO, Commercial Invoice, and Bill of Lading are required.",
  "The estimated import duty for your product (HS Code 8471.30.00) is approximately 0% under the Most Favored Nation (MFN) tariff rate. However, additional fees may apply including Customs Processing Fees.",
  "I recommend using Incoterms 2020 CIF for your shipment to include insurance coverage. This protects both buyer and seller during transit.",
  "For sea freight from Shanghai to Los Angeles, transit time is typically 14-21 days. Air freight takes 3-5 days but is approximately 3-4x more expensive.",
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI Trade Assistant on Leverage by Lerar. I can help you with:\n\n• HS code classification\n• Compliance requirements\n• Document analysis\n• Trade regulations\n• Duty calculations\n• Freight optimization\n\nHow can I assist you today?',
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

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'Classify HS code', prompt: 'Help me classify a product with HS code. Product description: ' },
    { label: 'Check compliance', prompt: 'What compliance requirements apply for importing goods from ' },
    { label: 'Calculate duty', prompt: 'Calculate import duty for product with HS code ' },
    { label: 'Freight estimate', prompt: 'What is the estimated freight cost from Shanghai to Los Angeles for ' },
  ];

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#F4F1EA] mb-2">AI Trade Assistant</h1>
          <p className="text-[#D8CCBC]/60">Get instant help with compliance, documentation, and trade questions</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-emerald-400 text-sm font-medium">AI Online</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => setInput(action.prompt)}
            className="px-4 py-2 bg-[#0E3B36] hover:bg-[#0E3B36]/80 text-[#D8CCBC] text-sm rounded-xl transition-colors flex items-center gap-2"
          >
            <span>💡</span>
            {action.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 space-y-4 mb-6">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                message.role === 'user'
                  ? 'bg-[#C49A6C] text-[#081512]'
                  : 'bg-[#0E3B36] text-[#F4F1EA]'
              }`}
            >
              <div className="whitespace-pre-wrap text-[15px] leading-relaxed">{message.content}</div>
              <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-[#081512]/60' : 'text-[#D8CCBC]/50'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#0E3B36] text-[#F4F1EA] rounded-2xl px-5 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#C49A6C] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#C49A6C] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#C49A6C] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about compliance, HS codes, documents, freight..."
          className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] resize-none"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="px-8 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold hover:bg-[#D4AA82] transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <span>Send</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
}
