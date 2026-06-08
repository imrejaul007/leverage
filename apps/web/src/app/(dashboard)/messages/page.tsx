'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Settings,
  LogOut,
  Home,
  User,
  Search,
  Plus,
  MessageSquare,
  FileText,
  Truck,
  Package,
  BarChart3,
  Send,
  Bell,
  ChevronLeft,
} from 'lucide-react';
import BottomNav from '@/components/BottomNav';

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

const sidebarLinks = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/marketplace', icon: Search, label: 'Browse' },
  { href: '/rfqs', icon: FileText, label: 'RFQs' },
  { href: '/orders', icon: Truck, label: 'Orders' },
  { href: '/documents', icon: Package, label: 'Documents' },
  { href: '/network', icon: User, label: 'Network' },
  { href: '/ai', icon: BarChart3, label: 'AI Assistant' },
  { href: '/messages', icon: MessageSquare, label: 'Messages', active: true },
  { href: '/settings', icon: Settings, label: 'Settings' },
];


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
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  const handleConversationSelect = (conv: Conversation) => {
    setSelectedConv(conv);
    setMobileView('chat');
  };

  const handleBackToList = () => {
    setSelectedConv(null);
    setMobileView('list');
  };

  return (
    <div className="min-h-screen bg-[#E6E2DA] flex flex-col max-h-screen">
      {/* Desktop Sidebar - White background, green active links */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/5 flex-col z-40">
        <div className="p-6 border-b border-black/5">
          <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.active;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'}`}>
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-black/5">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="flex-1">
              <p className="text-[#101111] font-semibold text-sm">John Doe</p>
              <p className="text-[#4A4A4A] text-xs">john@company.com</p>
            </div>
            <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-[#4A4A4A]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowMobileSidebar(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col">
            <div className="p-6 border-b border-black/5">
              <Image src="/leverage-logo.png" alt="LEVERAGE" width={120} height={40} className="object-contain" />
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = link.active;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setShowMobileSidebar(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-[#154230] text-white' : 'text-[#4A4A4A] hover:bg-[#E6E2DA]'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-black/5">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 bg-[#A6824A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JD</span>
                </div>
                <div className="flex-1">
                  <p className="text-[#101111] font-semibold text-sm">John Doe</p>
                  <p className="text-[#4A4A4A] text-xs">john@company.com</p>
                </div>
                <button className="p-2 hover:bg-[#E6E2DA] rounded-lg transition-colors">
                  <LogOut className="w-4 h-4 text-[#4A4A4A]" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="lg:ml-64 flex-1 flex flex-col min-h-screen">
        {/* Mobile Header - Clean with hamburger + logo + bell */}
        <div className="lg:hidden bg-white border-b border-black/5 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowMobileSidebar(true)} className="p-2 -ml-2">
                <Menu className="w-6 h-6 text-[#101111]" />
              </button>
              <div className="flex items-center gap-2">
                <Image src="/leverage-logo.png" alt="LEVERAGE" width={100} height={33} className="object-contain" />
              </div>
            </div>
            <button className="relative p-2">
              <Bell className="w-6 h-6 text-[#4A4A4A]" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#5D1E21] rounded-full text-white text-xs font-bold flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block bg-gradient-to-br from-[#154230] to-[#1a5040] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Messages</h1>
              <p className="text-white/70 text-sm">{conversations.length} conversations</p>
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
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-4 pb-4 lg:p-6 mt-0 overflow-hidden">
          {/* Mobile View: List */}
          <div className={`flex-1 flex flex-col mt-4 lg:mt-0 overflow-hidden ${mobileView === 'chat' ? 'hidden lg:flex' : 'flex'}`}>
            {/* Messages List Card */}
            <div className="bg-white rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden">
              {/* List Header */}
              <div className="p-4 border-b border-black/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="lg:hidden w-10 h-10 bg-[#154230] rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="lg:hidden">
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
                        onClick={() => handleConversationSelect(conv)}
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

            {/* Bottom Stats Bar - Mobile only */}
            <div className="lg:hidden bg-[#5D1E21] px-4 py-3 mt-4 rounded-t-xl mb-20">
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
          </div>

          {/* Mobile View: Chat */}
          <div className={`flex-1 flex flex-col mt-4 lg:mt-0 overflow-hidden ${mobileView === 'list' ? 'hidden lg:flex' : 'flex'}`}>
            {/* Chat Card */}
            {selectedConv ? (
              <div className="bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden flex-1">
                {/* Chat Header */}
                <div className="flex items-center gap-3 p-4 border-b border-black/5">
                  <button onClick={handleBackToList} className="p-1 lg:hidden">
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
                  <button
                    onClick={() => setShowNewChat(true)}
                    className="ml-auto w-8 h-8 bg-[#E6E2DA] text-[#154230] rounded-lg flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {selectedConv.messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <MessageSquare className="w-12 h-12 text-[#E6E2DA] mb-4" />
                      <p className="text-[#4A4A4A] text-sm">Start the conversation</p>
                    </div>
                  ) : (
                    selectedConv.messages.map(msg => (
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
                    ))
                  )}
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
            ) : (
              <div className="hidden lg:flex bg-white rounded-2xl shadow-sm flex-1 items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-[#E6E2DA] mx-auto mb-4" />
                  <p className="text-[#4A4A4A] text-lg">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeItem="inbox" />

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