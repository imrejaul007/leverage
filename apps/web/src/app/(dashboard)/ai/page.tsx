'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockResponses = [
  "Based on the HS code classification, your product falls under Chapter 84. The applicable HS code is 8471.30.00 for portable digital automatic data processing machines.",
  "For importing goods from San Francisco to the USA, you'll need to comply with Section 301 tariffs. Additional documentation including COO, Commercial Invoice, and Bill of Lading are required.",
  "The estimated import duty for your product (HS Code 8471.30.00) is approximately 0% under MFN tariff rate. Additional fees may apply including Customs Processing Fees.",
  "I recommend using Incoterms 2020 CIF for your shipment to include insurance coverage. This protects both buyer and seller during transit.",
  "For sea freight from Shanghai to Los Angeles, transit time is typically 14-21 days. Air freight takes 3-5 days but is approximately 3-4x more expensive.",
];

const quickActions = [
  { label: 'HS Code Lookup', prompt: 'What is the HS code for ' },
  { label: 'Duty Calculator', prompt: 'Calculate duty for importing ' },
  { label: 'Compliance Check', prompt: 'What compliance docs for importing from ' },
  { label: 'Freight Estimate', prompt: 'Estimate shipping cost from ' },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm your AI Trade Assistant. I can help with:\n\n• HS code classification\n• Compliance requirements\n• Document analysis\n• Trade regulations\n• Duty calculations\n\nHow can I assist you today?",
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

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#101111]">AI Trade Assistant</h1>
          <p className="text-[#4A4A4A] text-xs hidden sm:block">Ask about compliance, HS codes, documents</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#154230]/10 rounded-full">
          <div className="w-2 h-2 bg-[#154230] rounded-full animate-pulse"></div>
          <span className="text-[#154230] text-xs font-medium">Online</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => handleQuickAction(action.prompt)}
            className="flex-shrink-0 px-4 py-2 bg-white border border-black/5 rounded-lg text-[#101111] text-xs font-medium hover:bg-[#E6E2DA] transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3 inline mr-1.5 text-[#A6824A]" />
            {action.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-[#154230] text-white rounded-br-md'
                  : 'bg-white border border-black/5 text-[#101111] rounded-bl-md'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#154230] flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[#101111] font-medium text-xs">AI Assistant</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-black/5 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#154230] flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#A6824A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-[#A6824A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-[#A6824A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border border-black/5 rounded-xl p-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about HS codes, duties, compliance..."
            className="flex-1 h-10 px-4 bg-[#E6E2DA] border border-transparent rounded-lg text-[#101111] placeholder-[#4A4A4A] focus:outline-none text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 bg-[#154230] text-white rounded-lg flex items-center justify-center hover:bg-[#1d5240] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
