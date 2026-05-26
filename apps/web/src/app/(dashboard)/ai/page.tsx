'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockResponses = [
  "Based on the HS code classification, your product falls under Chapter 84. The applicable HS code is 8471.30.00 for portable digital automatic data processing machines.",
  "For importing goods from China to the USA, you'll need to comply with Section 301 tariffs. Additional documentation including COO, Commercial Invoice, and Bill of Lading are required.",
  "The estimated import duty for your product (HS Code 8471.30.00) is approximately 0% under MFN tariff rate. Additional fees may apply including Customs Processing Fees.",
  "I recommend using Incoterms 2020 CIF for your shipment to include insurance coverage. This protects both buyer and seller during transit.",
  "For sea freight from Shanghai to Los Angeles, transit time is typically 14-21 days. Air freight takes 3-5 days but is approximately 3-4x more expensive.",
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI Trade Assistant. I can help with:\n\n• HS code classification\n• Compliance requirements\n• Document analysis\n• Trade regulations\n• Duty calculations\n\nHow can I assist you?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
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

  const quickActions = [
    { label: 'HS Code', prompt: 'Help me classify product HS code: ' },
    { label: 'Compliance', prompt: 'What compliance for importing from ' },
    { label: 'Duty Calc', prompt: 'Calculate duty for HS code ' },
    { label: 'Freight', prompt: 'Freight estimate from ' },
  ];

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#F4F1EA]">AI Trade Assistant</h1>
          <p className="text-[#D8CCBC]/60 text-xs sm:text-sm hidden sm:block">Ask about compliance, HS codes, documents</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-full">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="text-emerald-400 text-xs font-medium">Online</span>
        </div>
      </div>

      {/* Quick Actions - Mobile scrollable */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => setInput(action.prompt)}
            className="flex-shrink-0 px-3 py-2 bg-[#0E3B36] hover:bg-[#0E3B36]/80 text-[#D8CCBC] text-xs rounded-lg transition-colors whitespace-nowrap"
          >
            💡 {action.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-xl p-4 space-y-4 mb-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-[#C49A6C] text-[#081512]'
                  : 'bg-[#0E3B36] text-[#F4F1EA]'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-[#081512]/60' : 'text-[#D8CCBC]/50'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#0E3B36] rounded-2xl px-4 py-3">
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
      <div className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask about compliance, HS codes..."
          className="flex-1 min-h-[48px] max-h-[120px] px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm resize-none"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="w-12 h-12 bg-[#C49A6C] text-[#081512] rounded-xl font-bold flex items-center justify-center disabled:opacity-50 hover:bg-[#D4AA82] transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}
