'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Bell,
  Send,
  Search,
  User,
  Clock,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/hooks/useToast';

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  online?: boolean;
}

interface Message {
  id: string;
  sender: 'me' | 'them';
  content: string;
  time: string;
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Global Trade Exports',
    lastMessage: 'Thank you for your inquiry. We can supply the...',
    lastMessageTime: '2 min ago',
    unread: true,
    online: true,
  },
  {
    id: '2',
    name: 'Cotton World Ltd',
    lastMessage: 'The samples are being shipped today.',
    lastMessageTime: '1 hour ago',
    unread: false,
    online: false,
  },
  {
    id: '3',
    name: 'MetalLink Global',
    lastMessage: 'Please find attached the quotation for copper...',
    lastMessageTime: '3 hours ago',
    unread: true,
    online: true,
  },
];

const messages: Message[] = [
  { id: '1', sender: 'them', content: 'Hello! Thank you for your interest in our products. How can I help you today?', time: '10:30 AM' },
  { id: '2', sender: 'me', content: 'Hi, I saw your Basmati Rice listing. Is it possible to get a sample before placing a bulk order?', time: '10:32 AM' },
  { id: '3', sender: 'them', content: 'Absolutely! We offer free samples for verified buyers. You just need to cover the shipping cost.', time: '10:35 AM' },
  { id: '4', sender: 'me', content: 'That sounds great. What is the minimum order quantity for samples?', time: '10:38 AM' },
  { id: '5', sender: 'them', content: 'For samples, we can ship as low as 5kg. The shipping cost varies by destination. Would you like me to prepare a sample pack for you?', time: '10:40 AM' },
];

export default function InboxPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const { showToast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    showToast('Message sent!', 'success');
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <Header notificationCount={3} />

      <main className="container mx-auto px-4 sm:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#101111] flex items-center gap-3">
            <MessageSquare className="w-8 h-8" />
            Messages
          </h1>
          <p className="text-[#4A4A4A] mt-1">
            Communicate with suppliers and track your inquiries
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden h-[600px] flex">
          {/* Conversations List */}
          <div className={`${selectedConversation ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-black/5`}>
            {/* Search */}
            <div className="p-4 border-b border-black/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4A4A]" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full h-10 pl-10 pr-4 bg-[#f7f5f1] rounded-lg text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-4 border-b border-black/5 text-left hover:bg-[#f7f5f1] transition-colors ${
                    selectedConversation === conv.id ? 'bg-[#154230]/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-[#154230] rounded-full flex items-center justify-center text-white font-bold">
                        {conv.name.charAt(0)}
                      </div>
                      {conv.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium truncate ${conv.unread ? 'text-[#101111]' : 'text-[#4A4A4A]'}`}>
                          {conv.name}
                        </span>
                        <span className="text-xs text-[#4A4A4A]">{conv.lastMessageTime}</span>
                      </div>
                      <p className={`text-sm truncate mt-1 ${conv.unread ? 'text-[#101111]' : 'text-[#4A4A4A]'}`}>
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unread && (
                      <div className="w-2 h-2 bg-[#154230] rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${selectedConversation ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-black/5 flex items-center gap-4">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="md:hidden p-2 hover:bg-black/5 rounded-lg"
                  >
                    ←
                  </button>
                  <div className="w-10 h-10 bg-[#154230] rounded-full flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#101111]">
                      {conversations.find(c => c.id === selectedConversation)?.name}
                    </h3>
                    <p className="text-xs text-[#4A4A4A]">Online</p>
                  </div>
                  <Link href="/suppliers/1">
                    <Button variant="ghost" size="sm">View Profile</Button>
                  </Link>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sender === 'me'
                            ? 'bg-[#154230] text-white'
                            : 'bg-[#f7f5f1] text-[#101111]'
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-[#4A4A4A]'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-black/5">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 h-12 px-4 bg-[#f7f5f1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#154230]/20"
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <EmptyState
                icon={<MessageSquare className="w-16 h-16" />}
                title="Select a conversation"
                description="Choose a conversation from the list to start messaging."
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
