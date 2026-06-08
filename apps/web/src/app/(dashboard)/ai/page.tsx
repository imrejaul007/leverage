'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Loader2, Globe, Shield, FileText } from 'lucide-react';

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
    <div className="h-[calc(100vh-180px)] flex flex-col relative overflow-hidden">
      {/* Background decorations - AI/Tech themed */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large Globe with AI Network Pattern */}
        <div className="absolute -right-40 -top-40 w-[600px] h-[600px] animate-[spin_60s_linear_infinite]">
          <svg viewBox="0 0 400 400" className="w-full h-full opacity-[0.06]">
            <circle cx="200" cy="200" r="180" fill="none" stroke="#154230" strokeWidth="1" />
            <circle cx="200" cy="200" r="150" fill="none" stroke="#154230" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#154230" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="90" fill="none" stroke="#A6824A" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="60" fill="none" stroke="#154230" strokeWidth="0.5" />
            <ellipse cx="200" cy="200" rx="180" ry="100" fill="none" stroke="#154230" strokeWidth="0.5" />
            {/* Network nodes */}
            <circle cx="80" cy="150" r="3" fill="#A6824A" />
            <circle cx="150" cy="80" r="3" fill="#A6824A" />
            <circle cx="280" cy="120" r="3" fill="#A6824A" />
            <circle cx="320" cy="220" r="3" fill="#A6824A" />
            <circle cx="250" cy="300" r="3" fill="#A6824A" />
            <line x1="80" y1="150" x2="150" y2="80" stroke="#A6824A" strokeWidth="0.3" />
            <line x1="150" y1="80" x2="280" y2="120" stroke="#A6824A" strokeWidth="0.3" />
            <line x1="280" y1="120" x2="320" y2="220" stroke="#A6824A" strokeWidth="0.3" />
            <line x1="320" y1="220" x2="250" y2="300" stroke="#A6824A" strokeWidth="0.3" />
          </svg>
        </div>

        {/* Circuit/AI Pattern */}
        <svg className="absolute top-0 left-0 w-[400px] h-[400px] opacity-[0.05]" viewBox="0 0 400 400">
          <rect x="50" y="50" width="300" height="300" fill="none" stroke="#154230" strokeWidth="0.5" rx="10" />
          <circle cx="100" cy="100" r="5" fill="#A6824A" />
          <circle cx="300" cy="100" r="5" fill="#A6824A" />
          <circle cx="100" cy="300" r="5" fill="#A6824A" />
          <circle cx="300" cy="300" r="5" fill="#A6824A" />
          <circle cx="200" cy="200" r="8" fill="#A6824A" />
          <line x1="100" y1="100" x2="200" y2="200" stroke="#A6824A" strokeWidth="0.5" />
          <line x1="300" y1="100" x2="200" y2="200" stroke="#A6824A" strokeWidth="0.5" />
          <line x1="100" y1="300" x2="200" y2="200" stroke="#A6824A" strokeWidth="0.5" />
          <line x1="300" y1="300" x2="200" y2="200" stroke="#A6824A" strokeWidth="0.5" />
          {/* Small circuit nodes */}
          <circle cx="150" cy="100" r="2" fill="#154230" />
          <circle cx="250" cy="100" r="2" fill="#154230" />
          <circle cx="200" cy="150" r="2" fill="#154230" />
          <circle cx="200" cy="250" r="2" fill="#154230" />
        </svg>

        {/* Data Stream Lines */}
        <svg className="absolute bottom-20 right-0 w-[300px] h-[200px] opacity-[0.06]" viewBox="0 0 300 200">
          <path d="M0,50 L100,50 L120,100 L200,100 L220,50 L300,50" fill="none" stroke="#A6824A" strokeWidth="1" />
          <path d="M0,100 L80,100 L100,150 L180,150 L200,100 L300,100" fill="none" stroke="#154230" strokeWidth="1" />
          <path d="M0,150 L60,150 L80,100 L160,100 L180,150 L300,150" fill="none" stroke="#A6824A" strokeWidth="1" />
        </svg>

        {/* Floating Data Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${5 + (i * 4.5)}%`,
              top: `${8 + (i % 8) * 11}%`,
              width: i % 4 === 0 ? '4px' : i % 4 === 1 ? '2px' : '3px',
              height: i % 4 === 0 ? '4px' : i % 4 === 1 ? '2px' : '3px',
              backgroundColor: i % 3 === 0 ? '#A6824A' : i % 3 === 1 ? '#154230' : '#5D1E21',
              animation: `pulse ${1.5 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
              opacity: 0.2 + (i % 5) * 0.06,
            }}
          />
        ))}

        {/* Neural Network Lines */}
        <svg className="absolute top-1/4 left-0 w-[200px] h-[150px] opacity-[0.04]" viewBox="0 0 200 150">
          <circle cx="20" cy="30" r="3" fill="#A6824A" />
          <circle cx="20" cy="75" r="3" fill="#A6824A" />
          <circle cx="20" cy="120" r="3" fill="#A6824A" />
          <circle cx="100" cy="50" r="3" fill="#A6824A" />
          <circle cx="100" cy="100" r="3" fill="#A6824A" />
          <circle cx="180" cy="75" r="4" fill="#A6824A" />
          <line x1="23" y1="30" x2="97" y2="50" stroke="#A6824A" strokeWidth="0.5" />
          <line x1="23" y1="30" x2="97" y2="100" stroke="#A6824A" strokeWidth="0.5" />
          <line x1="23" y1="75" x2="97" y2="50" stroke="#A6824A" strokeWidth="0.5" />
          <line x1="23" y1="75" x2="97" y2="100" stroke="#A6824A" strokeWidth="0.5" />
          <line x1="23" y1="120" x2="97" y2="50" stroke="#A6824A" strokeWidth="0.5" />
          <line x1="23" y1="120" x2="97" y2="100" stroke="#A6824A" strokeWidth="0.5" />
          <line x1="103" y1="50" x2="177" y2="75" stroke="#A6824A" strokeWidth="0.5" />
          <line x1="103" y1="100" x2="177" y2="75" stroke="#A6824A" strokeWidth="0.5" />
        </svg>

        {/* Glow Effect */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#A6824A] rounded-full blur-[150px] opacity-[0.03]" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-[#154230] rounded-full blur-[100px] opacity-[0.04]" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Bot icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-[#154230] to-[#1d5240] rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#101111]">AI Trade Assistant</h1>
            <p className="text-[#4A4A4A] text-xs">Powered by advanced trade intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#154230]/10 rounded-full">
          <div className="w-2 h-2 bg-[#154230] rounded-full animate-pulse"></div>
          <span className="text-[#154230] text-xs font-medium">Online</span>
        </div>
      </div>

      {/* AI Capabilities Bar */}
      <div className="flex items-center gap-4 p-3 bg-white border border-black/5 rounded-xl mb-4 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#154230]" />
          <span className="text-[#101111] text-xs font-medium whitespace-nowrap">Compliance</span>
        </div>
        <div className="h-5 w-px bg-black/10" />
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#A6824A]" />
          <span className="text-[#101111] text-xs font-medium whitespace-nowrap">HS Codes</span>
        </div>
        <div className="h-5 w-px bg-black/10" />
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#5D1E21]" />
          <span className="text-[#101111] text-xs font-medium whitespace-nowrap">Trade Routes</span>
        </div>
        <div className="h-5 w-px bg-black/10" />
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#154230]" />
          <span className="text-[#101111] text-xs font-medium whitespace-nowrap">Duty Calc</span>
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
