'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Search, Plus, Bell, Home, Search as Browse, FileText, Inbox, User, ChevronLeft } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'home' | 'browse' | 'post' | 'inbox' | 'account'>('inbox');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('leverage_conversations');
    if (stored) {
      const parsed = JSON.parse(stored);
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

  const unreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="min-h-screen bg-[#E6E2DA] flex flex-col max-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#154230] to-[#1a5040] rounded-b-[32px] px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-white">
              <p className="text-xl font-bold tracking-tight">LEVERAGE</p>
            </div>
          </div>
          <button className="relative p-2">
            <Bell className="w-6 h-6 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#5D1E21] rounded-full text-white text-xs font-bold flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
        </div>
        <p className="text-white/70 text-xs tracking-widest uppercase">Connecting Dots to Ports</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col -mt-4 px-4 pb-4 overflow-hidden">
        {/* Messages List Card */}
        <div className="bg-white rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
          {/* List Header */}
          <div className="p-4 border-b border-black/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[#101111]">Messages</h1>
                  <p className="text-[#4A4A4A] text-xs">{conversations.length} conversations</p>
                </div>
              </div>
              <button
                onClick={() => setShowNewChat(true)}
                className="w-8 h-8 bg-[#154230] text-white rounded-lg flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-[#4A4A4A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full h-10 pl-10 pr-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] text-sm focus:outline-none focus:border-[#A6824A]"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-8 text-center text-[#4A4A4A] text-sm">
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
                    className={`w-full flex items-start gap-3 p-4 border-b border-black/5 text-left ${
                      isSelected ? 'bg-[#154230]/10' : 'hover:bg-[#E6E2DA]/50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#154230] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#101111] text-sm font-semibold truncate">{conv.participant.name}</span>
                        <span className="text-[#4A4A4A] text-xs flex-shrink-0">{formatTime(conv.lastMessageAt)}</span>
                      </div>
                      {conv.participant.company && (
                        <p className="text-[#A6824A] text-xs truncate">{conv.participant.company}</p>
                      )}
                      <p className="text-[#4A4A4A] text-sm truncate mt-0.5">{conv.lastMessage}</p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-[#5D1E21] rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {conv.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Card (shown when conversation selected on mobile) */}
        {selectedConv && (
          <div className="mt-4 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden max-h-[60vh]">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-black/5">
              <button onClick={() => setSelectedConv(null)} className="p-1">
                <ChevronLeft className="w-5 h-5 text-[#4A4A4A]" />
              </button>
              <div className="w-10 h-10 rounded-full bg-[#154230] flex items-center justify-center text-white font-bold text-sm">
                {selectedConv.participant.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-[#101111] text-sm font-semibold">{selectedConv.participant.name}</p>
                {selectedConv.participant.company && (
                  <p className="text-[#A6824A] text-xs">{selectedConv.participant.company}</p>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {selectedConv.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-[#154230] text-white'
                      : 'bg-[#E6E2DA] text-[#101111]'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-white/60' : 'text-[#4A4A4A]'}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-black/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A] text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="w-12 h-12 bg-[#154230] text-white rounded-xl flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Stats Bar */}
      <div className="bg-[#5D1E21] px-4 py-3 mx-4 rounded-t-xl mb-16">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <p className="text-white font-bold text-lg">{conversations.length}</p>
            <p className="text-white/70 text-xs">Chats</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <p className="text-white font-bold text-lg">{conversations.filter(c => c.unreadCount > 0).length}</p>
            <p className="text-white/70 text-xs">Unread</p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <p className="text-white font-bold text-lg">{conversations.reduce((acc, c) => acc + c.messages.length, 0)}</p>
            <p className="text-white/70 text-xs">Messages</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-4 py-2 pb-6">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-3 py-2 ${activeTab === 'home' ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex flex-col items-center gap-1 px-3 py-2 ${activeTab === 'browse' ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}
          >
            <Browse className="w-5 h-5" />
            <span className="text-xs font-medium">Browse</span>
          </button>
          <button
            onClick={() => setActiveTab('post')}
            className={`flex flex-col items-center gap-1 px-3 py-2 ${activeTab === 'post' ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}
          >
            <div className="w-10 h-10 bg-[#154230] rounded-full flex items-center justify-center -mt-5">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-[#154230]">Post RFQ</span>
          </button>
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex flex-col items-center gap-1 px-3 py-2 relative ${activeTab === 'inbox' ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}
          >
            <Inbox className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 right-1 w-4 h-4 bg-[#5D1E21] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
            <span className="text-xs font-medium">Inbox</span>
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`flex flex-col items-center gap-1 px-3 py-2 ${activeTab === 'account' ? 'text-[#154230]' : 'text-[#4A4A4A]'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Account</span>
          </button>
        </div>
      </nav>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white border border-black/5 rounded-2xl p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-bold text-[#101111] mb-4">New Conversation</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newChatName}
                onChange={(e) => setNewChatName(e.target.value)}
                placeholder="Enter name..."
                className="w-full h-12 px-4 bg-[#E6E2DA] border border-transparent rounded-xl text-[#101111] placeholder-[#4A4A4A] focus:outline-none focus:border-[#A6824A]"
                autoFocus
              />
              <div className="flex gap-3">
                <button onClick={() => setShowNewChat(false)} className="flex-1 py-3 bg-[#E6E2DA] text-[#101111] rounded-xl font-semibold">
                  Cancel
                </button>
                <button onClick={createNewChat} disabled={!newChatName.trim()} className="flex-1 py-3 bg-[#154230] text-white rounded-xl font-semibold disabled:opacity-50">
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
