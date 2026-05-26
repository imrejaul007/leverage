'use client';

import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { chatApi } from '@/lib/api-client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI Trade Assistant. I can help you with:\n\n• HS code classification\n• Compliance questions\n• Document analysis\n• Trade regulations\n• Duty calculations\n\nHow can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await chatApi.chat(message);
      return response.data.data;
    },
  });

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

    try {
      const response = await chatMutation.mutateAsync(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message?.content || 'I\'m processing your request...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'Classify my HS code', prompt: 'Help me classify a product with HS code. Product description: ' },
    { label: 'Check compliance', prompt: 'What compliance requirements apply for importing goods from ' },
    { label: 'Calculate duty', prompt: 'Calculate import duty for product with HS code ' },
    { label: 'Draft invoice', prompt: 'Help me draft a commercial invoice template for ' },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-white">AI Trade Assistant</h1>
        <p className="text-gray-400 text-sm">Get instant help with compliance, documentation, and trade questions</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickActions.map((action, i) => (
          <button
            key={i}
            onClick={() => setInput(action.prompt)}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-gray-300 text-sm rounded-lg transition-colors"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-slate-800 rounded-xl border border-slate-700 p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-200'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {chatMutation.isPending && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-gray-300 rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about compliance, HS codes, documents..."
          className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || chatMutation.isPending}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
