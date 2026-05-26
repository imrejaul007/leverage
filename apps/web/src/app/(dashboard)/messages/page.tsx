'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  participant: { name: string; company?: string; avatar?: string };
  messages: Message[];
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
}

const initialConversations: Conversation[] = [
  {
    id: '1',
    participant: { name: 'Sarah Chen', company: 'Asia Trade Hub' },
    messages: [
      { id: '1', role: 'assistant', content: 'Hi! Regarding the shipment, everything is on track. The container will depart on Monday.', timestamp: new Date('2024-01-20T10:30:00') },
      { id: '2', role: 'user', content: 'Great! Can you send me the tracking number?', timestamp: new Date('2024-01-20T10:32:00') },
      { id: '3', role: 'assistant', content: 'Of course! The tracking number is MSCU12345678. You can track it on our portal.', timestamp: new Date('2024-01-20T10:35:00') },
    ],
    lastMessage: 'The tracking number is MSCU12345678.',
    lastMessageAt: new Date('2024-01-20T10:35:00'),
    unreadCount: 0,
  },
  {
    id: '2',
    participant: { name: 'Rakesh Sharma', company: 'Global Trade Partners' },
    messages: [
      { id: '1', role: 'assistant', content: 'Please find attached the updated quotation for the cotton yarn shipment.', timestamp: new Date('2024-01-20T09:15:00') },
    ],
    lastMessage: 'Please find attached the updated quotation.',
    lastMessageAt: new Date('2024-01-20T09:15:00'),
    unreadCount: 1,
  },
  {
    id: '3',
    participant: { name: 'Michael Torres', company: 'FastFreight Solutions' },
    messages: [
      { id: '1', role: 'assistant', content: 'Container CL-1234 is ready for pickup at the warehouse. Please confirm your preferred delivery date.', timestamp: new Date('2024-01-19T14:20:00') },
    ],
    lastMessage: 'Container CL-1234 is ready for pickup.',
    lastMessageAt: new Date('2024-01-19T14:20:00'),
    unreadCount: 1,
  },
  {
    id: '4',
    participant: { name: 'John Williams', company: 'US Imports Inc.' },
    messages: [
      { id: '1', role: 'assistant', content: 'Payment confirmed. Thank you for your business!', timestamp: new Date('2024-01-19T11:00:00') },
      { id: '2', role: 'user', content: 'Thanks for confirming. When can we expect delivery?', timestamp: new Date('2024-01-19T11:30:00') },
      { id: '3', role: 'assistant', content: 'Based on current schedules, delivery should be within 5-7 business days.', timestamp: new Date('2024-01-19T11:45:00') },
    ],
    lastMessage: 'Delivery should be within 5-7 business days.',
    lastMessageAt: new Date('2024-01-19T11:45:00'),
    unreadCount: 0,
  },
];

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('leverage_conversations');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      parsed.forEach((conv: Conversation) => {
        conv.lastMessageAt = new Date(conv.lastMessageAt);
        conv.messages.forEach((msg: Message) => {
          msg.timestamp = new Date(msg.timestamp);
        });
      });
      setConversations(parsed);
    } else {
      setConversations(initialConversations);
      localStorage.setItem('leverage_conversations', JSON.stringify(initialConversations));
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConv?.messages]);

  const saveConversations = (data: Conversation[]) => {
    setConversations(data);
    localStorage.setItem('leverage_conversations', JSON.stringify(data));
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConv) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
    };

    const updated = conversations.map(conv => {
      if (conv.id === selectedConv.id) {
        return {
          ...conv,
          messages: [...conv.messages, userMsg],
          lastMessage: newMessage,
          lastMessageAt: new Date(),
        };
      }
      return conv;
    });

    saveConversations(updated);
    setSelectedConv(updated.find(c => c.id === selectedConv.id) || null);
    setNewMessage('');

    // Simulate reply after 1 second
    setTimeout(() => {
      const replies = [
        'Thanks for your message. Let me check on that for you.',
        'Got it! I\'ll get back to you shortly.',
        'Understood. I\'ll process this right away.',
        'Thanks for the update. I\'ll review and respond soon.',
      ];
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date(),
      };

      const updatedWithReply = conversations.map(conv => {
        if (conv.id === selectedConv.id) {
          return {
            ...conv,
            messages: [...conv.messages, replyMsg],
            lastMessage: replyMsg.content,
            lastMessageAt: new Date(),
          };
        }
        return conv;
      });

      saveConversations(updatedWithReply);
      setSelectedConv(updatedWithReply.find(c => c.id === selectedConv.id) || null);
    }, 1000);
  };

  const createNewChat = () => {
    if (!newChatName.trim()) return;

    const newConv: Conversation = {
      id: Date.now().toString(),
      participant: { name: newChatName },
      messages: [],
      lastMessage: 'Conversation started',
      lastMessageAt: new Date(),
      unreadCount: 0,
    };

    saveConversations([newConv, ...conversations]);
    setSelectedConv(newConv);
    setShowNewChat(false);
    setNewChatName('');
  };

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const today = new Date();
    if (d.toDateString() === today.toDateString()) return 'Today';
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return d.toLocaleDateString();
  };

  return (
    <div className="h-[calc(100vh-180px)] flex -mx-4 -my-4">
      {/* Conversations List */}
      <div className="w-full sm:w-80 flex flex-col border-r border-[rgba(255,255,255,0.05)] bg-[#081512]">
        {/* Header */}
        <div className="p-4 border-b border-[rgba(255,255,255,0.05)]">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold text-[#F4F1EA]">Messages</h1>
            <button
              onClick={() => setShowNewChat(true)}
              className="w-8 h-8 bg-[#C49A6C] text-[#081512] rounded-lg flex items-center justify-center font-bold"
            >
              +
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 text-sm focus:outline-none focus:border-[#C49A6C]"
            />
            <svg className="w-4 h-4 text-[#D8CCBC]/50 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-[#D8CCBC]/50 text-sm">
              No conversations yet
            </div>
          ) : (
            conversations.map(conv => {
              const initials = conv.participant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
              const isSelected = selectedConv?.id === conv.id;

              return (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`w-full flex items-start gap-3 p-4 border-b border-[rgba(255,255,255,0.03)] text-left transition-colors ${
                    isSelected ? 'bg-[#0E3B36]/50' : 'hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold text-sm border border-[#C49A6C]/20 flex-shrink-0">
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#F4F1EA] text-sm font-medium truncate">{conv.participant.name}</span>
                      <span className="text-[#D8CCBC]/40 text-xs flex-shrink-0">{formatTime(conv.lastMessageAt)}</span>
                    </div>
                    {conv.participant.company && (
                      <p className="text-[#C49A6C] text-xs truncate">{conv.participant.company}</p>
                    )}
                    <p className="text-[#D8CCBC]/60 text-sm truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 bg-[#C49A6C] rounded-full text-[#081512] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConv ? (
        <div className="hidden sm:flex flex-1 flex-col bg-[rgba(255,255,255,0.02)]">
          {/* Chat Header */}
          <div className="flex items-center gap-3 p-4 border-b border-[rgba(255,255,255,0.05)]">
            <button onClick={() => setSelectedConv(null)} className="sm:hidden p-2 text-[#D8CCBC]">←</button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0E3B36] to-[#081512] flex items-center justify-center text-[#C49A6C] font-bold text-sm">
              {selectedConv.participant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-[#F4F1EA] text-sm font-medium">{selectedConv.participant.name}</p>
              {selectedConv.participant.company && (
                <p className="text-[#C49A6C] text-xs">{selectedConv.participant.company}</p>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {selectedConv.messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[#C49A6C] text-[#081512]'
                    : 'bg-[#0E3B36] text-[#F4F1EA]'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-[#081512]/60' : 'text-[#D8CCBC]/50'}`}>
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 h-12 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-[#F4F1EA] placeholder-[#D8CCBC]/40 focus:outline-none focus:border-[#C49A6C] text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="w-12 h-12 bg-[#C49A6C] text-[#081512] rounded-xl flex items-center justify-center font-bold disabled:opacity-50"
              >
                →
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden sm:flex flex-1 items-center justify-center bg-[rgba(255,255,255,0.02)]">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-[#0E3B36] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#C49A6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-[#D8CCBC]/50 text-sm">Select a conversation</p>
          </div>
        </div>
      )}

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-[#081512] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-xl font-bold text-[#F4F1EA] mb-4">New Conversation</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="Enter name..."
                className="w-full input"
                autoFocus
              />
              <div className="flex gap-3">
                <button onClick={() => setShowNewChat(false)} className="flex-1 py-3 bg-[rgba(255,255,255,0.05)] text-[#D8CCBC] rounded-xl font-medium">
                  Cancel
                </button>
                <button onClick={createNewChat} disabled={!newChatName.trim()} className="flex-1 py-3 bg-[#C49A6C] text-[#081512] rounded-xl font-semibold disabled:opacity-50">
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
